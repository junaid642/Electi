import { MessageSquare, Zap, Globe, BarChart3, Shield, Clock, Users, ShoppingCart, Building2, Star, Phone, CheckCircle } from "lucide-react";
import MarketplacePage from "@/components/templates/MarketplacePage";

export default function AIWhatsAppAgentPage() {
  return (
    <MarketplacePage
      badge="AI WhatsApp Agent"
      badgeAr="وكيل واتساب الذكي"
      icon={MessageSquare}
      title="AI WhatsApp Agent"
      titleAr="وكيل واتساب الذكي"
      titleAccent="Saudi Arabia's Favourite Channel"
      tagline="Automate sales, support, and reservations on WhatsApp — where your customers already are."
      taglineAr="أتمت المبيعات والدعم والحجوزات على واتساب — حيث يوجد عملاؤك بالفعل."
      description="WhatsApp is used by 97% of Saudi smartphone users. Electi's AI WhatsApp Agent turns your business number into a 24/7 intelligent assistant that sells, supports, and books — in Arabic and English."
      descriptionAr="يستخدم 97% من مستخدمي الهواتف الذكية السعودية واتساب. يحوّل وكيل واتساب الذكي من Electi رقم عملك إلى مساعد ذكي يعمل 24/7."
      heroStats={[
        { value: "97%", label: "Saudi WhatsApp Usage", labelAr: "استخدام السعوديين لواتساب" },
        { value: "98%", label: "Message Open Rate", labelAr: "معدل فتح الرسائل" },
        { value: "< 5s", label: "Auto-Response Time", labelAr: "وقت الرد التلقائي" },
        { value: "24/7", label: "Always Available", labelAr: "متاح دائماً" },
      ]}
      features={[
        { icon: Zap, title: "Instant Auto-Reply", desc: "Responds to every WhatsApp message within seconds — day or night, weekday or weekend." },
        { icon: ShoppingCart, title: "In-Chat Sales", desc: "Showcase products, take orders, and process payments entirely within the WhatsApp conversation." },
        { icon: Clock, title: "Reservation & Booking", desc: "Books restaurant reservations, hotel rooms, and appointments directly through WhatsApp." },
        { icon: Globe, title: "Arabic-First Design", desc: "Writes in natural Arabic with full RTL support — not machine-translated responses." },
        { icon: BarChart3, title: "Conversation Analytics", desc: "Track message volumes, response rates, conversion funnels, and customer satisfaction per chat." },
        { icon: Shield, title: "Official WhatsApp Business API", desc: "Runs on the official Meta WhatsApp Business API — fully compliant with CITC and Meta policies." },
      ]}
      useCases={[
        { icon: Building2, label: "Restaurants & Cafés", desc: "Take reservations, share menus, answer queries, and collect feedback on WhatsApp." },
        { icon: Star, label: "Real Estate Agencies", desc: "Share property listings, qualify buyers, and book viewings directly in WhatsApp chats." },
        { icon: Users, label: "Clinics & Hospitals", desc: "Book appointments, share test results, and send medication reminders via WhatsApp." },
        { icon: ShoppingCart, label: "E-commerce Stores", desc: "Send order updates, handle returns, and re-engage abandoned cart customers automatically." },
        { icon: Phone, label: "Service Businesses", desc: "Capture leads from WhatsApp ads, qualify prospects, and book consultations." },
        { icon: CheckCircle, label: "Government Services", desc: "Provide citizens with service information, document requirements, and appointment scheduling." },
      ]}
      industries={["Restaurants & F&B", "Real Estate", "Healthcare", "E-commerce", "Retail", "Hospitality", "Financial Services", "Government", "Education", "Corporate"]}
      industriesAr={["المطاعم والأغذية", "العقارات", "الرعاية الصحية", "التجارة الإلكترونية", "التجزئة", "الضيافة", "الخدمات المالية", "الحكومي", "التعليم", "الشركات"]}
      benefits={[
        { title: "98% message open rate", desc: "WhatsApp messages are read instantly — far higher than email or SMS." },
        { title: "Zero app download", desc: "Customers engage through the app they already use and love." },
        { title: "Official API compliant", desc: "Built on Meta's official Business API — no account banning risk." },
        { title: "Full Arabic support", desc: "Native Arabic, not translated — customers feel understood." },
      ]}
      benefitsAr={[
        { title: "معدل فتح 98%", desc: "رسائل واتساب تُقرأ فوراً — أعلى بكثير من البريد الإلكتروني أو الرسائل القصيرة." },
        { title: "لا تحميل للتطبيقات", desc: "يتفاعل العملاء عبر التطبيق الذي يستخدمونه ويحبونه." },
        { title: "متوافق مع API الرسمي", desc: "مبني على API واتساب للأعمال الرسمي من Meta — لا خطر حظر الحساب." },
        { title: "دعم عربي كامل", desc: "عربية أصيلة وليست مترجمة — العملاء يشعرون بأنهم مفهومون." },
      ]}
      faqs={[
        { q: "Do you use the official WhatsApp Business API?", a: "Yes. Electi uses the official Meta WhatsApp Business API, which means your account is protected from banning and all messages comply with WhatsApp's commerce policies." },
        { q: "Can the AI send proactive messages?", a: "Yes, using WhatsApp-approved message templates. These are ideal for order confirmations, appointment reminders, payment reminders, and re-engagement campaigns." },
        { q: "How do customers start a conversation?", a: "Multiple entry points: QR codes, WhatsApp links (wa.me), Click-to-WhatsApp ads, website chat widgets, or by simply messaging your business number." },
        { q: "Can it handle media like images and PDFs?", a: "Yes. The AI can send product images, brochures, PDF menus, and property listings — and process images sent by customers (e.g., receipts, ID documents)." },
        { q: "Is it compliant with CITC regulations?", a: "All our WhatsApp deployments comply with CITC (Communications and Information Technology Commission) guidelines for commercial messaging in Saudi Arabia." },
      ]}
      faqsAr={[
        { q: "هل تستخدمون API واتساب للأعمال الرسمي؟", a: "نعم. يستخدم Electi API واتساب للأعمال الرسمي من Meta، مما يعني أن حسابك محمي من الحظر وجميع الرسائل متوافقة مع سياسات واتساب." },
        { q: "هل يمكن للذكاء الاصطناعي إرسال رسائل استباقية؟", a: "نعم، باستخدام قوالب الرسائل المعتمدة من واتساب. مثالية لتأكيدات الطلبات وتذكيرات المواعيد وحملات إعادة التفاعل." },
        { q: "كيف يبدأ العملاء محادثة؟", a: "نقاط دخول متعددة: رموز QR وروابط واتساب وإعلانات اضغط للواتساب وعناصر دردشة الموقع أو بالرسالة المباشرة إلى رقمك." },
        { q: "هل يمكنه التعامل مع الوسائط كالصور وملفات PDF؟", a: "نعم. يمكن للذكاء الاصطناعي إرسال صور المنتجات والكتيبات وقوائم PDF وقوائم العقارات، ومعالجة الصور المُرسلة من العملاء." },
        { q: "هل هو متوافق مع لوائح هيئة الاتصالات؟", a: "جميع عمليات النشر عبر واتساب متوافقة مع إرشادات هيئة الاتصالات وتقنية المعلومات للمراسلة التجارية في المملكة العربية السعودية." },
      ]}
      ctaTitle="Turn WhatsApp Into Your Best Sales Channel"
      ctaTitleAr="حوّل واتساب إلى أفضل قناة مبيعات لديك"
      ctaSub="97% of your Saudi customers are on WhatsApp. Meet them where they are, automatically."
      ctaSubAr="97% من عملائك السعوديين على واتساب. التقِهم أينما كانوا، تلقائياً."
      seoTitle="AI WhatsApp Agent Saudi Arabia | Electi"
      seoDescription="AI WhatsApp Agent for Saudi businesses. Automates sales, support, and bookings on WhatsApp. Official Meta API. Arabic and English support. CITC compliant."
      seoPath="/marketplace/ai-whatsapp"
    />
  );
}
