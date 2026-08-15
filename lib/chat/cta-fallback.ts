/**
 * Safety net for the assistant's single most costly failure mode: writing "the
 * times are on the scheduler" or "grab a slot" WITHOUT calling `show_booking_cta`,
 * leaving the visitor told to book with nothing to click.
 *
 * The prompt forbids this (see step 9 in lib/chat/prompt.ts) and mostly obeys,
 * but simulation shows it still slips through often enough to lose qualified
 * leads. So the UI renders the booking button whenever the text claims a booking
 * UI exists, whether or not the tool fired.
 *
 * Deliberately biased toward false positives: showing an extra booking button
 * costs almost nothing, while missing one loses the lead outright. Phrases that
 * merely OFFER a call ("want to book a quick call?") are not matched, since the
 * visitor hasn't been told a button is already there.
 */
const CLAIMS_BOOKING_UI: RegExp[] = [
  /\b(?:on|use|open|check|via) the scheduler\b/i,
  /\bthe scheduler\b/i,
  /\blive (?:slots|times|availability)\b/i,
  /\bavailable (?:times|slots)\b/i,
  /\b(?:grab|pick|choose|select|take) (?:a|the|whichever|any) ?(?:time|slot|one)?\b/i,
  /\bbooking (?:button|link|thing)\b/i,
  /\b(?:the|this) button\b/i,
  /\bbutton (?:here|there|below|above)\b/i,
];

export function claimsBookingUi(text: string): boolean {
  if (!text) return false;
  return CLAIMS_BOOKING_UI.some((re) => re.test(text));
}
