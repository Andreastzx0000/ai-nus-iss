import { NavLink } from "react-router";
import {
  Bot,
  MessageSquare,
  Network,
  Ticket,
  Shield,
  BookOpen,
  Presentation,
  Activity,
} from "lucide-react";
import styles from "./app-nav.module.css";

export function AppNav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        <NavLink to="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Bot size={20} />
          </div>
          Service Desk Copilot
        </NavLink>

        <div className={styles.links}>
          <NavLink
            to="/presentation"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            <Presentation size={18} />
            Overview
          </NavLink>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            <MessageSquare size={18} />
            Chat
          </NavLink>
          <NavLink
            to="/architecture"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            <Network size={18} />
            Architecture
          </NavLink>
          <NavLink
            to="/tickets"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            <Ticket size={18} />
            Tickets
          </NavLink>
          <NavLink
            to="/security"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            <Shield size={18} />
            Security
          </NavLink>
          <NavLink
            to="/metrics"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            <Activity size={18} />
            Metrics
          </NavLink>
          <NavLink
            to="/documentation"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            <BookOpen size={18} />
            Docs
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
