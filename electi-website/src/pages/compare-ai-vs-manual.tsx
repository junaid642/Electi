import { Zap } from "lucide-react";
import ComparisonPage from "@/components/templates/ComparisonPage";

export default function AIVsManualPage() {
  return (
    <ComparisonPage
      badge="AI Automation vs Manual Processes"
      badgeAr="أتمتة الذكاء الاصطناعي مقابل العمليات اليدوية"
      icon={Zap}
      title="AI Automation vs Manual Business Processes"
      titleAr="أتمتة الذكاء الاصطناعي مقابل العمليات التجارية اليدوية"
      subtitle="Saudi businesses that automate with AI grow faster, serve customers better, and outcompete those that don't."
      subtitleAr="الشركات السعودية التي تؤتمت بالذكاء الاصطناعي تنمو بشكل أسرع وتخدم العملاء بشكل أفضل وتتفوق على من لا يفعل ذلك."
      description="Vision 2030 is digitising Saudi Arabia at speed. Businesses clinging to manual processes will fall behind. AI automation isn't a future luxury — it's today's competitive requirement."
      descriptionAr="رؤية 2030 ترقمن المملكة العربية السعودية بسرعة. الشركات المتمسكة بالعمليات اليدوية ستتخلف. أتمتة الذكاء الاصطناعي ليست رفاهية مستقبلية — إنها ضرورة تنافسية اليوم."
      aiLabel="AI Automation"
      aiLabelAr="أتمتة الذكاء الاصطناعي"
      traditionalLabel="Manual Processes"
      traditionalLabelAr="العمليات اليدوية"
      heroStats={[
        { value: "5×", label: "Faster Processing", labelAr: "معالجة أسرع" },
        { value: "90%", label: "Error Reduction", labelAr: "تقليل الأخطاء" },
        { value: "40%", label: "Staff Time Freed", labelAr: "وقت الموظفين المحرّر" },
        { value: "24/7", label: "Operation Uptime", labelAr: "وقت التشغيل" },
      ]}
      rows={[
        { feature: "Processing speed", featureAr: "سرعة المعالجة", ai: "Instant", aiAr: "فوري", traditional: "Hours to days", traditionalAr: "ساعات إلى أيام" },
        { feature: "Human error rate", featureAr: "معدل الخطأ البشري", ai: "< 0.1%", traditional: "5–15%", traditionalAr: "5-15%" },
        { feature: "Operates 24/7", featureAr: "يعمل 24/7", ai: true, traditional: false },
        { feature: "Scales with demand", featureAr: "يتوسع مع الطلب", ai: true, traditional: false },
        { feature: "Consistent process execution", featureAr: "تنفيذ عملية متسق", ai: true, traditional: false },
        { feature: "Arabic language handling", featureAr: "معالجة اللغة العربية", ai: true, traditional: "Depends on staff" },
        { feature: "Audit trail / logging", featureAr: "مسار التدقيق / التسجيل", ai: true, traditional: "Manual" },
        { feature: "Real-time reporting", featureAr: "التقارير في الوقت الفعلي", ai: true, traditional: false },
        { feature: "Cost per transaction", featureAr: "التكلفة لكل معاملة", ai: "Low", aiAr: "منخفض", traditional: "High", traditionalAr: "عالي" },
        { feature: "Employee satisfaction", featureAr: "رضا الموظفين", ai: "Frees staff for value work", aiAr: "يحرر الموظفين لعمل ذي قيمة", traditional: "Repetitive tasks cause burnout", traditionalAr: "المهام المتكررة تسبب الإرهاق" },
        { feature: "Vision 2030 alignment", featureAr: "التوافق مع رؤية 2030", ai: true, traditional: false },
      ]}
      benefits={[
        { title: "40% of staff time freed", titleAr: "تحرير 40% من وقت الموظفين", desc: "AI handles repetitive tasks so your team focuses on decisions that need human creativity and judgment.", descAr: "يتعامل الذكاء الاصطناعي مع المهام المتكررة حتى يركز فريقك على القرارات التي تحتاج إلى الإبداع البشري والحكم." },
        { title: "90% fewer errors", titleAr: "90% أخطاء أقل", desc: "Manual data entry, document processing, and routing all introduce errors. AI eliminates nearly all of them.", descAr: "إدخال البيانات اليدوية ومعالجة الوثائق والتوجيه كلها تُدخل الأخطاء. يُلغي الذكاء الاصطناعي معظمها." },
        { title: "Vision 2030 compliance", titleAr: "الامتثال لرؤية 2030", desc: "Saudi Arabia's digitisation goals require modern businesses to automate. Early movers gain lasting competitive advantage.", descAr: "أهداف الرقمنة السعودية تتطلب من الشركات الحديثة التأتمت. المتحركون المبكرون يكتسبون ميزة تنافسية دائمة." },
        { title: "Real-time operational visibility", titleAr: "رؤية تشغيلية في الوقت الفعلي", desc: "Automated processes generate data. Data generates insights. Insights generate better decisions — at speed.", descAr: "العمليات الآلية تُولّد البيانات. البيانات تُولّد الرؤى. الرؤى تُولّد قرارات أفضل — بسرعة." },
      ]}
      faqs={[
        { q: "Do we need to replace all our staff to automate?", qAr: "هل نحتاج إلى استبدال جميع موظفينا للتأتمت؟", a: "No. AI automation complements your team — handling repetitive, high-volume tasks while your staff focus on complex, relationship-driven, and strategic work that humans do best.", aAr: "لا. أتمتة الذكاء الاصطناعي تكمّل فريقك — تتعامل مع المهام المتكررة عالية الحجم بينما يركز موظفوك على العمل المعقد والاستراتيجي." },
        { q: "How does AI automation handle Arabic business documents?", qAr: "كيف تتعامل أتمتة الذكاء الاصطناعي مع الوثائق التجارية العربية؟", a: "Electi's AI processes Arabic documents including contracts, invoices, and forms — extracting data, classifying, routing, and triggering workflows in both Arabic and English.", aAr: "يعالج ذكاء Electi الوثائق العربية بما فيها العقود والفواتير والنماذج — يستخرج البيانات ويصنّف ويُوجّه ويُشغّل سير العمل بالعربية والإنجليزية." },
        { q: "How long does it take to automate a business process?", qAr: "كم يستغرق تأتمت عملية تجارية؟", a: "Simple processes (FAQ responses, appointment booking, lead routing) go live in 24–72 hours. Complex process automation (document processing, multi-system workflows) typically takes 2–6 weeks.", aAr: "العمليات البسيطة (الردود على الأسئلة الشائعة وحجز المواعيد وتوجيه العملاء) تعمل في 24-72 ساعة. أتمتة العمليات المعقدة تستغرق عادةً 2-6 أسابيع." },
        { q: "Is AI automation suitable for Saudi SMEs?", qAr: "هل أتمتة الذكاء الاصطناعي مناسبة للشركات الصغيرة والمتوسطة السعودية؟", a: "Absolutely. Electi's plans scale from startups to enterprise. SMEs often see the fastest ROI because even a single AI agent can eliminate 2–3 manual roles, dramatically improving margins.", aAr: "بالتأكيد. خطط Electi تتدرج من الشركات الناشئة إلى المؤسسات. غالباً ما تحقق الشركات الصغيرة والمتوسطة أسرع عائد على الاستثمار لأن وكيلاً ذكياً واحداً يمكنه القضاء على 2-3 أدوار يدوية." },
      ]}
      ctaTitle="Automate Your Business for Vision 2030"
      ctaTitleAr="أتمت أعمالك لرؤية 2030"
      ctaSub="Start with one process. See the ROI. Then scale across your business."
      ctaSubAr="ابدأ بعملية واحدة. شاهد العائد على الاستثمار. ثم وسّع عبر أعمالك."
      seoTitle="AI Automation vs Manual Processes Saudi Arabia | Electi"
      seoDescription="AI Automation vs Manual Business Processes. 5× faster, 90% fewer errors, 40% staff time freed. Vision 2030 aligned. Deploy AI automation in Saudi Arabia."
      seoPath="/compare/ai-vs-manual"
    />
  );
}
