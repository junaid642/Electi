import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building2, User, Phone, Mail, Globe, Linkedin, MapPin, FileText, Zap, Flame, Crown, Star, ChevronRight, ChevronLeft, Check, Users2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCrm } from "@/lib/crm-store";
import { STAGES, INDUSTRIES, AI_SERVICES, SOURCES, COUNTRIES, SALESPEOPLE } from "@/lib/crm-types";
import { useToast } from "@/hooks/use-toast";
import type { CrmLead, LeadStage, Priority } from "@/lib/crm-types";

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

interface Props { open: boolean; onClose: () => void; lead?: CrmLead | null; defaultStage?: LeadStage; }

const inputCls = "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[12px] text-white/80 placeholder-white/22 outline-none focus:border-white/25 focus:bg-white/[0.06] transition-colors";
const selectCls = inputCls + " cursor-pointer";

const FORM_TABS = [
  { label: "Client Details",  icon: Building2 },
  { label: "Deal Setup",      icon: FileText  },
  { label: "Intelligence",    icon: Zap       },
  { label: "Notes",           icon: FileText  },
];

function Field({ label, error, icon: Icon, children }: { label: string; error?: string; icon?: React.ElementType; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[9px] font-semibold text-white/35 uppercase tracking-wide block mb-1 flex items-center gap-1">
        {Icon && <Icon className="w-2.5 h-2.5" />}{label}
      </label>
      {children}
      {error && <p className="text-[10px] text-red-400 mt-0.5">{error}</p>}
    </div>
  );
}

