import { Heart, Calendar, Shield, Globe, Zap, BarChart3, Users, Building2, Clock, MessageSquare, CheckCircle, Phone } from "lucide-react";
import MarketplacePage from "@/components/templates/MarketplacePage";

export default function AIHealthcareAgentPage() {
  return (
    <MarketplacePage
      badge="AI Healthcare Agent"
      badgeAr="وكيل الرعاية الصحية الذكي"
      icon={Heart}
      title="AI Healthcare Agent"
      titleAr="وكيل الرعاية الصحية الذكي"
      titleAccent="for Saudi Clinics & Hospitals"
      tagline="Reduce no-shows, fill appointment slots, and answer patient queries — 24/7, in Arabic and English."
      taglineAr="قلّل حالات عدم الحضور واملأ مواعيد العيادة وأجب على استفسارات المرضى — 24/7، بالعربية والإنجليزية."
      description="Saudi Arabia's healthcare sector is scaling rapidly. Electi's AI Healthcare Agent handles patient appointments, insurance queries, and follow-up care — compliantly, compassionately, and around the clock."
      descriptionAr="يتوسع قطاع الرعاية الصحية السعودي بسرعة. يتعامل وكيل الرعاية الصحية الذكي من Electi مع مواعيد المرضى واستفسارات التأمين ورعاية المتابعة بالامتثال والرحمة."
      heroStats={[
        { value: "40%", label: "No-Show Reduction", labelAr: "تقليل عدم الحضور" },
        { value: "80%", label: "Queries Auto-Resolved", labelAr: "استفسارات محلولة تلقائياً" },
        { value: "24/7", label: "Patient Access", labelAr: "وصول المرضى" },
        { value: "< 30s", label: "Appointment Confirmation", labelAr: "تأكيد الموعد" },
      ]}
      features={[
        { icon: Calendar, title: "Appointment Management", desc: "Books, reschedules, and cancels appointments — with automated reminders reducing no-shows by up to 40%." },
        { icon: Shield, title: "Insurance Verification", desc: "Pre-verifies patient insurance coverage, checks eligible services, and confirms copays before appointments." },
        { icon: Zap, title: "Symptom Triage", desc: "Gathers symptoms and routes patients to appropriate departments — emergency, specialist, or GP." },
        { icon: Globe, title: "Arabic-First Patient Care", desc: "Communicates with patients in natural Arabic — including dialects — for accessible, comfortable healthcare interactions." },
        { icon: MessageSquare, title: "Post-Visit Follow-up", desc: "Sends medication reminders, follow-up appointment prompts, and satisfaction surveys after every visit." },
        { icon: BarChart3, title: "Clinic Analytics", desc: "Track appointment fill rates, no-show patterns, peak demand times, and patient satisfaction scores." },
      ]}
      useCases={[
        { icon: Building2, label: "Polyclinics", desc: "Manage high patient volumes across multiple specialties with AI triage and scheduling." },
        { icon: Users, label: "Specialist Clinics", desc: "Pre-qualify referrals, gather clinical history, and schedule specialist consultations efficiently." },
        { icon: Heart, label: "Dental Clinics", desc: "Handle appointment booking, treatment plan queries, and post-procedure follow-up automatically." },
        { icon: CheckCircle, label: "Private Hospitals", desc: "Coordinate across departments — admissions, labs, radiology, and discharge planning." },
        { icon: Clock, label: "Telehealth Platforms", desc: "Pre-qualify patients, collect symptom information, and schedule video consultations." },
        { icon: Phone, label: "Home Healthcare", desc: "Schedule home visits, track caregiver assignments, and follow up on patient progress." },
      ]}
      industries={["Polyclinics", "Specialist Clinics", "Dental Clinics", "Private Hospitals", "Telehealth", "Home Healthcare", "Pharmacies", "Diagnostic Labs"]}
      industriesAr={["العيادات المتعددة التخصصات", "العيادات المتخصصة", "عيادات الأسنان", "المستشفيات الخاصة", "الرعاية الصحية عن بُعد", "الرعاية الصحية المنزلية", "الصيدليات", "مختبرات التشخيص"]}
      benefits={[
        { title: "40% fewer no-shows", desc: "Automated reminders dramatically reduce costly missed appointments." },
        { title: "PDPL & HIPAA aligned", desc: "Patient data handled with the highest privacy and security standards." },
        { title: "Compassionate AI tone", desc: "Specially calibrated for sensitive healthcare conversations — empathetic and clear." },
        { title: "MOH guideline awareness", desc: "Responses align with Saudi Ministry of Health communication guidelines." },
      ]}
      benefitsAr={[
        { title: "تقليل حالات عدم الحضور بـ 40%", desc: "التذكيرات الآلية تقلل بشكل كبير من المواعيد المفقودة المكلفة." },
        { title: "متوافق مع PDPL وHIPAA", desc: "بيانات المرضى تُعالَج بأعلى معايير الخصوصية والأمان." },
        { title: "نبرة ذكاء اصطناعي رحيمة", desc: "معايرة خاصة للمحادثات الصحية الحساسة — متعاطفة وواضحة." },
        { title: "توعية بإرشادات وزارة الصحة", desc: "الردود تتوافق مع إرشادات الاتصال الصادرة عن وزارة الصحة السعودية." },
      ]}
      faqs={[
        { q: "Is the AI compliant with Saudi health data regulations?", a: "Yes. Patient data is stored in Saudi Arabia, processed with PDPL (Personal Data Protection Law) compliance, and our systems are aligned with CBAHI and MOMAH data governance standards." },
        { q: "Can it handle insurance pre-authorization?", a: "The AI can collect required clinical information and submit it to insurance systems as part of pre-authorization workflows, significantly reducing admin burden on medical staff." },
        { q: "What if a patient describes an emergency?", a: "The AI is trained to identify emergency indicators and immediately directs the patient to call 911, visit the nearest ER, or connects them to an on-call nurse — never delaying emergency care." },
        { q: "Can it support Arabic medical terminology?", a: "Yes. The AI is trained on Arabic medical vocabulary and can communicate health information clearly in Arabic, adapting to patient literacy levels." },
        { q: "Does it integrate with our Hospital Information System (HIS)?", a: "We integrate with major HIS platforms including Cerner, Epic, Oracle Health, and several Saudi-specific systems. Appointment data syncs in real time." },
      ]}
      faqsAr={[
        { q: "هل الذكاء الاصطناعي متوافق مع لوائح البيانات الصحية السعودية؟", a: "نعم. بيانات المرضى مخزنة في المملكة العربية السعودية، ومعالجة بالتوافق مع نظام حماية البيانات الشخصية، وأنظمتنا متوافقة مع معايير حوكمة البيانات لـ CBAHI وMOMAH." },
        { q: "هل يمكنه التعامل مع الموافقة المسبقة للتأمين؟", a: "يمكن للذكاء الاصطناعي جمع المعلومات السريرية المطلوبة وتقديمها إلى أنظمة التأمين كجزء من سير عمل الموافقة المسبقة." },
        { q: "ماذا لو وصف مريض حالة طوارئ؟", a: "الذكاء الاصطناعي مدرَّب على تحديد مؤشرات الطوارئ ويوجّه المريض فوراً للاتصال بـ 911 أو زيارة أقرب غرفة طوارئ — لا يؤخر أبداً رعاية الطوارئ." },
        { q: "هل يدعم المصطلحات الطبية العربية؟", a: "نعم. الذكاء الاصطناعي مدرَّب على المفردات الطبية العربية ويمكنه توصيل المعلومات الصحية بوضوح بالعربية." },
        { q: "هل يتكامل مع نظام معلومات المستشفى؟", a: "نتكامل مع منصات HIS الرئيسية بما فيها Cerner وEpic وOracle Health وعدة أنظمة سعودية متخصصة. بيانات المواعيد تتزامن في الوقت الفعلي." },
      ]}
      ctaTitle="Better Patient Care Starts With Better Access"
      ctaTitleAr="رعاية المرضى الأفضل تبدأ بوصول أفضل"
      ctaSub="Reduce no-shows, fill schedules, and delight patients — with AI built for Saudi healthcare."
      ctaSubAr="قلّل حالات عدم الحضور واملأ الجداول وأسعد المرضى — مع ذكاء اصطناعي مبني للرعاية الصحية السعودية."
      seoTitle="AI Healthcare Agent Saudi Arabia | Electi"
      seoDescription="AI Healthcare Agent for Saudi clinics and hospitals. Manages appointments, insurance queries, and patient follow-up in Arabic and English. PDPL compliant."
      seoPath="/marketplace/ai-healthcare"
    />
  );
}
