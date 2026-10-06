import React, { useState } from 'react';
import { X, Wine, Clock, Users, Calendar, Check, Sparkles, Building2, ShieldCheck } from 'lucide-react';
import { CocktailExperience, LoungeBooking } from '../types';

interface LoungeReservationModalProps {
  cocktail: CocktailExperience | null;
  isOpen: boolean;
  onClose: () => void;
  onReserveSuccess: (booking: LoungeBooking) => void;
}

export const LoungeReservationModal: React.FC<LoungeReservationModalProps> = ({
  cocktail,
  isOpen,
  onClose,
  onReserveSuccess,
}) => {
  if (!isOpen || !cocktail) return null;

  const [guests, setGuests] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState<string>('24 Nov 2025');
  const [selectedSlot, setSelectedSlot] = useState<string>('17:30 - Pre-Concert Libations');
  const [includeMocktail, setIncludeMocktail] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  const timeSlots = [
    '17:30 - Pre-Concert Libations (Recommended)',
    '18:30 - Express Cocktail Pairing',
    '22:30 - Post-Show Nightcap Lounge',
    '23:15 - Midnight Velvet Session',
  ];

  const totalPrice = cocktail.pricePerGuest * guests;

  const handleConfirm = () => {
    const ref = `LNG-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsConfirmed(true);

    const booking: LoungeBooking = {
      id: ref,
      cocktailId: cocktail.id,
      cocktailName: cocktail.name,
      barName: cocktail.barName,
      date: selectedDate,
      timeSlot: selectedSlot,
      guests,
      totalPrice,
      bookingRef: ref,
    };

    onReserveSuccess(booking);
  };

  const handleReset = () => {
    setIsConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#16171d] border border-[#2a2a2d] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#1f1f24] to-[#16171d] border-b border-[#2a2a2d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wine className="w-4 h-4 text-[#ffb4a7]" />
            <span className="font-syne font-bold text-xs uppercase tracking-wider text-white">
              VIP Lounge & Mixology Concierge Reserve
            </span>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="p-1 rounded-full bg-[#1f1f22] text-[#c1c6d9] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto no-scrollbar space-y-4 flex-1">
          {isConfirmed ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#b41503]/20 border border-[#b41503] mx-auto flex items-center justify-center text-[#ffb4a7]">
                <Check className="w-8 h-8 text-[#ffb4a7]" />
              </div>

              <div>
                <h3 className="font-syne font-bold text-xl text-white">
                  Table Reserved with Ticket Privilege!
                </h3>
                <p className="text-xs text-[#c1c6d9] mt-1">
                  Present your BookMyShow digital pass at {cocktail.barName} for priority seating and complimentary coat check.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#1b1b1e] border border-[#333545] text-left space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-[#2a2a2d]">
                  <span className="text-[10px] font-mono text-[#ffb4a7]">{bookingRef}</span>
                  <span className="text-[10px] bg-[#ffb4a7]/20 text-[#ffb4a7] px-2 py-0.5 rounded font-bold uppercase">
                    Guaranteed Priority
                  </span>
                </div>

                <div className="text-white font-bold text-sm">{cocktail.barName}</div>
                <div className="text-xs text-[#ffb4a7] font-semibold">{cocktail.name}</div>
                <div className="text-xs text-[#c1c6d9]">{selectedDate} • {selectedSlot}</div>
                <div className="text-xs text-[#c1c6d9]">{guests} Guests • S${totalPrice} Total</div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 bg-[#b41503] hover:bg-[#f80824] text-white rounded-xl font-semibold text-sm transition-all shadow-lg"
              >
                Close & Return to Lounges
              </button>
            </div>
          ) : (
            <>
              {/* Cocktail info header */}
              <div className="flex gap-3 items-center">
                <img
                  src={cocktail.imageUrl}
                  alt={cocktail.name}
                  className="w-16 h-16 rounded-xl object-cover ring-1 ring-[#2a2a2d] shrink-0"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#ffb4a7]">
                    {cocktail.tag}
                  </span>
                  <h3 className="font-syne font-bold text-base text-white">{cocktail.name}</h3>
                  <p className="text-xs text-[#c1c6d9]">{cocktail.barName}</p>
                </div>
              </div>

              {/* Guest Count Selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#c1c6d9]">
                  Number of Guests
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 4, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`py-2 rounded-xl border text-xs font-semibold transition-all ${
                        guests === num
                          ? 'bg-[#b41503] border-[#b41503] text-white shadow-sm'
                          : 'bg-[#1b1b1e] border-[#2a2a2d] text-[#c1c6d9] hover:text-white'
                      }`}
                    >
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#c1c6d9]">
                  Select Pre/Post-Concert Time Slot
                </label>
                <div className="space-y-1.5">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                        selectedSlot === slot
                          ? 'bg-[#1f2533] border-[#ffb4a7] text-white font-medium'
                          : 'bg-[#1b1b1e] border-[#2a2a2d] text-[#c1c6d9] hover:bg-[#1f1f22]'
                      }`}
                    >
                      <span className="truncate">{slot}</span>
                      {selectedSlot === slot && <Check className="w-3.5 h-3.5 text-[#ffb4a7]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Zero-proof adapt toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#1b1b1e] border border-[#2a2a2d] text-xs">
                <div>
                  <span className="font-semibold text-white block">Zero-Proof / Mocktail Adaptable</span>
                  <span className="text-[11px] text-[#c1c6d9]">Prepare non-alcoholic botanical version</span>
                </div>
                <input
                  type="checkbox"
                  checked={includeMocktail}
                  onChange={(e) => setIncludeMocktail(e.target.checked)}
                  className="w-4 h-4 accent-[#b41503] rounded"
                />
              </div>

              {/* Summary */}
              <div className="p-3 rounded-xl bg-[#1b1b1e] border border-[#2a2a2d] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-[#c1c6d9] block">Total Pass Price</span>
                  <span className="font-syne font-bold text-lg text-white">S${totalPrice}</span>
                  <span className="text-[10px] text-[#ffb4a7] block">
                    (S${cocktail.pricePerGuest} × {guests} guests)
                  </span>
                </div>
                <div className="text-right text-[11px] text-[#c1c6d9]">
                  <span className="block font-medium text-white">No Separate Reservation Needed</span>
                  <span>100% Guaranteed Table</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleConfirm}
                className="w-full py-3.5 bg-[#b41503] hover:bg-[#f80824] text-white rounded-xl font-bold text-sm transition-all shadow-[0_0_24px_rgba(180,21,3,0.4)]"
              >
                Reserve VIP Table for S${totalPrice}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