export default function AddLeadModal({ open, onClose, lead, defaultStage = "Incoming Lead" }: Props) {
  const { addLead, updateLead } = useCrm();
  const { toast } = useToast();
  const isEdit = !!lead;
  const [tab, setTab] = useState(0);
  const [services, setServices] = useState<string[]>([]);
  const [vip, setVip] = useState(false);
  const [decisionMaker, setDecisionMaker] = useState(false);
  const [expansionPotential, setExpansionPotential] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      company: "", contact: "", designation: "", phone: "", whatsapp: "", email: "",
      website: "", linkedin: "", address: "", city: "", country: "KSA", vat: "", cr: "",
      industry: "Healthcare", source: "Website Inquiry",
      stage: defaultStage, priority: "Medium", assigned: "Mohammed A.",
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
      reset({ company: "", contact: "", designation: "", phone: "", whatsapp: "", email: "", website: "", linkedin: "", address: "", city: "", country: "KSA", vat: "", cr: "", industry: "Healthcare", source: "Website Inquiry", stage: defaultStage, priority: "Medium", assigned: "Mohammed A.", score: 50, value: 0, urgency: "Medium", temperature: "Warm", competitor: "", branches: 0, expectedCloseDate: "", lastContact: "", nextFollowUp: "", notes: "" });
      setServices([]); setVip(false); setDecisionMaker(false); setExpansionPotential(false);
    }
    setTab(0);
  }, [open, lead, defaultStage, reset]);

  const toggleService = (s: string) => setServices((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const onSubmit = (data: FormData) => {
    const payload = {
      ...data,
      services, vip, decisionMakerIdentified: decisionMaker, expansionPotential,
      value: data.value ?? 0,
      urgency: data.urgency as "Critical" | "High" | "Medium" | "Low" | undefined,
      temperature: data.temperature as "Hot" | "Warm" | "Cold" | undefined,
      lastContact: data.lastContact ?? "",
      nextFollowUp: data.nextFollowUp ?? "",
      notes: data.notes ?? "",
    };
    if (isEdit && lead) {
      updateLead(lead.id, payload);
      toast({ title: "Lead updated successfully" });
    } else {
      addLead(payload);
      toast({ title: "Lead created successfully" });
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl w-full p-0 bg-[#050505] border border-white/[0.08] overflow-hidden">
        {/* Dialog header */}
        <div className="px-5 pt-5 pb-3 border-b border-white/[0.05]">
          <h2 className="text-[14px] font-bold text-white/90 font-display tracking-wide">{isEdit ? "EDIT LEAD" : "NEW LEAD"}</h2>
          <p className="text-[11px] text-white/35 mt-0.5">{isEdit ? lead?.company : "Enterprise intelligence intake form"}</p>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-white/[0.05] px-5">
          {FORM_TABS.map((t, i) => {
            const Icon = t.icon;
            return (
              <button key={i} type="button" onClick={() => setTab(i)}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wide border-b-2 transition-all -mb-px ${tab === i ? "border-white/60 text-white/80" : "border-transparent text-white/30 hover:text-white/55"}`}>
                <Icon className="w-3 h-3" />{t.label}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-5 space-y-3 min-h-[360px] max-h-[60vh] overflow-y-auto">

            {/* TAB 0: Client Details */}
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
                  <Field label="Website" icon={Globe}>
                    <input {...register("website")} className={inputCls} placeholder="company.com" />
                  </Field>
                  <Field label="LinkedIn" icon={Linkedin}>
                    <input {...register("linkedin")} className={inputCls} placeholder="linkedin.com/in/name" />
                  </Field>
                </div>
                <Field label="Office Address" icon={MapPin}>
                  <input {...register("address")} className={inputCls} placeholder="King Fahd Rd, Riyadh" />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="City *" error={errors.city?.message}>
                    <input {...register("city")} className={inputCls} placeholder="Riyadh" />
                  </Field>
                  <Field label="Country *" error={errors.country?.message}>
                    <select {...register("country")} className={selectCls}>
                      {COUNTRIES.map((c) => <option key={c} value={c} className="bg-[#050505]">{c}</option>)}
                    </select>
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="VAT Number">
                    <input {...register("vat")} className={inputCls} placeholder="300XXXXXXXXX" />
                  </Field>
                  <Field label="Commercial Reg.">
                    <input {...register("cr")} className={inputCls} placeholder="1010XXXXXX" />
                  </Field>
                </div>
              </>
            )}

            {/* TAB 1: Deal Setup */}
            {tab === 1 && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Industry *" error={errors.industry?.message}>
                    <select {...register("industry")} className={selectCls}>
                      {INDUSTRIES.map((i) => <option key={i} value={i} className="bg-[#050505]">{i}</option>)}
                    </select>
                  </Field>
                  <Field label="Lead Source *" error={errors.source?.message}>
                    <select {...register("source")} className={selectCls}>
                      {SOURCES.map((s) => <option key={s} value={s} className="bg-[#050505]">{s}</option>)}
                    </select>
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Pipeline Stage *" error={errors.stage?.message}>
                    <select {...register("stage")} className={selectCls}>
                      {STAGES.map((s) => <option key={s} value={s} className="bg-[#050505]">{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Priority *" error={errors.priority?.message}>
                    <select {...register("priority")} className={selectCls}>
                      {["High", "Medium", "Low"].map((p) => <option key={p} value={p} className="bg-[#050505]">{p}</option>)}
                    </select>
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Assigned To *" error={errors.assigned?.message}>
                    <select {...register("assigned")} className={selectCls}>
                      {SALESPEOPLE.map((s) => <option key={s} value={s} className="bg-[#050505]">{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Deal Value (SAR)">
                    <input {...register("value")} type="number" min="0" className={inputCls} placeholder="500000" />
                  </Field>
                </div>
                <Field label="Lead Score (0–100)" error={errors.score?.message}>
                  <input {...register("score")} type="number" min="0" max="100" className={inputCls} />
                </Field>
                <div>
                  <label className="text-[9px] font-semibold text-white/35 uppercase tracking-wide block mb-2">
                    AI Services Required ({services.length} selected)
                  </label>
                  <div className="grid grid-cols-2 gap-1 max-h-44 overflow-y-auto pr-1">
                    {AI_SERVICES.map((s) => (
                      <button key={s} type="button" onClick={() => toggleService(s)}
                        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[10px] text-left transition-all border ${services.includes(s) ? "bg-white/[0.08] border-white/25 text-white/80" : "bg-white/[0.02] border-white/[0.05] text-white/40 hover:border-white/15 hover:text-white/60"}`}>
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

            {/* TAB 2: Intelligence */}
            {tab === 2 && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Urgency Level" icon={Zap}>
                    <select {...register("urgency")} className={selectCls}>
                      {["Critical", "High", "Medium", "Low"].map((u) => <option key={u} value={u} className="bg-[#050505]">{u}</option>)}
                    </select>
                  </Field>
                  <Field label="Lead Temperature" icon={Flame}>
                    <select {...register("temperature")} className={selectCls}>
                      {["Hot", "Warm", "Cold"].map((t) => <option key={t} value={t} className="bg-[#050505]">{t}</option>)}
                    </select>
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Competitor Involved">
                    <input {...register("competitor")} className={inputCls} placeholder="e.g. Botpress, Cognigy" />
                  </Field>
                  <Field label="No. of Branches / Depts" icon={Users2}>
                    <input {...register("branches")} type="number" min="0" className={inputCls} placeholder="5" />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Last Contact Date">
                    <input {...register("lastContact")} type="date" className={inputCls + " [color-scheme:dark]"} />
                  </Field>
                  <Field label="Expected Close Date">
                    <input {...register("expectedCloseDate")} type="date" className={inputCls + " [color-scheme:dark]"} />
                  </Field>
                </div>
                <Field label="Next Follow-Up">
                  <input {...register("nextFollowUp")} type="date" className={inputCls + " [color-scheme:dark]"} />
                </Field>
                <div className="grid grid-cols-3 gap-3 pt-1">
                  {[
                    { label: "VIP Status",            icon: Crown,         value: vip,               set: setVip,               active: "bg-amber-500/20 border-amber-500/40 text-amber-300" },
                    { label: "Decision Maker Confirmed", icon: Star,        value: decisionMaker,     set: setDecisionMaker,     active: "bg-green-500/20 border-green-500/40 text-green-300" },
                    { label: "Expansion Potential",   icon: ChevronRight,  value: expansionPotential, set: setExpansionPotential, active: "bg-blue-500/20 border-blue-500/40 text-blue-300" },
                  ].map(({ label, icon: Icon, value, set, active }) => (
                    <button key={label} type="button" onClick={() => set(!value)}
                      className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-[9px] font-semibold uppercase tracking-wide transition-all ${value ? active : "bg-white/[0.02] border-white/[0.08] text-white/35 hover:border-white/15"}`}>
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

            {/* TAB 3: Notes */}
            {tab === 3 && (
              <Field label="Internal Notes">
                <textarea {...register("notes")} className={inputCls + " resize-none h-56"}
                  placeholder="Key context: budget, decision timeline, stakeholders, relationship strength, competitor presence…" />
              </Field>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 px-5 pb-4 pt-3 border-t border-white/[0.05]">
            <div className="flex gap-1">
              {FORM_TABS.map((_, i) => (
                <button key={i} type="button" onClick={() => setTab(i)}
                  className={`h-1.5 rounded-full transition-all ${tab === i ? "bg-white/70 w-4" : "bg-white/20 w-1.5"}`} />
              ))}
            </div>
            <div className="flex items-center gap-2">
              {tab > 0 && (
                <button type="button" onClick={() => setTab((t) => t - 1)}
                  className="px-3 py-1.5 text-[11px] text-white/45 hover:text-white/70 bg-white/[0.03] border border-white/[0.07] rounded-lg flex items-center gap-1 transition-colors">
                  <ChevronLeft className="w-3 h-3" /> Back
                </button>
              )}
              {tab < FORM_TABS.length - 1 ? (
                <button type="button" onClick={() => setTab((t) => t + 1)}
                  className="px-4 py-1.5 text-[11px] font-semibold bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.1] text-white/80 rounded-lg flex items-center gap-1 transition-colors">
                  Next <ChevronRight className="w-3 h-3" />
                </button>
              ) : (
                <button type="submit"
                  className="px-5 py-1.5 text-[11px] font-semibold bg-primary hover:bg-primary/90 text-black rounded-lg transition-colors">
                  {isEdit ? "Save Changes" : "Create Lead"}
                </button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
