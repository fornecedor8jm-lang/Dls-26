import React, { useState, useEffect } from 'react';
import { Match, Team, TimezoneMode } from './types';
import { TEAMS } from './data/teams';
import { loadMatchesFromStorage, saveMatchesToStorage, resetMatchesStorage } from './utils/storage';
import { CountdownHeader } from './components/CountdownHeader';
import { NewsSpotlight } from './components/NewsSpotlight';
import { GroupStandingsView } from './components/GroupStandings';
import { MatchList } from './components/MatchList';
import { KnockoutBracket } from './components/KnockoutBracket';
import { StatsLeaderboard } from './components/StatsLeaderboard';
import { LegendModal } from './components/LegendModal';
import { AboutCopa } from './components/AboutCopa';
import { MatchEditorModal } from './components/MatchEditorModal';
import { TeamDetailModal } from './components/TeamDetailModal';
import {
  Trophy,
  Table,
  Calendar,
  BarChart3,
  BookOpen,
  Newspaper,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

export default function App() {
  const [matches, setMatches] = useState<Match[]>(loadMatchesFromStorage);
  const [timezone, setTimezone] = useState<TimezoneMode>('BRT');
  const [activeTab, setActiveTab] = useState<'COVER' | 'STANDINGS' | 'MATCHES' | 'KNOCKOUT' | 'STATS'>('COVER');

  // Modal States
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  // Auto-save matches to localStorage when changed
  useEffect(() => {
    saveMatchesToStorage(matches);
  }, [matches]);

  const handleSaveMatch = (updatedMatch: Match) => {
    setMatches((prev) =>
      prev.map((m) => (m.id === updatedMatch.id ? updatedMatch : m))
    );
  };

  const handleResetMatches = () => {
    if (window.confirm('Deseja restaurar a tabela inicial do campeonato sem placares?')) {
      const resetData = resetMatchesStorage();
      setMatches(resetData);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1F33] text-slate-100 font-sans antialiased pb-16 selection:bg-[#138A4B] selection:text-white w-full overflow-x-hidden">
      {/* Top Banner / Masthead */}
      <header className="max-w-7xl mx-auto px-3 sm:px-6 pt-3 sm:pt-4">
        <CountdownHeader
          timezone={timezone}
          setTimezone={setTimezone}
          onOpenLegend={() => setIsLegendOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
          onNavigateTab={(tab) => setActiveTab(tab)}
        />
      </header>

      {/* Main Navigation Bar - Fully Responsive Multi-line / Flex-wrap */}
      <nav className="sticky top-0 z-40 bg-[#162A3D] text-white shadow-lg my-4 border-y border-[#2B4052]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2">
          <div className="flex flex-wrap items-center justify-start sm:justify-between gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab('COVER')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'COVER'
                  ? 'bg-[#138A4B] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#0B1F33]'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5" />
              <span>Capa</span>
            </button>

            <button
              onClick={() => setActiveTab('STANDINGS')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'STANDINGS'
                  ? 'bg-[#138A4B] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#0B1F33]'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span className="whitespace-normal text-left">Tabela de Classificação</span>
            </button>

            <button
              onClick={() => setActiveTab('MATCHES')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'MATCHES'
                  ? 'bg-[#138A4B] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#0B1F33]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Jogos & Programação</span>
            </button>

            <button
              onClick={() => setActiveTab('KNOCKOUT')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'KNOCKOUT'
                  ? 'bg-[#138A4B] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#0B1F33]'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Mata-Mata</span>
            </button>

            <button
              onClick={() => setActiveTab('STATS')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'STATS'
                  ? 'bg-[#138A4B] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-[#0B1F33]'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Estatísticas</span>
            </button>

            <button
              onClick={() => setIsLegendOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider text-slate-300 hover:text-white hover:bg-[#0B1F33] transition-all ml-auto"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#138A4B]" />
              <span className="hidden sm:inline">Regulamento</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 space-y-6">
        {activeTab === 'COVER' && (
          <div className="space-y-6">
            <NewsSpotlight
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenAbout={() => setIsAboutOpen(true)}
            />

            {/* Standings Snapshot on Cover */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#2B4052] pb-2">
                <h3 className="text-xl font-black text-white font-display uppercase tracking-tight">
                  Tabela Oficial da Fase de Grupos
                </h3>
                <button
                  onClick={() => setActiveTab('STANDINGS')}
                  className="text-xs font-bold text-[#138A4B] hover:underline flex items-center gap-1 uppercase"
                >
                  <span>Ver Grupos Completos</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <GroupStandingsView
                teams={TEAMS}
                matches={matches}
                onSelectTeam={(team) => setSelectedTeam(team)}
                onOpenLegend={() => setIsLegendOpen(true)}
              />
            </div>
          </div>
        )}

        {activeTab === 'STANDINGS' && (
          <GroupStandingsView
            teams={TEAMS}
            matches={matches}
            onSelectTeam={(team) => setSelectedTeam(team)}
            onOpenLegend={() => setIsLegendOpen(true)}
          />
        )}

        {activeTab === 'MATCHES' && (
          <MatchList
            matches={matches}
            timezone={timezone}
            onEditMatch={(m) => setEditingMatch(m)}
            onSelectTeam={(team) => setSelectedTeam(team)}
            onResetMatches={handleResetMatches}
          />
        )}

        {activeTab === 'KNOCKOUT' && (
          <KnockoutBracket
            matches={matches}
            timezone={timezone}
            onEditMatch={(m) => setEditingMatch(m)}
            onSelectTeam={(team) => setSelectedTeam(team)}
          />
        )}

        {activeTab === 'STATS' && (
          <StatsLeaderboard
            matches={matches}
            teams={TEAMS}
            onSelectTeam={(team) => setSelectedTeam(team)}
          />
        )}
      </main>

      {/* Modals */}
      <LegendModal isOpen={isLegendOpen} onClose={() => setIsLegendOpen(false)} />
      <AboutCopa
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        timezone={timezone}
      />
      <MatchEditorModal
        match={editingMatch}
        isOpen={!!editingMatch}
        onClose={() => setEditingMatch(null)}
        onSaveMatch={handleSaveMatch}
      />
      <TeamDetailModal
        team={selectedTeam}
        isOpen={!!selectedTeam}
        onClose={() => setSelectedTeam(null)}
        matches={matches}
        timezone={timezone}
      />

      {/* Footer - Sports Journalistic Style Dark Navy */}
      <footer className="mt-16 bg-[#162A3D] text-white border-t-2 border-[#138A4B] py-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#138A4B]" />
            <span className="font-black text-white text-sm font-display tracking-wider">COPA DLS 2026</span>
            <span className="text-slate-400">• Portal Oficial de Notícias, Tabela e Programação</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-300">
            <span>Abertura: 08/08/2026 (15:00 BRT / 20:30 CAT)</span>
            <span>•</span>
            <button
              onClick={handleResetMatches}
              className="text-[#138A4B] hover:underline flex items-center gap-1 font-bold"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Restaurar Tabela
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
