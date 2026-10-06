import React, { useState, useMemo, useEffect } from 'react';
import {
  Sparkles,
  Ticket,
  Wine,
  Disc3,
  Calendar,
  MapPin,
  ShieldCheck,
  CheckCircle,
  Lock,
  Headphones,
  Search,
  ChevronRight,
  Heart,
  Share2,
} from 'lucide-react';
import { MobileFrame } from './components/MobileFrame';
import { Header } from './components/Header';
import { DualSearch } from './components/DualSearch';
import { ConcertCard } from './components/ConcertCard';
import { CocktailCard } from './components/CocktailCard';
import { MusicPreviewSheet } from './components/MusicPreviewSheet';
import { BookingModal } from './components/BookingModal';
import { LoungeReservationModal } from './components/LoungeReservationModal';
import { TicketsWalletModal } from './components/TicketsWalletModal';
import { FavoritesModal } from './components/FavoritesModal';
import { BottomNavBar } from './components/BottomNavBar';
import { FaqTab } from './components/FaqTab';
import { AuthModal } from './components/AuthModal';
import { NonAlcoholicCocktailsSection } from './components/NonAlcoholicCocktailsSection';
import { MocktailDJSection } from './components/MocktailDJSection';
import { MocktailDetailModal } from './components/MocktailDetailModal';
import {
  PAIRINGS,
  pairDrinkByGenre,
  getDrinkDetail,
  FALLBACK_DRINK_DETAILS,
} from './services/mocktailPairings';
import { fetchSingaporeConcerts } from './services/ticketmasterApi';
import {
  CONCERTS_DATA,
  COCKTAILS_DATA,
  GENRE_TABS,
  VIBE_TABS,
  INITIAL_BOOKED_TICKETS,
} from './data/mockData';
import {
  Concert,
  CocktailExperience,
  BookedTicket,
  LoungeBooking,
  UserProfile,
  DrinkDetail,
  Pairing,
} from './types';

