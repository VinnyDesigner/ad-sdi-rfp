import React from 'react';
import { ScreenId } from '../types';
import { S00_Login } from './S00_Login';

export const S00_Login_AR: React.FC<{ onNavigate: (s: ScreenId) => void }> = ({ onNavigate }) => {
  return <S00_Login onNavigate={onNavigate} isArabic={true} />;
};
