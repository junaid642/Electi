export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  status: "published" | "draft";
  author: string;
  date: string;
}

export const SEED_POSTS: BlogPost[] = [
  {
    id: "b1",
    title: "The Future of 360° Virtual Tours in Saudi Real Estate",
    slug: "360-virtual-tours-saudi-real-estate",
    excerpt: "How immersive virtual experiences are transforming property showcasing in the Kingdom.",
    content: "Saudi Arabia's real estate market is undergoing a profound digital transformation. As Vision 2030 accelerates infrastructure investment and residential development, property developers and real estate agencies are under pressure to reach buyers faster — and from further away.\n\nX360's 360° virtual tour technology addresses this head-on. Rather than requiring potential buyers to travel to a site, our photorealistic immersive tours let them walk through every room, explore the neighbourhood, and experience the property at their own pace — from anywhere in the world.\n\nThe results speak for themselves. Clients using X360 virtual tours report a 40% reduction in time-to-decision, 3× more international enquiries, and significantly higher engagement on property listings.\n\nLooking ahead, we see 360° tours becoming the default first step in any property viewing journey in Saudi Arabia. The developers who adopt this technology today will have a decisive competitive advantage in the years ahead.",
    category: "Industry Insights",
    status: "published",
    author: "X360 Team",
    date: "2025-06-01",
  },
  {
    id: "b2",
    title: "How AI is Powering the Next Generation of Business Websites",
    slug: "ai-powered-business-websites",
    excerpt: "From intelligent chatbots to adaptive UX — X360's AI-driven web solutions deliver measurable results.",
    content: "Modern business websites are no longer static brochures. They are intelligent, living platforms that engage visitors, qualify leads, and convert opportunities — all without human intervention.\n\nAt X360, we integrate AI agents, smart search, personalised content delivery, and automated lead qualification directly into the websites we build. Our AI assistants answer questions instantly, capture lead data, route enquiries to the right team, and follow up automatically.\n\nFor our clients, this translates to measurable results: reduced response times from hours to seconds, higher lead capture rates, and a richer understanding of what potential customers actually want.\n\nIf your website is still a passive digital brochure, it's time to upgrade. The future of business development is automated, intelligent, and always-on.",
    category: "Technology",
    status: "published",
    author: "X360 Team",
    date: "2025-05-20",
  },
  {
    id: "b3",
    title: "NEOM Digital Transformation: A Case Study",
    slug: "neom-digital-transformation-case-study",
    excerpt: "How X360 helped NEOM's partners visualize mega-projects with immersive 360° digital twins.",
    content: "When NEOM-aligned real estate developers needed a way to sell pre-construction properties to international investors, they turned to X360.\n\nThe challenge was significant: how do you sell a property that doesn't yet exist, to buyers who can't travel to the site, in a market that demands the highest standards of presentation?\n\nX360's answer was a comprehensive suite of digital twin experiences — combining 360° virtual environments, architectural visualisation, and interactive exploration tools — that let investors walk through future buildings, explore planned amenities, and understand the development's scale and vision.\n\nThe results exceeded all expectations. International investor enquiries increased 3×, and several large units were sold entirely remotely — a first for the developer. This project established a new benchmark for digital property marketing in Saudi Arabia.",
    category: "Case Study",
    status: "published",
    author: "X360 Team",
    date: "2025-05-10",
  },
];
