import React, { useState } from 'react';
import { ScreenId } from './types';

// Screens import
import { S00_Login } from './screens/S00_Login';
import { S00_Login_AR } from './screens/S00_Login_AR';
import { S01_Home } from './screens/S01_Home';
import { S01_Home_AR } from './screens/S01_Home_AR';
import { S02_CatalogueSearch } from './screens/S02_CatalogueSearch';
import { S03_DatasetDetail } from './screens/S03_DatasetDetail';
import { S04_PublishingApprovals } from './screens/S04_PublishingApprovals';
import { S05_QualitySlaDashboard } from './screens/S05_QualitySlaDashboard';
import { S06_GeoAiChangeDetection } from './screens/S06_GeoAiChangeDetection';
import { S07_GeoAiAssistant } from './screens/S07_GeoAiAssistant';
import { S08_MarketplaceCatalogue } from './screens/S08_MarketplaceCatalogue';
import { S09a_MarketplaceRequest } from './screens/S09a_MarketplaceRequest';
import { S09b_MyEntitlements } from './screens/S09b_MyEntitlements';
import { S09c_ProviderWorkspace } from './screens/S09c_ProviderWorkspace';
import { S10_DigitalTwin3d } from './screens/S10_DigitalTwin3d';
import { S11_ProgrammeCommandCentre } from './screens/S11_ProgrammeCommandCentre';
import { S12_GeoMaturityTraining } from './screens/S12_GeoMaturityTraining';
import { S13_OpenDataPortal } from './screens/S13_OpenDataPortal';
import { S13_OpenDataPortal_AR } from './screens/S13_OpenDataPortal_AR';
import { S14_SecurityAccessConsole } from './screens/S14_SecurityAccessConsole';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('S01_Home');
  const [showNavPill, setShowNavPill] = useState(true);
  const [pillMenuOpen, setPillMenuOpen] = useState(false);

  const screens: { id: ScreenId; label: string; group: string }[] = [
    { id: 'S00_Login', label: 'S00 · Login (Split Screen)', group: 'Auth' },
    { id: 'S00_Login_AR', label: 'S00_AR · تسجيل الدخول (عربي)', group: 'Auth' },
    { id: 'S01_Home', label: 'S01 · Public Home', group: 'Public' },
    { id: 'S01_Home_AR', label: 'S01_AR · البوابة العامة (عربي)', group: 'Public' },
    { id: 'S02_CatalogueSearch', label: 'S02 · Catalogue Search + Map', group: 'Catalogue' },
    { id: 'S03_DatasetDetail', label: 'S03 · Dataset Detail (Cadastre)', group: 'Catalogue' },
    { id: 'S04_PublishingApprovals', label: 'S04 · Publishing & Approvals', group: 'Governance' },
    { id: 'S05_QualitySlaDashboard', label: 'S05 · Quality & SLA Dashboard', group: 'Governance' },
    { id: 'S06_GeoAiChangeDetection', label: 'S06 · GeoAI Studio', group: 'GeoAI' },
    { id: 'S07_GeoAiAssistant', label: 'S07 · GeoAI Copilot Assistant', group: 'GeoAI' },
    { id: 'S08_MarketplaceCatalogue', label: 'S08 · Data Marketplace', group: 'Marketplace' },
    { id: 'S09a_MarketplaceRequest', label: 'S09a · Data Request Workflow', group: 'Marketplace' },
    { id: 'S09b_MyEntitlements', label: 'S09b · My Data Entitlements', group: 'Marketplace' },
    { id: 'S09c_ProviderWorkspace', label: 'S09c · Provider Workspace', group: 'Marketplace' },
    { id: 'S10_DigitalTwin3d', label: 'S10 · Digital Twin 3D', group: 'Digital Twin' },
    { id: 'S11_ProgrammeCommandCentre', label: 'S11 · Command Centre 2029', group: 'Programme' },
    { id: 'S12_GeoMaturityTraining', label: 'S12 · GeoMaturity & Training', group: 'Enablement' },
    { id: 'S13_OpenDataPortal', label: 'S13 · Open Data Portal', group: 'Public' },
    { id: 'S13_OpenDataPortal_AR', label: 'S13_AR · البيانات المفتوحة (عربي)', group: 'Public' },
    { id: 'S14_SecurityAccessConsole', label: 'S14 · Security & Access Console', group: 'Security' },
  ];

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'S00_Login':
        return <S00_Login onNavigate={setCurrentScreen} />;
      case 'S00_Login_AR':
        return <S00_Login_AR onNavigate={setCurrentScreen} />;
      case 'S01_Home':
        return <S01_Home onNavigate={setCurrentScreen} />;
      case 'S01_Home_AR':
        return <S01_Home_AR onNavigate={setCurrentScreen} />;
      case 'S02_CatalogueSearch':
        return <S02_CatalogueSearch onNavigate={setCurrentScreen} />;
      case 'S03_DatasetDetail':
        return <S03_DatasetDetail onNavigate={setCurrentScreen} />;
      case 'S04_PublishingApprovals':
        return <S04_PublishingApprovals onNavigate={setCurrentScreen} />;
      case 'S05_QualitySlaDashboard':
        return <S05_QualitySlaDashboard onNavigate={setCurrentScreen} />;
      case 'S06_GeoAiChangeDetection':
        return <S06_GeoAiChangeDetection onNavigate={setCurrentScreen} />;
      case 'S07_GeoAiAssistant':
        return <S07_GeoAiAssistant onNavigate={setCurrentScreen} />;
      case 'S08_MarketplaceCatalogue':
        return <S08_MarketplaceCatalogue onNavigate={setCurrentScreen} />;
      case 'S09a_MarketplaceRequest':
        return <S09a_MarketplaceRequest onNavigate={setCurrentScreen} />;
      case 'S09b_MyEntitlements':
        return <S09b_MyEntitlements onNavigate={setCurrentScreen} />;
      case 'S09c_ProviderWorkspace':
        return <S09c_ProviderWorkspace onNavigate={setCurrentScreen} />;
      case 'S10_DigitalTwin3d':
        return <S10_DigitalTwin3d onNavigate={setCurrentScreen} />;
      case 'S11_ProgrammeCommandCentre':
        return <S11_ProgrammeCommandCentre onNavigate={setCurrentScreen} />;
      case 'S12_GeoMaturityTraining':
        return <S12_GeoMaturityTraining onNavigate={setCurrentScreen} />;
      case 'S13_OpenDataPortal':
        return <S13_OpenDataPortal onNavigate={setCurrentScreen} />;
      case 'S13_OpenDataPortal_AR':
        return <S13_OpenDataPortal_AR onNavigate={setCurrentScreen} />;
      case 'S14_SecurityAccessConsole':
        return <S14_SecurityAccessConsole onNavigate={setCurrentScreen} />;
      default:
        return <S01_Home onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] relative">
      {/* Pure, Unencumbered Application Screen */}
      {renderActiveScreen()}

      {/* Discreet Floating Screen Switcher (Bottom Right) */}
      <div className="fixed bottom-3 right-3 z-50">
        {showNavPill ? (
          <div className="relative">
            <div className="flex items-center gap-1.5 bg-[#0B2545]/90 hover:bg-[#0B2545] backdrop-blur-md text-white px-3 py-1.5 rounded-full shadow-lg border border-white/20 text-[12px] font-medium transition-all">
              <button
                onClick={() => setPillMenuOpen(!pillMenuOpen)}
                className="flex items-center gap-2 hover:text-[#E5A817] transition-colors"
                title="Switch Screen"
              >
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>{screens.find((s) => s.id === currentScreen)?.label.split(' · ')[0] || currentScreen}</span>
                <span className="text-[#647D9E] text-[10px]">▾</span>
              </button>

              <button
                onClick={() => setShowNavPill(false)}
                className="text-[#647D9E] hover:text-white ml-1 text-[11px] p-0.5"
                title="Hide Switcher"
              >
                ✕
              </button>
            </div>

            {/* Dropdown Menu */}
            {pillMenuOpen && (
              <div className="absolute bottom-10 right-0 w-[280px] max-h-[380px] overflow-y-auto bg-[#07162C] border border-white/15 rounded-xl shadow-2xl p-2 text-[12px] text-white space-y-1">
                <div className="px-2 py-1 text-[10px] font-bold text-[#647D9E] uppercase tracking-wider border-b border-white/10 flex justify-between">
                  <span>Switch Screen</span>
                  <span>{screens.length} Screens</span>
                </div>
                {screens.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setCurrentScreen(s.id);
                      setPillMenuOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                      currentScreen === s.id
                        ? 'bg-[#1865C9] text-white font-semibold'
                        : 'text-[#8DA4C4] hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{s.label}</span>
                    <span className="text-[10px] text-white/50">{s.group}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowNavPill(true)}
            className="w-7 h-7 bg-[#0B2545]/70 hover:bg-[#0B2545] backdrop-blur-md rounded-full text-white/70 hover:text-white flex items-center justify-center text-[10px] border border-white/20 shadow-md transition-all"
            title="Open Screen Switcher"
          >
            ⚡
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
