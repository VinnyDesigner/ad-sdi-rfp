import React, { useState } from 'react';
import { ScreenId } from '../types';
import { HeaderWorkspace } from '../components/common/HeaderWorkspace';
import { SidebarWorkspace } from '../components/common/SidebarWorkspace';
import { MicroFooter } from '../components/common/MicroFooter';
import { PERSONAS } from '../constants/tokens';
import {
  Plus,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  BarChart2,
  Users,
  Layers,
  FileCheck2,
  X,
  Download,
  KeyRound,
  RefreshCw,
} from 'lucide-react';

interface S09cProps {
  onNavigate: (screen: ScreenId) => void;
}

export const S09c_ProviderWorkspace: React.FC<S09cProps> = ({ onNavigate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState('');
  const [newVersion, setNewVersion] = useState('v1.0');
  const [newFormats, setNewFormats] = useState('OGC API, GeoJSON');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const [providerProducts, setProviderProducts] = useState([
    {
      id: 1,
      name: 'Building Footprints 3D (LOD2)',
      version: 'v2.1',
      stage: 'Approval — pending',
      subscribers: 128,
      usage: '482,000 calls',
      stageIndex: 2, // 0=Submitted, 1=Quality check, 2=Approval, 3=Published
    },
    {
      id: 2,
      name: 'Land Parcels Real-Time API',
      version: 'v4.0',
      stage: 'Published',
      subscribers: 342,
      usage: '1,240,000 calls',
      stageIndex: 3,
    },
    {
      id: 3,
      name: 'Zoning & Master Plan Boundaries',
      version: 'v2027.08',
      stage: 'Published',
      subscribers: 210,
      usage: '310,000 calls',
      stageIndex: 3,
    },
    {
      id: 4,
      name: 'Road Network & Speed Limits Graph',
      version: 'v3.5',
      stage: 'Published',
      subscribers: 185,
      usage: '780,000 calls',
      stageIndex: 3,
    },
    {
      id: 5,
      name: 'Coastal Setbacks & Concessions',
      version: 'v1.2',
      stage: 'Quality check',
      subscribers: 42,
      usage: '95,000 calls',
      stageIndex: 1,
    },
  ]);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProd = {
      id: Date.now(),
      name: newTitle.trim(),
      version: newVersion.trim(),
      stage: 'Submitted',
      subscribers: 0,
      usage: '0 calls',
      stageIndex: 0,
    };

    setProviderProducts([newProd, ...providerProducts]);
    setModalOpen(false);
    setNewTitle('');
    showToast(`Submitted "${newProd.name}" to Sovereign Publishing Gateway!`);
  };

  const handleExportSettlement = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Product,Version,Publication Stage,Subscribers,Monthly Usage\n' +
      providerProducts.map((p) => `"${p.name}",${p.version},${p.stage},${p.subscribers},${p.usage}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'DMT-Provider-Settlement-Q3-2027.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded DMT Provider Settlement Report (CSV)');
  };

  const stagesList = ['Submitted', 'Quality check', 'Approval', 'Published'];

  return (
    <div className="w-full h-screen bg-canvas flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Workspace Top Bar with Khalid M. persona */}
      <HeaderWorkspace
        currentScreen="S08_MarketplaceCatalogue"
        onNavigate={onNavigate}
        persona={PERSONAS.khalid}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* 2. Left Sidebar */}
        <SidebarWorkspace currentScreen="S08_MarketplaceCatalogue" onNavigate={onNavigate} />

        {/* 3. Main Workspace Area */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-canvas">
          {/* Page Header */}
          <div className="px-8 pt-4 pb-3 bg-white border-b border-border flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-[24px] font-bold text-navy-900 tracking-tight">
                  Provider Workspace: DMT Products
                </h1>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-navy-100 text-navy-900">
                  Custodian Admin
                </span>
              </div>
              <p className="text-[13px] text-secondaryText">
                Manage spatial data product listings, publication pipelines, subscriber entitlements and SLAs.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('S08_MarketplaceCatalogue')}
                className="px-3.5 py-1.5 rounded-lg border border-border bg-canvas hover:bg-slate-100 text-[12px] font-semibold text-primaryText transition-colors cursor-pointer"
              >
                Marketplace View
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[13px] font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Submit New Product</span>
              </button>
            </div>
          </div>

          {/* Body: Product Table (8 cols) + Revenue/Usage Report (4 cols) */}
          <div className="flex-1 px-8 py-5 grid grid-cols-12 gap-6 overflow-hidden">
            {/* Table (8 cols) */}
            <div className="col-span-8 bg-white rounded-xl border border-border shadow-level-1 overflow-hidden flex flex-col justify-between">
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse text-[12px]">
                  <thead>
                    <tr className="border-b border-border bg-canvas/70 text-[10px] font-bold text-secondaryText uppercase tracking-wider">
                      <th className="py-3 px-4">Product Name</th>
                      <th className="py-3 px-2">Ver</th>
                      <th className="py-3 px-4">Publication Stage Tracker</th>
                      <th className="py-3 px-3">Subscribers</th>
                      <th className="py-3 px-4 text-right">30d Usage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {providerProducts.map((p) => {
                      const isPendingApproval = p.stage === 'Approval — pending';
                      const isSelected = selectedProductId === p.id;

                      return (
                        <tr
                          key={p.id}
                          onClick={() => setSelectedProductId(p.id)}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? 'bg-blue-50/70 font-semibold' : 'hover:bg-canvas/40'
                          } ${isPendingApproval && !isSelected ? 'bg-amber-50/20' : ''}`}
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                              <div className="font-bold text-navy-900 leading-snug">{p.name}</div>
                            </div>
                            {isPendingApproval && (
                              <span className="text-[10px] text-amber-700 font-semibold">
                                Awaiting DGE Spatial Board Sign-off
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-2 font-mono text-secondaryText">{p.version}</td>
                          <td className="py-3 px-4">
                            {/* Inline Stage Tracker */}
                            <div className="flex items-center gap-1">
                              {stagesList.map((stName, sIdx) => {
                                const isPassed = sIdx < p.stageIndex;
                                const isCurrent = sIdx === p.stageIndex;

                                return (
                                  <React.Fragment key={sIdx}>
                                    <div
                                      className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                                        isCurrent
                                          ? isPendingApproval
                                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                            : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                          : isPassed
                                          ? 'bg-emerald-50 text-emerald-700'
                                          : 'bg-canvas text-secondaryText opacity-60'
                                      }`}
                                    >
                                      {isPassed && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />}
                                      <span>{stName}</span>
                                    </div>
                                    {sIdx < stagesList.length - 1 && (
                                      <div className="w-2 h-[1px] bg-steel-400/40" />
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </div>
                          </td>
                          <td className="py-3 px-3 font-mono font-semibold text-primaryText">
                            {p.subscribers} entities
                          </td>
                          <td className="py-3 px-4 text-right font-mono font-bold text-blue-700">
                            {p.usage}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="p-3 border-t border-border bg-canvas/30 text-[11px] text-secondaryText flex items-center justify-between">
                <span>DMT Provider Node: Active & Syncing with National Clearinghouse</span>
                <span className="font-semibold text-navy-900">Total Portfolio Usage: 2.9M calls / mo</span>
              </div>
            </div>

            {/* Right Card: Usage & Revenue-Share Report (4 cols) */}
            <div className="col-span-4 bg-white rounded-xl border border-border shadow-level-1 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="text-[13px] font-bold text-navy-900 uppercase tracking-wider">
                    Portfolio Adoption & Share
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700">
                    +18% MoM
                  </span>
                </div>

                {/* Monthly Bars Chart */}
                <div className="py-4">
                  <div className="text-[11px] text-secondaryText mb-2">Monthly aggregate consumption volume</div>
                  <svg viewBox="0 0 320 130" className="w-full h-[130px]">
                    {[0, 30, 60, 90].map((y, i) => (
                      <line key={i} x1="0" y1={y} x2="320" y2={y} stroke="#F1F5F9" strokeWidth="1" />
                    ))}
                    {[
                      { m: 'Apr', v: 1.8 },
                      { m: 'May', v: 2.1 },
                      { m: 'Jun', v: 2.3 },
                      { m: 'Jul', v: 2.5 },
                      { m: 'Aug', v: 2.7 },
                      { m: 'Sep', v: 2.9 },
                    ].map((b, bi) => {
                      const h = (b.v / 3.5) * 100;
                      return (
                        <g key={bi}>
                          <rect
                            x={bi * 52 + 18}
                            y={110 - h}
                            width="26"
                            height={h}
                            rx="3"
                            fill="#0E9F8E"
                            opacity={bi === 5 ? 1 : 0.8}
                          />
                          <text
                            x={bi * 52 + 31}
                            y="124"
                            fill="#5B6B7F"
                            fontSize="10"
                            textAnchor="middle"
                            fontFamily="monospace"
                          >
                            {b.m}
                          </text>
                        </g>
                      );
                    })}
                    <line x1="0" y1="110" x2="320" y2="110" stroke="#CBD5E1" strokeWidth="1" />
                  </svg>
                </div>

                {/* KPIs & Revenue Sharing Framework (NO PRICES/CURRENCY) */}
                <div className="space-y-2 text-[12px] bg-canvas p-3 rounded-lg border border-border">
                  <div className="flex justify-between">
                    <span className="text-secondaryText">Cross-Entity Adoption:</span>
                    <strong className="text-navy-900 font-mono">907 Active Keys</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondaryText">SLA Conformance:</span>
                    <strong className="text-emerald-700 font-mono">99.98%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondaryText">Cost-Recovery Share Index:</span>
                    <strong className="text-purple-700 font-mono">Grade A+ (88.4)</strong>
                  </div>
                </div>

                <div className="text-[10px] text-steel-500 italic mt-3">
                  Per approved sovereign revenue-sharing and multi-entity data recovery framework.
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={handleExportSettlement}
                  className="w-full py-2 bg-canvas hover:bg-slate-100 text-primaryText border border-border rounded-lg text-[12px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Provider Settlement Report</span>
                </button>
              </div>
            </div>
          </div>

          {/* Micro Footer */}
          <MicroFooter />
        </div>
      </div>

      {/* Submit New Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateProduct}
            className="bg-white rounded-2xl shadow-level-4 border border-border max-w-lg w-full p-6 space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-[16px] text-navy-900">Submit New Spatial Product</h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-steel-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-[12px]">
              <div>
                <label className="block font-semibold text-primaryText mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Real-Time Public Transit Bus Telemetry"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-border text-[12px] text-primaryText focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-primaryText mb-1">Version</label>
                  <input
                    type="text"
                    required
                    value={newVersion}
                    onChange={(e) => setNewVersion(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-border text-[12px] text-primaryText focus:outline-none focus:border-blue-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-primaryText mb-1">Target Formats</label>
                  <input
                    type="text"
                    required
                    value={newFormats}
                    onChange={(e) => setNewFormats(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-border text-[12px] text-primaryText focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <p className="text-[11px] text-secondaryText leading-relaxed">
                By submitting, DMT certifies this data product complies with the Abu Dhabi Data Management Standards and UAE Sovereign Data Residency requirements.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-border text-[12px] font-medium text-secondaryText hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold shadow-sm cursor-pointer"
              >
                Submit to Governance Pipeline
              </button>
            </div>
          </form>
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
