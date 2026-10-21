import React, { useState, useEffect, useRef } from 'react';
import { DgeLogo } from './DgeLogo';
import { ScreenId, UserPersona } from '../../types';
import {
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  User,
  Shield,
  LogOut,
  Home,
  Database,
  FileText,
  CheckCircle2,
  BarChart3,
  Map as MapIcon,
  Building2,
  Compass,
  ShoppingBag,
  FileCheck,
  KeyRound,
  Briefcase,
  Sparkles,
  Bot,
  GraduationCap,
  Menu,
  X,
} from 'lucide-react';
import { PERSONAS } from '../../constants/tokens';

interface HeaderWorkspaceProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  persona?: UserPersona;
  isDarkTheme?: boolean;
  isArabic?: boolean;
}

type DropdownKey = 'catalogue' | 'maps' | 'marketplace' | 'developers' | null;

export const HeaderWorkspace: React.FC<HeaderWorkspaceProps> = ({
  currentScreen,
  onNavigate,
  persona = PERSONAS.ahmed,
  isDarkTheme = false,
  isArabic = false,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchHovered, setSearchHovered] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const isSearchExpanded = searchHovered || searchFocused || searchVal.length > 0;

  // Global shortcut (⌘K or Ctrl+K) & click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setProfileOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setProfileOpen(false);
        setMobileMenuOpen(false);
        setSearchFocused(false);
        setSearchHovered(false);
        searchInputRef.current?.blur();
      } else if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchFocused(true);
        setSearchHovered(true);
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isHomeActive = ['S01_Home', 'S01_Home_AR'].includes(currentScreen);
  const isCatalogueActive = ['S02_CatalogueSearch', 'S03_DatasetDetail', 'S04_PublishingApprovals', 'S05_QualitySlaDashboard'].includes(currentScreen);
  const isMapsActive = ['S10_DigitalTwin3d', 'S11_ProgrammeCommandCentre'].includes(currentScreen);
  const isMarketplaceActive = ['S08_MarketplaceCatalogue', 'S09a_MarketplaceRequest', 'S09b_MyEntitlements', 'S09c_ProviderWorkspace'].includes(currentScreen);
  const isOpenDataActive = ['S13_OpenDataPortal', 'S13_OpenDataPortal_AR'].includes(currentScreen);
  const isDevelopersActive = ['S06_GeoAiChangeDetection', 'S07_GeoAiAssistant', 'S12_GeoMaturityTraining', 'S14_SecurityAccessConsole'].includes(currentScreen);

  const headerBg = isDarkTheme ? 'bg-[#0B2545] border-navy-700 text-white' : 'bg-white border-[#E2E8F0] text-[#0F172A] shadow-xs';
  const navLinkColor = isDarkTheme
    ? 'text-white/80 hover:text-white hover:bg-white/10'
    : 'text-[#334155] hover:text-[#1865C9] hover:bg-[#F1F5F9]';
  const activeNavLinkColor = isDarkTheme
    ? 'text-[#E5A817] font-bold bg-white/10 border-b-2 border-[#E5A817]'
    : 'text-[#1865C9] font-bold bg-blue-50/70 border-b-2 border-[#1865C9]';
  const searchBg = isDarkTheme
    ? 'bg-[#13315C] border-steel-400/20 text-white placeholder:text-steel-400'
    : 'bg-[#F1F5F9] border-[#CBD5E1] text-[#0F172A] placeholder:text-[#64748B] focus:bg-white';
  const iconColor = isDarkTheme
    ? 'text-steel-400 hover:text-white hover:bg-navy-800'
    : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]';

  // Menu Items for Data & Catalogue Dropdown
  const catalogueMenuItems = [
    {
      id: 'S02_CatalogueSearch',
      screenId: 'S02_CatalogueSearch' as ScreenId,
      title: 'Dataset Catalogue',
      titleAr: 'مستودع البيانات الجيومكانية',
      desc: 'Search, filter and inspect 1,400+ authoritative geospatial layers',
      descAr: 'استكشاف والبحث في أكثر من 1400 طبقة مكانية معتمدة',
      icon: <Database className="w-4 h-4" />,
      badge: '1,400+ Layers',
      badgeColor: isDarkTheme ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-50 text-blue-700',
    },
    {
      id: 'S03_DatasetDetail',
      screenId: 'S03_DatasetDetail' as ScreenId,
      title: 'Dataset Detail & Cadastre',
      titleAr: 'تفاصيل الطبقة والسجل العقاري',
      desc: 'Technical schema, attribute dictionary, lineage & coordinate system',
      descAr: 'المخطط الفني، قاموس السمات، وسلسلة النسب وتراخيص الاستخدام',
      icon: <FileText className="w-4 h-4" />,
      badge: null,
    },
    {
      id: 'S04_PublishingApprovals',
      screenId: 'S04_PublishingApprovals' as ScreenId,
      title: 'Publishing & Approvals',
      titleAr: 'النشر والاعتمادات الحكومية',
      desc: 'Custodian workflow, QA validation gates & release sign-offs',
      descAr: 'إجراءات مدراء البيانات، بوابات فحص الجودة والاعتماد',
      icon: <CheckCircle2 className="w-4 h-4" />,
      badge: 'Workflow',
      badgeColor: isDarkTheme ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-50 text-amber-700',
    },
    {
      id: 'S05_QualitySlaDashboard',
      screenId: 'S05_QualitySlaDashboard' as ScreenId,
      title: 'Quality & SLA Dashboard',
      titleAr: 'لوحة الجودة ومستوى الخدمة',
      desc: 'Topology health, metadata freshness, entity SLA metrics',
      descAr: 'متابعة صحة البيانات الطوبولوجية وحداثة البيانات والالتزام',
      icon: <BarChart3 className="w-4 h-4" />,
      badge: '99.4% SLA',
      badgeColor: isDarkTheme ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-50 text-emerald-700',
    },
  ];

  // Menu Items for Maps & Services Dropdown
  const mapsMenuItems = [
    {
      id: 'S02_CatalogueSearch',
      screenId: 'S02_CatalogueSearch' as ScreenId,
      title: 'Interactive Map Explorer',
      titleAr: 'مستكشف الخرائط التفاعلي',
      desc: 'Multi-layer GIS map viewer, spatial measurement & query tools',
      descAr: 'عارض الخرائط الشامل مع أدوات القياس والاستعلام المكاني',
      icon: <MapIcon className="w-4 h-4" />,
      badge: 'GIS Viewer',
      badgeColor: isDarkTheme ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-50 text-blue-700',
    },
    {
      id: 'S10_DigitalTwin3d',
      screenId: 'S10_DigitalTwin3d' as ScreenId,
      title: '3D Digital Twin City Model',
      titleAr: 'التوأم الرقمي ثلاثي الأبعاد',
      desc: 'Abu Dhabi 3D city mesh, BIM infrastructure & solar simulation',
      descAr: 'نماذج ثلاثية الأبعاد لمدينة أبوظبي ومحاكاة البنية التحتية',
      icon: <Building2 className="w-4 h-4" />,
      badge: '3D Mesh',
      badgeColor: isDarkTheme ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-50 text-purple-700',
    },
    {
      id: 'S11_ProgrammeCommandCentre',
      screenId: 'S11_ProgrammeCommandCentre' as ScreenId,
      title: 'Programme Command Centre 2029',
      titleAr: 'مركز قيادة البرنامج 2029',
      desc: 'Executive spatial monitoring, entity integration & strategic KPIs',
      descAr: 'متابعة تنفيذ الاستراتيجية الجيومكانية ومؤشرات الأداء الوطنية',
      icon: <Compass className="w-4 h-4" />,
      badge: 'Executive',
      badgeColor: isDarkTheme ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-700',
    },
  ];

  // Menu Items for Marketplace Dropdown
  const marketplaceMenuItems = [
    {
      id: 'S08_MarketplaceCatalogue',
      screenId: 'S08_MarketplaceCatalogue' as ScreenId,
      title: 'Marketplace Catalogue',
      titleAr: 'سوق البيانات الجغرافية',
      desc: 'Discover commercial & inter-entity geospatial data feeds',
      descAr: 'استكشاف حزم البيانات عالية القيمة والصور الجوية والاشتراكات',
      icon: <ShoppingBag className="w-4 h-4" />,
      badge: 'Catalogue',
      badgeColor: isDarkTheme ? 'bg-teal-500/20 text-teal-300' : 'bg-teal-50 text-teal-700',
    },
    {
      id: 'S09a_MarketplaceRequest',
      screenId: 'S09a_MarketplaceRequest' as ScreenId,
      title: 'Data Access Request Workflow',
      titleAr: 'طلب الحصول على البيانات',
      desc: 'Submit formal access requests, SLAs & usage justifications',
      descAr: 'تقديم طلبات مشاركة البيانات الحصرية واتفاقيات الاستخدام',
      icon: <FileCheck className="w-4 h-4" />,
      badge: null,
    },
    {
      id: 'S09b_MyEntitlements',
      screenId: 'S09b_MyEntitlements' as ScreenId,
      title: 'My Entitlements & API Keys',
      titleAr: 'مستحقاتي ومفاتيح الربط',
      desc: 'Manage active data subscriptions, quotas & bearer tokens',
      descAr: 'التراخيص المعتمدة، الحصص الشهرية ومفاتيح الرموز',
      icon: <KeyRound className="w-4 h-4" />,
      badge: null,
    },
    {
      id: 'S09c_ProviderWorkspace',
      screenId: 'S09c_ProviderWorkspace' as ScreenId,
      title: 'Provider Workspace',
      titleAr: 'مساحة عمل الجهة المزودة',
      desc: 'Manage published data assets, usage telemetry & requests',
      descAr: 'إدارة البيانات المنشورة وتحليلات الاستهلاك والطلبات الواردة',
      icon: <Briefcase className="w-4 h-4" />,
      badge: 'Publisher',
      badgeColor: isDarkTheme ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-50 text-amber-700',
    },
  ];

  // Menu Items for Developers Dropdown
  const developersMenuItems = [
    {
      id: 'S06_GeoAiChangeDetection',
      screenId: 'S06_GeoAiChangeDetection' as ScreenId,
      title: 'GeoAI Studio & Change Detection',
      titleAr: 'استوديو الذكاء الجيومكاني وكشف التغيرات',
      desc: 'Satellite imagery computer vision, temporal analytics & inference',
      descAr: 'تحليل صور الأقمار الصناعية بالرؤية الحاسوبية وكشف التغييرات',
      icon: <Sparkles className="w-4 h-4" />,
      badge: 'GeoAI',
      badgeColor: isDarkTheme ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-50 text-purple-700',
    },
    {
      id: 'S07_GeoAiAssistant',
      screenId: 'S07_GeoAiAssistant' as ScreenId,
      title: 'GeoAI Copilot Assistant',
      titleAr: 'مساعد الذكاء الاصطناعي الجيومكاني',
      desc: 'Conversational spatial intelligence, automated SQL & layer insights',
      descAr: 'الاستعلام بالمحادثة الذكية وتحليل الطبقات المكانية المتقدمة',
      icon: <Bot className="w-4 h-4" />,
      badge: 'Copilot',
      badgeColor: isDarkTheme ? 'bg-sky-500/20 text-sky-300' : 'bg-sky-50 text-sky-700',
    },
    {
      id: 'S14_SecurityAccessConsole',
      screenId: 'S14_SecurityAccessConsole' as ScreenId,
      title: 'Security & Access Console',
      titleAr: 'وحدة الأمان وإدارة الصلاحيات',
      desc: 'OAuth2 credentials, API security, token vault & audit logs',
      descAr: 'إدارة رموز المصادقة والشهادات المشفرة وسجلات التدقيق الأمني',
      icon: <Shield className="w-4 h-4" />,
      badge: 'Admin',
      badgeColor: isDarkTheme ? 'bg-rose-500/20 text-rose-300' : 'bg-rose-50 text-rose-700',
    },
    {
      id: 'S12_GeoMaturityTraining',
      screenId: 'S12_GeoMaturityTraining' as ScreenId,
      title: 'GeoMaturity & Developer Hub',
      titleAr: 'بناء القدرات والتدريب الجغرافي',
      desc: 'Spatial maturity framework, technical guides & certification',
      descAr: 'إطار النضج الجيومكاني، التوثيق الفني للمطورين ومسارات التدريب',
      icon: <GraduationCap className="w-4 h-4" />,
      badge: 'Enablement',
      badgeColor: isDarkTheme ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-50 text-emerald-700',
    },
  ];

  // Helper to render dropdown menus with rich descriptions and active highlights
  const renderDropdownMenu = (
    titleEn: string,
    titleAr: string,
    items: typeof catalogueMenuItems,
    footerAction?: { labelEn: string; labelAr: string; screenId: ScreenId }
  ) => (
    <div
      className={`absolute top-[calc(100%+4px)] ${isArabic ? 'right-0' : 'left-0'} w-[340px] rounded-xl shadow-2xl p-2 z-50 border transition-all animate-in fade-in slide-in-from-top-2 duration-150 ${
        isDarkTheme
          ? 'bg-[#0B2545] border-white/15 text-white shadow-black/40'
          : 'bg-white border-[#E2E8F0] text-[#0F172A] shadow-slate-300/50'
      }`}
    >
      <div
        className={`px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider border-b mb-1 flex items-center justify-between ${
          isDarkTheme ? 'text-steel-400 border-white/10' : 'text-[#64748B] border-[#F1F5F9]'
        }`}
      >
        <span>{isArabic ? titleAr : titleEn}</span>
        <span className="text-[9px] opacity-75">{items.length} {isArabic ? 'أقسام' : 'Modules'}</span>
      </div>

      <div className="space-y-0.5">
        {items.map((item) => {
          const isItemActive = currentScreen === item.screenId;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveDropdown(null);
                onNavigate(item.screenId);
              }}
              className={`w-full text-left p-2 rounded-lg flex items-start gap-2.5 transition-all group ${
                isItemActive
                  ? isDarkTheme
                    ? 'bg-white/15 text-white font-semibold'
                    : 'bg-blue-50/90 text-[#1865C9] font-semibold'
                  : isDarkTheme
                  ? 'hover:bg-white/10 text-white/90'
                  : 'hover:bg-slate-50 text-[#334155]'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                  isItemActive
                    ? isDarkTheme
                      ? 'bg-[#E5A817] text-[#0B2545]'
                      : 'bg-[#1865C9] text-white'
                    : isDarkTheme
                    ? 'bg-white/10 text-white/80 group-hover:bg-white/20'
                    : 'bg-slate-100 text-[#64748B] group-hover:bg-blue-100 group-hover:text-[#1865C9]'
                }`}
              >
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[12.5px] leading-tight truncate">
                    {isArabic ? item.titleAr : item.title}
                  </span>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded flex-shrink-0 ${
                        item.badgeColor || (isDarkTheme ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-700')
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <p
                  className={`text-[10.5px] leading-snug mt-0.5 line-clamp-1 ${
                    isDarkTheme ? 'text-white/60' : 'text-[#64748B]'
                  }`}
                >
                  {isArabic ? item.descAr : item.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {footerAction && (
        <div
          className={`mt-1 pt-1.5 border-t px-2 flex items-center justify-between text-[11px] ${
            isDarkTheme ? 'border-white/10 text-white/60' : 'border-[#F1F5F9] text-[#64748B]'
          }`}
        >
          <button
            onClick={() => {
              setActiveDropdown(null);
              onNavigate(footerAction.screenId);
            }}
            className="w-full text-left font-semibold text-[#1865C9] hover:underline flex items-center justify-between py-0.5"
          >
            <span>{isArabic ? footerAction.labelAr : footerAction.labelEn}</span>
            <span>→</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <header
      ref={headerRef}
      className={`h-[68px] w-full border-b px-4 lg:px-6 xl:px-8 flex items-center justify-between select-none z-40 sticky top-0 transition-colors flex-shrink-0 ${headerBg}`}
    >
      {/* Left: Department of Government Enablement Brand Logo (Clickable to Home) */}
      <div className="flex items-center flex-shrink-0">
        <button
          onClick={() => {
            setActiveDropdown(null);
            onNavigate(isArabic ? 'S01_Home_AR' : 'S01_Home');
          }}
          className="flex items-center hover:opacity-90 transition-opacity focus:outline-none"
          title={isArabic ? 'الصفحة الرئيسية - دائرة التمكين الحكومي' : 'Home - Department of Government Enablement'}
        >
          <DgeLogo variant={isDarkTheme ? 'white' : 'light'} height={38} isArabic={isArabic} />
        </button>
      </div>

      {/* Center: Global Navigation Links with Working Dropdowns & Home Redirect */}
      <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] font-semibold h-full flex-shrink-0">
        {/* 1. Home Item */}
        <button
          onClick={() => {
            setActiveDropdown(null);
            onNavigate(isArabic ? 'S01_Home_AR' : 'S01_Home');
          }}
          className={`h-[40px] flex items-center gap-1.5 transition-all px-2.5 rounded-lg ${
            isHomeActive ? activeNavLinkColor : navLinkColor
          }`}
          title={isArabic ? 'الصفحة الرئيسية' : 'Return to Home'}
        >
          <Home className="w-3.5 h-3.5 opacity-80" />
          <span>{isArabic ? 'الرئيسية' : 'Home'}</span>
        </button>

        {/* 2. Data & Catalogue (Dropdown) */}
        <div
          className="relative h-full flex items-center"
          onMouseEnter={() => {
            if (activeDropdown !== null) setActiveDropdown('catalogue');
          }}
        >
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'catalogue' ? null : 'catalogue')}
            className={`h-[40px] flex items-center gap-1 transition-all px-2.5 rounded-lg ${
              isCatalogueActive ? activeNavLinkColor : navLinkColor
            }`}
          >
            <span>{isArabic ? 'البيانات والمستودع' : 'Data & Catalogue'}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                activeDropdown === 'catalogue' ? 'rotate-180 opacity-100 text-[#1865C9]' : 'opacity-60'
              }`}
            />
          </button>
          {activeDropdown === 'catalogue' &&
            renderDropdownMenu('Data & Catalogue Services', 'خدمات البيانات والمستودع', catalogueMenuItems, {
              labelEn: 'Explore Full Dataset Catalogue',
              labelAr: 'استكشاف مستودع البيانات بالكامل',
              screenId: 'S02_CatalogueSearch',
            })}
        </div>

        {/* 3. Maps & Services (Dropdown) */}
        <div
          className="relative h-full flex items-center"
          onMouseEnter={() => {
            if (activeDropdown !== null) setActiveDropdown('maps');
          }}
        >
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'maps' ? null : 'maps')}
            className={`h-[40px] flex items-center gap-1 transition-all px-2.5 rounded-lg ${
              isMapsActive ? activeNavLinkColor : navLinkColor
            }`}
          >
            <span>{isArabic ? 'الخرائط والخدمات' : 'Maps & Services'}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                activeDropdown === 'maps' ? 'rotate-180 opacity-100 text-[#1865C9]' : 'opacity-60'
              }`}
            />
          </button>
          {activeDropdown === 'maps' &&
            renderDropdownMenu('Maps & Spatial Services', 'الخرائط والخدمات المكانية', mapsMenuItems, {
              labelEn: 'Launch Interactive Map Explorer',
              labelAr: 'تشغيل مستكشف الخرائط التفاعلي',
              screenId: 'S02_CatalogueSearch',
            })}
        </div>

        {/* 4. Marketplace (Dropdown) */}
        <div
          className="relative h-full flex items-center"
          onMouseEnter={() => {
            if (activeDropdown !== null) setActiveDropdown('marketplace');
          }}
        >
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'marketplace' ? null : 'marketplace')}
            className={`h-[40px] flex items-center gap-1 transition-all px-2.5 rounded-lg ${
              isMarketplaceActive ? activeNavLinkColor : navLinkColor
            }`}
          >
            <span>{isArabic ? 'سوق البيانات' : 'Marketplace'}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                activeDropdown === 'marketplace' ? 'rotate-180 opacity-100 text-[#1865C9]' : 'opacity-60'
              }`}
            />
          </button>
          {activeDropdown === 'marketplace' &&
            renderDropdownMenu('Data Marketplace', 'سوق البيانات الجغرافية', marketplaceMenuItems, {
              labelEn: 'Browse All Data Offers & APIs',
              labelAr: 'تصفح جميع عروض البيانات والواجهات',
              screenId: 'S08_MarketplaceCatalogue',
            })}
        </div>

        {/* 5. Open Data (Direct Link) */}
        <button
          onClick={() => {
            setActiveDropdown(null);
            onNavigate(isArabic ? 'S13_OpenDataPortal_AR' : 'S13_OpenDataPortal');
          }}
          className={`h-[40px] flex items-center transition-all px-2.5 rounded-lg ${
            isOpenDataActive ? activeNavLinkColor : navLinkColor
          }`}
          title={isArabic ? 'بوابة البيانات المفتوحة' : 'Open Data Portal'}
        >
          <span>{isArabic ? 'البيانات المفتوحة' : 'Open Data'}</span>
        </button>

        {/* 6. Developers (Dropdown) */}
        <div
          className="relative h-full flex items-center"
          onMouseEnter={() => {
            if (activeDropdown !== null) setActiveDropdown('developers');
          }}
        >
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'developers' ? null : 'developers')}
            className={`h-[40px] flex items-center gap-1 transition-all px-2.5 rounded-lg ${
              isDevelopersActive ? activeNavLinkColor : navLinkColor
            }`}
          >
            <span>{isArabic ? 'المطورون' : 'Developers'}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                activeDropdown === 'developers' ? 'rotate-180 opacity-100 text-[#1865C9]' : 'opacity-60'
              }`}
            />
          </button>
          {activeDropdown === 'developers' &&
            renderDropdownMenu('Developer & AI Tools', 'أدوات المطورين والذكاء الاصطناعي', developersMenuItems, {
              labelEn: 'Open GeoAI Studio Hub',
              labelAr: 'فتح استوديو الذكاء الجيومكاني',
              screenId: 'S06_GeoAiChangeDetection',
            })}
        </div>
      </nav>

      {/* Right Tools & User Profile */}
      <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-2.5 flex-shrink-0">
        {/* Concealed Search Bar (Positioned beside Documentation & Support, expands leftwards with ZERO layout jerking) */}
        <div
          className="relative flex items-center justify-center flex-shrink-0"
          onMouseEnter={() => setSearchHovered(true)}
          onMouseLeave={() => {
            if (!searchFocused && searchVal.length === 0) {
              setSearchHovered(false);
            }
          }}
        >
          {/* Base Search Icon Button (collapsed, identical alignment and styling with HelpCircle & Bell) */}
          <button
            type="button"
            onClick={() => {
              setSearchFocused(true);
              setSearchHovered(true);
              setTimeout(() => searchInputRef.current?.focus(), 50);
            }}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${iconColor}`}
            title={isArabic ? 'بحث في البيانات والخرائط... (⌘K)' : 'Search datasets, maps... (⌘K)'}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Expanded Search Bar Overlay (Smooth expansion over empty space to the left, zero layout shift) */}
          <div
            className={`absolute ${isArabic ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 h-9 rounded-full transition-all duration-200 ease-out z-30 flex items-center shadow-xl ${
              isDarkTheme
                ? 'bg-[#0E2B52] border border-steel-400/40 ring-1 ring-steel-400/30'
                : 'bg-white border border-[#CBD5E1] ring-2 ring-[#1865C9]/15'
            } ${
              isSearchExpanded
                ? 'w-[250px] lg:w-[280px] xl:w-[310px] opacity-100 pointer-events-auto'
                : 'w-8 h-8 opacity-0 pointer-events-none'
            }`}
          >
            {/* Search Magnifying Glass inside expanded bar */}
            <div
              className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none`}
            >
              <Search
                className={`w-4 h-4 ${
                  isDarkTheme ? 'text-sky-300' : 'text-[#1865C9]'
                }`}
              />
            </div>

            {/* Input */}
            <input
              ref={searchInputRef}
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onFocus={() => {
                setSearchFocused(true);
                setSearchHovered(true);
              }}
              onBlur={() => {
                setSearchFocused(false);
                if (searchVal.length === 0) {
                  setSearchHovered(false);
                }
              }}
              placeholder={isArabic ? 'بحث في البيانات والخرائط...' : 'Search datasets, maps...'}
              className={`w-full h-full bg-transparent min-w-0 ${
                isArabic ? 'pr-9 pl-9 text-right' : 'pl-9 pr-9 text-left'
              } text-[12px] font-medium outline-none ${
                isDarkTheme ? 'text-white placeholder:text-steel-400' : 'text-[#0F172A] placeholder:text-[#64748B]'
              }`}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onNavigate('S02_CatalogueSearch');
                } else if (e.key === 'Escape') {
                  setSearchVal('');
                  setSearchFocused(false);
                  setSearchHovered(false);
                  searchInputRef.current?.blur();
                }
              }}
            />

            {/* Right Badge / Clear button */}
            <div className={`absolute ${isArabic ? 'left-2.5' : 'right-2.5'} top-1/2 -translate-y-1/2 flex items-center`}>
              {searchVal ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchVal('');
                    searchInputRef.current?.focus();
                  }}
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] transition-colors ${
                    isDarkTheme
                      ? 'text-white/70 hover:text-white bg-white/10 hover:bg-white/20'
                      : 'text-slate-400 hover:text-slate-600 bg-slate-200 hover:bg-slate-300'
                  }`}
                  title="Clear"
                >
                  ✕
                </button>
              ) : (
                <kbd
                  className={`px-1.5 py-0.5 text-[9px] font-mono rounded border flex items-center select-none pointer-events-none ${
                    isDarkTheme
                      ? 'text-steel-400 bg-navy-800/80 border-white/10'
                      : 'text-[#64748B] bg-slate-100 border-[#CBD5E1]'
                  }`}
                >
                  ⌘K
                </kbd>
              )}
            </div>
          </div>
        </div>

        {/* Documentation & Support (Help) */}
        <button
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${iconColor}`}
          title={isArabic ? 'الدليل والدعم الفني' : 'AD-SDI Documentation & Support'}
          onClick={() => {
            setActiveDropdown(null);
            onNavigate('S12_GeoMaturityTraining');
          }}
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Notifications */}
        <button
          className={`w-8 h-8 rounded-lg relative flex items-center justify-center transition-colors ${iconColor}`}
          title={isArabic ? 'الإشعارات (2 غير مقروءة)' : 'Notifications (2 unread approvals & alerts)'}
          onClick={() => {
            setActiveDropdown(null);
            onNavigate('S04_PublishingApprovals');
          }}
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#E5A817] text-[#0B2545] text-[9px] font-bold flex items-center justify-center shadow-xs">
            2
          </span>
        </button>

        {/* Language Toggle */}
        <div
          className={`text-[12px] font-semibold border-l pl-2 sm:pl-2.5 flex items-center gap-1 ${
            isDarkTheme ? 'border-white/10 text-steel-400' : 'border-[#E2E8F0] text-[#64748B]'
          }`}
        >
          <button
            onClick={() => onNavigate('S01_Home')}
            className={`transition-colors px-1 py-0.5 rounded ${!isArabic ? 'text-[#1865C9] font-bold' : 'hover:text-[#1865C9]'}`}
          >
            EN
          </button>
          <span className="opacity-40">|</span>
          <button
            onClick={() => onNavigate('S01_Home_AR')}
            className={`transition-colors px-1 py-0.5 rounded font-arabic ${isArabic ? 'text-[#1865C9] font-bold' : 'hover:text-[#1865C9]'}`}
          >
            عربي
          </button>
        </div>

        {/* User Profile Block (De-cluttered with truncate and responsive display) */}
        <div className="relative">
          <button
            onClick={() => {
              setActiveDropdown(null);
              setProfileOpen(!profileOpen);
            }}
            className={`flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-2.5 border-l hover:opacity-90 transition-all ${
              isDarkTheme ? 'border-white/10' : 'border-[#E2E8F0]'
            }`}
            title="Account Menu"
          >
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[11px] sm:text-[12px] font-bold text-white shadow-xs flex-shrink-0"
              style={{ backgroundColor: persona.avatarBg || '#1F5FAD' }}
            >
              {persona.initials}
            </div>
            <div className="hidden lg:flex flex-col text-left max-w-[110px] xl:max-w-[130px]">
              <span
                className={`text-[12px] font-semibold leading-tight truncate ${
                  isDarkTheme ? 'text-white' : 'text-[#0F172A]'
                }`}
              >
                {persona.name}
              </span>
              <span
                className={`text-[10px] leading-tight truncate ${
                  isDarkTheme ? 'text-steel-400' : 'text-[#64748B]'
                }`}
              >
                {persona.entity}
              </span>
            </div>
            <ChevronDown
              className={`w-3 h-3 ml-0.5 transition-transform ${profileOpen ? 'rotate-180' : ''} ${
                isDarkTheme ? 'text-steel-400' : 'text-[#64748B]'
              }`}
            />
          </button>

          {/* User Profile Dropdown Menu */}
          {profileOpen && (
            <div
              className={`absolute right-0 top-11 w-64 rounded-xl shadow-xl p-2 z-50 text-[12px] border animate-in fade-in slide-in-from-top-1 duration-150 ${
                isDarkTheme
                  ? 'bg-[#0B2545] border-white/15 text-white'
                  : 'bg-white border-[#E2E8F0] text-[#0F172A]'
              }`}
            >
              <div className={`p-2 border-b ${isDarkTheme ? 'border-white/10' : 'border-[#E2E8F0]'}`}>
                <div className={`font-bold text-[13px] ${isDarkTheme ? 'text-white' : 'text-[#0F172A]'}`}>
                  {persona.name}
                </div>
                <div className={`text-[11px] ${isDarkTheme ? 'text-steel-400' : 'text-[#64748B]'}`}>{persona.role}</div>
                <div className="text-[10px] font-medium text-[#1865C9] mt-0.5">{persona.entity}</div>
                <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-medium w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Authenticated Government Session</span>
                </div>
              </div>

              <div className="py-1 space-y-0.5">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onNavigate('S09b_MyEntitlements');
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${
                    isDarkTheme ? 'hover:bg-white/10 text-white/90' : 'hover:bg-[#F1F5F9] text-[#334155]'
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>My Entitlements & Data Access</span>
                </button>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onNavigate('S14_SecurityAccessConsole');
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${
                    isDarkTheme ? 'hover:bg-white/10 text-white/90' : 'hover:bg-[#F1F5F9] text-[#334155]'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>Security & Identity Credentials</span>
                </button>
              </div>

              <div className={`pt-1 border-t ${isDarkTheme ? 'border-white/10' : 'border-[#E2E8F0]'}`}>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onNavigate(isArabic ? 'S00_Login_AR' : 'S00_Login');
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-rose-50 text-rose-600 font-medium transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Navigation Toggle (Visible below lg) */}
        <div className="flex lg:hidden items-center ml-1">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-1.5 rounded-lg ${iconColor}`}
            title="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Visible when hamburger is toggled) */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden absolute top-[68px] left-0 w-full border-b shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${
            isDarkTheme ? 'bg-[#0B2545] border-white/15 text-white' : 'bg-white border-[#E2E8F0] text-[#0F172A]'
          }`}
        >
          <div className="space-y-3 max-h-[80vh] overflow-y-auto">
            {/* Mobile Search */}
            <div className="relative">
              <Search
                className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${
                  isDarkTheme ? 'text-steel-400' : 'text-[#64748B]'
                }`}
              />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder={isArabic ? 'بحث في البيانات والخرائط...' : 'Search datasets, maps...'}
                className={`w-full h-[36px] pl-9 pr-4 rounded-lg text-[12px] border outline-none ${
                  isDarkTheme
                    ? 'bg-[#13315C] border-steel-400/20 text-white placeholder:text-steel-400'
                    : 'bg-[#F1F5F9] border-[#CBD5E1] text-[#0F172A] placeholder:text-[#64748B]'
                }`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setMobileMenuOpen(false);
                    onNavigate('S02_CatalogueSearch');
                  }
                }}
              />
            </div>

            {/* Mobile Home */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate(isArabic ? 'S01_Home_AR' : 'S01_Home');
              }}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 font-semibold text-[13px] ${
                isHomeActive ? 'bg-[#1865C9] text-white' : 'hover:bg-slate-100 dark:hover:bg-white/10'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{isArabic ? 'الرئيسية' : 'Home'}</span>
            </button>

            {/* Mobile Data & Catalogue */}
            <div>
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {isArabic ? 'البيانات والمستودع' : 'Data & Catalogue'}
              </div>
              <div className="space-y-1 mt-1">
                {catalogueMenuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate(item.screenId);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg flex items-center justify-between text-[12px] hover:bg-slate-100 dark:hover:bg-white/10"
                  >
                    <span>{isArabic ? item.titleAr : item.title}</span>
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Maps & Services */}
            <div>
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {isArabic ? 'الخرائط والخدمات' : 'Maps & Services'}
              </div>
              <div className="space-y-1 mt-1">
                {mapsMenuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate(item.screenId);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg flex items-center justify-between text-[12px] hover:bg-slate-100 dark:hover:bg-white/10"
                  >
                    <span>{isArabic ? item.titleAr : item.title}</span>
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Marketplace */}
            <div>
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {isArabic ? 'سوق البيانات' : 'Marketplace'}
              </div>
              <div className="space-y-1 mt-1">
                {marketplaceMenuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate(item.screenId);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg flex items-center justify-between text-[12px] hover:bg-slate-100 dark:hover:bg-white/10"
                  >
                    <span>{isArabic ? item.titleAr : item.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Open Data */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate(isArabic ? 'S13_OpenDataPortal_AR' : 'S13_OpenDataPortal');
              }}
              className="w-full text-left px-3 py-2 rounded-lg font-semibold text-[13px] hover:bg-slate-100 dark:hover:bg-white/10"
            >
              <span>{isArabic ? 'البيانات المفتوحة' : 'Open Data'}</span>
            </button>

            {/* Mobile Developers */}
            <div>
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {isArabic ? 'المطورون' : 'Developers'}
              </div>
              <div className="space-y-1 mt-1">
                {developersMenuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate(item.screenId);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg flex items-center justify-between text-[12px] hover:bg-slate-100 dark:hover:bg-white/10"
                  >
                    <span>{isArabic ? item.titleAr : item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
