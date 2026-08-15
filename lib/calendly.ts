/** Shared global type for the Calendly widget script, loaded by any component that embeds Calendly. */
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export {};
