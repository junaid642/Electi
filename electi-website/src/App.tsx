import { Suspense, lazy, useState, useCallback } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import CustomCursor from "@/components/ui/CustomCursor";
import WhatsAppFloater from "@/components/ui/WhatsAppFloater";
import SplashScreen from "@/components/ui/SplashScreen";

/* ── Critical pages — eagerly loaded (on every visit) ───────────────────── */
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

/* ── All other pages — lazy loaded (code-split per route) ───────────────── */

/* Core navigation */
const Agents      = lazy(() => import("@/pages/agents"));
const Industries  = lazy(() => import("@/pages/industries"));
const HowItWorks  = lazy(() => import("@/pages/how-it-works"));
const Pricing     = lazy(() => import("@/pages/pricing"));
const About       = lazy(() => import("@/pages/about"));
const Blog        = lazy(() => import("@/pages/blog"));
const Contact     = lazy(() => import("@/pages/contact"));
const Careers     = lazy(() => import("@/pages/careers"));

/* Auth */
const Login       = lazy(() => import("@/pages/login"));
const Signup      = lazy(() => import("@/pages/signup"));
const CeoPage     = lazy(() => import("@/pages/ceo"));
const CtoPage     = lazy(() => import("@/pages/cto"));

/* Legal */
const Terms       = lazy(() => import("@/pages/terms"));
const Privacy     = lazy(() => import("@/pages/privacy"));

/* Misc */
const LetsConnect   = lazy(() => import("@/pages/letsconnect"));
const GooglePage    = lazy(() => import("@/pages/google"));
const FAQ           = lazy(() => import("@/pages/faq"));
const AiDiscovery   = lazy(() => import("@/pages/ai-discovery"));

/* Agent subpages */
const PersonalAgentPage = lazy(() => import("@/pages/agent-personal"));
const BillingAgentPage  = lazy(() => import("@/pages/agent-billing"));
const LegalAgentPage    = lazy(() => import("@/pages/agent-legal"));
const SalesAgentPage    = lazy(() => import("@/pages/agent-sales"));

/* Industry subpages */
const HealthcarePage    = lazy(() => import("@/pages/industry-healthcare"));
const RealEstatePage    = lazy(() => import("@/pages/industry-real-estate"));
const HospitalityPage   = lazy(() => import("@/pages/industry-hospitality"));
const ConstructionPage  = lazy(() => import("@/pages/industry-construction"));
const RetailPage        = lazy(() => import("@/pages/industry-retail"));
const CorporatePage     = lazy(() => import("@/pages/industry-corporate"));

/* Authority pages */
const AIAgentsPage          = lazy(() => import("@/pages/authority-ai-agents"));
const PersonalAIPage        = lazy(() => import("@/pages/authority-personal-ai"));
const BusinessAIPage        = lazy(() => import("@/pages/authority-business-ai"));
const AIVoiceAgentsPage     = lazy(() => import("@/pages/authority-voice-agents"));

/* Multilingual authority pages */
const ArabicAIAgentsPage        = lazy(() => import("@/pages/authority-arabic-ai-agents"));
const EnglishAIAgentsPage       = lazy(() => import("@/pages/authority-english-ai-agents"));
const MultilingualAIAgentsPage  = lazy(() => import("@/pages/authority-multilingual-ai-agents"));
const ArabicCustomerSupportPage = lazy(() => import("@/pages/authority-arabic-customer-support"));
const ArabicSalesAgentsPage     = lazy(() => import("@/pages/authority-arabic-sales-agents"));
const ArabicReceptionistsPage   = lazy(() => import("@/pages/authority-arabic-receptionists"));
const ArabicVoiceAIPage         = lazy(() => import("@/pages/authority-arabic-voice-ai"));
const AICallCenterPage          = lazy(() => import("@/pages/authority-ai-call-center"));
const AISalesAgentsPage     = lazy(() => import("@/pages/authority-sales-agents"));
const AICustomerSupportPage = lazy(() => import("@/pages/authority-customer-support"));
const AIHRAgentsPage        = lazy(() => import("@/pages/authority-hr-agents"));
const AIWorkflowPage        = lazy(() => import("@/pages/authority-workflow"));
const EnterpriseAIPage      = lazy(() => import("@/pages/authority-enterprise"));

/* Location pages */
const RiyadhPage = lazy(() => import("@/pages/location-riyadh"));
const JeddahPage = lazy(() => import("@/pages/location-jeddah"));

