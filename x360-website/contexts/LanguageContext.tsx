"use client";

import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from "react";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Lang = "en" | "ar";

interface IndustryBlock { title: string; desc: string; features: string[]; }
interface ProcessStep { step: string; title: string; desc: string; }

interface Translations {
  nav: {
    menu: string; close: string;
    virtualTours: string; webAI: string; about: string; contact: string; getStarted: string;
    services: string; portfolio: string; industries: string; caseStudies: string;
    tours360: string; virtualToursSub: string;
    interiorTours: string; exteriorTours: string; eventCoverage: string;
    propertyShowcase: string; residentialTours: string; carShowrooms: string;
    campusTours: string; retailCenters: string;
    webDev: string; webDevSub: string;
    ecommerce: string; corporateSites: string; aiSolutions: string; mobileApps: string;
    cybersecurity: string; cloudArch: string; dashboards: string; erp: string;
    industriesSub: string;
    indHospitality: string; indRealEstate: string; indHealthcare: string;
    indEducation: string; indRetail: string; indGovernment: string;
    indAutomotive: string; indConstruction: string;
    tourItemSubs: string[];
    webItemSubs: string[];
    industryItemSubs: string[];
  };
  home: {
    heroTitle360: string; heroTitleWeb: string; heroSub360: string; heroSubWeb: string;
    explore360: string; exploreWeb: string; hoverToExplore: string;
    virtualTours: string; webAI: string;
  };
  tours360: {
    hero: string; heroSub: string; featuresTitle: string;
    f1Title: string; f1Desc: string; f2Title: string; f2Desc: string;
    f3Title: string; f3Desc: string; f4Title: string; f4Desc: string;
    statsDelivered: string; statsSatisfaction: string; statsDelivery: string; statsIndustries: string;
    servicesTitle: string; servicesSub: string; serviceLabels: string[];
    vrTitle: string; vrSub: string;
    vr3DTitle: string; vr3DSub: string; vrARTitle: string; vrARSub: string;
    vrVRTitle: string; vrVRSub: string; vrWebTitle: string; vrWebSub: string;
    industryDeepTitle: string; industryDeepSub: string;
    industries: {
      realEstate: IndustryBlock; hospitality: IndustryBlock; healthcare: IndustryBlock;
      education: IndustryBlock; retail: IndustryBlock; automotive: IndustryBlock;
      construction: IndustryBlock; government: IndustryBlock;
    };
    processTitle: string; processSub: string; process: ProcessStep[];
    caseStudiesTitle: string; caseStudiesComingSoon: string;
    caseStudyTitles: string[]; caseStudyTags: string[];
    useCases: string; whyTitle: string; why: string[];
    cta: string; ctaSub: string; ctaBtn: string; ctaBtn2: string;
  };
  webAI: {
    hero: string; heroSub: string; featuresTitle: string;
    f1Title: string; f1Desc: string; f2Title: string; f2Desc: string;
    f3Title: string; f3Desc: string; f4Title: string; f4Desc: string;
    statsWebsites: string; statsApps: string; statsAI: string; statsUptime: string;
    servicesTitle: string; servicesSub: string; serviceLabels: string[];
    aiTitle: string; aiSub: string; aiFeatures: string[];
    reTitle: string; reSub: string; reFeatures: string[];
    enterpriseTitle: string; enterpriseSub: string; enterpriseItems: { title: string; desc: string }[];
    electiTitle: string; electiSub: string; electiFeatures: string[];
    processTitle: string; processSub: string; process: ProcessStep[];
    useCases: string; whyTitle: string; why: string[];
    formTitle: string; formSub: string;
    formServiceLabel: string; formBudgetLabel: string; formIndustryLabel: string;
    formMessageLabel: string; formSend: string;
    serviceOptions: string[]; budgetOptions: string[]; industryOptions: string[];
    cta: string; ctaSub: string; ctaBtn: string;
  };
  about: {
    badge: string; heroTitle: string; heroSub: string;
    statProjects: string; statClients: string; statYears: string; statTeam: string;
    missionTitle: string; missionP1: string; missionP2: string;
    quality: string; satisfaction: string; onTime: string;
    journeyTitle: string; timeline: { year: string; title: string; desc: string }[];
    ctaTitle: string; ctaSub: string; ctaBtn: string;
  };
  contact: {
    badge: string; heroTitle: string; heroSub: string;
    addressLabel: string; phoneLabel: string; emailLabel: string;
    chatNow: string; responseTitle: string; responseSub: string;
    nameLabel: string; emailFormLabel: string; phoneFormLabel: string; companyLabel: string;
    serviceLabel: string; budgetLabel: string; industryLabel: string; messageLabel: string;
    sendBtn: string; namePlaceholder: string; messagePlaceholder: string;
    selectService: string; selectBudget: string; selectIndustry: string;
    serviceOptions: string[]; budgetOptions: string[]; industryOptions: string[];
  };
  footer: {
    company: string; companyDesc: string; quickLinks: string; services: string; contact: string;
    address: string; phone: string; email: string;
    rights: string; privacy: string; terms: string; sitemap: string;
    toursHeader: string; webHeader: string; whatsappCTA: string;
    industriesHeader: string; quickLinksItems: string[];
  };
  common: {
    learnMore: string; contactUs: string; getQuote: string; viewAll: string;
    readMore: string; backHome: string; whatsapp: string; comingSoon: string;
  };
  caseStudies: {
    badge: string; heroTitle: string; heroSub: string;
    sectorTitles: string[]; sectorTags: string[];
    comingSoon: string; comingSoonDesc: string;
    ctaTitle: string; ctaBtn: string;
  };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ENGLISH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const en: Translations = {
  nav: {
    menu: "MENU", close: "CLOSE",
    virtualTours: "360° Virtual Tours", webAI: "Web & AI", about: "About",
    contact: "Contact Us", getStarted: "Get Started", services: "Services",
    portfolio: "Portfolio", industries: "Industries", caseStudies: "Case Studies",
    tours360: "360° Tours", virtualToursSub: "Immersive virtual experiences",
    interiorTours: "Interior Tours", exteriorTours: "Exterior Tours",
    eventCoverage: "Event Coverage", propertyShowcase: "Property Showcase",
    residentialTours: "Residential Tours", carShowrooms: "Car Showrooms",
    campusTours: "Campus Tours", retailCenters: "Retail Centers",
    webDev: "Web & AI Development", webDevSub: "Digital transformation solutions",
    ecommerce: "E-Commerce", corporateSites: "Corporate Websites",
    aiSolutions: "AI Solutions", mobileApps: "Mobile Apps",
    cybersecurity: "Cybersecurity", cloudArch: "Cloud Architecture",
    dashboards: "Dashboards & Analytics", erp: "ERP / SAP Solutions",
    industriesSub: "Sectors we specialize in",
    indHospitality: "Hotels & Hospitality", indRealEstate: "Real Estate",
    indHealthcare: "Healthcare", indEducation: "Education",
    indRetail: "Retail & Shopping", indGovernment: "Government & Culture",
    indAutomotive: "Automotive", indConstruction: "Construction",
    tourItemSubs: [
      "Hotels, offices & malls", "Architecture & landscaping",
      "Real estate & hospitality", "Conferences & exhibitions",
      "Villas, apartments & palaces", "Browse vehicles virtually",
      "Universities & schools", "Stores & retail parks",
      "Dining experiences virtually", "Cultural heritage digitization",
      "Project milestone capture", "Hospitals & clinics",
      "Official & public buildings", "Off-plan 3D visualization",
    ],
    webItemSubs: [
      "Brand-forward web presence", "End-to-end online stores",
      "Chatbots, automation & ML", "iOS & Android apps",
      "Enterprise-grade protection", "AWS, Azure & GCP setup",
      "Advanced data visualization", "Enterprise systems integration",
      "Bespoke platforms & tools", "Premium user experiences",
      "Growth & online visibility", "Cross-platform mobile apps",
      "Predictive AI models", "APIs & microservices",
      "Secure payment processing", "Content management systems",
    ],
    industryItemSubs: [
      "Hotels, resorts & F&B", "Development & asset management",
      "Hospitals, clinics & labs", "Universities & e-learning",
      "Stores, malls & e-commerce", "Government, culture & tourism",
      "Showrooms & dealerships", "Construction & architecture",
    ],
  },
  home: {
    heroTitle360: "IMMERSIVE 360°", heroTitleWeb: "WEB & AI",
    heroSub360: "Virtual Tours That Transport Your Clients",
    heroSubWeb: "Digital Solutions That Transform Your Business",
    explore360: "EXPLORE", exploreWeb: "EXPLORE",
    hoverToExplore: "Hover to explore",
    virtualTours: "خدمات الجولة الافتراضية 360", webAI: "خدمات تطوير الويب / الذكاء الاصطناعي",
  },
  tours360: {
    hero: "Immersive 360° Virtual Tours",
    heroSub: "Take your clients anywhere, anytime. Our photorealistic 360° virtual tours create unforgettable experiences that drive decisions.",
    featuresTitle: "What We Deliver",
    f1Title: "Photorealistic Quality", f1Desc: "Crystal-clear imagery captured with professional-grade equipment for the most immersive experience possible.",
    f2Title: "Interactive Hotspots", f2Desc: "Embedded information points, floor plans, and multimedia elements that engage and inform visitors.",
    f3Title: "Multi-Device Compatible", f3Desc: "Seamlessly accessible on desktop, mobile, tablet, and VR headsets for maximum reach.",
    f4Title: "Fast Delivery", f4Desc: "Professional turnaround in 3–5 business days from shoot to published tour, every time.",
    statsDelivered: "Tours Delivered", statsSatisfaction: "Client Satisfaction",
    statsDelivery: "Day Delivery", statsIndustries: "Industries Served",
    servicesTitle: "Spaces We Cover", servicesSub: "360° virtual tours for every type of space",
    serviceLabels: [
      "Hotel Tours", "Corporate Offices", "Real Estate", "Retail Spaces",
      "University Campuses", "Healthcare Facilities", "Car Showrooms",
      "Restaurants & Cafes", "Fuel Stations", "Fitness Centers",
      "Jewelry Stores", "Events & Exhibitions", "Religious Sites",
      "Beach Resorts", "Construction Sites",
    ],
    vrTitle: "3D Visualization & Immersive Technologies",
    vrSub: "Beyond 360° photography — we deliver next-generation spatial experiences powered by 3D rendering, Augmented Reality, and Virtual Reality.",
    vr3DTitle: "3D Visualization", vr3DSub: "Photorealistic 3D renders of spaces that don't yet exist — perfect for pre-construction sales.",
    vrARTitle: "Augmented Reality", vrARSub: "Overlay digital content onto real-world spaces via iOS and Android AR experiences.",
    vrVRTitle: "Virtual Reality", vrVRSub: "Full VR headset support (Meta Quest, HTC Vive) for total immersion in your space.",
    vrWebTitle: "Web Embed & Social", vrWebSub: "One-click embedding on any website, plus shareable links for social media and email.",
    industryDeepTitle: "Industry-Specific Solutions",
    industryDeepSub: "Tailored virtual tour packages designed for the unique requirements of each sector.",
    industries: {
      realEstate: { title: "Real Estate", desc: "Sell properties faster with always-on virtual showings that work 24/7.", features: ["Pre-construction 3D walkthroughs", "Floor plan overlays", "Neighbourhood context tours", "Google Street View integration"] },
      hospitality: { title: "Hotels & Resorts", desc: "Let guests preview every room, pool, and amenity before they book.", features: ["Room-by-room tours", "Lobby & dining area showcase", "Spa & facilities preview", "Booking link hotspots"] },
      healthcare: { title: "Healthcare Facilities", desc: "Help patients and visitors navigate hospitals with confidence.", features: ["Department wayfinding tours", "Medical equipment showcase", "Patient room previews", "Emergency department layout"] },
      education: { title: "Universities & Schools", desc: "Attract global students with immersive campus experiences.", features: ["Campus-wide virtual tour", "Library & lab previews", "Dormitory showcase", "Sports facility walkthroughs"] },
      retail: { title: "Retail & Shopping", desc: "Drive footfall and online engagement with virtual store experiences.", features: ["Store layout exploration", "Product spotlight hotspots", "New-branch pre-opening tours", "Mall directory integration"] },
      automotive: { title: "Automotive Showrooms", desc: "Let customers browse your entire fleet from their smartphone.", features: ["360° vehicle interior tours", "Multi-model showroom tours", "Service bay walkthroughs", "AR paint & trim configurator"] },
      construction: { title: "Construction & Architecture", desc: "Document progress and sell off-plan with photorealistic pre-builds.", features: ["Construction milestone documentation", "Off-plan 3D previews", "BIM model integration", "Safety walkthrough tours"] },
      government: { title: "Government & Cultural Sites", desc: "Digitize heritage and public spaces for global audiences.", features: ["Museum & heritage digitization", "Government complex tours", "Public park & landmark tours", "Interactive exhibit hotspots"] },
    },
    processTitle: "Our Process", processSub: "From idea to published tour in 8 steps",
    process: [
      { step: "01", title: "Consultation", desc: "We understand your space and goals" },
      { step: "02", title: "Scheduling", desc: "We schedule the shoot at your convenience" },
      { step: "03", title: "Capture", desc: "Our team shoots with pro-grade equipment" },
      { step: "04", title: "Processing", desc: "Stitching and enhancing images in detail" },
      { step: "05", title: "Hotspots", desc: "Adding interactive info points and media" },
      { step: "06", title: "QA Review", desc: "Full quality check before delivery" },
      { step: "07", title: "Publishing", desc: "Published across all platforms" },
      { step: "08", title: "Support", desc: "Ongoing support post-delivery" },
    ],
    caseStudiesTitle: "Case Studies",
    caseStudiesComingSoon: "Coming soon — detailed case studies from our portfolio.",
    caseStudyTitles: ["5-Star Hotel — Riyadh", "Residential Complex — Jeddah", "University Campus — Dammam"],
    caseStudyTags: ["Hospitality", "Real Estate", "Education"],
    useCases: "Perfect For", whyTitle: "Why Choose X360?",
    why: [
      "Latest 360° equipment in the region", "Delivery within 3–5 business days",
      "Arabic & English support team", "100% satisfaction guarantee",
      "VR headset compatible", "Google Street View integration",
      "Interactive floor plan integration", "Visitor analytics & statistics",
      "Easy website embedding", "Social media sharing ready",
    ],
    cta: "Ready to take your space virtual?", ctaSub: "Our team is ready to help you get started today.",
    ctaBtn: "Request a Tour", ctaBtn2: "Get a Quote",
  },
  webAI: {
    hero: "Web & AI Development",
    heroSub: "From stunning corporate websites to intelligent AI-powered solutions, we build digital experiences that elevate your brand and automate your future.",
    featuresTitle: "Our Capabilities",
    f1Title: "Custom Web Development", f1Desc: "Bespoke websites and web applications built with the latest technologies for performance and scalability.",
    f2Title: "AI Integration", f2Desc: "Embed intelligent chatbots, recommendation engines, and automation into your business workflows.",
    f3Title: "E-Commerce Solutions", f3Desc: "Full-featured online stores with payment gateways, inventory management, and conversion optimization.",
    f4Title: "Mobile Applications", f4Desc: "Native and cross-platform mobile apps that deliver seamless experiences on iOS and Android.",
    statsWebsites: "Websites Launched", statsApps: "Mobile Apps Built",
    statsAI: "AI Systems Deployed", statsUptime: "Uptime Guaranteed",
    servicesTitle: "Our Full Service Suite", servicesSub: "20+ integrated digital services",
    serviceLabels: [
      "Corporate Websites", "E-Commerce Stores", "AI Chatbots", "iOS Apps",
      "Android Apps", "Progressive Web Apps", "Cybersecurity", "Cloud Architecture",
      "Data Dashboards", "System Integration", "Machine Learning", "NLP / Voice AI",
      "ERP / SAP Solutions", "Payment Gateways", "Digital Marketing",
      "SEO Optimization", "React Native Apps", "Generative AI",
      "CMS Development", "Maintenance & Support",
    ],
    aiTitle: "AI-Powered Development",
    aiSub: "We don't just build software — we build intelligent systems that learn, automate, and grow with your business.",
    aiFeatures: [
      "Custom AI chatbots trained on your data", "LLM integration (GPT-4, Claude, Gemini)",
      "Computer vision & image recognition", "Predictive analytics & ML models",
      "Voice AI & NLP solutions", "AI-powered recommendation engines",
      "Workflow automation with AI agents", "Generative AI content tools",
    ],
    reTitle: "Real Estate Digital Ecosystem",
    reSub: "A complete digital stack for real estate developers, agents, and property managers operating in Saudi Arabia's booming property market.",
    reFeatures: [
      "Integrated 360° virtual tour embedding", "CRM & lead management systems",
      "Property listing portals", "Off-plan sales platforms",
      "AR property visualizer apps", "WhatsApp & chatbot lead capture",
      "Mortgage calculator integrations", "Analytics & investor dashboards",
    ],
    enterpriseTitle: "Enterprise & Custom Software",
    enterpriseSub: "End-to-end enterprise solutions engineered for scale, security, and Saudi compliance.",
    enterpriseItems: [
      { title: "SAP & ERP Integration", desc: "Connect, customize, and extend SAP S/4HANA, Oracle, and Microsoft Dynamics deployments for the Saudi market." },
      { title: "Custom Software Development", desc: "Bespoke enterprise platforms, internal tools, and SaaS products built from the ground up to your exact specifications." },
      { title: "Cybersecurity Solutions", desc: "Enterprise-grade security audits, penetration testing, ISO 27001 readiness, and PDPL compliance for Saudi businesses." },
      { title: "Cloud Architecture & DevOps", desc: "AWS, Azure, and GCP infrastructure design, migration, and managed DevOps — built for reliability and cost efficiency." },
    ],
    electiTitle: "Electi — AI SaaS Platform",
    electiSub: "Our flagship AI product: an intelligent business suite featuring Personal, Billing, Legal, and Sales AI agents — built specifically for Saudi enterprises.",
    electiFeatures: [
      "Personal AI: Intelligent scheduling, notes & task automation",
      "Billing AI: Invoice generation, payment reminders & reconciliation",
      "Legal AI: Contract drafting, clause review & compliance checks",
      "Sales AI: Lead scoring, pipeline management & smart follow-ups",
      "Full bilingual EN/AR interface with RTL support",
      "Saudi data residency & PDPL compliant",
    ],
    processTitle: "Our Methodology", processSub: "A proven process for delivering exceptional projects",
    process: [
      { step: "01", title: "Discovery", desc: "We understand your business and tech goals" },
      { step: "02", title: "Planning", desc: "Project architecture and timeline estimation" },
      { step: "03", title: "Design", desc: "Professional UI/UX wireframes and designs" },
      { step: "04", title: "Development", desc: "High-quality development with testing" },
      { step: "05", title: "AI Layer", desc: "AI & automation integration" },
      { step: "06", title: "QA Testing", desc: "Comprehensive testing across all devices" },
      { step: "07", title: "Launch", desc: "Secure deployment with live support" },
      { step: "08", title: "Growth", desc: "Ongoing maintenance and feature growth" },
    ],
    useCases: "Industries We Serve", whyTitle: "Why X360 for Your Digital Project?",
    why: [
      "Fastest time-to-market delivery", "Enterprise-grade security standards",
      "Full-stack multidisciplinary team", "Post-launch support & SLA",
      "Open-source first architecture", "Fully responsive multi-device design",
      "Core Web Vitals optimization", "SEO & accessibility built-in",
      "Full code documentation", "Deep Saudi market expertise",
    ],
    formTitle: "Start Your Project",
    formSub: "Tell us about your project and we'll get back to you within 24 hours with a tailored proposal.",
    formServiceLabel: "Service", formBudgetLabel: "Budget Range",
    formIndustryLabel: "Industry", formMessageLabel: "Project Brief", formSend: "Send Brief",
    serviceOptions: ["360° Virtual Tours", "Corporate Website", "E-Commerce Store", "AI Solutions", "Mobile App (iOS/Android)", "System Integration", "SAP/ERP", "Other"],
    budgetOptions: ["Under SAR 10,000", "SAR 10,000 – 50,000", "SAR 50,000 – 150,000", "Over SAR 150,000", "Not decided yet"],
    industryOptions: ["Real Estate", "Hospitality", "Retail", "Healthcare", "Education", "Finance", "Government", "Other"],
    cta: "Ready to transform your digital presence?",
    ctaSub: "Free consultation to discuss your digital needs and propose a tailored solution.",
    ctaBtn: "Start Your Project",
  },
  about: {
    badge: "About X360", heroTitle: "Our Story",
    heroSub: "X360 is a specialized company delivering immersive 360° virtual tour experiences and cutting-edge Web & AI development solutions to businesses across Saudi Arabia and the wider region.",
    statProjects: "Projects Completed", statClients: "Happy Clients",
    statYears: "Years Experience", statTeam: "Specialists",
    missionTitle: "Our Mission",
    missionP1: "At X360, we believe technology should serve business in tangible, impactful ways. Our mission is to equip companies with digital transformation tools that make a real difference — whether through breathtaking virtual experiences or intelligent web solutions.",
    missionP2: "We combine technical creativity with a deep understanding of the local market to deliver solutions that exceed our clients' expectations.",
    quality: "Unmatched Quality", satisfaction: "Client Satisfaction", onTime: "On-Time Delivery",
    journeyTitle: "Our Journey",
    timeline: [
      { year: "2019", title: "Founded", desc: "X360 founded in Riyadh with a focus on 360° virtual tours" },
      { year: "2020", title: "Expansion", desc: "Expanded into web development and AI services" },
      { year: "2022", title: "100 Projects", desc: "Reached 100 successful projects across the Kingdom" },
      { year: "2024", title: "Industry Leader", desc: "Became the trusted digital partner for leading enterprises" },
    ],
    ctaTitle: "Ready to work with us?", ctaSub: "Get in touch today to discuss your next project.", ctaBtn: "Contact Us",
  },
  contact: {
    badge: "Contact", heroTitle: "Get In Touch",
    heroSub: "We're here to help. Tell us about your project and our team will reach out within 24 hours.",
    addressLabel: "Address", phoneLabel: "Phone", emailLabel: "Email",
    chatNow: "Chat with us now", responseTitle: "Response Time",
    responseSub: "Within 24 business hours guaranteed",
    nameLabel: "Name", emailFormLabel: "Email", phoneFormLabel: "Phone",
    companyLabel: "Company", serviceLabel: "Service", budgetLabel: "Budget Range",
    industryLabel: "Industry", messageLabel: "Message", sendBtn: "Send Message",
    namePlaceholder: "Your full name", messagePlaceholder: "Tell us about your project...",
    selectService: "Select a service", selectBudget: "Select budget", selectIndustry: "Select industry",
    serviceOptions: ["360° Virtual Tours", "Corporate Website", "E-Commerce Store", "AI Solutions", "Mobile App (iOS/Android)", "System Integration", "Other"],
    budgetOptions: ["Under SAR 10,000", "SAR 10,000 – 50,000", "SAR 50,000 – 150,000", "Over SAR 150,000", "Not decided yet"],
    industryOptions: ["Real Estate", "Hospitality & Hotels", "Retail", "Healthcare", "Education", "Finance", "Government", "Other"],
  },
  footer: {
    company: "Others",
    companyDesc: "Delivering immersive 360° virtual tours and cutting-edge Web & AI solutions across Saudi Arabia and the region.",
    quickLinks: "Quick Links", services: "Services", contact: "Contact Us",
    address: "Riyadh, Saudi Arabia", phone: "+966 532087436", email: "mohammed@x-360.ai",
    rights: "© 2025 X360. All rights reserved.",
    privacy: "Privacy Policy", terms: "Terms of Service", sitemap: "Sitemap",
    toursHeader: "360° Tours", webHeader: "Web & AI", whatsappCTA: "WhatsApp Us",
    industriesHeader: "Industries",
    quickLinksItems: ["Home", "360° Virtual Tours", "Web & AI", "Industries", "Case Studies", "About", "Contact"],
  },
  common: {
    learnMore: "Learn More", contactUs: "Contact Us", getQuote: "Get a Quote",
    viewAll: "View All", readMore: "Read More", backHome: "Back to Home",
    whatsapp: "WhatsApp", comingSoon: "Coming Soon",
  },
  caseStudies: {
    badge: "Case Studies", heroTitle: "Our Work", heroSub: "Real projects, real results — explore how X360 has transformed businesses across Saudi Arabia and the GCC with immersive virtual tours and intelligent digital solutions.",
    sectorTitles: ["5-Star Hotel — Riyadh", "Residential Complex — Jeddah", "University Campus — Dammam", "Retail Mall — Khobar", "Government HQ — Riyadh", "Healthcare Facility — Makkah"],
    sectorTags: ["Hospitality", "Real Estate", "Education", "Retail", "Government", "Healthcare"],
    comingSoon: "Coming Soon", comingSoonDesc: "Detailed case studies are being prepared. Check back soon.",
    ctaTitle: "Ready to be our next success story?", ctaBtn: "Start Your Project",
  },
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ARABIC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const ar: Translations = {
  nav: {
    menu: "القائمة", close: "إغلاق",
    virtualTours: "جولات 360° الافتراضية", webAI: "الويب والذكاء الاصطناعي",
    about: "من نحن", contact: "تواصل معنا", getStarted: "ابدأ الآن",
    services: "الخدمات", portfolio: "أعمالنا", industries: "القطاعات",
    caseStudies: "دراسات الحالة", tours360: "جولات 360°",
    virtualToursSub: "تجارب افتراضية غامرة",
    interiorTours: "جولات داخلية", exteriorTours: "جولات خارجية",
    eventCoverage: "تغطية الفعاليات", propertyShowcase: "عرض العقارات",
    residentialTours: "جولات سكنية", carShowrooms: "معارض السيارات",
    campusTours: "جولات الحرم الجامعي", retailCenters: "مراكز التجزئة",
    webDev: "تطوير الويب والذكاء الاصطناعي", webDevSub: "حلول التحول الرقمي",
    ecommerce: "التجارة الإلكترونية", corporateSites: "مواقع الشركات",
    aiSolutions: "حلول الذكاء الاصطناعي", mobileApps: "تطبيقات الجوال",
    cybersecurity: "الأمن السيبراني", cloudArch: "البنية السحابية",
    dashboards: "لوحات التحكم والتحليلات", erp: "حلول SAP/ERP",
    industriesSub: "القطاعات التي نتخصص فيها",
    indHospitality: "الفنادق والضيافة", indRealEstate: "العقارات",
    indHealthcare: "الرعاية الصحية", indEducation: "التعليم",
    indRetail: "التجزئة والتسوق", indGovernment: "الحكومة والثقافة",
    indAutomotive: "السيارات", indConstruction: "البناء والمقاولات",
    tourItemSubs: [
      "فنادق، مكاتب، مراكز تسوق", "مباني وحدائق",
      "عقارات وضيافة", "مؤتمرات ومعارض",
      "فلل وشقق وقصور", "تصفح السيارات افتراضياً",
      "جامعات ومدارس", "محلات وأسواق",
      "تجارب المطاعم افتراضياً", "رقمنة التراث الثقافي",
      "توثيق مراحل المشاريع", "مستشفيات وعيادات",
      "مواقع رسمية وحكومية", "مشاريع ما قبل البناء",
    ],
    webItemSubs: [
      "حضور ويب قوي للعلامة التجارية", "متاجر إلكترونية متكاملة",
      "روبوتات وأتمتة وتعلم الآلة", "تطبيقات iOS وAndroid",
      "حماية مؤسسية شاملة", "AWS، Azure وGoogle Cloud",
      "تحليلات البيانات المتقدمة", "تكامل أنظمة المؤسسات",
      "منصات وأدوات مؤسسية", "تجارب مستخدم استثنائية",
      "نمو وظهور رقمي", "تطبيقات متعددة المنصات",
      "نماذج تنبؤية وذكاء اصطناعي", "API وخدمات مصغرة",
      "حلول دفع آمنة", "أنظمة إدارة المحتوى",
    ],
    industryItemSubs: [
      "فنادق، منتجعات، مطاعم", "تطوير عقاري وإدارة أصول",
      "مستشفيات، عيادات، مختبرات", "جامعات، مدارس، تدريب",
      "متاجر، مراكز تسوق", "حكومة، ثقافة، سياحة",
      "معارض ووكالات السيارات", "مقاولات وهندسة معمارية",
    ],
  },
  home: {
    heroTitle360: "جولات 360°", heroTitleWeb: "الويب والذكاء الاصطناعي",
    heroSub360: "جولات افتراضية تأخذ عملاءك إلى أي مكان",
    heroSubWeb: "حلول رقمية تحوّل أعمالك",
    explore360: "استكشف", exploreWeb: "استكشف",
    hoverToExplore: "مرر للاستكشاف",
    virtualTours: "خدمات الجولة الافتراضية 360", webAI: "خدمات الويب والذكاء الاصطناعي",
  },
  tours360: {
    hero: "جولات 360° الافتراضية الغامرة",
    heroSub: "خذ عملاءك إلى أي مكان في أي وقت. جولاتنا الافتراضية الواقعية تخلق تجارب لا تُنسى تدفع القرارات.",
    featuresTitle: "ما نقدمه",
    f1Title: "جودة فوتوغرافية واقعية", f1Desc: "صور نقية التقطت بمعدات احترافية لأكثر تجربة غامرة ممكنة.",
    f2Title: "نقاط تفاعلية", f2Desc: "نقاط معلومات مدمجة ومخططات الطوابق وعناصر وسائط متعددة.",
    f3Title: "متوافق مع جميع الأجهزة", f3Desc: "يمكن الوصول إليه على الكمبيوتر والجوال والجهاز اللوحي ونظارات الواقع الافتراضي.",
    f4Title: "تسليم سريع", f4Desc: "تسليم احترافي خلال 3-5 أيام عمل من التصوير حتى النشر.",
    statsDelivered: "جولة منجزة", statsSatisfaction: "رضا العملاء",
    statsDelivery: "أيام عمل للتسليم", statsIndustries: "قطاع نخدمه",
    servicesTitle: "المساحات التي نغطيها", servicesSub: "جولات 360° افتراضية لجميع أنواع المساحات",
    serviceLabels: [
      "جولات الفنادق", "المكاتب والشركات", "العقارات", "مراكز التجزئة",
      "الحرم الجامعي", "المستشفيات", "معارض السيارات",
      "المطاعم والمقاهي", "محطات الوقود", "مراكز اللياقة",
      "محلات المجوهرات", "الفعاليات والمعارض", "المواقع الدينية",
      "المنتجعات الساحلية", "مشاريع البناء",
    ],
    vrTitle: "التصور ثلاثي الأبعاد وتقنيات الغمر",
    vrSub: "أكثر من مجرد تصوير 360° — نقدم تجارب مكانية من الجيل القادم مدعومة بالتصيير ثلاثي الأبعاد والواقع المعزز والواقع الافتراضي.",
    vr3DTitle: "التصور ثلاثي الأبعاد", vr3DSub: "تصاميم ثلاثية الأبعاد واقعية للمساحات التي لم تُبنى بعد — مثالية لمبيعات ما قبل البناء.",
    vrARTitle: "الواقع المعزز", vrARSub: "تراكب المحتوى الرقمي على المساحات الحقيقية عبر تطبيقات iOS و Android.",
    vrVRTitle: "الواقع الافتراضي", vrVRSub: "دعم كامل لنظارات VR (Meta Quest، HTC Vive) للغمر الكامل في مساحتك.",
    vrWebTitle: "تضمين الويب والتواصل الاجتماعي", vrWebSub: "تضمين بنقرة واحدة في أي موقع، بالإضافة إلى روابط قابلة للمشاركة.",
    industryDeepTitle: "حلول خاصة بكل قطاع",
    industryDeepSub: "باقات جولات افتراضية مصممة خصيصاً لمتطلبات كل قطاع.",
    industries: {
      realEstate: { title: "العقارات", desc: "بع العقارات بشكل أسرع مع عروض افتراضية متاحة على مدار الساعة.", features: ["جولات ثلاثية الأبعاد قبل البناء", "تراكبات مخططات الطوابق", "جولات سياق الحي", "تكامل Google Street View"] },
      hospitality: { title: "الفنادق والمنتجعات", desc: "دع الضيوف يعاينون كل غرفة ومسبح ومرفق قبل الحجز.", features: ["جولات غرفة بغرفة", "عرض اللوبي ومنطقة تناول الطعام", "معاينة المنتجع الصحي والمرافق", "نقاط رابط الحجز"] },
      healthcare: { title: "المرافق الصحية", desc: "ساعد المرضى والزوار على التنقل في المستشفيات بثقة.", features: ["جولات إرشادية بين الأقسام", "عرض المعدات الطبية", "معاينات غرف المرضى", "تخطيط قسم الطوارئ"] },
      education: { title: "الجامعات والمدارس", desc: "استقطب الطلاب الدوليين بتجارب حرم جامعي غامرة.", features: ["جولة شاملة للحرم الجامعي", "معاينات المكتبات والمختبرات", "عرض السكن الجامعي", "جولات المرافق الرياضية"] },
      retail: { title: "التجزئة والتسوق", desc: "زد حركة المشاة والتفاعل الإلكتروني بتجارب المتاجر الافتراضية.", features: ["استكشاف تخطيط المتجر", "نقاط إبراز المنتجات", "جولات ما قبل الافتتاح", "تكامل دليل المجمع"] },
      automotive: { title: "معارض السيارات", desc: "دع العملاء يتصفحون أسطولك بالكامل من هواتفهم.", features: ["جولات داخلية 360° للمركبات", "جولات صالة عرض متعددة الطرازات", "جولات ورشة الخدمة", "مُهيئ AR للطلاء والتشطيب"] },
      construction: { title: "البناء والعمارة", desc: "وثّق التقدم وبع على الخارطة بمعاينات ثلاثية الأبعاد.", features: ["توثيق مراحل البناء", "معاينات ثلاثية الأبعاد قبل البناء", "تكامل نماذج BIM", "جولات السلامة"] },
      government: { title: "المواقع الحكومية والثقافية", desc: "رقمنة التراث والمساحات العامة للجمهور العالمي.", features: ["رقمنة المتاحف والتراث", "جولات المجمعات الحكومية", "جولات المتنزهات والمعالم", "نقاط المعارض التفاعلية"] },
    },
    processTitle: "كيف نعمل", processSub: "من الفكرة إلى الجولة المنشورة في 8 خطوات",
    process: [
      { step: "01", title: "الاستشارة", desc: "نفهم مساحتك وأهدافك" },
      { step: "02", title: "الجدولة", desc: "نحدد موعد التصوير المناسب" },
      { step: "03", title: "التصوير", desc: "فريقنا يصور بمعدات احترافية" },
      { step: "04", title: "المعالجة", desc: "تجميع وتحسين الصور بدقة" },
      { step: "05", title: "النقاط التفاعلية", desc: "إضافة عناصر تفاعلية وتعليمية" },
      { step: "06", title: "ضمان الجودة", desc: "مراجعة شاملة قبل التسليم" },
      { step: "07", title: "النشر", desc: "نشر الجولة على جميع المنصات" },
      { step: "08", title: "الدعم", desc: "دعم مستمر بعد التسليم" },
    ],
    caseStudiesTitle: "دراسات الحالة",
    caseStudiesComingSoon: "قريباً — دراسات حالة مفصلة من مشاريعنا.",
    caseStudyTitles: ["فندق 5 نجوم — الرياض", "مجمع عقاري — جدة", "حرم جامعي — الدمام"],
    caseStudyTags: ["ضيافة", "عقارات", "تعليم"],
    useCases: "مثالي لـ", whyTitle: "لماذا X360؟",
    why: [
      "أحدث معدات 360° في المنطقة", "تسليم خلال 3-5 أيام عمل",
      "دعم عربي وإنجليزي", "ضمان الرضا 100%",
      "متوافق مع نظارات VR", "تكامل Google Street View",
      "خرائط الطوابق التفاعلية", "تحليلات وإحصائيات الزوار",
      "تضمين في الموقع الإلكتروني", "دعم وسائل التواصل الاجتماعي",
    ],
    cta: "هل أنت مستعد لتحويل مساحتك إلى واقع افتراضي؟",
    ctaSub: "فريقنا جاهز لمساعدتك اليوم.",
    ctaBtn: "اطلب جولة", ctaBtn2: "احصل على عرض سعر",
  },
  webAI: {
    hero: "تطوير الويب والذكاء الاصطناعي",
    heroSub: "من مواقع الشركات المذهلة إلى حلول الذكاء الاصطناعي، نبني تجارب رقمية ترتقي بعلامتك وتؤتمت مستقبلك.",
    featuresTitle: "قدراتنا",
    f1Title: "تطوير ويب مخصص", f1Desc: "مواقع وتطبيقات ويب مخصصة بأحدث التقنيات للأداء وقابلية التوسع.",
    f2Title: "تكامل الذكاء الاصطناعي", f2Desc: "دمج روبوتات المحادثة الذكية ومحركات التوصيات والأتمتة في سير عمل أعمالك.",
    f3Title: "حلول التجارة الإلكترونية", f3Desc: "متاجر إلكترونية متكاملة مع بوابات دفع وإدارة مخزون وتحسين التحويل.",
    f4Title: "تطبيقات الجوال", f4Desc: "تطبيقات جوال أصلية ومتعددة المنصات تقدم تجارب سلسة على iOS و Android.",
    statsWebsites: "موقع مُطوَّر", statsApps: "تطبيق جوال",
    statsAI: "نظام ذكاء اصطناعي", statsUptime: "وقت التشغيل",
    servicesTitle: "خدماتنا الشاملة", servicesSub: "20+ خدمة رقمية متكاملة",
    serviceLabels: [
      "مواقع الشركات", "التجارة الإلكترونية", "روبوتات المحادثة", "تطبيقات iOS",
      "تطبيقات Android", "تطبيقات الويب", "الأمن السيبراني", "البنية السحابية",
      "لوحات التحكم", "تكامل الأنظمة", "تعلم الآلة", "معالجة اللغة",
      "حلول SAP/ERP", "بوابات الدفع", "التسويق الرقمي",
      "تحسين محركات البحث", "تطبيقات React Native", "الذكاء الاصطناعي التوليدي",
      "إدارة المحتوى", "الصيانة والدعم",
    ],
    aiTitle: "تطوير مدعوم بالذكاء الاصطناعي",
    aiSub: "نحن لا نبني البرمجيات فقط — نبني أنظمة ذكية تتعلم وتؤتمت وتنمو مع أعمالك.",
    aiFeatures: [
      "روبوتات محادثة مدربة على بياناتك", "تكامل LLM (GPT-4، Claude، Gemini)",
      "رؤية الكمبيوتر والتعرف على الصور", "تحليلات تنبؤية ونماذج ML",
      "حلول Voice AI ومعالجة اللغة", "محركات توصية مدعومة بالذكاء الاصطناعي",
      "أتمتة سير العمل بوكلاء الذكاء الاصطناعي", "أدوات المحتوى التوليدي",
    ],
    reTitle: "النظام البيئي الرقمي للعقارات",
    reSub: "حزمة رقمية متكاملة للمطورين العقاريين والوكلاء ومديري العقارات في سوق العقارات السعودي المزدهر.",
    reFeatures: [
      "تضمين جولات 360° الافتراضية المتكاملة", "أنظمة إدارة علاقات العملاء ومتابعة العملاء المحتملين",
      "بوابات قوائم العقارات", "منصات بيع ما قبل البناء",
      "تطبيقات AR لتصور العقارات", "واتساب وروبوت الدردشة لجذب العملاء",
      "تكاملات حاسبة التمويل", "تحليلات ولوحات معلومات المستثمرين",
    ],
    enterpriseTitle: "برمجيات المؤسسات والبرمجيات المخصصة",
    enterpriseSub: "حلول مؤسسية شاملة مهندسة للأمان والامتثال السعودي.",
    enterpriseItems: [
      { title: "تكامل SAP وERP", desc: "ربط وتخصيص وتوسيع نشر SAP S/4HANA وOracle وMicrosoft Dynamics للسوق السعودي." },
      { title: "تطوير برمجيات مخصصة", desc: "منصات مؤسسية مخصصة وأدوات داخلية ومنتجات SaaS مبنية من الصفر وفق مواصفاتك." },
      { title: "حلول الأمن السيبراني", desc: "تدقيق أمني على مستوى المؤسسات واختبار الاختراق وجاهزية ISO 27001 وامتثال نظام PDPL." },
      { title: "البنية السحابية وDevOps", desc: "تصميم بنية AWS وAzure وGCP، والترحيل، وDevOps المُدار — مبني للموثوقية وكفاءة التكلفة." },
    ],
    electiTitle: "Electi — منصة الذكاء الاصطناعي",
    electiSub: "منتجنا الرائد: مجموعة أعمال ذكية تضم وكلاء ذكاء اصطناعي شخصي وفوترة وقانوني ومبيعات — مبنية خصيصاً للمؤسسات السعودية.",
    electiFeatures: [
      "الذكاء الاصطناعي الشخصي: جدولة ذكية ومهام وملاحظات آلية",
      "ذكاء اصطناعي للفواتير: إنشاء الفواتير والتذكير والتسوية",
      "ذكاء اصطناعي قانوني: صياغة العقود ومراجعة البنود والامتثال",
      "ذكاء اصطناعي للمبيعات: تسجيل العملاء المحتملين وإدارة خط الأنابيب",
      "واجهة ثنائية اللغة EN/AR مع دعم RTL الكامل",
      "إقامة البيانات السعودية وامتثال نظام PDPL",
    ],
    processTitle: "منهجيتنا", processSub: "عملية مثبتة لتسليم مشاريع استثنائية",
    process: [
      { step: "01", title: "الاكتشاف", desc: "نفهم أعمالك وأهدافك التقنية" },
      { step: "02", title: "التخطيط", desc: "هندسة المشروع وتقدير الجدول الزمني" },
      { step: "03", title: "التصميم", desc: "واجهات مستخدم وتجربة مستخدم احترافية" },
      { step: "04", title: "التطوير", desc: "برمجة ذات جودة عالية مع اختبارات" },
      { step: "05", title: "ذكاء اصطناعي", desc: "تكامل الذكاء الاصطناعي والأتمتة" },
      { step: "06", title: "الاختبار", desc: "اختبارات شاملة عبر جميع الأجهزة" },
      { step: "07", title: "الإطلاق", desc: "نشر آمن وموثوق مع دعم مباشر" },
      { step: "08", title: "التطوير المستمر", desc: "صيانة وتحسينات مستمرة" },
    ],
    useCases: "القطاعات التي نخدمها", whyTitle: "لماذا X360 لمشروعك الرقمي؟",
    why: [
      "أسرع وقت للإطلاق في السوق", "أمان من المستوى المؤسسي",
      "فريق متعدد التخصصات", "دعم ما بعد الإطلاق",
      "تقنيات مفتوحة المصدر", "تصميم متجاوب لجميع الأجهزة",
      "تحسين أداء الموقع", "تحسين محركات البحث",
      "توثيق شامل", "خبرة في السوق السعودي",
    ],
    formTitle: "ابدأ مشروعك",
    formSub: "أخبرنا عن مشروعك وسنرد عليك خلال 24 ساعة بعرض مخصص.",
    formServiceLabel: "الخدمة", formBudgetLabel: "نطاق الميزانية",
    formIndustryLabel: "القطاع", formMessageLabel: "وصف المشروع", formSend: "إرسال الوصف",
    serviceOptions: ["جولات 360° افتراضية", "تطوير موقع شركة", "تجارة إلكترونية", "حلول ذكاء اصطناعي", "تطبيق جوال", "تكامل أنظمة", "SAP/ERP", "أخرى"],
    budgetOptions: ["أقل من 10,000 ريال", "10,000 – 50,000 ريال", "50,000 – 150,000 ريال", "أكثر من 150,000 ريال", "لم أحدد بعد"],
    industryOptions: ["العقارات", "الضيافة", "التجزئة", "الرعاية الصحية", "التعليم", "المالية", "الحكومة", "أخرى"],
    cta: "هل أنت مستعد لتحويل حضورك الرقمي؟",
    ctaSub: "استشارة مجانية لمناقشة احتياجاتك الرقمية وتقديم حل مخصص.",
    ctaBtn: "ابدأ مشروعك",
  },
  about: {
    badge: "من نحن", heroTitle: "قصتنا",
    heroSub: "X360 شركة متخصصة في الجولات الافتراضية 360° وتطوير الويب والذكاء الاصطناعي، نخدم الشركات في المملكة العربية السعودية والمنطقة.",
    statProjects: "مشروع مكتمل", statClients: "عميل راضٍ",
    statYears: "سنوات خبرة", statTeam: "متخصص",
    missionTitle: "مهمتنا",
    missionP1: "نحن في X360 نؤمن بأن التقنية يجب أن تخدم الأعمال بطريقة ملموسة ومؤثرة. مهمتنا هي تزويد الشركات بأدوات التحول الرقمي التي تحدث فارقاً حقيقياً.",
    missionP2: "نجمع بين الإبداع التقني والفهم العميق للسوق المحلي لنقدم حلولاً تتجاوز توقعات عملائنا.",
    quality: "جودة لا تُضاهى", satisfaction: "رضا العملاء", onTime: "الالتزام بالمواعيد",
    journeyTitle: "رحلتنا",
    timeline: [
      { year: "2019", title: "التأسيس", desc: "أُسست X360 في الرياض بتركيز على الجولات الافتراضية" },
      { year: "2020", title: "التوسع", desc: "توسعنا لتشمل خدمات تطوير الويب والذكاء الاصطناعي" },
      { year: "2022", title: "100 مشروع", desc: "وصلنا إلى إنجاز 100 مشروع ناجح عبر المملكة" },
      { year: "2024", title: "قائد الصناعة", desc: "أصبحنا الشريك الرقمي الموثوق لكبرى الشركات" },
    ],
    ctaTitle: "مستعد للتعاون معنا؟", ctaSub: "تواصل معنا اليوم لمناقشة مشروعك القادم.", ctaBtn: "تواصل معنا",
  },
  contact: {
    badge: "تواصل معنا", heroTitle: "تواصل معنا",
    heroSub: "نحن هنا للمساعدة. أخبرنا عن مشروعك وسيتواصل معك فريقنا خلال 24 ساعة.",
    addressLabel: "العنوان", phoneLabel: "الهاتف", emailLabel: "البريد الإلكتروني",
    chatNow: "تحدث معنا الآن", responseTitle: "وقت الاستجابة",
    responseSub: "نرد خلال 24 ساعة من أيام العمل",
    nameLabel: "الاسم", emailFormLabel: "البريد الإلكتروني", phoneFormLabel: "الهاتف",
    companyLabel: "الشركة", serviceLabel: "الخدمة", budgetLabel: "الميزانية",
    industryLabel: "القطاع", messageLabel: "الرسالة", sendBtn: "إرسال الرسالة",
    namePlaceholder: "اسمك الكامل", messagePlaceholder: "أخبرنا عن مشروعك...",
    selectService: "اختر خدمة", selectBudget: "اختر الميزانية", selectIndustry: "اختر القطاع",
    serviceOptions: ["جولات 360° افتراضية", "تطوير موقع شركة", "تجارة إلكترونية", "حلول ذكاء اصطناعي", "تطبيق جوال (iOS/Android)", "تكامل أنظمة", "أخرى"],
    budgetOptions: ["أقل من 10,000 ريال", "10,000 – 50,000 ريال", "50,000 – 150,000 ريال", "أكثر من 150,000 ريال", "لم أحدد الميزانية"],
    industryOptions: ["العقارات", "الضيافة والفنادق", "التجزئة", "الرعاية الصحية", "التعليم", "المالية", "الحكومة", "أخرى"],
  },
  footer: {
    company: "X360",
    companyDesc: "تقديم جولات 360° الافتراضية الغامرة وحلول الويب والذكاء الاصطناعي عبر المملكة العربية السعودية والمنطقة.",
    quickLinks: "روابط سريعة", services: "الخدمات", contact: "تواصل معنا",
    address: "الرياض، المملكة العربية السعودية", phone: "+966 532087436", email: "mohammed@x-360.ai",
    rights: "© 2025 X360. جميع الحقوق محفوظة.",
    privacy: "سياسة الخصوصية", terms: "شروط الاستخدام", sitemap: "خريطة الموقع",
    toursHeader: "جولات 360°", webHeader: "الويب والذكاء الاصطناعي", whatsappCTA: "واتساب",
    industriesHeader: "القطاعات",
    quickLinksItems: ["الرئيسية", "الجولات الافتراضية", "الويب والذكاء الاصطناعي", "القطاعات", "دراسات الحالة", "من نحن", "تواصل معنا"],
  },
  common: {
    learnMore: "اعرف المزيد", contactUs: "تواصل معنا", getQuote: "احصل على عرض سعر",
    viewAll: "عرض الكل", readMore: "اقرأ المزيد", backHome: "العودة للرئيسية",
    whatsapp: "واتساب", comingSoon: "قريباً",
  },
  caseStudies: {
    badge: "دراسات الحالة", heroTitle: "أعمالنا",
    heroSub: "مشاريع حقيقية ونتائج حقيقية — استكشف كيف حوّلت X360 الأعمال عبر المملكة العربية السعودية والخليج بالجولات الافتراضية والحلول الرقمية.",
    sectorTitles: ["فندق 5 نجوم — الرياض", "مجمع سكني — جدة", "حرم جامعي — الدمام", "مركز تسوق — الخبر", "مقر حكومي — الرياض", "منشأة صحية — مكة المكرمة"],
    sectorTags: ["ضيافة", "عقارات", "تعليم", "تجزئة", "حكومة", "رعاية صحية"],
    comingSoon: "قريباً", comingSoonDesc: "دراسات الحالة التفصيلية قيد الإعداد. تابعونا.",
    ctaTitle: "مستعد لتكون قصة نجاحنا التالية؟", ctaBtn: "ابدأ مشروعك",
  },
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONTEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
interface LangContextType { lang: Lang; setLang: (l: Lang) => void; t: Translations; isAr: boolean; }

const LangContext = createContext<LangContextType>({ lang: "en", setLang: () => {}, t: en, isAr: false });

function applyOverrides(base: Translations, overrides: Record<string, string>): Translations {
  const result = JSON.parse(JSON.stringify(base)) as Record<string, unknown>;
  for (const [dotKey, val] of Object.entries(overrides)) {
    const parts = dotKey.split(".");
    let cur = result;
    for (let i = 0; i < parts.length - 1; i++) {
      const seg = parts[i]!;
      if (cur[seg] === null || typeof cur[seg] !== "object" || Array.isArray(cur[seg])) break;
      cur = cur[seg] as Record<string, unknown>;
    }
    const last = parts[parts.length - 1]!;
    if (last && typeof cur[last] === "string") cur[last] = val;
  }
  return result as unknown as Translations;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [enOverrides, setEnOverrides] = useState<Record<string, string>>({});
  const [arOverrides, setArOverrides] = useState<Record<string, string>>({});

  useIsomorphicLayoutEffect(() => {
    const stored = localStorage.getItem("x360-lang") as Lang | null;
    if (stored === "ar" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    fetch("/api/translations")
      .then(r => r.ok ? r.json() : null)
      .then((data: unknown) => {
        if (data && typeof data === "object" && !Array.isArray(data)) {
          const d = data as { en?: Record<string, string>; ar?: Record<string, string> };
          if (d.en && typeof d.en === "object") setEnOverrides(d.en);
          if (d.ar && typeof d.ar === "object") setArOverrides(d.ar);
        }
      })
      .catch(() => {});
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("x360-lang", l);
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = l;
  };

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const t = lang === "ar"
    ? (Object.keys(arOverrides).length > 0 ? applyOverrides(ar, arOverrides) : ar)
    : (Object.keys(enOverrides).length > 0 ? applyOverrides(en, enOverrides) : en);

  return (
    <LangContext.Provider value={{ lang, setLang, t, isAr: lang === "ar" }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() { return useContext(LangContext); }
