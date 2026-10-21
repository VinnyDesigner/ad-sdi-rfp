import React, { useState, useMemo, useEffect } from 'react';
import { ScreenId } from '../types';
import { HeaderWorkspace } from '../components/common/HeaderWorkspace';
import { InteractiveMap } from '../components/common/InteractiveMap';
import {
  Search,
  ChevronDown,
  ChevronUp,
  X,
  Bookmark,
  List,
  Grid,
  Plus,
  ArrowRight,
  Sliders,
  Check,
  CheckCircle2,
  Share2,
  Info,
  Maximize2,
  Minimize2,
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
  const [currentPage, setCurrentPage] = useState(1);
  const [savedSearch, setSavedSearch] = useState(false);
  const [addedMapLayers, setAddedMapLayers] = useState<number[]>([1]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'title' | 'size'>('relevance');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [showSelectedCard, setShowSelectedCard] = useState<boolean>(true);
  const [isMapFullscreen, setIsMapFullscreen] = useState<boolean>(false);
  const [opacityBoxExpanded, setOpacityBoxExpanded] = useState<boolean>(true);

  // Esc key listener to exit map fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isMapFullscreen) {
          setIsMapFullscreen(false);
        }
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMapFullscreen]);

  // Filter state
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>(['Datasets']);
  const [selectedThemes, setSelectedThemes] = useState<string[]>(['Environment']);
  const [selectedPublishers, setSelectedPublishers] = useState<string[]>(['Environment Agency – Abu Dhabi']);
  const [selectedAccess, setSelectedAccess] = useState<string[]>([]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const rawResults = [
    {
      id: 1,
      title: 'Mangrove Extent 2024',
      badge: 'Authoritative',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      desc: 'Official mangrove extent and canopy cover for Abu Dhabi via high-resolution satellite imagery.',
      publisher: 'Environment Agency – Abu Dhabi',
      type: 'Vector (GPKG)',
      dataType: 'Datasets',
      theme: 'Environment',
      date: '12 Oct 2024',
      access: 'Public',
      accessColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      chips: ['Environment', 'Coastal & Marine', 'Biodiversity'],
      size: '580 MB',
      bytes: 580,
    },
    {
      id: 2,
      title: 'Mangrove Conservation Zones',
      badge: 'Featured',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      desc: 'Designated conservation zones and protected areas for mangroves in Abu Dhabi.',
      publisher: 'Environment Agency – Abu Dhabi',
      type: 'Vector (SHP)',
      dataType: 'Datasets',
      theme: 'Environment',
      date: '24 Aug 2024',
      access: 'Restricted',
      accessColor: 'text-rose-700 bg-rose-50 border-rose-200',
      chips: ['Environment', 'Coastal & Areas', 'Conservation'],
      size: '124 MB',
      bytes: 124,
    },
    {
      id: 3,
      title: 'Mangrove Monitoring (Time Series)',
      badge: 'Time Series',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      desc: 'Annual mangrove extent and health indicators from 2018–2024 with multispectral vegetation index analysis.',
      publisher: 'Environment Agency – Abu Dhabi',
      type: 'Raster (TIF)',
      dataType: 'Datasets',
      theme: 'Environment',
      date: '15 Aug 2024',
      access: 'Public',
      accessColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      chips: ['Environment', 'Time Series', 'Change Detection'],
      size: '1.4 GB',
      bytes: 1400,
    },
    {
      id: 4,
      title: 'Coastal Habitat Classification',
      badge: '',
      badgeColor: '',
      desc: 'Land cover classification including mangroves, seagrass and saltmarsh across Abu Dhabi coastline.',
      publisher: 'Environment Agency – Abu Dhabi',
      type: 'Raster (TIF)',
      dataType: 'Maps',
      theme: 'Coastal & Marine',
      date: '02 Jul 2024',
      access: 'Public',
      accessColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      chips: ['Environment', 'Land Cover', 'Coastal Zones'],
      size: '860 MB',
      bytes: 860,
    },
    {
      id: 5,
      title: 'Mangrove Carbon Stock & Blue Carbon',
      badge: 'Blue Carbon',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
      desc: 'Estimated carbon stock and blue carbon sequestration potential for Abu Dhabi mangroves.',
      publisher: 'Environment Agency – Abu Dhabi',
      type: 'Vector (GPKG)',
      dataType: 'Datasets',
      theme: 'Environment',
      date: '18 Jun 2024',
      access: 'Restricted',
      accessColor: 'text-rose-700 bg-rose-50 border-rose-200',
      chips: ['Environment', 'Carbon', 'Climate'],
      size: '340 MB',
      bytes: 340,
    },
  ];

  // Dynamic Filtering & Sorting
  const filteredResults = useMemo(() => {
    return rawResults
      .filter((r) => {
        // Query match
        const matchesQuery =
          !query ||
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.desc.toLowerCase().includes(query.toLowerCase()) ||
          r.chips.some((c) => c.toLowerCase().includes(query.toLowerCase()));

        // Type match
        const matchesType =
          selectedDataTypes.length === 0 || selectedDataTypes.includes(r.dataType);

        // Access match
        const matchesAccess =
          selectedAccess.length === 0 || selectedAccess.includes(r.access);

        return matchesQuery && matchesType && matchesAccess;
      })
      .sort((a, b) => {
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'size') return b.bytes - a.bytes;
        return a.id - b.id; // relevance
      });
  }, [rawResults, query, selectedDataTypes, selectedAccess, sortBy]);

  const selectedResult = useMemo(() => {
    if (!selectedResultId) return null;
    return (
      filteredResults.find((r) => r.id === selectedResultId) ||
      rawResults.find((r) => r.id === selectedResultId) ||
      null
    );
  }, [filteredResults, rawResults, selectedResultId]);

  const handleClearAll = () => {
    setQuery('');
    setSelectedDataTypes([]);
    setSelectedThemes([]);
    setSelectedPublishers([]);
    setSelectedAccess([]);
    showToast('Filters cleared');
  };

  const toggleLayerAdded = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (addedMapLayers.includes(id)) {
      setAddedMapLayers((prev) => prev.filter((x) => x !== id));
      showToast('Removed layer from map');
    } else {
      setAddedMapLayers((prev) => [...prev, id]);
      showToast('Added layer to map view');
    }
  };

  return (
    <div className="w-full h-screen bg-[#F8FAFC] flex flex-col justify-between overflow-hidden select-none font-sans relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-20 right-6 z-50 bg-navy-900 text-white px-4 py-2 rounded-xl shadow-2xl border border-white/20 text-[12px] flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Unified Top Header */}
      <HeaderWorkspace currentScreen="S02_CatalogueSearch" onNavigate={onNavigate} />

      {/* 2. Main Split View: Filters (240px) | Catalogue (440px) | Real Map (Flex) */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT FILTERS RAIL (240px) */}
        <div className="w-[240px] bg-white border-r border-border p-4 overflow-y-auto space-y-4 text-[12px] flex-shrink-0">
          <div className="flex items-center justify-between pb-1 border-b border-border">
            <span className="font-bold text-navy-900 uppercase tracking-wider text-[11px]">Filters</span>
            <button
              onClick={handleClearAll}
              className="text-blue-600 font-semibold text-[11px] hover:underline cursor-pointer"
            >
              Clear all
            </button>
          </div>

          {/* Filter Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-steel-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by keyword..."
              className="w-full h-[32px] pl-8 pr-7 rounded-lg border border-border bg-[#F8FAFC] text-[12px] text-primaryText focus:outline-none focus:border-blue-600"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-steel-400 hover:text-navy-900"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Data Type */}
          <div className="space-y-1.5">
            <div className="font-semibold text-secondaryText text-[11px] uppercase">Data type</div>
            {[
              { l: 'Datasets', c: 24 },
              { l: 'Maps', c: 8 },
              { l: 'Services (APIs)', c: 4 },
              { l: 'Applications', c: 2 },
              { l: 'AI Models', c: 1 },
            ].map((dt, i) => {
              const checked = selectedDataTypes.includes(dt.l);
              return (
                <label key={i} className="flex items-center justify-between text-primaryText cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedDataTypes((prev) => [...prev, dt.l]);
                        else setSelectedDataTypes((prev) => prev.filter((x) => x !== dt.l));
                      }}
                      className="rounded text-blue-600 cursor-pointer"
                    />
                    <span>{dt.l}</span>
                  </div>
                  <span className="text-steel-400 font-mono text-[11px]">{dt.c}</span>
                </label>
              );
            })}
          </div>

          {/* Theme */}
          <div className="space-y-1.5 pt-2 border-t border-border">
            <div className="font-semibold text-secondaryText text-[11px] uppercase">Theme</div>
            {[
              { l: 'Environment', c: 18 },
              { l: 'Land & Cadastre', c: 6 },
              { l: 'Coastal & Marine', c: 8 },
              { l: 'Transport', c: 2 },
              { l: 'Imagery', c: 4 },
            ].map((th, i) => {
              const checked = selectedThemes.includes(th.l);
              return (
                <label key={i} className="flex items-center justify-between text-primaryText cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedThemes((prev) => [...prev, th.l]);
                        else setSelectedThemes((prev) => prev.filter((x) => x !== th.l));
                      }}
                      className="rounded text-blue-600 cursor-pointer"
                    />
                    <span>{th.l}</span>
                  </div>
                  <span className="text-steel-400 font-mono text-[11px]">{th.c}</span>
                </label>
              );
            })}
          </div>

          {/* Publisher */}
          <div className="space-y-1.5 pt-2 border-t border-border">
            <div className="font-semibold text-secondaryText text-[11px] uppercase">Publisher</div>
            {[
              { l: 'Environment Agency – Abu Dhabi', c: 12 },
              { l: 'Department of Municipalities', c: 6 },
              { l: 'Abu Dhabi Urban Planning', c: 4 },
              { l: 'Statistics Centre (SCAD)', c: 2 },
            ].map((p, i) => {
              const checked = selectedPublishers.includes(p.l);
              return (
                <label key={i} className="flex items-center justify-between text-primaryText cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedPublishers((prev) => [...prev, p.l]);
                        else setSelectedPublishers((prev) => prev.filter((x) => x !== p.l));
                      }}
                      className="rounded text-blue-600 cursor-pointer"
                    />
                    <span className="truncate max-w-[140px]">{p.l}</span>
                  </div>
                  <span className="text-steel-400 font-mono text-[11px]">{p.c}</span>
                </label>
              );
            })}
          </div>

          {/* Classification */}
          <div className="space-y-1.5 pt-2 border-t border-border">
            <div className="font-semibold text-secondaryText text-[11px] uppercase">Classification</div>
            {['Public', 'Restricted'].map((acc) => {
              const checked = selectedAccess.includes(acc);
              return (
                <label key={acc} className="flex items-center justify-between text-primaryText cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedAccess((prev) => [...prev, acc]);
                        else setSelectedAccess((prev) => prev.filter((x) => x !== acc));
                      }}
                      className="rounded text-blue-600 cursor-pointer"
                    />
                    <span>{acc}</span>
                  </div>
                  <span className="text-steel-400 font-mono text-[11px]">
                    {acc === 'Public' ? 14 : 8}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* MIDDLE DATASET CATALOGUE COLUMN (Dynamic width: 440px in list mode, 520px-560px in grid mode) */}
        <div
          className={`bg-white border-r border-border flex flex-col justify-between overflow-hidden flex-shrink-0 transition-all duration-300 ${
            viewMode === 'grid' ? 'w-[520px] xl:w-[560px]' : 'w-[440px]'
          }`}
        >
          {/* Top Title & Sort Bar */}
          <div className="p-4 border-b border-border bg-white space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[19px] font-bold text-navy-900 tracking-tight">Dataset Catalogue</h1>
                <div className="text-[12px] text-secondaryText">
                  {filteredResults.length} results {query ? `for "${query}"` : 'available'}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSavedSearch(!savedSearch);
                    showToast(savedSearch ? 'Search unbookmarked' : 'Search saved to favorites');
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-colors ${
                    savedSearch
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : 'border-border text-secondaryText hover:text-navy-900'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${savedSearch ? 'fill-amber-500 text-amber-500' : ''}`} />
                  <span>{savedSearch ? 'Saved' : 'Save search'}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-[11px] text-secondaryText">
              <div className="flex items-center gap-1.5">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-bold text-navy-900 border-none outline-none cursor-pointer"
                >
                  <option value="relevance">Relevance</option>
                  <option value="title">Alphabetical (A-Z)</option>
                  <option value="size">Dataset Size</option>
                </select>
              </div>

              {/* View Mode Toggle: List vs Grid */}
              <div className="flex items-center border border-border rounded-lg p-0.5 bg-canvas shadow-2xs">
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition-all cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-[#0B2545] text-white shadow-xs'
                      : 'text-secondaryText hover:text-navy-900 hover:bg-slate-200/60'
                  }`}
                  title="List view"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-[#0B2545] text-white shadow-xs'
                      : 'text-secondaryText hover:text-navy-900 hover:bg-slate-200/60'
                  }`}
                  title="Grid view"
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Cards Container (List View vs Grid View) */}
          <div className="flex-1 overflow-y-auto p-4">
            {filteredResults.length === 0 ? (
              <div className="text-center py-12 space-y-2 text-secondaryText">
                <Search className="w-8 h-8 text-steel-400 mx-auto" />
                <div className="font-bold text-[13px] text-navy-900">No matching datasets</div>
                <div className="text-[12px]">Try clearing filters or changing your search terms.</div>
                <button
                  onClick={handleClearAll}
                  className="mt-2 px-3 py-1 bg-blue-50 text-blue-700 font-semibold rounded-lg text-[11px] hover:bg-blue-100 cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            ) : viewMode === 'list' ? (
              /* 1. LIST VIEW */
              <div className="space-y-3">
                {filteredResults.map((res) => {
                  const isSelected = selectedResultId === res.id;
                  const isAdded = addedMapLayers.includes(res.id);

                  return (
                    <div
                      key={res.id}
                      onClick={() => {
                        setSelectedResultId(res.id);
                        setShowSelectedCard(true);
                      }}
                      onDoubleClick={() => {
                        if (res.id === 1) onNavigate('S03_DatasetDetail');
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                        isSelected
                          ? 'border-2 border-blue-600 bg-blue-50/20 shadow-md ring-1 ring-blue-600/30'
                          : 'border-border bg-white hover:border-steel-400 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Thumbnail Icon */}
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0 relative flex items-center justify-center text-white border border-slate-700">
                          {res.type.includes('Vector') ? (
                            <span className="text-[10px] font-mono font-bold bg-blue-600/80 px-1 py-0.5 rounded">
                              VEC
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono font-bold bg-emerald-600/80 px-1 py-0.5 rounded">
                              RAST
                            </span>
                          )}
                        </div>

                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h3 className="font-bold text-[13px] text-navy-900 hover:text-blue-600">
                                {res.title}
                              </h3>
                              {res.badge && (
                                <span
                                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${res.badgeColor}`}
                                >
                                  {res.badge}
                                </span>
                              )}
                            </div>

                            {/* Add to Map button */}
                            <button
                              onClick={(e) => toggleLayerAdded(res.id, e)}
                              className={`p-1 rounded-md transition-colors ${
                                isAdded
                                  ? 'bg-blue-600 text-white'
                                  : 'text-steel-400 hover:text-navy-900 hover:bg-slate-100'
                              }`}
                              title={isAdded ? 'Remove from map' : 'Add to map'}
                            >
                              {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                            </button>
                          </div>

                          <p className="text-[11px] text-secondaryText line-clamp-2 leading-relaxed">
                            {res.desc}
                          </p>

                          <div className="text-[10px] text-steel-500 font-medium">{res.publisher}</div>

                          {/* Badges Row */}
                          <div className="flex items-center gap-2 pt-1 text-[10px] font-mono text-secondaryText flex-wrap">
                            <span className="px-1.5 py-0.2 rounded bg-canvas border">{res.type}</span>
                            <span>{res.date}</span>
                            <span className={`px-1.5 py-0.2 rounded font-semibold border ${res.accessColor}`}>
                              {res.access}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* 2. GRID VIEW (2 COLUMNS) */
              <div className="grid grid-cols-2 gap-3">
                {filteredResults.map((res) => {
                  const isSelected = selectedResultId === res.id;
                  const isAdded = addedMapLayers.includes(res.id);

                  return (
                    <div
                      key={res.id}
                      onClick={() => {
                        setSelectedResultId(res.id);
                        setShowSelectedCard(true);
                      }}
                      onDoubleClick={() => {
                        if (res.id === 1) onNavigate('S03_DatasetDetail');
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between group ${
                        isSelected
                          ? 'border-2 border-blue-600 bg-blue-50/20 shadow-md ring-1 ring-blue-600/30'
                          : 'border-border bg-white hover:border-steel-400 hover:shadow-md'
                      }`}
                    >
                      {/* Top Header & Content inside Grid Card */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="w-7 h-7 rounded-md overflow-hidden bg-slate-900 flex-shrink-0 flex items-center justify-center text-white border border-slate-700 shadow-2xs">
                              {res.type.includes('Vector') ? (
                                <span className="text-[8px] font-mono font-bold text-blue-400">
                                  VEC
                                </span>
                              ) : (
                                <span className="text-[8px] font-mono font-bold text-emerald-400">
                                  RAST
                                </span>
                              )}
                            </div>
                            {res.badge && (
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.5 rounded border leading-none ${res.badgeColor}`}
                              >
                                {res.badge}
                              </span>
                            )}
                          </div>

                          {/* Quick Add to Map Toggle */}
                          <button
                            onClick={(e) => toggleLayerAdded(res.id, e)}
                            className={`p-1 rounded-md transition-colors cursor-pointer ${
                              isAdded
                                ? 'bg-blue-600 text-white'
                                : 'text-steel-400 hover:text-navy-900 hover:bg-slate-100'
                            }`}
                            title={isAdded ? 'Remove from map' : 'Add to map'}
                          >
                            {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        <div>
                          <h3 className="font-bold text-[12px] text-navy-900 group-hover:text-blue-600 leading-snug line-clamp-2">
                            {res.title}
                          </h3>
                          <div className="text-[10px] text-steel-500 font-medium truncate mt-0.5">
                            {res.publisher}
                          </div>
                        </div>

                        <p className="text-[10.5px] text-secondaryText line-clamp-2 leading-relaxed">
                          {res.desc}
                        </p>
                      </div>

                      {/* Bottom Footer inside Grid Card */}
                      <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[9.5px]">
                        <span className={`px-1.5 py-0.5 rounded font-semibold border ${res.accessColor}`}>
                          {res.access}
                        </span>
                        <span className="font-mono text-steel-500 font-medium">{res.size}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="p-3 border-t border-border bg-white flex items-center justify-between text-[11px] text-secondaryText">
            <span>
              Showing {filteredResults.length} of {rawResults.length} datasets
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-6 h-6 rounded font-bold flex items-center justify-center transition-colors ${
                    currentPage === page
                      ? 'bg-[#0B2545] text-white'
                      : 'hover:bg-canvas text-secondaryText'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT REAL INTERACTIVE HIGH-RES GIS MAP (FLEX / FULLSCREEN) */}
        <div
          className={`overflow-hidden bg-[#0A1628] transition-all duration-300 ${
            isMapFullscreen
              ? 'fixed inset-0 z-[9999] w-screen h-screen'
              : 'flex-1 h-full relative'
          }`}
        >
          <InteractiveMap
            mode="catalogue"
            highlightedId={selectedResultId}
            onSelectFeature={(id) => {
              setSelectedResultId(Number(id));
              setShowSelectedCard(true);
            }}
            opacityMangroves={opacityMangroves}
            opacityProtected={opacityProtected}
            opacityImagery={opacityImagery}
            onSearchThisArea={() => {
              showToast('Refreshed datasets for current map viewport');
            }}
            onOpenViewer={() => onNavigate('S03_DatasetDetail')}
            isFullscreen={isMapFullscreen}
            onToggleFullscreen={() => setIsMapFullscreen((prev) => !prev)}
            hideLegend={true}
            className="w-full h-full"
          />

          {/* Floating Selected Dataset Popup Card on Map (Positioned at top-16 right-4, flush below top toolbar) */}
          {showSelectedCard && selectedResult && (
            <div className="absolute top-16 right-4 z-20 w-[280px] bg-white/95 backdrop-blur-md rounded-xl border border-border shadow-2xl p-3.5 space-y-2.5 text-[12px] animate-in fade-in slide-in-from-top-2">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                    Selected Dataset
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        showToast('Dataset link copied to clipboard');
                      }}
                      className="text-steel-400 hover:text-navy-900 p-1 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Share link"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setShowSelectedCard(false)}
                      className="text-steel-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Close dataset info"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <h3 className="font-bold text-[13px] text-navy-900 mt-0.5 leading-snug">{selectedResult.title}</h3>
                <div className="text-[10px] text-steel-500 font-medium">{selectedResult.publisher}</div>
              </div>

              <div className="space-y-1 text-[11px] pt-1 border-t border-border">
                <div className="flex justify-between">
                  <span className="text-secondaryText">Format:</span>
                  <strong className="text-primaryText font-mono">{selectedResult.type}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondaryText">Updated:</span>
                  <strong className="text-primaryText font-mono">{selectedResult.date}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondaryText">Access:</span>
                  <span className={`px-1.5 py-0.2 rounded font-semibold text-[10px] border ${selectedResult.accessColor}`}>
                    {selectedResult.access}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondaryText">Size:</span>
                  <strong className="text-primaryText font-mono">{selectedResult.size}</strong>
                </div>
              </div>

              <div className="pt-1 flex flex-col gap-1.5">
                <button
                  onClick={() => onNavigate('S03_DatasetDetail')}
                  className="w-full py-2 bg-[#1865C9] hover:bg-[#1453A3] text-white rounded-lg text-[12px] font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <span>View Full Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                {selectedResult.access === 'Restricted' && (
                  <button
                    onClick={() => onNavigate('S09a_MarketplaceRequest')}
                    className="w-full py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                  >
                    Request Data Access
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Reopen tab when user closed the card (Clean h-9 tab at top-16 right-4) */}
          {!showSelectedCard && selectedResult && (
            <button
              onClick={() => setShowSelectedCard(true)}
              className="absolute top-16 right-4 z-20 h-9 px-3 bg-white/95 hover:bg-white text-navy-900 shadow-md backdrop-blur-md rounded-lg border border-border text-[12px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer animate-in fade-in"
              title="Click to view selected dataset details"
            >
              <Info className="w-3.5 h-3.5 text-blue-600" />
              <span>{selectedResult.title} Details</span>
              <ChevronDown className="w-3.5 h-3.5 text-steel-400" />
            </button>
          )}

          {/* Collapsible Layer Opacity & Legend Panel (Bottom-Left: bottom-4 left-4, clean 16px margins) */}
          {opacityBoxExpanded ? (
            <div className="absolute bottom-4 left-4 z-20 w-[260px] bg-[#0B2545]/95 backdrop-blur-md rounded-xl border border-white/15 p-3 text-white text-[11px] space-y-2.5 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
              <div className="font-bold uppercase tracking-wider text-[10px] text-steel-300 pb-1 border-b border-white/10 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3 h-3 text-[#E5A817]" />
                  <span>Layer Opacity & Legend</span>
                </span>
                <button
                  onClick={() => setOpacityBoxExpanded(false)}
                  className="text-steel-400 hover:text-white p-0.5 rounded transition-colors cursor-pointer"
                  title="Minimize panel"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Sliders with Legend Swatches */}
              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-steel-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2 rounded-xs bg-[#10B981]"></span>
                      <span>Mangroves</span>
                    </span>
                    <span className="font-mono text-emerald-400">{opacityMangroves}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={opacityMangroves}
                    onChange={(e) => setOpacityMangroves(parseInt(e.target.value))}
                    className="w-full h-1 accent-emerald-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-[10px] text-steel-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2 rounded-xs bg-[#1F5FAD]"></span>
                      <span>Protected Areas</span>
                    </span>
                    <span className="font-mono text-cyan-400">{opacityProtected}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={opacityProtected}
                    onChange={(e) => setOpacityProtected(parseInt(e.target.value))}
                    className="w-full h-1 accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-[10px] text-steel-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2 rounded-xs border border-[#E5A817] border-dashed bg-[#E5A817]/20"></span>
                      <span>Satellite Imagery</span>
                    </span>
                    <span className="font-mono text-white">{opacityImagery}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={opacityImagery}
                    onChange={(e) => setOpacityImagery(parseInt(e.target.value))}
                    className="w-full h-1 accent-[#E5A817] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setOpacityBoxExpanded(true)}
              className="absolute bottom-4 left-4 z-20 h-9 px-3 bg-[#0B2545]/95 hover:bg-[#0B2545] text-white rounded-lg border border-white/15 shadow-xl text-[11px] font-semibold flex items-center gap-2 cursor-pointer backdrop-blur-md transition-all animate-in fade-in"
              title="Open Layer Opacity & GIS Legend"
            >
              <Sliders className="w-3.5 h-3.5 text-[#E5A817]" />
              <span>Layers & Opacity</span>
              <ChevronUp className="w-3 h-3 text-steel-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
