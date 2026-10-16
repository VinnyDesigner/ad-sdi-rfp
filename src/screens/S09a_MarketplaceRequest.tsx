import React, { useState } from 'react';
import { ScreenId } from '../types';
import { S08_MarketplaceCatalogue } from './S08_MarketplaceCatalogue';
import { CheckCircle2, ChevronRight, X, Building, ShieldCheck, Check } from 'lucide-react';
import { ClassificationBadge } from '../components/common/BadgesAndPills';

interface S09aProps {
  onNavigate: (screen: ScreenId) => void;
}

export const S09a_MarketplaceRequest: React.FC<S09aProps> = ({ onNavigate }) => {
  const [intendedUse, setIntendedUse] = useState('Urban planning');
  const [projectDesc, setProjectDesc] = useState(
    'Integration into Abu Dhabi Waterfront Masterplan visual analytics and environmental impact assessment.'
  );
  const [acceptLicence, setAcceptLicence] = useState(true);
  const [acceptAgreement, setAcceptAgreement] = useState(true);
  const [volume, setVolume] = useState('50,000 API calls / month');

  const steps = [
    { num: 1, label: 'Choose plan', status: 'done' },
    { num: 2, label: 'Purpose & licence', status: 'current' },
    { num: 3, label: 'Subscription', status: 'upcoming' },
    { num: 4, label: 'Approval', status: 'upcoming' },
  ];

  return (
    <div className="w-full h-screen relative overflow-hidden select-none font-sans">
      {/* Dimmed Background: S08 in Navy 900 at 50% per brief */}
      <div className="absolute inset-0 pointer-events-none opacity-40 filter blur-[1px]">
        <S08_MarketplaceCatalogue onNavigate={() => {}} />
      </div>

      {/* Dim overlay */}
      <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm z-30 flex items-center justify-center">
        {/* Modal 720 × 640 Centered */}
        <div className="w-[720px] h-[640px] bg-white rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col justify-between z-40 animate-fade-in">
          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-border bg-canvas/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <h2 className="text-[16px] font-bold text-navy-900 tracking-tight">
                Request Access: Building Footprints 3D
              </h2>
            </div>
            <button
              onClick={() => onNavigate('S08_MarketplaceCatalogue')}
              className="text-steel-400 hover:text-navy-900 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper (4 steps) */}
          <div className="px-8 py-3 bg-white border-b border-border flex items-center justify-between text-[12px]">
            {steps.map((st, idx) => (
              <React.Fragment key={idx}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      st.status === 'done'
                        ? 'bg-emerald-600 text-white'
                        : st.status === 'current'
                        ? 'bg-blue-600 text-white ring-2 ring-blue-200'
                        : 'bg-canvas text-secondaryText border border-border'
                    }`}
                  >
                    {st.status === 'done' ? <Check className="w-3.5 h-3.5" /> : st.num}
                  </div>
                  <span
                    className={`font-semibold ${
                      st.status === 'current' ? 'text-navy-900 font-bold' : 'text-secondaryText'
                    }`}
                  >
                    {st.label}
                  </span>
                </div>
                {idx < steps.length - 1 && <div className="flex-1 h-[1px] bg-border mx-3" />}
              </React.Fragment>
            ))}
          </div>

          {/* Modal Body: Left Form (flex-1) · Right Summary Card (240 px) */}
          <div className="flex-1 p-6 flex gap-6 overflow-y-auto">
            {/* Left Form */}
            <div className="flex-1 space-y-3.5 text-[12px]">
              {/* Organisation */}
              <div>
                <label className="text-[11px] font-semibold text-secondaryText uppercase block mb-1">
                  Requesting Entity / Organisation
                </label>
                <div className="p-2.5 rounded-lg bg-canvas border border-border flex items-center justify-between">
                  <span className="font-semibold text-primaryText">GeoAnalytics LLC (Approved Partner)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                </div>
              </div>

              {/* Intended Use */}
              <div>
                <label className="text-[11px] font-semibold text-secondaryText uppercase block mb-1">
                  Intended Use Case
                </label>
                <select
                  value={intendedUse}
                  onChange={(e) => setIntendedUse(e.target.value)}
                  className="w-full h-[38px] px-3 rounded-lg border border-border bg-white text-[13px] text-primaryText focus:outline-none focus:border-blue-600"
                >
                  <option value="Urban planning">Urban planning & Masterplan Modeling</option>
                  <option value="Infrastructure development">Infrastructure Development</option>
                  <option value="Environmental analysis">Environmental & Climate Analysis</option>
                  <option value="Academic research">Academic Research</option>
                </select>
              </div>

              {/* Project Description */}
              <div>
                <label className="text-[11px] font-semibold text-secondaryText uppercase block mb-1">
                  Project Description
                </label>
                <textarea
                  rows={3}
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-border bg-white text-[12px] text-primaryText focus:outline-none focus:border-blue-600 leading-relaxed"
                />
              </div>

              {/* Expected API Volume */}
              <div>
                <label className="text-[11px] font-semibold text-secondaryText uppercase block mb-1">
                  Expected Monthly Volume
                </label>
                <div className="p-2 rounded-lg bg-canvas border border-border font-mono text-[12px] text-primaryText font-semibold">
                  {volume}
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2 pt-2 border-t border-border">
                <label className="flex items-start gap-2.5 text-secondaryText cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptLicence}
                    onChange={(e) => setAcceptLicence(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 mt-0.5"
                  />
                  <span>
                    I accept the{' '}
                    <a href="#licence" className="text-blue-600 font-semibold hover:underline">
                      Commercial Spatial Data Licence Terms
                    </a>{' '}
                    stipulated by DMT.
                  </span>
                </label>
                <label className="flex items-start gap-2.5 text-secondaryText cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptAgreement}
                    onChange={(e) => setAcceptAgreement(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 mt-0.5"
                  />
                  <span>
                    I accept the{' '}
                    <a href="#agreement" className="text-blue-600 font-semibold hover:underline">
                      Abu Dhabi Sovereign Data Residency & Use Agreement
                    </a>
                    .
                  </span>
                </label>
              </div>
            </div>

            {/* Right Summary Card (230 px) */}
            <div className="w-[230px] bg-canvas rounded-xl border border-border p-4 flex flex-col justify-between text-[12px]">
              <div className="space-y-3">
                <div className="h-[90px] bg-navy-900 rounded-lg overflow-hidden relative">
                  <svg viewBox="0 0 200 90" className="w-full h-full">
                    <rect width="200" height="90" fill="#0A1628" />
                    <polygon points="50,70 80,55 80,20 50,35" fill="#1F5FAD" />
                    <polygon points="80,55 120,70 120,35 80,20" fill="#2BA6DE" />
                    <polygon points="50,35 80,20 120,35 90,50" fill="#7A9CC6" />
                  </svg>
                  <span className="absolute bottom-1 right-1 text-[9px] font-mono px-1 rounded bg-black/60 text-white">
                    LOD2
                  </span>
                </div>

                <div>
                  <div className="text-[10px] text-secondaryText uppercase">Product</div>
                  <div className="font-bold text-navy-900 leading-snug">
                    Building Footprints 3D
                  </div>
                  <div className="text-[11px] text-steel-500">DMT Abu Dhabi</div>
                </div>

                <div className="pt-2 border-t border-border space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-secondaryText">Selected Plan:</span>
                    <strong className="text-purple-700">Commercial</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondaryText">Classification:</span>
                    <ClassificationBadge classification="Shared" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondaryText">Guaranteed SLA:</span>
                    <strong className="text-emerald-700 font-mono">Tier 1 (99.9%)</strong>
                  </div>
                </div>
              </div>

              <div className="p-2 rounded bg-blue-50 border border-blue-200 text-[10px] text-blue-900 leading-tight">
                Approval turn-around SLA: Within 2 business days by DMT Custodians.
              </div>
            </div>
          </div>

          {/* Modal Footer: Back & Continue */}
          <div className="px-6 py-3.5 border-t border-border bg-canvas/40 flex items-center justify-between">
            <button
              onClick={() => onNavigate('S08_MarketplaceCatalogue')}
              className="px-4 py-2 rounded-lg text-[13px] font-medium text-secondaryText hover:text-navy-900 hover:bg-canvas"
            >
              Back to Catalogue
            </button>

            <button
              onClick={() => onNavigate('S09b_MyEntitlements')}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[13px] font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>Continue to Entitlements</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
