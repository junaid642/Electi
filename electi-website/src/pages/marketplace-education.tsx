import { BookOpen, Users, Calendar, BarChart3, Globe, Zap, Building2, Star, MessageSquare, CheckCircle, Clock, Shield } from "lucide-react";
import MarketplacePage from "@/components/templates/MarketplacePage";

export default function AIEducationAgentPage() {
  return (
    <MarketplacePage
      badge="AI Education Agent"
      badgeAr="وكيل التعليم الذكي"
      icon={BookOpen}
      title="AI Education Agent"
      titleAr="وكيل التعليم الذكي"
      titleAccent="for Saudi Institutions"
      tagline="Convert enquiries into enrolments, support students 24/7, and automate administrative tasks — in Arabic and English."
      taglineAr="حوّل الاستفسارات إلى تسجيلات، وادعم الطلاب على مدار الساعة، وأتمت المهام الإدارية."
      description="Saudi Arabia's education sector is transforming under Vision 2030. Electi's AI Education Agent helps universities, schools, and training centers attract more students, reduce admin load, and deliver better learning experiences."
      descriptionAr="يتحول قطاع التعليم السعودي في ظل رؤية 2030. يساعد وكيل التعليم الذكي من Electi الجامعات والمدارس ومراكز التدريب على جذب المزيد من الطلاب وتقليل العبء الإداري."
      heroStats={[
        { value: "35%", label: "More Enrolments", labelAr: "تسجيلات أكثر" },
        { value: "24/7", label: "Student Support", labelAr: "دعم الطلاب" },
        { value: "60%", label: "Admin Time Saved", labelAr: "وقت إداري موفّر" },
        { value: "< 1min", label: "Enquiry Response", labelAr: "وقت الرد على الاستفسار" },
      ]}
      features={[
        { icon: Zap, title: "Enrolment Conversion", desc: "Engages enquiries from website, social media, and WhatsApp, qualifying and guiding prospects to enrolment." },
        { icon: Calendar, title: "Course Scheduling", desc: "Answers questions about schedules, availability, prerequisites, and books trial sessions automatically." },
        { icon: Users, title: "Student Support Desk", desc: "Answers student queries about grades, assignments, deadlines, policies, and campus services 24/7." },
        { icon: Globe, title: "Arabic Education Support", desc: "Full Arabic support for Saudi students — communicates in formal Arabic for academic contexts." },
        { icon: BarChart3, title: "Enrolment Analytics", desc: "Track enquiry sources, conversion rates, course popularity, and student satisfaction in real time." },
        { icon: Shield, title: "Academic Data Security", desc: "Student records handled with PDPL compliance and Ministry of Education data governance standards." },
      ]}
      useCases={[
        { icon: Building2, label: "Universities", desc: "Handle admissions enquiries, scholarship questions, and campus information for thousands of applicants." },
        { icon: Star, label: "Training Centers", desc: "Convert corporate and individual training enquiries into booked courses automatically." },
        { icon: Users, label: "K-12 Schools", desc: "Support parents with admissions, fee queries, curriculum information, and school events." },
        { icon: BookOpen, label: "Online Learning Platforms", desc: "Guide learners to the right courses, handle subscription queries, and provide technical support." },
        { icon: CheckCircle, label: "Language Institutes", desc: "Assess language level, recommend courses, and schedule placement tests automatically." },
        { icon: Clock, label: "Corporate Training", desc: "Match employee development needs to training programs and coordinate group enrolment." },
      ]}
      industries={["Universities", "Training Centers", "K-12 Schools", "Online Learning", "Language Institutes", "Corporate Training", "Vocational Training", "Government Education"]}
      industriesAr={["الجامعات", "مراكز التدريب", "مدارس K-12", "التعلم الإلكتروني", "معاهد اللغات", "تدريب الشركات", "التدريب المهني", "التعليم الحكومي"]}
      benefits={[
        { title: "35% more enrolments", desc: "Instant, personalised responses to every enquiry convert more prospects into students." },
        { title: "60% less admin", desc: "Automate repetitive student queries and free staff for high-value academic work." },
        { title: "24/7 student access", desc: "Students get help with coursework, deadlines, and admin any time they need it." },
        { title: "MOE compliant", desc: "Aligned with Saudi Ministry of Education policies and data handling requirements." },
      ]}
      benefitsAr={[
        { title: "تسجيلات أكثر بـ 35%", desc: "الردود الفورية الشخصية على كل استفسار تحوّل المزيد من المستفسرين إلى طلاب." },
        { title: "تقليل 60% من الأعمال الإدارية", desc: "أتمت استفسارات الطلاب المتكررة وحرّر الكوادر للعمل الأكاديمي عالي القيمة." },
        { title: "وصول الطلاب على مدار الساعة", desc: "يحصل الطلاب على المساعدة في المقررات والمواعيد النهائية والإدارة في أي وقت." },
        { title: "متوافق مع وزارة التعليم", desc: "متوافق مع سياسات وزارة التعليم السعودية ومتطلبات التعامل مع البيانات." },
      ]}
      faqs={[
        { q: "Can the AI assist with Saudi scholarship programs (like KAUST, KASP)?", a: "Yes. The AI can be configured with information about King Abdullah Scholarship Program, KAUST scholarships, and other Saudi government education initiatives to guide applicants." },
        { q: "Can it handle enquiries in multiple languages for international students?", a: "Arabic and English are fully supported. For institutions attracting international students, Urdu, Hindi, French, and other languages are available on enterprise plans." },
        { q: "Does it integrate with LMS platforms?", a: "We integrate with Moodle, Blackboard, Canvas, and other major LMS platforms — giving the AI access to course information, deadlines, and student records for accurate responses." },
        { q: "Can it help with Vision 2030 education initiatives?", a: "Yes. The AI can promote programmes aligned with Saudi Vision 2030's human capital development goals — particularly in STEM, Arabic language, and vocational training tracks." },
        { q: "How does it handle sensitive student queries?", a: "For sensitive queries (mental health, academic performance issues, financial hardship), the AI responds with empathy and immediately connects the student with appropriate human support." },
      ]}
      faqsAr={[
        { q: "هل يمكن للذكاء الاصطناعي المساعدة في برامج المنح السعودية كـ KAUST وKASP؟", a: "نعم. يمكن تهيئة الذكاء الاصطناعي بمعلومات عن برنامج الملك عبدالله للابتعاث ومنح جامعة الملك عبدالله للعلوم والتقنية وغيرها من المبادرات التعليمية الحكومية السعودية." },
        { q: "هل يمكنه التعامل مع استفسارات بلغات متعددة للطلاب الدوليين؟", a: "العربية والإنجليزية مدعومتان بالكامل. للمؤسسات التي تستقطب طلاباً دوليين، يتوفر الأردية والهندية والفرنسية وغيرها في خطط المؤسسات." },
        { q: "هل يتكامل مع منصات إدارة التعلم؟", a: "نتكامل مع Moodle وBlackboard وCanvas وغيرها من منصات LMS الرئيسية، مما يتيح للذكاء الاصطناعي الوصول إلى معلومات المقررات والمواعيد النهائية وسجلات الطلاب." },
        { q: "هل يمكنه المساعدة في مبادرات رؤية 2030 التعليمية؟", a: "نعم. يمكن للذكاء الاصطناعي الترويج للبرامج المتوافقة مع أهداف رؤية 2030 السعودية لتنمية رأس المال البشري — خاصةً في مسارات العلوم والتقنية والهندسة والرياضيات." },
        { q: "كيف يتعامل مع استفسارات الطلاب الحساسة؟", a: "للاستفسارات الحساسة (الصحة النفسية وقضايا الأداء الأكاديمي والضائقة المالية)، يستجيب الذكاء الاصطناعي بتعاطف ويصل الطالب بالدعم البشري المناسب فوراً." },
      ]}
      ctaTitle="Enrol More Students, Deliver Better Education"
      ctaTitleAr="سجّل المزيد من الطلاب وقدّم تعليماً أفضل"
      ctaSub="Automate enrolments, support students 24/7, and free your faculty for what matters most."
      ctaSubAr="أتمت التسجيلات، وادعم الطلاب على مدار الساعة، وحرّر أعضاء هيئة التدريس لما يهم أكثر."
      seoTitle="AI Education Agent Saudi Arabia | Electi"
      seoDescription="AI Education Agent for Saudi universities, schools, and training centers. Converts enquiries to enrolments, supports students 24/7. Arabic and English."
      seoPath="/marketplace/ai-education"
    />
  );
}
