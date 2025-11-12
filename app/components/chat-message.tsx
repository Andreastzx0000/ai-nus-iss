import { Bot, User, FileText, TrendingUp } from "lucide-react";
import type { Message } from "~/types/agent";
import styles from "./chat-message.module.css";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`${styles.message} ${isUser ? styles.user : ""}`}>
      <div className={styles.avatar}>
        {isUser ? <User size={20} /> : <Bot size={20} />}
      </div>

      <div className={styles.content}>
        <div className={styles.bubble}>{message.content}</div>

        {message.citations && message.citations.length > 0 && (
          <div className={styles.citations}>
            {message.citations.map((citation) => (
              <div key={citation.id} className={styles.citation}>
                <div className={styles.citationHeader}>
                  <FileText size={14} />
                  <span>{citation.title}</span>
                  <span className={styles.confidence}>
                    <TrendingUp size={12} />
                    {Math.round(citation.confidence * 100)}%
                  </span>
                </div>
                <div className={styles.citationExcerpt}>
                  {citation.excerpt}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={styles.metadata}>
          <span>{message.timestamp.toLocaleTimeString()}</span>
          {message.metadata?.latencyMs && typeof message.metadata.latencyMs === 'number' ? (
            <span>• {message.metadata.latencyMs}ms</span>
          ) : null}
          {message.metadata?.cost && typeof message.metadata.cost === 'number' ? (
            <span>• ${message.metadata.cost.toFixed(4)}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
