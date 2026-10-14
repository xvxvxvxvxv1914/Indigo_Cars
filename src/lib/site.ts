// Single source of truth for the client-supplied contact details.
//
// An empty string means "not supplied yet" — the UI then HIDES that item instead
// of rendering a dead "—" or a link pointing at "#". Fill these in once and the
// phone, WhatsApp button and social icons appear everywhere at the same time.
//
// Still waiting on the client: phone, whatsapp, social profiles, mapsUrl.

export const SITE = {
  /** e.g. '+359 88 123 4567' — shown in the navbar, contact block and footer */
  phone: '',
  email: 'info@indigocars.eu',
  /** Separate address for business partners; falls back to `email` when empty */
  b2bEmail: '',
  /** digits only, no + or spaces, e.g. '359881234567' */
  whatsapp: '',
  /** Google Maps link for the office; empty = address shown as plain text */
  mapsUrl: '',
  social: {
    facebook: '',
    instagram: '',
    youtube: '',
  },
} as const;

/** Strips spaces and separators so the dialled number is valid. */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

/**
 * One number format for the whole site.
 *
 * `toLocaleString()` with no argument followed the visitor's browser, so the same
 * page could mix "28 500" and "28,500"; 'de-DE' gave "14.421"; 'bg-BG' is correct
 * Bulgarian but leaves four-digit numbers ungrouped ("1857" next to "14 421"),
 * which looks broken in a column of aligned prices. Grouping every three digits
 * with a narrow no-break space (U+202F) keeps the column even and reads in all
 * four locales. Built from its char code so the separator cannot be silently
 * swapped for a normal space by an editor or a formatter.
 */
const THIN_NBSP = String.fromCharCode(0x202f);

export const formatNum = (n: number) => n.toLocaleString('en-US').replace(/,/g, THIN_NBSP);
