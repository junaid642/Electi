"use client";

import TourIndustryPage from "@/components/templates/TourIndustryPage";
import type { IndustryData } from "@/data/tour-industries";

export default function LuxuryCategoryClient({ data }: { data: IndustryData }) {
  return <TourIndustryPage data={data} />;
}
