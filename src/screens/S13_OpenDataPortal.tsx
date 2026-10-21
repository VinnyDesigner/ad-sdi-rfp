import React, { useState } from 'react';
import { ScreenId } from '../types';
import { HeaderWorkspace } from '../components/common/HeaderWorkspace';
import { FooterPublic } from '../components/common/FooterPublic';
import { InteractiveMap } from '../components/common/InteractiveMap';
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
  MapPin,
  X,
  Copy,
  Layers,
  Send,
  AlertCircle,
} from 'lucide-react';

interface S13Props {
  onNavigate: (screen: ScreenId) => void;
  isArabic?: boolean;
}

export const S13_OpenDataPortal: React.FC<S13Props> = ({ onNavigate, isArabic = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showLiveMap, setShowLiveMap] = useState(true);
  const [showGeoHackModal, setShowGeoHackModal] = useState(false);
  const [showSuggestModal, setShowSuggestModal] = useState(false);
  const [showReportIssueModal, setShowReportIssueModal] = useState(false);
  const [activeDevModal, setActiveDevModal] = useState<'API' | 'TOOLKIT' | 'GUIDE' | null>(null);

  // Form states
  const [geoHackName, setGeoHackName] = useState('');
  const [geoHackEmail, setGeoHackEmail] = useState('');
  const [geoHackTrack, setGeoHackTrack] = useState('Urban AI & Smart Mobility');

  const [suggestTitle, setSuggestTitle] = useState('');
  const [suggestDesc, setSuggestDesc] = useState('');
  const [suggestEntity, setSuggestEntity] = useState('DMT - Municipalities');

  const [issueDataset, setIssueDataset] = useState('Public Parks & Recreational Spaces');
  const [issueDesc, setIssueDesc] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const popularDatasets = [
    {
      id: 'OD-01',
      title: 'Public Parks & Recreational Spaces',
      titleAr: 'الحدائق العامة والمساحات الترفيهية',
      publisher: 'DMT · Dept. of Municipalities and Transport',
      publisherAr: 'دائرة البلديات والنقل',
      icon: TreePine,
      formats: ['CSV', 'GeoJSON', 'API'],
      refresh: 'Oct 2027',
      color: '#1E9E6A',
      featureCount: 384,
      downloadUrl: '/api/v3/opendata/parks.geojson',
    },
    {
      id: 'OD-02',
      title: 'Bus Stops & Transit Routes (v2027.09)',
      titleAr: 'محطات ومسارات حافلات النقل العام',
      publisher: 'DMT · Dept. of Municipalities and Transport',
      publisherAr: 'دائرة البلديات والنقل',
      icon: Bus,
      formats: ['GTFS', 'GeoJSON', 'API'],
      refresh: 'Oct 2027',
      color: '#1F5FAD',
      featureCount: 1420,
      downloadUrl: '/api/v3/opendata/transit.geojson',
    },
    {
      id: 'OD-03',
      title: 'Public Beaches & Coastal Access Points',
      titleAr: 'الشواطئ العامة ونقاط الوصول الساحلية',
      publisher: 'EAD / DMT Abu Dhabi',
      publisherAr: 'هيئة البيئة / دائرة البلديات والنقل',
      icon: Waves,
      formats: ['KML', 'GeoJSON', 'Shapefile'],
      refresh: 'Nov 2027',
      color: '#0E9F8E',
      featureCount: 46,
      downloadUrl: '/api/v3/opendata/beaches.geojson',
    },
    {
      id: 'OD-04',
      title: 'Cycling Tracks & Velodrome Network',
      titleAr: 'مسارات الدراجات الهوائية ومضامير السباق',
      publisher: 'Abu Dhabi Sports Council / DMT',
      publisherAr: 'مجلس أبوظبي الرياضي / دائرة البلديات',
      icon: Bike,
      formats: ['GeoJSON', 'GPX', 'API'],
      refresh: 'Oct 2027',
      color: '#E07B24',
      featureCount: 128,
      downloadUrl: '/api/v3/opendata/cycling.geojson',
    },
  ];

  const filteredDatasets = popularDatasets.filter((ds) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      ds.title.toLowerCase().includes(q) ||
      ds.titleAr.includes(q) ||
      ds.publisher.toLowerCase().includes(q)
    );
  });

  const handleDownloadDataset = (ds: (typeof popularDatasets)[0], e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    // Generate real GeoJSON sample
    const sampleGeoJSON = {
      type: 'FeatureCollection',
      datasetId: ds.id,
      datasetTitle: ds.title,
      licence: 'Abu Dhabi Sovereign Open Data Licence V2',
      extractedAt: new Date().toISOString(),
      features: [
        {
          type: 'Feature',
          properties: {
            name: `${ds.title} Sample Feature 1`,
            emirate: 'Abu Dhabi',
            status: 'Operational',
            publisher: ds.publisher,
          },
          geometry: {
            type: 'Point',
            coordinates: [54.3773, 24.4539],
          },
        },
        {
          type: 'Feature',
          properties: {
            name: `${ds.title} Sample Feature 2`,
            emirate: 'Abu Dhabi',
            status: 'Operational',
            publisher: ds.publisher,
          },
          geometry: {
            type: 'Point',
            coordinates: [54.4021, 24.4782],
          },
        },
      ],
    };

    const blob = new Blob([JSON.stringify(sampleGeoJSON, null, 2)], {
      type: 'application/geo+json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AD-OpenData-${ds.id}-${ds.title.replace(/[^a-zA-Z0-9]/g, '_')}.geojson`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(isArabic ? `تم تنزيل مجموعة البيانات: ${ds.titleAr}` : `Downloaded GeoJSON dataset: ${ds.title}`);
  };

  const handleGeoHackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      isArabic
        ? `شكراً ${geoHackName}، تم تأكيد تسجيلك في هاكاثون 2028!`
        : `Thank you ${geoHackName}, your registration for GeoHack 2028 is confirmed!`
    );
    setShowGeoHackModal(false);
    setGeoHackName('');
    setGeoHackEmail('');
  };

  const handleSuggestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      isArabic
        ? 'شكراً لك! تم استلام اقتراح مجموعة البيانات وسيقوم فريق العمل بمراجعته.'
        : 'Thank you! Your dataset proposal has been submitted to the Open Data Committee.'
    );
    setShowSuggestModal(false);
    setSuggestTitle('');
    setSuggestDesc('');
  };

  const handleReportIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      isArabic
        ? 'تم تسجيل البلاغ وإحالته لمسؤول البيانات في الجهة المعنية.'
        : 'Issue report logged and assigned to the relevant agency data steward.'
    );
    setShowReportIssueModal(false);
    setIssueDesc('');
  };

  return (
    <div
      className={`w-full min-h-screen bg-canvas flex flex-col justify-between overflow-y-auto select-none ${
        isArabic ? 'font-arabic' : 'font-sans'
      }`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-navy-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-emerald-500 flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-[13px] font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 1. Unified Top Header (72 px) */}
      <HeaderWorkspace
        currentScreen={isArabic ? 'S13_OpenDataPortal_AR' : 'S13_OpenDataPortal'}
        onNavigate={onNavigate}
        isArabic={isArabic}
      />

      {/* 2. Hero Section (300 px) */}
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
            {isArabic
              ? 'منشورة بموجب ترخيص أبوظبي للبيانات المفتوحة'
              : 'Published under the Abu Dhabi Sovereign Open Data Licence'}
          </div>
        </div>
      </div>

      {/* 3. Overlapping Stats Strip */}
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

      {/* 4. Trust Statement Line */}
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

      {/* 5. Popular Datasets */}
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
          {filteredDatasets.map((ds, idx) => {
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
                    onClick={(e) => handleDownloadDataset(ds, e)}
                    className="w-7 h-7 rounded-md bg-canvas hover:bg-emerald-50 hover:text-emerald-700 text-secondaryText flex items-center justify-center transition-colors"
                    title={isArabic ? 'تنزيل مجموعة البيانات' : 'Download Dataset (GeoJSON)'}
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5B. REAL INTERACTIVE GIS MAP SECTION: Explore Open Geodata on Live GIS Map */}
      <div className="max-w-[1200px] w-full mx-auto px-4 pt-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-[18px] font-bold text-navy-900 tracking-tight">
              {isArabic
                ? 'خريطة البيانات الجيومكانية المفتوحة التفاعلية'
                : 'Live Interactive Open Geodata Map'}
            </h2>
          </div>
          <button
            onClick={() => setShowLiveMap(!showLiveMap)}
            className="text-[12px] font-semibold text-blue-600 hover:underline flex items-center gap-1"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{showLiveMap ? (isArabic ? 'إخفاء الخريطة' : 'Hide Live Map') : (isArabic ? 'إظهار الخريطة' : 'Show Live Map')}</span>
          </button>
        </div>

        {showLiveMap && (
          <div className="h-[340px] rounded-2xl overflow-hidden border border-border shadow-level-2 relative">
            <InteractiveMap
              mode="catalogue"
              center={[24.4600, 54.3750]}
              zoom={12}
              className="w-full h-full"
            />
            {/* Overlay hint */}
            <div className="absolute top-3 left-3 z-[1000] bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-border text-[11px] text-navy-900 space-y-0.5 pointer-events-auto">
              <div className="font-bold flex items-center gap-1.5 text-emerald-700">
                <TreePine className="w-3.5 h-3.5" />
                <span>Abu Dhabi Open Spatial Features</span>
              </div>
              <div className="text-secondaryText text-[10px]">
                Explore live parks, recreational paths, and municipal open assets.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 6. Bottom Row: Developer Card (7 cols) + GeoHack & Actions (5 cols) */}
      <div className="max-w-[1200px] w-full mx-auto px-4 py-4 grid grid-cols-12 gap-5">
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
                id: 'API',
                title: isArabic ? 'واجهات البرمجة المفتوحة والتوثيق' : 'Open APIs & Interactive Documentation',
                desc: isArabic ? 'مواصفات OGC و REST endpoints مع أمثلة برمجية' : 'OGC Features, WFS & OpenAPI 3.0 sandboxes with code samples in Python & JS.',
                icon: Code2,
              },
              {
                id: 'TOOLKIT',
                title: isArabic ? 'حزمة الأدوات مفتوحة المصدر' : 'Open-Source Geospatial Toolkit',
                desc: isArabic ? 'مكتبات تحويل الإحداثيات وقوالب رسم الخرائط' : 'QGIS plugins, Python spatial ETL helpers, and React map widgets.',
                icon: BookOpen,
              },
              {
                id: 'GUIDE',
                title: isArabic ? 'دليل انضمام الجهات والمساهمين' : 'Entity Onboarding & Publishing Guide',
                desc: isArabic ? 'معايير النشر ومحددات ترخيص البيانات المفتوحة' : 'Standard operating procedures for qualifying public datasets.',
                icon: FileCheck2,
              },
            ].map((link, li) => {
              const Icon = link.icon;
              return (
                <div
                  key={li}
                  onClick={() => setActiveDevModal(link.id as any)}
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
            <button
              onClick={() => setShowGeoHackModal(true)}
              className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-lg text-[12px] font-bold shadow-sm transition-all flex-shrink-0"
            >
              {isArabic ? 'سجل الآن' : 'Register'}
            </button>
          </div>

          {/* White Card with Suggest Dataset & Report Data Issue */}
          <div className="bg-white rounded-xl border border-border p-3.5 flex items-center justify-between gap-3 shadow-level-1">
            <button
              onClick={() => setShowSuggestModal(true)}
              className="flex-1 py-2 rounded-lg bg-canvas hover:bg-slate-100 text-primaryText font-semibold text-[12px] border border-border transition-colors"
            >
              {isArabic ? 'اقترح مجموعة بيانات' : 'Suggest a dataset'}
            </button>
            <button
              onClick={() => setShowReportIssueModal(true)}
              className="flex-1 py-2 rounded-lg bg-canvas hover:bg-slate-100 text-secondaryText font-medium text-[12px] border border-border transition-colors"
            >
              {isArabic ? 'أبلغ عن ملاحظة جودة' : 'Report a data issue'}
            </button>
          </div>
        </div>
      </div>

      {/* 7. Public Footer (48 px) */}
      <FooterPublic isArabic={isArabic} />

      {/* MODAL 1: GeoHack Registration */}
      {showGeoHackModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-[480px] bg-white rounded-2xl border border-border shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                  GeoHack 2028 · Civic Innovation Challenge
                </span>
                <h3 className="text-[18px] font-bold text-navy-900 mt-1">
                  Register for Abu Dhabi GeoHack 2028
                </h3>
              </div>
              <button
                onClick={() => setShowGeoHackModal(false)}
                className="w-7 h-7 rounded-lg bg-canvas hover:bg-slate-200 flex items-center justify-center text-steel-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleGeoHackSubmit} className="space-y-3 text-[12px]">
              <div>
                <label className="block font-semibold text-primaryText mb-1">
                  Participant / Team Lead Name
                </label>
                <input
                  type="text"
                  value={geoHackName}
                  onChange={(e) => setGeoHackName(e.target.value)}
                  placeholder="e.g. Sultan Al-Nuaimi"
                  className="w-full h-9 px-3 rounded-lg border border-border text-[13px] text-primaryText focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-primaryText mb-1">
                  Corporate / Academic Email
                </label>
                <input
                  type="email"
                  value={geoHackEmail}
                  onChange={(e) => setGeoHackEmail(e.target.value)}
                  placeholder="name@university.ac.ae"
                  className="w-full h-9 px-3 rounded-lg border border-border text-[13px] text-primaryText focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-primaryText mb-1">Challenge Track</label>
                <select
                  value={geoHackTrack}
                  onChange={(e) => setGeoHackTrack(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-border text-[13px] text-primaryText focus:outline-none focus:border-blue-600 bg-white"
                >
                  <option value="Urban AI & Smart Mobility">Urban AI & Smart Mobility</option>
                  <option value="Environmental Conservation & Mangroves">
                    Environmental Conservation & Mangroves
                  </option>
                  <option value="Public Health & Active Living">
                    Public Health & Active Living
                  </option>
                  <option value="3D Digital Twin Civic Applications">
                    3D Digital Twin Civic Applications
                  </option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowGeoHackModal(false)}
                  className="px-4 py-2 rounded-xl bg-canvas hover:bg-slate-200 text-secondaryText font-semibold text-[12px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gold-500 hover:bg-amber-500 text-navy-900 font-bold text-[12px] shadow-sm transition-colors"
                >
                  Submit Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Suggest a Dataset */}
      {showSuggestModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-[480px] bg-white rounded-2xl border border-border shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900">
                  Open Data Governance
                </span>
                <h3 className="text-[18px] font-bold text-navy-900 mt-1">
                  Suggest a Public Spatial Dataset
                </h3>
              </div>
              <button
                onClick={() => setShowSuggestModal(false)}
                className="w-7 h-7 rounded-lg bg-canvas hover:bg-slate-200 flex items-center justify-center text-steel-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSuggestSubmit} className="space-y-3 text-[12px]">
              <div>
                <label className="block font-semibold text-primaryText mb-1">
                  Dataset Name / Theme
                </label>
                <input
                  type="text"
                  value={suggestTitle}
                  onChange={(e) => setSuggestTitle(e.target.value)}
                  placeholder="e.g. Electric Vehicle Charging Stations"
                  className="w-full h-9 px-3 rounded-lg border border-border text-[13px] text-primaryText focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-primaryText mb-1">
                  Target Government Custodian
                </label>
                <select
                  value={suggestEntity}
                  onChange={(e) => setSuggestEntity(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-border text-[13px] text-primaryText focus:outline-none focus:border-blue-600 bg-white"
                >
                  <option value="DMT - Municipalities">DMT · Dept. of Municipalities & Transport</option>
                  <option value="EAD - Environment">EAD · Environment Agency - Abu Dhabi</option>
                  <option value="DoH - Health">DoH · Department of Health</option>
                  <option value="ITC - Transport">ITC · Integrated Transport Centre</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-primaryText mb-1">
                  Proposed Public / Civic Use Case
                </label>
                <textarea
                  value={suggestDesc}
                  onChange={(e) => setSuggestDesc(e.target.value)}
                  rows={3}
                  placeholder="Explain why this dataset would benefit residents, researchers or developers..."
                  className="w-full p-2.5 rounded-lg border border-border text-[12px] text-primaryText focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowSuggestModal(false)}
                  className="px-4 py-2 rounded-xl bg-canvas hover:bg-slate-200 text-secondaryText font-semibold text-[12px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[12px] shadow-sm transition-colors"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Report Data Quality Issue */}
      {showReportIssueModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-[480px] bg-white rounded-2xl border border-border shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                  ISO 19157 Quality Feedback
                </span>
                <h3 className="text-[18px] font-bold text-navy-900 mt-1">
                  Report a Geospatial Data Issue
                </h3>
              </div>
              <button
                onClick={() => setShowReportIssueModal(false)}
                className="w-7 h-7 rounded-lg bg-canvas hover:bg-slate-200 flex items-center justify-center text-steel-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleReportIssueSubmit} className="space-y-3 text-[12px]">
              <div>
                <label className="block font-semibold text-primaryText mb-1">
                  Affected Dataset
                </label>
                <select
                  value={issueDataset}
                  onChange={(e) => setIssueDataset(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-border text-[13px] text-primaryText focus:outline-none focus:border-blue-600 bg-white"
                >
                  {popularDatasets.map((ds) => (
                    <option key={ds.id} value={ds.title}>
                      {ds.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-primaryText mb-1">
                  Issue Description & Coordinates
                </label>
                <textarea
                  value={issueDesc}
                  onChange={(e) => setIssueDesc(e.target.value)}
                  rows={3}
                  placeholder="Detail the topological gap, incorrect attribute, or positional discrepancy..."
                  className="w-full p-2.5 rounded-lg border border-border text-[12px] text-primaryText focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowReportIssueModal(false)}
                  className="px-4 py-2 rounded-xl bg-canvas hover:bg-slate-200 text-secondaryText font-semibold text-[12px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-[12px] shadow-sm transition-colors"
                >
                  Send Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: Developer Documentation & Sandbox */}
      {activeDevModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-[580px] bg-[#0E1E34] text-white rounded-2xl border border-white/20 shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300">
                  {activeDevModal === 'API'
                    ? 'OGC API Features V3'
                    : activeDevModal === 'TOOLKIT'
                    ? 'Abu Dhabi Spatial SDK'
                    : 'Publishing SOP'}
                </span>
                <h3 className="text-[18px] font-bold text-white mt-1">
                  {activeDevModal === 'API'
                    ? 'Interactive API Sandbox & Documentation'
                    : activeDevModal === 'TOOLKIT'
                    ? 'Open-Source Geospatial Toolkit'
                    : 'Entity Onboarding & Publishing Guide'}
                </h3>
              </div>
              <button
                onClick={() => setActiveDevModal(null)}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-steel-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {activeDevModal === 'API' && (
              <div className="space-y-3 text-[12px]">
                <div className="p-3 bg-black/40 rounded-xl border border-white/10 space-y-1 font-mono text-[11px]">
                  <div className="text-emerald-400"># Query Public Parks (GeoJSON)</div>
                  <div className="text-steel-300 break-all">
                    GET https://geoportal.abudhabi.ae/api/v3/collections/dmt:parks/items?limit=10
                  </div>
                </div>

                <div className="p-3 bg-black/40 rounded-xl border border-white/10 space-y-1 font-mono text-[11px]">
                  <div className="text-blue-400"># Python Sample Code</div>
                  <div className="text-steel-300 text-[10px] leading-tight">
                    {`import requests, geopandas as gpd
url = 'https://geoportal.abudhabi.ae/api/v3/collections/dmt:parks/items'
gdf = gpd.read_file(url)
print(f'Retrieved {len(gdf)} features with CRS: {gdf.crs}')`}
                  </div>
                </div>
              </div>
            )}

            {activeDevModal === 'TOOLKIT' && (
              <div className="space-y-2 text-[12px] text-steel-300">
                <p>
                  Download official Abu Dhabi coordinate transformation libraries (AD-UTM39N /
                  WGS84 EPSG:32639) and pre-configured QGIS styles:
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <span className="font-bold text-white block">QGIS Plugin Pack</span>
                    <span className="text-[10px] text-steel-400 block">Version 2.4 · 14 MB</span>
                    <button
                      onClick={() => showToast('Downloaded QGIS Abu Dhabi Plugin Pack')}
                      className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px] font-bold"
                    >
                      Download Plugin
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <span className="font-bold text-white block">Python GeoETL Helpers</span>
                    <span className="text-[10px] text-steel-400 block">pip install adsdi-geo</span>
                    <button
                      onClick={() => showToast('Copied pip command: pip install adsdi-geo')}
                      className="mt-2 px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-[11px] font-bold"
                    >
                      Copy Pip Cmd
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeDevModal === 'GUIDE' && (
              <div className="space-y-2 text-[12px] text-steel-300">
                <p>
                  Standard 4-step workflow for qualifying agency datasets for sovereign open data
                  release:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-white font-medium text-[11px]">
                  <li>Classify data sensitivity under UAE Federal Data Protection Law</li>
                  <li>Automate geometry topology validation against ISO 19157 standards</li>
                  <li>Draft bilateral Open Data Attribution SLA with DGE</li>
                  <li>Publish continuous OGC API Features synchronizer pipeline</li>
                </ol>
              </div>
            )}

            <div className="flex justify-end pt-2 border-t border-white/10">
              <button
                onClick={() => setActiveDevModal(null)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
