import { BookOpen, Search, Zap, Globe, BarChart3, Shield, Users, Building2, Star, FileText, Clock, MessageSquare } from "lucide-react";
import MarketplacePage from "@/components/templates/MarketplacePage";

export default function AIKnowledgeBaseAgentPage() {
  return (
    <MarketplacePage
      badge="AI Knowledge Base Agent"
      badgeAr="وكيل قاعدة المعرفة الذكي"
      icon={BookOpen}
      title="AI Knowledge Base"
      titleAr="وكيل قاعدة المعرفة الذكي"
      titleAccent="Agent"
      tagline="Turn your documents, manuals, and policies into an intelligent assistant anyone can query instantly."
      taglineAr="حوّل وثائقك وأدلتك وسياساتك إلى مساعد ذكي يمكن لأي شخص الاستفسار منه فوراً."
      description="Upload your manuals, SOPs, policies, product docs, and training materials. Electi's AI Knowledge Base Agent makes all that knowledge instantly searchable and conversational — for employees and customers alike."
      descriptionAr="ارفع أدلتك وإجراءات التشغيل وسياساتك ووثائق المنتج ومواد التدريب. يجعل وكيل Electi لقاعدة المعرفة كل تلك المعرفة قابلة للبحث والتحدث فوراً."
      heroStats={[
        { value: "10s", label: "Any Question Answered", labelAr: "إجابة أي سؤال" },
        { value: "99%", label: "Accuracy on Your Docs", labelAr: "دقة على وثائقك" },
        { value: "∞", label: "Documents Supported", labelAr: "وثائق مدعومة" },
        { value: "24/7", label: "Always Available", labelAr: "متاح دائماً" },
      ]}
      features={[
        { icon: Search, title: "Semantic Search", desc: "Understands questions in natural language — not just keyword matching — for accurate, contextual answers." },
        { icon: FileText, title: "Multi-Format Ingestion", desc: "Ingests PDFs, Word documents, PowerPoints, websites, Excel files, and internal wikis." },
        { icon: Globe, title: "Bilingual Q&A", desc: "Answer questions in Arabic or English regardless of the language the source document is written in." },
        { icon: Zap, title: "Instant Answers with Citations", desc: "Provides answers with source references so users can verify and read full context." },
        { icon: BarChart3, title: "Knowledge Analytics", desc: "Track most-queried topics, knowledge gaps, and usage patterns to improve your documentation." },
        { icon: Shield, title: "Access Control", desc: "Role-based access ensures employees only see information appropriate to their level and department." },
      ]}
      useCases={[
        { icon: Users, label: "Employee Onboarding", desc: "New hires get instant answers to HR policies, procedures, and company information." },
        { icon: Building2, label: "Customer Self-Service", desc: "Customers resolve product questions, installation guides, and troubleshooting without calling support." },
        { icon: Star, label: "Compliance & Legal", desc: "Regulatory teams instantly search compliance frameworks, policies, and audit requirements." },
        { icon: FileText, label: "Product Documentation", desc: "Technical teams query engineering specs, API docs, and system manuals conversationally." },
        { icon: Clock, label: "Training & Development", desc: "Employees access training materials, standard procedures, and certification requirements on demand." },
        { icon: MessageSquare, label: "Sales Enablement", desc: "Sales teams instantly pull product comparisons, competitive intel, and approved talking points." },
      ]}
      industries={["Corporate", "Healthcare", "Government", "Financial Services", "Technology", "Manufacturing", "Education", "Legal", "Construction", "Retail"]}
      industriesAr={["الشركات", "الرعاية الصحية", "الحكومي", "الخدمات المالية", "التكنولوجيا", "التصنيع", "التعليم", "القانوني", "البناء", "التجزئة"]}
      benefits={[
        { title: "Eliminate knowledge silos", desc: "All institutional knowledge becomes accessible to anyone who needs it, instantly." },
        { title: "Reduce support tickets", desc: "Employees and customers find answers themselves — reducing tickets by up to 60%." },
        { title: "Always up to date", desc: "Update source documents and the agent reflects changes immediately." },
        { title: "Audit trail", desc: "Every query is logged — useful for compliance, training, and knowledge gap analysis." },
      ]}
      benefitsAr={[
        { title: "القضاء على صوامع المعرفة", desc: "تصبح جميع المعرفة المؤسسية متاحة لأي شخص يحتاجها، فوراً." },
        { title: "تقليل تذاكر الدعم", desc: "يجد الموظفون والعملاء الإجابات بأنفسهم — مما يقلل التذاكر بما يصل إلى 60%." },
        { title: "محدّث دائماً", desc: "حدّث المصادر وسيعكس الوكيل التغييرات فوراً." },
        { title: "مسار تدقيق", desc: "كل استفسار مُسجّل — مفيد للامتثال والتدريب وتحليل الفجوات المعرفية." },
      ]}
      faqs={[
        { q: "What file formats can be uploaded?", a: "We support PDF, Word (DOCX), PowerPoint (PPTX), Excel (XLSX), plain text, HTML, and can crawl internal websites and SharePoint/Confluence. More formats available on enterprise plans." },
        { q: "How accurate are the answers?", a: "The AI only answers based on your uploaded documents and always cites the source. If it cannot find an answer in your knowledge base, it clearly says so rather than hallucinating." },
        { q: "Can documents be in Arabic?", a: "Yes. Arabic-language documents are fully supported. The AI reads, indexes, and answers queries from Arabic documents in both Arabic and English." },
        { q: "How is document access controlled?", a: "You define user roles and document permissions. Sensitive documents can be restricted to specific teams or seniority levels. Integrates with your existing SSO/Active Directory." },
        { q: "How long does it take to set up?", a: "Upload your documents, define access controls, and your knowledge base agent is live within 24–48 hours. No technical setup required from your team." },
      ]}
      faqsAr={[
        { q: "ما صيغ الملفات التي يمكن رفعها؟", a: "ندعم PDF وWord وPowerPoint وExcel والنص العادي وHTML، ويمكننا زحف المواقع الداخلية وSharePoint وConfluence." },
        { q: "ما مدى دقة الإجابات؟", a: "يجيب الذكاء الاصطناعي فقط استناداً إلى وثائقك المرفوعة ويستشهد دائماً بالمصدر. إذا لم يجد إجابة، يوضح ذلك بصراحة." },
        { q: "هل يمكن أن تكون الوثائق باللغة العربية؟", a: "نعم. الوثائق العربية مدعومة بالكامل. يقرأ الذكاء الاصطناعي ويفهرس ويجيب على الاستفسارات من الوثائق العربية بكلتا اللغتين." },
        { q: "كيف يُتحكم في الوصول إلى الوثائق؟", a: "تحدد أدوار المستخدمين وأذونات الوثائق. يمكن تقييد الوثائق الحساسة لفرق أو مستويات أقدمية محددة. يتكامل مع SSO وActive Directory الحالي." },
        { q: "كم يستغرق الإعداد؟", a: "ارفع وثائقك وحدد أذونات الوصول، وسيكون وكيل قاعدة المعرفة جاهزاً في غضون 24-48 ساعة. لا يلزم إعداد تقني من فريقك." },
      ]}
      ctaTitle="Make Your Knowledge Work for You"
      ctaTitleAr="اجعل معرفتك تعمل لصالحك"
      ctaSub="Every document, policy, and manual — instantly searchable, always accurate, available 24/7."
      ctaSubAr="كل وثيقة وسياسة ودليل — قابل للبحث فوراً، دقيق دائماً، متاح على مدار الساعة."
      seoTitle="AI Knowledge Base Agent Saudi Arabia | Electi"
      seoDescription="AI Knowledge Base Agent for Saudi businesses. Makes your documents, manuals and policies instantly searchable in Arabic and English. Deploy in 48 hours."
      seoPath="/marketplace/ai-knowledge-base"
    />
  );
}
