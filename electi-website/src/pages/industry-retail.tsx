import { ShoppingBag, MessageCircle, BarChart3, Receipt, Tag, Users, TrendingUp, RefreshCw, Bell } from "lucide-react";
import IndustrySubpage from "@/components/templates/IndustrySubpage";
import { AgentPhone } from "@/components/ui/PhoneShowcase";

function RetailDashboard() {
  return <AgentPhone index={3} />;
}

export default function RetailPage() {
  return (
    <IndustrySubpage
      badge="Retail"
      industryIcon={ShoppingBag}
      title="AI Retail That"
      titleAccent="Drives Revenue"
      tagline="Engage customers, automate support, process returns, and run WhatsApp campaigns — all with AI."
      description="Retail success requires fast customer responses, accurate inventory tracking, efficient billing, and targeted marketing. Electi automates all four through AI agents that work 24/7 across your WhatsApp channels."
      challenge="Retail teams are stretched thin managing customer inquiries, processing returns, tracking inventory, and running promotional campaigns. Response delays lead to abandoned carts and lost sales."
      solution="Electi's agents respond to customer WhatsApp messages instantly, process orders and returns automatically, alert staff to low inventory, and send personalized promotions to segmented customer lists — all without manual work."
      stats={[
        { value: "2×",  label: "Conversion rate" },
        { value: "80%", label: "Faster support response" },
        { value: "45%", label: "Return processing speed" },
      ]}
      features={[
        { icon: MessageCircle, title: "Customer Support Automation", desc: "Answer product questions, order status, and return requests via WhatsApp 24/7. Route complex issues to staff seamlessly." },
        { icon: Tag,           title: "WhatsApp Marketing Campaigns", desc: "Segment your customer list and send personalized promotions, flash sales, and product launches directly via WhatsApp." },
        { icon: Receipt,       title: "Billing & Invoice Automation",  desc: "Process supplier invoices, generate customer receipts, and track all transactions automatically with OCR and AI." },
        { icon: RefreshCw,     title: "Returns & Refunds Processing", desc: "Customers initiate returns via WhatsApp. Agent validates eligibility, processes refunds, and updates inventory automatically." },
        { icon: Bell,          title: "Inventory Alerts",              desc: "Real-time stock monitoring. Automatic alerts when inventory falls below threshold. Reorder suggestions generated automatically." },
        { icon: BarChart3,     title: "Sales Analytics",               desc: "Daily sales reports, top-performing SKUs, customer lifetime value analysis, and campaign ROI — all generated automatically." },
      ]}
      agents={[
        { title: "Sales Agent",    href: "/agents/sales",    icon: BarChart3,     tagline: "Customer engagement",     bullets: ["Order confirmations", "Campaign sending", "Lead recovery", "Upsell automation"], ctaLabel: "Request Demo", ctaHref: "/contact" },
        { title: "Billing Agent",  href: "/agents/billing",  icon: Receipt,       tagline: "Transaction automation",  bullets: ["Supplier invoicing", "Customer receipts", "Expense tracking", "Tax reporting"] },
        { title: "Personal Agent", href: "/agents/personal", icon: MessageCircle, tagline: "Team & operations",       bullets: ["Staff schedules", "Manager briefings", "Supplier comms", "Task management"] },
      ]}
      workflow={[
        { n: "01", title: "Customer Messages",  desc: "Customer WhatsApps your store. Agent responds with product info, availability, or support." },
        { n: "02", title: "Order or Inquiry",   desc: "Agent processes order query, confirms availability, provides pricing and delivery info." },
        { n: "03", title: "Transaction Handled", desc: "Payment link sent, order confirmed, invoice generated and sent automatically." },
        { n: "04", title: "Follow-Up & Retain", desc: "Post-purchase satisfaction check. Loyalty offer sent. Customer added to re-engagement list." },
      ]}
      DashboardVisual={RetailDashboard}
      ctaTitle="Turn WhatsApp Into Your Top Sales Channel"
      ctaSub="Retail businesses using Electi see 2× conversion rates and 80% faster customer response times from day one."
      seoTitle="AI for Retail | Electi"
      seoDescription="Enhance customer experience, inventory management, and retail operations with conversational AI agents and WhatsApp integration."
      seoPath="/industries/retail"
    />
  );
}
