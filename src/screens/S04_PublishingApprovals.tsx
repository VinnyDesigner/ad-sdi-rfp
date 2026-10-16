import React, { useState } from 'react';
import { ScreenId } from '../types';
import { HeaderWorkspace } from '../components/common/HeaderWorkspace';
import { SidebarWorkspace } from '../components/common/SidebarWorkspace';
import { MicroFooter } from '../components/common/MicroFooter';
import { ClassificationBadge, AudienceChip, StatusPill, ModuleBadge } from '../components/common/BadgesAndPills';
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
} from 'lucide-react';

interface S04Props {
  onNavigate: (screen: ScreenId) => void;
}

export const S04_PublishingApprovals: React.FC<S04Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('My queue');
  const [selectedRowId, setSelectedRowId] = useState<number>(3); // Row 3 "Bus Stops & Routes" selected per spec
  const [approvedSuccess, setApprovedSuccess] = useState(false);

  const stages = [
    { name: 'Provider onboarding', count: null, status: 'done' },
    { name: 'Submitted', count: 24, status: 'done' },
    { name: 'Quality gateway', count: 6, status: 'done' },
    { name: 'Classification & audience', count: 4, status: 'done' },
    { name: 'Custodian approval', count: 5, status: 'current' }, // Gold ring
    { name: 'Published (30 days)', count: 132, status: 'upcoming' },
  ];

  const queueItems = [
    {
      id: 1,
      item: 'Health Clinics Geocoded Register',
      type: 'Dataset',
      entity: 'DoH',
      audience: 'Government',
      stage: 'Quality gateway',
      quality: 'passed',
      waiting: '2h ago',
    },
    {
      id: 2,
      item: 'School Catchment Boundary Models',
      type: 'Product',
      entity: 'ADEK',
      audience: 'Shared',
      stage: 'Classification & audience',
      quality: 'passed',
      waiting: '4h ago',
    },
    {
      id: 3,
      item: 'Bus Stops & Routes — v2027.09',
      type: 'Open release',
      entity: 'DMT',
      audience: 'Open Public',
      stage: 'Custodian approval',
      quality: 'warning',
      waiting: '1d ago',
      selected: true,
    },
    {
      id: 4,
      item: 'Saadiyat Island Utility Corridors',
      type: 'Dataset',
      entity: 'DMT',
      audience: 'Restricted',
      stage: 'Custodian approval',
      quality: 'passed',
      waiting: '1d ago',
    },
    {
      id: 5,
      item: 'High-Resolution Orthomosaic 2027',
      type: 'Service',
      entity: 'DMT',
      audience: 'Government',
      stage: 'Quality gateway',
      quality: 'passed',
      waiting: '2d ago',
    },
    {
      id: 6,
      item: 'Groundwater Monitoring Wells v4',
      type: 'Dataset',
      entity: 'EAD',
      audience: 'Government',
      stage: 'Classification & audience',
      quality: 'passed',
      waiting: '3d ago',
    },
    {
      id: 7,
      item: 'Commercial Licences Spatial Points',
      type: 'Product',
      entity: 'SCAD',
      audience: 'Marketplace',
      stage: 'Custodian approval',
      quality: 'passed',
      waiting: '4d ago',
    },
  ];

  const auditTrail = [
    { time: '14 Sep 09:15', initials: 'FA', name: 'Fatima A.', action: 'Submitted draft release v2027.09' },
    { time: '14 Sep 09:42', initials: 'QG', name: 'Gateway', action: 'Automated ISO Quality Gateway passed' },
    { time: '14 Sep 11:20', initials: 'SA', name: 'Sultan A.', action: 'Classified Open with Legal Clearance' },
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
                <button
                  onClick={() => setActiveTab('My queue')}
                  className={`px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition-colors ${
                    activeTab === 'My queue'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-secondaryText hover:text-navy-900'
                  }`}
                >
                  <span>My queue</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[11px] bg-amber-100 text-amber-800 font-bold">
                    15
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('Submitted by DMT')}
                  className="px-3 py-1.5 rounded-md font-medium text-secondaryText hover:text-navy-900"
                >
                  Submitted by DMT
                </button>
                <button
                  onClick={() => setActiveTab('Published')}
                  className="px-3 py-1.5 rounded-md font-medium text-secondaryText hover:text-navy-900"
                >
                  Published
                </button>
                <button
                  onClick={() => setActiveTab('Withdrawn')}
                  className="px-3 py-1.5 rounded-md font-medium text-secondaryText hover:text-navy-900"
                >
                  Withdrawn
                </button>
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
                    {queueItems.map((q) => {
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
                            <span className="text-[11px] px-2 py-0.5 rounded bg-canvas border border-border text-primaryText">
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
                <span>Showing 7 of 15 pending queue items</span>
                <span className="font-semibold text-navy-900 cursor-pointer hover:underline">
                  View full governance queue →
                </span>
              </div>
            </div>

            {/* Detail Panel (4 cols) */}
            <div className="col-span-4 bg-white rounded-xl border border-border shadow-level-1 p-5 flex flex-col justify-between overflow-hidden relative">
              <div className="space-y-4">
                {/* Title + version + module chip */}
                <div className="space-y-1.5 pb-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800">
                      v2027.09
                    </span>
                    <ModuleBadge moduleKey="F" />
                  </div>
                  <h3 className="text-[17px] font-bold text-navy-900 tracking-tight">
                    Bus Stops & Routes
                  </h3>
                  <div className="text-[11px] text-secondaryText">
                    Publisher: <strong className="text-primaryText">DMT</strong> · Legal Eligibility: Verified
                  </div>
                </div>

                {/* Quality Checks */}
                <div className="space-y-1.5">
                  <div className="text-[12px] font-bold text-navy-900 uppercase tracking-wider">
                    Automated Quality Gates
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                      <span>Schema</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="p-2 rounded bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                      <span>Geometry</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="p-2 rounded bg-amber-50 border border-amber-200 flex items-center justify-between col-span-2">
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        <span className="font-semibold text-amber-900">Topology</span>
                      </div>
                      <span className="text-amber-800 font-bold font-mono">2 sliver warnings</span>
                    </div>
                    <div className="p-2 rounded bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                      <span>Attribute Domains</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="p-2 rounded bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                      <span>Spatial Reference</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                  </div>
                </div>

                {/* Classification & Legal */}
                <div className="p-3 rounded-lg bg-canvas border border-border/80 space-y-1.5 text-[12px]">
                  <div className="flex items-center justify-between">
                    <span className="text-secondaryText">Classification:</span>
                    <ClassificationBadge classification="Open" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondaryText">Audience requested:</span>
                    <AudienceChip audience="Open Public" />
                  </div>
                  <div className="flex items-center justify-between text-emerald-700 font-semibold pt-1 border-t border-border/60">
                    <span>Legal & IP Eligibility:</span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approved for release</span>
                    </span>
                  </div>
                </div>

                {/* Audit Trail */}
                <div className="space-y-1.5">
                  <div className="text-[12px] font-bold text-navy-900 uppercase tracking-wider">
                    Governance Audit Trail
                  </div>
                  <div className="space-y-1 text-[11px]">
                    {auditTrail.map((at, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-secondaryText">
                        <span className="w-5 h-5 rounded-full bg-navy-900 text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0">
                          {at.initials}
                        </span>
                        <span className="font-mono text-[10px] text-steel-400">{at.time.split(' ')[1]}</span>
                        <span className="truncate text-primaryText">{at.action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Approval Actions Block (Approve in hover state per spec) */}
              <div className="pt-3 border-t border-border space-y-2">
                {approvedSuccess ? (
                  <div className="p-2.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-900 text-[12px] font-bold flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Published to Open Data Portal successfully!</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {/* Primary Button (in hover styling per brief) */}
                    <button
                      onClick={() => setApprovedSuccess(true)}
                      className="w-full h-[40px] bg-blue-700 text-white rounded-lg text-[13px] font-semibold flex items-center justify-center gap-2 shadow-level-2 ring-2 ring-blue-400/40 transition-all hover:bg-blue-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Approve for publication</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button className="h-[36px] bg-canvas hover:bg-slate-100 text-primaryText border border-border rounded-lg text-[12px] font-medium transition-colors">
                        Return with comments
                      </button>
                      <button className="h-[36px] hover:bg-rose-50 text-danger border border-rose-200 rounded-lg text-[12px] font-medium transition-colors">
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
    </div>
  );
};
