import React from 'react';
import { Match, Team, TimezoneMode } from '../types';
import { getTeamById } from '../data/teams';
import { TeamBadge } from './TeamBadge';
import { Clock, Edit3, Trophy, Flame } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  timezone: TimezoneMode;
  onEditMatch: (match: Match) => void;
  onSelectTeam: (team: Team) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  timezone,
  onEditMatch,
  onSelectTeam
}) => {
  const homeTeam = getTeamById(match.homeTeamId);
  const awayTeam = getTeamById(match.awayTeamId);

  const displayTime = timezone === 'BRT' ? match.timeBRT : match.timeCAT;
  const tzLabel = timezone === 'BRT' ? 'BRT' : 'CAT';

  return (
    <div className="bg-[#162A3D] border border-[#2B4052] rounded-xl p-4 shadow-sm hover:border-slate-500 transition-all group text-white">
      {/* Top Header Badge */}
      <div className="flex items-center justify-between text-[11px] text-slate-300 border-b border-[#2B4052] pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          {match.stage === 'GROUP' ? (
            <span className="font-extrabold text-white bg-[#0B1F33] px-2 py-0.5 rounded border border-[#2B4052] uppercase tracking-wider text-[10px]">
              GRUPO {match.group} • RODADA {match.round}
            </span>
          ) : (
            <span className="font-extrabold text-amber-300 bg-[#0B1F33] px-2 py-0.5 rounded border border-[#2B4052] flex items-center gap-1 uppercase text-[10px]">
              <Trophy className="w-3 h-3 text-amber-400" />
              {match.stage === 'QUARTERS' && 'QUARTAS DE FINAL'}
              {match.stage === 'SEMIS' && 'SEMIFINAL'}
              {match.stage === 'THIRD_PLACE' && 'DISPUTA DE 3º LUGAR'}
              {match.stage === 'FINAL' && 'GRANDE FINAL'}
            </span>
          )}
          <span className="font-medium text-slate-400">{match.date}</span>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          {match.status === 'LIVE' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#138A4B] text-white font-extrabold text-[10px] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              AO VIVO
            </span>
          )}

          {match.status === 'FINISHED' && (
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#0B1F33] text-slate-300 font-bold text-[10px] uppercase border border-[#2B4052]">
              FIM
            </span>
          )}

          {match.status === 'SCHEDULED' && (
            <span className="inline-flex items-center gap-1 text-slate-300 font-bold text-[11px] bg-[#0B1F33] px-2 py-0.5 rounded border border-[#2B4052]">
              <Clock className="w-3 h-3 text-slate-400" />
              {displayTime} {tzLabel}
            </span>
          )}

          <button
            onClick={() => onEditMatch(match)}
            className="p-1 rounded bg-[#0B1F33] hover:bg-[#12283e] text-slate-300 transition-colors border border-[#2B4052]"
            title="Lançamento manual de placar (Admin)"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Scoreboard Body */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-1">
        {/* Home Team */}
        <div
          onClick={() => onSelectTeam(homeTeam)}
          className="flex flex-col sm:flex-row items-center justify-end gap-2 text-right cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="font-black text-white text-sm sm:text-base tracking-tight order-2 sm:order-1 truncate max-w-[110px] sm:max-w-none font-display">
            {homeTeam.name}
          </span>
          <TeamBadge team={homeTeam} size="md" className="order-1 sm:order-2 shrink-0" />
        </div>

        {/* Score Box */}
        <div className="flex flex-col items-center justify-center px-3 py-1 bg-[#0B1F33] border border-[#2B4052] text-white rounded-lg min-w-[80px]">
          {match.status === 'SCHEDULED' ? (
            <div className="text-center">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono block">
                VS
              </span>
              <span className="text-[9px] text-amber-400 font-bold block uppercase tracking-tight">
                Aguardando início
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xl font-black font-mono text-white">
              <span>{match.homeScore ?? 0}</span>
              <span className="text-slate-500 text-sm font-sans">-</span>
              <span>{match.awayScore ?? 0}</span>
            </div>
          )}
        </div>

        {/* Away Team */}
        <div
          onClick={() => onSelectTeam(awayTeam)}
          className="flex flex-col sm:flex-row items-center justify-start gap-2 text-left cursor-pointer hover:opacity-80 transition-opacity"
        >
          <TeamBadge team={awayTeam} size="md" className="shrink-0" />
          <span className="font-black text-white text-sm sm:text-base tracking-tight truncate max-w-[110px] sm:max-w-none font-display">
            {awayTeam.name}
          </span>
        </div>
      </div>

      {/* Goalscorers detail (if manually entered during live tournament) */}
      {match.goals && match.goals.length > 0 && (
        <div className="mt-3 pt-2 border-t border-[#2B4052] text-[11px] text-slate-300 bg-[#0B1F33] p-2 rounded-lg">
          <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
            <Flame className="w-3 h-3 text-amber-500" />
            <span>Gols da Partida</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-0.5 text-right border-r border-[#2B4052] pr-2 font-medium">
              {match.goals
                .filter((g) => g.teamId === match.homeTeamId)
                .map((g, idx) => (
                  <div key={idx} className="truncate">
                    ⚽ {g.player} <span className="text-slate-400 font-mono">({g.minute}')</span>
                  </div>
                ))}
            </div>

            <div className="space-y-0.5 text-left pl-2 font-medium">
              {match.goals
                .filter((g) => g.teamId === match.awayTeamId)
                .map((g, idx) => (
                  <div key={idx} className="truncate">
                    ⚽ {g.player} <span className="text-slate-400 font-mono">({g.minute}')</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
