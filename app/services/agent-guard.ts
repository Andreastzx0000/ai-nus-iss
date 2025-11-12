/**
 * Guard Agent - Screens inputs/outputs for security risks
 * Detects injection, PII, sensitive data, and policy violations
 */

import type { GuardResult, RiskLevel } from "~/types/agent";

export class GuardAgent {
  // Patterns for common injection attempts
  private readonly injectionPatterns = [
    /ignore\s+(previous|all|above)\s+instructions?/i,
    /system\s*:\s*you\s+are/i,
    /new\s+instructions?:/i,
    /<\s*script/i,
    /SELECT\s+.*\s+FROM/i,
    /DROP\s+TABLE/i,
    /\b(eval|exec|system)\s*\(/i,
  ];

  // Patterns for PII detection
  private readonly piiPatterns = [
    /\b\d{3}-\d{2}-\d{4}\b/, // SSN
    /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/, // Credit card
    /\b[A-Z]{2}\d{6,8}\b/, // Passport-like
  ];

  /**
   * Screen input for security risks
   */
  async screenInput(input: string): Promise<GuardResult> {
    const flags: string[] = [];
    let riskLevel: RiskLevel = "low";

    // Check for injection patterns
    for (const pattern of this.injectionPatterns) {
      if (pattern.test(input)) {
        flags.push("Potential prompt injection detected");
        riskLevel = "high";
      }
    }

    // Check for PII
    for (const pattern of this.piiPatterns) {
      if (pattern.test(input)) {
        flags.push("Potential PII detected");
        riskLevel = this.escalateRisk(riskLevel, "medium");
      }
    }

    // Check for excessive length (potential DOS)
    if (input.length > 5000) {
      flags.push("Input exceeds length limits");
      riskLevel = this.escalateRisk(riskLevel, "medium");
    }

    const passed = riskLevel === "low" || riskLevel === "medium";

    return {
      passed,
      riskLevel,
      flags,
      details: flags.length > 0 ? flags.join("; ") : "Input passed all checks",
      blockedReasons: !passed ? flags : undefined,
    };
  }

  /**
   * Screen output for sensitive data leakage
   */
  async screenOutput(output: string): Promise<GuardResult> {
    const flags: string[] = [];
    let riskLevel: RiskLevel = "low";

    // Check for PII in output
    for (const pattern of this.piiPatterns) {
      if (pattern.test(output)) {
        flags.push("PII detected in output");
        riskLevel = "high";
      }
    }

    // Check for common sensitive keywords
    const sensitiveKeywords = [
      "password",
      "secret",
      "api_key",
      "token",
      "credential",
    ];
    for (const keyword of sensitiveKeywords) {
      const regex = new RegExp(`${keyword}\\s*[:=]\\s*\\S+`, "i");
      if (regex.test(output)) {
        flags.push(`Potential ${keyword} exposure in output`);
        riskLevel = this.escalateRisk(riskLevel, "high");
      }
    }

    const passed = riskLevel !== "critical" && riskLevel !== "high";

    return {
      passed,
      riskLevel,
      flags,
      details:
        flags.length > 0 ? flags.join("; ") : "Output passed all checks",
      blockedReasons: !passed ? flags : undefined,
    };
  }

  /**
   * Escalate risk level if new risk is higher
   */
  private escalateRisk(current: RiskLevel, detected: RiskLevel): RiskLevel {
    const levels: RiskLevel[] = ["low", "medium", "high", "critical"];
    const currentIdx = levels.indexOf(current);
    const detectedIdx = levels.indexOf(detected);
    return levels[Math.max(currentIdx, detectedIdx)];
  }
}
