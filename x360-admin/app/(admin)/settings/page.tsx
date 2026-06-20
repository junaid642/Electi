"use client";
import { useState } from "react";
import { Settings, Shield, Users, Bell, Zap, Globe, Key, ChevronRight } from "lucide-react";

const SECTIONS = [
  { id: "company",       label: "Company",          icon: Settings },
  { id: "team",          label: "Team & Roles",      icon: Users    },
  { id: "notifications", label: "Notifications",     icon: Bell     },
  { id: "security",      label: "Security",          icon: Shield   },
  { id: "integrations",  label: "Integrations",      icon: Zap      },
  { id: "language",      label: "Language & Region", icon: Globe    },
  { id: "api",           label: "API Keys",           icon: Key      },
];

const ROLES = [
  { name: "Super Admin",            users: 1,  perms: "Full access to all modules" },
  { name: "CEO",                    users: 1,  perms: "Read-only + Approvals" },
  { name: "Sales Manager",          users: 2,  perms: "CRM, Proposals, WhatsApp" },
  { name: "Business Dev Manager",   users: 1,  perms: "CRM, Proposals, Analytics" },
  { name: "Project Coordinator",    users: 2,  perms: "Projects, Construction" },
  { name: "Accounts Team",          users: 2,  perms: "Finance, Invoices" },
  { name: "HR Admin",               users: 1,  perms: "HR, Team Management" },
  { name: "Referral Partner",       users: 6,  perms: "Partner portal only" },
];

const INTEGRATIONS = [
  { name: "WhatsApp Cloud API",    status: "Connected",    color: "badge-green"   },
  { name: "OpenAI GPT-4o",        status: "Connected",    color: "badge-green"   },
  { name: "Google Workspace",     status: "Connected",    color: "badge-green"   },
  { name: "Stripe Payments",      status: "Connected",    color: "badge-green"   },
  { name: "n8n Automation",       status: "Pending",      color: "badge-amber"   },
  { name: "Supabase Storage",     status: "Connected",    color: "badge-green"   },
  { name: "Zoho Sign",            status: "Disconnected", color: "badge-white"   },
  { name: "SendGrid Email",       status: "Connected",    color: "badge-green"   },
];

