/**
 * Policy and Knowledge Base Types
 */

export type PolicyCategory =
  | "hr"
  | "it"
  | "security"
  | "travel"
  | "benefits"
  | "compliance"
  | "general";

export interface PolicyDocument {
  id: string;
  title: string;
  category: PolicyCategory;
  version: string;
  lastUpdated: Date;
  approvedBy: string;
  content: string;
  sections: PolicySection[];
  tags: string[];
  allowlisted: boolean;
}

export interface PolicySection {
  id: string;
  title: string;
  content: string;
  subsections?: PolicySection[];
}

export interface KnowledgeSource {
  id: string;
  name: string;
  type: "sharepoint" | "confluence" | "handbook" | "sop" | "faq";
  url: string;
  lastIndexed: Date;
  documentCount: number;
  allowlisted: boolean;
}
