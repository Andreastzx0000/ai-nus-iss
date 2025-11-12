/**
 * Main Copilot Service - Coordinates all agents and manages conversation flow
 */

import type { Message, Citation, ProvenanceRecord } from "~/types/agent";
import { SupervisorAgent } from "./agent-supervisor";
import { RetrievalAgent } from "./agent-retrieval";
import { GuardAgent } from "./agent-guard";

export class CopilotService {
  private supervisor = new SupervisorAgent();
  private retrieval = new RetrievalAgent();
  private guard = new GuardAgent();

  /**
   * Process user query through multi-agent workflow
   */
  async processQuery(
    userQuery: string
  ): Promise<{ response: Message; provenance: ProvenanceRecord }> {
    // Step 1: Guard input
    const inputGuard = await this.guard.screenInput(userQuery);
    if (!inputGuard.passed) {
      return {
        response: {
          id: `msg-${Date.now()}`,
          role: "assistant",
          content: `I cannot process this request due to security concerns: ${inputGuard.details}`,
          timestamp: new Date(),
        },
        provenance: this.createEmptyProvenance(userQuery, inputGuard),
      };
    }

    // Step 2: Classify intent
    const intent = await this.supervisor.classifyIntent(userQuery);

    // Step 3: Create execution plan
    const plan = await this.supervisor.createPlan(userQuery, intent);

    // Step 4: Retrieve relevant information
    const retrievalResult = await this.retrieval.retrieve(userQuery);
    const citations = this.retrieval.generateCitations(retrievalResult);

    // Step 5: Generate response based on intent
    let responseContent = "";
    if (intent === "policy_qa") {
      responseContent = this.generatePolicyAnswer(userQuery, retrievalResult);
    } else if (intent === "ticket_action") {
      responseContent = this.generateTicketActionResponse(
        userQuery,
        retrievalResult
      );
    } else {
      responseContent =
        "I'm not sure how to help with that. Could you rephrase your question about company policies, IT support, or HR matters?";
    }

    // Step 6: Guard output
    const outputGuard = await this.guard.screenOutput(responseContent);
    if (!outputGuard.passed) {
      responseContent =
        "I generated a response but it contained sensitive information that I cannot share. Please contact IT support directly.";
    }

    // Step 7: Execute plan and create provenance
    const provenance = await this.supervisor.execute(plan, userQuery);
    provenance.finalResponse = responseContent;
    provenance.citations = citations;

    return {
      response: {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
        citations,
        metadata: {
          intent,
          cost: plan.estimatedCost,
          latencyMs: provenance.totalLatencyMs,
        },
      },
      provenance,
    };
  }

  /**
   * Generate answer for policy questions
   */
  private generatePolicyAnswer(
    query: string,
    retrievalResult: any
  ): string {
    if (retrievalResult.passages.length === 0) {
      return "I couldn't find specific policy information about that. Please contact HR or check the employee handbook for more details.";
    }

    const topPassage = retrievalResult.passages[0];
    return `Based on our company policies:\n\n${topPassage.content}\n\nThis information is from: ${topPassage.source}`;
  }

  /**
   * Generate response for ticket actions
   */
  private generateTicketActionResponse(
    query: string,
    retrievalResult: any
  ): string {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("password reset")) {
      return `I can help you with a password reset. Here are your options:\n\n1. **Self-Service Portal**: Visit portal.company.com and use your registered mobile device for verification.\n2. **IT Service Desk**: I can create a ticket for manual reset (requires manager approval).\n\nWould you like me to create a ticket for you?`;
    }

    if (lowerQuery.includes("vpn") || lowerQuery.includes("access")) {
      return `For VPN or access issues:\n\n1. Verify you're using company-issued device or approved BYOD\n2. Ensure two-factor authentication is set up\n3. Check if you're on the latest VPN client version\n\nI can create a support ticket if the issue persists. Would you like me to do that?`;
    }

    return `I've searched our knowledge base for similar issues. I can create a support ticket for you. Please provide:\n\n- Brief description of the issue\n- Any error messages\n- When did this start?\n\nOr would you like to explore self-service options first?`;
  }

  /**
   * Create empty provenance for blocked requests
   */
  private createEmptyProvenance(
    query: string,
    guardResult: any
  ): ProvenanceRecord {
    return {
      requestId: `req-${Date.now()}`,
      timestamp: new Date(),
      userQuery: query,
      intent: "unknown",
      agentTasks: [],
      toolExecutions: [],
      guardResults: [guardResult],
      finalResponse: "Request blocked",
      citations: [],
      modelVersions: {
        supervisor: "gpt-4-turbo-2024",
        retrieval: "text-embedding-3-large",
        tooling: "gpt-4-turbo-2024",
        guard: "llama-guard-2",
        reviewer: "gpt-4-turbo-2024",
      },
      promptVersions: {
        supervisor: "v2.1",
        retrieval: "v1.5",
        tooling: "v2.0",
        guard: "v3.2",
        reviewer: "v1.8",
      },
      totalCost: 0.001,
      totalLatencyMs: 100,
    };
  }
}

// Singleton instance
export const copilotService = new CopilotService();
