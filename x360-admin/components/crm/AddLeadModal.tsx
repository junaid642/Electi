"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building2, User, Phone, Mail, Globe, Linkedin, MapPin, FileText, Star, Flame, Zap, Crown, Users2, ChevronRight, ChevronLeft, Check } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import type { Lead, LeadStage, Priority } from "@/lib/types";

// ── Data ──────────────────────────────────────────────────────────────────────
const STAGES: LeadStage[] = ["Incoming Lead","Initial Contact","Qualified","Discovery Meeting","Demo Scheduled","Proposal Preparation","Proposal Sent","Client Review","Negotiation","Waiting for Approval","Legal / Procurement","Won","Lost","Follow-Up Later","Strategic Opportunity","Partnership Potential"];
const PRIORITIES: Priority[] = ["High","Medium","Low"];
const SALESPEOPLE = ["Ahmad S.","Sarah M.","Khalid O.","Fatima G.","Omar T.","Nadia K."];

const INDUSTRIES = ["Real Estate","Luxury Real Estate","Hospitality","Hotels","Resorts","Cafes","Restaurants","Construction","Engineering","Architecture","Interior Design","Government","Museums","Education","Schools","Universities","Healthcare","Hospitals","Clinics","Retail","Automotive","Supercar Showrooms","Industrial","Manufacturing","Oil & Gas","Energy","Solar","Smart Cities","Events","Exhibition","Tourism","Aviation","Private Jets","Yachts","Logistics","Warehousing","Sports","Fitness","Spa & Wellness","Co-working Spaces","Corporate Offices","Shopping Malls","Entertainment","Media Production","E-commerce","Technology","AI Companies","Startups","Enterprise Corporations","Telecom","Infrastructure","Religious & Heritage","Defense & Security"];

const SERVICES = ["360 Virtual Tours","Digital Twins","AR Experiences","VR Experiences","3D Visualization","Drone Documentation","Construction Monitoring","Interactive Maps","Real Estate Ecosystem","Website Development","AI Development","CRM Development","ERP Systems","Mobile App Development","SaaS Platform Development","Cybersecurity Services","SAP Services","Automation Systems","AI Chatbots","Property Management System","Lead Management System","Cloud Infrastructure","Custom Software Development","Business Intelligence Dashboards","Enterprise Portals","API Development","Branding & Media"];

const SOURCES = ["Google Search","Google Ads","SEO","Meta Ads","Facebook","Instagram","LinkedIn","TikTok","Snapchat","WhatsApp","Referral","Existing Client","Partner","Real Estate Broker","Exhibition/Event","Cold Calling","Email Campaign","Walk-In","Website Inquiry","QR Code","YouTube","Government Contact","Vendor Reference","Networking","Direct Contact","Saudi Connection / Wasta","Repeat Client"];

const COUNTRIES = ["KSA","UAE","Qatar","Kuwait","Bahrain","Oman","Turkey","Egypt","Jordan","UK","USA"];
const URGENCIES = ["Critical","High","Medium","Low"] as const;
const TEMPERATURES = ["Hot","Warm","Cold"] as const;

