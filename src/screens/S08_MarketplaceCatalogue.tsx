import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';
import { HeaderWorkspace } from '../components/common/HeaderWorkspace';
import { SidebarWorkspace } from '../components/common/SidebarWorkspace';
import { MicroFooter } from '../components/common/MicroFooter';
import { ClassificationBadge, AudienceChip } from '../components/common/BadgesAndPills';
import { InteractiveMap } from '../components/common/InteractiveMap';
import { PERSONAS } from '../constants/tokens';
import {
  Search,
  SlidersHorizontal,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Check,
  X,
  Building,
  Layers,
  Sparkles,
  Sun,
  Users,
  Eye,
  Copy,
  Code2,
  Map as MapIcon,
} from 'lucide-react';

interface S08Props {
  onNavigate: (screen: ScreenId) => void;
}

export const S08_MarketplaceCatalogue: React.FC<S08Props> = ({ onNavigate }) => {
  const [selectedProductId, setSelectedProductId] = useState<number>(1);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'included' | 'subscription'>('subscription');
  const [activeDrawerTab, setActiveDrawerTab] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Filter States
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Datasets & Packages', 'Services & Live APIs', 'AI Outputs & Feeds']);
  const [selectedProviders, setSelectedProviders] = useState<string[]>(['Government Entity (DMT, EAD)', 'Approved Sovereign Partner']);

  // Handle Escape key to cleanly exit fullscreen map mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMapFullscreen) {
        setIsMapFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMapFullscreen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const products = [
    {
      id: 1,
      title: 'Building Footprints 3D (LOD2)',
      provider: 'DMT · Dept. of Municipalities & Transport',
      providerType: 'Government',
      typeCategory: 'Datasets & Packages',
      classification: 'Shared' as const,
      licence: 'Commercial Subscription',
      accessModel: 'Subscription',
      subscribers: '128 active consumers',
      sla: 'SLA Tier 1 (99.9%)',
      desc: 'Extruded high-precision building geometry with roof structures and height attributes.',
      formats: ['3D Tiles', 'CityGML', 'OGC API'],
      mapMode: 'parcels' as const,
    },
    {
      id: 2,
      title: 'Land Parcels Real-Time API',
      provider: 'DMT · Dept. of Municipalities & Transport',
      providerType: 'Government',
      typeCategory: 'Services & Live APIs',
      classification: 'Shared' as const,
      licence: 'Government & Partner',
      accessModel: 'Included',
      subscribers: '342 active consumers',
      sla: 'SLA Tier 1 (99.95%)',
      desc: 'Authoritative cadastral boundary feed updated nightly with deed registrations.',
      formats: ['OGC API Features', 'WFS', 'JSON'],
      mapMode: 'parcels' as const,
    },
    {
      id: 3,
      title: 'Population Grid 100 m Resolution',
      provider: 'SCAD · Statistics Centre Abu Dhabi',
      providerType: 'Government',
      typeCategory: 'Datasets & Packages',
      classification: 'Shared' as const,
      licence: 'Government & Research',
      accessModel: 'Subscription',
      subscribers: '84 active consumers',
      sla: 'SLA Tier 2 (99.5%)',
      desc: 'Daytime and nighttime population estimates disaggregated to 100m spatial cells.',
      formats: ['GeoTIFF', 'CSV', 'REST'],
      mapMode: 'simple' as const,
    },
    {
      id: 4,
      title: 'Mangrove Extent Time Series (2015–2027)',
      provider: 'EAD · Environment Agency – Abu Dhabi',
      providerType: 'Government',
      typeCategory: 'Datasets & Packages',
      classification: 'Open' as const,
      licence: 'Open Data Licence',
      accessModel: 'Included',
      subscribers: '412 active consumers',
      sla: 'SLA Tier 2 (99.5%)',
      desc: 'Decadal satellite multi-spectral indices mapping coastal vegetation dynamics.',
      formats: ['Cloud Optimized GeoTIFF', 'GeoJSON'],
      mapMode: 'simple' as const,
    },
    {
      id: 5,
      title: 'AI Change Detection Analytics Feed',
      provider: 'AD-SDI GeoAI Innovation Lab',
      providerType: 'Government',
      typeCategory: 'AI Outputs & Feeds',
      classification: 'Restricted' as const,
      licence: 'Commercial & Gov',
      accessModel: 'Pay-per-use',
      subscribers: '56 active consumers',
      sla: 'SLA Tier 1 (99.9%)',
      desc: 'Automated vector polygon feed alerting on new construction and demolitions.',
      formats: ['Webhook', 'Kafka Stream', 'GeoJSON'],
      mapMode: 'geoai' as const,
    },
    {
      id: 6,
      title: 'Rooftop Solar PV Potential Registry',
      provider: 'EcoSpatial UAE · Approved Partner',
      providerType: 'Partner',
      typeCategory: 'Datasets & Packages',
      classification: 'Shared' as const,
      licence: 'Commercial Subscription',
      accessModel: 'Subscription',
      subscribers: '92 active consumers',
      sla: 'SLA Tier 2 (99.5%)',
      desc: 'Solar irradiance calculations and usable rooftop area for 240,000 structures.',
      formats: ['3D Tiles', 'REST API', 'CSV'],
      mapMode: 'parcels' as const,
    },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(p.typeCategory);
    const matchesProvider =
      selectedProviders.length === 0 ||
      (selectedProviders.includes('Government Entity (DMT, EAD)') && p.providerType === 'Government') ||
      (selectedProviders.includes('Approved Sovereign Partner') && p.providerType === 'Partner');

    return matchesSearch && matchesType && matchesProvider;
  });

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  return (
    <div className="w-full h-screen bg-canvas flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Top Bar with Omar R. partner persona */}
      <HeaderWorkspace
        currentScreen="S08_MarketplaceCatalogue"
        onNavigate={onNavigate}
        persona={PERSONAS.omar}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* 2. Left Sidebar (Marketplace Active) */}
        <SidebarWorkspace currentScreen="S08_MarketplaceCatalogue" onNavigate={onNavigate} />

        {/* 3. Main Workspace Area */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-canvas">
          {/* Page Header */}
          <div className="px-8 pt-4 pb-3 bg-white border-b border-border flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-[24px] font-bold text-navy-900 tracking-tight">
                  Geospatial Marketplace
                </h1>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-teal-100 text-teal-800 border border-teal-200">
                  Module C · Products
                </span>
              </div>
              <p className="text-[13px] text-secondaryText">
                Trusted data products and services from government and approved partners.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Entitlements & Provider Links */}
              <button
                onClick={() => onNavigate('S09b_MyEntitlements')}
                className="px-3 py-1.5 rounded-lg border border-border bg-canvas hover:bg-slate-100 text-[12px] font-semibold text-primaryText"
              >
                My Entitlements (5)
              </button>
              <button
                onClick={() => onNavigate('S09c_ProviderWorkspace')}
                className="px-3 py-1.5 rounded-lg border border-border bg-canvas hover:bg-slate-100 text-[12px] font-semibold text-primaryText"
              >
                Provider Portal
              </button>

              {/* Search Field (400 px) */}
              <div className="relative w-[340px]">
                <Search className="w-4 h-4 text-steel-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search products, APIs, 3D models…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-[38px] pl-9 pr-3 rounded-lg border border-border bg-canvas text-[13px] text-primaryText focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Body: Filter Rail (240) · Grid (Flex) · Detail Drawer (440 Open) */}
          <div className="flex-1 flex overflow-hidden">
            {/* Filter Rail (240 px) */}
            <div className="w-[240px] border-r border-border bg-white p-4 space-y-4 overflow-y-auto flex-shrink-0 text-[12px]">
              <div className="flex items-center justify-between font-bold text-navy-900 uppercase tracking-wider text-[11px]">
                <span>Filters</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTypes(['Datasets & Packages', 'Services & Live APIs', 'AI Outputs & Feeds']);
                    setSelectedProviders(['Government Entity (DMT, EAD)', 'Approved Sovereign Partner']);
                    setSearchQuery('');
                    showToast('Reset all marketplace filters');
                  }}
                  className="text-blue-600 hover:underline cursor-pointer font-normal text-[11px]"
                >
                  Reset
                </button>
              </div>

              {/* Product Type */}
              <div className="space-y-1.5">
                <div className="font-semibold text-secondaryText text-[11px] uppercase">Product Type</div>
                {['Datasets & Packages', 'Services & Live APIs', 'AI Outputs & Feeds', 'Satellite Imagery'].map((t) => (
                  <label key={t} className="flex items-center gap-2 text-primaryText cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(t)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedTypes([...selectedTypes, t]);
                        else setSelectedTypes(selectedTypes.filter((x) => x !== t));
                      }}
                      className="rounded text-blue-600 cursor-pointer"
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>

              {/* Provider */}
              <div className="space-y-1.5 pt-2 border-t border-border">
                <div className="font-semibold text-secondaryText text-[11px] uppercase">Provider</div>
                {['Government Entity (DMT, EAD)', 'Approved Sovereign Partner'].map((p) => (
                  <label key={p} className="flex items-center gap-2 text-primaryText cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedProviders.includes(p)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedProviders([...selectedProviders, p]);
                        else setSelectedProviders(selectedProviders.filter((x) => x !== p));
                      }}
                      className="rounded text-blue-600 cursor-pointer"
                    />
                    <span>{p}</span>
                  </label>
                ))}
              </div>

              {/* Licence */}
              <div className="space-y-1.5 pt-2 border-t border-border">
                <div className="font-semibold text-secondaryText text-[11px] uppercase">Licence Model</div>
                <label className="flex items-center gap-2 text-primaryText cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span>Government-only</span>
                </label>
                <label className="flex items-center gap-2 text-primaryText cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span>Commercial Subscription</span>
                </label>
                <label className="flex items-center gap-2 text-primaryText cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span>Open Data License</span>
                </label>
              </div>

              {/* Access Model */}
              <div className="space-y-1.5 pt-2 border-t border-border">
                <div className="font-semibold text-secondaryText text-[11px] uppercase">Access Model</div>
                <label className="flex items-center gap-2 text-primaryText cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span>Included in Governance</span>
                </label>
                <label className="flex items-center gap-2 text-primaryText cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span>Monthly Subscription</span>
                </label>
                <label className="flex items-center gap-2 text-primaryText cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span>Metered Pay-per-use</span>
                </label>
              </div>
            </div>

            {/* Product Grid (Flex, 2 columns × 3 rows) */}
            <div className="flex-1 p-5 overflow-y-auto">
              {filteredProducts.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center p-8 bg-white rounded-xl border border-border">
                  <Building className="w-10 h-10 text-steel-400 mb-2" />
                  <div className="font-bold text-navy-900 text-[15px]">No products match current filters</div>
                  <p className="text-[12px] text-secondaryText mt-1">Try resetting your filter selection or search query.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {filteredProducts.map((p) => {
                    const isSelected = selectedProductId === p.id;

                    return (
                      <div
                        key={p.id}
                        onClick={() => {
                          setSelectedProductId(p.id);
                          setDrawerOpen(true);
                        }}
                        className={`h-[240px] bg-white rounded-xl border p-4 flex flex-col justify-between cursor-pointer transition-all shadow-level-1 relative ${
                          isSelected
                            ? 'border-2 border-blue-600 ring-2 ring-blue-600/20'
                            : 'border-border hover:border-steel-400'
                        }`}
                      >
                        <div>
                          {/* Header: Provider badge & classification */}
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                p.providerType === 'Government'
                                  ? 'bg-navy-900 text-white'
                                  : 'bg-teal-700 text-white'
                              }`}
                            >
                              {p.providerType}
                            </span>
                            <ClassificationBadge classification={p.classification} />
                          </div>

                          {/* Title & Provider */}
                          <h3 className="text-[14px] font-bold text-navy-900 leading-snug">
                            {p.title}
                          </h3>
                          <div className="text-[11px] text-steel-500 mt-0.5">
                            {p.provider}
                          </div>

                          <p className="text-[12px] text-secondaryText line-clamp-2 mt-2 leading-relaxed">
                            {p.desc}
                          </p>
                        </div>

                        {/* Footer Info: Formats + Subscribers + SLA */}
                        <div className="space-y-1.5 pt-2 border-t border-border">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {p.formats.map((f, fi) => (
                              <span
                                key={fi}
                                className="px-1.5 py-0.2 rounded bg-canvas text-secondaryText font-mono text-[9px] border border-border"
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-secondaryText">
                            <span>{p.subscribers}</span>
                            <span className="font-semibold text-emerald-700">{p.sla}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Detail Drawer (440 px open per spec) */}
            {drawerOpen && (
              <div className="w-[440px] border-l border-border bg-white p-5 flex flex-col justify-between overflow-y-auto flex-shrink-0 shadow-level-2">
                <div className="space-y-4">
                  {/* Real Interactive Leaflet GIS Map with prominent preview height & full viewport expansion */}
                  <div
                    className={`transition-all duration-300 ${
                      isMapFullscreen
                        ? 'fixed inset-0 z-[9999] w-screen h-screen bg-[#0A1628]'
                        : 'h-[310px] w-full rounded-xl overflow-hidden relative border border-border bg-[#0A1628] shadow-sm'
                    }`}
                  >
                    <InteractiveMap
                      mode={selectedProduct.mapMode}
                      isDarkTheme={true}
                      isFullscreen={isMapFullscreen}
                      onToggleFullscreen={() => setIsMapFullscreen((prev) => !prev)}
                      showSearchThisArea={isMapFullscreen}
                      hideLegend={!isMapFullscreen}
                      className="w-full h-full"
                    />

                    {/* Compact Live Stream badge in drawer preview */}
                    {!isMapFullscreen && (
                      <div className="absolute top-3 left-3 bg-navy-950/85 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-md border border-white/20 z-10 pointer-events-none flex items-center gap-1.5 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="font-semibold text-white">Live GIS Stream</span>
                        <span className="text-white/40">|</span>
                        <span className="text-gold-400 font-sans text-[11px] font-medium">{selectedProduct.title.split(' ')[0]}</span>
                      </div>
                    )}

                    {/* Fullscreen HUD & Exit Controls */}
                    {isMapFullscreen && (
                      <div className="absolute top-4 left-4 z-30 flex items-center gap-3">
                        <div className="bg-navy-950/90 backdrop-blur-md text-white text-xs font-mono px-3.5 py-2 rounded-lg border border-white/20 shadow-xl flex items-center gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span className="font-bold text-white tracking-wide text-sm">{selectedProduct.title}</span>
                          <span className="text-white/30">|</span>
                          <span className="text-gold-400 font-sans text-xs">{selectedProduct.provider}</span>
                          <span className="text-white/30">|</span>
                          <span className="text-emerald-400 text-xs font-mono">{selectedProduct.sla}</span>
                        </div>
                        <button
                          onClick={() => setIsMapFullscreen(false)}
                          className="h-9 bg-white/95 hover:bg-white text-navy-900 shadow-xl backdrop-blur px-3.5 rounded-lg border border-border text-[12px] font-bold flex items-center gap-1.5 transition-all cursor-pointer hover:text-rose-600"
                          title="Exit Fullscreen (Esc)"
                        >
                          <X className="w-4 h-4 text-rose-600" />
                          <span>Exit Fullscreen</span>
                          <kbd className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 ml-1 font-mono">Esc</kbd>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Title & Badges */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        selectedProduct.providerType === 'Government' ? 'bg-navy-900 text-white' : 'bg-teal-700 text-white'
                      }`}>
                        {selectedProduct.providerType}
                      </span>
                      <ClassificationBadge classification={selectedProduct.classification} />
                      <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {selectedProduct.sla.split(' ')[0]} {selectedProduct.sla.split(' ')[1]}
                      </span>
                    </div>
                    <h2 className="text-[17px] font-bold text-navy-900 tracking-tight leading-snug">
                      {selectedProduct.title}
                    </h2>
                    <div className="text-[12px] text-secondaryText">
                      Custodian: <strong className="text-primaryText">{selectedProduct.provider.split('·')[0]}</strong> · Coverage: Emirate of Abu Dhabi
                    </div>
                  </div>

                  {/* Drawer Tabs */}
                  <div className="flex items-center gap-4 border-b border-border text-[12px]">
                    {['Overview', 'Licence', 'SLA', 'API', 'Usage'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setActiveDrawerTab(t)}
                        className={`pb-2 font-medium transition-colors cursor-pointer ${
                          activeDrawerTab === t
                            ? 'text-blue-600 font-bold border-b-2 border-blue-600'
                            : 'text-secondaryText hover:text-navy-900'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  {/* Tab 1: Overview */}
                  {activeDrawerTab === 'Overview' && (
                    <div className="space-y-3">
                      {/* Overview Facts */}
                      <div className="grid grid-cols-3 gap-2 text-[11px] bg-canvas p-2.5 rounded-lg border border-border">
                        <div>
                          <div className="text-secondaryText text-[10px]">Coverage</div>
                          <div className="font-bold text-primaryText">Abu Dhabi & Al Ain</div>
                        </div>
                        <div>
                          <div className="text-secondaryText text-[10px]">Formats</div>
                          <div className="font-bold text-primaryText font-mono truncate">{selectedProduct.formats.join(' · ')}</div>
                        </div>
                        <div>
                          <div className="text-secondaryText text-[10px]">Cadence</div>
                          <div className="font-bold text-primaryText">Nightly Sync</div>
                        </div>
                      </div>

                      {/* Quality Check row */}
                      <div className="flex items-center gap-2 text-[11px] text-emerald-800 bg-emerald-50/70 p-2 rounded-lg border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Source dataset verified & quality-checked in Sovereign Clearinghouse</span>
                      </div>

                      {/* Radio Plan Cards */}
                      <div className="space-y-2">
                        <div className="text-[11px] font-bold text-secondaryText uppercase tracking-wider">
                          Available Access Plans
                        </div>

                        <div
                          onClick={() => setSelectedPlan('included')}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedPlan === 'included'
                              ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
                              : 'border-border bg-white hover:bg-canvas'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[12px]">
                            <span className="font-bold text-navy-900">Government Entity Access</span>
                            <span className="text-[11px] font-bold text-blue-600">Included</span>
                          </div>
                          <p className="text-[11px] text-secondaryText mt-0.5">
                            Statutory access for Abu Dhabi government entities under DSA agreement.
                          </p>
                        </div>

                        <div
                          onClick={() => setSelectedPlan('subscription')}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedPlan === 'subscription'
                              ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
                              : 'border-border bg-white hover:bg-canvas'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[12px]">
                            <span className="font-bold text-navy-900">Commercial & Partner Plan</span>
                            <span className="text-[11px] font-bold text-purple-700">Enterprise Subscription</span>
                          </div>
                          <p className="text-[11px] text-secondaryText mt-0.5">
                            High-throughput streaming quota with SLA guarantee for approved partners.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Licence */}
                  {activeDrawerTab === 'Licence' && (
                    <div className="space-y-2.5 text-[11px]">
                      <div className="p-3 rounded-lg bg-canvas border border-border space-y-1.5">
                        <div className="font-bold text-navy-900 text-[12px]">Abu Dhabi Sovereign Data Usage Agreement</div>
                        <p className="text-secondaryText leading-relaxed">
                          Authorizes internal geospatial processing, analytical modeling and cartographic rendering across enterprise departments.
                        </p>
                      </div>
                      <div className="space-y-1 text-secondaryText">
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Redistribution to third parties strictly governed under DSA-2027</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Audited under UAE Federal Decree Law No. 45 (Data Protection)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Strict sovereign cloud hosting within UAE national borders</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 3: SLA */}
                  {activeDrawerTab === 'SLA' && (
                    <div className="space-y-3 text-[11px]">
                      <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-200 space-y-1">
                        <div className="flex justify-between font-bold text-emerald-900 text-[12px]">
                          <span>Availability SLA</span>
                          <span className="font-mono">99.95% Guaranteed</span>
                        </div>
                        <p className="text-emerald-800 text-[10px]">
                          Automated multi-region active-active cluster across Abu Dhabi government datacentres.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-secondaryText">
                        <div className="p-2 rounded bg-canvas border border-border">
                          <div className="text-[10px]">P1 Response Time</div>
                          <div className="font-bold text-primaryText font-mono">&lt; 15 minutes</div>
                        </div>
                        <div className="p-2 rounded bg-canvas border border-border">
                          <div className="text-[10px]">Planned Maintenance</div>
                          <div className="font-bold text-primaryText font-mono">Sundays 02:00 GST</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 4: API */}
                  {activeDrawerTab === 'API' && (
                    <div className="space-y-2 text-[11px]">
                      <div className="flex items-center justify-between text-secondaryText">
                        <span className="font-bold text-navy-900">OGC API Features / REST</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `curl -X GET "https://api.sdi.abudhabi.ae/v3/collections/product-${selectedProduct.id}/items" -H "X-API-Key: adsdi_live_secret"`
                            );
                            setCopiedCode(true);
                            setTimeout(() => setCopiedCode(false), 2000);
                            showToast('Copied curl command to clipboard');
                          }}
                          className="text-blue-600 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedCode ? 'Copied!' : 'Copy snippet'}</span>
                        </button>
                      </div>
                      <pre className="p-3 rounded-xl bg-navy-900 text-emerald-400 font-mono text-[10px] overflow-x-auto leading-relaxed border border-white/10">
{`curl -X GET "https://api.sdi.abudhabi.ae/v3/collections/${selectedProduct.id}/items?limit=10" \\
  -H "X-API-Key: adsdi_live_${selectedProduct.id}99f2b84e" \\
  -H "Accept: application/geo+json"`}
                      </pre>
                    </div>
                  )}

                  {/* Tab 5: Usage */}
                  {activeDrawerTab === 'Usage' && (
                    <div className="space-y-2.5 text-[11px]">
                      <div className="p-2.5 rounded-lg bg-canvas border border-border space-y-1">
                        <div className="flex justify-between text-secondaryText">
                          <span>Active Subscribers:</span>
                          <strong className="font-mono text-primaryText">{selectedProduct.subscribers}</strong>
                        </div>
                        <div className="flex justify-between text-secondaryText">
                          <span>Monthly API Volume:</span>
                          <strong className="font-mono text-primaryText">1,480,000 requests</strong>
                        </div>
                        <div className="flex justify-between text-secondaryText">
                          <span>Median Latency:</span>
                          <strong className="font-mono text-emerald-600">38 ms</strong>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Drawer Footer Actions */}
                <div className="pt-4 border-t border-border space-y-2">
                  <button
                    onClick={() => {
                      showToast(`Navigating to Access Request for "${selectedProduct.title}"`);
                      onNavigate('S09a_MarketplaceRequest');
                    }}
                    className="w-full h-[42px] bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[13px] font-semibold transition-all shadow-level-1 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Access</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onNavigate('S10_DigitalTwin3d')}
                    className="w-full h-[36px] bg-canvas hover:bg-slate-100 text-primaryText border border-border rounded-lg text-[12px] font-medium cursor-pointer"
                  >
                    Preview Sample in Digital Twin
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Micro Footer */}
          <MicroFooter />
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
