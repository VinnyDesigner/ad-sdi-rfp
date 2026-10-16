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
} from 'lucide-react';

interface S12Props {
  onNavigate: (screen: ScreenId) => void;
}

export const S12_GeoMaturityTraining: React.FC<S12Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [radarTooltip, setRadarTooltip] = useState(true);

  const kpis = [
    { label: 'Entities assessed', val: '64 / 64', sub: '100% census completed' },
    { label: 'Average GeoMaturity', val: '2.9 / 5', sub: 'Baseline 2026: 2.3 (+0.6)' },
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

  const pathways = [
    { name: 'Executives & Decision-Makers', enrolments: 184, comp: 88, icon: Award },
    { name: 'Data Stewards & Custodians', enrolments: 340, comp: 76, icon: BookOpen },
    { name: 'GIS Specialists & Analysts', enrolments: 490, comp: 82, icon: Target },
    { name: 'Platform Administrators', enrolments: 120, comp: 91, icon: Users },
    { name: 'Developers & Integrators', enrolments: 210, comp: 69, icon: Sparkles },
    { name: 'GeoAI & Spatial Data Science', enrolments: 195, comp: 64, icon: BarChart2 },
    { name: 'Twin, Marketplace & Open Data', enrolments: 165, comp: 72, icon: BookOpen },
    { name: 'Train-the-Trainer (Champion)', enrolments: 138, comp: 94, icon: Award, goldBorder: true },
  ];

  return (
    <div className="w-full h-screen bg-canvas flex flex-col justify-between overflow-hidden select-none font-sans">
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
              <div className="flex items-center gap-2 bg-canvas p-1 rounded-lg border border-border text-[12px]">
                {['Overview', 'Pathways', 'Sessions', 'Certifications'].map((t) => (
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
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-white text-[12px] font-medium text-primaryText">
                <span>All entities</span>
                <ChevronDown className="w-3.5 h-3.5 text-steel-400" />
              </button>
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

          {/* Row 2: Radar Chart (5 cols) + Horizontal Bar Chart (7 cols) (280 px tall per spec) */}
          <div className="px-8 pt-4 grid grid-cols-12 gap-6">
            {/* Radar Chart (5 cols): 5 axes: Governance, Data, Technology, People, Use */}
            <div className="col-span-5 bg-white rounded-xl border border-border shadow-level-1 p-4 flex flex-col justify-between relative">
              <div className="flex items-center justify-between pb-1 border-b border-border">
                <span className="text-[13px] font-bold text-navy-900 uppercase tracking-wider">
                  GeoMaturity 5-Pillar Radar
                </span>
                {/* Legend top right */}
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
                  {/* Pentagonal Grid Rings (Levels 1 to 5) */}
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

                  {/* 5 Axis Labels */}
                  <text x="140" y="18" fill="#14213D" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Governance
                  </text>
                  <text x="245" y="94" fill="#14213D" fontSize="11" fontWeight="bold">
                    Data
                  </text>
                  <text x="205" y="208" fill="#14213D" fontSize="11" fontWeight="bold">
                    Technology
                  </text>
                  <text x="75" y="208" fill="#14213D" fontSize="11" fontWeight="bold" textAnchor="end">
                    People
                  </text>
                  <text x="35" y="94" fill="#14213D" fontSize="11" fontWeight="bold" textAnchor="end">
                    Use
                  </text>

                  {/* Shape 1: Baseline 2026 (Dashed Grey, average 2.3) */}
                  <polygon
                    points="140,70 190,105 170,160 110,160 90,105"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />

                  {/* Shape 2: Current 2027 (Filled #E07B24 at 20% with 2px stroke, avg 2.9) */}
                  <polygon
                    points="140,50 215,92 185,175 95,175 75,92"
                    fill="rgba(224, 123, 36, 0.22)"
                    stroke="#E07B24"
                    strokeWidth="2.5"
                  />

                  {/* Interactive Tooltip on "Data · 2.1 → 2.8" per spec */}
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

            {/* Horizontal Bar Chart (7 cols): Score by Sector */}
            <div className="col-span-7 bg-white rounded-xl border border-border shadow-level-1 p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-1 border-b border-border">
                <span className="text-[13px] font-bold text-navy-900 uppercase tracking-wider">
                  GeoMaturity Score by Sector (Out of 5.0)
                </span>
                <span className="text-[11px] text-secondaryText">Grey ticks = 2026 Baseline</span>
              </div>

              {/* Horizontal Bars */}
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
                      {/* Current Orange Bar */}
                      <div
                        className="h-full bg-[#E07B24] rounded-full transition-all"
                        style={{ width: `${(sec.current / 5) * 100}%` }}
                      />
                      {/* Baseline Grey Tick Mark */}
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

          {/* Row 3: Learning Pathways (8 cols) + Training Effectiveness (4 cols) (176 px per spec) */}
          <div className="px-8 py-3 grid grid-cols-12 gap-6">
            {/* Learning Pathways Grid (8 cols, 4 × 2 compact cards) */}
            <div className="col-span-8 bg-white rounded-xl border border-border shadow-level-1 p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[12px] font-bold text-navy-900 uppercase tracking-wider">
                  Government Learning Pathways (8 Tracks)
                </span>
                <span className="text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline">
                  View LMS Catalog →
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-[11px]">
                {pathways.map((pw, pi) => {
                  const Icon = pw.icon;

                  return (
                    <div
                      key={pi}
                      className={`p-2 rounded-lg border transition-all ${
                        pw.goldBorder
                          ? 'border-2 border-gold-500 bg-amber-50/40 shadow-sm'
                          : 'border-border bg-canvas/60 hover:bg-canvas'
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

            {/* Training Effectiveness 2 × 2 Stat Tiles (4 cols) */}
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

          {/* Micro Footer */}
          <MicroFooter />
        </div>
      </div>
    </div>
  );
};
