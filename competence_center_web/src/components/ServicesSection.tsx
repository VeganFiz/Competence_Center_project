import React, { useState, useMemo } from 'react';
import {
  FileCheck,
  Scale,
  Building2,
  ShieldCheck,
  ArrowRight,
  Send,
  Clock,
  CheckCircle,
  Search,
} from 'lucide-react';
import { LEGAL_SERVICES } from '../data/companyData.ts';
import { ServiceItem } from '../types/index.ts';
import { filterLegalServices } from '../utils/legalServiceLogic.ts';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenConsultation: (serviceId?: string, serviceTitle?: string) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'Все направления' },
  { id: 'contracts', label: 'Сопровождение договоров' },
  { id: 'court', label: 'Судебная защита' },
  { id: 'corporate', label: 'Корпоративное право' },
  { id: 'documents', label: 'Аудит документов' },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenConsultation,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredServices = useMemo(() => {
    return filterLegalServices(LEGAL_SERVICES as any, activeCategory, searchQuery);
  }, [activeCategory, searchQuery]);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-amber-400" />;
      case 'Scale':
        return <Scale className="w-5 h-5 text-amber-400" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-amber-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-amber-400" />;
      default:
        return <FileCheck className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
              02. Наши услуги
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-2 mb-3 font-display text-balance">
              Структурированная правовая помощь бизнесу и частным лицам
            </h2>
            <p className="text-sm sm:text-base text-neutral-300">
              Компетентное решение юридических задач любой сложности в соответствии с законодательством Республики Казахстан.
            </p>
          </div>

          {/* Quick Search */}
          <div className="w-full lg:w-72 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по услугам или теме..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        {/* Filter Controls (Interactive Segmented Buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-400 text-neutral-950 font-semibold shadow-sm'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Service Cards Grid */}
        {filteredServices.length === 0 ? (
          <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-12 text-center max-w-md mx-auto">
            <p className="text-neutral-400 text-sm mb-4">
              По вашему запросу услуг не найдено.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="text-xs text-amber-400 hover:underline"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:border-neutral-700 transition-all hover:bg-neutral-900/90 group"
              >
                <div>
                  {/* Category icon and audience label */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0 border border-neutral-700">
                      {getServiceIcon(service.iconName || '')}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="tabular-nums">
                        {service.estimatedDays.min}–{service.estimatedDays.max} раб. дней
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {service.targetAudience === 'sme'
                          ? 'МСБ'
                          : service.targetAudience === 'individual'
                          ? 'Физ. лица'
                          : 'МСБ и физ. лица'}
                      </span>
                    </div>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Deliverables checklist */}
                  <div className="space-y-2 mb-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
                      Что входит в услугу:
                    </span>
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                        <CheckCircle className="w-4 h-4 text-amber-400/80 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions: View Details & Direct Telegram CTA */}
                <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectService(service as any)}
                    className="text-xs font-medium text-neutral-300 hover:text-white transition-colors flex items-center justify-center sm:justify-start gap-1 py-2 cursor-pointer"
                  >
                    <span>Подробнее об услуге</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenConsultation(service.id, service.title)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Заказать в Telegram</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
