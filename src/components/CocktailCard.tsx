import React from 'react';
import { Wine, Headphones, Building2, PlusCircle, Check } from 'lucide-react';
import { CocktailExperience } from '../types';

interface CocktailCardProps {
  cocktail: CocktailExperience;
  onReserveClick: (cocktail: CocktailExperience) => void;
}

export const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail, onReserveClick }) => {
  return (
    <div className="group rounded-2xl bg-[#16171d] border border-[#2a2a2d] overflow-hidden flex flex-col justify-between shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#3d404d]">
      <div>
        {/* Cocktail Photography */}
        <div className="relative h-56 xs:h-60 w-full overflow-hidden bg-[#1b1b1e]">
          <img
            src={cocktail.imageUrl}
            alt={cocktail.altText || cocktail.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#16171d] via-[#16171d]/30 to-transparent"></div>

          {/* Pairing Badge */}
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#b41503] text-white font-semibold text-[10px] sm:text-[11px] uppercase tracking-wider backdrop-blur-md shadow-sm">
            {cocktail.tag}
          </div>

          {/* ABV Pill */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[#0e0e11]/90 text-[#c1c6d9] font-medium text-[10px] backdrop-blur-md border border-[#2a2a2d]">
            {cocktail.abv}
          </div>
        </div>

        {/* Notes & Details */}
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#ffb4a7] block">
              Featured Mixology {cocktail.number}
            </span>
            <h3 className="font-syne font-bold text-base sm:text-lg text-white">
              {cocktail.name}
            </h3>
            <p className="text-xs text-[#c1c6d9] leading-relaxed line-clamp-2">
              {cocktail.description}
            </p>
          </div>

          {/* Paired Show Highlight Box */}
          <div className="p-2.5 rounded-xl bg-[#1f1f22] border border-[#2a2a2d] flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <Headphones className="w-4 h-4 text-[#ffb4a7] shrink-0" />
              <span className="text-xs text-white truncate font-medium">
                {cocktail.pairingTitle}
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#ffb4a7] bg-[#b41503]/20 px-2 py-0.5 rounded-full shrink-0">
              {cocktail.pairingType}
            </span>
          </div>

          {/* Lounge Destination */}
          <div className="space-y-1 pt-1 text-xs">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Building2 className="w-4 h-4 text-[#ffb4a7] shrink-0" />
              <span className="truncate">{cocktail.barName}</span>
            </div>
            <div className="text-[11px] text-[#c1c6d9] pl-6 leading-tight">
              {cocktail.barLocation}
            </div>
          </div>
        </div>
      </div>

      {/* Price & CTA */}
      <div className="p-4 pt-0">
        <div className="p-2.5 rounded-xl bg-[#1f2533] border border-[#2a2a2d] flex items-center justify-between mb-3">
          <div>
            <span className="text-[10px] text-[#c1c6d9] uppercase font-bold tracking-wider block">
              Add-on Pass
            </span>
            <span className="font-syne font-bold text-base text-white">
              S${cocktail.pricePerGuest}{' '}
              <span className="text-xs font-normal text-[#c1c6d9]">/ guest</span>
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-[#ffb4a7]/20 text-[#ffb4a7] text-[10px] font-bold uppercase tracking-wider">
            {cocktail.perk}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onReserveClick(cocktail)}
          className="w-full py-2.5 px-4 bg-[#b41503] hover:bg-[#f80824] text-white rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(180,21,3,0.3)] active:scale-[0.98]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Reserve VIP Lounge Pass</span>
        </button>
      </div>
    </div>
  );
};
