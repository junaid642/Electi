import { Building2, Search, Calendar, BarChart3, Globe, Zap, Users, Star, MessageSquare, FileText, Clock, CheckCircle } from "lucide-react";
import MarketplacePage from "@/components/templates/MarketplacePage";

export default function AIPropertyAgentPage() {
  return (
    <MarketplacePage
      badge="AI Property Agent"
      badgeAr="وكيل العقارات الذكي"
      icon={Building2}
      title="AI Property Agent"
      titleAr="وكيل العقارات الذكي"
      titleAccent="for Saudi Real Estate"
      tagline="Qualify buyers, match properties, book viewings, and nurture leads — automatically, in Arabic and English."
      taglineAr="أهّل المشترين وطابق العقارات واحجز جولات الاطلاع ورعاية العملاء — تلقائياً، بالعربية والإنجليزية."
      description="Saudi Arabia's real estate market is booming under Vision 2030. Electi's AI Property Agent helps agencies and developers engage every inquiry instantly, qualify serious buyers, and convert more leads into transactions."
      descriptionAr="يزدهر سوق العقارات السعودي في ظل رؤية 2030. يساعد وكيل العقارات الذكي من Electi الوكالات والمطورين على التفاعل مع كل استفسار فوراً وتأهيل المشترين الجادين."
      heroStats={[
        { value: "3×", label: "More Viewings Booked", labelAr: "جولات اطلاع أكثر" },
        { value: "80%", label: "Leads Qualified Auto", labelAr: "عملاء مؤهلون تلقائياً" },
        { value: "24/7", label: "Inquiry Response", labelAr: "رد على الاستفسارات" },
        { value: "< 30s", label: "Lead Response Time", labelAr: "وقت الرد" },
      ]}
      features={[
        { icon: Search, title: "Smart Property Matching", desc: "Matches buyer requirements (budget, location, size, type) to your listing inventory instantly." },
        { icon: Calendar, title: "Viewing Scheduler", desc: "Books property viewings directly into agent calendars, with automated reminders for all parties." },
        { icon: Zap, title: "Lead Qualification", desc: "Qualifies buyers on budget, timeline, mortgage status, and decision authority before passing to agents." },
        { icon: Globe, title: "Arabic & English", desc: "Engages Saudi nationals and expats fluently in their preferred language." },
        { icon: BarChart3, title: "Pipeline Dashboard", desc: "Real-time view of leads by stage, agent, property type, and projected close value." },
        { icon: MessageSquare, title: "WhatsApp Integration", desc: "Engage property inquiries directly on WhatsApp — where Saudi buyers prefer to communicate." },
      ]}
      useCases={[
        { icon: Building2, label: "Off-Plan Sales", desc: "Qualify and nurture investors for off-plan developments from launch through handover." },
        { icon: Users, label: "Residential Leasing", desc: "Handle apartment and villa rental inquiries, schedule viewings, and process applications." },
        { icon: Star, label: "Commercial Real Estate", desc: "Qualify business tenants, share floor plans, and arrange site visits for office and retail space." },
        { icon: FileText, label: "Property Management", desc: "Handle tenant maintenance requests, lease renewal queries, and payment reminders." },
        { icon: Clock, label: "Developer Sales", desc: "Support developer sales teams with 24/7 lead engagement across Vision 2030 mega-projects." },
        { icon: CheckCircle, label: "Investment Properties", desc: "Provide ROI calculations, rental yield data, and neighborhood analysis to investor leads." },
      ]}
      industries={["Real Estate Agencies", "Property Developers", "Property Management", "Commercial Real Estate", "Construction", "Hospitality Real Estate", "Government Housing", "Investment Firms"]}
      industriesAr={["وكالات العقارات", "مطورو العقارات", "إدارة العقارات", "العقارات التجارية", "البناء", "عقارات الضيافة", "الإسكان الحكومي", "شركات الاستثمار"]}
      benefits={[
        { title: "Never miss a property lead", desc: "Every inquiry is engaged instantly — even at midnight during a campaign launch." },
        { title: "3× more viewings", desc: "Automated scheduling fills your agents' calendars with qualified viewings." },
        { title: "Longer nurture cycles", desc: "The AI nurtures buyer leads for months until they are ready to transact." },
        { title: "Ejar & REGA compliant", desc: "Workflows align with Ejar platform requirements and REGA real estate regulations." },
      ]}
      benefitsAr={[
        { title: "لا تفوّت أي عميل عقاري", desc: "يُتفاعل مع كل استفسار فوراً — حتى في منتصف الليل أثناء إطلاق الحملة." },
        { title: "جولات اطلاع أكثر بـ3 أضعاف", desc: "الجدولة الآلية تملأ تقاويم الوكلاء بجولات اطلاع مؤهلة." },
        { title: "دورات رعاية أطول", desc: "يرعى الذكاء الاصطناعي عملاء المشترين لأشهر حتى يصبحوا مستعدين للإغلاق." },
        { title: "متوافق مع إيجار وهيئة العقار", desc: "تتوافق سير العمل مع متطلبات منصة إيجار ولوائح هيئة العقار السعودية." },
      ]}
      faqs={[
        { q: "Can the AI share property listings and floor plans?", a: "Yes. The AI sends property images, floor plans, 360° tour links, and brochures directly via WhatsApp, SMS, or website chat based on buyer preferences." },
        { q: "How does it handle Arabic property terms?", a: "The AI is trained on Saudi real estate terminology in Arabic including property types (فيلا، شقة، أرض، تجاري), neighborhoods, and pricing conventions." },
        { q: "Can it integrate with our CRM and property listings?", a: "Yes. We integrate with Salesforce, HubSpot, and property management systems. Your live listing inventory syncs so the AI always shows available properties." },
        { q: "How does it qualify buyers?", a: "The AI asks structured qualification questions about budget, timeline, financing (cash vs. mortgage), property type preference, and location — scoring and routing based on your criteria." },
        { q: "Is it compliant with REGA regulations?", a: "Our system is designed to align with REGA (Real Estate General Authority) requirements and Ejar platform standards for property marketing communications in Saudi Arabia." },
      ]}
      faqsAr={[
        { q: "هل يمكن للذكاء الاصطناعي مشاركة قوائم العقارات والمخططات الطابقية؟", a: "نعم. يرسل الذكاء الاصطناعي صور العقارات والمخططات وروابط الجولات الافتراضية والكتيبات مباشرة عبر واتساب أو الرسائل القصيرة أو دردشة الموقع." },
        { q: "كيف يتعامل مع المصطلحات العقارية العربية؟", a: "الذكاء الاصطناعي مدرَّب على المصطلحات العقارية السعودية بالعربية بما في ذلك أنواع العقارات والأحياء وأعراف التسعير." },
        { q: "هل يمكن دمجه مع CRM وقوائم العقارات؟", a: "نعم. نتكامل مع Salesforce وHubSpot وأنظمة إدارة العقارات. مخزون قوائمك الحي متزامن حتى يعرض الذكاء الاصطناعي دائماً العقارات المتاحة." },
        { q: "كيف يؤهّل المشترين؟", a: "يطرح الذكاء الاصطناعي أسئلة تأهيل منظمة حول الميزانية والجداول الزمنية والتمويل وتفضيل نوع العقار والموقع، ويُصنّف ويُوجّه وفقاً لمعاييرك." },
        { q: "هل هو متوافق مع لوائح هيئة العقار؟", a: "نظامنا مصمم للتوافق مع متطلبات هيئة العقار السعودية ومعايير منصة إيجار للتسويق العقاري." },
      ]}
      ctaTitle="Convert More Property Leads Into Sales"
      ctaTitleAr="حوّل المزيد من العملاء العقاريين إلى مبيعات"
      ctaSub="Saudi Arabia's real estate boom needs smarter lead management. Deploy your AI Property Agent today."
      ctaSubAr="يحتاج الازدهار العقاري السعودي إلى إدارة عملاء أذكى. انشر وكيل العقارات الذكي اليوم."
      seoTitle="AI Property Agent Saudi Arabia | Electi"
      seoDescription="AI Property Agent for Saudi real estate. Qualifies buyers, books viewings, shares listings on WhatsApp. REGA compliant. Arabic and English support."
      seoPath="/marketplace/ai-property"
    />
  );
}
