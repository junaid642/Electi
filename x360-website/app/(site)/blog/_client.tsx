"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import GlowRule from "@/components/ui/GlowRule";
import { useLang } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const categoriesEn = ["All", "Virtual Tours", "Technology", "Industry Insights", "Case Study", "Company News"];
const categoriesAr = ["الكل", "الجولات الافتراضية", "التكنولوجيا", "رؤى الصناعة", "دراسة حالة", "أخبار الشركة"];

type Article = {
  id: number;
  slug?: string;
  title: string;
  titleAr?: string;
  excerpt: string;
  excerptAr?: string;
  category: string;
  categoryAr?: string;
  dateIso: string;
  author: string;
  readTime: string;
  readTimeAr?: string;
  featured: boolean;
};


function formatDate(iso: string, locale = "en-US") {
  try {
    return new Date(iso).toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return iso.slice(0, 10);
  }
}

function apiToArticle(p: {
  id: number; title: string; slug: string; excerpt: string | null;
  category: string | null; publishedAt: string | null; createdAt: string;
}, i: number): Article {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
    category: p.category ?? "Industry Insights",
    dateIso: p.publishedAt ?? p.createdAt,
    author: "X360 Team",
    readTime: "5 min read",
    readTimeAr: "5 دقائق قراءة",
    featured: i === 0,
  };
}

