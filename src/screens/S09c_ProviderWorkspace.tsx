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
} from 'lucide-react';

interface S09cProps {
  onNavigate: (screen: ScreenId) => void;
}

export const S09c_ProviderWorkspace: React.FC<S09cProps> = ({ onNavigate }) => {
  const providerProducts = [
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
  ];

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
                className="px-3.5 py-1.5 rounded-lg border border-border bg-canvas hover:bg-slate-100 text-[12px] font-semibold text-primaryText"
              >
                Marketplace View
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[13px] font-semibold flex items-center gap-2 shadow-sm transition-all">
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

                      return (
                        <tr key={p.id} className={`hover:bg-canvas/40 ${isPendingApproval ? 'bg-amber-50/20' : ''}`}>
                          <td className="py-3 px-4">
                            <div className="font-bold text-navy-900 leading-snug">{p.name}</div>
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
                <button className="w-full py-2 bg-canvas hover:bg-slate-100 text-primaryText border border-border rounded-lg text-[12px] font-semibold transition-colors">
                  Export Provider Settlement Report
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
