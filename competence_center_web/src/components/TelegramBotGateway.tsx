import React, { useState } from 'react';
import {
  Send,
  QrCode,
  CheckCircle,
  Copy,
  ExternalLink,
  MessageSquare,
  Shield,
  Smartphone,
  Clock,
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData.ts';
import { generateTelegramMessageDraft, buildTelegramConsultationUrl } from '../utils/legalServiceLogic.ts';

interface TelegramBotGatewayProps {
  preselectedServiceTitle?: string;
}

export const TelegramBotGateway: React.FC<TelegramBotGatewayProps> = ({
  preselectedServiceTitle,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>(
    preselectedServiceTitle || 'Экспертиза и сопровождение договоров'
  );
  const [clientName, setClientName] = useState<string>('');
  const [clientRole, setClientRole] = useState<'sme' | 'individual'>('sme');
  const [clientNotes, setClientNotes] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const topics = [
    'Экспертиза и сопровождение договоров',
    'Представительство в суде (СМЭС / гражданский суд)',
    'Регистрация / перерегистрация ТОО, смена участников',
    'Правовой аудит документов и подготовка претензии',
    'Абонентское юридическое обслуживание бизнеса',
    'Индивидуальная правовая консультация',
  ];

  const draftMessage = generateTelegramMessageDraft({
    serviceTitle: selectedTopic,
    clientName: clientName || 'Посетитель сайта',
    clientPhone: 'Будет передан в Telegram',
    clientRole,
    messageText: clientNotes,
  });

  const telegramDirectLink = buildTelegramConsultationUrl({
    serviceId: selectedTopic,
  });

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(draftMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <section
      id="telegram-bot"
      className="py-20 lg:py-28 bg-neutral-950 border-b border-neutral-800 relative overflow-hidden"
    >
      {/* Subtle Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
            04. Точка входа в Telegram-бот
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-2 mb-4 font-display text-balance">
            Автоматизированная запись на юридическую консультацию 24/7
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Основной канал первичной связи с ТОО «COMPETENCE CENTER». Бот принимает обращение, распределяет его профильному юристу и позволяет передавать документы с сохранением конфиденциальности.
          </p>
        </div>

        {/* 2-Column Core Architecture Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Inquiry Builder */}
          <div className="lg:col-span-7 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Подготовка запроса к боту
                    </h3>
                    <span className="text-xs text-neutral-400">
                      Сформируйте тему для быстрой маршрутизации обращения
                    </span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-400">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ответ в течение 15 минут</span>
                </div>
              </div>

              {/* Client Role Filter */}
              <div className="mb-5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-2">
                  Кем вы являетесь:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setClientRole('sme')}
                    className={`px-4 py-2.5 text-xs font-medium rounded-lg border transition-all text-left flex items-center justify-between ${
                      clientRole === 'sme'
                        ? 'bg-neutral-800 border-amber-400 text-white font-semibold'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <span>Бизнес / Юрлицо (МСБ, ТОО, ИП)</span>
                    {clientRole === 'sme' && <CheckCircle className="w-4 h-4 text-amber-400" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setClientRole('individual')}
                    className={`px-4 py-2.5 text-xs font-medium rounded-lg border transition-all text-left flex items-center justify-between ${
                      clientRole === 'individual'
                        ? 'bg-neutral-800 border-amber-400 text-white font-semibold'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <span>Частное лицо (физическое лицо)</span>
                    {clientRole === 'individual' && <CheckCircle className="w-4 h-4 text-amber-400" />}
                  </button>
                </div>
              </div>

              {/* Select Legal Topic */}
              <div className="mb-5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-2">
                  Тематика обращения:
                </label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                >
                  {topics.map((topic, idx) => (
                    <option key={idx} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              {/* Optional Name & Brief Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">
                    Ваше имя или название компании:
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Например: ТОО «Алма Строй» или Ерлан"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">
                    Краткий комментарий (необязательно):
                  </label>
                  <input
                    type="text"
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    placeholder="Например: Срочная проверка договора аренды"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Draft Message Preview Card */}
              <div className="mb-6 bg-neutral-950 border border-neutral-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-neutral-400 font-medium">
                    Предварительный текст обращения для бота:
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copied ? 'Скопировано!' : 'Копировать'}</span>
                  </button>
                </div>
                <div className="text-xs font-mono text-neutral-300 bg-neutral-900/60 p-3 rounded-lg border border-neutral-800/80 whitespace-pre-line leading-relaxed">
                  {draftMessage}
                </div>
              </div>
            </div>

            {/* Main Conversion Button */}
            <div className="pt-2">
              <a
                href={COMPANY_DETAILS.telegramBotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-lg shadow-amber-500/10"
              >
                <Send className="w-4 h-4" />
                <span>Открыть Telegram-бот (@{COMPANY_DETAILS.telegramBotHandle})</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-800" />
              </a>
              <span className="text-center block text-xs text-neutral-400 mt-2">
                Прямой переход в приложение Telegram на компьютере или смартфоне
              </span>
            </div>
          </div>

          {/* Right Column: QR Code & Mobile Scan Experience */}
          <div className="lg:col-span-5 bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-400 mb-4">
                <Smartphone className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">
                  Быстрый вход с телефона
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                Наведите камеру смартфона на QR-код, чтобы моментально запустить бота и начать консультацию в мобильном приложении Telegram.
              </p>

              {/* Clean Stylized QR Code Component */}
              <div className="bg-white p-5 rounded-2xl w-52 h-52 mx-auto flex flex-col items-center justify-center shadow-lg relative border-4 border-amber-400/40">
                {/* SVG QR Code Pattern representing https://t.me/competence_center_kz_bot */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-neutral-950"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer corner markers */}
                  <rect x="5" y="5" width="26" height="26" rx="2" />
                  <rect x="9" y="9" width="18" height="18" fill="white" />
                  <rect x="13" y="13" width="10" height="10" />

                  <rect x="69" y="5" width="26" height="26" rx="2" />
                  <rect x="73" y="9" width="18" height="18" fill="white" />
                  <rect x="77" y="13" width="10" height="10" />

                  <rect x="5" y="69" width="26" height="26" rx="2" />
                  <rect x="9" y="73" width="18" height="18" fill="white" />
                  <rect x="13" y="77" width="10" height="10" />

                  {/* Matrix grid dots */}
                  <rect x="36" y="8" width="5" height="5" />
                  <rect x="46" y="8" width="5" height="5" />
                  <rect x="56" y="8" width="5" height="5" />
                  <rect x="36" y="18" width="5" height="5" />
                  <rect x="51" y="18" width="5" height="5" />

                  <rect x="8" y="36" width="5" height="5" />
                  <rect x="18" y="36" width="5" height="5" />
                  <rect x="8" y="46" width="5" height="5" />
                  <rect x="18" y="56" width="5" height="5" />

                  {/* Center section with subtle Telegram logo symbol */}
                  <rect x="34" y="34" width="32" height="32" rx="4" fill="#0A0A0A" />
                  <path
                    d="M42 50 L56 42 L52 56 L47 52 Z"
                    fill="#F59E0B"
                  />

                  {/* Bottom right data blocks */}
                  <rect x="69" y="40" width="6" height="6" />
                  <rect x="80" y="40" width="6" height="6" />
                  <rect x="69" y="52" width="6" height="6" />
                  <rect x="85" y="52" width="6" height="6" />
                  <rect x="38" y="70" width="6" height="6" />
                  <rect x="48" y="70" width="6" height="6" />
                  <rect x="38" y="82" width="6" height="6" />
                  <rect x="52" y="82" width="6" height="6" />
                  <rect x="72" y="72" width="6" height="6" />
                  <rect x="82" y="82" width="6" height="6" />
                </svg>
              </div>

              <div className="text-center mt-4">
                <span className="text-xs font-mono text-amber-400 block font-semibold">
                  @{COMPANY_DETAILS.telegramBotHandle}
                </span>
                <span className="text-xs text-neutral-400 mt-1 block">
                  Для перехода нажмите или отсканируйте
                </span>
              </div>
            </div>

            {/* Bot Benefits */}
            <div className="mt-6 pt-6 border-t border-neutral-800 space-y-3 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Безопасная передача сканов договоров и судебных актов</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Автоматическое формирование заявки и регистрация в CRM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
