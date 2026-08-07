import React from 'react';
import { Match, Team, TimezoneMode } from '../types';
import { TeamBadge } from './TeamBadge';
import { X, Users, Calendar } from 'lucide-react';
import { getTeamById } from '../data/teams';

interface TeamDetailModalProps {
  team: Team | null;
  isOpen: boolean;
  onClose: () => void;
  matches: Match[];
  timezone: TimezoneMode;
}

export const TeamDetailModal: React.FC<TeamDetailModalProps> = ({
  team,
  isOpen,
  onClose,
  matches,
  timezone
}) => {
  if (!isOpen || !team) return null;

  const teamMatches = matches.filter(
    (m) => m.homeTeamId === team.id || m.awayTeamId === team.id
  );

  let played = 0;
  let won = 0;
  let drawn = 0;
  let lost = 0;
  let gf = 0;
  let ga = 0;

  teamMatches.forEach((m) => {
    if (m.status !== 'FINISHED') return;
    played += 1;
    const isHome = m.homeTeamId === team.id;
    const hs = m.homeScore ?? 0;
    const as = m.awayScore ?? 0;

    const myScore = isHome ? hs : as;
    const oppScore = isHome ? as : hs;

    gf += myScore;
    ga += oppScore;

    if (myScore > oppScore) won += 1;
    else if (myScore < oppScore) lost += 1;
    else drawn += 1;
  });

  const sg = gf - ga;
  const pts = won * 3 + drawn;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1F33]/80 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-xl overflow-hidden rounded-xl bg-[#162A3D] border border-[#2B4052] shadow-2xl text-white">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#2B4052] bg-[#0B1F33] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TeamBadge team={team} size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white font-display tracking-tight uppercase">
                  {team.name}
                </h2>
                <span className="px-2 py-0.5 rounded bg-[#138A4B] text-white font-extrabold text-[10px] uppercase">
                  Grupo {team.group}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{team.description}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-[#162A3D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 max-h-[75vh] overflow-y-auto text-white">
          {/* Key Stats Bar */}
          <div className="grid grid-cols-4 gap-2 text-center bg-[#0B1F33] p-3 rounded border border-[#2B4052]">
            <div>
              <span className="block text-2xl font-black text-white font-mono">{pts}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Pontos</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-[#138A4B] font-mono">{won}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Vitórias</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-white font-mono">
                {gf}:{ga}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Gols (GP:GC)</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-white font-mono">
                {sg > 0 ? `+${sg}` : sg}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Saldo (SG)</span>
            </div>
          </div>

          {/* Key Players / Elenco */}
          {team.keyPlayers && team.keyPlayers.length > 0 && (
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-white mb-2 flex items-center gap-1.5 font-display">
                <Users className="w-4 h-4 text-[#138A4B]" />
                Destaques do Elenco
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {team.keyPlayers.map((player, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-[#0B1F33] border border-[#2B4052] text-xs font-bold text-slate-200"
                  >
                    ⭐ {player}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Matches History */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white mb-2 flex items-center gap-1.5 font-display">
              <Calendar className="w-4 h-4 text-slate-300" />
              Programação de Jogos do Clube
            </h3>
            <div className="space-y-1.5">
              {teamMatches.map((m) => {
                const isHome = m.homeTeamId === team.id;
                const oppTeam = getTeamById(isHome ? m.awayTeamId : m.homeTeamId);
                const oppScore = isHome ? m.awayScore : m.homeScore;
                const myScore = isHome ? m.homeScore : m.awayScore;

                let resultBg = 'bg-[#0B1F33] border-[#2B4052]';
                let resultText = 'AGENDADO';

                if (m.status === 'FINISHED') {
                  if (myScore! > oppScore!) {
                    resultBg = 'bg-[#138A4B]/20 border-[#138A4B]';
                    resultText = 'VITÓRIA';
                  } else if (myScore! < oppScore!) {
                    resultBg = 'bg-red-950/40 border-red-800';
                    resultText = 'DERROTA';
                  } else {
                    resultBg = 'bg-amber-950/40 border-amber-800';
                    resultText = 'EMPATE';
                  }
                }

                return (
                  <div
                    key={m.id}
                    className={`flex items-center justify-between p-2.5 rounded border ${resultBg} text-xs`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-400 font-mono">
                        {m.stage === 'GROUP' ? `R${m.round}` : m.stage}
                      </span>
                      <span className="text-white font-bold">
                        vs {oppTeam.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 font-mono">
                      {m.status === 'FINISHED' ? (
                        <span className="font-black text-sm text-white">
                          {myScore} - {oppScore}
                        </span>
                      ) : (
                        <span className="text-slate-300 font-medium">
                          {m.date} ({timezone === 'BRT' ? m.timeBRT : m.timeCAT})
                        </span>
                      )}
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">
                        {resultText}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2B4052] bg-[#0B1F33] text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-[#138A4B] hover:bg-[#0f733e] text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
