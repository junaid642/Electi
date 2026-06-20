import { HardHat, Users, Receipt, MessageCircle, BarChart3, Shield, ClipboardList, Truck, Clock } from "lucide-react";
import IndustrySubpage from "@/components/templates/IndustrySubpage";
import { AgentPhone } from "@/components/ui/PhoneShowcase";

function ConstructionDashboard() {
  return <AgentPhone index={2} />;
}

export default function ConstructionPage() {
  return (
    <IndustrySubpage
      badge="Construction"
      industryIcon={HardHat}
      title="AI Operations for"
      titleAccent="Construction Companies"
      tagline="Coordinate contractors, automate billing, track compliance, and keep every project on schedule with AI."
      description="Construction operations involve hundreds of moving parts — subcontractors, materials, timelines, compliance docs, and budgets. Electi's AI agents automate the coordination layer so your PMs can focus on building."
      challenge="Construction companies lose hours daily to manual coordination — chasing subcontractor updates, processing supplier invoices, tracking compliance deadlines, and managing communication across multiple project sites."
      solution="Electi automates contractor coordination via WhatsApp, processes supplier invoices with OCR, tracks compliance documentation, and generates daily project status reports — all without your team lifting a finger."
      stats={[
        { value: "40h", label: "Saved per project/week" },
        { value: "95%", label: "Invoice accuracy" },
        { value: "Zero", label: "Missed deadlines" },
      ]}
      features={[
        { icon: Users,         title: "Contractor Coordination",  desc: "Broadcast daily briefings, collect status updates, and manage site communications across multiple teams via WhatsApp." },
        { icon: Receipt,       title: "Supplier Invoice Automation", desc: "OCR scans contractor invoices automatically. Payment schedules tracked and reminders sent before due dates." },
        { icon: Shield,        title: "Compliance Documentation", desc: "Track safety certifications, labor permits, and regulatory filings. Alerts sent before expiry dates." },
        { icon: ClipboardList, title: "Progress Reporting",       desc: "Daily automated reports compiled from WhatsApp updates. Sent to project managers and clients on schedule." },
        { icon: Truck,         title: "Materials & Logistics",    desc: "Track material deliveries, flag delays, and coordinate logistics across suppliers and sites automatically." },
        { icon: BarChart3,     title: "Budget Tracking",          desc: "Real-time spend tracking against project budgets. Variance alerts and forecast-to-complete calculations." },
      ]}
      agents={[
        { title: "Personal Agent", href: "/agents/personal", icon: MessageCircle, tagline: "PM & team coordination",    bullets: ["Daily briefings", "Meeting scheduling", "Status collection", "Deadline reminders"] },
        { title: "Billing Agent",  href: "/agents/billing",  icon: Receipt,       tagline: "Project billing & expenses", bullets: ["Supplier invoice OCR", "Payment tracking", "Budget variance", "Financial reports"] },
        { title: "Legal Agent",    href: "/agents/legal",    icon: Shield,        tagline: "Compliance & contracts",     bullets: ["Labor permits", "Safety compliance", "Contract review", "Regulatory filings"] },
      ]}
      workflow={[
        { n: "01", title: "Morning Briefing",   desc: "AI sends daily briefing to all site supervisors. Requests updates on progress and issues." },
        { n: "02", title: "Progress Collected", desc: "Teams respond via WhatsApp. Agent compiles updates into structured progress report." },
        { n: "03", title: "Issues Flagged",     desc: "Delays, safety issues, and budget variances are flagged and escalated to PM automatically." },
        { n: "04", title: "Reports Distributed", desc: "End-of-day report sent to stakeholders. Compliance tracker and billing updated." },
      ]}
      DashboardVisual={ConstructionDashboard}
      ctaTitle="Keep Every Project on Track"
      ctaSub="Construction AI that coordinates your teams, processes your invoices, and keeps your compliance in order."
      seoTitle="AI for Construction | Electi"
      seoDescription="Streamline project management, supplier coordination, and site operations with AI workforce automation built for construction companies."
      seoPath="/industries/construction"
    />
  );
}