export default function App() {
  // Navigation & View states
  const [activeTab, setActiveTab] = useState<string>('concerts');

  // Search & Filter states
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('all');
  const [selectedVenue, setSelectedVenue] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [genreFilter, setGenreFilter] = useState<string>('All');
  const [vibeFilter, setVibeFilter] = useState<string>('Electric Rock & Anthem');

  // User Authentication & Profile State
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('bms_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      id: 'usr-8812',
      name: 'Alex Tan',
      email: 'alex.tan@gmail.com',
      phone: '+65 9123 4567',
      membershipTier: 'Gold VIP Pass',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB0-YOMuqdZpbpoHEeyfCEnecE-DNU59wdFZpPo2JaE9DxAa05UNvQrWscCORbjteypScreRhgNCBawlGb1shLlZv4iwhZBL3V1uohTWhhjMkyvRLiILA_nNk6j80j_tUbNN6sjCRKd_LpxvkRJPKa6qO7Q3fZ1RHaKxRPtdwOwg1XvJcz37MHQoLf30JtoADvsmaoe2ArPgyMXhWiFeMO4ktrimWkKp3JI0K-v3_UPwQcJrDFkM1nn',
      isLoggedIn: true,
    };
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // User Data States
  const [favorites, setFavorites] = useState<string[]>(['coldplay', 'yoasobi']);
  const [bookedTickets, setBookedTickets] = useState<BookedTicket[]>(INITIAL_BOOKED_TICKETS);
  const [loungeBookings, setLoungeBookings] = useState<LoungeBooking[]>([]);

  // Modal states
  const [bookingConcert, setBookingConcert] = useState<Concert | null>(null);
  const [reserveCocktail, setReserveCocktail] = useState<CocktailExperience | null>(null);
  const [isWalletOpen, setIsWalletOpen] = useState<boolean>(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);

  // Mocktail DJ & Recipe Modal State
  const [inspectingConcert, setInspectingConcert] = useState<Concert | null>(null);
  const [inspectingDrinkDetail, setInspectingDrinkDetail] = useState<DrinkDetail | null>(null);
  const [inspectingPairing, setInspectingPairing] = useState<Pairing | null>(null);
  const [isShakingDetail, setIsShakingDetail] = useState<boolean>(false);

  // Concert listings: live Ticketmaster events, falling back to curated data
  const [concerts, setConcerts] = useState<Concert[]>(CONCERTS_DATA);

  useEffect(() => {
    let cancelled = false;
    fetchSingaporeConcerts().then((live) => {
      if (!cancelled && live.length > 0) setConcerts(live);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Music Sheet State (iTunes integration)
  const [musicArtist, setMusicArtist] = useState<string>('Jack Johnson');

  const handleOpenMocktailModal = async (concert: Concert) => {
    setInspectingConcert(concert);
    const genre = concert.pairedMocktailGenre || 'Rock';
    const pairing = PAIRINGS.find((p) => p.genre === genre) || PAIRINGS[0];
    setInspectingPairing(pairing);

    if (concert.pairedMocktail) {
      const fallback = FALLBACK_DRINK_DETAILS[concert.pairedMocktail.idDrink];
      if (fallback) {
        setInspectingDrinkDetail(fallback);
      } else {
        const detail = await getDrinkDetail(concert.pairedMocktail.idDrink);
        setInspectingDrinkDetail(detail);
      }
    } else {
      const res = await pairDrinkByGenre(pairing);
      setInspectingDrinkDetail(res.drink);
    }
  };

  const handleShakeAnotherInModal = async () => {
    if (!inspectingPairing) return;
    setIsShakingDetail(true);
    try {
      const res = await pairDrinkByGenre(inspectingPairing, inspectingDrinkDetail?.idDrink);
      setInspectingDrinkDetail(res.drink);
    } catch (e) {
      console.warn('Shake error', e);
    } finally {
      setIsShakingDetail(false);
    }
  };

  const handleReserveMocktailDrink = (drink: DrinkDetail, pairing: Pairing) => {
    setReserveCocktail({
      id: `mocktail-${drink.idDrink}`,
      number: `#${drink.idDrink.slice(-2)}`,
      name: drink.strDrink,
      tag: `${pairing.emoji} ${pairing.genre} Zero-Proof`,
      abv: '0.0% ABV • Botanical Mocktail',
      pairingTitle: `Pairs with: ${pairing.genre} Soundscape`,
      pairedArtist: inspectingConcert ? inspectingConcert.artist : 'All Headliners',
      pairingType: 'Curated',
      barName: 'ATLAS Bar SG & Smoke & Mirrors (Zero-Proof Bar)',
      barLocation: 'Dedicated Mocktail Station • Priority Booth Included',
      pricePerGuest: 26,
      perk: 'Zero-Proof Botanical Reserve + Free Coat Check',
      description: `${drink.strInstructions || 'Handcrafted botanical mocktail with premium fruit cordials, fresh citrus, and effervescent finish.'}`,
      imageUrl: drink.strDrinkThumb,
      altText: drink.strDrink,
      vibe: 'Smooth Jazz & Acoustic',
    });
  };

  const handleLoginSuccess = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('bms_user_profile', JSON.stringify(profile));
  };

  const handleSignOut = () => {
    const loggedOut: UserProfile = {
      id: '',
      name: '',
      email: '',
      membershipTier: 'Standard Guest',
      avatarUrl: '',
      isLoggedIn: false,
    };
    setUserProfile(loggedOut);
    localStorage.removeItem('bms_user_profile');
  };

  // Toggle favorite bookmark
  const handleToggleFavorite = (concertId: string) => {
    setFavorites((prev) =>
      prev.includes(concertId) ? prev.filter((id) => id !== concertId) : [...prev, concertId]
    );
  };

  // Filtered concerts
  const filteredConcerts = useMemo(() => {
    return concerts.filter((concert) => {
      // 1. Text Search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesArtist = concert.artist.toLowerCase().includes(query);
        const matchesTitle = concert.title.toLowerCase().includes(query);
        const matchesVenue = concert.venue.toLowerCase().includes(query);
        const matchesGenre = concert.genre.toLowerCase().includes(query);
        if (!matchesArtist && !matchesTitle && !matchesVenue && !matchesGenre) {
          return false;
        }
      }

      // 2. Date Filter
      if (selectedDate !== 'all') {
        if (selectedDate === 'weekend') {
          // just mock condition
        } else if (selectedDate === 'nov-2025' && concert.dateKey !== 'nov-2025') {
          return false;
        } else if (selectedDate === 'dec-2025' && concert.dateKey !== 'dec-2025') {
          return false;
        } else if (selectedDate === 'q1-2026' && concert.dateKey !== 'q1-2026') {
          return false;
        }
      }

      // 3. Venue Filter
      if (selectedVenue !== 'all') {
        const venueLower = concert.venue.toLowerCase();
        if (selectedVenue === 'national-stadium' && !venueLower.includes('national stadium')) {
          return false;
        }
        if (selectedVenue === 'indoor-stadium' && !venueLower.includes('indoor stadium')) {
          return false;
        }
        if (selectedVenue === 'star-theatre' && !venueLower.includes('star')) {
          return false;
        }
        if (selectedVenue === 'arena-expo' && !venueLower.includes('expo')) {
          return false;
        }
      }

      // 4. Genre Filter
      if (genreFilter !== 'All') {
        if (concert.genreCategory !== genreFilter) {
          return false;
        }
      }

      // 5. Trending Tag Filter
      if (selectedTag) {
        if (selectedTag === 'selling-fast' && !concert.isSellingFast) {
          return false;
        }
        if (selectedTag === 'mandopop' && concert.genreCategory !== 'Mandopop') {
          return false;
        }
        if (selectedTag === 'kpop' && concert.genreCategory !== 'K-Pop') {
          return false;
        }
      }

      return true;
    });
  }, [concerts, searchTerm, selectedDate, selectedVenue, genreFilter, selectedTag]);

  // Filtered cocktails
  const filteredCocktails = useMemo(() => {
    return COCKTAILS_DATA.filter((c) => c.vibe === vibeFilter);
  }, [vibeFilter]);

  // Handle open music
  const handleOpenMusic = (artistName: string) => {
    setMusicArtist(artistName);
    setActiveTab('music');
  };

  // Favorite concerts list
  const favoriteConcertsList = useMemo(() => {
    const all = [...concerts, ...CONCERTS_DATA.filter((c) => !concerts.includes(c))];
    return all.filter((c) => favorites.includes(c.id));
  }, [concerts, favorites]);

  const handleBookingSuccess = (newTicket: BookedTicket) => {
    setBookedTickets((prev) => [newTicket, ...prev]);
  };

  const handleLoungeSuccess = (newBooking: LoungeBooking) => {
    setLoungeBookings((prev) => [newBooking, ...prev]);
  };

  return (
    <MobileFrame>
      <div className="flex flex-col min-h-full bg-[#131316] text-[#e4e1e6] selection:bg-[#b41503] selection:text-white">
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSearchClick={() => {
            setActiveTab('concerts');
            const el = document.getElementById('search-anchor');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenWallet={() => setIsWalletOpen(true)}
          ticketCount={bookedTickets.length + loungeBookings.length}
          favoriteCount={favorites.length}
          onOpenFavorites={() => setIsFavoritesOpen(true)}
          userProfile={userProfile}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onSignOut={handleSignOut}
        />

        {/* View Switcher based on active tab */}
        <main className="flex-1">
          {activeTab === 'concerts' && (
            <div className="flex flex-col w-full">
              {/* IMMERSIVE HERO SECTION WITH ADVANCED DUAL SEARCH */}
              <section className="relative w-full pt-8 sm:pt-14 pb-10 px-4 sm:px-8 overflow-hidden bg-[#0e0e11]">
                {/* Ambient Stage Spotlight Blurs */}
                <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-[#b41503]/25 blur-[120px] pointer-events-none"></div>
                <div className="absolute top-1/2 -right-20 w-[450px] h-[450px] rounded-full bg-[#f80824]/15 blur-[140px] pointer-events-none"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#16171d]/40 via-[#0e0e11]/80 to-[#0e0e11] pointer-events-none"></div>

                <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center">
                  {/* Live Tag & Overline */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2a2a2d]/90 text-[#ffb4a7] mb-3 sm:mb-4 shadow-sm border border-[#333545]">
                    <span className="w-2 h-2 rounded-full bg-[#f80824] animate-ping"></span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white">
                      Live in Lion City 2025
                    </span>
                    <span className="text-[#c1c6d9]/40">•</span>
                    <span className="text-[10px] sm:text-xs font-bold text-[#ffb4a7]">
                      Official Ticketing Partner
                    </span>
                  </div>

                  {/* Marquee Typography */}
                  <h1 className="font-syne font-extrabold text-2xl xs:text-3xl sm:text-5xl uppercase tracking-tight text-white max-w-4xl text-balance leading-tight">
                    Live in Singapore:{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffb4a7] via-[#ff8d7b] to-[#f80824]">
                      Sensational Concerts
                    </span>{' '}
                    & Curated Lounges
                  </h1>

                  <p className="text-xs sm:text-base text-[#c1c6d9] max-w-2xl mt-2 sm:mt-3 mb-6 sm:mb-8 leading-relaxed">
                    Immerse yourself in world-class stadium spectacles, iconic regional tours, and exclusive mixology reserves tailored for Singapore’s nightlife.
                  </p>

                  {/* FLOATING ADVANCED DUAL SEARCH & FILTER BAR */}
                  <div id="search-anchor" className="w-full max-w-4xl">
                    <DualSearch
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                      selectedVenue={selectedVenue}
                      setSelectedVenue={setSelectedVenue}
                      selectedTag={selectedTag}
                      setSelectedTag={setSelectedTag}
                      onSearchSubmit={() => {
                        const el = document.getElementById('arena-calendar');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    />
                  </div>
                </div>
              </section>

              {/* UPCOMING LIVE CONCERTS SECTION */}
              <section id="arena-calendar" className="w-full py-8 sm:py-12 px-4 sm:px-8 max-w-7xl mx-auto">
                {/* Header with Genre tabs */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="h-3.5 w-1 bg-[#b41503] rounded-full"></span>
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#ffb4a7]">
                        Arena Calendar
                      </span>
                    </div>
                    <h2 className="font-syne font-bold text-xl sm:text-3xl text-white">
                      Upcoming Live Concerts in Singapore
                    </h2>
                    <p className="text-xs sm:text-sm text-[#c1c6d9] max-w-2xl">
                      Catch international headliners and regional sensations live across Singapore’s top stadiums, concert halls, and waterfront amphitheaters.
                    </p>
                  </div>

                  {/* Genre Tabs Filter */}
                  <div className="flex items-center gap-1.5 p-1 bg-[#1b1b1e] rounded-xl self-start md:self-auto overflow-x-auto no-scrollbar border border-[#2a2a2d]">
                    {GENRE_TABS.map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setGenreFilter(tab)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                          genreFilter === tab
                            ? 'bg-[#b41503] text-white shadow-sm'
                            : 'text-[#c1c6d9] hover:text-white hover:bg-[#2a2a2d]'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Concerts Grid */}
                {filteredConcerts.length === 0 ? (
                  <div className="py-16 text-center text-xs text-[#c1c6d9] bg-[#16171d] rounded-2xl border border-[#2a2a2d] p-6">
                    <Search className="w-8 h-8 text-[#ffb4a7]/40 mx-auto mb-2" />
                    <p className="font-semibold text-white">No concerts match your filters.</p>
                    <p className="text-[11px] text-[#c1c6d9] mt-1">
                      Try resetting your search term or selecting "All" categories.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedDate('all');
                        setSelectedVenue('all');
                        setSelectedTag(null);
                        setGenreFilter('All');
                      }}
                      className="mt-3 px-4 py-1.5 bg-[#b41503] text-white rounded-lg text-xs font-semibold"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {filteredConcerts.map((concert) => (
                      <ConcertCard
                        key={concert.id}
                        concert={concert}
                        isFavorite={favorites.includes(concert.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onBookClick={(c) => setBookingConcert(c)}
                        onListenClick={handleOpenMusic}
                        onViewMocktail={handleOpenMocktailModal}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* TEASER SECTION: MOCKTAIL DJ */}
              <section className="w-full py-10 sm:py-14 bg-[#0e0e11] relative overflow-hidden border-t border-[#2a2a2d]">
                <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
                  <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#16171d] via-[#1b2229] to-[#16171d] border border-[#2a2a2d] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
                    <div className="space-y-2 max-w-2xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>TheCocktailDB Zero-Proof & VIP Mixology</span>
                      </div>
                      <h3 className="font-syne font-bold text-2xl sm:text-3xl text-white">
                        Meet Your Mocktail DJ: Soundscape Pairings
                      </h3>
                      <p className="text-xs sm:text-sm text-[#c1c6d9] leading-relaxed">
                        Match Singapore's live concerts with custom botanical mocktails and guaranteed reserved VIP tables at ATLAS, Smoke &amp; Mirrors, and Manhattan Bar.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('lounges')}
                      className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/50 flex items-center gap-2 shrink-0 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Launch Mocktail DJ</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* TAB 2: MOCKTAIL DJ DEDICATED SCREEN */}
          {activeTab === 'lounges' && (
            <div className="w-full py-6 sm:py-10 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2a2a2d] pb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>TheCocktailDB Live API & Music Matcher</span>
                  </div>
                  <h2 className="font-syne font-bold text-2xl sm:text-3xl text-white">
                    Mocktail DJ
                  </h2>
                  <p className="text-xs sm:text-sm text-[#c1c6d9] mt-1">
                    Match Singapore live concerts with handcrafted botanical zero-proof mocktails and guaranteed VIP lounge table reservations across Singapore.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                    0.0% ABV • Botanical & Zero-Proof
                  </span>
                  <span className="text-[11px] text-[#c1c6d9] hidden sm:inline-block">
                    14 Official Bar Partners
                  </span>
                </div>
              </div>

              {/* SECTION 1: FLAGSHIP MOCKTAIL DJ SOUNDSCAPE MATCHER */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="font-syne font-bold text-sm text-white uppercase tracking-wider">
                      Live Concert Soundscape Matcher
                    </span>
                  </div>
                  <span className="text-[11px] text-[#c1c6d9]">
                    Powered by TheCocktailDB
                  </span>
                </div>
                <MocktailDJSection
                  onBookConcert={(c) => setBookingConcert(c)}
                  onReserveDrink={handleReserveMocktailDrink}
                />
              </div>

              {/* SECTION 2: THECOCKTAILDB ZERO-PROOF COLLECTION (>50) */}
              <div className="pt-8 border-t border-[#2a2a2d] space-y-4">
                <NonAlcoholicCocktailsSection
                  onSelectDrink={(drink) => {
                    // Create an on-the-fly zero proof experience
                    setReserveCocktail({
                      id: `na-${drink.idDrink}`,
                      number: `#NA`,
                      name: drink.strDrink,
                      tag: 'TheCocktailDB Zero-Proof',
                      abv: '0.0% ABV • Botanical Mocktail',
                      pairingTitle: 'Pairs with All Marquee Shows',
                      pairedArtist: 'All Artists',
                      pairingType: 'Curated',
                      barName: 'ATLAS Bar & Smoke & Mirrors (Zero-Proof Bar)',
                      barLocation: 'Dedicated Mocktail Station • Priority Booth',
                      pricePerGuest: 28,
                      perk: 'Zero-Proof Botanical Reserve',
                      description: `Freshly prepared ${drink.strDrink} served over hand-cut ice with artisanal botanical cordials and effervescent finish.`,
                      imageUrl: drink.strDrinkThumb,
                      altText: drink.strDrink,
                      vibe: 'Smooth Jazz & Acoustic',
                    });
                  }}
                />
              </div>

              {/* SECTION 3: PARTNER VIP LOUNGES & BESPOKE COCKTAIL RESERVES */}
              <div className="pt-8 border-t border-[#2a2a2d] space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-syne font-bold text-base text-white uppercase tracking-wider block">
                      Partner VIP Lounges & Mixology Reserves
                    </span>
                    <span className="text-xs text-[#c1c6d9]">
                      14 Official Bar Partners • Guaranteed tables included with ticket passes
                    </span>
                  </div>

                  {/* Vibe Filter Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                    {VIBE_TABS.map((vibe) => (
                      <button
                        key={vibe}
                        type="button"
                        onClick={() => setVibeFilter(vibe)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                          vibeFilter === vibe
                            ? 'bg-[#b41503] text-white shadow-md'
                            : 'bg-[#1b1b1e] text-[#c1c6d9] hover:text-white hover:bg-[#2a2a2d]'
                        }`}
                      >
                        {vibe}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredCocktails.map((cocktail) => (
                    <CocktailCard
                      key={cocktail.id}
                      cocktail={cocktail}
                      onReserveClick={(c) => setReserveCocktail(c)}
                    />
                  ))}
                </div>
              </div>

              {/* SECTION 4: GUARANTEED PRIVILEGE CALLOUT */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#16171d] border border-[#2a2a2d] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#b41503] text-white shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-xs sm:text-sm text-white">
                      100% Guaranteed Reserved Table with Ticket Purchase
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#c1c6d9]">
                      No separate bookings required. Present your Mixtape digital pass at ATLAS, Smoke &amp; Mirrors, or Manhattan for complimentary coat check and priority seating.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ITUNES MUSIC DISCOGRAPHY SCREEN (as requested from image.png!) */}
          {activeTab === 'music' && (
            <MusicPreviewSheet initialArtist={musicArtist} />
          )}

          {/* TAB 4: OFFICIAL CONCERT FAQS SCREEN */}
          {activeTab === 'faqs' && (
            <FaqTab />
          )}

          {/* TAB 5: MY PASSES & WALLET SCREEN */}
          {activeTab === 'passes' && (
            <div className="w-full py-6 sm:py-10 px-4 sm:px-8 max-w-4xl mx-auto space-y-6">
              <div className="border-b border-[#2a2a2d] pb-4">
                <h2 className="font-syne font-bold text-2xl text-white">
                  My Digital Tickets & VIP Passes
                </h2>
                <p className="text-xs text-[#c1c6d9] mt-0.5">
                  Present these turnstile QR codes and digital credentials at venue gates.
                </p>
              </div>

              <div className="space-y-4">
                {bookedTickets.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[#1b1b1e] border border-[#333545] space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[#ffb4a7] font-bold">{t.id}</span>
                      <span className="px-2.5 py-0.5 rounded bg-[#b41503] text-white text-[10px] font-bold uppercase">
                        Active Pass
                      </span>
                    </div>

                    <h3 className="font-syne font-bold text-lg text-white">{t.concertTitle}</h3>
                    <div className="text-xs text-[#c1c6d9] flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#ffb4a7]" />
                      <span>{t.date} • {t.time}</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl text-black flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-bold uppercase text-slate-600">
                          Gate FastScan Code
                        </div>
                        <div className="font-mono text-xs font-bold">{t.qrCodeSeed}</div>
                        <div className="text-[10px] text-slate-500 mt-1">
                          Seats: {t.seats.join(' · ')}
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-black rounded p-1 grid grid-cols-3 gap-0.5">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div
                            key={i}
                            className={`rounded-xs ${i % 2 === 0 ? 'bg-white' : 'bg-black'}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* FOOTER */}
        <footer className="w-full bg-[#0e0e11] border-t border-[#2a2a2d] mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 pb-6 border-b border-[#2a2a2d]">
              {/* Col 1 */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <img
                    alt="Mixtape SG Logo"
                    className="h-6 w-auto object-contain"
                    src="https://lh3.googleusercontent.com/aida/AEtjO1UBs5Htlhk-Qc4vDTa_r8efEX15y01kQBsIEg3uzDHUSfiSeZPXnhLSEhevYhlk-Qat9oKfeut7xvbjrqHOdxr2TIFJLd3RhWTqaGMfzU7SVk83luKWeaJtzlw_xM1V7U0IPCEK1lgqnqPmjPwhiC9NjTXrbg46XUJvZF09Oa3f2k-cjQKHMQCj070CvZcqjllVUTSDb5vLKV17pjbIzMaOOrwZq72MBbU1EjpXBMt9INwpFZ0CfNNAtRQ"
                  />
                  <span className="font-syne font-bold text-sm tracking-wider uppercase text-white">
                    Mixtape
                  </span>
                </div>
                <p className="text-xs text-[#c1c6d9] leading-relaxed">
                  Singapore premier live entertainment ticketing, curated nightlife, marquee concerts, and luxury cabaret reserves.
                </p>
              </div>

              {/* Col 2 */}
              <div className="space-y-2 text-xs">
                <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-white">
                  Booking Confidence
                </h4>
                <div className="space-y-1.5 text-[#c1c6d9]">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#ffb4a7]" />
                    <span>100% Guaranteed Seats</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-[#ffb4a7]" />
                    <span>Instant Verified E-Tickets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Headphones className="w-3.5 h-3.5 text-[#ffb4a7]" />
                    <span>24/7 Singapore Concierge</span>
                  </div>
                </div>
              </div>

              {/* Col 3 */}
              <div className="space-y-2 text-xs">
                <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-white">
                  Official Accreditations
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 bg-[#1f1f22] text-[10px] text-white rounded-md border border-[#2a2a2d]">
                    STB Registered Partner
                  </span>
                  <span className="px-2 py-1 bg-[#1f1f22] text-[10px] text-white rounded-md border border-[#2a2a2d]">
                    SISTIC Connect Engine
                  </span>
                  <span className="px-2 py-1 bg-[#1f1f22] text-[10px] text-white rounded-md border border-[#2a2a2d]">
                    Esplanade Certified Box
                  </span>
                </div>
              </div>

              {/* Col 4 */}
              <div className="space-y-2 text-xs">
                <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-white">
                  Secure Checkout SG
                </h4>
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-white font-medium">
                  <span className="px-2 py-0.5 rounded bg-[#1f1f22] border border-[#2a2a2d]">PayNow</span>
                  <span className="px-2 py-0.5 rounded bg-[#1f1f22] border border-[#2a2a2d]">GrabPay</span>
                  <span className="px-2 py-0.5 rounded bg-[#1f1f22] border border-[#2a2a2d]">Apple Pay</span>
                  <span className="px-2 py-0.5 rounded bg-[#1f1f22] border border-[#2a2a2d]">VISA / MC</span>
                </div>
                <p className="text-[10px] text-[#c1c6d9] flex items-center gap-1 mt-1">
                  <ShieldCheck className="w-3 h-3 text-[#ffb4a7]" />
                  256-Bit TLS Bank Encrypted Gateway
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#c1c6d9]">
              <p>© 2025 Bigtree Entertainment Singapore Pte. Ltd. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <span className="hover:text-white cursor-pointer">Privacy Policy</span>
                <span className="hover:text-white cursor-pointer">Terms of Ticketing</span>
                <span className="hover:text-white cursor-pointer">Venue Protocols</span>
                <span className="hover:text-white cursor-pointer">Contact SG</span>
              </div>
            </div>
          </div>
        </footer>

        {/* Fixed Mobile Bottom Navigation Bar */}
        <BottomNavBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          ticketCount={bookedTickets.length + loungeBookings.length}
        />

        {/* MODALS */}
        <BookingModal
          concert={bookingConcert}
          isOpen={!!bookingConcert}
          onClose={() => setBookingConcert(null)}
          onBookingSuccess={handleBookingSuccess}
        />

        <LoungeReservationModal
          cocktail={reserveCocktail}
          isOpen={!!reserveCocktail}
          onClose={() => setReserveCocktail(null)}
          onReserveSuccess={handleLoungeSuccess}
        />

        <TicketsWalletModal
          isOpen={isWalletOpen}
          onClose={() => setIsWalletOpen(false)}
          tickets={bookedTickets}
          loungeBookings={loungeBookings}
        />

        <FavoritesModal
          isOpen={isFavoritesOpen}
          onClose={() => setIsFavoritesOpen(false)}
          favoriteConcerts={favoriteConcertsList}
          onToggleFavorite={handleToggleFavorite}
          onBookClick={(c) => setBookingConcert(c)}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />

        <MocktailDetailModal
          isOpen={!!inspectingDrinkDetail}
          onClose={() => {
            setInspectingDrinkDetail(null);
            setInspectingConcert(null);
            setInspectingPairing(null);
          }}
          drink={inspectingDrinkDetail}
          pairing={inspectingPairing}
          pairedConcert={inspectingConcert}
          onShakeAnother={handleShakeAnotherInModal}
          onBookConcert={(c) => {
            setInspectingDrinkDetail(null);
            setBookingConcert(c);
          }}
          onReserveTable={handleReserveMocktailDrink}
          isLoading={isShakingDetail}
        />
      </div>
    </MobileFrame>
  );
}
