import React from 'react';
import { Match, Team, TimezoneMode } from '../types';
import { getTeamById } from '../data/teams';
import { TeamBadge } from './TeamBadge';
import { Trophy, Award, Crown, Edit3, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface KnockoutBracketProps {
  matches: Match[];
  timezone: TimezoneMode;
  onEditMatch: (match: Match) => void;
  onSelectTeam: (team: Team) => void;
}

export const KnockoutBracket: React.FC<KnockoutBracketProps> = ({
  matches,
  timezone,
  onEditMatch,
  onSelectTeam
}) => {
  const quarters = matches.filter((m) => m.stage === 'QUARTERS');
  const semis = matches.filter((m) => m.stage === 'SEMIS');
  const thirdPlace = matches.find((m) => m.stage === 'THIRD_PLACE');
  const finalMatch = matches.find((m) => m.stage === 'FINAL');

  // Trigger celebration if final is finished
  const handleFinalClick = () => {
    if (finalMatch && finalMatch.status === 'FINISHED') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const renderMatchCard = (m: Match, title?: string) => {
    const home = getTeamById(m.homeTeamId);
    const away = getTeamById(m.awayTeamId);

    const isFinished = m.status === 'FINISHED';
    const isLive = m.status === 'LIVE';

    const homeWins = isFinished && (m.homeScore ?? 0) > (m.awayScore ?? 0);
    const awayWins = isFinished && (m.awayScore ?? 0) > (m.homeScore ?? 0);

    return (
      <div
        key={m.id}
        className="bg-[#162A3D] border border-[#2B4052] rounded-xl p-3 shadow-md space-y-2 text-white"
      >
        {title && (
          <div className="flex items-center justify-between text-[11px] font-extrabold uppercase text-slate-300 pb-1.5 border-b border-[#2B4052] font-display">
            <span>{title}</span>
            <button
              onClick={() => onEditMatch(m)}
              className="p-1 rounded bg-[#0B1F33] text-slate-300 hover:bg-[#12283e] transition-colors border border-[#2B4052]"
              title="Editar jogo"
            >
              <Edit3 className="w-3 h-3" />
            </button>
          </div>
        )}

        <div className="space-y-1.5">
          {/* Home */}
          <div
            onClick={() => onSelectTeam(home)}
            className={`flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer ${
              homeWins ? 'bg-[#138A4B]/20 border border-[#138A4B]' : 'bg-[#0B1F33] border border-[#2B4052]'
            }`}
          >
            <div className="flex items-center gap-2">
              <TeamBadge team={home} size="sm" />
              <span className={`text-xs font-bold ${homeWins ? 'text-green-400 font-extrabold' : 'text-slate-100'}`}>
                {home.name}
              </span>
            </div>
            <span className="font-mono font-black text-sm text-slate-200">
              {isFinished || isLive ? m.homeScore ?? 0 : '-'}
            </span>
          </div>

          {/* Away */}
          <div
            onClick={() => onSelectTeam(away)}
            className={`flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer ${
              awayWins ? 'bg-[#138A4B]/20 border border-[#138A4B]' : 'bg-[#0B1F33] border border-[#2B4052]'
            }`}
          >
            <div className="flex items-center gap-2">
              <TeamBadge team={away} size="sm" />
              <span className={`text-xs font-bold ${awayWins ? 'text-green-400 font-extrabold' : 'text-slate-100'}`}>
                {away.name}
              </span>
            </div>
            <span className="font-mono font-black text-sm text-slate-200">
              {isFinished || isLive ? m.awayScore ?? 0 : '-'}
            </span>
          </div>
        </div>

        <div className="text-[10px] text-slate-400 text-center font-semibold pt-1 border-t border-[#2B4052]">
          {m.date} • {timezone === 'BRT' ? m.timeBRT : m.timeCAT}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="text-center space-y-2 bg-[#162A3D] text-white p-5 rounded-xl border border-[#2B4052] shadow-md">
        <Trophy className="w-8 h-8 mx-auto text-amber-400" />
        <h2 className="text-2xl font-black font-display uppercase tracking-wider text-white">
          Fase Eliminatória • Mata-Mata Oficial
        </h2>
        <div className="flex items-center justify-center gap-1 text-xs text-amber-400 font-bold">
          <Clock className="w-3.5 h-3.5" />
          <span>Aguardando o encerramento da Fase de Grupos</span>
        </div>
        <p className="text-xs text-slate-300 max-w-lg mx-auto font-normal">
          Os dois primeiros colocados de cada grupo se classificarão para as Quartas de Final da Copa DLS 26.
        </p>
      </div>

      {/* Bracket Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        {/* Column 1: Quartas de Final */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-white bg-[#162A3D] p-3 rounded-xl border border-[#2B4052] font-display">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Quartas de Final</span>
          </div>
          <div className="space-y-3">
            {quarters.map((qf, idx) => renderMatchCard(qf, `Quartas ${idx + 1}`))}
          </div>
        </div>

        {/* Column 2: Semifinais */}
        <div className="space-y-3 lg:mt-6">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-white bg-[#162A3D] p-3 rounded-xl border border-[#2B4052] font-display">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Semifinais</span>
          </div>
          <div className="space-y-5">
            {semis.map((sf, idx) => renderMatchCard(sf, `Semifinal ${idx + 1}`))}
          </div>
        </div>

        {/* Column 3: Grande Final & 3º Lugar */}
        <div className="space-y-5 lg:mt-10">
          {/* Final */}
          <div className="space-y-3 p-4 bg-[#162A3D] text-white rounded-xl border-2 border-amber-500 shadow-lg">
            <div className="flex items-center justify-between text-xs font-black text-amber-400 uppercase tracking-widest font-display">
              <span className="flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-400" />
                GRANDE FINAL
              </span>
              <button
                onClick={handleFinalClick}
                className="text-[10px] px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-black hover:bg-amber-400 transition-colors"
              >
                🎉 Confetes
              </button>
            </div>

            {finalMatch && renderMatchCard(finalMatch)}

            {finalMatch && finalMatch.status === 'FINISHED' && (
              <div className="p-3 rounded-lg bg-amber-500/20 border border-amber-500/50 text-center">
                <span className="block text-[10px] font-black text-amber-300 uppercase tracking-wider">
                  🏆 CAMPEÃO DA COPA DLS 2026 🏆
                </span>
                <span className="text-lg font-black text-white mt-1 block font-display">
                  {finalMatch.homeScore! > finalMatch.awayScore!
                    ? getTeamById(finalMatch.homeTeamId).name
                    : getTeamById(finalMatch.awayTeamId).name}
                </span>
              </div>
            )}
          </div>

          {/* 3º Lugar */}
          <div className="space-y-2 p-3 bg-[#162A3D] rounded-xl border border-[#2B4052]">
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider block font-display">
              🥉 Disputa de 3º Lugar
            </span>
            {thirdPlace && renderMatchCard(thirdPlace)}
          </div>
        </div>
      </div>
    </div>
  );
};
