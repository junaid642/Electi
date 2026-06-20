import { TrendingUp, Target, MessageSquare, BarChart3, Zap, Globe, Users, Phone, Clock, Building2, ShoppingCart, Briefcase } from "lucide-react";
import MarketplacePage from "@/components/templates/MarketplacePage";

export default function AISalesAgentPage() {
  return (
    <MarketplacePage
      badge="AI Sales Agent"
      badgeAr="وكيل المبيعات الذكي"
      icon={TrendingUp}
      title="AI Sales Agent"
      titleAr="وكيل المبيعات الذكي"
      titleAccent="That Closes Deals"
      tagline="Your tireless sales team that prospects, qualifies, follows up, and closes — in Arabic and English."
      taglineAr="فريق مبيعاتك الذي لا يتعب: يبحث عن العملاء ويؤهلهم ويتابع ويُغلق الصفقات — بالعربية والإنجليزية."
      description="Electi's AI Sales Agent engages leads instantly, nurtures prospects across WhatsApp, email, and voice, and hands qualified opportunities to your human team — dramatically increasing your conversion rate."
      descriptionAr="يتفاعل وكيل مبيعات Electi الذكي مع العملاء المحتملين فوراً، ويرعى الفرص عبر واتساب والبريد الإلكتروني والصوت، ثم يُحيل الفرص المؤهلة إلى فريقك."
      heroStats={[
        { value: "3×", label: "More Leads Closed", labelAr: "صفقات أكثر" },
        { value: "90%", label: "Response Rate", labelAr: "معدل الاستجابة" },
        { value: "< 30s", label: "Lead Response Time", labelAr: "وقت الرد" },
        { value: "24/7", label: "Sales Coverage", labelAr: "تغطية مستمرة" },
      ]}
      features={[
        { icon: Zap, title: "Instant Lead Response", desc: "Responds to every inbound inquiry within 30 seconds, dramatically increasing conversion before leads go cold." },
        { icon: Target, title: "Smart Lead Scoring", desc: "Qualifies leads using custom criteria — budget, timeline, decision authority — and routes hot prospects to your team." },
        { icon: MessageSquare, title: "Omnichannel Outreach", desc: "Engages leads across WhatsApp, SMS, email, and voice calls from a single unified platform." },
        { icon: BarChart3, title: "Pipeline Analytics", desc: "Real-time dashboard showing lead stage, conversion rates, follow-up status, and revenue forecast." },
        { icon: Globe, title: "Arabic-Native Sales", desc: "Communicates in natural Arabic with full cultural context — not a translated chatbot." },
        { icon: Clock, title: "Automated Follow-ups", desc: "Never lets a lead go cold with intelligent follow-up sequences timed for maximum engagement." },
      ]}
      useCases={[
        { icon: Building2, label: "Real Estate", desc: "Qualify property buyers, book viewings, and nurture leads for months until they are ready to purchase." },
        { icon: ShoppingCart, label: "E-commerce", desc: "Recover abandoned carts, upsell products, and handle post-purchase follow-ups automatically." },
        { icon: Briefcase, label: "B2B Services", desc: "Prospect target accounts, book discovery calls, and qualify decision-makers in your pipeline." },
        { icon: Phone, label: "Insurance", desc: "Gather requirements, explain coverage options, and generate quotes for qualified buyers." },
        { icon: Users, label: "Education", desc: "Convert course inquiries into enrollments with personalized follow-ups and objection handling." },
        { icon: TrendingUp, label: "Financial Services", desc: "Qualify investment leads, explain products, and schedule advisor meetings compliantly." },
      ]}
      industries={["Real Estate", "E-commerce", "Financial Services", "Insurance", "Education", "Retail", "Hospitality", "Technology", "Healthcare", "Construction"]}
      industriesAr={["العقارات", "التجارة الإلكترونية", "الخدمات المالية", "التأمين", "التعليم", "التجزئة", "الضيافة", "التكنولوجيا", "الرعاية الصحية", "البناء"]}
      benefits={[
        { title: "3× more conversions", desc: "Instant response and consistent follow-up dramatically improve close rates." },
        { title: "No lead left behind", desc: "Every inquiry is engaged, scored, and nurtured — automatically." },
        { title: "Scalable pipeline", desc: "Handle 1,000 leads with the same quality as 10, at no extra cost." },
        { title: "CRM integration", desc: "Syncs with Salesforce, HubSpot, Zoho, and local CRM systems." },
      ]}
      benefitsAr={[
        { title: "تحويلات أكثر بـ 3 أضعاف", desc: "الرد الفوري والمتابعة المستمرة تحسّن معدلات الإغلاق بشكل كبير." },
        { title: "لا عميل يُضاع", desc: "كل استفسار يتم التفاعل معه وتقييمه ورعايته — تلقائياً." },
        { title: "خط أنابيب قابل للتوسع", desc: "تعامل مع 1000 عميل بنفس جودة 10 عملاء، دون تكاليف إضافية." },
        { title: "تكامل مع CRM", desc: "يتزامن مع Salesforce وHubSpot وZoho وأنظمة CRM المحلية." },
      ]}
      faqs={[
        { q: "Can the AI Sales Agent handle complex product pitches?", a: "Yes. We train the AI on your product catalog, pricing, and sales playbook so it can handle detailed product conversations and objection handling naturally." },
        { q: "How does it hand off to human sales reps?", a: "When a lead reaches a qualification threshold you define, the AI immediately notifies your rep via WhatsApp or email with a full conversation summary and recommended next steps." },
        { q: "Does it work with our existing CRM?", a: "We integrate with Salesforce, HubSpot, Zoho, Monday.com, and most Saudi-used CRM platforms. Custom integrations are available." },
        { q: "Can it do outbound prospecting?", a: "Yes. The AI can run outbound campaigns via WhatsApp and email, using approved messaging templates and response-based follow-up sequences." },
        { q: "Is it compliant with Saudi telecom regulations?", a: "All messaging follows CITC guidelines and WhatsApp Business API policies. We handle all compliance setup on your behalf." },
      ]}
      faqsAr={[
        { q: "هل يمكن لوكيل المبيعات الذكي التعامل مع عروض المنتجات المعقدة؟", a: "نعم. ندرّب الذكاء الاصطناعي على كتالوج منتجاتك وأسعارك وكتيّب المبيعات الخاص بك." },
        { q: "كيف يحيل الأمر إلى مندوب مبيعات بشري؟", a: "عندما يصل العميل المحتمل إلى عتبة التأهيل التي تحددها، يُبلّغ الذكاء الاصطناعي مندوبك فوراً عبر واتساب مع ملخص المحادثة." },
        { q: "هل يعمل مع CRM الحالي؟", a: "نتكامل مع Salesforce وHubSpot وZoho وMondayعمل وأغلب منصات CRM المستخدمة في السعودية." },
        { q: "هل يمكنه الاستهداف الصادر؟", a: "نعم. يمكن للذكاء الاصطناعي تشغيل حملات صادرة عبر واتساب والبريد الإلكتروني باستخدام قوالب رسائل معتمدة." },
        { q: "هل هو متوافق مع لوائح الاتصالات السعودية؟", a: "تتبع جميع الرسائل إرشادات هيئة الاتصالات وسياسات WhatsApp Business API. نتولى إعداد الامتثال نيابةً عنك." },
      ]}
      ctaTitle="Start Closing More Deals Today"
      ctaTitleAr="ابدأ بإغلاق المزيد من الصفقات اليوم"
      ctaSub="Deploy your AI Sales Agent in 48 hours. No coding, no complex setup — just more revenue."
      ctaSubAr="انشر وكيل المبيعات الذكي في 48 ساعة. بدون برمجة أو إعداد معقد — فقط إيرادات أكثر."
      seoTitle="AI Sales Agent Saudi Arabia | Electi"
      seoDescription="AI Sales Agent for Saudi businesses. Qualifies leads, follows up automatically, closes deals in Arabic and English. Deploy in 48 hours."
      seoPath="/marketplace/ai-sales-agent"
    />
  );
}
