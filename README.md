# Policy & IT Service Desk Copilot

A multi-agent RAG (Retrieval-Augmented Generation) system for enterprise HR/IT policy questions and service desk automation with security-first design and full governance controls.

## 🎯 Problem Statement

Enterprises face challenges with:
- **Employee Self-Service**: HR/IT policy questions require human agents, causing delays
- **Service Desk Overload**: High ticket volumes for common, automatable requests
- **Knowledge Silos**: Policy information scattered across SharePoint, Confluence, handbooks
- **Compliance Requirements**: Need for auditable, source-backed answers with provenance
- **Security Risks**: AI systems must prevent prompt injection, PII leakage, and excessive agency

This system addresses these challenges with a governed, multi-agent architecture that delivers:
- **≥85-90%** correct, cited answers on policy questions
- **≥60-70%** Tier 0/1 ticket deflection for automatable requests
- **p50 ≤2-3s** latency for simple Q&A
- **Full provenance** tracking for compliance and audit

## 🏗️ System Architecture

### Supervisor Pattern
The system implements a **supervisor pattern** for multi-agent orchestration:

```
User Query
    ↓
Guard Agent (Input Screening)
    ↓
Supervisor Agent (Intent Classification & Planning)
    ↓
Retrieval Agent (Knowledge Search)
    ↓
Tooling/Reviewer Agent (Action or Validation)
    ↓
Guard Agent (Output Screening)
    ↓
Response + Full Provenance Record
```

### Agent Roles

#### 1. **Supervisor Agent**
- **Model**: GPT-4 Turbo (Azure OpenAI)
- **Purpose**: Classifies intent, creates execution plans, coordinates agents
- **Key Functions**: Intent classification (policy_qa vs ticket_action), multi-step planning, guard enforcement

#### 2. **Retrieval Agent**
- **Model**: text-embedding-3-large (embeddings)
- **Purpose**: Semantic search over allowlisted knowledge sources
- **Key Functions**: Vector search, citation generation, source allowlist enforcement

#### 3. **Guard Agent**
- **Model**: Llama Guard 2 (self-hosted)
- **Purpose**: Security screening for inputs and outputs
- **Key Functions**: Prompt injection detection, PII screening, sensitive data leakage prevention

#### 4. **Tooling Agent**
- **Model**: GPT-4 Turbo
- **Purpose**: Safe execution of ticket actions (create, update, resolve)
- **Key Functions**: Ticket CRUD with approval flows, pre/post-condition validation

#### 5. **Reviewer Agent**
- **Model**: GPT-4 Turbo
- **Purpose**: Validate answers against retrieved sources
- **Key Functions**: Source-answer consistency, citation verification, hallucination detection

## 🔒 Security & Compliance

### OWASP LLM Top 10 Coverage
All 10 OWASP LLM risks addressed:
- ✅ **LLM01 - Prompt Injection**: Guard Agent pattern matching, input sanitization
- ✅ **LLM02 - Insecure Output Handling**: Output escaping, CSP headers
- ✅ **LLM03 - Training Data Poisoning**: Base models only, data validation
- ✅ **LLM04 - Model DoS**: Rate limiting, token budgets, circuit breakers
- ✅ **LLM05 - Supply Chain**: Vendor vetting, dependency scanning, SBOM
- ✅ **LLM06 - Sensitive Info Disclosure**: PII detection, output screening
- ✅ **LLM07 - Insecure Plugin Design**: Input schemas, RBAC, parameterized queries
- ✅ **LLM08 - Excessive Agency**: Human approval loops, least privilege
- ✅ **LLM09 - Overreliance/Hallucination**: RAG grounding, citation requirements
- ✅ **LLM10 - Model Theft**: Managed LLM services, secret vaults, network isolation

### Defense-in-Depth Controls
- **Input Controls**: Guard screening, sanitization, rate limiting, authentication
- **Processing Controls**: Supervisor planning, allowlist retrieval, least-privilege tools
- **Output Controls**: Guard screening, reviewer validation, sanitization
- **Observability**: Full provenance, distributed tracing, real-time anomaly detection
- **Data Governance**: Allowlist management, encryption, PII compliance, retention policies
- **MLSecOps**: Automated security testing, versioning, canary deployments, incident response

## 📊 Success Metrics

### Quality Metrics
- **Answer Accuracy**: ≥85-90% correct with citations (golden set)
- **Ticket Deflection**: ≥60-70% Tier 0/1 deflection for targeted intents
- **Citation Coverage**: ≥95% for factual answers
- **Provenance Completeness**: 100% logging of prompt/model/tool/version

### Performance Metrics
- **p50 Latency**: ≤2-3s for simple Q&A
- **p95 Latency**: ≤6-8s with retrieval and policy checks

### Cost Metrics
- **Simple Q&A**: $0.01-$0.05 per query
- **Ticket Automation**: ≤$0.10 per action
- **Cost Control**: Scoped retrieval, caching, workload routing

