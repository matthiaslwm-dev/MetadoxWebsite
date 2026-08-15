export type LeadInfo = {
  name?: string;
  email?: string;
  company?: string;
  industry?: string;
  painPoint?: string;
  goal?: string;
};

export type ChatEvent =
  | "conversation_started"
  | "lead_captured"
  | "booking_intent"
  | "cta_clicked"
  | "booking_cta_shown";
