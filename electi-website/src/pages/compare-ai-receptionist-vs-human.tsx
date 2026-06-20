import { Phone } from "lucide-react";
import ComparisonPage from "@/components/templates/ComparisonPage";

export default function AIReceptionistVsHumanPage() {
  return (
    <ComparisonPage
      badge="AI Receptionist vs Human"
      badgeAr="المستقبل الذكي مقابل الإنسان"
      icon={Phone}
      title="AI Receptionist vs Human Receptionist"
      titleAr="المستقبل الذكي مقابل المستقبل البشري"
      subtitle="24/7 availability, zero missed calls, and a fraction of the cost — without sacrificing quality."
      subtitleAr="توفر 24/7، صفر مكالمات فائتة، وجزء من التكلفة — دون التضحية بالجودة."
      description="The average Saudi business spends SAR 72,000+ per year on reception staff. An AI Receptionist costs a fraction of that and never sleeps, never calls in sick, and handles unlimited simultaneous calls."
      descriptionAr="تنفق الشركة السعودية المتوسطة أكثر من 72,000 ريال سنوياً على موظفي الاستقبال. يكلف المستقبل الذكي جزءاً من ذلك ولا ينام ولا يمرض ويتعامل مع مكالمات لا محدودة في آن واحد."
      aiLabel="AI Receptionist"
      aiLabelAr="المستقبل الذكي"
      traditionalLabel="Human Receptionist"
      traditionalLabelAr="المستقبل البشري"
      heroStats={[
        { value: "70%", label: "Cost Reduction", labelAr: "تخفيض التكاليف" },
        { value: "0", label: "Missed Calls", labelAr: "مكالمات فائتة" },
        { value: "∞", label: "Simultaneous Calls", labelAr: "مكالمات متزامنة" },
        { value: "24/7", label: "Availability", labelAr: "التوفر" },
      ]}
      rows={[
        { feature: "Available 24/7/365", featureAr: "متاح 24/7/365", ai: true, traditional: false },
        { feature: "Handles simultaneous calls", featureAr: "يتعامل مع مكالمات متزامنة", ai: true, traditional: false },
        { feature: "Never misses a call", featureAr: "لا يفوّت أي مكالمة", ai: true, traditional: false },
        { feature: "Speaks natural Arabic", featureAr: "يتحدث بالعربية الطبيعية", ai: true, traditional: true },
        { feature: "Books appointments automatically", featureAr: "يحجز المواعيد تلقائياً", ai: true, traditional: "Partial" },
        { feature: "Cost per month (est.)", featureAr: "التكلفة الشهرية (تقديرية)", ai: "SAR 2,499+", aiAr: "2,499+ ريال", traditional: "SAR 6,000+", traditionalAr: "6,000+ ريال" },
        { feature: "Sick days / absence", featureAr: "أيام مرض / غياب", ai: false, traditional: true },
        { feature: "Training time required", featureAr: "وقت التدريب المطلوب", ai: "2 days", aiAr: "يومان", traditional: "2–4 weeks", traditionalAr: "2-4 أسابيع" },
        { feature: "Consistent quality every call", featureAr: "جودة متسقة في كل مكالمة", ai: true, traditional: false },
        { feature: "Scales instantly with demand", featureAr: "يتوسع فوراً مع الطلب", ai: true, traditional: false },
        { feature: "Human empathy for complex situations", featureAr: "التعاطف البشري للحالات المعقدة", ai: "Partial", aiAr: "جزئي", traditional: true },
        { feature: "PDPL compliant data handling", featureAr: "متوافق مع PDPL", ai: true, traditional: "Varies", traditionalAr: "يتفاوت" },
      ]}
      benefits={[
        { title: "SAR 72,000+ saved annually", titleAr: "توفير أكثر من 72,000 ريال سنوياً", desc: "Replace 2 reception staff at SAR 6,000/month each with AI at a fraction of the cost.", descAr: "استبدل موظفَي استقبال بتكلفة 6,000 ريال لكل منهما شهرياً بذكاء اصطناعي بجزء من التكلفة." },
        { title: "Every call answered", titleAr: "كل مكالمة يُجاب عليها", desc: "Studies show 67% of callers hang up if not answered quickly. An AI Receptionist eliminates this completely.", descAr: "تظهر الدراسات أن 67% من المتصلين يغلقون الخط إذا لم يُجَب عليهم بسرعة. يلغي المستقبل الذكي ذلك تماماً." },
        { title: "Peak hour coverage", titleAr: "تغطية ساعات الذروة", desc: "Human staff struggle during busy periods. AI handles 100 simultaneous calls as easily as 1.", descAr: "يكافح الموظفون البشريون خلال فترات الذروة. يتعامل الذكاء الاصطناعي مع 100 مكالمة متزامنة بسهولة مكالمة واحدة." },
        { title: "Immediate deployment", titleAr: "نشر فوري", desc: "Live in 24–48 hours vs. 2–4 weeks to recruit, onboard, and train a human receptionist.", descAr: "جاهز في 24-48 ساعة مقابل 2-4 أسابيع لتجنيد وتأهيل وتدريب مستقبل بشري." },
      ]}
      faqs={[
        { q: "Will customers know they're talking to an AI?", qAr: "هل سيعرف العملاء أنهم يتحدثون إلى ذكاء اصطناعي؟", a: "Electi's AI communicates naturally and fluently in Arabic and English. Many businesses choose to be transparent that they use AI — which customers increasingly expect and accept from modern businesses.", aAr: "يتواصل ذكاء Electi بشكل طبيعي وبلاقة بالعربية والإنجليزية. كثير من الشركات تختار أن تكون شفافة بشأن استخدام الذكاء الاصطناعي — وهو ما يتوقعه العملاء ويقبلونه بشكل متزايد." },
        { q: "What about calls that need human judgment?", qAr: "ماذا عن المكالمات التي تحتاج إلى حكم بشري؟", a: "The AI identifies situations requiring human expertise and transfers the call seamlessly to the right person with a full briefing — so your human staff handle only what truly needs them.", aAr: "يحدد الذكاء الاصطناعي المواقف التي تتطلب خبرة بشرية ويحوّل المكالمة بسلاسة إلى الشخص المناسب مع إحاطة كاملة." },
        { q: "Can it handle Arabic-speaking callers who use dialect?", qAr: "هل يمكنه التعامل مع المتصلين الناطقين بالعامية؟", a: "Yes. Electi's AI Receptionist understands Gulf Arabic dialects including Saudi, Kuwaiti, and Emirati Arabic — not just formal Modern Standard Arabic.", aAr: "نعم. يفهم مستقبل Electi الذكي اللهجات العربية الخليجية بما فيها السعودية والكويتية والإماراتية — وليس فقط الفصحى." },
        { q: "Can we use both an AI and human receptionists?", qAr: "هل يمكننا استخدام كل من الذكاء الاصطناعي والمستقبلين البشريين؟", a: "Absolutely. Many businesses use AI for overflow, after-hours, and initial screening — while human receptionists handle VIP callers and complex situations. This hybrid model maximises value.", aAr: "بالتأكيد. كثير من الشركات تستخدم الذكاء الاصطناعي للتدفق الزائد وخارج ساعات العمل والفرز الأولي — بينما يتعامل المستقبلون البشريون مع المتصلين المميزين والحالات المعقدة." },
      ]}
      ctaTitle="Deploy Your AI Receptionist in 24 Hours"
      ctaTitleAr="انشر مستقبلك الذكي في 24 ساعة"
      ctaSub="Never miss another call or lead. See the ROI in your first month."
      ctaSubAr="لا تفوّت أي مكالمة أو عميل محتمل آخر. شاهد العائد على الاستثمار في شهرك الأول."
      relatedAgent="ai-receptionist"
      seoTitle="AI Receptionist vs Human Receptionist Saudi Arabia | Electi"
      seoDescription="AI Receptionist vs Human Receptionist comparison for Saudi businesses. 70% cost reduction, 24/7 availability, zero missed calls. Deploy in 24 hours."
      seoPath="/compare/ai-receptionist-vs-human"
    />
  );
}
