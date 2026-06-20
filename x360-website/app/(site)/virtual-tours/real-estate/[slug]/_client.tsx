"use client";

import TourIndustryPage from "@/components/templates/TourIndustryPage";
import type { IndustryData } from "@/data/tour-industries";

export default function RealEstateCategoryClient({ data }: { data: IndustryData }) {
  return <TourIndustryPage data={data} />;
}
