import { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  Loader2,
  Shield,
  FileQuestion,
  Key,
  HelpCircle,
  Settings,
} from "lucide-react";
import type { Message } from "~/types/agent";
import { copilotService } from "~/services/copilot-service";
import { ChatMessage } from "./chat-message";
import { Button } from "./ui/button/button";
import styles from "./chat-interface.module.css";

const SUGGESTED_QUERIES = [
  {
    icon: FileQuestion,
    text: "What is the VPN access policy?",
  },
  {
    icon: Key,
    text: "How do I reset my password?",
  },
  {
    icon: HelpCircle,
    text: "What are the travel expense limits?",
  },
  {
    icon: Shield,
    text: "How do I request software access?",
  },
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (queryText?: string) => {
    const query = queryText || input.trim();
    if (!query || isProcessing) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    try {
      const result = await copilotService.processQuery(query);
      setMessages((prev) => [...prev, result.response]);
    } catch (error) {
      const errorMessage: Message = {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content:
          "I apologize, but I encountered an error processing your request. Please try again or contact IT support.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestionClick = (text: string) => {
    handleSubmit(text);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerIcon}>
            <Bot size={24} />
          </div>
          <div className={styles.headerText}>
            <h1>Policy & IT Service Desk Copilot</h1>
            <p>
              Ask questions about company policies or get help with IT requests
            </p>
          </div>
        </div>
        <div className={styles.headerActions}>
          <Button variant="outline" size="sm">
            <Settings size={16} />
            Settings
          </Button>
        </div>
      </div>

      <div className={styles.messages}>
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Bot size={40} />
            </div>
            <h2>Welcome to the Service Desk Copilot</h2>
            <p>
              I can help you with HR policies, IT support requests, travel
              guidelines, benefits information, and more. All answers are backed
              by official company documentation.
            </p>
            <div className={styles.suggestions}>
              {SUGGESTED_QUERIES.map((suggestion, idx) => (
                <button
                  key={idx}
                  className={styles.suggestion}
                  onClick={() => handleSuggestionClick(suggestion.text)}
                >
                  <suggestion.icon size={18} />
                  {suggestion.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isProcessing && (
              <div className={styles.processing}>
                <Loader2 className={styles.spinner} size={18} />
                Processing your request through multi-agent workflow...
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className={styles.inputArea}>
        <div className={styles.inputWrapper}>
          <div className={styles.textareaWrapper}>
            <textarea
              ref={textareaRef}
              className={styles.textarea}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about policies, request IT support, or get help with HR questions..."
              disabled={isProcessing}
            />
          </div>
          <button
            className={styles.sendButton}
            onClick={() => handleSubmit()}
            disabled={!input.trim() || isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className={styles.spinner} size={18} />
                Processing
              </>
            ) : (
              <>
                <Send size={18} />
                Send
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
