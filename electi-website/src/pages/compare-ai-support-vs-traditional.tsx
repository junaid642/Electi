import { Headphones } from "lucide-react";
import ComparisonPage from "@/components/templates/ComparisonPage";

export default function AISupportVsTraditionalPage() {
  return (
    <ComparisonPage
      badge="AI Support vs Traditional Support"
      badgeAr="الدعم الذكي مقابل الدعم التقليدي"
      icon={Headphones}
      title="AI Customer Support vs Traditional Support"
      titleAr="دعم العملاء الذكي مقابل الدعم التقليدي"
      subtitle="Resolve 80% of tickets instantly. Delight customers. Cut costs by 70%. All at the same time."
      subtitleAr="حل 80% من التذاكر فوراً. إسعاد العملاء. خفض التكاليف بنسبة 70%. كل ذلك في آن واحد."
      description="Traditional customer support teams are expensive, inconsistent, and can't scale during peak times. AI Customer Support resolves most issues instantly while giving your team more time for complex cases."
      descriptionAr="فرق دعم العملاء التقليدية مكلفة وغير متسقة ولا يمكنها التوسع خلال فترات الذروة. يحل دعم العملاء الذكي معظم المشكلات فوراً مع منح فريقك وقتاً أكثر للحالات المعقدة."
      aiLabel="AI Customer Support"
      aiLabelAr="دعم العملاء الذكي"
      traditionalLabel="Traditional Support Team"
      traditionalLabelAr="فريق الدعم التقليدي"
      heroStats={[
        { value: "80%", label: "Auto-Resolution Rate", labelAr: "معدل الحل التلقائي" },
        { value: "70%", label: "Cost Reduction", labelAr: "تخفيض التكاليف" },
        { value: "< 2s", label: "First Response", labelAr: "أول رد" },
        { value: "4.9★", label: "CSAT Score", labelAr: "رضا العملاء" },
      ]}
      rows={[
        { feature: "Average first response time", featureAr: "متوسط وقت الرد الأول", ai: "< 2 seconds", aiAr: "أقل من ثانيتين", traditional: "4–24 hours", traditionalAr: "4-24 ساعة" },
        { feature: "Available 24/7", featureAr: "متاح 24/7", ai: true, traditional: false },
        { feature: "Handles simultaneous tickets", featureAr: "يتعامل مع تذاكر متزامنة", ai: true, traditional: false },
        { feature: "Consistent response quality", featureAr: "جودة رد متسقة", ai: true, traditional: false },
        { feature: "Cost per ticket (est.)", featureAr: "التكلفة لكل تذكرة (تقديرية)", ai: "SAR 0.50", aiAr: "0.50 ريال", traditional: "SAR 15–25", traditionalAr: "15-25 ريال" },
        { feature: "Arabic language support", featureAr: "دعم اللغة العربية", ai: true, traditional: "Varies", traditionalAr: "يتفاوت" },
        { feature: "Smart escalation to human", featureAr: "تصعيد ذكي إلى إنسان", ai: true, traditional: "Manual" },
        { feature: "Scales during peak times", featureAr: "يتوسع خلال أوقات الذروة", ai: true, traditional: false },
        { feature: "Omnichannel (WhatsApp, chat, voice)", featureAr: "متعدد القنوات", ai: true, traditional: "Partial", traditionalAr: "جزئي" },
        { feature: "Full conversation history access", featureAr: "الوصول إلى سجل المحادثة", ai: true, traditional: "Partial", traditionalAr: "جزئي" },
        { feature: "Proactive issue detection", featureAr: "الكشف الاستباقي عن المشكلات", ai: true, traditional: false },
        { feature: "PDPL compliant", featureAr: "متوافق مع PDPL", ai: true, traditional: "Varies", traditionalAr: "يتفاوت" },
      ]}
      benefits={[
        { title: "70% cost reduction", titleAr: "تخفيض التكاليف بـ 70%", desc: "When AI resolves 80% of tickets automatically, you need far fewer human agents — dramatically cutting support costs.", descAr: "عندما يحل الذكاء الاصطناعي 80% من التذاكر تلقائياً، تحتاج إلى وكلاء بشريين أقل بكثير — مما يخفض تكاليف الدعم بشكل كبير." },
        { title: "Peak demand, no problem", titleAr: "الطلب الذروي، لا مشكلة", desc: "Ramadan surges, product launches, viral complaints — AI handles any volume without hiring more staff.", descAr: "ذروة رمضان وإطلاق المنتجات والشكاوى المنتشرة — يتعامل الذكاء الاصطناعي مع أي حجم دون توظيف موظفين إضافيين." },
        { title: "Consistent, always professional", titleAr: "متسق واحترافي دائماً", desc: "Every customer gets the same professional, accurate response — no bad days, no burnout, no off-script responses.", descAr: "كل عميل يحصل على نفس الرد الاحترافي الدقيق — لا أيام سيئة، لا إرهاق، لا ردود خارج النص." },
        { title: "Human agents for complex cases", titleAr: "وكلاء بشريون للحالات المعقدة", desc: "AI handles the routine so your best people focus on the complex, high-value cases that truly need human judgment.", descAr: "يتعامل الذكاء الاصطناعي مع الروتيني حتى يركز أفضل موظفيك على الحالات المعقدة عالية القيمة التي تحتاج حقاً إلى حكم بشري." },
      ]}
      faqs={[
        { q: "How does the AI handle complex or emotionally charged complaints?", qAr: "كيف يتعامل الذكاء الاصطناعي مع الشكاوى المعقدة أو المشحونة عاطفياً؟", a: "The AI detects emotional cues and complaint severity, offering immediate empathy and resolution where possible, and escalating to a senior human agent with full context when needed — with a suggested response.", aAr: "يكتشف الذكاء الاصطناعي الإشارات العاطفية وشدة الشكوى، ويُقدّم التعاطف الفوري والحل حيثما أمكن، ويُصعّد إلى وكيل بشري مع السياق الكامل عند الحاجة." },
        { q: "How accurate are the AI's responses?", qAr: "ما مدى دقة ردود الذكاء الاصطناعي؟", a: "Accuracy is directly tied to your knowledge base quality. We train the AI on your specific product documentation, policies, and FAQs — achieving 95%+ accuracy on in-scope queries.", aAr: "الدقة مرتبطة مباشرة بجودة قاعدة معرفتك. ندرّب الذكاء الاصطناعي على وثائق منتجاتك وسياساتك وأسئلتك الشائعة — محققين دقة 95%+ على الاستفسارات ذات النطاق المحدد." },
        { q: "Can it handle returns and refunds?", qAr: "هل يمكنه التعامل مع الإرجاعات والمبالغ المستردة؟", a: "Yes. With integration to your OMS and refund system, the AI can process standard returns, issue refund confirmations, and arrange exchanges — escalating only exceptions.", aAr: "نعم. مع التكامل مع OMS ونظام الاسترداد، يمكن للذكاء الاصطناعي معالجة الإرجاعات القياسية وإصدار تأكيدات الاسترداد وترتيب التبادلات." },
        { q: "How long does it take to train the AI on our products?", qAr: "كم يستغرق تدريب الذكاء الاصطناعي على منتجاتنا؟", a: "Most businesses are live within 48–72 hours. We ingest your existing documentation and FAQs, train the AI, and run quality checks before going live.", aAr: "معظم الشركات تعمل خلال 48-72 ساعة. نستوعب وثائقك وأسئلتك الشائعة الموجودة، وندرّب الذكاء الاصطناعي، ونجري فحوصات الجودة قبل الإطلاق." },
      ]}
      ctaTitle="Transform Your Customer Support Today"
      ctaTitleAr="حوّل دعم عملائك اليوم"
      ctaSub="80% auto-resolution. 70% cost reduction. Happier customers — all at once."
      ctaSubAr="80% حل تلقائي. 70% تخفيض تكاليف. عملاء أكثر سعادة — كل ذلك في آن واحد."
      relatedAgent="ai-customer-support"
      seoTitle="AI Customer Support vs Traditional Support Saudi Arabia | Electi"
      seoDescription="AI Customer Support vs Traditional Support Teams. 80% auto-resolution, 70% cost reduction, under 2 second response. Saudi Arabia PDPL compliant."
      seoPath="/compare/ai-support-vs-traditional"
    />
  );
}
