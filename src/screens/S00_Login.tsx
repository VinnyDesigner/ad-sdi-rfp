import React, { useState } from 'react';
import { ScreenId } from '../types';
import { DgeLogo } from '../components/common/DgeLogo';
import { InteractiveMap } from '../components/common/InteractiveMap';
import {
  ShieldCheck,
  Users,
  Globe,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ChevronRight,
  User,
  UserPlus,
  Fingerprint,
  CheckCircle2,
  X,
  Building,
  KeyRound,
  MapPin,
  Layers,
  Sparkles,
} from 'lucide-react';

interface S00LoginProps {
  onNavigate: (screen: ScreenId) => void;
  isArabic?: boolean;
}

export const S00_Login: React.FC<S00LoginProps> = ({ onNavigate, isArabic = false }) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'create'>('signin');
  const [email, setEmail] = useState('name@domain.ae');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  // Background toggle: Scenic Photo vs Real GIS Map
  const [bgMode, setBgMode] = useState<'map' | 'photo'>('map');

  // Create account form state
  const [regFullName, setRegFullName] = useState('');
  const [regEntity, setRegEntity] = useState('DMT · Municipalities & Transport');
  const [regEmail, setRegEmail] = useState('');
  const [regRole, setRegRole] = useState('GIS Analyst / Spatial Specialist');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regAgreed, setRegAgreed] = useState(false);

  // Modals & Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [infoModalContent, setInfoModalContent] = useState<{ title: string; body: string } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(isArabic ? 'تم تسجيل الدخول بنجاح! جاري الانتقال...' : 'Signed in successfully! Redirecting...');
    setTimeout(() => {
      onNavigate(isArabic ? 'S01_Home_AR' : 'S01_Home');
    }, 700);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) {
      showToast(isArabic ? 'كلمات المرور غير متطابقة!' : 'Passwords do not match!');
      return;
    }
    showToast(
      isArabic
        ? `تم إنشاء الحساب لـ ${regFullName}! يرجى تفعيل البريد.`
        : `Account created for ${regFullName}! Verification email dispatched.`
    );
    setActiveTab('signin');
    setEmail(regEmail || 'name@domain.ae');
  };

  const handleUaePassClick = () => {
    showToast(
      isArabic
        ? 'تمت المصادقة عبر الهوية الرقمية (UAE PASS)'
        : 'Authenticated via UAE PASS Sovereign Identity'
    );
    setTimeout(() => {
      onNavigate(isArabic ? 'S01_Home_AR' : 'S01_Home');
    }, 600);
  };

  const handlePartnerClick = () => {
    showToast(
      isArabic
        ? 'تم الدخول بحساب الشركاء'
        : 'Authenticated with Commercial Partner Credentials'
    );
    setTimeout(() => {
      onNavigate('S08_MarketplaceCatalogue');
    }, 600);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      isArabic
        ? `تم إرسال رابط استعادة كلمة المرور إلى ${forgotEmail}`
        : `Password recovery link dispatched to ${forgotEmail}`
    );
    setShowForgotPasswordModal(false);
    setForgotEmail('');
  };

  return (
    <div
      className={`w-full min-h-screen flex overflow-hidden select-none bg-white ${
        isArabic ? 'flex-row-reverse font-arabic' : 'font-sans'
      }`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-8 z-[2000] bg-navy-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-gold-500 flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-[13px] font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* LEFT IMAGE / LIVE GIS MAP & BRANDING PANEL */}
      <div className="flex-1 min-h-screen relative bg-[#07172B] overflow-hidden flex flex-col justify-between p-12 text-white">
        {/* Background layer: Either Real Leaflet Interactive GIS Map or Scenic Photo */}
        <div className="absolute inset-0 z-0">
          {bgMode === 'map' ? (
            <div className="w-full h-full relative">
              <InteractiveMap
                mode="simple"
                center={[24.4600, 54.3800]}
                zoom={12}
                className="w-full h-full"
              />
              {/* Subtle dark overlay for readable text */}
              <div className="absolute inset-0 bg-navy-950/60 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07172B]/95 via-[#0A2244]/80 to-transparent pointer-events-none" />
            </div>
          ) : (
            <div className="w-full h-full relative">
              <img
                src="/images/abudhabi_skyline_dusk.jpg"
                alt="Abu Dhabi Skyline"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07172B]/95 via-[#0A2244]/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051121] via-transparent to-[#07172B]/75" />
            </div>
          )}

          {/* Flowing Glowing Topographic Elevation Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
            viewBox="0 0 840 1018"
            fill="none"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <path
                key={i}
                d={`M -100 ${450 + i * 50} Q 280 ${380 + i * 55} 520 ${480 + i * 45} T 950 ${420 + i * 50}`}
                stroke={i % 3 === 0 ? '#E5A817' : '#2BA6DE'}
                strokeWidth={1.5}
                fill="none"
              />
            ))}
          </svg>
        </div>

        {/* Top-Left: DGE Government Crest + Live GIS Map / Scenic Photo Toggle */}
        <div className="relative z-10 flex items-center justify-between">
          <DgeLogo variant="white" height={46} isArabic={isArabic} />

          {/* Map vs Photo Mode Switcher */}
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md p-1 rounded-xl border border-white/20 text-[11px]">
            <button
              onClick={() => {
                setBgMode('map');
                showToast('Mounted Live Leaflet GIS Map with high-res tiles');
              }}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                bgMode === 'map'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <span>🛰️</span>
              <span>{isArabic ? 'خريطة GIS حية' : 'Live GIS Map'}</span>
            </button>
            <button
              onClick={() => {
                setBgMode('photo');
                showToast('Switched to Scenic Abu Dhabi Dusk Photo');
              }}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                bgMode === 'photo'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <span>📷</span>
              <span>{isArabic ? 'صورة أفق المدينة' : 'Scenic Photo'}</span>
            </button>
          </div>
        </div>

        {/* Middle: Tag + Headline + Subtext + 3 Trust Badges */}
        <div className="relative z-10 max-w-[620px] space-y-5 my-auto py-6">
          {/* Gold Tag */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-[2.5px] bg-[#E5A817]" />
            <span className="text-[12px] font-bold tracking-widest text-[#E5A817] uppercase">
              AD-SDI PORTAL
            </span>
          </div>

          {/* Large Headline */}
          <h1 className="text-[44px] font-extrabold leading-[1.12] tracking-tight text-white">
            {isArabic ? (
              <>
                البيانات المكانية
                <br />
                لإمارة أبوظبي.
                <br />
                <span className="text-[#E5A817]">موثوقة. متصلة.</span>
              </>
            ) : (
              <>
                Abu Dhabi&apos;s
                <br />
                spatial data.
                <br />
                <span className="text-[#E5A817]">Trusted. Connected.</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-[14px] leading-relaxed text-white/85 max-w-[540px]">
            {isArabic
              ? 'وصول آمن وموثوق إلى البيانات والخدمات الجيومكانية الرسمية عبر كافة الجهات الحكومية والشركاء والمجتمع.'
              : 'Secure access to authoritative geospatial data and services across government, partners and the community.'}
          </p>

          {/* 3 Circular Trust Indicators */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            {/* Trust 1: UAE Data Residency */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full border border-[#E5A817]/60 bg-white/10 flex items-center justify-center text-[#E5A817] flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[13px] font-bold text-white">
                  {isArabic ? 'سيادة البيانات' : 'UAE data residency'}
                </div>
                <div className="text-[11px] text-white/70 leading-snug">
                  {isArabic ? 'بنية تحتية سيادية آمنة' : 'Secure sovereign cloud'}
                </div>
              </div>
            </div>

            {/* Trust 2: Role-based */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full border border-[#E5A817]/60 bg-white/10 flex items-center justify-center text-[#E5A817] flex-shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[13px] font-bold text-white">
                  {isArabic ? 'تحكم بالصلاحيات' : 'Role-based access'}
                </div>
                <div className="text-[11px] text-white/70 leading-snug">
                  {isArabic ? 'للجهات والشركاء' : 'For entities & partners'}
                </div>
              </div>
            </div>

            {/* Trust 3: Bilingual */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full border border-[#E5A817]/60 bg-white/10 flex items-center justify-center text-[#E5A817] flex-shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[13px] font-bold text-white">
                  {isArabic ? 'ثنائية اللغة' : 'Bilingual Platform'}
                </div>
                <div className="text-[11px] text-white/70 leading-snug">
                  {isArabic ? 'العربية والإنجليزية' : 'Full Arabic & English'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className="relative z-10 flex items-center justify-between text-[12px] text-white/75 font-medium border-t border-white/10 pt-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-[2px] bg-[#E5A817]" />
            <span>
              {isArabic
                ? 'أبوظبي أكثر اتصالاً ومرونة واستدامة'
                : 'A more connected, resilient and sustainable Abu Dhabi'}
            </span>
          </div>

          {bgMode === 'map' && (
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Interactive Leaflet Map (24.46° N, 54.38° E)</span>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIGN-IN / REGISTRATION FORM PANEL */}
      <div className="w-[520px] xl:w-[580px] min-h-screen bg-[#FFFFFF] flex flex-col justify-between p-10 overflow-y-auto">
        <div className="space-y-5">
          {/* Top Bar: Wordmark + Language Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[19px] font-extrabold text-[#0B2545] tracking-tight">
                  AD-SDI Portal
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-[#1F5FAD] border border-blue-200">
                  PROD
                </span>
              </div>
              <div className="text-[12px] font-semibold text-[#0B2545]">
                Abu Dhabi <span className="text-[#E5A817] font-bold">Spatial Data</span> Infrastructure
              </div>
            </div>

            <button
              onClick={() => onNavigate(isArabic ? 'S00_Login' : 'S00_Login_AR')}
              className="text-[13px] font-semibold text-secondaryText hover:text-navy-900 transition-colors"
            >
              <span className={!isArabic ? 'font-bold text-navy-900' : ''}>EN</span>
              <span className="mx-1.5 text-steel-400">|</span>
              <span className={isArabic ? 'font-bold text-navy-900 font-arabic' : 'font-arabic'}>عربي</span>
            </button>
          </div>

          {/* Tab Switcher: [Sign in] [Create account] */}
          <div className="bg-[#F0F4F8] p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => setActiveTab('signin')}
              className={`flex-1 py-2.5 rounded-lg text-[13px] font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'signin'
                  ? 'bg-[#0B2545] text-white shadow-sm'
                  : 'text-secondaryText hover:text-navy-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{isArabic ? 'تسجيل الدخول' : 'Sign in'}</span>
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`flex-1 py-2.5 rounded-lg text-[13px] font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'create'
                  ? 'bg-[#0B2545] text-white shadow-sm'
                  : 'text-secondaryText hover:text-navy-900'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>{isArabic ? 'إنشاء حساب جديد' : 'Create account'}</span>
            </button>
          </div>

          {/* MODE 1: SIGN IN */}
          {activeTab === 'signin' && (
            <>
              {/* Heading */}
              <div className="space-y-1">
                <h2 className="text-[22px] font-bold text-navy-900 tracking-tight">
                  {isArabic ? 'تسجيل الدخول إلى حسابك' : 'Sign in to your account'}
                </h2>
                <p className="text-[13px] text-secondaryText">
                  {isArabic
                    ? 'الوصول إلى البيانات والخرائط والخدمات المكانية من أجل أبوظبي أكثر ذكاءً واستدامة.'
                    : 'Access geospatial data, maps and services for a smarter and more sustainable Abu Dhabi.'}
                </p>
              </div>

              {/* Big Government Account (UAE PASS) Button */}
              <div className="space-y-2.5">
                <button
                  onClick={handleUaePassClick}
                  className="w-full h-[50px] bg-[#0B2545] hover:bg-[#071B33] text-white rounded-xl flex items-center justify-between px-5 font-semibold text-[13px] shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
                      <Fingerprint className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <span>{isArabic ? 'الحساب الحكومي (UAE PASS)' : 'Government Account (UAE PASS)'}</span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform ${
                      isArabic ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Partner / Public Account Button */}
                <button
                  onClick={handlePartnerClick}
                  className="w-full h-[46px] bg-[#F4F6F9] hover:bg-[#EAEFF5] text-primaryText rounded-xl flex items-center justify-between px-5 font-semibold text-[13px] border border-border transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-steel-500" />
                    <span>{isArabic ? 'حساب الشركاء / الحساب العام' : 'Partner / Public Account'}</span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 text-steel-400 group-hover:translate-x-1 transition-transform ${
                      isArabic ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex py-0.5 items-center">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink mx-4 text-secondaryText text-[11px] lowercase font-medium">
                  {isArabic ? 'أو عبر البريد الرسمي' : 'or with official email'}
                </span>
                <div className="flex-grow border-t border-border"></div>
              </div>

              {/* Email / Password Form */}
              <form onSubmit={handleSignInSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[12px] font-semibold text-primaryText mb-1">
                    {isArabic ? 'عنوان البريد الإلكتروني' : 'Email address'}
                  </label>
                  <div className="relative">
                    <Mail
                      className={`w-4 h-4 text-steel-400 absolute top-1/2 -translate-y-1/2 ${
                        isArabic ? 'right-3.5' : 'left-3.5'
                      }`}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full h-[42px] rounded-xl border border-border bg-[#F8FAFC] text-[13px] text-primaryText focus:outline-none focus:border-blue-600 focus:bg-white transition-all ${
                        isArabic ? 'pr-10 pl-3.5' : 'pl-10 pr-3.5'
                      }`}
                      placeholder="name@domain.ae"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-primaryText mb-1">
                    {isArabic ? 'كلمة المرور' : 'Password'}
                  </label>
                  <div className="relative">
                    <Lock
                      className={`w-4 h-4 text-steel-400 absolute top-1/2 -translate-y-1/2 ${
                        isArabic ? 'right-3.5' : 'left-3.5'
                      }`}
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full h-[42px] rounded-xl border border-border bg-[#F8FAFC] text-[13px] text-primaryText focus:outline-none focus:border-blue-600 focus:bg-white transition-all ${
                        isArabic ? 'pr-10 pl-10' : 'pl-10 pr-10'
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute top-1/2 -translate-y-1/2 text-steel-400 hover:text-navy-900 ${
                        isArabic ? 'left-3.5' : 'right-3.5'
                      }`}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-[12px] pt-0.5">
                  <label className="flex items-center gap-2 text-secondaryText cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-border"
                    />
                    <span className="font-medium text-primaryText">
                      {isArabic ? 'تذكر هذا الجهاز' : 'Remember this device'}
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPasswordModal(true)}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    {isArabic ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                  </button>
                </div>

                {/* Sign in Button */}
                <button
                  type="submit"
                  className="w-full h-[44px] bg-[#1865C9] hover:bg-[#1453A3] text-white rounded-xl text-[13px] font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <span>{isArabic ? 'تسجيل الدخول' : 'Sign in'}</span>
                  <ArrowRight className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
                </button>
              </form>
            </>
          )}

          {/* MODE 2: CREATE ACCOUNT FORM */}
          {activeTab === 'create' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div className="space-y-1">
                <h2 className="text-[20px] font-bold text-navy-900 tracking-tight">
                  {isArabic ? 'طلب إنشاء حساب مستخدم حكومي' : 'Register Government / Partner Account'}
                </h2>
                <p className="text-[12px] text-secondaryText">
                  {isArabic
                    ? 'يتطلب الحصول على صلاحيات الوصول موافقة المشرف في جهتك الحكومية.'
                    : 'Access requires approval from your department data steward.'}
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-primaryText mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="e.g. Mariam Al-Mansoori"
                  className="w-full h-[38px] px-3 rounded-lg border border-border text-[12px] text-primaryText focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-primaryText mb-1">
                    Government Entity
                  </label>
                  <select
                    value={regEntity}
                    onChange={(e) => setRegEntity(e.target.value)}
                    className="w-full h-[38px] px-2 rounded-lg border border-border text-[11px] text-primaryText focus:outline-none focus:border-blue-600 bg-white"
                  >
                    <option value="DMT · Municipalities & Transport">DMT · Municipalities</option>
                    <option value="EAD · Environment Agency">EAD · Environment Agency</option>
                    <option value="DoH · Department of Health">DoH · Dept. of Health</option>
                    <option value="ITC · Integrated Transport">ITC · Transport</option>
                    <option value="Commercial Partner">Commercial Partner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-primaryText mb-1">
                    Role Category
                  </label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value)}
                    className="w-full h-[38px] px-2 rounded-lg border border-border text-[11px] text-primaryText focus:outline-none focus:border-blue-600 bg-white"
                  >
                    <option value="GIS Specialist">GIS Specialist</option>
                    <option value="Data Steward">Data Steward</option>
                    <option value="Executive">Executive</option>
                    <option value="Developer">Developer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-primaryText mb-1">
                  Official Work Email (.ae)
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="name@entity.ae"
                  className="w-full h-[38px] px-3 rounded-lg border border-border text-[12px] text-primaryText focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-primaryText mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full h-[38px] px-3 rounded-lg border border-border text-[12px] text-primaryText focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-primaryText mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    className="w-full h-[38px] px-3 rounded-lg border border-border text-[12px] text-primaryText focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>
              </div>

              <label className="flex items-start gap-2 text-[11px] text-secondaryText cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={regAgreed}
                  onChange={(e) => setRegAgreed(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 mt-0.5"
                  required
                />
                <span>
                  I agree to the Abu Dhabi Sovereign Spatial Data Governance and Acceptable Use Policy.
                </span>
              </label>

              <button
                type="submit"
                className="w-full h-[42px] bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[13px] font-bold shadow-sm transition-all"
              >
                Submit Registration Request
              </button>
            </form>
          )}

          {/* Operational Status Card */}
          <div
            onClick={() => onNavigate('S05_QualitySlaDashboard')}
            className="p-3 rounded-xl bg-[#EDF9F1] border border-emerald-200/70 flex items-center justify-between cursor-pointer hover:bg-[#E4F5EB] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <div className="text-[12px] font-bold text-emerald-900 leading-tight">
                  {isArabic ? 'بوابة AD-SDI تعمل بكفاءة' : 'AD-SDI Portal is operational'}
                </div>
                <div className="text-[10px] text-emerald-700 leading-tight">
                  {isArabic ? 'كافة الأنظمة والخدمات تعمل بشكل طبيعي' : 'All systems running normally · SLA 99.98%'}
                </div>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 text-emerald-600 ${isArabic ? 'rotate-180' : ''}`} />
          </div>
        </div>

        {/* Footer Links & Abu Dhabi Brand Signature */}
        <div className="pt-4 border-t border-border flex items-center justify-between text-[11px] text-secondaryText">
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setInfoModalContent({
                  title: 'Privacy & Data Protection',
                  body: 'All spatial and tabular datasets stored on AD-SDI adhere strictly to the UAE Federal Decree Law No. 45 of 2021 on Personal Data Protection and Abu Dhabi sovereign data residency directives.',
                })
              }
              className="hover:text-navy-900"
            >
              {isArabic ? 'الخصوصية' : 'Privacy'}
            </button>
            <span>|</span>
            <button
              onClick={() =>
                setInfoModalContent({
                  title: 'Terms of Use & Licensing',
                  body: 'Datasets published on AD-SDI are governed by the Abu Dhabi Sovereign Data Sharing Framework and bilateral Data Sharing Agreements (DSAs). Unauthorised extraction or redistribution is prohibited.',
                })
              }
              className="hover:text-navy-900"
            >
              {isArabic ? 'الشروط' : 'Terms'}
            </button>
            <span>|</span>
            <button
              onClick={() =>
                setInfoModalContent({
                  title: 'Accessibility Standards',
                  body: 'AD-SDI is designed in full compliance with WCAG 2.1 Level AA standards, featuring high-contrast modes, screen-reader semantic landmarks, and dual-direction RTL/LTR Arabic and English support.',
                })
              }
              className="hover:text-navy-900"
            >
              {isArabic ? 'سهولة الاستخدام' : 'Accessibility'}
            </button>
            <span>|</span>
            <button
              onClick={() =>
                setInfoModalContent({
                  title: 'Contact AD-SDI Support',
                  body: 'Abu Dhabi Department of Government Enablement (DGE) · Geospatial Data Operations Centre · Email: support@ad-sdi.ae · Hotline: 800-555-GEO (09:00 - 17:00 GST).',
                })
              }
              className="hover:text-navy-900"
            >
              {isArabic ? 'اتصل بنا' : 'Contact'}
            </button>
          </div>

          {/* Abu Dhabi "A City of Possibilities" Line-art Badge */}
          <div className="flex items-center gap-2 text-right">
            <svg viewBox="0 0 36 24" className="w-8 h-6 text-steel-400" fill="none" stroke="currentColor">
              <path d="M4 22V10L10 6L16 12L22 4L28 10L32 22" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="text-[9px] leading-tight font-medium text-steel-500">
              <div className="font-bold text-navy-900">Abu Dhabi</div>
              <div>A City of Possibilities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-[420px] bg-white rounded-2xl border border-border shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900">
                  Account Recovery
                </span>
                <h3 className="text-[17px] font-bold text-navy-900 mt-1">
                  Reset your password
                </h3>
              </div>
              <button
                onClick={() => setShowForgotPasswordModal(false)}
                className="w-7 h-7 rounded-lg bg-canvas hover:bg-slate-200 flex items-center justify-center text-steel-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[12px] text-secondaryText">
              Enter your official government email address and we will dispatch a secure single-use recovery token.
            </p>

            <form onSubmit={handleForgotPasswordSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-primaryText mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@domain.ae"
                  className="w-full h-9 px-3 rounded-lg border border-border text-[13px] text-primaryText focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(false)}
                  className="px-4 py-2 rounded-xl bg-canvas hover:bg-slate-200 text-secondaryText font-semibold text-[12px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[12px] shadow-sm transition-colors"
                >
                  Send Recovery Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Governance & Legal Info Modal */}
      {infoModalContent && (
        <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-[460px] bg-white rounded-2xl border border-border shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <h3 className="text-[17px] font-bold text-navy-900">
                {infoModalContent.title}
              </h3>
              <button
                onClick={() => setInfoModalContent(null)}
                className="w-7 h-7 rounded-lg bg-canvas hover:bg-slate-200 flex items-center justify-center text-steel-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[13px] text-secondaryText leading-relaxed">
              {infoModalContent.body}
            </p>

            <div className="flex justify-end pt-2 border-t border-border">
              <button
                onClick={() => setInfoModalContent(null)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[12px] shadow-sm transition-colors"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
