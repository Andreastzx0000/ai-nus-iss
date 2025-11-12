import type { Route } from "./+types/architecture";
import {
  Network,
  Bot,
  Shield,
  Database,
  Gauge,
  GitBranch,
  ArrowDown,
  CheckCircle,
  Search,
  Settings,
  Eye,
} from "lucide-react";
import styles from "./architecture.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "System Architecture - Service Desk Copilot" },
    { name: "description", content: "Multi-agent system architecture" },
  ];
}

export default function Architecture() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>System Architecture</h1>
        <p>
          Multi-agent RAG system for enterprise policy Q&A and IT service desk
          automation with security-first design
        </p>
      </div>

      <div className={styles.content}>
        {/* Overview */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.icon}>
              <Network size={24} />
            </div>
            <h2>Architecture Overview</h2>
          </div>
          <div className={styles.cardContent}>
            <p>
              The system implements a <strong>supervisor pattern</strong> for
              multi-agent orchestration, providing centralized control over
              agent coordination, guardrails enforcement, and provenance
              tracking. This architecture is optimized for enterprise governance
              and compliance requirements.
            </p>
          </div>
          <div className={styles.flowDiagram}>
            <div className={styles.flowStep}>
              <h4>User Query</h4>
              <p>Employee submits question or request</p>
            </div>
            <ArrowDown className={styles.arrow} size={32} />
            <div className={styles.flowStep}>
              <h4>Guard Agent (Input)</h4>
              <p>Screen for injection, PII, security risks</p>
            </div>
            <ArrowDown className={styles.arrow} size={32} />
            <div className={styles.flowStep}>
              <h4>Supervisor Agent</h4>
              <p>Classify intent, create execution plan</p>
            </div>
            <ArrowDown className={styles.arrow} size={32} />
            <div className={styles.flowStep}>
              <h4>Retrieval Agent</h4>
              <p>Search allowlisted knowledge sources</p>
            </div>
            <ArrowDown className={styles.arrow} size={32} />
            <div className={styles.flowStep}>
              <h4>Tooling/Reviewer Agent</h4>
              <p>Execute actions or validate answers</p>
            </div>
            <ArrowDown className={styles.arrow} size={32} />
            <div className={styles.flowStep}>
              <h4>Guard Agent (Output)</h4>
              <p>Verify no sensitive data leakage</p>
            </div>
            <ArrowDown className={styles.arrow} size={32} />
            <div className={styles.flowStep}>
              <h4>Response + Provenance</h4>
              <p>Return answer with full audit trail</p>
            </div>
          </div>
        </section>

        {/* Agent Roles */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.icon}>
              <Bot size={24} />
            </div>
            <h2>Agent Roles & Responsibilities</h2>
          </div>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <GitBranch size={18} />
                </div>
                <h3>Supervisor Agent</h3>
              </div>
              <div className={styles.cardContent}>
                <p>
                  <strong>Purpose:</strong> Orchestrates workflow, classifies
                  intent, creates execution plans
                </p>
                <p>
                  <strong>Model:</strong> GPT-4 Turbo (v2.1)
                </p>
                <p>
                  <strong>Key Functions:</strong>
                </p>
                <ul>
                  <li>Intent classification (policy_qa vs ticket_action)</li>
                  <li>Multi-step planning with cost estimation</li>
                  <li>Agent task assignment and coordination</li>
                  <li>Guard checkpoint enforcement</li>
                </ul>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <Search size={18} />
                </div>
                <h3>Retrieval Agent</h3>
              </div>
              <div className={styles.cardContent}>
                <p>
                  <strong>Purpose:</strong> Semantic search over allowlisted
                  knowledge sources
                </p>
                <p>
                  <strong>Model:</strong> text-embedding-3-large
                </p>
                <p>
                  <strong>Key Functions:</strong>
                </p>
                <ul>
                  <li>Vector search with re-ranking</li>
                  <li>Source allowlist enforcement</li>
                  <li>Citation generation with confidence scores</li>
                  <li>Metadata extraction (version, last-updated)</li>
                </ul>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <Shield size={18} />
                </div>
                <h3>Guard Agent</h3>
              </div>
              <div className={styles.cardContent}>
                <p>
                  <strong>Purpose:</strong> Security screening for inputs and
                  outputs
                </p>
                <p>
                  <strong>Model:</strong> Llama Guard 2
                </p>
                <p>
                  <strong>Key Functions:</strong>
                </p>
                <ul>
                  <li>Prompt injection detection</li>
                  <li>PII screening (SSN, credit cards, etc.)</li>
                  <li>Sensitive data leakage prevention</li>
                  <li>Risk level assessment (low/medium/high/critical)</li>
                </ul>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <Settings size={18} />
                </div>
                <h3>Tooling Agent</h3>
              </div>
              <div className={styles.cardContent}>
                <p>
                  <strong>Purpose:</strong> Safe execution of ticket actions
                </p>
                <p>
                  <strong>Model:</strong> GPT-4 Turbo (v2.0)
                </p>
                <p>
                  <strong>Key Functions:</strong>
                </p>
                <ul>
                  <li>
                    Ticket CRUD (create, update, resolve) with approval flows
                  </li>
                  <li>Pre/post-condition validation</li>
                  <li>Least-privilege credential management</li>
                  <li>Audit logging of all actions</li>
                </ul>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <Eye size={18} />
                </div>
                <h3>Reviewer Agent</h3>
              </div>
              <div className={styles.cardContent}>
                <p>
                  <strong>Purpose:</strong> Validate answers against retrieved
                  sources
                </p>
                <p>
                  <strong>Model:</strong> GPT-4 Turbo (v1.8)
                </p>
                <p>
                  <strong>Key Functions:</strong>
                </p>
                <ul>
                  <li>Source-answer consistency checking</li>
                  <li>Citation completeness verification</li>
                  <li>Hallucination detection</li>
                  <li>Quality scoring and feedback</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.icon}>
              <Database size={24} />
            </div>
            <h2>Technology Stack</h2>
          </div>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>LLM Infrastructure</h3>
              </div>
              <div className={styles.cardContent}>
                <ul>
                  <li>
                    <strong>Primary LLM:</strong> GPT-4 Turbo (Azure OpenAI)
                  </li>
                  <li>
                    <strong>Embeddings:</strong> text-embedding-3-large
                  </li>
                  <li>
                    <strong>Guard Model:</strong> Llama Guard 2 (self-hosted)
                  </li>
                  <li>
                    <strong>Prompt Management:</strong> Versioned in Git
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>Data & Retrieval</h3>
              </div>
              <div className={styles.cardContent}>
                <ul>
                  <li>
                    <strong>Vector DB:</strong> Pinecone (hybrid search)
                  </li>
                  <li>
                    <strong>Knowledge Sources:</strong> SharePoint, Confluence,
                    Handbooks
                  </li>
                  <li>
                    <strong>Indexing:</strong> Nightly batch updates
                  </li>
                  <li>
                    <strong>Allowlist:</strong> Admin-curated source registry
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>Application Layer</h3>
              </div>
              <div className={styles.cardContent}>
                <ul>
                  <li>
                    <strong>Frontend:</strong> React 19 + TypeScript
                  </li>
                  <li>
                    <strong>Backend:</strong> Node.js + React Router v7
                  </li>
                  <li>
                    <strong>API Gateway:</strong> Express middleware
                  </li>
                  <li>
                    <strong>Auth:</strong> Azure AD + RBAC
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>Observability</h3>
              </div>
              <div className={styles.cardContent}>
                <ul>
                  <li>
                    <strong>Logging:</strong> Structured logs (JSON) to Datadog
                  </li>
                  <li>
                    <strong>Tracing:</strong> OpenTelemetry distributed traces
                  </li>
                  <li>
                    <strong>Metrics:</strong> Prometheus + Grafana dashboards
                  </li>
                  <li>
                    <strong>Alerting:</strong> PagerDuty for P0/P1 incidents
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.icon}>
              <Gauge size={24} />
            </div>
            <h2>Success Metrics & SLOs</h2>
          </div>
          <div className={styles.metricsList}>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>
                Correct, cited answers (golden set)
              </span>
              <span className={styles.metricValue}>≥ 85-90%</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>
                Tier 0/1 ticket deflection rate
              </span>
              <span className={styles.metricValue}>≥ 60-70%</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>
                p50 latency (simple Q&A)
              </span>
              <span className={styles.metricValue}>≤ 2-3s</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>
                p95 latency (with retrieval)
              </span>
              <span className={styles.metricValue}>≤ 6-8s</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>Cost per simple Q&A</span>
              <span className={styles.metricValue}>$0.01 - $0.05</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>
                Cost per ticket automation
              </span>
              <span className={styles.metricValue}>≤ $0.10</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>Citation coverage</span>
              <span className={styles.metricValue}>≥ 95%</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>
                Provenance completeness
              </span>
              <span className={styles.metricValue}>100%</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>
                High-severity policy escapes
              </span>
              <span className={styles.metricValue}>0</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>
                Injection detection rate
              </span>
              <span className={styles.metricValue}>≥ 95%</span>
            </div>
          </div>
        </section>

        {/* Design Principles */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.icon}>
              <CheckCircle size={24} />
            </div>
            <h2>Architectural Principles</h2>
          </div>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>
                  Security First <span className={styles.badge}>Critical</span>
                </h3>
              </div>
              <div className={styles.cardContent}>
                <p>
                  Every request passes through Guard Agent checkpoints.
                  Allowlist-only retrieval. Least-privilege tool execution.
                  Zero-trust architecture.
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>
                  Full Provenance{" "}
                  <span className={styles.badge}>Compliance</span>
                </h3>
              </div>
              <div className={styles.cardContent}>
                <p>
                  Complete audit trail: model versions, prompt versions,
                  retrieved sources, tool calls, approval flows, and timestamps.
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>
                  Human Approval <span className={styles.badge}>Governance</span>
                </h3>
              </div>
              <div className={styles.cardContent}>
                <p>
                  High-risk actions (ticket creation, access grants) require
                  explicit human approval before execution.
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>
                  Cost Control <span className={styles.badge}>Efficiency</span>
                </h3>
              </div>
              <div className={styles.cardContent}>
                <p>
                  Scoped retrieval, semantic caching, workload routing
                  (simple→small model, complex→GPT-4), and token budgets.
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>
                  Observability <span className={styles.badge}>Operations</span>
                </h3>
              </div>
              <div className={styles.cardContent}>
                <p>
                  Distributed tracing, structured logging, real-time metrics,
                  and alerting for anomalies and failures.
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>
                  Modularity <span className={styles.badge}>Scalability</span>
                </h3>
              </div>
              <div className={styles.cardContent}>
                <p>
                  Agent roles are independent microservices. Can scale
                  horizontally and evolve to hierarchical architecture as
                  needed.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
