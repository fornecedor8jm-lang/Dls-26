import React, { useState } from 'react';
import { Goal, Match, MatchStatus } from '../types';
import { getTeamById } from '../data/teams';
import { TeamBadge } from './TeamBadge';
import { X, Save, Plus, Trash2, Trophy, Flame } from 'lucide-react';

interface MatchEditorModalProps {
  match: Match | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveMatch: (updatedMatch: Match) => void;
}

export const MatchEditorModal: React.FC<MatchEditorModalProps> = ({
  match,
  isOpen,
  onClose,
  onSaveMatch
}) => {
  if (!isOpen || !match) return null;

  const homeTeam = getTeamById(match.homeTeamId);
  const awayTeam = getTeamById(match.awayTeamId);

  const [status, setStatus] = useState<MatchStatus>(match.status);
  const [homeScore, setHomeScore] = useState<number>(match.homeScore ?? 0);
  const [awayScore, setAwayScore] = useState<number>(match.awayScore ?? 0);
  const [goals, setGoals] = useState<Goal[]>(match.goals || []);

  // New goal input
  const [newPlayer, setNewPlayer] = useState('');
  const [newTeamId, setNewTeamId] = useState(homeTeam.id);
  const [newMinute, setNewMinute] = useState(45);

  const handleAddGoal = () => {
    if (!newPlayer.trim()) return;
    const g: Goal = {
      id: `goal_${Date.now()}_${Math.random()}`,
      player: newPlayer.trim(),
      teamId: newTeamId,
      minute: Number(newMinute) || 1
    };
    const updatedGoals = [...goals, g];
    setGoals(updatedGoals);

    // Auto update scores
    const hCount = updatedGoals.filter((x) => x.teamId === homeTeam.id).length;
    const aCount = updatedGoals.filter((x) => x.teamId === awayTeam.id).length;
    setHomeScore(hCount);
    setAwayScore(aCount);

    setNewPlayer('');
  };

  const handleRemoveGoal = (id: string) => {
    const updatedGoals = goals.filter((g) => g.id !== id);
    setGoals(updatedGoals);

    const hCount = updatedGoals.filter((x) => x.teamId === homeTeam.id).length;
    const aCount = updatedGoals.filter((x) => x.teamId === awayTeam.id).length;
    setHomeScore(hCount);
    setAwayScore(aCount);
  };

  const handleSave = () => {
    const updated: Match = {
      ...match,
      status,
      homeScore: Number(homeScore),
      awayScore: Number(awayScore),
      goals
    };
    onSaveMatch(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1F33]/80 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-xl overflow-hidden rounded-xl bg-[#162A3D] border border-[#2B4052] shadow-2xl text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2B4052] bg-[#0B1F33] text-white">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-black text-white uppercase font-display">Lançamento de Placar e Gols</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-[#162A3D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 max-h-[80vh] overflow-y-auto text-white">
          {/* Status selector */}
          <div>
            <label className="block text-xs font-black text-white uppercase mb-2 font-display">
              Status da Partida
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['SCHEDULED', 'LIVE', 'FINISHED'] as MatchStatus[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatus(st)}
                  className={`py-2 px-3 rounded text-xs font-black transition-all border ${
                    status === st
                      ? st === 'LIVE'
                        ? 'bg-red-600 text-white border-red-500 shadow'
                        : st === 'FINISHED'
                        ? 'bg-[#0B1F33] text-white border-[#2B4052] shadow'
                        : 'bg-[#138A4B] text-white border-[#138A4B] shadow'
                      : 'bg-[#0B1F33] text-slate-300 border-[#2B4052] hover:text-white'
                  }`}
                >
                  {st === 'SCHEDULED' && 'Agendado'}
                  {st === 'LIVE' && '🔴 Ao Vivo'}
                  {st === 'FINISHED' && 'Encerrado'}
                </button>
              ))}
            </div>
          </div>

          {/* Teams and Score Input */}
          <div className="p-4 rounded-lg bg-[#0B1F33] border border-[#2B4052] grid grid-cols-3 items-center gap-4 text-center">
            {/* Home */}
            <div className="flex flex-col items-center gap-2">
              <TeamBadge team={homeTeam} size="lg" />
              <span className="font-extrabold text-xs text-white truncate max-w-full font-display">{homeTeam.name}</span>
              <input
                type="number"
                min={0}
                max={20}
                value={homeScore}
                onChange={(e) => setHomeScore(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-16 h-12 text-center text-2xl font-black font-mono rounded bg-[#162A3D] border-2 border-[#2B4052] text-white focus:outline-none focus:border-[#138A4B]"
              />
            </div>

            <div className="font-black text-slate-500 text-xl font-mono">VS</div>

            {/* Away */}
            <div className="flex flex-col items-center gap-2">
              <TeamBadge team={awayTeam} size="lg" />
              <span className="font-extrabold text-xs text-white truncate max-w-full font-display">{awayTeam.name}</span>
              <input
                type="number"
                min={0}
                max={20}
                value={awayScore}
                onChange={(e) => setAwayScore(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-16 h-12 text-center text-2xl font-black font-mono rounded bg-[#162A3D] border-2 border-[#2B4052] text-white focus:outline-none focus:border-[#138A4B]"
              />
            </div>
          </div>

          {/* Goal Scorers Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5 font-display">
              <Flame className="w-4 h-4 text-amber-400" />
              Adicionar Autor do Gol
            </h3>

            {/* New Goal Form */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-[#0B1F33] p-3 rounded border border-[#2B4052]">
              <input
                type="text"
                placeholder="Nome do Jogador"
                value={newPlayer}
                onChange={(e) => setNewPlayer(e.target.value)}
                className="sm:col-span-5 px-3 py-2 text-xs rounded bg-[#162A3D] border border-[#2B4052] text-white focus:outline-none focus:border-[#138A4B] font-medium"
              />

              <select
                value={newTeamId}
                onChange={(e) => setNewTeamId(e.target.value)}
                className="sm:col-span-4 px-2 py-2 text-xs rounded bg-[#162A3D] border border-[#2B4052] text-white focus:outline-none font-bold"
              >
                <option value={homeTeam.id}>{homeTeam.name}</option>
                <option value={awayTeam.id}>{awayTeam.name}</option>
              </select>

              <input
                type="number"
                min={1}
                max={120}
                value={newMinute}
                onChange={(e) => setNewMinute(parseInt(e.target.value) || 1)}
                className="sm:col-span-2 px-2 py-2 text-xs rounded bg-[#162A3D] border border-[#2B4052] text-white text-center font-mono focus:outline-none"
                placeholder="Min"
              />

              <button
                type="button"
                onClick={handleAddGoal}
                className="sm:col-span-1 p-2 rounded bg-[#138A4B] hover:bg-[#0f733e] text-white font-bold flex items-center justify-center transition-colors"
                title="Adicionar Gol"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* List of goals */}
            {goals.length > 0 && (
              <div className="space-y-1.5 max-h-40 overflow-y-auto">
                {goals.map((g) => {
                  const t = g.teamId === homeTeam.id ? homeTeam : awayTeam;
                  return (
                    <div
                      key={g.id}
                      className="flex items-center justify-between p-2 rounded bg-[#0B1F33] border border-[#2B4052] text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span>⚽</span>
                        <span className="font-bold text-white">{g.player}</span>
                        <span className="text-slate-400 font-mono">({g.minute}')</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#162A3D] text-slate-200 font-bold border border-[#2B4052]">
                          {t.shortName}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveGoal(g.id)}
                        className="text-red-400 hover:text-red-300 p-1 font-bold"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-4 border-t border-[#2B4052] bg-[#0B1F33]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-xs font-bold text-slate-300 hover:bg-[#162A3D] transition-colors uppercase tracking-wider"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2 rounded bg-[#138A4B] hover:bg-[#0f733e] text-white font-black text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            Salvar Placar
          </button>
        </div>
      </div>
    </div>
  );
};