/* ── AI Agent Marketplace ──────────────────────────────────────────────── */
const MarketplaceHub         = lazy(() => import("@/pages/marketplace"));
const MktReceptionist        = lazy(() => import("@/pages/marketplace-receptionist"));
const MktSalesAgent          = lazy(() => import("@/pages/marketplace-sales-agent"));
const MktCustomerSupport     = lazy(() => import("@/pages/marketplace-customer-support"));
const MktHRAgent             = lazy(() => import("@/pages/marketplace-hr-agent"));
const MktRecruitment         = lazy(() => import("@/pages/marketplace-recruitment"));
const MktWhatsApp            = lazy(() => import("@/pages/marketplace-whatsapp"));
const MktKnowledgeBase       = lazy(() => import("@/pages/marketplace-knowledge-base"));
const MktProperty            = lazy(() => import("@/pages/marketplace-property"));
const MktHospitality         = lazy(() => import("@/pages/marketplace-hospitality"));
const MktHealthcare          = lazy(() => import("@/pages/marketplace-healthcare"));
const MktEducation           = lazy(() => import("@/pages/marketplace-education"));
const MktRetail              = lazy(() => import("@/pages/marketplace-retail"));
const MktLeadQualification   = lazy(() => import("@/pages/marketplace-lead-qualification"));

/* ── Conversion tools ──────────────────────────────────────────────────── */
const BuildYourAgent  = lazy(() => import("@/pages/build-your-agent"));
const ROICalculator   = lazy(() => import("@/pages/roi-calculator"));

/* ── Comparison pages ──────────────────────────────────────────────────── */
const CompareAIVsChatbot        = lazy(() => import("@/pages/compare-ai-vs-chatbot"));
const CompareReceptionistVsHuman = lazy(() => import("@/pages/compare-ai-receptionist-vs-human"));
const CompareSupportVsTraditional = lazy(() => import("@/pages/compare-ai-support-vs-traditional"));
const CompareSalesVsCallCenter   = lazy(() => import("@/pages/compare-ai-sales-vs-call-center"));
const CompareAIVsManual          = lazy(() => import("@/pages/compare-ai-vs-manual"));

/* ── Integrations & Partners ─────────────────────────────────────────────── */
const IntegrationsHub     = lazy(() => import("@/pages/integrations"));
const PartnersPage        = lazy(() => import("@/pages/partners"));
const IntOpenAI           = lazy(() => import("@/pages/integration-openai"));
const IntAnthropic        = lazy(() => import("@/pages/integration-anthropic"));
const IntGoogleGemini     = lazy(() => import("@/pages/integration-google-gemini"));
const IntMsCopilot        = lazy(() => import("@/pages/integration-microsoft-copilot"));
const IntWhatsApp         = lazy(() => import("@/pages/integration-whatsapp-business"));
const IntTeams            = lazy(() => import("@/pages/integration-microsoft-teams"));
const IntSlack            = lazy(() => import("@/pages/integration-slack"));
const IntSalesforce       = lazy(() => import("@/pages/integration-salesforce"));
const IntHubSpot          = lazy(() => import("@/pages/integration-hubspot"));
const IntZoho             = lazy(() => import("@/pages/integration-zoho"));
const IntOdoo             = lazy(() => import("@/pages/integration-odoo"));
const IntSAP              = lazy(() => import("@/pages/integration-sap"));
const IntOracle           = lazy(() => import("@/pages/integration-oracle"));
const IntShopify          = lazy(() => import("@/pages/integration-shopify"));
const IntWooCommerce      = lazy(() => import("@/pages/integration-woocommerce"));
const IntGmail            = lazy(() => import("@/pages/integration-gmail"));
const IntOutlook          = lazy(() => import("@/pages/integration-outlook"));
const IntGWorkspace       = lazy(() => import("@/pages/integration-google-workspace"));
const IntMs365            = lazy(() => import("@/pages/integration-microsoft-365"));

/* ── Case Studies ────────────────────────────────────────────────────────── */
const CaseStudiesHub          = lazy(() => import("@/pages/case-studies"));
const CaseStudyCustomerSupport = lazy(() => import("@/pages/case-study-customer-support"));
const CaseStudySalesAgent      = lazy(() => import("@/pages/case-study-sales-agent"));
const CaseStudyReceptionist    = lazy(() => import("@/pages/case-study-receptionist"));
const CaseStudyHRAgent         = lazy(() => import("@/pages/case-study-hr-agent"));
const CaseStudyWorkflow        = lazy(() => import("@/pages/case-study-workflow-automation"));
const CaseStudyVoiceAgents     = lazy(() => import("@/pages/case-study-voice-agents"));

