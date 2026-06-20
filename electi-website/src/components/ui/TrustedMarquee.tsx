import {
  Building2, BarChart3, Scale, Briefcase, Zap,
  Globe, Users, Shield, Landmark, Coffee, ShoppingBag, Activity,
} from "lucide-react";

const LOGOS = [
  { icon: Building2,   name: "Al-Rashidi Group"    },
  { icon: BarChart3,   name: "Gulf Finance Corp"    },
  { icon: Scale,       name: "Legal Partners KSA"  },
  { icon: Briefcase,   name: "Apex Consulting"      },
  { icon: Zap,         name: "NovaTech Arabia"      },
  { icon: Globe,       name: "Meridian Ventures"    },
  { icon: Users,       name: "Talent Bridge"        },
  { icon: Shield,      name: "SecureAI Corp"        },
  { icon: Landmark,    name: "Eastern Capital"      },
  { icon: Coffee,      name: "Grand Hospitality"    },
  { icon: ShoppingBag, name: "Riyadh Retail Co."    },
  { icon: Activity,    name: "AlFahad Industries"   },
];

const DOUBLED = [...LOGOS, ...LOGOS];

export default function TrustedMarquee() {
  return (
    <div className="py-14 relative overflow-hidden">
      {/* Marquee track */}
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 pointer-events-none z-10"
          style={{ background: "linear-gradient(to right, #000000 0%, transparent 100%)" }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 pointer-events-none z-10"
          style={{ background: "linear-gradient(to left, #000000 0%, transparent 100%)" }}
        />

        <div
          className="inline-flex"
          style={{ animation: "marquee-scroll 48s linear infinite" }}
        >
          {DOUBLED.map(({ icon: Icon, name }, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-3 mx-10 sm:mx-14 group cursor-default select-none flex-shrink-0"
              style={{ transition: "all 0.3s ease" }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  transition: "all 0.3s ease",
                }}
              >
                <Icon
                  style={{
                    width: 17,
                    height: 17,
                    color: "rgba(255,255,255,0.28)",
                    transition: "color 0.3s ease",
                  }}
                  className="group-hover:text-white/80"
                />
              </div>
              <span
                className="text-sm sm:text-[15px] font-500 whitespace-nowrap group-hover:text-white/75 transition-colors duration-300"
                style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.03em" }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle ambient glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 80,
          background: "radial-gradient(ellipse, rgba(255,255,255,0.025) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
