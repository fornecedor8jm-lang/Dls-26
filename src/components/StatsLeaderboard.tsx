import React from 'react';
import { Match, Team } from '../types';
import { computePlayerStats, getTournamentSummary } from '../utils/storage';
import { getTeamById } from '../data/teams';
import { TeamBadge } from './TeamBadge';
import { Flame, ShieldCheck, Zap, AlertCircle } from 'lucide-react';

interface StatsLeaderboardProps {
  matches: Match[];
  teams: Team[];
  onSelectTeam: (team: Team) => void;
}

export const StatsLeaderboard: React.FC<StatsLeaderboardProps> = ({
  matches,
  teams,
  onSelectTeam
}) => {
  const topScorers = computePlayerStats(matches);
  const summary = getTournamentSummary(matches);

  // Calculate team goals for attack and defense
  const teamStats = teams.map((team) => {
    let gp = 0;
    let gc = 0;
    let games = 0;

    matches.forEach((m) => {
      if (m.status !== 'FINISHED' && m.status !== 'LIVE') return;

      if (m.homeTeamId === team.id) {
        gp += m.homeScore ?? 0;
        gc += m.awayScore ?? 0;
        games += 1;
      } else if (m.awayTeamId === team.id) {
        gp += m.awayScore ?? 0;
        gc += m.homeScore ?? 0;
        games += 1;
      }
    });

    return {
      team,
      gp,
      gc,
      games,
      sg: gp - gc
    };
  });

  const bestAttack = [...teamStats].sort((a, b) => b.gp - a.gp);
  const bestDefense = [...teamStats].sort((a, b) => a.gc - b.gc);

  return (
    <div className="space-y-6 text-white">
      {/* Zero State Pre-tournament Notice */}
      <div className="bg-[#162A3D] border border-[#2B4052] p-4 rounded-xl flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <h3 className="font-extrabold text-xs text-amber-400 uppercase tracking-wider font-display">
            Painel de Estatísticas em Tempo Real
          </h3>
          <p className="text-xs text-slate-200">
            A Copa DLS 26 inicia em 08 de agosto de 2026. A artilharia, cartões e estatísticas de ataque/defesa serão preenchidos automaticamente conforme os jogos forem realizados.
          </p>
        </div>
      </div>

      {/* Top Banner Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#162A3D] border border-[#2B4052] shadow-sm text-center">
          <span className="text-3xl font-black text-white font-mono block">
            {summary.totalGoals}
          </span>
          <span className="block text-xs text-slate-400 font-extrabold uppercase mt-1">Gols Marcados</span>
        </div>

        <div className="p-4 rounded-xl bg-[#162A3D] border border-[#2B4052] shadow-sm text-center">
          <span className="text-3xl font-black text-white font-mono block">
            {summary.avgGoals}
          </span>
          <span className="block text-xs text-slate-400 font-extrabold uppercase mt-1">Média p/ Jogo</span>
        </div>

        <div className="p-4 rounded-xl bg-[#162A3D] border border-[#2B4052] shadow-sm text-center">
          <span className="text-3xl font-black text-white font-mono block">
            {summary.matchesPlayed} / {summary.totalMatches}
          </span>
          <span className="block text-xs text-slate-400 font-extrabold uppercase mt-1">Jogos Realizados</span>
        </div>

        <div className="p-4 rounded-xl bg-[#162A3D] border border-[#2B4052] shadow-sm text-center">
          <span className="text-3xl font-black text-white font-mono block">
            {summary.teamsCount}
          </span>
          <span className="block text-xs text-slate-400 font-extrabold uppercase mt-1">Clubes Participantes</span>
        </div>
      </div>

      {/* Grid: Artilharia, Melhor Ataque, Melhor Defesa */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Artilharia */}
        <div className="rounded-xl bg-[#162A3D] border border-[#2B4052] p-4 sm:p-5 shadow-md space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#2B4052]">
            <Flame className="w-5 h-5 text-amber-400" />
            <h3 className="font-black text-white text-base uppercase font-display">
              ARTILHARIA OFICIAL
            </h3>
          </div>

          {topScorers.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center bg-[#0B1F33] rounded-lg border border-[#2B4052]">
              Aguardando o início dos jogos para registrar os artilheiros.
            </p>
          ) : (
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 divide-y divide-[#2B4052]">
              {topScorers.slice(0, 10).map((player, idx) => {
                const team = getTeamById(player.teamId);
                return (
                  <div
                    key={player.id}
                    onClick={() => onSelectTeam(team)}
                    className="flex items-center justify-between pt-2.5 pb-1 px-1 hover:bg-[#0B1F33] rounded cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded bg-[#0B1F33] border border-[#2B4052] text-white font-extrabold text-xs flex items-center justify-center font-mono">
                        {idx + 1}º
                      </span>
                      <TeamBadge team={team} size="sm" />
                      <div>
                        <span className="font-extrabold text-white text-xs block">
                          {player.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">{team.name}</span>
                      </div>
                    </div>

                    <div className="font-mono font-black text-white text-sm bg-[#0B1F33] px-2.5 py-1 rounded border border-[#2B4052]">
                      ⚽ {player.goals}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Melhor Ataque */}
        <div className="rounded-xl bg-[#162A3D] border border-[#2B4052] p-4 sm:p-5 shadow-md space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#2B4052]">
            <Zap className="w-5 h-5 text-[#138A4B]" />
            <h3 className="font-black text-white text-base uppercase font-display">
              MELHORES ATAQUES
            </h3>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 divide-y divide-[#2B4052]">
            {bestAttack.slice(0, 8).map((st, idx) => (
              <div
                key={st.team.id}
                onClick={() => onSelectTeam(st.team)}
                className="flex items-center justify-between pt-2.5 pb-1 px-1 hover:bg-[#0B1F33] rounded cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded bg-[#0B1F33] border border-[#2B4052] text-white font-extrabold text-xs flex items-center justify-center font-mono">
                    {idx + 1}º
                  </span>
                  <TeamBadge team={st.team} size="sm" />
                  <span className="font-bold text-white text-xs">{st.team.name}</span>
                </div>

                <div className="text-right">
                  <span className="font-mono font-black text-[#138A4B] text-sm block">
                    {st.gp} Gols
                  </span>
                  <span className="text-[10px] text-slate-400">{st.games} partidas</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Melhor Defesa */}
        <div className="rounded-xl bg-[#162A3D] border border-[#2B4052] p-4 sm:p-5 shadow-md space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#2B4052]">
            <ShieldCheck className="w-5 h-5 text-slate-300" />
            <h3 className="font-black text-white text-base uppercase font-display">
              DEFESAS MENOS VAZADAS
            </h3>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 divide-y divide-[#2B4052]">
            {bestDefense.slice(0, 8).map((st, idx) => (
              <div
                key={st.team.id}
                onClick={() => onSelectTeam(st.team)}
                className="flex items-center justify-between pt-2.5 pb-1 px-1 hover:bg-[#0B1F33] rounded cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded bg-[#0B1F33] border border-[#2B4052] text-white font-extrabold text-xs flex items-center justify-center font-mono">
                    {idx + 1}º
                  </span>
                  <TeamBadge team={st.team} size="sm" />
                  <span className="font-bold text-white text-xs">{st.team.name}</span>
                </div>

                <div className="text-right">
                  <span className="font-mono font-black text-white text-sm block">
                    {st.gc} Sofridos
                  </span>
                  <span className="text-[10px] text-slate-400">{st.games} partidas</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
