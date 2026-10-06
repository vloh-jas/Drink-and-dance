import React, { useState } from 'react';
import {
  X,
  Ticket,
  Wine,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  Check,
  Share2,
  Download,
} from 'lucide-react';
import { BookedTicket, LoungeBooking } from '../types';

interface TicketsWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickets: BookedTicket[];
  loungeBookings: LoungeBooking[];
}

export const TicketsWalletModal: React.FC<TicketsWalletModalProps> = ({
  isOpen,
  onClose,
  tickets,
  loungeBookings,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'concerts' | 'lounges'>('concerts');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#16171d] border border-[#2a2a2d] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Wallet Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#1f1f24] to-[#16171d] border-b border-[#2a2a2d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-[#ffb4a7]" />
            <span className="font-syne font-bold text-sm uppercase tracking-wider text-white">
              My Digital Passes & Wallet
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

        {/* Tab switch: Concert Passes vs VIP Lounge Passes */}
        <div className="p-3 bg-[#131316] border-b border-[#2a2a2d] flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('concerts')}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'concerts'
                ? 'bg-[#b41503] text-white shadow-sm'
                : 'bg-[#1b1b1e] text-[#c1c6d9] hover:text-white'
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Concert Passes ({tickets.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('lounges')}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'lounges'
                ? 'bg-[#b41503] text-white shadow-sm'
                : 'bg-[#1b1b1e] text-[#c1c6d9] hover:text-white'
            }`}
          >
            <Wine className="w-3.5 h-3.5" />
            <span>Lounge Passes ({loungeBookings.length})</span>
          </button>
        </div>

        {/* Scrollable list */}
        <div className="p-4 sm:p-5 overflow-y-auto no-scrollbar space-y-4 flex-1">
          {activeTab === 'concerts' ? (
            tickets.length === 0 ? (
              <div className="py-16 text-center text-xs text-[#c1c6d9]">
                <Ticket className="w-8 h-8 text-[#ffb4a7]/40 mx-auto mb-2" />
                <p>No active concert tickets yet.</p>
                <p className="text-[11px] mt-1 text-[#c1c6d9]/70">
                  Select a show on the Arena Calendar to book instant e-tickets.
                </p>
              </div>
            ) : (
              tickets.map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl bg-[#1b1b1e] border border-[#333545] overflow-hidden shadow-lg"
                >
                  {/* Top Ticket Stub */}
                  <div className="p-4 bg-gradient-to-r from-[#b41503]/30 via-[#1f1f24] to-[#1b1b1e] border-b border-[#2a2a2d] space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono text-[#ffb4a7] font-bold">{t.id}</span>
                      <span className="px-2 py-0.5 rounded bg-[#b41503] text-white text-[10px] font-bold uppercase tracking-wider">
                        Confirmed & Verified
                      </span>
                    </div>

                    <h3 className="font-syne font-bold text-base sm:text-lg text-white">
                      {t.concertTitle}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#c1c6d9]">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#ffb4a7]" />
                        <span>{t.date} • {t.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#ffb4a7]" />
                        <span>{t.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Perforated Divider */}
                  <div className="relative h-4 bg-[#131316] flex items-center justify-between px-3">
                    <div className="w-3 h-3 rounded-full bg-[#16171d] -ml-4.5 border border-[#333545]"></div>
                    <div className="w-full border-b border-dashed border-[#333545]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#16171d] -mr-4.5 border border-[#333545]"></div>
                  </div>

                  {/* Bottom Ticket Stub with QR & Seats */}
                  <div className="p-4 bg-[#1b1b1e] space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#c1c6d9] block">
                          Tier / Category
                        </span>
                        <span className="font-semibold text-white">{t.tier}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-[#c1c6d9] block">
                          Quantity
                        </span>
                        <span className="font-semibold text-white">{t.quantity} Passes</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#131316] border border-[#2a2a2d] text-xs">
                      <span className="text-[10px] uppercase font-bold text-[#ffb4a7] block mb-1">
                        Allocated Seats
                      </span>
                      <div className="font-mono text-white text-[11px]">
                        {t.seats.join(' · ')}
                      </div>
                    </div>

                    {/* QR Code representation */}
                    <div className="p-3 bg-white rounded-xl flex items-center justify-between text-black">
                      <div className="space-y-0.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                          Gate Turnstile FastScan
                        </div>
                        <div className="font-mono text-xs font-bold">{t.qrCodeSeed}</div>
                        <div className="text-[9px] text-slate-500">
                          Hold against turnstile scanner at Gate 4
                        </div>
                      </div>

                      {/* Stylized QR Code matrix */}
                      <div className="w-14 h-14 bg-black p-1 rounded grid grid-cols-4 gap-0.5 shrink-0">
                        {Array.from({ length: 16 }).map((_, idx) => (
                          <div
                            key={idx}
                            className={`rounded-xs ${
                              (idx + t.id.length) % 3 === 0 ? 'bg-white' : 'bg-black'
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>

                    {/* Paired Lounge Banner if booked */}
                    {t.pairedLounge && (
                      <div className="p-2.5 rounded-xl bg-[#1f2533] border border-[#ffb4a7]/30 flex items-center gap-2.5">
                        <Wine className="w-4 h-4 text-[#ffb4a7] shrink-0" />
                        <div className="text-xs">
                          <div className="font-semibold text-white">
                            VIP Lounge Pass: {t.pairedLounge.barName}
                          </div>
                          <div className="text-[11px] text-[#ffb4a7]">
                            {t.pairedLounge.cocktailName} • {t.pairedLounge.timeSlot}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => handleCopy(t.id)}
                        className="text-[11px] text-[#c1c6d9] hover:text-white flex items-center gap-1"
                      >
                        {copiedId === t.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Pass ID Copied</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-3.5 h-3.5" />
                            <span>Copy Pass ID</span>
                          </>
                        )}
                      </button>

                      <span className="text-[10px] text-[#c1c6d9] flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-[#ffb4a7]" />
                        <span>SISTIC & STB Verified</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )
          ) : loungeBookings.length === 0 ? (
            <div className="py-16 text-center text-xs text-[#c1c6d9]">
              <Wine className="w-8 h-8 text-[#ffb4a7]/40 mx-auto mb-2" />
              <p>No VIP lounge reservations yet.</p>
              <p className="text-[11px] mt-1 text-[#c1c6d9]/70">
                Reserve signature cocktail pairings at ATLAS, Smoke & Mirrors, or Manhattan Bar.
              </p>
            </div>
          ) : (
            loungeBookings.map((l) => (
              <div
                key={l.id}
                className="p-4 rounded-2xl bg-[#1b1b1e] border border-[#333545] space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#2a2a2d]">
                  <span className="font-mono text-xs text-[#ffb4a7] font-bold">{l.bookingRef}</span>
                  <span className="px-2 py-0.5 rounded bg-[#b41503]/20 text-[#ffb4a7] text-[10px] font-bold uppercase">
                    Priority Booth Reserved
                  </span>
                </div>

                <div>
                  <h4 className="font-syne font-bold text-base text-white">{l.barName}</h4>
                  <div className="text-xs text-[#ffb4a7] font-medium">{l.cocktailName}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#c1c6d9]">
                  <div>
                    <span className="text-[10px] block">Date & Time</span>
                    <span className="text-white font-medium">{l.date}</span>
                    <div className="text-[11px]">{l.timeSlot}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] block">Party Size</span>
                    <span className="text-white font-medium">{l.guests} Guests</span>
                    <div className="text-[11px] text-[#ffb4a7] font-bold">
                      S${l.totalPrice} Paid
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#131316] text-[11px] text-[#c1c6d9] flex items-center justify-between">
                  <span>FastPass Concierge Entry</span>
                  <span className="text-white font-semibold">No Queue Required</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
