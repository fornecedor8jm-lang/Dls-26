import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Globe, HelpCircle, Newspaper } from 'lucide-react';
import { TimezoneMode } from '../types';

interface CountdownHeaderProps {
  timezone: TimezoneMode;
  setTimezone: (tz: TimezoneMode) => void;
  onOpenLegend: () => void;
  onOpenAbout: () => void;
  onNavigateTab?: (tab: 'STANDINGS' | 'MATCHES' | 'KNOCKOUT' | 'STATS') => void;
}

export const CountdownHeader: React.FC<CountdownHeaderProps> = ({
  timezone,
  setTimezone,
  onOpenLegend,
  onOpenAbout
}) => {
  // Target: Aug 8, 2026, 15:00 BRT (18:00 UTC) / 20:30 CAT
  const targetDate = new Date('2026-08-08T18:00:00Z').getTime();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isStarted: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isStarted: false });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isStarted: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds, isStarted: false });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const marqueeText = "Copa DLS 26 confirma abertura em 08 de agosto de 2026, às 15:00 BRT. • 16 seleções disputam o título oficial • ";

  return (
    <div className="space-y-3">
      {/* Top Ticker Bar - Dark Navy with Discrete Border */}
      <div className="bg-[#162A3D] text-white rounded-t-xl px-3 py-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs border border-[#2B4052] overflow-hidden">
        <div className="flex items-center gap-2 overflow-hidden flex-1 min-w-0">
          <span className="bg-[#138A4B] text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider shrink-0">
            COMUNICADO
          </span>
          
          {/* Continuous Infinite Marquee with Fallback Text */}
          <div className="relative overflow-hidden w-full h-5 flex items-center">
            <div className="animate-marquee whitespace-nowrap text-slate-200 text-xs font-semibold">
              <span className="mx-2">{marqueeText}</span>
              <span className="mx-2">{marqueeText}</span>
            </div>
          </div>
        </div>

        {/* Timezone Switcher */}
        <div className="flex items-center justify-end gap-1 bg-[#0B1F33] p-1 rounded border border-[#2B4052] text-[11px] shrink-0">
          <Globe className="w-3.5 h-3.5 text-slate-400 ml-1" />
          <span className="text-slate-400 mr-1 hidden md:inline font-semibold">Fuso:</span>
          <button
            onClick={() => setTimezone('BRT')}
            className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${
              timezone === 'BRT'
                ? 'bg-[#138A4B] text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            🇧🇷 Brasil (15:00)
          </button>
          <button
            onClick={() => setTimezone('CAT')}
            className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${
              timezone === 'CAT'
                ? 'bg-[#138A4B] text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            🇲🇿 Moçambique (20:30)
          </button>
        </div>
      </div>

      {/* Main Portal Header Panel */}
      <div className="bg-[#162A3D] border border-[#2B4052] rounded-b-xl p-4 sm:p-6 text-white shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Main Headline Column */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#0B1F33] border border-[#2B4052] text-amber-400 font-extrabold text-[11px] px-2.5 py-1 rounded uppercase tracking-wider">
                Pré-campeonato — aguardando o primeiro jogo oficial
              </span>
              <span className="text-slate-400 text-xs font-medium">
                • Abertura: 08/08/2026
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-display uppercase leading-none">
              COPA DLS <span className="text-[#138A4B]">2026</span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              Acompanhe as informações oficiais, a tabela e a programação da Copa DLS 26.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={onOpenAbout}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#138A4B] hover:bg-[#0f733e] text-white text-xs font-bold transition-all shadow-sm"
              >
                <Newspaper className="w-4 h-4" />
                <span>Guia Oficial da Copa</span>
              </button>

              <button
                onClick={onOpenLegend}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0B1F33] hover:bg-[#1a2e42] border border-[#2B4052] text-slate-200 text-xs font-bold transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-slate-400" />
                <span>Regulamento da Copa</span>
              </button>
            </div>
          </div>

          {/* Right Column: Countdown Box */}
          <div className="lg:col-span-4 bg-[#0B1F33] border border-[#2B4052] p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#2B4052]">
              <span className="text-xs font-black uppercase text-slate-200 flex items-center gap-1.5 font-display">
                <Calendar className="w-3.5 h-3.5 text-[#138A4B]" />
                Contagem Regressiva
              </span>
              <span className="text-[10px] text-slate-300 font-bold uppercase bg-[#162A3D] border border-[#2B4052] px-2 py-0.5 rounded">
                08 AGOSTO 2026
              </span>
            </div>

            {timeLeft.isStarted ? (
              <div className="py-2.5 text-center bg-[#162A3D] border border-[#2B4052] rounded-lg">
                <span className="inline-flex items-center gap-1.5 text-slate-200 font-extrabold text-xs uppercase">
                  Abertura Confirmada
                </span>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Horário oficial: {timezone === 'BRT' ? '15:00 BRT (Brasília)' : '20:30 CAT (Moçambique)'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-[#162A3D] p-2 rounded border border-[#2B4052]">
                  <span className="text-xl md:text-2xl font-black text-white font-mono block">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-slate-400">Dias</span>
                </div>
                <div className="bg-[#162A3D] p-2 rounded border border-[#2B4052]">
                  <span className="text-xl md:text-2xl font-black text-white font-mono block">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-slate-400">Horas</span>
                </div>
                <div className="bg-[#162A3D] p-2 rounded border border-[#2B4052]">
                  <span className="text-xl md:text-2xl font-black text-white font-mono block">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-slate-400">Min</span>
                </div>
                <div className="bg-[#162A3D] p-2 rounded border border-[#2B4052]">
                  <span className="text-xl md:text-2xl font-black text-[#138A4B] font-mono block">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-slate-400">Seg</span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1 border-t border-[#2B4052]">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Horário Oficial:</span>
              </span>
              <span className="font-bold text-white">
                {timezone === 'BRT' ? '15:00 BRT' : '20:30 CAT'}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
