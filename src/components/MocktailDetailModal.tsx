import React from 'react';
import { X, Sparkles, GlassWater, Wine, Calendar, MapPin, Check, Plus, ExternalLink, Dices } from 'lucide-react';
import { DrinkDetail, Pairing, Concert } from '../types';
import { getIngredients } from '../services/mocktailPairings';

interface MocktailDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  drink: DrinkDetail | null;
  pairing: Pairing | null;
  pairedConcert?: Concert | null;
  onShakeAnother?: () => void;
  onBookConcert?: (concert: Concert) => void;
  onReserveTable?: (drink: DrinkDetail, pairing: Pairing) => void;
  isLoading?: boolean;
}

export const MocktailDetailModal: React.FC<MocktailDetailModalProps> = ({
  isOpen,
  onClose,
  drink,
  pairing,
  pairedConcert,
  onShakeAnother,
  onBookConcert,
  onReserveTable,
  isLoading = false,
}) => {
  if (!isOpen || !drink) return null;

  const ingredients = getIngredients(drink);
  const color = pairing?.color || '#00A6A6';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#16171d] border border-[#2a2a2d] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div
          className="p-4 sm:p-5 border-b border-[#2a2a2d] flex items-center justify-between"
          style={{ background: `linear-gradient(to right, ${color}20, #16171d)` }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">{pairing?.emoji || '🍹'}</span>
            <div>
              <span
                className="text-[10px] font-bold uppercase tracking-wider block"
                style={{ color }}
              >
                Mocktail DJ • {pairing?.genre || 'Zero-Proof'} Pairing
              </span>
              <h3 className="font-syne font-bold text-base sm:text-lg text-white">
                {drink.strDrink}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#1f1f22] text-[#c1c6d9] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto no-scrollbar space-y-5 flex-1 text-xs">
          {/* Vibe Quote Banner */}
          {pairing?.vibe && (
            <div
              className="p-3.5 rounded-2xl border flex items-center gap-3"
              style={{
                borderColor: `${color}40`,
                backgroundColor: `${color}15`,
              }}
            >
              <Sparkles className="w-5 h-5 shrink-0" style={{ color }} />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color }}>
                  The Vibe
                </span>
                <p className="text-white text-xs sm:text-sm font-medium mt-0.5">
                  "{pairing.vibe}"
                </p>
              </div>
            </div>
          )}

          {/* Media & Key Specs */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative w-36 h-36 rounded-2xl overflow-hidden shrink-0 bg-[#1b1b1e] border border-[#2a2a2d] shadow-lg">
              <img
                src={drink.strDrinkThumb}
                alt={drink.strDrink}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[10px] font-bold text-emerald-400">
                0.0% ABV
              </div>
            </div>

            <div className="flex-1 space-y-2 w-full">
              <div className="p-3 rounded-xl bg-[#1b1b1e] border border-[#2a2a2d] space-y-1">
                <span className="text-[10px] text-[#c1c6d9] block">Recommended Glassware</span>
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  <GlassWater className="w-4 h-4 text-[#ffb4a7]" />
                  <span>{drink.strGlass || 'Highball glass'}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#1b1b1e] border border-[#2a2a2d] space-y-1">
                <span className="text-[10px] text-[#c1c6d9] block">Source Verification</span>
                <div className="flex items-center justify-between text-white">
                  <span className="text-emerald-400 font-mono text-[11px]">
                    TheCocktailDB #{drink.idDrink}
                  </span>
                  <span className="text-[10px] text-[#c1c6d9]">Non_Alcoholic Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Matched Concert Box if available */}
          {pairedConcert && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1f1f24] to-[#16171d] border border-[#333545] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={pairedConcert.imageUrl}
                  alt={pairedConcert.title}
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] text-[#ffb4a7] font-bold uppercase tracking-wider block">
                    Concert Soundtrack Pairing
                  </span>
                  <h4 className="font-syne font-bold text-white text-xs sm:text-sm truncate">
                    {pairedConcert.title}
                  </h4>
                  <p className="text-[11px] text-[#c1c6d9] truncate">{pairedConcert.venue}</p>
                </div>
              </div>

              {onBookConcert && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onBookConcert(pairedConcert);
                  }}
                  className="px-3 py-2 rounded-xl bg-[#b41503] hover:bg-[#f80824] text-white font-semibold text-xs whitespace-nowrap shrink-0 transition-colors shadow-sm"
                >
                  Book Show
                </button>
              )}
            </div>
          )}

          {/* Clean Ingredients List */}
          <div className="space-y-2">
            <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-white">
              Clean Ingredients ({ingredients.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ingredients.map((ing, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#1b1b1e] border border-[#2a2a2d] text-[#e4e1e6]"
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }}></span>
                  <span className="font-medium">{ing}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          {drink.strInstructions && (
            <div className="space-y-1.5">
              <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-white">
                Preparation Instructions
              </h4>
              <p className="p-3.5 rounded-2xl bg-[#1b1b1e] border border-[#2a2a2d] text-[#c1c6d9] leading-relaxed">
                {drink.strInstructions}
              </p>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="p-4 bg-[#16171d] border-t border-[#2a2a2d] flex flex-col sm:flex-row items-center gap-2">
          {onShakeAnother && (
            <button
              type="button"
              disabled={isLoading}
              onClick={onShakeAnother}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#1f1f22] hover:bg-[#2a2a2d] text-[#ffb4a7] border border-[#2a2a2d] font-semibold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <Dices className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Shake Another ({pairing?.genre})</span>
            </button>
          )}

          {onReserveTable && (
            <button
              type="button"
              onClick={() => {
                onClose();
                if (pairing) onReserveTable(drink, pairing);
              }}
              className="flex-1 w-full py-2.5 px-4 bg-[#b41503] hover:bg-[#f80824] text-white rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-[#b41503]/30"
            >
              <Wine className="w-4 h-4" />
              <span>Reserve Table at Partner Bar (S$26)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
