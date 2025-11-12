import type { Route } from "./+types/security";
import {
  Shield,
  AlertTriangle,
  Lock,
  Eye,
  FileSearch,
  CheckCircle,
  ShieldCheck,
  Database,
  Terminal,
} from "lucide-react";
import styles from "./security.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Security Risk Register - Service Desk Copilot" },
    {
      name: "description",
      content: "Security risks, mitigations, and controls for AI agents",
    },
  ];
}

const RISKS = [
  {
    id: "RISK-001",
    title: "Prompt Injection",
    category: "OWASP LLM01",
    severity: "critical" as const,
    description:
      "Attacker manipulates LLM input to bypass guidelines, execute unintended actions, or extract sensitive information via adversarial prompts.",
    mitigation:
      "Input validation through Guard Agent with pattern matching for known injection techniques. Prompt templates with clear role separation. User input sanitization and length limits.",
    controls: ["Guard Agent screening", "Input sanitization", "Prompt versioning"],
  },
  {
    id: "RISK-002",
    title: "Sensitive Information Disclosure",
    category: "OWASP LLM06",
    severity: "high" as const,
    description:
      "Model may inadvertently reveal PII, credentials, API keys, or confidential business data in responses.",
    mitigation:
      "Output screening via Guard Agent for PII patterns (SSN, credit cards, etc.). Secret detection. Response filtering before user display. Audit logs for all outputs.",
    controls: ["Output Guard", "PII detection", "Audit logging"],
  },
  {
    id: "RISK-003",
    title: "Excessive Agency",
    category: "OWASP LLM08",
    severity: "high" as const,
    description:
      "Agent performs high-risk actions (data deletion, access grants) without proper authorization or validation.",
    mitigation:
      "Human-in-the-loop approval for ticket creation and access changes. Least-privilege credentials for tool execution. Pre/post-condition validation. Action allowlist.",
    controls: ["Approval workflow", "Least privilege", "Pre-conditions"],
  },
  {
    id: "RISK-004",
    title: "Insecure Output Handling",
    category: "OWASP LLM02",
    severity: "high" as const,
    description:
      "Generated outputs may contain code injection (XSS, SQL) if not properly sanitized before rendering or execution.",
    mitigation:
      "Output escaping and sanitization. Content Security Policy headers. No direct code execution from LLM outputs. Reviewer agent validates response safety.",
    controls: ["Output sanitization", "CSP headers", "Reviewer validation"],
  },
  {
    id: "RISK-005",
    title: "Training Data Poisoning",
    category: "OWASP LLM03",
    severity: "medium" as const,
    description:
      "If fine-tuning on internal data, malicious entries could poison model behavior.",
    mitigation:
      "Use base models only (GPT-4, no fine-tuning). If fine-tuning required: data validation, provenance tracking, adversarial sample detection, regular model audits.",
    controls: ["Base models only", "Data validation", "Model audits"],
  },
  {
    id: "RISK-006",
    title: "Model Denial of Service",
    category: "OWASP LLM04",
    severity: "medium" as const,
    description:
      "Excessive requests or complex queries could exhaust compute resources or budgets.",
    mitigation:
      "Rate limiting per user. Query complexity analysis. Token budgets and circuit breakers. Request queuing. Cost alerting and auto-throttling.",
    controls: ["Rate limiting", "Token budgets", "Cost alerts"],
  },
  {
    id: "RISK-007",
    title: "Supply Chain Vulnerabilities",
    category: "OWASP LLM05",
    severity: "medium" as const,
    description:
      "Compromised dependencies (LLM provider, vector DB, packages) could expose data or inject malicious code.",
    mitigation:
      "Vendor security assessments (Azure OpenAI SOC2). Dependency scanning (Snyk, Dependabot). Software Bill of Materials (SBOM). Least-privilege API keys.",
    controls: ["Vendor vetting", "Dependency scanning", "SBOM"],
  },
  {
    id: "RISK-008",
    title: "Insecure Plugin/Tool Design",
    category: "OWASP LLM07",
    severity: "high" as const,
    description:
      "Poorly designed tools (ticket APIs, database queries) may lack input validation or authorization checks.",
    mitigation:
      "Tool input schemas with strict validation. Parameterized queries (no SQL injection). Role-based access control on tool execution. Tool allowlist and versioning.",
    controls: ["Input schemas", "Parameterized queries", "RBAC"],
  },
  {
    id: "RISK-009",
    title: "Model Hallucination",
    category: "OWASP LLM09",
    severity: "medium" as const,
    description:
      "Model generates factually incorrect or fabricated information, especially harmful for policy guidance.",
    mitigation:
      "Grounding via RAG with allowlisted sources. Citation requirements (95%+ coverage). Reviewer agent cross-checks answers against retrieved passages. User feedback loop.",
    controls: ["RAG grounding", "Citation requirements", "Reviewer agent"],
  },
  {
    id: "RISK-010",
    title: "Model Theft/Unauthorized Access",
    category: "OWASP LLM10",
    severity: "low" as const,
    description:
      "Attacker gains unauthorized access to model weights, prompts, or proprietary configurations.",
    mitigation:
      "Use managed LLM services (Azure OpenAI). Prompt templates stored in version-controlled, access-restricted repos. Secrets in key vault (Azure Key Vault). Network isolation.",
    controls: ["Managed LLM", "Secret vault", "Network isolation"],
  },
];

