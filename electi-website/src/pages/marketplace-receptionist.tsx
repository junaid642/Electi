import { Phone, Clock, Globe, Zap, MessageSquare, Calendar, Users, Building2, Star, BarChart3, Shield, Headphones } from "lucide-react";
import MarketplacePage from "@/components/templates/MarketplacePage";

export default function AIReceptionistPage() {
  return (
    <MarketplacePage
      badge="AI Receptionist"
      badgeAr="المستقبل الذكي"
      icon={Phone}
      title="AI Receptionist"
      titleAr="المستقبل الذكي"
      titleAccent="for Saudi Businesses"
      tagline="Never miss a call. Never lose a lead. Available 24/7 in Arabic and English."
      taglineAr="لا تفوّت مكالمة. لا تخسر عميلاً. متاح على مدار الساعة بالعربية والإنجليزية."
      description="Electi's AI Receptionist answers every call, qualifies leads, books appointments, and handles FAQs — all in natural Arabic and English. Deploy in minutes, no hardware needed."
      descriptionAr="يجيب مستقبل Electi الذكي على كل مكالمة، ويؤهل العملاء المحتملين، ويحجز المواعيد، ويتعامل مع الأسئلة الشائعة — كل ذلك باللغة العربية والإنجليزية الطبيعية."
      heroStats={[
        { value: "24/7", label: "Availability", labelAr: "متاح دائماً" },
        { value: "< 1s", label: "Response Time", labelAr: "وقت الاستجابة" },
        { value: "98%", label: "Satisfaction", labelAr: "رضا العملاء" },
        { value: "0", label: "Missed Calls", labelAr: "مكالمات فائتة" },
      ]}
      features={[
        { icon: Globe, title: "Bilingual Arabic & English", desc: "Communicates fluently in Arabic and English, automatically detecting caller language for a seamless experience." },
        { icon: Calendar, title: "Appointment Scheduling", desc: "Books, reschedules, and cancels appointments directly into your calendar system without human intervention." },
        { icon: Zap, title: "Instant Lead Qualification", desc: "Captures caller details, qualifies intent, and routes hot leads to your sales team in real time." },
        { icon: MessageSquare, title: "FAQ Handling", desc: "Answers hundreds of frequently asked questions about your services, pricing, and locations instantly." },
        { icon: BarChart3, title: "Call Analytics", desc: "Detailed reports on call volume, peak times, common queries, and lead conversion rates." },
        { icon: Shield, title: "PDPL Compliant", desc: "All call data is stored securely within Saudi Arabia, fully compliant with PDPL data protection regulations." },
      ]}
      useCases={[
        { icon: Building2, label: "Hotels & Resorts", desc: "Handle reservations, room queries, and concierge requests around the clock." },
        { icon: Headphones, label: "Medical Clinics", desc: "Manage appointment booking, insurance queries, and doctor availability." },
        { icon: Users, label: "Real Estate Offices", desc: "Qualify property inquiries and schedule site visits automatically." },
        { icon: Star, label: "Retail & Restaurants", desc: "Handle opening hours, menu questions, reservations, and order status." },
        { icon: Phone, label: "Law Firms", desc: "Screen potential clients, collect case details, and route to the right attorney." },
        { icon: Clock, label: "Government Services", desc: "Provide 24/7 information on services, documents required, and office hours." },
      ]}
      industries={["Healthcare", "Hospitality", "Real Estate", "Retail", "Legal", "Financial Services", "Education", "Government", "Construction", "Corporate"]}
      industriesAr={["الرعاية الصحية", "الضيافة", "العقارات", "التجزئة", "القانوني", "الخدمات المالية", "التعليم", "الحكومي", "البناء", "الشركات"]}
      benefits={[
        { title: "Zero missed calls", desc: "Every inbound call is answered instantly, day or night." },
        { title: "60% cost reduction", desc: "Replace expensive front-desk staff with intelligent automation." },
        { title: "Instant deployment", desc: "Go live in minutes with no hardware or IT infrastructure." },
        { title: "Full Arabic support", desc: "Native Arabic voice and text, not just translation." },
      ]}
      benefitsAr={[
        { title: "لا مكالمات فائتة", desc: "يتم الرد على كل مكالمة واردة فوراً، ليلاً أو نهاراً." },
        { title: "توفير 60% من التكاليف", desc: "استبدل موظفي الاستقبال المكلفين بأتمتة ذكية." },
        { title: "نشر فوري", desc: "ابدأ العمل في دقائق دون أجهزة أو بنية تحتية." },
        { title: "دعم عربي كامل", desc: "صوت ونص عربي أصيل، وليس مجرد ترجمة." },
      ]}
      faqs={[
        { q: "Can the AI Receptionist handle Arabic dialects?", a: "Yes. Electi's AI Receptionist understands Gulf Arabic dialects including Saudi, Emirati, and Kuwaiti, as well as Modern Standard Arabic (Fusha) for a seamless caller experience." },
        { q: "How long does it take to set up?", a: "Most businesses are live within 24–48 hours. We handle number porting, script configuration, and integration with your calendar or CRM." },
        { q: "Can it integrate with my existing phone system?", a: "Yes. We integrate with SIP trunks, VoIP providers, and major PBX systems. We also support WhatsApp Business for text-based reception." },
        { q: "What happens when a caller needs a human?", a: "The AI seamlessly transfers the call to a human agent when it detects complex situations, frustration signals, or when the caller explicitly requests a human." },
        { q: "Is the data stored in Saudi Arabia?", a: "All call recordings and data are stored on Saudi Arabia–hosted servers, in full compliance with PDPL (Personal Data Protection Law)." },
        { q: "Can it handle multiple calls simultaneously?", a: "Unlike human receptionists, the AI handles unlimited simultaneous calls with zero wait time for callers." },
      ]}
      faqsAr={[
        { q: "هل يمكن للمستقبل الذكي التعامل مع اللهجات العربية؟", a: "نعم. يفهم مستقبل Electi الذكي اللهجات الخليجية بما فيها السعودية والإماراتية والكويتية، فضلاً عن الفصحى." },
        { q: "كم يستغرق الإعداد؟", a: "تبدأ معظم الشركات العمل خلال 24-48 ساعة. نتولى نقل الأرقام وضبط السكريبت والتكامل مع التقويم أو CRM." },
        { q: "هل يمكن دمجه مع نظام الهاتف الموجود؟", a: "نعم. ندعم بروتوكولات SIP وVoIP وأنظمة PBX الرئيسية، وكذلك واتساب للأعمال." },
        { q: "ماذا يحدث عندما يحتاج المتصل إلى إنسان؟", a: "يحول الذكاء الاصطناعي المكالمة بسلاسة إلى موظف بشري عند اكتشاف الحالات المعقدة أو طلب المتصل ذلك." },
        { q: "هل البيانات مخزنة في المملكة العربية السعودية؟", a: "نعم، جميع التسجيلات والبيانات مخزنة على خوادم في المملكة، متوافقة تماماً مع نظام حماية البيانات الشخصية." },
        { q: "هل يمكنه التعامل مع مكالمات متعددة في وقت واحد؟", a: "على عكس المستقبلين البشريين، يتعامل الذكاء الاصطناعي مع مكالمات غير محدودة في آن واحد دون أي انتظار." },
      ]}
      ctaTitle="Deploy Your AI Receptionist Today"
      ctaTitleAr="انشر مستقبلك الذكي اليوم"
      ctaSub="Join hundreds of Saudi businesses that never miss a call. Set up in 24 hours, cancel anytime."
      ctaSubAr="انضم إلى مئات الشركات السعودية التي لا تفوّت أي مكالمة. الإعداد في 24 ساعة، ويمكن الإلغاء في أي وقت."
      seoTitle="AI Receptionist Saudi Arabia | Electi"
      seoDescription="AI Receptionist for Saudi businesses. Answers calls 24/7 in Arabic and English, books appointments, qualifies leads. PDPL compliant. Deploy in 24 hours."
      seoPath="/marketplace/ai-receptionist"
    />
  );
}