/* ── City Authority Pages ────────────────────────────────────────────────── */
const AiAgentsRiyadh           = lazy(() => import("@/pages/ai-agents-riyadh"));
const AiAgentsJeddah           = lazy(() => import("@/pages/ai-agents-jeddah"));
const BusinessAiAgentsRiyadh   = lazy(() => import("@/pages/business-ai-agents-riyadh"));
const BusinessAiAgentsJeddah   = lazy(() => import("@/pages/business-ai-agents-jeddah"));
const AiReceptionistRiyadh     = lazy(() => import("@/pages/ai-receptionist-riyadh"));
const AiReceptionistJeddah     = lazy(() => import("@/pages/ai-receptionist-jeddah"));
const AiCustomerSupportRiyadh  = lazy(() => import("@/pages/ai-customer-support-riyadh"));
const AiCustomerSupportJeddah  = lazy(() => import("@/pages/ai-customer-support-jeddah"));
const AiSalesAgentsRiyadh      = lazy(() => import("@/pages/ai-sales-agents-riyadh"));
const AiSalesAgentsJeddah      = lazy(() => import("@/pages/ai-sales-agents-jeddah"));

/* ── E-E-A-T Trust & Compliance pages ───────────────────────────────────── */
const SecurityPage       = lazy(() => import("@/pages/security"));
const CompliancePage     = lazy(() => import("@/pages/compliance"));
const TechnologyPage     = lazy(() => import("@/pages/technology"));
const DataProtectionPage = lazy(() => import("@/pages/data-protection"));
const CookiePolicyPage   = lazy(() => import("@/pages/cookie-policy"));

/* ── Research Center / Resources ─────────────────────────────────────────── */
const ResourcesHub                   = lazy(() => import("@/pages/resources"));
const ResourcesDownloads             = lazy(() => import("@/pages/resources/downloads"));
const ResStateOfAI                   = lazy(() => import("@/pages/resources/state-of-ai-in-saudi-arabia"));
const ResFutureAIAgents              = lazy(() => import("@/pages/resources/future-of-ai-agents-saudi-arabia"));
const ResAIAgentsForBusiness         = lazy(() => import("@/pages/resources/ai-agents-for-saudi-businesses"));
const ResAIAgentsVsEmployees         = lazy(() => import("@/pages/resources/ai-agents-vs-traditional-employees"));
const ResAICustServiceTrends         = lazy(() => import("@/pages/resources/ai-customer-service-trends-saudi-arabia"));
const ResAIInHospitality             = lazy(() => import("@/pages/resources/ai-in-hospitality"));
const ResAIInHealthcare              = lazy(() => import("@/pages/resources/ai-in-healthcare"));
const ResAIInRealEstate              = lazy(() => import("@/pages/resources/ai-in-real-estate"));
const ResAIInGovernment              = lazy(() => import("@/pages/resources/ai-in-government"));
const ResAIInEducation               = lazy(() => import("@/pages/resources/ai-in-education"));

