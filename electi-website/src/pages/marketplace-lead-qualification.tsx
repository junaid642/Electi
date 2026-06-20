import { Target, Zap, BarChart3, Globe, Shield, Clock, Users, Building2, Star, MessageSquare, TrendingUp, CheckCircle } from "lucide-react";
import MarketplacePage from "@/components/templates/MarketplacePage";

export default function AILeadQualificationPage() {
  return (
    <MarketplacePage
      badge="AI Lead Qualification Agent"
      badgeAr="وكيل تأهيل العملاء المحتملين الذكي"
      icon={Target}
      title="AI Lead Qualification"
      titleAr="وكيل تأهيل العملاء المحتملين الذكي"
      titleAccent="Agent"
      tagline="Score, qualify, and route every lead in real time — so your sales team only talks to buyers."
      taglineAr="قيّم وأهّل ووجّه كل عميل محتمل في الوقت الفعلي — حتى يتحدث فريق مبيعاتك فقط مع المشترين."
      description="Stop wasting your sales team's time on unqualified leads. Electi's AI Lead Qualification Agent engages every inbound inquiry within seconds, scores them against your ideal customer profile, and only routes warm leads to your team."
      descriptionAr="توقف عن إضاعة وقت فريق المبيعات على عملاء غير مؤهلين. يتفاعل وكيل تأهيل العملاء المحتملين الذكي مع كل استفسار وارد في ثوانٍ ويُصنّفه ويُوجّه العملاء الدافئين فقط إلى فريقك."
      heroStats={[
        { value: "5×", label: "Sales Team Efficiency", labelAr: "كفاءة فريق المبيعات" },
        { value: "< 30s", label: "Lead Engagement Time", labelAr: "وقت التفاعل مع العميل" },
        { value: "70%", label: "Unqualified Leads Filtered", labelAr: "عملاء غير مؤهلين تمت تصفيتهم" },
        { value: "24/7", label: "Lead Capture", labelAr: "التقاط العملاء المحتملين" },
      ]}
      features={[
        { icon: Zap, title: "Instant Engagement", desc: "Responds to every lead within 30 seconds — capturing intent before they contact your competitor." },
        { icon: Target, title: "Custom Qualification Criteria", desc: "Define your ideal customer profile — budget, industry, company size, decision authority — and the AI scores every lead against it." },
        { icon: TrendingUp, title: "Lead Scoring & Routing", desc: "Assigns a score to each lead and routes hot leads to the right sales rep, cold leads to nurture sequences." },
        { icon: Globe, title: "Multichannel Capture", desc: "Qualifies leads from WhatsApp, website forms, Facebook Leads, Google Ads, and inbound calls from one platform." },
        { icon: BarChart3, title: "Lead Analytics", desc: "Track lead sources, conversion rates by channel, qualification rates, and revenue attribution." },
        { icon: Shield, title: "PDPL Compliant", desc: "All lead data is captured with consent, stored securely in Saudi Arabia, and processed per PDPL regulations." },
      ]}
      useCases={[
        { icon: Building2, label: "Real Estate Developers", desc: "Filter serious property buyers from casual browsers across launch campaigns." },
        { icon: Users, label: "B2B Software", desc: "Qualify SME vs enterprise leads, decision makers vs users, and route to the right account executive." },
        { icon: Star, label: "Financial Services", desc: "Pre-qualify loan, mortgage, or investment leads based on income, asset profile, and intent." },
        { icon: MessageSquare, label: "Healthcare Clinics", desc: "Qualify patients by insurance, condition, and urgency before booking specialist consultations." },
        { icon: Clock, label: "Training & Education", desc: "Qualify individual vs corporate training inquiries and route to the right enrolment process." },
        { icon: CheckCircle, label: "Enterprise Services", desc: "Pre-qualify RFQs, filtering genuine budget-holders from early-stage researchers." },
      ]}
      industries={["Real Estate", "Financial Services", "Healthcare", "Technology", "Education", "Corporate Services", "Construction", "Insurance", "Legal", "E-commerce"]}
      industriesAr={["العقارات", "الخدمات المالية", "الرعاية الصحية", "التكنولوجيا", "التعليم", "خدمات الشركات", "البناء", "التأمين", "القانوني", "التجارة الإلكترونية"]}
      benefits={[
        { title: "5× sales efficiency", desc: "Your reps spend time only on leads that match your ideal customer profile." },
        { title: "Zero lead leakage", desc: "Every inquiry is captured and engaged — even at 3am on a public holiday." },
        { title: "Faster revenue", desc: "Qualified leads reach reps faster, compressing the sales cycle." },
        { title: "Data-driven pipeline", desc: "Rich lead data at every stage helps you forecast revenue accurately." },
      ]}
      benefitsAr={[
        { title: "كفاءة مبيعات أعلى بـ5 أضعاف", desc: "يقضي مندوبوك وقتهم فقط مع العملاء المطابقين لملفك المثالي." },
        { title: "لا تسرّب للعملاء المحتملين", desc: "كل استفسار يتم التقاطه والتفاعل معه — حتى في الساعة 3 صباحاً في يوم عطلة." },
        { title: "إيرادات أسرع", desc: "يصل العملاء المؤهلون إلى المندوبين بشكل أسرع، مما يضغط دورة المبيعات." },
        { title: "خط أنابيب مدعوم بالبيانات", desc: "بيانات عملاء غنية في كل مرحلة تساعدك على التنبؤ بالإيرادات بدقة." },
      ]}
      faqs={[
        { q: "How do you customize the qualification criteria?", a: "During onboarding, we work with your sales team to define your Ideal Customer Profile (ICP) — including budget thresholds, company size, industry, geography, and decision-making authority. These become the AI's scoring criteria." },
        { q: "What channels can it capture leads from?", a: "WhatsApp, website chat, landing page forms, Facebook Lead Ads, Google Ads extensions, inbound phone calls, and email. All leads flow into a single unified dashboard." },
        { q: "How does it hand off to sales reps?", a: "When a lead crosses your qualification threshold, the AI sends an instant alert to the assigned rep via WhatsApp with the lead's name, company, budget, need summary, and conversation transcript." },
        { q: "Can it qualify leads in Arabic?", a: "Yes. The AI conducts full qualification conversations in natural Arabic, understanding Gulf dialects and adapting to formal or informal register based on the prospect." },
        { q: "How does it handle leads that are not ready to buy?", a: "Unqualified leads enter an automated nurture sequence — receiving relevant content, case studies, and follow-up messages at timed intervals until they become sales-ready." },
      ]}
      faqsAr={[
        { q: "كيف تخصّصون معايير التأهيل؟", a: "أثناء الإعداد، نعمل مع فريق المبيعات لتحديد ملف عميلك المثالي بما في ذلك حدود الميزانية وحجم الشركة والصناعة والجغرافيا وصلاحية اتخاذ القرار." },
        { q: "من أي قنوات يمكنه التقاط العملاء المحتملين؟", a: "واتساب ودردشة الموقع ونماذج صفحات الهبوط وإعلانات فيسبوك وإضافات إعلانات جوجل والمكالمات الواردة والبريد الإلكتروني. جميع العملاء في لوحة معلومات موحدة واحدة." },
        { q: "كيف يُحيل الأمر إلى مندوبي المبيعات؟", a: "عندما يتجاوز عميل محتمل عتبة التأهيل، يرسل الذكاء الاصطناعي تنبيهاً فورياً إلى المندوب المعيّن عبر واتساب مع ملخص العميل ونص المحادثة." },
        { q: "هل يمكنه تأهيل العملاء المحتملين باللغة العربية؟", a: "نعم. يجري الذكاء الاصطناعي محادثات تأهيل كاملة بالعربية الطبيعية، مع فهم اللهجات الخليجية والتكيف مع الأسلوب الرسمي أو غير الرسمي." },
        { q: "كيف يتعامل مع العملاء غير المستعدين للشراء؟", a: "يدخل العملاء غير المؤهلين في تسلسل رعاية تلقائي — يتلقون محتوى ذا صلة ودراسات حالة ورسائل متابعة على فترات زمنية محددة حتى يصبحوا جاهزين." },
      ]}
      ctaTitle="Stop Wasting Your Sales Team's Time"
      ctaTitleAr="توقف عن إضاعة وقت فريق مبيعاتك"
      ctaSub="Only let qualified, ready-to-buy leads reach your reps. Deploy in 48 hours."
      ctaSubAr="اسمح فقط للعملاء المؤهلين المستعدين للشراء بالوصول إلى مندوبيك. انشر في 48 ساعة."
      seoTitle="AI Lead Qualification Agent Saudi Arabia | Electi"
      seoDescription="AI Lead Qualification Agent for Saudi businesses. Scores and routes leads in real time in Arabic and English. Increases sales team efficiency by 5×."
      seoPath="/marketplace/ai-lead-qualification"
    />
  );
}
