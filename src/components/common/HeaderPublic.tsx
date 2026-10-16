import React from 'react';
import { DgeLogo, PortalWordmark } from './DgeLogo';
import { ScreenId } from '../../types';
import { Globe, ArrowRight, User } from 'lucide-react';

interface HeaderPublicProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  isArabic?: boolean;
}

export const HeaderPublic: React.FC<HeaderPublicProps> = ({
  currentScreen,
  onNavigate,
  isArabic = false,
}) => {
  const navItems = [
    { id: 'S02_CatalogueSearch', label: 'Data & Catalogue', labelAr: 'البيانات والمستودع' },
    { id: 'S02_CatalogueSearch', label: 'Maps & Services', labelAr: 'الخرائط والخدمات' },
    { id: 'S08_MarketplaceCatalogue', label: 'Marketplace', labelAr: 'سوق البيانات' },
    { id: 'S13_OpenDataPortal', label: 'Open Data', labelAr: 'البيانات المفتوحة' },
    { id: 'S03_DatasetDetail', label: 'Developers', labelAr: 'المطورون' },
  ];

  return (
    <header className="h-[72px] bg-white border-b border-border px-8 flex items-center justify-between select-none z-30 relative">
      {/* Left: Brand Identity */}
      <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <button
          onClick={() => onNavigate(isArabic ? 'S01_Home_AR' : 'S01_Home')}
          className="flex items-center gap-4 hover:opacity-95 transition-opacity"
        >
          <DgeLogo variant="light" height={38} isArabic={isArabic} />
          <div className="h-7 w-[1px] bg-border mx-1" />
          <PortalWordmark isDarkBg={false} isArabic={isArabic} />
        </button>
      </div>

      {/* Middle: Navigation Links */}
      <nav className={`hidden lg:flex items-center gap-8 ${isArabic ? 'flex-row-reverse' : ''}`}>
        {navItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onNavigate(item.id as ScreenId)}
            className="text-[14px] font-medium text-secondaryText hover:text-navy-900 transition-colors"
          >
            {isArabic ? item.labelAr : item.label}
          </button>
        ))}
      </nav>

      {/* Right Actions */}
      <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
        {/* Language Switcher */}
        <button
          onClick={() => {
            if (isArabic) {
              if (currentScreen === 'S01_Home_AR') onNavigate('S01_Home');
              else if (currentScreen === 'S13_OpenDataPortal_AR') onNavigate('S13_OpenDataPortal');
              else if (currentScreen === 'S00_Login_AR') onNavigate('S00_Login');
            } else {
              if (currentScreen === 'S01_Home') onNavigate('S01_Home_AR');
              else if (currentScreen === 'S13_OpenDataPortal') onNavigate('S13_OpenDataPortal_AR');
              else if (currentScreen === 'S00_Login') onNavigate('S00_Login_AR');
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-[13px] font-semibold text-primaryText hover:bg-canvas transition-colors"
          title="Toggle Language (EN / العربية)"
        >
          <Globe className="w-3.5 h-3.5 text-steel-400" />
          <span>{isArabic ? 'English' : 'عربي'}</span>
        </button>

        {/* Sign In CTA */}
        <button
          onClick={() => onNavigate(isArabic ? 'S00_Login_AR' : 'S00_Login')}
          className="flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white px-4 py-2 rounded-md text-[13px] font-semibold transition-all shadow-level-1"
        >
          <User className="w-4 h-4 text-gold-500" />
          <span>{isArabic ? 'تسجيل الدخول الحكومي' : 'Government Sign In'}</span>
          <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </header>
  );
};
