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
    id: "definitions",
    title: "2. Definitions",
    content: (
      <ul className="space-y-3 text-white/70 text-sm leading-relaxed">
        {[
          ['"Services"', 'refers to all AI-powered solutions, WhatsApp AI agents, automation systems, dashboards, APIs, websites, integrations, support systems, analytics tools, and related digital services provided by Electi.'],
          ['"User," "Client," or "Customer"', 'means any individual, business, organization, or entity accessing or using our services.'],
          ['"WhatsApp AI Agent"', 'refers to AI-powered communication and automation systems integrated with WhatsApp Business APIs or similar messaging platforms.'],
          ['"Platform"', "refers to Electi's website, web applications, dashboards, mobile applications, APIs, and associated systems."],
          ['"Content"', 'means messages, media, files, data, text, images, videos, voice notes, and any other material shared through the platform.'],
        ].map(([term, def]) => (
          <li key={term} className="flex gap-3">
            <span className="text-white/30 mt-0.5 shrink-0">—</span>
            <span><span className="text-white/90 font-500">{term}</span> {def}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "eligibility",
    title: "3. Eligibility",
    content: (
      <div>
        <p className="text-white/70 text-sm leading-relaxed mb-4">By using our services, you confirm that:</p>
        <ul className="space-y-2 text-white/70 text-sm leading-relaxed">
          {[
            'You are at least 18 years old.',
            'You have the legal authority to enter into binding agreements.',
            'You will use the services in compliance with applicable local and international laws.',
            'You are authorized to represent your organization if using the services on behalf of a business.',
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
    id: "services",
    title: "4. Services Provided",
    content: (
      <div>
        <p className="text-white/70 text-sm leading-relaxed mb-4">Electi provides AI-powered communication and automation solutions, including but not limited to:</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white/70 text-sm mb-4">
          {[
            'WhatsApp AI Agents',
            'Customer support automation',
            'Lead generation and qualification systems',
            'Appointment booking automation',
            'AI-powered conversational assistants',
            'CRM integrations',
            'API and workflow integrations',
            'Analytics and reporting systems',
            'Multi-language AI communication systems',
            'Voice, image, and document processing systems',
            'Enterprise AI automation services',
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-white/30 mt-0.5 shrink-0">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-white/50 text-sm italic">Electi reserves the right to modify, suspend, upgrade, or discontinue any service at any time without prior notice.</p>
      </div>
    ),
  },
  {
    id: "third-party",
    title: "5. Third-Party Platforms and Integrations",
    content: (
      <div className="space-y-4 text-white/70 text-sm leading-relaxed">
        <p>Our services may integrate with third-party platforms including but not limited to: Meta Platforms (WhatsApp, Facebook, Instagram), Google Services, OpenAI, CRM providers, cloud hosting providers, payment gateways, and telecommunication providers.</p>
        <p>Users acknowledge that:</p>
        <ul className="space-y-2">
          {[
            'Electi is not owned, operated, endorsed, or officially affiliated with Meta Platforms unless explicitly stated.',
            "WhatsApp messaging services are subject to Meta's policies and terms.",
            'Third-party service interruptions, API limitations, policy changes, outages, or restrictions may affect functionality.',
            'Electi is not liable for losses caused by third-party platform changes or restrictions.',
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
    id: "user-responsibilities",
    title: "6. User Responsibilities",
    content: (
      <div className="space-y-4 text-white/70 text-sm leading-relaxed">
        <div>
          <p className="mb-3">Users agree that they will:</p>
          <ul className="space-y-2">
            {[
              'Provide accurate and updated information.',
              'Maintain the confidentiality of login credentials.',
              'Use the services only for lawful business purposes.',
              'Not use the platform for spam, fraud, harassment, misinformation, illegal activities, or abusive behavior.',
              'Not attempt to reverse engineer, copy, disrupt, or damage the platform.',
              'Obtain proper customer consent before sending automated WhatsApp communications.',
              'Comply with WhatsApp Business policies, Meta policies, anti-spam regulations, and data protection laws.',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-white/30 mt-0.5 shrink-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3">Users are solely responsible for:</p>
          <ul className="space-y-2">
            {[
              'The content transmitted using the services.',
              'Compliance with local communication laws.',
              'Maintaining customer consent records.',
              'Any business decisions made based on AI-generated responses.',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-white/30 mt-0.5 shrink-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "ai-disclaimer",
    title: "7. AI-Generated Responses Disclaimer",
    content: (
      <div className="space-y-4 text-white/70 text-sm leading-relaxed">
        <p>Electi uses artificial intelligence and automation technologies to generate responses and automate workflows. Users acknowledge and agree that:</p>
        <ul className="space-y-2">
          {[
            'AI-generated responses may occasionally contain inaccuracies, incomplete information, or unexpected outputs.',
            'Electi does not guarantee that AI-generated content will always be accurate, complete, or error-free.',
            'Users are responsible for reviewing and validating AI-generated responses before relying on them.',
            'Electi is not responsible for damages, losses, misunderstandings, or business impacts resulting from AI-generated outputs.',
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-white/30 mt-0.5 shrink-0">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-white/50 italic">AI systems should not be used as a substitute for legal, financial, medical, or professional advice.</p>
      </div>
    ),
  },
  {
    id: "data-privacy",
    title: "8. Data Privacy and Protection",
    content: (
      <div className="space-y-4 text-white/70 text-sm leading-relaxed">
        <p>Electi is committed to protecting user privacy and maintaining secure systems. By using our services, users agree that:</p>
        <ul className="space-y-2">
          {[
            'Data may be processed for service delivery, automation, analytics, and support purposes.',
            'Conversations, media, and interactions may be stored temporarily or permanently depending on service configurations.',
            'Data may be processed using secure third-party cloud infrastructure.',
            'Users are responsible for obtaining proper consent from their customers before collecting or processing personal data.',
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-white/30 mt-0.5 shrink-0">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>Electi implements commercially reasonable security measures; however, no system can guarantee absolute security. Users acknowledge that internet transmissions may not always be completely secure.</p>
      </div>
    ),
  },
  {
    id: "ip",
    title: "9. Intellectual Property Rights",
    content: (
      <div className="space-y-4 text-white/70 text-sm leading-relaxed">
        <p>All intellectual property rights related to Electi's services, software, branding, AI systems, workflows, APIs, content, logos, designs, dashboards, and technologies remain the exclusive property of Electi or its licensors.</p>
        <p>Users may not:</p>
        <ul className="space-y-2">
          {[
            'Copy, reproduce, distribute, or resell our systems without written authorization.',
            'Use Electi branding without permission.',
            'Reverse engineer or replicate the platform.',
            'Claim ownership over Electi technologies or proprietary workflows.',
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-white/30 mt-0.5 shrink-0">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-white/50 italic">Any custom developments provided to clients remain subject to contractual agreements.</p>
      </div>
    ),
  },
  {
    id: "payments",
    title: "10. Subscription, Payments, and Billing",
    content: (
      <div className="space-y-4 text-white/70 text-sm leading-relaxed">
        <p>Certain services may require paid subscriptions or custom project payments. Users agree that:</p>
        <ul className="space-y-2">
          {[
            'All fees must be paid on time.',
            'Failure to pay may result in service suspension or termination.',
            'Subscription fees are generally non-refundable unless explicitly agreed in writing.',
            'Electi may revise pricing with prior notice.',
            'Taxes, duties, transaction charges, and government fees are the responsibility of the client.',
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-white/30 mt-0.5 shrink-0">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-white/50 italic">For enterprise services, separate commercial agreements may apply.</p>
      </div>
    ),
  },
  {
    id: "availability",
    title: "11. Service Availability",
    content: (
      <div className="space-y-4 text-white/70 text-sm leading-relaxed">
        <p>Electi aims to maintain reliable service availability but does not guarantee uninterrupted operation. Services may be affected by scheduled maintenance, server downtime, internet connectivity issues, API limitations, third-party outages, cybersecurity incidents, regulatory restrictions, or force majeure events.</p>
        <p className="text-white/50 italic">Electi shall not be liable for temporary service interruptions or delays.</p>
      </div>
    ),
  },
  {
    id: "acceptable-use",
    title: "12. Acceptable Use Policy",
    content: (
      <div className="space-y-4 text-white/70 text-sm leading-relaxed">
        <p>Users must not use Electi services for:</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            'Illegal or unauthorized activities',
            'Fraudulent schemes',
            'Spam or mass unsolicited messaging',
            'Hate speech or abusive content',
            'Harassment or threats',
            'Distribution of malware or harmful software',
            'Adult, illegal, or prohibited content',
            'Violations of intellectual property rights',
            'Misleading AI impersonation',
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-white/30 mt-0.5 shrink-0">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-white/50 italic">Electi reserves the right to suspend or terminate accounts violating these policies.</p>
      </div>
    ),
  },
  {
    id: "whatsapp",
    title: "13. WhatsApp and Messaging Compliance",
    content: (
      <div className="space-y-3 text-white/70 text-sm leading-relaxed">
        {[
          'They are solely responsible for complying with WhatsApp Business and Meta messaging policies.',
          'Message templates, campaign content, opt-ins, and customer consent are the responsibility of the user.',
          'Electi does not guarantee WhatsApp account approvals or message delivery rates.',
          'WhatsApp or Meta may suspend or restrict accounts independently.',
          'Electi is not responsible for bans, restrictions, or penalties imposed by third-party messaging providers.',
        ].map((item) => (
          <div key={item} className="flex gap-3">
            <span className="text-white/30 mt-0.5 shrink-0">—</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "confidentiality",
    title: "14. Confidentiality",
    content: (
      <div className="space-y-3 text-white/70 text-sm leading-relaxed">
        <p>Both parties agree to maintain confidentiality regarding non-public business, technical, operational, or commercial information shared during the engagement.</p>
        <p>Confidential information shall not be disclosed to unauthorized third parties unless required by law, approved in writing, or necessary for service delivery.</p>
        <p className="text-white/50 italic">This obligation survives termination of services.</p>
      </div>
    ),
  },
  {
    id: "liability",
    title: "15. Limitation of Liability",
    content: (
      <div className="space-y-3 text-white/70 text-sm leading-relaxed">
        <p>To the maximum extent permitted by applicable law:</p>
        <ul className="space-y-2">
          {[
            'Electi shall not be liable for indirect, incidental, special, punitive, or consequential damages.',
            "Electi's total liability shall not exceed the amount paid by the user for the services during the previous three months.",
            'Electi shall not be liable for business losses, data loss, revenue loss, reputational damage, customer disputes, or interruption of operations.',
            'Electi is not responsible for decisions made based on AI-generated outputs.',
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-white/30 mt-0.5 shrink-0">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-white/50 italic">Users agree to use the services at their own risk.</p>
      </div>
    ),
  },
  {
    id: "indemnification",
    title: "16. Indemnification",
    content: (
      <p className="text-white/70 text-sm leading-relaxed">Users agree to indemnify and hold harmless Electi, its directors, employees, partners, affiliates, and agents from any claims, damages, liabilities, losses, costs, or legal expenses arising from user misconduct, violation of these Terms, illegal messaging activities, customer disputes, unauthorized data usage, or violations of third-party rights.</p>
    ),
  },
  {
    id: "termination",
    title: "17. Account Suspension and Termination",
    content: (
      <div className="space-y-3 text-white/70 text-sm leading-relaxed">
        <p>Electi reserves the right to suspend, restrict, or terminate services immediately if users violate these Terms, fraudulent or illegal activities are suspected, payments remain overdue, platform security is threatened, or required by law or regulatory authorities.</p>
        <p>Users may discontinue services at any time subject to applicable contractual obligations.</p>
      </div>
    ),
  },
  {
    id: "governing-law",
    title: "18. Governing Law and Jurisdiction",
    content: (
      <div className="space-y-3 text-white/70 text-sm leading-relaxed">
        <p>These Terms shall be governed and interpreted in accordance with the laws of the Kingdom of Saudi Arabia for operations managed under the Saudi entity, and India for operations managed under the Indian entity.</p>
        <p>Any disputes shall be subject to the exclusive jurisdiction of the competent courts in the respective operating jurisdiction unless otherwise agreed in writing.</p>
      </div>
    ),
  },
  {
    id: "force-majeure",
    title: "19. Force Majeure",
    content: (
      <p className="text-white/70 text-sm leading-relaxed">Electi shall not be liable for delays or failures caused by events beyond reasonable control including natural disasters, government restrictions, internet outages, cyberattacks, war or civil disturbances, pandemic-related disruptions, power failures, or third-party service failures.</p>
    ),
  },
  {
    id: "changes",
    title: "20. Changes to Terms",
    content: (
      <div className="space-y-2 text-white/70 text-sm leading-relaxed">
        <p>Electi reserves the right to modify or update these Terms at any time. Updated versions will be published on our website with the revised effective date.</p>
        <p>Continued use of the services after updates constitutes acceptance of the revised Terms.</p>
      </div>
    ),
  },
  {
    id: "contact",
    title: "22. Contact Information",
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
];

export default function Terms() {
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
      <SEOHead title="Terms of Service | Electi" titleAr="شروط الخدمة | إليكتي" description="Read Electi's Terms of Service governing the use of our AI workforce platform, agents, and automation services." descriptionAr="اقرأ شروط خدمة إليكتي التي تحكم استخدام منصة قوى العمل بالذكاء الاصطناعي والوكلاء وخدمات الأتمتة." path="/terms-of-use" />
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
            Terms &amp; Conditions
          </h1>
          <div className="h-px w-20 bg-white/20 mb-5" />
          <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
            Welcome to Electi. These Terms and Conditions govern your access to and use of the websites,
            applications, WhatsApp AI agents, communication systems, APIs, dashboards, and services provided
            by Electi. By accessing or using our services, you agree to be legally bound by these Terms.
          </p>
          <p className="text-white/30 text-xs mt-4 italic">
            If you do not agree with any part of these Terms, you must discontinue the use of our services immediately.
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
          <div className="mb-5 rounded-xl border border-white/10 px-5 py-4 text-start" style={{ background: "rgba(66,133,244,0.05)" }}>
            <p className="text-white/70 text-sm font-500 leading-relaxed">
              Google and Microsoft permissions are requested only when authorized by the user and are used solely to provide the requested functionality. Users remain in full control of their data and can revoke access at any time.
            </p>
          </div>
          <p className="text-white/30 text-xs leading-relaxed">
            These Terms constitute the complete agreement between the user and Electi regarding the use of the services
            and supersede all prior agreements. If any provision is found invalid, the remaining provisions continue in full effect.
          </p>
          <p className="text-white/20 text-xs mt-3">© 2026 Electi AI. All rights reserved.</p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
