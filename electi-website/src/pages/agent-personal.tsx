import {
  MessageCircle, Bell, Mail, Calendar, Mic, LayoutDashboard,
  Users, Briefcase, Building, UserCircle, TrendingUp
} from "lucide-react";
import AgentSubpage from "@/components/templates/AgentSubpage";
import { AgentPhone } from "@/components/ui/PhoneShowcase";

function PersonalHeroMockup() {
  return <AgentPhone index={0} />;
}

export default function PersonalAgentPage() {
  return (
    <AgentSubpage
      badge="Personal Agent"
      icon={MessageCircle}
      title="Your AI Executive"
      titleAccent="Assistant"
      tagline="Available 24/7 via WhatsApp — manages your communications, calendar, and daily tasks without you lifting a finger."
      description="The Personal Agent acts as your intelligent executive assistant. It reads your emails, manages your calendar, sends reminders, and handles your daily workflow through a simple WhatsApp conversation."
      heroStats={[
        { value: "24/7", label: "Always on" },
        { value: "40h", label: "Saved/month" },
        { value: "99%", label: "Task accuracy" },
      ]}
      Mockup={PersonalHeroMockup}
      features={[
        {
          icon: MessageCircle,
          title: "WhatsApp Information AI Assistant",
          desc: "Send natural language commands through WhatsApp. The agent understands context, remembers previous conversations, and takes action instantly.",
        },
        {
          icon: Mail,
          title: "Intelligent Email Management",
          desc: "Connects to Gmail or Outlook. Reads, categorizes, and summarizes your inbox. Drafts replies, flags priorities, and filters noise.",
        },
        {
          icon: Calendar,
          title: "Smart Calendar Scheduling",
          desc: "Books meetings, resolves conflicts, sends invites, and syncs across Google Calendar and iCal automatically — no back-and-forth.",
        },
        {
          icon: Bell,
          title: "Context-Aware Reminders",
          desc: "Sets reminders based on conversation context. If you mention a deadline, it remembers. Pre-meeting prep reminders are auto-generated.",
        },
        {
          icon: Mic,
          title: "Voice Command Workflows",
          desc: "Send voice notes via WhatsApp. The agent transcribes, interprets, and executes — book meetings, send emails, or log tasks by voice.",
        },
        {
          icon: LayoutDashboard,
          title: "Productivity Dashboard",
          desc: "A real-time command center showing every action taken, task completed, and hour saved. Weekly summaries delivered every Sunday.",
        },
      ]}
      workflow={[
        { n: "01", title: "Connect WhatsApp", desc: "Link your number in 60 seconds. The agent immediately starts learning your patterns." },
        { n: "02", title: "Authorize Tools", desc: "Grant access to email and calendar. AES-256 encryption. Revoke anytime." },
        { n: "03", title: "Delegate Tasks", desc: "Message the agent naturally. 'Schedule a call with Ahmed tomorrow at 3pm' — done instantly." },
        { n: "04", title: "Monitor & Review", desc: "Check your dashboard for every action taken. Adjust preferences to refine behavior." },
      ]}
      useCases={[
        { icon: Briefcase, label: "Business Executives", desc: "C-level professionals who need instant task delegation without onboarding a human assistant." },
        { icon: Building, label: "Entrepreneurs", desc: "Founders managing multiple workstreams who can't afford to miss meetings or emails." },
        { icon: Users, label: "Remote Teams", desc: "Distributed professionals who need async task tracking and calendar coordination across time zones." },
        { icon: UserCircle, label: "Freelancers", desc: "Independent professionals managing client communications, invoices, and deadlines simultaneously." },
        { icon: TrendingUp, label: "Sales Professionals", desc: "Account managers who need rapid email responses and automated follow-up scheduling." },
        { icon: MessageCircle, label: "Personal Productivity", desc: "Anyone who wants their daily life better organized through a simple WhatsApp conversation." },
      ]}
      integrations={["WhatsApp Business", "Gmail", "Outlook", "Google Calendar", "iCal", "Microsoft Teams", "Notion", "Slack"]}
      ctaTitle="Deploy Your Personal Agent Today"
      ctaSub="Stop drowning in tasks. Let AI handle the routine so you can focus on what matters."
      seoTitle="Personal AI Agent | Electi"
      seoDescription="AI executive assistant available 24/7 via WhatsApp — manages communications, calendar, and daily tasks through conversational AI for business leaders."
      seoPath="/agents/personal"
    />
  );
}
