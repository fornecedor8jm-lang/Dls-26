import React from 'react';
import { X, BookOpen, CheckCircle2, Award, ListOrdered } from 'lucide-react';

interface LegendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegendModal: React.FC<LegendModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1F33]/80 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg overflow-hidden rounded-xl bg-[#162A3D] border border-[#2B4052] shadow-2xl text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2B4052] bg-[#0B1F33] text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-[#138A4B] text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-white uppercase font-display">REGULAMENTO E LEGENDA</h2>
              <p className="text-xs text-slate-300">Regras oficiais de pontuação e classificação da Copa DLS 26</p>
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
        <div className="p-5 space-y-5 max-h-[80vh] overflow-y-auto text-white">
          {/* Section 1: Legenda das Colunas */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-1.5 font-display">
              <ListOrdered className="w-4 h-4 text-[#138A4B]" />
              Significado das Siglas da Tabela
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2.5 rounded bg-[#0B1F33] border border-[#2B4052] text-center">
                <span className="block text-white font-black text-base font-mono">J</span>
                <span className="text-xs text-slate-400 font-medium">Jogos</span>
              </div>
              <div className="p-2.5 rounded bg-[#0B1F33] border border-[#2B4052] text-center">
                <span className="block text-[#138A4B] font-black text-base font-mono">V</span>
                <span className="text-xs text-slate-400 font-medium">Vitórias</span>
              </div>
              <div className="p-2.5 rounded bg-[#0B1F33] border border-[#2B4052] text-center">
                <span className="block text-amber-400 font-black text-base font-mono">E</span>
                <span className="text-xs text-slate-400 font-medium">Empates</span>
              </div>
              <div className="p-2.5 rounded bg-[#0B1F33] border border-[#2B4052] text-center">
                <span className="block text-red-400 font-black text-base font-mono">D</span>
                <span className="text-xs text-slate-400 font-medium">Derrotas</span>
              </div>
              <div className="p-2.5 rounded bg-[#0B1F33] border border-[#2B4052] text-center">
                <span className="block text-white font-black text-base font-mono">GP</span>
                <span className="text-xs text-slate-400 font-medium">Gols Pró</span>
              </div>
              <div className="p-2.5 rounded bg-[#0B1F33] border border-[#2B4052] text-center">
                <span className="block text-slate-400 font-black text-base font-mono">GC</span>
                <span className="text-xs text-slate-400 font-medium">Gols Contra</span>
              </div>
              <div className="p-2.5 rounded bg-[#0B1F33] border border-[#2B4052] text-center">
                <span className="block text-white font-black text-base font-mono">SG</span>
                <span className="text-xs text-slate-400 font-medium">Saldo Gols</span>
              </div>
              <div className="p-2.5 rounded bg-[#0B1F33] border border-[#2B4052] text-center">
                <span className="block text-white font-black text-base font-mono">Pts</span>
                <span className="text-xs text-slate-300 font-bold">Pontos</span>
              </div>
            </div>
          </div>

          {/* Section 2: Pontuação */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 mb-2.5 flex items-center gap-1.5 font-display">
              <Award className="w-4 h-4 text-[#138A4B]" />
              Pontuação por Partida
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2.5 rounded bg-[#0B1F33] border border-[#2B4052]">
                <span className="font-bold text-white">Vitória</span>
                <span className="font-black text-[#138A4B] bg-[#162A3D] px-2.5 py-0.5 rounded border border-[#2B4052] font-mono">
                  3 pontos
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded bg-[#0B1F33] border border-[#2B4052]">
                <span className="font-bold text-white">Empate</span>
                <span className="font-black text-amber-400 bg-[#162A3D] px-2.5 py-0.5 rounded border border-[#2B4052] font-mono">
                  1 ponto
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded bg-[#0B1F33] border border-[#2B4052]">
                <span className="font-bold text-white">Derrota</span>
                <span className="font-black text-red-400 bg-[#162A3D] px-2.5 py-0.5 rounded border border-[#2B4052] font-mono">
                  0 pontos
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Critérios de Desempate */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 mb-2 flex items-center gap-1.5 font-display">
              <CheckCircle2 className="w-4 h-4 text-[#138A4B]" />
              Critérios de Desempate na Fase de Grupos
            </h3>
            <ol className="space-y-1.5 text-xs">
              <li className="flex items-center gap-2.5 p-2 rounded bg-[#0B1F33] border border-[#2B4052] font-medium text-slate-200">
                <span className="w-5 h-5 flex items-center justify-center rounded bg-[#162A3D] text-white font-mono font-bold text-[11px] border border-[#2B4052]">
                  1
                </span>
                <span>Maior número de Pontos (Pts)</span>
              </li>
              <li className="flex items-center gap-2.5 p-2 rounded bg-[#0B1F33] border border-[#2B4052] font-medium text-slate-200">
                <span className="w-5 h-5 flex items-center justify-center rounded bg-[#162A3D] text-white font-mono font-bold text-[11px] border border-[#2B4052]">
                  2
                </span>
                <span>Melhor Saldo de Gols (SG = GP - GC)</span>
              </li>
              <li className="flex items-center gap-2.5 p-2 rounded bg-[#0B1F33] border border-[#2B4052] font-medium text-slate-200">
                <span className="w-5 h-5 flex items-center justify-center rounded bg-[#162A3D] text-white font-mono font-bold text-[11px] border border-[#2B4052]">
                  3
                </span>
                <span>Maior número de Gols Pró (GP)</span>
              </li>
              <li className="flex items-center gap-2.5 p-2 rounded bg-[#0B1F33] border border-[#2B4052] font-medium text-slate-200">
                <span className="w-5 h-5 flex items-center justify-center rounded bg-[#162A3D] text-white font-mono font-bold text-[11px] border border-[#2B4052]">
                  4
                </span>
                <span>Confronto Direto entre as equipes envolvidas</span>
              </li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2B4052] bg-[#0B1F33] text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-[#138A4B] hover:bg-[#0f733e] text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
