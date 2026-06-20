import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Loader2 } from "lucide-react";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

// Real pages
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Leads from "@/pages/leads";
import LeadDetail from "@/pages/lead-detail";
import Jobs from "@/pages/jobs";
import JobDetail from "@/pages/job-detail";
import Applications from "@/pages/applications";
import Blog from "@/pages/blog";
import BlogEditor from "@/pages/blog-detail";
import Seo from "@/pages/seo";
import SeoEditor from "@/pages/seo-detail";
import Analytics from "@/pages/analytics";
import Tracking from "@/pages/tracking";
import Translations from "@/pages/translations";
import Crm from "@/pages/crm";
import { ProjectProvider } from "@/lib/project-store";
import { CrmProvider } from "@/lib/crm-store";

function RootRedirect() {
  const [, setLocation] = useLocation();
  useEffect(() => setLocation("/dashboard"), [setLocation]);
  return null;
}

function ProtectedRoute({ component: Component }: { component: any }) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <AdminLayout>
      <Component />
    </AdminLayout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      
      <Route path="/" component={RootRedirect} />

      <Route path="/dashboard"><ProtectedRoute component={Dashboard} /></Route>
      
      <Route path="/leads"><ProtectedRoute component={Leads} /></Route>
      <Route path="/leads/:id"><ProtectedRoute component={LeadDetail} /></Route>
      
      <Route path="/jobs"><ProtectedRoute component={Jobs} /></Route>
      <Route path="/jobs/:id"><ProtectedRoute component={JobDetail} /></Route>
      
      <Route path="/applications"><ProtectedRoute component={Applications} /></Route>
      
      <Route path="/blog"><ProtectedRoute component={Blog} /></Route>
      <Route path="/blog/:id"><ProtectedRoute component={BlogEditor} /></Route>
      
      <Route path="/seo"><ProtectedRoute component={Seo} /></Route>
      <Route path="/seo/:page"><ProtectedRoute component={SeoEditor} /></Route>

      <Route path="/analytics"><ProtectedRoute component={Analytics} /></Route>
      <Route path="/tracking"><ProtectedRoute component={Tracking} /></Route>
      <Route path="/translations"><ProtectedRoute component={Translations} /></Route>
      <Route path="/crm"><ProtectedRoute component={Crm} /></Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  // Set dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AuthProvider>
            <CrmProvider>
              <ProjectProvider>
                <Router />
              </ProjectProvider>
            </CrmProvider>
          </AuthProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
