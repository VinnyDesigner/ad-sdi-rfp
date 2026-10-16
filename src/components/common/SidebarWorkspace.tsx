import React from 'react';
import { ScreenId } from '../../types';
import {
  Compass,
  Map,
  ShoppingBag,
  Sparkles,
  Layers,
  Code2,
  FileCheck2,
  BarChart3,
  ShieldCheck,
  FileText,
  GraduationCap,
  Activity,
  ChevronRight,
  Bot,
} from 'lucide-react';

interface SidebarWorkspaceProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  collapsed?: boolean;
  isDarkTheme?: boolean;
}

export const SidebarWorkspace: React.FC<SidebarWorkspaceProps> = ({
  currentScreen,
  onNavigate,
  collapsed = false,
  isDarkTheme = true,
}) => {
  const navSections = [
    {
      group: 'DISCOVER',
      items: [
        {
          id: 'catalogue',
          label: 'Catalogue',
          icon: Compass,
          targetScreen: 'S02_CatalogueSearch' as ScreenId,
          activeFor: ['S02_CatalogueSearch', 'S03_DatasetDetail'],
        },
        {
          id: 'map-viewer',
          label: 'Map Viewer',
          icon: Map,
          targetScreen: 'S02_CatalogueSearch' as ScreenId,
          activeFor: [],
        },
        {
          id: 'marketplace',
          label: 'Marketplace',
          icon: ShoppingBag,
          targetScreen: 'S08_MarketplaceCatalogue' as ScreenId,
          activeFor: ['S08_MarketplaceCatalogue', 'S09a_MarketplaceRequest', 'S09b_MyEntitlements', 'S09c_ProviderWorkspace'],
        },
      ],
    },
    {
      group: 'BUILD',
      items: [
        {
          id: 'geoai-studio',
          label: 'GeoAI Studio',
          icon: Sparkles,
          targetScreen: 'S06_GeoAiChangeDetection' as ScreenId,
          activeFor: ['S06_GeoAiChangeDetection'],
        },
        {
          id: 'digital-twin',
          label: 'Digital Twin',
          icon: Layers,
          targetScreen: 'S10_DigitalTwin3d' as ScreenId,
          activeFor: ['S10_DigitalTwin3d'],
        },
        {
          id: 'apis-services',
          label: 'APIs & Services',
          icon: Code2,
          targetScreen: 'S03_DatasetDetail' as ScreenId,
          activeFor: [],
        },
      ],
    },
    {
      group: 'GOVERN',
      items: [
        {
          id: 'publishing-approvals',
          label: 'Publishing & Approvals',
          icon: FileCheck2,
          targetScreen: 'S04_PublishingApprovals' as ScreenId,
          badge: '15',
          activeFor: ['S04_PublishingApprovals'],
        },
        {
          id: 'quality-sla',
          label: 'Quality & SLA',
          icon: BarChart3,
          targetScreen: 'S05_QualitySlaDashboard' as ScreenId,
          activeFor: ['S05_QualitySlaDashboard'],
        },
        {
          id: 'security-access',
          label: 'Security & Access',
          icon: ShieldCheck,
          targetScreen: 'S14_SecurityAccessConsole' as ScreenId,
          activeFor: ['S14_SecurityAccessConsole'],
        },
        {
          id: 'policies-standards',
          label: 'Policies & Standards',
          icon: FileText,
          targetScreen: 'S14_SecurityAccessConsole' as ScreenId,
          activeFor: [],
        },
      ],
    },
    {
      group: 'ENABLE',
      items: [
        {
          id: 'geomaturity-training',
          label: 'GeoMaturity & Training',
          icon: GraduationCap,
          targetScreen: 'S12_GeoMaturityTraining' as ScreenId,
          activeFor: ['S12_GeoMaturityTraining'],
        },
      ],
    },
  ];

  const bgColor = isDarkTheme ? 'bg-[#07162C] border-[#132A4A] text-white' : 'bg-white border-border text-primaryText';
  const groupLabelColor = isDarkTheme ? 'text-[#647D9E]' : 'text-secondaryText';
  const inactiveItemColor = isDarkTheme ? 'text-[#8DA4C4] hover:text-white hover:bg-white/5' : 'text-secondaryText hover:text-navy-900 hover:bg-canvas';

  return (
    <aside
      className={`h-[calc(100vh-72px)] border-r select-none transition-all flex flex-col justify-between overflow-y-auto ${bgColor} ${
        collapsed ? 'w-[72px] px-2 py-4' : 'w-[230px] px-3 py-4'
      }`}
    >
      <div className="space-y-4">
        {navSections.map((sec, sIdx) => (
          <div key={sIdx} className="space-y-1">
            {!collapsed && (
              <div className={`px-3 text-[10px] font-bold tracking-wider uppercase ${groupLabelColor}`}>
                {sec.group}
              </div>
            )}
            <div className="space-y-0.5">
              {sec.items.map((item) => {
                const isActive = item.activeFor.includes(currentScreen);
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.targetScreen)}
                    title={collapsed ? item.label : undefined}
                    className={`w-full h-[36px] flex items-center rounded-lg text-[13px] font-medium transition-all relative ${
                      collapsed ? 'justify-center px-0' : 'px-3 gap-3 justify-between'
                    } ${
                      isActive
                        ? 'bg-[#0F396B] text-white font-semibold shadow-sm'
                        : inactiveItemColor
                    }`}
                  >
                    {/* Active Gold marker on left edge */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[20px] bg-[#E5A817] rounded-r" />
                    )}

                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        className={`w-4 h-4 flex-shrink-0 ${
                          isActive
                            ? 'text-white'
                            : isDarkTheme
                            ? 'text-[#8DA4C4]'
                            : 'text-secondaryText'
                        }`}
                      />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!collapsed && item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer Info: Production UAE Hosting */}
      {!collapsed && (
        <div className="p-3 border-t border-[#132A4A]/60 flex items-center gap-2.5 text-[11px] text-[#8DA4C4]">
          <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]"></span>
          <div className="flex flex-col leading-tight">
            <span className="text-white/90 font-medium">Production</span>
            <span className="text-[10px] text-[#647D9E]">UAE Hosting</span>
          </div>
        </div>
      )}
    </aside>
  );
};
