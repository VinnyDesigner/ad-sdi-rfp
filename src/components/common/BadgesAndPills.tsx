import React from 'react';
import { MODULES } from '../../constants/tokens';

export type ClassificationType = 'Open' | 'Shared' | 'Restricted' | 'Confidential';

export const ClassificationBadge: React.FC<{ classification: ClassificationType; className?: string }> = ({
  classification,
  className = '',
}) => {
  const styles: Record<ClassificationType, { bg: string; text: string; border: string; dot: string }> = {
    Open: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
    Shared: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-600' },
    Restricted: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200', dot: 'bg-amber-500' },
    Confidential: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', dot: 'bg-rose-600' },
  };

  const current = styles[classification] || styles.Shared;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${current.bg} ${current.text} ${current.border} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
      <span>{classification}</span>
    </span>
  );
};

export const AudienceChip: React.FC<{ audience: string; className?: string }> = ({ audience, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-canvas text-secondaryText border border-border ${className}`}
    >
      {audience}
    </span>
  );
};

export const ModuleBadge: React.FC<{ moduleKey: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'; size?: 'sm' | 'md' }> = ({
  moduleKey,
  size = 'md',
}) => {
  const mod = MODULES[moduleKey];
  if (!mod) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full ${
        size === 'sm' ? 'px-1.5 py-0.2 text-[10px]' : 'px-2 py-0.5 text-[11px]'
      }`}
      style={{
        backgroundColor: `${mod.color}15`,
        color: mod.color,
        border: `1px solid ${mod.color}35`,
      }}
    >
      <span className="font-bold">{mod.code}</span>
      <span>·</span>
      <span>{mod.name.split('&')[0].trim()}</span>
    </span>
  );
};

export const StatusPill: React.FC<{
  status: 'passed' | 'healthy' | 'on-track' | 'at-risk' | 'pending' | 'rejected' | 'active';
  label?: string;
  className?: string;
}> = ({ status, label, className = '' }) => {
  const configs: Record<string, { bg: string; text: string; dot: string; defaultLabel: string }> = {
    passed: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', defaultLabel: 'Quality passed' },
    healthy: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', defaultLabel: 'Healthy' },
    'on-track': { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', defaultLabel: 'On track' },
    'at-risk': { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800', dot: 'bg-amber-500', defaultLabel: 'At risk' },
    pending: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800', dot: 'bg-amber-500', defaultLabel: 'Pending' },
    rejected: { bg: 'bg-rose-50 border-rose-200', text: 'text-rose-700', dot: 'bg-rose-500', defaultLabel: 'Rejected' },
    active: { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700', dot: 'bg-blue-600', defaultLabel: 'Active' },
  };

  const cfg = configs[status] || configs.passed;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${cfg.bg} ${cfg.text} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      <span>{label || cfg.defaultLabel}</span>
    </span>
  );
};
