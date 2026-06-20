import { Headphones, MessageSquare, Zap, BarChart3, Globe, Shield, Clock, Star, Users, ShoppingCart, Building2, Phone } from "lucide-react";
import MarketplacePage from "@/components/templates/MarketplacePage";

export default function AICustomerSupportPage() {
  return (
    <MarketplacePage
      badge="AI Customer Support"
      badgeAr="دعم العملاء الذكي"
      icon={Headphones}
      title="AI Customer Support"
      titleAr="دعم العملاء الذكي"
      titleAccent="That Delights Customers"
      tagline="Resolve 80% of customer issues instantly, in Arabic and English, across every channel."
      taglineAr="حل 80% من مشكلات العملاء فوراً، بالعربية والإنجليزية، عبر كل القنوات."
      description="Electi's AI Customer Support Agent handles queries, complaints, returns, and escalations across WhatsApp, website chat, and voice — giving your customers instant resolution while reducing your support costs by up to 70%."
      descriptionAr="يتعامل وكيل دعم العملاء من Electi مع الاستفسارات والشكاوى والإرجاعات والتصعيدات عبر واتساب ودردشة الموقع والصوت — مع تخفيض تكاليف الدعم بما يصل إلى 70%."
      heroStats={[
        { value: "80%", label: "Auto-Resolved", labelAr: "حُل تلقائياً" },
        { value: "< 2s", label: "First Response", labelAr: "أول رد" },
        { value: "70%", label: "Cost Reduction", labelAr: "توفير التكاليف" },
        { value: "4.9★", label: "Avg CSAT Score", labelAr: "رضا العملاء" },
      ]}
      features={[
        { icon: Zap, title: "Instant Resolution", desc: "Resolves the majority of tickets without human involvement — order status, returns, account issues, and FAQs." },
        { icon: Globe, title: "Omnichannel Support", desc: "Single agent across WhatsApp, website chat, email, and voice — with full conversation history across channels." },
        { icon: BarChart3, title: "Support Analytics", desc: "Track resolution rates, CSAT scores, peak times, and common issue categories to continuously improve." },
        { icon: Shield, title: "Smart Escalation", desc: "Detects emotional tone and complexity, escalating to human agents when needed with full context." },
        { icon: MessageSquare, title: "Knowledge Base Integration", desc: "Pulls from your product docs, FAQs, and policies to give accurate, up-to-date answers." },
        { icon: Clock, title: "24/7 Coverage", desc: "Your customers get help at 2am on a Friday as easily as at 10am on Monday." },
      ]}
      useCases={[
        { icon: ShoppingCart, label: "E-commerce Returns", desc: "Handle return requests, exchange policies, and refund status automatically." },
        { icon: Building2, label: "Utility Complaints", desc: "Log and track service complaints, provide status updates, and escalate emergencies." },
        { icon: Star, label: "Restaurant Orders", desc: "Handle order status, delivery issues, and menu queries without staff intervention." },
        { icon: Users, label: "Banking Queries", desc: "Answer balance, transaction, and card queries within compliance boundaries." },
        { icon: Phone, label: "Telecom Support", desc: "Handle plan queries, bill disputes, and technical troubleshooting at scale." },
        { icon: Headphones, label: "SaaS Support", desc: "Guide users through features, handle bug reports, and manage subscription changes." },
      ]}
      industries={["E-commerce", "Banking & Finance", "Telecom", "Retail", "Hospitality", "Healthcare", "Utilities", "Government", "Real Estate", "Technology"]}
      industriesAr={["التجارة الإلكترونية", "البنوك والمالية", "الاتصالات", "التجزئة", "الضيافة", "الرعاية الصحية", "المرافق", "الحكومي", "العقارات", "التكنولوجيا"]}
      benefits={[
        { title: "80% auto-resolution", desc: "Most tickets resolved without a single human touch." },
        { title: "70% cost reduction", desc: "Dramatically lower support team headcount and costs." },
        { title: "Always available", desc: "24/7/365 support with zero sick days or staff turnover." },
        { title: "Consistent quality", desc: "Every customer gets the same high-quality response, every time." },
      ]}
      benefitsAr={[
        { title: "80% حل تلقائي", desc: "معظم التذاكر تُحل دون أي تدخل بشري." },
        { title: "تخفيض 70% من التكاليف", desc: "خفّض عدد فريق الدعم وتكاليفه بشكل كبير." },
        { title: "متاح دائماً", desc: "دعم على مدار الساعة طوال العام بدون إجازات أو دوران الموظفين." },
        { title: "جودة متسقة", desc: "كل عميل يحصل على نفس الرد عالي الجودة في كل مرة." },
      ]}
      faqs={[
        { q: "How does the AI handle sensitive complaints?", a: "The AI detects high-emotion language and immediately escalates to a senior human agent, providing the agent with full conversation context and a suggested response." },
        { q: "Can it integrate with our ticketing system?", a: "Yes. We integrate with Zendesk, Freshdesk, Intercom, and custom ticketing systems via API. All conversations create tickets automatically." },
        { q: "How do you train the AI on our products?", a: "We ingest your product documentation, FAQs, policies, and historical support conversations to create a custom knowledge base that powers accurate responses." },
        { q: "What languages are supported?", a: "Arabic (including Gulf dialects) and English are fully supported. Additional languages available on enterprise plans." },
        { q: "Can it handle refunds and account changes?", a: "Yes, with appropriate system integrations. The AI can process refunds, password resets, plan changes, and more through secure API connections to your backend systems." },
      ]}
      faqsAr={[
        { q: "كيف يتعامل الذكاء الاصطناعي مع الشكاوى الحساسة؟", a: "يكتشف الذكاء الاصطناعي لغة المشاعر العالية ويُصعّد فوراً إلى وكيل بشري مع السياق الكامل للمحادثة." },
        { q: "هل يمكن دمجه مع نظام التذاكر لدينا؟", a: "نعم. نتكامل مع Zendesk وFreshdesk وIntercom وأنظمة التذاكر المخصصة عبر API." },
        { q: "كيف تدرّبون الذكاء الاصطناعي على منتجاتنا؟", a: "نستوعب وثائق المنتج والأسئلة الشائعة والسياسات ومحادثات الدعم التاريخية لإنشاء قاعدة معرفية مخصصة." },
        { q: "ما اللغات المدعومة؟", a: "اللغة العربية (بما فيها اللهجات الخليجية) والإنجليزية مدعومتان بالكامل. لغات إضافية متاحة في خطط المؤسسات." },
        { q: "هل يمكنه معالجة المبالغ المستردة وتغييرات الحساب؟", a: "نعم، مع التكاملات المناسبة. يمكن للذكاء الاصطناعي معالجة المبالغ المستردة وإعادة تعيين كلمات المرور وتغيير الخطط وغيرها." },
      ]}
      ctaTitle="Transform Your Customer Support Today"
      ctaTitleAr="حوّل دعم عملائك اليوم"
      ctaSub="Resolve more tickets, spend less on support, and delight your customers — all at once."
      ctaSubAr="حل المزيد من التذاكر، وأنفق أقل على الدعم، وأسعد عملاءك — كل ذلك في آن واحد."
      seoTitle="AI Customer Support Agent Saudi Arabia | Electi"
      seoDescription="AI Customer Support for Saudi businesses. Resolves 80% of tickets instantly in Arabic and English. Integrates with WhatsApp, Zendesk, and more."
      seoPath="/marketplace/ai-customer-support"
    />
  );
}
