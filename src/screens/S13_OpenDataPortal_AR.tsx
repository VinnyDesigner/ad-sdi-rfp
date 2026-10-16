import React from 'react';
import { ScreenId } from '../types';
import { S13_OpenDataPortal } from './S13_OpenDataPortal';

export const S13_OpenDataPortal_AR: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  return <S13_OpenDataPortal onNavigate={onNavigate} isArabic={true} />;
};
