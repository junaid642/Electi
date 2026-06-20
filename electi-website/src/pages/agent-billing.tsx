import {
  Receipt, ScanLine, DollarSign, BarChart3, FileText,
  Tag, Building, Coffee, Heart, ShoppingBag, Briefcase
} from "lucide-react";
import AgentSubpage from "@/components/templates/AgentSubpage";
import { AgentPhone } from "@/components/ui/PhoneShowcase";

function BillingHeroMockup() {
  return <AgentPhone index={1} />;
}

export default function BillingAgentPage() {
  return (
    <AgentSubpage
      badge="Invoice Agent"
      icon={Receipt}
      title="Zero-Touch"
      titleAccent="Invoice Automation"
      tagline="Scan, process, and categorize every bill and invoice automatically — no manual data entry, ever."
      description="The Invoice Agent uses advanced OCR and AI to transform physical and digital documents into structured financial data. It tracks expenses, generates reports, and automates your entire billing workflow."
      heroStats={[
        { value: "95%", label: "OCR accuracy" },
        { value: "< 30s", label: "Per invoice" },
        { value: "SAR 0", label: "Manual entry cost" },
      ]}
      Mockup={BillingHeroMockup}
      features={[
        {
          icon: ScanLine,
          title: "AI-Powered OCR Scanning",
          desc: "Photograph any bill, receipt, or invoice. The agent extracts vendor, amount, date, tax, and line items with 95%+ accuracy using computer vision.",
        },
        {
          icon: FileText,
          title: "Physical → Digital Conversion",
          desc: "Convert paper invoices to structured digital records instantly. Export to PDF, Excel, or directly to your accounting software.",
        },
        {
          icon: DollarSign,
          title: "Smart Expense Tracking",
          desc: "Every expense is automatically categorized by vendor type, department, or project. Track spending limits and get alerts when thresholds are exceeded.",
        },
        {
          icon: Tag,
          title: "Intelligent Categorization",
          desc: "Machine learning models categorize expenses accurately from day one, and get smarter with every document processed.",
        },
        {
          icon: BarChart3,
          title: "Financial Analytics Dashboard",
          desc: "Monthly, quarterly, and annual expense reports with trend analysis, cost breakdowns, and budget variance — all generated automatically.",
        },
        {
          icon: Receipt,
          title: "Payment Reminder System",
          desc: "Never miss a payment deadline. The agent tracks due dates and sends WhatsApp reminders before payments are due.",
        },
      ]}
      workflow={[
        { n: "01", title: "Capture Document", desc: "Take a photo or upload a PDF of any bill, invoice, or receipt via WhatsApp." },
        { n: "02", title: "AI Extraction", desc: "OCR engine extracts all fields: vendor, amount, date, line items, tax, totals." },
        { n: "03", title: "Auto-Categorize", desc: "AI classifies the expense type and maps it to your chart of accounts." },
        { n: "04", title: "Sync & Report", desc: "Data syncs to your accounting software. Automated reports generated weekly." },
      ]}
      useCases={[
        { icon: Heart,      label: "Medical Clinics",   desc: "Automate supplier invoices, medical equipment billing, and insurance claim documentation." },
        { icon: Coffee,     label: "Restaurants",       desc: "Track ingredient costs, supplier invoices, and utility bills across multiple locations." },
        { icon: Building,   label: "Hotels",            desc: "Manage vendor invoices, maintenance costs, and supplier contracts at scale." },
        { icon: ShoppingBag, label: "Retail Businesses", desc: "Process supplier invoices, manage inventory costs, and track promotional spending." },
        { icon: Briefcase,  label: "Corporate Finance", desc: "Enterprise-grade expense management with multi-department tracking and approval workflows." },
        { icon: Receipt,    label: "Accounting Firms",  desc: "Process client documents faster. Handle hundreds of invoices per day without adding headcount." },
      ]}
      integrations={["QuickBooks", "SAP", "Xero", "Zoho Books", "Oracle ERP", "WhatsApp", "Google Drive", "Dropbox"]}
      ctaTitle="Eliminate Manual Invoice Processing"
      ctaSub="Your billing agent is ready to process thousands of invoices per month — starting from day one."
      seoTitle="Billing AI Agent | Electi"
      seoDescription="Automate invoicing, expense tracking, and financial workflows with Electi's AI Billing Agent — OCR-powered invoice processing and billing intelligence."
      seoPath="/agents/billing"
    />
  );
}
