import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Dices, GlassWater, Wine, Ticket, RefreshCw, Check, ArrowRight } from 'lucide-react';
import { Pairing, DrinkSummary, DrinkDetail, Concert } from '../types';
import {
  PAIRINGS,
  getIngredients,
  FALLBACK_DRINK_DETAILS,
  DEFAULT_CONCERT_MOCKTAIL_INFO,
} from '../services/mocktailPairings';
import { CONCERTS_DATA } from '../data/mockData';

const API = 'https://www.thecocktaildb.com/api/json/v1/1';

interface MocktailDJSectionProps {
  onBookConcert?: (concert: Concert) => void;
  onReserveDrink?: (drink: DrinkDetail, pairing: Pairing) => void;
  selectedConcertId?: string;
}

export const MocktailDJSection: React.FC<MocktailDJSectionProps> = ({
  onBookConcert,
  onReserveDrink,
  selectedConcertId,
}) => {
  const [active, setActive] = useState<Pairing | null>(() => {
    // If a concert is selected or default to Rock/Coldplay
    if (selectedConcertId) {
      const concert = CONCERTS_DATA.find((c) => c.id === selectedConcertId);
      if (concert?.pairedMocktailGenre) {
        return PAIRINGS.find((p) => p.genre === concert.pairedMocktailGenre) || PAIRINGS[0];
      }
    }
    return PAIRINGS[0]; // Rock default
  });

  const [drink, setDrink] = useState<DrinkDetail | null>(() => {
    return FALLBACK_DRINK_DETAILS['12784'] || null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cache: the mocktail list is fetched once, then reused on every tap
  const listRef = useRef<DrinkSummary[] | null>(null);

  async function getAllDrinks(): Promise<DrinkSummary[]> {
    if (listRef.current) return listRef.current;
    try {
      const res = await fetch(`${API}/filter.php?a=Non_Alcoholic`);
      if (!res.ok) throw new Error("Couldn't reach the drinks menu.");
      const data = await res.json();
      listRef.current = Array.isArray(data.drinks) ? data.drinks : [];
      return listRef.current!;
    } catch (e) {
      // Fallback list
      listRef.current = Object.values(FALLBACK_DRINK_DETAILS).map((d) => ({
        idDrink: d.idDrink,
        strDrink: d.strDrink,
        strDrinkThumb: d.strDrinkThumb,
      }));
      return listRef.current;
    }
  }

  // Warm up the cache as soon as the app opens
  useEffect(() => {
    getAllDrinks().catch(() => {});
  }, []);

  async function pairDrink(p: Pairing, avoidId?: string) {
    setActive(p);
    setLoading(true);
    setError('');

    try {
      const all = await getAllDrinks();

      // Match drinks by keyword (or take everything for "Surprise me")
      let matches = p.keywords.length
        ? all.filter((d) => p.keywords.some((k) => d.strDrink.toLowerCase().includes(k)))
        : all;

      // "Shake another" shouldn't serve the same drink twice in a row
      if (avoidId && matches.length > 1) {
        matches = matches.filter((d) => d.idDrink !== avoidId);
      }
      if (!matches.length) {
        matches = all;
      }

      const pick = matches[Math.floor(Math.random() * matches.length)];

      // Second call: full recipe for the chosen drink
      let detail: DrinkDetail | null = null;
      try {
        const res = await fetch(`${API}/lookup.php?i=${pick.idDrink}`);
        if (res.ok) {
          const data = await res.json();
          detail = data.drinks?.[0] || null;
        }
      } catch (err) {
        // network error fallback
      }

      if (!detail) {
        detail = FALLBACK_DRINK_DETAILS[pick.idDrink] || {
          idDrink: pick.idDrink,
          strDrink: pick.strDrink,
          strDrinkThumb: pick.strDrinkThumb,
          strGlass: 'Highball Glass',
          strInstructions: 'Serve over ice with fresh organic botanical garnish.',
          strIngredient1: 'Chilled fruit nectar',
          strMeasure1: '4 oz',
          strIngredient2: 'Sparkling mineral water',
          strMeasure2: '4 oz',
        };
      }

      setDrink(detail);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  // Find concert that matches active genre
  const matchedConcert = CONCERTS_DATA.find(
    (c) => c.pairedMocktailGenre === active?.genre
  ) || CONCERTS_DATA[0];

  const color = active?.color ?? '#222';
  const ingredients = drink ? getIngredients(drink) : [];

  return (
    <section className="w-full rounded-3xl bg-[#16171d] border border-[#2a2a2d] p-5 sm:p-7 shadow-xl space-y-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20 transition-all duration-700"
        style={{ backgroundColor: color }}
      ></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TheCocktailDB Live API • Non-Alcoholic Pairing</span>
          </div>
          <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-white">
            Mocktail DJ
          </h2>
          <p className="text-xs sm:text-sm text-[#c1c6d9] mt-0.5">
            Pick a genre or concert. We’ll pour the soundtrack.
          </p>
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-[#1b1b1e] border border-[#2a2a2d] self-start sm:self-auto text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[#c1c6d9] text-[11px]">
            {listRef.current?.length ? `${listRef.current.length} Zero-Proof Drinks Cached` : 'Connecting to TheCocktailDB...'}
          </span>
        </div>
      </div>

      {/* Quick Concert Switcher: "Match by Concert" */}
      <div className="space-y-2">
        <span className="text-[10px] uppercase font-bold tracking-wider text-[#c1c6d9] block">
          Match Directly with Scheduled 2025–2026 Concerts:
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {CONCERTS_DATA.map((concert) => {
            const pairing = PAIRINGS.find((p) => p.genre === concert.pairedMocktailGenre);
            const isSelected = active?.genre === concert.pairedMocktailGenre;
            return (
              <button
                key={concert.id}
                type="button"
                onClick={() => {
                  if (pairing) pairDrink(pairing);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'border-white text-white shadow-md'
                    : 'border-[#2a2a2d] bg-[#1b1b1e] text-[#c1c6d9] hover:text-white hover:border-[#3d404d]'
                }`}
                style={{
                  backgroundColor: isSelected ? `${pairing?.color || '#b41503'}35` : undefined,
                  borderColor: isSelected ? pairing?.color : undefined,
                }}
              >
                <span>{pairing?.emoji}</span>
                <span>{concert.artist}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Genre chips as defined in the user's reference code */}
      <div className="space-y-2">
        <span className="text-[10px] uppercase font-bold tracking-wider text-[#c1c6d9] block">
          Or Select Any Genre Station:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {PAIRINGS.map((p) => {
            const isActive = active?.genre === p.genre;
            return (
              <button
                key={p.genre}
                type="button"
                aria-pressed={isActive}
                disabled={loading}
                onClick={() => pairDrink(p)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer shadow-sm"
                style={{
                  borderColor: p.color,
                  background: isActive ? p.color : '#1b1b1e',
                  color: isActive ? '#ffffff' : p.color,
                  boxShadow: isActive ? `0 4px 14px ${p.color}40` : undefined,
                }}
              >
                <span className="text-sm">{p.emoji}</span>
                <span>{p.genre}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300">
          {error}
        </div>
      )}

      {/* Result Card: The Pour */}
      {active && (
        <div
          className="rounded-2xl border transition-all duration-300 p-4 sm:p-6 bg-gradient-to-br from-[#1b1b1e] to-[#14151a]"
          style={{ borderColor: `${color}60` }}
        >
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2 text-center text-xs text-[#c1c6d9]">
              <GlassWater className="w-8 h-8 animate-bounce" style={{ color }} />
              <span className="font-semibold text-white">Shaking your {active.genre} Mocktail...</span>
              <span className="text-[11px] text-[#c1c6d9]">Filtering live keywords: {active.keywords.join(', ') || 'Any non-alcoholic drink'}</span>
            </div>
          ) : drink ? (
            <div className="space-y-5">
              {/* Top Banner: Vibe Quote & Genre Tag */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#2a2a2d]">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{active.emoji}</span>
                  <div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider block"
                      style={{ color }}
                    >
                      {active.genre} Soundscape
                    </span>
                    <h3 className="font-syne font-extrabold text-xl sm:text-2xl text-white">
                      {drink.strDrink}
                    </h3>
                  </div>
                </div>

                <div
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold self-start sm:self-auto border"
                  style={{
                    backgroundColor: `${color}15`,
                    borderColor: `${color}40`,
                    color,
                  }}
                >
                  "{active.vibe}"
                </div>
              </div>

              {/* Main Split: Media & Ingredients */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                {/* Image */}
                <div className="md:col-span-4 relative rounded-2xl overflow-hidden aspect-square bg-[#1b1b1e] border border-[#2a2a2d] shadow-lg group">
                  <img
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg bg-black/80 backdrop-blur-sm text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                    TheCocktailDB Non_Alcoholic
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 text-[10px] text-white">
                    {drink.strGlass || 'Highball glass'}
                  </div>
                </div>

                {/* Details & Clean Ingredients */}
                <div className="md:col-span-8 space-y-4">
                  {/* Clean Ingredients List */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#c1c6d9] block">
                      Clean Ingredients List ({ingredients.length})
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {ingredients.map((ing, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-2 rounded-xl bg-[#16171d] border border-[#2a2a2d] text-xs text-white"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: color }}
                          ></span>
                          <span className="truncate">{ing}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Preparation Instructions */}
                  {drink.strInstructions && (
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#c1c6d9] block">
                        Preparation Method
                      </span>
                      <p className="p-3 rounded-xl bg-[#16171d] border border-[#2a2a2d] text-xs text-[#c1c6d9] leading-relaxed">
                        {drink.strInstructions}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Matched Concert Live Hookup */}
              {matchedConcert && (
                <div className="p-4 rounded-2xl bg-[#141519] border border-[#333545] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={matchedConcert.imageUrl}
                      alt={matchedConcert.title}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-[#ffb4a7] font-bold uppercase tracking-wider">
                          Official Concert Pairing:
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#b41503] text-white">
                          {matchedConcert.venue.includes('National Stadium') ? 'National Stadium' : 'Indoor Stadium'}
                        </span>
                      </div>
                      <h4 className="font-syne font-bold text-white text-xs sm:text-sm">
                        {matchedConcert.title}
                      </h4>
                      <p className="text-[11px] text-[#c1c6d9]">{matchedConcert.dates}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {onBookConcert && (
                      <button
                        type="button"
                        onClick={() => onBookConcert(matchedConcert)}
                        className="px-3.5 py-2 rounded-xl bg-[#b41503] hover:bg-[#f80824] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        <span>Book Show (S${matchedConcert.startingPrice})</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons: Shake Another & Reserve Table */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => pairDrink(active, drink?.idDrink)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#2a2a2d] hover:bg-[#353438] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                >
                  <Dices className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  <span>Shake another {active.genre} mocktail</span>
                </button>

                {onReserveDrink && (
                  <button
                    type="button"
                    onClick={() => onReserveDrink(drink, active)}
                    className="flex-1 w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 4px 16px ${color}40`,
                    }}
                  >
                    <Wine className="w-4 h-4" />
                    <span>Reserve Lounge Table with this Drink (S$26)</span>
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
};