export default function BlogClient() {
  const { isAr } = useLang();
  const router = useRouter();

  const categories = isAr ? categoriesAr : categoriesEn;
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesLoading, setArticlesLoading] = useState(true);

  useEffect(() => {
    setActiveCategory(categories[0]);
  }, [isAr]);

  useEffect(() => {
    setArticlesLoading(true);
    fetch("/api/blog")
      .then(r => r.ok ? r.json() : [])
      .then((data: unknown) => {
        if (Array.isArray(data)) {
          setArticles((data as Parameters<typeof apiToArticle>[0][]).map(apiToArticle));
        }
      })
      .catch(() => {})
      .finally(() => setArticlesLoading(false));
  }, []);

  const filtered = articles.filter((a) => {
    const catEn = categoriesEn[categoriesAr.indexOf(activeCategory)] ?? activeCategory;
    const isAll = activeCategory === "All" || activeCategory === "الكل";
    const matchCat = isAll || a.category === catEn || a.category === activeCategory;
    const title = isAr ? (a.titleAr ?? a.title) : a.title;
    const excerpt = isAr ? (a.excerptAr ?? a.excerpt) : a.excerpt;
    const matchSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = articles[0];
  const rest = filtered.filter((a) => a.id !== (featured?.id ?? 1));
  const isAll = activeCategory === "All" || activeCategory === "الكل";
  const showFeatured = isAll && !search;

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-clip">
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 dot-grid opacity-[0.04]" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-white/10 text-[11px] font-semibold text-white/45 mb-6">
              <BookOpen className="w-3 h-3" /> {isAr ? "مجلة X360" : "X360 Journal"}
            </div>
            <h1 className="font-thin leading-tight mb-5" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "0.1em", fontFamily: "Quicksand, sans-serif" }}>
              {isAr ? (
                <>رؤى حول <span className="shimmer-text">التجارب الرقمية</span></>
              ) : (
                <>Insights on{" "}<span className="shimmer-text">Digital Experiences</span></>
              )}
            </h1>
            <div className="mb-5"><GlowRule /></div>
            <p className="text-white/40 max-w-lg mx-auto" style={{ fontSize: "clamp(0.82rem, 1.2vw, 0.96rem)", letterSpacing: "0.04em", lineHeight: 1.75, fontFamily: "Quicksand, sans-serif" }}>
              {isAr
                ? "تعمق في الجولات الافتراضية 360° وتطوير الويب بالذكاء الاصطناعي والتحول الرقمي في المملكة العربية السعودية."
                : "Deep dives into 360° virtual tours, AI web development, and digital transformation across Saudi Arabia."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease }}
            className="max-w-lg mx-auto mb-7"
          >
            <div className="relative">
              <Search className={`absolute ${isAr ? "end-3.5" : "start-3.5"} top-1/2 -translate-y-1/2 w-4 h-4 text-white/22`} />
              <input
                type="search"
                placeholder={isAr ? "ابحث في المقالات..." : "Search articles..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full ${isAr ? "pe-10 ps-4" : "ps-10 pe-4"} py-3 rounded-xl glass border border-white/8 focus:border-white/20 focus:outline-none text-white placeholder-white/20 text-sm transition-all bg-transparent hover:border-white/12`}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                    : "glass border border-white/8 text-white/40 hover:text-white hover:border-white/15"
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {showFeatured && featured && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6, ease }}
              className="mb-8"
              onClick={() => featured.slug && router.push(`/blog/${featured.slug}`)}
            >
              <SpotlightCard
                glowColor="rgba(255,255,255,0.06)"
                className={`glass rounded-2xl border border-white/10 group hover:border-white/16 transition-all ${featured.slug ? "cursor-pointer" : ""}`}
              >
                <div className="p-7 sm:p-9">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold bg-white/8 text-white/55 border border-white/10 mb-5">
                    {isAr ? "✦ مميز" : "✦ Featured"}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug group-hover:text-white/80 transition-colors max-w-2xl">
                    {isAr ? (featured.titleAr ?? featured.title) : featured.title}
                  </h2>
                  <p className="text-white/45 text-base leading-relaxed mb-5 max-w-2xl">
                    {isAr ? (featured.excerptAr ?? featured.excerpt) : featured.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-5 text-sm text-white/28 mb-5">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      {featured.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(featured.dateIso, isAr ? "ar-SA" : "en-US")}
                    </span>
                    <span>{isAr ? (featured.readTimeAr ?? featured.readTime) : featured.readTime}</span>
                  </div>
                  <motion.span
                    className="flex items-center gap-2 text-white/50 hover:text-white text-sm font-semibold transition-colors w-fit"
                    whileHover={{ x: isAr ? -4 : 4 }}
                  >
                    {isAr ? (
                      <><ArrowRight className="w-3.5 h-3.5 rotate-180" /> اقرأ المقال</>
                    ) : (
                      <>Read article <ArrowRight className="w-3.5 h-3.5" /></>
                    )}
                  </motion.span>
                </div>
              </SpotlightCard>
            </motion.div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(showFeatured ? rest : filtered).map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.6, ease }}
                onClick={() => article.slug && router.push(`/blog/${article.slug}`)}
              >
                <SpotlightCard
                  glowColor="rgba(255,255,255,0.05)"
                  className={`glass rounded-xl border border-white/8 hover:border-white/14 group transition-all duration-300 h-full ${article.slug ? "cursor-pointer" : ""}`}
                >
                  <div className="h-full flex flex-col">
                    <div className="bg-white/2 px-5 pt-5 pb-3 border-b border-white/5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/7 text-white/50 border border-white/8">
                        {isAr ? (article.categoryAr ?? article.category) : article.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-white text-sm leading-snug mb-2.5 group-hover:text-white/75 transition-colors line-clamp-2">
                        {isAr ? (article.titleAr ?? article.title) : article.title}
                      </h3>
                      <p className="text-white/32 text-xs leading-relaxed mb-4 flex-1 line-clamp-3">
                        {isAr ? (article.excerptAr ?? article.excerpt) : article.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="text-white/20 text-xs">{formatDate(article.dateIso, isAr ? "ar-SA" : "en-US")}</div>
                        {article.slug && (
                          <motion.span
                            className="flex items-center gap-1 text-white/42 hover:text-white text-xs font-semibold transition-colors"
                            whileHover={{ x: isAr ? -2 : 2 }}
                          >
                            {isAr ? (
                              <><ArrowRight className="w-3 h-3 rotate-180" /> اقرأ</>
                            ) : (
                              <>Read <ArrowRight className="w-3 h-3" /></>
                            )}
                          </motion.span>
                        )}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          {articlesLoading && (
            <div className="text-center py-20 text-white/22">
              <div className="w-6 h-6 border-2 border-white/15 border-t-white/50 rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm">{isAr ? "جارٍ التحميل…" : "Loading…"}</p>
            </div>
          )}

          {!articlesLoading && filtered.length === 0 && (
            <div className="text-center py-20 text-white/22">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>
                {isAr
                  ? "لم يُعثر على مقالات. جرّب بحثاً أو تصنيفاً مختلفاً."
                  : "No articles found. Try a different search or category."}
              </p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
