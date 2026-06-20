export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  client: string;
  industry: string;
  services: string[];
  location: string;
  year: string;
  duration: string;
  heroTag: string;
  challenge: string;
  solution: string;
  results: { metric: string; label: string }[];
  testimonial: { quote: string; author: string; role: string };
  tags: string[];
  relatedLinks: { label: string; href: string }[];
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "karim-hotel-riyadh-virtual-tour",
    title: "Karim Hotel Riyadh — 360° Virtual Tour Experience",
    subtitle: "A professional virtual tour enabling guests of Karim Hotel (Dayafa Group) to explore the property digitally before booking",
    client: "Karim Hotel Riyadh — Dayafa Group",
    industry: "Hospitality",
    services: ["360° Virtual Tours", "Google Street View Integration", "Bilingual Tour Setup"],
    location: "Riyadh, Saudi Arabia",
    year: "2024",
    duration: "2 weeks",
    heroTag: "Hospitality",
    challenge: "Karim Hotel Riyadh, part of the established Dayafa Group portfolio, needed a way to present their property online that went beyond static photography. Potential guests browsing on mobile devices or booking through OTAs had no way to explore the hotel's rooms, lobby, dining areas, and facilities before committing to a reservation. The goal was a professional digital presence that would build guest confidence and support the hotel's marketing and distribution channels.",
    solution: "X360 produced a complete 360° virtual tour of Karim Hotel Riyadh, capturing all key guest-facing areas — guest rooms, lobby, dining spaces, and supporting facilities. The tour was delivered as an embeddable, mobile-responsive experience compatible with all major platforms and devices. X360 handled the full production pipeline: scheduling, professional capture using high-resolution 360° camera systems, processing, and final delivery in a format ready for the hotel's website and marketing channels.",
    results: [
      { metric: "360°", label: "Full immersive tour — all key areas captured" },
      { metric: "All Devices", label: "Mobile, tablet, and desktop compatible" },
      { metric: "Dayafa Group", label: "Delivered for established hospitality portfolio" },
      { metric: "2 weeks", label: "End-to-end production and delivery" },
      { metric: "Embeddable", label: "Ready for website and OTA channels" },
      { metric: "Riyadh", label: "On-location professional production" },
    ],
    testimonial: {
      quote: "X360 delivered a complete 360° virtual tour for Karim Hotel Riyadh — covering all key guest areas and enabling digital property exploration from any device.",
      author: "Project Summary",
      role: "X360 — 360° Virtual Tours, Riyadh",
    },
    tags: ["Hospitality", "Hotel", "360° Virtual Tour", "Riyadh", "Dayafa Group", "Saudi Arabia"],
    relatedLinks: [
      { label: "Virtual Tours — Riyadh", href: "/virtual-tours/riyadh" },
      { label: "Hospitality Virtual Tours", href: "/virtual-tours/hospitality" },
      { label: "360° Virtual Tours", href: "/virtual-tours" },
    ],
    metaTitle: "Karim Hotel Riyadh 360° Virtual Tour — X360 Case Study",
    metaDescription: "X360 delivered a professional 360° virtual tour for Karim Hotel Riyadh (Dayafa Group), enabling guests to explore all hotel areas digitally before booking.",
    keywords: "hotel virtual tour Riyadh, Karim Hotel virtual tour, X360 hospitality case study, 360 tour Saudi Arabia",
    ogTitle: "Karim Hotel Riyadh — X360 Virtual Tour Case Study",
    ogDescription: "Full 360° virtual tour production for Karim Hotel Riyadh — all key areas captured, mobile-ready, and embeddable for hotel marketing channels.",
  },
  {
    slug: "ekal-website-development",
    title: "EKAL — Corporate Website Development",
    subtitle: "A professional, performance-first corporate website for EKAL — built for clarity, brand authority, and digital reach across Saudi Arabia",
    client: "EKAL",
    industry: "Corporate & Professional Services",
    services: ["Website Development", "UX Design", "Brand Integration", "Mobile Optimisation"],
    location: "Saudi Arabia",
    year: "2024",
    duration: "4 weeks",
    heroTag: "Web Development",
    challenge: "EKAL required a professional digital presence that would accurately reflect their brand positioning and service offering to corporate clients and partners. The existing digital footprint needed to be elevated to meet the standards expected by enterprise clients — with a clear information architecture, strong visual identity, and a seamless user experience across all devices. The website needed to perform well on mobile networks, load quickly, and communicate EKAL's value proposition with clarity and credibility.",
    solution: "X360 designed and developed a complete corporate website for EKAL from the ground up. The project began with a thorough discovery phase — understanding EKAL's business model, target audience, and competitive landscape — before moving into UX architecture, wireframing, and visual design aligned with the brand. The final delivery included a fully responsive, performance-optimised site with structured content sections, clear service presentation, and a streamlined contact and enquiry flow. The codebase was built for speed, SEO readiness, and ease of future content updates.",
    results: [
      { metric: "100%", label: "Responsive — mobile, tablet, and desktop" },
      { metric: "Corporate", label: "Brand-aligned design system delivered" },
      { metric: "Fast Load", label: "Performance-optimised for Saudi networks" },
      { metric: "4 weeks", label: "Discovery to live delivery" },
      { metric: "SEO Ready", label: "Structured for organic search visibility" },
      { metric: "Live", label: "ekal.co — operational and serving clients" },
    ],
    testimonial: {
      quote: "X360 built a professional, performance-first corporate website for EKAL — aligned with their brand identity and designed to serve enterprise clients across Saudi Arabia.",
      author: "Project Summary",
      role: "X360 — Website Development",
    },
    tags: ["Website Development", "Corporate", "Saudi Arabia", "UX Design", "Brand"],
    relatedLinks: [
      { label: "Website Development", href: "/development/website" },
      { label: "Corporate Websites", href: "/development/website/corporate" },
      { label: "Web Development Riyadh", href: "/development" },
    ],
    metaTitle: "EKAL Corporate Website Development — X360 Case Study",
    metaDescription: "X360 designed and developed a full corporate website for EKAL — mobile-responsive, performance-optimised, and brand-aligned for Saudi enterprise audiences.",
    keywords: "EKAL website development Saudi Arabia, corporate website X360, professional web design Riyadh",
    ogTitle: "EKAL — X360 Corporate Website Development Case Study",
    ogDescription: "Brand-aligned, performance-optimised corporate website for EKAL — built by X360 for professional impact across Saudi Arabia.",
  },
  {
    slug: "villa-fayrouz-website-development",
    title: "Villa Fayrouz — Hospitality Website Design & Development",
    subtitle: "An elegant, experience-first website for Villa Fayrouz — reflecting premium Saudi hospitality and driving guest engagement",
    client: "Villa Fayrouz",
    industry: "Hospitality",
    services: ["Website Development", "Hospitality UX", "Mobile Optimisation", "Brand Positioning"],
    location: "Saudi Arabia",
    year: "2024",
    duration: "3 weeks",
    heroTag: "Hospitality",
    challenge: "Villa Fayrouz needed a website that matched the premium quality of their hospitality offering and gave guests a compelling digital experience that would inspire bookings and reservations. The site needed to showcase the venue's atmosphere, menu, and brand character in a visually rich format — while remaining fast, mobile-friendly, and easy to navigate. The goal was a digital presence worthy of the Villa Fayrouz name.",
    solution: "X360 developed a visually rich, experience-led website for Villa Fayrouz centred on atmosphere and brand storytelling. The design prioritised immersive photography presentation, clean typography, and an intuitive navigation that guides guests through the venue's offering — from ambience and menu to reservations. The mobile experience was built mobile-first, ensuring that guests discovering the venue through social media or search could seamlessly move from discovery to enquiry. The site was delivered with a clean, maintainable structure for future menu and content updates.",
    results: [
      { metric: "Hospitality", label: "Experience-first design approach" },
      { metric: "Mobile First", label: "Optimised for social discovery journeys" },
      { metric: "Brand", label: "Premium identity reflected throughout" },
      { metric: "3 weeks", label: "Design to live delivery" },
      { metric: "Menu Ready", label: "Structured for easy content updates" },
      { metric: "Live", label: "villafayrouz.sa — operational" },
    ],
    testimonial: {
      quote: "X360 delivered an elegant hospitality website for Villa Fayrouz — experience-first design, mobile-optimised, and built to convert guest curiosity into reservations.",
      author: "Project Summary",
      role: "X360 — Hospitality Website Development",
    },
    tags: ["Hospitality", "Restaurant", "Website Development", "Saudi Arabia", "Brand", "Mobile"],
    relatedLinks: [
      { label: "Hospitality Website Development", href: "/development/website/hospitality" },
      { label: "Website Development", href: "/development/website" },
      { label: "Hospitality Virtual Tours", href: "/virtual-tours/hospitality" },
    ],
    metaTitle: "Villa Fayrouz Hospitality Website — X360 Case Study",
    metaDescription: "X360 designed and developed a premium hospitality website for Villa Fayrouz — mobile-first, brand-aligned, and built to inspire bookings and guest engagement.",
    keywords: "Villa Fayrouz website, hospitality web design Saudi Arabia, restaurant website development X360",
    ogTitle: "Villa Fayrouz — X360 Hospitality Website Case Study",
    ogDescription: "Experience-first hospitality website for Villa Fayrouz — designed by X360 to reflect premium Saudi hospitality and drive guest engagement.",
  },
  {
    slug: "balcona99-website-development",
    title: "Balcona99 — Restaurant Digital Presence & Website",
    subtitle: "A vibrant, brand-led website for Balcona99 — capturing the restaurant's identity and building a seamless digital guest journey",
    client: "Balcona99",
    industry: "Hospitality",
    services: ["Website Development", "Restaurant UX", "Mobile Optimisation", "Reservation Journey Design"],
    location: "Saudi Arabia",
    year: "2024",
    duration: "3 weeks",
    heroTag: "Restaurant",
    challenge: "Balcona99 needed a digital presence that reflected their brand energy and gave guests a clear, engaging path from discovery to reservation. The restaurant market in Saudi Arabia is highly visual and social — a website needed to capture the brand's character instantly, present the menu and experience with impact, and make the reservation process frictionless on mobile. The brief was to build something that felt as good as the restaurant itself.",
    solution: "X360 designed and built a brand-led website for Balcona99 that led with visual identity and restaurant atmosphere. The design process prioritised brand consistency — ensuring that the colour palette, typography, and photography presentation all felt cohesive with Balcona99's physical experience. The navigation was structured to guide guests naturally: discover the concept, explore the menu, and reserve a table — all within a few taps on mobile. The final site was delivered with a clean, responsive build optimised for performance across Saudi networks.",
    results: [
      { metric: "Brand Led", label: "Visual identity at the core of design" },
      { metric: "Mobile", label: "Frictionless guest journey on all devices" },
      { metric: "Reservations", label: "Clear conversion path from discovery" },
      { metric: "3 weeks", label: "Design to live delivery" },
      { metric: "Saudi Market", label: "Built for local discovery and engagement" },
      { metric: "Live", label: "balcona99.sa — operational" },
    ],
    testimonial: {
      quote: "X360 built a brand-led digital presence for Balcona99 — capturing restaurant identity, simplifying the reservation journey, and delivering a seamless mobile experience.",
      author: "Project Summary",
      role: "X360 — Restaurant Website Development",
    },
    tags: ["Restaurant", "Hospitality", "Website Development", "Saudi Arabia", "Brand", "Reservations"],
    relatedLinks: [
      { label: "Hospitality Website Development", href: "/development/website/hospitality" },
      { label: "Website Development", href: "/development/website" },
      { label: "Virtual Tours — Hospitality", href: "/virtual-tours/hospitality" },
    ],
    metaTitle: "Balcona99 Restaurant Website — X360 Case Study",
    metaDescription: "X360 designed and built the Balcona99 restaurant website — brand-first, mobile-optimised, with a clear guest journey from discovery to reservation.",
    keywords: "Balcona99 website Saudi Arabia, restaurant web design X360, hospitality digital presence Riyadh",
    ogTitle: "Balcona99 — X360 Restaurant Website Case Study",
    ogDescription: "Brand-led restaurant website for Balcona99 — designed by X360 with a seamless mobile reservation journey and strong visual identity.",
  },
  {
    slug: "joori-min-beirut-website-development",
    title: "Joori Min Beirut — Restaurant Website & Digital Identity",
    subtitle: "A warm, story-driven website for Joori Min Beirut — bringing authentic Lebanese hospitality to life online",
    client: "Joori Min Beirut",
    industry: "Hospitality",
    services: ["Website Development", "Restaurant UX", "Brand Identity Online", "Mobile Optimisation"],
    location: "Saudi Arabia",
    year: "2024",
    duration: "3 weeks",
    heroTag: "Restaurant",
    challenge: "Joori Min Beirut brings authentic Lebanese cuisine and culture to the Saudi dining scene. Their website needed to convey warmth, authenticity, and the story behind the brand — not just list menu items. Guests discovering the restaurant online, whether through social media or search, needed to immediately feel the character and quality of the experience that awaited them. The site also needed to work beautifully on mobile, where most discovery in the Saudi F&B market happens.",
    solution: "X360 developed a story-driven website for Joori Min Beirut that placed brand narrative and Lebanese cultural warmth at the centre of the design. The site was structured to introduce the restaurant's concept and origins before guiding guests through the menu and into a clear enquiry or reservation path. Rich typographic treatment and photography presentation were used to evoke the restaurant's atmosphere. The full build was delivered mobile-first — ensuring that the experience on a phone felt as crafted as the desktop version — with fast load times and an accessible, intuitive structure.",
    results: [
      { metric: "Story Led", label: "Brand narrative drives the experience" },
      { metric: "Lebanese", label: "Cultural identity reflected throughout" },
      { metric: "Mobile First", label: "Optimised for F&B discovery on mobile" },
      { metric: "3 weeks", label: "Design to live delivery" },
      { metric: "Guest Journey", label: "Seamless from discovery to enquiry" },
      { metric: "Live", label: "jooriminbeirut.com — operational" },
    ],
    testimonial: {
      quote: "X360 delivered a warm, story-driven website for Joori Min Beirut — bringing authentic Lebanese brand character to life digitally with a seamless mobile guest experience.",
      author: "Project Summary",
      role: "X360 — Restaurant Website Development",
    },
    tags: ["Restaurant", "Lebanese", "Hospitality", "Website Development", "Saudi Arabia", "Brand", "Mobile"],
    relatedLinks: [
      { label: "Hospitality Website Development", href: "/development/website/hospitality" },
      { label: "Website Development", href: "/development/website" },
      { label: "Virtual Tours — Hospitality", href: "/virtual-tours/hospitality" },
    ],
    metaTitle: "Joori Min Beirut Restaurant Website — X360 Case Study",
    metaDescription: "X360 designed a story-driven website for Joori Min Beirut — mobile-first, brand-led, and built to bring authentic Lebanese hospitality to life online in Saudi Arabia.",
    keywords: "Joori Min Beirut website, Lebanese restaurant digital presence Saudi Arabia, X360 restaurant web design",
    ogTitle: "Joori Min Beirut — X360 Restaurant Website Case Study",
    ogDescription: "Story-driven, mobile-first restaurant website for Joori Min Beirut — designed by X360 to bring authentic Lebanese brand character to life online.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}
