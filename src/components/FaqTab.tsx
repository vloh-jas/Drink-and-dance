import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  Ticket,
  Wine,
  ShieldCheck,
  Send,
  MessageCircle,
  Bot,
  User,
  Sparkles,
  AlertCircle,
  Compass,
} from 'lucide-react';
import { FaqItem, ConciergeChatMessage } from '../types';

const OFFICIAL_CONCERT_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Transit & "Leave Now" Advice',
    question: 'When should I leave for the concert, and how do I avoid the Stadium MRT crowd?',
    answer:
      'We recommend arriving at the Stadium precinct at least 75 to 90 minutes before showtime. Gates typically open at 18:30 SGT for a 20:00 SGT performance. To avoid peak Kallang Wave Mall congestion, take the Circle Line directly to Stadium MRT (CC6) or take the East-West Line to Kallang MRT (EW10) and take the 10-minute sheltered walk. For post-show departures, use Kallang or Mountbatten MRT stations for faster boarding.',
    highlight: true,
  },
  {
    id: 'faq-2',
    category: 'VIP Lounges & Cocktails',
    question: 'How do I claim my guaranteed table at ATLAS Bar, Smoke & Mirrors, or Manhattan Bar?',
    answer:
      'Every BookMyShow concert pass with a VIP Lounge add-on guarantees private booth or bar seating with zero waitlist. Simply present your BookMyShow SG Digital Pass QR code to the concierge upon arrival. You will receive priority entry, complimentary coat-check, and your signature cocktail or TheCocktailDB-curated zero-proof mocktail.',
    highlight: true,
  },
  {
    id: 'faq-3',
    category: 'VIP Lounges & Cocktails',
    question: 'Are non-alcoholic and zero-proof drinks available at the partner cocktail bars?',
    answer:
      'Yes, absolutely. All partner lounges (ATLAS Bar SG, Smoke & Mirrors, Manhattan Bar, and Jigger & Pony) feature crafted botanical zero-proof mocktails—including TheCocktailDB-curated specialties like Afterglow, Bora Bora, and artisanal yuzu tonics—with 0.0% ABV for guests who prefer alcohol-free experiences.',
  },
  {
    id: 'faq-4',
    category: 'Ticketing & Entry',
    question: 'How does the digital QR turnstile scan work at the stadium gates?',
    answer:
      'Your BookMyShow digital ticket generates an encrypted dynamic FastScan QR code. You can display it directly from the "My Passes" tab on your phone screen. Ensure your phone brightness is set to high. Printed screenshots or PDFs are not recommended as turnstiles use real-time optical verification.',
  },
  {
    id: 'faq-5',
    category: 'Ticketing & Entry',
    question: 'Can I transfer or gift my concert tickets to a family member or friend?',
    answer:
      'Yes. Ticket transfers can be initiated within your BookMyShow digital wallet up to 4 hours before gate opening. The recipient must verify with their mobile number or Singpass to receive the verified e-ticket onto their device.',
  },
  {
    id: 'faq-6',
    category: 'Venues & Gates',
    question: 'What is the bag policy and permitted items for National Stadium and Indoor Stadium?',
    answer:
      'Bags larger than 35cm x 20cm x 30cm (approx. A4 size) are not allowed inside the arena bowl. Clear bags are strongly encouraged for expedited entry. Outside food, professional DSLR cameras with detachable lenses, selfie sticks, and cans/glass bottles are prohibited. Empty reusable plastic water bottles (up to 750ml) can be brought in and filled at complimentary water stations inside.',
  },
  {
    id: 'faq-7',
    category: 'Venues & Gates',
    question: 'Where are the dedicated Grab, taxi, and ride-hail pick-up / drop-off points?',
    answer:
      'National Stadium drop-off is located at Stadium Crescent (Gate 1, Kallang Wave Mall). Singapore Indoor Stadium drop-off is at Stadium Walk (Gate 3). For post-show ride-hails, heavy surge pricing and traffic restrictions occur along Stadium Boulevard; consider walking towards Guillemard Road or Mountbatten for quicker pick-up.',
  },
  {
    id: 'faq-8',
    category: 'Ticketing & Entry',
    question: 'What are the age restrictions for the VIP Standing Pen vs Reserved Seating?',
    answer:
      'For safety reasons, patrons under 12 years of age or under 1.2m in height are not permitted into the General Admission Standing Pen. Reserved seated sections welcome children aged 6 and above with a valid ticket.',
  },
  {
    id: 'faq-9',
    category: 'Transit & "Leave Now" Advice',
    question: 'Are there parking facilities available on-site during mega concert days?',
    answer:
      'On-site parking at Singapore Sports Hub Car Parks (L, K, B) is strictly pre-booked or reserved for staff and VIP pass holders during sold-out stadium dates. Drivers are strongly advised to park at Kallang Leisure Park, Marina Bay Sands, or Suntec City and take the MRT one stop over.',
  },
];

