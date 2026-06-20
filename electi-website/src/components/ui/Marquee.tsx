const items = [
  "AI AGENTS",
  "PERSONAL ASSISTANT",
  "BILLING AUTOMATION",
  "LEGAL GUIDANCE",
  "SALES AUTOMATION",
  "WHATSAPP INTEGRATION",
  "AI WORKFORCE",
  "SMART REMINDERS",
  "OCR SCANNING",
  "CRM WORKFLOWS",
  "24/7 OPERATION",
  "ENTERPRISE READY",
];

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
}

export default function Marquee({ className = "", reverse = false }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap select-none ${className}`}>
      <div
        className="inline-flex"
        style={{
          animation: `marquee-scroll ${reverse ? "25s" : "35s"} linear infinite ${reverse ? "reverse" : "normal"}`,
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 mx-8 sm:mx-12">
            <span className="text-[11px] sm:text-xs font-600 tracking-[0.3em] text-white/22 uppercase">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
