import type { Route } from "./+types/home";
import { ChatInterface } from "~/components/chat-interface";
import styles from "./home.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Policy & IT Service Desk Copilot" },
    {
      name: "description",
      content:
        "Multi-agent RAG system for enterprise HR/IT policy questions and service desk automation",
    },
  ];
}

export default function Home() {
  return (
    <div className={styles.container}>
      <ChatInterface />
    </div>
  );
}
