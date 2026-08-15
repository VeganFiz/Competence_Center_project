import React, { useState } from 'react';
import {
  X,
  Send,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { COMPANY_DETAILS, LEGAL_SERVICES } from '../data/companyData.ts';
import { buildTelegramConsultationUrl, generateTelegramMessageDraft } from '../utils/legalServiceLogic.ts';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialTopic?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  initialTopic,
}) => {
  if (!isOpen) return null;

  const defaultService =
    LEGAL_SERVICES.find((s) => s.id === initialServiceId)?.title ||
    initialTopic ||
    'Экспертиза и сопровождение договоров';

  const [selectedService, setSelectedService] = useState<string>(defaultService);
  const [clientName, setClientName] = useState<string>('');
  const [clientType, setClientType] = useState<'sme' | 'individual'>('sme');
  const [briefSummary, setBriefSummary] = useState<string>('');

  const telegramUrl = buildTelegramConsultationUrl({
    serviceId: initialServiceId,
  });

  const messageDraft = generateTelegramMessageDraft({
    serviceTitle: selectedService,
    clientName: clientName || 'Клиент',
    clientPhone: 'Будет передан в Telegram',
    clientRole: clientType,
    messageText: briefSummary,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="Закрыть модальное окно"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-2">
          <Send className="w-4 h-4" />
          <span>Консультация в Telegram-боте</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-display">
          Запись на юридическую консультацию
        </h3>
        <p className="text-xs sm:text-sm text-neutral-300 mb-6">
          Бот моментально передаст вашу задачу дежурному юристу ТОО «COMPETENCE CENTER». Время ответа — до 15 минут в рабочее время.
        </p>

        {/* Client Type selector */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-neutral-300 block mb-1.5 uppercase tracking-wider">
            Тип доверителя
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setClientType('sme')}
              className={`py-2 px-3 text-xs rounded-lg border text-center transition-colors ${
                clientType === 'sme'
                  ? 'bg-neutral-800 border-amber-400 text-white font-semibold'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              Бизнес (ТОО / ИП)
            </button>
            <button
              type="button"
              onClick={() => setClientType('individual')}
              className={`py-2 px-3 text-xs rounded-lg border text-center transition-colors ${
                clientType === 'individual'
                  ? 'bg-neutral-800 border-amber-400 text-white font-semibold'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              Частное лицо
            </button>
          </div>
        </div>

        {/* Legal Direction selector */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-neutral-300 block mb-1.5 uppercase tracking-wider">
            Предмет вопроса
          </label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            {LEGAL_SERVICES.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Срочная защита в суде / иск">Срочная защита в суде / иск</option>
            <option value="Комплексный юридический консалтинг">Комплексный консалтинг</option>
          </select>
        </div>

        {/* Client Name input */}
        <div className="mb-4">
          <label className="text-xs text-neutral-400 block mb-1">
            Как к вам обращаться?
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Ваше имя или наименование организации"
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Message preview */}
        <div className="mb-6 bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-neutral-300">
          <span className="text-neutral-400 text-xs block mb-1 font-medium">
            Сформированный запрос:
          </span>
          <p className="font-mono text-xs text-amber-300/90 whitespace-pre-line leading-relaxed">
            {messageDraft}
          </p>
        </div>

        {/* Direct Action */}
        <div className="space-y-3">
          <a
            href={COMPANY_DETAILS.telegramBotUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-md"
          >
            <Send className="w-4 h-4" />
            <span>Перейти в Telegram-бот (@{COMPANY_DETAILS.telegramBotHandle})</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center justify-center gap-4 text-xs text-neutral-400 pt-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Конфиденциальность 100%
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              ОКЭД 69109
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
