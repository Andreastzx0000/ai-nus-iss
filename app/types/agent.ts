/**
 * Core Agent Types for Multi-Agent Service Desk System
 */

export type AgentRole =
  | "supervisor"
  | "retrieval"
  | "tooling"
  | "guard"
  | "reviewer";

export type IntentType = "policy_qa" | "ticket_action" | "unknown";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type AgentStatus = "idle" | "processing" | "completed" | "failed";

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  citations?: Citation[];
  metadata?: Record<string, unknown>;
}

export interface Citation {
  id: string;
  source: string;
  title: string;
  excerpt: string;
  url?: string;
  confidence: number;
}

export interface AgentTask {
  id: string;
  agentRole: AgentRole;
  description: string;
  status: AgentStatus;
  input: unknown;
  output?: unknown;
  error?: string;
  startTime: Date;
  endTime?: Date;
  metadata?: {
    modelVersion?: string;
    promptVersion?: string;
    tokensUsed?: number;
    latencyMs?: number;
  };
}

export interface GuardResult {
  passed: boolean;
  riskLevel: RiskLevel;
  flags: string[];
  details: string;
  blockedReasons?: string[];
}

export interface ToolExecution {
  id: string;
  toolName: string;
  parameters: Record<string, unknown>;
  result?: unknown;
  approved: boolean;
  approvedBy?: string;
  timestamp: Date;
  preConditionsMet: boolean;
  postConditionsVerified: boolean;
}

export interface RetrievalResult {
  passages: RetrievedPassage[];
  sources: string[];
  totalResults: number;
  queryLatencyMs: number;
}

export interface RetrievedPassage {
  id: string;
  content: string;
  source: string;
  score: number;
  metadata: {
    title: string;
    lastUpdated: Date;
    section?: string;
  };
}

export interface AgentPlan {
  steps: AgentTask[];
  intent: IntentType;
  requiresApproval: boolean;
  estimatedCost: number;
}

export interface ProvenanceRecord {
  requestId: string;
  timestamp: Date;
  userQuery: string;
  intent: IntentType;
  agentTasks: AgentTask[];
  toolExecutions: ToolExecution[];
  guardResults: GuardResult[];
  finalResponse: string;
  citations: Citation[];
  modelVersions: Record<AgentRole, string>;
  promptVersions: Record<AgentRole, string>;
  totalCost: number;
  totalLatencyMs: number;
}
