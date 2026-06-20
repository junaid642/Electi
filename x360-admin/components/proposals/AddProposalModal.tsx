"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FileText, Building2, Briefcase, User, Calendar, DollarSign, StickyNote } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import type { ProposalStatus } from "@/lib/types";

const SERVICES = [
  "360 Virtual Tour Package",
  "AI Workforce Automation",
  "Full CRM + WhatsApp Automation Suite",
  "Enterprise CRM + Analytics Dashboard",
  "Healthcare AI Workflows",
  "Real Estate Virtual Tours Premium",
  "Digital Transformation Package",
  "Virtual Tour Management + AI Agents",
  "AI Construction Monitoring",
  "Mobile App Development",
  "ERP Integration",
  "SaaS Platform Development",
  "Business Intelligence Dashboard",
  "Custom AI Solution",
];

const REPS = ["Ahmad S.", "Sarah M.", "Khalid O.", "Fatima G.", "Omar T.", "Nadia K."];

const STATUSES: ProposalStatus[] = ["Draft", "Sent", "Viewed", "Negotiation", "Accepted", "Rejected"];

const schema = z.object({
  client:  z.string().min(2, "Client name required"),
  service: z.string().min(2, "Service required"),
  status:  z.string().min(1) as z.ZodType<ProposalStatus>,
  rep:     z.string().min(1, "Rep required"),
  value:   z.coerce.number().min(0, "Enter a valid value"),
  sent:    z.string().optional(),
  expires: z.string().min(1, "Expiry date required"),
  notes:   z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const inputCls = "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[12px] text-white/80 placeholder-white/22 outline-none focus:border-white/20 focus:bg-white/[0.06] transition-colors";
const selectCls = inputCls + " cursor-pointer";

const Field = ({ label, error, icon: Icon, children }: {
  label: string; error?: string; icon?: React.ElementType; children: React.ReactNode;
}) => (
  <div>
    <label className="text-[9px] font-600 text-white/35 uppercase tracking-wide block mb-1 flex items-center gap-1">
      {Icon && <Icon className="w-2.5 h-2.5" />}{label}
    </label>
    {children}
    {error && <p className="text-[9px] text-red-400/80 mt-0.5">{error}</p>}
  </div>
);

interface Props { open: boolean; onClose: () => void; }

export default function AddProposalModal({ open, onClose }: Props) {
  const { addProposal } = useStore();
  const { toast } = useToast();

  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: "Draft", rep: "Ahmad S.", value: 0, expires: "" },
  });

  useEffect(() => { if (open) reset({ status: "Draft", rep: "Ahmad S.", value: 0, expires: "" }); }, [open, reset]);

  const status = watch("status");

  function onSubmit(data: FormData) {
    addProposal({
      client:  data.client,
      service: data.service,
      status:  data.status,
      rep:     data.rep,
      value:   data.value,
      sent:    (data.status !== "Draft" && data.sent) ? data.sent : null,
      viewed:  null,
      expires: data.expires,
      notes:   data.notes ?? "",
    });
    toast(`Proposal for ${data.client} created`);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="New Proposal">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Client + Service */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Client" error={errors.client?.message} icon={Building2}>
            <input {...register("client")} placeholder="e.g. Saudi Aramco" className={inputCls} />
          </Field>
          <Field label="Rep" error={errors.rep?.message} icon={User}>
            <select {...register("rep")} className={selectCls}>
              {REPS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Service / Package" error={errors.service?.message} icon={Briefcase}>
          <select {...register("service")} className={selectCls}>
            <option value="">Select a service…</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>

        {/* Status + Value */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Status" error={errors.status?.message}>
            <select {...register("status")} className={selectCls}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Value (SAR)" error={errors.value?.message} icon={DollarSign}>
            <input {...register("value")} type="number" min={0} placeholder="0" className={inputCls} />
          </Field>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          {status !== "Draft" && (
            <Field label="Date Sent" icon={Calendar}>
              <input {...register("sent")} type="date" className={inputCls} />
            </Field>
          )}
          <Field label="Expiry Date" error={errors.expires?.message} icon={Calendar}>
            <input {...register("expires")} type="date" className={inputCls} />
          </Field>
        </div>

        {/* Notes */}
        <Field label="Notes" icon={StickyNote}>
          <textarea {...register("notes")} rows={3} placeholder="Internal notes, follow-up actions…"
            className={inputCls + " resize-none"} />
        </Field>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-1">
          <button type="button" onClick={onClose}
            className="px-4 py-2 text-[11px] text-white/45 hover:text-white/70 glass-sm rounded-lg transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting}
            className="px-5 py-2 text-[11px] font-600 bg-white/[0.1] hover:bg-white/[0.16] border border-white/[0.12] text-white/85 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50">
            <FileText className="w-3 h-3" />
            Create Proposal
          </button>
        </div>
      </form>
    </Modal>
  );
}
