import React, { useState } from 'react';
import { ScreenId } from '../types';
import { S08_MarketplaceCatalogue } from './S08_MarketplaceCatalogue';
import { CheckCircle2, ChevronRight, X, Building, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { ClassificationBadge } from '../components/common/BadgesAndPills';

interface S09aProps {
  onNavigate: (screen: ScreenId) => void;
}

export const S09a_MarketplaceRequest: React.FC<S09aProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(2);
  const [intendedUse, setIntendedUse] = useState('Urban planning');
  const [projectDesc, setProjectDesc] = useState(
    'Integration into Abu Dhabi Waterfront Masterplan visual analytics and environmental impact assessment.'
  );
  const [acceptLicence, setAcceptLicence] = useState(true);
  const [acceptAgreement, setAcceptAgreement] = useState(true);
  const [volume, setVolume] = useState('50,000 API calls / month');
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    { num: 1, label: 'Choose plan' },
    { num: 2, label: 'Purpose & licence' },
    { num: 3, label: 'Subscription & SLA' },
    { num: 4, label: 'Confirmation' },
  ];

  return (
    <div className="w-full h-screen relative overflow-hidden select-none font-sans">
      {/* Dimmed Background: S08 */}
      <div className="absolute inset-0 pointer-events-none opacity-40 filter blur-[1px]">
        <S08_MarketplaceCatalogue onNavigate={() => {}} />
      </div>

      {/* Dim overlay */}
      <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm z-30 flex items-center justify-center">
        {/* Modal 720 × 640 Centered */}
        <div className="w-[740px] min-h-[580px] max-h-[640px] bg-white rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col justify-between z-40 animate-fade-in">
          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-border bg-canvas/40 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <h2 className="text-[16px] font-bold text-navy-900 tracking-tight">
                Request Access: Building Footprints 3D (LOD2)
              </h2>
            </div>
            <button
              onClick={() => onNavigate('S08_MarketplaceCatalogue')}
              className="text-steel-400 hover:text-navy-900 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper (4 steps) */}
          <div className="px-8 py-3 bg-white border-b border-border flex items-center justify-between text-[12px] flex-shrink-0">
            {steps.map((st, idx) => {
              const isDone = currentStep > st.num;
              const isCurrent = currentStep === st.num;

              return (
                <React.Fragment key={idx}>
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentStep(st.num)}>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-blue-600 text-white ring-2 ring-blue-200'
                          : 'bg-canvas text-secondaryText border border-border'
                      }`}
                    >
                      {isDone ? <Check className="w-3.5 h-3.5" /> : st.num}
                    </div>
                    <span
                      className={`font-semibold ${
                        isCurrent ? 'text-navy-900 font-bold' : isDone ? 'text-emerald-800' : 'text-secondaryText'
                      }`}
                    >
                      {st.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && <div className="flex-1 h-[1px] bg-border mx-3" />}
                </React.Fragment>
              );
            })}
          </div>

          {/* Modal Body */}
          <div className="flex-1 p-6 flex gap-6 overflow-y-auto">
            {/* Left Form: Changes per step */}
            <div className="flex-1 space-y-3.5 text-[12px]">
              {currentStep === 1 && (
                <div className="space-y-3">
                  <div className="font-bold text-navy-900 text-[13px]">Select Access Plan</div>
                  <div className="p-3.5 rounded-xl border-2 border-blue-600 bg-blue-50/30 space-y-1">
                    <div className="font-bold text-navy-900 text-[13px]">Commercial & Partner Plan</div>
                    <p className="text-[11px] text-secondaryText">
                      High-throughput 3D streaming quota with SLA guarantee for approved partners.
                    </p>
                    <div className="text-[11px] font-mono text-purple-700 font-semibold pt-1">
                      Included in Abu Dhabi Partner Tier 1 Access Agreement
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <>
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
                    <label className="flex items-start gap-2 text-secondaryText cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptLicence}
                        onChange={(e) => setAcceptLicence(e.target.checked)}
                        className="mt-0.5 rounded text-blue-600"
                      />
                      <span>
                        I agree to the <strong>AD-SDI Data Sharing & Commercial Licence Terms</strong>.
                      </span>
                    </label>
                    <label className="flex items-start gap-2 text-secondaryText cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptAgreement}
                        onChange={(e) => setAcceptAgreement(e.target.checked)}
                        className="mt-0.5 rounded text-blue-600"
                      />
                      <span>
                        I confirm this request is within our authorised organisational scope.
                      </span>
                    </label>
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <div className="space-y-3">
                  <div className="font-bold text-navy-900 text-[13px]">Subscription Terms & Guaranteed SLA</div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-border space-y-2 text-[12px]">
                    <div className="flex justify-between">
                      <span className="text-secondaryText">Guaranteed Uptime:</span>
                      <strong className="text-emerald-700 font-mono">99.9% (Tier 1 SLA)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondaryText">Target Response Time:</span>
                      <strong className="text-navy-900 font-mono">&lt; 150 ms (p95)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondaryText">Sovereign Data Storage:</span>
                      <strong className="text-emerald-700">Abu Dhabi UAE Cloud</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondaryText">Custodian Turnaround:</span>
                      <strong className="text-navy-900">Within 2 Business Days (DMT)</strong>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Your organisation is pre-cleared for this classification tier.</span>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4 py-4 text-center">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-navy-900">Access Request Submitted!</h3>
                    <p className="text-[12px] text-secondaryText max-w-[320px] mx-auto mt-1">
                      Reference number <strong>REQ-2027-0941</strong> has been assigned and dispatched to DMT Data Stewards.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-canvas text-[11px] text-steel-500 font-mono inline-block">
                    Tracking ID: ADSDI-ENT-8842-DMT
                  </div>
                </div>
              )}
            </div>

            {/* Right Summary Card (240 px) */}
            <div className="w-[240px] bg-canvas/60 rounded-xl border border-border p-3.5 flex flex-col justify-between flex-shrink-0">
              <div className="space-y-3">
                <div className="font-bold text-[11px] uppercase tracking-wider text-secondaryText">
                  Request Summary
                </div>

                <div>
                  <div className="text-[10px] text-secondaryText uppercase">Product</div>
                  <div className="font-bold text-navy-900 leading-snug">Building Footprints 3D</div>
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
          <div className="px-6 py-3.5 border-t border-border bg-canvas/40 flex items-center justify-between flex-shrink-0">
            {currentStep > 1 && currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep((s) => s - 1)}
                className="px-4 py-2 rounded-lg text-[13px] font-medium text-secondaryText hover:text-navy-900 hover:bg-canvas cursor-pointer"
              >
                Back
              </button>
            ) : (
              <button
                onClick={() => onNavigate('S08_MarketplaceCatalogue')}
                className="px-4 py-2 rounded-lg text-[13px] font-medium text-secondaryText hover:text-navy-900 hover:bg-canvas cursor-pointer"
              >
                Cancel
              </button>
            )}

            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep((s) => s + 1)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[13px] font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <span>{currentStep === 3 ? 'Submit Request' : 'Next Step'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onNavigate('S09b_MyEntitlements')}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[13px] font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <span>View My Entitlements</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
