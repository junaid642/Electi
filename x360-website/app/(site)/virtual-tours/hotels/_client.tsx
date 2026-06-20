"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Camera, Star, Globe, Eye, Clock, TrendingUp, Users, Sparkles } from "lucide-react";

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
    q: "Who provides hotel virtual tours in Saudi Arabia?",
    a: "X360 is Saudi Arabia's leading hotel virtual tour provider, working with Hilton, Marriott, IHG, Accor, and independent luxury hotels across Riyadh, Jeddah, Mecca, Medina, Tabuk, and the Eastern Province. X360 delivers bilingual Arabic/English hotel tours with 48-hour turnaround and Google Street View integration.",
  },
  {
    q: "What is a hotel virtual tour and why do hotels need one?",
    a: "A hotel virtual tour is a 360° interactive experience letting prospective guests, corporate travel managers, and event planners explore rooms, suites, restaurants, pools, spa, and event spaces online before booking. Hotels with virtual tours see 35–67% higher direct booking conversion rates and significantly fewer pre-arrival inquiries.",
  },
  {
    q: "Can you create a virtual tour before a hotel opens?",
    a: "Yes. X360 specialises in pre-opening hotel virtual tours using digital virtual staging — where unfurnished or under-construction spaces are digitally styled to brand standards. This lets hotels take advance bookings and present to corporate travel managers months before the physical opening. X360 delivered a pre-opening tour for Hilton Jeddah Corniche that generated SAR 4.2M in advance reservation pipeline.",
  },
];

const TOUR_SPACES = [
  "Standard rooms and suites",
  "Presidential and royal suites",
  "Lobby and reception areas",
  "All-day dining restaurants",
  "Specialty F&B outlets and rooftop venues",
  "Pool deck and outdoor areas",
  "Spa and wellness centres",
  "Fitness centres",
  "Ballrooms and event spaces",
  "Business centre and meeting rooms",
  "Kids clubs and recreation",
  "Corridor and common areas",
];

const BENEFITS = [
  { icon: TrendingUp, title: "+35–67% Booking Conversion", desc: "Hotels with virtual tours consistently outperform competitors on direct booking rates, particularly for corporate clients making accommodation decisions remotely." },
  { icon: Star, title: "Pre-Opening Revenue Pipeline", desc: "Virtual staging lets X360 create a compelling digital hotel before construction completes — enabling pre-opening corporate agreements and advance reservations." },
  { icon: Globe, title: "Google Street View Integration", desc: "X360 publishes verified hotel panoramas directly to Google Maps — increasing organic discovery and travel platform visibility for Saudi hotel properties." },
  { icon: Users, title: "Corporate Travel Manager Sales", desc: "Corporate travel managers signing multi-year agreements now expect virtual tours before any site visit. X360's bilingual tours close enterprise contracts faster." },
  { icon: Sparkles, title: "Virtual Staging for Unfinished Spaces", desc: "Digitally furnish and style rooms that are under construction or unfurnished — photorealistic results indistinguishable from photography of the finished space." },
  { icon: Clock, title: "48-Hour Delivery", desc: "Standard hotel virtual tours delivered within 48 hours of the photography session — embeddable link, iframe, QR code, and Google Street View upload included." },
];

const HOTEL_TYPES = [
  { name: "5-Star & Luxury Hotels", desc: "Suite-level production quality for Saudi luxury properties — Four Seasons, Rosewood, Raffles, and Saudi-owned luxury brands." },
  { name: "Business Hotels", desc: "Comprehensive meeting room and F&B showcase for Riyadh and Jeddah business hotels serving corporate travellers." },
  { name: "Resort Properties", desc: "Red Sea resorts, NEOM Sindalah marina, Amaala ultra-luxury — outdoor environments shot with drone-integrated panoramics." },
  { name: "Hotel Apartments", desc: "Serviced apartments and extended-stay properties in Riyadh's diplomatic quarter and Jeddah's Corniche." },
  { name: "Heritage & Boutique Hotels", desc: "Diriyah Gate heritage hotels and boutique Saudi properties — virtual tours that convey the authentic character of the space." },
  { name: "Pre-Opening Properties", desc: "Virtual staging for hotels under construction or finishing — creating a bookable digital presence months before doors open." },
];

