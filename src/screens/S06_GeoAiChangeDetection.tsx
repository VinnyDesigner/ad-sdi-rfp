import React, { useState } from 'react';
import { ScreenId } from '../types';
import { HeaderWorkspace } from '../components/common/HeaderWorkspace';
import { SidebarWorkspace } from '../components/common/SidebarWorkspace';
import { MicroFooter } from '../components/common/MicroFooter';
import {
  Sparkles,
  Sliders,
  Play,
  CheckCircle2,
  ChevronRight,
  Layers,
  ArrowRight,
  Check,
  Download,
  Share2,
  Upload,
  Pencil,
  FileCheck2,
} from 'lucide-react';

interface S06Props {
  onNavigate: (screen: ScreenId) => void;
}

export const S06_GeoAiChangeDetection: React.FC<S06Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('Change detection');
  const [confidence, setConfidence] = useState(0.8);
  const [swipePos, setSwipePos] = useState(52); // Percentage 0-100
  const [selectedDetection, setSelectedDetection] = useState<number>(1);

  const useCasePills = [
    { name: 'Candidate', count: 12 },
    { name: 'Scored', count: 8 },
    { name: 'Approved', count: 5 },
    { name: 'In development', count: 3 },
    { name: 'Production', count: 2, current: true },
  ];

  const detections = [
    { id: 1, type: 'New building', area: '1,240 m²', conf: 0.96, status: 'Pending review', color: '#7B4FD6' },
    { id: 2, type: 'Extension', area: '310 m²', conf: 0.92, status: 'Verified', color: '#0E9F8E' },
    { id: 3, type: 'New structure', area: '840 m²', conf: 0.89, status: 'Pending review', color: '#7B4FD6' },
    { id: 4, type: 'Demolition', area: '580 m²', conf: 0.94, status: 'Verified', color: '#E07B24' },
    { id: 5, type: 'New building', area: '960 m²', conf: 0.88, status: 'Flagged', color: '#7B4FD6' },
  ];

  return (
    <div className="w-full h-screen bg-canvas flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Top Bar */}
      <HeaderWorkspace currentScreen="S06_GeoAiChangeDetection" onNavigate={onNavigate} />

      <div className="flex-1 flex overflow-hidden">
        {/* 2. Sidebar (GeoAI Studio Active) */}
        <SidebarWorkspace currentScreen="S06_GeoAiChangeDetection" onNavigate={onNavigate} />

        {/* 3. Main Workspace Area */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-canvas">
          {/* Header Compact + Tabs */}
          <div className="px-8 pt-3 pb-1 bg-white border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#7B4FD6]" />
                <h1 className="text-[22px] font-bold text-navy-900 tracking-tight">
                  GeoAI Studio
                </h1>
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
                    className={`py-1.5 transition-colors font-medium ${
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
              className="text-[12px] font-semibold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>Launch Conversational Assistant →</span>
            </button>
          </div>

          {/* Use-Case Strip (full width, 52 px) */}
          <div className="px-8 py-2 bg-white/80 border-b border-border flex items-center justify-between text-[12px]">
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
              <span className="w-2 h-2 rounded-full bg-success"></span>
              <span>GPU Cluster Online (UAE Sovereign Cloud)</span>
            </div>
          </div>

          {/* Three-Zone Body (Config 300 px | Map Flex | Results 340 px) */}
          <div className="flex-1 flex overflow-hidden p-6 gap-4">
            {/* Zone 1: Analysis Configuration Panel (300 px) */}
            <div className="w-[300px] bg-white rounded-xl border border-border shadow-level-1 p-4 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="text-[13px] font-bold text-navy-900 uppercase tracking-wider">
                    Analysis Parameters
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Production
                  </span>
                </div>

                {/* Model */}
                <div>
                  <label className="text-[11px] font-semibold text-secondaryText uppercase block mb-1">
                    AI Model
                  </label>
                  <div className="p-2 rounded-lg bg-canvas border border-border text-[12px] font-bold text-navy-900 flex items-center justify-between">
                    <span>Building Change Detection v3.2</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#7B4FD6]" />
                  </div>
                </div>

                {/* Use Case */}
                <div>
                  <label className="text-[11px] font-semibold text-secondaryText uppercase block mb-1">
                    Use Case
                  </label>
                  <div className="text-[12px] text-primaryText font-medium">
                    New construction & encroachment monitoring
                  </div>
                </div>

                {/* Study Area */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-secondaryText uppercase">
                      Study Area
                    </label>
                    <div className="flex items-center gap-1 text-steel-500">
                      <button className="p-1 hover:text-navy-900" title="Draw polygon">
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button className="p-1 hover:text-navy-900" title="Upload GeoJSON">
                        <Upload className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-canvas border border-border text-[12px] font-semibold text-navy-900">
                    Khalifa City – South-West
                  </div>
                </div>

                {/* Imagery T1 and T2 */}
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded bg-canvas border border-border">
                    <div className="text-secondaryText text-[10px]">Baseline T1</div>
                    <div className="font-bold text-primaryText font-mono">Jan 2027 · 0.5m</div>
                  </div>
                  <div className="p-2 rounded bg-canvas border border-border">
                    <div className="text-secondaryText text-[10px]">Target T2</div>
                    <div className="font-bold text-primaryText font-mono">Aug 2027 · 0.5m</div>
                  </div>
                </div>

                {/* Confidence Slider (0.80) */}
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-semibold text-secondaryText uppercase">
                      Confidence Threshold
                    </span>
                    <span className="font-bold text-[#7B4FD6] font-mono">{confidence.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="0.99"
                    step="0.01"
                    value={confidence}
                    onChange={(e) => setConfidence(parseFloat(e.target.value))}
                    className="w-full accent-[#7B4FD6] cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-secondaryText font-mono mt-0.5">
                    <span>0.50 (Relaxed)</span>
                    <span>0.80 (Default)</span>
                    <span>0.99 (Strict)</span>
                  </div>
                </div>

                {/* Min Area (25 m2) */}
                <div className="flex items-center justify-between p-2 rounded bg-canvas border border-border text-[12px]">
                  <span className="text-secondaryText">Minimum Area:</span>
                  <span className="font-bold text-primaryText font-mono">25 m²</span>
                </div>
              </div>

              {/* Action & Status */}
              <div className="pt-3 border-t border-border space-y-2">
                <button className="w-full h-[40px] bg-[#7B4FD6] hover:bg-[#683eb8] text-white rounded-lg text-[13px] font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors">
                  <Play className="w-4 h-4 fill-white" />
                  <span>Run Analysis</span>
                </button>
                <div className="text-[11px] text-emerald-700 font-semibold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Completed in 4 min 12 s</span>
                </div>
              </div>
            </div>

            {/* Zone 2: Central Before/After Comparison Map (Flex) */}
            <div className="flex-1 bg-navy-900 rounded-xl border border-border shadow-level-1 overflow-hidden relative flex flex-col">
              {/* Swipe Map Header Bar */}
              <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
                <div className="bg-navy-900/90 backdrop-blur border border-white/20 px-3 py-1 rounded text-white text-[11px] font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-steel-400"></span>
                  <span>Jan 2027 (Older)</span>
                </div>
                <div className="bg-navy-900/90 backdrop-blur border border-white/20 px-3 py-1 rounded text-white text-[11px] font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold-500"></span>
                  <span>Aug 2027 (Newer)</span>
                </div>
              </div>

              {/* Map SVG with Before/After Clip */}
              <div className="w-full h-full relative overflow-hidden bg-[#0A1628]">
                {/* Background Aerial / Urban Vector */}
                <svg viewBox="0 0 600 450" className="w-full h-full object-cover">
                  {/* Basemap grid */}
                  <rect width="600" height="450" fill="#0D1E35" />
                  {/* Roads */}
                  <path d="M 0 150 L 600 150" stroke="#223B60" strokeWidth="8" />
                  <path d="M 0 320 L 600 320" stroke="#223B60" strokeWidth="6" />
                  <path d="M 280 0 L 280 450" stroke="#223B60" strokeWidth="8" />

                  {/* Parcels in background */}
                  {Array.from({ length: 4 }).map((_, r) =>
                    Array.from({ length: 5 }).map((_, c) => (
                      <rect
                        key={`${r}-${c}`}
                        x={50 + c * 105}
                        y={40 + r * 95}
                        width="80"
                        height="65"
                        fill="#152B4A"
                        stroke="#264775"
                        strokeWidth="1"
                      />
                    ))
                  )}

                  {/* Polygons: New Construction (#7B4FD6), Demolition (#E07B24), Extension (#0E9F8E) */}
                  {/* Polygon 1: Selected New Building */}
                  <g className="cursor-pointer">
                    <rect
                      x="165"
                      y="180"
                      width="60"
                      height="48"
                      rx="3"
                      fill="rgba(123, 79, 214, 0.45)"
                      stroke="#7B4FD6"
                      strokeWidth="2.5"
                      className="glow-purple"
                    />
                    <circle cx="195" cy="204" r="3" fill="#FFC20E" />
                  </g>

                  {/* Polygon 2: Extension */}
                  <polygon
                    points="370,180 410,180 410,210 390,210 390,225 370,225"
                    fill="rgba(14, 159, 142, 0.45)"
                    stroke="#0E9F8E"
                    strokeWidth="2"
                  />

                  {/* Polygon 3: Demolition */}
                  <rect
                    x="270"
                    y="60"
                    width="45"
                    height="40"
                    fill="rgba(224, 123, 36, 0.4)"
                    stroke="#E07B24"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />

                  {/* More new structures */}
                  <rect
                    x="475"
                    y="240"
                    width="55"
                    height="42"
                    fill="rgba(123, 79, 214, 0.45)"
                    stroke="#7B4FD6"
                    strokeWidth="2"
                  />
                  <rect
                    x="60"
                    y="240"
                    width="50"
                    height="38"
                    fill="rgba(123, 79, 214, 0.45)"
                    stroke="#7B4FD6"
                    strokeWidth="2"
                  />
                </svg>

                {/* Vertical Swipe Divider Handle per spec (white 2px line + round grip) */}
                <div
                  className="absolute top-0 bottom-0 z-30 pointer-events-auto cursor-ew-resize flex items-center justify-center"
                  style={{ left: `${swipePos}%` }}
                >
                  <div className="w-[2px] h-full bg-white shadow-lg" />
                  <div className="absolute w-8 h-8 rounded-full bg-white text-navy-900 shadow-2xl flex items-center justify-center font-bold text-[12px] border-2 border-navy-900">
                    ↔
                  </div>
                </div>

                {/* Selected Detection Popup on Polygon 1 */}
                <div className="absolute top-[130px] left-[170px] z-30 bg-navy-900/95 backdrop-blur text-white p-3 rounded-lg border border-purple-400 shadow-level-2 text-left w-[200px] pointer-events-none">
                  <div className="text-[12px] font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#7B4FD6]" />
                    <span>New building</span>
                  </div>
                  <div className="text-[11px] text-steel-400 mt-1 space-y-0.5 font-mono">
                    <div>Confidence: <strong className="text-emerald-400">0.96</strong></div>
                    <div>Footprint: 1,240 m²</div>
                    <div>Review: <span className="text-gold-500 font-bold">Pending</span></div>
                  </div>
                </div>

                {/* Legend Bottom-Left */}
                <div className="absolute bottom-3 left-3 z-20 bg-navy-900/90 backdrop-blur rounded-lg border border-white/10 px-3 py-2 text-[11px] text-white flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-2 rounded-sm bg-[#7B4FD6]"></span>
                    <span>New construction (168)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-2 rounded-sm bg-[#E07B24]"></span>
                    <span>Demolition (21)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-2 rounded-sm bg-[#0E9F8E]"></span>
                    <span>Extension (25)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Zone 3: Results Panel (340 px) */}
            <div className="w-[340px] bg-white rounded-xl border border-border shadow-level-1 p-4 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-3.5">
                <div>
                  <h3 className="text-[16px] font-bold text-navy-900">
                    214 changes detected
                  </h3>
                  <div className="text-[11px] text-secondaryText">
                    Processed against 0.5 m satellite orthomosaics
                  </div>
                </div>

                {/* 3 Count Tiles */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 rounded-lg bg-purple-50 border border-purple-200 text-center">
                    <div className="text-[20px] font-bold text-[#7B4FD6] font-mono leading-none">
                      168
                    </div>
                    <div className="text-[10px] text-purple-900 font-semibold mt-1">New</div>
                  </div>
                  <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-center">
                    <div className="text-[20px] font-bold text-[#E07B24] font-mono leading-none">
                      21
                    </div>
                    <div className="text-[10px] text-amber-900 font-semibold mt-1">Demolished</div>
                  </div>
                  <div className="p-2 rounded-lg bg-teal-50 border border-teal-200 text-center">
                    <div className="text-[20px] font-bold text-[#0E9F8E] font-mono leading-none">
                      25
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

                {/* List of 5 Detections */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-navy-900 uppercase tracking-wider">
                    Detected Candidate Features
                  </div>
                  {detections.map((det) => (
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
                        <div className="text-[10px] text-steel-500">{det.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-border space-y-2">
                <button
                  onClick={() => onNavigate('S04_PublishingApprovals')}
                  className="w-full h-[38px] bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[12px] font-semibold flex items-center justify-center gap-2 shadow-sm"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Send to Review Queue</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button className="h-[34px] bg-canvas hover:bg-slate-100 text-primaryText border border-border rounded-lg text-[12px] font-medium">
                    Publish
                  </button>
                  <button className="h-[34px] bg-canvas hover:bg-slate-100 text-secondaryText border border-border rounded-lg text-[12px] font-medium">
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Model Card Strip (88 px along bottom of map + results) */}
          <div className="px-8 pb-3">
            <div className="h-[76px] bg-white rounded-xl border border-border shadow-level-1 px-5 flex items-center justify-between text-[12px]">
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-secondaryText">Registry ID</div>
                  <div className="font-mono font-bold text-navy-900">MR-B-007</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-secondaryText">Model Owner</div>
                  <div className="font-medium text-primaryText">AD-SDI GeoAI Team</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-secondaryText">Training Base</div>
                  <div className="font-mono text-primaryText">14,200 labelled samples</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-secondaryText">Evaluated</div>
                  <div className="font-mono text-primaryText">30 Aug 2027</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-success"></span>
                  <span className="font-semibold text-emerald-800">Drift: Stable</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Deployment Approved
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  Human Review Required
                </span>
                <button className="text-[12px] font-bold text-blue-600 hover:underline">
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
