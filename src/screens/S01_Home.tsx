import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';
import { HeaderWorkspace } from '../components/common/HeaderWorkspace';
import { DgeLogo, PortalWordmark } from '../components/common/DgeLogo';
import { InteractiveMap } from '../components/common/InteractiveMap';
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
  Map as MapIcon,
  CheckCircle2,
} from 'lucide-react';

interface S01HomeProps {
  onNavigate: (screen: ScreenId) => void;
  isArabic?: boolean;
}

export const S01_Home: React.FC<S01HomeProps> = ({ onNavigate, isArabic = false }) => {
  const [searchScope, setSearchScope] = useState('All');
  const [scopeDropdownOpen, setScopeDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Datasets');
  const [heroMapMode, setHeroMapMode] = useState<'photo' | 'satellite'>('photo');
  const [carouselSlide, setCarouselSlide] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const slides = [
    {
      titleEn: 'Authoritative geospatial data for a smarter Abu Dhabi',
      titleAr: 'بيانات مكانية معتمدة من أجل أبوظبي أكثر ذكاءً',
      subEn: 'Discover, access and share trusted geospatial data, services and applications across government, partners and the community.',
      subAr: 'اكتشف وشارك واستخدم البيانات والخدمات والتطبيقات الجغرافية الموثوقة عبر الجهات الحكومية والشركاء والمجتمع.',
      tag: 'A resilient, connected and sustainable Abu Dhabi',
      bgImg: '/images/abudhabi_skyline_dusk.jpg',
      themeBadge: 'AD-SDI CORE PLATFORM',
    },
    {
      titleEn: 'Sovereign 3D Digital Twin & Real-Time Urban Analytics',
      titleAr: 'التوأم الرقمي ثلاثي الأبعاد والتحليلات الحضرية المباشرة',
      subEn: 'High-precision LOD2 building meshes, BIM integrations and underground utility networks across the Emirate.',
      subAr: 'مجسمات مبان ثلاثية الأبعاد بدقة LOD2 وتكامل BIM وشبكات المرافق التحتية عبر كافة أرجاء الإمارة.',
      tag: 'Next-generation Spatial Infrastructure 2026–2029',
      bgImg: '/images/theme_buildings.jpg',
      themeBadge: '3D DIGITAL TWIN · LOD2',
    },
    {
      titleEn: 'AI Change Detection & Land Governance across 24,000 km²',
      titleAr: 'رصد المتغيرات بالذكاء الاصطناعي وحوكمة الأراضي عبر 24,000 كم²',
      subEn: 'Automated satellite and aerial AI feature extraction detecting permits, coastlines and vegetation dynamics.',
      subAr: 'استخراج تلقائي للمعالم بالذكاء الاصطناعي من الصور الفضائية لرصد تصاريح البناء وخطوط الساحل والغطاء النباتي.',
      tag: 'AI-Powered Environmental & Urban Intelligence',
      bgImg: '/images/hero_ai_change.jpg',
      themeBadge: 'GEOAI STUDIO · SATELLITE VISION',
    },
  ];

  // Auto-play carousel slides every 5.5 seconds (pauses on hover or live satellite mode)
  useEffect(() => {
    if (isCarouselPaused || heroMapMode === 'satellite') return;
    const interval = setInterval(() => {
      setCarouselSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isCarouselPaused, heroMapMode, slides.length]);

  const categories = [
    {
      id: 'Datasets',
      labelEn: 'Datasets',
      labelAr: 'مجموعات البيانات',
      count: '2,480',
      scope: 'Datasets',
      placeholderEn: 'Search 2,480+ datasets, cadastre, boundaries, transport...',
      placeholderAr: 'ابحث في أكثر من 2,480 مجموعة بيانات ومخططات وحدود...',
      targetScreen: 'S02_CatalogueSearch' as ScreenId,
    },
    {
      id: 'Maps',
      labelEn: 'Maps',
      labelAr: 'الخرائط',
      count: '420',
      scope: 'Maps',
      placeholderEn: 'Search interactive web maps, basemaps & GIS spatial layers...',
      placeholderAr: 'ابحث في الخرائط التفاعلية، خرائط الأساس والطبقات الجغرافية...',
      targetScreen: 'S02_CatalogueSearch' as ScreenId,
    },
    {
      id: 'Services (APIs)',
      labelEn: 'Services (APIs)',
      labelAr: 'الخدمات البرمجية',
      count: '1,150',
      scope: 'Services',
      placeholderEn: 'Search OGC WMS/WFS services, REST feature APIs & endpoints...',
      placeholderAr: 'ابحث في خدمات OGC وواجهات برمجة التطبيقات المكانية...',
      targetScreen: 'S02_CatalogueSearch' as ScreenId,
    },
    {
      id: 'Applications',
      labelEn: 'Applications',
      labelAr: 'التطبيقات المكانية',
      count: '85',
      scope: 'Applications',
      placeholderEn: 'Search 3D digital twins, viewer dashboards & spatial apps...',
      placeholderAr: 'ابحث في التوأم الرقمي، لوحات المتابعة والتطبيقات المكانية...',
      targetScreen: 'S10_DigitalTwin3d' as ScreenId,
    },
    {
      id: 'AI Models',
      labelEn: 'AI Models',
      labelAr: 'نماذج الذكاء الاصطناعي',
      count: '16',
      scope: 'AI Models',
      placeholderEn: 'Search GeoAI satellite change detection & computer vision models...',
      placeholderAr: 'ابحث في نماذج الذكاء الجيومكاني وكشف التغيرات بالرؤية الحاسوبية...',
      targetScreen: 'S06_GeoAiChangeDetection' as ScreenId,
    },
  ];

  const activeCategoryObj = categories.find((c) => c.id === selectedCategory) || categories[0];
  const activePlaceholder = isArabic ? activeCategoryObj.placeholderAr : activeCategoryObj.placeholderEn;

  const themes = [
    {
      title: 'Boundaries',
      titleAr: 'الحدود الإدارية',
      count: '320 datasets →',
      icon: MapPin,
      color: '#1F5FAD',
      img: '/images/theme_boundaries.jpg',
    },
    {
      title: 'Transport',
      titleAr: 'النقل والطرق',
      count: '420 datasets →',
      icon: Car,
      color: '#0B2545',
      img: '/images/theme_transport.jpg',
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
      img: '/images/theme_buildings.jpg',
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
      color: '#D97706',
      img: '/images/theme_utilities.jpg',
    },
    {
      title: 'Imagery',
      titleAr: 'الصور الفضائية',
      count: '260 datasets →',
      icon: Camera,
      color: '#E07B24',
      img: '/images/theme_imagery.jpg',
    },
    {
      title: 'Population',
      titleAr: 'السكان والإحصاء',
      count: '210 datasets →',
      icon: Users,
      color: '#8B5CF6',
      img: '/images/theme_population.jpg',
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
    const activeCat = categories.find((c) => c.id === selectedCategory) || categories[0];
    showToast(
      isArabic
        ? `جاري البحث في: ${activeCat.labelAr} ${searchQuery ? `عن "${searchQuery}"` : ''}`
        : `Searching ${activeCat.labelEn} ${searchQuery ? `for "${searchQuery}"` : ''}`
    );
    onNavigate(activeCat.targetScreen);
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


      {/* 2. Hero Section (Dynamic Per-Slide Aerial / 3D / AI Backgrounds + Live GIS Satellite Map + Search Bar + Filters) */}
      <div
        onMouseEnter={() => setIsCarouselPaused(true)}
        onMouseLeave={() => setIsCarouselPaused(false)}
        className="relative h-[430px] w-full bg-[#0A1D36] text-white flex flex-col justify-center px-12 overflow-hidden flex-shrink-0"
      >
        {/* Background: Live GIS Satellite Map or Dynamic Carousel Backgrounds */}
        <div className="absolute inset-0 z-0">
          {heroMapMode === 'satellite' ? (
            <div className="w-full h-full relative">
              <InteractiveMap mode="catalogue" isDarkTheme={true} height="100%" />
              <div className="absolute inset-0 bg-[#071A31]/40 pointer-events-none" />
            </div>
          ) : (
            <div className="w-full h-full relative overflow-hidden">
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    carouselSlide === idx ? 'opacity-100 z-1' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={slide.bgImg}
                    alt={slide.titleEn}
                    className={`w-full h-full object-cover object-center transition-transform duration-[7000ms] ease-out ${
                      carouselSlide === idx ? 'scale-105' : 'scale-100'
                    }`}
                  />
                  {/* Subtle gradient vignette to keep text readable */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#071A31]/95 via-[#0A2244]/80 to-[#071A31]/65" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D36]/90 via-transparent to-black/30" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top-Right Control Bar (Weather + Live Satellite Map Toggle) */}
        <div className="absolute top-5 right-12 z-20 flex items-center gap-2">
          {/* Mode Switcher */}
          <button
            onClick={() => {
              const newMode = heroMapMode === 'photo' ? 'satellite' : 'photo';
              setHeroMapMode(newMode);
              showToast(newMode === 'satellite' ? 'Mounted Live GIS Satellite Map' : 'Switched to Scenic Backgrounds');
            }}
            className="flex items-center gap-1.5 bg-[#0B2545]/90 hover:bg-[#0B2545] backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-[12px] font-semibold text-white shadow-md transition-all cursor-pointer"
          >
            <MapIcon className="w-3.5 h-3.5 text-[#E5A817]" />
            <span>{heroMapMode === 'satellite' ? '📷 Scenic Photo' : '🛰️ Live GIS Satellite Map'}</span>
          </button>

          {/* Floating Weather Widget */}
          <div className="flex items-center gap-2 bg-[#0B2545]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-[12px] font-medium text-white shadow-sm">
            <Sun className="w-4 h-4 text-[#E5A817]" />
            <span>Abu Dhabi 32°C</span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1240px] w-full mx-auto space-y-4">
          {/* Tagline & Slide Theme Badge */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-[2.5px] bg-[#E5A817]" />
            <span className="text-[11px] font-bold tracking-widest text-white/90 uppercase">
              ABU DHABI SPATIAL DATA INFRASTRUCTURE
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E5A817]/20 text-[#E5A817] border border-[#E5A817]/40 font-bold ml-2">
              {slides[carouselSlide].themeBadge}
            </span>
          </div>

          {/* Headline (Dynamic from Carousel with gold accents for all 3 slides) */}
          <h1 className="text-[36px] lg:text-[40px] font-extrabold leading-[1.15] tracking-tight text-white max-w-[850px] transition-all">
            {isArabic ? (
              slides[carouselSlide].titleAr
            ) : carouselSlide === 0 ? (
              <>
                Authoritative geospatial data
                <br />
                for a <span className="text-[#E5A817]">smarter Abu Dhabi</span>
              </>
            ) : carouselSlide === 1 ? (
              <>
                Sovereign 3D Digital Twin
                <br />
                & Real-Time <span className="text-[#E5A817]">Urban Analytics</span>
              </>
            ) : (
              <>
                AI Satellite Change Detection
                <br />
                & Land Governance across <span className="text-[#E5A817]">24,000 km²</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-[14px] text-white/90 max-w-[700px] leading-relaxed">
            {isArabic ? slides[carouselSlide].subAr : slides[carouselSlide].subEn}
          </p>

          {/* Floating Search Bar (Card with scope dropdown & dynamic placeholder) */}
          <form
            onSubmit={handleSearchSubmit}
            className="w-[740px] h-[52px] bg-white rounded-xl shadow-2xl p-1.5 flex items-center gap-2 text-primaryText relative z-30"
          >
            <Search className="w-4 h-4 text-steel-400 ml-2.5 flex-shrink-0" />
            <input
              type="text"
              placeholder={activePlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-[13px] text-primaryText placeholder:text-secondaryText focus:outline-none"
            />

            {/* Scope dropdown with clickable popup */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setScopeDropdownOpen(!scopeDropdownOpen)}
                className="flex items-center px-3 border-l border-border text-[12px] font-medium text-secondaryText hover:text-navy-900 transition-colors"
              >
                <span>{searchScope}</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-steel-400" />
              </button>

              {scopeDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-level-3 border border-border py-1.5 z-50 text-[12px]">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setSearchScope(cat.scope);
                        setScopeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 hover:bg-slate-100 flex items-center justify-between ${
                        selectedCategory === cat.id ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-primaryText'
                      }`}
                    >
                      <span>{isArabic ? cat.labelAr : cat.labelEn}</span>
                      {selectedCategory === cat.id && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="h-[40px] px-6 bg-[#1865C9] hover:bg-[#1453A3] text-white rounded-lg text-[13px] font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>{isArabic ? 'بحث' : 'Search'}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
            </button>
          </form>

          {/* Quick Filter Buttons below Search Bar */}
          <div className="flex items-center justify-between pt-1 max-w-[1240px]">
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      if (selectedCategory === cat.id) {
                        // Clicking already active tab browses directly into that catalogue
                        showToast(isArabic ? `تصفح ${cat.labelAr}...` : `Browsing ${cat.labelEn}...`);
                        onNavigate(cat.targetScreen);
                      } else {
                        setSelectedCategory(cat.id);
                        setSearchScope(cat.scope);
                        showToast(isArabic ? `تم تحديد فئة: ${cat.labelAr}` : `Filter: ${cat.labelEn} (${cat.count} items)`);
                      }
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-[12px] font-medium transition-all backdrop-blur-md flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-[#1865C9] text-white font-bold shadow-md ring-2 ring-white/30'
                        : 'bg-white/15 hover:bg-white/25 text-white/90 border border-white/20'
                    }`}
                    title={isArabic ? `تصفية حسب ${cat.labelAr} (انقر مرة ثانية للتصفح المباشر)` : `Filter by ${cat.labelEn} (click again to browse directly)`}
                  >
                    <span>{isArabic ? cat.labelAr : cat.labelEn}</span>
                    <span
                      className={`text-[10px] font-mono px-1 rounded ${
                        isActive ? 'bg-white/20 text-white font-bold' : 'bg-black/25 text-white/70'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Carousel indicator with working left/right buttons & clickable dots */}
            <div className="flex items-center gap-3 text-[11px] text-white/80">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCarouselSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                  title="Previous Slide"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center gap-1 px-1">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCarouselSlide(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        carouselSlide === idx ? 'w-5 bg-[#E5A817]' : 'w-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                      title={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <span className="font-mono text-[11px] px-1 font-semibold text-[#E5A817]">
                  0{carouselSlide + 1} / 0{slides.length}
                </span>
                <button
                  type="button"
                  onClick={() => setCarouselSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                  title="Next Slide"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="hidden sm:inline text-[11px] font-medium text-white/70 italic border-l border-white/20 pl-2.5">
                {slides[carouselSlide].tag}
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
                onClick={() => {
                  showToast(`Selected Theme: ${th.title}`);
                  onNavigate('S02_CatalogueSearch');
                }}
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
            <button
              onClick={() => {
                showToast('Browsing all 148 latest updates across sectors');
                onNavigate('S02_CatalogueSearch');
              }}
              className="text-[12px] font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
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

        {/* Right: Explore Abu Dhabi in 3D Card (4 cols) with Real GIS Mini-Map */}
        <div className="col-span-4 bg-[#0A1628] rounded-xl border border-white/10 p-4 text-white flex items-center justify-between relative overflow-hidden shadow-level-1">
          <div className="space-y-1.5 z-10 max-w-[200px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">LOD2 Digital Twin</span>
            </div>
            <h3 className="text-[15px] font-bold leading-tight">Explore Abu Dhabi in 3D</h3>
            <p className="text-[11px] text-steel-300 leading-snug">
              Experience the city with a digital twin — buildings, cadastre, environment and real-time sensors.
            </p>
            <button
              onClick={() => onNavigate('S10_DigitalTwin3d')}
              className="mt-1 px-3 py-1.5 bg-white text-navy-900 hover:bg-slate-100 rounded-lg text-[11px] font-bold shadow-sm transition-all"
            >
              Open Digital Twin →
            </button>
          </div>

          {/* Real Interactive Mini GIS Map instead of static image */}
          <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg flex-shrink-0 relative group">
            <InteractiveMap mode="parcels" isDarkTheme={true} height="100%" />
            <div className="absolute top-1 right-1 bg-[#0A1628]/80 backdrop-blur-xs text-[8px] font-mono px-1.5 py-0.5 rounded text-gold-500 border border-white/10 z-10 pointer-events-none">
              LIVE GIS
            </div>
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0B2545] text-white px-4 py-2.5 rounded-full shadow-2xl border border-gold-500/50 flex items-center gap-2 text-[12px] font-medium animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
