import { Users, FileText, Calendar, BarChart3, Shield, Zap, Clock, MessageSquare, Star, Building2, Globe, CheckCircle } from "lucide-react";
import MarketplacePage from "@/components/templates/MarketplacePage";

export default function AIHRAgentPage() {
  return (
    <MarketplacePage
      badge="AI HR Agent"
      badgeAr="وكيل الموارد البشرية الذكي"
      icon={Users}
      title="AI HR Agent"
      titleAr="وكيل الموارد البشرية الذكي"
      titleAccent="for Modern Workplaces"
      tagline="Automate HR operations — leave requests, policies, onboarding, and employee queries — in Arabic and English."
      taglineAr="أتمت عمليات الموارد البشرية — طلبات الإجازات والسياسات والتأهيل واستفسارات الموظفين — بالعربية والإنجليزية."
      description="Electi's AI HR Agent handles routine HR tasks so your HR team can focus on people strategy. From leave management to policy queries to onboarding checklists — available 24/7 in both Arabic and English."
      descriptionAr="يتعامل وكيل الموارد البشرية من Electi مع المهام الروتينية حتى يتمكن فريق الموارد البشرية من التركيز على استراتيجية الأفراد. من إدارة الإجازات إلى استفسارات السياسات."
      heroStats={[
        { value: "75%", label: "HR Queries Automated", labelAr: "استفسارات مؤتمتة" },
        { value: "< 1min", label: "Policy Response Time", labelAr: "وقت الرد" },
        { value: "40%", label: "HR Cost Reduction", labelAr: "توفير التكاليف" },
        { value: "24/7", label: "Employee Access", labelAr: "وصول الموظفين" },
      ]}
      features={[
        { icon: Calendar, title: "Leave Management", desc: "Employees request, track, and manage leave through chat. The AI checks balances, approves per policy, and notifies managers." },
        { icon: FileText, title: "Policy Q&A", desc: "Instant answers to policy questions — salary, benefits, attendance, code of conduct — in the employee's preferred language." },
        { icon: Zap, title: "Onboarding Automation", desc: "Guides new hires through the onboarding checklist, document submission, IT setup, and introductions." },
        { icon: BarChart3, title: "HR Analytics", desc: "Track leave patterns, query volumes, onboarding completion rates, and employee engagement signals." },
        { icon: Shield, title: "Saudi Labor Law Compliant", desc: "Responses are aligned with Saudi Labor Law, Saudization (Nitaqat) requirements, and GOSI regulations." },
        { icon: MessageSquare, title: "Payroll Queries", desc: "Employees get instant payslip info, deductions breakdown, and benefits summaries without calling HR." },
      ]}
      useCases={[
        { icon: Building2, label: "Large Corporations", desc: "Handle thousands of HR queries daily without scaling headcount." },
        { icon: Globe, label: "Multi-Location Companies", desc: "Consistent HR policy delivery across all branches in Arabic and English." },
        { icon: Users, label: "Factories & Warehouses", desc: "Support shift workers with 24/7 HR access outside office hours." },
        { icon: Star, label: "Healthcare Organizations", desc: "Manage complex scheduling, licensing queries, and compliance for medical staff." },
        { icon: Clock, label: "Retail Chains", desc: "Handle part-time staff queries, shift swaps, and attendance tracking." },
        { icon: CheckCircle, label: "Government Entities", desc: "Automate civil service HR processes with Arabic-first support." },
      ]}
      industries={["Corporate", "Healthcare", "Retail", "Manufacturing", "Government", "Education", "Hospitality", "Construction", "Financial Services", "Technology"]}
      industriesAr={["الشركات", "الرعاية الصحية", "التجزئة", "التصنيع", "الحكومي", "التعليم", "الضيافة", "البناء", "الخدمات المالية", "التكنولوجيا"]}
      benefits={[
        { title: "40% HR cost savings", desc: "Automate routine queries and free your HR team for strategic work." },
        { title: "24/7 employee support", desc: "Employees get answers any time, from any device, in their language." },
        { title: "Labor law compliance", desc: "All responses aligned with Saudi Labor Law and Nitaqat requirements." },
        { title: "Seamless HRMS integration", desc: "Connects with SAP, Oracle, and popular Saudi HRMS platforms." },
      ]}
      benefitsAr={[
        { title: "توفير 40% من تكاليف الموارد البشرية", desc: "أتمت الاستفسارات الروتينية وحرّر فريق الموارد البشرية للعمل الاستراتيجي." },
        { title: "دعم الموظفين على مدار الساعة", desc: "يحصل الموظفون على إجابات في أي وقت، من أي جهاز، بلغتهم." },
        { title: "الامتثال لنظام العمل", desc: "جميع الردود متوافقة مع نظام العمل السعودي ومتطلبات نطاقات." },
        { title: "تكامل سلس مع أنظمة الموارد البشرية", desc: "يتصل بـ SAP وOracle ومنصات الموارد البشرية السعودية الشائعة." },
      ]}
      faqs={[
        { q: "Can the AI HR Agent handle Saudi Labor Law questions?", a: "Yes. The AI is trained on Saudi Labor Law provisions including end-of-service calculations, Nitaqat/Saudization requirements, GOSI contributions, and working hour regulations." },
        { q: "How does it connect with our HRMS?", a: "We integrate with SAP SuccessFactors, Oracle HCM, and most Saudi-used HRMS platforms via API to provide real-time data on leave balances, payroll, and attendance." },
        { q: "Is employee data kept confidential?", a: "Absolutely. Each employee can only access their own data. All data is encrypted and stored in compliance with PDPL. Role-based access controls ensure HR managers see what they need." },
        { q: "Can it handle Arabic and English in the same conversation?", a: "Yes. The AI code-switches naturally within a conversation, following the employee's language preference." },
        { q: "What if the AI cannot answer a query?", a: "The AI escalates to the relevant HR team member with a full transcript, suggested response, and priority level based on the query type." },
      ]}
      faqsAr={[
        { q: "هل يمكن لوكيل الموارد البشرية الذكي الإجابة على أسئلة نظام العمل السعودي؟", a: "نعم. الذكاء الاصطناعي مدرَّب على أحكام نظام العمل السعودي بما في ذلك مكافآت نهاية الخدمة ونطاقات والتأمينات الاجتماعية وأنظمة ساعات العمل." },
        { q: "كيف يتصل بنظام الموارد البشرية لدينا؟", a: "نتكامل مع SAP SuccessFactors وOracle HCM وأغلب منصات الموارد البشرية المستخدمة في السعودية عبر API." },
        { q: "هل بيانات الموظفين سرية؟", a: "بالتأكيد. كل موظف يصل فقط إلى بياناته الخاصة. جميع البيانات مشفرة ومخزنة وفقاً لنظام حماية البيانات الشخصية." },
        { q: "هل يمكنه التعامل بالعربية والإنجليزية في نفس المحادثة؟", a: "نعم. يُبدّل الذكاء الاصطناعي اللغة بشكل طبيعي داخل المحادثة، وفقاً لتفضيل الموظف." },
        { q: "ماذا لو عجز الذكاء الاصطناعي عن الإجابة؟", a: "يُصعّد الذكاء الاصطناعي إلى عضو فريق الموارد البشرية المعني مع نص المحادثة كاملاً والرد المقترح ومستوى الأولوية." },
      ]}
      ctaTitle="Modernise Your HR Operations"
      ctaTitleAr="حدّث عمليات الموارد البشرية لديك"
      ctaSub="Give your HR team back 40% of their time. Deploy your AI HR Agent in under 48 hours."
      ctaSubAr="أعِد لفريق الموارد البشرية 40% من وقتهم. انشر وكيل الموارد البشرية الذكي في أقل من 48 ساعة."
      seoTitle="AI HR Agent Saudi Arabia | Electi"
      seoDescription="AI HR Agent for Saudi businesses. Handles leave requests, policy queries, onboarding, and payroll questions in Arabic and English. Saudi Labor Law compliant."
      seoPath="/marketplace/ai-hr-agent"
    />
  );
}
