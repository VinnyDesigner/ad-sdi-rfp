import React, { useRef, useState, useEffect } from 'react';
import { ScreenId } from '../../types';
import { toPng } from 'html-to-image';
import {
  Download,
  Maximize2,
  Minimize2,
  ChevronDown,
  Layers,
  Sparkles,
  Shield,
  Activity,
  CheckCircle2,
  Globe,
} from 'lucide-react';

interface PresentationCanvasProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  children: React.ReactNode;
}

export const PresentationCanvas: React.FC<PresentationCanvasProps> = ({
  currentScreen,
  onNavigate,
  children,
}) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scaleMode, setScaleMode] = useState<'fit' | '100'>('fit');
  const [scaleFactor, setScaleFactor] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Compute fit-to-window scale
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      if (scaleMode === '100') {
        setScaleFactor(1);
        return;
      }
      const availableWidth = window.innerWidth - 32;
      const availableHeight = window.innerHeight - 74; // minus top presentation bar
      const scaleX = availableWidth / 1440;
      const scaleY = availableHeight / 1018;
      const fitScale = Math.min(scaleX, scaleY, 1);
      setScaleFactor(Math.max(fitScale, 0.45));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scaleMode]);

  // Export 2x PNG per spec
  const handleExportPng = async () => {
    if (!frameRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(frameRef.current, {
        pixelRatio: 2,
        width: 1440,
        height: 1018,
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `${currentScreen}_2880x2036.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const screensConfig: { id: ScreenId; label: string; tag: string; group: string }[] = [
    { id: 'S00_Login', label: 'S00 — Login (Split Screen)', tag: 'Auth', group: 'Authentication' },
    { id: 'S00_Login_AR', label: 'S00 — Login (العربية / RTL)', tag: 'Arabic', group: 'Authentication' },
    { id: 'S01_Home', label: 'S01 — Public Home', tag: 'Public', group: 'Public Platform' },
    { id: 'S01_Home_AR', label: 'S01 — Home (العربية / RTL)', tag: 'Arabic', group: 'Public Platform' },
    { id: 'S02_CatalogueSearch', label: 'S02 — Catalogue Search + Map', tag: 'Catalogue', group: 'Discover' },
    { id: 'S03_DatasetDetail', label: 'S03 — Dataset Detail (Cadastre)', tag: 'Detail', group: 'Discover' },
    { id: 'S04_PublishingApprovals', label: 'S04 — Publishing & Approvals', tag: 'Govern', group: 'Governance' },
    { id: 'S05_QualitySlaDashboard', label: 'S05 — Quality & SLA Dashboard', tag: 'SLA', group: 'Governance' },
    { id: 'S06_GeoAiChangeDetection', label: 'S06 — GeoAI: Change Detection', tag: 'GeoAI', group: 'Build & AI' },
    { id: 'S07_GeoAiAssistant', label: 'S07 — GeoAI Assistant (Chat GIS)', tag: 'Assistant', group: 'Build & AI' },
    { id: 'S08_MarketplaceCatalogue', label: 'S08 — Marketplace Catalogue', tag: 'Market', group: 'Marketplace' },
    { id: 'S09a_MarketplaceRequest', label: 'S09a — Marketplace Request Modal', tag: 'Modal', group: 'Marketplace' },
    { id: 'S09b_MyEntitlements', label: 'S09b — My Entitlements', tag: 'Access', group: 'Marketplace' },
    { id: 'S09c_ProviderWorkspace', label: 'S09c — Provider Workspace', tag: 'Partner', group: 'Marketplace' },
    { id: 'S10_DigitalTwin3d', label: 'S10 — Digital Twin 3D (Showcase)', tag: 'Twin 3D', group: 'Showcase' },
    { id: 'S11_ProgrammeCommandCentre', label: 'S11 — Programme Command Centre', tag: 'Gantt', group: 'Showcase' },
    { id: 'S12_GeoMaturityTraining', label: 'S12 — GeoMaturity & Training', tag: 'Capacity', group: 'Enable' },
    { id: 'S13_OpenDataPortal', label: 'S13 — Open Data Portal', tag: 'Open Data', group: 'Public Platform' },
    { id: 'S13_OpenDataPortal_AR', label: 'S13 — Open Data (العربية / RTL)', tag: 'Arabic', group: 'Public Platform' },
    { id: 'S14_SecurityAccessConsole', label: 'S14 — Security & Access Console', tag: 'Security', group: 'Governance' },
  ];

  const currentMeta = screensConfig.find((s) => s.id === currentScreen) || screensConfig[2];

  return (
    <div className="min-h-screen bg-[#060D17] text-white flex flex-col items-center select-none font-sans">
      {/* Top Presentation Bar */}
      <div className="w-full h-[58px] bg-[#0B1728] border-b border-white/10 px-6 flex items-center justify-between z-50 sticky top-0 shadow-lg">
        {/* Left: Branding & Current Screen Selector */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gold-500 animate-pulse" />
            <span className="text-[13px] font-bold tracking-tight text-white">AD-SDI Frame Viewer</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-steel-400 border border-white/10">
              1440 × 1018
            </span>
          </div>

          <div className="h-5 w-[1px] bg-white/20" />

          {/* Screen Picker Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-white text-[13px] font-semibold border border-white/15 transition-colors"
            >
              <span className="text-gold-500 font-mono text-[12px]">{currentMeta.id.split('_')[0]}</span>
              <span>{currentMeta.label.split('—')[1]?.trim() || currentMeta.label}</span>
              <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-600/30 text-blue-400 border border-blue-500/20">
                {currentMeta.tag}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-steel-400" />
            </button>

            {menuOpen && (
              <div
                className="absolute left-0 top-full mt-2 w-[340px] max-h-[520px] overflow-y-auto bg-[#0E1E34] border border-white/20 rounded-xl shadow-2xl p-2 z-50 space-y-1"
                onMouseLeave={() => setMenuOpen(false)}
              >
                <div className="text-[10px] font-bold text-steel-400 uppercase tracking-wider px-2 py-1">
                  15 Core Screens + Sub-Views + Arabic
                </div>
                {screensConfig.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      onNavigate(sc.id);
                      setMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[12px] flex items-center justify-between transition-colors ${
                      currentScreen === sc.id
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-steel-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-gold-500 text-[11px] w-8">{sc.id.split('_')[0]}</span>
                      <span className="truncate">{sc.label.split('—')[1]?.trim() || sc.label}</span>
                    </div>
                    <span className="text-[10px] opacity-75 font-mono">{sc.tag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Quick category shortcuts */}
        <div className="hidden xl:flex items-center gap-1.5 bg-black/30 p-1 rounded-lg border border-white/10 text-[11px]">
          <button
            onClick={() => onNavigate('S01_Home')}
            className={`px-2.5 py-1 rounded transition-colors ${currentScreen.startsWith('S01') ? 'bg-blue-600 text-white font-semibold' : 'text-steel-400 hover:text-white'}`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('S02_CatalogueSearch')}
            className={`px-2.5 py-1 rounded transition-colors ${currentScreen === 'S02_CatalogueSearch' || currentScreen === 'S03_DatasetDetail' ? 'bg-blue-600 text-white font-semibold' : 'text-steel-400 hover:text-white'}`}
          >
            Catalogue
          </button>
          <button
            onClick={() => onNavigate('S04_PublishingApprovals')}
            className={`px-2.5 py-1 rounded transition-colors ${currentScreen === 'S04_PublishingApprovals' ? 'bg-blue-600 text-white font-semibold' : 'text-steel-400 hover:text-white'}`}
          >
            Approvals
          </button>
          <button
            onClick={() => onNavigate('S06_GeoAiChangeDetection')}
            className={`px-2.5 py-1 rounded transition-colors ${currentScreen.startsWith('S06') || currentScreen.startsWith('S07') ? 'bg-blue-600 text-white font-semibold' : 'text-steel-400 hover:text-white'}`}
          >
            GeoAI
          </button>
          <button
            onClick={() => onNavigate('S08_MarketplaceCatalogue')}
            className={`px-2.5 py-1 rounded transition-colors ${currentScreen.startsWith('S08') || currentScreen.startsWith('S09') ? 'bg-blue-600 text-white font-semibold' : 'text-steel-400 hover:text-white'}`}
          >
            Marketplace
          </button>
          <button
            onClick={() => onNavigate('S10_DigitalTwin3d')}
            className={`px-2.5 py-1 rounded transition-colors ${currentScreen === 'S10_DigitalTwin3d' ? 'bg-blue-600 text-white font-semibold' : 'text-steel-400 hover:text-white'}`}
          >
            Digital Twin 3D
          </button>
          <button
            onClick={() => onNavigate('S11_ProgrammeCommandCentre')}
            className={`px-2.5 py-1 rounded transition-colors ${currentScreen === 'S11_ProgrammeCommandCentre' ? 'bg-blue-600 text-white font-semibold' : 'text-steel-400 hover:text-white'}`}
          >
            Command Centre
          </button>
          <button
            onClick={() => onNavigate('S13_OpenDataPortal')}
            className={`px-2.5 py-1 rounded transition-colors ${currentScreen.startsWith('S13') ? 'bg-blue-600 text-white font-semibold' : 'text-steel-400 hover:text-white'}`}
          >
            Open Data
          </button>
          <button
            onClick={() => onNavigate('S00_Login_AR')}
            className={`px-2.5 py-1 rounded font-arabic transition-colors ${currentScreen.endsWith('_AR') ? 'bg-gold-500 text-navy-900 font-bold' : 'text-steel-400 hover:text-white'}`}
          >
            العربية (RTL)
          </button>
        </div>

        {/* Right: Viewport Controls & 2x PNG Export */}
        <div className="flex items-center gap-3">
          {/* Scale mode toggle */}
          <div className="flex items-center bg-navy-800 rounded-lg p-0.5 border border-white/10 text-[12px]">
            <button
              onClick={() => setScaleMode('fit')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                scaleMode === 'fit' ? 'bg-blue-600 text-white font-semibold' : 'text-steel-400 hover:text-white'
              }`}
              title="Fit artboard into window height and width"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Fit Window ({Math.round(scaleFactor * 100)}%)</span>
            </button>
            <button
              onClick={() => setScaleMode('100')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                scaleMode === '100' ? 'bg-blue-600 text-white font-semibold' : 'text-steel-400 hover:text-white'
              }`}
              title="View at native 1440x1018 pixels"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>100% (1:1)</span>
            </button>
          </div>

          {/* Export PNG 2x Button */}
          <button
            onClick={handleExportPng}
            disabled={isExporting}
            className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-900 px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition-all shadow-md active:scale-95 disabled:opacity-50"
            title="Download fixed 1440x1018 frame as 2880x2036 PNG @2x"
          >
            <Download className="w-4 h-4 text-navy-900" />
            <span>{isExporting ? 'Exporting...' : 'Export @2x PNG'}</span>
          </button>
        </div>
      </div>

      {/* Frame Canvas Container */}
      <div
        ref={containerRef}
        className="flex-1 w-full flex items-center justify-center p-4 overflow-auto relative"
      >
        <div
          ref={frameRef}
          className="artboard-frame bg-white shadow-2xl rounded-sm border border-slate-700/40 relative flex-shrink-0 transition-transform origin-center"
          style={{
            transform: scaleMode === 'fit' ? `scale(${scaleFactor})` : 'none',
            transformOrigin: 'top center',
            marginBottom: scaleMode === 'fit' ? `-${1018 * (1 - scaleFactor)}px` : '24px',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
