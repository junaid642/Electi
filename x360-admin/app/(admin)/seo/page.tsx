"use client";
import { useState, useEffect, useCallback } from "react";
import { Search, Pencil, Check, X, AlertCircle, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface SeoEntry {
  page: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
}

const DEFAULTS: SeoEntry[] = [
  // ── Main pages ──────────────────────────────────────────────────────────────
  { page: "home",            metaTitle: "X360 — Saudi Arabia's Premier Digital Experience Company", metaDescription: "360° Virtual Tours, AI-powered web solutions, and immersive digital experiences for Saudi businesses.", keywords: "360 virtual tours, Saudi Arabia, digital experiences, AI web development", ogTitle: "X360 — Immersive Digital Experiences", ogDescription: "Transform your business with X360's cutting-edge 360° tours and AI web solutions." },
  { page: "360",             metaTitle: "360° Virtual Tours Saudi Arabia | X360", metaDescription: "Professional 360° virtual tour services for real estate, hospitality, retail and more across Saudi Arabia.", keywords: "360 virtual tours, Saudi Arabia, Matterport, real estate tours, virtual property viewing", ogTitle: "360° Virtual Tours — X360", ogDescription: "Showcase your property with stunning 360° virtual tours." },
  { page: "web-ai",          metaTitle: "AI-Powered Web Development Saudi Arabia | X360", metaDescription: "Custom websites, e-commerce platforms, and AI-integrated solutions for Saudi businesses.", keywords: "web development Saudi Arabia, AI solutions, business websites, Next.js", ogTitle: "Web & AI Development — X360", ogDescription: "Bespoke web and AI solutions built for Saudi enterprises." },
  { page: "about",           metaTitle: "About X360 — Our Story & Team | Saudi Digital Agency", metaDescription: "Meet the team behind X360, Saudi Arabia's leading digital experience company.", keywords: "X360 about, founders, Saudi digital agency, Abdulrhman Omar, Junaid Khan", ogTitle: "About X360", ogDescription: "The story, vision, and people behind X360." },
  { page: "contact",         metaTitle: "Contact X360 — Get in Touch", metaDescription: "Reach out to X360 for 360° virtual tours, web development, and AI solutions.", keywords: "contact X360, get quote, Riyadh digital agency", ogTitle: "Contact X360", ogDescription: "Let's build something extraordinary together." },
  { page: "blog",            metaTitle: "X360 Blog — Insights on Digital Experiences", metaDescription: "Expert articles on 360° virtual tours, AI web development, and digital transformation in Saudi Arabia.", keywords: "X360 blog, virtual tour insights, AI development, Saudi digital transformation", ogTitle: "X360 Blog", ogDescription: "Industry insights, case studies, and tips from the X360 team." },
  { page: "careers",         metaTitle: "Careers at X360 — Join Our Team", metaDescription: "Explore open positions at X360 and help us build the future of digital experiences in Saudi Arabia.", keywords: "X360 careers, jobs Saudi Arabia, digital agency jobs, Riyadh tech jobs", ogTitle: "Careers at X360", ogDescription: "Join the team shaping the future of digital experiences in Saudi Arabia." },
  { page: "case-studies",    metaTitle: "X360 Case Studies — Real Results", metaDescription: "See how X360 has transformed businesses with 360° tours and AI-driven web solutions.", keywords: "X360 case studies, virtual tour projects, Saudi digital transformation", ogTitle: "X360 Case Studies", ogDescription: "Real results for real businesses." },
  // ── Virtual Tour sub-pages ───────────────────────────────────────────────────
  { page: "vt-real-estate",  metaTitle: "Real Estate Virtual Tours Saudi Arabia | X360", metaDescription: "360° virtual tours for villas, apartments, co-working spaces, industrial warehouses, empty land, and construction sites in Saudi Arabia and GCC.", keywords: "real estate virtual tours Saudi Arabia, 360 property tours, virtual property viewing, Riyadh virtual tours", ogTitle: "Real Estate Virtual Tours | X360", ogDescription: "Immersive 360° virtual tours for every real estate category — residential, commercial, industrial, and land." },
  { page: "vt-hospitality",  metaTitle: "Hospitality Virtual Tours Saudi Arabia | X360", metaDescription: "360° virtual tours for hotels, resorts, restaurants, event halls, and spa & wellness venues in Saudi Arabia and GCC.", keywords: "hospitality virtual tours Saudi Arabia, hotel virtual tour, resort 360 tour, restaurant virtual experience", ogTitle: "Hospitality Virtual Tours | X360", ogDescription: "Immersive 360° virtual tours for every hospitality venue — hotels, resorts, restaurants, event halls, and spas." },
  { page: "vt-luxury",       metaTitle: "Private Luxury Virtual Tours Saudi Arabia | X360", metaDescription: "360° virtual tours for palaces, private villas, penthouses, private estates, and luxury showrooms in Saudi Arabia and GCC.", keywords: "luxury virtual tours Saudi Arabia, palace 360 tour, private villa virtual tour, luxury property viewing", ogTitle: "Private Luxury Virtual Tours | X360", ogDescription: "Immersive 360° virtual tours for every luxury property — palaces, villas, penthouses, estates, and more." },
  { page: "vt-others",       metaTitle: "Virtual Tours for Schools, Mosques & More | X360", metaDescription: "360° virtual tours for schools, universities, government buildings, showrooms, medical centers, and mosques in Saudi Arabia and GCC.", keywords: "school virtual tour Saudi Arabia, government building 360, mosque virtual tour, medical center 360", ogTitle: "Other Sectors Virtual Tours | X360", ogDescription: "Immersive 360° virtual tours for every type of venue — schools, government, showrooms, medical, and mosques." },
  // ── Development overview sub-pages ──────────────────────────────────────────
  { page: "dev-website",     metaTitle: "Website Development Saudi Arabia | Web & AI | X360", metaDescription: "Custom website development for modern businesses in Saudi Arabia — corporate, e-commerce, healthcare, hospitality, real estate and more.", keywords: "website development Saudi Arabia, custom websites, corporate web development, Next.js Saudi", ogTitle: "Website Development | X360", ogDescription: "Premium website development for modern Saudi businesses." },
  { page: "dev-ai-solutions", metaTitle: "AI Solutions | Intelligent Automation & Custom AI | X360", metaDescription: "X360 delivers enterprise AI solutions — chatbots, workflow automation, predictive analytics, and custom AI systems tailored for Saudi businesses.", keywords: "AI solutions Saudi Arabia, AI chatbots, workflow automation, predictive analytics, custom AI", ogTitle: "AI Solutions | X360", ogDescription: "Enterprise AI — chatbots, automation, analytics, and custom models for modern businesses." },
  { page: "dev-erp-sap",     metaTitle: "SAP & ERP Solutions Saudi Arabia | X360", metaDescription: "X360 delivers intelligent enterprise systems — SAP implementation, custom ERP, business intelligence, AI-embedded enterprise platforms, and system integration.", keywords: "SAP implementation Saudi Arabia, custom ERP, business intelligence, ZATCA, enterprise systems", ogTitle: "SAP & ERP Solutions | X360", ogDescription: "Intelligent enterprise systems — SAP, ERP, BI, and AI for Saudi corporations." },
  // ── Dev Website industry sub-pages ──────────────────────────────────────────
  { page: "dev-website-corporate",   metaTitle: "Corporate Identity Digital Ecosystem | Website Development | X360", metaDescription: "X360 builds premium corporate digital platforms — brand websites, investor relations portals, AI analytics, and enterprise systems for Saudi corporations and Vision 2030 aligned businesses.", keywords: "corporate website Saudi Arabia, investor relations portal, brand website, Vision 2030 digital", ogTitle: "Corporate Identity Digital Ecosystem | X360", ogDescription: "Complete corporate technology ecosystem — brand websites, investor portals, AI analytics, and enterprise systems." },
  { page: "dev-website-healthcare",  metaTitle: "Healthcare Digital Ecosystem | Website Development | X360", metaDescription: "X360 builds modern healthcare platforms — clinic & hospital websites, AI health assistants, patient portals, appointment booking systems, and HIPAA-compliant infrastructure for Saudi healthcare leaders.", keywords: "healthcare website Saudi Arabia, clinic website, patient portal, hospital AI, appointment booking", ogTitle: "Healthcare Digital Ecosystem | X360", ogDescription: "Complete healthcare technology ecosystem — clinic websites, AI assistants, patient portals, and smart automation." },
  { page: "dev-website-hospitality", metaTitle: "Hospitality Digital Ecosystem | Website Development | X360", metaDescription: "X360 builds luxury hospitality platforms — hotel & restaurant websites, AI concierge, online reservation systems, guest apps, and intelligent automation for Saudi hospitality leaders.", keywords: "hotel website Saudi Arabia, restaurant website, hospitality AI, online reservation system, guest app", ogTitle: "Hospitality Digital Ecosystem | X360", ogDescription: "Complete hospitality technology ecosystem — luxury websites, AI concierge, reservation systems, and smart automation." },
  { page: "dev-website-real-estate", metaTitle: "Real Estate Digital Ecosystem | Website Development | X360", metaDescription: "X360 is your complete real estate technology partner — luxury websites, mobile apps, AI, 360° virtual tours, 3D digital twins, enterprise systems, and intelligent automation under one ecosystem.", keywords: "real estate website Saudi Arabia, property portal, 360 virtual tours, real estate AI, digital twin", ogTitle: "Real Estate Digital Ecosystem | X360", ogDescription: "Complete real estate technology — luxury websites, AI, 360° tours, digital twins, and intelligent automation." },
  { page: "dev-website-commerce",    metaTitle: "Retail & E-Commerce Digital Ecosystem | Website Development | X360", metaDescription: "X360 builds high-converting e-commerce platforms — branded online stores, mobile shopping apps, AI product recommendations, and smart automation for Saudi retail brands.", keywords: "e-commerce Saudi Arabia, online store development, shopping app, AI product recommendations, retail platform", ogTitle: "Retail & E-Commerce Digital Ecosystem | X360", ogDescription: "Complete retail technology ecosystem — online stores, mobile apps, AI recommendations, and smart commerce automation." },
  { page: "dev-website-retail",      metaTitle: "Retail Digital Ecosystem | Website Development | X360", metaDescription: "X360 builds premium retail digital platforms — branded in-store and online experiences, smart inventory management, Saudi payment gateways, and AI-powered analytics for Saudi retail brands.", keywords: "retail website Saudi Arabia, smart inventory, Saudi payment gateway, retail AI analytics", ogTitle: "Retail Digital Ecosystem | X360", ogDescription: "Complete retail technology ecosystem — branded experiences, smart inventory, Saudi payment gateways, and retail automation." },
  { page: "dev-website-private-jet", metaTitle: "Private Jets & Yachts Website Development | X360", metaDescription: "X360 builds ultra-luxury digital ecosystems for private aviation and yacht charter companies — AI concierge, 360° fleet tours, cinematic booking platforms, and VIP portals for Saudi Arabia and GCC.", keywords: "private jet website Saudi Arabia, yacht charter website, aviation AI concierge, luxury booking platform", ogTitle: "Private Jets & Yachts Website Development | X360", ogDescription: "Ultra-luxury digital ecosystems for private aviation and yacht charter — AI concierge, 360° fleet tours, cinematic booking." },
  // ── Dev AI Solutions sub-pages ───────────────────────────────────────────────
  { page: "dev-ai-analytics",  metaTitle: "Predictive Analytics | Business Intelligence & AI Analytics | X360", metaDescription: "X360 builds AI-powered predictive analytics — sales forecasting, customer intelligence, real-time executive dashboards, and data warehouse infrastructure.", keywords: "predictive analytics Saudi Arabia, business intelligence, AI analytics, sales forecasting, executive dashboard", ogTitle: "Predictive Analytics | X360", ogDescription: "AI-powered analytics and predictive models — turn business data into forward-looking forecasts." },
  { page: "dev-ai-automation", metaTitle: "Workflow Automation | Intelligent Business Automation | X360", metaDescription: "X360 automates your business workflows — CRM automation, WhatsApp automation, approval systems, and intelligent pipelines connecting every system you use.", keywords: "workflow automation Saudi Arabia, CRM automation, WhatsApp automation, business process automation, AI pipelines", ogTitle: "Workflow Automation | X360", ogDescription: "End-to-end AI workflow automation connecting your CRM, ERP, email, and communication tools." },
  { page: "dev-ai-chatbots",   metaTitle: "AI Chatbots | Intelligent Customer Interaction Systems | X360", metaDescription: "X360 builds custom AI chatbots and virtual assistants — WhatsApp agents, multilingual AI, sales bots, and 24/7 intelligent customer support for Saudi businesses.", keywords: "AI chatbots Saudi Arabia, WhatsApp AI agent, multilingual chatbot, sales bot, customer support AI", ogTitle: "AI Chatbots | X360", ogDescription: "Custom AI chatbots trained on your business — deployed on your website, WhatsApp, and internal tools." },
  { page: "dev-ai-custom",     metaTitle: "Custom AI Systems | Tailored Intelligence Systems | X360", metaDescription: "X360 engineers fully bespoke AI systems — proprietary LLMs, computer vision, intelligent document processing, and on-premise enterprise AI infrastructure.", keywords: "custom AI systems Saudi Arabia, proprietary LLM, computer vision, intelligent document processing, on-premise AI", ogTitle: "Custom AI Systems | X360", ogDescription: "Fully bespoke AI — proprietary models, computer vision, intelligent documents, on-premise deployment." },
  // ── Dev ERP/SAP sub-pages ────────────────────────────────────────────────────
  { page: "dev-erp-sap-impl",     metaTitle: "SAP Implementation Saudi Arabia | S/4HANA | X360", metaDescription: "X360 delivers future-ready SAP ecosystems — S/4HANA migration, SAP BTP, ZATCA Phase 2, Analytics Cloud, and full enterprise transformation.", keywords: "SAP implementation Saudi Arabia, S/4HANA migration, SAP BTP, ZATCA Phase 2, SAP Analytics Cloud", ogTitle: "SAP Implementation | X360", ogDescription: "Future-ready SAP ecosystems — S/4HANA, BTP, ZATCA compliance, and Analytics Cloud." },
  { page: "dev-erp-custom",       metaTitle: "Custom ERP Development Saudi Arabia | X360", metaDescription: "X360 builds tailored ERP platforms purpose-built for your business — from manufacturing floors to retail chains and real estate portfolios.", keywords: "custom ERP Saudi Arabia, tailored ERP development, manufacturing ERP, retail ERP, real estate ERP", ogTitle: "Custom ERP Development | X360", ogDescription: "Tailored ERP platforms purpose-built for your business operations." },
  { page: "dev-erp-bi",           metaTitle: "Business Intelligence & Analytics Saudi Arabia | X360", metaDescription: "X360 turns raw enterprise data into live intelligence — real-time dashboards, predictive KPIs, and SAP Analytics Cloud powered reporting.", keywords: "business intelligence Saudi Arabia, real-time dashboards, predictive KPIs, SAP Analytics Cloud, data reporting", ogTitle: "Business Intelligence & Analytics | X360", ogDescription: "Live business intelligence — real-time dashboards, predictive KPIs, and enterprise reporting." },
  { page: "dev-erp-ai",           metaTitle: "AI for Enterprise | ERP AI Integration | X360", metaDescription: "X360 embeds AI agents directly into your ERP layer — predictive automation, intelligent approvals, and generative AI for enterprise operations.", keywords: "AI enterprise Saudi Arabia, ERP AI integration, predictive automation, intelligent approvals, generative AI ERP", ogTitle: "AI for Enterprise | X360", ogDescription: "AI agents embedded in your ERP — predictive automation and intelligent enterprise operations." },
  { page: "dev-erp-integration",  metaTitle: "System Integration Saudi Arabia | Enterprise APIs | X360", metaDescription: "X360 connects your ERP, CRM, cloud platforms, and third-party APIs into a single unified enterprise data fabric.", keywords: "system integration Saudi Arabia, ERP integration, CRM integration, API integration, enterprise data fabric", ogTitle: "System Integration | X360", ogDescription: "Connect your ERP, CRM, cloud platforms, and APIs into one unified enterprise fabric." },
  // ── Legal pages ─────────────────────────────────────────────────────────────
  { page: "privacy-policy",   metaTitle: "Privacy Policy | X360", metaDescription: "Read X360's Privacy Policy to understand how we collect, use, and protect your personal data when you engage our 360 virtual tour and web development services.", keywords: "X360 privacy policy, data protection, PDPL Saudi Arabia, personal data X360", ogTitle: "Privacy Policy | X360", ogDescription: "X360 is committed to protecting your privacy. Learn how we handle your data responsibly." },
  { page: "terms",             metaTitle: "Terms & Conditions | X360 — Virtual Tours & Digital Solutions", metaDescription: "Terms and Conditions for clients engaging X360 services in Saudi Arabia and GCC. Covers payment, delivery, intellectual property, and dispute resolution.", keywords: "X360 terms and conditions, service agreement, Saudi Arabia digital services, intellectual property", ogTitle: "Terms & Conditions | X360", ogDescription: "Terms and Conditions for clients engaging X360 services across Saudi Arabia and GCC." },
  // ── Other standalone pages ────────────────────────────────────────────────────────────
  { page: "development",        metaTitle: "Web & AI Development Services Saudi Arabia | X360", metaDescription: "X360 delivers premium web development, AI solutions, and ERP systems for Saudi businesses — from custom websites to full enterprise transformation.", keywords: "web development Saudi Arabia, AI development, ERP systems, digital transformation, X360", ogTitle: "Web & AI Development — X360", ogDescription: "Premium development services for Saudi businesses — websites, AI, ERP, and enterprise systems." },
  { page: "portfolio",          metaTitle: "X360 Portfolio — Projects & Work | Saudi Digital Agency", metaDescription: "Explore X360's portfolio of 360° virtual tours, AI-powered websites, ERP systems, and digital transformation projects across Saudi Arabia.", keywords: "X360 portfolio, digital projects Saudi Arabia, 360 virtual tour portfolio, web development portfolio", ogTitle: "X360 Portfolio", ogDescription: "Our work across 360° tours, AI web development, and enterprise systems." },
  { page: "faq",                metaTitle: "FAQ — Frequently Asked Questions | X360", metaDescription: "Answers to common questions about X360's 360° virtual tours, web development, AI solutions, and ERP services in Saudi Arabia.", keywords: "X360 FAQ, virtual tour questions, web development FAQ, AI solutions Saudi Arabia", ogTitle: "FAQ | X360", ogDescription: "Everything you need to know about X360's services." },
  { page: "resources",          metaTitle: "Resources — Guides & Insights | X360", metaDescription: "Guides, case studies, and resources on 360° virtual tours, AI web solutions, and digital transformation from the X360 team.", keywords: "X360 resources, digital guides, virtual tour guide, AI development Saudi Arabia", ogTitle: "Resources | X360", ogDescription: "Guides, case studies, and expert resources from the X360 team." },
  { page: "dev-website-others", metaTitle: "Website Development for Other Sectors | X360", metaDescription: "X360 builds bespoke websites for schools, government, NGOs, and other sectors across Saudi Arabia.", keywords: "website development other sectors Saudi Arabia, school website, government website, NGO digital platform", ogTitle: "Website Development — Other Sectors | X360", ogDescription: "Custom websites for schools, government, NGOs, and every other sector." },
  // ── Virtual Tours hub & additional sub-categories ───────────────────────────────────────────────
  { page: "virtual-tours",      metaTitle: "360° Virtual Tours Saudi Arabia | X360 — Immersive Digital Experiences", metaDescription: "X360 is Saudi Arabia's leading 360° virtual tour company. Real estate, hospitality, luxury, digital twins, hospitals, hotels, and more.", keywords: "360 virtual tours Saudi Arabia, immersive tours, Matterport Saudi, digital twins, virtual property tours", ogTitle: "360° Virtual Tours — X360", ogDescription: "Saudi Arabia's premier 360° virtual tour company — real estate, hospitality, luxury, and more." },
  { page: "vt-digital-twins",   metaTitle: "Digital Twin Services Saudi Arabia | X360", metaDescription: "X360 delivers photorealistic 3D digital twins for construction, real estate, and smart city projects — AI-powered spatial intelligence for Vision 2030.", keywords: "digital twins Saudi Arabia, 3D digital twin, BIM digital twin, smart city, Vision 2030 digital twin", ogTitle: "Digital Twin Services — X360", ogDescription: "Photorealistic 3D digital twins for construction, real estate, and smart city projects." },
  { page: "vt-hospitals",       metaTitle: "Hospital & Medical Centre Virtual Tours Saudi Arabia | X360", metaDescription: "360° virtual tours for hospitals, clinics, and medical centres in Saudi Arabia — showcase facilities and guide patients.", keywords: "hospital virtual tour Saudi Arabia, medical centre 360 tour, clinic virtual tour, healthcare virtual experience", ogTitle: "Hospital & Medical Centre Virtual Tours | X360", ogDescription: "Immersive 360° virtual tours for hospitals, clinics, and medical facilities." },
  { page: "vt-hotels",          metaTitle: "Hotel Virtual Tours Saudi Arabia | X360", metaDescription: "360° virtual tours for hotels and resorts across Saudi Arabia — let guests explore rooms and facilities before they arrive.", keywords: "hotel virtual tour Saudi Arabia, resort 360 tour, hospitality virtual tour, hotel room tour", ogTitle: "Hotel Virtual Tours | X360", ogDescription: "Let guests explore every room and facility with immersive 360° hotel virtual tours." },
  // ── Virtual Tour city pages ───────────────────────────────────────────────────────────────────
  { page: "vt-riyadh",  metaTitle: "360° Virtual Tours Riyadh | X360", metaDescription: "Professional 360° virtual tours in Riyadh — real estate, hospitality, retail, government, and luxury properties across the capital.", keywords: "360 virtual tours Riyadh, جولات افتراضية الرياض, Riyadh virtual tour, property tour Riyadh", ogTitle: "Virtual Tours Riyadh | X360", ogDescription: "Immersive 360° virtual tours for Riyadh's finest properties and venues." },
  { page: "vt-jeddah",  metaTitle: "360° Virtual Tours Jeddah | X360", metaDescription: "Professional 360° virtual tours in Jeddah — coastal real estate, hospitality, retail, and heritage venues along the Red Sea.", keywords: "360 virtual tours Jeddah, جولات افتراضية جدة, Jeddah virtual tour, Red Sea property tour", ogTitle: "Virtual Tours Jeddah | X360", ogDescription: "Immersive 360° virtual tours for Jeddah's properties, hotels, and venues." },
  { page: "vt-dammam",  metaTitle: "360° Virtual Tours Dammam | X360", metaDescription: "Professional 360° virtual tours in Dammam and the Eastern Province — real estate, industrial, commercial, and hospitality venues.", keywords: "360 virtual tours Dammam, Eastern Province virtual tour, Dammam property tour", ogTitle: "Virtual Tours Dammam | X360", ogDescription: "Immersive 360° virtual tours for Dammam and Eastern Province properties." },
  { page: "vt-khobar",  metaTitle: "360° Virtual Tours Al Khobar | X360", metaDescription: "Professional 360° virtual tours in Al Khobar — luxury real estate, commercial spaces, and hospitality venues in the Eastern Province.", keywords: "360 virtual tours Khobar, Al Khobar virtual tour, Khobar property tour", ogTitle: "Virtual Tours Khobar | X360", ogDescription: "Immersive 360° virtual tours for Al Khobar properties and venues." },
  { page: "vt-mecca",   metaTitle: "360° Virtual Tours Mecca | X360", metaDescription: "Professional 360° virtual tours in Makkah — hotels, hospitality venues, and commercial developments near the Holy Mosque.", keywords: "360 virtual tours Mecca, Makkah virtual tour, hotel tour Mecca, Umrah accommodation tour", ogTitle: "Virtual Tours Mecca | X360", ogDescription: "Immersive 360° virtual tours for Makkah's hotels and commercial venues." },
  { page: "vt-medina",  metaTitle: "360° Virtual Tours Medina | X360", metaDescription: "Professional 360° virtual tours in Madinah — hotels, hospitality venues, and properties near Al-Masjid an-Nabawi.", keywords: "360 virtual tours Medina, Madinah virtual tour, hotel tour Medina, pilgrimage accommodation", ogTitle: "Virtual Tours Medina | X360", ogDescription: "Immersive 360° virtual tours for Madinah's hotels and hospitality venues." },
  { page: "vt-neom",    metaTitle: "360° Virtual Tours NEOM | X360", metaDescription: "360° virtual tours for NEOM's groundbreaking developments — The Line, Sindalah, Aqaba, and next-generation smart communities.", keywords: "360 virtual tours NEOM, The Line virtual tour, NEOM property tour, smart city tour", ogTitle: "Virtual Tours NEOM | X360", ogDescription: "Immersive 360° virtual tours for NEOM's visionary developments and smart communities." },
  { page: "vt-alula",   metaTitle: "360° Virtual Tours AlUla | X360", metaDescription: "360° virtual tours for AlUla — heritage sites, luxury eco-resorts, and the UNESCO World Heritage landscape of ancient Hegra.", keywords: "360 virtual tours AlUla, AlUla heritage tour, Hegra virtual tour, luxury resort AlUla", ogTitle: "Virtual Tours AlUla | X360", ogDescription: "Immersive 360° virtual tours for AlUla's heritage sites, resorts, and iconic landscapes." },
  { page: "vt-tabuk",   metaTitle: "360° Virtual Tours Tabuk | X360", metaDescription: "360° virtual tours in Tabuk — AMAALA, Red Sea coastal developments, eco-resorts, and the emerging northwest Saudi real estate market.", keywords: "360 virtual tours Tabuk, AMAALA virtual tour, Red Sea resort tour, Tabuk property tour", ogTitle: "Virtual Tours Tabuk | X360", ogDescription: "Immersive 360° virtual tours for Tabuk, AMAALA, and the Red Sea riviera developments." },
  // ── City SEO landing pages ───────────────────────────────────────────────────────────────────
  { page: "city-riyadh-tours", metaTitle: "360° Virtual Tours Riyadh Saudi Arabia | X360", metaDescription: "X360 is Riyadh's #1 360° virtual tour company. Serving real estate, hotels, restaurants, and businesses across the capital.", keywords: "360 virtual tours Riyadh Saudi Arabia, Riyadh virtual tour company, real estate tours Riyadh", ogTitle: "Riyadh Virtual Tours | X360", ogDescription: "Riyadh's premier 360° virtual tour company for real estate, hospitality, and business." },
  { page: "city-riyadh-web",   metaTitle: "Website Development Riyadh | X360 Digital Agency", metaDescription: "X360 builds premium websites for Riyadh businesses — corporate portals, e-commerce, AI platforms, and bilingual Arabic-English sites.", keywords: "website development Riyadh, web agency Riyadh, corporate website Riyadh, e-commerce Riyadh", ogTitle: "Website Development Riyadh | X360", ogDescription: "Premium websites for Riyadh — corporate, e-commerce, and AI-powered." },
  { page: "city-riyadh-ai",    metaTitle: "AI Solutions Riyadh | Artificial Intelligence | X360", metaDescription: "X360 delivers enterprise AI in Riyadh — chatbots, automation, predictive analytics, and custom AI systems for Saudi corporations.", keywords: "AI solutions Riyadh, artificial intelligence Riyadh, AI chatbots Saudi Arabia, enterprise AI Riyadh", ogTitle: "AI Solutions Riyadh | X360", ogDescription: "Enterprise AI for Riyadh — chatbots, automation, analytics, and custom AI." },
  { page: "city-riyadh-erp",   metaTitle: "ERP & SAP Solutions Riyadh | X360", metaDescription: "X360 implements ERP and SAP for Riyadh enterprises — S/4HANA, custom ERP, ZATCA compliance, and system integration.", keywords: "ERP solutions Riyadh, SAP implementation Riyadh, ERP Saudi Arabia, ZATCA compliance Riyadh", ogTitle: "ERP & SAP Solutions Riyadh | X360", ogDescription: "ERP and SAP for Riyadh enterprises — S/4HANA, custom ERP, and ZATCA compliance." },
  { page: "city-jeddah-tours", metaTitle: "360° Virtual Tours Jeddah Saudi Arabia | X360", metaDescription: "X360 is Jeddah's leading 360° virtual tour provider. Serving coastal real estate, hotels, restaurants, and businesses along the Red Sea.", keywords: "360 virtual tours Jeddah Saudi Arabia, Jeddah virtual tour company, Red Sea property tours", ogTitle: "Jeddah Virtual Tours | X360", ogDescription: "Jeddah's leading 360° virtual tour company for real estate, hotels, and hospitality." },
  { page: "city-jeddah-web",   metaTitle: "Website Development Jeddah | X360 Digital Agency", metaDescription: "X360 builds world-class websites for Jeddah businesses — luxury retail, hospitality, real estate, and enterprise platforms.", keywords: "website development Jeddah, web agency Jeddah, luxury website Jeddah, Arabic website Jeddah", ogTitle: "Website Development Jeddah | X360", ogDescription: "Stunning websites for Jeddah's hospitality, retail, and real estate businesses." },
  { page: "city-jeddah-ai",    metaTitle: "AI Solutions Jeddah | X360 Artificial Intelligence", metaDescription: "X360 deploys AI chatbots, automation, and intelligent platforms for Jeddah businesses across hospitality, retail, and real estate.", keywords: "AI solutions Jeddah, business automation Jeddah, AI chatbots Jeddah, retail AI", ogTitle: "AI Solutions Jeddah | X360", ogDescription: "AI chatbots and automation for Jeddah's hospitality, retail, and real estate businesses." },
  { page: "city-jeddah-sap",   metaTitle: "SAP & ERP Solutions Jeddah | X360", metaDescription: "X360 provides SAP S/4HANA and custom ERP for Jeddah companies — ZATCA Phase 2 compliant, with full data migration and support.", keywords: "SAP Jeddah, ERP solutions Jeddah, SAP implementation Jeddah, ZATCA compliance", ogTitle: "SAP & ERP Solutions Jeddah | X360", ogDescription: "SAP and custom ERP for Jeddah companies — ZATCA compliant, fully supported." },
  { page: "city-dammam-tours", metaTitle: "360° Virtual Tours Dammam | Eastern Province | X360", metaDescription: "X360 delivers professional 360° virtual tours in Dammam — for real estate, industrial, commercial, and hospitality clients.", keywords: "360 virtual tours Dammam, Eastern Province virtual tour, Dammam 360, industrial virtual tour", ogTitle: "Dammam Virtual Tours | X360", ogDescription: "360° virtual tours for Dammam and the Eastern Province." },
  { page: "city-dammam-web",   metaTitle: "Website Development Dammam | X360 Digital Agency", metaDescription: "X360 builds enterprise websites for Dammam and Eastern Province businesses — oil & gas, retail, and healthcare platforms.", keywords: "website development Dammam, web design Eastern Province, digital agency Dammam", ogTitle: "Website Development Dammam | X360", ogDescription: "Enterprise websites for Dammam and Eastern Province businesses." },
  { page: "city-khobar-tours", metaTitle: "360° Virtual Tours Al Khobar | X360", metaDescription: "X360 provides 360° virtual tours in Al Khobar — luxury apartments, commercial towers, hospitality venues, and business properties.", keywords: "360 virtual tours Khobar, Al Khobar virtual tour, Khobar real estate tour, Eastern Province 360", ogTitle: "Al Khobar Virtual Tours | X360", ogDescription: "360° virtual tours for Al Khobar's luxury properties and commercial venues." },
  { page: "city-neom-tours",   metaTitle: "360° Virtual Tours NEOM | X360", metaDescription: "X360 captures NEOM developments with immersive 360° virtual tours — The Line, Sindalah, Aqaba, and the entire NEOM ecosystem.", keywords: "NEOM virtual tours, The Line 360 tour, NEOM development tour, smart city virtual tour", ogTitle: "NEOM Virtual Tours | X360", ogDescription: "360° virtual tours for NEOM's pioneering developments." },
  { page: "city-neom-ai",      metaTitle: "AI Solutions NEOM | Smart City AI | X360", metaDescription: "X360 delivers AI and intelligent automation for NEOM businesses — smart city integrations, AI assistants, and enterprise platforms.", keywords: "AI solutions NEOM, smart city AI, NEOM business AI, intelligent automation NEOM", ogTitle: "AI Solutions NEOM | X360", ogDescription: "AI and intelligent automation for NEOM's smart city ecosystem." },
  { page: "city-tabuk-tours",  metaTitle: "360° Virtual Tours Tabuk | AMAALA | Red Sea | X360", metaDescription: "X360 provides 360° virtual tours for Tabuk's luxury developments — AMAALA, Red Sea Project resorts, and Tabuk city properties.", keywords: "360 virtual tours Tabuk, AMAALA virtual tour, Red Sea Project tour, Tabuk property tour", ogTitle: "Tabuk & AMAALA Virtual Tours | X360", ogDescription: "360° virtual tours for Tabuk, AMAALA, and the Red Sea riviera." },
  { page: "city-alula-tours",  metaTitle: "360° Virtual Tours AlUla | Heritage & Luxury | X360", metaDescription: "X360 creates immersive 360° virtual tours for AlUla's world-class heritage sites, eco-resorts, and luxury developments.", keywords: "360 virtual tours AlUla, Hegra virtual tour, AlUla resort tour, heritage site 360, luxury AlUla", ogTitle: "AlUla Virtual Tours | X360", ogDescription: "360° virtual tours for AlUla's heritage, luxury resorts, and iconic landscape." },
  // ── Service × city pages ───────────────────────────────────────────────────────────────────────
  { page: "svc-ai-riyadh",  metaTitle: "AI Solutions Riyadh — Chatbots, Automation & Analytics | X360", metaDescription: "X360 deploys enterprise AI in Riyadh — WhatsApp chatbots, workflow automation, predictive analytics, and custom AI models.", keywords: "AI solutions Riyadh, chatbots Riyadh, AI automation Riyadh, enterprise AI Saudi Arabia", ogTitle: "AI Solutions Riyadh | X360", ogDescription: "Enterprise AI for Riyadh — chatbots, automation, analytics, and custom models." },
  { page: "svc-ai-jeddah",  metaTitle: "AI Solutions Jeddah — Intelligent Automation | X360", metaDescription: "X360 delivers AI chatbots, automation, and predictive intelligence for Jeddah companies across hospitality, retail, and real estate.", keywords: "AI solutions Jeddah, business automation Jeddah, AI chatbots Jeddah, retail AI", ogTitle: "AI Solutions Jeddah | X360", ogDescription: "AI chatbots and automation for Jeddah's hospitality, retail, and real estate businesses." },
  { page: "svc-ai-dammam",  metaTitle: "AI Solutions Dammam | Eastern Province AI | X360", metaDescription: "X360 brings enterprise AI to Dammam — intelligent automation, analytics, and custom AI for industrial and commercial businesses.", keywords: "AI solutions Dammam, Eastern Province AI, industrial AI, enterprise automation Dammam", ogTitle: "AI Solutions Dammam | X360", ogDescription: "Enterprise AI and automation for Dammam and Eastern Province businesses." },
  { page: "svc-ai-khobar",  metaTitle: "AI Solutions Al Khobar | X360", metaDescription: "X360 deploys AI chatbots, automation, and intelligent business systems in Al Khobar for commercial, hospitality, and retail clients.", keywords: "AI solutions Khobar, chatbots Khobar, business automation Khobar, AI Eastern Province", ogTitle: "AI Solutions Al Khobar | X360", ogDescription: "AI chatbots and intelligent automation for Al Khobar businesses." },
  { page: "svc-ai-neom",    metaTitle: "AI Solutions NEOM — Smart City Intelligence | X360", metaDescription: "X360 powers NEOM with cutting-edge AI — smart concierge systems, predictive analytics, and next-generation automation.", keywords: "AI NEOM, smart city AI, intelligent concierge NEOM, AI automation NEOM", ogTitle: "AI Solutions NEOM | X360", ogDescription: "Smart city AI — concierge, analytics, and intelligent automation for NEOM." },
  { page: "svc-erp-riyadh", metaTitle: "ERP Solutions Riyadh | SAP & Custom ERP | X360", metaDescription: "X360 implements and customises ERP for Riyadh businesses — SAP S/4HANA, custom ERP, ZATCA compliance, and enterprise integration.", keywords: "ERP Riyadh, SAP Riyadh, custom ERP Saudi Arabia, ZATCA ERP Riyadh, enterprise systems", ogTitle: "ERP Solutions Riyadh | X360", ogDescription: "SAP and custom ERP for Riyadh — S/4HANA, ZATCA, and full integration." },
  { page: "svc-erp-jeddah", metaTitle: "ERP Solutions Jeddah | SAP Implementation | X360", metaDescription: "X360 delivers SAP S/4HANA and custom ERP for Jeddah — ZATCA Phase 2 compliant, with full data migration and post-go-live support.", keywords: "ERP Jeddah, SAP Jeddah, ZATCA compliance Jeddah, custom ERP Red Sea", ogTitle: "ERP Solutions Jeddah | X360", ogDescription: "SAP and custom ERP for Jeddah — ZATCA compliant, fully supported." },
  { page: "svc-erp-dammam", metaTitle: "ERP Solutions Dammam | Eastern Province ERP | X360", metaDescription: "X360 provides SAP and custom ERP for Dammam's industrial, logistics, and commercial enterprises.", keywords: "ERP Dammam, SAP Dammam, Eastern Province ERP, industrial ERP Saudi Arabia", ogTitle: "ERP Solutions Dammam | X360", ogDescription: "SAP and ERP for Dammam's industrial, logistics, and commercial enterprises." },
  { page: "svc-erp-khobar", metaTitle: "ERP Solutions Al Khobar | X360", metaDescription: "X360 implements SAP and custom ERP for Al Khobar businesses — from multinationals to fast-growing Saudi SMEs.", keywords: "ERP Khobar, SAP Al Khobar, enterprise systems Khobar, ERP Eastern Province", ogTitle: "ERP Solutions Al Khobar | X360", ogDescription: "SAP and custom ERP for Al Khobar's corporations and growing businesses." },
  { page: "svc-web-riyadh", metaTitle: "Website Development Riyadh | Premium Digital Agency | X360", metaDescription: "X360 builds high-performance websites for Riyadh — corporate portals, e-commerce, AI-driven platforms, and bilingual Arabic-English sites.", keywords: "website development Riyadh, web agency Riyadh, corporate website Riyadh, e-commerce Riyadh", ogTitle: "Website Development Riyadh | X360", ogDescription: "High-performance websites for Riyadh — corporate, e-commerce, and AI-powered." },
  { page: "svc-web-jeddah", metaTitle: "Website Development Jeddah | X360 Digital Agency", metaDescription: "X360 creates stunning websites for Jeddah businesses — luxury hospitality, retail, real estate, and corporate platforms with full Arabic support.", keywords: "website development Jeddah, web agency Jeddah, luxury website Jeddah, Arabic website Jeddah", ogTitle: "Website Development Jeddah | X360", ogDescription: "Stunning websites for Jeddah's hospitality, retail, and real estate businesses." },
  { page: "svc-web-dammam", metaTitle: "Website Development Dammam | X360", metaDescription: "X360 develops enterprise-grade websites for Dammam and Eastern Province companies — industrial, commercial, and corporate platforms.", keywords: "website development Dammam, web agency Eastern Province, corporate website Dammam", ogTitle: "Website Development Dammam | X360", ogDescription: "Enterprise websites for Dammam and Eastern Province companies." },
  { page: "svc-web-khobar", metaTitle: "Website Development Al Khobar | X360", metaDescription: "X360 builds professional websites for Al Khobar — luxury real estate portals, commercial platforms, and corporate identity sites.", keywords: "website development Khobar, web agency Khobar, real estate website Khobar", ogTitle: "Website Development Al Khobar | X360", ogDescription: "Professional websites for Al Khobar's real estate, corporate, and commercial businesses." },
  { page: "svc-web-neom",   metaTitle: "Website Development NEOM | Smart City Digital | X360", metaDescription: "X360 builds next-generation digital platforms for NEOM — smart city interfaces, AI-integrated web apps, and immersive brand experiences.", keywords: "website development NEOM, smart city web, NEOM digital platform, AI website NEOM", ogTitle: "Website Development NEOM | X360", ogDescription: "Next-generation websites and platforms for NEOM's smart city ecosystem." },
];

const ROUTE_MAP: Record<string, string> = {
  // Main
  home: "/", "360": "/360", "web-ai": "/web-ai", about: "/about",
  contact: "/contact", blog: "/blog", careers: "/careers", "case-studies": "/case-studies",
  // Virtual tour sub-pages
  "vt-real-estate": "/virtual-tours/real-estate", "vt-hospitality": "/virtual-tours/hospitality",
  "vt-luxury": "/virtual-tours/luxury-private", "vt-others": "/virtual-tours/others",
  // Development overview sub-pages
  "dev-website": "/development/website", "dev-ai-solutions": "/development/ai-solutions", "dev-erp-sap": "/development/erp-sap",
  // Dev website industry pages
  "dev-website-corporate": "/development/website/corporate", "dev-website-healthcare": "/development/website/healthcare",
  "dev-website-hospitality": "/development/website/hospitality", "dev-website-real-estate": "/development/website/real-estate",
  "dev-website-commerce": "/development/website/commerce", "dev-website-retail": "/development/website/retail",
  "dev-website-private-jet": "/development/website/private-jet",
  // Dev AI sub-pages
  "dev-ai-analytics": "/development/ai-solutions/ai-analytics", "dev-ai-automation": "/development/ai-solutions/ai-automation",
  "dev-ai-chatbots": "/development/ai-solutions/ai-chatbots", "dev-ai-custom": "/development/ai-solutions/custom-ai-systems",
  // Dev ERP sub-pages
  "dev-erp-sap-impl": "/development/erp-sap/sap-implementation", "dev-erp-custom": "/development/erp-sap/custom-erp",
  "dev-erp-bi": "/development/erp-sap/business-intelligence", "dev-erp-ai": "/development/erp-sap/ai-enterprise",
  "dev-erp-integration": "/development/erp-sap/system-integration",
  // Legal
  "privacy-policy": "/privacy-policy", "terms": "/terms-and-conditions",
  // Other standalone pages
  development: "/development", portfolio: "/portfolio", faq: "/faq", resources: "/resources",
  "dev-website-others": "/development/website/others",
  // Virtual Tours hub & additional sub-categories
  "virtual-tours": "/virtual-tours", "vt-digital-twins": "/virtual-tours/digital-twins",
  "vt-hospitals": "/virtual-tours/hospitals", "vt-hotels": "/virtual-tours/hotels",
  // Virtual Tour city pages
  "vt-riyadh": "/virtual-tours/riyadh", "vt-jeddah": "/virtual-tours/jeddah",
  "vt-dammam": "/virtual-tours/dammam", "vt-khobar": "/virtual-tours/khobar",
  "vt-mecca": "/virtual-tours/mecca", "vt-medina": "/virtual-tours/medina",
  "vt-neom": "/virtual-tours/neom", "vt-alula": "/virtual-tours/alula", "vt-tabuk": "/virtual-tours/tabuk",
  // City SEO landing pages
  "city-riyadh-tours": "/riyadh-virtual-tours", "city-riyadh-web": "/riyadh-web-development",
  "city-riyadh-ai": "/riyadh-ai-solutions", "city-riyadh-erp": "/riyadh-erp-solutions",
  "city-jeddah-tours": "/jeddah-virtual-tours", "city-jeddah-web": "/jeddah-web-development",
  "city-jeddah-ai": "/jeddah-ai-solutions", "city-jeddah-sap": "/jeddah-sap-solutions",
  "city-dammam-tours": "/dammam-virtual-tours", "city-dammam-web": "/dammam-web-development",
  "city-khobar-tours": "/khobar-virtual-tours",
  "city-neom-tours": "/neom-virtual-tours", "city-neom-ai": "/neom-ai-solutions",
  "city-tabuk-tours": "/tabuk-virtual-tours", "city-alula-tours": "/alula-virtual-tours",
  // Service x city pages
  "svc-ai-riyadh": "/ai-solutions/riyadh", "svc-ai-jeddah": "/ai-solutions/jeddah",
  "svc-ai-dammam": "/ai-solutions/dammam", "svc-ai-khobar": "/ai-solutions/khobar", "svc-ai-neom": "/ai-solutions/neom",
  "svc-erp-riyadh": "/erp-sap/riyadh", "svc-erp-jeddah": "/erp-sap/jeddah",
  "svc-erp-dammam": "/erp-sap/dammam", "svc-erp-khobar": "/erp-sap/khobar",
  "svc-web-riyadh": "/website-development/riyadh", "svc-web-jeddah": "/website-development/jeddah",
  "svc-web-dammam": "/website-development/dammam", "svc-web-khobar": "/website-development/khobar",
  "svc-web-neom": "/website-development/neom",
};

const PAGE_LABEL: Record<string, string> = {
  // Main
  home: "Home", "360": "360 Tours", "web-ai": "Web & AI", about: "About",
  contact: "Contact", blog: "Blog", careers: "Careers", "case-studies": "Case Studies",
  // Virtual tour sub-pages
  "vt-real-estate": "VT — Real Estate", "vt-hospitality": "VT — Hospitality",
  "vt-luxury": "VT — Luxury & Private", "vt-others": "VT — Other Sectors",
  // Development overview sub-pages
  "dev-website": "Dev — Website", "dev-ai-solutions": "Dev — AI Solutions", "dev-erp-sap": "Dev — ERP / SAP",
  // Dev website industry pages
  "dev-website-corporate": "Dev Web — Corporate", "dev-website-healthcare": "Dev Web — Healthcare",
  "dev-website-hospitality": "Dev Web — Hospitality", "dev-website-real-estate": "Dev Web — Real Estate",
  "dev-website-commerce": "Dev Web — Commerce", "dev-website-retail": "Dev Web — Retail",
  "dev-website-private-jet": "Dev Web — Private Jet",
  // Dev AI sub-pages
  "dev-ai-analytics": "AI — Analytics", "dev-ai-automation": "AI — Automation",
  "dev-ai-chatbots": "AI — Chatbots", "dev-ai-custom": "AI — Custom Systems",
  // Dev ERP sub-pages
  "dev-erp-sap-impl": "ERP — SAP Impl.", "dev-erp-custom": "ERP — Custom ERP",
  "dev-erp-bi": "ERP — Business Intel.", "dev-erp-ai": "ERP — AI Enterprise",
  "dev-erp-integration": "ERP — Integration",
  // Legal
  "privacy-policy": "Privacy Policy", "terms": "Terms & Conditions",
  // Other standalone pages
  development: "Development", portfolio: "Portfolio", faq: "FAQ", resources: "Resources",
  "dev-website-others": "Dev Web — Others",
  // Virtual Tours hub & additional sub-categories
  "virtual-tours": "Virtual Tours Hub", "vt-digital-twins": "VT — Digital Twins",
  "vt-hospitals": "VT — Hospitals", "vt-hotels": "VT — Hotels",
  // Virtual Tour city pages
  "vt-riyadh": "VT — Riyadh", "vt-jeddah": "VT — Jeddah", "vt-dammam": "VT — Dammam",
  "vt-khobar": "VT — Khobar", "vt-mecca": "VT — Mecca", "vt-medina": "VT — Medina",
  "vt-neom": "VT — NEOM", "vt-alula": "VT — AlUla", "vt-tabuk": "VT — Tabuk",
  // City SEO landing pages
  "city-riyadh-tours": "Riyadh — Virtual Tours", "city-riyadh-web": "Riyadh — Web Dev",
  "city-riyadh-ai": "Riyadh — AI Solutions", "city-riyadh-erp": "Riyadh — ERP/SAP",
  "city-jeddah-tours": "Jeddah — Virtual Tours", "city-jeddah-web": "Jeddah — Web Dev",
  "city-jeddah-ai": "Jeddah — AI Solutions", "city-jeddah-sap": "Jeddah — SAP/ERP",
  "city-dammam-tours": "Dammam — Virtual Tours", "city-dammam-web": "Dammam — Web Dev",
  "city-khobar-tours": "Khobar — Virtual Tours",
  "city-neom-tours": "NEOM — Virtual Tours", "city-neom-ai": "NEOM — AI Solutions",
  "city-tabuk-tours": "Tabuk — Virtual Tours", "city-alula-tours": "AlUla — Virtual Tours",
  // Service x city pages
  "svc-ai-riyadh": "AI × Riyadh", "svc-ai-jeddah": "AI × Jeddah",
  "svc-ai-dammam": "AI × Dammam", "svc-ai-khobar": "AI × Khobar", "svc-ai-neom": "AI × NEOM",
  "svc-erp-riyadh": "ERP × Riyadh", "svc-erp-jeddah": "ERP × Jeddah",
  "svc-erp-dammam": "ERP × Dammam", "svc-erp-khobar": "ERP × Khobar",
  "svc-web-riyadh": "Web × Riyadh", "svc-web-jeddah": "Web × Jeddah",
  "svc-web-dammam": "Web × Dammam", "svc-web-khobar": "Web × Khobar", "svc-web-neom": "Web × NEOM",
};

async function apiFetch(path: string, opts?: RequestInit) {
  const res = await fetch(path, { credentials: "include", ...opts });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

function apiToEntry(r: {
  page: string; metaTitle: string | null; metaDescription: string | null;
  keywords: string | null; ogTitle: string | null; ogDescription: string | null;
}): SeoEntry {
  return {
    page: r.page,
    metaTitle: r.metaTitle ?? "",
    metaDescription: r.metaDescription ?? "",
    keywords: r.keywords ?? "",
    ogTitle: r.ogTitle ?? "",
    ogDescription: r.ogDescription ?? "",
  };
}

const Score = ({ entry }: { entry: SeoEntry }) => {
  let score = 0;
  if (entry.metaTitle.length >= 30 && entry.metaTitle.length <= 60) score += 30;
  if (entry.metaDescription.length >= 100 && entry.metaDescription.length <= 160) score += 30;
  if (entry.keywords.split(",").length >= 3) score += 20;
  if (entry.ogTitle) score += 10;
  if (entry.ogDescription) score += 10;
  const color = score >= 80 ? "text-emerald-400" : score >= 50 ? "text-amber-400" : "text-red-400";
  return <span className={`font-mono text-[11px] font-600 ${color}`}>{score}/100</span>;
};

export default function SeoPage() {
  const [entries, setEntries] = useState<SeoEntry[]>(DEFAULTS);
  const [editing, setEditing] = useState<SeoEntry | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch("/api/admin/seo");
      if (Array.isArray(data) && data.length > 0) {
        const loaded = data.map(apiToEntry);
        const loadedPages = new Set(loaded.map((e: SeoEntry) => e.page));
        const merged = [
          ...loaded,
          ...DEFAULTS.filter(d => !loadedPages.has(d.page)),
        ];
        setEntries(merged);
      }
    } catch {
      setError("Could not load SEO settings — showing defaults");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const body = {
        metaTitle: editing.metaTitle,
        metaDescription: editing.metaDescription,
        keywords: editing.keywords,
        ogTitle: editing.ogTitle,
        ogDescription: editing.ogDescription,
      };
      await apiFetch(`/api/admin/seo/${encodeURIComponent(editing.page)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setEntries(es => es.map(e => e.page === editing.page ? editing : e));
      setSaved(true);
      setTimeout(() => { setSaved(false); setEditing(null); }, 800);
    } catch {
      setError("Failed to save SEO settings");
    } finally {
      setSaving(false);
    }
  };

  const avgScore = entries.reduce((acc, e) => {
    let score = 0;
    if (e.metaTitle.length >= 30 && e.metaTitle.length <= 60) score += 30;
    if (e.metaDescription.length >= 100 && e.metaDescription.length <= 160) score += 30;
    if (e.keywords.split(",").length >= 3) score += 20;
    if (e.ogTitle) score += 10;
    if (e.ogDescription) score += 10;
    return acc + score;
  }, 0) / (entries.length || 1);

  return (
    <div className="space-y-4 max-w-[1200px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-700 font-display text-white/90 tracking-tight">SEO Command</h1>
          <p className="text-[11px] text-white/35 mt-0.5">
            {loading ? "Loading…" : `Avg. score ${Math.round(avgScore)}/100 across ${entries.length} pages`}
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg">
          <Search className="w-3.5 h-3.5 text-white/35" />
          <span className="text-[11px] text-white/40">SEO Health Monitor</span>
        </div>
      </div>

      {error && (
        <div className="glass border border-amber-500/20 rounded-lg px-4 py-2.5 text-[11px] text-amber-400 flex items-center justify-between">
          {error}
          <button onClick={() => setError(null)} className="text-white/30 hover:text-white/60"><X className="w-3.5 h-3.5" /></button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Avg. SEO Score", value: `${Math.round(avgScore)}/100`, color: avgScore >= 70 ? "text-emerald-400" : "text-amber-400" },
          { label: "Optimised Pages", value: `${entries.filter(e => e.metaTitle.length >= 30 && e.metaDescription.length >= 100).length}/${entries.length}`, color: "text-white/85" },
          { label: "Missing Keywords", value: `${entries.filter(e => !e.keywords.trim()).length}`, color: "text-white/85" },
        ].map(s => (
          <div key={s.label} className="glass p-4">
            <p className="text-[10px] text-white/35 uppercase tracking-wide">{s.label}</p>
            <p className={`text-[22px] font-700 font-display mt-0.5 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="glass overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12 gap-2 text-white/25 text-[12px]">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading SEO settings…
          </div>
        ) : (
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Page", "Route", "Meta Title", "Meta Description", "Score", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-[10px] font-600 tracking-widest text-white/30 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map((e, i) => (
                <tr key={e.page} className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${i === entries.length - 1 ? "border-b-0" : ""}`}>
                  <td className="px-4 py-3 font-600 text-white/80">{PAGE_LABEL[e.page] ?? e.page}</td>
                  <td className="px-4 py-3 text-white/35 font-mono text-[10px]">{ROUTE_MAP[e.page] ?? `/${e.page}`}</td>
                  <td className="px-4 py-3 text-white/45 max-w-[200px]">
                    <p className="truncate">{e.metaTitle || <span className="text-white/20 italic">Not set</span>}</p>
                    {e.metaTitle && <p className={`text-[10px] mt-0.5 font-mono ${e.metaTitle.length > 60 ? "text-red-400/70" : e.metaTitle.length >= 30 ? "text-emerald-400/60" : "text-amber-400/60"}`}>{e.metaTitle.length} chars</p>}
                  </td>
                  <td className="px-4 py-3 text-white/40 max-w-[220px]">
                    <p className="truncate text-[11px]">{e.metaDescription || <span className="text-white/20 italic">Not set</span>}</p>
                    {e.metaDescription && <p className={`text-[10px] mt-0.5 font-mono ${e.metaDescription.length > 160 ? "text-red-400/70" : e.metaDescription.length >= 100 ? "text-emerald-400/60" : "text-amber-400/60"}`}>{e.metaDescription.length} chars</p>}
                  </td>
                  <td className="px-4 py-3"><Score entry={e} /></td>
                  <td className="px-4 py-3">
                    <button onClick={() => setEditing({ ...e })} className="p-1.5 rounded-md text-white/30 hover:text-white/70 hover:bg-white/[0.05] transition-colors"><Pencil className="w-3 h-3" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }} className="glass w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-[15px] font-700 text-white/90">SEO — {PAGE_LABEL[editing.page] ?? editing.page}</h2>
                  <p className="text-[10px] text-white/35 font-mono mt-0.5">{ROUTE_MAP[editing.page] ?? `/${editing.page}`}</p>
                </div>
                <button onClick={() => setEditing(null)} className="p-1.5 rounded-md text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-colors"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-4">
                {[
                  { key: "metaTitle",       label: "Meta Title",                  placeholder: "30–60 characters ideal", hint: `${editing.metaTitle.length} chars`,       warn: editing.metaTitle.length > 60 || (editing.metaTitle.length > 0 && editing.metaTitle.length < 30) },
                  { key: "metaDescription", label: "Meta Description",             placeholder: "100–160 characters ideal", hint: `${editing.metaDescription.length} chars`, warn: editing.metaDescription.length > 160 || (editing.metaDescription.length > 0 && editing.metaDescription.length < 100) },
                  { key: "keywords",        label: "Keywords (comma-separated)",  placeholder: "keyword1, keyword2, keyword3", hint: null, warn: false },
                  { key: "ogTitle",         label: "OG Title (Social Preview)",   placeholder: "Same as Meta Title or custom", hint: null, warn: false },
                  { key: "ogDescription",   label: "OG Description",              placeholder: "Up to 200 characters", hint: null, warn: false },
                ].map(field => (
                  <div key={field.key}>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[10px] font-600 tracking-widest text-white/35 uppercase">{field.label}</label>
                      {field.hint && <span className={`text-[10px] font-mono ${field.warn ? "text-amber-400" : "text-white/30"}`}>{field.hint}</span>}
                    </div>
                    <input
                      value={(editing as unknown as Record<string, string>)[field.key]}
                      onChange={e => setEditing(prev => prev ? { ...prev, [field.key]: e.target.value } : null)}
                      className={`w-full bg-white/[0.04] border rounded-lg px-3 py-2 text-[13px] text-white/85 placeholder:text-white/20 outline-none transition-colors ${field.warn ? "border-amber-500/30 focus:border-amber-500/50" : "border-white/[0.08] focus:border-white/20"}`}
                      placeholder={field.placeholder}
                    />
                    {field.warn && <p className="text-[10px] text-amber-400/70 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Check length for best SEO results</p>}
                  </div>
                ))}

                {/* ── SERP Preview ─────────────────────────────── */}
                <div>
                  <p className="text-[10px] font-600 tracking-widest text-white/35 uppercase mb-2">Google SERP Preview</p>
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3.5 space-y-0.5">
                    <p className="text-[11px] text-white/30 font-mono">
                      x-360.ai{ROUTE_MAP[editing.page] ?? `/${editing.page}`}
                    </p>
                    <p className="text-[15px] text-blue-400 leading-snug font-400 truncate">
                      {editing.metaTitle || <span className="text-white/20 italic">Meta title…</span>}
                    </p>
                    <p className="text-[12px] text-white/45 leading-relaxed line-clamp-2">
                      {editing.metaDescription || <span className="text-white/20 italic">Meta description…</span>}
                    </p>
                  </div>
                </div>

                {/* ── Social / OG Preview ──────────────────────── */}
                <div>
                  <p className="text-[10px] font-600 tracking-widest text-white/35 uppercase mb-2">Social Share Preview</p>
                  <div className="rounded-xl border border-white/[0.07] overflow-hidden">
                    <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] h-24 flex items-center justify-center">
                      <span className="text-white/10 text-[11px] font-mono">opengraph image</span>
                    </div>
                    <div className="bg-white/[0.03] px-4 py-2.5 border-t border-white/[0.06]">
                      <p className="text-[10px] text-white/25 uppercase tracking-wide font-mono mb-0.5">x-360.ai</p>
                      <p className="text-[13px] text-white/80 font-600 truncate leading-tight">
                        {editing.ogTitle || editing.metaTitle || <span className="text-white/20 italic">OG title…</span>}
                      </p>
                      <p className="text-[11px] text-white/40 mt-0.5 line-clamp-2 leading-relaxed">
                        {editing.ogDescription || editing.metaDescription || <span className="text-white/20 italic">OG description…</span>}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => void handleSave()}
                    disabled={saving}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-black text-[12px] font-600 hover:bg-white/90 transition-colors disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    {saved ? "Saved!" : "Save SEO"}
                  </button>
                  <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg text-[12px] text-white/40 hover:text-white/70 hover:bg-white/[0.05] transition-colors">Cancel</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
