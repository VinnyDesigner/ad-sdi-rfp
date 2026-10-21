import React, { useState } from 'react';
import { ScreenId } from '../types';
import { HeaderWorkspace } from '../components/common/HeaderWorkspace';
import { SidebarWorkspace } from '../components/common/SidebarWorkspace';
import { MicroFooter } from '../components/common/MicroFooter';
import { StatusPill } from '../components/common/BadgesAndPills';
import {
  Download,
  ChevronDown,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';

interface S05Props {
  onNavigate: (screen: ScreenId) => void;
}

export const S05_QualitySlaDashboard: React.FC<S05Props> = ({ onNavigate }) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(14);
  const [timeRange, setTimeRange] = useState('Last 30 days');
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState('All entities');
  const [entityDropdownOpen, setEntityDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ theme: string; check: string; score: number } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExportReport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Entity,Datasets,Currency,Quality,Tickets,Status\n' +
      entities.map((e) => `${e.name},${e.datasets},${e.currency},${e.quality},${e.tickets},${e.status}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AD-SDI-SLA-Report-${timeRange.replace(/\s+/g, '-')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported AD-SDI SLA & Quality Report (${timeRange})`);
  };

  const kpis = [
    {
      title: 'Platform availability',
      value: '99.95%',
      target: '99.90%',
      subtext: 'Across 1,150 OGC endpoints',
      spark: [99.8, 99.9, 99.92, 99.95, 99.94, 99.97, 99.95],
    },
    {
      title: 'Data currency',
      value: '94%',
      target: '90%',
      subtext: 'of fundamental datasets updated on schedule',
      spark: [88, 90, 91, 92, 93, 94, 94],
    },
    {
      title: 'Data quality',
      value: '96%',
      target: '95%',
      subtext: 'of datasets passing the quality gateway',
      spark: [92, 94, 95, 94, 96, 95, 96],
    },
    {
      title: 'Support responsiveness',
      value: '97%',
      target: '95%',
      subtext: 'incidents resolved within SLA',
      spark: [93, 94, 96, 95, 97, 98, 97],
    },
    {
      title: 'Entity adoption',
      value: '41',
      target: '40',
      subtext: 'entities publishing or consuming',
      spark: [32, 34, 37, 38, 39, 40, 41],
    },
  ];

  const entities = [
    { name: 'DMT', datasets: 840, currency: '98%', quality: '97%', tickets: 2, status: 'on-track' as const },
    { name: 'EAD', datasets: 512, currency: '95%', quality: '96%', tickets: 1, status: 'on-track' as const },
    { name: 'SCAD', datasets: 320, currency: '96%', quality: '95%', tickets: 0, status: 'on-track' as const },
    { name: 'DoH', datasets: 245, currency: '86%', quality: '89%', tickets: 4, status: 'at-risk' as const }, // 1 amber per spec
    { name: 'ADEK', datasets: 210, currency: '94%', quality: '94%', tickets: 1, status: 'on-track' as const },
    { name: 'ADPHC', datasets: 180, currency: '93%', quality: '95%', tickets: 1, status: 'on-track' as const },
  ];

  const heatmapThemes = [
    'Boundaries',
    'Transport',
    'Land & Cadastre',
    'Buildings & 3D',
    'Environment',
    'Utilities',
    'Imagery',
    'Population',
  ];

  const heatmapChecks = ['Schema', 'Geometry', 'Topology', 'Attributes', 'CRS', 'Metadata'];

  // Heatmap values (0.7 to 1.0)
  const heatmapData = [
    [0.99, 1.0, 0.98, 0.99, 1.0, 0.98],
    [0.98, 0.95, 0.88, 0.96, 1.0, 0.94],
    [1.0, 0.99, 0.94, 0.98, 1.0, 0.99],
    [0.97, 0.92, 0.89, 0.95, 1.0, 0.92],
    [0.99, 0.98, 0.97, 0.96, 1.0, 0.98],
    [0.94, 0.91, 0.82, 0.93, 1.0, 0.90],
    [1.0, 1.0, 1.0, 0.98, 1.0, 0.99],
    [0.98, 0.96, 0.94, 0.97, 1.0, 0.95],
  ];

  return (
    <div className="w-full h-screen bg-canvas flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Workspace Top Bar (64 px) */}
      <HeaderWorkspace currentScreen="S05_QualitySlaDashboard" onNavigate={onNavigate} />

      <div className="flex-1 flex overflow-hidden">
        {/* 2. Left Workspace Sidebar (240 px) */}
        <SidebarWorkspace currentScreen="S05_QualitySlaDashboard" onNavigate={onNavigate} />

        {/* 3. Content Area */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-canvas">
          {/* Page Header (approx 68 px) */}
          <div className="px-8 pt-4 pb-2 bg-white border-b border-border flex items-center justify-between">
            <div>
              <h1 className="text-[24px] font-bold text-navy-900 tracking-tight">
                Quality & SLA Dashboard
              </h1>
              <p className="text-[13px] text-secondaryText">
                Automated monitoring of availability, data currency, quality and support.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Time Range Filter Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setTimeDropdownOpen(!timeDropdownOpen);
                    setEntityDropdownOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-canvas text-[12px] font-medium text-primaryText hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <span>{timeRange}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-steel-400" />
                </button>
                {timeDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-36 bg-white rounded-xl shadow-level-3 border border-border py-1 z-50 text-[12px]">
                    {['Last 7 days', 'Last 30 days', 'Last 90 days', 'Past 12 months'].map((tr) => (
                      <button
                        key={tr}
                        type="button"
                        onClick={() => {
                          setTimeRange(tr);
                          setTimeDropdownOpen(false);
                          showToast(`Updated SLA metrics for ${tr}`);
                        }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 transition-colors ${
                          timeRange === tr ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-primaryText'
                        }`}
                      >
                        {tr}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Entity Filter Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setEntityDropdownOpen(!entityDropdownOpen);
                    setTimeDropdownOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-canvas text-[12px] font-medium text-primaryText hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <span>{selectedEntity}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-steel-400" />
                </button>
                {entityDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-40 bg-white rounded-xl shadow-level-3 border border-border py-1 z-50 text-[12px]">
                    {['All entities', 'DMT', 'EAD', 'SCAD', 'DoH', 'ADEK', 'ADPHC'].map((ent) => (
                      <button
                        key={ent}
                        type="button"
                        onClick={() => {
                          setSelectedEntity(ent);
                          setEntityDropdownOpen(false);
                          showToast(`Filtered compliance matrix to ${ent}`);
                        }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 transition-colors ${
                          selectedEntity === ent ? 'text-blue-600 font-bold bg-blue-50/50' : 'text-primaryText'
                        }`}
                      >
                        {ent}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Real CSV Export Button */}
              <button
                type="button"
                onClick={handleExportReport}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-[12px] font-semibold transition-colors shadow-sm cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-gold-500" />
                <span>Export report</span>
              </button>
            </div>
          </div>

          {/* Row 1: 5 KPI Cards (approx 106 px) */}
          <div className="px-8 pt-4 grid grid-cols-5 gap-4">
            {kpis.map((kpi, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-border shadow-level-1 p-3.5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-secondaryText">{kpi.title}</span>
                  <span className="w-2 h-2 rounded-full bg-success"></span>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div className="text-[28px] font-bold text-navy-900 tracking-tight tabular-nums font-mono">
                    {kpi.value}
                  </div>
                  {/* Sparkline SVG */}
                  <svg className="w-16 h-7 overflow-visible">
                    <polyline
                      fill="none"
                      stroke="#1F5FAD"
                      strokeWidth="2"
                      points={kpi.spark
                        .map((v, i) => `${i * 10},${24 - ((v - 80) / 20) * 20}`)
                        .join(' ')}
                    />
                    {/* Dashed agreed target marker */}
                    <line
                      x1="0"
                      y1="8"
                      x2="60"
                      y2="8"
                      stroke="#CBD5E1"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                  </svg>
                </div>

                <div className="text-[11px] text-steel-500 truncate pt-1 border-t border-border/50">
                  {kpi.subtext}
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Availability Line Chart (8 cols) + Donut Quality Gateway (4 cols) (approx 290 px) */}
          <div className="px-8 pt-4 grid grid-cols-12 gap-6">
            {/* Availability Chart (8 cols) */}
            <div className="col-span-8 bg-white rounded-xl border border-border shadow-level-1 p-4 flex flex-col justify-between relative">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[14px] font-bold text-navy-900">
                    Platform Availability, Last 90 Days
                  </div>
                  <div className="text-[11px] text-secondaryText">
                    Core OGC API endpoints · Average 99.95% uptime
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-blue-600"></span>
                    <span className="text-secondaryText">Measured Uptime</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 border-b border-dashed border-steel-400"></span>
                    <span className="text-secondaryText">Agreed Target (99.90%)</span>
                  </div>
                </div>
              </div>

              {/* Chart SVG */}
              <div className="relative h-[200px] w-full pt-2">
                <svg viewBox="0 0 720 180" className="w-full h-full overflow-visible">
                  {/* Grid lines */}
                  {[0, 45, 90, 135].map((y, i) => (
                    <line
                      key={i}
                      x1="40"
                      y1={y}
                      x2="700"
                      y2={y}
                      stroke="#F1F5F9"
                      strokeWidth="1"
                    />
                  ))}
                  {/* Y Axis labels */}
                  <text x="30" y="8" fill="#94A3B8" fontSize="10" textAnchor="end">100%</text>
                  <text x="30" y="50" fill="#94A3B8" fontSize="10" textAnchor="end">99.9%</text>
                  <text x="30" y="95" fill="#94A3B8" fontSize="10" textAnchor="end">99.8%</text>
                  <text x="30" y="140" fill="#94A3B8" fontSize="10" textAnchor="end">99.5%</text>

                  {/* Dashed Target line */}
                  <line x1="40" y1="52" x2="700" y2="52" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />

                  {/* Gradient fill */}
                  <defs>
                    <linearGradient id="availGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1F5FAD" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#1F5FAD" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Area */}
                  <polygon
                    points="40,25 90,20 140,22 190,18 240,24 290,22 340,30 390,20 440,16 490,65 540,22 590,18 640,20 700,18 700,160 40,160"
                    fill="url(#availGrad)"
                  />

                  {/* Line */}
                  <polyline
                    fill="none"
                    stroke="#1F5FAD"
                    strokeWidth="2.5"
                    points="40,25 90,20 140,22 190,18 240,24 290,22 340,30 390,20 440,16 490,65 540,22 590,18 640,20 700,18"
                  />

                  {/* Planned Maintenance Flag (21 Aug at x=490, y=65) */}
                  <g transform="translate(490, 65)">
                    <circle cx="0" cy="0" r="4" fill="#FFC20E" stroke="#0B2545" strokeWidth="1.5" />
                    <line x1="0" y1="-5" x2="0" y2="-28" stroke="#FFC20E" strokeWidth="1.5" />
                    <rect x="-65" y="-48" width="130" height="20" rx="4" fill="#0B2545" />
                    <text x="0" y="-34" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">
                      Planned maint. · 21 Aug
                    </text>
                  </g>

                  {/* Active Tooltip: 14 Aug · 99.98% at x=440, y=16 per spec */}
                  <g transform="translate(440, 16)">
                    <circle cx="0" cy="0" r="5" fill="#1F5FAD" stroke="#FFFFFF" strokeWidth="2" />
                    <rect x="-55" y="-36" width="110" height="22" rx="4" fill="#0B2545" />
                    <text x="0" y="-22" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">
                      14 Aug · 99.98%
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Donut Chart: Quality Gateway · last 24 h (4 cols) */}
            <div className="col-span-4 bg-white rounded-xl border border-border shadow-level-1 p-4 flex flex-col justify-between">
              <div>
                <div className="text-[14px] font-bold text-navy-900">
                  Quality Gateway · Last 24 h
                </div>
                <div className="text-[11px] text-secondaryText">
                  Automated ISO validation pipeline
                </div>
              </div>

              {/* Donut SVG with center 186 */}
              <div className="flex items-center justify-center my-1 relative">
                <svg width="150" height="150" viewBox="0 0 160 160">
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="18"
                  />
                  {/* Passed segment (171 / 186 = 92%) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    fill="none"
                    stroke="#1E9E6A"
                    strokeWidth="18"
                    strokeDasharray="346 376"
                    strokeDashoffset="0"
                    transform="rotate(-90 80 80)"
                  />
                  {/* Returned segment (15 / 186 = 8%) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    fill="none"
                    stroke="#E8A317"
                    strokeWidth="18"
                    strokeDasharray="30 376"
                    strokeDashoffset="-346"
                    transform="rotate(-90 80 80)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className="text-[26px] font-bold text-navy-900 tabular-nums leading-none">
                    186
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-secondaryText font-medium mt-0.5">
                    Validations
                  </div>
                </div>
              </div>

              {/* Segments label & Top 3 reasons */}
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between border-b border-border/80 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="font-semibold text-emerald-800">Passed: 171</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="font-semibold text-amber-800">Returned: 15</span>
                  </div>
                </div>

                <div className="text-[10px] font-semibold text-secondaryText uppercase">
                  Top 3 Return Reasons:
                </div>
                <div className="space-y-1 text-[11px] text-primaryText">
                  <div className="flex justify-between">
                    <span>Spatial reference mismatch</span>
                    <strong className="font-mono text-amber-600">6</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Metadata incomplete</span>
                    <strong className="font-mono text-amber-600">5</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Topology errors</span>
                    <strong className="font-mono text-amber-600">4</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Entity Compliance (7 cols) + Heatmap (5 cols) (approx 280 px) */}
          <div className="px-8 py-4 grid grid-cols-12 gap-6">
            {/* Entity Compliance Table (7 cols) */}
            <div className="col-span-7 bg-white rounded-xl border border-border shadow-level-1 p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[13px] font-bold text-navy-900 uppercase tracking-wider">
                  Entity Compliance Matrix
                </span>
                <span className="text-[11px] text-secondaryText">5 On track · 1 At risk</span>
              </div>

              <table className="w-full text-left text-[12px]">
                <thead>
                  <tr className="border-b border-border text-[10px] text-secondaryText uppercase tracking-wider">
                    <th className="py-1.5">Entity</th>
                    <th className="py-1.5">Datasets</th>
                    <th className="py-1.5">Currency</th>
                    <th className="py-1.5">Quality</th>
                    <th className="py-1.5">Tickets</th>
                    <th className="py-1.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {entities
                    .filter((ent) => selectedEntity === 'All entities' || ent.name === selectedEntity)
                    .map((ent, eIdx) => (
                      <tr key={eIdx} className="hover:bg-canvas/50">
                        <td className="py-1.5 font-bold text-navy-900">{ent.name}</td>
                        <td className="py-1.5 font-mono text-secondaryText">{ent.datasets}</td>
                        <td className="py-1.5 font-mono text-primaryText font-semibold">{ent.currency}</td>
                        <td className="py-1.5 font-mono text-primaryText font-semibold">{ent.quality}</td>
                        <td className="py-1.5 font-mono text-secondaryText">{ent.tickets}</td>
                        <td className="py-1.5 text-right">
                          <StatusPill status={ent.status} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Heatmap: Themes × Quality Checks (5 cols) */}
            <div className="col-span-5 bg-white rounded-xl border border-border shadow-level-1 p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[13px] font-bold text-navy-900 uppercase tracking-wider">
                  Themes × Quality Checks
                </span>
                <span className="text-[11px] text-secondaryText">Click cell for gate audit</span>
              </div>

              {/* Heatmap Grid */}
              <div className="overflow-x-auto">
                <table className="w-full text-center text-[10px]">
                  <thead>
                    <tr>
                      <th className="text-left py-1 text-secondaryText font-medium w-28">Theme</th>
                      {heatmapChecks.map((ch, ci) => (
                        <th key={ci} className="py-1 text-secondaryText font-medium px-1">
                          {ch.slice(0, 4)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {heatmapThemes.map((th, ri) => (
                      <tr key={ri}>
                        <td className="text-left py-1 text-[11px] font-medium text-primaryText truncate max-w-[110px]">
                          {th}
                        </td>
                        {heatmapData[ri].map((val, ci) => {
                          // Blue intensity
                          const bg =
                            val >= 0.98
                              ? '#1F5FAD'
                              : val >= 0.94
                              ? '#417DC6'
                              : val >= 0.90
                              ? '#7A9CC6'
                              : '#E8A317'; // amber for low

                          return (
                            <td key={ci} className="p-0.5">
                              <button
                                type="button"
                                onClick={() => setSelectedCell({ theme: th, check: heatmapChecks[ci], score: val })}
                                className="w-full h-4 rounded text-[9px] font-bold flex items-center justify-center text-white cursor-pointer hover:scale-110 hover:shadow-sm transition-transform"
                                style={{ backgroundColor: bg }}
                                title={`${th} - ${heatmapChecks[ci]}: ${(val * 100).toFixed(0)}% (Click for details)`}
                              >
                                {(val * 100).toFixed(0)}%
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Legend Strip below */}
              <div className="flex items-center justify-between pt-1 border-t border-border text-[10px] text-secondaryText">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-2 rounded bg-amber-500"></span>
                  <span>&lt;90% Review</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-2 rounded bg-[#7A9CC6]"></span>
                  <span>90–94%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-2 rounded bg-[#417DC6]"></span>
                  <span>95–97%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-2 rounded bg-[#1F5FAD]"></span>
                  <span>&gt;98% Optimal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Micro Footer */}
          <MicroFooter />
        </div>
      </div>

      {/* Heatmap Cell Diagnostic Modal */}
      {selectedCell && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-level-4 border border-border max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div>
                <h3 className="font-bold text-[16px] text-navy-900">
                  {selectedCell.theme} · {selectedCell.check} Test
                </h3>
                <span className="text-[12px] text-secondaryText">Automated ISO 19157 Quality Gate Audit</span>
              </div>
              <button
                onClick={() => setSelectedCell(null)}
                className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-steel-400"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-[12px]">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-border">
                <span className="text-secondaryText">Conformance Pass Rate</span>
                <span className="font-mono font-bold text-[16px] text-blue-700">
                  {(selectedCell.score * 100).toFixed(1)}%
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="font-bold text-navy-900 text-[11px] uppercase tracking-wider">Test Execution Summary</div>
                <div className="p-2.5 rounded-lg border border-border space-y-1">
                  <div className="flex justify-between text-secondaryText">
                    <span>Total Features Evaluated:</span>
                    <strong className="font-mono text-primaryText">142,850</strong>
                  </div>
                  <div className="flex justify-between text-secondaryText">
                    <span>Compliant Geometry & Records:</span>
                    <strong className="font-mono text-emerald-600">
                      {Math.round(142850 * selectedCell.score).toLocaleString()}
                    </strong>
                  </div>
                  <div className="flex justify-between text-secondaryText">
                    <span>Anomalies Flagged:</span>
                    <strong className="font-mono text-amber-600">
                      {Math.round(142850 * (1 - selectedCell.score)).toLocaleString()}
                    </strong>
                  </div>
                </div>
              </div>

              <p className="text-secondaryText text-[11px] leading-relaxed">
                Rules applied: EPSG:3997 coordinate bounds, topological planar enforcement, and mandatory attribute domain constraints under Abu Dhabi Geospatial Data Governance Framework.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <button
                onClick={() => {
                  setSelectedCell(null);
                  showToast(`Triggered re-validation queue for ${selectedCell.theme}`);
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold"
              >
                Trigger Re-Validation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0B2545] text-white px-4 py-2.5 rounded-full shadow-2xl border border-gold-500/50 flex items-center gap-2 text-[12px] font-medium animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
