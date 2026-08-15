import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Building,
} from 'lucide-react';
import { COMPANY_DETAILS, FAQ_ITEMS } from '../data/companyData.ts';
import { validateKazakhPhone, formatKazakhPhone } from '../utils/legalServiceLogic.ts';

interface ContactSectionProps {
  onOpenConsultation: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenConsultation }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: 'Договоры и сделки',
    message: '',
  });
  const [phoneError, setPhoneError] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatKazakhPhone(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (phoneError) setPhoneError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateKazakhPhone(formData.phone)) {
      setPhoneError('Введите корректный номер телефона Республики Казахстан (+7 7XX XXX-XX-XX)');
      return;
    }

    setPhoneError('');
    setFormSubmitted(true);
  };

  return (
    <section id="contacts" className="py-20 lg:py-28 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
            05. Офис и контакты
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-2 mb-4 font-display text-balance">
            Свяжитесь с нами удобным для вас способом
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Мы находимся в деловом центре Алматы. Вы можете приехать на личную встречу, позвонить или отправить заявку через Telegram-бот.
          </p>
        </div>

        {/* 2-Column Grid: Contact Information & Interactive Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0 border border-neutral-700">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">
                    Адрес офиса в Алматы
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {COMPANY_DETAILS.address}
                  </p>
                  <span className="text-xs text-neutral-400 block mt-2">
                    Ориентир: рядом с гостиницей «Казахстан» и Дворцом Республики
                  </span>
                </div>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0 border border-neutral-700">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">
                    График работы
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300">
                    {COMPANY_DETAILS.workingHours}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">
                    {COMPANY_DETAILS.weekendHours}
                  </p>
                  <div className="mt-3 text-xs text-amber-400/90 font-medium">
                    Telegram-бот принимает запросы круглосуточно (24/7)
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contacts Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0 border border-neutral-700">
                  <Phone className="w-5 h-5 text-amber-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-white mb-1">
                    Телефоны и Email
                  </h3>
                  <div>
                    <a
                      href={`tel:${COMPANY_DETAILS.phonePrimary.replace(/[^\d+]/g, '')}`}
                      className="text-xs sm:text-sm font-semibold text-white hover:text-amber-400 transition-colors block tabular-nums"
                    >
                      {COMPANY_DETAILS.phonePrimary} (Городской)
                    </a>
                  </div>
                  <div>
                    <a
                      href={`tel:${COMPANY_DETAILS.phoneMobile.replace(/[^\d+]/g, '')}`}
                      className="text-xs sm:text-sm font-semibold text-white hover:text-amber-400 transition-colors block tabular-nums"
                    >
                      {COMPANY_DETAILS.phoneMobile} (Моб. / WhatsApp)
                    </a>
                  </div>
                  <div className="pt-1">
                    <a
                      href={`mailto:${COMPANY_DETAILS.email}`}
                      className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{COMPANY_DETAILS.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Telegram Shortcut button */}
            <button
              onClick={onOpenConsultation}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Перейти в Telegram-бот (@{COMPANY_DETAILS.telegramBotHandle})</span>
            </button>
          </div>

          {/* Right Column: Callback & Consultation Form */}
          <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            {formSubmitted ? (
              <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Ваша заявка принята
                </h3>
                <p className="text-sm text-neutral-300 max-w-md">
                  Спасибо, {formData.name || 'доверитель'}. Дежурный юрист ТОО «COMPETENCE CENTER» свяжется с вами по номеру{' '}
                  <span className="text-white font-semibold tabular-nums">{formData.phone}</span> в течение 15 минут в рабочее время.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <a
                    href={COMPANY_DETAILS.telegramBotUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Ускорить ответ в Telegram-боте</span>
                  </a>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        serviceType: 'Договоры и сделки',
                        message: '',
                      });
                    }}
                    className="px-4 py-2 text-xs text-neutral-400 hover:text-white"
                  >
                    Отправить другой запрос
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Заказать обратный звонок юриста
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Оставьте контактные данные, и специалист свяжется с вами для первичной оценки ситуации.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-neutral-300 block mb-1">
                      ФИО или наименование компании <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Например: Самат Смагулов / ТОО «KazTech»"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-neutral-300 block mb-1">
                      Номер телефона в Казахстане <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="+7 (7XX) XXX-XX-XX"
                      className={`w-full bg-neutral-950 border rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none tabular-nums ${
                        phoneError ? 'border-red-500' : 'border-neutral-800 focus:border-amber-400'
                      }`}
                    />
                    {phoneError && (
                      <span className="text-xs text-red-400 mt-1 block">
                        {phoneError}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs text-neutral-300 block mb-1">
                      Интересующая услуга
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Договоры и сделки">Сопровождение и аудит договоров</option>
                      <option value="Судебное представительство">Представительство в суде (СМЭС)</option>
                      <option value="Корпоративные вопросы">Корпоративное право (ТОО, доли, устав)</option>
                      <option value="Аудит документов">Правовой аудит документов и претензии</option>
                      <option value="Другой вопрос">Другой правовой вопрос</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-neutral-300 block mb-1">
                      Краткое описание вопроса (по желанию)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Опишите в 1-2 предложениях суть задачи..."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                  >
                    Заказать звонок дежурного юриста
                  </button>
                  <span className="block text-center text-xs text-neutral-400 mt-2">
                    Нажимая кнопку, вы подтверждаете согласие на обработку данных в соответствии с законодательством РК.
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="border-t border-neutral-800 pt-16">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <HelpCircle className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Часто задаваемые вопросы
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Ответы на ключевые вопросы доверителей
            </h3>
          </div>

          <div className="space-y-3 max-w-4xl">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-amber-400 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-amber-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
