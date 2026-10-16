import React from 'react';

export const MicroFooter: React.FC<{ isDarkTheme?: boolean; isArabic?: boolean }> = ({
  isDarkTheme = false,
  isArabic = false,
}) => {
  return (
    <div
      className={`h-[24px] px-6 flex items-center justify-between text-[11px] font-mono select-none z-10 ${
        isDarkTheme
          ? 'bg-[#0A1628] border-t border-white/5 text-steel-400/70'
          : 'bg-white border-t border-border/80 text-secondaryText/80'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-success"></span>
        <span className="text-[10px]">
          {isArabic ? 'بوابة البيانات المكانية لحكومة أبوظبي (AD-SDI)' : 'AD-SDI Sovereign Spatial Platform · DGE'}
        </span>
      </div>
      <div className="text-[10px] text-gold-500/80 tracking-wide font-medium">
        {isArabic ? 'بيانات توضيحية — تصميم مفاهيمي' : 'Illustrative data — conceptual design'}
      </div>
    </div>
  );
};
