export interface MocktailPairingInfo {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  genre: string;
  emoji: string;
  color: string;
  vibe: string;
  barName: string;
  price: number;
  ingredients: string[];
  instructions?: string;
  glass?: string;
}

export interface Pairing {
  genre: string;
  emoji: string;
  color: string;
  vibe: string;
  keywords: string[];
}

export type DrinkSummary = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

export type DrinkDetail = DrinkSummary & {
  strInstructions?: string;
  strGlass?: string;
  [key: string]: unknown;
};

export interface Concert {
  id: string;
  artist: string;
  title: string;
  genre: string;
  genreCategory: 'Pop & Rock' | 'Mandopop' | 'K-Pop' | 'Jazz & Acoustic';
  venue: string;
  dates: string;
  dateKey: string; // for filtering: 'nov-2025' | 'dec-2025' | 'jan-2026' | 'feb-2026' | 'mar-2026' | 'apr-2026'
  startingPrice: number;
  badge: string;
  badgeType: 'crimson' | 'primary' | 'lounge' | 'warning';
  subBadge: string;
  description: string;
  imageUrl: string;
  altText: string;
  itunesSearchTerm: string;
  isSellingFast?: boolean;
  pairedCocktailId?: string;
  pairedMocktailGenre?: string;
  pairedMocktail?: MocktailPairingInfo;
  source?: 'ticketmaster' | 'curated';
  ticketUrl?: string;
}

export interface CocktailExperience {
  id: string;
  number: string;
  name: string;
  tag: string;
  abv: string;
  pairingTitle: string;
  pairedArtist: string;
  pairingType: 'Bespoke' | 'Curated' | 'Signature' | 'Exclusive';
  barName: string;
  barLocation: string;
  pricePerGuest: number;
  perk: string;
  description: string;
  imageUrl: string;
  altText: string;
  vibe: 'Electric Rock & Anthem' | 'Synthpop & K-Pop' | 'Smooth Jazz & Acoustic' | 'Midnight Soul';
}

export interface ItunesAlbum {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl100: string;
  artworkUrl600?: string;
  releaseDate?: string;
  primaryGenreName?: string;
  trackCount?: number;
  collectionViewUrl?: string;
}

export interface ItunesTrack {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  previewUrl: string;
  trackTimeMillis?: number;
  primaryGenreName?: string;
}

export interface BookedTicket {
  id: string;
  concertId: string;
  concertTitle: string;
  artist: string;
  venue: string;
  date: string;
  time: string;
  tier: string;
  quantity: number;
  totalPrice: number;
  seats: string[];
  bookingDate: string;
  qrCodeSeed: string;
  pairedLounge?: {
    barName: string;
    cocktailName: string;
    timeSlot: string;
    guests: number;
  };
}

export interface LoungeBooking {
  id: string;
  cocktailId: string;
  cocktailName: string;
  barName: string;
  date: string;
  timeSlot: string;
  guests: number;
  totalPrice: number;
  bookingRef: string;
}

export interface NonAlcoholicDrink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  membershipTier: 'Gold VIP Pass' | 'Silver Member' | 'Standard Guest';
  avatarUrl: string;
  isLoggedIn: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Ticketing & Entry' | 'Venues & Gates' | 'VIP Lounges & Cocktails' | 'Transit & "Leave Now" Advice';
  highlight?: boolean;
}

export interface ConciergeChatMessage {
  id: string;
  sender: 'user' | 'concierge';
  text: string;
  timestamp: string;
}


