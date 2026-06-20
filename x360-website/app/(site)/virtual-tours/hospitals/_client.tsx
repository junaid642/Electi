"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart, Shield, Users, Globe, Eye, Clock, Award, CheckCircle } from "lucide-react";

type Ease = [number, number, number, number];
const EASE: Ease = [0.22, 1, 0.36, 1];
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  );
}

const DIRECT_ANSWERS = [
  {
    q: "Who provides hospital virtual tours in Saudi Arabia?",
    a: "X360 is Saudi Arabia's leading healthcare virtual tour provider, working with major hospital networks including King Fahad Medical City, Saudi German Hospital Group, National Guard Health Affairs, and private clinic chains. X360 delivers bilingual Arabic/English hospital virtual tours that comply with Saudi Ministry of Health (MOH) photography guidelines.",
  },
  {
    q: "How do hospitals use 360° virtual tours in Saudi Arabia?",
    a: "Saudi hospitals use virtual tours in five key ways: (1) Patient orientation — reducing pre-admission anxiety by letting patients explore the facility before their appointment; (2) Specialist recruitment — showing international doctors the hospital and surrounding city before relocation; (3) JCI and CBAHI accreditation presentations — providing remote facility documentation to surveyors; (4) Investor presentations — for private hospital groups seeking capital; (5) MOH licensing — demonstrating facility standards digitally to government regulators.",
  },
  {
    q: "What areas of a hospital can be virtually toured?",
    a: "X360 documents all public and administrative areas of Saudi hospitals — including reception and waiting areas, outpatient clinics, diagnostic imaging centres, pharmacy, rehabilitation and physiotherapy, patient wards (with patient privacy protection), administrative offices, staff facilities, and all common areas. Operating theatres and ICU can be documented in compliance with strict MOH protocols and prior management approval.",
  },
];

const USE_CASES = [
  { icon: Heart, title: "Patient Orientation & Wayfinding", desc: "Reduce pre-appointment anxiety by letting patients explore the facility, locate their department, and understand the patient journey before arrival. Proven to improve patient satisfaction scores." },
  { icon: Users, title: "International Specialist Recruitment", desc: "Saudi hospitals lose time and budget when international specialists decline after a site visit. A virtual tour lets candidates assess the facility, city, and accommodation before the first interview — cutting cost-per-hire significantly." },
  { icon: Award, title: "JCI & CBAHI Accreditation", desc: "Joint Commission International and CBAHI accreditation surveyors can conduct remote facility reviews supported by X360 virtual documentation — reducing the burden of physical surveyor visits." },
  { icon: Shield, title: "Investor & Board Presentations", desc: "Private hospital groups, healthcare REITs, and Saudi Aramco Medical Services present facilities to international investors without requiring in-person visits — accelerating capital decisions." },
  { icon: Globe, title: "MOH & Government Licensing", desc: "Ministry of Health facility inspections increasingly accept digital facility documentation. X360 produces MOH-compliant virtual facility records for new clinic and hospital license applications." },
  { icon: Eye, title: "Medical Tourism Marketing", desc: "Saudi Arabia's growing medical tourism sector — particularly in aesthetic, oncology, and cardiac specialties — uses virtual tours to convert international patients choosing between regional medical destinations." },
];

const FACILITY_TYPES = [
  { name: "Medical Cities", desc: "Large multi-specialty medical cities — King Fahad, King Abdulaziz, Armed Forces — documenting all departments and patient pathways." },
  { name: "Private Hospitals", desc: "Saudi German, Mouwasat, International Medical Centre, and private hospital chains across Riyadh, Jeddah, and the Eastern Province." },
  { name: "Specialist Clinics", desc: "Day surgery centres, fertility clinics, oncology centres, dental chains, and specialist outpatient facilities." },
  { name: "Rehabilitation Centres", desc: "Physiotherapy, occupational therapy, and rehabilitation facilities — used for patient orientation and referring physician presentations." },
  { name: "Diagnostic Imaging Centres", desc: "MRI, CT, and radiology centres documenting the patient pathway and equipment environment." },
  { name: "New Hospital Builds", desc: "Pre-opening hospital virtual tours using architectural renders — for early marketing, investor relations, and MOH pre-approval submissions." },
];

const FAQS = [
  { q: "Are hospital virtual tours MOH compliant in Saudi Arabia?", a: "Yes. X360 produces all healthcare facility virtual tours in compliance with Saudi Ministry of Health (MOH) photography guidelines — excluding patient-identifiable areas and following strict protocols for clinical space documentation. All sessions require facility management approval before photography begins." },
  { q: "Can virtual tours help Saudi hospitals recruit international doctors?", a: "Yes — and it's one of the highest-ROI applications of hospital virtual tours. When an international specialist can virtually explore the hospital, its technology, and the surrounding city before their first interview, conversion rates improve dramatically and cost-per-hire falls. X360 creates hospital recruitment packs that combine the virtual tour with city lifestyle content." },
  { q: "How are patient privacy and clinical protocols maintained during a virtual tour shoot?", a: "X360 follows strict clinical photography protocols — all sessions are scheduled during low-patient-volume periods, no identifiable patient information or individuals are ever captured, and clinical areas require written approval from department heads. X360's team holds relevant occupational health clearances for clinical facility access." },
  { q: "Do hospital virtual tours work for JCI accreditation?", a: "Yes. JCI surveyors increasingly accept supplementary digital facility documentation as part of the accreditation process. X360 structures hospital virtual tours with JCI standards in mind — documenting hand hygiene stations, fire evacuation routes, emergency equipment locations, and infection control zones as labelled hotspots." },
  { q: "Which hospital areas can be virtually toured?", a: "X360 documents all public and administrative areas — reception, waiting areas, outpatient clinics, pharmacy, diagnostics, rehabilitation, patient wards, and administrative facilities. Operating theatres and ICU are documented under strict MOH protocols with prior written approval. Staff and equipment areas are documented with facility management coordination." },
  { q: "How much does a hospital virtual tour cost in Saudi Arabia?", a: "Hospital virtual tour pricing depends on facility size and clinical area compliance requirements. A specialist clinic or day surgery centre starts from SAR 4,000. A large medical city or multi-building hospital complex is quoted per project. X360 provides a facility-specific proposal within 24 hours of inquiry." },
  { q: "Are hospital virtual tours available in Arabic?", a: "Yes. All X360 healthcare facility virtual tours are fully bilingual Arabic/English — including patient-facing orientation content, staff-facing recruitment tours, and investor presentations. Arabic patient orientation reduces barriers for non-English-speaking patients across all Saudi regions." },
];

