"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface Service {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
}

const SERVICES: Service[] = [
  {
    id: "custom-code",
    name: "Custom Code Development",
    subtitle: "Built from scratch",
    description:
      "Bespoke software engineered to your exact specifications — scalable, maintainable, and future-proof.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800",
    tag: "Engineering",
  },
  {
    id: "web-dev",
    name: "Website Development",
    subtitle: "High-conversion web presence",
    description:
      "Visually stunning, AI-enhanced websites optimised for speed, SEO, and conversions in Saudi markets.",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800",
    tag: "Web",
  },
  {
    id: "app-dev",
    name: "Application Development",
    subtitle: "Web & native apps",
    description:
      "Full-stack web applications and native mobile apps — beautifully designed and reliably built.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800",
    tag: "Mobile & Web",
  },
  {
    id: "erp",
    name: "ERP / SAP Systems",
    subtitle: "Enterprise operations, unified",
    description:
      "End-to-end ERP and SAP implementations that unify finance, HR, procurement, and supply chain.",
    image:
      "https://images.unsplash.com/photo-1551288049-bbda38a10ad5?q=80&w=800",
    tag: "Enterprise",
  },
  {
    id: "ai-automation",
    name: "AI & Automation",
    subtitle: "Intelligent workflows",
    description:
      "AI chatbots, smart automation pipelines, and predictive analytics that run your business around the clock.",
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=800",
    tag: "AI",
  },
  {
    id: "crm",
    name: "CRM & Sales Tools",
    subtitle: "Grow customer relationships",
    description:
      "Customised CRM platforms and sales automation tools that close more deals and retain more customers.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
    tag: "CRM",
  },
];

/* staggered 3-column grid layout */
const col1 = SERVICES.filter((_, i) => i % 3 === 0);
const col2 = SERVICES.filter((_, i) => i % 3 === 1);
const col3 = SERVICES.filter((_, i) => i % 3 === 2);

export default function AiServicesShowcase() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ── LEFT: staggered photo grid ── */}
      <div className="flex gap-2.5 sm:gap-3 flex-shrink-0 overflow-x-auto pb-1 lg:pb-0">
        {/* Column 1 */}
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {col1.map((svc) => (
            <ServiceCard
              key={svc.id}
              service={svc}
              className="w-[100px] h-[115px] sm:w-[120px] sm:h-[135px] lg:w-[145px] lg:h-[162px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 2 — offset down */}
        <div className="flex flex-col gap-2.5 sm:gap-3 mt-[44px] sm:mt-[52px] lg:mt-[64px]">
          {col2.map((svc) => (
            <ServiceCard
              key={svc.id}
              service={svc}
              className="w-[112px] h-[128px] sm:w-[134px] sm:h-[150px] lg:w-[160px] lg:h-[178px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 3 — mid offset */}
        <div className="flex flex-col gap-2.5 sm:gap-3 mt-[20px] sm:mt-[24px] lg:mt-[30px]">
          {col3.map((svc) => (
            <ServiceCard
              key={svc.id}
              service={svc}
              className="w-[106px] h-[120px] sm:w-[126px] sm:h-[142px] lg:w-[152px] lg:h-[168px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* ── RIGHT: service list ── */}
      <div className="flex flex-col gap-1 flex-1 w-full pt-0 lg:pt-2">
        {SERVICES.map((svc, i) => (
          <ServiceRow
            key={svc.id}
            service={svc}
            index={i}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Image card ── */
function ServiceCard({
  service,
  className,
  hoveredId,
  onHover,
}: {
  service: Service;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === service.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={`overflow-hidden rounded-xl cursor-pointer flex-shrink-0 transition-opacity duration-300 ${className} ${isDimmed ? "opacity-40" : "opacity-100"}`}
      style={{ border: "1px solid rgba(255,255,255,0.07)" }}
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
    >
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-full object-cover transition-all duration-500"
        style={{
          filter: isActive
            ? "grayscale(0%) brightness(0.85)"
            : "grayscale(80%) brightness(0.45)",
        }}
      />
    </div>
  );
}

/* ── Row in the right list ── */
function ServiceRow({
  service,
  index,
  hoveredId,
  onHover,
}: {
  service: Service;
  index: number;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === service.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={`cursor-pointer transition-all duration-300 group py-4 ${isDimmed ? "opacity-35" : "opacity-100"}`}
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-start gap-3.5">
        {/* animated indicator bar */}
        <div className="flex flex-col items-center gap-1 pt-1 flex-shrink-0">
          <div
            className="rounded-full transition-all duration-400"
            style={{
              width: isActive ? 20 : 14,
              height: 5,
              background: isActive
                ? "rgba(255,255,255,0.85)"
                : "rgba(255,255,255,0.18)",
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="text-[15px] sm:text-base lg:text-[17px] font-semibold leading-tight transition-colors duration-300"
              style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.72)" }}
            >
              {service.name}
            </span>
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.18em] px-2.5 py-0.5 rounded-full transition-all duration-300"
              style={{
                background: isActive
                  ? "rgba(255,255,255,0.12)"
                  : "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: isActive ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)",
              }}
            >
              {service.tag}
            </span>
          </div>

          <div
            className="overflow-hidden transition-all duration-400"
            style={{ maxHeight: isActive ? 80 : 0 }}
          >
            <p
              className="text-[12px] sm:text-[13px] leading-relaxed mt-2 pr-4"
              style={{ color: "rgba(255,255,255,0.42)" }}
            >
              {service.description}
            </p>
          </div>

          {/* subtitle always visible */}
          {!isActive && (
            <p
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] mt-1.5 font-medium transition-colors duration-300"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              {service.subtitle}
            </p>
          )}
        </div>

        {/* arrow icon */}
        <ArrowRight
          className="flex-shrink-0 mt-0.5 transition-all duration-300"
          style={{
            width: 15,
            height: 15,
            color: isActive ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.12)",
            transform: isActive ? "translateX(2px)" : "translateX(0)",
          }}
        />
      </div>
    </div>
  );
}
