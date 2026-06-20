"use client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, FileText, FolderOpen, User, Tag, StickyNote } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import type { DocFolder, DocType } from "@/lib/types";

const FOLDERS: DocFolder[] = ["Contracts", "Proposals", "Invoices", "Photos", "Reports", "NDAs", "Other"];
const DOC_TYPES: DocType[]  = ["PDF", "DOCX", "PPTX", "XLSX", "ZIP", "JPG", "PNG", "MP4", "Other"];
const OWNERS = ["Ahmad S.", "Sarah M.", "Khalid O.", "Fatima G.", "Omar T.", "Nadia K.", "Layla M.", "Mariam J.", "Tariq D."];

const schema = z.object({
  name:   z.string().min(2, "File name required"),
  type:   z.string().min(1) as z.ZodType<DocType>,
  folder: z.string().min(1) as z.ZodType<DocFolder>,
  size:   z.string().min(1, "File size required"),
  owner:  z.string().min(1, "Owner required"),
  tags:   z.string().optional(),
  notes:  z.string().optional(),
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

interface Props { open: boolean; onClose: () => void; defaultFolder?: DocFolder; }

export default function UploadDocumentModal({ open, onClose, defaultFolder }: Props) {
  const { addDocument } = useStore();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [pickedFile, setPickedFile] = useState<File | null>(null);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { folder: defaultFolder ?? "Contracts", owner: "Ahmad S." },
  });

  useEffect(() => {
    if (open) { reset({ folder: defaultFolder ?? "Contracts", owner: "Ahmad S.", type: "PDF" }); setPickedFile(null); }
  }, [open, defaultFolder, reset]);

  function handleFilePick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPickedFile(file);
    // Auto-fill name from filename (strip extension)
    const parts = file.name.split(".");
    const ext   = parts.pop()?.toUpperCase() ?? "Other";
    const base  = parts.join(".");
    setValue("name", base, { shouldValidate: true });

    // Detect type
    const knownTypes: DocType[] = ["PDF", "DOCX", "PPTX", "XLSX", "ZIP", "JPG", "PNG", "MP4"];
    const detected = knownTypes.includes(ext as DocType) ? (ext as DocType) : "Other";
    setValue("type", detected, { shouldValidate: true });

    // Format size
    const kb = file.size / 1024;
    const sizeStr = kb < 1024 ? `${kb.toFixed(0)} KB` : `${(kb / 1024).toFixed(1)} MB`;
    setValue("size", sizeStr, { shouldValidate: true });
  }

  function onSubmit(data: FormData) {
    const today = new Date().toISOString().slice(0, 10);
    addDocument({
      name:     data.name,
      type:     data.type,
      folder:   data.folder,
      size:     data.size,
      owner:    data.owner,
      modified: today,
      tags:     data.tags ? data.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
      notes:    data.notes ?? "",
    });
    toast(`"${data.name}" added to ${data.folder}`);
    onClose();
  }

  const fileName = watch("name");

  return (
    <Modal open={open} onClose={onClose} title="Upload Document">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* File picker zone */}
        <div
          onClick={() => fileRef.current?.click()}
          className="border border-dashed border-white/[0.12] hover:border-white/25 rounded-xl p-5 text-center cursor-pointer transition-colors group"
        >
          <input ref={fileRef} type="file" className="hidden" onChange={handleFilePick}
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.jpg,.jpeg,.png,.mp4" />
          {pickedFile ? (
            <div className="flex items-center justify-center gap-2">
              <FileText className="w-4 h-4 text-white/50" />
              <p className="text-[12px] text-white/70 font-500">{pickedFile.name}</p>
            </div>
          ) : (
            <>
              <Upload className="w-6 h-6 text-white/20 mx-auto mb-2 group-hover:text-white/40 transition-colors" />
              <p className="text-[11px] text-white/35 group-hover:text-white/55 transition-colors">Click to pick a file</p>
              <p className="text-[9px] text-white/20 mt-1">PDF, DOCX, PPTX, XLSX, ZIP, JPG, PNG, MP4</p>
            </>
          )}
        </div>

        {/* Name */}
        <Field label="Document Name" error={errors.name?.message} icon={FileText}>
          <input {...register("name")} placeholder="e.g. Saudi Aramco Contract Q3" className={inputCls} />
        </Field>

        {/* Type + Folder */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="File Type" error={errors.type?.message}>
            <select {...register("type")} className={selectCls}>
              {DOC_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Folder" error={errors.folder?.message} icon={FolderOpen}>
            <select {...register("folder")} className={selectCls}>
              {FOLDERS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </Field>
        </div>

        {/* Size + Owner */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="File Size" error={errors.size?.message}>
            <input {...register("size")} placeholder="e.g. 2.4 MB" className={inputCls} />
          </Field>
          <Field label="Owner / Uploader" error={errors.owner?.message} icon={User}>
            <select {...register("owner")} className={selectCls}>
              {OWNERS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </Field>
        </div>

        {/* Tags */}
        <Field label="Tags (comma-separated)" icon={Tag}>
          <input {...register("tags")} placeholder="e.g. contract, aramco, q3" className={inputCls} />
        </Field>

        {/* Notes */}
        <Field label="Notes" icon={StickyNote}>
          <textarea {...register("notes")} rows={2} placeholder="Internal notes…" className={inputCls + " resize-none"} />
        </Field>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-1">
          <button type="button" onClick={onClose}
            className="px-4 py-2 text-[11px] text-white/45 hover:text-white/70 glass-sm rounded-lg transition-colors">
            Cancel
          </button>
          <button type="submit"
            className="px-5 py-2 text-[11px] font-600 bg-white/[0.1] hover:bg-white/[0.16] border border-white/[0.12] text-white/85 rounded-lg transition-colors flex items-center gap-1.5">
            <Upload className="w-3 h-3" />
            Add Document
          </button>
        </div>
      </form>
    </Modal>
  );
}
