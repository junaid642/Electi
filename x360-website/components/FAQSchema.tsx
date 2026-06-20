import { faqPageSchema } from "@/seo/schema";

interface FAQSchemaProps {
  faqs: { question: string; answer: string }[];
}

export default function FAQSchema({ faqs }: FAQSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(faqs)) }}
    />
  );
}
