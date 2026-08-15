import React from 'react';
import { Shield, Target, Lock, Zap, Building } from 'lucide-react';
import { COMPANY_DETAILS, WORKING_PRINCIPLES } from '../data/companyData.ts';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-neutral-900/50 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Natural Editorial Numbering */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
            01. История и принципы
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-2 mb-4 font-display text-balance">
            ТОО «COMPETENCE CENTER» — профессиональная юридическая практика в Алматы
          </h2>
          <p className="text-base text-neutral-300 leading-relaxed">
            Частная юридическая компания, зарегистрированная в Алматы в 2023 году (ОКЭД 69109 — прочая деятельность в области права). Мы объединяем глубокие знания национального законодательства Казахстана с ориентиром на реальный бизнес-результат.
          </p>
        </div>

        {/* 2-Column Split: Visual & Deep Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          {/* Left Column: Image with Subtle Scrim */}
          <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 group">
            <img
              src={COMPANY_DETAILS.aboutImage}
              alt="Юрист ТОО COMPETENCE CENTER проводит правовую экспертизу документов"
              className="w-full h-full object-cover min-h-[320px] lg:min-h-full transition-transform duration-500 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-sm text-neutral-200">
              <span className="font-semibold text-white block mb-1">
                Правовой аудит и сопровождение сделок
              </span>
              <span className="text-xs text-neutral-400">
                Защита интересов доверителей на всех стадиях взаимодействия с контрагентами и судами.
              </span>
            </div>
          </div>

          {/* Right Column: Mission and Legal Identity */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-6 sm:p-8">
              <div className="flex items-center gap-3 text-amber-400 mb-3">
                <Target className="w-5 h-5" />
                <h3 className="text-base font-semibold text-white">Наша миссия</h3>
              </div>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Обеспечить субъектам малого и среднего предпринимательства, а также гражданам Казахстана предсказуемую, прозрачную и безупречную правовую защиту. Мы устраняем юридические риски еще до того, как они превращаются в убытки или судебные тяжбы.
              </p>
            </div>

            {/* Official Registration Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-lg p-5">
                <span className="text-xs text-neutral-400 block mb-1">Официальная регистрация</span>
                <span className="text-sm font-semibold text-white block">
                  г. Алматы, 2023 год
                </span>
                <span className="text-xs text-neutral-400 mt-1 block">
                  Зарегистрировано в органах юстиции РК
                </span>
              </div>

              <div className="bg-neutral-900/60 border border-neutral-800 rounded-lg p-5">
                <span className="text-xs text-neutral-400 block mb-1">Основной вид деятельности</span>
                <span className="text-sm font-semibold text-amber-400 block">
                  ОКЭД 69109
                </span>
                <span className="text-xs text-neutral-400 mt-1 block">
                  Прочая деятельность в области права
                </span>
              </div>
            </div>

            {/* Target Clients Strip */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
              <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block mb-2">
                Ключевой профиль доверителей
              </span>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-neutral-300">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Малый бизнес и индивидуальные предприниматели (ИП)
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Средний коммерческий сектор (ТОО, филиалы, СП)
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Частные лица (имущественные, жилищные и договорные вопросы)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Working Principles */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6">
            Принципы профессиональной деятельности
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKING_PRINCIPLES.map((principle, index) => (
              <div
                key={index}
                className="bg-neutral-900/70 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors"
              >
                <div>
                  <span className="text-xs font-mono text-amber-400 mb-2 block tabular-nums">
                    0{index + 1}.
                  </span>
                  <h4 className="text-base font-semibold text-white mb-2">
                    {principle.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
