import { Search, FileText, Calendar, BarChart3, Zap, Globe, Users, Star, Building2, Clock, CheckCircle, MessageSquare } from "lucide-react";
import MarketplacePage from "@/components/templates/MarketplacePage";

export default function AIRecruitmentPage() {
  return (
    <MarketplacePage
      badge="AI Recruitment Agent"
      badgeAr="وكيل التوظيف الذكي"
      icon={Search}
      title="AI Recruitment Agent"
      titleAr="وكيل التوظيف الذكي"
      titleAccent="Hire Faster, Hire Better"
      tagline="Screen hundreds of applicants, schedule interviews, and find top talent — automatically."
      taglineAr="فرز مئات المتقدمين وجدولة المقابلات وإيجاد أفضل المواهب — تلقائياً."
      description="Electi's AI Recruitment Agent manages your entire hiring funnel: screening CVs, conducting first-round interviews via chat or voice, scoring candidates, and scheduling interviews — all in Arabic and English."
      descriptionAr="يدير وكيل التوظيف الذكي من Electi مسار التوظيف بالكامل: فرز السير الذاتية وإجراء المقابلات الأولى وتقييم المرشحين وجدولة المقابلات."
      heroStats={[
        { value: "10×", label: "Faster Screening", labelAr: "فرز أسرع" },
        { value: "60%", label: "Time-to-Hire Reduction", labelAr: "تقليل وقت التوظيف" },
        { value: "95%", label: "CV Screening Accuracy", labelAr: "دقة فرز السير الذاتية" },
        { value: "24/7", label: "Candidate Engagement", labelAr: "تواصل مع المرشحين" },
      ]}
      features={[
        { icon: FileText, title: "CV Screening & Scoring", desc: "Parses and scores thousands of CVs against your job requirements in minutes, with detailed candidate reports." },
        { icon: MessageSquare, title: "AI Interview Screening", desc: "Conducts structured first-round interviews via chat or voice, assessing skills, fit, and availability." },
        { icon: Calendar, title: "Interview Scheduling", desc: "Automatically coordinates interview times between candidates and hiring managers, with reminders." },
        { icon: Globe, title: "Bilingual Recruitment", desc: "Engages Saudi and international candidates in Arabic and English — no language barriers in hiring." },
        { icon: BarChart3, title: "Talent Analytics", desc: "Track pipeline health, source quality, time-to-hire, and diversity metrics in real time." },
        { icon: CheckCircle, title: "Nitaqat/Saudization Tracking", desc: "Tracks Saudi vs. non-Saudi hire ratios and alerts recruiters to Nitaqat compliance status." },
      ]}
      useCases={[
        { icon: Building2, label: "High-Volume Hiring", desc: "Screen 500+ applications for the same role without human reviewer fatigue." },
        { icon: Users, label: "Graduate Recruitment", desc: "Engage thousands of fresh graduates with consistent assessment across all universities." },
        { icon: Star, label: "Executive Search", desc: "Qualify senior candidates with intelligent screening and structured competency-based questions." },
        { icon: Globe, label: "Expat Recruitment", desc: "Screen international talent with bilingual support and visa eligibility pre-qualification." },
        { icon: Clock, label: "Seasonal Hiring", desc: "Scale recruitment capacity instantly for Ramadan or Vision 2030 project surges." },
        { icon: Search, label: "Technical Roles", desc: "Screen for technical skills with customizable assessment questions and coding challenges." },
      ]}
      industries={["Corporate", "Healthcare", "Construction", "Retail", "Hospitality", "Government", "Technology", "Financial Services", "Education", "Manufacturing"]}
      industriesAr={["الشركات", "الرعاية الصحية", "البناء", "التجزئة", "الضيافة", "الحكومي", "التكنولوجيا", "الخدمات المالية", "التعليم", "التصنيع"]}
      benefits={[
        { title: "10× faster screening", desc: "Review hundreds of CVs in the time it takes to read five." },
        { title: "60% less time-to-hire", desc: "Automated scheduling and instant candidate engagement compress your hiring timeline." },
        { title: "Nitaqat compliant", desc: "Built-in tracking of Saudization ratios across all job families." },
        { title: "Bias-reduced hiring", desc: "Consistent, structured assessments reduce unconscious bias in early screening." },
      ]}
      benefitsAr={[
        { title: "فرز أسرع بـ 10 أضعاف", desc: "راجع مئات السير الذاتية في الوقت الذي يستغرقه قراءة خمسة." },
        { title: "تقليل وقت التوظيف بنسبة 60%", desc: "الجدولة الآلية والتواصل الفوري مع المرشحين يضغطان جدول التوظيف." },
        { title: "متوافق مع نطاقات", desc: "تتبع مدمج لنسب السعودة عبر جميع فئات الوظائف." },
        { title: "توظيف بتحيز مخفض", desc: "تقييمات منظمة ومتسقة تقلل التحيز اللاواعي في الفرز المبكر." },
      ]}
      faqs={[
        { q: "How does the AI screen CVs?", a: "The AI parses each CV, extracts key attributes (experience, skills, education, location), and scores them against a customizable rubric you define. Results rank candidates for human review." },
        { q: "Can it conduct interviews in Arabic?", a: "Yes. The AI conducts structured screening interviews in Arabic, English, or both — adapting to the candidate's preferred language." },
        { q: "Does it integrate with our ATS?", a: "We integrate with SAP SuccessFactors, Oracle Taleo, Greenhouse, Lever, and many local HR systems. Candidate data flows automatically into your ATS." },
        { q: "How does Nitaqat tracking work?", a: "The system tracks nationality ratios across all active job requisitions and alerts HR when ratios approach Nitaqat compliance boundaries, helping you plan hiring mix proactively." },
        { q: "Is it PDPL compliant for candidate data?", a: "Candidate data is handled with full PDPL compliance — candidates receive privacy notices, consent to processing, and data is deleted per retention policies." },
      ]}
      faqsAr={[
        { q: "كيف يفرز الذكاء الاصطناعي السير الذاتية؟", a: "يُحلّل الذكاء الاصطناعي كل سيرة ذاتية ويستخرج السمات الرئيسية ويُسجّلها مقابل معايير قابلة للتخصيص تحددها أنت." },
        { q: "هل يمكنه إجراء مقابلات باللغة العربية؟", a: "نعم. يجري الذكاء الاصطناعي مقابلات فرز منظمة بالعربية والإنجليزية أو كليهما، متكيفاً مع لغة المرشح المفضلة." },
        { q: "هل يتكامل مع نظام تتبع المتقدمين لدينا؟", a: "نتكامل مع SAP SuccessFactors وOracle Taleo وGreenhouse وLever والعديد من أنظمة الموارد البشرية المحلية." },
        { q: "كيف يعمل تتبع نطاقات؟", a: "يتتبع النظام نسب الجنسيات عبر جميع طلبات الوظائف النشطة ويُنبّه الموارد البشرية عند اقتراب النسب من حدود الامتثال." },
        { q: "هل هو متوافق مع نظام حماية البيانات لبيانات المرشحين؟", a: "نعم، يُعالَج بيانات المرشحين بالتوافق الكامل مع نظام حماية البيانات الشخصية، مع إشعارات الخصوصية والحذف وفق سياسات الاحتفاظ." },
      ]}
      ctaTitle="Build Your Dream Team Faster"
      ctaTitleAr="ابنِ فريقك المثالي بشكل أسرع"
      ctaSub="From job posting to offer letter — the AI handles screening, interviews, and scheduling for you."
      ctaSubAr="من نشر الوظيفة إلى خطاب العرض — يتولى الذكاء الاصطناعي الفرز والمقابلات والجدولة نيابةً عنك."
      seoTitle="AI Recruitment Agent Saudi Arabia | Electi"
      seoDescription="AI Recruitment Agent for Saudi businesses. Screens CVs, conducts first interviews, schedules appointments. Nitaqat compliant. Arabic and English support."
      seoPath="/marketplace/ai-recruitment"
    />
  );
}
