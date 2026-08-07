import React from 'react';
import { Crown, Lock, Star, Shield, Flame, Zap, Wine, Award, Trophy } from 'lucide-react';
import { Team } from '../types';

interface TeamBadgeProps {
  team: Team;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showName?: boolean;
  className?: string;
}

export const TeamBadge: React.FC<TeamBadgeProps> = ({
  team,
  size = 'md',
  showName = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  };

  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 22,
    xl: 30
  };

  const renderIcon = () => {
    const s = iconSizes[size];
    switch (team.badgeType) {
      case 'crown':
        return <Crown size={s} style={{ color: team.secondaryColor }} />;
      case 'lock':
        return <Lock size={s} style={{ color: team.secondaryColor }} />;
      case 'star':
        return <Star size={s} style={{ color: team.secondaryColor }} fill={team.secondaryColor} />;
      case 'clover':
        return <Award size={s} style={{ color: team.secondaryColor }} />;
      case 'lightning':
        return <Zap size={s} style={{ color: team.secondaryColor }} fill={team.secondaryColor} />;
      case 'bottle':
        return <Wine size={s} style={{ color: team.secondaryColor }} />;
      case 'fire':
        return <Flame size={s} style={{ color: team.secondaryColor }} fill={team.secondaryColor} />;
      case 'eagle':
        return <Trophy size={s} style={{ color: team.secondaryColor }} />;
      case 'shield':
      default:
        return <Shield size={s} style={{ color: team.secondaryColor }} />;
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div
        className={`relative flex items-center justify-center rounded-lg shadow-md transition-transform hover:scale-105 shrink-0 ${sizeClasses[size]}`}
        style={{
          background: `linear-gradient(135deg, ${team.primaryColor} 0%, ${adjustColor(team.primaryColor, -30)} 100%)`,
          border: `1.5px solid ${team.secondaryColor}80`
        }}
        title={team.name}
      >
        <div className="relative z-10 flex items-center justify-center">
          {renderIcon()}
        </div>
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-lg opacity-20 blur-sm pointer-events-none"
          style={{ backgroundColor: team.primaryColor }}
        />
      </div>

      {showName && (
        <span className="font-semibold text-slate-100 tracking-wide truncate">
          {team.name}
        </span>
      )}
    </div>
  );
};

// Simple color shade helper
function adjustColor(col: string, amt: number) {
  let usePound = false;
  if (col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }
  let num = parseInt(col, 16);
  if (isNaN(num)) return col;

  let r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
}
