"use client";

import WebAIServicePage from "@/components/templates/WebAIServicePage";
import AIServiceSubpage from "@/components/templates/AIServiceSubpage";
import type { WebAIServiceData, WebAICategoryData } from "@/data/webai-categories";

interface Props {
  data: WebAIServiceData;
  category: WebAICategoryData;
}

const RICH_CATEGORIES = new Set(["ai-solutions", "erp-sap"]);

export default function WebAIServiceClient({ data, category }: Props) {
  if (RICH_CATEGORIES.has(category.slug)) {
    return (
      <AIServiceSubpage
        data={data}
        categoryName={category.name}
        categoryNameAr={category.nameAr}
        categorySlug={category.slug}
      />
    );
  }
  return (
    <WebAIServicePage
      data={data}
      categoryName={category.name}
      categoryNameAr={category.nameAr}
      categorySlug={category.slug}
    />
  );
}
