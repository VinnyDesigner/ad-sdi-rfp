import React, { useState } from 'react';
import { ScreenId } from '../types';
import { HeaderWorkspace } from '../components/common/HeaderWorkspace';
import { SidebarWorkspace } from '../components/common/SidebarWorkspace';
import { MicroFooter } from '../components/common/MicroFooter';
import { ClassificationBadge, AudienceChip } from '../components/common/BadgesAndPills';
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
} from 'lucide-react';

interface S08Props {
  onNavigate: (screen: ScreenId) => void;
}

export const S08_MarketplaceCatalogue: React.FC<S08Props> = ({ onNavigate }) => {
  const [selectedProductId, setSelectedProductId] = useState<number>(1); // Card 1 Building Footprints 3D selected
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<'included' | 'subscription'>('subscription');
  const [activeDrawerTab, setActiveDrawerTab] = useState('Overview');

  const products = [
    {
      id: 1,
      title: 'Building Footprints 3D (LOD2)',
      provider: 'DMT · Dept. of Municipalities & Transport',
      providerType: 'Government',
      classification: 'Shared' as const,
      licence: 'Commercial Subscription',
      accessModel: 'Subscription',
      subscribers: '128 active consumers',
      sla: 'SLA Tier 1 (99.9%)',
      desc: 'Extruded high-precision building geometry with roof structures and height attributes.',
      formats: ['3D Tiles', 'CityGML', 'OGC API'],
    },
    {
      id: 2,
      title: 'Land Parcels Real-Time API',
      provider: 'DMT · Dept. of Municipalities & Transport',
      providerType: 'Government',
      classification: 'Shared' as const,
      licence: 'Government & Partner',
      accessModel: 'Included',
      subscribers: '342 active consumers',
      sla: 'SLA Tier 1 (99.95%)',
      desc: 'Authoritative cadastral boundary feed updated nightly with deed registrations.',
      formats: ['OGC API Features', 'WFS', 'JSON'],
    },
    {
      id: 3,
      title: 'Population Grid 100 m Resolution',
      provider: 'SCAD · Statistics Centre Abu Dhabi',
      providerType: 'Government',
      classification: 'Shared' as const,
      licence: 'Government & Research',
      accessModel: 'Subscription',
      subscribers: '84 active consumers',
      sla: 'SLA Tier 2 (99.5%)',
      desc: 'Daytime and nighttime population estimates disaggregated to 100m spatial cells.',
      formats: ['GeoTIFF', 'CSV', 'REST'],
    },
    {
      id: 4,
      title: 'Mangrove Extent Time Series (2015–2027)',
      provider: 'EAD · Environment Agency – Abu Dhabi',
      providerType: 'Government',
      classification: 'Open' as const,
      licence: 'Open Data Licence',
      accessModel: 'Included',
      subscribers: '412 active consumers',
      sla: 'SLA Tier 2 (99.5%)',
      desc: 'Decadal satellite multi-spectral indices mapping coastal vegetation dynamics.',
      formats: ['Cloud Optimized GeoTIFF', 'GeoJSON'],
    },
    {
      id: 5,
      title: 'AI Change Detection Analytics Feed',
      provider: 'AD-SDI GeoAI Innovation Lab',
      providerType: 'Government',
      classification: 'Restricted' as const,
      licence: 'Commercial & Gov',
      accessModel: 'Pay-per-use',
      subscribers: '56 active consumers',
      sla: 'SLA Tier 1 (99.9%)',
      desc: 'Automated vector polygon feed alerting on new construction and demolitions.',
      formats: ['Webhook', 'Kafka Stream', 'GeoJSON'],
    },
    {
      id: 6,
      title: 'Rooftop Solar PV Potential Registry',
      provider: 'EcoSpatial UAE · Approved Partner',
      providerType: 'Partner',
      classification: 'Shared' as const,
      licence: 'Commercial Subscription',
      accessModel: 'Subscription',
      subscribers: '92 active consumers',
      sla: 'SLA Tier 2 (99.5%)',
      desc: 'Solar irradiance calculations and usable rooftop area for 240,000 structures.',
      formats: ['3D Tiles', 'REST API', 'CSV'],
    },
  ];

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
                <span className="text-blue-600 cursor-pointer font-normal">Reset</span>
              </div>

              {/* Product Type */}
              <div className="space-y-1.5">
                <div className="font-semibold text-secondaryText text-[11px] uppercase">Product Type</div>
                <label className="flex items-center gap-2 text-primaryText cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span>Datasets & Packages</span>
                </label>
                <label className="flex items-center gap-2 text-primaryText cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span>Services & Live APIs</span>
                </label>
                <label className="flex items-center gap-2 text-primaryText cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span>AI Outputs & Feeds</span>
                </label>
                <label className="flex items-center gap-2 text-primaryText cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span>Satellite Imagery</span>
                </label>
              </div>

              {/* Provider */}
              <div className="space-y-1.5 pt-2 border-t border-border">
                <div className="font-semibold text-secondaryText text-[11px] uppercase">Provider</div>
                <label className="flex items-center gap-2 text-primaryText cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span>Government Entity (DMT, EAD)</span>
                </label>
                <label className="flex items-center gap-2 text-primaryText cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                  <span>Approved Sovereign Partner</span>
                </label>
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

            {/* Product Grid (Flex, 2 columns × 3 rows = 6 cards) */}
            <div className="flex-1 p-5 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                {products.map((p) => {
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

                      {/* Footer Info: Formats + Subscribers + SLA (NO PRICES!) */}
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
            </div>

            {/* Detail Drawer (440 px open per spec) */}
            {drawerOpen && (
              <div className="w-[440px] border-l border-border bg-white p-5 flex flex-col justify-between overflow-y-auto flex-shrink-0 shadow-level-2">
                <div className="space-y-4">
                  {/* Hero 3D Render Thumbnail (180 px tall) */}
                  <div className="h-[170px] w-full bg-navy-900 rounded-xl overflow-hidden relative border border-border">
                    <svg viewBox="0 0 400 170" className="w-full h-full object-cover">
                      <rect width="400" height="170" fill="#0A1628" />
                      {/* 3D Isometric Buildings */}
                      <polygon points="120,130 160,110 160,40 120,60" fill="#1F5FAD" />
                      <polygon points="160,110 210,130 210,60 160,40" fill="#2BA6DE" />
                      <polygon points="120,60 160,40 210,60 170,80" fill="#7A9CC6" />

                      <polygon points="220,140 270,115 270,30 220,55" fill="#13315C" />
                      <polygon points="270,115 320,140 320,55 270,30" fill="#1F5FAD" />
                      <polygon points="220,55 270,30 320,55 270,80" fill="#FFC20E" opacity="0.8" />
                    </svg>
                    <div className="absolute top-3 left-3 bg-navy-900/90 text-white text-[10px] font-mono px-2 py-0.5 rounded border border-white/20">
                      LOD2 3D Model
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-[12px] font-bold text-white flex items-center justify-between">
                      <span>DMT Master Cadastre</span>
                      <span className="text-gold-500 font-mono">Quarterly Update</span>
                    </div>
                  </div>

                  {/* Title & Badges */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-navy-900 text-white">
                        Government
                      </span>
                      <ClassificationBadge classification="Shared" />
                      <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        SLA Tier 1
                      </span>
                    </div>
                    <h2 className="text-[18px] font-bold text-navy-900 tracking-tight">
                      Building Footprints 3D (LOD2)
                    </h2>
                    <div className="text-[12px] text-secondaryText">
                      Custodian: <strong className="text-primaryText">DMT</strong> · Coverage: Approved Pilot Areas
                    </div>
                  </div>

                  {/* Drawer Tabs */}
                  <div className="flex items-center gap-4 border-b border-border text-[12px]">
                    {['Overview', 'Licence', 'SLA', 'API', 'Usage'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setActiveDrawerTab(t)}
                        className={`pb-2 font-medium transition-colors ${
                          activeDrawerTab === t
                            ? 'text-blue-600 font-bold border-b-2 border-blue-600'
                            : 'text-secondaryText hover:text-navy-900'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  {/* Overview Facts */}
                  <div className="grid grid-cols-3 gap-2 text-[11px] bg-canvas p-2.5 rounded-lg border border-border">
                    <div>
                      <div className="text-secondaryText text-[10px]">Coverage</div>
                      <div className="font-bold text-primaryText">Pilot Areas</div>
                    </div>
                    <div>
                      <div className="text-secondaryText text-[10px]">Formats</div>
                      <div className="font-bold text-primaryText font-mono">3D Tiles · OGC</div>
                    </div>
                    <div>
                      <div className="text-secondaryText text-[10px]">Cadence</div>
                      <div className="font-bold text-primaryText">Quarterly</div>
                    </div>
                  </div>

                  {/* Quality Check row */}
                  <div className="flex items-center gap-2 text-[11px] text-emerald-800 bg-emerald-50/70 p-2 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Source dataset verified & quality-checked in Sovereign Clearinghouse</span>
                  </div>

                  {/* Radio Plan Cards (NO PRICES OR CURRENCIES PER SPEC!) */}
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
                        High-throughput 3D streaming quota with SLA guarantee for approved partners.
                      </p>
                    </div>
                  </div>

                  {/* 3 Licence Bullets */}
                  <div className="space-y-1 text-[11px] text-secondaryText">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-steel-500" />
                      <span>Authorized for internal spatial analysis & rendering</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-steel-500" />
                      <span>Redistribution to third parties strictly governed</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-steel-500" />
                      <span>Data residency compliance audited under UAE Federal Laws</span>
                    </div>
                  </div>
                </div>

                {/* Drawer Footer Actions */}
                <div className="pt-4 border-t border-border space-y-2">
                  <button
                    onClick={() => onNavigate('S09a_MarketplaceRequest')}
                    className="w-full h-[42px] bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[13px] font-semibold transition-all shadow-level-1 flex items-center justify-center gap-2"
                  >
                    <span>Request Access</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onNavigate('S10_DigitalTwin3d')}
                    className="w-full h-[36px] bg-canvas hover:bg-slate-100 text-primaryText border border-border rounded-lg text-[12px] font-medium"
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
    </div>
  );
};
