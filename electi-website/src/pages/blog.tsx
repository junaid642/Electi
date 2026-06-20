import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import SEOHead from "@/components/seo/SEOHead";
import Footer from "@/components/layout/Footer";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp  = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

const categories = ["All", "AI", "Product", "Legal", "Business", "Tech"];

type Article = { id: number; title: string; excerpt: string; category: string; date: string; author: string; readTime: string; featured: boolean };

const STATIC_ARTICLES: Article[] = [
  { id: 1, title: "How AI Agents Are Replacing Traditional Executive Assistants", excerpt: "The role of the executive assistant is changing. AI-powered agents now handle scheduling, email triage, and task management — often better than their human counterparts.", category: "AI",       date: "May 18, 2026", author: "Omar Al-Rashidi", readTime: "6 min read", featured: true  },
  { id: 2, title: "Understanding Saudi Arabia's New Labor Law Updates for 2026",     excerpt: "Comprehensive breakdown of the latest amendments to Saudi labor law and how Electi's Legal Agent keeps you automatically compliant.",                                         category: "Legal",    date: "May 12, 2026", author: "Lena Müller",     readTime: "8 min read", featured: false },
  { id: 3, title: "OCR + AI: The End of Manual Invoice Processing",                  excerpt: "How combining optical character recognition with large language models creates a billing automation system that processes invoices with near-perfect accuracy.",               category: "Tech",     date: "May 8, 2026",  author: "Tariq Al-Ghamdi",readTime: "5 min read", featured: false },
  { id: 4, title: "WhatsApp as Your Business Operating System",                       excerpt: "95% of Saudi professionals use WhatsApp daily. We built Electi to meet them there — transforming their most-used app into a full business command center.",                   category: "Product",  date: "May 3, 2026",  author: "Sarah Chen",      readTime: "4 min read", featured: false },
  { id: 5, title: "Building AI Products for Arabic-Speaking Markets",                 excerpt: "The unique challenges and opportunities of deploying AI in Arabic-speaking markets — from right-to-left interfaces to culturally-aware language models.",                      category: "Business", date: "Apr 28, 2026", author: "Lena Müller",     readTime: "7 min read", featured: false },
  { id: 6, title: "The ROI of Deploying AI Agents in Healthcare",                     excerpt: "A data-driven analysis of how Saudi healthcare facilities using Electi reduce administrative overhead by 67% and improve patient satisfaction scores.",                         category: "Business", date: "Apr 22, 2026", author: "Omar Al-Rashidi", readTime: "9 min read", featured: false },
];

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function SnapSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 min-h-[100dvh] ${className}`} style={{ scrollSnapAlign: "start" }}>
      {children}
    </section>
  );
}

export default function Blog() {
  const scrollRef        = useRef<HTMLDivElement>(null);
  const lastScrollRef    = useRef(0);
  const [navHidden,   setNavHidden]   = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search,  setSearch]  = useState("");
  const [articles, setArticles] = useState<Article[]>(STATIC_ARTICLES);

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

  useEffect(() => {
    fetch("/api/blog")
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped: Article[] = data.map((p: { id: number; title: string; excerpt: string | null; category: string | null; publishedAt: string | null }, i: number) => ({
            id: p.id, title: p.title, excerpt: p.excerpt ?? "", category: p.category ?? "AI",
            date: formatDate(p.publishedAt), author: "Electi Team", readTime: "5 min read", featured: i === 0,
          }));
          setArticles(mapped);
        }
      }).catch(() => {});
  }, []);

  const filtered    = articles.filter(a => (activeCategory === "All" || a.category === activeCategory) && (a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase())));
  const featured    = articles[0];
  const rest        = filtered.filter(a => a.id !== (featured?.id ?? 1));
  const showFeatured = activeCategory === "All" && !search;

  return (
    <div ref={scrollRef} className="bg-[#050505] text-white" style={{ height: "100dvh", overflowY: "scroll", overflowX: "hidden", scrollSnapType: "y mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}>
      <style>{`div::-webkit-scrollbar{display:none}`}</style>
      <SEOHead title="Electi Blog | AI Workforce Insights" titleAr="مدونة إليكتي | رؤى قوى العمل بالذكاء الاصطناعي" description="Explore insights on AI workforce automation, conversational AI, enterprise AI workflows, and operational intelligence from the Electi team." descriptionAr="استكشف رؤى حول أتمتة قوى العمل بالذكاء الاصطناعي والذكاء الاصطناعي المحادثاتي وسير عمل الذكاء الاصطناعي للمؤسسات." path="/blog" />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ 1 · HERO + SEARCH ══ */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px clamp(1.5rem,6vw,5rem) 64px" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
        </div>
        <div className="max-w-5xl mx-auto relative w-full">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-500 text-white/40 mb-6">
                <BookOpen className="w-3 h-3" /> Electi Journal
              </div>
              <h1 className="font-700 mb-4 leading-tight" style={{ fontSize: "clamp(2.5rem,6vw,4rem)" }}>
                Insights on{" "}
                <span style={{ color: "rgba(255,255,255,0.55)" }}>AI & Business</span>
              </h1>
              <p className="text-white/40 text-lg max-w-lg mx-auto leading-relaxed">Deep dives into AI agents, Saudi business trends, and the future of work.</p>
            </motion.div>

            {/* Search */}
            <motion.div variants={fadeUp} className="max-w-lg mx-auto mb-7">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/22" />
                <input type="search" placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/8 focus:border-white/20 focus:outline-none text-white placeholder-white/20 text-sm transition-all hover:border-white/12"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                  data-testid="blog-search" />
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2">
              {categories.map(cat => (
                <motion.button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-500 transition-all duration-200 ${activeCategory === cat ? "bg-white text-black" : "border border-white/8 text-white/40 hover:text-white hover:border-white/15"}`}
                  style={activeCategory === cat ? { boxShadow: "0 0 15px rgba(255,255,255,0.15)" } : { background: "rgba(255,255,255,0.02)" }}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  data-testid={`blog-category-${cat.toLowerCase()}`}>
                  {cat}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ 2 · ARTICLES ══ */}
      <SnapSection className="items-start">
        <div className="w-full max-w-5xl mx-auto">
          {/* Featured */}
          {showFeatured && featured && (
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="mb-8">
              <div className="rounded-2xl border border-white/10 p-7 sm:p-9 group cursor-pointer hover:border-white/16 transition-all" style={{ background: "rgba(255,255,255,0.025)" }}>
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-600 border border-white/10 text-white/55 mb-5" style={{ background: "rgba(255,255,255,0.08)" }}>✦ Featured</span>
                <h2 className="text-2xl sm:text-3xl font-700 text-white mb-3 leading-snug max-w-2xl">{featured.title}</h2>
                <p className="text-white/45 text-base leading-relaxed mb-5 max-w-2xl">{featured.excerpt}</p>
                <div className="flex flex-wrap items-center gap-5 text-sm text-white/28 mb-5">
                  <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{featured.author}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{featured.date}</span>
                  <span>{featured.readTime}</span>
                </div>
                <motion.button className="flex items-center gap-2 text-white/50 hover:text-white text-sm font-600 transition-colors" whileHover={{ x: 4 }} data-testid="featured-article-read">
                  Read article <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Grid */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(showFeatured ? rest : filtered).map(article => (
              <motion.div key={article.id} variants={fadeUp} className="rounded-xl border border-white/8 hover:border-white/14 cursor-pointer transition-all h-full flex flex-col" style={{ background: "rgba(255,255,255,0.02)" }} data-testid={`article-card-${article.id}`}>
                <div className="px-5 pt-5 pb-3 border-b border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-600 border border-white/8 text-white/50" style={{ background: "rgba(255,255,255,0.07)" }}>{article.category}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-700 text-white text-sm leading-snug mb-2.5 line-clamp-2">{article.title}</h3>
                  <p className="text-white/32 text-xs leading-relaxed mb-4 flex-1 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="text-white/20 text-xs">{article.date}</div>
                    <motion.button className="flex items-center gap-1 text-white/42 hover:text-white text-xs font-600 transition-colors" whileHover={{ x: 2 }} data-testid={`article-read-${article.id}`}>
                      Read <ArrowRight className="w-3 h-3" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-white/22">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No articles found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </SnapSection>

      {/* ══ 3 · FOOTER ══ */}
      <section style={{ scrollSnapAlign: "start" }}>
        <Footer />
      </section>
    </div>
  );
}
