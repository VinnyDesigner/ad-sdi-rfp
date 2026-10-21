import React, { useState } from 'react';
import { ScreenId } from '../types';
import { HeaderWorkspace } from '../components/common/HeaderWorkspace';
import { SidebarWorkspace } from '../components/common/SidebarWorkspace';
import { MicroFooter } from '../components/common/MicroFooter';
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  ChevronDown,
  TrendingUp,
  BarChart2,
  CheckCircle2,
  Target,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Search,
  Filter,
  Download,
  X,
  Check,
  ShieldCheck,
} from 'lucide-react';

interface S12Props {
  onNavigate: (screen: ScreenId) => void;
}

interface PathwayDetail {
  name: string;
  enrolments: number;
  comp: number;
  icon: any;
  goldBorder?: boolean;
  hours: number;
  level: string;
  nextCohort: string;
  desc: string;
  syllabus: string[];
}

export const S12_GeoMaturityTraining: React.FC<S12Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Pathways' | 'Sessions' | 'Certifications'>('Overview');
  const [radarTooltip, setRadarTooltip] = useState(true);
  const [selectedPillar, setSelectedPillar] = useState<string | null>('Data');
  const [selectedEntity, setSelectedEntity] = useState('All entities (64)');
  const [showEntityDropdown, setShowEntityDropdown] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedPathway, setSelectedPathway] = useState<PathwayDetail | null>(null);
  const [enrolName, setEnrolName] = useState('Mariam Al-Mansoori');
  const [enrolEntity, setEnrolEntity] = useState('DMT - Abu Dhabi');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const entitiesList = [
    'All entities (64)',
    'DMT · Municipalities & Transport',
    'EAD · Environment Agency',
    'DoH · Department of Health',
    'ITC · Integrated Transport Centre',
    'ADDC · Abu Dhabi Distribution',
  ];

  const kpis = [
    { label: 'Entities assessed', val: '64 / 64', sub: '100% census completed' },
    {
      label: 'Average GeoMaturity',
      val: selectedEntity.includes('DMT') ? '3.4 / 5' : selectedEntity.includes('EAD') ? '3.2 / 5' : '2.9 / 5',
      sub: 'Baseline 2026: 2.3 (+0.6)',
    },
    { label: 'Learners trained', val: '1,842', sub: 'Across 48 government entities' },
    { label: 'Pathway completions', val: '412', sub: 'Certified GIS professionals' },
    { label: 'Internal trainers', val: '38', sub: 'Abu Dhabi Gov Champions' },
  ];

  const sectorScores = [
    { name: 'Infrastructure & Municipal', current: 3.4, baseline: 2.6 },
    { name: 'Environment', current: 3.2, baseline: 2.5 },
    { name: 'Health', current: 2.8, baseline: 2.1 },
    { name: 'Education', current: 2.7, baseline: 2.0 },
    { name: 'Safety & Security', current: 3.1, baseline: 2.4 },
    { name: 'Economy & Commercial', current: 2.5, baseline: 1.9 },
  ];

  const pathways: PathwayDetail[] = [
    {
      name: 'Executives & Decision-Makers',
      enrolments: 184,
      comp: 88,
      icon: Award,
      hours: 12,
      level: 'Strategic',
      nextCohort: '15 Oct 2027',
      desc: 'Spatial governance, data sovereignty, and executive decision-making with geospatial analytics.',
      syllabus: ['Spatial Economics & Public Value', 'Data Sovereignty & UAE Directives', 'Executive Dashboards & KPI Tracking'],
    },
    {
      name: 'Data Stewards & Custodians',
      enrolments: 340,
      comp: 76,
      icon: BookOpen,
      hours: 36,
      level: 'Operational',
      nextCohort: '22 Oct 2027',
      desc: 'ISO 19115 metadata standards, quality assurance pipelines, and automated ingestion workflows.',
      syllabus: ['ISO 19115/19157 Standards', 'Clearinghouse Harvester Config', 'Data Lifecycle & Sensitivity Classification'],
    },
    {
      name: 'GIS Specialists & Analysts',
      enrolments: 490,
      comp: 82,
      icon: Target,
      hours: 48,
      level: 'Advanced',
      nextCohort: '05 Nov 2027',
      desc: 'Spatial analysis, topological editing, cartographic production, and PostGIS geodatabase design.',
      syllabus: ['Spatial SQL & Geometry Functions', 'ArcGIS Pro / QGIS Enterprise Workflows', 'Network Analysis & Routing'],
    },
    {
      name: 'Platform Administrators',
      enrolments: 120,
      comp: 91,
      icon: Users,
      hours: 40,
      level: 'Technical',
      nextCohort: '12 Nov 2027',
      desc: 'Cluster management, Kubernetes deployment, IAM RBAC roles, and API gateway throttling.',
      syllabus: ['GeoServer & MapServer Tuning', 'UAE PASS Single Sign-On Config', 'Zero-Trust Security & Audit Logs'],
    },
    {
      name: 'Developers & Integrators',
      enrolments: 210,
      comp: 69,
      icon: Sparkles,
      hours: 32,
      level: 'Development',
      nextCohort: '19 Nov 2027',
      desc: 'OGC API Features, Leaflet/MapLibre WebGL apps, Python GeoPandas, and REST integration.',
      syllabus: ['OGC API Features V3', 'Leaflet & Vector Tiles Integration', 'Spatial ETL with Python & FME'],
    },
    {
      name: 'GeoAI & Spatial Data Science',
      enrolments: 195,
      comp: 64,
      icon: BarChart2,
      hours: 44,
      level: 'Specialist',
      nextCohort: '26 Nov 2027',
      desc: 'Computer vision for satellite imagery, automated building extraction, and change detection.',
      syllabus: ['U-Net Segmentation for Orthophotos', 'Mangrove Biomass Estimation', 'GPU Inference Cluster Operations'],
    },
    {
      name: 'Twin, Marketplace & Open Data',
      enrolments: 165,
      comp: 72,
      icon: BookOpen,
      hours: 28,
      level: 'Professional',
      nextCohort: '03 Dec 2027',
      desc: '3D city models, IFC/BIM to GIS ingestion, marketplace data sharing agreements, and open data licensing.',
      syllabus: ['CityGML & 3D Tiles Streaming', 'BIM to GIS Coordinate Transformation', 'Marketplace DSA Templates'],
    },
    {
      name: 'Train-the-Trainer (Champion)',
      enrolments: 138,
      comp: 94,
      icon: Award,
      goldBorder: true,
      hours: 60,
      level: 'Master Champion',
      nextCohort: '10 Dec 2027',
      desc: 'Elite certification for Abu Dhabi government champions conducting internal agency capacity uplift.',
      syllabus: ['Adult Learning & Spatial Pedagogy', 'Maturity Gap Diagnosis', 'Agency Action Plan Facilitation'],
    },
  ];

  const sessions = [
    {
      id: 'SES-101',
      title: 'GeoAI & Mangrove Canopy Deep Learning Workshop',
      instructor: 'Dr. Tariq Al-Hashimi (GeoAI Lab)',
      date: '24 Oct 2027 · 09:00 - 13:00 GST',
      location: 'Al Maqtaa Training Lab (In-Person)',
      seats: 4,
      totalSeats: 25,
      track: 'GeoAI & Data Science',
    },
    {
      id: 'SES-102',
      title: 'Clearinghouse ISO 19157 Automated Quality Auditing',
      instructor: 'Sarah Jenkins (DGE Quality Lead)',
      date: '29 Oct 2027 · 10:00 - 12:30 GST',
      location: 'Virtual Classroom (MS Teams)',
      seats: 12,
      totalSeats: 50,
      track: 'Data Stewards',
    },
    {
      id: 'SES-103',
      title: 'Waterfront 3D BIM & IFC Ingestion for Digital Twin',
      instructor: 'Eng. Khalid Al-Zaabi (DMT Spatial)',
      date: '04 Nov 2027 · 09:30 - 14:00 GST',
      location: 'DMT Innovation Centre, Abu Dhabi',
      seats: 6,
      totalSeats: 20,
      track: 'Digital Twin 3D',
    },
    {
      id: 'SES-104',
      title: 'Spatial SQL & Advanced Spatial Indexing with PostGIS',
      instructor: 'Elena Rostova (Senior Database Architect)',
      date: '10 Nov 2027 · 13:00 - 16:30 GST',
      location: 'Virtual Classroom (MS Teams)',
      seats: 19,
      totalSeats: 40,
      track: 'GIS Analysts',
    },
  ];

  const certifications = [
    {
      id: 'AD-GIS-2027-041',
      name: 'Fatima Al-Kaabi',
      entity: 'DMT · Abu Dhabi',
      track: 'Train-the-Trainer (Champion)',
      date: 'Aug 2027',
      status: 'Active · Certified',
      badge: 'Gold Sovereign',
    },
    {
      id: 'AD-GIS-2027-088',
      name: 'Rashid Al-Nuaimi',
      entity: 'EAD · Environment Agency',
      track: 'GeoAI & Spatial Data Science',
      date: 'Sep 2027',
      status: 'Active · Certified',
      badge: 'Specialist',
    },
    {
      id: 'AD-GIS-2027-112',
      name: 'Dr. Aisha Al-Suwaidi',
      entity: 'DoH · Department of Health',
      track: 'Executives & Decision-Makers',
      date: 'Jul 2027',
      status: 'Active · Certified',
      badge: 'Executive',
    },
    {
      id: 'AD-GIS-2027-154',
      name: 'Sultan Al-Marzooqi',
      entity: 'ITC · Integrated Transport',
      track: 'Developers & Integrators',
      date: 'Sep 2027',
      status: 'Active · Certified',
      badge: 'Developer',
    },
  ];

  const handleEnrolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPathway) {
      showToast(`Enrolled ${enrolName} in ${selectedPathway.name} (Cohort: ${selectedPathway.nextCohort})`);
      setSelectedPathway(null);
    }
  };

  return (
    <div className="w-full h-screen bg-canvas flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-navy-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-amber-500 flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-[13px] font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 1. Workspace Top Bar */}
      <HeaderWorkspace currentScreen="S12_GeoMaturityTraining" onNavigate={onNavigate} />

      <div className="flex-1 flex overflow-hidden">
        {/* 2. Left Sidebar (GeoMaturity Active) */}
        <SidebarWorkspace currentScreen="S12_GeoMaturityTraining" onNavigate={onNavigate} />

        {/* 3. Main Content Area */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-canvas">
          {/* Page Header */}
          <div className="px-8 pt-4 pb-2 bg-white border-b border-border flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-[24px] font-bold text-navy-900 tracking-tight">
                  GeoMaturity & Training
                </h1>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                  Module D · Capacity Uplift
                </span>
              </div>
              <p className="text-[13px] text-secondaryText">
                Capability uplift across government, measured from the 2026 baseline.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-canvas p-1 rounded-lg border border-border text-[12px]">
                {(['Overview', 'Pathways', 'Sessions', 'Certifications'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                      activeTab === t
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-secondaryText hover:text-navy-900'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Entity Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowEntityDropdown(!showEntityDropdown)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-white text-[12px] font-medium text-primaryText hover:border-steel-400 transition-colors"
                >
                  <span>{selectedEntity}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-steel-400" />
                </button>
                {showEntityDropdown && (
                  <div className="absolute right-0 mt-1 w-64 bg-white border border-border rounded-xl shadow-xl z-30 py-1">
                    {entitiesList.map((ent) => (
                      <button
                        key={ent}
                        onClick={() => {
                          setSelectedEntity(ent);
                          setShowEntityDropdown(false);
                          showToast(`Filtered GeoMaturity metrics for: ${ent}`);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-[12px] hover:bg-canvas flex items-center justify-between ${
                          selectedEntity === ent ? 'font-bold text-blue-600 bg-blue-50/50' : 'text-primaryText'
                        }`}
                      >
                        <span>{ent}</span>
                        {selectedEntity === ent && <Check className="w-3.5 h-3.5 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Row 1: KPI Row (5 cards) */}
          <div className="px-8 pt-4 grid grid-cols-5 gap-4">
            {kpis.map((kpi, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-border shadow-level-1 p-3.5 flex flex-col justify-between"
              >
                <div className="text-[11px] font-semibold text-secondaryText uppercase tracking-wider">
                  {kpi.label}
                </div>
                <div className="text-[28px] font-bold text-navy-900 font-mono tabular-nums tracking-tight">
                  {kpi.val}
                </div>
                <div className="text-[11px] text-steel-500 font-medium">{kpi.sub}</div>
              </div>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'Overview' && (
            <>
              {/* Row 2: Radar Chart (5 cols) + Horizontal Bar Chart (7 cols) */}
              <div className="px-8 pt-4 grid grid-cols-12 gap-6">
                {/* Radar Chart (5 cols) */}
                <div className="col-span-5 bg-white rounded-xl border border-border shadow-level-1 p-4 flex flex-col justify-between relative">
                  <div className="flex items-center justify-between pb-1 border-b border-border">
                    <span className="text-[13px] font-bold text-navy-900 uppercase tracking-wider">
                      GeoMaturity 5-Pillar Radar
                    </span>
                    <div className="flex items-center gap-3 text-[11px]">
                      <div className="flex items-center gap-1">
                        <span className="w-3 h-0.5 border-b border-dashed border-steel-400"></span>
                        <span className="text-secondaryText">Baseline 2026</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-3 h-2 rounded-sm bg-[#E07B24]"></span>
                        <span className="text-[#E07B24] font-bold">Current 2027</span>
                      </div>
                    </div>
                  </div>

                  {/* Radar SVG */}
                  <div className="relative h-[210px] w-full flex items-center justify-center">
                    <svg viewBox="0 0 280 210" className="w-full h-full overflow-visible">
                      {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, i) => (
                        <polygon
                          key={i}
                          points="140,25 235,90 200,195 80,195 45,90"
                          transform={`translate(${140 * (1 - scale)}, ${110 * (1 - scale)}) scale(${scale})`}
                          fill="none"
                          stroke="#E2E8F0"
                          strokeWidth="1"
                        />
                      ))}

                      {/* 5 Axis Labels with click interaction */}
                      <text
                        x="140"
                        y="18"
                        fill={selectedPillar === 'Governance' ? '#E07B24' : '#14213D'}
                        fontSize="11"
                        fontWeight="bold"
                        textAnchor="middle"
                        className="cursor-pointer hover:underline"
                        onClick={() => setSelectedPillar('Governance')}
                      >
                        Governance (3.1)
                      </text>
                      <text
                        x="245"
                        y="94"
                        fill={selectedPillar === 'Data' ? '#E07B24' : '#14213D'}
                        fontSize="11"
                        fontWeight="bold"
                        className="cursor-pointer hover:underline"
                        onClick={() => setSelectedPillar('Data')}
                      >
                        Data (2.8)
                      </text>
                      <text
                        x="205"
                        y="208"
                        fill={selectedPillar === 'Technology' ? '#E07B24' : '#14213D'}
                        fontSize="11"
                        fontWeight="bold"
                        className="cursor-pointer hover:underline"
                        onClick={() => setSelectedPillar('Technology')}
                      >
                        Technology (3.2)
                      </text>
                      <text
                        x="75"
                        y="208"
                        fill={selectedPillar === 'People' ? '#E07B24' : '#14213D'}
                        fontSize="11"
                        fontWeight="bold"
                        textAnchor="end"
                        className="cursor-pointer hover:underline"
                        onClick={() => setSelectedPillar('People')}
                      >
                        People (2.6)
                      </text>
                      <text
                        x="35"
                        y="94"
                        fill={selectedPillar === 'Use' ? '#E07B24' : '#14213D'}
                        fontSize="11"
                        fontWeight="bold"
                        textAnchor="end"
                        className="cursor-pointer hover:underline"
                        onClick={() => setSelectedPillar('Use')}
                      >
                        Use (2.9)
                      </text>

                      {/* Shape 1: Baseline 2026 */}
                      <polygon
                        points="140,70 190,105 170,160 110,160 90,105"
                        fill="none"
                        stroke="#94A3B8"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />

                      {/* Shape 2: Current 2027 */}
                      <polygon
                        points="140,50 215,92 185,175 95,175 75,92"
                        fill="rgba(224, 123, 36, 0.22)"
                        stroke="#E07B24"
                        strokeWidth="2.5"
                      />

                      {/* Tooltip on Data Pillar */}
                      {radarTooltip && (
                        <g transform="translate(215, 78)">
                          <circle cx="0" cy="14" r="4" fill="#E07B24" stroke="#FFFFFF" strokeWidth="1.5" />
                          <rect x="-45" y="-12" width="90" height="22" rx="4" fill="#0B2545" />
                          <text x="0" y="2" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
                            Data · 2.1 → 2.8
                          </text>
                        </g>
                      )}
                    </svg>
                  </div>
                </div>

                {/* Horizontal Bar Chart (7 cols) */}
                <div className="col-span-7 bg-white rounded-xl border border-border shadow-level-1 p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-1 border-b border-border">
                    <span className="text-[13px] font-bold text-navy-900 uppercase tracking-wider">
                      GeoMaturity Score by Sector (Out of 5.0)
                    </span>
                    <span className="text-[11px] text-secondaryText">Grey ticks = 2026 Baseline</span>
                  </div>

                  <div className="space-y-3 py-2">
                    {sectorScores.map((sec, si) => (
                      <div key={si} className="space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-primaryText">{sec.name}</span>
                          <div className="font-mono text-[11px]">
                            <span className="text-secondaryText mr-2">Base: {sec.baseline}</span>
                            <strong className="text-[#E07B24] font-bold">{sec.current} / 5.0</strong>
                          </div>
                        </div>

                        <div className="relative w-full h-3.5 bg-canvas rounded-full overflow-hidden border border-border/80">
                          <div
                            className="h-full bg-[#E07B24] rounded-full transition-all"
                            style={{ width: `${(sec.current / 5) * 100}%` }}
                          />
                          <div
                            className="absolute top-0 bottom-0 w-[2px] bg-navy-900 z-10"
                            style={{ left: `${(sec.baseline / 5) * 100}%` }}
                            title={`Baseline: ${sec.baseline}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-border text-[10px] text-steel-500 font-mono">
                    <span>0.0 Initial</span>
                    <span>2.0 Managed</span>
                    <span>3.0 Defined</span>
                    <span>4.0 Measured</span>
                    <span>5.0 Optimizing</span>
                  </div>
                </div>
              </div>

              {/* Row 3: Learning Pathways (8 cols) + Training Effectiveness (4 cols) */}
              <div className="px-8 py-3 grid grid-cols-12 gap-6">
                {/* Learning Pathways Grid */}
                <div className="col-span-8 bg-white rounded-xl border border-border shadow-level-1 p-3.5 flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-[12px] font-bold text-navy-900 uppercase tracking-wider">
                      Government Learning Pathways (8 Tracks) · Click to enrol
                    </span>
                    <button
                      onClick={() => setActiveTab('Pathways')}
                      className="text-[11px] text-blue-600 font-semibold hover:underline"
                    >
                      View All Pathways ({pathways.length}) →
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-[11px]">
                    {pathways.map((pw, pi) => {
                      const Icon = pw.icon;

                      return (
                        <div
                          key={pi}
                          onClick={() => setSelectedPathway(pw)}
                          className={`p-2 rounded-lg border transition-all cursor-pointer ${
                            pw.goldBorder
                              ? 'border-2 border-gold-500 bg-amber-50/40 shadow-sm hover:bg-amber-50'
                              : 'border-border bg-canvas/60 hover:bg-canvas hover:border-steel-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <Icon className={`w-3.5 h-3.5 ${pw.goldBorder ? 'text-gold-600' : 'text-[#E07B24]'}`} />
                            <span className="font-bold text-navy-900 truncate">{pw.name}</span>
                          </div>
                          <div className="flex justify-between text-[10px] text-secondaryText font-mono">
                            <span>{pw.enrolments} learners</span>
                            <strong className="text-emerald-700">{pw.comp}%</strong>
                          </div>
                          <div className="w-full h-1 bg-border rounded-full mt-1 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${pw.goldBorder ? 'bg-gold-500' : 'bg-[#E07B24]'}`}
                              style={{ width: `${pw.comp}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Training Effectiveness 2 × 2 Stat Tiles */}
                <div className="col-span-4 bg-white rounded-xl border border-border shadow-level-1 p-3.5 flex flex-col justify-between">
                  <div className="text-[12px] font-bold text-navy-900 uppercase tracking-wider pb-1 border-b border-border">
                    Training Impact & ROI
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] my-auto">
                    <div className="p-2.5 rounded-lg bg-orange-50/60 border border-orange-200">
                      <div className="text-[10px] text-secondaryText uppercase">Satisfaction</div>
                      <div className="text-[20px] font-bold text-[#E07B24] font-mono leading-tight">
                        4.6 / 5
                      </div>
                      <div className="text-[9px] text-emerald-700 font-semibold">Post-session NPS</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200">
                      <div className="text-[10px] text-secondaryText uppercase">Competence Gain</div>
                      <div className="text-[20px] font-bold text-emerald-700 font-mono leading-tight">
                        +28%
                      </div>
                      <div className="text-[9px] text-emerald-800 font-semibold">Pre/Post test score</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-200">
                      <div className="text-[10px] text-secondaryText uppercase">Applied on Job</div>
                      <div className="text-[20px] font-bold text-blue-700 font-mono leading-tight">
                        71%
                      </div>
                      <div className="text-[9px] text-blue-900 font-semibold">Active in workflows</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-purple-50/60 border border-purple-200">
                      <div className="text-[10px] text-secondaryText uppercase">Maturity Uplift</div>
                      <div className="text-[20px] font-bold text-purple-700 font-mono leading-tight">
                        +0.6
                      </div>
                      <div className="text-[9px] text-purple-900 font-semibold">2026 vs 2027 index</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: PATHWAYS EXPANDED */}
          {activeTab === 'Pathways' && (
            <div className="px-8 py-4 flex-1 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[18px] font-bold text-navy-900">
                    Government Geospatial Learning Curriculum
                  </h2>
                  <p className="text-[12px] text-secondaryText">
                    Accredited sovereign training pathways designed for all tiers of Abu Dhabi public sector personnel.
                  </p>
                </div>
                <button
                  onClick={() => showToast('Exported complete LMS syllabus and course guide (PDF)')}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Curriculum PDF</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {pathways.map((pw, i) => {
                  const Icon = pw.icon;
                  return (
                    <div
                      key={i}
                      className={`p-4 rounded-xl border bg-white shadow-level-1 flex flex-col justify-between ${
                        pw.goldBorder ? 'border-2 border-gold-500 bg-amber-50/20' : 'border-border'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                                pw.goldBorder ? 'bg-gold-500/20 text-gold-700' : 'bg-orange-100 text-[#E07B24]'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-bold text-navy-900 text-[14px]">{pw.name}</h3>
                              <span className="text-[10px] font-mono text-steel-500">
                                {pw.level} · {pw.hours} Training Hours
                              </span>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {pw.comp}% Completion
                          </span>
                        </div>

                        <p className="text-[12px] text-secondaryText leading-relaxed">{pw.desc}</p>

                        <div className="space-y-1 pt-1">
                          <span className="text-[11px] font-bold text-navy-900">Key Modules:</span>
                          <ul className="text-[11px] text-steel-600 space-y-0.5">
                            {pw.syllabus.map((s, si) => (
                              <li key={si} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#E07B24]" />
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-3 mt-3 border-t border-border flex items-center justify-between">
                        <div className="text-[11px] text-secondaryText font-mono">
                          Next Cohort: <strong>{pw.nextCohort}</strong>
                        </div>
                        <button
                          onClick={() => setSelectedPathway(pw)}
                          className="px-4 py-1.5 rounded-lg bg-[#E07B24] hover:bg-[#C9681A] text-white text-[12px] font-bold shadow-sm transition-colors"
                        >
                          Enrol Cohort
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: SESSIONS */}
          {activeTab === 'Sessions' && (
            <div className="px-8 py-4 flex-1 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[18px] font-bold text-navy-900">
                    Live Instructor-Led Sessions & Labs
                  </h2>
                  <p className="text-[12px] text-secondaryText">
                    Hands-on laboratory sessions conducted at Al Maqtaa Training Lab and online via Microsoft Teams.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                    4 Upcoming Workshops
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {sessions.map((ses) => (
                  <div
                    key={ses.id}
                    className="p-4 rounded-xl border border-border bg-white shadow-level-1 flex items-center justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800">
                          {ses.id}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                          {ses.track}
                        </span>
                      </div>
                      <h3 className="font-bold text-navy-900 text-[15px]">{ses.title}</h3>
                      <div className="flex items-center gap-4 text-[12px] text-secondaryText">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-steel-400" />
                          <span>{ses.instructor}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-steel-400" />
                          <span>{ses.date}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-steel-400" />
                          <span>{ses.location}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-[13px] font-bold text-emerald-700 font-mono">
                          {ses.seats} seats remaining
                        </div>
                        <div className="text-[10px] text-steel-400">of {ses.totalSeats} total</div>
                      </div>
                      <button
                        onClick={() => showToast(`Reserved 1 seat for "${ses.title}"`)}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[12px] shadow-sm transition-colors"
                      >
                        Book Seat
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CERTIFICATIONS */}
          {activeTab === 'Certifications' && (
            <div className="px-8 py-4 flex-1 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[18px] font-bold text-navy-900">
                    Certified Abu Dhabi Geospatial Professionals (412 Active)
                  </h2>
                  <p className="text-[12px] text-secondaryText">
                    Public registry of certified spatial data practitioners and government champions.
                  </p>
                </div>
                <button
                  onClick={() => showToast('Exported complete registry of 412 certified professionals')}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Registry CSV</span>
                </button>
              </div>

              <div className="bg-white rounded-xl border border-border shadow-level-1 overflow-hidden">
                <table className="w-full text-left text-[12px]">
                  <thead className="bg-canvas border-b border-border text-[11px] text-steel-500 uppercase font-semibold">
                    <tr>
                      <th className="py-2.5 px-4">Credential ID</th>
                      <th className="py-2.5 px-4">Professional Name</th>
                      <th className="py-2.5 px-4">Government Entity</th>
                      <th className="py-2.5 px-4">Accredited Track</th>
                      <th className="py-2.5 px-4">Certification Date</th>
                      <th className="py-2.5 px-4">Status</th>
                      <th className="py-2.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {certifications.map((cert) => (
                      <tr key={cert.id} className="hover:bg-canvas transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-navy-900">{cert.id}</td>
                        <td className="py-3 px-4 font-semibold text-primaryText flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>{cert.name}</span>
                        </td>
                        <td className="py-3 px-4 text-secondaryText">{cert.entity}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                            {cert.track}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-steel-500">{cert.date}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                            {cert.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => showToast(`Downloaded digital badge and credential certificate for ${cert.name}`)}
                            className="px-2.5 py-1 rounded bg-canvas hover:bg-blue-50 text-blue-600 font-semibold text-[11px] border border-border transition-colors"
                          >
                            Digital Badge
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Micro Footer */}
          <MicroFooter />
        </div>
      </div>

      {/* Enrolment / Syllabus Modal */}
      {selectedPathway && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-[500px] bg-white rounded-2xl border border-border shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-[#E07B24]">
                  Module D · Capacity Enrolment
                </span>
                <h3 className="text-[18px] font-bold text-navy-900 mt-1">
                  {selectedPathway.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPathway(null)}
                className="w-7 h-7 rounded-lg bg-canvas hover:bg-slate-200 flex items-center justify-center text-steel-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[12px] text-secondaryText">{selectedPathway.desc}</p>

            <form onSubmit={handleEnrolSubmit} className="space-y-3 text-[12px]">
              <div>
                <label className="block font-semibold text-primaryText mb-1">
                  Candidate Full Name
                </label>
                <input
                  type="text"
                  value={enrolName}
                  onChange={(e) => setEnrolName(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-border text-[13px] text-primaryText focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-primaryText mb-1">
                  Government Entity / Department
                </label>
                <input
                  type="text"
                  value={enrolEntity}
                  onChange={(e) => setEnrolEntity(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-border text-[13px] text-primaryText focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-canvas rounded-xl text-[11px] font-mono">
                <div>
                  <span className="text-secondaryText block">Upcoming Cohort</span>
                  <span className="font-bold text-navy-900">{selectedPathway.nextCohort}</span>
                </div>
                <div>
                  <span className="text-secondaryText block">Required Hours</span>
                  <span className="font-bold text-navy-900">{selectedPathway.hours} Hours</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setSelectedPathway(null)}
                  className="px-4 py-2 rounded-xl bg-canvas hover:bg-slate-200 text-secondaryText font-semibold text-[12px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#E07B24] hover:bg-[#C9681A] text-white font-bold text-[12px] shadow-sm transition-colors"
                >
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
