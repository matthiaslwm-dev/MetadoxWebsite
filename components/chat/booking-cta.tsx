"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { chatbotConfig } from "@/lib/chat/config";
import "@/lib/calendly";

const CALENDLY_WIDGET = "https://assets.calendly.com/assets/external/widget.js";
/*
  The popup is pure CSS: `initPopupWidget` appends bare `.calendly-overlay`
  divs and relies on this stylesheet to position them fixed over the page.
  Without it the click "does nothing". The inline embeds elsewhere get away
  without it only because their host element has an explicit height.
*/
const CALENDLY_STYLES = "https://assets.calendly.com/assets/external/widget.css";

const embedUrl = `${chatbotConfig.calendlyUrl}?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=015ee8&text_color=03153b`;

export function BookingCta({ onClicked }: { onClicked?: () => void }) {
  const [scriptReady, setScriptReady] = useState(
    () => typeof window !== "undefined" && Boolean(window.Calendly),
  );
  const pendingOpen = useRef(false);

  useEffect(() => {
    if (scriptReady && pendingOpen.current) {
      pendingOpen.current = false;
      window.Calendly?.initPopupWidget({ url: embedUrl });
    }
  }, [scriptReady]);

  const handleClick = () => {
    onClicked?.();
    if (scriptReady && window.Calendly) {
      window.Calendly.initPopupWidget({ url: embedUrl });
    } else {
      pendingOpen.current = true;
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "mt-2 inline-flex items-center gap-2 rounded-full bg-blue px-4 py-2.5 text-sm font-semibold text-white",
          "shadow-[0_10px_30px_-10px_rgba(1,94,232,0.6)] transition-all hover:-translate-y-0.5 hover:bg-blue-ink motion-reduce:transform-none",
        )}
      >
        <CalendarCheck className="size-4" />
        {chatbotConfig.bookingCtaLabel}
      </button>
      <link rel="stylesheet" href={CALENDLY_STYLES} precedence="default" />
      <Script
        src={CALENDLY_WIDGET}
        strategy="lazyOnload"
        onReady={() => setScriptReady(true)}
      />
    </>
  );
}