/* ── Route-level loading fallback ───────────────────────────────────────── */
function PageLoader() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#050505",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-label="Loading page"
    >
      <div
        style={{
          width: 40,
          height: 40,
          border: "2px solid #333",
          borderTopColor: "#fff",
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const queryClient = new QueryClient();

function Router() {
  const [location] = useLocation();
  const isLetsConnect = location === "/letsconnect";

  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          {/* ── Critical ── */}
          <Route path="/" component={Home} />

          {/* ── Core navigation ── */}
          <Route path="/agents"               component={Agents} />
          <Route path="/agents/personal"      component={PersonalAgentPage} />
          <Route path="/agents/billing"       component={BillingAgentPage} />
          <Route path="/agents/legal"         component={LegalAgentPage} />
          <Route path="/agents/sales"         component={SalesAgentPage} />
          <Route path="/industries"            component={Industries} />
          <Route path="/industries/healthcare"  component={HealthcarePage} />
          <Route path="/industries/real-estate" component={RealEstatePage} />
          <Route path="/industries/hospitality" component={HospitalityPage} />
          <Route path="/industries/construction" component={ConstructionPage} />
          <Route path="/industries/retail"     component={RetailPage} />
          <Route path="/industries/corporate"  component={CorporatePage} />
          <Route path="/how-it-works"          component={HowItWorks} />
          <Route path="/pricing"               component={Pricing} />
          <Route path="/about"                 component={About} />
          <Route path="/blog"                  component={Blog} />
          <Route path="/contact"               component={Contact} />
          <Route path="/careers"               component={Careers} />

          {/* ── Auth ── */}
          <Route path="/login"  component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/ceo"    component={CeoPage} />
          <Route path="/cto"    component={CtoPage} />

          {/* ── Legal ── */}
          <Route path="/terms-of-use"    component={Terms} />
          <Route path="/privacy"         component={Privacy} />
          <Route path="/privacy-policy"  component={Privacy} />

          {/* ── Misc ── */}
          <Route path="/faq"          component={FAQ} />
          <Route path="/ai-discovery" component={AiDiscovery} />
          <Route path="/letsconnect"  component={LetsConnect} />
          <Route path="/google"       component={GooglePage} />

          {/* ── Authority pages ── */}
          <Route path="/ai-agents"                    component={AIAgentsPage} />
          <Route path="/personal-ai-agents"           component={PersonalAIPage} />
          <Route path="/business-ai-agents"           component={BusinessAIPage} />
          <Route path="/ai-voice-agents"              component={AIVoiceAgentsPage} />
          <Route path="/ai-sales-agents"              component={AISalesAgentsPage} />
          <Route path="/ai-customer-support-agents"   component={AICustomerSupportPage} />
          <Route path="/ai-hr-agents"                 component={AIHRAgentsPage} />
          <Route path="/ai-workflow-automation"       component={AIWorkflowPage} />
          <Route path="/enterprise-ai-solutions"      component={EnterpriseAIPage} />

          {/* ── Multilingual authority pages ── */}
          <Route path="/arabic-ai-agents"             component={ArabicAIAgentsPage} />
          <Route path="/english-ai-agents"            component={EnglishAIAgentsPage} />
          <Route path="/multilingual-ai-agents"       component={MultilingualAIAgentsPage} />
          <Route path="/arabic-ai-customer-support"   component={ArabicCustomerSupportPage} />
          <Route path="/arabic-ai-sales-agents"       component={ArabicSalesAgentsPage} />
          <Route path="/arabic-ai-receptionists"      component={ArabicReceptionistsPage} />
          <Route path="/arabic-voice-ai"              component={ArabicVoiceAIPage} />
          <Route path="/ai-call-center"               component={AICallCenterPage} />

          {/* ── Location pages ── */}
          <Route path="/riyadh" component={RiyadhPage} />
          <Route path="/jeddah" component={JeddahPage} />

          {/* ── AI Agent Marketplace ── */}
          <Route path="/marketplace"                          component={MarketplaceHub} />
          <Route path="/marketplace/ai-receptionist"         component={MktReceptionist} />
          <Route path="/marketplace/ai-sales-agent"          component={MktSalesAgent} />
          <Route path="/marketplace/ai-customer-support"     component={MktCustomerSupport} />
          <Route path="/marketplace/ai-hr-agent"             component={MktHRAgent} />
          <Route path="/marketplace/ai-recruitment"          component={MktRecruitment} />
          <Route path="/marketplace/ai-whatsapp"             component={MktWhatsApp} />
          <Route path="/marketplace/ai-knowledge-base"       component={MktKnowledgeBase} />
          <Route path="/marketplace/ai-property"             component={MktProperty} />
          <Route path="/marketplace/ai-hospitality"          component={MktHospitality} />
          <Route path="/marketplace/ai-healthcare"           component={MktHealthcare} />
          <Route path="/marketplace/ai-education"            component={MktEducation} />
          <Route path="/marketplace/ai-retail"               component={MktRetail} />
          <Route path="/marketplace/ai-lead-qualification"   component={MktLeadQualification} />

          {/* ── Conversion tools ── */}
          <Route path="/build-your-agent" component={BuildYourAgent} />
          <Route path="/roi-calculator"   component={ROICalculator} />

          {/* ── Comparison pages ── */}
          <Route path="/compare/ai-agent-vs-chatbot"       component={CompareAIVsChatbot} />
          <Route path="/compare/ai-receptionist-vs-human"  component={CompareReceptionistVsHuman} />
          <Route path="/compare/ai-support-vs-traditional" component={CompareSupportVsTraditional} />
          <Route path="/compare/ai-sales-vs-call-center"   component={CompareSalesVsCallCenter} />
          <Route path="/compare/ai-vs-manual"              component={CompareAIVsManual} />

          {/* ── Integrations & Partners ── */}
          <Route path="/integrations"                              component={IntegrationsHub} />
          <Route path="/partners"                                  component={PartnersPage} />
          <Route path="/integrations/openai"                       component={IntOpenAI} />
          <Route path="/integrations/anthropic"                    component={IntAnthropic} />
          <Route path="/integrations/google-gemini"                component={IntGoogleGemini} />
          <Route path="/integrations/microsoft-copilot"            component={IntMsCopilot} />
          <Route path="/integrations/whatsapp-business"            component={IntWhatsApp} />
          <Route path="/integrations/microsoft-teams"              component={IntTeams} />
          <Route path="/integrations/slack"                        component={IntSlack} />
          <Route path="/integrations/salesforce"                   component={IntSalesforce} />
          <Route path="/integrations/hubspot"                      component={IntHubSpot} />
          <Route path="/integrations/zoho"                         component={IntZoho} />
          <Route path="/integrations/odoo"                         component={IntOdoo} />
          <Route path="/integrations/sap"                          component={IntSAP} />
          <Route path="/integrations/oracle"                       component={IntOracle} />
          <Route path="/integrations/shopify"                      component={IntShopify} />
          <Route path="/integrations/woocommerce"                  component={IntWooCommerce} />
          <Route path="/integrations/gmail"                        component={IntGmail} />
          <Route path="/integrations/outlook"                      component={IntOutlook} />
          <Route path="/integrations/google-workspace"             component={IntGWorkspace} />
          <Route path="/integrations/microsoft-365"                component={IntMs365} />

          <Route path="/case-studies"                            component={CaseStudiesHub} />
          <Route path="/case-studies/ai-customer-support"        component={CaseStudyCustomerSupport} />
          <Route path="/case-studies/ai-sales-agent"             component={CaseStudySalesAgent} />
          <Route path="/case-studies/ai-receptionist"            component={CaseStudyReceptionist} />
          <Route path="/case-studies/ai-hr-agent"                component={CaseStudyHRAgent} />
          <Route path="/case-studies/ai-workflow-automation"     component={CaseStudyWorkflow} />
          <Route path="/case-studies/ai-voice-agents"            component={CaseStudyVoiceAgents} />

          {/* ── City Authority Pages ── */}
          <Route path="/ai-agents-riyadh"          component={AiAgentsRiyadh} />
          <Route path="/ai-agents-jeddah"           component={AiAgentsJeddah} />
          <Route path="/business-ai-agents-riyadh" component={BusinessAiAgentsRiyadh} />
          <Route path="/business-ai-agents-jeddah" component={BusinessAiAgentsJeddah} />
          <Route path="/ai-receptionist-riyadh"    component={AiReceptionistRiyadh} />
          <Route path="/ai-receptionist-jeddah"    component={AiReceptionistJeddah} />
          <Route path="/ai-customer-support-riyadh" component={AiCustomerSupportRiyadh} />
          <Route path="/ai-customer-support-jeddah" component={AiCustomerSupportJeddah} />
          <Route path="/ai-sales-agents-riyadh"    component={AiSalesAgentsRiyadh} />
          <Route path="/ai-sales-agents-jeddah"    component={AiSalesAgentsJeddah} />

          {/* ── E-E-A-T Trust & Compliance ── */}
          <Route path="/security"         component={SecurityPage} />
          <Route path="/compliance"       component={CompliancePage} />
          <Route path="/technology"       component={TechnologyPage} />
          <Route path="/data-protection"  component={DataProtectionPage} />
          <Route path="/cookie-policy"    component={CookiePolicyPage} />

          {/* ── Research Center / Resources ── */}
          <Route path="/resources"                                               component={ResourcesHub} />
          <Route path="/resources/downloads"                                     component={ResourcesDownloads} />
          <Route path="/resources/state-of-ai-in-saudi-arabia"                  component={ResStateOfAI} />
          <Route path="/resources/future-of-ai-agents-saudi-arabia"             component={ResFutureAIAgents} />
          <Route path="/resources/ai-agents-for-saudi-businesses"               component={ResAIAgentsForBusiness} />
          <Route path="/resources/ai-agents-vs-traditional-employees"           component={ResAIAgentsVsEmployees} />
          <Route path="/resources/ai-customer-service-trends-saudi-arabia"      component={ResAICustServiceTrends} />
          <Route path="/resources/ai-in-hospitality"                            component={ResAIInHospitality} />
          <Route path="/resources/ai-in-healthcare"                             component={ResAIInHealthcare} />
          <Route path="/resources/ai-in-real-estate"                            component={ResAIInRealEstate} />
          <Route path="/resources/ai-in-government"                             component={ResAIInGovernment} />
          <Route path="/resources/ai-in-education"                              component={ResAIInEducation} />

          <Route component={NotFound} />
        </Switch>
      </Suspense>
      {!isLetsConnect && <WhatsAppFloater />}
    </>
  );
}

function AppInner() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

function App() {
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashDone = useCallback(() => setSplashDone(true), []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <TooltipProvider>
            <SplashScreen onDone={handleSplashDone} />
            {splashDone && (
              <>
                <CustomCursor />
                <AppInner />
                <Toaster />
              </>
            )}
          </TooltipProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
