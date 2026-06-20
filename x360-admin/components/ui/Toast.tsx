"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";

interface Toast { id: string; type: "success" | "error" | "info"; message: string; }
interface ToastCtx { toast: (msg: string, type?: Toast["type"]) => void; }

const Ctx = createContext<ToastCtx>({ toast: () => {} });
export const useToast = () => useContext(Ctx);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function toast(message: string, type: Toast["type"] = "success") {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }

  return (
    <Ctx.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[200] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto glass border border-white/[0.08] px-4 py-3 flex items-center gap-3 min-w-[260px] shadow-xl"
            style={{ animation: "toast-in 0.2s ease" }}
          >
            {t.type === "success" ? (
              <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span className="text-[12px] text-white/80 flex-1">{t.message}</span>
            <button onClick={() => setToasts((x) => x.filter((y) => y.id !== t.id))} className="text-white/30 hover:text-white/60">
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes toast-in { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </Ctx.Provider>
  );
}
