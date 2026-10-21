import React, { useState } from 'react';
import { ScreenId } from '../types';
import { HeaderWorkspace } from '../components/common/HeaderWorkspace';
import { SidebarWorkspace } from '../components/common/SidebarWorkspace';
import { MicroFooter } from '../components/common/MicroFooter';
import { ClassificationBadge, StatusPill } from '../components/common/BadgesAndPills';
import {
  ShieldCheck,
  Lock,
  Key,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  ChevronDown,
  ChevronUp,
  Search,
  UserPlus,
  ShieldAlert,
} from 'lucide-react';

interface S14Props {
  onNavigate: (screen: ScreenId) => void;
}

export const S14_SecurityAccessConsole: React.FC<S14Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [expandedRequestId, setExpandedRequestId] = useState<number | null>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const complianceBadges = [
    'UAE Data Residency',
    'Approved Gov Hosting',
    'Encrypted Transit & Rest',
    'SOC Security Monitoring',
    'Per-Release Cyber Sign-off',
    'Pen Test Passed (Jul 2027)',
  ];

  const kpis = [
    { label: 'Active users', val: '4,820', sub: 'Across 64 entities' },
    { label: 'Datasets classified', val: '100%', sub: '2,480 catalogued assets' },
    { label: 'Access requests pending', val: '17', sub: 'Action required' },
    { label: 'Blocked attempts (30 d)', val: '23', sub: 'Zero breaches detected' },
    { label: 'MFA enforcement', val: '100%', sub: 'Privileged & partner accounts' },
  ];

  const [requests, setRequests] = useState([
    {
      id: 1,
      requester: 'Mona K.',
      entity: 'ADEK',
      dataset: 'High-Voltage Power Grid',
      classification: 'Restricted' as const,
      purpose: 'School safety boundary and electromagnetic setback planning.',
      agreement: 'DSA-2027-021',
      approver: 'Khalid M.',
      waiting: '3h ago',
    },
    {
      id: 2,
      requester: 'Tariq H.',
      entity: 'DoH',
      dataset: 'Building Footprints 3D',
      classification: 'Shared' as const,
      purpose: 'Emergency medical dispatch 3D routing and helicopter landing.',
      agreement: 'DSA-2027-018',
      approver: 'Khalid M.',
      waiting: '1d ago',
    },
    {
      id: 3,
      requester: 'Zaid B.',
      entity: 'EcoSpatial UAE',
      dataset: 'Underground Aquifers',
      classification: 'Confidential' as const,
      purpose: 'Groundwater recharge modeling for municipal conservation.',
      agreement: 'DSA-2027-029',
      approver: 'Security Board',
      waiting: '2d ago',
    },
    {
      id: 4,
      requester: 'Sara N.',
      entity: 'SCAD',
      dataset: 'Land Parcels API',
      classification: 'Shared' as const,
      purpose: 'Commercial establishment economic spatial census.',
      agreement: 'DSA-2027-014',
      approver: 'Khalid M.',
      waiting: '3d ago',
    },
    {
      id: 5,
      requester: 'Hamad A.',
      entity: 'ADCD',
      dataset: 'Chemical Storage Points',
      classification: 'Restricted' as const,
      purpose: 'Civil defence emergency hazardous response mapping.',
      agreement: 'DSA-2027-033',
      approver: 'Security Board',
      waiting: '4d ago',
    },
  ]);

  const rolesMatrix = [
    { role: 'Data Steward', discover: true, view: true, export: true, edit: true, admin: false },
    { role: 'GIS Specialist', discover: true, view: true, export: true, edit: false, admin: false },
    { role: 'Decision Maker', discover: true, view: true, export: false, edit: false, admin: false },
    { role: 'Approved Partner', discover: true, view: true, export: false, edit: false, admin: false },
    { role: 'Platform Admin', discover: true, view: true, export: true, edit: true, admin: true },
  ];

  const auditLogs = [
    { time: '14 Sep 12:44', user: 'fatima.a@dmt', action: 'API Token Rotated', res: 'Land Parcels WFS', result: 'Allowed' },
    { time: '14 Sep 12:38', user: 'ext.partner@geox', action: 'Direct SQL Query', res: 'Underground Utilities', result: 'Denied' },
    { time: '14 Sep 12:15', user: 'mona.k@adek', action: 'Export GeoJSON (5k)', res: 'Schools Catchment', result: 'Allowed' },
    { time: '14 Sep 11:50', user: 'unknown@194.22', action: 'Brute Force SSH', res: 'GeoAI Node 04', result: 'Denied' },
    { time: '14 Sep 11:22', user: 'khalid.m@dmt', action: 'Publish Approved', res: 'Bus Stops v2027.09', result: 'Allowed' },
    { time: '14 Sep 10:45', user: 'partner@unverified', action: 'Access Restricted', res: 'DSA-2027-021 Dataset', result: 'Denied' },
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

      {/* 1. Workspace Top Bar */}
      <HeaderWorkspace currentScreen="S14_SecurityAccessConsole" onNavigate={onNavigate} />

      <div className="flex-1 flex overflow-hidden">
        {/* 2. Left Sidebar (Security Active) */}
        <SidebarWorkspace currentScreen="S14_SecurityAccessConsole" onNavigate={onNavigate} />

        {/* 3. Main Workspace Area */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-canvas">
          {/* Header */}
          <div className="px-8 pt-4 pb-2 bg-white border-b border-border flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-[24px] font-bold text-navy-900 tracking-tight">
                  Security & Access Console
                </h1>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-navy-900 text-gold-500 border border-gold-500/30">
                  Zero Trust Gov Mesh
                </span>
              </div>
              <p className="text-[13px] text-secondaryText">
                Classification, access control and audit across every dataset and service.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-canvas p-1 rounded-lg border border-border text-[12px]">
                {['Overview', 'Access requests', 'Roles', 'Classification', 'Audit log'].map((t) => (
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
              <button className="px-3.5 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-[12px] font-semibold flex items-center gap-1.5 shadow-sm">
                <UserPlus className="w-3.5 h-3.5 text-gold-500" />
                <span>Add User / Key</span>
              </button>
            </div>
          </div>

          {/* Compliance Strip (48 px white card with 6 outline badges per spec) */}
          <div className="px-8 pt-3">
            <div className="h-[46px] bg-white rounded-xl border border-border shadow-level-1 px-4 flex items-center justify-between">
              {complianceBadges.map((badge, bi) => (
                <div
                  key={bi}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-emerald-200 bg-emerald-50/50 text-[11px] font-semibold text-emerald-800"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 1: KPI Row (5 cards) */}
          <div className="px-8 pt-3 grid grid-cols-5 gap-3.5">
            {kpis.map((kpi, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-border shadow-level-1 p-3 flex flex-col justify-between"
              >
                <div className="text-[11px] font-semibold text-secondaryText uppercase tracking-wider">
                  {kpi.label}
                </div>
                <div className="text-[24px] font-bold text-navy-900 font-mono tabular-nums tracking-tight">
                  {kpi.val}
                </div>
                <div className="text-[10px] text-steel-500 font-medium">{kpi.sub}</div>
              </div>
            ))}
          </div>

          {/* Row 2 (248 px): Donut & Release Gate (4 cols) | Access Requests Table (8 cols) */}
          <div className="px-8 pt-3 grid grid-cols-12 gap-4">
            {/* Left 4 cols: Classification Donut + Release Gate */}
            <div className="col-span-4 bg-white rounded-xl border border-border shadow-level-1 p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-1 border-b border-border">
                <span className="text-[12px] font-bold text-navy-900 uppercase tracking-wider">
                  Data Classification Breakdown
                </span>
                <span className="text-[10px] text-emerald-700 font-bold">100% Audited</span>
              </div>

              {/* Classification mini bars */}
              <div className="space-y-1.5 text-[11px] my-1">
                <div className="flex justify-between">
                  <span className="text-secondaryText flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                    <span>Open Public</span>
                  </span>
                  <strong className="font-mono text-primaryText">26% (640)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondaryText flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-blue-600" />
                    <span>Shared Government</span>
                  </span>
                  <strong className="font-mono text-primaryText">54% (1,340)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondaryText flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
                    <span>Restricted Strategic</span>
                  </span>
                  <strong className="font-mono text-primaryText">17% (420)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondaryText flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-rose-600" />
                    <span>Confidential Defense</span>
                  </span>
                  <strong className="font-mono text-primaryText">3% (80)</strong>
                </div>
              </div>

              {/* Bottom half: Release R-2027.09 security gate per spec */}
              <div className="pt-2 border-t border-border space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-navy-900">
                  <span>Release R-2027.09 Security Gate</span>
                  <span className="text-blue-600 font-mono">Stage 3 of 4</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-secondaryText pt-1">
                  <span className="text-emerald-700 font-bold">1. Assess ✓</span>
                  <span className="text-emerald-700 font-bold">2. Pen Test ✓</span>
                  <span className="text-amber-600 font-bold">3. Whitelist ⧗</span>
                  <span>4. Sign-off ○</span>
                </div>
              </div>
            </div>

            {/* Right 8 cols: Access Requests Table */}
            <div className="col-span-8 bg-white rounded-xl border border-border shadow-level-1 p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-1 border-b border-border">
                <span className="text-[12px] font-bold text-navy-900 uppercase tracking-wider">
                  Pending Cross-Entity Access Requests (17)
                </span>
                <span className="text-[11px] text-blue-600 font-semibold cursor-pointer">
                  Batch Approve Selected →
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-border text-[9px] text-secondaryText uppercase tracking-wider">
                      <th className="py-1 px-2">Requester</th>
                      <th className="py-1 px-2">Entity</th>
                      <th className="py-1 px-3">Dataset</th>
                      <th className="py-1 px-2">Class</th>
                      <th className="py-1 px-2">Approver</th>
                      <th className="py-1 px-2">Waiting</th>
                      <th className="py-1 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {requests.map((req) => {
                      const isExpanded = expandedRequestId === req.id;

                      return (
                        <React.Fragment key={req.id}>
                          <tr
                            onClick={() => setExpandedRequestId(isExpanded ? null : req.id)}
                            className={`cursor-pointer hover:bg-canvas/50 ${isExpanded ? 'bg-blue-50/40' : ''}`}
                          >
                            <td className="py-1.5 px-2 font-bold text-navy-900">{req.requester}</td>
                            <td className="py-1.5 px-2 font-semibold text-primaryText">{req.entity}</td>
                            <td className="py-1.5 px-3 font-medium text-navy-900">{req.dataset}</td>
                            <td className="py-1.5 px-2">
                              <ClassificationBadge classification={req.classification} />
                            </td>
                            <td className="py-1.5 px-2 text-secondaryText">{req.approver}</td>
                            <td className="py-1.5 px-2 font-mono text-secondaryText">{req.waiting}</td>
                            <td className="py-1.5 px-2 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setRequests((prev) => prev.filter((r) => r.id !== req.id));
                                    showToast(`Access request for ${req.dataset} approved!`);
                                  }}
                                  className="p-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 cursor-pointer"
                                  title="Approve"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setRequests((prev) => prev.filter((r) => r.id !== req.id));
                                    showToast(`Access request for ${req.dataset} rejected`);
                                  }}
                                  className="p-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 cursor-pointer"
                                  title="Reject"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>

                          {/* Expanded Purpose & DSA per spec */}
                          {isExpanded && (
                            <tr className="bg-blue-50/50">
                              <td colSpan={7} className="px-4 py-2 border-b border-border/80">
                                <div className="text-[11px] text-navy-900 space-y-1">
                                  <div className="flex items-center gap-2">
                                    <strong className="text-secondaryText">Declared Purpose:</strong>
                                    <span>{req.purpose}</span>
                                  </div>
                                  <div className="flex items-center gap-4 text-[10px] text-steel-500 font-mono">
                                    <span>Linked Agreement: <strong className="text-blue-700 font-bold">{req.agreement}</strong></span>
                                    <span>Data Handling Tier: Secret Clearance</span>
                                    <span>Audited by: DGE Sovereign Trust Office</span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Row 3 (248 px): Access Model Roles (5 cols) | Audit Log Stream (7 cols) */}
          <div className="px-8 py-3 grid grid-cols-12 gap-4">
            {/* Left 5 cols: Access Model Role Matrix */}
            <div className="col-span-5 bg-white rounded-xl border border-border shadow-level-1 p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-1 border-b border-border">
                <span className="text-[12px] font-bold text-navy-900 uppercase tracking-wider">
                  Role-Based Permission Matrix (RBAC)
                </span>
                <span className="text-[10px] font-mono text-steel-500">5 System Roles</span>
              </div>

              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className="border-b border-border text-[9px] text-secondaryText uppercase tracking-wider">
                    <th className="py-1">Role</th>
                    <th className="py-1 text-center">Discover</th>
                    <th className="py-1 text-center">View Map</th>
                    <th className="py-1 text-center">Export</th>
                    <th className="py-1 text-center">Edit</th>
                    <th className="py-1 text-center">Admin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {rolesMatrix.map((rm, idx) => (
                    <tr key={idx} className="hover:bg-canvas/40">
                      <td className="py-1 font-semibold text-primaryText">{rm.role}</td>
                      <td className="py-1 text-center text-emerald-600 font-bold">{rm.discover ? '✓' : '—'}</td>
                      <td className="py-1 text-center text-emerald-600 font-bold">{rm.view ? '✓' : '—'}</td>
                      <td className="py-1 text-center text-emerald-600 font-bold">{rm.export ? '✓' : '—'}</td>
                      <td className="py-1 text-center text-emerald-600 font-bold">{rm.edit ? '✓' : '—'}</td>
                      <td className="py-1 text-center text-emerald-600 font-bold">{rm.admin ? '✓' : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pt-1.5 border-t border-border flex items-center gap-1.5 text-[10px] text-steel-500 flex-wrap">
                <span className="font-semibold text-navy-900">+ Dynamic rules:</span>
                <span className="px-1.5 py-0.2 rounded bg-canvas border">Classification</span>
                <span className="px-1.5 py-0.2 rounded bg-canvas border">Entity</span>
                <span className="px-1.5 py-0.2 rounded bg-canvas border">Purpose</span>
                <span className="px-1.5 py-0.2 rounded bg-canvas border">Audience</span>
              </div>
            </div>

            {/* Right 7 cols: Audit Log Stream (6 rows per spec, including 1 Denied restricted dataset) */}
            <div className="col-span-7 bg-white rounded-xl border border-border shadow-level-1 p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-1 border-b border-border">
                <span className="text-[12px] font-bold text-navy-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-steel-400" />
                  <span>Real-Time Sovereign Audit Log Stream</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-600">● Live Streaming</span>
              </div>

              <div className="divide-y divide-border/60 text-[11px] font-mono">
                {auditLogs.map((log, li) => {
                  const isDenied = log.result === 'Denied';

                  return (
                    <div key={li} className="py-1 flex items-center justify-between">
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-steel-400 text-[10px]">{log.time}</span>
                        <span className="font-semibold text-navy-900 truncate max-w-[140px]">
                          {log.user}
                        </span>
                        <span className="text-secondaryText truncate max-w-[120px]">{log.action}</span>
                        <span className="text-steel-500 truncate max-w-[150px]">{log.res}</span>
                      </div>

                      <div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isDenied
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {log.result}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-1.5 border-t border-border flex items-center justify-between text-[10px] text-steel-500">
                <span>Tamper-evident cryptographic log chaining enabled</span>
                <span className="font-semibold text-blue-600 cursor-pointer hover:underline">
                  Export SIEM / Splunk feed →
                </span>
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
