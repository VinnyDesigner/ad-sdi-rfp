import React from 'react';

export const FooterPublic: React.FC<{ isArabic?: boolean }> = ({ isArabic = false }) => {
  return (
    <footer className="h-[48px] bg-navy-900 border-t border-navy-700/60 px-8 flex items-center justify-between text-steel-400 text-[11px] select-none z-20">
      <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <span className="text-white/80 font-medium">
          {isArabic
            ? '© 2027 دائرة التمكين الحكومي · البنية التحتية للبيانات المكانية لإمارة أبوظبي'
            : '© 2027 Department of Government Enablement (DGE) · Abu Dhabi SDI'}
        </span>
        <span className="text-white/20">|</span>
        <span>{isArabic ? 'استضافة سيادية داخل دولة الإمارات' : 'UAE Sovereign Data Residency'}</span>
      </div>

      <div className={`flex items-center gap-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <div className="flex items-center gap-4">
          <span className="hover:text-white cursor-pointer transition-colors">
            {isArabic ? 'الخصوصية والأمان' : 'Security & Privacy'}
          </span>
          <span className="hover:text-white cursor-pointer transition-colors">
            {isArabic ? 'الشروط والأحكام' : 'Terms'}
          </span>
          <span className="hover:text-white cursor-pointer transition-colors">
            {isArabic ? 'المعايير الجيومكانية' : 'Geospatial Standards'}
          </span>
        </div>
        <span className="text-gold-500/80 font-mono text-[10px]">
          {isArabic ? 'بيانات توضيحية — تصميم مفاهيمي' : 'Illustrative data — conceptual design'}
        </span>
      </div>
    </footer>
  );
};
