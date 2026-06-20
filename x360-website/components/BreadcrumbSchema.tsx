import { breadcrumbSchema } from "@/seo/schema";

interface BreadcrumbSchemaProps {
  items: { name: string; url: string }[];
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(items)) }}
    />
  );
}