// ── Schema ────────────────────────────────────────────────────────────────────
const schema = z.object({
  company:     z.string().min(2, "Required"),
  contact:     z.string().min(2, "Required"),
  designation: z.string().min(1, "Required"),
  phone:       z.string().min(7, "Required"),
  whatsapp:    z.string().optional(),
  email:       z.string().email("Valid email required"),
  website:     z.string().optional(),
  linkedin:    z.string().optional(),
  address:     z.string().optional(),
  city:        z.string().min(1, "Required"),
  country:     z.string().min(1, "Required"),
  vat:         z.string().optional(),
  cr:          z.string().optional(),
  industry:    z.string().min(1, "Required"),
  source:      z.string().min(1, "Required"),
  stage:       z.string().min(1) as z.ZodType<LeadStage>,
  priority:    z.string().min(1) as z.ZodType<Priority>,
  assigned:    z.string().min(1, "Required"),
  score:       z.coerce.number().min(0).max(100),
  value:       z.coerce.number().min(0).optional(),
  urgency:     z.string().optional(),
  temperature: z.string().optional(),
  competitor:  z.string().optional(),
  branches:    z.coerce.number().min(0).optional(),
  expectedCloseDate: z.string().optional(),
  lastContact:  z.string().optional(),
  nextFollowUp: z.string().optional(),
  notes:        z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props { open: boolean; onClose: () => void; lead?: Lead | null; defaultStage?: LeadStage; }

const inputCls = "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[12px] text-white/80 placeholder-white/22 outline-none focus:border-white/20 focus:bg-white/[0.06] transition-colors";
const selectCls = inputCls + " cursor-pointer";

const Field = ({ label, error, icon: Icon, children }: { label: string; error?: string; icon?: React.ElementType; children: React.ReactNode }) => (
  <div>
    <label className="text-[9px] font-600 text-white/35 uppercase tracking-wide block mb-1 flex items-center gap-1">
      {Icon && <Icon className="w-2.5 h-2.5" />}{label}
    </label>
    {children}
    {error && <p className="text-[10px] text-red-400 mt-0.5">{error}</p>}
  </div>
);

const TABS = [
  { label: "Client Details",  icon: Building2 },
  { label: "Deal Setup",      icon: FileText  },
  { label: "Intelligence",    icon: Zap       },
  { label: "Notes",           icon: FileText  },
];

export default function AddLeadModal({ open, onClose, lead, defaultStage = "Incoming Lead" }: Props) {
  const { addLead, updateLead } = useStore();
  const { toast } = useToast();
  const isEdit = !!lead;
  const [tab, setTab] = useState(0);
  const [services, setServices] = useState<string[]>([]);
  const [vip, setVip] = useState(false);
  const [decisionMaker, setDecisionMaker] = useState(false);
  const [expansionPotential, setExpansionPotential] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      company: "", contact: "", designation: "", phone: "", whatsapp: "", email: "",
      website: "", linkedin: "", address: "", city: "", country: "KSA", vat: "", cr: "",
      industry: "Real Estate", source: "Website Inquiry",
      stage: defaultStage, priority: "Medium", assigned: "Ahmad S.",
      score: 50, value: 0, urgency: "Medium", temperature: "Warm",
      competitor: "", branches: 0, expectedCloseDate: "",
      lastContact: "", nextFollowUp: "", notes: "",
    },
  });

  useEffect(() => {
    if (open && lead) {
      reset({
        company: lead.company, contact: lead.contact, designation: lead.designation,
        phone: lead.phone, whatsapp: lead.whatsapp ?? "", email: lead.email,
        website: lead.website ?? "", linkedin: lead.linkedin ?? "",
        address: lead.address ?? "", city: lead.city, country: lead.country,
        vat: lead.vat ?? "", cr: lead.cr ?? "",
        industry: lead.industry, source: lead.source,
        stage: lead.stage, priority: lead.priority, assigned: lead.assigned,
        score: lead.score, value: lead.value,
        urgency: lead.urgency ?? "Medium", temperature: lead.temperature ?? "Warm",
        competitor: lead.competitor ?? "", branches: lead.branches ?? 0,
        expectedCloseDate: lead.expectedCloseDate ?? "",
        lastContact: lead.lastContact, nextFollowUp: lead.nextFollowUp, notes: lead.notes,
      });
      setServices(lead.services ?? []);
      setVip(lead.vip ?? false);
      setDecisionMaker(lead.decisionMakerIdentified ?? false);
      setExpansionPotential(lead.expansionPotential ?? false);
    } else if (open && !lead) {
      reset({ company: "", contact: "", designation: "", phone: "", whatsapp: "", email: "", website: "", linkedin: "", address: "", city: "", country: "KSA", vat: "", cr: "", industry: "Real Estate", source: "Website Inquiry", stage: defaultStage, priority: "Medium", assigned: "Ahmad S.", score: 50, value: 0, urgency: "Medium", temperature: "Warm", competitor: "", branches: 0, expectedCloseDate: "", lastContact: "", nextFollowUp: "", notes: "" });
      setServices([]); setVip(false); setDecisionMaker(false); setExpansionPotential(false);
    }
    setTab(0);
  }, [open, lead, defaultStage, reset]);

  const toggleService = (s: string) => setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const onSubmit = (data: FormData) => {
    const payload = {
      ...data,
      services,
      vip,
      decisionMakerIdentified: decisionMaker,
      expansionPotential,
      value: data.value ?? 0,
      urgency: data.urgency as "Critical" | "High" | "Medium" | "Low" | undefined,
      temperature: data.temperature as "Hot" | "Warm" | "Cold" | undefined,
      lastContact: data.lastContact ?? "",
      nextFollowUp: data.nextFollowUp ?? "",
      notes: data.notes ?? "",
    };
    if (isEdit && lead) {
      updateLead(lead.id, payload);
      toast("Lead updated successfully");
    } else {
      addLead(payload);
      toast("Lead created successfully");
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? "Edit Lead" : "Add New Lead"} subtitle={isEdit ? lead?.company : "Enterprise lead intelligence form"} size="xl">
      {/* Tab Bar */}
      <div className="flex border-b border-white/[0.05] px-5 pt-1">
        {TABS.map((t, i) => {
          const Icon = t.icon;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setTab(i)}
              className={`flex items-center gap-1.5 px-3 py-2 text-[10px] font-600 uppercase tracking-wide border-b-2 transition-all -mb-px ${tab === i ? "border-white/60 text-white/80" : "border-transparent text-white/30 hover:text-white/55"}`}
            >
              <Icon className="w-3 h-3" />{t.label}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-5 space-y-3 min-h-[380px]">

          {/* ── TAB 0: Client Details ─────────────────────────────────────── */}
          {tab === 0 && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Company Name *" error={errors.company?.message} icon={Building2}>
                  <input {...register("company")} className={inputCls} placeholder="Saudi Aramco" />
                </Field>
                <Field label="Contact Person *" error={errors.contact?.message} icon={User}>
                  <input {...register("contact")} className={inputCls} placeholder="Mohammed Al-Rashid" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Designation *" error={errors.designation?.message}>
                  <input {...register("designation")} className={inputCls} placeholder="VP Operations" />
                </Field>
                <Field label="Email *" error={errors.email?.message} icon={Mail}>
                  <input {...register("email")} className={inputCls} placeholder="name@company.com" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Phone *" error={errors.phone?.message} icon={Phone}>
                  <input {...register("phone")} className={inputCls} placeholder="+966 50 123 4567" />
                </Field>
                <Field label="WhatsApp" icon={Phone}>
                  <input {...register("whatsapp")} className={inputCls} placeholder="+966 50 123 4567" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Company Website" icon={Globe}>
                  <input {...register("website")} className={inputCls} placeholder="company.com" />
                </Field>
                <Field label="LinkedIn Profile" icon={Linkedin}>
                  <input {...register("linkedin")} className={inputCls} placeholder="linkedin.com/in/name" />
                </Field>
              </div>
              <Field label="Office Address" icon={MapPin}>
                <input {...register("address")} className={inputCls} placeholder="King Fahd Rd, Al Olaya District" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="City *" error={errors.city?.message}>
                  <input {...register("city")} className={inputCls} placeholder="Riyadh" />
                </Field>
                <Field label="Country *" error={errors.country?.message}>
                  <select {...register("country")} className={selectCls}>
                    {COUNTRIES.map(c => <option key={c} value={c} className="bg-[#0a0a0a]">{c}</option>)}
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="VAT Number">
                  <input {...register("vat")} className={inputCls} placeholder="300XXXXXXXXX" />
                </Field>
                <Field label="Commercial Reg. (CR)">
                  <input {...register("cr")} className={inputCls} placeholder="1010XXXXXX" />
                </Field>
              </div>
            </>
          )}

          {/* ── TAB 1: Deal Setup ─────────────────────────────────────────── */}
          {tab === 1 && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Industry *" error={errors.industry?.message}>
                  <select {...register("industry")} className={selectCls}>
                    {INDUSTRIES.map(i => <option key={i} value={i} className="bg-[#0a0a0a]">{i}</option>)}
                  </select>
                </Field>
                <Field label="Lead Source *" error={errors.source?.message}>
                  <select {...register("source")} className={selectCls}>
                    {SOURCES.map(s => <option key={s} value={s} className="bg-[#0a0a0a]">{s}</option>)}
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Pipeline Stage *" error={errors.stage?.message}>
                  <select {...register("stage")} className={selectCls}>
                    {STAGES.map(s => <option key={s} value={s} className="bg-[#0a0a0a]">{s}</option>)}
                  </select>
                </Field>
                <Field label="Priority *" error={errors.priority?.message}>
                  <select {...register("priority")} className={selectCls}>
                    {PRIORITIES.map(p => <option key={p} value={p} className="bg-[#0a0a0a]">{p}</option>)}
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Assigned To *" error={errors.assigned?.message}>
                  <select {...register("assigned")} className={selectCls}>
                    {SALESPEOPLE.map(s => <option key={s} value={s} className="bg-[#0a0a0a]">{s}</option>)}
                  </select>
                </Field>
                <Field label="Estimated Deal Value (SAR)">
                  <input {...register("value")} type="number" min="0" className={inputCls} placeholder="500000" />
                </Field>
              </div>
              <Field label="Lead Score (0–100)" error={errors.score?.message}>
                <input {...register("score")} type="number" min="0" max="100" className={inputCls} />
              </Field>

              {/* Services Multi-select */}
              <div>
                <label className="text-[9px] font-600 text-white/35 uppercase tracking-wide block mb-2">Service Requirements ({services.length} selected)</label>
                <div className="grid grid-cols-2 gap-1 max-h-48 overflow-y-auto pr-1">
                  {SERVICES.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleService(s)}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[10px] text-left transition-all border ${services.includes(s) ? "bg-white/[0.08] border-white/25 text-white/80" : "bg-white/[0.02] border-white/[0.05] text-white/40 hover:border-white/15 hover:text-white/60"}`}
                    >
                      <div className={`w-3 h-3 rounded flex items-center justify-center shrink-0 ${services.includes(s) ? "bg-white/30" : "bg-white/[0.05]"}`}>
                        {services.includes(s) && <Check className="w-2 h-2 text-white" />}
                      </div>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── TAB 2: Intelligence ───────────────────────────────────────── */}
          {tab === 2 && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Urgency Level" icon={Zap}>
                  <select {...register("urgency")} className={selectCls}>
                    {URGENCIES.map(u => <option key={u} value={u} className="bg-[#0a0a0a]">{u}</option>)}
                  </select>
                </Field>
                <Field label="Lead Temperature" icon={Flame}>
                  <select {...register("temperature")} className={selectCls}>
                    {TEMPERATURES.map(t => <option key={t} value={t} className="bg-[#0a0a0a]">{t}</option>)}
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Competitor Involved">
                  <input {...register("competitor")} className={inputCls} placeholder="SAP, Oracle, etc." />
                </Field>
                <Field label="No. of Branches / Projects" icon={Users2}>
                  <input {...register("branches")} type="number" min="0" className={inputCls} placeholder="5" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Last Contact Date">
                  <input {...register("lastContact")} type="date" className={inputCls} />
                </Field>
                <Field label="Expected Close Date">
                  <input {...register("expectedCloseDate")} type="date" className={inputCls} />
                </Field>
              </div>
              <Field label="Next Follow-Up">
                <input {...register("nextFollowUp")} type="date" className={inputCls} />
              </Field>

              {/* Toggle flags */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                {[
                  { label: "VIP Status",    icon: Crown, value: vip,               set: setVip,               active: "bg-amber-500/20 border-amber-500/40 text-amber-300" },
                  { label: "Decision Maker Identified", icon: Star, value: decisionMaker, set: setDecisionMaker, active: "bg-green-500/20 border-green-500/40 text-green-300" },
                  { label: "Expansion Potential", icon: ChevronRight, value: expansionPotential, set: setExpansionPotential, active: "bg-blue-500/20 border-blue-500/40 text-blue-300" },
                ].map(({ label, icon: Icon, value, set, active }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => set(!value)}
                    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-[9px] font-600 uppercase tracking-wide transition-all ${value ? active : "bg-white/[0.02] border-white/[0.08] text-white/35 hover:border-white/15"}`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                    <div className={`w-6 h-3 rounded-full relative transition-all ${value ? "bg-white/40" : "bg-white/10"}`}>
                      <div className={`absolute top-0.5 w-2 h-2 rounded-full bg-white transition-all ${value ? "left-3.5" : "left-0.5"}`} />
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ── TAB 3: Notes ──────────────────────────────────────────────── */}
          {tab === 3 && (
            <Field label="Internal Notes">
              <textarea
                {...register("notes")}
                className={inputCls + " resize-none h-56"}
                placeholder="Key context about this lead — budget size, decision timeline, stakeholders, competitive landscape, relationship strength…"
              />
            </Field>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-5 pb-4 pt-3 border-t border-white/[0.05]">
          <div className="flex gap-1">
            {TABS.map((_, i) => (
              <button key={i} type="button" onClick={() => setTab(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${tab === i ? "bg-white/70 w-4" : "bg-white/20"}`} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            {tab > 0 && (
              <button type="button" onClick={() => setTab(t => t - 1)} className="px-3 py-1.5 text-[11px] text-white/45 hover:text-white/70 glass-sm rounded-lg flex items-center gap-1 transition-colors">
                <ChevronLeft className="w-3 h-3" /> Back
              </button>
            )}
            {tab < TABS.length - 1 ? (
              <button type="button" onClick={() => setTab(t => t + 1)} className="px-4 py-1.5 text-[11px] font-600 bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.1] text-white/80 rounded-lg flex items-center gap-1 transition-colors">
                Next <ChevronRight className="w-3 h-3" />
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting} className="px-5 py-1.5 text-[11px] font-600 bg-white/[0.1] hover:bg-white/[0.16] border border-white/[0.12] text-white/85 rounded-lg transition-colors disabled:opacity-50">
                {isSubmitting ? "Saving…" : isEdit ? "Save Changes" : "Create Lead"}
              </button>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
}
