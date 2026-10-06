import React, { useState, useEffect } from 'react';
import { GlassWater, Sparkles, Search, Check, Plus, ExternalLink, RefreshCw } from 'lucide-react';
import { fetchNonAlcoholicCocktails } from '../services/cocktailApi';
import { NonAlcoholicDrink } from '../types';

interface NonAlcoholicCocktailsSectionProps {
  onSelectDrink?: (drink: NonAlcoholicDrink) => void;
}

export const NonAlcoholicCocktailsSection: React.FC<NonAlcoholicCocktailsSectionProps> = ({
  onSelectDrink,
}) => {
  const [drinks, setDrinks] = useState<NonAlcoholicDrink[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [selectedDrinkId, setSelectedDrinkId] = useState<string | null>(null);

  const loadDrinks = async () => {
    setIsLoading(true);
    try {
      const data = await fetchNonAlcoholicCocktails();
      setDrinks(data);
    } catch (err) {
      console.error('Error fetching non-alcoholic drinks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDrinks();
  }, []);

  const filteredDrinks = drinks.filter((d) =>
    d.strDrink.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="w-full space-y-4">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-[#1f2533] to-[#16171d] border border-[#2a2a2d]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3 h-3" />
            <span>TheCocktailDB Live API • Zero-Proof Collection</span>
          </div>
          <h3 className="font-syne font-bold text-lg sm:text-xl text-white">
            Non-Alcoholic & Zero-Proof Cocktails
          </h3>
          <p className="text-xs text-[#c1c6d9] mt-0.5">
            Retrieved live from <code className="text-[#ffb4a7] font-mono text-[11px]">thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic</code> ({drinks.length} drinks available).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#c1c6d9] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search mocktails..."
              className="bg-[#1b1b1e] border border-[#2a2a2d] text-white text-xs pl-8 pr-3 py-1.5 rounded-xl focus:outline-none focus:border-[#b41503] w-40 sm:w-52"
            />
          </div>
          <button
            type="button"
            onClick={loadDrinks}
            className="p-2 rounded-xl bg-[#1b1b1e] hover:bg-[#2a2a2d] text-[#c1c6d9] hover:text-white transition-colors"
            title="Refresh TheCocktailDB API"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="py-12 flex flex-col items-center justify-center gap-2 text-xs text-[#c1c6d9]">
          <GlassWater className="w-8 h-8 text-emerald-400 animate-bounce" />
          <span>Retrieving non-alcoholic drinks from TheCocktailDB API...</span>
        </div>
      ) : filteredDrinks.length === 0 ? (
        <div className="py-10 text-center text-xs text-[#c1c6d9] bg-[#16171d] rounded-2xl border border-[#2a2a2d]">
          No drinks matched "{searchFilter}".
        </div>
      ) : (
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {filteredDrinks.map((drink) => {
            const isSelected = selectedDrinkId === drink.idDrink;
            return (
              <div
                key={drink.idDrink}
                className={`group rounded-xl bg-[#16171d] border overflow-hidden flex flex-col justify-between transition-all p-2 ${
                  isSelected
                    ? 'border-emerald-400 shadow-md ring-1 ring-emerald-400'
                    : 'border-[#2a2a2d] hover:border-[#3d404d]'
                }`}
              >
                <div>
                  <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#22242a] mb-2 shadow-sm">
                    <img
                      src={drink.strDrinkThumb}
                      alt={drink.strDrink}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/75 text-[9px] font-bold text-emerald-400 backdrop-blur-xs">
                      0.0% ABV
                    </span>
                  </div>

                  <h4 className="font-syne font-bold text-xs text-white truncate group-hover:text-[#ffb4a7] transition-colors">
                    {drink.strDrink}
                  </h4>
                  <p className="text-[10px] text-[#c1c6d9] font-mono mt-0.5">
                    ID #{drink.idDrink}
                  </p>
                </div>

                <div className="mt-2 pt-2 border-t border-[#2a2a2d] flex items-center justify-between">
                  <span className="text-[10px] text-emerald-400 font-semibold">Zero-Proof</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDrinkId(drink.idDrink);
                      onSelectDrink?.(drink);
                    }}
                    className={`px-2 py-1 rounded text-[10px] font-bold transition-colors flex items-center gap-1 ${
                      isSelected
                        ? 'bg-emerald-500 text-black'
                        : 'bg-[#2a2a2d] hover:bg-emerald-500/20 text-white'
                    }`}
                  >
                    {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    <span>{isSelected ? 'Selected' : 'Pair'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
