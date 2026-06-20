import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Calculator, TrendingUp, ArrowRight, Phone, Headphones, TrendingDown } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/seo/SEOHead";
import { useLang } from "@/contexts/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as const;
const GRID_BG = {
  backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
  backgroundSize: "72px 72px",
};

type CalcKey = "receptionist" | "sales" | "support";

const CALCULATORS: {
  key: CalcKey; label: string; labelAr: string; icon: React.ComponentType<{ className?: string }>;
  inputs: { key: string; label: string; labelAr: string; min: number; max: number; step: number; default: number; unit: string; unitAr: string }[];
  compute: (vals: Record<string, number>) => { label: string; labelAr: string; value: string; sub?: string; subAr?: string }[];
}[] = [
  {
    key: "receptionist", label: "AI Receptionist", labelAr: "المستقبل الذكي", icon: Phone,
    inputs: [
      { key: "calls", label: "Daily Inbound Calls", labelAr: "المكالمات الواردة اليومياً", min: 10, max: 1000, step: 10, default: 100, unit: "calls/day", unitAr: "مكالمة/يوم" },
      { key: "staff", label: "Receptionist Staff", labelAr: "موظفو الاستقبال", min: 1, max: 20, step: 1, default: 2, unit: "people", unitAr: "موظف" },
      { key: "salary", label: "Monthly Salary per Staff (SAR)", labelAr: "الراتب الشهري للموظف (ريال)", min: 3000, max: 20000, step: 500, default: 6000, unit: "SAR/month", unitAr: "ريال/شهر" },
      { key: "missedRate", label: "Current Missed Call Rate", labelAr: "معدل المكالمات الفائتة الحالي", min: 0, max: 80, step: 5, default: 20, unit: "%", unitAr: "%" },
    ],
    compute: (v) => {
      const monthlyStaffCost = v.staff * v.salary;
      const aiMonthlyCost    = 2499;
      const monthlySaving    = monthlyStaffCost - aiMonthlyCost;
      const annualSaving     = monthlySaving * 12;
      const recoveredCalls   = Math.round(v.calls * 30 * (v.missedRate / 100));
      const roi              = Math.round((monthlySaving / aiMonthlyCost) * 100);
      return [
        { label: "Monthly Staff Cost", labelAr: "تكلفة الموظفين الشهرية", value: `SAR ${monthlyStaffCost.toLocaleString()}`, sub: "current spend", subAr: "الإنفاق الحالي" },
        { label: "Monthly AI Cost", labelAr: "تكلفة الذكاء الاصطناعي الشهرية", value: "SAR 2,499+", sub: "estimated", subAr: "تقديري" },
        { label: "Monthly Savings", labelAr: "الوفورات الشهرية", value: monthlySaving > 0 ? `SAR ${monthlySaving.toLocaleString()}` : "Contact us", sub: "est. reduction", subAr: "التخفيض التقديري" },
        { label: "Recovered Calls/Month", labelAr: "مكالمات مستردة/شهر", value: recoveredCalls.toLocaleString(), sub: "no more missed leads", subAr: "لا عملاء ضائعون" },
        { label: "Annual Savings", labelAr: "الوفورات السنوية", value: annualSaving > 0 ? `SAR ${annualSaving.toLocaleString()}` : "Enquire", sub: "projected", subAr: "متوقع" },
        { label: "ROI", labelAr: "العائد على الاستثمار", value: roi > 0 ? `${roi}%` : "High", sub: "vs. staff cost", subAr: "مقارنةً بتكلفة الموظفين" },
      ];
    },
  },
  {
    key: "sales", label: "AI Sales Agent", labelAr: "وكيل المبيعات الذكي", icon: TrendingUp,
    inputs: [
      { key: "leads", label: "Monthly Inbound Leads", labelAr: "العملاء المحتملون الشهريون", min: 10, max: 5000, step: 10, default: 200, unit: "leads/month", unitAr: "عميل/شهر" },
      { key: "convRate", label: "Current Conversion Rate", labelAr: "معدل التحويل الحالي", min: 1, max: 50, step: 1, default: 5, unit: "%", unitAr: "%" },
      { key: "dealValue", label: "Average Deal Value (SAR)", labelAr: "متوسط قيمة الصفقة (ريال)", min: 1000, max: 500000, step: 1000, default: 15000, unit: "SAR", unitAr: "ريال" },
      { key: "reps", label: "Sales Reps", labelAr: "مندوبو المبيعات", min: 1, max: 50, step: 1, default: 3, unit: "people", unitAr: "موظف" },
    ],
    compute: (v) => {
      const currentDeals       = Math.round(v.leads * (v.convRate / 100));
      const improvedConvRate   = Math.min(v.convRate * 3, 50);
      const improvedDeals      = Math.round(v.leads * (improvedConvRate / 100));
      const additionalDeals    = improvedDeals - currentDeals;
      const additionalRevenue  = additionalDeals * v.dealValue;
      const repsSaved          = Math.round(v.reps * 0.4);
      const aiMonthlyCost      = 3499;
      const roi                = Math.round((additionalRevenue / aiMonthlyCost) * 100);
      return [
        { label: "Current Monthly Deals", labelAr: "الصفقات الشهرية الحالية", value: currentDeals.toLocaleString(), sub: `at ${v.convRate}% conversion`, subAr: `بمعدل تحويل ${v.convRate}%` },
        { label: "Projected Deals with AI", labelAr: "الصفقات المتوقعة مع الذكاء الاصطناعي", value: improvedDeals.toLocaleString(), sub: `at ~${improvedConvRate.toFixed(0)}% conversion`, subAr: `بمعدل تحويل ~${improvedConvRate.toFixed(0)}%` },
        { label: "Additional Deals/Month", labelAr: "صفقات إضافية/شهر", value: `+${additionalDeals}`, sub: "from faster follow-up", subAr: "من المتابعة الأسرع" },
        { label: "Additional Revenue/Month", labelAr: "إيرادات إضافية/شهر", value: `SAR ${additionalRevenue.toLocaleString()}`, sub: "projected", subAr: "متوقع" },
        { label: "Reps Freed for High-Value Work", labelAr: "مندوبون محررون للعمل عالي القيمة", value: `${repsSaved} reps`, sub: "focus on closing", subAr: "التركيز على الإغلاق" },
        { label: "ROI", labelAr: "العائد على الاستثمار", value: roi > 0 ? `${roi}%` : "High", sub: "additional revenue vs AI cost", subAr: "إيرادات إضافية مقابل تكلفة الذكاء الاصطناعي" },
      ];
    },
  },
  {
    key: "support", label: "AI Customer Support", labelAr: "دعم العملاء الذكي", icon: Headphones,
    inputs: [
      { key: "tickets", label: "Monthly Support Tickets", labelAr: "تذاكر الدعم الشهرية", min: 50, max: 50000, step: 50, default: 1000, unit: "tickets/month", unitAr: "تذكرة/شهر" },
      { key: "agents", label: "Support Agents", labelAr: "موظفو الدعم", min: 1, max: 100, step: 1, default: 5, unit: "people", unitAr: "موظف" },
      { key: "salary", label: "Monthly Agent Salary (SAR)", labelAr: "الراتب الشهري للموظف (ريال)", min: 3000, max: 15000, step: 500, default: 5000, unit: "SAR/month", unitAr: "ريال/شهر" },
      { key: "handleTime", label: "Avg Handle Time per Ticket", labelAr: "متوسط وقت معالجة التذكرة", min: 2, max: 60, step: 1, default: 15, unit: "minutes", unitAr: "دقيقة" },
    ],
    compute: (v) => {
      const currentCost       = v.agents * v.salary;
      const autoResolved      = Math.round(v.tickets * 0.8);
      const humanTickets      = v.tickets - autoResolved;
      const agentsNeeded      = Math.max(1, Math.ceil(humanTickets / (v.agents > 0 ? (v.tickets / v.agents) : 200)));
      const newCost           = agentsNeeded * v.salary + 2999;
      const monthlySaving     = currentCost - newCost;
      const hoursaved         = Math.round((autoResolved * v.handleTime) / 60);
      const csat              = "4.8★";
      return [
        { label: "Tickets Auto-Resolved", labelAr: "تذاكر محلولة تلقائياً", value: `${autoResolved.toLocaleString()} (80%)`, sub: "without human touch", subAr: "بدون تدخل بشري" },
        { label: "Current Support Cost", labelAr: "تكلفة الدعم الحالية", value: `SAR ${currentCost.toLocaleString()}/mo`, sub: "staff salaries", subAr: "رواتب الموظفين" },
        { label: "New Monthly Cost", labelAr: "التكلفة الشهرية الجديدة", value: `SAR ${newCost.toLocaleString()}/mo`, sub: "AI + lean team", subAr: "ذكاء اصطناعي + فريق مصغّر" },
        { label: "Monthly Savings", labelAr: "الوفورات الشهرية", value: monthlySaving > 0 ? `SAR ${monthlySaving.toLocaleString()}` : "Enquire", sub: "est. reduction", subAr: "التخفيض التقديري" },
        { label: "Agent Hours Saved/Month", labelAr: "ساعات الموظفين الموفّرة/شهر", value: `${hoursaved.toLocaleString()} hrs`, sub: "redirected to complex cases", subAr: "إعادة توجيه للحالات المعقدة" },
        { label: "Projected CSAT Score", labelAr: "نقاط رضا العملاء المتوقعة", value: csat, sub: "from faster resolution", subAr: "من الحل الأسرع" },
      ];
    },
  },
];

