import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, ArrowRight, HelpCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/seo/SEOHead";
import { useLang } from "@/contexts/LanguageContext";
import { Link } from "wouter";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp  = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

const GRID_BG = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
  backgroundSize: "72px 72px",
};

interface FaqItem { q: string; qAr: string; a: string; aAr: string; cat: string; }

const FAQS: FaqItem[] = [
  /* ── General ─────────────────────────────────────────────────────────── */
  {
    cat: "General",
    q:   "What is Electi?",
    qAr: "ما هي إليكتي؟",
    a:   "Electi is an AI workforce platform that deploys intelligent agents for Saudi businesses. Our agents handle customer support, sales, billing, legal guidance, and daily operations — 24/7 via WhatsApp, voice, and web — so your team can focus entirely on growth.",
    aAr: "إليكتي منصة قوى عمل بالذكاء الاصطناعي تنشر وكلاء أذكياء للشركات السعودية. يتولى وكلاؤنا خدمة العملاء والمبيعات والفوترة والإرشاد القانوني والعمليات اليومية — على مدار الساعة عبر واتساب والصوت والويب — حتى يتمكن فريقك من التركيز الكامل على النمو.",
  },
  {
    cat: "General",
    q:   "What is an AI Agent?",
    qAr: "ما هو وكيل الذكاء الاصطناعي؟",
    a:   "An AI Agent is an autonomous software system that performs business tasks intelligently — answering queries, qualifying leads, managing schedules, and automating multi-step workflows — without constant human supervision. Unlike a chatbot, it reasons, adapts, and acts across connected systems in a single natural conversation.",
    aAr: "وكيل الذكاء الاصطناعي هو نظام برمجي مستقل يؤدي المهام التجارية بذكاء — الإجابة على الاستفسارات وتأهيل العملاء وإدارة الجداول وأتمتة سير العمل متعددة الخطوات — دون إشراف بشري مستمر. وعلى عكس روبوت الدردشة، يفكر ويتكيف ويتصرف عبر الأنظمة المتصلة في محادثة واحدة طبيعية.",
  },
  {
    cat: "General",
    q:   "Who is Electi designed for?",
    qAr: "لمن صُمِّمت إليكتي؟",
    a:   "Electi is built for Saudi and GCC businesses of all sizes — from growing SMEs to large enterprises. It's especially effective for sectors with high customer interaction: hospitality, real estate, healthcare, retail, construction, and corporate services.",
    aAr: "صُمِّمت إليكتي للشركات السعودية والخليجية من جميع الأحجام — من الشركات الصغيرة والمتوسطة النامية إلى المؤسسات الكبيرة. وهي فعّالة بشكل خاص للقطاعات ذات التفاعل العالي مع العملاء: الضيافة والعقارات والرعاية الصحية والتجزئة والإنشاءات والخدمات المؤسسية.",
  },
  {
    cat: "General",
    q:   "Is Electi available in Arabic?",
    qAr: "هل إليكتي متاحة باللغة العربية؟",
    a:   "Yes. Electi is built natively bilingual — Arabic and English. Our agents understand Saudi Arabic dialects, respond naturally in both languages, and switch mid-conversation when the customer changes language. All dashboards and interfaces support full RTL Arabic.",
    aAr: "نعم. صُمِّمت إليكتي ثنائية اللغة بشكل أصلي — عربي وإنجليزي. يفهم وكلاؤنا اللهجات العربية السعودية ويستجيبون بشكل طبيعي بكلتا اللغتين وينتقلون في منتصف المحادثة عند تغيير اللغة. تدعم جميع لوحات التحكم والواجهات اللغة العربية RTL الكاملة.",
  },
  {
    cat: "General",
    q:   "Where is Electi based?",
    qAr: "أين تتخذ إليكتي مقرها؟",
    a:   "Electi is headquartered in Riyadh, Saudi Arabia. Our infrastructure, data storage, and operations are Saudi-first — built specifically for the Kingdom's regulatory environment, business culture, and digital ecosystem.",
    aAr: "مقر إليكتي في الرياض، المملكة العربية السعودية. بنيتنا التحتية وتخزين البيانات وعملياتنا تُعطي الأولوية للمملكة — مبنية خصيصاً للبيئة التنظيمية السعودية وثقافة الأعمال والنظام البيئي الرقمي.",
  },
  /* ── Getting Started ──────────────────────────────────────────────────── */
  {
    cat: "Getting Started",
    q:   "How quickly can I deploy?",
    qAr: "ما سرعة النشر؟",
    a:   "Most Electi deployments go live within 24–48 hours. The onboarding process involves connecting your WhatsApp Business account, configuring your agent's workflows and knowledge base, and a brief QA check before launch.",
    aAr: "تُطلق معظم عمليات نشر إليكتي خلال 24-48 ساعة. تتضمن عملية الإعداد ربط حساب واتساب للأعمال وتكوين سير عمل وكيلك وقاعدة معرفته، وإجراء فحص موجز لضمان الجودة قبل الإطلاق.",
  },
  {
    cat: "Getting Started",
    q:   "Do I need to know how to code?",
    qAr: "هل أحتاج إلى معرفة البرمجة؟",
    a:   "No. Electi is a no-code platform. You configure your agent's personality, workflows, and knowledge through a simple dashboard. Our onboarding team handles all technical integration and setup on your behalf.",
    aAr: "لا. إليكتي منصة بدون كود. تُكوّن شخصية وكيلك وسير عمله ومعرفته من خلال لوحة تحكم بسيطة. يتولى فريق الإعداد لدينا جميع التكاملات التقنية والإعداد نيابةً عنك.",
  },
  {
    cat: "Getting Started",
    q:   "What do I need to get started?",
    qAr: "ماذا أحتاج للبدء؟",
    a:   "All you need is a WhatsApp Business account (or API access), a brief description of your business, and 30 minutes with our onboarding team. We handle everything else — integration, training, and configuration.",
    aAr: "كل ما تحتاجه هو حساب واتساب للأعمال (أو وصول API) ونبذة مختصرة عن عملك و30 دقيقة مع فريق الإعداد لدينا. سنتولى كل شيء آخر — التكامل والتدريب والتكوين.",
  },
  {
    cat: "Getting Started",
    q:   "Does Electi work with WhatsApp Business?",
    qAr: "هل يعمل إليكتي مع واتساب للأعمال؟",
    a:   "Yes. Electi integrates directly with the WhatsApp Business API. Your customers message your existing WhatsApp number as usual — they won't notice a difference, except that responses are instant, accurate, and available 24/7.",
    aAr: "نعم. يتكامل إليكتي مباشرةً مع واجهة برمجة تطبيقات واتساب للأعمال. يراسل عملاؤك رقم واتساب الموجود لديك بشكل معتاد — لن يلاحظوا أي فرق، إلا أن الردود فورية ودقيقة ومتاحة على مدار الساعة.",
  },
  {
    cat: "Getting Started",
    q:   "Can I try Electi before committing?",
    qAr: "هل يمكنني تجربة إليكتي قبل الالتزام؟",
    a:   "Yes. We offer a free demo and a 14-day pilot program for qualified businesses. Book a demo through our Contact page and our team will set up a working prototype for your specific use case.",
    aAr: "نعم. نقدم عرضاً توضيحياً مجانياً وبرنامجاً تجريبياً لمدة 14 يوماً للشركات المؤهلة. احجز عرضاً توضيحياً عبر صفحة الاتصال وسيُعدّ فريقنا نموذجاً أولياً يعمل لحالة استخدامك المحددة.",
  },
  /* ── Agents & Features ────────────────────────────────────────────────── */
  {
    cat: "Agents & Features",
    q:   "What agents does Electi offer?",
    qAr: "ما الوكلاء التي تقدمها إليكتي؟",
    a:   "Electi offers four core AI agents: Personal Agent (executive assistant — scheduling, emails, reminders), Billing Agent (OCR invoice processing, expense tracking, financial workflows), Legal Agent (Saudi law guidance, contract review, compliance), and Sales & Reservations Agent (lead qualification, booking automation, CRM updates).",
    aAr: "تقدم إليكتي أربعة وكلاء أساسيين: الوكيل الشخصي (مساعد تنفيذي — الجدولة والبريد الإلكتروني والتذكيرات)، ووكيل الفوترة (معالجة الفواتير بالذكاء الاصطناعي وتتبع النفقات والسير المالي)، والوكيل القانوني (إرشادات القانون السعودي ومراجعة العقود والامتثال)، ووكيل المبيعات والحجوزات (تأهيل العملاء وأتمتة الحجز وتحديثات CRM).",
  },
  {
    cat: "Agents & Features",
    q:   "Can agents handle reservations and bookings end-to-end?",
    qAr: "هل يمكن للوكلاء إدارة الحجوزات من البداية إلى النهاية؟",
    a:   "Yes. The Sales & Reservations Agent manages the full booking lifecycle — checking availability, confirming bookings, sending reminders, processing cancellations, and updating your reservation system — all via WhatsApp, automatically.",
    aAr: "نعم. يُدير وكيل المبيعات والحجوزات دورة حياة الحجز الكاملة — التحقق من التوفر وتأكيد الحجوزات وإرسال التذكيرات ومعالجة الإلغاءات وتحديث نظام الحجز — كل ذلك عبر واتساب تلقائياً.",
  },
  {
    cat: "Agents & Features",
    q:   "What's the difference between AI agents and chatbots?",
    qAr: "ما الفرق بين وكلاء الذكاء الاصطناعي وروبوتات الدردشة؟",
    a:   "Traditional chatbots follow rigid pre-written decision trees and break when the conversation goes off-script. An Electi AI agent reasons across multiple steps, accesses connected systems (CRM, calendar, databases), takes real actions, and adapts to context — all in a natural conversation.",
    aAr: "تتبع روبوتات الدردشة التقليدية أشجار قرارات صارمة مكتوبة مسبقاً وتتعطل عند خروج المحادثة عن النص. يفكر وكيل الذكاء الاصطناعي من إليكتي عبر خطوات متعددة ويصل إلى الأنظمة المتصلة ويتخذ إجراءات حقيقية ويتكيف مع السياق — كل ذلك في محادثة طبيعية.",
  },
  {
    cat: "Agents & Features",
    q:   "Can Electi integrate with my existing CRM or ERP?",
    qAr: "هل يمكن لإليكتي التكامل مع نظام CRM أو ERP الحالي؟",
    a:   "Yes. Electi supports integrations with Salesforce, HubSpot, Zoho, and other major CRMs, ERP systems, booking platforms, and custom APIs. Enterprise clients receive dedicated integration support and custom connector development.",
    aAr: "نعم. تدعم إليكتي التكامل مع Salesforce وHubSpot وZoho وغيرها من أنظمة CRM الرئيسية وأنظمة ERP ومنصات الحجز وواجهات برمجة التطبيقات المخصصة. يحصل عملاء المؤسسات على دعم تكامل مخصص وتطوير موصلات مخصصة.",
  },
  {
    cat: "Agents & Features",
    q:   "Can agents escalate to a human team member?",
    qAr: "هل يمكن للوكلاء التصعيد إلى أحد أعضاء الفريق البشري؟",
    a:   "Yes. You define escalation triggers — specific keywords, sentiment thresholds, or situation types — and the agent seamlessly hands the conversation to the right team member with full context, so your team never starts from zero.",
    aAr: "نعم. تُحدد أنت محفزات التصعيد — كلمات مفتاحية محددة أو حدود مشاعر أو أنواع مواقف — وينقل الوكيل المحادثة بسلاسة إلى عضو الفريق المناسب مع توفير السياق الكامل، حتى لا يبدأ فريقك من الصفر.",
  },
  {
    cat: "Agents & Features",
    q:   "Does the Legal Agent replace a lawyer?",
    qAr: "هل يحل الوكيل القانوني محل المحامي؟",
    a:   "No. The Legal Agent provides guidance, drafts initial documents, and flags compliance issues based on Saudi Arabian law — but it is not a substitute for qualified legal counsel. It's designed to handle 80% of routine legal tasks so your lawyers can focus on complex matters.",
    aAr: "لا. يقدم الوكيل القانوني التوجيه ويُعدّ المستندات الأولية ويُحدد مشكلات الامتثال بناءً على القانون السعودي — لكنه ليس بديلاً عن مستشار قانوني مؤهل. صُمِّم للتعامل مع 80% من المهام القانونية الروتينية حتى يتمكن محاموك من التركيز على الأمور المعقدة.",
  },
  /* ── Security & Compliance ────────────────────────────────────────────── */
  {
    cat: "Security & Compliance",
    q:   "Is Electi compliant with Saudi Arabia's PDPL?",
    qAr: "هل إليكتي متوافقة مع نظام PDPL السعودي؟",
    a:   "Yes. Electi is built with PDPL (Personal Data Protection Law) compliance at its core. We use AES-256 encryption in transit and at rest, maintain Saudi-first data residency, and enforce a strict zero-data-selling policy. Full audit trails are available for enterprise clients.",
    aAr: "نعم. بُنيت إليكتي مع الامتثال لنظام حماية البيانات الشخصية (PDPL) في صميمها. نستخدم تشفير AES-256 أثناء النقل وفي حالة السكون، ونحافظ على إقامة البيانات السعودية أولاً، ونطبق سياسة صارمة لعدم بيع البيانات. تتوفر مسارات تدقيق كاملة لعملاء المؤسسات.",
  },
  {
    cat: "Security & Compliance",
    q:   "Where is my data stored?",
    qAr: "أين تُخزَّن بياناتي؟",
    a:   "All customer data is stored on Saudi-based cloud infrastructure. We do not transfer your data outside the Kingdom without explicit consent. Enterprise plans include dedicated data isolation and private deployment options.",
    aAr: "تُخزَّن جميع بيانات العملاء على بنية تحتية سحابية مقرها المملكة العربية السعودية. لا ننقل بياناتك خارج المملكة دون موافقة صريحة. تتضمن خطط المؤسسات عزل البيانات المخصص وخيارات النشر الخاص.",
  },
  {
    cat: "Security & Compliance",
    q:   "Is my business data used to train AI models?",
    qAr: "هل تُستخدم بيانات عملي لتدريب نماذج الذكاء الاصطناعي؟",
    a:   "Never. Your business data — conversations, customer records, workflows — is never used to train shared AI models or shared with any other company. Your data belongs exclusively to you.",
    aAr: "أبداً. بيانات عملك — المحادثات وسجلات العملاء وسير العمل — لا تُستخدم قط لتدريب نماذج ذكاء اصطناعي مشتركة أو مشاركتها مع أي شركة أخرى. بياناتك ملكك حصراً.",
  },
  {
    cat: "Security & Compliance",
    q:   "What security standards does Electi use?",
    qAr: "ما معايير الأمان التي تستخدمها إليكتي؟",
    a:   "Electi operates with enterprise-grade security: AES-256 data encryption, TLS 1.3 in transit, role-based access control, full audit trails, and regular third-party penetration testing. Enterprise compliance packages are available upon request.",
    aAr: "تعمل إليكتي وفق معايير أمان على مستوى المؤسسات: تشفير AES-256 للبيانات وTLS 1.3 أثناء النقل والتحكم في الوصول المستند إلى الأدوار ومسارات التدقيق الكاملة واختبارات الاختراق المنتظمة من جهات خارجية. تتوفر حزم الامتثال للمؤسسات عند الطلب.",
  },
  /* ── Pricing ──────────────────────────────────────────────────────────── */
  {
    cat: "Pricing",
    q:   "How much does Electi cost?",
    qAr: "كم تكلف إليكتي؟",
    a:   "Plans start from SAR 1,499/month for growing businesses, scaling up to enterprise custom pricing for large deployments. Pricing is scoped by the number of agents, monthly conversation volume, and integrations required. View full details on our Pricing page.",
    aAr: "تبدأ الخطط من 1,499 ريال سعودي/شهر للشركات النامية، وتصل إلى أسعار مؤسسية مخصصة للنشر الكبير. يُحدَّد السعر بعدد الوكلاء وحجم المحادثات الشهرية والتكاملات المطلوبة. اطلع على التفاصيل الكاملة في صفحة التسعير.",
  },
  {
    cat: "Pricing",
    q:   "Is there a setup fee?",
    qAr: "هل هناك رسوم إعداد؟",
    a:   "Standard plans include onboarding at no extra cost. Enterprise deployments with complex custom integrations may include a one-time setup fee, which is fully scoped and quoted before any commitment. No surprise fees.",
    aAr: "تتضمن الخطط القياسية الإعداد بدون تكلفة إضافية. قد تتضمن عمليات نشر المؤسسات ذات التكاملات المخصصة المعقدة رسوم إعداد لمرة واحدة، يتم تحديد نطاقها الكامل وتقديم عروض أسعار قبل أي التزام. لا رسوم مفاجئة.",
  },
  {
    cat: "Pricing",
    q:   "Can I upgrade or change my plan?",
    qAr: "هل يمكنني ترقية خطتي أو تغييرها؟",
    a:   "Yes. You can upgrade, downgrade, or modify your plan at any time. Changes take effect on the next billing cycle. Our team will help you find the right configuration as your business scales.",
    aAr: "نعم. يمكنك الترقية أو التخفيض أو تعديل خطتك في أي وقت. تدخل التغييرات حيز التنفيذ في دورة الفوترة التالية. سيساعدك فريقنا في إيجاد التكوين الصحيح مع نمو عملك.",
  },
  {
    cat: "Pricing",
    q:   "Do you offer custom enterprise pricing?",
    qAr: "هل تقدمون أسعاراً مخصصة للمؤسسات؟",
    a:   "Yes. Enterprises with 5+ agents, high conversation volumes, or complex integration needs receive fully custom pricing, dedicated account management, SLA guarantees, and priority support. Contact our enterprise team for a tailored proposal.",
    aAr: "نعم. تحصل المؤسسات التي لديها 5+ وكلاء أو أحجام محادثات عالية أو احتياجات تكامل معقدة على أسعار مخصصة بالكامل وإدارة حسابات مخصصة وضمانات SLA ودعم ذو أولوية. تواصل مع فريق المؤسسات لدينا للحصول على عرض مخصص.",
  },
  /* ── Arabic & Language ─────────────────────────────────────────────────── */
  {
    cat: "Arabic & Language",
    q:   "Does Electi support Saudi Arabic dialects?",
    qAr: "هل تدعم إليكتي اللهجات العربية السعودية؟",
    a:   "Yes. Electi agents are optimised for both major Saudi Arabic dialects: Najdi (Riyadh, central region) and Hijazi (Jeddah, western region). They also handle Modern Standard Arabic (MSA/Fusha) and switch dialects mid-conversation naturally.",
    aAr: "نعم. وكلاء إليكتي مُحسَّنون للهجتين السعوديتين الرئيسيتين: النجدية (الرياض، المنطقة الوسطى) والحجازية (جدة، المنطقة الغربية). كما يتعاملون مع العربية الفصحى الحديثة وينتقلون بين اللهجات في منتصف المحادثة بشكل طبيعي.",
  },
  {
    cat: "Arabic & Language",
    q:   "Can agents switch between Arabic and English automatically?",
    qAr: "هل يمكن للوكلاء التبديل بين العربية والإنجليزية تلقائياً؟",
    a:   "Yes. Electi agents detect the customer's language from the first message and respond accordingly. If the customer switches from Arabic to English (or vice versa) mid-conversation, the agent switches instantly and seamlessly — no commands required.",
    aAr: "نعم. يكتشف وكلاء إليكتي لغة العميل من الرسالة الأولى ويستجيبون وفقاً لها. إذا انتقل العميل من العربية إلى الإنجليزية (أو العكس) في منتصف المحادثة، يتحول الوكيل فوراً وبسلاسة — دون الحاجة إلى أي أوامر.",
  },
  {
    cat: "Arabic & Language",
    q:   "Is the Electi dashboard available in Arabic?",
    qAr: "هل لوحة تحكم إليكتي متاحة بالعربية؟",
    a:   "Yes. All Electi interfaces — the agent dashboard, analytics, conversation history, and configuration panels — support full RTL Arabic. You can manage your entire platform in Arabic without switching to English.",
    aAr: "نعم. جميع واجهات إليكتي — لوحة التحكم والتحليلات وسجل المحادثات ولوحات التكوين — تدعم اللغة العربية RTL الكاملة. يمكنك إدارة منصتك بالكامل بالعربية دون التبديل إلى الإنجليزية.",
  },
  {
    cat: "Arabic & Language",
    q:   "Can the AI agents understand handwritten Arabic or voice messages?",
    qAr: "هل يمكن للوكلاء فهم الكتابة العربية بخط اليد أو الرسائل الصوتية؟",
    a:   "Electi agents can process voice messages via WhatsApp using Arabic speech recognition. For handwritten documents, OCR support is available in select workflows (particularly the Billing Agent). Contact us to confirm specific language-input requirements for your use case.",
    aAr: "يمكن لوكلاء إليكتي معالجة الرسائل الصوتية عبر واتساب باستخدام التعرف على الكلام العربي. لمستندات الكتابة اليدوية، يتوفر دعم OCR في سير عمل محددة (بشكل خاص وكيل الفوترة). تواصل معنا للتأكيد على متطلبات إدخال اللغة المحددة لحالة استخدامك.",
  },
  {
    cat: "Arabic & Language",
    q:   "Does Electi support Gulf Arabic from Kuwait, UAE, or other GCC countries?",
    qAr: "هل تدعم إليكتي اللهجة الخليجية من الكويت والإمارات وغيرها؟",
    a:   "Yes. Electi agents understand Gulf Arabic broadly — including Kuwaiti, Emirati, Bahraini, and Omani dialects — with the strongest optimisation for Saudi dialects (Najdi and Hijazi). GCC businesses are a core part of Electi's target market.",
    aAr: "نعم. يفهم وكلاء إليكتي اللهجة الخليجية على نطاق واسع — بما في ذلك الكويتية والإماراتية والبحرينية والعُمانية — مع أقوى تحسين للهجات السعودية (النجدية والحجازية). تُشكّل شركات دول مجلس التعاون الخليجي جزءاً أساسياً من السوق المستهدفة لإليكتي.",
  },
  /* ── Implementation ────────────────────────────────────────────────────── */
  {
    cat: "Implementation",
    q:   "How long does enterprise integration with SAP or Oracle take?",
    qAr: "كم يستغرق التكامل المؤسسي مع SAP أو Oracle؟",
    a:   "Standard enterprise ERP integrations (Odoo, SAP, Oracle) typically take 6–12 weeks for full bidirectional data flow. Simpler integrations — such as CRM connections (Salesforce, HubSpot) or calendar sync — are usually completed within 1–2 weeks. All timelines are agreed and documented before work begins.",
    aAr: "عادةً ما تستغرق تكاملات ERP المؤسسية القياسية (Odoo وSAP وOracle) من 6 إلى 12 أسبوعاً لتدفق البيانات ثنائي الاتجاه الكامل. أما التكاملات الأبسط — مثل توصيلات CRM (Salesforce وHubSpot) أو مزامنة التقويم — فتُكتمل عادةً خلال 1-2 أسبوع. يتم الاتفاق على جميع الجداول الزمنية وتوثيقها قبل بدء العمل.",
  },
  {
    cat: "Implementation",
    q:   "Will Electi disrupt my existing business operations during setup?",
    qAr: "هل ستؤثر إليكتي على عمليات عملي الحالية أثناء الإعداد؟",
    a:   "No. Electi runs in parallel with your existing operations. Your WhatsApp number continues to function normally during onboarding. We set up and test the agent in a sandbox environment, then switch it live only after your team is satisfied. Rollback is possible at any time.",
    aAr: "لا. تعمل إليكتي بالتوازي مع عملياتك الحالية. يستمر رقم واتساب الخاص بك في العمل بشكل طبيعي خلال الإعداد. نُعدّ الوكيل ونختبره في بيئة اختبار، ثم ننشره مباشرة فقط بعد رضا فريقك. التراجع ممكن في أي وقت.",
  },
  {
    cat: "Implementation",
    q:   "What support do I get after launch?",
    qAr: "ما الدعم الذي أحصل عليه بعد الإطلاق؟",
    a:   "All plans include ongoing support — email support, a knowledge base, and regular check-ins. Professional and Enterprise plans include a dedicated account manager, priority response times, quarterly performance reviews, and proactive agent optimization based on your conversation analytics.",
    aAr: "تتضمن جميع الخطط دعماً مستمراً — دعم البريد الإلكتروني وقاعدة المعرفة والمتابعة المنتظمة. تتضمن خطط Professional وEnterprise مدير حساب مخصص وأوقات استجابة ذات أولوية ومراجعات أداء ربع سنوية وتحسين استباقي للوكيل بناءً على تحليلات محادثاتك.",
  },
  {
    cat: "Implementation",
    q:   "Can I customise the AI agent's personality and tone?",
    qAr: "هل يمكنني تخصيص شخصية ونبرة وكيل الذكاء الاصطناعي؟",
    a:   "Yes. You define your agent's name, personality, communication style (formal, friendly, professional), and topic boundaries. The agent adopts your brand voice and stays in character consistently across all interactions — in both Arabic and English.",
    aAr: "نعم. تُحدد أنت اسم وكيلك وشخصيته وأسلوب تواصله (رسمي أو ودود أو مهني) وحدود موضوعاته. يعتمد الوكيل صوت علامتك التجارية ويتمسك بالشخصية باستمرار عبر جميع التفاعلات — بالعربية والإنجليزية.",
  },
  {
    cat: "Implementation",
    q:   "Can Electi handle high conversation volumes during peak periods?",
    qAr: "هل يمكن لإليكتي التعامل مع أحجام محادثات عالية خلال فترات الذروة؟",
    a:   "Yes. Electi's cloud infrastructure auto-scales to handle simultaneous conversations without degradation. This is particularly valuable for hospitality businesses during Hajj/Umrah season, retail during Eid, or healthcare clinics managing appointment rushes.",
    aAr: "نعم. تتوسع البنية التحتية السحابية لإليكتي تلقائياً للتعامل مع المحادثات المتزامنة دون أي تراجع في الأداء. هذا مفيد بشكل خاص لشركات الضيافة خلال موسم الحج والعمرة، وللتجزئة خلال العيد، وللعيادات الصحية التي تدير تدفقاً كبيراً من المواعيد.",
  },
  /* ── Saudi Market ──────────────────────────────────────────────────────── */
  {
    cat: "Saudi Market",
    q:   "Is Electi compliant with Saudi Vision 2030 digital transformation goals?",
    qAr: "هل إليكتي متوافقة مع أهداف التحول الرقمي لرؤية السعودية 2030؟",
    a:   "Yes. Electi directly supports Vision 2030's goals of digital transformation, SME empowerment, and reducing dependence on manual labour in business processes. Our platform is designed to help Saudi businesses automate operations, improve service delivery, and scale without proportional headcount growth.",
    aAr: "نعم. تدعم إليكتي مباشرةً أهداف رؤية 2030 للتحول الرقمي وتمكين الشركات الصغيرة والمتوسطة والحد من الاعتماد على العمالة اليدوية في العمليات التجارية. منصتنا مصممة لمساعدة الشركات السعودية على أتمتة العمليات وتحسين تقديم الخدمات والتوسع دون نمو متناسب في الموظفين.",
  },
  {
    cat: "Saudi Market",
    q:   "Does Electi work for Hajj and Umrah hospitality businesses in Jeddah and Mecca?",
    qAr: "هل تعمل إليكتي لشركات الضيافة في الحج والعمرة بجدة ومكة؟",
    a:   "Yes. Electi is specifically designed for the demand spikes of Hajj and Umrah season — handling thousands of booking inquiries, multi-language pilgrim communication (Arabic, English, Urdu, Bahasa), and 24/7 automated support during peak periods when human staffing is insufficient.",
    aAr: "نعم. إليكتي مصممة خصيصاً لطفرات الطلب في موسم الحج والعمرة — التعامل مع آلاف استفسارات الحجز والتواصل متعدد اللغات مع الحجاج (عربي وإنجليزي وأردو وبهاسا) والدعم الآلي على مدار الساعة خلال فترات الذروة.",
  },
  {
    cat: "Saudi Market",
    q:   "Can Electi support Saudization (Nitaqat) compliance for HR processes?",
    qAr: "هل يمكن لإليكتي دعم الامتثال لنظام نطاقات السعودة في عمليات الموارد البشرية؟",
    a:   "The Electi HR Agent can help streamline HR processes related to workforce management — including employee self-service, leave requests, and onboarding documentation — which supports overall HR efficiency. For specific Nitaqat compliance calculations, consult a qualified Saudi HR or legal advisor alongside Electi.",
    aAr: "يمكن لوكيل الموارد البشرية من إليكتي تبسيط عمليات الموارد البشرية المتعلقة بإدارة القوى العاملة — بما في ذلك الخدمة الذاتية للموظفين وطلبات الإجازة ووثائق الإعداد. للحصول على حسابات امتثال نطاقات المحددة، استشر مستشار موارد بشرية أو قانوني سعودي مؤهل جنباً إلى جنب مع إليكتي.",
  },
  {
    cat: "Saudi Market",
    q:   "Does Electi support Arabic invoice processing for Saudi VAT (15%)?",
    qAr: "هل تدعم إليكتي معالجة الفواتير العربية لضريبة القيمة المضافة السعودية (15%)؟",
    a:   "Yes. The Electi Billing Agent can process Saudi Arabic invoices, extract VAT line items, and organise expense data in formats compatible with ZATCA (Zakat, Tax and Customs Authority) e-invoicing requirements. Enterprise configurations include custom ZATCA workflow automation.",
    aAr: "نعم. يمكن لوكيل الفوترة من إليكتي معالجة الفواتير العربية السعودية واستخراج بنود ضريبة القيمة المضافة وتنظيم بيانات النفقات بتنسيقات متوافقة مع متطلبات الفوترة الإلكترونية لهيئة الزكاة والضريبة والجمارك (زاتكا). تتضمن التكوينات المؤسسية أتمتة سير عمل زاتكا المخصصة.",
  },
  {
    cat: "Saudi Market",
    q:   "Does Electi have a physical office in Saudi Arabia?",
    qAr: "هل لدى إليكتي مكتب فعلي في المملكة العربية السعودية؟",
    a:   "Yes. Electi is headquartered in Riyadh, Saudi Arabia (2413 Ad Damman Road, Ghirnath District, Unit No 2414, Riyadh 13242-7933). Jeddah businesses are served remotely by our Riyadh-based team with on-site visits available for enterprise engagements.",
    aAr: "نعم. مقر إليكتي في الرياض، المملكة العربية السعودية (2413 طريق الدمام، حي غرناطة، وحدة رقم 2414، الرياض 13242-7933). تُخدَم الشركات في جدة عن بُعد من قِبل فريقنا في الرياض مع توفر الزيارات الميدانية للمشاركات المؤسسية.",
  },
];

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
};

