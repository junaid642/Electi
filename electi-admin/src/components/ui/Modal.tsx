import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

const SIZE_CLS: Record<string, string> = {
  sm:  "max-w-sm",
  md:  "max-w-md",
  lg:  "max-w-lg",
  xl:  "max-w-2xl",
  "2xl": "max-w-4xl",
};

export default function Modal({ open, onClose, title, subtitle, children, size = "md", className }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={v => { if (!v) onClose(); }}>
      <DialogContent className={cn(
        "bg-[#0a0a0a] border border-white/[0.07] text-white p-0 gap-0 overflow-hidden",
        SIZE_CLS[size] ?? SIZE_CLS.md,
        className,
      )}>
        <DialogHeader className="px-5 pt-5 pb-3 border-b border-white/[0.05]">
          <DialogTitle className="text-[14px] font-700 text-white/90">{title}</DialogTitle>
          {subtitle && <DialogDescription className="text-[11px] text-white/40 mt-0.5">{subtitle}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
