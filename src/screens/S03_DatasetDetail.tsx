import React, { useState } from 'react';
import { ScreenId } from '../types';
import { HeaderWorkspace } from '../components/common/HeaderWorkspace';
import { SidebarWorkspace } from '../components/common/SidebarWorkspace';
import { InteractiveMap } from '../components/common/InteractiveMap';
import {
  ChevronRight,
  ShieldCheck,
  Check,
  Copy,
  Share2,
  Search,
  Layers,
  Download,
  CheckCircle2,
  FileCode,
  LayoutGrid,
  Code2,
  Activity,
  History,
  Lock,
  ExternalLink,
  Play,
  Bookmark,
  Sparkles,
} from 'lucide-react';

interface S03Props {
  onNavigate: (screen: ScreenId) => void;
}

export const S03_DatasetDetail: React.FC<S03Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [copied, setCopied] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Schema state
  const [schemaFilter, setSchemaFilter] = useState('');

  // API demo state
  const [activeProtocol, setActiveProtocol] = useState<'ogc' | 'wfs' | 'wms' | 'geojson'>('ogc');
  const [testApiRunning, setTestApiRunning] = useState(false);
  const [apiResponsePayload, setApiResponsePayload] = useState<string | null>(null);

  // Export state
  const [exportFormat, setExportFormat] = useState('GeoPackage (.gpkg)');
  const [exportCrs, setExportCrs] = useState('EPSG:3997 (Abu Dhabi UTM 40N)');
  const [exportRegion, setExportRegion] = useState('Abu Dhabi Metropolitan Area');
  const [isDownloading, setIsDownloading] = useState(false);

  const tabs = [
    'Overview',
    'Metadata',
    'Services & APIs',
    'Quality',
    'Lineage',
    'Access',
    'Versions',
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopyUrl = () => {
    navigator.clipboard?.writeText('https://api.sdi.abudhabi.ae/v1/features/cadastre/parcels');
    setCopied(true);
    showToast('API URL copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Dataset link copied to clipboard');
  };

  const handleTriggerExport = () => {
    setIsDownloading(true);
    showToast(`Generating ${exportFormat} export...`);

    setTimeout(() => {
      setIsDownloading(false);
      // Generate sample GeoJSON blob
      const sampleGeoJson = {
        type: 'FeatureCollection',
        crs: { type: 'name', properties: { name: exportCrs } },
        features: [
          {
            type: 'Feature',
            properties: {
              PARCEL_ID: 'ADP-001-12534',
              ZONE_CODE: 'C25',
              LAND_USE: 'Commercial Mixed-Use',
              AREA_SQM: 1420.5,
              MUNICIPALITY: 'Abu Dhabi',
              DMT_VERIFIED: true,
            },
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [54.58, 24.418],
                  [54.584, 24.418],
                  [54.584, 24.421],
                  [54.58, 24.421],
                  [54.58, 24.418],
                ],
              ],
            },
          },
        ],
      };

      const blob = new Blob([JSON.stringify(sampleGeoJson, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `AbuDhabi_Cadastre_Parcels_Sample.${exportFormat.includes('GeoPackage') ? 'gpkg' : 'geojson'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Download started successfully');
    }, 1200);
  };

  const handleRunApiTest = () => {
    setTestApiRunning(true);
    setTimeout(() => {
      setTestApiRunning(false);
      setApiResponsePayload(
        JSON.stringify(
          {
            type: 'FeatureCollection',
            numberMatched: 248920,
            numberReturned: 2,
            features: [
              {
                type: 'Feature',
                id: 'PARCEL.0482',
                properties: {
                  parcel_id: 'ADP-001-0482',
                  plot_no: '482',
                  zone_code: 'C25',
                  land_use: 'Commercial Mixed-Use',
                  area_sqm: 1420.5,
                  municipality: 'Abu Dhabi (Khalifa City)',
                  status: 'Active Title Deed',
                },
              },
              {
                type: 'Feature',
                id: 'PARCEL.0483',
                properties: {
                  parcel_id: 'ADP-001-0483',
                  plot_no: '483',
                  zone_code: 'R1',
                  land_use: 'Residential Villa',
                  area_sqm: 980.0,
                  municipality: 'Abu Dhabi (Khalifa City)',
                  status: 'Active Title Deed',
                },
              },
            ],
            links: [
              {
                rel: 'next',
                type: 'application/geo+json',
                href: 'https://api.sdi.abudhabi.ae/v1/features/cadastre/parcels?offset=2&limit=2',
              },
            ],
          },
          null,
          2
        )
      );
    }, 600);
  };

  const schemaAttributes = [
    { name: 'PARCEL_ID', type: 'String (24)', pk: true, null: 'No', desc: 'Unique Sovereign Parcel Identifier across Abu Dhabi Emirate', example: 'ADP-001-12534' },
    { name: 'PLOT_NO', type: 'String (12)', pk: false, null: 'No', desc: 'Municipal allocated plot survey number', example: '0482' },
    { name: 'ZONE_CODE', type: 'String (8)', pk: false, null: 'No', desc: 'DMT Statutory Zoning Classification Code', example: 'C25' },
    { name: 'LAND_USE', type: 'String (64)', pk: false, null: 'No', desc: 'Official primary land use category description', example: 'Commercial Mixed-Use' },
    { name: 'AREA_SQM', type: 'Double (12,2)', pk: false, null: 'No', desc: 'Surveyed cadastral boundary polygon area in square metres', example: '1420.50' },
    { name: 'MUNICIPALITY', type: 'String (32)', pk: false, null: 'No', desc: 'Governing municipal administrative jurisdiction', example: 'Abu Dhabi' },
    { name: 'SECTOR_NAME', type: 'String (48)', pk: false, null: 'Yes', desc: 'Master community sector name', example: 'Sector SW-12' },
    { name: 'OWNER_TYPE', type: 'String (32)', pk: false, null: 'No', desc: 'Land registry ownership category classification', example: 'Leasehold Commercial' },
    { name: 'MAX_HEIGHT_M', type: 'Integer (4)', pk: false, null: 'Yes', desc: 'Permitted maximum building height above ground in metres', example: '45' },
    { name: 'FLOORS_ALLOWED', type: 'String (12)', pk: false, null: 'Yes', desc: 'Permitted floor ceiling code (e.g., G+12)', example: 'G+12' },
    { name: 'REG_DATE', type: 'DateTime', pk: false, null: 'No', desc: 'Official Land Registration date in DMT Cadastre', example: '2024-03-15T09:30:00Z' },
    { name: 'ACCURACY_M', type: 'Double (4,2)', pk: false, null: 'No', desc: 'Geodetic survey positional tolerance in metres', example: '0.05' },
  ];

  const filteredSchema = schemaAttributes.filter(
    (s) =>
      s.name.toLowerCase().includes(schemaFilter.toLowerCase()) ||
      s.desc.toLowerCase().includes(schemaFilter.toLowerCase()) ||
      s.type.toLowerCase().includes(schemaFilter.toLowerCase())
  );

  return (
    <div className="w-full h-screen bg-[#F8FAFC] flex flex-col justify-between overflow-hidden select-none font-sans relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-20 right-6 z-50 bg-navy-900 text-white px-4 py-2 rounded-xl shadow-2xl border border-white/20 text-[12px] flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Workspace Top Bar */}
      <HeaderWorkspace currentScreen="S03_DatasetDetail" onNavigate={onNavigate} />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Workspace Sidebar */}
        <SidebarWorkspace currentScreen="S03_DatasetDetail" onNavigate={onNavigate} />

        {/* Right Main Content */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-white">
          {/* Header Bar */}
          <div className="px-6 pt-3 pb-0 border-b border-[#E2E8F0] bg-white flex-shrink-0 space-y-2">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-[11px] text-[#64748B]">
              <span
                className="hover:text-[#1865C9] cursor-pointer"
                onClick={() => onNavigate('S01_Home')}
              >
                Home
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span
                className="hover:text-[#1865C9] cursor-pointer"
                onClick={() => onNavigate('S02_CatalogueSearch')}
              >
                Catalogue
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span className="text-[#1E293B] font-semibold">Land Parcels (Cadastre)</span>
            </div>

            {/* Title Row + Actions */}
            <div className="flex items-start justify-between">
              {/* Left Title & Metadata */}
              <div className="flex items-start gap-3.5">
                {/* Thumbnail Icon */}
                <div className="w-11 h-11 rounded-lg border border-[#CBD5E1] bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-[12px] shadow-sm flex-shrink-0">
                  CAD
                </div>

                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-[20px] font-bold text-[#0F172A] tracking-tight">
                      Land Parcels (Cadastre)
                    </h1>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#EDF9F1] text-[#1E9E6A] border border-[#BDE8D1]">
                      <CheckCircle2 className="w-3 h-3 text-[#1E9E6A]" />
                      Authoritative
                    </span>
                  </div>

                  <p className="text-[12px] text-[#64748B] mt-0.5">
                    Official land parcel boundaries for the Emirate of Abu Dhabi, maintained by DMT Spatial Data Sector.
                  </p>

                  {/* Metadata chips */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
                      <LayoutGrid className="w-3 h-3 text-[#64748B]" />
                      Land & Cadastre
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
                      Vector (GPKG / WFS)
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#F3EEFA] text-[#7A36CB] border border-[#E1D1F5]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7A36CB]" />
                      Official – Government
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#EDF9F1] text-[#1E9E6A] border border-[#BDE8D1]">
                      <ShieldCheck className="w-3 h-3 text-[#1E9E6A]" />
                      SLA 99.95%
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('S02_CatalogueSearch')}
                    className="px-4 py-2 bg-[#1865C9] hover:bg-[#1354A8] text-white rounded-lg text-[13px] font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Layers className="w-4 h-4" />
                    <span>View in Catalogue Map</span>
                  </button>
                  <button
                    onClick={() => onNavigate('S09a_MarketplaceRequest')}
                    className="px-3.5 py-2 bg-white hover:bg-slate-50 text-[#1E293B] border border-[#CBD5E1] rounded-lg text-[13px] font-semibold transition-all shadow-2xs cursor-pointer"
                  >
                    Request access
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyUrl}
                    className="px-2.5 py-1 bg-white hover:bg-slate-50 text-[#475569] border border-[#CBD5E1] rounded-md text-[11px] font-medium flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#64748B]" />
                    <span>{copied ? 'Copied URL!' : 'Copy API URL'}</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="px-2.5 py-1 bg-white hover:bg-slate-50 text-[#475569] border border-[#CBD5E1] rounded-md text-[11px] font-medium flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#64748B]" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-7 border-t border-[#E2E8F0] pt-2 text-[13px]">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2.5 font-medium transition-all relative cursor-pointer ${
                    activeTab === tab
                      ? 'text-[#1865C9] font-bold border-b-2 border-[#1865C9]'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Workspace Body: Dynamic View by Tab */}
          <div className="flex-1 px-6 py-4 overflow-y-auto">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'Overview' && (
              <div className="grid grid-cols-12 gap-4">
                {/* Left 8-col Area */}
                <div className="col-span-8 flex flex-col gap-4">
                  {/* Real Interactive Map Preview */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="text-[12px] font-bold text-[#0F172A] flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-blue-600" />
                        <span>Interactive Cadastral GIS Viewer (Click any parcel to inspect)</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        Esri High-Res Satellite + DMT Vector Cadastre
                      </span>
                    </div>

                    <div className="h-[270px] w-full rounded-xl border border-[#CBD5E1] overflow-hidden shadow-sm relative">
                      <InteractiveMap mode="parcels" className="w-full h-full" />
                    </div>
                  </div>

                  {/* Description Card */}
                  <div className="space-y-1">
                    <div className="text-[13px] font-bold text-[#0F172A]">Description</div>
                    <div className="text-[12px] text-[#475569] leading-relaxed">
                      This dataset provides the official cadastral land parcel boundaries for the Emirate of Abu Dhabi. It includes parcel geometry, parcel ID, land use, area and administrative information. It serves as a foundational dataset for planning, development, land management and multi-sector applications.
                    </div>
                    {showFullDesc && (
                      <div className="text-[12px] text-[#475569] leading-relaxed pt-2 space-y-1 border-t border-slate-100">
                        <p>
                          Maintained under Abu Dhabi Law No. 3 of 2005 concerning property registration. The boundaries are updated continuously through digital subdivision approvals and field GPS land surveys with sub-decimeter geodetic precision.
                        </p>
                      </div>
                    )}
                    <button
                      onClick={() => setShowFullDesc(!showFullDesc)}
                      className="text-[11px] font-semibold text-[#1865C9] hover:underline cursor-pointer"
                    >
                      {showFullDesc ? 'Show less ▴' : 'Show more ▾'}
                    </button>
                  </div>

                  {/* Sample Attributes Table */}
                  <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-2xs">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                      <span className="text-[12px] font-bold text-[#0F172A]">Sample cadastral records</span>
                      <button
                        onClick={() => setActiveTab('Metadata')}
                        className="text-[11px] font-semibold text-[#1865C9] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        View full schema (12 fields) →
                      </button>
                    </div>

                    <table className="w-full text-[11px] mt-2">
                      <thead>
                        <tr className="text-[#64748B] border-b border-[#F1F5F9] text-left">
                          <th className="py-1 font-semibold">Parcel ID</th>
                          <th className="py-1 font-semibold">Municipality</th>
                          <th className="py-1 font-semibold">Land Use</th>
                          <th className="py-1 font-semibold">Area (m²)</th>
                          <th className="py-1 font-semibold text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F8FAFC]">
                        <tr>
                          <td className="py-2 font-mono text-[#0F172A] font-semibold">ADP-001-0482</td>
                          <td className="py-2 text-[#475569]">Abu Dhabi</td>
                          <td className="py-2 text-[#475569]">Commercial Mixed-Use</td>
                          <td className="py-2 font-mono text-[#475569]">1,420</td>
                          <td className="py-2 text-right">
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#EDF9F1] text-[#1E9E6A]">
                              Active Title Deed
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 font-mono text-[#0F172A] font-semibold">ADP-001-0483</td>
                          <td className="py-2 text-[#475569]">Abu Dhabi</td>
                          <td className="py-2 text-[#475569]">Residential Villa</td>
                          <td className="py-2 font-mono text-[#475569]">980</td>
                          <td className="py-2 text-right">
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#EDF9F1] text-[#1E9E6A]">
                              Active Title Deed
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 font-mono text-[#0F172A] font-semibold">ADP-001-0484</td>
                          <td className="py-2 text-[#475569]">Abu Dhabi</td>
                          <td className="py-2 text-[#475569]">Public Community Facility</td>
                          <td className="py-2 font-mono text-[#475569]">2,200</td>
                          <td className="py-2 text-right">
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#EDF9F1] text-[#1E9E6A]">
                              Municipal Reserve
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right 4-col Info Rail */}
                <div className="col-span-4 flex flex-col gap-4">
                  {/* Key information */}
                  <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-2xs space-y-2.5">
                    <div className="text-[13px] font-bold text-[#0F172A]">Key Information</div>

                    <div className="space-y-2 text-[12px]">
                      <div className="flex items-center justify-between">
                        <span className="text-[#64748B]">Custodian</span>
                        <span className="font-semibold text-[#0F172A] text-right text-[11px]">
                          Department of Municipalities and Transport
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#64748B]">Data steward</span>
                        <span className="font-medium text-[#0F172A] text-[11px]">Spatial Data & Survey Sector</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#64748B]">Classification</span>
                        <span className="font-medium text-[#0F172A] text-[11px]">Official – Government</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#64748B]">Update frequency</span>
                        <span className="font-medium text-[#0F172A] text-[11px]">Nightly Continuous</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#64748B]">Spatial coverage</span>
                        <span className="font-medium text-[#0F172A] text-[11px]">Abu Dhabi Emirate (100%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#64748B]">Projection / CRS</span>
                        <span className="font-mono text-[#1865C9] text-[11px] font-bold">EPSG:3997 (UTM 40N)</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Export Downloads */}
                  <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-2xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="text-[13px] font-bold text-[#0F172A]">Downloads & Formats</div>
                      <button
                        onClick={() => setActiveTab('Access')}
                        className="text-[11px] font-semibold text-[#1865C9] hover:underline"
                      >
                        Export options →
                      </button>
                    </div>

                    <div className="space-y-1.5 text-[12px]">
                      {[
                        { name: 'GeoPackage (.gpkg)', size: '245 MB' },
                        { name: 'ESRI Shapefile (.zip)', size: '230 MB' },
                        { name: 'GeoJSON (.geojson)', size: '310 MB' },
                        { name: 'CSV Attributes (.csv)', size: '12 MB' },
                      ].map((fmt, i) => (
                        <div
                          key={i}
                          onClick={handleTriggerExport}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-[#F1F5F9] cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <FileCode className="w-4 h-4 text-[#64748B]" />
                            <span className="font-medium text-[#0F172A]">{fmt.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-[#64748B] font-mono">{fmt.size}</span>
                            <Download className="w-3.5 h-3.5 text-[#1865C9]" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quality SLA Card */}
                  <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-2xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="text-[13px] font-bold text-[#0F172A]">SLA & Quality Gate</div>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                        Passed
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold text-[16px] text-emerald-700">
                        99.8%
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600">
                        <div>Topology: <strong>Zero Overlaps</strong></div>
                        <div>Positional Accuracy: <strong>±0.05m</strong></div>
                        <div>Completeness: <strong>100%</strong></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: METADATA & SCHEMA */}
            {activeTab === 'Metadata' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-[16px] font-bold text-navy-900">Attribute Schema & Data Dictionary</h2>
                    <p className="text-[12px] text-secondaryText">
                      Standardized data definitions conforming to Abu Dhabi Spatial Data Specifications (AD-SDS v4.2).
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-steel-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search attributes..."
                        value={schemaFilter}
                        onChange={(e) => setSchemaFilter(e.target.value)}
                        className="h-8 pl-8 pr-3 text-[12px] rounded-lg border border-border bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <button
                      onClick={() => showToast('Exported Schema JSON')}
                      className="px-3 py-1.5 bg-white border border-border rounded-lg text-[12px] font-medium hover:bg-slate-50 transition-colors"
                    >
                      Export Schema (JSON)
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
                  <table className="w-full text-left text-[12px]">
                    <thead className="bg-slate-50 border-b border-border text-secondaryText font-semibold">
                      <tr>
                        <th className="py-2.5 px-4">Field Name</th>
                        <th className="py-2.5 px-3">Type</th>
                        <th className="py-2.5 px-3 text-center">PK</th>
                        <th className="py-2.5 px-3 text-center">Nullable</th>
                        <th className="py-2.5 px-4">Description</th>
                        <th className="py-2.5 px-4">Sample Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {filteredSchema.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-2.5 px-4 font-mono font-bold text-navy-900">{item.name}</td>
                          <td className="py-2.5 px-3">
                            <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                              {item.type}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            {item.pk ? (
                              <span className="font-bold text-[10px] text-amber-700 bg-amber-50 px-1 rounded">PK</span>
                            ) : (
                              '—'
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-center text-steel-500">{item.null}</td>
                          <td className="py-2.5 px-4 text-slate-600">{item.desc}</td>
                          <td className="py-2.5 px-4 font-mono text-emerald-700 font-semibold">{item.example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: SERVICES & APIS */}
            {activeTab === 'Services & APIs' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-[16px] font-bold text-navy-900">Developer APIs & Geospatial Web Services</h2>
                    <p className="text-[12px] text-secondaryText">
                      High-throughput OGC API Features, WFS 2.0 and WMS endpoints hosted on UAE Sovereign Cloud.
                    </p>
                  </div>
                  <button
                    onClick={handleCopyUrl}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[12px] font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Production Endpoint</span>
                  </button>
                </div>

                {/* Protocol Tabs */}
                <div className="flex items-center gap-2 border-b border-border pb-2 text-[12px]">
                  {[
                    { id: 'ogc', label: 'OGC API Features (Modern REST)' },
                    { id: 'wfs', label: 'WFS 2.0.0 (Vector GML)' },
                    { id: 'wms', label: 'WMS 1.3.0 (Map Tiles)' },
                    { id: 'geojson', label: 'GeoJSON Streaming REST' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setActiveProtocol(p.id as any)}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                        activeProtocol === p.id
                          ? 'bg-navy-900 text-white font-bold'
                          : 'bg-slate-100 text-secondaryText hover:text-navy-900'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Live Endpoint Box */}
                <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3 font-mono text-[12px]">
                  <div className="flex items-center justify-between text-steel-400 text-[11px]">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>GET /v1/features/cadastre/parcels</span>
                    </span>
                    <span>Status: 200 OK · Latency: 18ms</span>
                  </div>

                  <div className="bg-black/40 p-3 rounded-lg border border-white/10 flex items-center justify-between text-emerald-400">
                    <span className="truncate">
                      https://api.sdi.abudhabi.ae/v1/features/cadastre/parcels?limit=10&crs=EPSG:3997
                    </span>
                    <button
                      onClick={handleCopyUrl}
                      className="ml-2 text-white hover:text-[#E5A817] p-1 flex-shrink-0"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-steel-400">Requires Bearer Token authentication</span>
                    <button
                      onClick={handleRunApiTest}
                      disabled={testApiRunning}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[12px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>{testApiRunning ? 'Executing query...' : 'Execute Test Query'}</span>
                    </button>
                  </div>

                  {apiResponsePayload && (
                    <div className="mt-3 p-3 bg-black/60 rounded-lg border border-white/15 max-h-[180px] overflow-y-auto text-[11px] text-steel-300">
                      <pre>{apiResponsePayload}</pre>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: QUALITY & SLA */}
            {activeTab === 'Quality' && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-[16px] font-bold text-navy-900">ISO 19157 Geospatial Quality Certification</h2>
                  <p className="text-[12px] text-secondaryText">
                    Automated quality evaluation verified through AD-SDI Sovereign Clearinghouse Gateway.
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {[
                    { title: 'Positional Accuracy', score: '99.4%', desc: 'Root Mean Square Error < 0.05 m', status: 'Passed' },
                    { title: 'Logical Consistency', score: '100%', desc: 'Zero self-intersections or sliver polygons', status: 'Passed' },
                    { title: 'Completeness', score: '99.8%', desc: 'All registered municipal deeds geocoded', status: 'Passed' },
                    { title: 'Temporal Currency', score: '100%', desc: 'Nightly continuous sync with DMT cadastre', status: 'Passed' },
                  ].map((q, qi) => (
                    <div key={qi} className="bg-white rounded-xl border border-border p-4 shadow-sm space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] font-bold text-navy-900">{q.title}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                          {q.status}
                        </span>
                      </div>
                      <div className="text-[26px] font-bold text-emerald-700 font-mono">{q.score}</div>
                      <p className="text-[11px] text-secondaryText">{q.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: ACCESS & EXPORT */}
            {(activeTab === 'Access' || activeTab === 'Versions' || activeTab === 'Lineage') && (
              <div className="space-y-4 max-w-[800px]">
                <div>
                  <h2 className="text-[16px] font-bold text-navy-900">Data Access & Bulk Export Configuration</h2>
                  <p className="text-[12px] text-secondaryText">
                    Select your spatial bounds, coordinate reference system, and target delivery format.
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-border p-5 space-y-4 shadow-sm text-[12px]">
                  <div>
                    <label className="font-bold text-navy-900 block mb-1">Target Format</label>
                    <select
                      value={exportFormat}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-border bg-slate-50 focus:bg-white text-[13px] outline-none"
                    >
                      <option>GeoPackage (.gpkg)</option>
                      <option>ESRI Shapefile (.zip)</option>
                      <option>GeoJSON (.geojson)</option>
                      <option>AutoCAD DXF (.dxf)</option>
                      <option>CSV Attributes with Coordinates (.csv)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-navy-900 block mb-1">Coordinate Reference System (CRS)</label>
                    <select
                      value={exportCrs}
                      onChange={(e) => setExportCrs(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-border bg-slate-50 focus:bg-white text-[13px] outline-none"
                    >
                      <option>EPSG:3997 (Abu Dhabi UTM 40N - Official Metric)</option>
                      <option>EPSG:4326 (WGS 84 - Standard Latitude/Longitude)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-navy-900 block mb-1">Geographic Region</label>
                    <select
                      value={exportRegion}
                      onChange={(e) => setExportRegion(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-border bg-slate-50 focus:bg-white text-[13px] outline-none"
                    >
                      <option>Abu Dhabi Metropolitan Area</option>
                      <option>Al Ain Region</option>
                      <option>Al Dhafra Region</option>
                      <option>Entire Abu Dhabi Emirate (All Municipalities)</option>
                    </select>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-border">
                    <span className="text-secondaryText">Estimated bundle size: ~245 MB</span>
                    <button
                      onClick={handleTriggerExport}
                      disabled={isDownloading}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-[13px] flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>{isDownloading ? 'Generating...' : 'Download Export Bundle'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
