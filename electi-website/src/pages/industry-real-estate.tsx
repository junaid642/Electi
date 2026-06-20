import { Home, Users, MessageCircle, Calendar, BarChart3, TrendingUp, MapPin, FileText, Receipt } from "lucide-react";
import IndustrySubpage from "@/components/templates/IndustrySubpage";
import { AgentPhone } from "@/components/ui/PhoneShowcase";

function RealEstateDashboard() {
  return <AgentPhone index={3} />;
}

export default function RealEstatePage() {
  return (
    <IndustrySubpage
      badge="Real Estate"
      industryIcon={Home}
      title="AI That Closes"
      titleAccent="More Deals"
      tagline="Qualify leads, book viewings, and nurture clients automatically — so your agents spend time selling, not chasing."
      description="From the first WhatsApp inquiry to signed contract, Electi automates every touchpoint in the real estate sales process. Respond instantly, never miss a lead, and close deals 3× faster."
      challenge="Real estate agents spend hours responding to unqualified inquiries, manually scheduling viewings, and following up with cold leads. Meanwhile, hot buyers slip away to faster-responding competitors."
      solution="Electi responds to every WhatsApp inquiry instantly, qualifies leads with smart questions, books viewings directly, and follows up automatically — all while feeding your CRM with complete interaction data."
      stats={[
        { value: "3×", label: "Faster deal cycle" },
        { value: "0s",  label: "Response time" },
        { value: "65%", label: "More viewings booked" },
      ]}
      features={[
        { icon: MessageCircle, title: "WhatsApp Lead Capture",     desc: "Respond to every property inquiry instantly. Capture name, budget, preferences, and timeline from the first message." },
        { icon: Calendar,      title: "Viewing Scheduler",          desc: "Customers book property viewings directly via WhatsApp. Agent checks availability and sends confirmations automatically." },
        { icon: Users,         title: "Client Nurturing",           desc: "Automated follow-up sequences keep prospects engaged with relevant property updates and market insights." },
        { icon: FileText,      title: "Contract Assistance",        desc: "Legal Agent reviews standard contracts, flags non-standard clauses, and guides clients through paperwork." },
        { icon: BarChart3,     title: "Pipeline Analytics",         desc: "Real-time visibility into lead sources, conversion rates, agent performance, and revenue forecasts." },
        { icon: TrendingUp,    title: "Market Intelligence",        desc: "AI-powered insights on comparable properties, area pricing trends, and optimal listing strategies." },
      ]}
      agents={[
        { title: "Sales Agent",    href: "/agents/sales",    icon: BarChart3,     tagline: "Lead management & bookings", bullets: ["Inquiry response", "Viewing scheduling", "Lead qualification", "Follow-up automation"], ctaLabel: "Request Demo", ctaHref: "/contact" },
        { title: "Legal Agent",    href: "/agents/legal",    icon: FileText,      tagline: "Contracts & compliance",     bullets: ["Contract review", "Title deed guidance", "RERA compliance", "Document prep"] },
        { title: "Personal Agent", href: "/agents/personal", icon: MessageCircle, tagline: "Agent productivity",         bullets: ["Calendar management", "Client reminders", "Email handling", "Task delegation"] },
      ]}
      workflow={[
        { n: "01", title: "Inquiry Received",   desc: "Buyer messages on WhatsApp. Agent responds instantly with property info and availability." },
        { n: "02", title: "Lead Qualified",     desc: "Smart questions capture budget, timeline, and preferences. Lead scored and logged to CRM." },
        { n: "03", title: "Viewing Booked",     desc: "Agent schedules viewing, sends property details, and adds to agent's calendar automatically." },
        { n: "04", title: "Post-Viewing Flow",  desc: "Follow-up sent within 2 hours. Objection handling, comparable properties, and next steps." },
      ]}
      DashboardVisual={RealEstateDashboard}
      ctaTitle="Never Lose Another Lead"
      ctaSub="Every inquiry answered instantly. Every lead nurtured automatically. Deploy Electi for your real estate business today."
      seoTitle="AI for Real Estate | Electi"
      seoDescription="Transform property management, tenant communications, and real estate lead conversion with conversational AI agents and WhatsApp automation."
      seoPath="/industries/real-estate"
    />
  );
}
