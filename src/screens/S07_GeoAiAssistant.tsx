import React, { useState } from 'react';
import { ScreenId } from '../types';
import { HeaderWorkspace } from '../components/common/HeaderWorkspace';
import { SidebarWorkspace } from '../components/common/SidebarWorkspace';
import { MicroFooter } from '../components/common/MicroFooter';
import { InteractiveMap } from '../components/common/InteractiveMap';
import {
  Bot,
  Send,
  Mic,
  ThumbsUp,
  ThumbsDown,
  Download,
  Bookmark,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';

interface S07Props {
  onNavigate: (screen: ScreenId) => void;
}

export const S07_GeoAiAssistant: React.FC<S07Props> = ({ onNavigate }) => {
  const [stepsExpanded, setStepsExpanded] = useState(true);
  const [hoveredSource, setHoveredSource] = useState<string | null>('schools');
  const [inputPrompt, setInputPrompt] = useState('');

  const districtData = [
    { district: 'Al Jimi', schools: 9, zone: 'Central North' },
    { district: 'Al Muwaiji', schools: 8, zone: 'Central West' },
    { district: 'Al Jahili', schools: 6, zone: 'Heritage Sector' },
    { district: 'Falaj Hazzaa', schools: 5, zone: 'University Belt' },
    { district: 'Al Towayya', schools: 4, zone: 'North Oasis' },
  ];

  const suggestedPrompts = [
    'Nearest health centres to Khalifa City',
    'Which datasets show mangroves?',
    'Count commercial warehouses in Mussafah',
  ];

  return (
    <div className="w-full h-screen bg-canvas flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 1. Workspace Top Bar */}
      <HeaderWorkspace currentScreen="S07_GeoAiAssistant" onNavigate={onNavigate} />

      <div className="flex-1 flex overflow-hidden">
        {/* 2. Collapsed Workspace Sidebar (72 px per spec) */}
        <SidebarWorkspace currentScreen="S07_GeoAiAssistant" onNavigate={onNavigate} collapsed={true} />

        {/* 3. Main Body: Chat Panel 480 px + Map (remaining ~888 px) */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Chat Panel (480 px wide) */}
          <div className="w-[480px] h-full bg-white border-r border-border flex flex-col justify-between overflow-hidden shadow-level-1">
            {/* Panel Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-canvas/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#7B4FD6] flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-[16px] font-bold text-navy-900 tracking-tight">
                      GeoAI Assistant
                    </h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Approved model
                    </span>
                  </div>
                  <div className="text-[11px] text-secondaryText">
                    Spatial NLP & automated topology analytics
                  </div>
                </div>
              </div>

              <div className="text-[12px] font-semibold text-steel-400">
                <span className="text-navy-900">EN</span> | <span>ع</span>
              </div>
            </div>

            {/* Conversation Stream (Scrollable) */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              {/* User Query Bubble (Right-aligned, Navy 900, white text) */}
              <div className="flex justify-end">
                <div className="max-w-[390px] bg-navy-900 text-white p-3.5 rounded-2xl rounded-tr-sm shadow-sm text-[13px] leading-relaxed">
                  Show schools within 500 m of high-traffic roads in Al Ain and count them by district.
                </div>
              </div>

              {/* Assistant Response Card (White, Level 1 shadow) */}
              <div className="bg-white rounded-xl border border-border shadow-level-1 p-4 space-y-3.5">
                {/* Bold Answer Line */}
                <div className="text-[15px] font-bold text-navy-900 leading-snug">
                  47 schools in 9 districts are within 500 m of high-traffic roads.
                </div>

                {/* Collapsible "How I got this" */}
                <div className="rounded-lg border border-border/80 bg-canvas/60 overflow-hidden text-[12px]">
                  <button
                    onClick={() => setStepsExpanded(!stepsExpanded)}
                    className="w-full px-3 py-2 flex items-center justify-between font-semibold text-secondaryText hover:text-navy-900"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#7B4FD6]" />
                      <span>How I got this (5 analytical steps)</span>
                    </span>
                    {stepsExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {stepsExpanded && (
                    <div className="px-3 pb-3 space-y-1.5 text-[11px] text-primaryText border-t border-border/50 pt-2 font-mono">
                      <div>1. Understood request · Parsed spatial entities (Schools, Roads, Al Ain)</div>
                      <div>2. Selected approved datasets · Filtered ADEK & DMT authoritative layers</div>
                      <div>3. Buffered roads by 500 m · Constructed spatial polygon buffer corridor</div>
                      <div>4. Intersected schools · Point-in-polygon spatial join</div>
                      <div>5. Grouped by district · Aggregated count by Al Ain cadastral boundaries</div>
                    </div>
                  )}
                </div>

                {/* Source Dataset Chips */}
                <div className="space-y-1 relative">
                  <div className="text-[11px] font-bold text-secondaryText uppercase tracking-wider">
                    Authoritative Sources
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      onMouseEnter={() => setHoveredSource('schools')}
                      onMouseLeave={() => setHoveredSource(null)}
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-900 border border-purple-200 cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>Schools (ADEK)</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-900 border border-blue-200 cursor-pointer flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>Road Traffic (DMT)</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-canvas text-secondaryText border border-border cursor-pointer flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>Districts (DMT)</span>
                    </span>
                  </div>

                  {/* Tooltip on hovered chip per spec */}
                  {hoveredSource === 'schools' && (
                    <div className="absolute top-10 left-0 bg-navy-900 text-white px-2.5 py-1 rounded text-[10px] font-mono shadow-level-2 z-20">
                      Schools · ADEK · Updated Aug 2027 · Quality passed
                    </div>
                  )}
                </div>

                {/* Mini Result Table (District · Schools) */}
                <div className="overflow-hidden rounded-lg border border-border">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-canvas text-secondaryText font-semibold border-b border-border">
                      <tr>
                        <th className="py-1.5 px-3">District</th>
                        <th className="py-1.5 px-2">Zone</th>
                        <th className="py-1.5 px-3 text-right">Schools in 500m</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {districtData.map((d, di) => (
                        <tr key={di} className="hover:bg-canvas/40">
                          <td className="py-1.5 px-3 font-semibold text-primaryText">{d.district}</td>
                          <td className="py-1.5 px-2 text-secondaryText">{d.zone}</td>
                          <td className="py-1.5 px-3 text-right font-mono font-bold text-navy-900">
                            {d.schools}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Blue Tint Info Note */}
                <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-200 text-[11px] text-blue-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>1 restricted security dataset was excluded based on your access agreement.</span>
                </div>

                {/* Micro Disclaimer */}
                <div className="text-[10px] text-steel-500 italic">
                  AI-generated geospatial analysis. Verify with official custodians before statutory use.
                </div>

                {/* Action Row */}
                <div className="flex items-center justify-between pt-2 border-t border-border text-[12px]">
                  <div className="flex items-center gap-2">
                    <button className="px-2.5 py-1 rounded bg-canvas hover:bg-slate-100 text-primaryText font-medium border border-border flex items-center gap-1.5">
                      <Bookmark className="w-3.5 h-3.5 text-steel-400" />
                      <span>Save as map</span>
                    </button>
                    <button className="px-2.5 py-1 rounded bg-canvas hover:bg-slate-100 text-primaryText font-medium border border-border flex items-center gap-1.5">
                      <Download className="w-3.5 h-3.5 text-steel-400" />
                      <span>Export</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-steel-400">
                    <button className="p-1 hover:text-navy-900">
                      <ThumbsUp className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:text-navy-900">
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Input Area */}
            <div className="p-4 border-t border-border bg-white space-y-2">
              {/* Suggested Prompts */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                {suggestedPrompts.map((sp, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputPrompt(sp)}
                    className="px-2.5 py-1 rounded-full bg-canvas hover:bg-slate-100 text-secondaryText border border-border truncate flex-shrink-0"
                  >
                    {sp}
                  </button>
                ))}
              </div>

              {/* Input Bar (56 px) */}
              <div className="h-[46px] rounded-lg border border-border bg-canvas px-3 flex items-center justify-between focus-within:border-blue-600 focus-within:bg-white shadow-sm">
                <input
                  type="text"
                  placeholder="Ask about places, data or spatial trends…"
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  className="w-full bg-transparent text-[13px] text-primaryText focus:outline-none"
                />
                <div className="flex items-center gap-2">
                  <button className="p-1.5 text-steel-400 hover:text-navy-900">
                    <Mic className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-md bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Map Canvas (Remaining ~888 px) */}
          <div className="flex-1 h-full relative">
            <InteractiveMap mode="schools-buffer" />
          </div>
        </div>
      </div>

      {/* Micro Footer */}
      <MicroFooter />
    </div>
  );
};
