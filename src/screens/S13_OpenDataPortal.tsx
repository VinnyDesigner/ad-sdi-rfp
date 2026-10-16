import React, { useState } from 'react';
import { ScreenId } from '../types';
import { HeaderWorkspace } from '../components/common/HeaderWorkspace';
import { FooterPublic } from '../components/common/FooterPublic';
import {
  Search,
  Download,
  ExternalLink,
  Code2,
  BookOpen,
  FileCheck2,
  Sparkles,
  TreePine,
  Bus,
  Waves,
  Bike,
  CheckCircle2,
  Shield,
  ArrowRight,
} from 'lucide-react';

interface S13Props {
  onNavigate: (screen: ScreenId) => void;
  isArabic?: boolean;
}

export const S13_OpenDataPortal: React.FC<S13Props> = ({ onNavigate, isArabic = false }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const popularDatasets = [
    {
      title: 'Public Parks & Recreational Spaces',
      titleAr: 'الحدائق العامة والمساحات الترفيهية',
      publisher: 'DMT · Dept. of Municipalities and Transport',
      publisherAr: 'دائرة البلديات والنقل',
      icon: TreePine,
      formats: ['CSV', 'GeoJSON', 'API'],
      refresh: 'Oct 2027',
      color: '#1E9E6A',
    },
    {
      title: 'Bus Stops & Transit Routes (v2027.09)',
      titleAr: 'محطات ومسارات حافلات النقل العام',
      publisher: 'DMT · Dept. of Municipalities and Transport',
      publisherAr: 'دائرة البلديات والنقل',
      icon: Bus,
      formats: ['GTFS', 'GeoJSON', 'API'],
      refresh: 'Oct 2027',
      color: '#1F5FAD',
    },
    {
      title: 'Public Beaches & Coastal Access Points',
      titleAr: 'الشواطئ العامة ونقاط الوصول الساحلية',
      publisher: 'EAD / DMT Abu Dhabi',
      publisherAr: 'هيئة البيئة / دائرة البلديات والنقل',
      icon: Waves,
      formats: ['KML', 'GeoJSON', 'Shapefile'],
      refresh: 'Nov 2027',
      color: '#0E9F8E',
    },
    {
      title: 'Cycling Tracks & Velodrome Network',
      titleAr: 'مسارات الدراجات الهوائية ومضامير السباق',
      publisher: 'Abu Dhabi Sports Council / DMT',
      publisherAr: 'مجلس أبوظبي الرياضي / دائرة البلديات',
      icon: Bike,
      formats: ['GeoJSON', 'GPX', 'API'],
      refresh: 'Oct 2027',
      color: '#E07B24',
    },
  ];

  return (
    <div
      className={`w-full min-h-screen bg-canvas flex flex-col justify-between overflow-y-auto select-none ${
        isArabic ? 'font-arabic' : 'font-sans'
      }`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* 1. Unified Top Header (72 px) */}
      <HeaderWorkspace
        currentScreen={isArabic ? 'S13_OpenDataPortal_AR' : 'S13_OpenDataPortal'}
        onNavigate={onNavigate}
        isArabic={isArabic}
      />

      {/* 2. Hero Section (300 px) - Friendly Coastline with 70% Overlay */}
      <div className="relative h-[290px] bg-navy-900 text-white flex flex-col justify-center px-16 overflow-hidden">
        {/* Coastal vector illustration overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <svg className="w-full h-full object-cover" viewBox="0 0 1440 290" fill="none">
            <rect width="1440" height="290" fill="#0E2442" />
            <path
              d="M 120 180 Q 400 120 800 200 T 1500 160 L 1500 290 L 0 290 Z"
              fill="#183B68"
            />
            <path
              d="M 280 230 Q 600 170 1000 250 T 1500 220"
              stroke="#2BA6DE"
              strokeWidth="2"
              fill="none"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1200px] w-full mx-auto space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-[12px] font-bold uppercase tracking-wider text-emerald-300">
                {isArabic ? 'بوابة البيانات الجيومكانية المفتوحة' : 'Abu Dhabi Open Data Initiative'}
              </span>
            </div>
            <h1 className="text-[38px] font-bold text-white tracking-tight">
              {isArabic ? 'البيانات المكانية المفتوحة لإمارة أبوظبي' : 'Abu Dhabi Open Geospatial Data'}
            </h1>
            <p className="text-[15px] text-white/85">
              {isArabic
                ? 'بيانات موثوقة ومجانية للاستخدام وإعادة الاستخدام وتطوير الحلول الذكية.'
                : 'Free to use, reuse and build on. Authoritative government open datasets for developers and public innovation.'}
            </p>
          </div>

          {/* Search Bar (640 px wide) */}
          <div className="w-[640px] h-[48px] bg-white rounded-xl shadow-level-2 p-1.5 flex items-center gap-2 text-primaryText">
            <Search className="w-4 h-4 text-steel-400 ml-2" />
            <input
              type="text"
              placeholder={
                isArabic
                  ? 'ابحث في مجموعات البيانات المفتوحة (طرق، متنزهات، حدود، إحصاءات)...'
                  : 'Search 640 open datasets (parks, transport, tourism, cadastre)...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-[13px] text-primaryText focus:outline-none"
            />
            <button
              onClick={() => onNavigate('S02_CatalogueSearch')}
              className="h-[36px] px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[12px] font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>{isArabic ? 'بحث' : 'Search'}</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-white/70">
            {isArabic ? 'منشورة بموجب ترخيص أبوظبي للبيانات المفتوحة' : 'Published under the Abu Dhabi Sovereign Open Data Licence'}
          </div>
        </div>
      </div>

      {/* 3. Overlapping Stats Strip (Overlaps hero by 40 px) */}
      <div className="relative z-20 max-w-[1000px] w-full mx-auto -mt-[38px]">
        <div className="h-[80px] bg-white rounded-xl shadow-level-2 border border-border px-8 flex items-center justify-between">
          <div className="text-center flex-1">
            <div className="text-[24px] font-bold text-navy-900 font-mono tabular-nums leading-none">
              640
            </div>
            <div className="text-[11px] text-secondaryText font-medium mt-1">
              {isArabic ? 'مجموعة بيانات مفتوحة' : 'Open Datasets'}
            </div>
          </div>
          <div className="h-8 w-[1px] bg-border" />

          <div className="text-center flex-1">
            <div className="text-[24px] font-bold text-navy-900 font-mono tabular-nums leading-none">
              48k
            </div>
            <div className="text-[11px] text-secondaryText font-medium mt-1">
              {isArabic ? 'تنزيل شهرياً' : 'Downloads / month'}
            </div>
          </div>
          <div className="h-8 w-[1px] bg-border" />

          <div className="text-center flex-1">
            <div className="text-[24px] font-bold text-navy-900 font-mono tabular-nums leading-none">
              1.2M
            </div>
            <div className="text-[11px] text-secondaryText font-medium mt-1">
              {isArabic ? 'استدعاء API شهرياً' : 'API calls / month'}
            </div>
          </div>
          <div className="h-8 w-[1px] bg-border" />

          <div className="text-center flex-1">
            <div className="text-[24px] font-bold text-navy-900 font-mono tabular-nums leading-none">
              52
            </div>
            <div className="text-[11px] text-secondaryText font-medium mt-1">
              {isArabic ? 'تطبيق مدني مسجل' : 'Registered Civic Apps'}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Trust Statement Line (Centred with 4 tiny step icons) */}
      <div className="py-2 text-center">
        <div className="inline-flex items-center gap-3 text-[12px] text-secondaryText bg-white px-4 py-1.5 rounded-full border border-border/80 shadow-sm">
          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isArabic ? 'مصنفة رسمياً' : 'Classified'}</span>
          </span>
          <span>→</span>
          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>{isArabic ? 'فحص الجودة' : 'Quality-Checked'}</span>
          </span>
          <span>→</span>
          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>{isArabic ? 'مراجعة قانونية' : 'Legal Reviewed'}</span>
          </span>
          <span>→</span>
          <span className="font-bold text-navy-900">
            {isArabic ? 'معتمدة للنشر العام' : 'Approved for Sovereign Release'}
          </span>
        </div>
      </div>

      {/* 5. Popular Datasets (4 cards in one row, 180 px tall per spec) */}
      <div className="max-w-[1200px] w-full mx-auto px-4 space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-navy-900 tracking-tight">
            {isArabic ? 'أبرز مجموعات البيانات الأكثر استخداماً' : 'Popular Public Datasets'}
          </h2>
          <span
            onClick={() => onNavigate('S02_CatalogueSearch')}
            className="text-[12px] font-bold text-blue-600 hover:underline cursor-pointer"
          >
            {isArabic ? 'عرض كافة البيانات المفتوحة (640) ←' : 'Browse All 640 Datasets →'}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {popularDatasets.map((ds, idx) => {
            const Icon = ds.icon;

            return (
              <div
                key={idx}
                onClick={() => onNavigate('S03_DatasetDetail')}
                className="h-[175px] bg-white rounded-xl border border-border p-3.5 flex flex-col justify-between shadow-level-1 hover:shadow-level-2 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${ds.color}15`, color: ds.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Open Data
                    </span>
                  </div>

                  <h3 className="text-[13px] font-bold text-navy-900 leading-snug line-clamp-2">
                    {isArabic ? ds.titleAr : ds.title}
                  </h3>
                  <div className="text-[11px] text-steel-500 mt-1 truncate">
                    {isArabic ? ds.publisherAr : ds.publisher}
                  </div>
                </div>

                <div className="pt-2 border-t border-border/80 flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-1 font-mono text-secondaryText">
                    {ds.formats.map((f, fi) => (
                      <span key={fi} className="px-1 py-0.2 rounded bg-canvas border border-border">
                        {f}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert('Initiating download: ' + ds.title);
                    }}
                    className="w-7 h-7 rounded-md bg-canvas hover:bg-emerald-50 hover:text-emerald-700 text-secondaryText flex items-center justify-center transition-colors"
                    title="Download Dataset"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Bottom Row: Developer Card (7 cols) + GeoHack & Actions (5 cols) */}
      <div className="max-w-[1200px] w-full mx-auto px-4 pb-3 grid grid-cols-12 gap-5">
        {/* Left 7 cols: For Developers & Entities */}
        <div className="col-span-7 bg-white rounded-xl border border-border shadow-level-1 p-4 space-y-2.5">
          <div className="flex items-center justify-between pb-1 border-b border-border">
            <span className="text-[13px] font-bold text-navy-900 uppercase tracking-wider">
              {isArabic ? 'للمطورين والجهات الحكومية' : 'For Developers & Entities'}
            </span>
            <span className="text-[11px] text-steel-500">API Standard V3</span>
          </div>

          <div className="space-y-2">
            {[
              {
                title: isArabic ? 'واجهات البرمجة المفتوحة والتوثيق' : 'Open APIs & Interactive Documentation',
                desc: isArabic ? 'مواصفات OGC و REST endpoints مع أمثلة برمجية' : 'OGC Features, WFS & OpenAPI 3.0 sandboxes with code samples in Python & JS.',
                icon: Code2,
              },
              {
                title: isArabic ? 'حزمة الأدوات مفتوحة المصدر' : 'Open-Source Geospatial Toolkit',
                desc: isArabic ? 'مكتبات تحويل الإحداثيات وقوالب رسم الخرائط' : 'QGIS plugins, Python spatial ETL helpers, and React map widgets.',
                icon: BookOpen,
              },
              {
                title: isArabic ? 'دليل انضمام الجهات والمساهمين' : 'Entity Onboarding & Publishing Guide',
                desc: isArabic ? 'معايير النشر ومحددات ترخيص البيانات المفتوحة' : 'Standard operating procedures for qualifying public datasets.',
                icon: FileCheck2,
              },
            ].map((link, li) => {
              const Icon = link.icon;
              return (
                <div
                  key={li}
                  className="p-2.5 rounded-lg bg-canvas hover:bg-slate-100 border border-border/80 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center text-blue-600 flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[12px] font-bold text-navy-900">{link.title}</div>
                      <div className="text-[11px] text-secondaryText">{link.desc}</div>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 text-steel-400 flex-shrink-0 ${isArabic ? 'rotate-180' : ''}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 5 cols: GeoHack Gold Banner + Support buttons */}
        <div className="col-span-5 space-y-3">
          {/* Gold banner card */}
          <div className="h-[96px] bg-gradient-to-r from-amber-400 via-gold-500 to-amber-500 rounded-xl p-4 text-navy-900 flex items-center justify-between shadow-level-1">
            <div className="space-y-0.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-navy-900 text-gold-500">
                Annual Innovation Event
              </span>
              <div className="text-[15px] font-bold tracking-tight">
                {isArabic ? 'هاكاثون أبوظبي للبيانات المكانية 2028' : 'GeoHack 2028 — Registrations Open'}
              </div>
              <div className="text-[11px] font-medium text-navy-900/80">
                {isArabic ? 'شارك في بناء حلول المدينة الذكية' : 'Build urban AI solutions using sovereign spatial APIs'}
              </div>
            </div>
            <button className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-lg text-[12px] font-bold shadow-sm transition-all flex-shrink-0">
              {isArabic ? 'سجل الآن' : 'Register'}
            </button>
          </div>

          {/* White Card with Suggest Dataset & Report Data Issue */}
          <div className="bg-white rounded-xl border border-border p-3.5 flex items-center justify-between gap-3 shadow-level-1">
            <button className="flex-1 py-2 rounded-lg bg-canvas hover:bg-slate-100 text-primaryText font-semibold text-[12px] border border-border transition-colors">
              {isArabic ? 'اقترح مجموعة بيانات' : 'Suggest a dataset'}
            </button>
            <button className="flex-1 py-2 rounded-lg bg-canvas hover:bg-slate-100 text-secondaryText font-medium text-[12px] border border-border transition-colors">
              {isArabic ? 'أبلغ عن ملاحظة جودة' : 'Report a data issue'}
            </button>
          </div>
        </div>
      </div>

      {/* 7. Public Footer (48 px) */}
      <FooterPublic isArabic={isArabic} />
    </div>
  );
};
