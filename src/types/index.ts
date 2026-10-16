export type ScreenId =
  | 'S00_Login'
  | 'S00_Login_AR'
  | 'S01_Home'
  | 'S01_Home_AR'
  | 'S02_CatalogueSearch'
  | 'S03_DatasetDetail'
  | 'S04_PublishingApprovals'
  | 'S05_QualitySlaDashboard'
  | 'S06_GeoAiChangeDetection'
  | 'S07_GeoAiAssistant'
  | 'S08_MarketplaceCatalogue'
  | 'S09a_MarketplaceRequest'
  | 'S09b_MyEntitlements'
  | 'S09c_ProviderWorkspace'
  | 'S10_DigitalTwin3d'
  | 'S11_ProgrammeCommandCentre'
  | 'S12_GeoMaturityTraining'
  | 'S13_OpenDataPortal'
  | 'S13_OpenDataPortal_AR'
  | 'S14_SecurityAccessConsole';

export type UserPersona = {
  name: string;
  role: string;
  entity: string;
  initials: string;
  avatarBg?: string;
};

export type NavItem = {
  id: string;
  label: string;
  labelAr?: string;
  icon: string;
  screenId?: ScreenId;
  badge?: string;
};

export type NavGroup = {
  groupName: string;
  groupNameAr?: string;
  items: NavItem[];
};
