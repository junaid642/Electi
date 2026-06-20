"use client";

interface StructuredDataProps {
  schema: object | object[];
}

export default function StructuredData({ schema }: StructuredDataProps) {
  const arr = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {arr.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}