const FAQS = [
  { q: "How do hotel virtual tours increase direct bookings?", a: "Guests who engage with a virtual tour are 5× more likely to book than those viewing photos only. The immersive experience reduces uncertainty, builds confidence in the room category, and reduces booking abandonment — particularly for high-value suites and meeting spaces." },
  { q: "Which hotel brands does X360 work with in Saudi Arabia?", a: "X360 works with global brands including Hilton, Marriott, IHG, Accor, and Radisson, as well as Saudi luxury brands, boutique hotels, and hospitality groups across all regions. X360 understands international hotel brand standards and delivers tours that comply with each brand's visual guidelines." },
  { q: "How long does a full hotel virtual tour take?", a: "A boutique hotel (30–60 rooms) requires one photography day and is delivered within 48 hours. A large resort or city hotel with multiple F&B outlets and event spaces requires 2–3 photography sessions with delivery within one week. Emergency 24-hour delivery is available for launches and brand audits." },
  { q: "Can hotel virtual tours be embedded in OTA listing pages?", a: "Yes. X360 delivers hotel tours as embed-ready iframes compatible with hotel websites, Booking.com, Expedia, Agoda, and Saudi travel platforms. Panoramas are also published to Google Business Profile and Google Maps for organic discovery." },
  { q: "Are hotel virtual tours in Arabic?", a: "Yes. All X360 hotel virtual tours are fully bilingual Arabic/English — room names, amenity descriptions, navigation, and all content — essential for Saudi and GCC hotels serving both Arabic-speaking guests and international visitors." },
  { q: "How much does a hotel virtual tour cost in Saudi Arabia?", a: "Hotel virtual tour pricing depends on the number of room categories, F&B outlets, and event spaces to be documented. A small boutique hotel starts from SAR 3,500. A large resort or city hotel is quoted per project. X360 provides a same-day quote for any hotel property in Saudi Arabia." },
];

export default function HotelsVTClient() {
  return (
    <div className="bg-[#050505] text-white min-h-screen">

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        <FadeUp className="max-w-4xl">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70 animate-pulse" />
            <span className="text-white/50 text-xs font-bold tracking-widest uppercase">Hotel Virtual Tours</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            Hotel Virtual Tours<br />
            <span className="text-white/40">Saudi Arabia</span>
          </h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-2xl mb-8">
            Saudi Arabia&apos;s leading hotel virtual tour company. 360° immersive experiences for hotels, resorts, and luxury hospitality venues — from pre-opening staging to live booking integration. Bilingual Arabic/English, delivered in 48 hours.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold bg-white text-black hover:opacity-90 transition-all">
              Get a Hotel Tour Quote <ArrowRight size={16} />
            </Link>
            <Link href="/case-studies/hilton-jeddah-pre-opening-virtual-tour" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold glass border border-white/15 text-white hover:border-white/30 transition-all">
              See Hilton Jeddah Case Study <ArrowRight size={16} />
            </Link>
          </div>
        </FadeUp>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-white/8 py-8 mb-20">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: "+67%", label: "Average booking lift" },
            { val: "SAR 4.2M", label: "Pre-opening pipeline (Hilton Jeddah)" },
            { val: "48hr", label: "Standard delivery" },
            { val: "5×", label: "More likely to book after virtual tour" },
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
          <h2 className="text-2xl md:text-3xl font-black text-white">Hotel Virtual Tours — Everything You Need to Know</h2>
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

      {/* ── What's Included ── */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <FadeUp className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Every Hotel Space Documented</h2>
          <p className="text-white/40 max-w-xl mx-auto text-sm">X360 creates a complete navigable journey through every bookable and public area of your property.</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="glass border border-white/8 rounded-2xl p-8 grid grid-cols-2 md:grid-cols-3 gap-3">
            {TOUR_SPACES.map((space, i) => (
              <div key={i} className="flex items-center gap-2 text-white/55 text-sm">
                <Camera size={12} className="text-white/30 shrink-0" />
                {space}
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ── Benefits ── */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <FadeUp className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Why Saudi Hotels Choose X360</h2>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <FadeUp key={i} delay={i * 0.07}>
                <div className="glass border border-white/8 rounded-2xl p-6">
                  <Icon size={20} className="text-white/35 mb-4" />
                  <h3 className="text-white font-bold mb-2 text-sm">{b.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>

      {/* ── Hotel Types ── */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <FadeUp className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Hotel Virtual Tours for Every Property Type</h2>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {HOTEL_TYPES.map((ht, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div className="glass border border-white/8 rounded-2xl p-6">
                <h3 className="text-white font-bold mb-2 text-sm">{ht.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{ht.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <FadeUp className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Hotel Virtual Tour FAQs — Saudi Arabia</h2>
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
            <h2 className="text-xl font-black text-white mb-4">Explore Related Services</h2>
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {[
                { label: "360° Virtual Tours", href: "/virtual-tours" },
                { label: "Hospital Virtual Tours", href: "/virtual-tours/hospitals" },
                { label: "Hospitality Industry", href: "/virtual-tours/hospitality" },
                { label: "Virtual Tours Riyadh", href: "/virtual-tours/riyadh" },
                { label: "Virtual Tours Jeddah", href: "/virtual-tours/jeddah" },
                { label: "Hilton Jeddah Case Study", href: "/case-studies/hilton-jeddah-pre-opening-virtual-tour" },
              ].map((l, i) => (
                <Link key={i} href={l.href} className="inline-flex items-center gap-1.5 glass border border-white/12 rounded-xl px-4 py-2 text-sm text-white/60 hover:text-white hover:border-white/25 transition-all">
                  {l.label} <ArrowRight size={12} />
                </Link>
              ))}
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold bg-white text-black hover:opacity-90 transition-all">
              Request a Hotel Tour Quote <ArrowRight size={16} />
            </Link>
          </div>
        </FadeUp>
      </section>

    </div>
  );
}
