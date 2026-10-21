import React, { useState } from 'react';
import { ScreenId } from '../types';
import { HeaderWorkspace } from '../components/common/HeaderWorkspace';
import { SidebarWorkspace } from '../components/common/SidebarWorkspace';
import { MicroFooter } from '../components/common/MicroFooter';
import { ClassificationBadge, AudienceChip, StatusPill, ModuleBadge } from '../components/common/BadgesAndPills';
import { InteractiveMap } from '../components/common/InteractiveMap';
import { PERSONAS } from '../constants/tokens';
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Shield,
  FileCheck2,
  ChevronRight,
  User,
  XCircle,
  RotateCcw,
  Sparkles,
  Map as MapIcon,
  MessageSquare,
  X,
} from 'lucide-react';

interface S04Props {
  onNavigate: (screen: ScreenId) => void;
}

export const S04_PublishingApprovals: React.FC<S04Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('My queue');
  const [selectedRowId, setSelectedRowId] = useState<number>(3); // Row 3 "Bus Stops & Routes" selected per spec
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);
  const [commentsText, setCommentsText] = useState('Topology sliver detected along sector E-12 boundary. Please snap nodes to standard 1:1000 cadastre.');
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('Incomplete metadata and non-compliant CRS definition');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const [stages, setStages] = useState([
    { name: 'Provider onboarding', count: null, status: 'done' },
    { name: 'Submitted', count: 24, status: 'done' },
    { name: 'Quality gateway', count: 6, status: 'done' },
    { name: 'Classification & audience', count: 4, status: 'done' },
    { name: 'Custodian approval', count: 5, status: 'current' }, // Gold ring
    { name: 'Published (30 days)', count: 132, status: 'upcoming' },
  ]);

  const [queueItems, setQueueItems] = useState([
    {
      id: 1,
      item: 'Health Clinics Geocoded Register',
      type: 'Dataset',
      version: 'v2027.02',
      entity: 'DoH',
      audience: 'Government',
      classification: 'Confidential' as const,
      stage: 'Quality gateway',
      quality: 'passed',
      waiting: '2h ago',
      status: 'pending',
    },
    {
      id: 2,
      item: 'School Catchment Boundary Models',
      type: 'Product',
      version: 'v1.4',
      entity: 'ADEK',
      audience: 'Shared',
      classification: 'Shared' as const,
      stage: 'Classification & audience',
      quality: 'passed',
      waiting: '4h ago',
      status: 'pending',
    },
    {
      id: 3,
      item: 'Bus Stops & Routes — v2027.09',
      type: 'Open release',
      version: 'v2027.09',
      entity: 'DMT',
      audience: 'Open Public',
      classification: 'Open' as const,
      stage: 'Custodian approval',
      quality: 'warning',
      waiting: '1d ago',
      status: 'pending',
    },
    {
      id: 4,
      item: 'Saadiyat Island Utility Corridors',
      type: 'Dataset',
      version: 'v3.1',
      entity: 'DMT',
      audience: 'Restricted',
      classification: 'Restricted' as const,
      stage: 'Custodian approval',
      quality: 'passed',
      waiting: '1d ago',
      status: 'pending',
    },
    {
      id: 5,
      item: 'High-Resolution Orthomosaic 2027',
      type: 'Service',
      version: 'v2027.1',
      entity: 'DMT',
      audience: 'Government',
      classification: 'Restricted' as const,
      stage: 'Quality gateway',
      quality: 'passed',
      waiting: '2d ago',
      status: 'pending',
    },
    {
      id: 6,
      item: 'Groundwater Monitoring Wells v4',
      type: 'Dataset',
      version: 'v4.0',
      entity: 'EAD',
      audience: 'Government',
      classification: 'Shared' as const,
      stage: 'Classification & audience',
      quality: 'passed',
      waiting: '3d ago',
      status: 'pending',
    },
    {
      id: 7,
      item: 'Commercial Licences Spatial Points',
      type: 'Product',
      version: 'v2.8',
      entity: 'SCAD',
      audience: 'Marketplace',
      classification: 'Shared' as const,
      stage: 'Custodian approval',
      quality: 'passed',
      waiting: '4d ago',
      status: 'pending',
    },
  ]);

  const currentItem = queueItems.find((q) => q.id === selectedRowId) || queueItems[2];

  const handleApprove = () => {
    setQueueItems((prev) =>
      prev.map((q) => (q.id === currentItem.id ? { ...q, status: 'approved', stage: 'Published' } : q))
    );
    setStages((prev) =>
      prev.map((s) => (s.name.includes('Published') ? { ...s, count: (s.count ?? 132) + 1 } : s))
    );
    showToast(`Approved "${currentItem.item}" for publication to Open Data Portal!`);
  };

  const handleReturnWithComments = () => {
    setQueueItems((prev) =>
      prev.map((q) => (q.id === currentItem.id ? { ...q, status: 'returned', stage: 'Returned to Custodian' } : q))
    );
    setCommentsModalOpen(false);
    showToast(`Returned "${currentItem.item}" to ${currentItem.entity} with comments.`);
  };

  const handleReject = () => {
    setQueueItems((prev) =>
      prev.map((q) => (q.id === currentItem.id ? { ...q, status: 'rejected', stage: 'Rejected' } : q))
    );
    setRejectModalOpen(false);
    showToast(`Rejected "${currentItem.item}". Logged in Sovereign Audit Trail.`);
  };

  const auditTrail = [
    { time: '14 Sep 09:15', initials: 'FA', name: 'Fatima A.', action: `Submitted draft release ${currentItem.version}` },
    { time: '14 Sep 09:42', initials: 'QG', name: 'Gateway', action: 'Automated ISO Quality Gateway passed' },
    { time: '14 Sep 11:20', initials: 'SA', name: 'Sultan A.', action: `Classified ${currentItem.classification} with Legal Clearance` },
    { time: '14 Sep 14:05', initials: 'KM', name: 'Khalid M.', action: 'Assigned to Khalid M. for final approval' },
  ];

  return (
    <div className="w-full h-screen bg-canvas flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Workspace Top Bar (64 px) with Khalid M. persona */}
      <HeaderWorkspace
        currentScreen="S04_PublishingApprovals"
        onNavigate={onNavigate}
        persona={PERSONAS.khalid}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* 2. Left Workspace Sidebar (240 px) */}
        <SidebarWorkspace currentScreen="S04_PublishingApprovals" onNavigate={onNavigate} />

        {/* 3. Main Workspace Content */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-canvas">
          {/* Page Header (approx 74 px) */}
          <div className="px-8 pt-4 pb-2 bg-white border-b border-border space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[24px] font-bold text-navy-900 tracking-tight">
                  Publishing & Approvals
                </h1>
                <p className="text-[13px] text-secondaryText">
                  Every dataset, service and product passes quality, classification and approval before release.
                </p>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 bg-canvas p-1 rounded-lg border border-border text-[13px]">
                {[
                  { name: 'My queue', count: queueItems.filter(q => q.status === 'pending').length },
                  { name: 'Submitted by DMT', count: queueItems.filter(q => q.entity === 'DMT').length },
                  { name: 'Published', count: queueItems.filter(q => q.status === 'approved').length },
                  { name: 'Withdrawn', count: queueItems.filter(q => q.status === 'rejected' || q.status === 'returned').length },
                ].map((t) => (
                  <button
                    key={t.name}
                    onClick={() => setActiveTab(t.name)}
                    className={`px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition-colors ${
                      activeTab === t.name
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-secondaryText hover:text-navy-900'
                    }`}
                  >
                    <span>{t.name}</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[11px] bg-amber-100 text-amber-800 font-bold">
                      {t.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Flow Tracker Card (Full width, 104 px) */}
          <div className="px-8 pt-4">
            <div className="h-[96px] bg-white rounded-xl border border-border shadow-level-1 px-6 flex items-center justify-between">
              {stages.map((st, sIdx) => {
                const isCurrent = st.status === 'current';
                const isDone = st.status === 'done';

                return (
                  <React.Fragment key={sIdx}>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold transition-all ${
                          isCurrent
                            ? 'bg-navy-900 text-white ring-4 ring-gold-500 shadow-md'
                            : isDone
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                            : 'bg-canvas text-secondaryText border border-border'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : sIdx + 1}
                      </div>

                      <div className="text-left">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[13px] font-semibold ${
                              isCurrent ? 'text-navy-900 font-bold' : isDone ? 'text-primaryText' : 'text-secondaryText'
                            }`}
                          >
                            {st.name}
                          </span>
                          {st.count !== null && (
                            <span
                              className={`text-[11px] font-mono px-1.5 py-0.2 rounded font-bold ${
                                isCurrent
                                  ? 'bg-gold-500 text-navy-900'
                                  : 'bg-canvas text-secondaryText border border-border'
                              }`}
                            >
                              {st.count}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-secondaryText">
                          {isCurrent ? 'Pending your review' : isDone ? 'Completed gate' : 'Next milestone'}
                        </div>
                      </div>
                    </div>

                    {sIdx < stages.length - 1 && (
                      <div className="flex-1 max-w-[50px] h-[1.5px] bg-steel-400/40 mx-2" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Queue Table (8 cols) & Detail Panel (4 cols) */}
          <div className="flex-1 px-8 py-4 grid grid-cols-12 gap-6 overflow-hidden">
            {/* Table (8 cols) */}
            <div className="col-span-8 bg-white rounded-xl border border-border shadow-level-1 overflow-hidden flex flex-col justify-between">
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-canvas/70 text-[11px] font-bold text-secondaryText uppercase tracking-wider">
                      <th className="py-2.5 px-4">Item & Version</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Entity</th>
                      <th className="py-2.5 px-3">Audience</th>
                      <th className="py-2.5 px-3">Stage</th>
                      <th className="py-2.5 px-3">Quality</th>
                      <th className="py-2.5 px-3">Waiting</th>
                      <th className="py-2.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 text-[12px]">
                    {queueItems
                      .filter((q) => {
                        if (activeTab === 'My queue') return q.status === 'pending';
                        if (activeTab === 'Submitted by DMT') return q.entity === 'DMT';
                        if (activeTab === 'Published') return q.status === 'approved' || q.stage === 'Published';
                        if (activeTab === 'Withdrawn') return q.status === 'rejected' || q.status === 'returned';
                        return true;
                      })
                      .map((q) => {
                        const isSelected = selectedRowId === q.id;

                        return (
                          <tr
                            key={q.id}
                            onClick={() => setSelectedRowId(q.id)}
                            className={`cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-blue-50/60 font-semibold'
                                : 'hover:bg-canvas/50'
                            }`}
                          >
                            <td className="py-2.5 px-4">
                              <div className="flex items-center gap-2">
                                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                                <span className={`text-[13px] ${isSelected ? 'text-blue-700 font-bold' : 'text-primaryText'}`}>
                                  {q.item}
                                </span>
                              </div>
                            </td>
                            <td className="py-2.5 px-3 text-secondaryText">{q.type}</td>
                            <td className="py-2.5 px-3 font-semibold text-primaryText">{q.entity}</td>
                            <td className="py-2.5 px-3">
                              <AudienceChip audience={q.audience} />
                            </td>
                            <td className="py-2.5 px-3">
                              <span className={`text-[11px] px-2 py-0.5 rounded border ${
                                q.status === 'approved'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-bold'
                                  : q.status === 'rejected'
                                  ? 'bg-rose-50 text-rose-800 border-rose-200'
                                  : 'bg-canvas border-border text-primaryText'
                              }`}>
                                {q.stage}
                              </span>
                            </td>
                            <td className="py-2.5 px-3">
                              {q.quality === 'passed' ? (
                                <span className="text-emerald-600 flex items-center gap-1 font-bold">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Passed</span>
                                </span>
                              ) : (
                                <span className="text-amber-600 flex items-center gap-1 font-bold">
                                  <AlertTriangle className="w-3.5 h-3.5" />
                                  <span>2 warnings</span>
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 px-3 font-mono text-[11px] text-secondaryText">{q.waiting}</td>
                            <td className="py-2.5 px-4 text-right">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedRowId(q.id);
                                }}
                                className="text-[12px] font-bold text-blue-600 hover:underline"
                              >
                                Review
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="p-3 border-t border-border bg-canvas/40 flex items-center justify-between text-[11px] text-secondaryText">
                <span>Showing items in filter: {activeTab}</span>
                <span
                  onClick={() => setActiveTab('My queue')}
                  className="font-semibold text-navy-900 cursor-pointer hover:underline"
                >
                  View full governance queue →
                </span>
              </div>
            </div>

            {/* Detail Panel (4 cols) */}
            <div className="col-span-4 bg-white rounded-xl border border-border shadow-level-1 p-4 flex flex-col justify-between overflow-y-auto relative">
              <div className="space-y-3.5">
                {/* Title + version + module chip */}
                <div className="space-y-1 pb-2 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800">
                      {currentItem.version}
                    </span>
                    <ModuleBadge moduleKey="F" />
                    <span className={`px-2 py-0.2 rounded text-[10px] font-mono ${
                      currentItem.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {currentItem.status.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-[16px] font-bold text-navy-900 tracking-tight leading-snug">
                    {currentItem.item}
                  </h3>
                  <div className="text-[11px] text-secondaryText">
                    Publisher: <strong className="text-primaryText">{currentItem.entity}</strong> · Legal Eligibility: Verified
                  </div>
                </div>

                {/* Real Interactive GIS Map Preview Box */}
                <div className="rounded-lg border border-border overflow-hidden bg-slate-900 relative">
                  <div className="h-[120px] w-full relative">
                    <InteractiveMap mode="parcels" isDarkTheme={false} height="100%" />
                    <div className="absolute top-1.5 left-1.5 bg-navy-900/85 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-0.5 rounded border border-white/20 z-10 pointer-events-none flex items-center gap-1">
                      <MapIcon className="w-3 h-3 text-[#E5A817]" />
                      <span>GIS Geometry & Topology Gate</span>
                    </div>
                  </div>
                </div>

                {/* Quality Checks */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-navy-900 uppercase tracking-wider">
                    Automated Quality Gates
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                    <div className="p-1.5 rounded bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                      <span>Schema</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="p-1.5 rounded bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                      <span>Geometry</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className={`p-1.5 rounded border flex items-center justify-between col-span-2 ${
                      currentItem.quality === 'warning'
                        ? 'bg-amber-50 border-amber-200'
                        : 'bg-emerald-50/60 border-emerald-100'
                    }`}>
                      <div className="flex items-center gap-1.5">
                        {currentItem.quality === 'warning' ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                        <span className={`font-semibold ${currentItem.quality === 'warning' ? 'text-amber-900' : 'text-emerald-900'}`}>
                          Topology
                        </span>
                      </div>
                      <span className={`font-bold font-mono text-[10px] ${currentItem.quality === 'warning' ? 'text-amber-800' : 'text-emerald-700'}`}>
                        {currentItem.quality === 'warning' ? '2 sliver warnings' : '0 errors'}
                      </span>
                    </div>
                    <div className="p-1.5 rounded bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                      <span>Attribute Domains</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="p-1.5 rounded bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                      <span>Spatial Reference</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                  </div>
                </div>

                {/* Classification & Legal */}
                <div className="p-2.5 rounded-lg bg-canvas border border-border/80 space-y-1 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-secondaryText">Classification:</span>
                    <ClassificationBadge classification={currentItem.classification} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondaryText">Audience requested:</span>
                    <AudienceChip audience={currentItem.audience} />
                  </div>
                </div>

                {/* Audit Trail */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-navy-900 uppercase tracking-wider">
                    Governance Audit Trail
                  </div>
                  <div className="space-y-1 text-[10px]">
                    {auditTrail.map((at, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-secondaryText">
                        <span className="w-4 h-4 rounded-full bg-navy-900 text-white text-[8px] font-bold flex items-center justify-center flex-shrink-0">
                          {at.initials}
                        </span>
                        <span className="font-mono text-steel-400">{at.time.split(' ')[1]}</span>
                        <span className="truncate text-primaryText">{at.action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Approval Actions Block */}
              <div className="pt-3 border-t border-border space-y-2">
                {currentItem.status === 'approved' ? (
                  <div className="p-2.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-900 text-[12px] font-bold flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Published to Sovereign Portal!</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={handleApprove}
                      className="w-full h-[38px] bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-[13px] font-semibold flex items-center justify-center gap-2 shadow-level-2 ring-2 ring-blue-400/40 transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Approve for publication</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setCommentsModalOpen(true)}
                        className="h-[34px] bg-canvas hover:bg-slate-100 text-primaryText border border-border rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        Return with comments
                      </button>
                      <button
                        onClick={() => setRejectModalOpen(true)}
                        className="h-[34px] hover:bg-rose-50 text-danger border border-rose-200 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Micro Footer */}
          <MicroFooter />
        </div>
      </div>

      {/* Return with Comments Modal */}
      {commentsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-level-4 border border-border max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-[16px] text-navy-900">Return to Custodian</h3>
              </div>
              <button
                onClick={() => setCommentsModalOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-steel-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-[13px]">
              <div className="text-secondaryText">
                Dataset: <strong className="text-primaryText">{currentItem.item}</strong> ({currentItem.entity})
              </div>
              <label className="block font-semibold text-primaryText text-[12px]">
                Revision Comments & Gate Findings
              </label>
              <textarea
                value={commentsText}
                onChange={(e) => setCommentsText(e.target.value)}
                rows={4}
                className="w-full p-3 rounded-xl border border-border text-[12px] text-primaryText focus:outline-none focus:border-blue-600 font-sans"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <button
                onClick={() => setCommentsModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-border text-[12px] font-medium text-secondaryText hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReturnWithComments}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold"
              >
                Submit & Return to DMT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-level-4 border border-rose-200 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center gap-2 text-danger">
                <XCircle className="w-5 h-5 text-danger" />
                <h3 className="font-bold text-[16px] text-navy-900">Reject Publication</h3>
              </div>
              <button
                onClick={() => setRejectModalOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-steel-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-[13px]">
              <p className="text-secondaryText">
                Are you sure you want to reject <strong className="text-primaryText">{currentItem.item}</strong>? This will notify the publisher and archive the submission.
              </p>
              <div>
                <label className="block font-semibold text-primaryText text-[12px] mb-1">
                  Reason for Rejection
                </label>
                <select
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-border text-[12px] text-primaryText focus:outline-none"
                >
                  <option value="Incomplete metadata and non-compliant CRS definition">Incomplete metadata and non-compliant CRS definition</option>
                  <option value="Topology & geometric errors exceed threshold">Topology & geometric errors exceed threshold</option>
                  <option value="Legal or classification conflict with national security policy">Legal or classification conflict with national security policy</option>
                  <option value="Duplicate dataset already published in Sovereign Clearinghouse">Duplicate dataset already published in Sovereign Clearinghouse</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <button
                onClick={() => setRejectModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-border text-[12px] font-medium text-secondaryText hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[12px] font-bold"
              >
                Confirm Rejection
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
