import React, { useState } from 'react';
import { ScreenId } from '../types';
import { HeaderWorkspace } from '../components/common/HeaderWorkspace';
import { SidebarWorkspace } from '../components/common/SidebarWorkspace';
import { MicroFooter } from '../components/common/MicroFooter';
import { StatusPill } from '../components/common/BadgesAndPills';
import { PERSONAS } from '../constants/tokens';
import {
  Copy,
  RotateCcw,
  AlertCircle,
  Key,
  BarChart3,
  ExternalLink,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface S09bProps {
  onNavigate: (screen: ScreenId) => void;
}

export const S09b_MyEntitlements: React.FC<S09bProps> = ({ onNavigate }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const entitlements = [
    {
      id: 1,
      product: 'Building Footprints 3D (LOD2)',
      provider: 'DMT',
      plan: 'Commercial Subscription',
      status: 'pending' as const,
      apiKey: 'adsdi_••••••3f9a',
      usage: 0,
      quota: 50000,
      renews: 'Pending DMT review',
    },
    {
      id: 2,
      product: 'Land Parcels API (Cadastre)',
      provider: 'DMT',
      plan: 'Included Gov/Partner',
      status: 'active' as const,
      apiKey: 'adsdi_••••••8c12',
      usage: 34200,
      quota: 50000,
      renews: '1 Oct 2027',
    },
    {
      id: 3,
      product: 'Population Grid 100 m Resolution',
      provider: 'SCAD',
      plan: 'Monthly Subscription',
      status: 'active' as const,
      apiKey: 'adsdi_••••••7d91',
      usage: 12400,
      quota: 25000,
      renews: '15 Oct 2027',
    },
    {
      id: 4,
      product: 'Mangrove Extent Time Series',
      provider: 'EAD',
      plan: 'Open Data License',
      status: 'active' as const,
      apiKey: 'adsdi_••••••4e55',
      usage: 4120,
      quota: 10000,
      renews: 'Perpetual',
    },
    {
      id: 5,
      product: 'Rooftop Solar PV Potential Registry',
      provider: 'EcoSpatial UAE',
      plan: 'Partner Pilot',
      status: 'at-risk' as const, // expiring amber
      apiKey: 'adsdi_••••••9a23',
      usage: 19800,
      quota: 20000,
      renews: '28 Sep 2027 (Expiring)',
    },
  ];

  return (
    <div className="w-full h-screen bg-canvas flex flex-col justify-between overflow-hidden select-none font-sans relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-20 right-6 z-50 bg-navy-900 text-white px-4 py-2 rounded-xl shadow-2xl border border-white/20 text-[12px] flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Top Bar */}
      <HeaderWorkspace
        currentScreen="S08_MarketplaceCatalogue"
        onNavigate={onNavigate}
        persona={PERSONAS.omar}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* 2. Left Sidebar */}
        <SidebarWorkspace currentScreen="S08_MarketplaceCatalogue" onNavigate={onNavigate} />

        {/* 3. Main Workspace Area */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-canvas">
          {/* Page Header */}
          <div className="px-8 pt-4 pb-2 bg-white border-b border-border space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[24px] font-bold text-navy-900 tracking-tight">
                  My Entitlements
                </h1>
                <p className="text-[13px] text-secondaryText">
                  Active geospatial API keys, subscription quotas, and provider access credentials.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('S08_MarketplaceCatalogue')}
                  className="px-3.5 py-1.5 rounded-lg border border-border bg-canvas hover:bg-slate-100 text-[12px] font-semibold text-primaryText"
                >
                  Browse Marketplace
                </button>
                <button
                  onClick={() => onNavigate('S09c_ProviderWorkspace')}
                  className="px-3.5 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-[12px] font-semibold"
                >
                  Provider Workspace
                </button>
              </div>
            </div>

            {/* Info Banner per spec: "1 request awaiting provider approval" */}
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[12px] text-amber-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>
                  <strong>1 request awaiting provider approval:</strong> Building Footprints 3D (LOD2) submitted to DMT on 14 Sep 2027.
                </span>
              </div>
              <span className="text-[11px] font-mono text-amber-700 font-semibold">
                SLA: Target review within 48h
              </span>
            </div>
          </div>

          {/* Body: Entitlements Table (8 cols) + Usage Last 30 Days Card (4 cols) */}
          <div className="flex-1 px-8 py-5 grid grid-cols-12 gap-6 overflow-hidden">
            {/* Left: Table (8 cols) */}
            <div className="col-span-8 bg-white rounded-xl border border-border shadow-level-1 overflow-hidden flex flex-col justify-between">
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse text-[12px]">
                  <thead>
                    <tr className="border-b border-border bg-canvas/70 text-[10px] font-bold text-secondaryText uppercase tracking-wider">
                      <th className="py-3 px-4">Product</th>
                      <th className="py-3 px-3">Provider</th>
                      <th className="py-3 px-3">Plan</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">API Key</th>
                      <th className="py-3 px-3">Usage this Month</th>
                      <th className="py-3 px-4">Renews</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {entitlements.map((item) => (
                      <tr key={item.id} className="hover:bg-canvas/40">
                        <td className="py-3 px-4 font-bold text-navy-900">{item.product}</td>
                        <td className="py-3 px-3 font-semibold text-primaryText">{item.provider}</td>
                        <td className="py-3 px-3 text-secondaryText">{item.plan}</td>
                        <td className="py-3 px-3">
                          <StatusPill status={item.status} label={item.status === 'at-risk' ? 'Expiring' : undefined} />
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5 font-mono text-[11px] bg-canvas px-2 py-1 rounded border border-border">
                            <span>{item.apiKey}</span>
                            <button
                              onClick={() => {
                                navigator.clipboard?.writeText(`adsdi_live_sec_key_token_${item.id}`);
                                setCopiedKey(item.apiKey);
                                showToast(`API key for ${item.product} copied to clipboard`);
                              }}
                              className="text-steel-400 hover:text-navy-900 cursor-pointer p-0.5"
                              title="Copy API Key"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => {
                                showToast(`API Key for ${item.product} rotated successfully`);
                              }}
                              className="text-steel-400 hover:text-navy-900 cursor-pointer p-0.5"
                              title="Rotate Key"
                            >
                              <RotateCcw className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] font-mono text-secondaryText">
                              <span>{item.usage.toLocaleString()}</span>
                              <span>{item.quota.toLocaleString()}</span>
                            </div>
                            <div className="w-24 h-1.5 bg-canvas rounded-full overflow-hidden border border-border">
                              <div
                                className="h-full bg-blue-600 rounded-full"
                                style={{ width: `${(item.usage / item.quota) * 100}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-secondaryText font-mono text-[11px]">
                          {item.renews}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3 border-t border-border bg-canvas/30 text-[11px] text-secondaryText flex items-center justify-between">
                <span>All API transactions authenticated via OAuth 2.0 / Mutual TLS</span>
                <span
                  onClick={() => showToast('Downloading AD-SDI Postman Collection & TypeScript SDK')}
                  className="font-semibold text-blue-600 cursor-pointer hover:underline"
                >
                  Download SDK & Postman Collection →
                </span>
              </div>
            </div>

            {/* Right: Usage, Last 30 Days Card (4 cols) */}
            <div className="col-span-4 bg-white rounded-xl border border-border shadow-level-1 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="text-[13px] font-bold text-navy-900 uppercase tracking-wider">
                    API Volume · Last 30 Days
                  </span>
                  <span className="text-[11px] font-bold text-blue-600 font-mono">
                    70,520 calls
                  </span>
                </div>

                {/* Bar chart SVG */}
                <div className="py-4">
                  <div className="text-[11px] text-secondaryText mb-2">Daily API calls breakdown</div>
                  <svg viewBox="0 0 340 140" className="w-full h-[140px]">
                    {[0, 35, 70, 105].map((y, i) => (
                      <line key={i} x1="0" y1={y} x2="340" y2={y} stroke="#F1F5F9" strokeWidth="1" />
                    ))}
                    {/* 14 Daily Bars */}
                    {[
                      1800, 2100, 2400, 2200, 3100, 2900, 3400, 3600, 3200, 3900, 4200, 4100, 4600,
                      4800,
                    ].map((val, idx) => {
                      const h = (val / 5000) * 100;
                      return (
                        <g key={idx}>
                          <rect
                            x={idx * 24 + 10}
                            y={120 - h}
                            width="14"
                            height={h}
                            rx="2"
                            fill="#1F5FAD"
                            opacity={idx === 13 ? 1 : 0.8}
                          />
                        </g>
                      );
                    })}
                    <line x1="0" y1="120" x2="340" y2="120" stroke="#CBD5E1" strokeWidth="1" />
                  </svg>
                  <div className="flex justify-between text-[10px] text-steel-400 font-mono mt-1">
                    <span>1 Sep</span>
                    <span>7 Sep</span>
                    <span>14 Sep (Today)</span>
                  </div>
                </div>

                {/* Quota breakdown */}
                <div className="space-y-2 text-[12px] bg-canvas p-3 rounded-lg border border-border">
                  <div className="flex justify-between">
                    <span className="text-secondaryText">Total Allocated Quota:</span>
                    <strong className="text-navy-900 font-mono">135,000 / mo</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondaryText">Current Month Consumption:</span>
                    <strong className="text-blue-600 font-mono">70,520 (52%)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondaryText">Average Latency:</span>
                    <strong className="text-emerald-700 font-mono">184 ms (p95)</strong>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <button
                  onClick={() => showToast('Quota expansion request submitted to DMT Clearinghouse for review')}
                  className="w-full py-2 bg-canvas hover:bg-slate-100 text-primaryText border border-border rounded-lg text-[12px] font-semibold transition-colors cursor-pointer"
                >
                  Request Quota Increase
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
