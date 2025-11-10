/**
 * IT Service Desk Ticket Types
 */

export type TicketStatus =
  | "new"
  | "assigned"
  | "in_progress"
  | "pending_approval"
  | "resolved"
  | "closed";

export type TicketPriority = "low" | "medium" | "high" | "critical";

export type TicketCategory =
  | "access_request"
  | "password_reset"
  | "software_install"
  | "hardware_issue"
  | "network_problem"
  | "email_issue"
  | "policy_question"
  | "other";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  createdBy: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  tags: string[];
  relatedTickets: string[];
  aiAssisted: boolean;
  automationCandidate: boolean;
}

export interface TicketAction {
  id: string;
  ticketId: string;
  actionType: "create" | "update" | "assign" | "resolve" | "comment";
  description: string;
  performedBy: string;
  timestamp: Date;
  requiresApproval: boolean;
  approvedBy?: string;
  metadata?: Record<string, unknown>;
}

export interface TicketSummary {
  totalTickets: number;
  byStatus: Record<TicketStatus, number>;
  byPriority: Record<TicketPriority, number>;
  byCategory: Record<TicketCategory, number>;
  aiDeflectionRate: number;
  avgResolutionTimeHours: number;
}
