import React, { useState } from 'react';
import { ScreenId } from '../types';
import { HeaderWorkspace } from '../components/common/HeaderWorkspace';
import { SidebarWorkspace } from '../components/common/SidebarWorkspace';
import { MicroFooter } from '../components/common/MicroFooter';
import { MODULES } from '../constants/tokens';
import {
  Activity,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Download,
  Clock,
  Layers,
  ChevronRight,
  ShieldAlert,
  X,
  FileSpreadsheet,
  Check,
  Info,
  Filter,
} from 'lucide-react';

interface S11Props {
  onNavigate: (screen: ScreenId) => void;
}

interface DeliverableModalData {
  id: string;
  name: string;
  module: string;
  lead: string;
  due: string;
  status: 'Accepted' | 'In Progress' | 'Scheduled' | 'Review';
  criticalPath: boolean;
  desc: string;
  reqTrace: string;
}

export const S11_ProgrammeCommandCentre: React.FC<S11Props> = ({ onNavigate }) => {
  const [hoveredMilestone, setHoveredMilestone] = useState<'M1' | 'M2' | 'M3' | 'M4' | null>('M2');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedDeliverable, setSelectedDeliverable] = useState<DeliverableModalData | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<any | null>(null);
  const [riskFilter, setRiskFilter] = useState<'ALL' | 'H' | 'M' | 'L'>('ALL');
  const [activeCadence, setActiveCadence] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const kpis = [
    { label: 'Milestone delivery', val: '92%', sub: 'Target: 90%', color: 'text-white' },
    { label: 'Gates accepted', val: '1 / 4', sub: 'M1 Approved', color: 'text-emerald-400' },
    { label: 'Deliverables on track', val: '26 / 28', sub: '2 under technical review', color: 'text-white' },
    { label: 'Open risks', val: '10', sub: '3 High · 5 Med · 2 Low', color: 'text-amber-400' },
    { label: 'Next gate', val: 'M2', sub: 'Scheduled: Dec 2027', color: 'text-gold-500' },
  ];

  const cadenceChips = [
    { name: 'Steering Committee', freq: 'Monthly', next: '28 Sep 2027', chair: 'H.E. Director General, DGE' },
    { name: 'PMO', freq: 'Weekly', next: '21 Sep 2027', chair: 'Lead Programme Director' },
    { name: 'Working Groups', freq: 'Bi-weekly', next: '24 Sep 2027', chair: 'DMT & EAD Technical Custodians' },
    { name: 'Design Authority', freq: 'Fortnightly', next: '02 Oct 2027', chair: 'Chief Enterprise Architect' },
  ];

  const lanes = [
    {
      code: 'A',
      name: 'Clearinghouse & Portal',
      color: '#1F5FAD',
      items: [
        { id: 'A01', name: 'Catalogue & Core Registry', done: true, w: 90, desc: 'Initial multi-agency metadata catalog and search federation.', reqTrace: 'SRS-REQ-001..014' },
        { id: 'A02', name: 'Clearinghouse Core Sync', current: true, w: 110, desc: 'Automated data harvesting & continuous validation gateway.', reqTrace: 'SRS-REQ-015..032' },
        { id: 'A03', name: 'OpenAPI V3 Gateway', w: 100, desc: 'OGC API Features and WFS 3.0 federated endpoints.', reqTrace: 'SRS-REQ-033..048' },
        { id: 'A04', name: 'Federated Identity SSO', w: 80, desc: 'UAE PASS multi-tenant government identity mapping.', reqTrace: 'SRS-REQ-049..060' },
      ],
    },
    {
      code: 'B',
      name: 'GeoAI Engine',
      color: '#7B4FD6',
      items: [
        { id: 'B01', name: 'Imagery Ingestion Pipeline', done: true, w: 80, desc: '0.15m orthophoto and multi-spectral pipeline.', reqTrace: 'SRS-REQ-061..072' },
        { id: 'B02', name: 'Common GeoAI Models', current: true, w: 100, desc: 'Building footprint and mangrove change detection deep learning.', reqTrace: 'SRS-REQ-073..089' },
        { id: 'B03', name: 'Automated Vectorizer', w: 90, desc: 'Automated polygon extraction into spatial warehouse.', reqTrace: 'SRS-REQ-090..102' },
      ],
    },
    {
      code: 'C',
      name: 'Marketplace',
      color: '#0E9F8E',
      items: [
        { id: 'C01', name: 'Commercial Taxonomy', done: true, w: 75, desc: 'Licensing framework and sovereign data classification.', reqTrace: 'SRS-REQ-103..115' },
        { id: 'C02', name: 'Legal DSA Agreements', current: true, w: 120, desc: 'Pre-approved bilateral data sharing agreements.', reqTrace: 'SRS-REQ-116..134' },
        { id: 'C03', name: 'Quota & Monetization Engine', w: 85, desc: 'Rate-limiting and provider cost-recovery reporting.', reqTrace: 'SRS-REQ-135..150' },
      ],
    },
    {
      code: 'D',
      name: 'Capacity Building',
      color: '#E07B24',
      items: [
        { id: 'D01', name: 'GeoMaturity Assessment', done: true, w: 110, desc: '64-entity baseline audit across 5 governance pillars.', reqTrace: 'SRS-REQ-151..164' },
        { id: 'D02', name: '64-Entity GeoMaturity', current: true, w: 95, desc: 'Targeted capacity uplift and cohort-based training.', reqTrace: 'SRS-REQ-165..180' },
        { id: 'D03', name: 'Gov Champions Certification', w: 90, desc: 'Abu Dhabi certified GIS professional credentialing.', reqTrace: 'SRS-REQ-181..195' },
      ],
    },
    {
      code: 'E',
      name: 'Digital Twin 3D',
      color: '#2BA6DE',
      items: [
        { id: 'E01', name: 'LOD2 Mesh Generation', done: true, w: 90, desc: 'Whole emirate 3D procedural building massing.', reqTrace: 'SRS-REQ-196..210' },
        { id: 'E02', name: 'Waterfront BIM Pipeline', current: true, w: 105, desc: 'High-detail IFC integration for Corniche and Saadiyat.', reqTrace: 'SRS-REQ-211..228' },
        { id: 'E03', name: '4D Temporal Simulation', w: 100, desc: 'Urban growth simulation timeline 2020-2035.', reqTrace: 'SRS-REQ-229..245' },
      ],
    },
    {
      code: 'F',
      name: 'Open Data Platform',
      color: '#5DAA3A',
      items: [
        { id: 'F01', name: 'Public Portal Launch', done: true, w: 85, desc: '640 public open datasets under sovereign license.', reqTrace: 'SRS-REQ-246..260' },
        { id: 'F02', name: 'Public API V3 Sandbox', current: true, w: 90, desc: 'Developer console, API keys, and SDK code samples.', reqTrace: 'SRS-REQ-261..275' },
        { id: 'F03', name: 'GeoHack Annual Hackathon', w: 100, desc: 'Civic tech challenge and urban AI developer community.', reqTrace: 'SRS-REQ-276..290' },
      ],
    },
    {
      code: 'P',
      name: 'Programme PMO',
      color: '#7A9CC6',
      items: [
        { id: 'P01', name: 'Baseline Schedule & WBS', done: true, w: 95, desc: 'Approved master schedule and governance charter.', reqTrace: 'PMO-CH-001' },
        { id: 'P02', name: 'M2 Stage Gate Prep', current: true, w: 110, desc: 'Gate review technical artifacts verification.', reqTrace: 'PMO-GT-002' },
        { id: 'P03', name: 'Stage Gate M3 Transition', w: 120, desc: 'Deployment to full sovereign production cloud.', reqTrace: 'PMO-GT-003' },
      ],
    },
  ];

  const moduleHealth = [
    { mod: 'A', rag: 'Green', pct: 94, deliv: 'A02 Clearinghouse Core Sync', due: 'Nov 2027' },
    { mod: 'B', rag: 'Green', pct: 88, deliv: 'B02 Common GeoAI Models', due: 'Dec 2027' },
    { mod: 'C', rag: 'Amber', pct: 79, deliv: 'C02 Legal DSA Agreements', due: 'Jan 2028' },
    { mod: 'D', rag: 'Green', pct: 95, deliv: 'D02 64-Entity GeoMaturity', due: 'Oct 2027' },
    { mod: 'E', rag: 'Green', pct: 86, deliv: 'E02 Waterfront BIM Pipeline', due: 'Dec 2027' },
    { mod: 'F', rag: 'Green', pct: 96, deliv: 'F02 Public API V3 Sandbox', due: 'Oct 2027' },
  ];

  const topRisks = [
    { id: 'R02', risk: 'Contract start later than baseline', l: 'M', i: 'H', level: 'H', owner: 'PMO', mit: 'Schedule compressed', details: 'Fast-tracked parallel sprints for Clearinghouse and GeoAI to recover 14 calendar days.' },
    { id: 'R03', risk: 'Entity data delays or quality gaps', l: 'H', i: 'H', level: 'H', owner: 'DMT/EAD', mit: 'Automated gateway', details: 'Automated quality conformance gate halts ingestion and alerts steward within 60 seconds.' },
    { id: 'R05', risk: 'Marketplace approvals delayed', l: 'M', i: 'M', level: 'M', owner: 'Legal', mit: 'Pre-approved DSA', details: 'Standardized bilateral template blessed by Abu Dhabi Government Legal Affairs.' },
    { id: 'R06', risk: 'Security review lead times', l: 'L', i: 'H', level: 'M', owner: 'Cyber', mit: 'Continuous testing', details: 'DevSecOps integrated SAST/DAST testing before formal sovereign accreditation.' },
    { id: 'R08', risk: 'Twin source BIM data gaps', l: 'M', i: 'M', level: 'L', owner: 'DMT', mit: 'LOD2 fallback', details: 'Automated procedural generation handles missing private asset architectural models.' },
  ];

  const filteredRisks = riskFilter === 'ALL' ? topRisks : topRisks.filter((r) => r.level === riskFilter);

  // Export Gate Review Pack
  const handleExportGateReviewPack = () => {
    const data = {
      programme: 'AD-SDI Implementation Programme 2026-2029',
      exportDate: new Date().toISOString(),
      gate: 'M2 - Core Platforms Deployment',
      status: 'Ready for Technical Sign-Off',
      kpis: kpis,
      deliverablesCompleted: 26,
      deliverablesInReview: 2,
      criticalPathItems: ['A02', 'C02', 'E02', 'P02'],
      openRisksCount: topRisks.length,
      topRisks: topRisks,
      leadEntities: ['DGE', 'DMT', 'EAD', 'DoH', 'ITC'],
      complianceSummary: {
        srsTraceability: '94.2%',
        iso19157QualityScore: '96.8%',
        securityAccreditation: 'Conditional Green',
      },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AD-SDI-Gate-M2-Review-Pack-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded Gate Review Pack (M2 Core Platforms Deploy)');
  };

  // Export Monthly Report CSV
  const handleExportMonthlyReport = () => {
    const csvHeader = 'Module Code,Module Name,Deliverable,Due Date,Health Status,Completion %\n';
    const csvRows = moduleHealth
      .map((m) => {
        const lane = lanes.find((l) => l.code === m.mod);
        return `"${m.mod}","${lane ? lane.name : ''}","${m.deliv}","${m.due}","${m.rag}","${m.pct}%"`;
      })
      .join('\n');

    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AD-SDI-Monthly-Executive-Report-${new Date().toISOString().slice(0, 7)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported Monthly Programme Report (September 2027 CSV)');
  };

  const handleDeliverableClick = (laneCode: string, laneName: string, item: any) => {
    setSelectedDeliverable({
      id: item.id,
      name: item.name || item.id,
      module: `${laneCode} · ${laneName}`,
      lead: laneCode === 'A' || laneCode === 'E' ? 'DMT / DGE' : laneCode === 'B' ? 'GeoAI Lab' : laneCode === 'D' ? 'Capacity PMO' : 'Legal & Ops',
      due: item.done ? 'Completed' : item.current ? 'Q4 2027 (On Track)' : '2028',
      status: item.done ? 'Accepted' : item.current ? 'In Progress' : 'Scheduled',
      criticalPath: item.id === 'A02' || item.id === 'C02' || item.id === 'P02',
      desc: item.desc || 'Government spatial infrastructure technical workstream deliverable.',
      reqTrace: item.reqTrace || 'SRS-REQ-CORE',
    });
  };

  const handleMilestoneClick = (m: 'M1' | 'M2' | 'M3' | 'M4') => {
    const names = {
      M1: 'M1 · Foundation & Architecture Approval',
      M2: 'M2 · Core Platforms Deployed (Gate Review Dec 2027)',
      M3: 'M3 · Multi-Agency Production Rollout (2028)',
      M4: 'M4 · Full Sovereign Operations & Handover (2029)',
    };
    setSelectedDeliverable({
      id: m,
      name: names[m],
      module: 'Programme Governance & Stage Gates',
      lead: 'Abu Dhabi Digital Authority & Steering Committee',
      due: m === 'M1' ? 'Q1 2027 (Accepted ✓)' : m === 'M2' ? 'Dec 2027' : m === 'M3' ? 'Q4 2028' : 'Q4 2029',
      status: m === 'M1' ? 'Accepted' : m === 'M2' ? 'In Progress' : 'Scheduled',
      criticalPath: true,
      desc: 'Critical governance milestone determining operational progression and funding allocation.',
      reqTrace: `GATE-${m}-VERIFICATION-PACK`,
    });
  };

  return (
    <div className="w-full h-screen bg-canvas text-primaryText flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-navy-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-gold-500/50 flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-[13px] font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 1. Unified Enterprise Top Bar */}
      <HeaderWorkspace currentScreen="S11_ProgrammeCommandCentre" onNavigate={onNavigate} />

      <div className="flex-1 flex overflow-hidden">
        {/* 2. Workspace Sidebar (Light variant) */}
        <SidebarWorkspace
          currentScreen="S11_ProgrammeCommandCentre"
          onNavigate={onNavigate}
          isDarkTheme={false}
        />

        {/* 3. Main Operational Command Dashboard */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-canvas">
          {/* Header */}
          <div className="px-8 pt-4 pb-2 bg-white border-b border-border shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-[22px] font-bold text-navy-900 tracking-tight">
                    AD-SDI Implementation Programme 2026–2029
                  </h1>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    On track
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-secondaryText border border-border">
                    Baseline schedule
                  </span>
                  <span className="text-[11px] font-mono text-secondaryText">
                    Updated 14 Sep 2027, 09:30 GST
                  </span>
                </div>

                {/* Cadence chips */}
                <div className="flex items-center gap-2 pt-1.5">
                  {cadenceChips.map((c, ci) => (
                    <button
                      key={ci}
                      onClick={() => setActiveCadence(c.name)}
                      className={`px-2.5 py-0.5 rounded-full text-[11px] border transition-all flex items-center gap-1.5 cursor-pointer ${
                        activeCadence === c.name
                          ? 'bg-gold-500/15 border-gold-500 text-gold-700 font-bold'
                          : 'bg-slate-50 border-border text-secondaryText hover:bg-slate-100'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                      <span>{c.name}:</span>
                      <strong className="text-navy-900 font-mono">{c.freq}</strong>
                    </button>
                  ))}
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleExportGateReviewPack}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-navy-900 text-[12px] font-medium border border-border flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-steel-500" />
                  <span>Gate review pack</span>
                </button>
                <button
                  onClick={handleExportMonthlyReport}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Monthly report</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Cadence Modal/Pill if selected */}
          {activeCadence && (
            <div className="mx-8 mt-2 p-2 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-between text-[11px] text-navy-900">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                <span>
                  <strong>{activeCadence}:</strong> Next session:{' '}
                  {cadenceChips.find((c) => c.name === activeCadence)?.next} · Chair:{' '}
                  {cadenceChips.find((c) => c.name === activeCadence)?.chair}
                </span>
              </div>
              <button
                onClick={() => setActiveCadence(null)}
                className="text-secondaryText hover:text-navy-900 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Row 1: KPI Cards (5 cards) */}
          <div className="px-8 pt-3 grid grid-cols-5 gap-3.5">
            {kpis.map((kpi, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-border p-3.5 flex flex-col justify-between shadow-level-1 hover:border-blue-300 transition-colors"
              >
                <div className="text-[11px] font-semibold text-secondaryText uppercase tracking-wider">
                  {kpi.label}
                </div>
                <div className={`text-[26px] font-bold font-mono tabular-nums tracking-tight ${kpi.color.replace('text-white', 'text-navy-900')}`}>
                  {kpi.val}
                </div>
                <div className="text-[10px] text-secondaryText font-medium">{kpi.sub}</div>
              </div>
            ))}
          </div>

          {/* Row 2: Programme Multi-Lane Gantt Roadmap (260 px tall per spec) */}
          <div className="px-8 pt-3">
            <div className="h-[250px] bg-white rounded-xl border border-border shadow-level-1 p-3.5 flex flex-col justify-between relative overflow-hidden">
              {/* Roadmap Header & Time Axis */}
              <div className="flex items-center justify-between text-[11px] pb-1 border-b border-border">
                <span className="font-bold text-navy-900 uppercase tracking-wider">
                  Master Programme Roadmap (2026–2029) · Click any deliverable to inspect
                </span>
                {/* Quarters axis */}
                <div className="flex items-center gap-8 font-mono text-[10px] text-secondaryText">
                  <span>Phase 1 (Q3 26 – Q1 27)</span>
                  <span className="text-blue-600 font-bold">Phase 2: Core Platform (Q2 27 – Q4 27)</span>
                  <span>Phase 3: Rollout (2028)</span>
                  <span>Phase 4: Full Sovereign Ops (2029)</span>
                </div>
              </div>

              {/* 7 Lanes Roadmap SVG with Critical Path & Today Line */}
              <div className="relative flex-1 py-1">
                <svg viewBox="0 0 1060 170" className="w-full h-full overflow-visible">
                  {/* Phase background bands */}
                  <rect x="180" y="0" width="220" height="170" fill="#F8FAFC" />
                  <rect x="400" y="0" width="240" height="170" fill="#EFF6FF" />
                  <rect x="640" y="0" width="220" height="170" fill="#F8FAFC" />
                  <rect x="860" y="0" width="200" height="170" fill="#F1F5F9" />

                  {/* Vertical Today Line at Sep 2027 (x=510) per spec */}
                  <line x1="510" y1="0" x2="510" y2="170" stroke="#D97706" strokeWidth="2" />
                  <polygon points="505,0 515,0 510,7" fill="#D97706" />
                  <text
                    x="510"
                    y="166"
                    fill="#D97706"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    TODAY (Sep 2027)
                  </text>

                  {/* 7 Lanes */}
                  {lanes.map((lane, li) => {
                    const y = li * 22 + 8;

                    return (
                      <g key={lane.code}>
                        {/* Lane Label */}
                        <text x="10" y={y + 11} fill="#475569" fontSize="10" fontWeight="600">
                          {lane.code} · {lane.name.split(' ')[0]}
                        </text>

                        {/* Deliverables Bars */}
                        {lane.items.map((it, ii) => {
                          const bx = 190 + ii * 115;
                          const bw = it.w;

                          return (
                            <g
                              key={it.id}
                              onClick={() => handleDeliverableClick(lane.code, lane.name, it)}
                              className="cursor-pointer group"
                            >
                              <rect
                                x={bx}
                                y={y}
                                width={bw}
                                height="15"
                                rx="3"
                                fill={it.done ? lane.color : it.current ? `${lane.color}ee` : '#E2E8F0'}
                                stroke={it.current ? '#D97706' : 'rgba(0,0,0,0.06)'}
                                strokeWidth={it.current ? '1.5' : '1'}
                                className="group-hover:brightness-105 transition-all"
                              />
                              <text
                                x={bx + bw / 2}
                                y={y + 11}
                                fill={it.done || it.current ? '#FFFFFF' : '#475569'}
                                fontSize="9"
                                fontWeight="bold"
                                textAnchor="middle"
                                fontFamily="monospace"
                              >
                                {it.id} {it.done ? '✓' : ''}
                              </text>
                            </g>
                          );
                        })}
                      </g>
                    );
                  })}

                  {/* Milestone Diamonds (M1, M2, M3, M4) */}
                  {/* M1 Accepted */}
                  <g
                    onClick={() => handleMilestoneClick('M1')}
                    onMouseEnter={() => setHoveredMilestone('M1')}
                    className="cursor-pointer"
                  >
                    <polygon
                      points="380,5 390,15 380,25 370,15"
                      fill="#1E9E6A"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                    <text x="380" y="18" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">
                      ✓
                    </text>
                  </g>

                  {/* M2 Active Gate */}
                  <g
                    onClick={() => handleMilestoneClick('M2')}
                    onMouseEnter={() => setHoveredMilestone('M2')}
                    className="cursor-pointer"
                  >
                    <polygon
                      points="590,5 600,15 590,25 580,15"
                      fill="#1F5FAD"
                      stroke="#FFC20E"
                      strokeWidth="2.5"
                    />
                    <text x="590" y="18" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">
                      M2
                    </text>
                  </g>

                  {/* M3 & M4 */}
                  <g
                    onClick={() => handleMilestoneClick('M3')}
                    onMouseEnter={() => setHoveredMilestone('M3')}
                    className="cursor-pointer"
                  >
                    <polygon
                      points="840,5 850,15 840,25 830,15"
                      fill="#F1F5F9"
                      stroke="#94A3B8"
                      strokeWidth="1.5"
                    />
                    <text x="840" y="18" fill="#64748B" fontSize="7" fontWeight="bold" textAnchor="middle">
                      M3
                    </text>
                  </g>

                  <g
                    onClick={() => handleMilestoneClick('M4')}
                    onMouseEnter={() => setHoveredMilestone('M4')}
                    className="cursor-pointer"
                  >
                    <polygon
                      points="1030,5 1040,15 1030,25 1020,15"
                      fill="#F1F5F9"
                      stroke="#94A3B8"
                      strokeWidth="1.5"
                    />
                    <text x="1030" y="18" fill="#64748B" fontSize="7" fontWeight="bold" textAnchor="middle">
                      M4
                    </text>
                  </g>

                  {/* 2px Gold Critical Path Outline */}
                  <path
                    d="M 390 35 L 430 35 L 440 60 L 520 60 L 580 15"
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />

                  {/* Active Tooltip */}
                  {hoveredMilestone === 'M2' && (
                    <g transform="translate(590, 32)">
                      <rect
                        x="-120"
                        y="0"
                        width="240"
                        height="24"
                        rx="4"
                        fill="#0B2545"
                        stroke="#FFC20E"
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="16"
                        fill="#FFFFFF"
                        fontSize="9.5"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        M2 · Core platforms deployed · Gate review Dec 2027
                      </text>
                    </g>
                  )}
                  {hoveredMilestone === 'M1' && (
                    <g transform="translate(380, 32)">
                      <rect x="-85" y="0" width="170" height="24" rx="4" fill="#0B2545" stroke="#1E9E6A" strokeWidth="1" />
                      <text x="0" y="16" fill="#1E9E6A" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                        M1 · Architecture Accepted ✓
                      </text>
                    </g>
                  )}
                </svg>
              </div>
            </div>
          </div>

          {/* Row 3: Module Health (4 cols) | Top Risks (5 cols) | Deliverables Stack (3 cols) */}
          <div className="px-8 py-3 grid grid-cols-12 gap-3.5">
            {/* Left: Module Health (4 cols) */}
            <div className="col-span-4 bg-white rounded-xl border border-border p-3.5 flex flex-col justify-between shadow-level-1">
              <div className="flex items-center justify-between pb-1.5 border-b border-border">
                <span className="text-[12px] font-bold text-navy-900 uppercase tracking-wider">
                  Module Delivery Health
                </span>
                <span className="text-[10px] font-mono text-emerald-700 font-semibold">5 Green · 1 Amber</span>
              </div>

              <div className="space-y-1.5">
                {moduleHealth.map((mh) => (
                  <div
                    key={mh.mod}
                    onClick={() => {
                      const lane = lanes.find((l) => l.code === mh.mod);
                      if (lane) {
                        const it = lane.items[1] || lane.items[0];
                        handleDeliverableClick(lane.code, lane.name, it);
                      }
                    }}
                    className="flex items-center justify-between text-[11px] p-1.5 rounded hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center text-white"
                        style={{ backgroundColor: MODULES[mh.mod as keyof typeof MODULES]?.color || '#1F5FAD' }}
                      >
                        {mh.mod}
                      </span>
                      <span className="text-navy-900 font-medium truncate max-w-[130px]">{mh.deliv}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-secondaryText text-[10px]">{mh.due}</span>
                      <span
                        className={`w-2 h-2 rounded-full ${mh.rag === 'Green' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Centre: Top Risks Table (5 cols) */}
            <div className="col-span-5 bg-white rounded-xl border border-border p-3.5 flex flex-col justify-between shadow-level-1">
              <div className="flex items-center justify-between pb-1.5 border-b border-border">
                <div className="flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-[12px] font-bold text-navy-900 uppercase tracking-wider">
                    Top Programme Risks
                  </span>
                </div>
                {/* Risk Filter Buttons */}
                <div className="flex items-center gap-1">
                  {(['ALL', 'H', 'M', 'L'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setRiskFilter(lvl)}
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all cursor-pointer ${
                        riskFilter === lvl
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-secondaryText hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className="border-b border-border text-[9px] text-secondaryText uppercase tracking-wider">
                    <th className="py-1">ID</th>
                    <th className="py-1">Risk Description</th>
                    <th className="py-1">L/I</th>
                    <th className="py-1">Owner</th>
                    <th className="py-1 text-right">Mitigation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredRisks.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => setSelectedRisk(r)}
                      className="hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <td className="py-1.5 font-mono text-amber-600 font-bold">{r.id}</td>
                      <td className="py-1.5 text-navy-900 truncate max-w-[140px] font-medium">{r.risk}</td>
                      <td className="py-1.5 font-mono text-secondaryText">
                        {r.l}/{r.i}
                      </td>
                      <td className="py-1.5 text-secondaryText">{r.owner}</td>
                      <td className="py-1.5 text-right">
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                          {r.mit}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right: Deliverables Acceptance & Design Conformance (3 cols) */}
            <div className="col-span-3 space-y-3">
              {/* Card 1: Deliverable Acceptance */}
              <div
                onClick={() =>
                  showToast('Deliverables Acceptance: 38 Accepted, 9 In Review, 4 Conditional, 1 Rejected')
                }
                className="bg-white rounded-xl border border-border p-3 space-y-1.5 shadow-level-1 cursor-pointer hover:border-blue-300 transition-colors"
              >
                <div className="flex justify-between text-[11px] font-bold text-navy-900">
                  <span>Deliverables Acceptance</span>
                  <span className="font-mono text-emerald-700">38 Accepted</span>
                </div>

                {/* Stacked bar */}
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-500" style={{ width: '73%' }} title="Accepted: 38" />
                  <div className="h-full bg-blue-500" style={{ width: '17%' }} title="In review: 9" />
                  <div className="h-full bg-amber-500" style={{ width: '8%' }} title="Conditional: 4" />
                  <div className="h-full bg-rose-500" style={{ width: '2%' }} title="Rejected: 1" />
                </div>

                <div className="flex justify-between text-[9px] text-secondaryText font-mono">
                  <span>Acc 38</span>
                  <span>Rev 9</span>
                  <span>Cond 4</span>
                  <span>Rej 1</span>
                </div>
                <div className="text-[9px] text-secondaryText italic">Click to inspect breakdown</div>
              </div>

              {/* Card 2: Design Conformance */}
              <div
                onClick={() =>
                  showToast('SRS Conformance: 148 Traced (61 Verified, 84 In dev, 3 Deviations approved)')
                }
                className="bg-white rounded-xl border border-border p-3 space-y-1.5 shadow-level-1 cursor-pointer hover:border-blue-300 transition-colors"
              >
                <div className="flex justify-between text-[11px] font-bold text-navy-900">
                  <span>SRS Conformance</span>
                  <span className="font-mono text-blue-600">148 Traced</span>
                </div>

                {/* Segmented bar */}
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="h-full bg-blue-600" style={{ width: '42%' }} title="Verified: 61" />
                  <div className="h-full bg-slate-300" style={{ width: '56%' }} title="In development: 84" />
                  <div className="h-full bg-amber-500" style={{ width: '2%' }} title="Deviations: 3" />
                </div>

                <div className="text-[10px] text-secondaryText flex justify-between font-mono">
                  <span>61 Verified</span>
                  <span>3 Deviations Proposed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Micro Footer */}
          <MicroFooter isDarkTheme={false} />
        </div>
      </div>

      {/* Deliverable / Milestone Detail Modal */}
      {selectedDeliverable && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-[520px] bg-white border border-border rounded-2xl p-6 shadow-2xl space-y-4 text-navy-900">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    {selectedDeliverable.id}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      selectedDeliverable.status === 'Accepted'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : selectedDeliverable.status === 'In Progress'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-100 text-secondaryText border border-border'
                    }`}
                  >
                    {selectedDeliverable.status}
                  </span>
                  {selectedDeliverable.criticalPath && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gold-500/15 text-gold-700 border border-gold-500/30">
                      Critical Path
                    </span>
                  )}
                </div>
                <h3 className="text-[17px] font-bold text-navy-900 mt-1.5">
                  {selectedDeliverable.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDeliverable(null)}
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-secondaryText hover:text-navy-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-[13px]">
              <div>
                <span className="text-secondaryText block text-[11px] uppercase font-semibold">Workstream</span>
                <span className="font-semibold text-navy-900">{selectedDeliverable.module}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-secondaryText block text-[11px] uppercase font-semibold">Lead Custodian</span>
                  <span className="font-semibold text-navy-900">{selectedDeliverable.lead}</span>
                </div>
                <div>
                  <span className="text-secondaryText block text-[11px] uppercase font-semibold">Due Schedule</span>
                  <span className="font-semibold text-navy-900">{selectedDeliverable.due}</span>
                </div>
              </div>
              <div>
                <span className="text-secondaryText block text-[11px] uppercase font-semibold">Description</span>
                <p className="text-slate-600 text-[12px] leading-relaxed">
                  {selectedDeliverable.desc}
                </p>
              </div>
              <div>
                <span className="text-secondaryText block text-[11px] uppercase font-semibold">SRS Traceability</span>
                <code className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-[11px] font-mono">
                  {selectedDeliverable.reqTrace}
                </code>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
              <button
                onClick={() => {
                  showToast(`Downloaded technical spec for ${selectedDeliverable.id}`);
                  setSelectedDeliverable(null);
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-900 text-[12px] font-semibold flex items-center gap-1.5 transition-colors border border-border cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Technical Spec</span>
              </button>
              <button
                onClick={() => {
                  showToast(`Sign-off review request submitted for ${selectedDeliverable.id}`);
                  setSelectedDeliverable(null);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold shadow-md transition-colors cursor-pointer"
              >
                Request Sign-Off
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Risk Inspection Modal */}
      {selectedRisk && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-[480px] bg-white border border-border rounded-2xl p-6 shadow-2xl space-y-4 text-navy-900">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span className="font-mono font-bold text-gold-600">{selectedRisk.id}</span>
                <span className="text-[15px] font-bold text-navy-900">{selectedRisk.risk}</span>
              </div>
              <button
                onClick={() => setSelectedRisk(null)}
                className="text-secondaryText hover:text-navy-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-[12px]">
              <div className="grid grid-cols-3 gap-2 p-2 rounded-lg bg-slate-50 border border-border font-mono text-center">
                <div>
                  <span className="text-secondaryText text-[10px] block">Likelihood</span>
                  <span className="text-navy-900 font-bold">{selectedRisk.l}</span>
                </div>
                <div>
                  <span className="text-secondaryText text-[10px] block">Impact</span>
                  <span className="text-amber-600 font-bold">{selectedRisk.i}</span>
                </div>
                <div>
                  <span className="text-secondaryText text-[10px] block">Assigned Lead</span>
                  <span className="text-navy-900 font-bold">{selectedRisk.owner}</span>
                </div>
              </div>

              <div>
                <span className="text-secondaryText text-[10px] uppercase font-bold block">
                  Active Mitigation Plan
                </span>
                <p className="text-slate-600 mt-1">{selectedRisk.details}</p>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-border">
              <button
                onClick={() => {
                  showToast(`Risk mitigation review logged for ${selectedRisk.id}`);
                  setSelectedRisk(null);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-[12px] transition-colors cursor-pointer shadow-sm"
              >
                Update Mitigation Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