export default function SettingsPage() {
  const [active, setActive] = useState("company");

  return (
    <div className="flex gap-4 max-w-[1400px] h-[calc(100vh-140px)]">
      {/* Sidebar */}
      <div className="w-52 shrink-0 glass overflow-y-auto">
        <nav className="p-2 space-y-0.5">
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)} className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-500 transition-all ${active === s.id ? "bg-white/[0.08] text-white/88 border-l-2 border-white/60" : "text-white/42 hover:text-white/70 hover:bg-white/[0.04] border-l-2 border-transparent"}`}>
              <s.icon className={`w-3.5 h-3.5 shrink-0 ${active === s.id ? "text-white/80" : "text-white/35"}`} />
              {s.label}
              {active === s.id && <ChevronRight className="w-2.5 h-2.5 ml-auto text-white/30" />}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 glass overflow-y-auto p-5">
        {active === "company" && (
          <div className="space-y-6 max-w-xl">
            <div>
              <h3 className="text-[13px] font-700 text-white/80 font-display uppercase tracking-wide mb-4">Company Information</h3>
              <div className="space-y-3">
                {[
                  { label: "Company Name",  value: "X360 Business Solutions" },
                  { label: "Trade Name",    value: "X360" },
                  { label: "CR Number",     value: "1010XXXXXXX" },
                  { label: "VAT Number",    value: "3XXXXXXXXXXX003" },
                  { label: "Email",         value: "admin@x-360.ai" },
                  { label: "Phone",         value: "+966 11 XXX XXXX" },
                  { label: "Address",       value: "Riyadh, Saudi Arabia" },
                ].map(f => (
                  <div key={f.label} className="grid grid-cols-3 gap-3 items-center">
                    <label className="text-[11px] text-white/40 col-span-1">{f.label}</label>
                    <div className="glass-sm px-3 py-2 col-span-2">
                      <input defaultValue={f.value} className="bg-transparent text-[12px] text-white/70 outline-none w-full" />
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-5 glass-sm px-4 py-2 text-[11px] font-600 text-white/65 hover:text-white/85 hover:bg-white/[0.06] transition-colors">Save Changes</button>
            </div>
          </div>
        )}

        {active === "team" && (
          <div className="space-y-4 max-w-2xl">
            <h3 className="text-[13px] font-700 text-white/80 font-display uppercase tracking-wide">User Roles & Permissions</h3>
            <div className="space-y-2">
              {ROLES.map(r => (
                <div key={r.name} className="glass-sm p-3 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                    <Users className="w-3.5 h-3.5 text-white/40" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-600 text-white/75">{r.name}</p>
                    <p className="text-[10px] text-white/35">{r.perms}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="badge badge-white">{r.users} user{r.users !== 1 ? "s" : ""}</span>
                    <button className="glass-sm px-2 py-1 text-[9px] text-white/40 hover:text-white/65 transition-colors">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === "integrations" && (
          <div className="space-y-4 max-w-xl">
            <h3 className="text-[13px] font-700 text-white/80 font-display uppercase tracking-wide">Third-Party Integrations</h3>
            <div className="space-y-2">
              {INTEGRATIONS.map(int => (
                <div key={int.name} className="glass-sm p-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                      <Zap className="w-3.5 h-3.5 text-white/40" />
                    </div>
                    <p className="text-[11px] font-500 text-white/72">{int.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`badge ${int.color}`}>{int.status}</span>
                    <button className="glass-sm px-2 py-1 text-[9px] text-white/40 hover:text-white/65 transition-colors">
                      {int.status === "Connected" ? "Configure" : "Connect"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === "security" && (
          <div className="space-y-4 max-w-xl">
            <h3 className="text-[13px] font-700 text-white/80 font-display uppercase tracking-wide">Security Settings</h3>
            <div className="space-y-3">
              {[
                { label: "Two-Factor Authentication",  desc: "Require 2FA for all admin users",    enabled: true  },
                { label: "Session Timeout",             desc: "Auto logout after 30 minutes",       enabled: true  },
                { label: "IP Allowlisting",             desc: "Restrict access to approved IPs",    enabled: false },
                { label: "Audit Logs",                  desc: "Log all user actions",               enabled: true  },
                { label: "Device Tracking",             desc: "Track and manage logged-in devices", enabled: true  },
              ].map(s => (
                <div key={s.label} className="glass-sm p-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-500 text-white/72">{s.label}</p>
                    <p className="text-[10px] text-white/35">{s.desc}</p>
                  </div>
                  <div className={`w-10 h-5 rounded-full transition-colors cursor-pointer flex items-center px-0.5 ${s.enabled ? "bg-green-500/50" : "bg-white/[0.1]"}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${s.enabled ? "translate-x-5" : "translate-x-0"}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === "api" && (
          <div className="space-y-4 max-w-xl">
            <h3 className="text-[13px] font-700 text-white/80 font-display uppercase tracking-wide">API Keys</h3>
            <div className="space-y-2.5">
              {[
                { name: "Production API Key",    key: "x360_prod_••••••••••••••••••••••", created: "2025-01-01", last: "2 min ago" },
                { name: "Development API Key",   key: "x360_dev_•••••••••••••••••••••••", created: "2024-12-01", last: "1 day ago" },
                { name: "WhatsApp Webhook Key",  key: "x360_wh_••••••••••••••••••••••••", created: "2024-11-15", last: "5 min ago" },
              ].map(k => (
                <div key={k.name} className="glass-sm p-3">
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <p className="text-[11px] font-600 text-white/72">{k.name}</p>
                    <div className="flex gap-1.5">
                      <button className="glass-sm px-2 py-1 text-[9px] text-white/40 hover:text-white/65 transition-colors">Reveal</button>
                      <button className="glass-sm px-2 py-1 text-[9px] text-red-400/60 hover:text-red-400 transition-colors">Revoke</button>
                    </div>
                  </div>
                  <p className="text-[10px] font-mono text-white/35 bg-white/[0.03] px-2 py-1 rounded">{k.key}</p>
                  <p className="text-[9px] text-white/22 mt-1.5">Created {k.created} · Last used {k.last}</p>
                </div>
              ))}
            </div>
            <button className="glass-sm px-4 py-2 text-[11px] text-white/50 hover:text-white/75 hover:bg-white/[0.06] transition-colors flex items-center gap-1.5">
              <Key className="w-3 h-3" /> Generate New Key
            </button>
          </div>
        )}

        {!["company","team","integrations","security","api"].includes(active) && (
          <div className="flex items-center justify-center h-48">
            <p className="text-[12px] text-white/25">Settings panel coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}
