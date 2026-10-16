import React, { useState } from 'react';
import { ScreenId } from '../types';
import { HeaderWorkspace } from '../components/common/HeaderWorkspace';
import { SidebarWorkspace } from '../components/common/SidebarWorkspace';
import { MicroFooter } from '../components/common/MicroFooter';
import {
  Layers,
  Play,
  Pause,
  Compass,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sliders,
  Eye,
  Activity,
  Cpu,
  Wind,
  Zap,
  Building,
  Radio,
  CheckCircle2,
  Info,
  Calendar,
} from 'lucide-react';

interface S10Props {
  onNavigate: (screen: ScreenId) => void;
}

export const S10_DigitalTwin3d: React.FC<S10Props> = ({ onNavigate }) => {
  const [useCase, setUseCase] = useState('Urban planning');
  const [timelineYear, setTimelineYear] = useState(2027);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Layer toggles
  const [layers, setLayers] = useState({
    terrain: true,
    buildings3d: true,
    bim: true,
    utilities: true,
    sensors: true,
    traffic: true,
    planningZones: false,
  });

  const [buildingOpacity, setBuildingOpacity] = useState(85);
  const [utilityOpacity, setUtilityOpacity] = useState(70);

  const toggleLayer = (k: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  const useCases = [
    'Urban planning',
    'Assets & facilities',
    'Mobility & environment',
    'Site context',
    'Resilience',
  ];

  return (
    <div className="w-full h-screen bg-[#0A1628] text-white flex flex-col justify-between overflow-hidden select-none font-sans relative">
      {/* 1. Unified Enterprise Top Bar */}
      <HeaderWorkspace currentScreen="S10_DigitalTwin3d" onNavigate={onNavigate} />

      <div className="flex-1 flex overflow-hidden relative">
        {/* 2. Collapsed Dark Sidebar (72 px) */}
        <SidebarWorkspace
          currentScreen="S10_DigitalTwin3d"
          onNavigate={onNavigate}
          collapsed={true}
          isDarkTheme={true}
        />

        {/* 3. Full-Bleed 3D Scene Viewport */}
        <div className="flex-1 h-full relative overflow-hidden bg-[#07111E]">
          {/* SVG/Canvas Isometric 3D City Rendering (Waterfront District, Dusk, Cyan Glowing Tower, Utilities Cut, IoT Markers) */}
          <div className="absolute inset-0">
            <svg
              viewBox="0 0 1100 850"
              className="w-full h-full object-cover"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                {/* Dusk Sky Gradient */}
                <linearGradient id="duskSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0B1728" />
                  <stop offset="60%" stopColor="#102542" />
                  <stop offset="100%" stopColor="#16345A" />
                </linearGradient>

                {/* Waterfront Water Gradient with Reflections */}
                <linearGradient id="waterGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#0A1C33" />
                  <stop offset="50%" stopColor="#0E284A" />
                  <stop offset="100%" stopColor="#08182C" />
                </linearGradient>

                {/* Building Side Gradients */}
                <linearGradient id="bldSide1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1A3459" />
                  <stop offset="100%" stopColor="#142B4B" />
                </linearGradient>
                <linearGradient id="bldSide2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#244573" />
                  <stop offset="100%" stopColor="#1E3960" />
                </linearGradient>

                {/* Cyan Hero Tower Gradient */}
                <linearGradient id="heroTower" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#43C8FF" />
                  <stop offset="100%" stopColor="#1B78B3" />
                </linearGradient>

                {/* Underground utility glow */}
                <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Sky Background */}
              <rect width="1100" height="850" fill="url(#duskSky)" />

              {/* Distant Sea Horizon */}
              <path
                d="M 0 340 Q 300 320 600 350 T 1100 330 L 1100 850 L 0 850 Z"
                fill="url(#waterGrad)"
              />

              {/* Water specular ripples */}
              {Array.from({ length: 14 }).map((_, i) => (
                <ellipse
                  key={i}
                  cx={180 + i * 60}
                  cy={580 + (i % 4) * 45}
                  rx={40 + (i % 3) * 20}
                  ry={3}
                  fill="rgba(43, 166, 222, 0.15)"
                />
              ))}

              {/* Mainland Waterfront Quayside / Promenade Platform */}
              <polygon
                points="220,440 940,320 1080,480 320,680"
                fill="#13243B"
                stroke="#2B4973"
                strokeWidth="2"
              />

              {/* Semi-transparent Ground Cut revealing underground utilities per spec! */}
              {layers.utilities && (
                <g id="underground-cut" opacity={utilityOpacity / 100}>
                  {/* Ground trench opening */}
                  <polygon
                    points="380,590 560,530 640,620 440,680"
                    fill="rgba(8, 18, 32, 0.85)"
                    stroke="#FFC20E"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                  {/* Water pipe (Cyan) */}
                  <path
                    d="M 390 600 L 550 545 L 630 625"
                    stroke="#2BA6DE"
                    strokeWidth="4"
                    fill="none"
                    filter="url(#glowCyan)"
                  />
                  {/* Power cable (Gold) */}
                  <path
                    d="M 405 615 L 565 560 L 635 635"
                    stroke="#FFC20E"
                    strokeWidth="3"
                    fill="none"
                  />
                  {/* Fiber optic network (Green) */}
                  <path
                    d="M 420 630 L 580 575 L 640 645"
                    stroke="#1E9E6A"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <text x="500" y="615" fill="#7A9CC6" fontSize="10" fontFamily="monospace">
                    UTILITY CORRIDOR -6.5m
                  </text>
                </g>
              )}

              {/* Roads with Traffic Flow (Green to Amber vectors) */}
              {layers.traffic && (
                <g id="traffic-roads">
                  <path
                    d="M 280 490 L 860 380"
                    stroke="#1E9E6A"
                    strokeWidth="8"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                  <path
                    d="M 330 550 L 910 440"
                    stroke="#E8A317"
                    strokeWidth="7"
                    strokeLinecap="round"
                    opacity="0.75"
                  />
                  <path
                    d="M 440 370 L 620 580"
                    stroke="#1E9E6A"
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                </g>
              )}

              {/* 3D Buildings Blocks in Waterfront District */}
              {layers.buildings3d && (
                <g id="buildings-3d" opacity={buildingOpacity / 100}>
                  {/* Building Block 1 */}
                  <polygon points="320,440 370,415 370,310 320,335" fill="url(#bldSide1)" />
                  <polygon points="370,415 440,435 440,330 370,310" fill="url(#bldSide2)" />
                  <polygon points="320,335 370,310 440,330 390,355" fill="#2E5587" />

                  {/* Building Block 2 (Low-rise commercial) */}
                  <polygon points="460,440 510,420 510,360 460,380" fill="url(#bldSide1)" />
                  <polygon points="510,420 580,440 580,380 510,360" fill="url(#bldSide2)" />
                  <polygon points="460,380 510,360 580,380 530,400" fill="#2E5587" />

                  {/* Building Block 3 (Rear residential towers) */}
                  <polygon points="620,380 660,360 660,240 620,260" fill="url(#bldSide1)" />
                  <polygon points="660,360 720,380 720,260 660,240" fill="url(#bldSide2)" />
                  <polygon points="620,260 660,240 720,260 680,280" fill="#2E5587" />

                  <polygon points="740,360 780,340 780,220 740,240" fill="url(#bldSide1)" />
                  <polygon points="780,340 840,360 840,240 780,220" fill="url(#bldSide2)" />
                  <polygon points="740,240 780,220 840,240 800,260" fill="#2E5587" />

                  {/* HERO TOWER: "Tower AD-BLD-000482" (Highlighted in Cyan #2BA6DE with Glow!) */}
                  <g id="hero-tower" className="cursor-pointer">
                    {/* Outline glow */}
                    <polygon
                      points="500,470 560,440 560,160 500,190"
                      fill="#1F5FAD"
                      stroke="#2BA6DE"
                      strokeWidth="3"
                      filter="url(#glowCyan)"
                    />
                    <polygon
                      points="560,440 650,470 650,190 560,160"
                      fill="#2BA6DE"
                      stroke="#43C8FF"
                      strokeWidth="3"
                      filter="url(#glowCyan)"
                    />
                    {/* Roof slab */}
                    <polygon
                      points="500,190 560,160 650,190 590,220"
                      fill="#7A9CC6"
                      stroke="#43C8FF"
                      strokeWidth="2"
                    />

                    {/* Window lights grid */}
                    {Array.from({ length: 14 }).map((_, f) => (
                      <React.Fragment key={f}>
                        <line
                          x1="510"
                          y1={200 + f * 18}
                          x2="550"
                          y2={180 + f * 18}
                          stroke="rgba(255, 255, 255, 0.45)"
                          strokeWidth="1.5"
                        />
                        <line
                          x1="570"
                          y1={180 + f * 18}
                          x2="640"
                          y2={205 + f * 18}
                          stroke="rgba(255, 255, 255, 0.65)"
                          strokeWidth="1.5"
                        />
                      </React.Fragment>
                    ))}

                    {/* Antenna on top */}
                    <line x1="575" y1="175" x2="575" y2="120" stroke="#FFC20E" strokeWidth="2" />
                    <circle cx="575" cy="120" r="3" fill="#FFC20E" className="animate-ping" />
                  </g>
                </g>
              )}

              {/* 12 Floating IoT Sensor Markers with Soft Pulse Rings */}
              {layers.sensors && (
                <g id="iot-sensors">
                  {[
                    { x: 380, y: 390, type: 'AQ', label: 'AQ-0117' },
                    { x: 490, y: 360, type: 'Noise', label: 'NS-0042' },
                    { x: 610, y: 440, type: 'Traffic', label: 'TR-0881' },
                    { x: 420, y: 470, type: 'Energy', label: 'EG-0312' },
                    { x: 710, y: 350, type: 'AQ', label: 'AQ-0119' },
                    { x: 550, y: 490, type: 'Water', label: 'WT-0094' },
                    { x: 330, y: 520, type: 'Camera', label: 'CAM-021' },
                    { x: 780, y: 380, type: 'AQ', label: 'AQ-0120' },
                    { x: 670, y: 420, type: 'Power', label: 'PW-0551' },
                    { x: 450, y: 540, type: 'Waste', label: 'WS-0104' },
                    { x: 840, y: 410, type: 'Pedestrian', label: 'PD-039' },
                    { x: 520, y: 560, type: 'Structural', label: 'ST-0018' },
                  ].map((s, idx) => (
                    <g key={idx} className="cursor-pointer">
                      {/* Pulse Ring */}
                      <circle cx={s.x} cy={s.y} r="14" fill="#2BA6DE" opacity="0.25" />
                      <circle
                        cx={s.x}
                        cy={s.y}
                        r="8"
                        fill="#0B2545"
                        stroke="#2BA6DE"
                        strokeWidth="2"
                      />
                      <circle cx={s.x} cy={s.y} r="3" fill="#FFC20E" />
                    </g>
                  ))}
                </g>
              )}
            </svg>
          </div>

          {/* Floating UI Elements: */}

          {/* Top-Left: Pilot Area Pill */}
          <div className="absolute top-4 left-4 z-20">
            <div className="bg-[#13233D]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-level-2 flex items-center gap-2 text-[12px] font-medium text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Pilot Area · Waterfront District</span>
              <Info className="w-3.5 h-3.5 text-steel-400 ml-1" />
            </div>
          </div>

          {/* Top-Center: Use-Case Selector & Scenario Comparison */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
            {/* Segmented use-case tabs */}
            <div className="bg-[#13233D]/90 backdrop-blur-md p-1 rounded-xl border border-white/10 shadow-level-2 flex items-center gap-1 text-[12px]">
              {useCases.map((uc) => (
                <button
                  key={uc}
                  onClick={() => setUseCase(uc)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    useCase === uc
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : 'text-steel-400 hover:text-white'
                  }`}
                >
                  {uc}
                </button>
              ))}
            </div>

            {/* Scenario Comparison Pills */}
            <div className="flex items-center gap-2 bg-[#13233D]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px]">
              <span className="px-2 py-0.5 rounded bg-blue-600/40 text-blue-300 font-semibold border border-blue-400/30">
                A: Approved Masterplan
              </span>
              <span className="text-steel-400">vs</span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-steel-300 font-semibold border border-white/10">
                B: Proposed 2030 Amendment
              </span>
              <button className="text-gold-500 font-bold ml-1 hover:underline">
                Compare Side-by-Side ⇄
              </button>
            </div>
          </div>

          {/* Left Panel: Layers (264 px) */}
          <div className="absolute top-16 left-4 z-20 w-[264px] bg-[#13233D]/92 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl p-4 space-y-3.5 text-[12px]">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-gold-500" />
                <span>Digital Twin Layers</span>
              </span>
              <span className="text-[10px] text-steel-400">7 Active</span>
            </div>

            {/* Toggles */}
            <div className="space-y-1.5">
              {[
                { k: 'terrain', label: 'High-Res Bathymetry & Terrain' },
                { k: 'buildings3d', label: '3D LOD2 Building Meshes' },
                { k: 'bim', label: 'BIM Architectural Models (IFC)' },
                { k: 'utilities', label: 'Underground Utilities (-6.5m)' },
                { k: 'sensors', label: 'Live IoT Sensor Feeds (48)' },
                { k: 'traffic', label: 'Real-Time Traffic Heatmap' },
                { k: 'planningZones', label: 'Cadastral Setback Zones' },
              ].map((item) => (
                <label
                  key={item.k}
                  className="flex items-center justify-between py-1 px-1 rounded hover:bg-white/5 cursor-pointer"
                >
                  <span className="text-steel-300">{item.label}</span>
                  <input
                    type="checkbox"
                    checked={layers[item.k as keyof typeof layers]}
                    onChange={() => toggleLayer(item.k as keyof typeof layers)}
                    className="rounded text-blue-600 focus:ring-0 bg-white/10 border-white/20"
                  />
                </label>
              ))}
            </div>

            {/* Opacity Sliders */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <div>
                <div className="flex justify-between text-[11px] text-steel-400 mb-1">
                  <span>Building Mesh Opacity</span>
                  <span className="font-mono text-white">{buildingOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={buildingOpacity}
                  onChange={(e) => setBuildingOpacity(parseInt(e.target.value))}
                  className="w-full accent-blue-500 h-1 bg-white/20 rounded"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-steel-400 mb-1">
                  <span>Underground Cut Depth</span>
                  <span className="font-mono text-white">{utilityOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={utilityOpacity}
                  onChange={(e) => setUtilityOpacity(parseInt(e.target.value))}
                  className="w-full accent-gold-500 h-1 bg-white/20 rounded"
                />
              </div>
            </div>
          </div>

          {/* Right Panel: Asset Inspector (320 px) */}
          <div className="absolute top-16 right-4 z-20 w-[320px] bg-[#13233D]/92 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl p-4 flex flex-col justify-between space-y-3.5 text-[12px]">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono text-gold-500 font-bold uppercase tracking-wider">
                    Selected 3D Asset
                  </span>
                  <h3 className="text-[16px] font-bold text-white tracking-tight">
                    Tower AD-BLD-000482
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  LOD3 Hybrid
                </span>
              </div>

              {/* Key Asset Specs */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded bg-white/5 border border-white/5">
                  <div className="text-steel-400 text-[10px]">Height (AGL)</div>
                  <div className="font-bold text-white font-mono">142 m (44 Floors)</div>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/5">
                  <div className="text-steel-400 text-[10px]">Primary Use</div>
                  <div className="font-bold text-white">Mixed Commercial</div>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/5">
                  <div className="text-steel-400 text-[10px]">Real-Time Power</div>
                  <div className="font-bold text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>1,240 kW</span>
                  </div>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/5">
                  <div className="text-steel-400 text-[10px]">Current Occupancy</div>
                  <div className="font-bold text-white font-mono">68% (1,840 pax)</div>
                </div>
              </div>

              {/* BIM Model Linked */}
              <div className="p-2.5 rounded bg-blue-900/30 border border-blue-500/30 flex items-center justify-between text-[11px]">
                <div>
                  <div className="font-bold text-white">BIM IFC Model Connected</div>
                  <div className="text-[10px] text-steel-400">Revit 2027 · 4,820 objects</div>
                </div>
                <button className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[10px]">
                  Open BIM
                </button>
              </div>

              {/* Mini Line Chart: PM2.5 last 24h */}
              <div className="p-2.5 rounded bg-white/5 border border-white/5 space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-steel-400">Microclimate: PM2.5 Sensor (24 h)</span>
                  <span className="text-emerald-400 font-bold font-mono">18 µg/m³ (Good)</span>
                </div>
                <svg viewBox="0 0 260 40" className="w-full h-8 overflow-visible">
                  <polyline
                    fill="none"
                    stroke="#2BA6DE"
                    strokeWidth="2"
                    points="0,25 30,22 60,28 90,20 120,18 150,22 180,15 210,18 240,16 260,18"
                  />
                  <line x1="0" y1="20" x2="260" y2="20" stroke="rgba(255,255,255,0.15)" strokeDasharray="2 2" />
                </svg>
              </div>
            </div>

            {/* Asset Actions */}
            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-[12px] transition-colors">
                Run Solar & Shadow Analysis
              </button>
              <button className="w-full py-1.5 bg-white/5 hover:bg-white/10 text-steel-300 rounded-lg font-medium text-[11px] transition-colors">
                Compare Scenarios A/B
              </button>
            </div>
          </div>

          {/* Active Sensor Tooltip per spec (AQ-0117) */}
          {showTooltip && (
            <div className="absolute top-[340px] left-[390px] z-30 bg-[#0B2545]/95 backdrop-blur-md text-white p-2.5 rounded-lg border border-cyan-400 shadow-2xl text-left pointer-events-none text-[11px] font-mono">
              <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>AQ-0117 · Air Quality Sensor</span>
              </div>
              <div className="text-white mt-0.5">PM2.5: <strong className="text-emerald-400">18 µg/m³</strong> · Good</div>
              <div className="text-[10px] text-steel-400 mt-0.5">Owner: EAD · Updated 12 s ago</div>
            </div>
          )}

          {/* Bottom Left Status Chip */}
          <div className="absolute bottom-20 left-4 z-20 bg-[#13233D]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] font-mono text-emerald-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>46 / 48 live sensors online · data fresh</span>
          </div>

          {/* Bottom Right: Compass & Zoom Controls */}
          <div className="absolute bottom-20 right-4 z-20 flex flex-col gap-1.5 bg-[#13233D]/90 backdrop-blur-md p-1 rounded-lg border border-white/10 shadow-level-1">
            <button className="p-1.5 hover:bg-white/10 rounded text-steel-400 hover:text-white" title="Zoom in">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-white/10 rounded text-steel-400 hover:text-white" title="Zoom out">
              <ZoomOut className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-white/10 rounded text-gold-500" title="Reset North">
              <Compass className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom 4D Timeline (Full width, 64 px tall) */}
          <div className="absolute bottom-0 left-0 right-0 h-[64px] bg-[#0B182B]/95 backdrop-blur-md border-t border-white/10 px-8 flex items-center justify-between z-30">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-full bg-gold-500 hover:bg-gold-600 text-navy-900 flex items-center justify-center font-bold shadow-md transition-transform active:scale-95"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-navy-900" /> : <Play className="w-4 h-4 fill-navy-900 ml-0.5" />}
              </button>

              <div className="text-[12px] font-bold text-white font-mono">
                4D Urban Timeline
              </div>
            </div>

            {/* Slider 2020 to 2035 */}
            <div className="flex-1 max-w-[760px] mx-8 flex flex-col justify-center">
              <div className="relative flex items-center">
                <input
                  type="range"
                  min="2020"
                  max="2035"
                  step="1"
                  value={timelineYear}
                  onChange={(e) => setTimelineYear(parseInt(e.target.value))}
                  className="w-full accent-gold-500 h-2 bg-navy-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Ticks and Gold "Now · Sep 2027" Marker */}
              <div className="flex justify-between text-[10px] text-steel-400 font-mono mt-1 relative">
                <span>2020</span>
                <span>2022</span>
                <span>2024</span>
                <span className="text-gold-500 font-bold border-b border-gold-500">
                  Now · Sep 2027
                </span>
                <span className="border-b border-dashed border-steel-500 text-steel-400">2030 Planned</span>
                <span className="border-b border-dashed border-steel-500 text-steel-400">2035 Vision</span>
              </div>
            </div>

            {/* Timeline Speed */}
            <div className="flex items-center gap-2 text-[11px] font-mono text-steel-400">
              <span>Speed:</span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">1×</span>
            </div>
          </div>
        </div>
      </div>

      {/* Micro Footer */}
      <MicroFooter isDarkTheme={true} />
    </div>
  );
};
