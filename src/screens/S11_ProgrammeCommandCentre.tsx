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
} from 'lucide-react';

interface S11Props {
  onNavigate: (screen: ScreenId) => void;
}

export const S11_ProgrammeCommandCentre: React.FC<S11Props> = ({ onNavigate }) => {
  const [hoveredMilestone, setHoveredMilestone] = useState<'M1' | 'M2' | 'M3' | 'M4' | null>('M2');

  const kpis = [
    { label: 'Milestone delivery', val: '92%', sub: 'Target: 90%', color: 'text-white' },
    { label: 'Gates accepted', val: '1 / 4', sub: 'M1 Approved', color: 'text-emerald-400' },
    { label: 'Deliverables on track', val: '26 / 28', sub: '2 under technical review', color: 'text-white' },
    { label: 'Open risks', val: '10', sub: '3 High · 5 Med · 2 Low', color: 'text-amber-400' },
    { label: 'Next gate', val: 'M2', sub: 'Scheduled: Dec 2027', color: 'text-gold-500' },
  ];

  const cadenceChips = [
    { name: 'Steering Committee', freq: 'Monthly' },
    { name: 'PMO', freq: 'Weekly' },
    { name: 'Working Groups', freq: 'Bi-weekly' },
    { name: 'Design Authority', freq: 'Fortnightly' },
  ];

  const lanes = [
    { code: 'A', name: 'Clearinghouse & Portal', color: '#1F5FAD', items: [{ id: 'A01', done: true, w: 90 }, { id: 'A02', current: true, w: 110 }, { id: 'A03', w: 100 }, { id: 'A04', w: 80 }] },
    { code: 'B', name: 'GeoAI Engine', color: '#7B4FD6', items: [{ id: 'B01', done: true, w: 80 }, { id: 'B02', current: true, w: 100 }, { id: 'B03', w: 90 }] },
    { code: 'C', name: 'Marketplace', color: '#0E9F8E', items: [{ id: 'C01', done: true, w: 75 }, { id: 'C02', current: true, w: 120 }, { id: 'C03', w: 85 }] },
    { code: 'D', name: 'Capacity Building', color: '#E07B24', items: [{ id: 'D01', done: true, w: 110 }, { id: 'D02', current: true, w: 95 }, { id: 'D03', w: 90 }] },
    { code: 'E', name: 'Digital Twin 3D', color: '#2BA6DE', items: [{ id: 'E01', done: true, w: 90 }, { id: 'E02', current: true, w: 105 }, { id: 'E03', w: 100 }] },
    { code: 'F', name: 'Open Data Platform', color: '#5DAA3A', items: [{ id: 'F01', done: true, w: 85 }, { id: 'F02', current: true, w: 90 }, { id: 'F03', w: 100 }] },
    { code: 'P', name: 'Programme PMO', color: '#7A9CC6', items: [{ id: 'P01', done: true, w: 95 }, { id: 'P02', current: true, w: 110 }, { id: 'P03', w: 120 }] },
  ];

  const moduleHealth = [
    { mod: 'A', rag: 'Green', pct: 94, deliv: 'A02 Clearinghouse Core Sync', due: 'Nov 2027' },
    { mod: 'B', rag: 'Green', pct: 88, deliv: 'B02 Common GeoAI Models', due: 'Dec 2027' },
    { mod: 'C', rag: 'Amber', pct: 79, deliv: 'C02 Legal DSA Agreements', due: 'Jan 2028' }, // 1 amber max per brief
    { mod: 'D', rag: 'Green', pct: 95, deliv: 'D02 64-Entity GeoMaturity', due: 'Oct 2027' },
    { mod: 'E', rag: 'Green', pct: 86, deliv: 'E02 Waterfront BIM Pipeline', due: 'Dec 2027' },
    { mod: 'F', rag: 'Green', pct: 96, deliv: 'F02 Public API V3 Sandbox', due: 'Oct 2027' },
  ];

  const topRisks = [
    { id: 'R02', risk: 'Contract start later than baseline', l: 'M', i: 'H', owner: 'PMO', mit: 'Schedule compressed' },
    { id: 'R03', risk: 'Entity data delays or quality gaps', l: 'H', i: 'H', owner: 'DMT/EAD', mit: 'Automated gateway' },
    { id: 'R05', risk: 'Marketplace approvals delayed', l: 'M', i: 'M', owner: 'Legal', mit: 'Pre-approved DSA' },
    { id: 'R06', risk: 'Security review lead times', l: 'L', i: 'H', owner: 'Cyber', mit: 'Continuous testing' },
    { id: 'R08', risk: 'Twin source BIM data gaps', l: 'M', i: 'M', owner: 'DMT', mit: 'LOD2 fallback' },
  ];

  return (
    <div className="w-full h-screen bg-[#0A1628] text-white flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Unified Enterprise Top Bar */}
      <HeaderWorkspace currentScreen="S11_ProgrammeCommandCentre" onNavigate={onNavigate} />

      <div className="flex-1 flex overflow-hidden">
        {/* 2. Workspace Sidebar (Dark variant) */}
        <SidebarWorkspace
          currentScreen="S11_ProgrammeCommandCentre"
          onNavigate={onNavigate}
          isDarkTheme={true}
        />

        {/* 3. Main Operational Command Dashboard */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-[#0A1628]">
          {/* Header */}
          <div className="px-8 pt-4 pb-2 bg-[#0E1E34] border-b border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-[22px] font-bold text-white tracking-tight">
                    AD-SDI Implementation Programme 2026–2029
                  </h1>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    On track
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-steel-400">
                    Baseline schedule
                  </span>
                  <span className="text-[11px] font-mono text-steel-400">
                    Updated 14 Sep 2027, 09:30 GST
                  </span>
                </div>

                {/* Cadence chips */}
                <div className="flex items-center gap-2 pt-1.5">
                  {cadenceChips.map((c, ci) => (
                    <span
                      key={ci}
                      className="px-2.5 py-0.5 rounded-full text-[11px] bg-white/5 border border-white/10 text-steel-300 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                      <span>{c.name}:</span>
                      <strong className="text-white font-mono">{c.freq}</strong>
                    </span>
                  ))}
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-2.5">
                <button className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-[12px] font-medium border border-white/10 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-steel-400" />
                  <span>Gate review pack</span>
                </button>
                <button className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold flex items-center gap-1.5 shadow-sm">
                  <Download className="w-3.5 h-3.5" />
                  <span>Monthly report</span>
                </button>
              </div>
            </div>
          </div>

          {/* Row 1: KPI Cards (5 cards) */}
          <div className="px-8 pt-3 grid grid-cols-5 gap-3.5">
            {kpis.map((kpi, idx) => (
              <div
                key={idx}
                className="bg-[#13233D] rounded-xl border border-white/10 p-3 flex flex-col justify-between shadow-dark-level-1"
              >
                <div className="text-[11px] font-semibold text-steel-400 uppercase tracking-wider">
                  {kpi.label}
                </div>
                <div className={`text-[26px] font-bold font-mono tabular-nums tracking-tight ${kpi.color}`}>
                  {kpi.val}
                </div>
                <div className="text-[10px] text-steel-400 font-medium">{kpi.sub}</div>
              </div>
            ))}
          </div>

          {/* Row 2: Programme Multi-Lane Gantt Roadmap (260 px tall per spec) */}
          <div className="px-8 pt-3">
            <div className="h-[250px] bg-[#13233D] rounded-xl border border-white/10 shadow-dark-level-1 p-3.5 flex flex-col justify-between relative overflow-hidden">
              {/* Roadmap Header & Time Axis */}
              <div className="flex items-center justify-between text-[11px] pb-1 border-b border-white/10">
                <span className="font-bold text-white uppercase tracking-wider">
                  Master Programme Roadmap (2026–2029)
                </span>
                {/* Quarters axis */}
                <div className="flex items-center gap-8 font-mono text-[10px] text-steel-400">
                  <span>Phase 1 (Q3 26 – Q1 27)</span>
                  <span className="text-white font-bold">Phase 2: Core Platform (Q2 27 – Q4 27)</span>
                  <span>Phase 3: Rollout (2028)</span>
                  <span>Phase 4: Full Sovereign Ops (2029)</span>
                </div>
              </div>

              {/* 7 Lanes Roadmap SVG with Critical Path & Today Line */}
              <div className="relative flex-1 py-1">
                <svg viewBox="0 0 1060 170" className="w-full h-full overflow-visible">
                  {/* Phase background bands */}
                  <rect x="180" y="0" width="220" height="170" fill="rgba(255,255,255,0.02)" />
                  <rect x="400" y="0" width="240" height="170" fill="rgba(31,95,173,0.06)" />
                  <rect x="640" y="0" width="220" height="170" fill="rgba(255,255,255,0.02)" />
                  <rect x="860" y="0" width="200" height="170" fill="rgba(255,255,255,0.04)" />

                  {/* Vertical Today Line at Sep 2027 (x=510) per spec */}
                  <line x1="510" y1="0" x2="510" y2="170" stroke="#FFC20E" strokeWidth="2" />
                  <polygon points="505,0 515,0 510,7" fill="#FFC20E" />
                  <text x="510" y="166" fill="#FFC20E" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    TODAY (Sep 2027)
                  </text>

                  {/* 7 Lanes */}
                  {lanes.map((lane, li) => {
                    const y = li * 22 + 8;

                    return (
                      <g key={lane.code}>
                        {/* Lane Label */}
                        <text x="10" y={y + 11} fill="#7A9CC6" fontSize="10" fontWeight="600">
                          {lane.code} · {lane.name.split(' ')[0]}
                        </text>

                        {/* Deliverables Bars */}
                        {lane.items.map((it, ii) => {
                          const bx = 190 + ii * 115;
                          const bw = it.w;

                          return (
                            <g key={it.id}>
                              <rect
                                x={bx}
                                y={y}
                                width={bw}
                                height="15"
                                rx="3"
                                fill={it.done ? lane.color : it.current ? `${lane.color}cc` : '#243C60'}
                                stroke={it.current ? '#FFC20E' : 'rgba(255,255,255,0.1)'}
                                strokeWidth={it.current ? '1.5' : '1'}
                              />
                              <text
                                x={bx + bw / 2}
                                y={y + 11}
                                fill="#FFFFFF"
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
                  {/* M1 Accepted (x=380, y=15) */}
                  <polygon points="380,5 390,15 380,25 370,15" fill="#1E9E6A" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text x="380" y="18" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">✓</text>

                  {/* M2 Gold Outline (x=590, y=15) - Active Tooltip per spec */}
                  <polygon
                    points="590,5 600,15 590,25 580,15"
                    fill="#0B2545"
                    stroke="#FFC20E"
                    strokeWidth="2.5"
                    className="cursor-pointer glow-gold"
                  />
                  <text x="590" y="18" fill="#FFC20E" fontSize="8" fontWeight="bold" textAnchor="middle">M2</text>

                  {/* M3 & M4 (Grey) */}
                  <polygon points="840,5 850,15 840,25 830,15" fill="#243C60" stroke="#7A9CC6" strokeWidth="1.5" />
                  <polygon points="1030,5 1040,15 1030,25 1020,15" fill="#243C60" stroke="#7A9CC6" strokeWidth="1.5" />

                  {/* 2px Gold Critical Path Outline linking A02 -> C02 -> Phase 3 -> M4 per spec */}
                  <path
                    d="M 390 35 L 430 35 L 440 60 L 520 60 L 580 15"
                    fill="none"
                    stroke="#FFC20E"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />

                  {/* Active Tooltip on M2 Diamond */}
                  {hoveredMilestone === 'M2' && (
                    <g transform="translate(590, 32)">
                      <rect x="-110" y="0" width="220" height="24" rx="4" fill="#0B2545" stroke="#FFC20E" strokeWidth="1" />
                      <text x="0" y="16" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">
                        M2 · Core platforms deployed · Gate review Dec 2027
                      </text>
                    </g>
                  )}
                </svg>
              </div>
            </div>
          </div>

          {/* Row 3: Module Health (4 cols) | Top Risks (5 cols) | Deliverables Stack (3 cols) (approx 260 px) */}
          <div className="px-8 py-3 grid grid-cols-12 gap-3.5">
            {/* Left: Module Health (4 cols) */}
            <div className="col-span-4 bg-[#13233D] rounded-xl border border-white/10 p-3.5 flex flex-col justify-between shadow-dark-level-1">
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                <span className="text-[12px] font-bold text-white uppercase tracking-wider">
                  Module Delivery Health
                </span>
                <span className="text-[10px] font-mono text-emerald-400">5 Green · 1 Amber</span>
              </div>

              <div className="space-y-1.5">
                {moduleHealth.map((mh) => (
                  <div key={mh.mod} className="flex items-center justify-between text-[11px] p-1 rounded hover:bg-white/5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center text-white"
                        style={{ backgroundColor: MODULES[mh.mod as keyof typeof MODULES]?.color || '#1F5FAD' }}
                      >
                        {mh.mod}
                      </span>
                      <span className="text-white font-medium truncate max-w-[130px]">{mh.deliv}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-steel-400 text-[10px]">{mh.due}</span>
                      <span
                        className={`w-2 h-2 rounded-full ${mh.rag === 'Green' ? 'bg-emerald-400' : 'bg-amber-400'}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Centre: Top Risks Table (5 cols) */}
            <div className="col-span-5 bg-[#13233D] rounded-xl border border-white/10 p-3.5 flex flex-col justify-between shadow-dark-level-1">
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                <span className="text-[12px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  <span>Top Programme Risks</span>
                </span>
                <span className="text-[10px] text-steel-400">Owner Assigned</span>
              </div>

              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className="border-b border-white/10 text-[9px] text-steel-400 uppercase tracking-wider">
                    <th className="py-1">ID</th>
                    <th className="py-1">Risk Description</th>
                    <th className="py-1">L/I</th>
                    <th className="py-1">Owner</th>
                    <th className="py-1 text-right">Mitigation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {topRisks.map((r) => (
                    <tr key={r.id} className="hover:bg-white/5">
                      <td className="py-1 font-mono text-gold-500 font-bold">{r.id}</td>
                      <td className="py-1 text-white truncate max-w-[160px]">{r.risk}</td>
                      <td className="py-1 font-mono text-steel-300">{r.l}/{r.i}</td>
                      <td className="py-1 text-steel-400">{r.owner}</td>
                      <td className="py-1 text-right">
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/10 text-emerald-300 border border-white/10">
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
              <div className="bg-[#13233D] rounded-xl border border-white/10 p-3 space-y-1.5 shadow-dark-level-1">
                <div className="flex justify-between text-[11px] font-bold text-white">
                  <span>Deliverables Acceptance</span>
                  <span className="font-mono text-emerald-400">38 Accepted</span>
                </div>

                {/* Stacked bar */}
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-500" style={{ width: '73%' }} title="Accepted: 38" />
                  <div className="h-full bg-blue-500" style={{ width: '17%' }} title="In review: 9" />
                  <div className="h-full bg-amber-500" style={{ width: '8%' }} title="Conditional: 4" />
                  <div className="h-full bg-rose-500" style={{ width: '2%' }} title="Rejected: 1" />
                </div>

                <div className="flex justify-between text-[9px] text-steel-400 font-mono">
                  <span>Acc 38</span>
                  <span>Rev 9</span>
                  <span>Cond 4</span>
                  <span>Rej 1</span>
                </div>
                <div className="text-[9px] text-steel-500 italic">Fix window: 10 business days</div>
              </div>

              {/* Card 2: Design Conformance */}
              <div className="bg-[#13233D] rounded-xl border border-white/10 p-3 space-y-1.5 shadow-dark-level-1">
                <div className="flex justify-between text-[11px] font-bold text-white">
                  <span>SRS Conformance</span>
                  <span className="font-mono text-blue-400">148 Traced</span>
                </div>

                {/* Segmented bar */}
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden flex">
                  <div className="h-full bg-blue-600" style={{ width: '42%' }} title="Verified: 61" />
                  <div className="h-full bg-steel-400" style={{ width: '56%' }} title="In development: 84" />
                  <div className="h-full bg-amber-500" style={{ width: '2%' }} title="Deviations: 3" />
                </div>

                <div className="text-[10px] text-steel-400 flex justify-between font-mono">
                  <span>61 Verified</span>
                  <span>3 Deviations Proposed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Micro Footer */}
          <MicroFooter isDarkTheme={true} />
        </div>
      </div>
    </div>
  );
};
