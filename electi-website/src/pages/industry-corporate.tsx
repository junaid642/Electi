import { Briefcase, Users, BarChart3, Shield, MessageCircle, Receipt, TrendingUp, Globe, Database, Cpu } from "lucide-react";
import IndustrySubpage from "@/components/templates/IndustrySubpage";
import { AgentPhone } from "@/components/ui/PhoneShowcase";

function CorporateDashboard() {
  return <AgentPhone index={0} />;
}

export default function CorporatePage() {
  return (
    <IndustrySubpage
      badge="Corporate"
      industryIcon={Briefcase}
      title="Enterprise AI"
      titleAccent="For Every Department"
      tagline="Deploy an AI workforce across HR, Legal, Finance, and Sales — with enterprise security, compliance, and integration."
      description="Electi scales from a single department to company-wide AI automation. Built for enterprises that demand high availability, security compliance, custom integrations, and measurable ROI from every deployed agent."
      challenge="Large organizations lose thousands of hours monthly to manual processes across departments — HR onboarding, legal reviews, finance reconciliation, and sales follow-up. Siloed tools mean data doesn't flow, and inefficiencies compound at scale."
      solution="Electi deploys all four AI agents across your organization simultaneously. Each agent integrates with your existing enterprise tools — SAP, Salesforce, SharePoint, Oracle — and operates under your security and compliance framework."
      stats={[
        { value: "4 agents",  label: "Across all depts" },
        { value: "SOC 2",     label: "Type II compliant" },
        { value: "340h",      label: "Saved per month" },
      ]}
      features={[
        { icon: Users,     title: "HR Automation",             desc: "Onboarding workflows, leave management, policy Q&A, and labor law compliance — all automated via the Legal and Personal agents." },
        { icon: Shield,    title: "Legal & Compliance",        desc: "Contract reviews, regulatory monitoring, policy updates, and compliance tracking across all Saudi and GCC regulations." },
        { icon: Receipt,   title: "Finance Operations",        desc: "Invoice processing at scale, expense management, audit-ready reporting, and multi-ERP integration for enterprise finance teams." },
        { icon: BarChart3, title: "Sales Enablement",          desc: "CRM automation, lead scoring, follow-up sequences, and WhatsApp sales channels — deployed across your entire sales organization." },
        { icon: Database,  title: "Enterprise Integrations",   desc: "Native integrations with SAP, Salesforce, Oracle, SharePoint, HubSpot, Microsoft 365, and your custom enterprise systems via API." },
        { icon: Globe,     title: "Multi-Language, Multi-Site", desc: "Arabic and English across all agents. Deploy the same AI workforce across Riyadh, Dubai, London, and beyond from one dashboard." },
      ]}
      agents={[
        { title: "Personal Agent", href: "/agents/personal", icon: MessageCircle, tagline: "Executive & team productivity",  bullets: ["Executive assistant", "Meeting coordination", "Email management", "Cross-team comms"] },
        { title: "Billing Agent",  href: "/agents/billing",  icon: Receipt,       tagline: "Finance & procurement ops",      bullets: ["AP/AR automation", "Invoice processing", "Expense management", "Audit reports"] },
        { title: "Legal Agent",    href: "/agents/legal",    icon: Shield,        tagline: "Compliance & risk management",   bullets: ["Contract compliance", "Policy Q&A", "Regulatory alerts", "Labor law guidance"] },
        { title: "Sales Agent",    href: "/agents/sales",    icon: BarChart3,     tagline: "Revenue & customer operations",  bullets: ["CRM automation", "Lead management", "Customer support", "Pipeline analytics"], ctaLabel: "Request Demo", ctaHref: "/contact" },
      ]}
      workflow={[
        { n: "01", title: "Enterprise Setup",   desc: "SSO integration, user provisioning, and enterprise tool connections configured by our team." },
        { n: "02", title: "Agent Deployment",   desc: "All four agents deployed to relevant departments. Training data ingested from your systems." },
        { n: "03", title: "Workflow Automation", desc: "Agents begin handling tasks immediately. Existing workflows automated without disruption." },
        { n: "04", title: "Measure & Optimize", desc: "ROI dashboard tracks hours saved, error reduction, and business impact across all departments." },
      ]}
      DashboardVisual={CorporateDashboard}
      ctaTitle="Enterprise AI at Scale"
      ctaSub="Trusted by enterprise teams across Saudi Arabia and the GCC. SOC 2 Type II compliant. Dedicated implementation support."
      seoTitle="Enterprise AI Solutions | Electi"
      seoDescription="Deploy enterprise-grade AI workforce infrastructure for operational intelligence, automation, and corporate efficiency at scale across Saudi Arabia."
      seoPath="/industries/corporate"
    />
  );
}
