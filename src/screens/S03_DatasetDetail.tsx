import React, { useState } from 'react';
import { ScreenId } from '../types';
import { HeaderWorkspace } from '../components/common/HeaderWorkspace';
import { SidebarWorkspace } from '../components/common/SidebarWorkspace';
import {
  ChevronRight,
  ShieldCheck,
  Check,
  Copy,
  Share2,
  Search,
  Filter,
  Plus,
  Minus,
  Layers,
  Crosshair,
  Maximize2,
  Download,
  ExternalLink,
  Table,
  CheckCircle2,
  Globe,
  Radio,
  FileCode,
  Sparkles,
  LayoutGrid,
} from 'lucide-react';

interface S03Props {
  onNavigate: (screen: ScreenId) => void;
}

export const S03_DatasetDetail: React.FC<S03Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [copied, setCopied] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const tabs = [
    'Overview',
    'Metadata',
    'Services & APIs',
    'Quality',
    'Lineage',
    'Access',
    'Versions',
    'Audit Trail',
  ];

  const handleCopyUrl = () => {
    navigator.clipboard?.writeText('https://api.sdi.abudhabi.ae/v1/features/cadastre/parcels');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-screen bg-[#F8FAFC] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Workspace Top Bar (64 px) */}
      <HeaderWorkspace currentScreen="S03_DatasetDetail" onNavigate={onNavigate} />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* 2. Workspace Sidebar (230 px) */}
        <SidebarWorkspace currentScreen="S03_DatasetDetail" onNavigate={onNavigate} />

        {/* 3. Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#F8FAFC]">
          {/* Top Title & Action Header */}
          <div className="bg-white border-b border-[#E2E8F0] px-7 pt-4 pb-0 flex flex-col gap-3">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-[12px] text-[#64748B]">
              <span
                className="cursor-pointer hover:text-[#0F396B] transition-colors"
                onClick={() => onNavigate('S02_CatalogueSearch')}
              >
                Catalogue
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span
                className="cursor-pointer hover:text-[#0F396B] transition-colors"
                onClick={() => onNavigate('S02_CatalogueSearch')}
              >
                Datasets
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span className="text-[#1E293B] font-semibold">Land Parcels (Cadastre)</span>
            </div>

            {/* Title Row + Actions */}
            <div className="flex items-start justify-between">
              {/* Left Title & Metadata */}
              <div className="flex items-start gap-3.5">
                {/* Thumbnail Icon */}
                <div className="w-12 h-12 rounded-lg border border-[#CBD5E1] overflow-hidden flex-shrink-0 relative shadow-sm">
                  <img
                    src="/images/khalifa_city_cadastre.jpg"
                    alt="Cadastre Thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#0F396B]/20 border border-blue-400/40 rounded-lg pointer-events-none" />
                </div>

                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-[20px] font-bold text-[#0F172A] tracking-tight">
                      Land Parcels (Cadastre)
                    </h1>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#EDF9F1] text-[#1E9E6A] border border-[#BDE8D1]">
                      <CheckCircle2 className="w-3 h-3 text-[#1E9E6A]" />
                      Authoritative
                    </span>
                  </div>

                  <p className="text-[12px] text-[#64748B] mt-0.5">
                    Official land parcel boundaries for the Emirate of Abu Dhabi, maintained by the Department of Municipalities and Transport.
                  </p>

                  {/* Metadata chips */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
                      <LayoutGrid className="w-3 h-3 text-[#64748B]" />
                      Land & Cadastre
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
                      Vector (GPKG)
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#F3EEFA] text-[#7A36CB] border border-[#E1D1F5]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7A36CB]" />
                      Official – Government
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#EDF9F1] text-[#1E9E6A] border border-[#BDE8D1]">
                      <Check className="w-3 h-3 text-[#1E9E6A]" />
                      Public (with agreement)
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#EDF9F1] text-[#1E9E6A] border border-[#BDE8D1]">
                      <ShieldCheck className="w-3 h-3 text-[#1E9E6A]" />
                      High Quality
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('S02_CatalogueSearch')}
                    className="px-4 py-2 bg-[#1865C9] hover:bg-[#1354A8] text-white rounded-lg text-[13px] font-semibold flex items-center gap-2 shadow-sm transition-all"
                  >
                    <Layers className="w-4 h-4" />
                    <span>Add to map</span>
                  </button>
                  <button
                    onClick={() => onNavigate('S09a_MarketplaceRequest')}
                    className="px-3.5 py-2 bg-white hover:bg-slate-50 text-[#1E293B] border border-[#CBD5E1] rounded-lg text-[13px] font-semibold transition-all shadow-2xs"
                  >
                    Request access
                  </button>
                  <button className="px-2.5 py-2 bg-white hover:bg-slate-50 text-[#64748B] border border-[#CBD5E1] rounded-lg text-[13px]">
                    ⋯
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyUrl}
                    className="px-2.5 py-1 bg-white hover:bg-slate-50 text-[#475569] border border-[#CBD5E1] rounded-md text-[11px] font-medium flex items-center gap-1.5 shadow-2xs"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#64748B]" />
                    <span>{copied ? 'Copied URL!' : 'Copy API URL'}</span>
                  </button>
                  <button className="px-2.5 py-1 bg-white hover:bg-slate-50 text-[#475569] border border-[#CBD5E1] rounded-md text-[11px] font-medium flex items-center gap-1.5 shadow-2xs">
                    <Share2 className="w-3.5 h-3.5 text-[#64748B]" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-7 border-t border-[#E2E8F0] pt-2 text-[13px]">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2.5 font-medium transition-all relative ${
                    activeTab === tab
                      ? 'text-[#1865C9] font-bold border-b-2 border-[#1865C9]'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Workspace Body Grid: 2 Columns */}
          <div className="flex-1 px-6 py-3.5 grid grid-cols-12 gap-4 overflow-hidden">
            {/* Left 8-col Area */}
            <div className="col-span-8 flex flex-col gap-3">
              {/* 1. Dataset Preview Card */}
              <div className="space-y-1">
                <div className="text-[12px] font-bold text-[#0F172A]">Dataset preview</div>
                <div className="h-[215px] bg-slate-900 rounded-xl border border-[#CBD5E1] overflow-hidden relative shadow-sm">
                  {/* Aerial Imagery Map Background */}
                  <img
                    src="/images/khalifa_city_cadastre.jpg"
                    alt="Khalifa City Cadastre Aerial"
                    className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05]"
                  />

                  {/* SVG Vector Cadastral Layer Overlays */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* General parcel boundary mesh in translucent cyan */}
                    <polygon
                      points="120,40 280,35 340,90 320,180 180,210 110,130"
                      fill="rgba(56, 189, 248, 0.16)"
                      stroke="#38BDF8"
                      strokeWidth="1.5"
                    />
                    <polygon
                      points="340,90 520,80 570,160 520,230 380,220 320,180"
                      fill="rgba(56, 189, 248, 0.18)"
                      stroke="#38BDF8"
                      strokeWidth="1.5"
                    />
                    <polygon
                      points="180,210 320,180 380,220 340,260 210,260"
                      fill="rgba(56, 189, 248, 0.14)"
                      stroke="#38BDF8"
                      strokeWidth="1.2"
                    />

                    {/* Selected Active Golden Parcel */}
                    <polygon
                      points="330,135 410,130 425,185 345,190"
                      fill="rgba(245, 158, 11, 0.35)"
                      stroke="#F59E0B"
                      strokeWidth="2.5"
                      className="animate-pulse"
                    />
                  </svg>

                  {/* Geographic bilingual island labels on map */}
                  <div className="absolute top-6 right-28 pointer-events-none text-right">
                    <span className="text-[12px] font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] block">
                      Yas Island
                    </span>
                    <span className="text-[10px] text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-arabic block -mt-0.5">
                      جزيرة ياس
                    </span>
                  </div>

                  <div className="absolute top-24 right-44 pointer-events-none text-right">
                    <span className="text-[12px] font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] block">
                      Masdar City
                    </span>
                    <span className="text-[10px] text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-arabic block -mt-0.5">
                      مدينة مصدر
                    </span>
                  </div>

                  <div className="absolute bottom-16 left-32 pointer-events-none text-left">
                    <span className="text-[13px] font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] block">
                      Khalifa City
                    </span>
                    <span className="text-[11px] text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-arabic block -mt-0.5">
                      مدينة خليفة
                    </span>
                  </div>

                  {/* Floating Map Search Input (Top-Left) */}
                  <div className="absolute top-3 left-3 w-[180px] bg-white/95 backdrop-blur-md rounded-lg shadow-md border border-slate-200/80 px-2.5 py-1.5 flex items-center justify-between text-[11px] text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-400">Search location...</span>
                    </div>
                    <Filter className="w-3 h-3 text-slate-400" />
                  </div>

                  {/* Floating Layers Panel (Inside Map) */}
                  <div className="absolute top-12 left-3 w-[180px] bg-[#0B1E38]/90 backdrop-blur-md text-white rounded-lg shadow-lg border border-white/10 p-2.5 text-[11px] space-y-1.5">
                    <div className="flex items-center justify-between pb-1 border-b border-white/10 font-semibold text-[11px]">
                      <span>Layers (3)</span>
                      <span className="text-[10px] text-slate-400 cursor-pointer">⋯</span>
                    </div>

                    <div className="space-y-1 text-[11px]">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input type="checkbox" defaultChecked className="accent-blue-500 w-3 h-3 rounded" />
                          <span>Land Parcels</span>
                        </label>
                        <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
                      </div>
                      <label className="flex items-center gap-1.5 text-slate-400 cursor-pointer">
                        <input type="checkbox" className="accent-blue-500 w-3 h-3 rounded" />
                        <span>Buildings</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-slate-400 cursor-pointer">
                        <input type="checkbox" className="accent-blue-500 w-3 h-3 rounded" />
                        <span>Roads</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-slate-400 cursor-pointer">
                        <input type="checkbox" className="accent-blue-500 w-3 h-3 rounded" />
                        <span>Administrative Boundaries</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="checkbox" defaultChecked className="accent-blue-500 w-3 h-3 rounded" />
                        <span>Imagery (2024)</span>
                      </label>
                    </div>
                  </div>

                  {/* Floating Right Map Toolbar */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                    <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-md border border-slate-200 overflow-hidden flex flex-col">
                      <button className="w-7 h-7 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors border-b border-slate-200">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-7 h-7 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button className="w-7 h-7 bg-white/95 backdrop-blur-md rounded-lg shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors">
                      <Layers className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-7 h-7 bg-white/95 backdrop-blur-md rounded-lg shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors">
                      <Crosshair className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-7 h-7 bg-white/95 backdrop-blur-md rounded-lg shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Bottom Map Status Bar */}
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between pointer-events-none">
                    {/* Scale */}
                    <div className="flex items-center gap-2 bg-[#0B1E38]/80 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded border border-white/10 pointer-events-auto">
                      <div className="flex items-center gap-1">
                        <span className="w-8 h-[2px] bg-white block" />
                        <span>0 1 2 km</span>
                      </div>
                    </div>

                    {/* Coordinates & CRS */}
                    <div className="bg-[#0B1E38]/80 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded border border-white/10 flex items-center gap-3 pointer-events-auto">
                      <span>24.4532° N, 54.6121° E</span>
                      <span className="text-slate-300">WGS84 ▾</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Description Card */}
              <div className="space-y-1">
                <div className="text-[13px] font-bold text-[#0F172A]">Description</div>
                <div className="text-[12px] text-[#475569] leading-relaxed">
                  This dataset provides the official cadastral land parcel boundaries for the Emirate of Abu Dhabi. It includes parcel geometry, parcel ID, land use, area and administrative information. It serves as a foundational dataset for planning, development, land management and multi-sector applications.
                </div>
                <button
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="text-[11px] font-semibold text-[#1865C9] hover:underline"
                >
                  {showFullDesc ? 'Show less ▴' : 'Show more ▾'}
                </button>
              </div>

              {/* 3. Two-Column Block: Sample attributes & Spatial coverage */}
              <div className="grid grid-cols-2 gap-4">
                {/* Sample attributes */}
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-3.5 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                    <span className="text-[12px] font-bold text-[#0F172A]">Sample attributes</span>
                    <button className="text-[11px] font-semibold text-[#1865C9] hover:underline flex items-center gap-1">
                      View full schema →
                    </button>
                  </div>

                  <table className="w-full text-[11px] mt-2">
                    <thead>
                      <tr className="text-[#64748B] border-b border-[#F1F5F9] text-left">
                        <th className="py-1 font-semibold">Parcel ID</th>
                        <th className="py-1 font-semibold">Municipality</th>
                        <th className="py-1 font-semibold">Land Use</th>
                        <th className="py-1 font-semibold">Area (m²)</th>
                        <th className="py-1 font-semibold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F8FAFC]">
                      <tr>
                        <td className="py-1.5 font-mono text-[#0F172A]">ADP-001-12534</td>
                        <td className="py-1.5 text-[#475569]">Abu Dhabi</td>
                        <td className="py-1.5 text-[#475569]">Residential</td>
                        <td className="py-1.5 font-mono text-[#475569]">1,250</td>
                        <td className="py-1.5 text-right">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#EDF9F1] text-[#1E9E6A]">
                            Active
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-mono text-[#0F172A]">ADP-001-12535</td>
                        <td className="py-1.5 text-[#475569]">Abu Dhabi</td>
                        <td className="py-1.5 text-[#475569]">Commercial</td>
                        <td className="py-1.5 font-mono text-[#475569]">3,420</td>
                        <td className="py-1.5 text-right">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#EDF9F1] text-[#1E9E6A]">
                            Active
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-mono text-[#0F172A]">ADP-003-66721</td>
                        <td className="py-1.5 text-[#475569]">Al Ain</td>
                        <td className="py-1.5 text-[#475569]">Mixed Use</td>
                        <td className="py-1.5 font-mono text-[#475569]">2,980</td>
                        <td className="py-1.5 text-right">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#EDF9F1] text-[#1E9E6A]">
                            Active
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-mono text-[#0F172A]">ADP-005-22311</td>
                        <td className="py-1.5 text-[#475569]">Al Dhafra</td>
                        <td className="py-1.5 text-[#475569]">Industrial</td>
                        <td className="py-1.5 font-mono text-[#475569]">5,440</td>
                        <td className="py-1.5 text-right">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#FEF3C7] text-[#D97706]">
                            Under Review
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 font-mono text-[#0F172A]">ADP-001-99876</td>
                        <td className="py-1.5 text-[#475569]">Abu Dhabi</td>
                        <td className="py-1.5 text-[#475569]">Public Facility</td>
                        <td className="py-1.5 font-mono text-[#475569]">7,120</td>
                        <td className="py-1.5 text-right">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#EDF9F1] text-[#1E9E6A]">
                            Active
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Spatial coverage */}
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-3.5 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-1 border-b border-[#E2E8F0]">
                    <span className="text-[12px] font-bold text-[#0F172A]">Spatial coverage</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 items-center my-auto">
                    {/* Abu Dhabi Emirate SVG Map Graphic */}
                    <div className="h-[120px] bg-[#F1F5F9]/60 rounded-lg border border-slate-200/80 p-2 relative flex items-center justify-center">
                      <svg viewBox="0 0 160 120" className="w-full h-full">
                        {/* Abu Dhabi polygon outline */}
                        <path
                          d="M20,65 L50,45 L90,35 L125,25 L145,45 L135,75 L115,85 L85,95 L40,105 L20,85 Z"
                          fill="#E0EDFB"
                          stroke="#1865C9"
                          strokeWidth="1.5"
                          strokeDasharray="2 1"
                        />
                        {/* Al Dhafra region */}
                        <path
                          d="M25,70 L55,55 L80,75 L65,100 L30,95 Z"
                          fill="#CBDFF8"
                          stroke="#1865C9"
                          strokeWidth="0.8"
                        />
                        {/* Region labels */}
                        <text x="120" y="40" fontSize="8" fontWeight="bold" fill="#0F396B" textAnchor="middle">
                          Abu Dhabi
                        </text>
                        <text x="120" y="49" fontSize="6.5" fill="#475569" textAnchor="middle">
                          أبوظبي
                        </text>

                        <text x="135" y="75" fontSize="7.5" fontWeight="bold" fill="#0F396B" textAnchor="middle">
                          Al Ain
                        </text>
                        <text x="135" y="83" fontSize="6" fill="#475569" textAnchor="middle">
                          العين
                        </text>

                        <text x="45" y="80" fontSize="7.5" fontWeight="bold" fill="#0F396B" textAnchor="middle">
                          Al Dhafra
                        </text>
                        <text x="45" y="88" fontSize="6" fill="#475569" textAnchor="middle">
                          الظفرة
                        </text>
                      </svg>
                    </div>

                    {/* Stats */}
                    <div className="space-y-1.5 text-[11px]">
                      <div>
                        <div className="text-[10px] text-[#64748B]">Coverage</div>
                        <div className="font-semibold text-[#0F172A]">Abu Dhabi Emirate</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#64748B]">Area</div>
                        <div className="font-semibold text-[#0F172A] font-mono">67,340 km²</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#64748B]">Features</div>
                        <div className="font-semibold text-[#0F172A] font-mono">~ 1.2 million parcels</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#64748B]">Coordinate system</div>
                        <div className="font-semibold text-[#1865C9] font-mono text-[10px]">WGS84 / EPSG:4326</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-1 text-right">
                    <button className="text-[11px] font-semibold text-[#1865C9] hover:underline">
                      View on map →
                    </button>
                  </div>
                </div>
              </div>

              {/* 4. Bottom Row: 3 Related Cards */}
              <div className="grid grid-cols-3 gap-3">
                {/* Related datasets */}
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-3 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-[#F1F5F9]">
                    <span className="text-[12px] font-bold text-[#0F172A]">Related datasets (5)</span>
                    <button className="text-[10px] font-semibold text-[#1865C9] hover:underline">View all →</button>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-[#1E293B] font-medium truncate max-w-[100px]">Building Footprints</span>
                      </div>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-[#EDF9F1] text-[#1E9E6A]">
                        High Quality
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-[#1E293B] font-medium truncate max-w-[100px]">Administrative Boundaries</span>
                      </div>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-[#EDF9F1] text-[#1E9E6A]">
                        Authoritative
                      </span>
                    </div>
                  </div>
                </div>

                {/* Related services */}
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-3 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-[#F1F5F9]">
                    <span className="text-[12px] font-bold text-[#0F172A]">Related services (3)</span>
                    <button className="text-[10px] font-semibold text-[#1865C9] hover:underline">View all →</button>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                        <span className="text-[#1E293B] font-medium truncate max-w-[105px]">Land Parcels WMS</span>
                      </div>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-[#EDF9F1] text-[#1E9E6A]">
                        Available
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                        <span className="text-[#1E293B] font-medium truncate max-w-[105px]">Land Parcels WFS</span>
                      </div>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-[#EDF9F1] text-[#1E9E6A]">
                        Available
                      </span>
                    </div>
                  </div>
                </div>

                {/* Related applications */}
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-3 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-[#F1F5F9]">
                    <span className="text-[12px] font-bold text-[#0F172A]">Related applications (4)</span>
                    <button className="text-[10px] font-semibold text-[#1865C9] hover:underline">View all →</button>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <LayoutGrid className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="text-[#1E293B] font-medium truncate max-w-[100px]">Planning Portal</span>
                      </div>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-[#EBF3FF] text-[#1865C9]">
                        Government
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <LayoutGrid className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="text-[#1E293B] font-medium truncate max-w-[100px]">3D City Model</span>
                      </div>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-[#F1F5F9] text-[#64748B]">
                        Internal
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4-col Sidebar Info Area */}
            <div className="col-span-4 flex flex-col gap-4">
              {/* Card 1: Key information */}
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-2xs space-y-2.5">
                <div className="text-[13px] font-bold text-[#0F172A]">Key information</div>

                <div className="space-y-2 text-[12px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Custodian</span>
                    <span className="font-semibold text-[#0F172A] text-right text-[11px]">
                      Department of Municipalities and Transport
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Data steward</span>
                    <span className="font-medium text-[#0F172A] text-[11px]">Spatial Data & Survey Sector</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Classification</span>
                    <span className="font-medium text-[#0F172A] text-[11px]">Official – Government</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Audience</span>
                    <span className="font-medium text-[#0F172A] text-[11px]">Government, Licensed Partners</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Update frequency</span>
                    <span className="font-medium text-[#0F172A] text-[11px]">Monthly</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Spatial coverage</span>
                    <span className="font-medium text-[#0F172A] text-[11px]">Abu Dhabi Emirate</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Data currency</span>
                    <span className="font-medium text-[#0F172A] text-[11px]">10 Oct 2026</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-[#F1F5F9]">
                    <span className="text-[#64748B]">Quality status</span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#1E9E6A]">
                      <span className="w-2 h-2 rounded-full bg-[#1E9E6A]" />
                      High (96%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Downloads & formats */}
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-[#0F172A]">Downloads & formats</span>
                  <button className="text-[11px] font-semibold text-[#1865C9] hover:underline">
                    View all formats →
                  </button>
                </div>

                <div className="space-y-1.5 text-[12px]">
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F8FAFC] border border-[#F1F5F9] transition-colors">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-[#64748B]" />
                      <span className="font-medium text-[#0F172A]">GeoPackage (.gpkg)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-[#64748B] font-mono">245 MB</span>
                      <Download className="w-4 h-4 text-[#1865C9] cursor-pointer hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F8FAFC] border border-[#F1F5F9] transition-colors">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-[#64748B]" />
                      <span className="font-medium text-[#0F172A]">Shapefile (.zip)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-[#64748B] font-mono">230 MB</span>
                      <Download className="w-4 h-4 text-[#1865C9] cursor-pointer hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F8FAFC] border border-[#F1F5F9] transition-colors">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-[#64748B]" />
                      <span className="font-medium text-[#0F172A]">File Geodatabase (.gdb)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-[#64748B] font-mono">410 MB</span>
                      <Download className="w-4 h-4 text-[#1865C9] cursor-pointer hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F8FAFC] border border-[#F1F5F9] transition-colors">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-[#64748B]" />
                      <span className="font-medium text-[#0F172A]">CSV (attributes)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-[#64748B] font-mono">12 MB</span>
                      <Download className="w-4 h-4 text-[#1865C9] cursor-pointer hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Data quality summary */}
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-2xs space-y-3">
                <div className="text-[13px] font-bold text-[#0F172A]">Data quality summary</div>

                <div className="text-[11px] text-[#64748B]">Overall quality score</div>

                <div className="flex items-center gap-4">
                  {/* Circular Quality Gauge */}
                  <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-100"
                        strokeWidth="3.2"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#1E9E6A]"
                        strokeDasharray="96, 100"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[18px] font-bold text-[#0F172A] leading-tight">96%</span>
                      <span className="text-[10px] font-semibold text-[#1E9E6A]">High</span>
                    </div>
                  </div>

                  {/* Horizontal breakdown bars */}
                  <div className="flex-1 space-y-1.5 text-[11px]">
                    <div>
                      <div className="flex justify-between text-[#64748B] text-[10px]">
                        <span>Completeness</span>
                        <span className="font-semibold text-[#0F172A]">98%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mt-0.5">
                        <div className="h-full bg-[#1E9E6A] rounded-full" style={{ width: '98%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[#64748B] text-[10px]">
                        <span>Logical consistency</span>
                        <span className="font-semibold text-[#0F172A]">96%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mt-0.5">
                        <div className="h-full bg-[#1E9E6A] rounded-full" style={{ width: '96%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[#64748B] text-[10px]">
                        <span>Positional accuracy</span>
                        <span className="font-semibold text-[#0F172A]">94%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mt-0.5">
                        <div className="h-full bg-[#1E9E6A] rounded-full" style={{ width: '94%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[#64748B] text-[10px]">
                        <span>Attribute accuracy</span>
                        <span className="font-semibold text-[#0F172A]">95%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mt-0.5">
                        <div className="h-full bg-[#1E9E6A] rounded-full" style={{ width: '95%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[#64748B] text-[10px]">
                        <span>Timeliness</span>
                        <span className="font-semibold text-[#0F172A]">97%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mt-0.5">
                        <div className="h-full bg-[#1E9E6A] rounded-full" style={{ width: '97%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-1 text-right">
                  <button className="text-[11px] font-semibold text-[#1865C9] hover:underline">
                    View quality details →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
