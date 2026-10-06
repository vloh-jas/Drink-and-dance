import React from 'react';
import { X, Heart, Ticket, Calendar, MapPin, Trash2 } from 'lucide-react';
import { Concert } from '../types';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteConcerts: Concert[];
  onToggleFavorite: (id: string) => void;
  onBookClick: (concert: Concert) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favoriteConcerts,
  onToggleFavorite,
  onBookClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#16171d] border border-[#2a2a2d] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#1f1f24] to-[#16171d] border-b border-[#2a2a2d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#ffb4a7] fill-[#ffb4a7]" />
            <span className="font-syne font-bold text-sm uppercase tracking-wider text-white">
              Bookmarked Concerts ({favoriteConcerts.length})
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full bg-[#1f1f22] text-[#c1c6d9] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto no-scrollbar space-y-3 flex-1">
          {favoriteConcerts.length === 0 ? (
            <div className="py-16 text-center text-xs text-[#c1c6d9]">
              <Heart className="w-8 h-8 text-[#ffb4a7]/30 mx-auto mb-2" />
              <p>No bookmarked shows yet.</p>
              <p className="text-[11px] mt-1 text-[#c1c6d9]/70">
                Tap the heart icon on any concert card to save it for quick access.
              </p>
            </div>
          ) : (
            favoriteConcerts.map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-2xl bg-[#1b1b1e] border border-[#2a2a2d] flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={c.imageUrl}
                    alt={c.title}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 ring-1 ring-[#2a2a2d]"
                  />
                  <div className="min-w-0">
                    <h4 className="font-syne font-bold text-sm text-white truncate">
                      {c.title}
                    </h4>
                    <div className="text-xs text-[#c1c6d9] flex items-center gap-1 mt-0.5 truncate">
                      <Calendar className="w-3 h-3 text-[#ffb4a7] shrink-0" />
                      <span className="truncate">{c.dates.split('•')[0]}</span>
                    </div>
                    <div className="text-xs font-semibold text-[#ffb4a7] mt-0.5">
                      {c.startingPrice > 0 ? `From S$${c.startingPrice}` : 'Price TBA'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onBookClick(c);
                    }}
                    className="px-3 py-1.5 bg-[#b41503] hover:bg-[#f80824] text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Book</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleFavorite(c.id)}
                    className="p-1.5 rounded-lg bg-[#2a2a2d] hover:bg-red-950/50 text-[#c1c6d9] hover:text-red-400 transition-colors"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