const CAT_KEYS = ["All", "General", "Getting Started", "Agents & Features", "Security & Compliance", "Pricing", "Arabic & Language", "Implementation", "Saudi Market"] as const;
type CatKey = typeof CAT_KEYS[number];

const CAT_AR: Record<CatKey, string> = {
  "All":                   "الكل",
  "General":               "عام",
  "Getting Started":       "البدء",
  "Agents & Features":     "الوكلاء والمميزات",
  "Security & Compliance": "الأمان والامتثال",
  "Pricing":               "التسعير",
  "Arabic & Language":     "العربية واللغة",
  "Implementation":        "التنفيذ",
  "Saudi Market":          "السوق السعودي",
};

function Badge({ label }: { label: string }) {
  return (
    <span style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: 4, padding: "3px 10px", fontSize: 10, letterSpacing: "0.2em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>
      {label}
    </span>
  );
}

function AccordionItem({ q, a, open, onToggle, isAr }: { q: string; a: string; open: boolean; onToggle: () => void; isAr: boolean }) {
  return (
    <div
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }}
      onClick={onToggle}
    >
      <div className="flex items-start justify-between gap-4 py-5 px-1">
        <span className="text-sm sm:text-base font-500 text-white/85 leading-snug flex-1">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex-shrink-0 mt-0.5"
        >
          <ChevronDown className="w-4 h-4 text-white/35" />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease }}
            style={{ overflow: "hidden" }}
          >
            <p className={`text-sm text-white/50 leading-relaxed pb-5 px-1 ${isAr ? "text-right" : ""}`}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const scrollRef     = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);
  const { isAr }      = useLang();

  const [navHidden,   setNavHidden]   = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeCat,   setActiveCat]   = useState<CatKey>("All");
  const [openIndex,   setOpenIndex]   = useState<number | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const st = el.scrollTop;
      setNavScrolled(st > 30);
      setNavHidden(st > lastScrollRef.current && st > 80);
      lastScrollRef.current = st;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = activeCat === "All" ? FAQS : FAQS.filter(f => f.cat === activeCat);

  const toggle = (i: number) => setOpenIndex(prev => prev === i ? null : i);

  return (
    <div
      ref={scrollRef}
      className="bg-[#050505] text-white"
      style={{ height: "100dvh", overflowY: "scroll", overflowX: "hidden", scrollSnapType: "y mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}
    >
      <style>{`div::-webkit-scrollbar{display:none}`}</style>
      <SEOHead
        title="FAQ | Electi AI Agents"
        titleAr="الأسئلة الشائعة | وكلاء إليكتي الذكية"
        description="Answers to the most common questions about Electi's AI agents, pricing, security, deployment, and Arabic language support for Saudi businesses."
        descriptionAr="إجابات على أكثر الأسئلة شيوعاً حول وكلاء إليكتي الذكية والتسعير والأمان والنشر ودعم اللغة العربية للشركات السعودية."
        path="/faq"
        schemas={[faqPageSchema]}
      />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ 1 · HERO ══ */}
      <section
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1.5rem,6vw,5rem) 64px" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={GRID_BG} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(255,255,255,0.035) 0%, transparent 70%)" }} />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 text-center max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp} className="mb-6 flex justify-center">
            <Badge label={isAr ? "الأسئلة الشائعة" : "FAQ"} />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-700 tracking-tight leading-[1.05] mb-6"
          >
            {isAr ? (
              <>كل ما تريد<br /><span style={{ color: "rgba(255,255,255,0.35)" }}>معرفته</span></>
            ) : (
              <>Answers to<br /><span style={{ color: "rgba(255,255,255,0.35)" }}>Everything</span></>
            )}
          </motion.h1>

          <motion.p variants={fadeUp} className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed mb-10">
            {isAr
              ? "أجوبة على أكثر الأسئلة شيوعاً حول إليكتي — من النشر والتسعير إلى الأمان والوكلاء."
              : "Everything you need to know about Electi — from deployment and pricing to security and agents."}
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3">
            <a href="https://wa.me/966502547274" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-600 text-black bg-white hover:bg-white/90 transition-colors">
              <MessageCircle className="w-4 h-4" />
              {isAr ? "اسأل عبر واتساب" : "Ask on WhatsApp"}
            </a>
            <Link href="/contact"
               className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-500 text-white/60 border border-white/10 hover:border-white/25 hover:text-white transition-colors">
              {isAr ? "تواصل معنا" : "Contact Us"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-white/20">
            {isAr ? "التمرير للأسفل" : "Scroll to browse"}
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </section>

      {/* ══ 2 · FAQ ACCORDION ══ */}
      <section
        className="relative"
        style={{ scrollSnapAlign: "start", padding: "80px clamp(1.5rem,6vw,5rem) 80px" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={GRID_BG} />

        <div className="relative z-10 max-w-4xl mx-auto">

          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="flex flex-wrap gap-2 mb-12 justify-center"
          >
            {CAT_KEYS.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCat(cat); setOpenIndex(null); }}
                className="transition-all text-xs px-4 py-2 rounded-full border"
                style={{
                  border: activeCat === cat ? "1px solid rgba(255,255,255,0.5)" : "1px solid rgba(255,255,255,0.08)",
                  background: activeCat === cat ? "rgba(255,255,255,0.08)" : "transparent",
                  color: activeCat === cat ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                  letterSpacing: "0.06em",
                  fontWeight: activeCat === cat ? 600 : 400,
                }}
              >
                {isAr ? CAT_AR[cat] : cat}
              </button>
            ))}
          </motion.div>

          {/* Count */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-center text-[11px] uppercase tracking-widest text-white/20 mb-8 font-mono"
          >
            {filtered.length} {isAr ? "سؤال" : "questions"}
          </motion.p>

          {/* Accordion */}
          <motion.div
            key={activeCat}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease }}
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {filtered.map((faq, i) => (
              <AccordionItem
                key={`${activeCat}-${i}`}
                q={isAr ? faq.qAr : faq.q}
                a={isAr ? faq.aAr : faq.a}
                open={openIndex === i}
                onToggle={() => toggle(i)}
                isAr={isAr}
              />
            ))}
          </motion.div>

        </div>
      </section>

      {/* ══ 3 · CTA ══ */}
      <section
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "80px clamp(1.5rem,6vw,5rem)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={GRID_BG} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(255,255,255,0.03) 0%, transparent 65%)" }} />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="relative z-10 text-center max-w-2xl mx-auto"
        >
          <motion.div variants={fadeUp} className="mb-6 flex justify-center">
            <HelpCircle className="w-10 h-10 text-white/15" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-700 tracking-tight mb-5">
            {isAr ? "سؤال آخر في ذهنك؟" : "Still have a question?"}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/40 text-lg leading-relaxed mb-10">
            {isAr
              ? "فريقنا متاح للإجابة على أي استفسار — عبر واتساب أو البريد الإلكتروني أو بالاتصال المباشر."
              : "Our team is available to answer any question — via WhatsApp, email, or a direct call."}
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/966502547274"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-600 text-black bg-white hover:bg-white/90 transition-colors w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-4 h-4" />
              {isAr ? "واتساب" : "WhatsApp Us"}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-500 text-white/60 border border-white/10 hover:border-white/25 hover:text-white transition-colors w-full sm:w-auto justify-center"
            >
              {isAr ? "صفحة الاتصال" : "Contact Page"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0">
          <Footer />
        </div>
      </section>
    </div>
  );
}
