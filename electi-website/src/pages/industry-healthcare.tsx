import { Heart, Calendar, Receipt, MessageCircle, Bell, BarChart3, Users, Clipboard, Clock } from "lucide-react";
import IndustrySubpage from "@/components/templates/IndustrySubpage";
import { AgentPhone } from "@/components/ui/PhoneShowcase";

function HealthcareDashboard() {
  return <AgentPhone index={1} />;
}

export default function HealthcarePage() {
  return (
    <IndustrySubpage
      badge="Healthcare"
      industryIcon={Heart}
      title="AI for Modern"
      titleAccent="Clinics & Hospitals"
      tagline="Automate patient scheduling, billing, reminders, and communications — so your team focuses on care, not admin."
      description="Electi deploys specialized AI agents across your clinic's entire patient journey — from first inquiry to post-visit follow-up. Reduce no-shows by 60%, eliminate manual billing, and provide 24/7 WhatsApp support."
      challenge="Healthcare teams spend up to 40% of their time on administrative tasks — scheduling, billing, insurance queries, and patient reminders. This takes clinicians away from patients and drives up operational costs."
      solution="Electi's AI agents automate every administrative touchpoint. The Personal Agent handles scheduling and reminders. The Billing Agent processes insurance claims and invoices. The Sales Agent manages patient bookings — all via WhatsApp."
      stats={[
        { value: "60%", label: "Fewer no-shows" },
        { value: "40h", label: "Admin saved/week" },
        { value: "24/7", label: "Patient support" },
      ]}
      features={[
        { icon: Calendar,    title: "Appointment Scheduling",    desc: "Patients book via WhatsApp 24/7. Agent checks availability, confirms slots, and syncs to your clinic calendar instantly." },
        { icon: Bell,        title: "Smart Reminders",           desc: "Automated WhatsApp reminders 48h, 24h, and 2h before appointments. Confirmation requests reduce no-shows by 60%." },
        { icon: Receipt,     title: "Medical Billing Automation", desc: "OCR-powered invoice processing for supplier bills, patient invoices, and insurance claim documentation." },
        { icon: MessageCircle, title: "Patient Communication",   desc: "Answer common questions (clinic hours, services, doctors) instantly. Route complex queries to staff." },
        { icon: Clipboard,   title: "Patient Record Handling",   desc: "Receive pre-consultation forms via WhatsApp. Organize and file patient intake data automatically." },
        { icon: BarChart3,   title: "Operational Analytics",     desc: "Track appointment volumes, no-show rates, revenue per doctor, and peak hours — all in real time." },
      ]}
      agents={[
        { title: "Personal Agent", href: "/agents/personal", icon: MessageCircle, tagline: "Staff & admin coordination", bullets: ["Staff scheduling", "Internal reminders", "Meeting coordination", "Email management"] },
        { title: "Billing Agent",  href: "/agents/billing",  icon: Receipt,       tagline: "Medical billing automation", bullets: ["Insurance documents", "Supplier invoices", "Patient billing", "Expense tracking"] },
        { title: "Sales Agent",    href: "/agents/sales",    icon: BarChart3,     tagline: "Patient booking & follow-up", bullets: ["Appointment booking", "Follow-up messages", "No-show recovery", "Patient satisfaction"], ctaLabel: "Request Demo", ctaHref: "/contact" },
      ]}
      workflow={[
        { n: "01", title: "Patient Inquiry",    desc: "Patient messages clinic on WhatsApp. Agent responds instantly with availability and services." },
        { n: "02", title: "Book Appointment",   desc: "Patient selects slot. Agent confirms, adds to calendar, and sends intake form." },
        { n: "03", title: "Reminder Sequence",  desc: "48h and 2h reminders sent automatically. Confirmation reduces no-shows." },
        { n: "04", title: "Post-Visit Follow-up", desc: "Agent follows up with satisfaction survey and books next appointment if needed." },
      ]}
      DashboardVisual={HealthcareDashboard}
      ctaTitle="Ready to Transform Your Clinic?"
      ctaSub="Join healthcare providers across Saudi Arabia already using Electi to deliver better patient experiences."
      seoTitle="AI for Healthcare | Electi"
      seoDescription="Automate patient scheduling, medical billing, and clinic communications with AI agents designed for modern healthcare operations in Saudi Arabia."
      seoPath="/industries/healthcare"
    />
  );
}
