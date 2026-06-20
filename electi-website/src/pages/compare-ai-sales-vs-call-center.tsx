import { TrendingUp } from "lucide-react";
import ComparisonPage from "@/components/templates/ComparisonPage";

export default function AISalesVsCallCenterPage() {
  return (
    <ComparisonPage
      badge="AI Sales Agent vs Call Center"
      badgeAr="وكيل المبيعات الذكي مقابل مركز الاتصال"
      icon={TrendingUp}
      title="AI Sales Agent vs Call Center"
      titleAr="وكيل المبيعات الذكي مقابل مركز الاتصال"
      subtitle="More leads closed, lower cost per acquisition, and zero downtime — without a call center floor."
      subtitleAr="المزيد من الصفقات المغلقة، وتكلفة اقتناء أقل، وصفر توقف — بدون قاعة مركز اتصال."
      description="Running a call center in Saudi Arabia costs millions annually. AI Sales Agents engage leads instantly, qualify at scale, and handle the full sales conversation — freeing your closers for the deals that matter."
      descriptionAr="تشغيل مركز اتصال في المملكة العربية السعودية يكلف ملايين سنوياً. يتفاعل وكلاء المبيعات الذكيون مع العملاء فوراً ويؤهلون على نطاق واسع ويتعاملون مع محادثة المبيعات الكاملة."
      aiLabel="AI Sales Agent"
      aiLabelAr="وكيل المبيعات الذكي"
      traditionalLabel="Call Center"
      traditionalLabelAr="مركز الاتصال"
      heroStats={[
        { value: "3×", label: "More Deals Closed", labelAr: "صفقات أكثر" },
        { value: "< 30s", label: "Lead Response", labelAr: "وقت الرد على العميل" },
        { value: "60%", label: "Lower Cost per Lead", labelAr: "تخفيض تكلفة العميل" },
        { value: "24/7", label: "Sales Coverage", labelAr: "تغطية المبيعات" },
      ]}
      rows={[
        { feature: "Lead response time", featureAr: "وقت الرد على العميل", ai: "< 30 seconds", aiAr: "أقل من 30 ثانية", traditional: "Hours to days", traditionalAr: "ساعات إلى أيام" },
        { feature: "Operating hours", featureAr: "ساعات العمل", ai: "24/7/365", traditional: "8–10 hrs/day", traditionalAr: "8-10 ساعات/يوم" },
        { feature: "Cost per lead touched", featureAr: "التكلفة لكل عميل", ai: "SAR 2–5", aiAr: "2-5 ريال", traditional: "SAR 25–80", traditionalAr: "25-80 ريال" },
        { feature: "Handles peak volumes", featureAr: "يتعامل مع حجم الذروة", ai: true, traditional: false },
        { feature: "Arabic-native sales conversations", featureAr: "محادثات مبيعات عربية أصيلة", ai: true, traditional: "Varies", traditionalAr: "يتفاوت" },
        { feature: "Consistent messaging / pitch", featureAr: "رسائل/عرض متسق", ai: true, traditional: false },
        { feature: "CRM auto-update", featureAr: "تحديث CRM تلقائي", ai: true, traditional: "Manual", traditionalAr: "يدوي" },
        { feature: "Lead scoring & prioritisation", featureAr: "تقييم وترتيب أولويات العملاء", ai: true, traditional: false },
        { feature: "Multi-channel (WhatsApp, voice, email)", featureAr: "متعدد القنوات", ai: true, traditional: "Phone only", traditionalAr: "هاتف فقط" },
        { feature: "Infrastructure cost", featureAr: "تكلفة البنية التحتية", ai: "Zero", aiAr: "صفر", traditional: "High", traditionalAr: "عالية" },
        { feature: "Ramp-up time", featureAr: "وقت التجهيز", ai: "48 hours", aiAr: "48 ساعة", traditional: "3–6 months", traditionalAr: "3-6 أشهر" },
      ]}
      benefits={[
        { title: "Instant lead response", titleAr: "رد فوري على العملاء", desc: "Research shows 78% of deals go to the first responder. AI responds in under 30 seconds, every time.", descAr: "تظهر الأبحاث أن 78% من الصفقات تذهب للمستجيب الأول. يرد الذكاء الاصطناعي في أقل من 30 ثانية، في كل مرة." },
        { title: "Scale without hiring", titleAr: "تو سّع دون توظيف", desc: "Launch a national campaign and handle 10,000 leads the same day without recruiting a single agent.", descAr: "أطلق حملة وطنية وتعامل مع 10,000 عميل في نفس اليوم دون توظيف وكيل واحد." },
        { title: "No infrastructure cost", titleAr: "لا تكلفة بنية تحتية", desc: "No call center floor, equipment, telecoms contracts, or management overhead — just results.", descAr: "لا قاعة مركز اتصال، ولا معدات، ولا عقود اتصالات، ولا تكاليف إدارية — فقط نتائج." },
        { title: "Better data, better decisions", titleAr: "بيانات أفضل، قرارات أفضل", desc: "Every conversation is logged, scored, and analysed — giving you pipeline insights a call center can't match.", descAr: "كل محادثة مُسجّلة ومُقيَّمة ومُحللة — مما يمنحك رؤى لخط الأنابيب لا يستطيع مركز الاتصال مجاراتها." },
      ]}
      faqs={[
        { q: "Can an AI Sales Agent replace our entire call center?", qAr: "هل يمكن لوكيل المبيعات الذكي استبدال مركز الاتصال بالكامل؟", a: "For lead qualification, initial outreach, follow-up sequences, and standard sales conversations — yes. Complex negotiations and enterprise deal closing still benefit from senior human involvement, which the AI supports by qualifying and prepping deals.", aAr: "لتأهيل العملاء والتواصل الأولي وتسلسلات المتابعة ومحادثات المبيعات القياسية — نعم. المفاوضات المعقدة وإغلاق صفقات المؤسسات لا تزال تستفيد من المشاركة البشرية." },
        { q: "How does it handle price negotiations?", qAr: "كيف يتعامل مع مفاوضات الأسعار؟", a: "The AI follows your defined pricing parameters — offering discounts within approved limits and escalating to human closers when deals require custom pricing or senior approval.", aAr: "يتبع الذكاء الاصطناعي معايير التسعير المحددة — يقدم خصومات ضمن الحدود المعتمدة ويُصعّد إلى المُغلقين البشريين عند الحاجة إلى تسعير مخصص." },
        { q: "Can it conduct sales calls in Arabic?", qAr: "هل يمكنه إجراء مكالمات مبيعات باللغة العربية؟", a: "Yes. Voice-based AI Sales conversations in natural Arabic are fully supported — including Gulf dialects, formal pitches, and objection handling in Arabic cultural context.", aAr: "نعم. محادثات مبيعات ذكاء اصطناعي صوتية بالعربية الطبيعية مدعومة بالكامل — بما في ذلك اللهجات الخليجية والعروض الرسمية ومعالجة الاعتراضات في السياق الثقافي العربي." },
        { q: "What CRMs does it integrate with?", qAr: "ما أنظمة CRM التي يتكامل معها؟", a: "Salesforce, HubSpot, Zoho, Microsoft Dynamics, Monday.com, and most Saudi-used platforms. All conversations, lead scores, and outcomes sync automatically into your CRM.", aAr: "Salesforce وHubSpot وZoho وMicrosoft Dynamics وMonday.com وأغلب المنصات المستخدمة في السعودية. جميع المحادثات ونقاط العملاء والنتائج تتزامن تلقائياً في CRM." },
      ]}
      ctaTitle="Replace Your Call Center with AI Sales"
      ctaTitleAr="استبدل مركز اتصالك بمبيعات ذكاء اصطناعي"
      ctaSub="3× more deals. 60% lower cost per lead. No floor, no staff, no drama."
      ctaSubAr="3 أضعاف الصفقات. 60% تخفيض تكلفة العميل. لا قاعة، لا موظفين، لا متاعب."
      relatedAgent="ai-sales-agent"
      seoTitle="AI Sales Agent vs Call Center Saudi Arabia | Electi"
      seoDescription="AI Sales Agent vs Call Center for Saudi businesses. 3× more deals closed, 60% lower cost per lead, instant response 24/7. Deploy in 48 hours."
      seoPath="/compare/ai-sales-vs-call-center"
    />
  );
}
