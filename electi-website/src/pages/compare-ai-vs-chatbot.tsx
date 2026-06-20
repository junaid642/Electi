import { Zap } from "lucide-react";
import ComparisonPage from "@/components/templates/ComparisonPage";

export default function AIVsChatbotPage() {
  return (
    <ComparisonPage
      badge="AI Agent vs Chatbot"
      badgeAr="وكيل الذكاء الاصطناعي مقابل الشات بوت"
      icon={Zap}
      title="AI Agent vs Chatbot: What's the Difference?"
      titleAr="وكيل الذكاء الاصطناعي مقابل الشات بوت: ما الفرق؟"
      subtitle="Understanding why AI Agents outperform traditional chatbots for Saudi businesses."
      subtitleAr="فهم لماذا تتفوق وكلاء الذكاء الاصطناعي على الشات بوت التقليدية للشركات السعودية."
      description="Chatbots follow scripts. AI Agents think, adapt, and take action. For businesses serious about automation, the difference is transformational."
      descriptionAr="الشات بوت يتبع نصوصاً. وكلاء الذكاء الاصطناعي يفكرون ويتكيفون ويتصرفون. للشركات الجادة في الأتمتة، الفرق تحويلي."
      aiLabel="AI Agent (Electi)"
      aiLabelAr="وكيل الذكاء الاصطناعي (Electi)"
      traditionalLabel="Traditional Chatbot"
      traditionalLabelAr="الشات بوت التقليدي"
      heroStats={[
        { value: "10×", label: "More Capable", labelAr: "أكثر قدرة" },
        { value: "98%", label: "Query Resolution", labelAr: "حل الاستفسارات" },
        { value: "0", label: "Script Required", labelAr: "لا نصوص مطلوبة" },
        { value: "24/7", label: "Adaptive Support", labelAr: "دعم تكيفي" },
      ]}
      rows={[
        { feature: "Understands natural language", featureAr: "يفهم اللغة الطبيعية", ai: true, traditional: false },
        { feature: "Handles Arabic dialects", featureAr: "يتعامل مع اللهجات العربية", ai: true, traditional: false },
        { feature: "Learns from conversations", featureAr: "يتعلم من المحادثات", ai: true, traditional: false },
        { feature: "Follows scripts only", featureAr: "يتبع النصوص فقط", ai: false, traditional: true },
        { feature: "Takes real actions (book, update, send)", featureAr: "يتخذ إجراءات فعلية", ai: true, traditional: false },
        { feature: "Integrates with CRM / ERP", featureAr: "يتكامل مع أنظمة الأعمال", ai: true, traditional: "Limited" },
        { feature: "Handles complex multi-turn conversations", featureAr: "يتعامل مع محادثات متعددة الأدوار", ai: true, traditional: false },
        { feature: "Escalates to human intelligently", featureAr: "يُصعّد بذكاء إلى إنسان", ai: true, traditional: false },
        { feature: "Voice channel support", featureAr: "يدعم قناة الصوت", ai: true, traditional: false },
        { feature: "Requires ongoing script maintenance", featureAr: "يتطلب صيانة مستمرة للنصوص", ai: false, traditional: true },
        { feature: "PDPL compliant data handling", featureAr: "معالجة بيانات متوافقة مع PDPL", ai: true, traditional: "Varies" },
        { feature: "Proactive outreach (reminders, follow-ups)", featureAr: "تواصل استباقي", ai: true, traditional: false },
      ]}
      benefits={[
        { title: "No scripts to write or maintain", titleAr: "لا نصوص للكتابة أو الصيانة", desc: "AI Agents understand intent from context — no need to map every possible conversation path.", descAr: "وكلاء الذكاء الاصطناعي يفهمون النية من السياق — لا حاجة لرسم كل مسار محادثة محتمل." },
        { title: "Handles the unexpected", titleAr: "يتعامل مع غير المتوقع", desc: "When a customer says something the chatbot wasn't trained for, it fails. AI Agents adapt gracefully.", descAr: "عندما يقول عميل شيئاً لم يُدرَّب عليه الشات بوت، يفشل. وكلاء الذكاء الاصطناعي يتكيفون بسلاسة." },
        { title: "Actually takes action", titleAr: "يتخذ إجراءات فعلية", desc: "AI Agents book appointments, update CRMs, process orders, and send notifications — chatbots just talk.", descAr: "وكلاء الذكاء الاصطناعي يحجزون المواعيد ويُحدّثون أنظمة إدارة العملاء ويعالجون الطلبات." },
        { title: "Arabic-native understanding", titleAr: "فهم عربي أصيل", desc: "Real Arabic comprehension including Gulf dialects, not keyword-matching in Arabic script.", descAr: "فهم عربي حقيقي بما في ذلك اللهجات الخليجية، وليس مجرد مطابقة كلمات مفتاحية." },
      ]}
      faqs={[
        { q: "Are AI Agents more expensive than chatbots?", qAr: "هل وكلاء الذكاء الاصطناعي أغلى من الشات بوت؟", a: "The upfront investment is higher, but AI Agents deliver dramatically more value — handling complex queries, taking real actions, and requiring far less ongoing maintenance than rule-based chatbots.", aAr: "الاستثمار الأولي أعلى، لكن وكلاء الذكاء الاصطناعي يقدمون قيمة أكبر بكثير — يتعاملون مع الاستفسارات المعقدة ويتخذون إجراءات فعلية ويتطلبون صيانة أقل بكثير." },
        { q: "Can an AI Agent replace our existing chatbot?", qAr: "هل يمكن لوكيل الذكاء الاصطناعي استبدال الشات بوت الحالي؟", a: "Yes. Electi's AI Agent can be deployed on the same channels as your existing chatbot. Most clients see immediate improvement in resolution rates and customer satisfaction when switching.", aAr: "نعم. يمكن نشر وكيل Electi الذكي على نفس قنوات الشات بوت الحالي. معظم العملاء يرون تحسناً فورياً في معدلات الحل ورضا العملاء عند التبديل." },
        { q: "How does an AI Agent handle Arabic text?", qAr: "كيف يتعامل وكيل الذكاء الاصطناعي مع النص العربي؟", a: "Electi's AI is trained on Arabic language including formal (Fusha) and Gulf dialects. It understands colloquial Saudi Arabic, not just formal text — making conversations feel natural to Saudi users.", aAr: "ذكاء Electi مدرَّب على اللغة العربية بما في ذلك الفصحى واللهجات الخليجية. يفهم العامية السعودية، مما يجعل المحادثات تبدو طبيعية للمستخدمين السعوديين." },
        { q: "What happens when the AI Agent doesn't know the answer?", qAr: "ماذا يحدث عندما لا يعرف وكيل الذكاء الاصطناعي الإجابة؟", a: "Unlike chatbots that display 'I don't understand' messages, AI Agents intelligently escalate to a human with full context — or ask clarifying questions to get to the right answer.", aAr: "على عكس الشات بوت الذي يعرض رسائل 'لا أفهم'، يُصعّد وكلاء الذكاء الاصطناعي بذكاء إلى إنسان مع السياق الكامل — أو يطرحون أسئلة توضيحية." },
      ]}
      ctaTitle="Upgrade from Chatbot to AI Agent"
      ctaTitleAr="ترقَّ من الشات بوت إلى وكيل الذكاء الاصطناعي"
      ctaSub="See the difference in your first week. Most clients double their resolution rate within 30 days."
      ctaSubAr="شاهد الفرق في أسبوعك الأول. معظم العملاء يضاعفون معدل الحل خلال 30 يوماً."
      seoTitle="AI Agent vs Chatbot Saudi Arabia | Electi"
      seoDescription="AI Agent vs Chatbot comparison for Saudi businesses. Learn why AI Agents outperform traditional chatbots with Arabic support, real actions, and zero scripts."
      seoPath="/compare/ai-agent-vs-chatbot"
    />
  );
}
