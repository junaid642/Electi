import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Send, X, Bot, Zap } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import SEOHead from "@/components/seo/SEOHead";
import Footer from "@/components/layout/Footer";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp  = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const contactCards = [
  { icon: Mail,          title: "Email",    value: "a@electi.sa",          sub: "We reply within 2 hours",              href: "mailto:a@electi.sa" },
  { icon: Phone,         title: "Phone",    value: "+966 502547274",        sub: "Sunday – Thursday, 9am–6pm AST",       href: "tel:+966502547274" },
  { icon: MessageCircle, title: "WhatsApp", value: "+966 502547274",        sub: "Available on WhatsApp Business",        href: "https://wa.me/966502547274" },
  { icon: MapPin,        title: "Office",   value: "Riyadh, Saudi Arabia",  sub: "2413 Ad Damman Road, Ghirnath Dist.",  href: "#" },
];

function SnapSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 min-h-[100dvh] ${className}`} style={{ scrollSnapAlign: "start" }}>
      {children}
    </section>
  );
}

export default function Contact() {
  const scrollRef     = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);
  const [navHidden,   setNavHidden]   = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [chatOpen,    setChatOpen]    = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [submitting,  setSubmitting]  = useState(false);
  const [formState,   setFormState]   = useState({ name: "", email: "", phone: "", company: "", source: "", message: "" });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { name, email, phone, company, source, message } = formState;
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone: phone || undefined, company: company || undefined, source: source ? `contact-page (${source})` : "contact-page", message: message || "No message provided", status: "new" }),
      });
      if (res.ok) { setSubmitted(true); return; }
    } catch {}
    const body = [`Name: ${name}`, `Email: ${email}`, phone ? `Phone: ${phone}` : "", company ? `Company: ${company}` : "", source ? `Source: ${source}` : "", "", "Message:", message].filter(Boolean).join("%0A");
    window.location.href = `mailto:a@electi.sa?subject=${encodeURIComponent("New enquiry from " + (name || "website"))}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div ref={scrollRef} className="bg-[#050505] text-white" style={{ height: "100dvh", overflowY: "scroll", overflowX: "hidden", scrollSnapType: "y mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}>
      <style>{`div::-webkit-scrollbar{display:none}`}</style>
      <SEOHead title="Contact Electi | AI Workforce Solutions" titleAr="تواصل مع إليكتي | حلول قوى العمل بالذكاء الاصطناعي" description="Contact Electi to build intelligent AI workflows, conversational automation systems, and enterprise operational infrastructure for your business." descriptionAr="تواصل مع إليكتي لبناء سير عمل ذكي بالذكاء الاصطناعي وأنظمة أتمتة محادثة وبنية تحتية تشغيلية للمؤسسات." path="/contact" />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ 1 · HERO + CONTACT CARDS ══ */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1.5rem,6vw,5rem) 64px" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
        </div>
        <div className="max-w-5xl mx-auto relative w-full">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-500 text-white/40 mb-6">
                <Mail className="w-3 h-3" /> Get In Touch
              </div>
              <h1 className="font-700 leading-tight mb-5" style={{ fontSize: "clamp(2.8rem,7vw,4.5rem)" }}>
                Let's <span style={{ color: "rgba(255,255,255,0.55)" }}>Talk</span>
              </h1>
              <p className="text-white/40 text-lg max-w-md mx-auto leading-relaxed">Have a question? Want a demo? Ready to deploy? We're here.</p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {contactCards.map((card) => {
                const Icon = card.icon;
                return (
                  <motion.a key={card.title} href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    variants={fadeUp}
                    className="block"
                  >
                    <div className="rounded-xl border border-white/8 hover:border-white/20 transition-all h-full cursor-pointer p-5" style={{ background: "rgba(255,255,255,0.02)" }}>
                      <div className="w-10 h-10 rounded-xl border border-white/8 flex items-center justify-center mb-3" style={{ background: "rgba(255,255,255,0.04)" }}>
                        <Icon className="w-5 h-5 text-white/42" />
                      </div>
                      <h4 className="font-600 text-white/35 text-[10px] uppercase tracking-widest mb-1">{card.title}</h4>
                      <div className="font-600 text-white text-sm mb-0.5">{card.value}</div>
                      <div className="text-white/28 text-xs leading-relaxed">{card.sub}</div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ 2 · FORM + INFO ══ */}
      <SnapSection className="items-start">
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-7 items-start">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
            <div className="rounded-2xl border border-white/8 p-7" style={{ background: "rgba(255,255,255,0.02)" }}>
              <h2 className="text-xl font-700 mb-5">Send a Message</h2>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="py-14 text-center">
                  <motion.div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)" }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.12, type: "spring", stiffness: 280, damping: 20 }}>
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </motion.div>
                  <motion.h3 className="font-700 text-xl text-white mb-2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.4 }}>Message Received!</motion.h3>
                  <motion.p className="text-white/42 text-sm leading-relaxed max-w-xs mx-auto" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}>Our team will get back to you within 2 hours. You can also reach us directly on WhatsApp.</motion.p>
                  <motion.a href="https://wa.me/966502547274" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl text-sm font-600 text-white border border-white/12 hover:border-white/24 transition-colors" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                  </motion.a>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {[{ name: "name", label: "Name", placeholder: "Your name", type: "text", id: "contact-name" }, { name: "email", label: "Email", placeholder: "you@company.com", type: "email", id: "contact-email" }].map(f => (
                      <div key={f.name}>
                        <label className="block text-sm text-white/42 font-500 mb-1.5">{f.label}</label>
                        <input name={f.name} type={f.type} value={(formState as Record<string,string>)[f.name]} onChange={handleChange} placeholder={f.placeholder}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-white/8 focus:border-white/20 focus:outline-none text-white placeholder-white/16 text-sm transition-all hover:border-white/12"
                          style={{ background: "rgba(255,255,255,0.03)" }} data-testid={f.id} />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/42 font-500 mb-1.5">Phone Number</label>
                      <input name="phone" type="tel" value={formState.phone} onChange={handleChange} placeholder="+966 5XX XXX XXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-white/8 focus:border-white/20 focus:outline-none text-white placeholder-white/16 text-sm transition-all hover:border-white/12"
                        style={{ background: "rgba(255,255,255,0.03)" }} data-testid="contact-phone" />
                    </div>
                    <div>
                      <label className="block text-sm text-white/42 font-500 mb-1.5">Company</label>
                      <input name="company" value={formState.company} onChange={handleChange} placeholder="Company name (optional)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-white/8 focus:border-white/20 focus:outline-none text-white placeholder-white/16 text-sm transition-all hover:border-white/12"
                        style={{ background: "rgba(255,255,255,0.03)" }} data-testid="contact-company" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-white/42 font-500 mb-1.5">Where did you hear about us?</label>
                    <select name="source" value={formState.source} onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/8 focus:border-white/20 focus:outline-none text-white text-sm transition-all hover:border-white/12 appearance-none"
                      style={{ background: "#0a0a0a" }} data-testid="contact-source">
                      <option value="" disabled>Select an option…</option>
                      <option value="google">Google / Search</option>
                      <option value="social">Social Media</option>
                      <option value="referral">Friend or Colleague</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="event">Event or Conference</option>
                      <option value="press">Press or Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/42 font-500 mb-1.5">Message</label>
                    <textarea name="message" value={formState.message} onChange={handleChange} placeholder="How can we help you?" rows={4}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/8 focus:border-white/20 focus:outline-none text-white placeholder-white/16 text-sm transition-all resize-none hover:border-white/12"
                      style={{ background: "rgba(255,255,255,0.03)" }} data-testid="contact-message" />
                  </div>
                  <motion.button type="submit" disabled={submitting}
                    className="w-full py-3.5 rounded-xl font-600 bg-white text-black hover:bg-white/92 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ boxShadow: "0 0 25px rgba(255,255,255,0.18)" }}
                    whileHover={{ scale: submitting ? 1 : 1.02, y: submitting ? 0 : -1 }} whileTap={{ scale: 0.98 }}
                    data-testid="contact-submit">
                    <Send className="w-4 h-4" /> {submitting ? "Sending…" : "Send Message"}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Info panel */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }} className="flex flex-col gap-5">
            <div className="rounded-2xl border border-white/8 p-7" style={{ background: "rgba(255,255,255,0.02)" }}>
              <h3 className="font-700 text-lg mb-2">How Can We Help?</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-5">Whether you're exploring AI for the first time or ready to deploy a full agent stack — our team is ready to guide you.</p>
              <div className="space-y-3.5">
                {[
                  { label: "Book a live demo",       desc: "See Electi agents in action, tailored to your industry." },
                  { label: "Request a custom quote", desc: "Enterprise pricing built around your team size and needs." },
                  { label: "Technical questions",    desc: "Talk directly with our engineering team about integrations." },
                  { label: "Partnership enquiries",  desc: "Let's explore how we can grow together." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-1.5 flex-shrink-0" />
                    <div><p className="text-white/80 text-sm font-600">{item.label}</p><p className="text-white/30 text-xs mt-0.5">{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 p-7 flex-1" style={{ background: "rgba(255,255,255,0.02)" }}>
              <h3 className="font-700 text-base mb-5">What Happens Next?</h3>
              <div className="space-y-5">
                {[
                  { n: "01", title: "We review your message",  desc: "Our team reads every submission within 2 hours." },
                  { n: "02", title: "A specialist reaches out", desc: "You'll hear from someone who actually knows your industry." },
                  { n: "03", title: "We build together",        desc: "From demo to deployment — we guide every step." },
                ].map(step => (
                  <div key={step.n} className="flex gap-4 items-start">
                    <span className="text-white/15 font-700 text-xs leading-none mt-1 w-5 flex-shrink-0">{step.n}</span>
                    <div className="flex-1 border-l border-white/6 pl-4">
                      <p className="text-white/75 text-sm font-600">{step.title}</p>
                      <p className="text-white/30 text-xs mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </SnapSection>

      {/* ══ 3 · FOOTER ══ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <Footer />
      </section>

      {/* AI Chatbot widget — fixed to viewport (unaffected by snap scroll) */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {chatOpen && (
            <motion.div initial={{ opacity: 0, y: 16, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.92 }} transition={{ duration: 0.25, ease }}
              className="absolute bottom-16 right-0 w-72 rounded-2xl border border-white/12 overflow-hidden" style={{ background: "rgba(10,10,10,0.92)", backdropFilter: "blur(20px)", boxShadow: "0 0 50px rgba(255,255,255,0.06)" }}>
              <div className="px-4 py-3 flex items-center justify-between border-b border-white/6" style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
                  <span className="text-sm font-600 text-white">Electi Assistant</span>
                </div>
                <button onClick={() => setChatOpen(false)} className="text-white/30 hover:text-white transition-colors" data-testid="chat-close"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-4">
                <div className="rounded-xl p-3 border border-white/6 mb-3" style={{ background: "rgba(255,255,255,0.03)" }}>
                  <p className="text-white/58 text-sm leading-relaxed">Hi! I'm Electi's Information AI assistant. How can I help you today?</p>
                </div>
                <div className="flex gap-1.5 mb-3 flex-wrap">
                  {["Book a demo", "Pricing", "Get started"].map(opt => (
                    <button key={opt} className="px-2.5 py-1 rounded-lg border border-white/8 text-white/40 text-xs hover:text-white/80 hover:border-white/15 transition-all" style={{ background: "rgba(255,255,255,0.02)" }} data-testid={`chat-option-${opt.replace(/\s+/g, "-").toLowerCase()}`}>{opt}</button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input placeholder="Type a message..." className="flex-1 px-3 py-2 rounded-lg border border-white/8 focus:border-white/18 focus:outline-none text-white placeholder-white/18 text-xs transition-all" style={{ background: "rgba(255,255,255,0.03)" }} data-testid="chat-input" />
                  <button className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0 hover:bg-white/90 transition-colors" style={{ boxShadow: "0 0 12px rgba(255,255,255,0.2)" }} data-testid="chat-send">
                    <Send className="w-3.5 h-3.5 text-black" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button onClick={() => setChatOpen(!chatOpen)} className="rounded-2xl bg-white flex items-center justify-center hover:bg-white/92 transition-all" style={{ width: 52, height: 52, boxShadow: "0 0 30px rgba(255,255,255,0.22)" }} whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }} data-testid="chat-toggle">
          <Bot className="w-6 h-6 text-black" />
        </motion.button>
      </div>
    </div>
  );
}
