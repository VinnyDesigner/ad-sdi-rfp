import React, { useState } from 'react';
import { DgeLogo, PortalWordmark } from './DgeLogo';
import { ScreenId, UserPersona } from '../../types';
import { Search, Bell, HelpCircle, ChevronDown, User, Shield, LogOut, Check } from 'lucide-react';
import { PERSONAS } from '../../constants/tokens';

interface HeaderWorkspaceProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  persona?: UserPersona;
  isDarkTheme?: boolean;
  isArabic?: boolean;
}

export const HeaderWorkspace: React.FC<HeaderWorkspaceProps> = ({
  currentScreen,
  onNavigate,
  persona = PERSONAS.ahmed,
  isDarkTheme = false,
  isArabic = false,
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const isCatalogueActive = ['S02_CatalogueSearch', 'S03_DatasetDetail', 'S04_PublishingApprovals', 'S05_QualitySlaDashboard'].includes(currentScreen);
  const isMarketplaceActive = ['S08_MarketplaceCatalogue', 'S09a_MarketplaceRequest', 'S09b_MyEntitlements', 'S09c_ProviderWorkspace'].includes(currentScreen);
  const isOpenDataActive = ['S13_OpenDataPortal', 'S13_OpenDataPortal_AR'].includes(currentScreen);
  const isDevelopersActive = ['S06_GeoAiChangeDetection', 'S07_GeoAiAssistant', 'S10_DigitalTwin3d', 'S14_SecurityAccessConsole'].includes(currentScreen);

  const headerBg = isDarkTheme ? 'bg-[#0B2545] border-navy-700 text-white' : 'bg-white border-[#E2E8F0] text-[#0F172A] shadow-xs';
  const navLinkColor = isDarkTheme ? 'text-white/80 hover:text-white border-transparent' : 'text-[#334155] hover:text-[#1865C9] border-transparent';
  const activeNavLinkColor = isDarkTheme ? 'text-[#E5A817] font-bold border-b-2 border-[#E5A817]' : 'text-[#1865C9] font-bold border-b-2 border-[#1865C9]';
  const searchBg = isDarkTheme ? 'bg-[#13315C] border-steel-400/20 text-white placeholder:text-steel-400' : 'bg-[#F1F5F9] border-[#CBD5E1] text-[#0F172A] placeholder:text-[#64748B] focus:bg-white';
  const iconColor = isDarkTheme ? 'text-steel-400 hover:text-white hover:bg-navy-800' : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]';

  return (
    <header className={`h-[72px] w-full border-b px-6 lg:px-8 flex items-center justify-between select-none z-40 sticky top-0 transition-colors flex-shrink-0 ${headerBg}`}>
      {/* Left: DGE Brand & Portal Wordmark */}
      <div className="flex items-center gap-3 xl:gap-4 flex-shrink-0">
        <button
          onClick={() => onNavigate(isArabic ? 'S01_Home_AR' : 'S01_Home')}
          className="flex items-center gap-3.5 hover:opacity-95 transition-opacity text-left"
          title="AD-SDI Portal Home"
        >
          <DgeLogo variant={isDarkTheme ? 'white' : 'light'} height={40} isArabic={isArabic} />
          <div className={`h-7 w-[1px] ${isDarkTheme ? 'bg-white/20' : 'bg-[#E2E8F0]'}`} />
          <PortalWordmark isDarkBg={isDarkTheme} isArabic={isArabic} />
        </button>
      </div>

      {/* Center: Global Navigation Links (Identical across Home & Inner Pages) */}
      <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-[13px] font-semibold h-full flex-shrink-0">
        <button
          onClick={() => onNavigate('S02_CatalogueSearch')}
          className={`h-full flex items-center gap-1 transition-all px-1 ${
            isCatalogueActive ? activeNavLinkColor : navLinkColor
          }`}
        >
          <span>{isArabic ? 'البيانات والمستودع' : 'Data & Catalogue'}</span>
          <ChevronDown className="w-3.5 h-3.5 opacity-60" />
        </button>

        <button
          onClick={() => onNavigate('S02_CatalogueSearch')}
          className={`h-full flex items-center gap-1 transition-all px-1 ${navLinkColor}`}
        >
          <span>{isArabic ? 'الخرائط والخدمات' : 'Maps & Services'}</span>
          <ChevronDown className="w-3.5 h-3.5 opacity-60" />
        </button>

        <button
          onClick={() => onNavigate('S08_MarketplaceCatalogue')}
          className={`h-full flex items-center transition-all px-1 ${
            isMarketplaceActive ? activeNavLinkColor : navLinkColor
          }`}
        >
          <span>{isArabic ? 'سوق البيانات' : 'Marketplace'}</span>
        </button>

        <button
          onClick={() => onNavigate('S13_OpenDataPortal')}
          className={`h-full flex items-center transition-all px-1 ${
            isOpenDataActive ? activeNavLinkColor : navLinkColor
          }`}
        >
          <span>{isArabic ? 'البيانات المفتوحة' : 'Open Data'}</span>
        </button>

        <button
          onClick={() => onNavigate('S06_GeoAiChangeDetection')}
          className={`h-full flex items-center gap-1 transition-all px-1 ${
            isDevelopersActive ? activeNavLinkColor : navLinkColor
          }`}
        >
          <span>{isArabic ? 'المطورون' : 'Developers'}</span>
          <ChevronDown className="w-3.5 h-3.5 opacity-60" />
        </button>
      </nav>

      {/* Middle-Right: Global Search with ⌘ K */}
      <div className={`hidden md:flex items-center w-[180px] lg:w-[240px] xl:w-[280px] relative transition-all ${searchFocused ? 'w-[240px] lg:w-[280px] xl:w-[320px]' : ''}`}>
        <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${isDarkTheme ? 'text-steel-400' : 'text-[#64748B]'}`} />
        <input
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          placeholder={isArabic ? 'البحث في البيانات والخرائط...' : 'Search datasets, maps...'}
          className={`w-full h-[36px] pl-9 pr-11 rounded-lg text-[12px] border focus:outline-none focus:border-[#1865C9] focus:ring-1 focus:ring-[#1865C9] transition-all ${searchBg}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onNavigate('S02_CatalogueSearch');
            }
          }}
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
          <kbd className={`px-1.5 py-0.5 text-[10px] font-mono rounded border ${isDarkTheme ? 'text-steel-400 bg-navy-800 border-white/10' : 'text-[#64748B] bg-white border-[#CBD5E1]'}`}>
            ⌘ K
          </kbd>
        </div>
      </div>

      {/* Right Tools & User Profile */}
      <div className="flex items-center gap-2 xl:gap-3 flex-shrink-0">
        {/* Help */}
        <button
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${iconColor}`}
          title="AD-SDI Documentation & Support"
          onClick={() => onNavigate('S12_GeoMaturityTraining')}
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Notifications */}
        <button
          className={`w-8 h-8 rounded-lg relative flex items-center justify-center transition-colors ${iconColor}`}
          title="Notifications (2 unread approvals & alerts)"
          onClick={() => onNavigate('S04_PublishingApprovals')}
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#E5A817] text-[#0B2545] text-[9px] font-bold flex items-center justify-center shadow-xs">
            2
          </span>
        </button>

        {/* Language Toggle */}
        <div className={`text-[12px] font-semibold border-l pl-2.5 xl:pl-3 flex items-center gap-1.5 ${isDarkTheme ? 'border-white/10 text-steel-400' : 'border-[#E2E8F0] text-[#64748B]'}`}>
          <button
            onClick={() => onNavigate('S01_Home')}
            className={`transition-colors ${!isArabic ? 'text-[#1865C9] font-bold' : 'hover:text-[#1865C9]'}`}
          >
            EN
          </button>
          <span>|</span>
          <button
            onClick={() => onNavigate('S01_Home_AR')}
            className={`transition-colors font-arabic ${isArabic ? 'text-[#1865C9] font-bold' : 'hover:text-[#1865C9]'}`}
          >
            عربي
          </button>
        </div>

        {/* User Profile Block */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className={`flex items-center gap-2 pl-2.5 xl:pl-3 border-l hover:opacity-90 transition-all ${isDarkTheme ? 'border-white/10' : 'border-[#E2E8F0]'}`}
            title="Account Menu"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-white shadow-xs flex-shrink-0"
              style={{ backgroundColor: persona.avatarBg || '#1F5FAD' }}
            >
              {persona.initials}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className={`text-[12px] font-semibold leading-tight ${isDarkTheme ? 'text-white' : 'text-[#0F172A]'}`}>
                {persona.name}
              </span>
              <span className={`text-[10px] leading-tight ${isDarkTheme ? 'text-steel-400' : 'text-[#64748B]'}`}>
                {persona.entity}
              </span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 ml-0.5 transition-transform ${profileOpen ? 'rotate-180' : ''} ${isDarkTheme ? 'text-steel-400' : 'text-[#64748B]'}`} />
          </button>

          {/* User Profile Dropdown Menu */}
          {profileOpen && (
            <div className="absolute right-0 top-11 w-64 bg-white border border-[#E2E8F0] rounded-xl shadow-xl p-2 z-50 text-[12px] text-[#0F172A] animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="p-2 border-b border-[#E2E8F0]">
                <div className="font-bold text-[13px] text-[#0F172A]">{persona.name}</div>
                <div className="text-[11px] text-[#64748B]">{persona.role}</div>
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
                  className="w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-[#F1F5F9] text-[#334155] transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>My Entitlements & Data Access</span>
                </button>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onNavigate('S14_SecurityAccessConsole');
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 hover:bg-[#F1F5F9] text-[#334155] transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>Security & Identity Credentials</span>
                </button>
              </div>

              <div className="pt-1 border-t border-[#E2E8F0]">
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
      </div>
    </header>
  );
};

