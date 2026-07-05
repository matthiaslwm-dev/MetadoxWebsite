import type { Metadata } from "next";
import { Grants } from "@/components/sections/grants";
import { CTA } from "@/components/sections/cta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Grants & Funding",
  description:
    "See how Metadox helps you tap Singapore government grants — EDG, SSG and SkillsFuture — to make AI transformation more affordable.",
  alternates: { canonical: "/grants" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/grants`,
    title: `Grants & Funding — ${siteConfig.name}`,
    description:
      "See how Metadox helps you tap Singapore government grants to make AI transformation more affordable.",
  },
};

export default function GrantsPage() {
  return (
    <>
      <Grants />
      <CTA />
    </>
  );
}
