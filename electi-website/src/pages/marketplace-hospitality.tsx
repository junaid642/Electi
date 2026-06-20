import { Star, Calendar, MessageSquare, Globe, Zap, BarChart3, Users, Building2, Clock, Shield, CheckCircle, Phone } from "lucide-react";
import MarketplacePage from "@/components/templates/MarketplacePage";

export default function AIHospitalityAgentPage() {
  return (
    <MarketplacePage
      badge="AI Hospitality Agent"
      badgeAr="وكيل الضيافة الذكي"
      icon={Star}
      title="AI Hospitality Agent"
      titleAr="وكيل الضيافة الذكي"
      titleAccent="for Saudi Hotels & Resorts"
      tagline="Elevate guest experience with 24/7 AI that handles reservations, concierge, and service requests — in Arabic and English."
      taglineAr="ارتقِ بتجربة الضيوف مع ذكاء اصطناعي يعمل 24/7 يتعامل مع الحجوزات وخدمات الكونسيرج وطلبات الخدمة."
      description="Saudi Arabia's booming tourism sector demands exceptional guest service at scale. Electi's AI Hospitality Agent handles the entire guest journey — from pre-arrival queries to in-stay requests to post-checkout feedback collection."
      descriptionAr="يتطلب قطاع السياحة السعودي المزدهر خدمة ضيوف استثنائية على نطاق واسع. يتعامل وكيل الضيافة الذكي من Electi مع رحلة الضيف بأكملها."
      heroStats={[
        { value: "40%", label: "Faster Check-in", labelAr: "تسجيل وصول أسرع" },
        { value: "4.9★", label: "Avg Guest Rating", labelAr: "تقييم الضيوف" },
        { value: "24/7", label: "Guest Support", labelAr: "دعم الضيوف" },
        { value: "60%", label: "Service Cost Reduction", labelAr: "تخفيض التكاليف" },
      ]}
      features={[
        { icon: Calendar, title: "Reservation Management", desc: "Handles room bookings, modifications, cancellations, and special requests in Arabic and English." },
        { icon: Star, title: "Concierge Services", desc: "Recommends restaurants, arranges transport, books tours, and answers local experience questions." },
        { icon: MessageSquare, title: "In-Stay Request Handling", desc: "Guests request housekeeping, maintenance, room service, and amenities via WhatsApp — fulfilled instantly." },
        { icon: Globe, title: "Multilingual Guest Support", desc: "Serves Saudi, GCC, expat, and international guests in Arabic, English, and other languages on enterprise plans." },
        { icon: BarChart3, title: "Guest Satisfaction Tracking", desc: "Collects real-time feedback during and after stays, flagging issues before guests post negative reviews." },
        { icon: Zap, title: "Upselling & Revenue", desc: "Proactively offers room upgrades, spa packages, dining experiences, and late checkout — increasing RevPAR." },
      ]}
      useCases={[
        { icon: Building2, label: "Luxury Hotels", desc: "Deliver white-glove AI concierge service at every touchpoint without increasing headcount." },
        { icon: Users, label: "Resort Complexes", desc: "Manage activities scheduling, F&B reservations, and beach/pool service requests." },
        { icon: Star, label: "Boutique Properties", desc: "Offer personalised guest experiences with AI that knows each guest's preferences and history." },
        { icon: Clock, label: "Serviced Apartments", desc: "Handle long-stay guest needs including maintenance, housekeeping schedules, and local recommendations." },
        { icon: Phone, label: "Hotel Chains", desc: "Standardize guest communication quality across all properties in Saudi Arabia." },
        { icon: CheckCircle, label: "Event Venues", desc: "Support event planners with capacity queries, catering options, AV requests, and scheduling." },
      ]}
      industries={["Luxury Hotels", "Resorts", "Boutique Hotels", "Serviced Apartments", "Hotel Chains", "Event Venues", "Restaurants", "Tourism Operators"]}
      industriesAr={["الفنادق الفاخرة", "المنتجعات", "الفنادق البوتيك", "الشقق الفندقية", "سلاسل الفنادق", "قاعات الفعاليات", "المطاعم", "مشغّلو السياحة"]}
      benefits={[
        { title: "Higher guest satisfaction", desc: "Instant response to every request eliminates frustration and drives 5-star reviews." },
        { title: "Increased RevPAR", desc: "AI-driven upselling of upgrades and experiences boosts revenue per available room." },
        { title: "60% service cost reduction", desc: "Handle the same volume of guest requests with a leaner team." },
        { title: "Vision 2030 ready", desc: "Scale hospitality capacity for Saudi Arabia's 150M visitor target." },
      ]}
      benefitsAr={[
        { title: "رضا أعلى للضيوف", desc: "الرد الفوري على كل طلب يُلغي الإحباط ويدفع تقييمات 5 نجوم." },
        { title: "زيادة RevPAR", desc: "البيع الإضافي المدفوع بالذكاء الاصطناعي للترقيات والتجارب يزيد الإيرادات لكل غرفة." },
        { title: "تخفيض تكاليف الخدمة بـ 60%", desc: "التعامل مع نفس حجم طلبات الضيوف بفريق أصغر." },
        { title: "جاهز لرؤية 2030", desc: "توسيع الطاقة الاستيعابية للضيافة لاستهداف 150 مليون زائر في المملكة." },
      ]}
      faqs={[
        { q: "Can the AI handle special requests like dietary needs or accessibility?", a: "Yes. The AI captures and communicates special requests to the relevant department — dietary restrictions to F&B, accessibility needs to housekeeping and rooms — and follows up to confirm fulfillment." },
        { q: "How does it integrate with our PMS?", a: "We integrate with major Property Management Systems including Opera, Mews, Cloudbeds, and local Saudi hospitality platforms. Reservation and guest data syncs in real time." },
        { q: "Can it support multiple languages for international guests?", a: "Arabic and English are fully supported. Additional languages (Urdu, Hindi, French, Chinese) are available for international properties on enterprise plans." },
        { q: "How does it handle complaints?", a: "The AI resolves what it can instantly (service recovery offers, immediate escalation to management) and logs every complaint with severity rating for the guest relations team." },
        { q: "Is it suitable for religious tourism (Hajj/Umrah)?", a: "Yes. We have specific configurations for Hajj and Umrah hospitality operations in Makkah and Madinah, supporting high-volume, multilingual pilgrim services." },
      ]}
      faqsAr={[
        { q: "هل يمكن للذكاء الاصطناعي التعامل مع الطلبات الخاصة كالاحتياجات الغذائية أو إمكانية الوصول؟", a: "نعم. يلتقط الذكاء الاصطناعي الطلبات الخاصة ويُبلّغ الإدارة المعنية — المتطلبات الغذائية للأغذية، واحتياجات إمكانية الوصول للتدبير المنزلي — ويتابع لتأكيد التنفيذ." },
        { q: "كيف يتكامل مع نظام إدارة العقارات لدينا؟", a: "نتكامل مع أنظمة إدارة العقارات الرئيسية بما فيها Opera وMews وCloudbeds ومنصات الضيافة السعودية المحلية." },
        { q: "هل يدعم لغات متعددة للضيوف الدوليين؟", a: "العربية والإنجليزية مدعومتان بالكامل. لغات إضافية (أردو، هندي، فرنسي، صيني) متاحة للعقارات الدولية في خطط المؤسسات." },
        { q: "كيف يتعامل مع الشكاوى؟", a: "يحل الذكاء الاصطناعي ما يمكنه فوراً ويُصعّد إلى الإدارة ويُسجّل كل شكوى مع تقييم الخطورة لفريق علاقات الضيوف." },
        { q: "هل هو مناسب للسياحة الدينية (الحج والعمرة)؟", a: "نعم. لدينا تكوينات محددة لعمليات ضيافة الحج والعمرة في مكة المكرمة والمدينة المنورة، تدعم خدمات الحجاج عالية الحجم متعددة اللغات." },
      ]}
      ctaTitle="Deliver 5-Star Guest Experiences at Scale"
      ctaTitleAr="قدّم تجارب ضيوف من 5 نجوم على نطاق واسع"
      ctaSub="Saudi Arabia's tourism boom is here. Serve every guest exceptionally — with AI."
      ctaSubAr="ازدهار السياحة السعودية هنا. خدمة كل ضيف باستثنائية — مع الذكاء الاصطناعي."
      seoTitle="AI Hospitality Agent Saudi Arabia | Electi"
      seoDescription="AI Hospitality Agent for Saudi hotels and resorts. Handles reservations, concierge, and guest requests 24/7 in Arabic and English. Vision 2030 ready."
      seoPath="/marketplace/ai-hospitality"
    />
  );
}
