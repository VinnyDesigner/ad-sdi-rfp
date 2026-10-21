import React, { useState } from 'react';
import { ScreenId } from '../types';
import { HeaderWorkspace } from '../components/common/HeaderWorkspace';
import { SidebarWorkspace } from '../components/common/SidebarWorkspace';
import { MicroFooter } from '../components/common/MicroFooter';
import { InteractiveMap } from '../components/common/InteractiveMap';
import {
  Sparkles,
  Play,
  CheckCircle2,
  ArrowRight,
  Download,
  FileCheck2,
  Sliders,
  Check,
  RotateCcw,
} from 'lucide-react';

interface S06Props {
  onNavigate: (screen: ScreenId) => void;
}

export const S06_GeoAiChangeDetection: React.FC<S06Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('Change detection');
  const [confidence, setConfidence] = useState(0.8);
  const [selectedDetection, setSelectedDetection] = useState<number>(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [detections, setDetections] = useState([
    { id: 1, type: 'New building', area: '1,240 m²', conf: 0.96, status: 'Pending review', color: '#7B4FD6' },
    { id: 2, type: 'Extension', area: '310 m²', conf: 0.92, status: 'Verified', color: '#0E9F8E' },
    { id: 3, type: 'Demolition', area: '580 m²', conf: 0.94, status: 'Verified', color: '#E07B24' },
    { id: 4, type: 'New structure', area: '840 m²', conf: 0.89, status: 'Pending review', color: '#7B4FD6' },
    { id: 5, type: 'New building', area: '960 m²', conf: 0.88, status: 'Flagged', color: '#7B4FD6' },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const useCasePills = [
    { name: 'Candidate', count: 12 },
    { name: 'Scored', count: 8 },
    { name: 'Approved', count: 5 },
    { name: 'In development', count: 3 },
    { name: 'Production', count: 2, current: true },
  ];

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(15);
    showToast('GPU Cluster: Ingesting high-resolution orthophoto tiles...');

    const interval = setInterval(() => {
      setAnalysisProgress((p) => {
        if (p >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setAnalysisProgress(100);
            showToast('AI Inference complete: 5 changes identified with >80% confidence');
          }, 400);
          return 95;
        }
        return p + 25;
      });
    }, 300);
  };

  const handleVerifyDetection = (id: number) => {
    setDetections((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'Verified' } : d))
    );
    showToast(`Detection #${id} marked as Verified`);
  };

  const handleExportGeoJSON = () => {
    const geojsonData = {
      type: 'FeatureCollection',
      name: 'AbuDhabi_GeoAI_ChangeDetections',
      features: detections.map((d) => ({
        type: 'Feature',
        properties: {
          id: d.id,
          change_type: d.type,
          area_sqm: d.area,
          confidence: d.conf,
          status: d.status,
          evaluated_at: '2027-08-30T10:15:00Z',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [54.537, 24.451],
              [54.543, 24.451],
              [54.543, 24.455],
              [54.537, 24.455],
              [54.537, 24.451],
            ],
          ],
        },
      })),
    };

    const blob = new Blob([JSON.stringify(geojsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'GeoAI_ChangeDetections_AbuDhabi.geojson';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Exported GeoJSON detections file');
  };

  const filteredDetections = detections.filter((d) => d.conf >= confidence);

  return (
    <div className="w-full h-screen bg-canvas flex flex-col justify-between overflow-hidden select-none font-sans relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-20 right-6 z-50 bg-navy-900 text-white px-4 py-2 rounded-xl shadow-2xl border border-white/20 text-[12px] flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Top Bar */}
      <HeaderWorkspace currentScreen="S06_GeoAiChangeDetection" onNavigate={onNavigate} />

      <div className="flex-1 flex overflow-hidden">
        {/* 2. Sidebar */}
        <SidebarWorkspace currentScreen="S06_GeoAiChangeDetection" onNavigate={onNavigate} />

        {/* 3. Main Workspace Area */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-canvas">
          {/* Header Compact + Tabs */}
          <div className="px-8 pt-3 pb-1 bg-white border-b border-border flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#7B4FD6]" />
                <h1 className="text-[22px] font-bold text-navy-900 tracking-tight">GeoAI Studio</h1>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-900 border border-purple-200">
                  Module B · AI Engine
                </span>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-4 text-[13px] ml-6 border-l border-border pl-6">
                {['Change detection', 'Feature extraction', 'Models', 'Use cases'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`py-1.5 transition-colors font-medium cursor-pointer ${
                      activeTab === t
                        ? 'text-[#7B4FD6] font-bold border-b-2 border-[#7B4FD6]'
                        : 'text-secondaryText hover:text-navy-900'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigate('S07_GeoAiAssistant')}
              className="text-[12px] font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Launch Conversational Assistant →</span>
            </button>
          </div>

          {/* Use-Case Strip */}
          <div className="px-8 py-2 bg-white/80 border-b border-border flex items-center justify-between text-[12px] flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-secondaryText uppercase tracking-wider text-[11px]">
                Model Pipeline:
              </span>
              <div className="flex items-center gap-2">
                {useCasePills.map((uc, uIdx) => (
                  <React.Fragment key={uIdx}>
                    <div
                      className={`px-3 py-1 rounded-full flex items-center gap-1.5 font-medium ${
                        uc.current
                          ? 'bg-[#7B4FD6] text-white font-bold shadow-sm'
                          : 'bg-canvas text-secondaryText border border-border'
                      }`}
                    >
                      <span>{uc.name}</span>
                      <span
                        className={`text-[10px] font-mono px-1 rounded-full ${
                          uc.current ? 'bg-white/20 text-white' : 'bg-border text-secondaryText'
                        }`}
                      >
                        {uc.count}
                      </span>
                    </div>
                    {uIdx < useCasePills.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-steel-400" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-secondaryText">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>GPU Cluster Online (UAE Sovereign Cloud)</span>
            </div>
          </div>

          {/* Three-Zone Body */}
          <div className="flex-1 flex overflow-hidden p-6 gap-4">
            {/* Zone 1: Analysis Configuration Panel (300 px) */}
            <div className="w-[300px] bg-white rounded-xl border border-border shadow-level-1 p-4 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="text-[13px] font-bold text-navy-900 flex items-center gap-2 pb-2 border-b border-border">
                  <Sliders className="w-4 h-4 text-[#7B4FD6]" />
                  <span>Detection Parameters</span>
                </div>

                {/* Target Region */}
                <div>
                  <label className="text-[11px] font-semibold text-secondaryText uppercase block mb-1">
                    Region of Interest
                  </label>
                  <select className="w-full h-9 px-2.5 rounded-lg border border-border bg-slate-50 text-[12px] font-medium text-navy-900 outline-none">
                    <option>Khalifa City Industrial Zone</option>
                    <option>Mussafah Expansion District</option>
                    <option>Saadiyat Island Cultural Zone</option>
                    <option>Al Ain Regional Sector</option>
                  </select>
                </div>

                {/* Imagery Pairs */}
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-secondaryText uppercase">
                    Temporal Baseline (Pair)
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-border text-[11px]">
                    <span className="text-secondaryText">T1 (Reference):</span>
                    <div className="font-bold text-primaryText font-mono">Jan 2027 · 0.5m Orthophoto</div>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-border text-[11px]">
                    <span className="text-secondaryText">T2 (Observation):</span>
                    <div className="font-bold text-primaryText font-mono">Aug 2027 · 0.5m Orthophoto</div>
                  </div>
                </div>

                {/* Confidence Slider */}
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-semibold text-secondaryText uppercase">Confidence Threshold</span>
                    <span className="font-bold text-[#7B4FD6] font-mono">{confidence.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="0.98"
                    step="0.01"
                    value={confidence}
                    onChange={(e) => setConfidence(parseFloat(e.target.value))}
                    className="w-full accent-[#7B4FD6] cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-secondaryText font-mono mt-0.5">
                    <span>0.50 (Relaxed)</span>
                    <span>0.80 (Default)</span>
                    <span>0.98 (Strict)</span>
                  </div>
                </div>

                {/* Min Area */}
                <div className="flex items-center justify-between p-2 rounded bg-canvas border border-border text-[12px]">
                  <span className="text-secondaryText">Minimum Footprint:</span>
                  <span className="font-bold text-primaryText font-mono">25 m²</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-border space-y-2">
                <button
                  onClick={handleRunAnalysis}
                  disabled={isAnalyzing}
                  className="w-full h-[40px] bg-[#7B4FD6] hover:bg-[#683eb8] text-white rounded-lg text-[13px] font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{isAnalyzing ? `Analyzing (${analysisProgress}%)` : 'Run AI Analysis'}</span>
                </button>
                <div className="text-[11px] text-emerald-700 font-semibold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>GPU Cluster ready · Latency &lt; 4s</span>
                </div>
              </div>
            </div>

            {/* Zone 2: Central Real Interactive High-Res GIS Map (Flex) */}
            <div className="flex-1 bg-navy-900 rounded-xl border border-border shadow-level-1 overflow-hidden relative flex flex-col">
              {/* Header Bar */}
              <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
                <div className="bg-navy-900/90 backdrop-blur border border-white/20 px-3 py-1 rounded text-white text-[11px] font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-steel-400"></span>
                  <span>Reference: Jan 2027</span>
                </div>
                <div className="bg-navy-900/90 backdrop-blur border border-white/20 px-3 py-1 rounded text-white text-[11px] font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold-500"></span>
                  <span>Observation: Aug 2027</span>
                </div>
              </div>

              {/* Real Leaflet Map */}
              <div className="w-full h-full relative">
                <InteractiveMap
                  mode="geoai"
                  highlightedId={selectedDetection}
                  onSelectFeature={(id) => setSelectedDetection(Number(id))}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Zone 3: Results Panel (340 px) */}
            <div className="w-[340px] bg-white rounded-xl border border-border shadow-level-1 p-4 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-3.5">
                <div>
                  <h3 className="text-[16px] font-bold text-navy-900">
                    {filteredDetections.length} candidate changes
                  </h3>
                  <div className="text-[11px] text-secondaryText">
                    Processed against 0.5 m satellite orthomosaics
                  </div>
                </div>

                {/* 3 Count Tiles */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 rounded-lg bg-purple-50 border border-purple-200 text-center">
                    <div className="text-[20px] font-bold text-[#7B4FD6] font-mono leading-none">
                      {detections.filter((d) => d.type.includes('New')).length}
                    </div>
                    <div className="text-[10px] text-purple-900 font-semibold mt-1">New</div>
                  </div>
                  <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-center">
                    <div className="text-[20px] font-bold text-[#E07B24] font-mono leading-none">
                      {detections.filter((d) => d.type.includes('Demolition')).length}
                    </div>
                    <div className="text-[10px] text-amber-900 font-semibold mt-1">Demolished</div>
                  </div>
                  <div className="p-2 rounded-lg bg-teal-50 border border-teal-200 text-center">
                    <div className="text-[20px] font-bold text-[#0E9F8E] font-mono leading-none">
                      {detections.filter((d) => d.type.includes('Extension')).length}
                    </div>
                    <div className="text-[10px] text-teal-900 font-semibold mt-1">Extensions</div>
                  </div>
                </div>

                {/* Metrics Row */}
                <div className="p-2.5 rounded-lg bg-canvas border border-border space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-secondaryText">Model Quality Metrics</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Meets threshold
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[12px] font-mono">
                    <div>P: <strong className="text-navy-900">0.93</strong></div>
                    <div>R: <strong className="text-navy-900">0.89</strong></div>
                    <div>F1: <strong className="text-[#7B4FD6] font-bold">0.91</strong></div>
                  </div>
                </div>

                {/* List of Detections */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-navy-900 uppercase tracking-wider">
                    Detected Candidate Features
                  </div>
                  {filteredDetections.map((det) => (
                    <div
                      key={det.id}
                      onClick={() => setSelectedDetection(det.id)}
                      className={`p-2 rounded-lg border text-[11px] flex items-center justify-between cursor-pointer transition-colors ${
                        selectedDetection === det.id
                          ? 'border-[#7B4FD6] bg-purple-50/40 font-semibold'
                          : 'border-border/80 hover:bg-canvas'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-sm"
                          style={{ backgroundColor: det.color }}
                        />
                        <div>
                          <div className="text-primaryText font-medium">{det.type}</div>
                          <div className="text-[10px] text-secondaryText">{det.area}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-primaryText font-bold">
                          {(det.conf * 100).toFixed(0)}%
                        </div>
                        <div
                          className={`text-[10px] font-semibold ${
                            det.status === 'Verified' ? 'text-emerald-700' : 'text-amber-700'
                          }`}
                        >
                          {det.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Verify single item button */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleVerifyDetection(selectedDetection)}
                    className="flex-1 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Verify Selection</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-border space-y-2">
                <button
                  onClick={() => onNavigate('S04_PublishingApprovals')}
                  className="w-full h-[38px] bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[12px] font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Send to Review Queue</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => showToast('Changes published to DMT Cadastral Stage')}
                    className="h-[34px] bg-canvas hover:bg-slate-100 text-primaryText border border-border rounded-lg text-[12px] font-medium cursor-pointer"
                  >
                    Publish
                  </button>
                  <button
                    onClick={handleExportGeoJSON}
                    className="h-[34px] bg-canvas hover:bg-slate-100 text-secondaryText border border-border rounded-lg text-[12px] font-medium flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Model Card Strip */}
          <div className="px-8 pb-3 flex-shrink-0">
            <div className="h-[68px] bg-white rounded-xl border border-border shadow-level-1 px-5 flex items-center justify-between text-[12px]">
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-secondaryText">Registry ID</div>
                  <div className="font-mono font-bold text-navy-900">MR-B-007</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-secondaryText">Model Owner</div>
                  <div className="font-medium text-primaryText">AD-SDI GeoAI Lab</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-secondaryText">Training Base</div>
                  <div className="font-mono text-primaryText">14,200 labeled Abu Dhabi samples</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-emerald-800">Model Drift: Stable</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Deployment Approved
                </span>
                <button
                  onClick={() => showToast('Opening Model Card MR-B-007 details')}
                  className="text-[12px] font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  View Model Card →
                </button>
              </div>
            </div>
          </div>

          {/* Micro Footer */}
          <MicroFooter />
        </div>
      </div>
    </div>
  );
};
