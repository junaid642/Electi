import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plug, Search, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/seo/SEOHead";
import { useLang } from "@/contexts/LanguageContext";
import { INTEGRATIONS, CATEGORIES } from "@/data/integrations";

const ease    = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } };
const fadeUp  = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } };
const GRID_BG = {
  backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
  backgroundSize: "72px 72px",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://electi.sa/integrations",
  "name": "Integrations | Electi — AI Agents for Saudi Business",
  "description": "Electi integrates with the systems Saudi businesses already use: Odoo, SAP, Salesforce, HubSpot, WhatsApp Business, Microsoft 365, Google Workspace, and more.",
  "url": "https://electi.sa/integrations",
  "hasPart": INTEGRATIONS.map((i) => ({
    "@type": "WebPage",
    "name": `${i.name} Integration`,
    "url": `https://electi.sa/integrations/${i.slug}`,
  })),
};

export default function IntegrationsHub() {
  const { isAr } = useLang();
  const scrollRef     = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);
  const [navHidden,   setNavHidden]   = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [query, setQuery] = useState("");

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

  const filtered = INTEGRATIONS.filter((i) => {
    const matchCat = activeCategory === "all" || i.category === activeCategory;
    const q = query.toLowerCase();
    const matchQ = !q || i.name.toLowerCase().includes(q) || i.nameAr.includes(q) || i.tagline.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <div ref={scrollRef} className="bg-[#050505] text-white" dir={isAr ? "rtl" : "ltr"}
      style={{ height: "100dvh", overflowY: "scroll", overflowX: "hidden", scrollSnapType: "y mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}>
      <style>{`div::-webkit-scrollbar{display:none}`}</style>
      <SEOHead
        title="Integrations | Electi — Connect AI Agents to Your Business Systems"
        titleAr="التكاملات | Electi — ربط وكلاء الذكاء الاصطناعي بأنظمة أعمالك"
        description="Electi integrates with Odoo, SAP, Salesforce, HubSpot, WhatsApp Business, Microsoft 365, Google Workspace, Shopify, and 15+ more systems used by Saudi businesses."
        descriptionAr="تتكامل Electi مع Odoo وSAP وSalesforce وHubSpot وواتساب للأعمال وMicrosoft 365 وGoogle Workspace وShopify وأكثر من 15 نظاماً آخر تستخدمه الشركات السعودية."
        path="/integrations"
        keywords="Electi integrations, AI agent Odoo, AI agent SAP, AI agent Salesforce, AI agent WhatsApp, Saudi business integration"
        schemas={[schema]}
      />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ HERO ══ */}
      <section className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1rem,5vw,4rem) 48px" }}>
        <div className="absolute inset-0 pointer-events-none" style={GRID_BG} />
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(66,133,244,0.05) 0%,transparent 65%)" }} />

        <motion.div variants={stagger} initial="hidden" animate="show" className="relative max-w-3xl mx-auto">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/12 text-[11px] font-600 text-white/55 mb-6"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <Plug className="w-3 h-3" />
            {isAr ? `${INTEGRATIONS.length}+ تكامل` : `${INTEGRATIONS.length}+ Integrations`}
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-700 leading-[1.06] tracking-tight mb-5"
            style={{ fontSize: "clamp(2.4rem,5.5vw,4rem)" }}>
            {isAr ? "تكامل مع الأنظمة" : "Connect to the Systems"}
            <br />
            <span style={{ color: "rgba(255,255,255,0.38)" }}>
              {isAr ? "التي تستخدمها بالفعل" : "You Already Use"}
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/38 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            {isAr
              ? "Electi تتصل بـ Odoo وSAP وSalesforce وHubSpot وواتساب للأعمال وMicrosoft 365 وGoogle Workspace والمزيد — مما يجعل وكلاءك الذكيين جزءاً من سير عملك الحالي."
              : "Electi connects to Odoo, SAP, Salesforce, HubSpot, WhatsApp Business, Microsoft 365, Google Workspace, and more — making your AI agents part of your existing workflows."}
          </motion.p>

          {/* Search */}
          <motion.div variants={fadeUp} className="relative max-w-md mx-auto mb-8">
            <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 ${isAr ? "right-4" : "left-4"}`} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isAr ? "ابحث عن تكامل..." : "Search integrations..."}
              className={`w-full rounded-xl border border-white/8 text-white/60 text-sm outline-none focus:border-white/16 transition-all ${isAr ? "pr-10 pl-4" : "pl-10 pr-4"} py-3`}
              style={{ background: "rgba(255,255,255,0.04)" }}
              dir={isAr ? "rtl" : "ltr"}
            />
          </motion.div>

          {/* Category pills */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-600 border transition-all ${activeCategory === "all" ? "border-white/20 text-white/70 bg-white/6" : "border-white/8 text-white/30 hover:border-white/14 hover:text-white/45"}`}>
              {isAr ? "الكل" : "All"} ({INTEGRATIONS.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = INTEGRATIONS.filter((i) => i.category === cat.id).length;
              return (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-600 border transition-all ${activeCategory === cat.id ? "border-white/20 text-white/70 bg-white/6" : "border-white/8 text-white/30 hover:border-white/14 hover:text-white/45"}`}>
                  {isAr ? cat.labelAr : cat.label} ({count})
                </button>
              );
            })}
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </section>

      {/* ══ INTEGRATION GRID ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/25 text-sm">{isAr ? "لا توجد تكاملات مطابقة" : "No integrations match your search"}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((integration, i) => (
                <motion.div key={integration.slug}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: Math.min(i, 5) * 0.04, ease }}>
                  <Link href={`/integrations/${integration.slug}`}>
                    <motion.div className="h-full rounded-2xl border border-white/7 p-6 cursor-pointer hover:border-white/14 transition-all group"
                      style={{ background: "rgba(255,255,255,0.02)" }}
                      whileHover={{ y: -3 }}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center font-700 text-white/50 text-sm"
                          style={{ background: "rgba(255,255,255,0.04)" }}>
                          {integration.logoLetter}
                        </div>
                        <span className="text-[9px] font-700 text-white/25 uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/7"
                          style={{ background: "rgba(255,255,255,0.02)" }}>
                          {isAr ? integration.categoryLabelAr : integration.categoryLabel}
                        </span>
                      </div>
                      <h3 className="font-700 text-white/80 mb-1">{isAr ? integration.nameAr : integration.name}</h3>
                      <p className="text-white/28 text-xs leading-relaxed mb-4">{isAr ? integration.taglineAr : integration.tagline}</p>
                      <div className="flex items-center gap-1.5 text-white/25 group-hover:text-white/45 transition-colors text-xs">
                        <span>{isAr ? "عرض التفاصيل" : "View details"}</span>
                        <ArrowRight className={`w-3 h-3 ${isAr ? "rotate-180" : ""}`} />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ MISSING INTEGRATION CTA ══ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <div className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="rounded-3xl border border-white/8 p-10 text-center" style={{ background: "rgba(255,255,255,0.02)" }}>
              <Plug className="w-8 h-8 text-white/25 mx-auto mb-4" />
              <h2 className="text-2xl font-700 mb-4">
                {isAr ? "لا ترى النظام الذي تستخدمه؟" : "Don't See Your System?"}
              </h2>
              <p className="text-white/30 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
                {isAr
                  ? "Electi قادرة على بناء تكاملات مخصصة لأي نظام يحتوي على API. تواصل مع فريق التكامل لمناقشة متطلباتك المحددة."
                  : "Electi can build custom integrations for any system with an API. Contact our integration team to discuss your specific requirements."}
              </p>
              <a href="mailto:mohammed@electi.sa?subject=Custom Integration Request">
                <motion.button className="px-8 py-3.5 rounded-xl bg-white text-black text-sm font-600"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  {isAr ? "طلب تكامل مخصص" : "Request Custom Integration"}
                </motion.button>
              </a>
            </motion.div>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
