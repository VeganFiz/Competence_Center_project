import React from 'react';
import { Award, Briefcase, GraduationCap, Send } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/companyData.ts';

interface TeamSectionProps {
  onOpenConsultation: (serviceId?: string, topic?: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="team" className="py-20 lg:py-28 bg-neutral-900/40 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
            03. Юридическая команда
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-2 mb-4 font-display text-balance">
            Профильные юристы с подтвержденным судебным и договорным опытом
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Каждое дело и контракт ведет специалист с узкой предметной специализацией в праве Республики Казахстан. Прямой диалог без посредников и стажеров.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {TEAM_MEMBERS.map((lawyer) => (
            <div
              key={lawyer.id}
              className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-8 items-start hover:border-neutral-700 transition-colors"
            >
              {/* Photo */}
              <div className="w-full md:w-48 h-56 md:h-64 rounded-xl overflow-hidden bg-neutral-800 shrink-0 border border-neutral-700/60 relative">
                <img
                  src={lawyer.photoUrl}
                  alt={lawyer.name}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent md:hidden" />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-1">
                    <span>{lawyer.specialization}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {lawyer.name}
                  </h3>

                  <span className="text-xs text-neutral-400 block mb-4">
                    {lawyer.role} · Опыт <span className="tabular-nums font-semibold text-neutral-300">{lawyer.experienceYears} лет</span>
                  </span>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                    {lawyer.bio}
                  </p>

                  <div className="space-y-2 mb-6 text-xs text-neutral-400">
                    <div className="flex items-start gap-2">
                      <GraduationCap className="w-4 h-4 text-amber-400/90 shrink-0 mt-0.5" />
                      <span>{lawyer.education}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-amber-400/90 shrink-0" />
                      <span>
                        Свыше <strong className="text-white tabular-nums">{lawyer.casesHandled}+</strong> успешно проведенных дел и проектов
                      </span>
                    </div>
                  </div>

                  {/* Practice Areas */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {lawyer.practiceAreas.map((area, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-neutral-300 bg-neutral-950 px-2.5 py-1 rounded border border-neutral-800"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Consultation trigger with this lawyer */}
                <button
                  onClick={() => onOpenConsultation(undefined, `Консультация с юристом (${lawyer.name})`)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-200 bg-neutral-800 hover:bg-neutral-700 hover:text-white rounded-lg border border-neutral-700 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>Обсудить задачу с юристом</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
