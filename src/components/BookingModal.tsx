import React, { useState } from 'react';
import {
  X,
  Calendar,
  MapPin,
  Check,
  Plus,
  Minus,
  Sparkles,
  ShieldCheck,
  Wine,
  CreditCard,
  QrCode,
} from 'lucide-react';
import { Concert, BookedTicket } from '../types';
import { COCKTAILS_DATA } from '../data/mockData';

interface BookingModalProps {
  concert: Concert | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: (ticket: BookedTicket) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  concert,
  isOpen,
  onClose,
  onBookingSuccess,
}) => {
  if (!isOpen || !concert) return null;

  const [selectedDate, setSelectedDate] = useState<string>('24 Nov 2025 (Day 1)');
  const [selectedTier, setSelectedTier] = useState<{
    name: string;
    price: number;
    color: string;
    description: string;
  }>({
    name: 'CAT 1 Reserved Seating',
    price: 228,
    color: '#b41503',
    description: 'Prime lower bowl view with unobstructed acoustic line-of-sight',
  });
  const [quantity, setQuantity] = useState<number>(2);
  const [includeLoungePass, setIncludeLoungePass] = useState<boolean>(true);
  const [loungeDrinkType, setLoungeDrinkType] = useState<'signature' | 'mocktail'>('mocktail');
  const [paymentMethod, setPaymentMethod] = useState<'paynow' | 'grabpay' | 'applepay'>('paynow');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [confirmedTicket, setConfirmedTicket] = useState<BookedTicket | null>(null);

  // Find paired cocktail and paired mocktail
  const pairedCocktail =
    COCKTAILS_DATA.find((c) => c.id === concert.pairedCocktailId) || COCKTAILS_DATA[0];
  const matchedMocktail = concert.pairedMocktail;

  const tiers = [
    {
      name: 'VIP Standing Pen',
      price: 298,
      color: '#f80824',
      description: 'Front stage pit with early entry priority & commemorative lanyard',
    },
    {
      name: 'CAT 1 Reserved Seating',
      price: 228,
      color: '#b41503',
      description: 'Prime lower bowl view with unobstructed acoustic line-of-sight',
    },
    {
      name: 'CAT 2 Tiered Seating',
      price: 168,
      color: '#39393c',
      description: 'Elevated grandstand view with full stage perspective',
    },
    {
      name: 'CAT 3 Upper Circle',
      price: concert.startingPrice || 128,
      color: '#22242a',
      description: 'Atmospheric arena view with full lighting spectacle',
    },
  ];

  const drinkPrice = loungeDrinkType === 'mocktail' ? 24 : pairedCocktail.pricePerGuest;
  const loungeAddonPrice = includeLoungePass ? drinkPrice * quantity : 0;
  const ticketSubtotal = selectedTier.price * quantity;
  const bookingFee = 8 * quantity;
  const grandTotal = ticketSubtotal + bookingFee + loungeAddonPrice;

  const handleConfirmBooking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const generatedTicket: BookedTicket = {
        id: `TKT-SG-${Math.floor(100000 + Math.random() * 900000)}`,
        concertId: concert.id,
        concertTitle: concert.title,
        artist: concert.artist,
        venue: concert.venue,
        date: selectedDate,
        time: '20:00 SGT',
        tier: selectedTier.name,
        quantity,
        totalPrice: grandTotal,
        seats: Array.from({ length: quantity }, (_, idx) => `Sec 112, Row G, Seat ${14 + idx}`),
        bookingDate: new Date().toLocaleDateString('en-SG', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        qrCodeSeed: `BMS-SG-${concert.id.toUpperCase()}-${Date.now()}`,
        pairedLounge: includeLoungePass
          ? {
              barName: pairedCocktail.barName,
              cocktailName:
                loungeDrinkType === 'mocktail' && matchedMocktail
                  ? `${matchedMocktail.strDrink} (Zero-Proof)`
                  : pairedCocktail.name,
              timeSlot: '18:00 SGT (Pre-Show)',
              guests: quantity,
            }
          : undefined,
      };

      setIsProcessing(false);
      setConfirmedTicket(generatedTicket);
      onBookingSuccess(generatedTicket);
    }, 1000);
  };

  const handleReset = () => {
    setConfirmedTicket(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#16171d] border border-[#2a2a2d] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#1f1f24] to-[#16171d] border-b border-[#2a2a2d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f80824] animate-pulse"></span>
            <span className="font-syne font-bold text-xs uppercase tracking-wider text-white">
              Official Mixtape Singapore Box Office
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

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto no-scrollbar space-y-5 flex-1">
          {/* Confirmed State View */}
          {confirmedTicket ? (
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-[#b41503]/20 border border-[#b41503] mx-auto flex items-center justify-center text-[#ffb4a7]">
                <Check className="w-8 h-8 text-[#ffb4a7]" />
              </div>

              <div>
                <h3 className="font-syne font-bold text-xl text-white">
                  Booking Confirmed!
                </h3>
                <p className="text-xs text-[#c1c6d9] mt-1">
                  Your digital concert pass has been issued and stored in your wallet.
                </p>
              </div>

              {/* Digital Pass Summary Card */}
              <div className="p-4 rounded-2xl bg-[#1b1b1e] border border-[#333545] text-left space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#2a2a2d]">
                  <span className="text-[10px] font-mono text-[#ffb4a7]">
                    {confirmedTicket.id}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#b41503]/30 text-[#ffb4a7] text-[10px] font-bold">
                    VERIFIED E-TICKET
                  </span>
                </div>

                <div>
                  <h4 className="font-syne font-bold text-base text-white">
                    {confirmedTicket.concertTitle}
                  </h4>
                  <div className="text-xs text-[#c1c6d9] mt-1 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#ffb4a7]" />
                    <span>{confirmedTicket.date} • {confirmedTicket.time}</span>
                  </div>
                  <div className="text-xs text-[#c1c6d9] mt-0.5 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#ffb4a7]" />
                    <span>{confirmedTicket.venue}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#2a2a2d] text-xs">
                  <div>
                    <span className="text-[10px] text-[#c1c6d9] block">Category & Seats</span>
                    <span className="font-semibold text-white">{confirmedTicket.tier}</span>
                    <div className="text-[11px] text-[#ffb4a7]">
                      {confirmedTicket.seats.join(', ')}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#c1c6d9] block">Total Paid</span>
                    <span className="font-syne font-bold text-base text-white">
                      S${confirmedTicket.totalPrice}
                    </span>
                    <span className="text-[10px] text-[#c1c6d9] block">
                      {confirmedTicket.quantity} tickets
                    </span>
                  </div>
                </div>

                {confirmedTicket.pairedLounge && (
                  <div className="p-2.5 rounded-xl bg-[#1f2533] border border-[#ffb4a7]/30 flex items-center gap-2.5">
                    <Wine className="w-5 h-5 text-[#ffb4a7] shrink-0" />
                    <div className="min-w-0 text-xs">
                      <div className="font-semibold text-white">
                        VIP Lounge Access: {confirmedTicket.pairedLounge.barName}
                      </div>
                      <div className="text-[11px] text-[#ffb4a7]">
                        {confirmedTicket.pairedLounge.cocktailName} • {confirmedTicket.pairedLounge.timeSlot}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 bg-[#b41503] hover:bg-[#f80824] text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-[#b41503]/30"
              >
                View Pass in My Wallet
              </button>
            </div>
          ) : (
            <>
              {/* Show Hero info */}
              <div className="flex gap-3 items-center">
                <img
                  src={concert.imageUrl}
                  alt={concert.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 ring-1 ring-[#2a2a2d]"
                />
                <div className="min-w-0">
                  <h3 className="font-syne font-bold text-sm sm:text-base text-white truncate">
                    {concert.title}
                  </h3>
                  <div className="text-xs text-[#c1c6d9] flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#ffb4a7]" />
                    <span className="truncate">{concert.venue}</span>
                  </div>
                </div>
              </div>

              {/* Step 1: Select Performance Date */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#c1c6d9]">
                  1. Select Show Date
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['24 Nov 2025 (Day 1)', '25 Nov 2025 (Day 2)'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDate(d)}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                        selectedDate === d
                          ? 'bg-[#b41503]/20 border-[#b41503] text-[#ffb4a7]'
                          : 'bg-[#1b1b1e] border-[#2a2a2d] text-[#c1c6d9] hover:text-white'
                      }`}
                    >
                      <div className="font-semibold">{d}</div>
                      <div className="text-[10px] text-[#c1c6d9]">Doors: 18:30 SGT</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Arena Tier Selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#c1c6d9]">
                  2. Arena Seating Tier
                </label>
                <div className="space-y-1.5">
                  {tiers.map((t) => {
                    const isSelected = selectedTier.name === t.name;
                    return (
                      <button
                        key={t.name}
                        type="button"
                        onClick={() => setSelectedTier(t)}
                        className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#1f2533] border-[#ffb4a7] shadow-sm'
                            : 'bg-[#1b1b1e] border-[#2a2a2d] hover:bg-[#1f1f22]'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: t.color }}
                            ></span>
                            <span className="text-xs font-semibold text-white">{t.name}</span>
                          </div>
                          <p className="text-[11px] text-[#c1c6d9] mt-0.5 leading-snug">
                            {t.description}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-syne font-bold text-sm text-white">
                            S${t.price}
                          </span>
                          <span className="block text-[10px] text-[#c1c6d9]">/ seat</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Ticket Quantity */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#1b1b1e] border border-[#2a2a2d]">
                <div>
                  <span className="text-xs font-semibold text-white block">Quantity</span>
                  <span className="text-[10px] text-[#c1c6d9]">Max 6 tickets per transaction</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-lg bg-[#2a2a2d] hover:bg-[#353438] disabled:opacity-40 text-white flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-syne font-bold text-base text-white w-5 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(6, quantity + 1))}
                    disabled={quantity >= 6}
                    className="w-8 h-8 rounded-lg bg-[#2a2a2d] hover:bg-[#353438] disabled:opacity-40 text-white flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Step 4: VIP Cocktail Lounge Pairing Add-on */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#1f2533] to-[#16171d] border border-[#ffb4a7]/40 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wine className="w-4 h-4 text-[#ffb4a7]" />
                    <span className="font-syne font-bold text-xs uppercase tracking-wider text-white">
                      Curated Concert Pairing Add-on
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    id="lounge-addon"
                    checked={includeLoungePass}
                    onChange={(e) => setIncludeLoungePass(e.target.checked)}
                    className="w-4 h-4 accent-[#b41503] rounded cursor-pointer"
                  />
                </div>

                {includeLoungePass && (
                  <div className="space-y-2">
                    {/* Toggle between signature cocktail and matched zero-proof mocktail */}
                    <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#1b1b1e] rounded-xl border border-[#2a2a2d]">
                      <button
                        type="button"
                        onClick={() => setLoungeDrinkType('mocktail')}
                        className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 ${
                          loungeDrinkType === 'mocktail'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'text-[#c1c6d9] hover:text-white'
                        }`}
                      >
                        <Sparkles className="w-3 h-3 text-emerald-300" />
                        <span>Zero-Proof Mocktail</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setLoungeDrinkType('signature')}
                        className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                          loungeDrinkType === 'signature'
                            ? 'bg-[#b41503] text-white shadow-sm'
                            : 'text-[#c1c6d9] hover:text-white'
                        }`}
                      >
                        <span>Signature Cocktail</span>
                      </button>
                    </div>

                    <div className="text-xs text-[#e4e1e6] p-2 rounded-xl bg-[#16171d] border border-[#2a2a2d] flex items-center gap-2.5">
                      <img
                        src={
                          loungeDrinkType === 'mocktail' && matchedMocktail
                            ? matchedMocktail.strDrinkThumb
                            : pairedCocktail.imageUrl
                        }
                        alt="drink"
                        className="w-10 h-10 rounded-lg object-cover shrink-0 border border-[#333545]"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-white truncate">
                            {loungeDrinkType === 'mocktail' && matchedMocktail
                              ? matchedMocktail.strDrink
                              : pairedCocktail.name}
                          </span>
                          {loungeDrinkType === 'mocktail' && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400">
                              0.0% ABV
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#c1c6d9] truncate">
                          {pairedCocktail.barName} • Priority Reserved Booth
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1 border-t border-[#2a2a2d] text-xs">
                  <span className="text-[10px] text-[#ffb4a7] font-semibold uppercase">
                    Special Bundle Rate
                  </span>
                  <span className="font-syne font-bold text-white">
                    +S${(loungeDrinkType === 'mocktail' ? 24 : pairedCocktail.pricePerGuest) * quantity}{' '}
                    <span className="text-[10px] text-[#c1c6d9]">
                      (S${loungeDrinkType === 'mocktail' ? 24 : pairedCocktail.pricePerGuest} × {quantity})
                    </span>
                  </span>
                </div>
              </div>

              {/* Step 5: Payment Selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#c1c6d9]">
                  3. Select Instant SG Payment
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paynow')}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      paymentMethod === 'paynow'
                        ? 'bg-[#b41503]/20 border-[#b41503] text-white font-bold'
                        : 'bg-[#1b1b1e] border-[#2a2a2d] text-[#c1c6d9]'
                    }`}
                  >
                    PayNow SG
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('grabpay')}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      paymentMethod === 'grabpay'
                        ? 'bg-[#b41503]/20 border-[#b41503] text-white font-bold'
                        : 'bg-[#1b1b1e] border-[#2a2a2d] text-[#c1c6d9]'
                    }`}
                  >
                    GrabPay
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      paymentMethod === 'applepay'
                        ? 'bg-[#b41503]/20 border-[#b41503] text-white font-bold'
                        : 'bg-[#1b1b1e] border-[#2a2a2d] text-[#c1c6d9]'
                    }`}
                  >
                    Apple Pay
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-3 rounded-xl bg-[#1b1b1e] border border-[#2a2a2d] space-y-1 text-xs text-[#c1c6d9]">
                <div className="flex justify-between">
                  <span>{selectedTier.name} ({quantity}x)</span>
                  <span className="text-white font-medium">S${ticketSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>STB Booking & Processing Fee</span>
                  <span className="text-white font-medium">S${bookingFee}</span>
                </div>
                {includeLoungePass && (
                  <div className="flex justify-between text-[#ffb4a7]">
                    <span>VIP Lounge Pairing Pass ({quantity}x)</span>
                    <span className="font-medium">S${loungeAddonPrice}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-[#2a2a2d] text-sm text-white font-bold">
                  <span>Grand Total</span>
                  <span className="font-syne text-lg text-[#ffb4a7]">S${grandTotal}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                type="button"
                onClick={handleConfirmBooking}
                disabled={isProcessing}
                className="w-full py-3.5 bg-[#b41503] hover:bg-[#f80824] disabled:opacity-50 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(180,21,3,0.5)] active:scale-[0.98]"
              >
                {isProcessing ? (
                  <span>Securing Tickets via SISTIC Connect...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorize & Pay S${grandTotal}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#c1c6d9]/70">
                <ShieldCheck className="w-3 h-3 text-[#ffb4a7]" />
                <span>256-Bit Encrypted Official Singapore Gateway • Instant E-Ticket</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
