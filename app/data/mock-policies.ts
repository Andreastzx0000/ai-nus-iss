import type { PolicyDocument, KnowledgeSource } from "~/types/policy";

export const mockPolicies: PolicyDocument[] = [
  {
    id: "pol-001",
    title: "Remote Work and VPN Access Policy",
    category: "it",
    version: "2.1",
    lastUpdated: new Date("2024-11-15"),
    approvedBy: "IT Security Committee",
    content:
      "This policy outlines the requirements for remote work access and VPN usage.",
    sections: [
      {
        id: "sec-001",
        title: "VPN Access Requirements",
        content:
          "All employees working remotely must connect via the company VPN. VPN credentials are issued through the IT service portal. Two-factor authentication is mandatory for all VPN connections.",
      },
      {
        id: "sec-002",
        title: "Approved Devices",
        content:
          "Only company-issued laptops or approved BYOD devices enrolled in MDM are permitted for remote access. Personal devices must be registered and approved by IT Security before VPN access is granted.",
      },
      {
        id: "sec-003",
        title: "Data Security",
        content:
          "Company data must not be stored on local drives. All work files must be saved to approved cloud storage (OneDrive, SharePoint). USB drives are prohibited for company data transfer.",
      },
    ],
    tags: ["remote work", "vpn", "security", "access"],
    allowlisted: true,
  },
  {
    id: "pol-002",
    title: "Password and Account Security Policy",
    category: "security",
    version: "3.0",
    lastUpdated: new Date("2024-12-01"),
    approvedBy: "Chief Information Security Officer",
    content:
      "This policy defines password requirements and account security standards.",
    sections: [
      {
        id: "sec-004",
        title: "Password Requirements",
        content:
          "Passwords must be at least 12 characters long and include uppercase, lowercase, numbers, and special characters. Passwords expire every 90 days. Password reuse from the last 12 passwords is prohibited.",
      },
      {
        id: "sec-005",
        title: "Password Reset Process",
        content:
          "Employees can reset passwords through the self-service portal using their registered mobile device for verification. IT service desk can reset passwords after identity verification via manager approval or security questions.",
      },
      {
        id: "sec-006",
        title: "Multi-Factor Authentication",
        content:
          "MFA is required for all corporate accounts. Approved MFA methods include Microsoft Authenticator, hardware tokens, or SMS to registered mobile numbers.",
      },
    ],
    tags: ["password", "security", "mfa", "authentication"],
    allowlisted: true,
  },
  {
    id: "pol-003",
    title: "Travel and Expense Reimbursement Policy",
    category: "travel",
    version: "1.5",
    lastUpdated: new Date("2024-10-20"),
    approvedBy: "CFO",
    content:
      "This policy governs business travel booking and expense reimbursement.",
    sections: [
      {
        id: "sec-007",
        title: "Travel Booking",
        content:
          "All business travel must be booked through the approved corporate travel portal. Flights should be economy class for domestic and business class for international flights over 6 hours. Hotel bookings must be within the approved per-diem rates.",
      },
      {
        id: "sec-008",
        title: "Expense Submission",
        content:
          "Expenses must be submitted within 30 days of travel completion. All receipts must be attached. Meals are reimbursed up to $75/day domestic, $100/day international. Alcohol is not reimbursable.",
      },
    ],
    tags: ["travel", "expenses", "reimbursement"],
    allowlisted: true,
  },
  {
    id: "pol-004",
    title: "Employee Benefits and Time Off Policy",
    category: "benefits",
    version: "2.3",
    lastUpdated: new Date("2024-09-15"),
    approvedBy: "Head of HR",
    content:
      "This policy outlines employee benefits, vacation, and leave entitlements.",
    sections: [
      {
        id: "sec-009",
        title: "Paid Time Off (PTO)",
        content:
          "Employees accrue 15 days of PTO annually in their first year, increasing to 20 days after 3 years. PTO requests must be submitted at least 2 weeks in advance for approval. Unused PTO rolls over up to 5 days annually.",
      },
      {
        id: "sec-010",
        title: "Health Insurance",
        content:
          "Company provides comprehensive health insurance with employee coverage at no cost. Dependent coverage is available at subsidized rates. Open enrollment occurs annually in November.",
      },
      {
        id: "sec-011",
        title: "Sick Leave",
        content:
          "Employees receive 10 days of sick leave annually, non-rollover. Medical documentation required for absences exceeding 3 consecutive days.",
      },
    ],
    tags: ["benefits", "pto", "health", "leave"],
    allowlisted: true,
  },
  {
    id: "pol-005",
    title: "Software and Application Access Policy",
    category: "it",
    version: "1.8",
    lastUpdated: new Date("2024-12-10"),
    approvedBy: "IT Director",
    content:
      "This policy governs software installation and application access requests.",
    sections: [
      {
        id: "sec-012",
        title: "Software Installation",
        content:
          "Only IT-approved software may be installed on company devices. Submit requests through the IT portal. Standard software (Office 365, browsers, PDF readers) is pre-approved. Specialized software requires manager approval.",
      },
      {
        id: "sec-013",
        title: "Cloud Application Access",
        content:
          "Access to SaaS applications (Salesforce, Jira, etc.) requires manager approval. Access is granted based on role and follows least-privilege principle. Annual access reviews are conducted.",
      },
    ],
    tags: ["software", "access", "applications", "approval"],
    allowlisted: true,
  },
];

export const mockKnowledgeSources: KnowledgeSource[] = [
  {
    id: "ks-001",
    name: "Employee Handbook",
    type: "handbook",
    url: "https://intranet.company.com/handbook",
    lastIndexed: new Date("2024-12-15"),
    documentCount: 45,
    allowlisted: true,
  },
  {
    id: "ks-002",
    name: "IT Knowledge Base (SharePoint)",
    type: "sharepoint",
    url: "https://company.sharepoint.com/it-kb",
    lastIndexed: new Date("2024-12-18"),
    documentCount: 128,
    allowlisted: true,
  },
  {
    id: "ks-003",
    name: "HR Policies (Confluence)",
    type: "confluence",
    url: "https://company.atlassian.net/hr",
    lastIndexed: new Date("2024-12-10"),
    documentCount: 67,
    allowlisted: true,
  },
  {
    id: "ks-004",
    name: "Security SOPs",
    type: "sop",
    url: "https://intranet.company.com/security/sops",
    lastIndexed: new Date("2024-12-12"),
    documentCount: 34,
    allowlisted: true,
  },
  {
    id: "ks-005",
    name: "IT Service Desk FAQ",
    type: "faq",
    url: "https://support.company.com/faq",
    lastIndexed: new Date("2024-12-20"),
    documentCount: 89,
    allowlisted: true,
  },
];
