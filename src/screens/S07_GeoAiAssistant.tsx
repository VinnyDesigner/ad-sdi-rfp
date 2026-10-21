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
  Sparkles,
} from 'lucide-react';

interface S07Props {
  onNavigate: (screen: ScreenId) => void;
}

interface Message {
  id: number;
  sender: 'user' | 'assistant';
  text: string;
  countTitle?: string;
  table?: { district: string; zone: string; schools: number }[];
  steps?: string[];
  sources?: string[];
}

export const S07_GeoAiAssistant: React.FC<S07Props> = ({ onNavigate }) => {
  const [stepsExpanded, setStepsExpanded] = useState(true);
  const [hoveredSource, setHoveredSource] = useState<string | null>('schools');
  const [inputPrompt, setInputPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState<Record<number, 'up' | 'down'>>({});

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const initialDistrictData = [
    { district: 'Al Jimi', schools: 9, zone: 'Central North' },
    { district: 'Al Muwaiji', schools: 8, zone: 'Central West' },
    { district: 'Al Jahili', schools: 6, zone: 'Heritage Sector' },
    { district: 'Falaj Hazzaa', schools: 5, zone: 'University Belt' },
    { district: 'Al Towayya', schools: 4, zone: 'North Oasis' },
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'user',
      text: 'Show schools within 500 m of high-traffic roads in Al Ain and count them by district.',
    },
    {
      id: 2,
      sender: 'assistant',
      text: '47 schools in 9 districts are within 500 m of high-traffic roads.',
      countTitle: '47 schools in 9 districts are within 500 m of high-traffic roads.',
      table: initialDistrictData,
      steps: [
        '1. Understood request · Parsed spatial entities (Schools, Roads, Al Ain)',
        '2. Selected approved datasets · Filtered ADEK & DMT authoritative layers',
        '3. Buffered roads by 500 m · Constructed spatial polygon buffer corridor',
        '4. Intersected schools · Point-in-polygon spatial join',
        '5. Grouped by district · Aggregated count by Al Ain cadastral boundaries',
      ],
      sources: ['Schools (ADEK)', 'Road Traffic (DMT)', 'Districts (DMT)'],
    },
  ]);

  const suggestedPrompts = [
    'Nearest health centres to Khalifa City',
    'Which datasets show mangroves?',
    'Count commercial warehouses in Mussafah',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const prompt = textToSend || inputPrompt;
    if (!prompt.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: 'user',
      text: prompt,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      let reply: Message;

      if (prompt.toLowerCase().includes('health') || prompt.toLowerCase().includes('khalifa')) {
        reply = {
          id: Date.now() + 1,
          sender: 'assistant',
          text: 'Identified 14 primary healthcare clinics and 3 tertiary hospitals within Khalifa City boundaries.',
          countTitle: '14 Clinics and 3 Hospitals serving Khalifa City (DOH Authoritative)',
          table: [
            { district: 'Sector SW-1', zone: 'Primary Care', schools: 4 },
            { district: 'Sector SW-4', zone: 'Specialized Clinic', schools: 5 },
            { district: 'Khalifa Central', zone: 'Hospital Complex', schools: 3 },
          ],
          steps: [
            '1. Extracted Department of Health (DOH) Facility Register 2027',
            '2. Filtered by Khalifa City municipal spatial polygon',
            '3. Computed 5-minute and 10-minute isochrone drivetime catchment polygons',
          ],
          sources: ['Health Facilities (DoH)', 'Road Network (ITC)', 'Demographics (SCAD)'],
        };
      } else if (prompt.toLowerCase().includes('mangrove')) {
        reply = {
          id: Date.now() + 1,
          sender: 'assistant',
          text: '5 authoritative datasets match mangrove vegetation and blue carbon in Abu Dhabi.',
          countTitle: '5 Datasets Catalogued under Environment Agency – Abu Dhabi (EAD)',
          table: [
            { district: 'Eastern Mangroves', zone: 'National Park', schools: 4120 },
            { district: 'Jubail Island', zone: 'Protected Reserve', schools: 2850 },
            { district: 'Marawah', zone: 'Biosphere Reserve', schools: 12400 },
          ],
          steps: [
            '1. Searched AD-SDI Sovereign Clearinghouse Catalogue metadata index',
            '2. Queried EAD 2024–2027 multispectral Sentinel-2 & WorldView classifications',
            '3. Cross-referenced Blue Carbon potential models',
          ],
          sources: ['Mangrove Extent 2024 (EAD)', 'Marine Reserves (EAD)', 'Carbon Sequestration (DoE)'],
        };
      } else {
        reply = {
          id: Date.now() + 1,
          sender: 'assistant',
          text: `Processed spatial query: "${prompt}". Generated topological analysis across municipal boundaries.`,
          countTitle: 'Topological analysis completed across Abu Dhabi spatial infrastructure',
          table: [
            { district: 'Abu Dhabi City', zone: 'Capital Core', schools: 38 },
            { district: 'Al Ain Region', zone: 'Eastern Oasis', schools: 22 },
            { district: 'Al Dhafra Region', zone: 'Western Sector', schools: 14 },
          ],
          steps: [
            '1. Parsed natural language prompt with Spatial NLP parser',
            '2. Selected relevant government geospatial themes and CRS (EPSG:3997)',
            '3. Executed spatial aggregation and boundary validation',
          ],
          sources: ['DMT Cadastre', 'AD-SDI Clearinghouse', 'Sovereign GeoAI'],
        };
      }

      setMessages((prev) => [...prev, reply]);
      showToast('New GeoAI analysis generated');
    }, 700);
  };

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
      <HeaderWorkspace currentScreen="S07_GeoAiAssistant" onNavigate={onNavigate} />

      <div className="flex-1 flex overflow-hidden">
        {/* 2. Collapsed Workspace Sidebar */}
        <SidebarWorkspace currentScreen="S07_GeoAiAssistant" onNavigate={onNavigate} collapsed={true} />

        {/* 3. Main Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Chat Panel (480 px wide) */}
          <div className="w-[480px] h-full bg-white border-r border-border flex flex-col justify-between overflow-hidden shadow-level-1 flex-shrink-0">
            {/* Panel Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-canvas/40 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#7B4FD6] flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-[16px] font-bold text-navy-900 tracking-tight">GeoAI Assistant</h2>
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

            {/* Conversation Stream */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              {messages.map((msg) => {
                if (msg.sender === 'user') {
                  return (
                    <div key={msg.id} className="flex justify-end">
                      <div className="max-w-[390px] bg-navy-900 text-white p-3.5 rounded-2xl rounded-tr-sm shadow-sm text-[13px] leading-relaxed">
                        {msg.text}
                      </div>
                    </div>
                  );
                }

                // Assistant Card
                return (
                  <div
                    key={msg.id}
                    className="bg-white rounded-xl border border-border shadow-level-1 p-4 space-y-3.5 animate-in fade-in"
                  >
                    {/* Bold Answer Line */}
                    <div className="text-[15px] font-bold text-navy-900 leading-snug">
                      {msg.countTitle || msg.text}
                    </div>

                    {/* Collapsible Steps */}
                    {msg.steps && (
                      <div className="rounded-lg border border-border/80 bg-canvas/60 overflow-hidden text-[12px]">
                        <button
                          onClick={() => setStepsExpanded(!stepsExpanded)}
                          className="w-full px-3 py-2 flex items-center justify-between font-semibold text-secondaryText hover:text-navy-900 cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#7B4FD6]" />
                            <span>Analytical Lineage ({msg.steps.length} steps)</span>
                          </span>
                          {stepsExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        {stepsExpanded && (
                          <div className="px-3 pb-3 space-y-1.5 text-[11px] text-primaryText border-t border-border/50 pt-2 font-mono">
                            {msg.steps.map((st, si) => (
                              <div key={si}>{st}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Source Dataset Chips */}
                    {msg.sources && (
                      <div className="space-y-1 relative">
                        <div className="text-[11px] font-bold text-secondaryText uppercase tracking-wider">
                          Authoritative Sources
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          {msg.sources.map((src, idx) => (
                            <span
                              key={idx}
                              onMouseEnter={() => setHoveredSource(src)}
                              onMouseLeave={() => setHoveredSource(null)}
                              className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-900 border border-purple-200 cursor-pointer flex items-center gap-1.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              <span>{src}</span>
                            </span>
                          ))}
                        </div>

                        {hoveredSource && (
                          <div className="absolute top-10 left-0 bg-navy-900 text-white px-2.5 py-1 rounded text-[10px] font-mono shadow-level-2 z-20">
                            {hoveredSource} &middot; Quality Passed &middot; UAE Sovereign Hosting
                          </div>
                        )}
                      </div>
                    )}

                    {/* Table */}
                    {msg.table && (
                      <div className="overflow-hidden rounded-lg border border-border">
                        <table className="w-full text-left text-[11px]">
                          <thead className="bg-canvas text-secondaryText font-semibold border-b border-border">
                            <tr>
                              <th className="py-1.5 px-3">District / Sector</th>
                              <th className="py-1.5 px-2">Zone</th>
                              <th className="py-1.5 px-3 text-right">Facilities</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/60">
                            {msg.table.map((d, di) => (
                              <tr key={di} className="hover:bg-canvas/40">
                                <td className="py-1.5 px-3 font-semibold text-primaryText">{d.district}</td>
                                <td className="py-1.5 px-2 text-secondaryText">{d.zone}</td>
                                <td className="py-1.5 px-3 text-right font-mono font-bold text-navy-900">
                                  {d.schools.toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Disclaimer */}
                    <div className="text-[10px] text-steel-500 italic">
                      AI-generated geospatial analysis. Verified against official sovereign clearinghouse models.
                    </div>

                    {/* Action Row */}
                    <div className="flex items-center justify-between pt-2 border-t border-border text-[12px]">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => showToast('Map view bookmarked to project workspace')}
                          className="px-2.5 py-1 rounded bg-canvas hover:bg-slate-100 text-primaryText font-medium border border-border flex items-center gap-1.5 cursor-pointer"
                        >
                          <Bookmark className="w-3.5 h-3.5 text-steel-400" />
                          <span>Save as map</span>
                        </button>
                        <button
                          onClick={() => showToast('Analysis exported to CSV')}
                          className="px-2.5 py-1 rounded bg-canvas hover:bg-slate-100 text-primaryText font-medium border border-border flex items-center gap-1.5 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-steel-400" />
                          <span>Export</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-steel-400">
                        <button
                          onClick={() => {
                            setFeedbackGiven((prev) => ({ ...prev, [msg.id]: 'up' }));
                            showToast('Thank you for your feedback!');
                          }}
                          className={`p-1 hover:text-navy-900 cursor-pointer ${
                            feedbackGiven[msg.id] === 'up' ? 'text-emerald-600 font-bold' : ''
                          }`}
                        >
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setFeedbackGiven((prev) => ({ ...prev, [msg.id]: 'down' }));
                            showToast('Feedback noted for model retraining');
                          }}
                          className={`p-1 hover:text-navy-900 cursor-pointer ${
                            feedbackGiven[msg.id] === 'down' ? 'text-rose-600 font-bold' : ''
                          }`}
                        >
                          <ThumbsDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {isThinking && (
                <div className="bg-white rounded-xl border border-border p-3.5 flex items-center gap-2.5 text-secondaryText text-[12px] shadow-sm animate-pulse">
                  <Sparkles className="w-4 h-4 text-purple-600 animate-spin" />
                  <span>Synthesizing spatial topology across DMT layers...</span>
                </div>
              )}
            </div>

            {/* Bottom Input Area */}
            <div className="p-4 border-t border-border bg-white space-y-2 flex-shrink-0">
              {/* Suggested Prompts */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                {suggestedPrompts.map((sp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(sp)}
                    className="px-2.5 py-1 rounded-full bg-canvas hover:bg-slate-100 text-secondaryText border border-border truncate flex-shrink-0 cursor-pointer"
                  >
                    {sp}
                  </button>
                ))}
              </div>

              {/* Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="h-[46px] rounded-lg border border-border bg-canvas px-3 flex items-center justify-between focus-within:border-blue-600 focus-within:bg-white shadow-sm"
              >
                <input
                  type="text"
                  placeholder="Ask about places, data or spatial trends…"
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  className="w-full bg-transparent text-[13px] text-primaryText focus:outline-none"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => showToast('Voice dictation active (Arabic/English)')}
                    className="p-1.5 text-steel-400 hover:text-navy-900 cursor-pointer"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                  <button
                    type="submit"
                    className="w-8 h-8 rounded-md bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center cursor-pointer shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Real Leaflet GIS Map Canvas */}
          <div className="flex-1 h-full relative">
            <InteractiveMap mode="schools-buffer" className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Micro Footer */}
      <MicroFooter />
    </div>
  );
};