### Security Metrics
- **Policy Escapes**: 0 high-severity in staging
- **Injection Detection**: ≥95% for known patterns
- **Data Leakage**: 0 sensitive data in eval suites

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- TypeScript 5+

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

### Project Structure

```
app/
├── types/                   # TypeScript type definitions
│   ├── agent.ts             # Agent types, messages, provenance
│   ├── ticket.ts            # Ticket and action types
│   └── policy.ts            # Policy and knowledge types
├── services/                # Core business logic
│   ├── copilot-service.ts   # Main copilot orchestration
│   ├── agent-supervisor.ts  # Supervisor agent
│   ├── agent-retrieval.ts   # Retrieval agent
│   └── agent-guard.ts       # Guard agent
├── data/                    # Mock data for demo
│   ├── mock-policies.ts
│   └── mock-tickets.ts
├── components/              # React UI components
│   ├── chat-interface.tsx
│   ├── chat-message.tsx
│   ├── app-nav.tsx
│   └── ui/                  # Reusable UI components
├── routes/                  # React Router pages
│   ├── home.tsx             # Main chat interface
│   ├── architecture.tsx     # System architecture
│   ├── tickets.tsx          # Ticket dashboard
│   ├── security.tsx         # Risk register
│   └── documentation.tsx    # Complete docs
└── styles/                  # Global styles and tokens
```

## 📚 Documentation

The system includes comprehensive documentation pages accessible via the navigation:

1. **Chat Interface** (`/`): Interactive copilot for policy Q&A and ticket requests
2. **Architecture** (`/architecture`): Complete system architecture and agent design
3. **Tickets** (`/tickets`): Service desk ticket dashboard with AI assistance metrics
4. **Security** (`/security`): AI security risk register aligned with OWASP LLM Top 10
5. **Documentation** (`/documentation`): Detailed technical documentation

## 🧪 Testing

### Test Coverage
- **Unit Tests**: Agent logic, guards, retrieval functions
- **Integration Tests**: Multi-agent workflows end-to-end
- **Security Tests**: Injection attempts, PII leakage, boundary cases
- **Performance Tests**: Latency benchmarks, cost validation

### Running Tests

```bash
# Run all tests
npm test

# Run security tests
npm run test:security

# Run performance benchmarks
npm run test:performance
```

## 🔄 MLSecOps Pipeline

### CI/CD Workflow
1. **Build**: TypeScript compilation, dependency scanning
2. **Test**: Unit, integration, security test suites
3. **Security Scan**: SAST, dependency vulnerabilities, secret detection
4. **Deploy**: Canary deployment with 10% traffic routing
5. **Monitor**: Real-time metrics, auto-rollback on anomalies

### Model & Prompt Versioning
- **Prompts**: Git with semantic versioning
- **LLM Models**: Azure OpenAI API version pinning
- **Embeddings**: Model ID in config
- **Guard Rules**: Config file versioning with feature flags

## 🎯 Personas Supported

1. **Employee/End User**: Fast, accurate answers to HR/IT/travel/benefits questions
2. **IT Service Desk Analyst**: Reduced ticket volume, better triage, high-quality context
3. **HR Operations Specialist**: Consistent answers, form pre-fills, reduced inquiries
4. **Compliance/InfoSec Officer**: Auditable citations, policy adherence, security controls
5. **Platform/AI Engineer**: Reliability, cost control, observability, rollback paths

## 📦 Deliverables

This project includes all required deliverables:

- ✅ **Presentation Slides**: System overview via Architecture page
- ✅ **System Architecture Document**: Complete architecture documentation
- ✅ **Agent Design Documentation**: Detailed agent behavior and reasoning
- ✅ **Explainable & Responsible AI Report**: Security and governance principles
- ✅ **AI Security Risk Register**: OWASP LLM Top 10 alignment
- ✅ **MLSecOps Pipeline Design**: CI/CD, testing, versioning, monitoring
- ✅ **Source Code Repository**: Well-structured, modular, documented
- ✅ **Testing Artifacts**: Unit tests, integration tests, security tests
- ✅ **UI Prototype**: Functional web-based interface

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, CSS Modules
- **Routing**: React Router v7
- **LLM Infrastructure**: GPT-4 Turbo (Azure OpenAI), Llama Guard 2
- **Embeddings**: text-embedding-3-large
- **Vector DB**: Pinecone (simulated)
- **Knowledge Sources**: SharePoint, Confluence, Handbooks (simulated)
- **Observability**: OpenTelemetry, Datadog, Prometheus, Grafana
- **Auth**: Azure AD + RBAC (architecture)

## 📝 License

This is a demonstration/academic project for the Multi-Agent Systems course.

## 🤝 Contributing

This project demonstrates best practices for enterprise AI systems:
- Security-first architecture
- Full provenance tracking
- Human-in-the-loop approval
- Defense-in-depth controls
- Comprehensive testing
- MLSecOps automation

---

**Built with enterprise-grade security, governance, and observability for safe AI deployment.**
