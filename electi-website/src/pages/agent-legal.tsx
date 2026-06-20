import {
  Scale, BookOpen, UserCheck, Shield, FileSearch, Globe,
  Users, Briefcase, Building, GraduationCap, Star
} from "lucide-react";
import AgentSubpage from "@/components/templates/AgentSubpage";
import { AgentPhone } from "@/components/ui/PhoneShowcase";

function LegalHeroMockup() {
  return <AgentPhone index={2} />;
}

export default function LegalAgentPage() {
  return (
    <AgentSubpage
      badge="Legal Agent"
      icon={Scale}
      title="Your Saudi Legal"
      titleAccent="Information AI Assistant"
      tagline="Expert guidance on Saudi law, visas, labor regulations, and compliance — available instantly via WhatsApp."
      description="The Legal Agent is trained on current Saudi Arabian law, regulations, and government procedures. It answers complex legal questions, guides visa applications, reviews contracts, and keeps your business compliant — in Arabic and English."
      heroStats={[
        { value: "100+", label: "Saudi laws covered" },
        { value: "< 2s", label: "Answer time" },
        { value: "AR/EN", label: "Bilingual" },
      ]}
      Mockup={LegalHeroMockup}
      features={[
        {
          icon: BookOpen,
          title: "Saudi Labor Law Guidance",
          desc: "Instant answers on employment contracts, annual leave, termination rights, GOSI contributions, and labor dispute procedures.",
        },
        {
          icon: Globe,
          title: "Visa & Iqama Assistance",
          desc: "Step-by-step guidance for work visas, iqama renewals, dependent visas, exit re-entry permits, and residency applications.",
        },
        {
          icon: Building,
          title: "Company Formation Support",
          desc: "Guides you through MISA registration, commercial registration, municipal licenses, and free zone entity setup.",
        },
        {
          icon: Shield,
          title: "Contract Review Support",
          desc: "Upload employment, vendor, or service contracts. The agent flags non-compliant clauses and suggests Saudi law-aligned alternatives.",
        },
        {
          icon: FileSearch,
          title: "Compliance Monitoring",
          desc: "Tracks regulatory changes that affect your business. Sends alerts when new laws or government circulars require action.",
        },
        {
          icon: GraduationCap,
          title: "Legal Knowledge Base",
          desc: "Continuously updated with the latest from MHRSD, MISA, ZATCA, and other Saudi government authorities.",
        },
      ]}
      workflow={[
        { n: "01", title: "Ask Your Question", desc: "Message the Legal Agent via WhatsApp in Arabic or English — any legal topic." },
        { n: "02", title: "AI Searches Law", desc: "Agent searches the full Saudi legal corpus and cross-references relevant articles." },
        { n: "03", title: "Structured Answer", desc: "Receives a clear, cited answer with the exact law reference and practical guidance." },
        { n: "04", title: "Document & Track", desc: "All queries are logged. Compliance tracking updates automatically when laws change." },
      ]}
      useCases={[
        { icon: Globe,      label: "Expatriates & Expats", desc: "Navigate Saudi visa systems, iqama requirements, and employment rights with confidence." },
        { icon: Building,   label: "SMBs & Startups",    desc: "Get company formation guidance, commercial registration steps, and compliance checks." },
        { icon: Users,      label: "HR Departments",     desc: "Instant labor law answers for HR policies, contracts, and employee disputes." },
        { icon: Briefcase,  label: "Lawyers & Advisors", desc: "Augment your practice with fast legal research and document review support." },
        { icon: Star,       label: "GCC Businesses",     desc: "Expanding into Saudi? Get regulatory guidance for market entry and operations." },
        { icon: Shield,     label: "Corporate Legal Teams", desc: "Track compliance across departments and get real-time alerts on regulatory changes." },
      ]}
      integrations={["WhatsApp Business", "MHRSD Portal", "MISA Portal", "ABSHER", "Google Drive", "SharePoint", "DocuSign"]}
      ctaTitle="Get Legal Clarity in Seconds"
      ctaSub="Stop paying for basic legal questions. Deploy your Legal Agent and get instant, reliable Saudi law guidance."
      seoTitle="Legal AI Agent | Electi"
      seoDescription="AI-powered legal workflow automation for Saudi law guidance, contract review, compliance monitoring, and legal document management."
      seoPath="/agents/legal"
    />
  );
}
