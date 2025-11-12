import type { Route } from "./+types/presentation";
import { Link } from "react-router";
import {
  Bot,
  Shield,
  Zap,
  CheckCircle,
  GitBranch,
  Eye,
  Search,
  MessageSquare,
  Network,
  Activity,
} from "lucide-react";
import styles from "./presentation.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Presentation - Service Desk Copilot" },
    { name: "description", content: "System overview and key features" },
  ];
}

export default function Presentation() {
  return (
    <div className={styles.container}>
      <div className={styles.slide}>
        <div className={styles.heroIcon}>
          <Bot size={60} />
        </div>

        <h1 className={styles.slideTitle}>
          Policy & IT Service Desk Copilot
        </h1>
        <p className={styles.slideSubtitle}>
          Multi-Agent RAG System for Enterprise HR/IT Policy Questions and Safe
          Service Desk Automation with Security-First Design
        </p>

        <div className={styles.badges}>
          <span className={styles.badge}>
            <CheckCircle size={16} />
            OWASP LLM Top 10 Compliant
          </span>
          <span className={styles.badge}>
            <CheckCircle size={16} />
            Full Provenance Tracking
          </span>
          <span className={styles.badge}>
            <CheckCircle size={16} />
            Human-in-the-Loop Approval
          </span>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statValue}>85-90%</div>
            <div className={styles.statLabel}>Answer Accuracy</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>60-70%</div>
            <div className={styles.statLabel}>Ticket Deflection</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>&lt;3s</div>
            <div className={styles.statLabel}>p50 Latency</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>100%</div>
            <div className={styles.statLabel}>Provenance</div>
          </div>
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <GitBranch size={32} />
            </div>
            <h3>Supervisor Pattern</h3>
            <p>
              Centralized orchestration with intent classification, planning,
              and agent coordination for enterprise governance
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Shield size={32} />
            </div>
            <h3>Guard Agent Checkpoints</h3>
            <p>
              Input/output screening for prompt injection, PII, and sensitive
              data using Llama Guard 2 with ≥95% detection
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Search size={32} />
            </div>
            <h3>Allowlist RAG</h3>
            <p>
              Semantic search over pre-approved knowledge sources with citation
              generation and confidence scoring
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Zap size={32} />
            </div>
            <h3>Safe Tool Execution</h3>
            <p>
              Ticket actions with pre/post-conditions, least-privilege
              credentials, and mandatory human approval
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Eye size={32} />
            </div>
            <h3>Full Observability</h3>
            <p>
              Distributed tracing, structured logging, real-time metrics, and
              complete provenance records for audit
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Network size={32} />
            </div>
            <h3>MLSecOps Pipeline</h3>
            <p>
              Automated security testing, model versioning, canary deployments,
              and auto-rollback on anomalies
            </p>
          </div>
        </div>

        <div className={styles.cta}>
          <Link to="/" className={`${styles.ctaButton} ${styles.primary}`}>
            <MessageSquare size={20} />
            Try Chat Interface
          </Link>
          <Link
            to="/architecture"
            className={`${styles.ctaButton} ${styles.secondary}`}
          >
            <Network size={20} />
            View Architecture
          </Link>
          <Link
            to="/metrics"
            className={`${styles.ctaButton} ${styles.secondary}`}
          >
            <Activity size={20} />
            View Metrics
          </Link>
          <Link
            to="/security"
            className={`${styles.ctaButton} ${styles.secondary}`}
          >
            <Shield size={20} />
            Security Details
          </Link>
        </div>
      </div>
    </div>
  );
}
