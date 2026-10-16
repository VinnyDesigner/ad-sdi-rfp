import React from 'react';

interface DgeLogoProps {
  variant?: 'light' | 'dark' | 'white';
  height?: number;
  showSubtitle?: boolean;
  isArabic?: boolean;
}

export const DgeLogo: React.FC<DgeLogoProps> = ({
  variant = 'dark',
  height = 40,
  showSubtitle = false,
  isArabic = false,
}) => {
  const isDarkBg = variant === 'white' || variant === 'dark';
  const logoSrc = isDarkBg ? '/images/dge_logo_white.png' : '/images/dge_logo.png';

  return (
    <div className="flex items-center select-none flex-shrink-0">
      <img
        src={logoSrc}
        alt="Department of Government Enablement - دائرة التمكين الحكومي"
        style={{
          height: `${height}px`,
          width: 'auto',
        }}
        className="object-contain transition-all"
      />
    </div>
  );
};

export const PortalWordmark: React.FC<{
  isDarkBg?: boolean;
  isArabic?: boolean;
  showSubtitle?: boolean;
}> = ({
  isDarkBg = true,
  isArabic = false,
  showSubtitle = true,
}) => {
  return (
    <div className={`flex flex-col justify-center select-none ${isArabic ? 'text-right' : 'text-left'}`}>
      <div className="flex items-center gap-2">
        <span className={`text-[17px] font-extrabold tracking-tight ${isDarkBg ? 'text-white' : 'text-navy-900'}`}>
          AD-SDI Portal
        </span>
        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-400 border border-blue-400/30">
          PROD
        </span>
      </div>
      {showSubtitle && (
        <div className="text-[11px] font-semibold tracking-tight leading-tight mt-0.5">
          <span className={isDarkBg ? 'text-white/80' : 'text-navy-900'}>Abu Dhabi </span>
          <span className="text-[#E5A817] font-bold">Spatial Data </span>
          <span className={isDarkBg ? 'text-white/80' : 'text-navy-900'}>Infrastructure</span>
        </div>
      )}
    </div>
  );
};
