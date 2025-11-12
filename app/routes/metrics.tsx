import type { Route } from "./+types/metrics";
import {
  Activity,
  TrendingUp,
  Zap,
  DollarSign,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  Target,
} from "lucide-react";
import styles from "./metrics.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Metrics & Monitoring - Service Desk Copilot" },
    { name: "description", content: "Real-time system metrics and SLOs" },
  ];
}

const METRICS = [
  {
    label: "Answer Accuracy",
    value: "89%",
    target: "≥ 85%",
    icon: Target,
    progress: 89,
    status: "good" as const,
  },
  {
    label: "Ticket Deflection Rate",
    value: "67%",
    target: "≥ 60%",
    icon: TrendingUp,
    progress: 67,
    status: "good" as const,
  },
  {
    label: "p50 Latency",
    value: "2.1s",
    target: "≤ 3s",
    icon: Zap,
    progress: 70,
    status: "good" as const,
  },
  {
    label: "p95 Latency",
    value: "5.8s",
    target: "≤ 8s",
    icon: Clock,
    progress: 73,
    status: "good" as const,
  },
  {
    label: "Citation Coverage",
    value: "97%",
    target: "≥ 95%",
    icon: CheckCircle,
    progress: 97,
    status: "good" as const,
  },
  {
    label: "Guard Detection Rate",
    value: "96%",
    target: "≥ 95%",
    icon: Shield,
    progress: 96,
    status: "good" as const,
  },
  {
    label: "Avg Cost per Query",
    value: "$0.032",
    target: "≤ $0.05",
    icon: DollarSign,
    progress: 64,
    status: "good" as const,
  },
  {
    label: "System Uptime",
    value: "99.8%",
    target: "≥ 99.5%",
    icon: Activity,
    progress: 99.8,
    status: "good" as const,
  },
];

const RECENT_ALERTS = [
  {
    type: "success" as const,
    title: "SLO Achievement",
    message:
      "All performance SLOs met for the past 24 hours. Answer accuracy: 89%, p50 latency: 2.1s.",
    time: "2 hours ago",
  },
  {
    type: "success" as const,
    title: "Security Scan Passed",
    message:
      "Automated security tests passed. 0 injection attempts detected in production.",
    time: "4 hours ago",
  },
  {
    type: "warning" as const,
    title: "Cost Alert",
    message:
      "Token usage increased 15% this week due to higher query complexity. Still within budget.",
    time: "6 hours ago",
  },
  {
    type: "info" as const,
    title: "Model Update Available",
    message:
      "GPT-4 Turbo v2024-12-15 is available. Scheduled canary deployment for next maintenance window.",
    time: "1 day ago",
  },
];

export default function Metrics() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Metrics & Monitoring</h1>
        <p>Real-time performance metrics and SLO tracking</p>
      </div>

      <div className={styles.content}>
        {/* Key Metrics */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <Activity size={20} />
            </div>
            <h2>Key Performance Indicators</h2>
          </div>
          <div className={styles.metricsGrid}>
            {METRICS.map((metric) => (
              <div key={metric.label} className={styles.metricCard}>
                <div className={styles.metricHeader}>
                  <div className={styles.metricLabel}>{metric.label}</div>
                  <div className={styles.metricIcon}>
                    <metric.icon size={16} />
                  </div>
                </div>
                <div className={styles.metricValue}>{metric.value}</div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${metric.progress}%` }}
                  />
                </div>
                <div className={`${styles.metricTarget} ${styles[metric.status]}`}>
                  Target: {metric.target} ✓
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Alerts */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <Info size={20} />
            </div>
            <h2>Recent Alerts & Events</h2>
          </div>
          <div className={styles.alertsList}>
            {RECENT_ALERTS.map((alert, idx) => (
              <div key={idx} className={`${styles.alert} ${styles[alert.type]}`}>
                <div className={styles.alertIcon}>
                  {alert.type === "success" && <CheckCircle size={20} />}
                  {alert.type === "warning" && <AlertTriangle size={20} />}
                  {alert.type === "info" && <Info size={20} />}
                </div>
                <div className={styles.alertContent}>
                  <div className={styles.alertTitle}>{alert.title}</div>
                  <div className={styles.alertMessage}>{alert.message}</div>
                  <div className={styles.alertTime}>{alert.time}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Agent Performance */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <TrendingUp size={20} />
            </div>
            <h2>Agent Performance Breakdown</h2>
          </div>
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <div className={styles.metricLabel}>Supervisor Agent</div>
              </div>
              <div className={styles.metricValue}>142ms</div>
              <div className={styles.metricTarget}>Avg latency</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <div className={styles.metricLabel}>Retrieval Agent</div>
              </div>
              <div className={styles.metricValue}>387ms</div>
              <div className={styles.metricTarget}>Avg latency</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <div className={styles.metricLabel}>Guard Agent (Input)</div>
              </div>
              <div className={styles.metricValue}>98ms</div>
              <div className={styles.metricTarget}>Avg latency</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <div className={styles.metricLabel}>Guard Agent (Output)</div>
              </div>
              <div className={styles.metricValue}>103ms</div>
              <div className={styles.metricTarget}>Avg latency</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <div className={styles.metricLabel}>Tooling Agent</div>
              </div>
              <div className={styles.metricValue}>294ms</div>
              <div className={styles.metricTarget}>Avg latency</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <div className={styles.metricLabel}>Reviewer Agent</div>
              </div>
              <div className={styles.metricValue}>189ms</div>
              <div className={styles.metricTarget}>Avg latency</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
