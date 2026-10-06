import React from 'react';
import { Calendar, MapPin, Ticket, Heart, Disc3, Sparkles, Wine, GlassWater, ExternalLink } from 'lucide-react';
import { Concert } from '../types';
import { PAIRINGS } from '../services/mocktailPairings';

interface ConcertCardProps {
  concert: Concert;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onBookClick: (concert: Concert) => void;
  onListenClick: (artist: string) => void;
  onViewMocktail?: (concert: Concert) => void;
}

export const ConcertCard: React.FC<ConcertCardProps> = ({
  concert,
  isFavorite,
  onToggleFavorite,
  onBookClick,
  onListenClick,
  onViewMocktail,
}) => {
  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'crimson':
        return 'bg-[#f80824]/90 text-white';
      case 'primary':
        return 'bg-[#b41503] text-white';
      case 'warning':
        return 'bg-[#93000a] text-[#ffdad6]';
      case 'lounge':
      default:
        return 'bg-[#1f2533] text-[#ffb4a7]';
    }
  };

  const pairing = PAIRINGS.find((p) => p.genre === concert.pairedMocktailGenre) || PAIRINGS[0];
  const mocktail = concert.pairedMocktail;

  return (
    <article className="group rounded-2xl bg-[#16171d] border border-[#2a2a2d] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#3d404d] hover:shadow-[0_16px_36px_rgba(0,0,0,0.6)]">
      <div>
        {/* Poster Media Slot */}
        <div className="relative h-56 xs:h-64 w-full overflow-hidden bg-[#1b1b1e]">
          <img
            src={concert.imageUrl}
            alt={concert.altText || concert.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#16171d] via-[#16171d]/30 to-transparent"></div>

          {/* Primary Badge */}
          <div
            className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold text-[11px] uppercase tracking-wider backdrop-blur-md shadow-sm ${getBadgeStyle(
              concert.badgeType
            )}`}
          >
            {concert.isSellingFast && (
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            )}
            <span>{concert.badge}</span>
          </div>

          {/* Sub Badge */}
          {concert.subBadge && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[#0e0e11]/85 text-[#c1c6d9] font-medium text-[11px] backdrop-blur-md border border-[#2a2a2d]">
              {concert.subBadge}
            </div>
          )}

          {/* Bottom Banner inside Image */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <span className="px-2.5 py-0.5 rounded-md bg-[#2a2a2d]/90 text-[#e4e1e6] font-medium text-[11px] backdrop-blur-sm">
              {concert.genre}
            </span>
            <span className="font-syne font-bold text-lg text-white drop-shadow-md">
              {concert.startingPrice > 0 ? `From S$${concert.startingPrice}` : 'Price TBA'}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-syne font-bold text-base sm:text-lg text-white group-hover:text-[#ffb4a7] transition-colors leading-snug">
              {concert.title}
            </h3>
            <p className="text-xs text-[#c1c6d9] mt-1 line-clamp-1">{concert.description}</p>
          </div>

          {/* Meta Details */}
          <div className="space-y-1.5 pt-1 text-xs text-[#c1c6d9]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#ffb4a7] shrink-0" />
              <span className="truncate">{concert.dates}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#ffb4a7] shrink-0" />
              <span className="truncate">{concert.venue}</span>
            </div>
          </div>

          {/* MATCHED MOCKTAIL PAIRING BOX */}
          {mocktail && (
            <div
              onClick={() => onViewMocktail && onViewMocktail(concert)}
              className="p-2.5 rounded-xl border transition-all cursor-pointer group/mocktail hover:bg-[#202026] flex items-center justify-between gap-2.5 mt-2"
              style={{
                borderColor: `${pairing.color}40`,
                backgroundColor: `${pairing.color}0d`,
              }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={mocktail.strDrinkThumb}
                  alt={mocktail.strDrink}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-lg object-cover shrink-0 border border-[#2a2a2d]"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider text-white"
                      style={{ backgroundColor: pairing.color }}
                    >
                      {pairing.emoji} {pairing.genre}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold truncate">
                      Zero-Proof Mocktail
                    </span>
                  </div>
                  <h4 className="text-white text-xs font-bold truncate group-hover/mocktail:text-[#ffb4a7] transition-colors">
                    {mocktail.strDrink}
                  </h4>
                  <p className="text-[10px] text-[#c1c6d9] truncate italic">
                    "{mocktail.vibe}"
                  </p>
                </div>
              </div>

              <span
                className="text-[10px] font-bold shrink-0 px-2 py-1 rounded-md border"
                style={{
                  color: pairing.color,
                  borderColor: `${pairing.color}50`,
                }}
              >
                Recipe
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 pt-0 space-y-2">
        {/* Quick iTunes Preview Trigger */}
        <button
          type="button"
          onClick={() => onListenClick(concert.itunesSearchTerm || concert.artist)}
          className="w-full py-1.5 px-3 rounded-lg bg-[#1f1f22] hover:bg-[#2a2a2d] text-[#ffb4a7] text-[11px] font-medium flex items-center justify-center gap-1.5 border border-[#2a2a2d] transition-colors"
        >
          <Disc3 className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Preview iTunes Albums & Tracks</span>
        </button>

        {concert.ticketUrl && (
          <a
            href={concert.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-1.5 px-3 rounded-lg bg-[#1f1f22] hover:bg-[#2a2a2d] text-[#c1c6d9] hover:text-white text-[11px] font-medium flex items-center justify-center gap-1.5 border border-[#2a2a2d] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View on Ticketmaster</span>
          </a>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onBookClick(concert)}
            className="flex-1 py-2.5 px-4 bg-[#b41503] hover:bg-[#f80824] text-white rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(180,21,3,0.35)] active:scale-[0.98]"
          >
            <Ticket className="w-4 h-4" />
            <span>Book Tickets</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleFavorite(concert.id)}
            className={`p-2.5 rounded-xl border transition-all ${
              isFavorite
                ? 'bg-[#b41503]/20 border-[#b41503] text-[#ffb4a7]'
                : 'bg-[#1f1f22] border-[#2a2a2d] text-[#c1c6d9] hover:text-white hover:bg-[#2a2a2d]'
            }`}
            title={isFavorite ? 'Remove Bookmark' : 'Bookmark Show'}
          >
            <Heart
              className={`w-4 h-4 ${isFavorite ? 'fill-[#ffb4a7] text-[#ffb4a7]' : ''}`}
            />
          </button>
        </div>
      </div>
    </article>
  );
};

