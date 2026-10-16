import React, { useState } from 'react';
import { ScreenId } from '../types';
import { DgeLogo, PortalWordmark } from '../components/common/DgeLogo';
import { HeaderWorkspace } from '../components/common/HeaderWorkspace';
import {
  Search,
  ChevronDown,
  X,
  Bookmark,
  ArrowUpDown,
  List,
  Grid,
  Plus,
  Compass,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Navigation,
  Pencil,
  ArrowRight,
  Sliders,
  Check,
  Bell,
  HelpCircle,
} from 'lucide-react';

interface S02Props {
  onNavigate: (screen: ScreenId) => void;
}

export const S02_CatalogueSearch: React.FC<S02Props> = ({ onNavigate }) => {
  const [query, setQuery] = useState('mangrove');
  const [selectedResultId, setSelectedResultId] = useState<number>(1);
  const [opacityMangroves, setOpacityMangroves] = useState(85);
  const [opacityProtected, setOpacityProtected] = useState(65);
  const [opacityImagery, setOpacityImagery] = useState(100);

  const results = [
    {
      id: 1,
      title: 'Mangrove Extent 2024',
      badge: 'Authoritative',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      desc: 'Official mangrove extent and canopy cover for Abu Dhabi via high-resolution satellite imagery.',
      publisher: 'Environment Agency – Abu Dhabi',
      type: 'Vector (GPKG)',
      date: '12 Oct 2024',
      access: 'Public',
      accessColor: 'text-emerald-700',
      chips: ['Environment', 'Coastal & Marine', 'Biodiversity'],
      size: '580 MB',
    },
    {
      id: 2,
      title: 'Mangrove Conservation Zones',
      badge: 'Featured',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      desc: 'Designated conservation zones and protected areas for mangroves in Abu Dhabi.',
      publisher: 'Environment Agency – Abu Dhabi',
      type: 'Vector (SHP)',
      date: '24 Aug 2024',
      access: 'Restricted',
      accessColor: 'text-rose-700 bg-rose-50 border-rose-200',
      chips: ['Environment', 'Coastal & Areas', 'Conservation'],
      size: '124 MB',
    },
    {
      id: 3,
      title: 'Mangrove Monitoring (Time Series)',
      desc: 'Annual mangrove extent and health indicators from 2018–2024.',
      publisher: 'Environment Agency – Abu Dhabi',
      type: 'Raster (TIF)',
      date: '15 Aug 2024',
      access: 'Public',
      accessColor: 'text-emerald-700',
      chips: ['Environment', 'Time Series', 'Change Detection'],
      size: '1.4 GB',
    },
    {
      id: 4,
      title: 'Coastal Habitat Classification',
      desc: 'Land cover classification including mangroves, seagrass and saltmarsh.',
      publisher: 'Environment Agency – Abu Dhabi',
      type: 'Raster (TIF)',
      date: '02 Jul 2024',
      access: 'Public',
      accessColor: 'text-emerald-700',
      chips: ['Environment', 'Land Cover', 'Coastal Zones'],
      size: '860 MB',
    },
    {
      id: 5,
      title: 'Mangrove Carbon Stock',
      desc: 'Estimated carbon stock and blue carbon potential for Abu Dhabi mangroves.',
      publisher: 'Environment Agency – Abu Dhabi',
      type: 'Vector (GPKG)',
      date: '18 Jun 2024',
      access: 'Restricted',
      accessColor: 'text-rose-700 bg-rose-50 border-rose-200',
      chips: ['Environment', 'Carbon', 'Climate'],
      size: '340 MB',
    },
  ];

  return (
    <div className="w-full h-screen bg-[#F8FAFC] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Unified Top Header (matching Home page) */}
      <HeaderWorkspace currentScreen="S02_CatalogueSearch" onNavigate={onNavigate} />

      {/* 3. Main Split View: Filters (240px) | Catalogue (440px) | Map (Flex) */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT FILTERS RAIL (240px) */}
        <div className="w-[240px] bg-white border-r border-border p-4 overflow-y-auto space-y-4 text-[12px] flex-shrink-0">
          <div className="flex items-center justify-between pb-1 border-b border-border">
            <span className="font-bold text-navy-900 uppercase tracking-wider text-[11px]">Filters</span>
            <button className="text-blue-600 font-semibold text-[11px] hover:underline">Clear all</button>
          </div>

          {/* Filter Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-steel-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-[32px] pl-8 pr-7 rounded-lg border border-border bg-[#F8FAFC] text-[12px] text-primaryText focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-steel-400 hover:text-navy-900">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Data Type */}
          <div className="space-y-1.5">
            <div className="font-semibold text-secondaryText text-[11px] uppercase">Data type</div>
            {[
              { l: 'Datasets', c: 24, checked: true },
              { l: 'Maps', c: 8, checked: false },
              { l: 'Services (APIs)', c: 4, checked: false },
              { l: 'Applications', c: 2, checked: false },
              { l: 'AI Models', c: 0, checked: false },
            ].map((dt, i) => (
              <label key={i} className="flex items-center justify-between text-primaryText cursor-pointer">
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={dt.checked} className="rounded text-blue-600" />
                  <span>{dt.l}</span>
                </div>
                <span className="text-steel-400 font-mono text-[11px]">{dt.c}</span>
              </label>
            ))}
          </div>

          {/* Theme */}
          <div className="space-y-1.5 pt-2 border-t border-border">
            <div className="font-semibold text-secondaryText text-[11px] uppercase">Theme</div>
            {[
              { l: 'Environment', c: 18, checked: true },
              { l: 'Land & Cadastre', c: 6, checked: false },
              { l: 'Coastal & Marine', c: 8, checked: false },
              { l: 'Transport', c: 2, checked: false },
              { l: 'Imagery', c: 4, checked: false },
            ].map((th, i) => (
              <label key={i} className="flex items-center justify-between text-primaryText cursor-pointer">
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={th.checked} className="rounded text-blue-600" />
                  <span>{th.l}</span>
                </div>
                <span className="text-steel-400 font-mono text-[11px]">{th.c}</span>
              </label>
            ))}
            <div className="text-blue-600 font-semibold text-[11px] cursor-pointer pt-0.5">Show more ▾</div>
          </div>

          {/* Publisher */}
          <div className="space-y-1.5 pt-2 border-t border-border">
            <div className="font-semibold text-secondaryText text-[11px] uppercase">Publisher</div>
            {[
              { l: 'Environment Agency – Abu Dhabi', c: 12, checked: true },
              { l: 'Department of Municipalities', c: 6, checked: false },
              { l: 'Abu Dhabi Urban Planning Council', c: 4, checked: false },
              { l: 'Al Ain Municipality', c: 2, checked: false },
            ].map((p, i) => (
              <label key={i} className="flex items-center justify-between text-primaryText cursor-pointer">
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={p.checked} className="rounded text-blue-600" />
                  <span className="truncate max-w-[150px]">{p.l}</span>
                </div>
                <span className="text-steel-400 font-mono text-[11px]">{p.c}</span>
              </label>
            ))}
          </div>

          {/* Classification */}
          <div className="space-y-1.5 pt-2 border-t border-border">
            <div className="font-semibold text-secondaryText text-[11px] uppercase">Classification</div>
            <label className="flex items-center justify-between text-primaryText cursor-pointer">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-blue-600" />
                <span>Public</span>
              </div>
              <span className="text-steel-400 font-mono text-[11px]">14</span>
            </label>
            <label className="flex items-center justify-between text-primaryText cursor-pointer">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-blue-600" />
                <span>Restricted</span>
              </div>
              <span className="text-steel-400 font-mono text-[11px]">8</span>
            </label>
          </div>
        </div>

        {/* MIDDLE DATASET CATALOGUE COLUMN (460px) */}
        <div className="w-[460px] bg-white border-r border-border flex flex-col justify-between overflow-hidden flex-shrink-0">
          {/* Top Title & Sort Bar */}
          <div className="p-4 border-b border-border bg-white space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[20px] font-bold text-navy-900 tracking-tight">Dataset Catalogue</h1>
                <div className="text-[12px] text-secondaryText">38 results for &ldquo;mangrove&rdquo;</div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border text-[11px] font-semibold text-secondaryText hover:text-navy-900">
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save search</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-[11px] text-secondaryText">
              <div className="flex items-center gap-1">
                <span>Sort by:</span>
                <span className="font-bold text-navy-900">Relevance</span>
                <ChevronDown className="w-3 h-3 text-steel-400" />
              </div>

              <div className="flex items-center border border-border rounded p-0.5 bg-canvas">
                <button className="p-1 rounded bg-[#0B2545] text-white">
                  <List className="w-3 h-3" />
                </button>
                <button className="p-1 rounded text-secondaryText hover:text-navy-900">
                  <Grid className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Cards List (5 Cards) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {results.map((res) => {
              const isSelected = selectedResultId === res.id;

              return (
                <div
                  key={res.id}
                  onClick={() => {
                    setSelectedResultId(res.id);
                    if (res.id === 1) onNavigate('S03_DatasetDetail');
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-2 border-blue-600 bg-blue-50/20 shadow-md ring-1 ring-blue-600/30'
                      : 'border-border bg-white hover:border-steel-400 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Thumbnail */}
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-navy-900 flex-shrink-0 relative">
                      <img src="/images/abudhabi_satellite_mangroves.jpg" alt="Thumb" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="font-bold text-[13px] text-navy-900 hover:text-blue-600">
                            {res.title}
                          </h3>
                          {res.badge && (
                            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${res.badgeColor}`}>
                              {res.badge}
                            </span>
                          )}
                        </div>
                        <button className="text-steel-400 hover:text-navy-900 p-0.5">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-secondaryText line-clamp-2 leading-relaxed">
                        {res.desc}
                      </p>

                      <div className="text-[10px] text-steel-500 font-medium">
                        {res.publisher}
                      </div>

                      {/* Badges Row */}
                      <div className="flex items-center gap-2 pt-1 text-[10px] font-mono text-secondaryText flex-wrap">
                        <span className="px-1.5 py-0.2 rounded bg-canvas border">{res.type}</span>
                        <span>{res.date}</span>
                        <span className={`px-1.5 py-0.2 rounded font-semibold ${res.accessColor || 'text-emerald-700'}`}>
                          {res.access}
                        </span>
                      </div>

                      {/* Chips */}
                      <div className="flex items-center gap-1 pt-1 flex-wrap">
                        {res.chips.map((ch, ci) => (
                          <span key={ci} className="text-[9px] font-medium px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {ch}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="p-3 border-t border-border bg-white flex items-center justify-between text-[11px] text-secondaryText">
            <span>Showing 1–5 of 38 results</span>
            <div className="flex items-center gap-1">
              <span className="w-6 h-6 rounded bg-[#0B2545] text-white font-bold flex items-center justify-center">1</span>
              <span className="w-6 h-6 rounded hover:bg-canvas text-secondaryText flex items-center justify-center cursor-pointer">2</span>
              <span className="w-6 h-6 rounded hover:bg-canvas text-secondaryText flex items-center justify-center cursor-pointer">3</span>
              <span className="w-6 h-6 rounded hover:bg-canvas text-secondaryText flex items-center justify-center cursor-pointer">4</span>
              <span className="w-6 h-6 rounded hover:bg-canvas text-secondaryText flex items-center justify-center cursor-pointer">5</span>
              <span>...</span>
            </div>
          </div>
        </div>

        {/* RIGHT INTERACTIVE HIGH-RES MAP (FLEX) */}
        <div className="flex-1 h-full relative overflow-hidden bg-[#0A1628]">
          {/* Real Satellite Aerial Orthophoto Image */}
          <img
            src="/images/abudhabi_satellite_mangroves.jpg"
            alt="Abu Dhabi Satellite"
            className="w-full h-full object-cover object-center"
          />

          {/* Vector Mangrove Polygons Overlaid on the Real Satellite Map */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 740 914">
            {/* Mangrove glowing polygon zones */}
            <path
              d="M 420 180 Q 560 140 680 240 T 700 480 Q 580 520 440 380 Z"
              fill="rgba(30, 158, 106, 0.45)"
              stroke="#1E9E6A"
              strokeWidth="2.5"
            />
            <path
              d="M 480 320 Q 580 300 640 380 T 600 520 Q 480 500 440 420 Z"
              fill="rgba(43, 166, 222, 0.35)"
              stroke="#2BA6DE"
              strokeWidth="2"
            />
            {/* White outline boundaries */}
            <polygon
              points="410,170 690,130 720,490 430,400"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeDasharray="4 2"
              fill="none"
            />
          </svg>

          {/* Bilingual Island Annotations matching Screenshot 3 */}
          <div className="absolute top-[280px] left-[180px] pointer-events-none text-white text-center drop-shadow-lg">
            <div className="text-[13px] font-bold">Saadiyat Island</div>
            <div className="text-[11px] font-arabic font-semibold opacity-90">جزيرة السعديات</div>
          </div>

          <div className="absolute top-[370px] left-[260px] pointer-events-none text-white text-center drop-shadow-lg">
            <div className="text-[12px] font-bold">Al Reem Island</div>
          </div>

          <div className="absolute top-[430px] left-[260px] pointer-events-none text-white text-center drop-shadow-lg">
            <div className="text-[12px] font-bold">Al Maryah Island</div>
            <div className="text-[10px] font-arabic font-semibold opacity-90">جزيرة المارية</div>
          </div>

          <div className="absolute top-[430px] left-[120px] pointer-events-none text-white text-center drop-shadow-lg">
            <div className="text-[13px] font-bold">Abu Dhabi City</div>
            <div className="text-[11px] font-arabic font-semibold opacity-90">مدينة أبوظبي</div>
          </div>

          <div className="absolute top-[520px] left-[110px] pointer-events-none text-white text-center drop-shadow-lg">
            <div className="text-[12px] font-bold">Al Hudayriat Island</div>
            <div className="text-[10px] font-arabic font-semibold opacity-90">جزيرة الحديريات</div>
          </div>

          <div className="absolute top-[350px] right-[180px] pointer-events-none text-white text-center drop-shadow-lg">
            <div className="text-[14px] font-bold">Yas Island</div>
            <div className="text-[12px] font-arabic font-semibold opacity-90">جزيرة ياس</div>
          </div>

          <div className="absolute bottom-[160px] right-[260px] pointer-events-none text-white text-center drop-shadow-lg">
            <div className="text-[12px] font-bold">Al Rahba</div>
            <div className="text-[10px] font-arabic font-semibold opacity-90">الرحبة</div>
          </div>

          {/* Floating Search this area bar */}
          <div className="absolute top-4 left-4 z-20">
            <button className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-lg border border-border shadow-md text-[12px] font-semibold text-navy-900 flex items-center gap-2 hover:bg-white transition-all">
              <Search className="w-3.5 h-3.5 text-steel-400" />
              <span>Search this area</span>
            </button>
          </div>

          {/* Top-Right Map Controls */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <button
              onClick={() => onNavigate('S03_DatasetDetail')}
              className="bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg border border-border shadow-md text-[12px] font-bold text-navy-900 flex items-center gap-1.5 hover:bg-white transition-all"
            >
              <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Open in Map Viewer</span>
            </button>

            <button className="w-9 h-9 bg-white/95 rounded-lg border border-border shadow-md flex items-center justify-center text-steel-500 hover:text-navy-900">
              <Pencil className="w-4 h-4" />
            </button>
            <div className="bg-white/95 rounded-lg border border-border shadow-md flex flex-col p-0.5">
              <button className="p-2 hover:bg-canvas rounded text-steel-500 hover:text-navy-900">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-canvas rounded text-steel-500 hover:text-navy-900">
                <ZoomOut className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-canvas rounded text-steel-500 hover:text-navy-900">
                <Navigation className="w-4 h-4 text-[#E5A817]" />
              </button>
            </div>
          </div>

          {/* Floating Selected Dataset Popup Card on Map (Right Side) */}
          <div className="absolute top-[280px] right-6 z-20 w-[240px] bg-white rounded-xl border border-border shadow-2xl p-3.5 space-y-2.5 text-[12px]">
            <div className="h-[75px] rounded-lg overflow-hidden bg-navy-900 relative">
              <img src="/images/abudhabi_satellite_mangroves.jpg" alt="Preview" className="w-full h-full object-cover" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-[13px] text-navy-900">Mangrove Extent 2024</h3>
                <span className="text-[8px] font-bold px-1 rounded bg-emerald-100 text-emerald-800">
                  Authoritative
                </span>
              </div>
              <div className="text-[10px] text-steel-500 mt-0.5">Environment Agency – Abu Dhabi</div>
            </div>

            <div className="space-y-1 text-[11px] pt-1 border-t border-border">
              <div className="flex justify-between">
                <span className="text-secondaryText">Type:</span>
                <strong className="text-primaryText font-mono">Vector (GPKG)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-secondaryText">Updated:</span>
                <strong className="text-primaryText font-mono">12 Oct 2024</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-secondaryText">Coverage:</span>
                <strong className="text-primaryText">Abu Dhabi Emirate</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-secondaryText">Size:</span>
                <strong className="text-primaryText font-mono">580 MB</strong>
              </div>
            </div>

            <button
              onClick={() => onNavigate('S03_DatasetDetail')}
              className="w-full py-2 bg-[#1865C9] hover:bg-[#1453A3] text-white rounded-lg text-[12px] font-bold flex items-center justify-center gap-1 shadow-sm transition-all"
            >
              <span>View details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Floating Layers Control Box (Bottom-Left) */}
          <div className="absolute bottom-6 left-6 z-20 w-[240px] bg-[#0B2545]/92 backdrop-blur-md rounded-xl border border-white/15 p-3.5 text-white text-[11px] space-y-2 shadow-2xl">
            <div className="font-bold uppercase tracking-wider text-[10px] text-steel-300 pb-1 border-b border-white/10 flex items-center justify-between">
              <span>Layers</span>
              <span className="text-gold-500">4 Active</span>
            </div>

            <div className="space-y-1.5">
              <div>
                <label className="flex items-center justify-between cursor-pointer">
                  <span>Mangrove Extent 2024</span>
                  <input type="checkbox" defaultChecked className="rounded text-blue-600 bg-white/20" />
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={opacityMangroves}
                  onChange={(e) => setOpacityMangroves(parseInt(e.target.value))}
                  className="w-full h-1 accent-emerald-400 mt-1"
                />
              </div>

              <div>
                <label className="flex items-center justify-between cursor-pointer">
                  <span>Protected Areas</span>
                  <input type="checkbox" defaultChecked className="rounded text-blue-600 bg-white/20" />
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={opacityProtected}
                  onChange={(e) => setOpacityProtected(parseInt(e.target.value))}
                  className="w-full h-1 accent-cyan-400 mt-1"
                />
              </div>

              <label className="flex items-center justify-between cursor-pointer text-steel-400">
                <span>Coastal Zones</span>
                <input type="checkbox" className="rounded text-blue-600 bg-white/20" />
              </label>

              <label className="flex items-center justify-between cursor-pointer text-steel-400">
                <span>Land Use</span>
                <input type="checkbox" className="rounded text-blue-600 bg-white/20" />
              </label>

              <div className="pt-1 border-t border-white/10 flex items-center justify-between text-steel-300">
                <span>Basemap:</span>
                <span className="font-bold text-white flex items-center gap-1">
                  <span>Satellite</span>
                  <ChevronDown className="w-3 h-3 text-steel-400" />
                </span>
              </div>
            </div>
          </div>

          {/* Minimap Inset (Bottom-Right) */}
          <div className="absolute bottom-6 right-6 z-20 w-[140px] h-[90px] rounded-lg overflow-hidden border border-white/20 shadow-2xl bg-navy-900 relative">
            <svg viewBox="0 0 140 90" className="w-full h-full">
              <rect width="140" height="90" fill="#081A30" />
              <path d="M 20 60 Q 60 40 120 70 L 140 90 L 0 90 Z" fill="#142B48" />
              <rect x="70" y="30" width="30" height="24" fill="none" stroke="#FFC20E" strokeWidth="1.5" />
            </svg>
            <div className="absolute bottom-1 left-2 text-[9px] font-bold text-white font-mono">
              Abu Dhabi Emirate
            </div>
          </div>

          {/* Scale Bar & Coordinates */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 bg-black/60 backdrop-blur px-3 py-1 rounded text-[10px] font-mono text-white/90">
            <div className="flex items-center gap-1">
              <span className="w-8 h-[2px] bg-white inline-block"></span>
              <span>10 km</span>
            </div>
            <span>24.453° N, 54.377° E</span>
            <span>WGS84 ▾</span>
          </div>
        </div>
      </div>
    </div>
  );
};