export default function ROICalculatorPage() {
  const { isAr } = useLang();
  const scrollRef     = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);
  const [navHidden,   setNavHidden]   = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeCalc, setActiveCalc]  = useState<CalcKey>("receptionist");
  const calc = CALCULATORS.find((c) => c.key === activeCalc)!;
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(calc.inputs.map((i) => [i.key, i.default]))
  );

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

  function switchCalc(key: CalcKey) {
    const c = CALCULATORS.find((c) => c.key === key)!;
    setActiveCalc(key);
    setValues(Object.fromEntries(c.inputs.map((i) => [i.key, i.default])));
  }

  const results = calc.compute(values);

  return (
    <div ref={scrollRef} className="bg-[#050505] text-white" dir={isAr ? "rtl" : "ltr"}
      style={{ height: "100dvh", overflowY: "scroll", overflowX: "hidden", scrollSnapType: "y mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}>
      <style>{`div::-webkit-scrollbar{display:none}`}</style>
      <SEOHead
        title={isAr ? "حاسبة العائد على الاستثمار للذكاء الاصطناعي | Electi" : "AI ROI Calculator Saudi Arabia | Electi"}
        description={isAr ? "احسب وفورات الذكاء الاصطناعي وعائد الاستثمار لعملك السعودي. حاسبات تفاعلية للمستقبل الذكي ووكيل المبيعات ودعم العملاء." : "Calculate your AI cost savings and ROI for your Saudi business. Interactive calculators for AI Receptionist, Sales Agent, and Customer Support."}
        path="/roi-calculator"
      />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      {/* ══ HERO ══ */}
      <section className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "100dvh", scrollSnapAlign: "start", padding: "96px 1rem 48px" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={GRID_BG} />
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}
          className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/12 text-[11px] font-600 text-white/55 mb-6"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <Calculator className="w-3 h-3" />
            {isAr ? "حاسبة العائد على الاستثمار" : "ROI Calculator"}
          </div>
          <h1 className="font-700 leading-tight mb-5" style={{ fontSize: "clamp(2.4rem,5vw,4rem)" }}>
            {isAr ? (
              <>احسب <span style={{ color: "rgba(255,255,255,0.45)" }}>توفيرك مع الذكاء الاصطناعي</span></>
            ) : (
              <>Calculate Your <span style={{ color: "rgba(255,255,255,0.45)" }}>AI Savings</span></>
            )}
          </h1>
          <p className="text-white/38 text-base mb-10 max-w-xl mx-auto leading-relaxed">
            {isAr
              ? "أدخل أرقام عملك الحالية وشاهد كيف يمكن للذكاء الاصطناعي تحويل تكاليفك وإيراداتك."
              : "Enter your current business numbers and see how AI can transform your costs and revenue."}
          </p>

          {/* Calculator tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {CALCULATORS.map((c) => {
              const Icon = c.icon;
              return (
                <button key={c.key} onClick={() => switchCalc(c.key)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-600 transition-all"
                  style={{
                    background: activeCalc === c.key ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)",
                    borderColor: activeCalc === c.key ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)",
                    color: activeCalc === c.key ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.38)",
                  }}>
                  <Icon className="w-4 h-4" />
                  {isAr ? c.labelAr : c.label}
                </button>
              );
            })}
          </div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </section>

      {/* ══ CALCULATOR ══ */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 min-h-screen" style={{ scrollSnapAlign: "start" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div key={activeCalc} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* Inputs */}
            <div className="space-y-6 p-7 rounded-3xl border border-white/8" style={{ background: "rgba(255,255,255,0.02)" }}>
              <h3 className="text-lg font-700 text-white/80 mb-6">
                {isAr ? "أدخل أرقام عملك" : "Enter Your Business Numbers"}
              </h3>
              {calc.inputs.map((input) => (
                <div key={input.key}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white/50 text-xs font-600">{isAr ? input.labelAr : input.label}</label>
                    <span className="text-white/70 text-sm font-700">
                      {values[input.key].toLocaleString()} <span className="text-white/30 font-400 text-xs">{isAr ? input.unitAr : input.unit}</span>
                    </span>
                  </div>
                  <input type="range" min={input.min} max={input.max} step={input.step} value={values[input.key]}
                    onChange={(e) => setValues({ ...values, [input.key]: Number(e.target.value) })}
                    className="w-full accent-white h-1 rounded-full bg-white/10 cursor-pointer" />
                  <div className="flex justify-between mt-1">
                    <span className="text-white/18 text-[10px]">{input.min.toLocaleString()}</span>
                    <span className="text-white/18 text-[10px]">{input.max.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Results */}
            <div>
              <h3 className="text-lg font-700 text-white/80 mb-6">
                {isAr ? "نتائجك التقديرية" : "Your Estimated Results"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {results.map((r, i) => (
                  <motion.div key={r.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.35 }}
                    className="p-5 rounded-2xl border border-white/8 hover:border-white/14 transition-all"
                    style={{ background: "rgba(255,255,255,0.02)" }}>
                    <div className="text-xl font-700 text-white mb-1">{r.value}</div>
                    <div className="text-white/55 text-xs font-600 mb-0.5">{isAr ? r.labelAr : r.label}</div>
                    {r.sub && <div className="text-white/25 text-[10px]">{isAr && r.subAr ? r.subAr : r.sub}</div>}
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl border border-white/6" style={{ background: "rgba(255,255,255,0.015)" }}>
                <div className="flex items-start gap-2">
                  <TrendingDown className="w-4 h-4 text-white/25 mt-0.5 flex-shrink-0" />
                  <p className="text-white/25 text-[11px] leading-relaxed">
                    {isAr
                      ? "هذه تقديرات إرشادية تستند إلى متوسطات الصناعة. تواصل مع فريقنا للحصول على تحليل ROI مخصص لعملك."
                      : "These are indicative estimates based on industry averages. Contact our team for a custom ROI analysis tailored to your specific business."}
                  </p>
                </div>
              </div>

              <Link href="/contact">
                <motion.button className="w-full mt-5 py-3.5 rounded-xl font-600 bg-white text-black flex items-center justify-center gap-2"
                  style={{ boxShadow: "0 0 24px rgba(255,255,255,0.18)" }}
                  whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }}>
                  {isAr ? "احصل على تحليل ROI مخصص" : "Get a Custom ROI Analysis"}
                  <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ scrollSnapAlign: "start" }}>
        <div className="py-16 px-4 text-center border-t border-white/5">
          <p className="text-white/25 text-sm mb-4">{isAr ? "جاهز للبدء؟" : "Ready to get started?"}</p>
          <div className="flex gap-3 justify-center">
            <Link href="/build-your-agent">
              <motion.button className="px-6 py-3 rounded-xl font-600 bg-white text-black text-sm"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                {isAr ? "ابنِ وكيلك" : "Build Your Agent"}
              </motion.button>
            </Link>
            <Link href="/marketplace">
              <motion.button className="px-6 py-3 rounded-xl font-600 border border-white/12 text-white/55 text-sm hover:text-white transition-all"
                style={{ background: "rgba(255,255,255,0.03)" }}
                whileHover={{ scale: 1.02 }}>
                {isAr ? "استكشف الوكلاء" : "Explore Agents"}
              </motion.button>
            </Link>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
