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
  daySide1: string;
  daySide2: string;
  dayRoof: string;
}

export const S10_DigitalTwin3d: React.FC<S10Props> = ({ onNavigate }) => {
  const [useCase, setUseCase] = useState('Urban planning');
  const [timelineYear, setTimelineYear] = useState(2027);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 2 | 4>(1);
  const [viewMode, setViewMode] = useState<'3d' | 'satellite' | 'bim'>('3d');
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'dusk' | 'night'>('day');
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

  // 3D Buildings Catalog - Architectural Daytime & Night Styling
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
      daySide1: '#E0F2FE',
      daySide2: '#BAE6FD',
      dayRoof: '#7DD3FC',
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
      daySide1: '#FFFFFF',
      daySide2: '#E2E8F0',
      dayRoof: '#F8FAFC',
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
      daySide1: '#F8FAFC',
      daySide2: '#CBD5E1',
      dayRoof: '#E2E8F0',
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
      daySide1: '#FFFFFF',
      daySide2: '#DCE3EC',
      dayRoof: '#F1F5F9',
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
      daySide1: '#FEF3C7',
      daySide2: '#FDE68A',
      dayRoof: '#F5E6D3',
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
      daySide1: '#A7F3D0',
      daySide2: '#6EE7B7',
      dayRoof: '#34D399',
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
      className="w-full h-screen bg-canvas text-primaryText flex flex-col justify-between overflow-hidden select-none font-sans relative"
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
        {/* 2. Collapsed Light Sidebar */}
        <SidebarWorkspace
          currentScreen="S10_DigitalTwin3d"
          onNavigate={onNavigate}
          collapsed={true}
          isDarkTheme={false}
        />

        {/* 3. Full-Bleed 3D Scene Viewport */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          className="flex-1 h-full relative overflow-hidden bg-slate-100 cursor-grab active:cursor-grabbing"
        >
          {/* VIEW MODE 1: REAL SATELLITE GIS TWIN */}
          {viewMode === 'satellite' ? (
            <div className="absolute inset-0 z-0">
              <InteractiveMap
                mode="parcels"
                center={[24.4750, 54.3680]}
                zoom={16}
                isDarkTheme={timeOfDay === 'night'}
                className="w-full h-full"
              />
              {/* Overlay Badge */}
              <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl border border-border shadow-md text-[12px] text-navy-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold">Abu Dhabi Waterfront · 0.15m Sovereign Orthophoto Twin</span>
              </div>
            </div>
          ) : viewMode === 'bim' ? (
            /* VIEW MODE 2: BIM ARCHITECTURAL EXPLORER */
            <div className="absolute inset-0 z-0 bg-slate-100 flex items-center justify-center p-8">
              <div className="w-full max-w-5xl h-full max-h-[640px] bg-white border border-border rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <Building className="w-6 h-6 text-blue-600" />
                    <div>
                      <h2 className="text-[18px] font-bold text-navy-900">
                        BIM Architectural Explorer · {selectedAsset.name}
                      </h2>
                      <span className="text-[11px] font-mono text-secondaryText">
                        IFC 4.3 Schema · 4,820 Geometric Objects · Level of Development LOD 350
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setViewMode('3d')}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[12px] font-bold shadow-sm transition-colors"
                  >
                    Back to 3D Simulation
                  </button>
                </div>

                {/* BIM Cross-Section Wireframe Illustration */}
                <div className="flex-1 my-4 bg-slate-900 rounded-xl border border-slate-800 p-4 flex items-center justify-center relative overflow-hidden shadow-inner">
                  <svg viewBox="0 0 800 360" className="w-full h-full">
                    {/* Floor slabs */}
                    {Array.from({ length: 12 }).map((_, f) => (
                      <g key={f}>
                        <rect
                          x="120"
                          y={40 + f * 24}
                          width="560"
                          height="4"
                          fill="#38BDF8"
                          opacity={0.8}
                        />
                        <text
                          x="70"
                          y={44 + f * 24}
                          fill="#94A3B8"
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
                          stroke="#FB923C"
                          strokeWidth="2"
                        />
                        <line
                          x1="580"
                          y1={42 + f * 24}
                          x2="580"
                          y2={64 + f * 24}
                          stroke="#34D399"
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
                      stroke="#FBBF24"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />
                    <text
                      x="400"
                      y="180"
                      fill="#FBBF24"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      ELEVATOR CORE
                    </text>
                  </svg>
                  {/* Floating BIM Legend */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-border shadow-md text-[10px] space-y-1.5 font-mono text-navy-900">
                    <div className="text-blue-600 font-bold">BIM Systems:</div>
                    <div className="text-slate-700 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#38BDF8]" /> Structural Slabs
                    </div>
                    <div className="text-slate-700 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FB923C]" /> HVAC Ducts & Chilled Water
                    </div>
                    <div className="text-slate-700 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#34D399]" /> Electrical Busbars
                    </div>
                    <div className="text-slate-700 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FBBF24]" /> Fire Safety & Lift Cores
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-secondaryText">
                  <span>Linked Source: DMT Master Cadastre & Municipal BIM Repository</span>
                  <button
                    onClick={() => showToast('Exporting IFC 4.3 BIM file...')}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-navy-900 border border-border rounded-lg font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-600" />
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
                        <stop offset="0%" stopColor="#7DD3FC" />
                        <stop offset="45%" stopColor="#BAE6FD" />
                        <stop offset="100%" stopColor="#F0F9FF" />
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
                    {timeOfDay === 'day' ? (
                      <>
                        <stop offset="0%" stopColor="#0284C7" />
                        <stop offset="35%" stopColor="#0EA5E9" />
                        <stop offset="75%" stopColor="#38BDF8" />
                        <stop offset="100%" stopColor="#BAE6FD" />
                      </>
                    ) : (
                      <>
                        <stop offset="0%" stopColor="#08182D" />
                        <stop offset="50%" stopColor="#0B2240" />
                        <stop offset="100%" stopColor="#07172B" />
                      </>
                    )}
                  </linearGradient>

                  {/* Glass Cut Pattern for Utilities */}
                  <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(148, 163, 184, 0.25)" strokeWidth="0.8" />
                  </pattern>

                  {/* Cyan Glow Filter */}
                  <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Drop Shadow for Buildings & Nodes */}
                  <filter id="archShadow" x="-10%" y="-10%" width="120%" height="130%">
                    <feDropShadow dx="3" dy="6" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.12" />
                  </filter>
                </defs>

                {/* Sky */}
                <rect width="1100" height="850" fill="url(#skyGrad)" />

                {/* Arabian Gulf Water Basin */}
                <path
                  d="M 0 340 Q 300 320 600 350 T 1100 330 L 1100 850 L 0 850 Z"
                  fill="url(#waterGrad)"
                />

                {/* Water Specular Waves & Shimmer */}
                {Array.from({ length: 18 }).map((_, i) => (
                  <ellipse
                    key={i}
                    cx={130 + i * 54}
                    cy={555 + (i % 6) * 44}
                    rx={32 + (i % 4) * 16}
                    ry={2.2}
                    fill={timeOfDay === 'day' ? 'rgba(255, 255, 255, 0.55)' : 'rgba(67, 200, 255, 0.2)'}
                  />
                ))}

                {/* Marina Piers & Moored Yachts */}
                <g id="marina-docks">
                  {/* Pier 1 */}
                  <polygon points="120,490 200,445 212,453 132,498" fill={timeOfDay === 'day' ? '#F5E6D3' : '#1C2E46'} stroke="#CBD5E1" strokeWidth="1" />
                  {/* Pier 2 */}
                  <polygon points="160,540 240,495 252,503 172,548" fill={timeOfDay === 'day' ? '#F5E6D3' : '#1C2E46'} stroke="#CBD5E1" strokeWidth="1" />

                  {/* Moored White Yacht 1 */}
                  <g transform="translate(165, 460) rotate(-26)">
                    <polygon points="0,0 28,-4 34,0 28,4 0,0" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="0.8" />
                    <polygon points="6,-2 18,-3 20,0 18,3 6,2" fill="#0284C7" />
                  </g>
                  {/* Moored White Yacht 2 */}
                  <g transform="translate(205, 510) rotate(-26)">
                    <polygon points="0,0 26,-4 32,0 26,4 0,0" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="0.8" />
                    <polygon points="6,-2 16,-3 18,0 16,3 6,2" fill="#0284C7" />
                  </g>
                </g>

                {/* Simulated Solar Shadows */}
                {activeSimulation === 'solar' && (
                  <g id="solar-shadows" opacity={timeOfDay === 'day' ? 0.25 : 0.45}>
                    <polygon points="500,470 380,590 490,620 650,470" fill="#0F172A" />
                    <polygon points="320,440 240,510 320,530 440,435" fill="#0F172A" />
                    <polygon points="620,380 540,460 620,480 720,380" fill="#0F172A" />
                  </g>
                )}

                {/* Quayside Promenades & Landmass */}
                {/* 1. Base Paved Landmass */}
                <polygon
                  points="220,440 940,320 1080,480 320,680"
                  fill={timeOfDay === 'day' ? '#F8FAFC' : timeOfDay === 'night' ? '#0C182A' : '#13243B'}
                  stroke={timeOfDay === 'day' ? '#E2E8F0' : '#2B4973'}
                  strokeWidth="2"
                  filter="url(#archShadow)"
                />

                {/* 2. Waterfront Boardwalk Decking along the shoreline */}
                <polygon
                  points="220,440 320,680 340,665 240,436"
                  fill={timeOfDay === 'day' ? '#F5E6D3' : '#1B2C46'}
                  stroke={timeOfDay === 'day' ? '#E2D9C8' : '#2B4973'}
                  strokeWidth="1"
                />
                {/* Boardwalk planking notches */}
                {Array.from({ length: 14 }).map((_, pi) => (
                  <line
                    key={pi}
                    x1={225 + pi * 7.5}
                    y1={442 + pi * 17}
                    x2={238 + pi * 7.5}
                    y2={438 + pi * 17}
                    stroke={timeOfDay === 'day' ? '#E2D9C8' : '#243C5E'}
                    strokeWidth="1"
                  />
                ))}

                {/* 3. Landscaped Coastal Mangrove & Greenery Sanctuary */}
                {layers.greenery && (
                  <g id="mangrove-buffer">
                    {/* Main organic lawn */}
                    <path
                      d="M 245 448 Q 290 425 350 450 T 430 480 Q 400 520 340 525 T 260 480 Z"
                      fill={timeOfDay === 'day' ? '#86EFAC' : '#1E9E6A'}
                      stroke={timeOfDay === 'day' ? '#22C55E' : '#2BA6DE'}
                      strokeWidth="1.5"
                      opacity={timeOfDay === 'day' ? 0.75 : 0.65}
                    />
                    <path
                      d="M 270 460 Q 310 445 360 465 T 410 490 Q 380 515 330 515 Z"
                      fill={timeOfDay === 'day' ? '#4ADE80' : '#166534'}
                      opacity="0.8"
                    />
                    {/* Stylized Palm Trees */}
                    {[
                      { tx: 275, ty: 470 },
                      { tx: 310, ty: 458 },
                      { tx: 345, ty: 475 },
                      { tx: 375, ty: 495 },
                      { tx: 395, ty: 480 },
                    ].map((pt, pti) => (
                      <g key={pti} transform={`translate(${pt.tx}, ${pt.ty})`}>
                        <line x1="0" y1="0" x2="-2" y2="-12" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
                        <circle cx="-2" cy="-13" r="6" fill="#15803D" opacity="0.9" />
                        <circle cx="-2" cy="-13" r="3.5" fill="#22C55E" />
                      </g>
                    ))}
                    {/* Label Badge */}
                    <rect x="275" y="432" width="145" height="18" rx="9" fill={timeOfDay === 'day' ? 'rgba(255,255,255,0.95)' : 'rgba(10,25,45,0.9)'} stroke={timeOfDay === 'day' ? '#86EFAC' : '#2BA6DE'} strokeWidth="1" />
                    <text x="347" y="444" fill={timeOfDay === 'day' ? '#166534' : '#6EE7B7'} fontSize="9" fontWeight="bold" textAnchor="middle">
                      🌿 Mangrove Biosphere Park
                    </text>
                  </g>
                )}

                {/* Underground Sovereign Utility Cut (-6.5m) */}
                {layers.utilities && (
                  <g id="underground-cut" opacity={utilityDepth / 100}>
                    {/* Frosted Engineering Trench Base */}
                    <polygon
                      points="380,590 560,530 640,620 440,680"
                      fill={timeOfDay === 'day' ? 'rgba(241, 245, 249, 0.94)' : 'rgba(8, 18, 32, 0.9)'}
                      stroke={timeOfDay === 'day' ? '#0284C7' : '#FFC20E'}
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                    />
                    {/* Grid texture */}
                    <polygon
                      points="380,590 560,530 640,620 440,680"
                      fill="url(#gridPattern)"
                    />
                    {/* Trench depth grid lines */}
                    <line x1="420" y1="575" x2="480" y2="665" stroke={timeOfDay === 'day' ? '#CBD5E1' : 'rgba(255,255,255,0.1)'} strokeWidth="1" />
                    <line x1="470" y1="560" x2="530" y2="650" stroke={timeOfDay === 'day' ? '#CBD5E1' : 'rgba(255,255,255,0.1)'} strokeWidth="1" />
                    <line x1="520" y1="545" x2="580" y2="635" stroke={timeOfDay === 'day' ? '#CBD5E1' : 'rgba(255,255,255,0.1)'} strokeWidth="1" />

                    {/* District Chilled Water Pipe (Cyan) */}
                    <path
                      d="M 390 600 L 550 545 L 630 625"
                      stroke="#0284C7"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                    {/* High-Voltage Smart Grid (Gold) */}
                    <path
                      d="M 405 615 L 565 560 L 635 635"
                      stroke="#D97706"
                      strokeWidth="3.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                    {/* Sovereign Fiber Telecom (Emerald) */}
                    <path
                      d="M 420 630 L 580 575 L 640 645"
                      stroke="#059669"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                    {/* District Vacuum / Recycled TSE Water (Violet) */}
                    <path
                      d="M 435 645 L 595 590 L 645 655"
                      stroke="#7C3AED"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />

                    {/* Clean Engineering Badge */}
                    <g transform="translate(485, 605)">
                      <rect x="-95" y="-10" width="190" height="20" rx="4" fill={timeOfDay === 'day' ? '#FFFFFF' : '#0B1C33'} stroke={timeOfDay === 'day' ? '#0284C7' : '#FFC20E'} strokeWidth="1" />
                      <text x="0" y="4" fill={timeOfDay === 'day' ? '#0B2545' : '#FFC20E'} fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                        SOVEREIGN UTILITY CORRIDOR -6.5m
                      </text>
                    </g>
                  </g>
                )}

                {/* Roads & Real-Time Animated Traffic Streams */}
                {layers.traffic && (
                  <g id="traffic-roads">
                    {/* Main Arterial Roadway */}
                    <path
                      d="M 280 490 L 860 380"
                      stroke="#334155"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    {/* White dashed center line */}
                    <path
                      d="M 285 490 L 855 380"
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                      strokeDasharray="6 6"
                      opacity="0.8"
                    />
                    {/* Secondary Boulevard */}
                    <path
                      d="M 330 550 L 910 440"
                      stroke="#334155"
                      strokeWidth="9"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 335 550 L 905 440"
                      stroke="#FFFFFF"
                      strokeWidth="1"
                      strokeDasharray="5 5"
                      opacity="0.75"
                    />
                    {/* Autonomous Mobility Cross-Connector */}
                    <path
                      d="M 440 370 L 620 580"
                      stroke="#10B981"
                      strokeWidth="5"
                      strokeLinecap="round"
                      opacity="0.9"
                    />
                    {/* Moving Autonomous Vehicles */}
                    {Array.from({ length: 5 }).map((_, vi) => (
                      <g key={vi} transform={`translate(${300 + vi * 120}, ${485 - vi * 22})`}>
                        <rect x="-6" y="-3" width="12" height="6" rx="2" fill={vi % 2 === 0 ? '#0284C7' : '#F59E0B'} />
                        <circle cx="5" cy="0" r="1.5" fill="#FFFFFF" className="animate-pulse" />
                      </g>
                    ))}
                  </g>
                )}

                {/* 3D Buildings Rendered with Dynamic Year Filtering */}
                {layers.buildings3d && (
                  <g id="buildings-3d" opacity={buildingOpacity / 100}>
                    {buildings.map((bld) => {
                      const isBuilt = timelineYear >= bld.completionYear;
                      const isSelected = selectedAsset.id === bld.id;
                      const isDay = timeOfDay === 'day';

                      if (!isBuilt && timelineYear < bld.completionYear - 2) {
                        return null;
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
                              fill={isDay ? 'rgba(245, 158, 11, 0.08)' : 'none'}
                              stroke="#F59E0B"
                              strokeWidth="1.5"
                              strokeDasharray="4 2"
                            />
                            <polygon
                              points={bld.side2}
                              fill={isDay ? 'rgba(245, 158, 11, 0.12)' : 'none'}
                              stroke="#F59E0B"
                              strokeWidth="1.5"
                              strokeDasharray="4 2"
                            />
                            <text
                              x="880"
                              y="240"
                              fill={isDay ? '#B45309' : '#FFC20E'}
                              fontSize="9"
                              fontWeight="bold"
                              fontFamily="monospace"
                            >
                              PLAN 2030 (NET-ZERO)
                            </text>
                          </g>
                        );
                      }

                      // Dynamic daytime colors vs night/dusk colors
                      const side1Fill = isDay ? (isSelected ? '#E0F2FE' : bld.daySide1) : (isSelected ? '#1F5FAD' : bld.color);
                      const side2Fill = isDay ? (isSelected ? '#BAE6FD' : bld.daySide2) : (isSelected ? '#2BA6DE' : '#244573');
                      const roofFill = isDay ? (isSelected ? '#7DD3FC' : bld.dayRoof) : (isSelected ? '#43C8FF' : bld.roofColor);
                      const strokeColor = isSelected ? '#2563EB' : isDay ? '#94A3B8' : '#244573';
                      const strokeW = isSelected ? '2.5' : '1';

                      return (
                        <g
                          key={bld.id}
                          onClick={() => {
                            setSelectedAsset(bld);
                            showToast(`Selected Asset: ${bld.name}`);
                          }}
                          className="cursor-pointer transition-all hover:brightness-105"
                          filter="url(#archShadow)"
                        >
                          {/* Ground Footprint Selection Ring */}
                          {isSelected && (
                            <ellipse
                              cx={bld.id === 'AD-BLD-000482' ? 570 : bld.id === 'AD-BLD-000483' ? 380 : bld.id === 'AD-BLD-000484' ? 520 : bld.id === 'AD-BLD-000485' ? 670 : 790}
                              cy={bld.id === 'AD-BLD-000482' ? 470 : bld.id === 'AD-BLD-000483' ? 435 : bld.id === 'AD-BLD-000484' ? 435 : bld.id === 'AD-BLD-000485' ? 380 : 360}
                              rx="60"
                              ry="24"
                              fill="none"
                              stroke="#2563EB"
                              strokeWidth="2"
                              strokeDasharray="4 3"
                              className="animate-pulse"
                            />
                          )}

                          {/* Side 1 (Sunlit Facade) */}
                          <polygon
                            points={bld.side1}
                            fill={side1Fill}
                            stroke={strokeColor}
                            strokeWidth={strokeW}
                            filter={isSelected && !isDay ? 'url(#glowCyan)' : undefined}
                          />
                          {/* Side 2 (Shaded Facade) */}
                          <polygon
                            points={bld.side2}
                            fill={side2Fill}
                            stroke={isSelected ? '#3B82F6' : isDay ? '#64748B' : '#1E3960'}
                            strokeWidth={strokeW}
                            filter={isSelected && !isDay ? 'url(#glowCyan)' : undefined}
                          />
                          {/* Roof */}
                          <polygon
                            points={bld.roofPolygon}
                            fill={roofFill}
                            stroke={isSelected ? '#2563EB' : isDay ? '#94A3B8' : '#2E5587'}
                            strokeWidth={strokeW}
                          />

                          {/* Building Facade Architectural Details */}
                          {/* For Hero Tower: Architectural Curtain Wall Grid & Helipad */}
                          {bld.id === 'AD-BLD-000482' && (
                            <>
                              {/* Floor bands */}
                              {Array.from({ length: 14 }).map((_, f) => (
                                <React.Fragment key={f}>
                                  <line
                                    x1="505"
                                    y1={200 + f * 18}
                                    x2="555"
                                    y2={175 + f * 18}
                                    stroke={isDay ? '#0284C7' : 'rgba(255, 255, 255, 0.5)'}
                                    strokeWidth="1"
                                    strokeOpacity={isDay ? 0.35 : 0.6}
                                  />
                                  <line
                                    x1="565"
                                    y1={175 + f * 18}
                                    x2="645"
                                    y2={202 + f * 18}
                                    stroke={isDay ? '#0369A1' : 'rgba(255, 255, 255, 0.7)'}
                                    strokeWidth="1"
                                    strokeOpacity={isDay ? 0.4 : 0.7}
                                  />
                                </React.Fragment>
                              ))}
                              {/* Vertical Mullions */}
                              <line x1="520" y1="195" x2="520" y2="455" stroke={isDay ? '#38BDF8' : '#43C8FF'} strokeWidth="1" strokeOpacity="0.4" />
                              <line x1="540" y1="185" x2="540" y2="445" stroke={isDay ? '#38BDF8' : '#43C8FF'} strokeWidth="1" strokeOpacity="0.4" />
                              <line x1="590" y1="185" x2="590" y2="450" stroke={isDay ? '#0284C7' : '#2BA6DE'} strokeWidth="1" strokeOpacity="0.35" />
                              <line x1="620" y1="195" x2="620" y2="460" stroke={isDay ? '#0284C7' : '#2BA6DE'} strokeWidth="1" strokeOpacity="0.35" />

                              {/* Helipad 'H' on Roof */}
                              <circle cx="575" cy="190" r="14" fill="none" stroke={isDay ? '#0284C7' : '#FFFFFF'} strokeWidth="1.5" />
                              <text x="575" y="194" fill={isDay ? '#0284C7' : '#FFFFFF'} fontSize="10" fontWeight="bold" textAnchor="middle">H</text>

                              {/* Antenna Spire */}
                              <line x1="575" y1="175" x2="575" y2="120" stroke={isDay ? '#0284C7' : '#FFC20E'} strokeWidth="2" />
                              <circle cx="575" cy="120" r="3.5" fill="#EF4444" className="animate-ping" />
                              <circle cx="575" cy="120" r="2.5" fill="#EF4444" />
                            </>
                          )}

                          {/* For Waterfront Bay Residence (AD-BLD-000483): Balcony rows & Green Sky Garden */}
                          {bld.id === 'AD-BLD-000483' && (
                            <>
                              {Array.from({ length: 6 }).map((_, r) => (
                                <React.Fragment key={r}>
                                  <line
                                    x1="325"
                                    y1={350 + r * 14}
                                    x2="365"
                                    y2={330 + r * 14}
                                    stroke={isDay ? '#0284C7' : '#43C8FF'}
                                    strokeWidth="1.5"
                                    strokeOpacity={isDay ? 0.45 : 0.6}
                                  />
                                  <line
                                    x1="375"
                                    y1={330 + r * 14}
                                    x2="435"
                                    y2={348 + r * 14}
                                    stroke={isDay ? '#64748B' : '#7A9CC6'}
                                    strokeWidth="1.5"
                                    strokeOpacity="0.5"
                                  />
                                </React.Fragment>
                              ))}
                              {/* Rooftop Green Sky Garden */}
                              <ellipse cx="380" cy="335" rx="18" ry="7" fill={isDay ? '#4ADE80' : '#1E9E6A'} opacity="0.85" />
                              <circle cx="395" cy="333" r="3" fill={isDay ? '#38BDF8' : '#2BA6DE'} />
                            </>
                          )}

                          {/* For Al Maryah Pavilion (AD-BLD-000484): Diamond Bracing */}
                          {bld.id === 'AD-BLD-000484' && (
                            <>
                              <line x1="465" y1="435" x2="505" y2="365" stroke={isDay ? '#0284C7' : '#43C8FF'} strokeWidth="1" strokeOpacity="0.4" />
                              <line x1="465" y1="385" x2="505" y2="415" stroke={isDay ? '#0284C7' : '#43C8FF'} strokeWidth="1" strokeOpacity="0.4" />
                              <line x1="515" y1="365" x2="575" y2="435" stroke={isDay ? '#64748B' : '#7A9CC6'} strokeWidth="1" strokeOpacity="0.3" />
                            </>
                          )}

                          {/* For Corniche Grand Horizon (AD-BLD-000485): Ribbon Windows */}
                          {bld.id === 'AD-BLD-000485' && (
                            <>
                              {Array.from({ length: 7 }).map((_, f) => (
                                <line
                                  key={f}
                                  x1="625"
                                  y1={270 + f * 14}
                                  x2="655"
                                  y2={255 + f * 14}
                                  stroke={isDay ? '#0284C7' : '#43C8FF'}
                                  strokeWidth="1.5"
                                  strokeOpacity={isDay ? 0.4 : 0.6}
                                />
                              ))}
                            </>
                          )}

                          {/* Floating Selection Callout Pointer */}
                          {isSelected && (
                            <g className="animate-bounce">
                              <path
                                d={bld.id === 'AD-BLD-000482' ? 'M 575 105 L 570 92 L 580 92 Z' : bld.id === 'AD-BLD-000483' ? 'M 380 300 L 375 287 L 385 287 Z' : 'M 520 350 L 515 337 L 525 337 Z'}
                                fill="#2563EB"
                              />
                              <circle
                                cx={bld.id === 'AD-BLD-000482' ? 575 : bld.id === 'AD-BLD-000483' ? 380 : 520}
                                cy={bld.id === 'AD-BLD-000482' ? 86 : bld.id === 'AD-BLD-000483' ? 281 : 331}
                                r="7"
                                fill="#2563EB"
                              />
                              <circle
                                cx={bld.id === 'AD-BLD-000482' ? 575 : bld.id === 'AD-BLD-000483' ? 380 : 520}
                                cy={bld.id === 'AD-BLD-000482' ? 86 : bld.id === 'AD-BLD-000483' ? 281 : 331}
                                r="3"
                                fill="#FFFFFF"
                              />
                            </g>
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
                        stroke="#0284C7"
                        strokeWidth="2.5"
                        strokeDasharray="8 6"
                        fill="none"
                        className="animate-pulse"
                      />
                    ))}
                    <text x="320" y="240" fill={timeOfDay === 'day' ? '#0369A1' : '#38BDF8'} fontSize="11" fontWeight="bold">
                      Wind Velocity Vector: 4.8 m/s (Offshore North-West Breeze)
                    </text>
                  </g>
                )}

                {/* Floating IoT Sensor Markers */}
                {layers.sensors && (
                  <g id="iot-sensors">
                    {iotSensors.map((s) => {
                      const isSelected = selectedSensor.id === s.id;
                      return (
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
                          {/* Subtle pulse ring */}
                          <circle cx={s.x} cy={s.y} r="16" fill="#0284C7" opacity="0.18" className="animate-ping" />
                          {/* White elevated puck */}
                          <circle
                            cx={s.x}
                            cy={s.y}
                            r="8.5"
                            fill="#FFFFFF"
                            stroke={isSelected ? '#F59E0B' : '#0284C7'}
                            strokeWidth={isSelected ? '2.5' : '1.5'}
                            filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.15))"
                          />
                          {/* Glowing center indicator */}
                          <circle
                            cx={s.x}
                            cy={s.y}
                            r="4"
                            fill={isSelected ? '#F59E0B' : s.type === 'AQ' ? '#0284C7' : s.type === 'Noise' ? '#10B981' : '#F59E0B'}
                          />
                        </g>
                      );
                    })}
                  </g>
                )}
              </svg>
            </div>
          )}

          {/* Floating UI Elements: */}

          {/* Top Unified Header Ribbon across the viewport */}
          <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between gap-3 pointer-events-none">
            {/* Left: District Badge + View Mode Switcher */}
            <div className="flex items-center gap-2 pointer-events-auto">
              <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-border shadow-sm flex items-center gap-2 text-[12px] font-semibold text-navy-900">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Waterfront District · 3D Digital Twin</span>
                <Info className="w-3.5 h-3.5 text-secondaryText ml-0.5" />
              </div>

              {/* View Mode 3-Way Switcher */}
              <div className="bg-white/95 backdrop-blur-md p-1 rounded-full border border-border shadow-sm flex items-center gap-1 text-[11px]">
                <button
                  onClick={() => {
                    setViewMode('3d');
                    showToast('Switched to 3D Isometric Urban Simulation');
                  }}
                  className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                    viewMode === '3d' ? 'bg-blue-600 text-white shadow font-bold' : 'text-secondaryText hover:text-navy-900'
                  }`}
                >
                  3D Urban View
                </button>
                <button
                  onClick={() => {
                    setViewMode('satellite');
                    showToast('Switched to Sovereign High-Res Satellite Twin');
                  }}
                  className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                    viewMode === 'satellite' ? 'bg-blue-600 text-white shadow font-bold' : 'text-secondaryText hover:text-navy-900'
                  }`}
                >
                  Satellite GIS Twin
                </button>
                <button
                  onClick={() => {
                    setViewMode('bim');
                    showToast('Switched to BIM Architectural View');
                  }}
                  className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                    viewMode === 'bim' ? 'bg-blue-600 text-white shadow font-bold' : 'text-secondaryText hover:text-navy-900'
                  }`}
                >
                  BIM Explorer
                </button>
              </div>
            </div>

            {/* Center: Use-Case Filter Pills */}
            <div className="pointer-events-auto bg-white/95 backdrop-blur-md p-1 rounded-full border border-border shadow-sm flex items-center gap-1 text-[11px]">
              {useCases.map((uc) => (
                <button
                  key={uc}
                  onClick={() => setUseCase(uc)}
                  className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                    useCase === uc
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-secondaryText hover:text-navy-900'
                  }`}
                >
                  {uc}
                </button>
              ))}
            </div>

            {/* Right: Scenario Toggle + Lighting Toggle */}
            <div className="flex items-center gap-2 pointer-events-auto">
              <div className="bg-white/95 backdrop-blur-md p-1 px-2 rounded-full border border-border shadow-sm flex items-center gap-1.5 text-[11px]">
                <span className="text-[10px] uppercase font-bold text-secondaryText px-1">Scenario:</span>
                <button
                  onClick={() => {
                    setActiveScenario('A');
                    showToast('Loaded Scenario A: Approved Masterplan 2027');
                  }}
                  className={`px-2 py-0.5 rounded-full font-semibold transition-all cursor-pointer ${
                    activeScenario === 'A'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-secondaryText hover:text-navy-900'
                  }`}
                >
                  A: 2027
                </button>
                <button
                  onClick={() => {
                    setActiveScenario('B');
                    showToast('Loaded Scenario B: Proposed 2030 Net-Zero Amendment');
                  }}
                  className={`px-2 py-0.5 rounded-full font-semibold transition-all cursor-pointer ${
                    activeScenario === 'B'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-secondaryText hover:text-navy-900'
                  }`}
                >
                  B: 2030 (Net-Zero)
                </button>
                <button
                  onClick={() => setShowScenarioModal(true)}
                  className="text-gold-600 font-bold px-1 hover:underline cursor-pointer"
                  title="Compare Scenarios Side-by-Side"
                >
                  ⇄
                </button>
              </div>

              {/* Time of Day Lighting Toggle */}
              <div className="bg-white/95 backdrop-blur-md p-1 rounded-full border border-border shadow-sm flex items-center gap-1 text-[11px]">
                <button
                  onClick={() => {
                    setTimeOfDay('day');
                    showToast('Time of Day: Arabian Day Sun ☀️');
                  }}
                  className={`p-1.5 rounded-full cursor-pointer ${timeOfDay === 'day' ? 'bg-amber-500 text-white' : 'text-secondaryText hover:text-navy-900'}`}
                  title="Day Sun"
                >
                  <Sun className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setTimeOfDay('dusk');
                    showToast('Time of Day: Sovereign Dusk 🌅');
                  }}
                  className={`p-1.5 rounded-full cursor-pointer ${timeOfDay === 'dusk' ? 'bg-orange-500 text-white' : 'text-secondaryText hover:text-navy-900'}`}
                  title="Dusk"
                >
                  <Sunset className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setTimeOfDay('night');
                    showToast('Time of Day: Cyber Night 🌙');
                  }}
                  className={`p-1.5 rounded-full cursor-pointer ${timeOfDay === 'night' ? 'bg-indigo-600 text-white' : 'text-secondaryText hover:text-navy-900'}`}
                  title="Night"
                >
                  <Moon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Left Panel: Layers, Simulation Tools & Camera Presets (270 px) */}
          <div className="absolute top-16 left-4 z-20 w-[270px] bg-white/95 backdrop-blur-md rounded-xl border border-border shadow-xl p-4 space-y-3 text-[12px] max-h-[calc(100vh-170px)] overflow-y-auto text-navy-900">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <span className="font-bold text-navy-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-gold-600" />
                <span>Digital Twin Layers</span>
              </span>
              <span className="text-[10px] text-emerald-700 font-mono font-semibold">
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
                  className="flex items-center justify-between py-1 px-1 rounded hover:bg-slate-50 cursor-pointer"
                >
                  <span className="text-slate-700 text-[11px] font-medium">{item.label}</span>
                  <input
                    type="checkbox"
                    checked={layers[item.k as keyof typeof layers]}
                    onChange={() => toggleLayer(item.k as keyof typeof layers)}
                    className="rounded text-blue-600 focus:ring-0 bg-white border-border cursor-pointer"
                  />
                </label>
              ))}
            </div>

            {/* Camera Presets Quick Navigation */}
            <div className="pt-2 border-t border-border space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-navy-900 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Camera className="w-3 h-3 text-blue-600" />
                  <span>Camera Angles</span>
                </span>
                <button
                  onClick={handleResetCamera}
                  className="text-gold-600 text-[10px] hover:underline cursor-pointer font-bold"
                >
                  Reset
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                <button
                  onClick={() => handleCameraPreset('hero-tower')}
                  className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-left truncate text-navy-900 border border-border cursor-pointer font-medium"
                >
                  🏢 Hero Tower
                </button>
                <button
                  onClick={() => handleCameraPreset('promenade')}
                  className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-left truncate text-navy-900 border border-border cursor-pointer font-medium"
                >
                  🌊 Promenade
                </button>
                <button
                  onClick={() => handleCameraPreset('underground')}
                  className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-left truncate text-navy-900 border border-border cursor-pointer font-medium"
                >
                  ⚡ Utilities Cut
                </button>
                <button
                  onClick={() => handleCameraPreset('island-aerial')}
                  className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-left truncate text-navy-900 border border-border cursor-pointer font-medium"
                >
                  🛰️ Island Aerial
                </button>
              </div>
            </div>

            {/* Simulation Engines Selector */}
            <div className="pt-2 border-t border-border space-y-1.5">
              <span className="text-[11px] font-bold text-navy-900 uppercase tracking-wider block">
                Simulation Engines
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    const next = activeSimulation === 'solar' ? 'none' : 'solar';
                    setActiveSimulation(next);
                    showToast(next === 'solar' ? 'Simulating Solar Shadows' : 'Deactivated Solar Simulation');
                  }}
                  className={`w-full py-1.5 px-2 rounded text-left flex items-center justify-between text-[11px] font-semibold transition-colors cursor-pointer ${
                    activeSimulation === 'solar'
                      ? 'bg-amber-50 text-amber-800 border border-amber-300'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-border'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Solar & Shadow Ray-Trace</span>
                  </span>
                  <span className="text-[10px] font-bold">{activeSimulation === 'solar' ? 'ON' : 'OFF'}</span>
                </button>

                <button
                  onClick={() => {
                    const next = activeSimulation === 'wind' ? 'none' : 'wind';
                    setActiveSimulation(next);
                    showToast(next === 'wind' ? 'Simulating Wind Streamlines' : 'Deactivated Wind Simulation');
                  }}
                  className={`w-full py-1.5 px-2 rounded text-left flex items-center justify-between text-[11px] font-semibold transition-colors cursor-pointer ${
                    activeSimulation === 'wind'
                      ? 'bg-sky-50 text-sky-800 border border-sky-300'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-border'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5 text-sky-500" />
                    <span>Microclimate CFD Wind Flow</span>
                  </span>
                  <span className="text-[10px] font-bold">{activeSimulation === 'wind' ? 'ON' : 'OFF'}</span>
                </button>
              </div>
            </div>

            {/* Opacity Sliders */}
            <div className="pt-2 border-t border-border space-y-2">
              <div>
                <div className="flex justify-between text-[10px] text-secondaryText mb-1">
                  <span>Mesh Opacity</span>
                  <span className="font-mono text-navy-900 font-bold">{buildingOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={buildingOpacity}
                  onChange={(e) => setBuildingOpacity(parseInt(e.target.value))}
                  className="w-full accent-blue-600 h-1 bg-slate-200 rounded cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[10px] text-secondaryText mb-1">
                  <span>Underground Trench Cut</span>
                  <span className="font-mono text-navy-900 font-bold">{utilityDepth}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={utilityDepth}
                  onChange={(e) => setUtilityDepth(parseInt(e.target.value))}
                  className="w-full accent-gold-500 h-1 bg-slate-200 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Right Panel: Asset Inspector & Live Telemetry (320 px) */}
          <div className="absolute top-16 right-4 z-20 w-[320px] bg-white/95 backdrop-blur-md rounded-xl border border-border shadow-xl p-4 flex flex-col justify-between space-y-3.5 text-[12px] max-h-[calc(100vh-170px)] overflow-y-auto text-navy-900">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <div>
                  <span className="text-[10px] font-mono text-gold-600 font-bold uppercase tracking-wider">
                    Selected 3D Asset
                  </span>
                  <h3 className="text-[15px] font-bold text-navy-900 tracking-tight leading-snug">
                    {selectedAsset.name}
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 flex-shrink-0">
                  {selectedAsset.lod}
                </span>
              </div>

              {/* Key Asset Specs */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded bg-slate-50 border border-border">
                  <div className="text-secondaryText text-[10px]">Height (AGL)</div>
                  <div className="font-bold text-navy-900 font-mono">
                    {selectedAsset.height} ({selectedAsset.floors} Floors)
                  </div>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-border">
                  <div className="text-secondaryText text-[10px]">Primary Use</div>
                  <div className="font-bold text-navy-900 truncate">{selectedAsset.use}</div>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-border">
                  <div className="text-secondaryText text-[10px]">Real-Time Power</div>
                  <div className="font-bold text-emerald-700 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{selectedAsset.power}</span>
                  </div>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-border">
                  <div className="text-secondaryText text-[10px]">Current Occupancy</div>
                  <div className="font-bold text-navy-900 font-mono">{selectedAsset.occupancy}</div>
                </div>
              </div>

              {/* BIM Model Linked Action */}
              <div className="p-2.5 rounded bg-blue-50 border border-blue-200 flex items-center justify-between text-[11px]">
                <div>
                  <div className="font-bold text-navy-900">BIM IFC Model Connected</div>
                  <div className="text-[10px] text-secondaryText">
                    Revit 2027 · {selectedAsset.bimObjects} objects
                  </div>
                </div>
                <button
                  onClick={() => setShowBimModal(true)}
                  className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[10px] transition-colors cursor-pointer shadow-xs"
                >
                  Inspect BIM
                </button>
              </div>

              {/* Live Sensor Telemetry Strip */}
              <div className="p-2.5 rounded bg-slate-50 border border-border space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-secondaryText font-bold flex items-center gap-1">
                    <Radio className="w-3 h-3 text-blue-600" />
                    <span>Live IoT Stream: {selectedSensor.id}</span>
                  </span>
                  <span className="text-emerald-700 font-bold font-mono">
                    {selectedSensor.val}
                  </span>
                </div>
                {/* 24-hr sparkline */}
                <svg viewBox="0 0 260 35" className="w-full h-7 overflow-visible">
                  <polyline
                    fill="none"
                    stroke="#1F5FAD"
                    strokeWidth="2"
                    points="0,22 30,19 60,25 90,17 120,15 150,20 180,12 210,16 240,14 260,15"
                  />
                  <line
                    x1="0"
                    y1="18"
                    x2="260"
                    y2="18"
                    stroke="rgba(0,0,0,0.1)"
                    strokeDasharray="2 2"
                  />
                </svg>
                <div className="flex justify-between text-[9px] text-secondaryText font-mono">
                  <span>24 hrs ago</span>
                  <span>Owner: {selectedSensor.owner}</span>
                  <span>Now (Live)</span>
                </div>
              </div>
            </div>

            {/* Asset Actions */}
            <div className="pt-2 border-t border-border space-y-1.5">
              <button
                onClick={() => setShowSolarModal(true)}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-[12px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Run Solar & Shadow Analysis</span>
              </button>
              <button
                onClick={() => setShowScenarioModal(true)}
                className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-navy-900 border border-border rounded-lg font-medium text-[11px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <SlidersHorizontal className="w-3 h-3 text-steel-500" />
                <span>Compare Scenarios A/B</span>
              </button>
            </div>
          </div>

          {/* Active Sensor Tooltip Floating Over Map */}
          {showSensorTooltip && (
            <div
              className="absolute z-30 bg-white/95 backdrop-blur-md text-navy-900 p-3 rounded-xl border border-border shadow-xl text-left text-[11px] font-mono pointer-events-auto"
              style={{ top: `${selectedSensor.y - 70}px`, left: `${selectedSensor.x - 60}px` }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-blue-700 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{selectedSensor.id} · {selectedSensor.type}</span>
                </div>
                <button
                  onClick={() => setShowSensorTooltip(false)}
                  className="text-secondaryText hover:text-navy-900 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <div className="text-navy-900 mt-1">
                Reading: <strong className="text-emerald-700 font-bold">{selectedSensor.val}</strong>
              </div>
              <div className="text-[10px] text-secondaryText mt-0.5">
                Authority: {selectedSensor.owner} · Status: {selectedSensor.status}
              </div>
            </div>
          )}

          {/* Bottom Left Live Status Pill */}
          <div className="absolute bottom-20 left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-border text-[11px] font-mono text-emerald-700 font-semibold flex items-center gap-2 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>48 / 48 IoT sensor feeds active · Low latency &lt;120ms</span>
          </div>

          {/* Bottom Right: Zoom & Reset Controls */}
          <div className="absolute bottom-20 right-4 z-20 flex flex-col gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-border shadow-md">
            <button
              onClick={() => {
                setCameraAngle((prev) => ({ ...prev, zoom: Math.min(1.8, prev.zoom + 0.15) }));
              }}
              className="p-1.5 hover:bg-slate-100 rounded text-slate-700 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setCameraAngle((prev) => ({ ...prev, zoom: Math.max(0.7, prev.zoom - 0.15) }));
              }}
              className="p-1.5 hover:bg-slate-100 rounded text-slate-700 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetCamera}
              className="p-1.5 hover:bg-slate-100 rounded text-gold-600 cursor-pointer"
              title="Reset North & Angle"
            >
              <Compass className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom 4D Urban Timeline Scrubber (64 px tall) */}
          <div className="absolute bottom-0 left-0 right-0 h-[64px] bg-white/95 backdrop-blur-md border-t border-border px-8 flex items-center justify-between z-30 shadow-level-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-full bg-gold-500 hover:bg-gold-600 text-navy-900 flex items-center justify-center font-bold shadow-md transition-transform active:scale-95 cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-navy-900" />
                ) : (
                  <Play className="w-4 h-4 fill-navy-900 ml-0.5" />
                )}
              </button>

              <div className="text-[12px] font-bold text-navy-900 font-mono">
                4D Urban Timeline · <span className="text-gold-600 font-bold">{timelineYear}</span>
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
                  className="w-full accent-gold-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Ticks and Milestones */}
              <div className="flex justify-between text-[10px] text-secondaryText font-mono mt-1 relative">
                <span>2020</span>
                <span>2022</span>
                <span>2024</span>
                <span
                  className={`${
                    timelineYear === 2027 ? 'text-gold-600 font-bold border-b-2 border-gold-500' : ''
                  }`}
                >
                  Now · Sep 2027
                </span>
                <span className="border-b border-dashed border-slate-300 text-secondaryText">
                  2030 Net-Zero
                </span>
                <span className="border-b border-dashed border-slate-300 text-secondaryText">
                  2035 Vision
                </span>
              </div>
            </div>

            {/* Timeline Speed Multipliers */}
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-secondaryText">
              <span>Speed:</span>
              {([1, 2, 4] as const).map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                    playbackSpeed === spd
                      ? 'bg-gold-500 text-navy-900 font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-border'
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
      <MicroFooter isDarkTheme={false} />

      {/* MODAL 1: BIM IFC Cross-Section Explorer */}
      {showBimModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-[620px] bg-white border border-border rounded-2xl p-6 shadow-2xl space-y-4 text-navy-900">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  IFC 4.3 Schema · Federated Model
                </span>
                <h3 className="text-[18px] font-bold text-navy-900 mt-1">
                  BIM Hierarchy: {selectedAsset.name}
                </h3>
              </div>
              <button
                onClick={() => setShowBimModal(false)}
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-[12px]">
              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-border">
                  <div className="text-[10px] text-secondaryText">Total IFC Entities</div>
                  <div className="text-[16px] font-bold text-blue-600">4,820</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-border">
                  <div className="text-[10px] text-secondaryText">MEP Ducting Clashes</div>
                  <div className="text-[16px] font-bold text-emerald-600">0 (Resolved)</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-border">
                  <div className="text-[10px] text-secondaryText">Sovereign Asset ID</div>
                  <div className="text-[13px] font-bold text-amber-600">AD-BIM-9912</div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-border space-y-2">
                <div className="font-bold text-navy-900 text-[11px] uppercase tracking-wider">
                  Connected Sub-Systems:
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-700">
                  <li className="flex items-center justify-between">
                    <span>• HVAC Air Handling Units (VAV Rooftop)</span>
                    <span className="text-emerald-700 font-mono font-medium">Normal · 98.4% Efficiency</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>• Smart District Chilled Water Exchange</span>
                    <span className="text-emerald-700 font-mono font-medium">Inflow 6.2°C · Delta T 8.4°C</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>• Dual Power Redundant Transformer Bus</span>
                    <span className="text-emerald-700 font-mono font-medium">Load 1,240 kW · PF 0.96</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <button
                onClick={() => {
                  showToast('Exported complete IFC 4.3 BIM dataset');
                  setShowBimModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[12px] shadow-sm transition-colors"
              >
                Export IFC File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Solar & Shadow Simulation Report */}
      {showSolarModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-[520px] bg-white border border-border rounded-2xl p-6 shadow-2xl space-y-4 text-navy-900">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  Solar Radiance & Shadow Analysis
                </span>
                <h3 className="text-[18px] font-bold text-navy-900 mt-1">
                  Solar Exposure Compliance Report
                </h3>
              </div>
              <button
                onClick={() => setShowSolarModal(false)}
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-[12px]">
              <p className="text-slate-600">
                Calculated diurnal solar irradiation for Waterfront District across winter and summer solstices:
              </p>

              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="p-3 bg-slate-50 rounded-xl border border-border">
                  <span className="text-[10px] text-secondaryText block">Annual Solar Insolation</span>
                  <span className="text-[18px] font-bold text-amber-600">2,140 kWh/m²</span>
                  <span className="text-[10px] text-emerald-600 block mt-1 font-medium">+14% above threshold</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-border">
                  <span className="text-[10px] text-secondaryText block">Pedestrian Shadow Buffer</span>
                  <span className="text-[18px] font-bold text-navy-900">4.2 Hours</span>
                  <span className="text-[10px] text-blue-600 block mt-1 font-medium">Meets ESTIDAMA Pearl 4</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <button
                onClick={() => {
                  showToast('Downloaded ESTIDAMA Solar Compliance Report (PDF)');
                  setShowSolarModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-[12px] shadow-sm transition-colors"
              >
                Download PDF Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Scenarios Side-by-Side Comparison */}
      {showScenarioModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-[640px] bg-white border border-border rounded-2xl p-6 shadow-2xl space-y-4 text-navy-900">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  Urban Masterplan Delta
                </span>
                <h3 className="text-[18px] font-bold text-navy-900 mt-1">
                  Scenario A vs Scenario B Comparison
                </h3>
              </div>
              <button
                onClick={() => setShowScenarioModal(false)}
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <table className="w-full text-left text-[12px]">
              <thead className="border-b border-border text-secondaryText uppercase text-[10px]">
                <tr>
                  <th className="py-2">Metric</th>
                  <th className="py-2">Scenario A (Approved 2027)</th>
                  <th className="py-2 text-emerald-700">Scenario B (Net-Zero 2030)</th>
                  <th className="py-2 text-right">Delta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr>
                  <td className="py-2.5 text-navy-900 font-sans font-medium">Gross Floor Area (GFA)</td>
                  <td className="py-2.5 text-slate-600">420,000 m²</td>
                  <td className="py-2.5 text-navy-900 font-semibold">465,000 m²</td>
                  <td className="py-2.5 text-right text-emerald-600 font-bold">+10.7%</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-navy-900 font-sans font-medium">Renewable Generation</td>
                  <td className="py-2.5 text-slate-600">12 GWh / yr</td>
                  <td className="py-2.5 text-navy-900 font-semibold">54 GWh / yr</td>
                  <td className="py-2.5 text-right text-emerald-600 font-bold">+350%</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-navy-900 font-sans font-medium">Carbon Footprint</td>
                  <td className="py-2.5 text-slate-600">142 kg CO₂/m²</td>
                  <td className="py-2.5 text-navy-900 font-semibold">48 kg CO₂/m²</td>
                  <td className="py-2.5 text-right text-emerald-600 font-bold">-66.2%</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-navy-900 font-sans font-medium">Public Open Space</td>
                  <td className="py-2.5 text-slate-600">28% Coverage</td>
                  <td className="py-2.5 text-navy-900 font-semibold">38% Coverage</td>
                  <td className="py-2.5 text-right text-emerald-600 font-bold">+10.0%</td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <button
                onClick={() => {
                  setActiveScenario('B');
                  showToast('Adopted Scenario B into working session');
                  setShowScenarioModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[12px] shadow-sm transition-colors"
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
