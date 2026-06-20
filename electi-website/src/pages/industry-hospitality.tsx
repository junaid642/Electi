import { Coffee, Calendar, MessageCircle, Star, BarChart3, Bell, Users, Clock, Receipt } from "lucide-react";
import IndustrySubpage from "@/components/templates/IndustrySubpage";
import { AgentPhone } from "@/components/ui/PhoneShowcase";

function HospitalityDashboard() {
  return <AgentPhone index={3} />;
}

export default function HospitalityPage() {
  return (
    <IndustrySubpage
      badge="Hospitality"
      industryIcon={Coffee}
      title="The AI Concierge"
      titleAccent="Your Guests Deserve"
      tagline="Automate reservations, guest communications, and reviews — deliver 5-star experiences at scale."
      description="Electi transforms your hotel, resort, or restaurant into an AI-powered hospitality operation. From instant booking confirmations to personalized guest follow-ups, every guest interaction is handled with precision and warmth."
      challenge="Hospitality teams manage hundreds of guest interactions simultaneously — reservation requests, room service, local recommendations, check-ins, and reviews. Manual processes lead to slow responses, booking errors, and inconsistent guest experiences."
      solution="Electi's agents handle the entire guest journey automatically. Reservations are booked via WhatsApp 24/7. Guests receive personalized pre-arrival messages. Requests are handled instantly. Post-stay reviews are solicited automatically."
      stats={[
        { value: "4.8★", label: "Avg guest rating" },
        { value: "< 30s", label: "Booking confirmation" },
        { value: "35%", label: "More 5-star reviews" },
      ]}
      features={[
        { icon: Calendar,      title: "Reservation Automation",   desc: "Guests book directly via WhatsApp. Real-time availability check, instant confirmation, and calendar sync — no phone calls needed." },
        { icon: MessageCircle, title: "AI Concierge Service",     desc: "Answer questions about amenities, local attractions, restaurant hours, and room service — instantly and accurately, in Arabic and English." },
        { icon: Bell,          title: "Pre-Arrival Engagement",   desc: "Automated welcome messages, check-in instructions, and arrival details sent 24h before guests arrive." },
        { icon: Star,          title: "Review Automation",        desc: "Post-stay satisfaction surveys sent automatically. Positive guests directed to TripAdvisor and Google. Issues addressed before going public." },
        { icon: Receipt,       title: "F&B Billing Integration",  desc: "Restaurant and room service orders logged and billed automatically. Invoice ready at checkout." },
        { icon: BarChart3,     title: "Occupancy Analytics",      desc: "Real-time dashboard with occupancy rates, revenue per available room, booking source analytics, and seasonal trends." },
      ]}
      agents={[
        { title: "Sales Agent",    href: "/agents/sales",    icon: BarChart3,     tagline: "Reservations & bookings", bullets: ["Direct booking via WhatsApp", "Upsell room upgrades", "Group booking management", "Cancellation handling"], ctaLabel: "Request Demo", ctaHref: "/contact" },
        { title: "Personal Agent", href: "/agents/personal", icon: MessageCircle, tagline: "Staff coordination",      bullets: ["Team scheduling", "Shift reminders", "Manager briefings", "Guest request routing"] },
        { title: "Billing Agent",  href: "/agents/billing",  icon: Receipt,       tagline: "Revenue & invoicing",    bullets: ["Guest invoice generation", "Supplier payments", "Revenue reporting", "Expense tracking"] },
      ]}
      workflow={[
        { n: "01", title: "Booking Request",   desc: "Guest messages on WhatsApp. Agent confirms availability and price within seconds." },
        { n: "02", title: "Confirmed & Prepped", desc: "Booking confirmed. Pre-arrival message scheduled. Room preferences noted." },
        { n: "03", title: "In-Stay Support",   desc: "Agent handles all guest requests — room service, recommendations, maintenance." },
        { n: "04", title: "Post-Stay Review",  desc: "Check-out message + satisfaction survey. 5-star guests guided to public review." },
      ]}
      DashboardVisual={HospitalityDashboard}
      ctaTitle="Elevate Every Guest Experience"
      ctaSub="From boutique hotels to large resorts — Electi scales with your property and your guests' expectations."
      seoTitle="AI for Hospitality | Electi"
      seoDescription="Automate guest services, reservations, and hotel operations with AI agents built for modern hospitality businesses across Saudi Arabia and the GCC."
      seoPath="/industries/hospitality"
    />
  );
}
