import React from 'react';
import { Send, ArrowDownRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { COMPANY_DETAILS, TRUST_METRICS } from '../data/companyData.ts';

interface HeroProps {
  onOpenConsultation: (serviceId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  return (
    <section id="home" className="relative border-b border-neutral-800 overflow-hidden">
      {/* Background Media with Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={COMPANY_DETAILS.heroImage}
          alt="Интерьер юридической компании ТОО COMPETENCE CENTER в Алматы"
          className="w-full h-full object-cover object-center filter brightness-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 lg:pb-24">
        {/* Unboxed Metadata (Zero-pill discipline) */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs sm:text-sm text-neutral-400 font-medium mb-6">
          <span className="text-amber-400 font-semibold">{COMPANY_DETAILS.fullName}</span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span>г. Алматы (с 2023 г.)</span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span>ОКЭД 69109</span>
        </div>

        {/* Headline with text-wrap balance */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl leading-[1.15] text-balance mb-6 font-display">
          Юридическая надежность и практическая защита вашего бизнеса и личных прав в Алматы
        </h1>

        {/* Body Value Proposition */}
        <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed mb-8">
          Оказываем комплексную правовую поддержку субъектам малого и среднего предпринимательства, а также частным лицам: разработка и экспертиза договоров, судебная защита в судах всех инстанций РК, корпоративные процедуры и аудит правовой документации.
        </p>

        {/* Key Competence Bullet Points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mb-10 text-sm text-neutral-300">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>Сопровождение хозяйственных и внешнеэкономических договоров</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>Представительство в СМЭС г. Алматы и государственных органах</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>Корпоративное право, регистрация и перерегистрация ТОО</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>Прямая запись на консультацию через Telegram-бот 24/7</span>
          </div>
        </div>

        {/* Call-to-Action Group */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            onClick={() => onOpenConsultation()}
            className="inline-flex items-center justify-center gap-3 px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-lg shadow-amber-500/10 cursor-pointer whitespace-nowrap"
          >
            <Send className="w-4 h-4" />
            <span>Записаться на консультацию в Telegram</span>
          </button>

          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-neutral-200 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors whitespace-nowrap"
          >
            <span>Изучить услуги</span>
            <ArrowDownRight className="w-4 h-4 text-neutral-400" />
          </a>
        </div>
      </div>

      {/* Full-width 4-column Trust Metrics Strip */}
      <div className="relative z-10 border-t border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {TRUST_METRICS.map((metric, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-display tabular-nums">
                  {metric.value}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-neutral-300 mt-1">
                  {metric.label}
                </span>
                <span className="text-xs text-neutral-400 mt-0.5">
                  {metric.subtext}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
