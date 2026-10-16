export const COLORS = {
  navy900: '#0B2545',
  navy800: '#0E2B52',
  navy700: '#13315C',
  gold500: '#FFC20E',
  steel400: '#7A9CC6',
  blue600: '#1F5FAD',
  canvas: '#F5F7FA',
  surface: '#FFFFFF',
  border: '#E3E8EF',
  textPrimary: '#14213D',
  textSecondary: '#5B6B7F',
  success: '#1E9E6A',
  warning: '#E8A317',
  danger: '#D64545',
  info: '#2F80ED',
  darkBg: '#0A1628',
  darkSurface: '#13233D',
  darkBorder: 'rgba(255, 255, 255, 0.08)',
};

export const MODULES = {
  A: {
    code: 'A',
    name: 'Clearinghouse & Portal',
    nameAr: 'المستودع والبوابة الجغرافية',
    color: '#1F5FAD',
  },
  B: {
    code: 'B',
    name: 'GeoAI',
    nameAr: 'الذكاء الجيومكاني الاصطناعي',
    color: '#7B4FD6',
  },
  C: {
    code: 'C',
    name: 'Marketplace',
    nameAr: 'سوق البيانات الجغرافية',
    color: '#0E9F8E',
  },
  D: {
    code: 'D',
    name: 'Capacity Building',
    nameAr: 'بناء القدرات والتدريب',
    color: '#E07B24',
  },
  E: {
    code: 'E',
    name: 'Digital Twin',
    nameAr: 'التوأم الرقمي ثلاثي الأبعاد',
    color: '#2BA6DE',
  },
  F: {
    code: 'F',
    name: 'Open Data',
    nameAr: 'منصة البيانات المفتوحة',
    color: '#5DAA3A',
  },
};

export const ENTITIES = [
  { short: 'DMT', name: 'Department of Municipalities and Transport', nameAr: 'دائرة البلديات والنقل' },
  { short: 'EAD', name: 'Environment Agency – Abu Dhabi', nameAr: 'هيئة البيئة – أبوظبي' },
  { short: 'SCAD', name: 'Statistics Centre – Abu Dhabi', nameAr: 'مركز الإحصاء – أبوظبي' },
  { short: 'DoH', name: 'Department of Health', nameAr: 'دائرة الصحة' },
  { short: 'ADEK', name: 'Abu Dhabi Department of Education and Knowledge', nameAr: 'دائرة التعليم والمعرفة' },
  { short: 'ADPHC', name: 'Abu Dhabi Public Health Centre', nameAr: 'مركز أبوظبي للصحة العامة' },
  { short: 'ADCD', name: 'Abu Dhabi Civil Defence Authority', nameAr: 'هيئة أبوظبي للدفاع المدني' },
];

export const PERSONAS = {
  ahmed: {
    name: 'Ahmed Al Mansoori',
    role: 'Government Entity',
    entity: 'Government Entity',
    initials: 'AM',
    avatarBg: '#1F5FAD',
  },
  fatima: {
    name: 'Fatima A.',
    role: 'Data Steward',
    entity: 'DMT',
    initials: 'FA',
    avatarBg: '#1F5FAD',
  },
  khalid: {
    name: 'Khalid M.',
    role: 'Data Steward',
    entity: 'DMT',
    initials: 'KM',
    avatarBg: '#0B2545',
  },
  omar: {
    name: 'Omar R.',
    role: 'Approved Partner',
    entity: 'GeoAnalytics LLC',
    initials: 'OR',
    avatarBg: '#0E9F8E',
  },
};
