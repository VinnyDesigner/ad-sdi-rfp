import React, { useState } from 'react';
import { ScreenId } from '../types';
import { HeaderWorkspace } from '../components/common/HeaderWorkspace';
import { DgeLogo, PortalWordmark } from '../components/common/DgeLogo';
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sun,
  Layers,
  Building2,
  Globe,
  Info,
  ArrowRight,
  Compass,
  Sparkles,
  ShoppingBag,
  GraduationCap,
  Eye,
  MapPin,
  Car,
  Trees,
  Zap,
  Camera,
  Users,
  Calendar,
  ExternalLink,
} from 'lucide-react';

interface S01HomeProps {
  onNavigate: (screen: ScreenId) => void;
  isArabic?: boolean;
}

export const S01_Home: React.FC<S01HomeProps> = ({ onNavigate, isArabic = false }) => {
  const [searchScope, setSearchScope] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Datasets');

  const themes = [
    {
      title: 'Boundaries',
      titleAr: 'الحدود الإدارية',
      count: '320 datasets →',
      icon: MapPin,
      color: '#1F5FAD',
      img: '/images/abudhabi_satellite_mangroves.jpg',
    },
    {
      title: 'Transport',
      titleAr: 'النقل والطرق',
      count: '420 datasets →',
      icon: Car,
      color: '#0B2545',
      img: '/images/abudhabi_skyline_dusk.jpg',
    },
    {
      title: 'Land & Cadastre',
      titleAr: 'الأراضي والمخططات',
      count: '380 datasets →',
      icon: Layers,
      color: '#1F5FAD',
      img: '/images/khalifa_city_cadastre.jpg',
    },
    {
      title: 'Buildings & 3D',
      titleAr: 'المباني وثلاثية الأبعاد',
      count: '290 datasets →',
      icon: Building2,
      color: '#2BA6DE',
      img: '/images/abudhabi_skyline_dusk.jpg',
    },
    {
      title: 'Environment',
      titleAr: 'البيئة والمحميات',
      count: '310 datasets →',
      icon: Trees,
      color: '#1E9E6A',
      img: '/images/abudhabi_satellite_mangroves.jpg',
    },
    {
      title: 'Utilities',
      titleAr: 'المرافق والبنية',
      count: '180 datasets →',
      icon: Zap,
      color: '#1F5FAD',
      img: '/images/khalifa_city_cadastre.jpg',
    },
    {
      title: 'Imagery',
      titleAr: 'الصور الفضائية',
      count: '260 datasets →',
      icon: Camera,
      color: '#E07B24',
      img: '/images/abudhabi_satellite_mangroves.jpg',
    },
    {
      title: 'Population',
      titleAr: 'السكان والإحصاء',
      count: '210 datasets →',
      icon: Users,
      color: '#E5A817',
      img: '/images/abudhabi_skyline_dusk.jpg',
    },
  ];

  const platformServices = [
    {
      id: 'clearinghouse',
      title: 'Clearinghouse & Catalogue',
      desc: 'Search and access authoritative government geospatial data.',
      icon: Compass,
      color: '#1F5FAD',
      target: 'S02_CatalogueSearch' as ScreenId,
    },
    {
      id: 'geoai',
      title: 'GeoAI Studio',
      desc: 'Analyse, extract insights and build AI powered geospatial solutions.',
      icon: Sparkles,
      color: '#7B4FD6',
      target: 'S06_GeoAiChangeDetection' as ScreenId,
    },
    {
      id: 'marketplace',
      title: 'Data Marketplace',
      desc: 'Discover and request commercial, open and cross-entity geospatial products.',
      icon: ShoppingBag,
      color: '#0E9F8E',
      target: 'S08_MarketplaceCatalogue' as ScreenId,
    },
    {
      id: 'capacity',
      title: 'Capacity Building',
      desc: 'Build capabilities through training and maturity assessments.',
      icon: GraduationCap,
      color: '#E07B24',
      target: 'S12_GeoMaturityTraining' as ScreenId,
    },
    {
      id: 'digital-twin',
      title: 'Digital Twin 3D',
      desc: 'Explore a 3D model of Abu Dhabi with real-time data.',
      icon: Layers,
      color: '#2BA6DE',
      target: 'S10_DigitalTwin3d' as ScreenId,
    },
    {
      id: 'open-data',
      title: 'Open Data Portal',
      desc: 'Access free-to-use geospatial data for civic innovation.',
      icon: Eye,
      color: '#5DAA3A',
      target: 'S13_OpenDataPortal' as ScreenId,
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('S02_CatalogueSearch');
  };

  return (
    <div
      className={`w-full min-h-screen bg-[#F8FAFC] flex flex-col justify-between select-none ${
        isArabic ? 'font-arabic' : 'font-sans'
      }`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* 1. Unified Enterprise Top Header (72 px) */}
      <HeaderWorkspace currentScreen="S01_Home" onNavigate={onNavigate} isArabic={isArabic} />


      {/* 2. Hero Section (Panoramic Aerial Photo + Search Bar + Filters) */}
      <div className="relative h-[410px] w-full bg-[#0A1D36] text-white flex flex-col justify-center px-12 overflow-hidden flex-shrink-0">
        {/* Full Aerial Photo Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/abudhabi_skyline_dusk.jpg"
            alt="Abu Dhabi Skyline"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient vignette to keep text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071A31]/95 via-[#0A2244]/75 to-[#071A31]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D36]/80 via-transparent to-black/20" />
        </div>

        {/* Floating Weather Widget Top-Right */}
        <div className="absolute top-5 right-12 z-10 flex items-center gap-2 bg-[#0B2545]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-[12px] font-medium text-white shadow-sm">
          <Sun className="w-4 h-4 text-[#E5A817]" />
          <span>Abu Dhabi 32°C</span>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1240px] w-full mx-auto space-y-4">
          {/* Tagline */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-[2.5px] bg-[#E5A817]" />
            <span className="text-[11px] font-bold tracking-widest text-white/90 uppercase">
              ABU DHABI SPATIAL DATA INFRASTRUCTURE
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[40px] font-extrabold leading-[1.15] tracking-tight text-white max-w-[850px]">
            {isArabic ? (
              <>
                بيانات مكانية معتمدة
                <br />
                من أجل <span className="text-[#E5A817]">أبوظبي أكثر ذكاءً</span>
              </>
            ) : (
              <>
                Authoritative geospatial data
                <br />
                for a <span className="text-[#E5A817]">smarter Abu Dhabi</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-[14px] text-white/90 max-w-[700px] leading-relaxed">
            {isArabic
              ? 'اكتشف وشارك واستخدم البيانات والخدمات والتطبيقات الجغرافية الموثوقة عبر الجهات الحكومية والشركاء والمجتمع.'
              : 'Discover, access and share trusted geospatial data, services and applications across government, partners and the community.'}
          </p>

          {/* Floating Search Bar (Card with scope dropdown) */}
          <form
            onSubmit={handleSearchSubmit}
            className="w-[740px] h-[52px] bg-white rounded-xl shadow-2xl p-1.5 flex items-center gap-2 text-primaryText"
          >
            <Search className="w-4 h-4 text-steel-400 ml-2.5 flex-shrink-0" />
            <input
              type="text"
              placeholder={
                isArabic
                  ? 'ابحث في مجموعات البيانات والخرائط والخدمات والنماذج المكانية...'
                  : 'Search datasets, maps, services, applications, AI models...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-[13px] text-primaryText placeholder:text-secondaryText focus:outline-none"
            />

            {/* Scope dropdown */}
            <div className="flex items-center px-3 border-l border-border text-[12px] font-medium text-secondaryText cursor-pointer">
              <span>{searchScope}</span>
              <ChevronDown className="w-3.5 h-3.5 ml-1 text-steel-400" />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="h-[40px] px-6 bg-[#1865C9] hover:bg-[#1453A3] text-white rounded-lg text-[13px] font-bold flex items-center gap-2 shadow-sm transition-all"
            >
              <span>{isArabic ? 'بحث' : 'Search'}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
            </button>
          </form>

          {/* Quick Filter Buttons below Search Bar */}
          <div className="flex items-center justify-between pt-1 max-w-[1240px]">
            <div className="flex items-center gap-2">
              {['Datasets', 'Maps', 'Services (APIs)', 'Applications', 'AI Models'].map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      onNavigate('S02_CatalogueSearch');
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-[12px] font-medium transition-all backdrop-blur-md flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#1865C9] text-white font-bold shadow-sm'
                        : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
                    }`}
                  >
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>

            {/* Carousel indicator */}
            <div className="flex items-center gap-3 text-[11px] text-white/80">
              <div className="flex items-center gap-1">
                <button className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono px-1">01 / 03</span>
                <button className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[11px] font-medium text-white/70 italic">
                A resilient, connected and sustainable Abu Dhabi
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Overlapping 4-Metric Stats Strip */}
      <div className="relative z-20 max-w-[1240px] w-full mx-auto -mt-[36px] px-2 flex-shrink-0">
        <div className="h-[84px] bg-white rounded-xl shadow-level-2 border border-border px-8 flex items-center justify-between">
          {/* Stat 1 */}
          <div className="flex items-center gap-4 flex-1">
            <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center text-[#1F5FAD] border border-blue-100">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[24px] font-bold text-navy-900 font-mono tabular-nums leading-none">
                2,480
              </div>
              <div className="text-[12px] text-secondaryText font-medium mt-0.5">
                Authoritative Datasets
              </div>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-border mx-3" />

          {/* Stat 2 */}
          <div className="flex items-center gap-4 flex-1">
            <div className="w-11 h-11 rounded-lg bg-purple-50 flex items-center justify-center text-[#7B4FD6] border border-purple-100">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[24px] font-bold text-navy-900 font-mono tabular-nums leading-none">
                64
              </div>
              <div className="text-[12px] text-secondaryText font-medium mt-0.5">
                Contributing Entities
              </div>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-border mx-3" />

          {/* Stat 3 */}
          <div className="flex items-center gap-4 flex-1">
            <div className="w-11 h-11 rounded-lg bg-teal-50 flex items-center justify-center text-[#0E9F8E] border border-teal-100">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[24px] font-bold text-navy-900 font-mono tabular-nums leading-none">
                1,150
              </div>
              <div className="text-[12px] text-secondaryText font-medium mt-0.5">
                OGC Web Services
              </div>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-border mx-3" />

          {/* Stat 4 */}
          <div className="flex items-center gap-4 flex-1">
            <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center text-[#1865C9] border border-blue-100">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[24px] font-bold text-navy-900 font-mono tabular-nums leading-none">
                  99.9%
                </span>
                <Info className="w-3.5 h-3.5 text-steel-400" />
              </div>
              <div className="text-[12px] text-secondaryText font-medium mt-0.5">
                Platform Availability
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Section: Explore by Theme (8 cards with photos) */}
      <div className="max-w-[1240px] w-full mx-auto px-2 pt-6 space-y-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[18px] font-bold text-navy-900 tracking-tight">
              {isArabic ? 'استكشف حسب المجال' : 'Explore by theme'}
            </h2>
            <p className="text-[12px] text-secondaryText">
              {isArabic
                ? 'اكتشف البيانات والخدمات المكانية عبر المجالات الاستراتيجية الرئيسية'
                : 'Discover geospatial data and services across key domains'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('S02_CatalogueSearch')}
            className="text-[12px] font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>View all themes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 8 Thematic Cards Grid */}
        <div className="grid grid-cols-8 gap-3">
          {themes.map((th, idx) => {
            const Icon = th.icon;
            return (
              <div
                key={idx}
                onClick={() => onNavigate('S02_CatalogueSearch')}
                className="bg-white rounded-xl border border-border shadow-level-1 overflow-hidden cursor-pointer hover:shadow-level-2 hover:-translate-y-0.5 transition-all flex flex-col justify-between group"
              >
                {/* Photo Thumbnail */}
                <div className="h-[64px] w-full relative overflow-hidden bg-navy-900">
                  <img
                    src={th.img}
                    alt={th.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                </div>

                {/* Circular Overlapping Icon */}
                <div className="px-3 pt-2 pb-2.5 space-y-1 relative">
                  <div
                    className="-mt-6 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white shadow-sm"
                    style={{ backgroundColor: th.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="font-bold text-[12px] text-navy-900 leading-tight pt-1 truncate">
                    {isArabic ? th.titleAr : th.title}
                  </div>
                  <div className="text-[10px] text-secondaryText font-medium">
                    {th.count}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Section: Platform Services (6 horizontal cards in a row) */}
      <div className="max-w-[1240px] w-full mx-auto px-2 pt-5 space-y-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[18px] font-bold text-navy-900 tracking-tight">
              {isArabic ? 'خدمات المنصة ومسارات العمل' : 'Platform Services'}
            </h2>
            <p className="text-[12px] text-secondaryText">
              {isArabic
                ? 'ست قدرات جغرافية متكاملة للحكومة والشركاء والمجتمع'
                : 'Six connected capabilities for government, partners and the community'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('S11_ProgrammeCommandCentre')}
            className="text-[12px] font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>View implementation roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Cards */}
        <div className="grid grid-cols-6 gap-3">
          {platformServices.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                onClick={() => onNavigate(svc.target)}
                className="bg-white rounded-xl border border-border p-3.5 flex flex-col justify-between shadow-level-1 hover:shadow-level-2 hover:-translate-y-0.5 transition-all cursor-pointer h-[126px]"
              >
                <div className="space-y-1.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${svc.color}15`, color: svc.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-[13px] text-navy-900 leading-snug line-clamp-1">
                    {svc.title}
                  </div>
                  <p className="text-[11px] text-secondaryText line-clamp-2 leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-blue-600">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Section: Latest Updates & Explore 3D Card */}
      <div className="max-w-[1240px] w-full mx-auto px-2 pt-5 pb-6 grid grid-cols-12 gap-4 flex-shrink-0">
        {/* Left: Latest Updates (8 cols) */}
        <div className="col-span-8 space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-navy-900 tracking-tight">
              Latest updates
            </h2>
            <button className="text-[12px] font-bold text-blue-600 hover:underline flex items-center gap-1">
              <span>View all updates</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Update 1 */}
            <div
              onClick={() => onNavigate('S02_CatalogueSearch')}
              className="bg-white rounded-xl border border-border overflow-hidden p-2.5 flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-navy-900 flex-shrink-0">
                <img src="/images/abudhabi_satellite_mangroves.jpg" alt="Update" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-0.5 truncate">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-bold px-1 rounded bg-blue-100 text-blue-700">DATASET</span>
                  <span className="text-[10px] text-steel-400 font-mono">12 Oct 2026</span>
                </div>
                <div className="font-bold text-[12px] text-navy-900 truncate">New Coastal Habitat Layer</div>
                <div className="text-[10px] text-secondaryText truncate">High-resolution coastal habitat data.</div>
              </div>
            </div>

            {/* Update 2 */}
            <div
              onClick={() => onNavigate('S06_GeoAiChangeDetection')}
              className="bg-white rounded-xl border border-border overflow-hidden p-2.5 flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-navy-900 flex-shrink-0">
                <img src="/images/abudhabi_skyline_dusk.jpg" alt="Update" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-0.5 truncate">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-bold px-1 rounded bg-purple-100 text-purple-700">ANNOUNCEMENT</span>
                  <span className="text-[10px] text-steel-400 font-mono">08 Oct 2026</span>
                </div>
                <div className="font-bold text-[12px] text-navy-900 truncate">GeoAI Studio v3.2</div>
                <div className="text-[10px] text-secondaryText truncate">New change detection models.</div>
              </div>
            </div>

            {/* Update 3 */}
            <div
              onClick={() => onNavigate('S13_OpenDataPortal')}
              className="bg-white rounded-xl border border-border overflow-hidden p-2.5 flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-navy-900 flex-shrink-0">
                <img src="/images/khalifa_city_cadastre.jpg" alt="Update" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-0.5 truncate">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-bold px-1 rounded bg-amber-100 text-amber-800">EVENT</span>
                  <span className="text-[10px] text-steel-400 font-mono">05 Oct 2026</span>
                </div>
                <div className="font-bold text-[12px] text-navy-900 truncate">AD-SDI Developer Forum</div>
                <div className="text-[10px] text-secondaryText truncate">Annual developer forum on 24 Oct.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Explore Abu Dhabi in 3D Card (4 cols) */}
        <div className="col-span-4 bg-[#0A1628] rounded-xl border border-white/10 p-4 text-white flex items-center justify-between relative overflow-hidden shadow-level-1">
          <div className="space-y-1.5 z-10 max-w-[200px]">
            <h3 className="text-[15px] font-bold leading-tight">Explore Abu Dhabi in 3D</h3>
            <p className="text-[11px] text-steel-300 leading-snug">
              Experience the city with a digital twin — buildings, infrastructure, environment and more.
            </p>
            <button
              onClick={() => onNavigate('S10_DigitalTwin3d')}
              className="mt-1 px-3 py-1.5 bg-white text-navy-900 hover:bg-slate-100 rounded-lg text-[11px] font-bold shadow-sm transition-all"
            >
              Open Digital Twin →
            </button>
          </div>

          {/* Satellite island circular globe cutout */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 shadow-lg flex-shrink-0">
            <img src="/images/abudhabi_satellite_mangroves.jpg" alt="3D Twin" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};
