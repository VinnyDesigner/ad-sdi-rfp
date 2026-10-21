import React, { useState, useEffect, useRef } from 'react';
import { ScreenId } from '../types';
import { HeaderWorkspace } from '../components/common/HeaderWorkspace';
import { SidebarWorkspace } from '../components/common/SidebarWorkspace';
import { MicroFooter } from '../components/common/MicroFooter';
import { InteractiveMap } from '../components/common/InteractiveMap';
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
  Globe,
  Sun,
  Moon,
  Sunset,
  Camera,
  Download,
  Share2,
  SlidersHorizontal,
  ChevronRight,
  X,
  TrendingUp,
  BarChart3,
  Flame,
  Droplets,
  RotateCcw,
  Sparkles,
  Search,
} from 'lucide-react';

interface S10Props {
  onNavigate: (screen: ScreenId) => void;
}

interface BuildingAsset {
  id: string;
  name: string;
  lod: string;
  height: string;
  floors: number;
  use: string;
  power: string;
  occupancy: string;
  pm25: string;
  bimObjects: number;
  status: 'Operational' | 'Under Construction' | 'Planned';
  completionYear: number;
  polygon: string;
  roofPolygon: string;
  side1: string;
  side2: string;
  color: string;
  roofColor: string;
}

export const S10_DigitalTwin3d: React.FC<S10Props> = ({ onNavigate }) => {
  const [useCase, setUseCase] = useState('Urban planning');
  const [timelineYear, setTimelineYear] = useState(2027);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 2 | 4>(1);
  const [viewMode, setViewMode] = useState<'3d' | 'satellite' | 'bim'>('3d');
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'dusk' | 'night'>('dusk');
  const [activeScenario, setActiveScenario] = useState<'A' | 'B'>('A');
  const [activeSimulation, setActiveSimulation] = useState<'none' | 'solar' | 'wind' | 'thermal'>('none');
  const [cameraAngle, setCameraAngle] = useState({ yaw: 0, pitch: 0, zoom: 1 });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [showBimModal, setShowBimModal] = useState(false);
  const [showSolarModal, setShowSolarModal] = useState(false);
  const [showScenarioModal, setShowScenarioModal] = useState(false);

  // Drag rotation state
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 4D Timeline playback timer
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setTimelineYear((y) => {
          if (y >= 2035) {
            setIsPlaying(false);
            return 2020;
          }
          return y + 1;
        });
      }, 1200 / playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed]);

  // Layer toggles
  const [layers, setLayers] = useState({
    terrain: true,
    buildings3d: true,
    bim: true,
    utilities: true,
    sensors: true,
    traffic: true,
    planningZones: false,
    greenery: true,
  });

  const [buildingOpacity, setBuildingOpacity] = useState(85);
  const [utilityDepth, setUtilityDepth] = useState(70);

  const toggleLayer = (k: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  // 3D Buildings Catalog
  const buildings: BuildingAsset[] = [
    {
      id: 'AD-BLD-000482',
      name: 'Tower AD-BLD-000482 (Hero Tower)',
      lod: 'LOD3 Hybrid BIM',
      height: '142 m',
      floors: 44,
      use: 'Mixed Commercial & Sovereign HQ',
      power: '1,240 kW',
      occupancy: '68% (1,840 pax)',
      pm25: '18 µg/m³ · Good',
      bimObjects: 4820,
      status: 'Operational',
      completionYear: 2025,
      polygon: '500,470 560,440 560,160 500,190',
      side1: '500,470 560,440 560,160 500,190',
      side2: '560,440 650,470 650,190 560,160',
      roofPolygon: '500,190 560,160 650,190 590,220',
      color: '#1F5FAD',
      roofColor: '#43C8FF',
    },
    {
      id: 'AD-BLD-000483',
      name: 'Waterfront Bay Residence West',
      lod: 'LOD2 Architectural',
      height: '86 m',
      floors: 26,
      use: 'High-Density Residential',
      power: '780 kW',
      occupancy: '92% (620 residents)',
      pm25: '16 µg/m³ · Excellent',
      bimObjects: 2150,
      status: 'Operational',
      completionYear: 2024,
      polygon: '320,440 370,415 370,310 320,335',
      side1: '320,440 370,415 370,310 320,335',
      side2: '370,415 440,435 440,330 370,310',
      roofPolygon: '320,335 370,310 440,330 390,355',
      color: '#1A3459',
      roofColor: '#2E5587',
    },
    {
      id: 'AD-BLD-000484',
      name: 'Al Maryah Financial Pavilion',
      lod: 'LOD3 Glass Mesh',
      height: '52 m',
      floors: 14,
      use: 'Commercial & Financial Hub',
      power: '510 kW',
      occupancy: '75% (890 pax)',
      pm25: '19 µg/m³ · Good',
      bimObjects: 1640,
      status: 'Operational',
      completionYear: 2023,
      polygon: '460,440 510,420 510,360 460,380',
      side1: '460,440 510,420 510,360 460,380',
      side2: '510,420 580,440 580,380 510,360',
      roofPolygon: '460,380 510,360 580,380 530,400',
      color: '#152C4A',
      roofColor: '#284E7A',
    },
    {
      id: 'AD-BLD-000485',
      name: 'Corniche Grand Horizon Tower',
      lod: 'LOD2 CityGML',
      height: '118 m',
      floors: 35,
      use: 'Executive Hospitality',
      power: '980 kW',
      occupancy: '81% (440 guests)',
      pm25: '17 µg/m³ · Good',
      bimObjects: 3100,
      status: 'Operational',
      completionYear: 2026,
      polygon: '620,380 660,360 660,240 620,260',
      side1: '620,380 660,360 660,240 620,260',
      side2: '660,360 720,380 720,260 660,240',
      roofPolygon: '620,260 660,240 720,260 680,280',
      color: '#1E375C',
      roofColor: '#2E5587',
    },
    {
      id: 'AD-BLD-000486',
      name: 'Saadiyat Creative District Wing',
      lod: 'LOD2 CityGML',
      height: '98 m',
      floors: 28,
      use: 'Cultural & Tech Incubator',
      power: '640 kW',
      occupancy: '84% (920 members)',
      pm25: '15 µg/m³ · Excellent',
      bimObjects: 2450,
      status: 'Operational',
      completionYear: 2026,
      polygon: '740,360 780,340 780,220 740,240',
      side1: '740,360 780,340 780,220 740,240',
      side2: '780,340 840,360 840,240 780,220',
      roofPolygon: '740,240 780,220 840,240 800,260',
      color: '#1C3150',
      roofColor: '#28466E',
    },
    {
      id: 'AD-BLD-000490',
      name: 'Phase 2 Net-Zero Sovereign Spire',
      lod: 'LOD3 Procedural Concept',
      height: '168 m',
      floors: 52,
      use: 'AI Research & Climate Lab',
      power: '210 kW (Solar Net-Positive)',
      occupancy: 'Planned 2,400 pax',
      pm25: '12 µg/m³ · Projected',
      bimObjects: 5900,
      status: 'Planned',
      completionYear: 2030,
      polygon: '850,330 900,310 900,140 850,160',
      side1: '850,330 900,310 900,140 850,160',
      side2: '900,310 970,330 970,160 900,140',
      roofPolygon: '850,160 900,140 970,160 920,180',
      color: '#0E9F8E',
      roofColor: '#2BD2BD',
    },
  ];

  const [selectedAsset, setSelectedAsset] = useState<BuildingAsset>(buildings[0]);

  const iotSensors = [
    { id: 'AQ-0117', x: 380, y: 390, type: 'AQ', val: 'PM2.5: 18 µg/m³', status: 'Good', owner: 'EAD' },
    { id: 'NS-0042', x: 490, y: 360, type: 'Noise', val: '52 dB(A)', status: 'Quiet', owner: 'DMT' },
    { id: 'TR-0881', x: 610, y: 440, type: 'Traffic', val: '1,420 veh/hr', status: 'Optimal', owner: 'ITC' },
    { id: 'EG-0312', x: 420, y: 470, type: 'Energy', val: '1.24 MW', status: 'Normal', owner: 'ADDC' },
    { id: 'AQ-0119', x: 710, y: 350, type: 'AQ', val: 'PM2.5: 17 µg/m³', status: 'Good', owner: 'EAD' },
    { id: 'WT-0094', x: 550, y: 490, type: 'Water', val: 'Pressure 4.2 bar', status: 'Nominal', owner: 'ADDC' },
    { id: 'CAM-021', x: 330, y: 520, type: 'AI Cam', val: 'Pedestrian Flow 32/min', status: 'Active', owner: 'DMT' },
    { id: 'AQ-0120', x: 780, y: 380, type: 'AQ', val: 'PM2.5: 15 µg/m³', status: 'Excellent', owner: 'EAD' },
    { id: 'PW-0551', x: 670, y: 420, type: 'Solar', val: 'Yield 420 kWh', status: 'Generating', owner: 'Masdar' },
    { id: 'WS-0104', x: 450, y: 540, type: 'Waste', val: 'Fill Level 42%', status: 'Normal', owner: 'Tadweer' },
  ];

  const [selectedSensor, setSelectedSensor] = useState(iotSensors[0]);
  const [showSensorTooltip, setShowSensorTooltip] = useState(true);

  const useCases = [
    'Urban planning',
    'Assets & facilities',
    'Mobility & environment',
    'Site context',
    'Resilience',
  ];

  // Mouse drag handlers to rotate/tilt 3D perspective
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    setCameraAngle((prev) => ({
      ...prev,
      yaw: Math.max(-25, Math.min(25, prev.yaw + dx * 0.15)),
      pitch: Math.max(-15, Math.min(15, prev.pitch + dy * 0.15)),
    }));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Reset Camera View
  const handleResetCamera = () => {
    setCameraAngle({ yaw: 0, pitch: 0, zoom: 1 });
    showToast('Reset camera perspective to Default Sovereign Axis');
  };

  const handleCameraPreset = (preset: string) => {
    switch (preset) {
      case 'promenade':
        setCameraAngle({ yaw: -10, pitch: 5, zoom: 1.1 });
        showToast('Camera pivoted to Waterfront Promenade');
        break;
      case 'hero-tower':
        setCameraAngle({ yaw: 5, pitch: -8, zoom: 1.25 });
        setSelectedAsset(buildings[0]);
        showToast('Camera focused on Tower AD-BLD-000482');
        break;
      case 'underground':
        setCameraAngle({ yaw: 12, pitch: 10, zoom: 1.15 });
        setLayers((prev) => ({ ...prev, utilities: true }));
        showToast('Revealed -6.5m Sovereign Utility Tunnel');
        break;
      case 'island-aerial':
        setCameraAngle({ yaw: 0, pitch: 0, zoom: 0.9 });
        showToast('Pivoted to Aerial Masterplan Panorama');
        break;
      default:
        break;
    }
  };

  return (
    <div
      onMouseUp={handleMouseUp}
      className="w-full h-screen bg-[#07111E] text-white flex flex-col justify-between overflow-hidden select-none font-sans relative"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-navy-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-cyan-400 flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-cyan-400" />
          <span className="text-[13px] font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 1. Unified Enterprise Top Bar */}
      <HeaderWorkspace currentScreen="S10_DigitalTwin3d" onNavigate={onNavigate} />

      <div className="flex-1 flex overflow-hidden relative">
        {/* 2. Collapsed Dark Sidebar */}
        <SidebarWorkspace
          currentScreen="S10_DigitalTwin3d"
          onNavigate={onNavigate}
          collapsed={true}
          isDarkTheme={true}
        />

        {/* 3. Full-Bleed 3D Scene Viewport */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          className="flex-1 h-full relative overflow-hidden bg-[#06101D] cursor-grab active:cursor-grabbing"
        >
          {/* VIEW MODE 1: REAL SATELLITE GIS TWIN */}
          {viewMode === 'satellite' ? (
            <div className="absolute inset-0 z-0">
              <InteractiveMap
                mode="parcels"
                center={[24.4750, 54.3680]}
                zoom={16}
                isDarkTheme={timeOfDay !== 'day'}
                className="w-full h-full"
              />
              {/* Overlay Badge */}
              <div className="absolute top-4 left-4 z-20 bg-navy-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-[12px] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold">Abu Dhabi Waterfront · 0.15m Sovereign Orthophoto Twin</span>
              </div>
            </div>
          ) : viewMode === 'bim' ? (
            /* VIEW MODE 2: BIM ARCHITECTURAL EXPLORER */
            <div className="absolute inset-0 z-0 bg-[#08182D] flex items-center justify-center p-8">
              <div className="w-full max-w-5xl h-full max-h-[640px] bg-[#0E1E34] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <Building className="w-6 h-6 text-cyan-400" />
                    <div>
                      <h2 className="text-[18px] font-bold text-white">
                        BIM Architectural Explorer · {selectedAsset.name}
                      </h2>
                      <span className="text-[11px] font-mono text-cyan-300">
                        IFC 4.3 Schema · 4,820 Geometric Objects · Level of Development LOD 350
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setViewMode('3d')}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[12px] font-bold"
                  >
                    Back to 3D Simulation
                  </button>
                </div>

                {/* BIM Cross-Section Wireframe Illustration */}
                <div className="flex-1 my-4 bg-black/40 rounded-xl border border-white/10 p-4 flex items-center justify-center relative overflow-hidden">
                  <svg viewBox="0 0 800 360" className="w-full h-full">
                    {/* Floor slabs */}
                    {Array.from({ length: 12 }).map((_, f) => (
                      <g key={f}>
                        <rect
                          x="120"
                          y={40 + f * 24}
                          width="560"
                          height="4"
                          fill="#43C8FF"
                          opacity={0.7}
                        />
                        <text
                          x="70"
                          y={44 + f * 24}
                          fill="#7A9CC6"
                          fontSize="9"
                          fontFamily="monospace"
                        >
                          L{44 - f * 3}
                        </text>
                        {/* Mechanical / HVAC ducts */}
                        <line
                          x1="220"
                          y1={42 + f * 24}
                          x2="220"
                          y2={64 + f * 24}
                          stroke="#E07B24"
                          strokeWidth="2"
                        />
                        <line
                          x1="580"
                          y1={42 + f * 24}
                          x2="580"
                          y2={64 + f * 24}
                          stroke="#1E9E6A"
                          strokeWidth="2"
                        />
                      </g>
                    ))}
                    {/* Central elevator core */}
                    <rect
                      x="360"
                      y="30"
                      width="80"
                      height="300"
                      fill="none"
                      stroke="#FFC20E"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />
                    <text
                      x="400"
                      y="180"
                      fill="#FFC20E"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      ELEVATOR CORE
                    </text>
                  </svg>
                  {/* Floating BIM Legend */}
                  <div className="absolute top-4 right-4 bg-navy-900/90 backdrop-blur-md p-3 rounded-xl border border-white/10 text-[10px] space-y-1 font-mono">
                    <div className="text-cyan-400 font-bold">BIM Systems:</div>
                    <div className="text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#43C8FF]" /> Structural Slabs
                    </div>
                    <div className="text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#E07B24]" /> HVAC Ducts & Chilled Water
                    </div>
                    <div className="text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#1E9E6A]" /> Electrical Busbars
                    </div>
                    <div className="text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FFC20E]" /> Fire Safety & Lift Cores
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-steel-400">
                  <span>Linked Source: DMT Master Cadastre & Municipal BIM Repository</span>
                  <button
                    onClick={() => showToast('Exporting IFC 4.3 BIM file...')}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download IFC Model</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* VIEW MODE 3: HIGH-TECH 3D ISOMETRIC CITY SIMULATION */
            <div
              className="absolute inset-0 transition-transform duration-200 ease-out"
              style={{
                transform: `rotateY(${cameraAngle.yaw}deg) rotateX(${cameraAngle.pitch}deg) scale(${cameraAngle.zoom})`,
                transformStyle: 'preserve-3d',
              }}
            >
              <svg
                viewBox="0 0 1100 850"
                className="w-full h-full object-cover"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  {/* Dusk / Day / Night Sky Gradients */}
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    {timeOfDay === 'day' ? (
                      <>
                        <stop offset="0%" stopColor="#2E69A3" />
                        <stop offset="60%" stopColor="#4A88C7" />
                        <stop offset="100%" stopColor="#89BDEC" />
                      </>
                    ) : timeOfDay === 'night' ? (
                      <>
                        <stop offset="0%" stopColor="#040914" />
                        <stop offset="60%" stopColor="#081426" />
                        <stop offset="100%" stopColor="#0C1D38" />
                      </>
                    ) : (
                      <>
                        <stop offset="0%" stopColor="#0B1728" />
                        <stop offset="50%" stopColor="#102542" />
                        <stop offset="100%" stopColor="#193863" />
                      </>
                    )}
                  </linearGradient>

                  {/* Water Gradient */}
                  <linearGradient id="waterGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#08182D" />
                    <stop offset="50%" stopColor="#0B2240" />
                    <stop offset="100%" stopColor="#07172B" />
                  </linearGradient>

                  {/* Cyan Glow Filter */}
                  <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Gold Glow Filter */}
                  <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Sky */}
                <rect width="1100" height="850" fill="url(#skyGrad)" />

                {/* Arabian Gulf Water Basin */}
                <path
                  d="M 0 340 Q 300 320 600 350 T 1100 330 L 1100 850 L 0 850 Z"
                  fill="url(#waterGrad)"
                />

                {/* Water Specular Waves */}
                {Array.from({ length: 16 }).map((_, i) => (
                  <ellipse
                    key={i}
                    cx={160 + i * 58}
                    cy={570 + (i % 5) * 45}
                    rx={35 + (i % 3) * 20}
                    ry={2.5}
                    fill={timeOfDay === 'night' ? 'rgba(67, 200, 255, 0.2)' : 'rgba(43, 166, 222, 0.15)'}
                  />
                ))}

                {/* Simulated Solar Shadows */}
                {activeSimulation === 'solar' && (
                  <g id="solar-shadows" opacity={0.45}>
                    <polygon points="500,470 380,590 490,620 650,470" fill="#000000" />
                    <polygon points="320,440 240,510 320,530 440,435" fill="#000000" />
                    <polygon points="620,380 540,460 620,480 720,380" fill="#000000" />
                  </g>
                )}

                {/* Quayside Promenades & Landmass */}
                <polygon
                  points="220,440 940,320 1080,480 320,680"
                  fill={timeOfDay === 'night' ? '#0C182A' : '#13243B'}
                  stroke="#2B4973"
                  strokeWidth="2"
                />

                {/* Mangroves & Coastal Greenery Buffer */}
                {layers.greenery && (
                  <g id="mangrove-buffer">
                    <path
                      d="M 230 450 Q 280 430 330 460 T 400 480 L 360 520 Z"
                      fill="#1E9E6A"
                      opacity="0.65"
                    />
                    <text x="270" y="475" fill="#6EE7B7" fontSize="9" fontWeight="bold">
                      Mangrove Canopy
                    </text>
                  </g>
                )}

                {/* Underground Sovereign Utility Cut (-6.5m) */}
                {layers.utilities && (
                  <g id="underground-cut" opacity={utilityDepth / 100}>
                    <polygon
                      points="380,590 560,530 640,620 440,680"
                      fill="rgba(8, 18, 32, 0.9)"
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
                    {/* High-Voltage Power (Gold) */}
                    <path
                      d="M 405 615 L 565 560 L 635 635"
                      stroke="#FFC20E"
                      strokeWidth="3"
                      fill="none"
                    />
                    {/* Sovereign Fiber Network (Green) */}
                    <path
                      d="M 420 630 L 580 575 L 640 645"
                      stroke="#1E9E6A"
                      strokeWidth="2.5"
                      fill="none"
                    />
                    {/* District Cooling (Magenta) */}
                    <path
                      d="M 435 645 L 595 590 L 645 655"
                      stroke="#D946EF"
                      strokeWidth="3"
                      fill="none"
                    />
                    <text x="500" y="615" fill="#7A9CC6" fontSize="10" fontFamily="monospace">
                      UTILITY CORRIDOR -6.5m
                    </text>
                  </g>
                )}

                {/* Roads & Real-Time Animated Traffic Streams */}
                {layers.traffic && (
                  <g id="traffic-roads">
                    {/* Main Arterial Roadway */}
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
                    {/* Moving Traffic Light Dots */}
                    {Array.from({ length: 6 }).map((_, vi) => (
                      <circle
                        key={vi}
                        cx={300 + vi * 100}
                        cy={485 - vi * 18}
                        r="3"
                        fill="#FFFFFF"
                        className="animate-pulse"
                      />
                    ))}
                  </g>
                )}

                {/* 3D Buildings Rendered with Dynamic Year Filtering */}
                {layers.buildings3d && (
                  <g id="buildings-3d" opacity={buildingOpacity / 100}>
                    {buildings.map((bld) => {
                      // Check if building exists in timeline year
                      const isBuilt = timelineYear >= bld.completionYear;
                      const isSelected = selectedAsset.id === bld.id;

                      if (!isBuilt && timelineYear < bld.completionYear - 2) {
                        return null; // not started yet
                      }

                      // Construction stage wireframe
                      if (!isBuilt) {
                        return (
                          <g
                            key={bld.id}
                            onClick={() => {
                              setSelectedAsset(bld);
                              showToast(`Inspecting Planned Asset: ${bld.name}`);
                            }}
                            className="cursor-pointer"
                          >
                            <polygon
                              points={bld.side1}
                              fill="none"
                              stroke="#FFC20E"
                              strokeWidth="1.5"
                              strokeDasharray="4 2"
                            />
                            <polygon
                              points={bld.side2}
                              fill="none"
                              stroke="#FFC20E"
                              strokeWidth="1.5"
                              strokeDasharray="4 2"
                            />
                            <text
                              x="880"
                              y="240"
                              fill="#FFC20E"
                              fontSize="9"
                              fontWeight="bold"
                              fontFamily="monospace"
                            >
                              PLAN 2030 (NET-ZERO)
                            </text>
                          </g>
                        );
                      }

                      return (
                        <g
                          key={bld.id}
                          onClick={() => {
                            setSelectedAsset(bld);
                            showToast(`Selected Asset: ${bld.name}`);
                          }}
                          className="cursor-pointer transition-all hover:brightness-125"
                        >
                          {/* Side 1 */}
                          <polygon
                            points={bld.side1}
                            fill={isSelected ? '#1F5FAD' : bld.color}
                            stroke={isSelected ? '#2BA6DE' : '#244573'}
                            strokeWidth={isSelected ? '2.5' : '1'}
                            filter={isSelected ? 'url(#glowCyan)' : undefined}
                          />
                          {/* Side 2 */}
                          <polygon
                            points={bld.side2}
                            fill={isSelected ? '#2BA6DE' : '#244573'}
                            stroke={isSelected ? '#43C8FF' : '#1E3960'}
                            strokeWidth={isSelected ? '2.5' : '1'}
                            filter={isSelected ? 'url(#glowCyan)' : undefined}
                          />
                          {/* Roof */}
                          <polygon
                            points={bld.roofPolygon}
                            fill={isSelected ? '#43C8FF' : bld.roofColor}
                            stroke={isSelected ? '#FFFFFF' : '#2E5587'}
                            strokeWidth="1.5"
                          />

                          {/* Hero Tower Windows Lights & Top Antenna */}
                          {bld.id === 'AD-BLD-000482' && (
                            <>
                              {Array.from({ length: 14 }).map((_, f) => (
                                <React.Fragment key={f}>
                                  <line
                                    x1="510"
                                    y1={200 + f * 18}
                                    x2="550"
                                    y2={180 + f * 18}
                                    stroke={timeOfDay === 'night' ? '#FFEF8A' : 'rgba(255, 255, 255, 0.5)'}
                                    strokeWidth="1.5"
                                  />
                                  <line
                                    x1="570"
                                    y1={180 + f * 18}
                                    x2="640"
                                    y2={205 + f * 18}
                                    stroke={timeOfDay === 'night' ? '#FFEF8A' : 'rgba(255, 255, 255, 0.7)'}
                                    strokeWidth="1.5"
                                  />
                                </React.Fragment>
                              ))}
                              {/* Antenna Beacon */}
                              <line x1="575" y1="175" x2="575" y2="120" stroke="#FFC20E" strokeWidth="2" />
                              <circle cx="575" cy="120" r="3.5" fill="#FFC20E" className="animate-ping" />
                            </>
                          )}
                        </g>
                      );
                    })}
                  </g>
                )}

                {/* Wind Microclimate Streamlines */}
                {activeSimulation === 'wind' && (
                  <g id="wind-simulation" opacity={0.8}>
                    {Array.from({ length: 8 }).map((_, wi) => (
                      <path
                        key={wi}
                        d={`M 150 ${280 + wi * 35} Q 500 ${220 + wi * 40} 950 ${310 + wi * 30}`}
                        stroke="#38BDF8"
                        strokeWidth="2.5"
                        strokeDasharray="8 6"
                        fill="none"
                        className="animate-pulse"
                      />
                    ))}
                    <text x="320" y="240" fill="#38BDF8" fontSize="11" fontWeight="bold">
                      Wind Velocity Vector: 4.8 m/s (Offshore North-West Breeze)
                    </text>
                  </g>
                )}

                {/* Floating IoT Sensor Markers */}
                {layers.sensors && (
                  <g id="iot-sensors">
                    {iotSensors.map((s) => (
                      <g
                        key={s.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSensor(s);
                          setShowSensorTooltip(true);
                          showToast(`Sensor Telemetry: ${s.id} (${s.val})`);
                        }}
                        className="cursor-pointer group"
                      >
                        <circle cx={s.x} cy={s.y} r="14" fill="#2BA6DE" opacity="0.25" />
                        <circle
                          cx={s.x}
                          cy={s.y}
                          r="8"
                          fill="#0B2545"
                          stroke={selectedSensor.id === s.id ? '#FFC20E' : '#2BA6DE'}
                          strokeWidth="2"
                        />
                        <circle cx={s.x} cy={s.y} r="3" fill="#FFC20E" />
                      </g>
                    ))}
                  </g>
                )}
              </svg>
            </div>
          )}

          {/* Floating UI Elements: */}

          {/* Top-Left: Pilot Area Pill, View Switcher & Time-of-Day */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
            <div className="bg-[#13233D]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-level-2 flex items-center gap-2 text-[12px] font-medium text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Waterfront District · 3D Digital Twin</span>
              <Info className="w-3.5 h-3.5 text-steel-400 ml-1" />
            </div>

            {/* View Mode 3-Way Switcher */}
            <div className="bg-[#13233D]/90 backdrop-blur-md p-1 rounded-full border border-white/10 shadow-level-2 flex items-center gap-1 text-[11px]">
              <button
                onClick={() => {
                  setViewMode('3d');
                  showToast('Switched to 3D Isometric Urban Simulation');
                }}
                className={`px-3 py-1 rounded-full font-semibold transition-all ${
                  viewMode === '3d' ? 'bg-blue-600 text-white shadow' : 'text-steel-400 hover:text-white'
                }`}
              >
                3D Urban View
              </button>
              <button
                onClick={() => {
                  setViewMode('satellite');
                  showToast('Switched to Sovereign High-Res Satellite Twin');
                }}
                className={`px-3 py-1 rounded-full font-semibold transition-all ${
                  viewMode === 'satellite' ? 'bg-blue-600 text-white shadow' : 'text-steel-400 hover:text-white'
                }`}
              >
                Satellite GIS Twin
              </button>
              <button
                onClick={() => {
                  setViewMode('bim');
                  showToast('Switched to BIM Architectural View');
                }}
                className={`px-3 py-1 rounded-full font-semibold transition-all ${
                  viewMode === 'bim' ? 'bg-blue-600 text-white shadow' : 'text-steel-400 hover:text-white'
                }`}
              >
                BIM Explorer
              </button>
            </div>

            {/* Time of Day Lighting Toggle */}
            <div className="bg-[#13233D]/90 backdrop-blur-md p-1 rounded-full border border-white/10 shadow-level-2 flex items-center gap-1 text-[11px]">
              <button
                onClick={() => {
                  setTimeOfDay('day');
                  showToast('Time of Day: Arabian Day Sun ☀️');
                }}
                className={`p-1.5 rounded-full ${timeOfDay === 'day' ? 'bg-amber-500 text-navy-900' : 'text-steel-400 hover:text-white'}`}
                title="Day Sun"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setTimeOfDay('dusk');
                  showToast('Time of Day: Sovereign Dusk 🌅');
                }}
                className={`p-1.5 rounded-full ${timeOfDay === 'dusk' ? 'bg-orange-500 text-white' : 'text-steel-400 hover:text-white'}`}
                title="Dusk"
              >
                <Sunset className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setTimeOfDay('night');
                  showToast('Time of Day: Cyber Night 🌙');
                }}
                className={`p-1.5 rounded-full ${timeOfDay === 'night' ? 'bg-indigo-600 text-white' : 'text-steel-400 hover:text-white'}`}
                title="Night"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Top-Center: Use-Case Selector & Scenario Comparison */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
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

            {/* Scenario Pills */}
            <div className="flex items-center gap-2 bg-[#13233D]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px]">
              <button
                onClick={() => {
                  setActiveScenario('A');
                  showToast('Loaded Scenario A: Approved Masterplan 2027');
                }}
                className={`px-2 py-0.5 rounded font-semibold transition-all ${
                  activeScenario === 'A'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/5 text-steel-400 hover:text-white'
                }`}
              >
                A: Approved Masterplan
              </button>
              <span className="text-steel-400 text-[10px]">vs</span>
              <button
                onClick={() => {
                  setActiveScenario('B');
                  showToast('Loaded Scenario B: Proposed 2030 Net-Zero Amendment');
                }}
                className={`px-2 py-0.5 rounded font-semibold transition-all ${
                  activeScenario === 'B'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white/5 text-steel-400 hover:text-white'
                }`}
              >
                B: Proposed 2030 Amendment
              </button>
              <button
                onClick={() => setShowScenarioModal(true)}
                className="text-gold-500 font-bold ml-1 hover:underline"
              >
                Compare Side-by-Side ⇄
              </button>
            </div>
          </div>

          {/* Left Panel: Layers, Simulation Tools & Camera Presets (270 px) */}
          <div className="absolute top-16 left-4 z-20 w-[270px] bg-[#13233D]/92 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl p-4 space-y-3 text-[12px] max-h-[calc(100vh-170px)] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-gold-500" />
                <span>Digital Twin Layers</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                {Object.values(layers).filter(Boolean).length} Active
              </span>
            </div>

            {/* Layer Toggles */}
            <div className="space-y-1">
              {[
                { k: 'terrain', label: 'High-Res Bathymetry & Terrain' },
                { k: 'buildings3d', label: '3D LOD2/LOD3 Building Meshes' },
                { k: 'bim', label: 'BIM Architectural Models (IFC)' },
                { k: 'utilities', label: 'Underground Utilities (-6.5m)' },
                { k: 'sensors', label: 'Live IoT Sensor Feeds (48)' },
                { k: 'traffic', label: 'Real-Time Traffic Heatmap' },
                { k: 'greenery', label: 'Mangrove & Canopy Buffer' },
              ].map((item) => (
                <label
                  key={item.k}
                  className="flex items-center justify-between py-1 px-1 rounded hover:bg-white/5 cursor-pointer"
                >
                  <span className="text-steel-300 text-[11px]">{item.label}</span>
                  <input
                    type="checkbox"
                    checked={layers[item.k as keyof typeof layers]}
                    onChange={() => toggleLayer(item.k as keyof typeof layers)}
                    className="rounded text-blue-600 focus:ring-0 bg-white/10 border-white/20"
                  />
                </label>
              ))}
            </div>

            {/* Camera Presets Quick Navigation */}
            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-white uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Camera className="w-3 h-3 text-cyan-400" />
                  <span>Camera Angles</span>
                </span>
                <button
                  onClick={handleResetCamera}
                  className="text-gold-400 text-[10px] hover:underline"
                >
                  Reset
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                <button
                  onClick={() => handleCameraPreset('hero-tower')}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-left truncate text-steel-200"
                >
                  🏢 Hero Tower
                </button>
                <button
                  onClick={() => handleCameraPreset('promenade')}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-left truncate text-steel-200"
                >
                  🌊 Promenade
                </button>
                <button
                  onClick={() => handleCameraPreset('underground')}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-left truncate text-steel-200"
                >
                  ⚡ Utilities Cut
                </button>
                <button
                  onClick={() => handleCameraPreset('island-aerial')}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-left truncate text-steel-200"
                >
                  🛰️ Island Aerial
                </button>
              </div>
            </div>

            {/* Simulation Engines Selector */}
            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                Simulation Engines
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    const next = activeSimulation === 'solar' ? 'none' : 'solar';
                    setActiveSimulation(next);
                    showToast(next === 'solar' ? 'Simulating Solar Shadows' : 'Deactivated Solar Simulation');
                  }}
                  className={`w-full py-1 px-2 rounded text-left flex items-center justify-between text-[11px] font-semibold transition-colors ${
                    activeSimulation === 'solar'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-white/5 text-steel-300 hover:bg-white/10'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Solar & Shadow Ray-Trace</span>
                  </span>
                  <span className="text-[10px]">{activeSimulation === 'solar' ? 'ON' : 'OFF'}</span>
                </button>

                <button
                  onClick={() => {
                    const next = activeSimulation === 'wind' ? 'none' : 'wind';
                    setActiveSimulation(next);
                    showToast(next === 'wind' ? 'Simulating Wind Streamlines' : 'Deactivated Wind Simulation');
                  }}
                  className={`w-full py-1 px-2 rounded text-left flex items-center justify-between text-[11px] font-semibold transition-colors ${
                    activeSimulation === 'wind'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                      : 'bg-white/5 text-steel-300 hover:bg-white/10'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5 text-sky-400" />
                    <span>Microclimate CFD Wind Flow</span>
                  </span>
                  <span className="text-[10px]">{activeSimulation === 'wind' ? 'ON' : 'OFF'}</span>
                </button>
              </div>
            </div>

            {/* Opacity Sliders */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <div>
                <div className="flex justify-between text-[10px] text-steel-400 mb-1">
                  <span>Mesh Opacity</span>
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
                <div className="flex justify-between text-[10px] text-steel-400 mb-1">
                  <span>Underground Trench Cut</span>
                  <span className="font-mono text-white">{utilityDepth}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={utilityDepth}
                  onChange={(e) => setUtilityDepth(parseInt(e.target.value))}
                  className="w-full accent-gold-500 h-1 bg-white/20 rounded"
                />
              </div>
            </div>
          </div>

          {/* Right Panel: Asset Inspector & Live Telemetry (320 px) */}
          <div className="absolute top-16 right-4 z-20 w-[320px] bg-[#13233D]/92 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl p-4 flex flex-col justify-between space-y-3.5 text-[12px] max-h-[calc(100vh-170px)] overflow-y-auto">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono text-gold-500 font-bold uppercase tracking-wider">
                    Selected 3D Asset
                  </span>
                  <h3 className="text-[15px] font-bold text-white tracking-tight leading-snug">
                    {selectedAsset.name}
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex-shrink-0">
                  {selectedAsset.lod}
                </span>
              </div>

              {/* Key Asset Specs */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded bg-white/5 border border-white/5">
                  <div className="text-steel-400 text-[10px]">Height (AGL)</div>
                  <div className="font-bold text-white font-mono">
                    {selectedAsset.height} ({selectedAsset.floors} Floors)
                  </div>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/5">
                  <div className="text-steel-400 text-[10px]">Primary Use</div>
                  <div className="font-bold text-white truncate">{selectedAsset.use}</div>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/5">
                  <div className="text-steel-400 text-[10px]">Real-Time Power</div>
                  <div className="font-bold text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{selectedAsset.power}</span>
                  </div>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/5">
                  <div className="text-steel-400 text-[10px]">Current Occupancy</div>
                  <div className="font-bold text-white font-mono">{selectedAsset.occupancy}</div>
                </div>
              </div>

              {/* BIM Model Linked Action */}
              <div className="p-2.5 rounded bg-blue-900/30 border border-blue-500/30 flex items-center justify-between text-[11px]">
                <div>
                  <div className="font-bold text-white">BIM IFC Model Connected</div>
                  <div className="text-[10px] text-steel-400">
                    Revit 2027 · {selectedAsset.bimObjects} objects
                  </div>
                </div>
                <button
                  onClick={() => setShowBimModal(true)}
                  className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[10px] transition-colors"
                >
                  Inspect BIM
                </button>
              </div>

              {/* Live Sensor Telemetry Strip */}
              <div className="p-2.5 rounded bg-white/5 border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-steel-400 font-bold flex items-center gap-1">
                    <Radio className="w-3 h-3 text-cyan-400" />
                    <span>Live IoT Stream: {selectedSensor.id}</span>
                  </span>
                  <span className="text-emerald-400 font-bold font-mono">
                    {selectedSensor.val}
                  </span>
                </div>
                {/* 24-hr sparkline */}
                <svg viewBox="0 0 260 35" className="w-full h-7 overflow-visible">
                  <polyline
                    fill="none"
                    stroke="#2BA6DE"
                    strokeWidth="2"
                    points="0,22 30,19 60,25 90,17 120,15 150,20 180,12 210,16 240,14 260,15"
                  />
                  <line
                    x1="0"
                    y1="18"
                    x2="260"
                    y2="18"
                    stroke="rgba(255,255,255,0.15)"
                    strokeDasharray="2 2"
                  />
                </svg>
                <div className="flex justify-between text-[9px] text-steel-500 font-mono">
                  <span>24 hrs ago</span>
                  <span>Owner: {selectedSensor.owner}</span>
                  <span>Now (Live)</span>
                </div>
              </div>
            </div>

            {/* Asset Actions */}
            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <button
                onClick={() => setShowSolarModal(true)}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-[12px] transition-colors flex items-center justify-center gap-1.5"
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Run Solar & Shadow Analysis</span>
              </button>
              <button
                onClick={() => setShowScenarioModal(true)}
                className="w-full py-1.5 bg-white/5 hover:bg-white/10 text-steel-300 rounded-lg font-medium text-[11px] transition-colors flex items-center justify-center gap-1.5"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Compare Scenarios A/B</span>
              </button>
            </div>
          </div>

          {/* Active Sensor Tooltip Floating Over Map */}
          {showSensorTooltip && (
            <div
              className="absolute z-30 bg-[#0B2545]/95 backdrop-blur-md text-white p-3 rounded-xl border border-cyan-400 shadow-2xl text-left text-[11px] font-mono pointer-events-auto"
              style={{ top: `${selectedSensor.y - 70}px`, left: `${selectedSensor.x - 60}px` }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{selectedSensor.id} · {selectedSensor.type}</span>
                </div>
                <button
                  onClick={() => setShowSensorTooltip(false)}
                  className="text-steel-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <div className="text-white mt-1">
                Reading: <strong className="text-emerald-400">{selectedSensor.val}</strong>
              </div>
              <div className="text-[10px] text-steel-400 mt-0.5">
                Authority: {selectedSensor.owner} · Status: {selectedSensor.status}
              </div>
            </div>
          )}

          {/* Bottom Left Live Status Pill */}
          <div className="absolute bottom-20 left-4 z-20 bg-[#13233D]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-[11px] font-mono text-emerald-400 flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>48 / 48 IoT sensor feeds active · Low latency &lt;120ms</span>
          </div>

          {/* Bottom Right: Zoom & Reset Controls */}
          <div className="absolute bottom-20 right-4 z-20 flex flex-col gap-1.5 bg-[#13233D]/90 backdrop-blur-md p-1 rounded-xl border border-white/10 shadow-lg">
            <button
              onClick={() => {
                setCameraAngle((prev) => ({ ...prev, zoom: Math.min(1.8, prev.zoom + 0.15) }));
              }}
              className="p-1.5 hover:bg-white/10 rounded text-steel-400 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setCameraAngle((prev) => ({ ...prev, zoom: Math.max(0.7, prev.zoom - 0.15) }));
              }}
              className="p-1.5 hover:bg-white/10 rounded text-steel-400 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetCamera}
              className="p-1.5 hover:bg-white/10 rounded text-gold-500"
              title="Reset North & Angle"
            >
              <Compass className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom 4D Urban Timeline Scrubber (64 px tall) */}
          <div className="absolute bottom-0 left-0 right-0 h-[64px] bg-[#0B182B]/95 backdrop-blur-md border-t border-white/10 px-8 flex items-center justify-between z-30">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-full bg-gold-500 hover:bg-gold-600 text-navy-900 flex items-center justify-center font-bold shadow-md transition-transform active:scale-95"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-navy-900" />
                ) : (
                  <Play className="w-4 h-4 fill-navy-900 ml-0.5" />
                )}
              </button>

              <div className="text-[12px] font-bold text-white font-mono">
                4D Urban Timeline · <span className="text-gold-400 font-bold">{timelineYear}</span>
              </div>
            </div>

            {/* Year Scrubber Slider 2020 to 2035 */}
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

              {/* Ticks and Milestones */}
              <div className="flex justify-between text-[10px] text-steel-400 font-mono mt-1 relative">
                <span>2020</span>
                <span>2022</span>
                <span>2024</span>
                <span
                  className={`${
                    timelineYear === 2027 ? 'text-gold-500 font-bold border-b border-gold-500' : ''
                  }`}
                >
                  Now · Sep 2027
                </span>
                <span className="border-b border-dashed border-steel-500 text-steel-400">
                  2030 Net-Zero
                </span>
                <span className="border-b border-dashed border-steel-500 text-steel-400">
                  2035 Vision
                </span>
              </div>
            </div>

            {/* Timeline Speed Multipliers */}
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-steel-400">
              <span>Speed:</span>
              {([1, 2, 4] as const).map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-2 py-0.5 rounded font-bold transition-all ${
                    playbackSpeed === spd
                      ? 'bg-gold-500 text-navy-900'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {spd}×
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Micro Footer */}
      <MicroFooter isDarkTheme={true} />

      {/* MODAL 1: BIM IFC Cross-Section Explorer */}
      {showBimModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-[620px] bg-[#0E1E34] border border-cyan-500/40 rounded-2xl p-6 shadow-2xl space-y-4 text-white">
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300">
                  IFC 4.3 Schema · Federated Model
                </span>
                <h3 className="text-[18px] font-bold text-white mt-1">
                  BIM Hierarchy: {selectedAsset.name}
                </h3>
              </div>
              <button
                onClick={() => setShowBimModal(false)}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-steel-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-[12px]">
              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-steel-400">Total IFC Entities</div>
                  <div className="text-[16px] font-bold text-cyan-400">4,820</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-steel-400">MEP Ducting Clashes</div>
                  <div className="text-[16px] font-bold text-emerald-400">0 (Resolved)</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-steel-400">Sovereign Asset ID</div>
                  <div className="text-[13px] font-bold text-gold-400">AD-BIM-9912</div>
                </div>
              </div>

              <div className="p-3 bg-black/40 rounded-xl border border-white/10 space-y-2">
                <div className="font-bold text-white text-[11px] uppercase tracking-wider">
                  Connected Sub-Systems:
                </div>
                <ul className="space-y-1.5 text-[11px] text-steel-300">
                  <li className="flex items-center justify-between">
                    <span>• HVAC Air Handling Units (VAV Rooftop)</span>
                    <span className="text-emerald-400 font-mono">Normal · 98.4% Efficiency</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>• Smart District Chilled Water Exchange</span>
                    <span className="text-emerald-400 font-mono">Inflow 6.2°C · Delta T 8.4°C</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>• Dual Power Redundant Transformer Bus</span>
                    <span className="text-emerald-400 font-mono">Load 1,240 kW · PF 0.96</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  showToast('Exported complete IFC 4.3 BIM dataset');
                  setShowBimModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-[12px] transition-colors"
              >
                Export IFC File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Solar & Shadow Simulation Report */}
      {showSolarModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-[520px] bg-[#0E1E34] border border-amber-500/40 rounded-2xl p-6 shadow-2xl space-y-4 text-white">
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                  Solar Radiance & Shadow Analysis
                </span>
                <h3 className="text-[18px] font-bold text-white mt-1">
                  Solar Exposure Compliance Report
                </h3>
              </div>
              <button
                onClick={() => setShowSolarModal(false)}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-steel-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-[12px]">
              <p className="text-steel-300">
                Calculated diurnal solar irradiation for Waterfront District across winter and summer solstices:
              </p>

              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-steel-400 block">Annual Solar Insolation</span>
                  <span className="text-[18px] font-bold text-amber-400">2,140 kWh/m²</span>
                  <span className="text-[10px] text-emerald-400 block mt-1">+14% above threshold</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-steel-400 block">Pedestrian Shadow Buffer</span>
                  <span className="text-[18px] font-bold text-white">4.2 Hours</span>
                  <span className="text-[10px] text-cyan-300 block mt-1">Meets ESTIDAMA Pearl 4</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  showToast('Downloaded ESTIDAMA Solar Compliance Report (PDF)');
                  setShowSolarModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-navy-900 font-bold text-[12px] transition-colors"
              >
                Download PDF Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Scenarios Side-by-Side Comparison */}
      {showScenarioModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-[640px] bg-[#0E1E34] border border-white/20 rounded-2xl p-6 shadow-2xl space-y-4 text-white">
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300">
                  Urban Masterplan Delta
                </span>
                <h3 className="text-[18px] font-bold text-white mt-1">
                  Scenario A vs Scenario B Comparison
                </h3>
              </div>
              <button
                onClick={() => setShowScenarioModal(false)}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-steel-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <table className="w-full text-left text-[12px]">
              <thead className="border-b border-white/10 text-steel-400 uppercase text-[10px]">
                <tr>
                  <th className="py-2">Metric</th>
                  <th className="py-2">Scenario A (Approved 2027)</th>
                  <th className="py-2 text-emerald-400">Scenario B (Net-Zero 2030)</th>
                  <th className="py-2 text-right">Delta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                <tr>
                  <td className="py-2.5 text-white font-sans">Gross Floor Area (GFA)</td>
                  <td className="py-2.5 text-steel-300">420,000 m²</td>
                  <td className="py-2.5 text-white">465,000 m²</td>
                  <td className="py-2.5 text-right text-emerald-400">+10.7%</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-white font-sans">Renewable Generation</td>
                  <td className="py-2.5 text-steel-300">12 GWh / yr</td>
                  <td className="py-2.5 text-white">54 GWh / yr</td>
                  <td className="py-2.5 text-right text-emerald-400">+350%</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-white font-sans">Carbon Footprint</td>
                  <td className="py-2.5 text-steel-300">142 kg CO₂/m²</td>
                  <td className="py-2.5 text-white">48 kg CO₂/m²</td>
                  <td className="py-2.5 text-right text-emerald-400">-66.2%</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-white font-sans">Public Open Space</td>
                  <td className="py-2.5 text-steel-300">28% Coverage</td>
                  <td className="py-2.5 text-white">38% Coverage</td>
                  <td className="py-2.5 text-right text-emerald-400">+10.0%</td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setActiveScenario('B');
                  showToast('Adopted Scenario B into working session');
                  setShowScenarioModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[12px] transition-colors"
              >
                Apply Scenario B to 3D Twin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