const CONTROL_LAYERS = [
  {
    title: "Input Controls",
    icon: ShieldCheck,
    controls: [
      "Guard Agent screens all inputs for injection patterns, PII, excessive length",
      "Input sanitization and normalization",
      "Query complexity analysis and rate limiting",
      "User authentication and authorization via Azure AD",
    ],
  },
  {
    title: "Processing Controls",
    icon: Lock,
    controls: [
      "Supervisor agent enforces planning and approval workflows",
      "Allowlist-only retrieval from approved knowledge sources",
      "Tool execution behind least-privilege service accounts",
      "Pre/post-condition validation for all actions",
    ],
  },
  {
    title: "Output Controls",
    icon: Eye,
    controls: [
      "Guard Agent screens outputs for PII, sensitive data leakage",
      "Reviewer agent validates answer-source consistency",
      "Output sanitization and escaping before rendering",
      "Citation coverage verification (≥95%)",
    ],
  },
  {
    title: "Observability & Audit",
    icon: FileSearch,
    controls: [
      "Full provenance logging: model versions, prompts, sources, tool calls",
      "Distributed tracing with OpenTelemetry",
      "Real-time anomaly detection and alerting",
      "Quarterly security audits and penetration testing",
    ],
  },
  {
    title: "Data Governance",
    icon: Database,
    controls: [
      "Knowledge source allowlist managed by governance committee",
      "Encryption in transit (TLS 1.3) and at rest (AES-256)",
      "PII handling procedures compliant with GDPR/CCPA",
      "Data retention policies and automated purging",
    ],
  },
  {
    title: "MLSecOps Pipeline",
    icon: Terminal,
    controls: [
      "Automated security testing in CI/CD (injection, PII leakage)",
      "Model and prompt versioning with rollback capability",
      "Canary deployments with monitoring and auto-rollback",
      "Incident response playbook for AI-specific threats",
    ],
  },
];

export default function Security() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>
          <div className={styles.headerIcon}>
            <Shield size={28} />
          </div>
          AI Security Risk Register
        </h1>
        <p>
          Comprehensive security risk assessment aligned with OWASP LLM Top 10
          and enterprise security controls
        </p>
      </div>

      <div className={styles.content}>
        {/* Risk Register */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Risk Register</h2>
            <p>
              Identified AI and agent-related security risks with mitigations
              and controls
            </p>
          </div>
          <div className={styles.riskTable}>
            <div className={`${styles.riskRow} ${styles.header}`}>
              <div>Risk</div>
              <div>Description</div>
              <div>Mitigation Strategy</div>
              <div>Controls</div>
              <div>Severity</div>
            </div>
            {RISKS.map((risk) => (
              <div key={risk.id} className={styles.riskRow}>
                <div className={styles.riskTitle} data-label="Risk">
                  {risk.title}
                  <span className={styles.riskCategory}>
                    {risk.category} • {risk.id}
                  </span>
                </div>
                <div className={styles.riskDescription} data-label="Description">
                  {risk.description}
                </div>
                <div className={styles.riskMitigation} data-label="Mitigation">
                  {risk.mitigation}
                </div>
                <div className={styles.riskControls} data-label="Controls">
                  {risk.controls.map((control) => (
                    <div key={control} className={styles.control}>
                      <CheckCircle size={14} />
                      {control}
                    </div>
                  ))}
                </div>
                <div data-label="Severity">
                  <span
                    className={`${styles.severityBadge} ${styles[risk.severity]}`}
                  >
                    {risk.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Security Controls */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Defense-in-Depth Security Controls</h2>
            <p>
              Multi-layered security controls across input, processing, output,
              and governance
            </p>
          </div>
          <div className={styles.controls}>
            {CONTROL_LAYERS.map((layer) => (
              <div key={layer.title} className={styles.controlCard}>
                <h3>
                  <layer.icon size={20} />
                  {layer.title}
                </h3>
                <ul>
                  {layer.controls.map((control) => (
                    <li key={control}>{control}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Compliance */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Compliance & Standards</h2>
            <p>Alignment with industry frameworks and regulations</p>
          </div>
          <div className={styles.controls}>
            <div className={styles.controlCard}>
              <h3>
                <CheckCircle size={20} />
                OWASP LLM Top 10
              </h3>
              <p style={{ fontSize: "var(--font-size-1)", color: "var(--color-neutral-11)", lineHeight: 1.6 }}>
                All 10 OWASP LLM risks addressed with documented mitigations and
                controls. Regular updates as framework evolves.
              </p>
              <span className={styles.statusBadge}>
                <CheckCircle size={12} />
                Compliant
              </span>
            </div>

            <div className={styles.controlCard}>
              <h3>
                <CheckCircle size={20} />
                SOC 2 Type II
              </h3>
              <p style={{ fontSize: "var(--font-size-1)", color: "var(--color-neutral-11)", lineHeight: 1.6 }}>
                Security, availability, and confidentiality controls aligned
                with SOC 2 requirements. Annual third-party audit.
              </p>
              <span className={styles.statusBadge}>
                <CheckCircle size={12} />
                In Progress
              </span>
            </div>

            <div className={styles.controlCard}>
              <h3>
                <CheckCircle size={20} />
                GDPR/CCPA
              </h3>
              <p style={{ fontSize: "var(--font-size-1)", color: "var(--color-neutral-11)", lineHeight: 1.6 }}>
                PII handling, right to deletion, data minimization, and consent
                management procedures in place.
              </p>
              <span className={styles.statusBadge}>
                <CheckCircle size={12} />
                Compliant
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