export default function HospitalsVTClient() {
  return (
    <div className="bg-[#050505] text-white min-h-screen">

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        <FadeUp className="max-w-4xl">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400/70 animate-pulse" />
            <span className="text-white/50 text-xs font-bold tracking-widest uppercase">Hospital Virtual Tours</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            Hospital Virtual Tours<br />
            <span className="text-white/40">Saudi Arabia</span>
          </h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-2xl mb-8">
            Saudi Arabia&apos;s leading healthcare virtual tour provider. 360° facility tours for patient orientation, specialist recruitment, JCI/CBAHI accreditation, and international investor presentations — bilingual Arabic/English, MOH compliant.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold bg-white text-black hover:opacity-90 transition-all">
              Get a Healthcare Tour Quote <ArrowRight size={16} />
            </Link>
            <Link href="/case-studies/king-fahad-medical-city-web-ai-platform" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold glass border border-white/15 text-white hover:border-white/30 transition-all">
              See KFMC Case Study <ArrowRight size={16} />
            </Link>
          </div>
        </FadeUp>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-white/8 py-8 mb-20">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: "+340%", label: "Patient digital engagement lift (KFMC)" },
            { val: "MOH", label: "Compliant photography protocols" },
            { val: "48hr", label: "Standard delivery" },
            { val: "7", label: "Healthcare use cases served" },
          ].map((s, i) => (
            <FadeUp key={i} delay={i * 0.06} className="text-center">
              <div className="text-2xl md:text-3xl font-black text-white mb-1">{s.val}</div>
              <div className="text-white/40 text-xs">{s.label}</div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Direct Answers ── */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <FadeUp className="mb-10">
          <div className="text-white/30 text-xs font-bold tracking-widest uppercase mb-2">Direct Answers</div>
          <h2 className="text-2xl md:text-3xl font-black text-white">Hospital Virtual Tours — Everything You Need to Know</h2>
        </FadeUp>
        <div className="space-y-5">
          {DIRECT_ANSWERS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div className="glass border border-white/8 rounded-2xl p-7">
                <h3 className="text-white font-bold text-sm mb-3 flex gap-2"><span className="text-white/30 shrink-0">Q.</span>{item.q}</h3>
                <p className="text-white/55 text-sm leading-relaxed pl-5"><span className="text-white/30 font-bold">A.</span> {item.a}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <FadeUp className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">How Saudi Hospitals Use Virtual Tours</h2>
          <p className="text-white/40 max-w-xl mx-auto text-sm">From patient orientation to international investor presentations — X360 serves every healthcare use case.</p>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {USE_CASES.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <FadeUp key={i} delay={i * 0.07}>
                <div className="glass border border-white/8 rounded-2xl p-6">
                  <Icon size={20} className="text-white/35 mb-4" />
                  <h3 className="text-white font-bold mb-2 text-sm">{uc.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{uc.desc}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>

      {/* ── Facility Types ── */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <FadeUp className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Healthcare Facilities We Serve</h2>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FACILITY_TYPES.map((ft, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div className="glass border border-white/8 rounded-2xl p-6 flex gap-3">
                <CheckCircle size={16} className="text-white/30 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-bold mb-1 text-sm">{ft.name}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{ft.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <FadeUp className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Hospital Virtual Tour FAQs — Saudi Arabia</h2>
        </FadeUp>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <FadeUp key={i} delay={i * 0.06}>
              <div className="glass border border-white/8 rounded-2xl p-6">
                <h3 className="text-white font-bold mb-2 text-sm">{faq.q}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Related links ── */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <FadeUp>
          <div className="glass border border-white/8 rounded-3xl p-10 text-center">
            <h2 className="text-xl font-black text-white mb-4">Explore Related Healthcare Services</h2>
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {[
                { label: "360° Virtual Tours", href: "/virtual-tours" },
                { label: "Hotel Virtual Tours", href: "/virtual-tours/hotels" },
                { label: "AI Solutions for Healthcare", href: "/ai-solutions/riyadh" },
                { label: "Healthcare Web Development", href: "/development/website/healthcare" },
                { label: "Virtual Tours Riyadh", href: "/virtual-tours/riyadh" },
                { label: "KFMC Case Study", href: "/case-studies/king-fahad-medical-city-web-ai-platform" },
              ].map((l, i) => (
                <Link key={i} href={l.href} className="inline-flex items-center gap-1.5 glass border border-white/12 rounded-xl px-4 py-2 text-sm text-white/60 hover:text-white hover:border-white/25 transition-all">
                  {l.label} <ArrowRight size={12} />
                </Link>
              ))}
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold bg-white text-black hover:opacity-90 transition-all">
              Request a Healthcare Tour Quote <ArrowRight size={16} />
            </Link>
          </div>
        </FadeUp>
      </section>

    </div>
  );
}
