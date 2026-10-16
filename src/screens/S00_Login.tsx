import React, { useState } from 'react';
import { ScreenId } from '../types';
import { DgeLogo } from '../components/common/DgeLogo';
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

  return (
    <div
      className={`w-full min-h-screen flex overflow-hidden select-none bg-white ${
        isArabic ? 'flex-row-reverse font-arabic' : 'font-sans'
      }`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* LEFT IMAGE & BRANDING PANEL */}
      <div className="flex-1 min-h-screen relative bg-[#07172B] overflow-hidden flex flex-col justify-between p-14 text-white">
        {/* Real Aerial Photo Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/abudhabi_skyline_dusk.jpg"
            alt="Abu Dhabi Skyline"
            className="w-full h-full object-cover object-center"
          />
          {/* Deep Navy/Black Gradient Overlay matching the reference */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07172B]/95 via-[#0A2244]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051121] via-transparent to-[#07172B]/75" />

          {/* Flowing Glowing Topographic Elevation Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25" viewBox="0 0 840 1018" fill="none">
            {Array.from({ length: 12 }).map((_, i) => (
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

        {/* Top-Left: DGE Government Crest with Red Shield */}
        <div className="relative z-10">
          <DgeLogo variant="white" height={46} isArabic={isArabic} />
        </div>

        {/* Middle: Tag + Headline + Subtext + 3 Trust Badges */}
        <div className="relative z-10 max-w-[620px] space-y-6">
          {/* Gold Tag */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-[2.5px] bg-[#E5A817]" />
            <span className="text-[12px] font-bold tracking-widest text-[#E5A817] uppercase">
              AD-SDI PORTAL
            </span>
          </div>

          {/* Large Headline */}
          <h1 className="text-[46px] font-extrabold leading-[1.12] tracking-tight text-white">
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
          <p className="text-[15px] leading-relaxed text-white/85 max-w-[540px]">
            {isArabic
              ? 'وصول آمن وموثوق إلى البيانات والخدمات الجيومكانية الرسمية عبر كافة الجهات الحكومية والشركاء والمجتمع.'
              : 'Secure access to authoritative geospatial data and services across government, partners and the community.'}
          </p>

          {/* 3 Circular Trust Indicators */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {/* Trust 1: UAE Data Residency */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full border border-[#E5A817]/60 bg-white/5 flex items-center justify-center text-[#E5A817] flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[13px] font-bold text-white">
                  {isArabic ? 'سيادة البيانات' : 'UAE data residency'}
                </div>
                <div className="text-[11px] text-white/70 leading-snug">
                  {isArabic ? 'بنية تحتية سيادية آمنة' : 'Secure and sovereign infrastructure'}
                </div>
              </div>
            </div>

            {/* Trust 2: Role-based */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full border border-[#E5A817]/60 bg-white/5 flex items-center justify-center text-[#E5A817] flex-shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[13px] font-bold text-white">
                  {isArabic ? 'تحكم بالصلاحيات' : 'Role-based access control'}
                </div>
                <div className="text-[11px] text-white/70 leading-snug">
                  {isArabic ? 'للجهات والشركاء' : 'For government and partners'}
                </div>
              </div>
            </div>

            {/* Trust 3: Bilingual */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full border border-[#E5A817]/60 bg-white/5 flex items-center justify-center text-[#E5A817] flex-shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-[13px] font-bold text-white">
                  {isArabic ? 'ثنائية اللغة' : 'Bilingual Arabic & English'}
                </div>
                <div className="text-[11px] text-white/70 leading-snug">
                  {isArabic ? 'متاحة للجميع' : 'Accessible to a wider community'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className="relative z-10 flex items-center gap-3 text-[12px] text-white/75 font-medium border-t border-white/10 pt-5">
          <div className="w-7 h-[2px] bg-[#E5A817]" />
          <span>
            {isArabic
              ? 'أبوظبي أكثر اتصالاً ومرونة واستدامة'
              : 'A more connected, resilient and sustainable Abu Dhabi'}
          </span>
        </div>
      </div>

      {/* RIGHT SIGN-IN FORM PANEL */}
      <div className="w-[540px] xl:w-[600px] min-h-screen bg-[#FFFFFF] flex flex-col justify-between p-12 overflow-y-auto">
        <div className="space-y-6">
          {/* Top Bar: Wordmark with Gold "Spatial Data" + Language Toggle */}
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
              className={`flex-1 py-2.5 rounded-lg text-[13px] font-medium flex items-center justify-center gap-2 transition-all ${
                activeTab === 'create'
                  ? 'bg-[#0B2545] text-white shadow-sm'
                  : 'text-secondaryText hover:text-navy-900'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>{isArabic ? 'إنشاء حساب جديد' : 'Create account'}</span>
            </button>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h2 className="text-[24px] font-bold text-navy-900 tracking-tight">
              {isArabic ? 'تسجيل الدخول إلى حسابك' : 'Sign in to your account'}
            </h2>
            <p className="text-[13px] text-secondaryText">
              {isArabic
                ? 'الوصول إلى البيانات والخرائط والخدمات المكانية من أجل أبوظبي أكثر ذكاءً واستدامة.'
                : 'Access geospatial data, maps and services for a smarter and more sustainable Abu Dhabi.'}
            </p>
          </div>

          {/* Big Government Account (UAE PASS) Button */}
          <div className="space-y-3">
            <button
              onClick={() => onNavigate(isArabic ? 'S01_Home_AR' : 'S01_Home')}
              className="w-full h-[52px] bg-[#0B2545] hover:bg-[#071B33] text-white rounded-xl flex items-center justify-between px-5 font-semibold text-[14px] shadow-sm transition-all group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <Fingerprint className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <span>{isArabic ? 'الحساب الحكومي (UAE PASS)' : 'Government Account (UAE PASS)'}</span>
              </div>
              <ArrowRight className={`w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform ${isArabic ? 'rotate-180' : ''}`} />
            </button>

            {/* Partner / Public Account Button */}
            <button
              onClick={() => onNavigate('S08_MarketplaceCatalogue')}
              className="w-full h-[50px] bg-[#F4F6F9] hover:bg-[#EAEFF5] text-primaryText rounded-xl flex items-center justify-between px-5 font-semibold text-[14px] border border-border transition-colors group"
            >
              <div className="flex items-center gap-3.5">
                <Users className="w-5 h-5 text-steel-500" />
                <span>{isArabic ? 'حساب الشركاء / الحساب العام' : 'Partner / Public Account'}</span>
              </div>
              <ArrowRight className={`w-4 h-4 text-steel-400 group-hover:translate-x-1 transition-transform ${isArabic ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink mx-4 text-secondaryText text-[12px] lowercase font-medium">
              or
            </span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          {/* Email / Password Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onNavigate(isArabic ? 'S01_Home_AR' : 'S01_Home');
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-[12px] font-semibold text-primaryText mb-1.5">
                {isArabic ? 'عنوان البريد الإلكتروني' : 'Email address'}
              </label>
              <div className="relative">
                <Mail className={`w-4 h-4 text-steel-400 absolute top-1/2 -translate-y-1/2 ${isArabic ? 'right-3.5' : 'left-3.5'}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full h-[44px] rounded-xl border border-border bg-[#F8FAFC] text-[13px] text-primaryText focus:outline-none focus:border-blue-600 focus:bg-white transition-all ${
                    isArabic ? 'pr-10 pl-3.5' : 'pl-10 pr-3.5'
                  }`}
                  placeholder="name@domain.ae"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-primaryText mb-1.5">
                {isArabic ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <Lock className={`w-4 h-4 text-steel-400 absolute top-1/2 -translate-y-1/2 ${isArabic ? 'right-3.5' : 'left-3.5'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full h-[44px] rounded-xl border border-border bg-[#F8FAFC] text-[13px] text-primaryText focus:outline-none focus:border-blue-600 focus:bg-white transition-all ${
                    isArabic ? 'pr-10 pl-10' : 'pl-10 pr-10'
                  }`}
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
            <div className="flex items-center justify-between text-[13px] pt-1">
              <label className="flex items-center gap-2 text-secondaryText cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-border"
                />
                <span className="font-medium text-primaryText">{isArabic ? 'تذكر هذا الجهاز' : 'Remember this device'}</span>
              </label>
              <a href="#forgot" className="text-blue-600 hover:underline font-semibold">
                {isArabic ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
              </a>
            </div>

            {/* Sign in Button */}
            <button
              type="submit"
              className="w-full h-[46px] bg-[#1865C9] hover:bg-[#1453A3] text-white rounded-xl text-[14px] font-bold transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>{isArabic ? 'تسجيل الدخول' : 'Sign in'}</span>
              <ArrowRight className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
            </button>
          </form>

          {/* MFA text */}
          <div className="text-center text-[11px] text-secondaryText">
            {isArabic
              ? 'المصادقة متعددة العوامل (MFA) مطلوبة لحسابات الجهات الحكومية.'
              : 'Multi-factor authentication (MFA) is required for government accounts.'}
          </div>

          {/* Operational Status Card */}
          <div
            onClick={() => onNavigate('S05_QualitySlaDashboard')}
            className="p-3.5 rounded-xl bg-[#EDF9F1] border border-emerald-200/70 flex items-center justify-between cursor-pointer hover:bg-[#E4F5EB] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <div className="text-[12px] font-bold text-emerald-900 leading-tight">
                  {isArabic ? 'بوابة AD-SDI تعمل بكفاءة' : 'AD-SDI Portal is operational'}
                </div>
                <div className="text-[11px] text-emerald-700 leading-tight">
                  {isArabic ? 'كافة الأنظمة والخدمات تعمل بشكل طبيعي' : 'All systems running normally'}
                </div>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 text-emerald-600 ${isArabic ? 'rotate-180' : ''}`} />
          </div>
        </div>

        {/* Footer Links & Abu Dhabi Brand Signature */}
        <div className="pt-6 border-t border-border flex items-center justify-between text-[11px] text-secondaryText">
          <div className="flex items-center gap-3">
            <span className="hover:text-navy-900 cursor-pointer">{isArabic ? 'الخصوصية' : 'Privacy'}</span>
            <span>|</span>
            <span className="hover:text-navy-900 cursor-pointer">{isArabic ? 'الشروط' : 'Terms'}</span>
            <span>|</span>
            <span className="hover:text-navy-900 cursor-pointer">{isArabic ? 'سهولة الاستخدام' : 'Accessibility'}</span>
            <span>|</span>
            <span className="hover:text-navy-900 cursor-pointer">{isArabic ? 'اتصل بنا' : 'Contact'}</span>
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
    </div>
  );
};
