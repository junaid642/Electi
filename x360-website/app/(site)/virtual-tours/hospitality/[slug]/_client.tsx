"use client";

import TourIndustryPage from "@/components/templates/TourIndustryPage";
import type { IndustryData } from "@/data/tour-industries";

export default function HospitalityCategoryClient({ data }: { data: IndustryData }) {
  return <TourIndustryPage data={data} />;
}