const CATEGORIES = [
  'All FAQs',
  'Ticketing & Entry',
  'Venues & Gates',
  'VIP Lounges & Cocktails',
  'Transit & "Leave Now" Advice',
] as const;

export const FaqTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All FAQs');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  // Live Concierge Chat Assistant State
  const [chatMessages, setChatMessages] = useState<ConciergeChatMessage[]>([
    {
      id: 'c-welcome',
      sender: 'concierge',
      text: 'Welcome to BookMyShow Singapore Concierge! Ask me anything regarding concert entry times, MRT transit advice, ATLAS Bar reservations, or zero-proof mocktails.',
      timestamp: 'Just now',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');

  // Filter FAQs
  const filteredFaqs = useMemo(() => {
    return OFFICIAL_CONCERT_FAQS.filter((faq) => {
      // Category filter
      if (selectedCategory !== 'All FAQs' && faq.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  const handleAskConcierge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery.trim();
    setInputQuery('');

    setChatMessages((prev) => [
      ...prev,
      {
        id: `u-${Date.now()}`,
        sender: 'user',
        text: userText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);

    setTimeout(() => {
      const lower = userText.toLowerCase();
      let reply = '';

      if (lower.includes('leave') || lower.includes('time') || lower.includes('mrt') || lower.includes('transit')) {
        reply =
          'We advise leaving for Singapore National Stadium 75-90 minutes before showtime. Gates open at 18:30 SGT. Taking Kallang MRT (EW10) or Stadium MRT (CC6) is the fastest way to avoid traffic!';
      } else if (lower.includes('cocktail') || lower.includes('atlas') || lower.includes('lounge') || lower.includes('drink') || lower.includes('table')) {
        reply =
          'Your BookMyShow ticket gives you guaranteed priority entry at ATLAS Bar SG, Smoke & Mirrors, or Manhattan Bar. Show your digital QR pass for a reserved table and complimentary coat-check!';
      } else if (lower.includes('zero') || lower.includes('mocktail') || lower.includes('alcohol')) {
        reply =
          'Yes! All our partner lounges offer TheCocktailDB-curated zero-proof mocktails (Afterglow, Bora Bora, and craft botanical spritzes) with 0.0% ABV.';
      } else if (lower.includes('bag') || lower.includes('camera') || lower.includes('water')) {
        reply =
          'Bags must be smaller than A4 size (approx 35x20x30cm). Empty plastic water bottles (up to 750ml) are permitted and can be refilled inside the stadium.';
      } else {
        reply = `Thank you for asking about "${userText}". Our 24/7 Singapore Concierge recommends arriving early and keeping your digital QR code ready on the "My Passes" tab.`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: `c-${Date.now()}`,
          sender: 'concierge',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 350);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-3 sm:p-6 space-y-6 pb-20 text-[#e4e1e6]">
      {/* Header Banner */}
      <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#1f1f24] via-[#16171d] to-[#0e0e11] border border-[#2a2a2d] shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#b41503]/20 text-[#ffb4a7] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-2 border border-[#b41503]/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Singapore Box Office & Venue Operations</span>
            </div>
            <h2 className="font-syne font-bold text-xl sm:text-2xl text-white">
              Official Concert & Nightlife FAQs
            </h2>
            <p className="text-xs sm:text-sm text-[#c1c6d9] mt-1 leading-relaxed">
              Official policies for Singapore National Stadium, Indoor Stadium, The Star Theatre, and partner cocktail lounges.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#ffb4a7] font-semibold bg-[#1b1b1e] px-3 py-1.5 rounded-xl border border-[#2a2a2d]">
              {OFFICIAL_CONCERT_FAQS.length} Verified Topics
            </span>
          </div>
        </div>

        {/* Live Search Bar */}
        <div className="mt-4 relative flex items-center">
          <Search className="w-4 h-4 text-[#c1c6d9] absolute left-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g. When to leave, ATLAS Bar table, bag sizes, MRT transit, mocktails)..."
            className="w-full bg-[#1b1b1e] border border-[#2a2a2d] text-white text-xs pl-9 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-[#b41503]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-xs text-[#c1c6d9] hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#b41503] text-white shadow-sm'
                  : 'bg-[#1b1b1e] text-[#c1c6d9] hover:text-white hover:bg-[#2a2a2d]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: FAQ Accordion on Left, Concierge Chat on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Official FAQ Accordion Items */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-[#2a2a2d]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ffb4a7]">
              {selectedCategory} ({filteredFaqs.length})
            </span>
            <span className="text-[11px] text-[#c1c6d9]">Tap to expand</span>
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-[#16171d] rounded-2xl border border-[#2a2a2d] text-xs text-[#c1c6d9]">
              <HelpCircle className="w-8 h-8 text-[#ffb4a7]/40 mx-auto mb-2" />
              <p>No FAQs match "{searchQuery}".</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All FAQs');
                }}
                className="mt-2 text-[#ffb4a7] underline font-semibold"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all ${
                    faq.highlight
                      ? 'bg-[#16171d] border-[#b41503]/40 shadow-sm'
                      : 'bg-[#16171d] border-[#2a2a2d]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className="w-full p-4 text-left flex items-start justify-between gap-3 hover:bg-[#1f1f22] transition-colors rounded-2xl"
                  >
                    <div>
                      <span className="text-[9.5px] uppercase font-bold text-[#ffb4a7] tracking-wider block mb-1">
                        {faq.category}
                      </span>
                      <h3 className="text-xs sm:text-sm font-semibold text-white leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#ffb4a7] shrink-0 mt-0.5" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#c1c6d9] shrink-0 mt-0.5" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="p-4 pt-0 text-xs text-[#c1c6d9] leading-relaxed border-t border-[#22242a] mt-1 space-y-2 animate-in fade-in duration-150">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Live Interactive Concierge Chat Assistant */}
        <div className="lg:col-span-5 rounded-2xl bg-[#16171d] border border-[#2a2a2d] overflow-hidden flex flex-col h-[520px]">
          {/* Header */}
          <div className="p-3.5 bg-[#1b1b1e] border-b border-[#2a2a2d] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#b41503] flex items-center justify-center text-white shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>SG Concert Concierge</span>
                  <span className="text-[9.5px] bg-[#b41503]/20 text-[#ffb4a7] px-1.5 py-0.2 rounded font-semibold">
                    Live Assistant
                  </span>
                </div>
                <div className="text-[10px] text-emerald-400">Online • 24/7 Support</div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3.5 overflow-y-auto no-scrollbar space-y-3 bg-[#131316]">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'concierge' && (
                  <div className="w-7 h-7 rounded-full bg-[#b41503] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#b41503] text-white rounded-br-xs'
                      : 'bg-[#1f1f22] border border-[#2a2a2d] text-[#e4e1e6] rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 ${
                      msg.sender === 'user' ? 'text-white/70 text-right' : 'text-[#c1c6d9]/60'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#2a2a2d] text-[#ffb4a7] flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Question Chips */}
          <div className="p-2 bg-[#1b1b1e] border-t border-[#2a2a2d] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] text-[#c1c6d9] shrink-0 font-bold uppercase pl-1">
              Ask:
            </span>
            {[
              'When should I leave?',
              'ATLAS Bar reserved table?',
              'Zero-proof mocktails?',
              'Bag policy size?',
            ].map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setInputQuery(q)}
                className="px-2.5 py-1 rounded-full bg-[#2a2a2d] hover:bg-[#353438] text-[10.5px] text-[#e4e1e6] whitespace-nowrap transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Form */}
          <form onSubmit={handleAskConcierge} className="p-2.5 bg-[#16171d] border-t border-[#2a2a2d] flex gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask anything about the concert..."
              className="flex-1 bg-[#1b1b1e] border border-[#2a2a2d] text-white text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-[#b41503]"
            />
            <button
              type="submit"
              className="px-3.5 py-2 bg-[#b41503] hover:bg-[#f80824] text-white text-xs font-semibold rounded-xl flex items-center gap-1 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
