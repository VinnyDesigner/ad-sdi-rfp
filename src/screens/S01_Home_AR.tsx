import React from 'react';
import { ScreenId } from '../types';
import { S01_Home } from './S01_Home';

export const S01_Home_AR: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  return <S01_Home onNavigate={onNavigate} isArabic={true} />;
};
