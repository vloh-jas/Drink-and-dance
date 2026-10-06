import React from 'react';
import { Compass, Wine, Disc3, Ticket, HelpCircle } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  ticketCount: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  setActiveTab,
  ticketCount,
}) => {
  const navItems = [
    {
      id: 'concerts',
      label: 'Shows',
      icon: Compass,
      badge: null,
    },
    {
      id: 'lounges',
      label: 'Lounges',
      icon: Wine,
      badge: null,
    },
    {
      id: 'music',
      label: 'Music',
      icon: Disc3,
      badge: 'API',
    },
    {
      id: 'faqs',
      label: 'FAQs',
      icon: HelpCircle,
      badge: null,
    },
    {
      id: 'passes',
      label: 'Passes',
      icon: Ticket,
      badge: ticketCount > 0 ? String(ticketCount) : null,
    },
  ];

  return (
    <nav
      aria-label="Bottom Navigation Bar"
      className="sticky bottom-0 left-0 right-0 z-40 bg-[#16171d]/95 backdrop-blur-xl border-t border-[#2a2a2d] py-1.5 px-1 sm:px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 transition-all group min-h-[46px] ${
                isActive ? 'text-[#ffb4a7]' : 'text-[#c1c6d9] hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.2]' : 'group-hover:scale-105'
                  }`}
                />
                {item.badge && (
                  <span
                    className={`absolute -top-1.5 -right-2 px-1 min-w-3.5 h-3.5 rounded-full text-[8.5px] font-bold flex items-center justify-center ${
                      item.badge === 'API'
                        ? 'bg-[#ffb4a7] text-black font-extrabold'
                        : 'bg-[#b41503] text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[9.5px] sm:text-[10px] mt-1 font-semibold tracking-tight transition-colors truncate max-w-[62px] ${
                  isActive ? 'text-white' : 'text-[#c1c6d9]'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#f80824] mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
