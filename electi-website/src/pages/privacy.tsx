import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import SEOHead from "@/components/seo/SEOHead";
import Footer from "@/components/layout/Footer";
import { useState, useEffect, useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const sections = [
  {
    id: "company-info",
    title: "1. Company Information",
    content: (
      <div className="space-y-6">
        <div>
          <p className="text-white/60 text-sm font-600 uppercase tracking-[0.14em] mb-3">Saudi Arabia Registered Office</p>
          <div className="space-y-1 text-white/70 text-sm leading-relaxed">
            <p><span className="text-white/40">Company:</span> Electi AI</p>
            <p><span className="text-white/40">Address:</span> Northern Ring Br Rd, Almasiaf, Riyadh, Kingdom of Saudi Arabia</p>
            <p><span className="text-white/40">Email:</span> <a href="mailto:a@electi.sa" className="text-white/80 hover:text-white transition-colors">a@electi.sa</a></p>
            <p><span className="text-white/40">Phone:</span> +966 506554599 / +966 569636393</p>
          </div>
        </div>
        <div className="h-px bg-white/6" />
        <div>
          <p className="text-white/60 text-sm font-600 uppercase tracking-[0.14em] mb-3">India Registered Office</p>
          <div className="space-y-1 text-white/70 text-sm leading-relaxed">
            <p><span className="text-white/40">Company:</span> Stoned Tailor - X360</p>
            <p><span className="text-white/40">Address:</span> 5/12 Roshan Colony, Jayanagar 4th T Block, Bangalore 560041, Republic of India</p>
            <p><span className="text-white/40">Email:</span> <a href="mailto:a@electi.sa" className="text-white/80 hover:text-white transition-colors">a@electi.sa</a> / <a href="mailto:a@electi.sa" className="text-white/80 hover:text-white transition-colors">a@electi.sa</a></p>
            <p><span className="text-white/40">Phone:</span> +91 9900094442</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "info-collected",
    title: "2. Information We Collect",
    content: (
      <div className="space-y-5 text-white/70 text-sm leading-relaxed">
        {[
          {
            label: "Personal Information",
            items: ["Full name", "Company name", "Email address", "Phone number", "Billing information", "Business contact details", "Account credentials"],
          },
          {
            label: "Technical Information",
            items: ["IP address", "Browser type and version", "Device information", "Operating system", "Access times and usage logs", "Cookies and analytics data"],
          },
          {
            label: "Communication Data",
            items: ["WhatsApp messages", "AI conversations", "Voice notes", "Uploaded files and documents", "Images and media shared through the platform", "Customer interaction records"],
          },
          {
            label: "Business Data",
            items: ["CRM integrations", "Workflow automation data", "API integration information", "Analytics and reporting information"],
          },
        ].map(({ label, items }) => (
          <div key={label}>
            <p className="text-white/55 font-600 text-xs uppercase tracking-[0.14em] mb-2">{label}</p>
            <ul className="space-y-1.5">
              {items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-white/30 mt-0.5 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "how-we-use",
    title: "3. How We Use Information",
    content: (
      <div className="space-y-3 text-white/70 text-sm leading-relaxed">
        <p>We use collected information for the following purposes:</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "Providing AI-powered services",
            "Operating WhatsApp AI agents",
            "Customer support and communication",
            "Improving platform performance",
            "Analytics and reporting",
            "AI training and optimization",
            "Service personalization",
            "Fraud prevention and security monitoring",
            "Payment processing",
            "Legal and regulatory compliance",
            "Sending operational notifications and updates",
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-white/30 mt-0.5 shrink-0">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "whatsapp-ai",
    title: "4. WhatsApp and AI Communications",
    content: (
      <div className="space-y-3 text-white/70 text-sm leading-relaxed">
        <p>Our services may process communications through WhatsApp Business APIs and other messaging platforms. By using our services, users acknowledge that:</p>
        <ul className="space-y-2">
          {[
            "Conversations may be processed by AI systems.",
            "Messages may be temporarily stored for service delivery, analytics, quality assurance, and automation purposes.",
            "AI-generated responses may not always be fully accurate.",
            "Users are responsible for obtaining proper consent from their customers before using automated messaging systems.",
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-white/30 mt-0.5 shrink-0">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-white/50 italic">Electi does not sell private conversation content to third parties.</p>
      </div>
    ),
  },
  {
    id: "legal-basis",
    title: "5. Legal Basis for Processing",
    content: (
      <div className="space-y-3 text-white/70 text-sm leading-relaxed">
        <p>We process information based on user consent, contractual necessity, legitimate business interests, legal obligations, and security and fraud prevention requirements.</p>
        <p>By using our services, users consent to the processing activities described in this Privacy Policy.</p>
      </div>
    ),
  },
  {
    id: "cookies",
    title: "6. Cookies and Tracking Technologies",
    content: (
      <div className="space-y-3 text-white/70 text-sm leading-relaxed">
        <p>Electi may use cookies, tracking pixels, analytics tools, and similar technologies to improve website functionality, analyze traffic and usage patterns, enhance user experience, monitor system performance, and support marketing and analytics activities.</p>
        <p>Users may control cookie settings through their browser preferences. Disabling cookies may affect certain functionalities of the platform.</p>
      </div>
    ),
  },
  {
    id: "third-party",
    title: "7. Third-Party Services and Integrations",
    content: (
      <div className="space-y-3 text-white/70 text-sm leading-relaxed">
        <p>Our services may integrate with Meta Platforms, Google Services, OpenAI, cloud hosting providers, payment gateways, CRM systems, and analytics platforms. These third-party platforms may independently collect and process information according to their own privacy policies.</p>
        <p className="text-white/50 italic">Electi is not responsible for third-party privacy practices.</p>
      </div>
    ),
  },
  {
    id: "data-sharing",
    title: "8. Data Sharing and Disclosure",
    content: (
      <div className="space-y-3 text-white/70 text-sm leading-relaxed">
        <p>We do not sell personal information. However, we may share information with authorized service providers, cloud infrastructure partners, payment processors, technical support providers, legal authorities when required by law, regulatory agencies, and business partners necessary for service delivery.</p>
        <p>Information may also be disclosed to protect platform security, prevent fraud or abuse, enforce legal rights, or comply with legal obligations.</p>
      </div>
    ),
  },
  {
    id: "international-transfers",
    title: "9. International Data Transfers",
    content: (
      <div className="space-y-3 text-white/70 text-sm leading-relaxed">
        <p>Data may be processed or stored in multiple jurisdictions including Saudi Arabia, India, and other countries where our technology providers operate.</p>
        <p>By using our services, users consent to international data transfers necessary for service operation. Electi takes commercially reasonable measures to protect transferred information.</p>
      </div>
    ),
  },
  {
    id: "security",
    title: "10. Data Security",
    content: (
      <div className="space-y-3 text-white/70 text-sm leading-relaxed">
        <p>Electi implements technical, organizational, and administrative safeguards to protect information against unauthorized access, data loss, misuse, alteration, disclosure, and cybersecurity threats.</p>
        <p>However, no internet-based system can guarantee absolute security. Users acknowledge that they provide information at their own risk.</p>
      </div>
    ),
  },
  {
    id: "retention",
    title: "11. Data Retention",
    content: (
      <div className="space-y-3 text-white/70 text-sm leading-relaxed">
        <p>We retain information only for as long as reasonably necessary to provide services, meet contractual obligations, resolve disputes, maintain security records, and comply with legal requirements.</p>
        <p>Retention periods may vary depending on the type of information and applicable laws.</p>
      </div>
    ),
  },
  {
    id: "user-rights",
    title: "12. User Rights",
    content: (
      <div className="space-y-3 text-white/70 text-sm leading-relaxed">
        <p>Subject to applicable laws, users may have the right to:</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            "Access their information",
            "Correct inaccurate data",
            "Request deletion of personal information",
            "Withdraw consent",
            "Restrict processing",
            "Object to certain processing activities",
            "Request data portability",
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-white/30 mt-0.5 shrink-0">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-white/50 italic">Requests may be submitted through the contact details below. Electi may require identity verification before processing requests.</p>
      </div>
    ),
  },
  {
    id: "childrens-privacy",
    title: "13. Children's Privacy",
    content: (
      <div className="space-y-2 text-white/70 text-sm leading-relaxed">
        <p>Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from minors.</p>
        <p>If we become aware of unauthorized collection of children's information, appropriate steps will be taken to remove such data.</p>
      </div>
    ),
  },
  {
    id: "ai-decisions",
    title: "14. AI and Automated Decision-Making",
    content: (
      <div className="space-y-3 text-white/70 text-sm leading-relaxed">
        <p>Electi uses artificial intelligence systems to automate communications and workflows. Users acknowledge that AI systems may analyze conversations and user inputs, automated responses may influence customer interactions, AI outputs may contain inaccuracies, and human review may be required for important business decisions.</p>
        <p className="text-white/50 italic">Electi is not responsible for decisions made solely based on AI-generated outputs.</p>
      </div>
    ),
  },
  {
    id: "platform-security",
    title: "15. Platform Security Responsibilities",
    content: (
      <div className="space-y-3 text-white/70 text-sm leading-relaxed">
        <p>Users are responsible for protecting login credentials, managing access permissions, maintaining secure systems on their side, preventing unauthorized use of connected accounts, and ensuring lawful customer communication practices.</p>
        <p className="text-white/50 italic">Electi shall not be liable for security incidents caused by user negligence.</p>
      </div>
    ),
  },
  {
    id: "meta-compliance",
    title: "16. Meta and WhatsApp Compliance",
    content: (
      <div className="space-y-3 text-white/70 text-sm leading-relaxed">
        <p>Users acknowledge that WhatsApp messaging services are governed by Meta's policies, users are responsible for maintaining proper customer opt-ins, Electi does not guarantee WhatsApp account approval or uninterrupted messaging access, and Meta may independently suspend or restrict accounts.</p>
        <p>Users must comply with all applicable messaging and anti-spam regulations.</p>
      </div>
    ),
  },
  {
    id: "liability",
    title: "17. Limitation of Liability",
    content: (
      <ul className="space-y-2 text-white/70 text-sm leading-relaxed">
        {[
          "Electi shall not be liable for indirect or consequential damages.",
          "Electi does not guarantee uninterrupted service availability.",
          "Electi shall not be responsible for losses resulting from third-party platform failures, cyber incidents, or unauthorized access.",
          "Users utilize the services at their own risk.",
        ].map((item) => (
          <li key={item} className="flex gap-3">
            <span className="text-white/30 mt-0.5 shrink-0">—</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "policy-changes",
    title: "18. Changes to This Privacy Policy",
    content: (
      <div className="space-y-2 text-white/70 text-sm leading-relaxed">
        <p>Electi reserves the right to modify or update this Privacy Policy at any time. Updated versions will be published on our website with revised effective dates.</p>
        <p>Continued use of the services constitutes acceptance of the updated Privacy Policy.</p>
      </div>
    ),
  },
  {
    id: "governing-law",
    title: "19. Governing Law",
    content: (
      <div className="space-y-2 text-white/70 text-sm leading-relaxed">
        <p>This Privacy Policy shall be governed in accordance with the laws of the Kingdom of Saudi Arabia for Saudi operations, and the laws of India for Indian operations.</p>
        <p>Any disputes shall be subject to the jurisdiction of the respective competent courts.</p>
      </div>
    ),
  },
  {
    id: "contact",
    title: "20. Contact Information",
    content: (
      <div className="space-y-6">
        <div>
          <p className="text-white/60 text-sm font-600 uppercase tracking-[0.14em] mb-3">Saudi Arabia Office</p>
          <div className="space-y-1 text-white/70 text-sm leading-relaxed">
            <p>Electi AI</p>
            <p><a href="mailto:a@electi.sa" className="text-white/80 hover:text-white transition-colors">a@electi.sa</a></p>
            <p>+966 506554599 / +966 569636393</p>
            <p>Northern Ring Br Rd, Almasiaf, Riyadh, KSA</p>
          </div>
        </div>
        <div className="h-px bg-white/6" />
        <div>
          <p className="text-white/60 text-sm font-600 uppercase tracking-[0.14em] mb-3">India Office</p>
          <div className="space-y-1 text-white/70 text-sm leading-relaxed">
            <p>Stoned Tailor - X360</p>
            <p><a href="mailto:a@electi.sa" className="text-white/80 hover:text-white transition-colors">a@electi.sa</a> / <a href="mailto:a@electi.sa" className="text-white/80 hover:text-white transition-colors">a@electi.sa</a></p>
            <p>+91 9900094442</p>
            <p>5/12 Roshan Colony, Jayanagar 4th T Block, Bangalore 560041, India</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "google-meta",
    title: "21. Google API Services & Data Handling",
    content: (
      <div className="space-y-5 text-white/70 text-sm leading-relaxed">
        <p>Electi's use and transfer of information received from Google APIs adheres to the <strong className="text-white/85 font-600">Google API Services User Data Policy</strong>, including the Limited Use requirements.</p>

        <div>
          <p className="text-white/60 text-xs font-600 uppercase tracking-[0.14em] mb-2">How We Use Google Data</p>
          <ul className="space-y-1.5 text-white/65">
            {[
              "Gmail — Read authorized messages, draft and send emails, and organize conversations, solely to perform functions requested by the user's AI agent.",
              "Google Calendar — Create, update, and manage calendar events and reminders as instructed by the user's AI agent.",
              "Google Drive — Access and organize authorized files and folders as directed by the user's AI agent.",
              "Google Docs — Create, read, and update documents to generate proposals, reports, and contracts on behalf of the user.",
              "Google Sheets — Read and update spreadsheets to maintain CRM records, track leads, and generate reports.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white/60 text-xs font-600 uppercase tracking-[0.14em] mb-2">User Control & Privacy Commitments</p>
          <ul className="space-y-1.5 text-white/65">
            {[
              "Google user data is only accessed after explicit user authorization through Google's OAuth process.",
              "Permissions are only requested when a user chooses to connect their Google account to an AI agent.",
              "Google user data is used solely to provide the specific functionality requested within the user's authorized AI agent.",
              "ELECTI does not sell, share, or transfer Google user data to third parties.",
              "ELECTI does not use Google user data to serve advertising.",
              "Users may revoke Google access at any time through their Google Account settings at myaccount.google.com.",
              "Only the minimum necessary permissions are requested — nothing beyond what the user explicitly enables.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p>For full details on how Google Workspace integrations work, visit <a href="/google" className="text-white/80 hover:text-white transition-colors underline underline-offset-2">/google</a>.</p>

        <div className="rounded-xl border border-white/10 px-5 py-4" style={{ background: "rgba(66,133,244,0.05)" }}>
          <p className="text-white/75 text-sm font-500 leading-relaxed">
            Google and Microsoft permissions are requested only when authorized by the user and are used solely to provide the requested functionality. Users remain in full control of their data and can revoke access at any time.
          </p>
        </div>

        <div className="h-px bg-white/6" />
        <p>Electi is also committed to maintaining compliance with Meta Platform Policies, WhatsApp Business Policies, applicable privacy and data protection laws, and anti-spam and communication regulations. Users are responsible for ensuring their operational compliance while using our services.</p>
      </div>
    ),
  },
];

export default function Privacy() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);
  const [navHidden,   setNavHidden]   = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const st = el.scrollTop;
      setNavScrolled(st > 30);
      setNavHidden(st > lastScrollRef.current && st > 80);
      lastScrollRef.current = st;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} className="bg-[#050505] text-white" style={{ height: "100dvh", overflowY: "scroll", overflowX: "hidden", scrollSnapType: "y mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}>
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
      <SEOHead title="Privacy Policy | Electi" titleAr="سياسة الخصوصية | إليكتي" description="Electi's Privacy Policy — how we collect, use, and protect your data on our AI workforce and automation platform." descriptionAr="سياسة خصوصية إليكتي — كيف نجمع بياناتك ونستخدمها ونحميها على منصة قوى العمل بالذكاء الاصطناعي." path="/privacy" />
      <Navbar hidden={navHidden} scrolled={navScrolled} />

      <div className="max-w-4xl mx-auto px-6 sm:px-10 pt-32 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="mb-16"
        >
          <p className="text-white/35 text-xs font-600 uppercase tracking-[0.22em] mb-4">Legal</p>
          <h1 className="text-3xl sm:text-4xl font-600 text-white mb-5" style={{ letterSpacing: "0.06em" }}>
            Privacy Policy
          </h1>
          <div className="h-px w-20 bg-white/20 mb-5" />
          <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
            Electi AI respects your privacy and is committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, process, store, disclose, and safeguard
            your information when you use our websites, applications, AI systems, WhatsApp AI agents,
            dashboards, APIs, and related services.
          </p>
          <p className="text-white/30 text-xs mt-4 italic">
            By accessing or using our services, you acknowledge that you have read and understood this Privacy Policy.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-1">
          {sections.map((section, i) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 * i, ease }}
              className="border border-white/6 rounded-xl overflow-hidden"
            >
              <div className="px-6 py-5 bg-white/[0.02]">
                <h2 className="text-white/90 text-sm font-600 uppercase tracking-[0.14em]">{section.title}</h2>
              </div>
              <div className="px-6 py-5 border-t border-white/4">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          className="mt-12 pt-8 border-t border-white/6 text-center"
        >
          <p className="text-white/30 text-xs leading-relaxed">
            By using Electi's services, you acknowledge and agree to this Privacy Policy.
          </p>
          <p className="text-white/20 text-xs mt-3">© 2026 Electi AI. All rights reserved.</p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
