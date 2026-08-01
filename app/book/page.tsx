import type { Metadata } from "next";
import { BookConsultation } from "@/components/sections/book-consultation";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Free Discovery Call",
  description:
    "Book a free, no-obligation 30-minute discovery call with Metadox to review your AI and digitalisation readiness and find the most practical next step for your business.",
  alternates: { canonical: "/book" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/book`,
    title: `Book a Free Discovery Call | ${siteConfig.name}`,
    description:
      "Book a free, no-obligation 30-minute discovery call with Metadox to find the most practical next step for your business.",
  },
};

export default function BookConsultationPage() {
  return <BookConsultation />;
}
