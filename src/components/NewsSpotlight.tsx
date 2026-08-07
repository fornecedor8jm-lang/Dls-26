import React from 'react';
import { Trophy, TrendingUp, Calendar, ChevronRight } from 'lucide-react';

interface NewsSpotlightProps {
  onNavigateTab: (tab: 'STANDINGS' | 'MATCHES' | 'KNOCKOUT' | 'STATS') => void;
  onOpenAbout: () => void;
}

export const NewsSpotlight: React.FC<NewsSpotlightProps> = ({ onNavigateTab, onOpenAbout }) => {
  return (
    <section className="bg-[#162A3D] border border-[#2B4052] rounded-xl p-4 sm:p-6 shadow-md space-y-5 text-white">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[#2B4052] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-5 bg-[#138A4B] rounded-sm inline-block" />
          <h2 className="text-xl md:text-2xl font-black text-white font-display uppercase tracking-tight">
            Notícias & Programação da Copa
          </h2>
        </div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
          Edição Oficial DLS 26
        </span>
      </div>

      {/* Pre-Tournament Important Announcement Box */}
      <div className="p-3.5 rounded-lg bg-[#0B1F33] border border-[#2B4052] text-xs space-y-1">
        <p className="font-extrabold text-amber-400">
          📌 A Copa DLS 26 ainda não começou.
        </p>
        <p className="text-slate-300">
          Nenhuma partida foi disputada até o momento. A tabela, as estatísticas e os resultados serão atualizados após a realização dos jogos oficiais a partir de 08 de agosto de 2026.
        </p>
      </div>

      {/* Grid Layout: Main Feature + Secondary News Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Editorial Spotlight (7 cols) */}
        <div className="lg:col-span-7 bg-[#0B1F33] border border-[#2B4052] rounded-lg overflow-hidden flex flex-col justify-between group hover:border-slate-500 transition-colors">
          <div className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-[#138A4B] text-white font-extrabold px-2 py-0.5 rounded text-[10px] uppercase">
                COMUNICADO OFICIAL
              </span>
              <span className="text-slate-400 font-semibold">• Abertura em 08 de Agosto</span>
            </div>

            <h3 
              onClick={onOpenAbout}
              className="text-2xl md:text-3xl font-black text-white font-display hover:text-[#138A4B] cursor-pointer transition-colors leading-tight"
            >
              Guia da Copa DLS 26: Confira os grupos, regulamento e o caminho para o título
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              A competição reúne 16 equipes divididas em 4 grupos equilibrados. O campeonato terá início no dia 08 de agosto de 2026, às 15:00 BRT (20:30 CAT). Acompanhe a programação e o regulamento oficial do torneio.
            </p>
          </div>

          <div className="bg-[#162A3D] p-4 border-t border-[#2B4052] flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Redação Oficial • DLS 2026</span>
            <button
              onClick={() => onNavigateTab('STANDINGS')}
              className="font-bold text-[#138A4B] hover:text-green-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
            >
              <span>Ver Grupos da Copa</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Secondary News Column (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          
          {/* Card 1 */}
          <div className="bg-[#0B1F33] border border-[#2B4052] rounded-lg p-3.5 space-y-1.5 hover:bg-[#12283e] transition-colors">
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#138A4B] uppercase">
              <TrendingUp className="w-3 h-3" />
              <span>REGULAMENTO E CRITÉRIOS</span>
            </div>
            <h4 
              onClick={() => onNavigateTab('STANDINGS')}
              className="text-sm font-bold text-white hover:text-[#138A4B] cursor-pointer transition-colors font-display"
            >
              Regras de Pontuação: Vitória 3 pts, Empate 1 pt
            </h4>
            <p className="text-xs text-slate-300 line-clamp-2">
              Na Fase de Grupos, o critério de desempate prioriza Pontos, Saldo de Gols (SG) e Gols Pró (GP) antes do confronto direto.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0B1F33] border border-[#2B4052] rounded-lg p-3.5 space-y-1.5 hover:bg-[#12283e] transition-colors">
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#138A4B] uppercase">
              <Calendar className="w-3 h-3" />
              <span>PROGRAMAÇÃO OFICIAL</span>
            </div>
            <h4 
              onClick={() => onNavigateTab('MATCHES')}
              className="text-sm font-bold text-white hover:text-[#138A4B] cursor-pointer transition-colors font-display"
            >
              Programação dos jogos com suporte a fuso horário
            </h4>
            <p className="text-xs text-slate-300 line-clamp-2">
              Todas as partidas possuem horário configurado para Brasília (15:00 BRT) e Moçambique (20:30 CAT).
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0B1F33] border border-[#2B4052] rounded-lg p-3.5 space-y-1.5 hover:bg-[#12283e] transition-colors">
            <div className="flex items-center gap-2 text-[10px] font-bold text-amber-400 uppercase">
              <Trophy className="w-3 h-3" />
              <span>FASE ELIMINATÓRIA</span>
            </div>
            <h4 
              onClick={() => onNavigateTab('KNOCKOUT')}
              className="text-sm font-bold text-white hover:text-[#138A4B] cursor-pointer transition-colors font-display"
            >
              Mata-Mata a partir das Quartas de Final
            </h4>
            <p className="text-xs text-slate-300 line-clamp-2">
              Os 2 melhores de cada grupo avançam para o mata-mata direto até a grande final do campeonato.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
