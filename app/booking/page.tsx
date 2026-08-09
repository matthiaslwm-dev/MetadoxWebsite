import type { Metadata } from "next";
import { LandingHeader } from "@/components/landing/header";
import { LandingFooter } from "@/components/landing/footer";
import { LandingBooking } from "@/components/landing/booking";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Free Discovery Call",
  description:
    "Book a free, no-obligation 30-minute discovery call with Metadox to review your AI and digitalisation readiness and find the most practical next step for your business.",
  alternates: { canonical: "/booking" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/booking`,
    title: `Book a Free Discovery Call | ${siteConfig.name}`,
    description:
      "Book a free, no-obligation 30-minute discovery call with Metadox to find the most practical next step for your business.",
  },
};

export default function BookingPage() {
  // `lp-root` switches headings off the Space Grotesk display face onto Inter,
  // which is what makes this page read as part of the landing design.
  return (
    <div className="lp-root relative min-h-screen bg-lp-background">
      <LandingHeader />
      <LandingBooking />
      <LandingFooter />
    </div>
  );
}
