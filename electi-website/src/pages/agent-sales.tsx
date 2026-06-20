import {
  BarChart3, Database, TrendingUp, PhoneCall, Calendar,
  Users, Building, Coffee, Home, Heart, MessageCircle
} from "lucide-react";
import AgentSubpage from "@/components/templates/AgentSubpage";
import { AgentPhone } from "@/components/ui/PhoneShowcase";

function SalesHeroMockup() {
  return <AgentPhone index={3} />;
}

export default function SalesAgentPage() {
  return (
    <AgentSubpage
      badge="Sales & Reservation Agent"
      icon={BarChart3}
      title="Close Deals While"
      titleAccent="You Sleep"
      tagline="Handles customer inquiries, manages bookings, qualifies leads, and nurtures your entire pipeline via WhatsApp — 24/7."
      description="The Sales & Reservation Agent transforms your WhatsApp into a fully automated sales machine. It responds to customers instantly, books appointments, follows up on leads, and feeds your CRM — without any manual input."
      heroStats={[
        { value: "2×", label: "Conversion rate" },
        { value: "24/7", label: "Customer support" },
        { value: "< 30s", label: "Response time" },
      ]}
      Mockup={SalesHeroMockup}
      features={[
        {
          icon: Calendar,
          title: "Smart Reservation Management",
          desc: "Customers book directly via WhatsApp. The agent checks availability, confirms slots, sends reminders, and handles cancellations automatically.",
        },
        {
          icon: Database,
          title: "CRM Workflow Integration",
          desc: "Every lead, conversation, and deal update is automatically logged to your CRM. Pipelines stay current without manual entry.",
        },
        {
          icon: PhoneCall,
          title: "Lead Tracking & Scoring",
          desc: "Qualifies inbound leads with smart questions, scores them by intent, and routes hot leads to your sales team instantly.",
        },
        {
          icon: MessageCircle,
          title: "WhatsApp Customer Support",
          desc: "Instant, intelligent responses to customer queries, product questions, and complaints — in Arabic and English, around the clock.",
        },
        {
          icon: TrendingUp,
          title: "AI Sales Automation",
          desc: "Personalized follow-up sequences, upsell suggestions, and renewal reminders sent at exactly the right time.",
        },
        {
          icon: BarChart3,
          title: "Conversion Analytics",
          desc: "Track response rates, conversion funnels, booking completion, and revenue attribution from every WhatsApp interaction.",
        },
      ]}
      workflow={[
        { n: "01", title: "Customer Inquiry", desc: "Customer messages you on WhatsApp. Agent responds instantly — day or night." },
        { n: "02", title: "Qualify & Engage", desc: "Agent asks qualifying questions, captures contact info, and gauges buying intent." },
        { n: "03", title: "Book or Hand Off", desc: "Confirms reservation or books appointment. Hot leads are escalated to your team." },
        { n: "04", title: "Follow Up & Close", desc: "Automated follow-up sequences keep leads warm and drive conversion." },
      ]}
      useCases={[
        { icon: Building,     label: "Hotels & Resorts",   desc: "Automate room bookings, service requests, and guest communication at scale." },
        { icon: Heart,        label: "Medical Clinics",    desc: "Handle appointment bookings, reminders, and patient follow-ups without staff involvement." },
        { icon: Home,         label: "Real Estate",        desc: "Qualify leads, book viewings, and manage client follow-ups across your entire portfolio." },
        { icon: Coffee,       label: "Restaurants",        desc: "Accept table reservations, handle menu questions, and manage waitlists via WhatsApp." },
        { icon: Users,        label: "Customer Support",   desc: "Reduce ticket volume with AI that resolves common queries instantly." },
        { icon: BarChart3,    label: "Sales Teams",        desc: "Augment outbound sales with automated follow-up that never lets a lead go cold." },
      ]}
      integrations={["HubSpot", "Salesforce", "Zoho CRM", "WhatsApp Business", "Google Sheets", "Calendly", "Stripe", "Moyasar"]}
      ctaTitle="Turn WhatsApp Into Your Best Sales Channel"
      ctaSub="Deploy in minutes. Watch bookings and conversions grow from day one."
      primaryCtaLabel="Request Demo"
      primaryCtaHref="/contact"
      seoTitle="Sales AI Agent | Electi"
      seoDescription="AI-driven sales automation, lead nurturing, CRM updates, and customer engagement via WhatsApp — drive revenue with intelligent conversational AI."
      seoPath="/agents/sales"
    />
  );
}
