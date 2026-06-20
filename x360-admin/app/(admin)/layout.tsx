import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { ToastProvider } from "@/components/ui/Toast";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { AuthGuard } from "@/components/providers/AuthGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <ToastProvider>
        <SidebarProvider>
          <div className="flex h-screen overflow-hidden ambient">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
              <Topbar />
              <main className="flex-1 overflow-y-auto p-5 relative">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </ToastProvider>
    </AuthGuard>
  );
}
