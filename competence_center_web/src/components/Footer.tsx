import React from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData.ts';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Brand & Requisites */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <span className="text-amber-500 font-extrabold text-2xl leading-none">§</span>
              <span>COMPETENCE CENTER</span>
            </div>
            <p className="text-neutral-300 leading-relaxed text-xs sm:text-sm">
              ТОО «COMPETENCE CENTER» — частная юридическая компания в Алматы. Зарегистрирована в 2023 году. Комплексное юридическое сопровождение договоров, судебная защита бизнеса, корпоративное право и правовой аудит документов.
            </p>
            <div className="text-xs text-neutral-400 space-y-1 pt-2 font-mono tabular-nums">
              <div>БИН: {COMPANY_DETAILS.bin}</div>
              <div>ОКЭД: {COMPANY_DETAILS.oked} ({COMPANY_DETAILS.okedDescription})</div>
              <div>Юрисдикция: Республика Казахстан, г. Алматы</div>
            </div>
          </div>

          {/* Quick Nav Mirror */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block">
              Навигация
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  О компании и принципы
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Юридические услуги
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-amber-400 transition-colors">
                  Юристы и специализация
                </a>
              </li>
              <li>
                <a href="#telegram-bot" className="hover:text-amber-400 transition-colors">
                  Telegram-бот консультаций
                </a>
              </li>
              <li>
                <a href="#contacts" className="hover:text-amber-400 transition-colors">
                  Офис в Алматы и контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Contacts & Telegram */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block">
              Быстрая связь
            </span>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{COMPANY_DETAILS.address}</span>
              </div>
              <div className="flex items-center gap-2 tabular-nums">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a
                  href={`tel:${COMPANY_DETAILS.phonePrimary.replace(/[^\d+]/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_DETAILS.phonePrimary}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_DETAILS.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={COMPANY_DETAILS.telegramBotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-amber-400 hover:text-amber-300 border border-neutral-800 text-xs font-medium transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Бот в Telegram: @{COMPANY_DETAILS.telegramBotHandle}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Copyright */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400 text-xs">
          <div>
            © 2023–2026 {COMPANY_DETAILS.fullName}. Все права защищены.
          </div>
          <div className="text-neutral-400">
            Деятельность осуществляется в соответствии с законодательством Республики Казахстан.
          </div>
        </div>
      </div>
    </footer>
  );
};
