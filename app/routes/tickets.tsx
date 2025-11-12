import type { Route } from "./+types/tickets";
import {
  Ticket,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Bot,
  User,
  Calendar,
} from "lucide-react";
import { mockTickets } from "~/data/mock-tickets";
import styles from "./tickets.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tickets - Service Desk Copilot" },
    { name: "description", content: "IT service desk ticket dashboard" },
  ];
}

export default function Tickets() {
  const totalTickets = mockTickets.length;
  const aiAssistedCount = mockTickets.filter((t) => t.aiAssisted).length;
  const resolvedCount = mockTickets.filter(
    (t) => t.status === "resolved"
  ).length;
  const aiDeflectionRate = Math.round((aiAssistedCount / totalTickets) * 100);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Service Desk Tickets</h1>
        <p>AI-assisted ticket management and automation dashboard</p>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statLabel}>
            <Ticket size={18} />
            Total Tickets
          </div>
          <div className={styles.statValue}>{totalTickets}</div>
        </div>

        <div className={styles.stat}>
          <div className={styles.statLabel}>
            <Bot size={18} />
            AI Assisted
          </div>
          <div className={styles.statValue}>{aiAssistedCount}</div>
          <div className={styles.statChange}>
            <TrendingUp size={14} />
            {aiDeflectionRate}% of total
          </div>
        </div>

        <div className={styles.stat}>
          <div className={styles.statLabel}>
            <CheckCircle size={18} />
            Resolved
          </div>
          <div className={styles.statValue}>{resolvedCount}</div>
        </div>

        <div className={styles.stat}>
          <div className={styles.statLabel}>
            <Clock size={18} />
            Avg Resolution
          </div>
          <div className={styles.statValue}>2.4h</div>
          <div className={styles.statChange}>
            <TrendingUp size={14} />
            40% faster
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.ticketGrid}>
          {mockTickets.map((ticket) => (
            <div key={ticket.id} className={styles.ticket}>
              <div className={styles.ticketHeader}>
                <div className={styles.ticketTitle}>
                  <h3>{ticket.title}</h3>
                  <div className={styles.ticketId}>{ticket.id}</div>
                </div>
                <div className={styles.ticketBadges}>
                  <span
                    className={`${styles.badge} ${styles.status} ${styles[ticket.status]}`}
                  >
                    {ticket.status.replace("_", " ")}
                  </span>
                  <span
                    className={`${styles.badge} ${styles.priority} ${styles[ticket.priority]}`}
                  >
                    {ticket.priority}
                  </span>
                  {ticket.aiAssisted && (
                    <span className={`${styles.badge} ${styles.ai}`}>
                      <Bot size={12} />
                      AI
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.ticketDescription}>
                {ticket.description}
              </div>

              {ticket.tags.length > 0 && (
                <div className={styles.tags}>
                  {ticket.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className={styles.ticketMeta}>
                <div className={styles.metaItem}>
                  <User size={14} />
                  {ticket.createdBy.split("@")[0]}
                </div>
                <div className={styles.metaItem}>
                  <Calendar size={14} />
                  {ticket.createdAt.toLocaleDateString()}
                </div>
                {ticket.assignedTo && (
                  <div className={styles.metaItem}>
                    <AlertCircle size={14} />
                    {ticket.assignedTo}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
