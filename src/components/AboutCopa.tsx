import React from 'react';
import { X, Trophy, Gamepad2, Calendar, Users, ShieldCheck } from 'lucide-react';
import { TimezoneMode } from '../types';

interface AboutCopaProps {
  isOpen: boolean;
  onClose: () => void;
  timezone: TimezoneMode;
}

export const AboutCopa: React.FC<AboutCopaProps> = ({ isOpen, onClose, timezone }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1F33]/80 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-[#162A3D] border border-[#2B4052] shadow-2xl text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2B4052] bg-[#0B1F33] text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#138A4B] text-white">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-white uppercase font-display">SOBRE A COPA DLS 26</h2>
              <p className="text-xs text-slate-300">Guia oficial do campeonato no Dream League Soccer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-[#162A3D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5 max-h-[80vh] overflow-y-auto text-white">
          {/* Main Description */}
          <div className="p-4 rounded bg-[#0B1F33] border border-[#2B4052] leading-relaxed text-slate-200 text-sm space-y-2">
            <p className="font-bold text-white">
              ⚽ A <strong className="text-[#138A4B]">Copa DLS 2026</strong> é o campeonato de futebol virtual no Dream League Soccer, reunindo 16 clubes em busca do título.
            </p>
            <p className="text-xs text-slate-300">
              O torneio inicia em 08 de agosto de 2026. Acompanhe nesta página a tabela oficial, a programação das rodadas e os resultados em tempo real.
            </p>
          </div>

          {/* Key Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded bg-[#0B1F33] border border-[#2B4052] flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#138A4B] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-white uppercase font-display">Início Oficial</h4>
                <p className="text-xs text-slate-200 mt-0.5 font-bold">
                  08 de Agosto de 2026
                </p>
                <p className="text-[11px] text-[#138A4B] font-bold mt-0.5">
                  {timezone === 'BRT' ? '15:00 (Brasília)' : '20:30 (Moçambique)'}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded bg-[#0B1F33] border border-[#2B4052] flex items-start gap-3">
              <Users className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-white uppercase font-display">16 Equipes Divididas</h4>
                <p className="text-xs text-slate-300 mt-0.5 font-medium">
                  4 Grupos (A, B, C, D) disputam vagas nos mata-matas.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded bg-[#0B1F33] border border-[#2B4052] flex items-start gap-3">
              <Trophy className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-white uppercase font-display">Fase Eliminatória</h4>
                <p className="text-xs text-slate-300 mt-0.5 font-medium">
                  Top 2 de cada grupo avançam para Quartas, Semis e Final.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded bg-[#0B1F33] border border-[#2B4052] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-white uppercase font-display">Tabela em Tempo Real</h4>
                <p className="text-xs text-slate-300 mt-0.5 font-medium">
                  Classificação atualizada instantaneamente a cada resultado oficial.
                </p>
              </div>
            </div>
          </div>

          {/* Divisão dos Grupos */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white mb-2 font-display">
              🏆 Grupos da Copa DLS 26
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-3 rounded bg-[#0B1F33] border border-[#2B4052]">
                <span className="font-extrabold text-[#138A4B] block mb-1">GRUPO A</span>
                <ul className="space-y-0.5 text-slate-200 font-medium">
                  <li>• FC Bayern</li>
                  <li>• Blue Lock</li>
                  <li>• FC Celeste</li>
                  <li>• Dominator</li>
                </ul>
              </div>

              <div className="p-3 rounded bg-[#0B1F33] border border-[#2B4052]">
                <span className="font-extrabold text-[#138A4B] block mb-1">GRUPO B</span>
                <ul className="space-y-0.5 text-slate-200 font-medium">
                  <li>• Curaçao</li>
                  <li>• Super Giants</li>
                  <li>• FC Labamba</li>
                  <li>• FC Levante</li>
                </ul>
              </div>

              <div className="p-3 rounded bg-[#0B1F33] border border-[#2B4052]">
                <span className="font-extrabold text-[#138A4B] block mb-1">GRUPO C</span>
                <ul className="space-y-0.5 text-slate-200 font-medium">
                  <li>• Luck</li>
                  <li>• Yuri Man</li>
                  <li>• Bayer de Munchen</li>
                  <li>• Zanix</li>
                </ul>
              </div>

              <div className="p-3 rounded bg-[#0B1F33] border border-[#2B4052]">
                <span className="font-extrabold text-[#138A4B] block mb-1">GRUPO D</span>
                <ul className="space-y-0.5 text-slate-200 font-medium">
                  <li>• Real Madrid CF</li>
                  <li>• Adra FC</li>
                  <li>• Baby Maxx</li>
                  <li>• Soda FC</li>
                </ul>
              </div>
            </div>
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
