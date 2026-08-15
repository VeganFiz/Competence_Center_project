import React from 'react';
import { X, CheckCircle2, Clock, Users, Send, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types/index.ts';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onConsult: (serviceId: string, serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onConsult,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="Закрыть модальное окно"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Metadata info */}
        <div className="flex items-center gap-3 text-xs text-neutral-400 mb-3">
          <span className="text-amber-400 font-semibold uppercase tracking-wider">
            {service.category === 'contracts'
              ? 'Договорное право'
              : service.category === 'court'
              ? 'Судебная защита'
              : service.category === 'corporate'
              ? 'Корпоративное право'
              : 'Аудит документов'}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span className="tabular-nums">
              {service.estimatedDays.min}–{service.estimatedDays.max} дней
            </span>
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 font-display">
          {service.title}
        </h3>

        <p className="text-sm text-neutral-300 leading-relaxed mb-6">
          {service.fullDesc}
        </p>

        {/* Deliverables */}
        <div className="mb-6 bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-5">
          <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-3">
            Результаты оказания услуги (Deliverables)
          </h4>
          <ul className="space-y-2.5">
            {service.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Workflow Stages */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-3">
            Этапы работы с юристом
          </h4>
          <div className="space-y-2">
            {service.workflowStages.map((stage, idx) => (
              <div
                key={idx}
                className="text-xs sm:text-sm text-neutral-300 bg-neutral-950/40 border border-neutral-800 rounded-lg p-3"
              >
                {stage}
              </div>
            ))}
          </div>
        </div>

        {/* Best Suitable For */}
        <div className="mb-8">
          <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-2">
            Применяется в ситуациях:
          </h4>
          <div className="flex flex-wrap gap-2">
            {service.suitableFor.map((item, idx) => (
              <span
                key={idx}
                className="text-xs text-neutral-300 bg-neutral-800/80 border border-neutral-700/60 px-3 py-1 rounded-md"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Actions - sticky at bottom */}
        <div className="sticky bottom-0 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 px-6 sm:px-8 py-4 bg-neutral-900/95 backdrop-blur-md border-t border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer text-center"
          >
            Закрыть
          </button>

          <button
            onClick={() => {
              onClose();
              onConsult(service.id, service.title);
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Заказать в Telegram-бот</span>
          </button>
        </div>
      </div>
    </div>
  );
};
