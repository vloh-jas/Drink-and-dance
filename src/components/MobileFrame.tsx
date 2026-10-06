import React, { useState } from 'react';
import { Smartphone, Monitor, Sparkles } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  // Default to native responsive view so it works seamlessly on real phones, tablets, and desktop
  const [deviceMode, setDeviceMode] = useState<'responsive' | 'phone_mockup'>('responsive');

  return (
    <div className="min-h-screen bg-[#131316] flex flex-col text-[#e4e1e6] selection:bg-[#b41503] selection:text-white">
      {/* Discreet Responsive Viewport Toolbar (Visible on large screens only) */}
      <div className="hidden lg:flex w-full bg-[#16171d] border-b border-[#2a2a2d] py-1 px-4 z-50 items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#b41503] animate-pulse"></span>
          <span className="font-syne font-bold tracking-wider uppercase text-white">
            BookMyShow SG
          </span>
          <span className="text-[11px] text-[#c1c6d9]">
            • Mobile-First Responsive Live Ticketing
          </span>
        </div>

        <div className="flex items-center gap-1 bg-[#1f1f22] p-0.5 rounded-lg border border-[#2a2a2d]">
          <button
            type="button"
            onClick={() => setDeviceMode('responsive')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
              deviceMode === 'responsive'
                ? 'bg-[#b41503] text-white shadow-sm'
                : 'text-[#c1c6d9] hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Responsive View</span>
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode('phone_mockup')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
              deviceMode === 'phone_mockup'
                ? 'bg-[#b41503] text-white shadow-sm'
                : 'text-[#c1c6d9] hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Phone Simulator (390px)</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className={`w-full flex-1 flex justify-center ${deviceMode === 'phone_mockup' ? 'py-6 px-4 bg-[#0a0a0d]' : ''}`}>
        {deviceMode === 'phone_mockup' ? (
          <div className="w-full max-w-[400px] min-h-[820px] bg-[#131316] rounded-[40px] border-[8px] border-[#22242a] shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_30px_rgba(180,21,3,0.2)] flex flex-col overflow-hidden">
            {/* Simulated Dynamic Island */}
            <div className="w-full bg-[#131316] pt-3 px-6 flex items-center justify-between text-xs font-semibold text-[#e4e1e6] select-none shrink-0">
              <span className="tabular-nums">20:25</span>
              <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#f80824] animate-pulse"></div>
              </div>
              <span className="text-[11px] text-[#ffb4a7]">5G</span>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col">
              {children}
            </div>
            <div className="w-full h-4 bg-[#131316] flex items-center justify-center shrink-0">
              <div className="w-28 h-1 bg-[#444652] rounded-full"></div>
            </div>
          </div>
        ) : (
          <div className="w-full flex-1 flex flex-col">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
