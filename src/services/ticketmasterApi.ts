import { Concert } from '../types';

// Subset of the Ticketmaster Discovery API v2 event shape that we use.
interface TicketmasterEvent {
  id: string;
  name: string;
  url?: string;
  info?: string;
  pleaseNote?: string;
  images?: { url: string; ratio?: string; width?: number; height?: number }[];
  dates?: {
    start?: { localDate?: string; localTime?: string; dateTBA?: boolean; timeTBA?: boolean };
    status?: { code?: string };
  };
  classifications?: {
    genre?: { name?: string };
    subGenre?: { name?: string };
  }[];
  priceRanges?: { min?: number; max?: number; currency?: string }[];
  _embedded?: {
    venues?: { name?: string; city?: { name?: string } }[];
    attractions?: { name?: string }[];
  };
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function isUsable(value?: string): value is string {
  return !!value && value.toLowerCase() !== 'undefined';
}

function pickImage(images: TicketmasterEvent['images'] = []): string {
  const wide = images
    .filter((img) => img.ratio === '16_9')
    .sort((a, b) => (b.width || 0) - (a.width || 0));
  return (wide[0] || images[0])?.url || '';
}

function formatDates(start?: NonNullable<TicketmasterEvent['dates']>['start']): string {
  if (!start?.localDate || start.dateTBA) return 'Date TBA';
  const [y, m, d] = start.localDate.split('-');
  const datePart = `${d} ${MONTHS[Number(m) - 1]} ${y}`;
  if (!start.localTime || start.timeTBA) return datePart;
  return `${datePart} • ${start.localTime.slice(0, 5)} SGT`;
}

function toDateKey(localDate?: string): string {
  if (!localDate) return 'tba';
  const [y, m] = localDate.split('-');
  return `${MONTHS[Number(m) - 1].toLowerCase()}-${y}`;
}

function toGenreCategory(genre: string, subGenre: string): Concert['genreCategory'] {
  const g = `${genre} ${subGenre}`.toLowerCase();
  if (/k-?pop|j-?pop|korean|japanese/.test(g)) return 'K-Pop';
  if (/mandopop|cantopop|c-?pop|chinese/.test(g)) return 'Mandopop';
  if (/jazz|blues|folk|acoustic|classical|country/.test(g)) return 'Jazz & Acoustic';
  return 'Pop & Rock';
}

// Maps Ticketmaster genres onto the mocktail PAIRINGS table genres.
function toMocktailGenre(genre: string): string {
  const g = genre.toLowerCase();
  if (g.includes('rock') || g.includes('metal') || g.includes('alternative')) return 'Rock';
  if (g.includes('pop')) return 'Pop';
  if (g.includes('jazz') || g.includes('blues') || g.includes('classical')) return 'Jazz';
  if (g.includes('r&b') || g.includes('soul')) return 'R&B';
  if (g.includes('electronic') || g.includes('dance')) return 'Electronic';
  if (g.includes('hip-hop') || g.includes('rap')) return 'Hip-Hop';
  if (g.includes('world') || g.includes('latin') || g.includes('reggae')) return 'World';
  if (g.includes('folk') || g.includes('country')) return 'Acoustic';
  return 'Surprise me';
}

function toBadge(statusCode?: string): Pick<Concert, 'badge' | 'badgeType'> {
  switch (statusCode) {
    case 'offsale':
      return { badge: 'Off Sale', badgeType: 'warning' };
    case 'cancelled':
      return { badge: 'Cancelled', badgeType: 'warning' };
    case 'postponed':
      return { badge: 'Postponed', badgeType: 'warning' };
    case 'rescheduled':
      return { badge: 'Rescheduled', badgeType: 'lounge' };
    case 'onsale':
    default:
      return { badge: 'On Sale', badgeType: 'primary' };
  }
}

function mapEvent(event: TicketmasterEvent): Concert {
  const venue = event._embedded?.venues?.[0];
  const artist = event._embedded?.attractions?.[0]?.name || event.name;
  const classification = event.classifications?.[0];
  const genre = isUsable(classification?.genre?.name) ? classification!.genre!.name! : 'Music';
  const subGenre = isUsable(classification?.subGenre?.name) ? classification!.subGenre!.name! : '';
  const venueName = venue?.name || 'Venue TBA';
  const price = event.priceRanges?.find((p) => p.currency === 'SGD') || event.priceRanges?.[0];

  return {
    id: `tm-${event.id}`,
    artist,
    title: event.name,
    genre: subGenre && subGenre !== genre ? `${genre} / ${subGenre}` : genre,
    genreCategory: toGenreCategory(genre, subGenre),
    venue: venue?.city?.name ? `${venueName}, ${venue.city.name}` : venueName,
    dates: formatDates(event.dates?.start),
    dateKey: toDateKey(event.dates?.start?.localDate),
    startingPrice: Math.round(price?.min ?? 0),
    ...toBadge(event.dates?.status?.code),
    subBadge: 'via Ticketmaster',
    description: event.info || event.pleaseNote || `Live at ${venueName}.`,
    imageUrl: pickImage(event.images),
    altText: `${artist} live in Singapore`,
    itunesSearchTerm: artist,
    pairedMocktailGenre: toMocktailGenre(genre),
    source: 'ticketmaster',
    ticketUrl: event.url,
  };
}

/**
 * Fetches upcoming music events in Singapore from Ticketmaster via the local
 * server proxy. Returns an empty array when the API key is not configured or
 * the request fails, so callers can fall back to curated data.
 */
export async function fetchSingaporeConcerts(): Promise<Concert[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch('/api/concerts/singapore', { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data: { events?: TicketmasterEvent[] } = await res.json();
    return (data.events || []).map(mapEvent);
  } catch (err) {
    console.warn('Ticketmaster fetch failed, using curated concerts.', err);
    return [];
  }
}
