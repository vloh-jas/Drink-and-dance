import React, { useState } from 'react';
import { Mic, Calendar, Building2, Ticket, Sparkles, ChevronDown, Check } from 'lucide-react';
import { VENUES_LIST, DATE_FILTERS } from '../data/mockData';

interface DualSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedVenue: string;
  setSelectedVenue: (venue: string) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  onSearchSubmit: () => void;
}

export const DualSearch: React.FC<DualSearchProps> = ({
  searchTerm,
  setSearchTerm,
  selectedDate,
  setSelectedDate,
  selectedVenue,
  setSelectedVenue,
  selectedTag,
  setSelectedTag,
  onSearchSubmit,
}) => {
  const [showArtistSuggestions, setShowArtistSuggestions] = useState(false);

  const artistSuggestions = [
    'Coldplay',
    'JJ Lin',
    'Olivia Rodrigo',
    'YOASOBI',
    'Hans Zimmer',
    'A-Mei',
    'Jack Johnson',
  ];

  const trendingTags = [
    { label: 'Selling Fast', pulse: true, key: 'selling-fast' },
    { label: 'International Acts', pulse: false, key: 'international' },
    { label: 'Mandopop', pulse: false, key: 'mandopop' },
    { label: 'K-Pop Showcase', pulse: false, key: 'kpop' },
    { label: 'Exclusive Pre-sale', pulse: false, key: 'presale' },
    { label: 'VIP Cocktails Included', pulse: false, key: 'cocktails' },
  ];

  const handleSelectArtist = (name: string) => {
    setSearchTerm(name);
    setShowArtistSuggestions(false);
  };

  return (
    <div className="w-full rounded-2xl bg-[#16171d]/95 p-3.5 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl border border-[#2a2a2d]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearchSubmit();
        }}
        className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center"
      >
        {/* Field 1: Artist / Band / Tour */}
        <div className="md:col-span-4 relative flex items-center bg-[#1b1b1e] rounded-xl px-3.5 py-2.5 border border-[#2a2a2d] hover:border-[#3d404d] transition-all">
          <Mic className="text-[#ffb4a7] w-5 h-5 mr-2.5 shrink-0" />
          <div className="flex flex-col text-left w-full min-w-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#c1c6d9]">
              Artist, Band or Tour
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowArtistSuggestions(true)}
              placeholder="Coldplay, JJ Lin, Jack Johnson..."
              className="bg-transparent text-white text-xs sm:text-sm font-medium focus:outline-none placeholder:text-[#c1c6d9]/40 w-full truncate"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowArtistSuggestions(!showArtistSuggestions)}
            className="text-[#c1c6d9] hover:text-white p-1"
            title="Artist Suggestions"
          >
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Autocomplete Dropdown */}
          {showArtistSuggestions && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#1f1f22] border border-[#333545] rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in duration-100 max-h-56 overflow-y-auto">
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ffb4a7] flex items-center justify-between">
                <span>Featured Headliners</span>
                <span className="text-[9px] text-[#c1c6d9]">iTunes Sync</span>
              </div>
              {artistSuggestions
                .filter((a) => a.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((artist) => (
                  <button
                    key={artist}
                    type="button"
                    onClick={() => handleSelectArtist(artist)}
                    className="w-full text-left px-2.5 py-1.5 text-xs text-[#e4e1e6] hover:bg-[#2a2a2d] rounded-lg transition-colors flex items-center justify-between"
                  >
                    <span className="font-medium">{artist}</span>
                    <span className="text-[10px] text-[#ffb4a7]">Singapore 2025/26</span>
                  </button>
                ))}
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setShowArtistSuggestions(false)}
                  className="w-full text-center py-1 text-[11px] text-[#c1c6d9] hover:text-white border-t border-[#2a2a2d] mt-1"
                >
                  Close
                </button>
              )}
            </div>
          )}
        </div>

        {/* Field 2: Date Selector */}
        <div className="md:col-span-3 relative flex items-center bg-[#1b1b1e] rounded-xl px-3.5 py-2.5 border border-[#2a2a2d] hover:border-[#3d404d] transition-all">
          <Calendar className="text-[#ffb4a7] w-5 h-5 mr-2.5 shrink-0" />
          <div className="flex flex-col text-left w-full min-w-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#c1c6d9]">
              Dates & Weekends
            </span>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-white text-xs sm:text-sm font-medium focus:outline-none cursor-pointer appearance-none pr-4 w-full truncate"
            >
              {DATE_FILTERS.map((df) => (
                <option key={df.id} value={df.id} className="bg-[#1b1b1e] text-white">
                  {df.label}
                </option>
              ))}
            </select>
          </div>
          <ChevronDown className="w-4 h-4 text-[#c1c6d9] absolute right-3 pointer-events-none" />
        </div>

        {/* Field 3: Venue Selector */}
        <div className="md:col-span-3 relative flex items-center bg-[#1b1b1e] rounded-xl px-3.5 py-2.5 border border-[#2a2a2d] hover:border-[#3d404d] transition-all">
          <Building2 className="text-[#ffb4a7] w-5 h-5 mr-2.5 shrink-0" />
          <div className="flex flex-col text-left w-full min-w-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#c1c6d9]">
              Singapore Venue
            </span>
            <select
              value={selectedVenue}
              onChange={(e) => setSelectedVenue(e.target.value)}
              className="bg-transparent text-white text-xs sm:text-sm font-medium focus:outline-none cursor-pointer appearance-none pr-4 w-full truncate"
            >
              {VENUES_LIST.map((v) => (
                <option key={v.id} value={v.id} className="bg-[#1b1b1e] text-white">
                  {v.label}
                </option>
              ))}
            </select>
          </div>
          <ChevronDown className="w-4 h-4 text-[#c1c6d9] absolute right-3 pointer-events-none" />
        </div>

        {/* Field 4: CTA Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full h-[48px] bg-[#b41503] hover:bg-[#f80824] text-white rounded-xl flex items-center justify-center gap-2 font-semibold text-xs sm:text-sm transition-all shadow-[0_0_24px_rgba(180,21,3,0.45)] hover:shadow-[0_0_32px_rgba(248,8,36,0.6)] active:scale-[0.98]"
          >
            <Ticket className="w-4 h-4" />
            <span>Find Shows</span>
          </button>
        </div>
      </form>

      {/* Quick Filter Chips */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-3 pt-3 border-t border-[#2a2a2d]/70 text-left">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#c1c6d9] mr-1">
          Trending:
        </span>
        {trendingTags.map((t) => {
          const isActive = selectedTag === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setSelectedTag(isActive ? null : t.key)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#b41503] text-white shadow-sm ring-1 ring-[#ffb4a7]'
                  : t.pulse
                  ? 'bg-[#f80824]/20 text-[#ffb4a7] hover:bg-[#f80824]/30'
                  : 'bg-[#1f1f22] text-[#c1c6d9] hover:text-white hover:bg-[#2a2a2d]'
              }`}
            >
              {t.pulse && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#f80824] animate-pulse"></span>
              )}
              {isActive && <Check className="w-3 h-3 text-white" />}
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
