import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Fingerprint,
} from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (profile: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>(['Pop & Rock', 'Mandopop']);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!emailOrPhone.trim()) {
      setErrorMessage('Please enter your email or Singapore mobile number.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    const user: UserProfile = {
      id: `usr-${Math.floor(100000 + Math.random() * 900000)}`,
      name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Concert VIP',
      email: emailOrPhone.includes('@') ? emailOrPhone : 'member@mixtape.sg',
      phone: emailOrPhone.includes('@') ? '+65 9123 4567' : emailOrPhone,
      membershipTier: 'Gold VIP Pass',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB0-YOMuqdZpbpoHEeyfCEnecE-DNU59wdFZpPo2JaE9DxAa05UNvQrWscCORbjteypScreRhgNCBawlGb1shLlZv4iwhZBL3V1uohTWhhjMkyvRLiILA_nNk6j80j_tUbNN6sjCRKd_LpxvkRJPKa6qO7Q3fZ1RHaKxRPtdwOwg1XvJcz37MHQoLf30JtoADvsmaoe2ArPgyMXhWiFeMO4ktrimWkKp3JI0K-v3_UPwQcJrDFkM1nn',
      isLoggedIn: true,
    };

    onLoginSuccess(user);
    onClose();
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !signupEmail.trim() || !signupPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const newUser: UserProfile = {
      id: `usr-${Math.floor(100000 + Math.random() * 900000)}`,
      name: fullName.trim(),
      email: signupEmail.trim(),
      phone: signupPhone.trim() || '+65 8899 0011',
      membershipTier: 'Gold VIP Pass',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB0-YOMuqdZpbpoHEeyfCEnecE-DNU59wdFZpPo2JaE9DxAa05UNvQrWscCORbjteypScreRhgNCBawlGb1shLlZv4iwhZBL3V1uohTWhhjMkyvRLiILA_nNk6j80j_tUbNN6sjCRKd_LpxvkRJPKa6qO7Q3fZ1RHaKxRPtdwOwg1XvJcz37MHQoLf30JtoADvsmaoe2ArPgyMXhWiFeMO4ktrimWkKp3JI0K-v3_UPwQcJrDFkM1nn',
      isLoggedIn: true,
    };

    onLoginSuccess(newUser);
    onClose();
  };

  // Quick Demo Login helper
  const handleQuickDemoLogin = (name: string, email: string, tier: 'Gold VIP Pass' | 'Silver Member') => {
    const demoUser: UserProfile = {
      id: `usr-${Math.floor(100000 + Math.random() * 900000)}`,
      name,
      email,
      phone: '+65 9876 5432',
      membershipTier: tier,
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB0-YOMuqdZpbpoHEeyfCEnecE-DNU59wdFZpPo2JaE9DxAa05UNvQrWscCORbjteypScreRhgNCBawlGb1shLlZv4iwhZBL3V1uohTWhhjMkyvRLiILA_nNk6j80j_tUbNN6sjCRKd_LpxvkRJPKa6qO7Q3fZ1RHaKxRPtdwOwg1XvJcz37MHQoLf30JtoADvsmaoe2ArPgyMXhWiFeMO4ktrimWkKp3JI0K-v3_UPwQcJrDFkM1nn',
      isLoggedIn: true,
    };
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#16171d] border border-[#2a2a2d] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#1f1f24] to-[#16171d] border-b border-[#2a2a2d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#b41503] animate-pulse"></span>
            <span className="font-syne font-bold text-xs uppercase tracking-wider text-white">
              Mixtape SG Member Club
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

        {/* Mode Switcher Tabs */}
        <div className="p-3 bg-[#131316] border-b border-[#2a2a2d] flex gap-2">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
              mode === 'signin'
                ? 'bg-[#b41503] text-white shadow-sm'
                : 'bg-[#1b1b1e] text-[#c1c6d9] hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
              mode === 'signup'
                ? 'bg-[#b41503] text-white shadow-sm'
                : 'bg-[#1b1b1e] text-[#c1c6d9] hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto no-scrollbar space-y-4 flex-1 text-xs">
          {errorMessage && (
            <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs">
              {errorMessage}
            </div>
          )}

          {mode === 'signin' ? (
            <form onSubmit={handleSignIn} className="space-y-3.5">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#c1c6d9] block mb-1">
                  Email or Singapore Mobile (+65)
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-[#c1c6d9] absolute left-3" />
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="alex.tan@gmail.com or 91234567"
                    className="w-full bg-[#1b1b1e] border border-[#2a2a2d] text-white text-xs pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:border-[#b41503]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#c1c6d9]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setErrorMessage('Demo password reset link dispatched to your inbox.')}
                    className="text-[10px] text-[#ffb4a7] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-[#c1c6d9] absolute left-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your account password"
                    className="w-full bg-[#1b1b1e] border border-[#2a2a2d] text-white text-xs pl-9 pr-10 py-2.5 rounded-xl focus:outline-none focus:border-[#b41503]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-[#c1c6d9] hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-[#c1c6d9]">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded accent-[#b41503] w-3.5 h-3.5"
                  />
                  <span>Keep me signed in</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#b41503] hover:bg-[#f80824] text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(180,21,3,0.4)] flex items-center justify-center gap-1.5"
              >
                <span>Sign In to Mixtape</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* 1-Tap Quick Demo Logins */}
              <div className="pt-2 border-t border-[#2a2a2d] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#c1c6d9] block">
                  Quick Demo Access:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleQuickDemoLogin('Alex Tan', 'alex.tan@gmail.com', 'Gold VIP Pass')
                    }
                    className="p-2 rounded-xl bg-[#1b1b1e] border border-[#2a2a2d] hover:border-[#ffb4a7] text-left transition-colors"
                  >
                    <div className="font-semibold text-white truncate">Alex Tan</div>
                    <div className="text-[10px] text-[#ffb4a7]">Gold VIP Pass</div>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleQuickDemoLogin('Sarah Lim', 'sarah.lim@singnet.com.sg', 'Silver Member')
                    }
                    className="p-2 rounded-xl bg-[#1b1b1e] border border-[#2a2a2d] hover:border-[#ffb4a7] text-left transition-colors"
                  >
                    <div className="font-semibold text-white truncate">Sarah Lim</div>
                    <div className="text-[10px] text-[#c1c6d9]">Silver Member</div>
                  </button>
                </div>
              </div>

              {/* Singpass / Social logins */}
              <div className="pt-2 space-y-2">
                <div className="text-center text-[10px] uppercase font-bold text-[#c1c6d9]/60">
                  Or Sign In With
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleQuickDemoLogin('Alex Tan (Singpass Verified)', 'alex.tan@singpass.gov.sg', 'Gold VIP Pass')
                    }
                    className="py-2 px-3 rounded-xl bg-[#d9222a]/15 border border-[#d9222a]/40 text-white font-medium flex items-center justify-center gap-1.5 hover:bg-[#d9222a]/25 transition-colors"
                  >
                    <Fingerprint className="w-3.5 h-3.5 text-[#ff6b6b]" />
                    <span className="text-[11px]">Singpass SG</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleQuickDemoLogin('Apple Guest', 'guest@privaterelay.appleid.com', 'Gold VIP Pass')
                    }
                    className="py-2 px-3 rounded-xl bg-[#1b1b1e] border border-[#2a2a2d] text-white font-medium flex items-center justify-center gap-1.5 hover:bg-[#2a2a2d] transition-colors"
                  >
                    <span className="text-[11px]">Apple ID</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#c1c6d9] block mb-1">
                  Full Name (As in NRIC / Passport)
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-[#c1c6d9] absolute left-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Tan Wei Ming"
                    className="w-full bg-[#1b1b1e] border border-[#2a2a2d] text-white text-xs pl-9 pr-3 py-2 rounded-xl focus:outline-none focus:border-[#b41503]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#c1c6d9] block mb-1">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-[#c1c6d9] absolute left-3" />
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="alex.tan@gmail.com"
                    className="w-full bg-[#1b1b1e] border border-[#2a2a2d] text-white text-xs pl-9 pr-3 py-2 rounded-xl focus:outline-none focus:border-[#b41503]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#c1c6d9] block mb-1">
                  Singapore Mobile Number (+65)
                </label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 text-[#c1c6d9] absolute left-3" />
                  <input
                    type="tel"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    placeholder="+65 9123 4567"
                    className="w-full bg-[#1b1b1e] border border-[#2a2a2d] text-white text-xs pl-9 pr-3 py-2 rounded-xl focus:outline-none focus:border-[#b41503]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#c1c6d9] block mb-1">
                  Create Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-[#c1c6d9] absolute left-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full bg-[#1b1b1e] border border-[#2a2a2d] text-white text-xs pl-9 pr-10 py-2 rounded-xl focus:outline-none focus:border-[#b41503]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-[#c1c6d9] hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Music Preferences */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#c1c6d9] block mb-1.5">
                  Favorite Music Genres (For Priority Pre-Sales):
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {['Pop & Rock', 'Mandopop', 'K-Pop', 'Jazz & Acoustic'].map((genre) => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => toggleGenre(genre)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                        selectedGenres.includes(genre)
                          ? 'bg-[#b41503] text-white'
                          : 'bg-[#1b1b1e] text-[#c1c6d9] border border-[#2a2a2d]'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#1b1b1e] border border-[#2a2a2d] text-[11px] text-[#c1c6d9]">
                <div className="flex items-center gap-1.5 text-white font-semibold mb-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#ffb4a7]" />
                  <span>Instant STB Verified Member Benefits</span>
                </div>
                <span>Free priority lounge coat-check and presale alerts.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#b41503] hover:bg-[#f80824] text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(180,21,3,0.4)]"
              >
                Create Account & Unlock Gold Pass
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
