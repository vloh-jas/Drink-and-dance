import React, { useState } from 'react';
import {
  MapPin,
  ChevronDown,
  Bell,
  Search,
  X,
  CheckCircle,
  Ticket,
  Heart,
  HelpCircle,
  User,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSearchClick: () => void;
  onOpenWallet: () => void;
  ticketCount: number;
  favoriteCount: number;
  onOpenFavorites: () => void;
  userProfile: UserProfile | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onSearchClick,
  onOpenWallet,
  ticketCount,
  favoriteCount,
  onOpenFavorites,
  userProfile,
  onOpenAuth,
  onSignOut,
}) => {
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Singapore, SG');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const locations = [
    'Singapore, SG',
    'Marina Bay & Stadium Precinct',
    'Sentosa & South Bay',
    'Orchard & City Hall',
  ];

  const notifications = [
    {
      id: '1',
      title: 'VIP FastPass Confirmed!',
      desc: 'ATLAS Bar SG pre-concert priority booth reserved for Coldplay.',
      time: '12m ago',
      unread: true,
    },
    {
      id: '2',
      title: 'Few Left for YOASOBI',
      desc: 'CAT 1 standing pen is 92% sold out for Arena @ EXPO.',
      time: '1h ago',
      unread: true,
    },
    {
      id: '3',
      title: 'Hans Zimmer Acoustic Masterclass',
      desc: 'Exclusive spatial audio seats opened at The Star Theatre.',
      time: '3h ago',
      unread: false,
    },
  ];

  return (
    <header className="sticky top-0 w-full z-40 bg-[#16171d]/95 backdrop-blur-xl border-b border-[#2a2a2d]/80 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-3">
        {/* Logo & Location */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setActiveTab('concerts')}
            className="flex items-center gap-2 text-left focus:outline-none shrink-0 min-h-[44px]"
          >
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1UBs5Htlhk-Qc4vDTa_r8efEX15y01kQBsIEg3uzDHUSfiSeZPXnhLSEhevYhlk-Qat9oKfeut7xvbjrqHOdxr2TIFJLd3RhWTqaGMfzU7SVk83luKWeaJtzlw_xM1V7U0IPCEK1lgqnqPmjPwhiC9NjTXrbg46XUJvZF09Oa3f2k-cjQKHMQCj070CvZcqjllVUTSDb5vLKV17pjbIzMaOOrwZq72MBbU1EjpXBMt9INwpFZ0CfNNAtRQ"
              alt="BookMyShow SG"
              className="h-7 w-auto object-contain"
            />
            <span className="font-syne font-bold text-sm tracking-wider uppercase text-white hidden md:inline-block">
              BookMyShow
            </span>
          </button>

          {/* Location Selector Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLocationMenu(!showLocationMenu)}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-full bg-[#1f1f22] border border-[#2a2a2d] text-[#c1c6d9] hover:text-white transition-colors min-h-[38px]"
            >
              <MapPin className="w-3.5 h-3.5 text-[#ffb4a7] shrink-0" />
              <span className="text-[11px] font-semibold tracking-wider uppercase truncate max-w-[85px] xs:max-w-[120px]">
                {selectedLocation}
              </span>
              <ChevronDown className="w-3 h-3 text-[#c1c6d9] shrink-0" />
            </button>

            {/* Dropdown sheet */}
            {showLocationMenu && (
              <div className="absolute left-0 mt-2 w-56 bg-[#1f1f22] border border-[#333545] rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-widest text-[#ffb4a7]">
                  Select Region / Venue Zone
                </div>
                {locations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      setSelectedLocation(loc);
                      setShowLocationMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between ${
                      selectedLocation === loc
                        ? 'bg-[#b41503]/20 text-[#ffb4a7] font-semibold'
                        : 'text-[#e4e1e6] hover:bg-[#2a2a2d]'
                    }`}
                  >
                    <span>{loc}</span>
                    {selectedLocation === loc && (
                      <CheckCircle className="w-3.5 h-3.5 text-[#ffb4a7]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop / Tablet Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-[#1b1b1e] border border-[#2a2a2d]">
          <button
            type="button"
            onClick={() => setActiveTab('concerts')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'concerts'
                ? 'bg-[#b41503] text-white shadow-[0_0_16px_rgba(180,21,3,0.3)]'
                : 'text-[#c1c6d9] hover:text-white'
            }`}
          >
            Concerts
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('lounges')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'lounges'
                ? 'bg-[#b41503] text-white shadow-[0_0_16px_rgba(180,21,3,0.3)]'
                : 'text-[#c1c6d9] hover:text-white'
            }`}
          >
            Cocktails & VIP Lounges
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('music')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'music'
                ? 'bg-[#b41503] text-white shadow-[0_0_16px_rgba(180,21,3,0.3)]'
                : 'text-[#c1c6d9] hover:text-white'
            }`}
          >
            iTunes Discography
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('faqs')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'faqs'
                ? 'bg-[#b41503] text-white shadow-[0_0_16px_rgba(180,21,3,0.3)]'
                : 'text-[#c1c6d9] hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Official FAQs</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Search Button */}
          <button
            type="button"
            onClick={onSearchClick}
            className="p-2 sm:p-2.5 rounded-xl bg-[#1f1f22] hover:bg-[#2a2a2d] text-[#c1c6d9] hover:text-white transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
            title="Search Shows"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Favorites Button */}
          <button
            type="button"
            onClick={onOpenFavorites}
            className="relative p-2 sm:p-2.5 rounded-xl bg-[#1f1f22] hover:bg-[#2a2a2d] text-[#c1c6d9] hover:text-white transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
            title="Bookmarked Shows"
          >
            <Heart className="w-4 h-4 text-[#ffb4a7]" />
            {favoriteCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#f80824] text-[9.5px] font-bold text-white flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 sm:p-2.5 rounded-xl bg-[#1f1f22] hover:bg-[#2a2a2d] text-[#c1c6d9] hover:text-white transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#f80824] ring-2 ring-[#131316]"></span>
            </button>

            {/* Notification Dropdown Drawer */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 xs:w-80 bg-[#1f1f22] border border-[#333545] rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#2a2a2d] mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Live Alerts (Singapore)
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="text-[#c1c6d9] hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2 rounded-lg text-left text-xs transition-colors ${
                        n.unread ? 'bg-[#2a2a2d]/80 border-l-2 border-[#f80824]' : 'bg-[#1b1b1e]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{n.title}</span>
                        <span className="text-[10px] text-[#c1c6d9]">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-[#c1c6d9] mt-0.5 leading-snug">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIGN IN / CREATE ACCOUNT OR USER PROFILE DROPDOWN */}
          {userProfile?.isLoggedIn ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-1.5 p-1 rounded-full hover:bg-[#1f1f22] transition-colors focus:outline-none min-h-[44px]"
              >
                <div className="relative">
                  <img
                    src={userProfile.avatarUrl}
                    alt={userProfile.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-[#b41503]"
                  />
                  {ticketCount > 0 && (
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#b41503] border border-[#131316] text-[9px] font-bold text-white flex items-center justify-center">
                      {ticketCount}
                    </span>
                  )}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#c1c6d9] hidden sm:block" />
              </button>

              {/* User Profile Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-[#1f1f22] border border-[#333545] rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in duration-150">
                  <div className="pb-2.5 border-b border-[#2a2a2d] mb-2">
                    <div className="font-bold text-white text-sm truncate">{userProfile.name}</div>
                    <div className="text-[11px] text-[#c1c6d9] truncate">{userProfile.email}</div>
                    <div className="inline-flex items-center gap-1 text-[10px] text-[#ffb4a7] bg-[#b41503]/20 px-2 py-0.5 rounded-full mt-1.5 font-semibold">
                      <Sparkles className="w-3 h-3" />
                      <span>{userProfile.membershipTier}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setShowUserMenu(false);
                        onOpenWallet();
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-[#2a2a2d] text-[#e4e1e6] flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Ticket className="w-4 h-4 text-[#ffb4a7]" />
                        <span>My Digital Passes</span>
                      </div>
                      <span className="font-bold text-[#ffb4a7]">{ticketCount}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowUserMenu(false);
                        onOpenFavorites();
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-[#2a2a2d] text-[#e4e1e6] flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-[#ffb4a7]" />
                        <span>Saved Concerts</span>
                      </div>
                      <span className="font-bold text-[#ffb4a7]">{favoriteCount}</span>
                    </button>

                    <div className="pt-1.5 border-t border-[#2a2a2d]">
                      <button
                        type="button"
                        onClick={() => {
                          setShowUserMenu(false);
                          onSignOut();
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-red-950/40 text-red-300 flex items-center gap-2 transition-colors font-medium"
                      >
                        <LogOut className="w-4 h-4 text-red-400" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#b41503] hover:bg-[#f80824] text-white font-bold text-xs transition-all shadow-[0_0_12px_rgba(180,21,3,0.35)] min-h-[38px]"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In / Join</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
