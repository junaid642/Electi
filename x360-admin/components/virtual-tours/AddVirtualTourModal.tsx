"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, Building2, MapPin, Tag, Link2, StickyNote, QrCode } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import type { TourStatus, TourType } from "@/lib/types";

const TOUR_TYPES: TourType[] = [
  "Residential", "Commercial", "Luxury Tower", "Retail", "Corporate",
  "Education", "Hospitality", "Industrial", "Government", "Healthcare", "Other",
];
const STATUSES: TourStatus[] = ["Live", "Pending", "Paused", "Expired"];

const schema = z.object({
  name:     z.string().min(2, "Tour name required"),
  client:   z.string().min(2, "Client required"),
  location: z.string().min(2, "Location required"),
  type:     z.string().min(1) as z.ZodType<TourType>,
  status:   z.string().min(1) as z.ZodType<TourStatus>,
  created:  z.string().min(1, "Start date required"),
  expiry:   z.string().min(1, "Expiry date required"),
  url:      z.string().optional(),
  qr:       z.boolean(),
  notes:    z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const inputCls  = "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[12px] text-white/80 placeholder-white/22 outline-none focus:border-white/20 focus:bg-white/[0.06] transition-colors";
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

const today = new Date().toISOString().slice(0, 10);
const nextYear = `${new Date().getFullYear() + 1}-${today.slice(5)}`;

interface Props { open: boolean; onClose: () => void; }

export default function AddVirtualTourModal({ open, onClose }: Props) {
  const { addVirtualTour } = useStore();
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: "Pending", type: "Residential", qr: false, created: today, expiry: nextYear },
  });

  useEffect(() => {
    if (open) reset({ status: "Pending", type: "Residential", qr: false, created: today, expiry: nextYear });
  }, [open, reset]);

  function onSubmit(data: FormData) {
    addVirtualTour({
      name:     data.name,
      client:   data.client,
      location: data.location,
      type:     data.type,
      status:   data.status,
      created:  data.created,
      expiry:   data.expiry,
      qr:       data.qr,
      url:      data.url ?? "",
      notes:    data.notes ?? "",
    });
    toast(`Virtual tour "${data.name}" added`);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="New Virtual Tour">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <Field label="Tour Name" error={errors.name?.message} icon={Eye}>
          <input {...register("name")} placeholder="e.g. Olayan Retail Hub" className={inputCls} />
        </Field>

        {/* Client + Location */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Client" error={errors.client?.message} icon={Building2}>
            <input {...register("client")} placeholder="e.g. Olayan Group" className={inputCls} />
          </Field>
          <Field label="Location" error={errors.location?.message} icon={MapPin}>
            <input {...register("location")} placeholder="e.g. Riyadh" className={inputCls} />
          </Field>
        </div>

        {/* Type + Status */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Type" error={errors.type?.message} icon={Tag}>
            <select {...register("type")} className={selectCls}>
              {TOUR_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Status" error={errors.status?.message}>
            <select {...register("status")} className={selectCls}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Start Date" error={errors.created?.message}>
            <input {...register("created")} type="date" className={inputCls} />
          </Field>
          <Field label="Expiry Date" error={errors.expiry?.message}>
            <input {...register("expiry")} type="date" className={inputCls} />
          </Field>
        </div>

        {/* URL */}
        <Field label="Tour URL (optional)" icon={Link2}>
          <input {...register("url")} placeholder="https://tour.x360.sa/…" className={inputCls} />
        </Field>

        {/* QR toggle */}
        <label className="flex items-center gap-3 cursor-pointer glass-sm rounded-lg px-3 py-2.5 hover:bg-white/[0.03] transition-colors">
          <input {...register("qr")} type="checkbox" className="w-3.5 h-3.5 accent-white/60 cursor-pointer" />
          <div className="flex items-center gap-1.5">
            <QrCode className="w-3 h-3 text-white/35" />
            <span className="text-[11px] text-white/65">Generate QR code for this tour</span>
          </div>
        </label>

        {/* Notes */}
        <Field label="Notes" icon={StickyNote}>
          <textarea {...register("notes")} rows={3} placeholder="Internal notes…" className={inputCls + " resize-none"} />
        </Field>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-1">
          <button type="button" onClick={onClose}
            className="px-4 py-2 text-[11px] text-white/45 hover:text-white/70 glass-sm rounded-lg transition-colors">
            Cancel
          </button>
          <button type="submit"
            className="px-5 py-2 text-[11px] font-600 bg-white/[0.1] hover:bg-white/[0.16] border border-white/[0.12] text-white/85 rounded-lg transition-colors flex items-center gap-1.5">
            <Eye className="w-3 h-3" />
            Create Tour
          </button>
        </div>
      </form>
    </Modal>
  );
}
