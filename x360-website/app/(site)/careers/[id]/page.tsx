import type { Metadata } from "next";
import { notFound } from "next/navigation";
import INTERNAL_API_BASE from "@/lib/apiBase";
import JobDetailClient, { type InitialJob } from "./_client";

interface Props {
  params: Promise<{ id: string }>;
}

async function fetchJob(id: string): Promise<InitialJob | null> {
  try {
    const res = await fetch(`${INTERNAL_API_BASE}/api/jobs/${encodeURIComponent(id)}`, {
      next: { revalidate: 30 },
    });
    if (res.ok) return res.json() as Promise<InitialJob>;
  } catch {}
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const job = await fetchJob(id);
  const title = job?.title ?? "Career Opportunity";
  const description = job?.description ?? "Join the X360 team and help shape the future of digital experiences in Saudi Arabia.";
  return {
    title: `${title} | X360 Careers`,
    description,
    openGraph: {
      title: `${title} | X360 Careers`,
      description,
      type: "website",
      url: `https://www.x-360.ai/careers/${id}`,
    },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const job = await fetchJob(id);
  if (!job) notFound();
  return <JobDetailClient job={job} />;
}
