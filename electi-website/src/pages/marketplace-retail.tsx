import { ShoppingCart, Zap, Globe, BarChart3, Star, MessageSquare, Users, Building2, Clock, Shield, CheckCircle, TrendingUp } from "lucide-react";
import MarketplacePage from "@/components/templates/MarketplacePage";

export default function AIRetailAgentPage() {
  return (
    <MarketplacePage
      badge="AI Retail Agent"
      badgeAr="وكيل التجزئة الذكي"
      icon={ShoppingCart}
      title="AI Retail Agent"
      titleAr="وكيل التجزئة الذكي"
      titleAccent="for Saudi Commerce"
      tagline="Sell more, support faster, and personalise every customer interaction — in Arabic and English."
      taglineAr="بِع أكثر وادعم بشكل أسرع وخصّص كل تفاعل مع العملاء — بالعربية والإنجليزية."
      description="Saudi retail is evolving fast. Electi's AI Retail Agent handles product discovery, order management, returns, and loyalty — across website, WhatsApp, and in-store digital kiosks — giving every customer a personalised shopping experience."
      descriptionAr="تجزئة المملكة تتطور بسرعة. يتعامل وكيل التجزئة الذكي من Electi مع اكتشاف المنتجات وإدارة الطلبات والإرجاعات والولاء — عبر الموقع وواتساب والأكشاك الرقمية."
      heroStats={[
        { value: "25%", label: "Sales Increase", labelAr: "زيادة المبيعات" },
        { value: "60%", label: "Support Cost Reduction", labelAr: "تخفيض تكاليف الدعم" },
        { value: "4.8★", label: "Customer Satisfaction", labelAr: "رضا العملاء" },
        { value: "24/7", label: "Shopping Support", labelAr: "دعم التسوق" },
      ]}
      features={[
        { icon: ShoppingCart, title: "Product Discovery", desc: "Helps customers find exactly what they need through conversational search — size, color, price, and availability." },
        { icon: TrendingUp, title: "Upselling & Cross-selling", desc: "Recommends complementary products and upgrades at the right moment, increasing average order value." },
        { icon: Zap, title: "Order Management", desc: "Handles order status, delivery tracking, modifications, and cancellations without involving support staff." },
        { icon: Globe, title: "Arabic Shopping Experience", desc: "Full Arabic shopping support — product names, descriptions, and conversations in natural Saudi Arabic." },
        { icon: BarChart3, title: "Retail Analytics", desc: "Track top product queries, conversion rates, return reasons, and customer satisfaction trends." },
        { icon: Star, title: "Loyalty Programme", desc: "Manages points balance queries, reward redemption, and tier status — keeping customers engaged." },
      ]}
      useCases={[
        { icon: Building2, label: "Fashion & Apparel", desc: "Help shoppers find the right size, style, and outfit combinations across your catalogue." },
        { icon: ShoppingCart, label: "Electronics Retail", desc: "Compare specifications, check compatibility, and guide purchase decisions for tech products." },
        { icon: Users, label: "Supermarkets & FMCG", desc: "Handle click-and-collect orders, stock availability queries, and loyalty programme management." },
        { icon: Star, label: "Luxury Retail", desc: "Provide white-glove digital service — appointment shopping, product authentication, and gift services." },
        { icon: CheckCircle, label: "Furniture & Home", desc: "Assist with room measurement queries, product availability, delivery scheduling, and installation." },
        { icon: Clock, label: "Beauty & Cosmetics", desc: "Match products to skin types, provide ingredient information, and manage subscription orders." },
      ]}
      industries={["Fashion & Apparel", "Electronics", "Supermarkets", "Luxury Retail", "Furniture & Home", "Beauty & Cosmetics", "Sports & Outdoor", "Pharmacies"]}
      industriesAr={["الأزياء والملابس", "الإلكترونيات", "السوبرماركت", "تجزئة الفاخر", "الأثاث والمنزل", "الجمال ومستحضرات التجميل", "الرياضة والهواء الطلق", "الصيدليات"]}
      benefits={[
        { title: "25% sales uplift", desc: "Personalised recommendations and instant product discovery drive more conversions." },
        { title: "60% support cost cut", desc: "Automate order queries, returns, and FAQs that consume your support team's time." },
        { title: "Higher basket value", desc: "Smart cross-sell and upsell recommendations increase average order value." },
        { title: "Arabic-first shopping", desc: "Saudi customers shop comfortably in their language — higher satisfaction, higher loyalty." },
      ]}
      benefitsAr={[
        { title: "زيادة المبيعات بـ 25%", desc: "التوصيات المخصصة واكتشاف المنتجات الفوري يدفعان المزيد من التحويلات." },
        { title: "تخفيض تكاليف الدعم بـ 60%", desc: "أتمت استفسارات الطلبات والإرجاعات والأسئلة الشائعة التي تستهلك وقت فريق الدعم." },
        { title: "قيمة سلة أعلى", desc: "توصيات البيع التبادلي والإضافي الذكية تزيد متوسط قيمة الطلب." },
        { title: "تسوق عربي أولاً", desc: "العملاء السعوديون يتسوقون بارتياح بلغتهم — رضا أعلى وولاء أكبر." },
      ]}
      faqs={[
        { q: "Can the AI handle inventory queries in real time?", a: "Yes. We integrate with your inventory management system so the AI always shows accurate stock levels, size availability, and expected restock dates — no more disappointment at checkout." },
        { q: "Can it process returns and exchanges?", a: "The AI handles the full returns flow — eligibility check, return label generation, and exchange processing — through integration with your OMS and returns platform." },
        { q: "Does it work with our existing e-commerce platform?", a: "We integrate with Shopify, Magento, WooCommerce, SAP Commerce, and major Saudi e-commerce platforms. Your product catalogue, inventory, and order data sync automatically." },
        { q: "Can it support in-store digital kiosks?", a: "Yes. The AI Retail Agent can be deployed on in-store touchscreen kiosks for product discovery, stock checks, and loyalty programme access in physical retail locations." },
        { q: "How does it handle Ramadan and seasonal campaigns?", a: "The AI can be configured with seasonal promotions, campaign messaging, and sale events — automatically updating responses to reflect current offers and gift-wrapping options during key retail seasons." },
      ]}
      faqsAr={[
        { q: "هل يمكن للذكاء الاصطناعي التعامل مع استفسارات المخزون في الوقت الفعلي؟", a: "نعم. نتكامل مع نظام إدارة المخزون لديك حتى يعرض الذكاء الاصطناعي دائماً مستويات دقيقة للمخزون وتوافر الأحجام وتواريخ إعادة التخزين المتوقعة." },
        { q: "هل يمكنه معالجة الإرجاعات والتبادلات؟", a: "يتعامل الذكاء الاصطناعي مع تدفق الإرجاعات بالكامل — التحقق من الأهلية وإنشاء تسميات الإرجاع ومعالجة التبادل — من خلال التكامل مع OMS ومنصة الإرجاع." },
        { q: "هل يعمل مع منصة التجارة الإلكترونية الحالية؟", a: "نتكامل مع Shopify وMagento وWooCommerce وSAP Commerce ومنصات التجارة الإلكترونية السعودية الرئيسية. كتالوج المنتجات والمخزون وبيانات الطلبات تتزامن تلقائياً." },
        { q: "هل يعمل مع الأكشاك الرقمية داخل المتجر؟", a: "نعم. يمكن نشر وكيل التجزئة الذكي على أكشاك الشاشات التفاعلية داخل المتجر لاكتشاف المنتجات والتحقق من المخزون والوصول إلى برامج الولاء." },
        { q: "كيف يتعامل مع حملات رمضان والمواسم؟", a: "يمكن تهيئة الذكاء الاصطناعي مع العروض الموسمية ورسائل الحملات وفعاليات التخفيضات، مع تحديث تلقائي للردود لتعكس العروض الحالية وخيارات التغليف خلال المواسم التجزئة الرئيسية." },
      ]}
      ctaTitle="Give Every Saudi Shopper a Personal Assistant"
      ctaTitleAr="امنح كل متسوق سعودي مساعداً شخصياً"
      ctaSub="Personalised retail AI that sells more, supports faster, and keeps customers coming back."
      ctaSubAr="ذكاء اصطناعي تجزئة مخصص يبيع أكثر ويدعم بشكل أسرع ويجعل العملاء يعودون."
      seoTitle="AI Retail Agent Saudi Arabia | Electi"
      seoDescription="AI Retail Agent for Saudi retailers. Handles product discovery, orders, returns, and loyalty in Arabic and English. Integrates with Shopify, Magento, and more."
      seoPath="/marketplace/ai-retail"
    />
  );
}
