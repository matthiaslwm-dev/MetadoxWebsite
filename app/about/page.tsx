import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { Mission } from "@/components/sections/mission";
import { CTA } from "@/components/sections/cta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Metadox",
  description:
    "Metadox is a Singapore-based AI digital transformation partner, combining practical strategy, implementation and workforce upskilling with a unique Singapore–China innovation bridge.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/about`,
    title: `About Metadox — ${siteConfig.name}`,
    description:
      "Metadox is a Singapore-based AI digital transformation partner with a unique Singapore–China innovation bridge.",
  },
};

export default function AboutPage() {
  return (
    <>
      <Mission />
      <About />
      <CTA />
    </>
  );
}
