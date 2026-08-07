import React, { useState } from 'react';
import { GroupName, Match, Team } from '../types';
import { calculateGroupStandings } from '../utils/standings';
import { TeamBadge } from './TeamBadge';
import { Info, Clock } from 'lucide-react';

interface GroupStandingsProps {
  teams: Team[];
  matches: Match[];
  onSelectTeam: (team: Team) => void;
  onOpenLegend: () => void;
}

export const GroupStandingsView: React.FC<GroupStandingsProps> = ({
  teams,
  matches,
  onSelectTeam,
  onOpenLegend
}) => {
  const [selectedGroup, setSelectedGroup] = useState<GroupName | 'ALL'>('ALL');

  const groups: GroupName[] = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-5">
      {/* Pre-tournament Notification Box */}
      <div className="bg-[#162A3D] border border-[#2B4052] rounded-xl p-4 text-white space-y-1">
        <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase font-display">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Status Oficial do Campeonato</span>
        </div>
        <p className="text-sm font-bold text-white">
          A Copa DLS 26 ainda não começou.
        </p>
        <p className="text-xs text-slate-300">
          Nenhuma partida foi disputada até o momento. A tabela e os resultados serão atualizados após a realização dos jogos oficiais.
        </p>
      </div>

      {/* Group selector tabs bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-[#162A3D] p-3 rounded-xl border border-[#2B4052]">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedGroup('ALL')}
            className={`px-3.5 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all ${
              selectedGroup === 'ALL'
                ? 'bg-[#138A4B] text-white shadow-sm'
                : 'bg-[#0B1F33] text-slate-300 hover:text-white border border-[#2B4052]'
            }`}
          >
            Todos os Grupos
          </button>
          {groups.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGroup(g)}
              className={`px-3.5 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all ${
                selectedGroup === g
                  ? 'bg-[#138A4B] text-white shadow-sm'
                  : 'bg-[#0B1F33] text-slate-300 hover:text-white border border-[#2B4052]'
              }`}
            >
              Grupo {g}
            </button>
          ))}
        </div>

        <button
          onClick={onOpenLegend}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0B1F33] hover:bg-[#12283e] text-xs text-slate-300 font-bold transition-colors border border-[#2B4052] ml-auto"
        >
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>Regras & Legenda da Tabela</span>
        </button>
      </div>

      {/* Grid of Group Standings Tables */}
      <div
        className={`grid gap-5 ${
          selectedGroup === 'ALL'
            ? 'grid-cols-1 lg:grid-cols-2'
            : 'grid-cols-1'
        }`}
      >
        {groups
          .filter((g) => selectedGroup === 'ALL' || selectedGroup === g)
          .map((groupName) => {
            const groupTeams = teams.filter((t) => t.group === groupName);
            const rows = calculateGroupStandings(groupName, matches, groupTeams);

            return (
              <div
                key={groupName}
                className="bg-[#162A3D] border border-[#2B4052] rounded-xl overflow-hidden shadow-md"
              >
                {/* Table Group Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#0B1F33] text-white border-b border-[#2B4052]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded bg-[#138A4B] text-white font-black text-sm flex items-center justify-center font-display">
                      {groupName}
                    </span>
                    <div>
                      <h3 className="font-extrabold text-white text-sm font-display tracking-wide uppercase">
                        GRUPO {groupName}
                      </h3>
                      <p className="text-[10px] text-slate-400">
                        Classificação Oficial • Fase de Grupos
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-slate-300 bg-[#162A3D] px-2.5 py-1 rounded border border-[#2B4052]">
                    Top 2 avançam para Quartas
                  </span>
                </div>

                {/* Table Data */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#2B4052] bg-[#0B1F33]/70 text-slate-400 text-[10px] font-extrabold uppercase tracking-wider">
                        <th className="py-2.5 px-3 text-center w-10">Pos</th>
                        <th className="py-2.5 px-3">Clube</th>
                        <th className="py-2.5 px-2 text-center text-white font-black bg-[#2B4052]/40">Pts</th>
                        <th className="py-2.5 px-2 text-center">J</th>
                        <th className="py-2.5 px-2 text-center text-slate-300">V</th>
                        <th className="py-2.5 px-2 text-center text-slate-300">E</th>
                        <th className="py-2.5 px-2 text-center text-slate-300">D</th>
                        <th className="py-2.5 px-2 text-center text-slate-300">GP</th>
                        <th className="py-2.5 px-2 text-center text-slate-300">GC</th>
                        <th className="py-2.5 px-2 text-center text-white font-bold">SG</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2B4052]/60 text-slate-200">
                      {rows.map((row, idx) => {
                        return (
                          <tr
                            key={row.team.id}
                            onClick={() => onSelectTeam(row.team)}
                            className="group hover:bg-[#0B1F33] cursor-pointer transition-colors"
                          >
                            {/* Rank */}
                            <td className="py-3 px-3 text-center font-bold">
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded text-xs font-black bg-[#0B1F33] text-slate-300 border border-[#2B4052]">
                                {idx + 1}
                              </span>
                            </td>

                            {/* Team */}
                            <td className="py-3 px-3 font-semibold text-white group-hover:text-green-400 transition-colors">
                              <div className="flex items-center gap-2.5">
                                <TeamBadge team={row.team} size="sm" />
                                <span className="truncate max-w-[140px] sm:max-w-none font-bold">
                                  {row.team.name}
                                </span>
                              </div>
                            </td>

                            {/* Points */}
                            <td className="py-3 px-2 text-center font-black text-white bg-[#0B1F33]/80 text-sm font-mono">
                              {row.points}
                            </td>

                            {/* Played (J) */}
                            <td className="py-3 px-2 text-center font-bold text-slate-300 font-mono">
                              {row.played}
                            </td>

                            {/* Won (V) */}
                            <td className="py-3 px-2 text-center font-bold text-slate-300 font-mono">
                              {row.won}
                            </td>

                            {/* Drawn (E) */}
                            <td className="py-3 px-2 text-center font-bold text-slate-300 font-mono">
                              {row.drawn}
                            </td>

                            {/* Lost (D) */}
                            <td className="py-3 px-2 text-center font-bold text-slate-300 font-mono">
                              {row.lost}
                            </td>

                            {/* Goals For (GP) */}
                            <td className="py-3 px-2 text-center font-medium text-slate-400 font-mono">
                              {row.goalsFor}
                            </td>

                            {/* Goals Against (GC) */}
                            <td className="py-3 px-2 text-center font-medium text-slate-400 font-mono">
                              {row.goalsAgainst}
                            </td>

                            {/* Goal Difference (SG) */}
                            <td className="py-3 px-2 text-center font-black text-white font-mono">
                              {row.goalDifference}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer */}
                <div className="px-4 py-2 bg-[#0B1F33] border-t border-[#2B4052] flex items-center justify-between text-[11px] text-slate-400">
                  <span>Aguardando o início oficial dos jogos do Grupo {groupName}</span>
                  <span className="font-semibold text-slate-300">4 Clubes</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
