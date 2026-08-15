import React, { useState } from 'react';
import { Send, Menu, X, PhoneCall } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData.ts';

interface HeaderProps {
  onOpenConsultation: (serviceId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#home"
          className="text-lg sm:text-xl font-bold tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="text-amber-500 font-extrabold text-2xl leading-none">§</span>
          <span>COMPETENCE CENTER</span>
        </a>

        {/* Zone 2: 4–5 single-line clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <a
            href="#about"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline decoration-amber-500 underline-offset-8"
          >
            О компании
          </a>
          <a
            href="#services"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline decoration-amber-500 underline-offset-8"
          >
            Услуги
          </a>
          <a
            href="#team"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline decoration-amber-500 underline-offset-8"
          >
            Команда
          </a>
          <a
            href="#telegram-bot"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline decoration-amber-500 underline-offset-8"
          >
            Telegram-бот
          </a>
          <a
            href="#contacts"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline decoration-amber-500 underline-offset-8"
          >
            Контакты
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <a
            href={`tel:${COMPANY_DETAILS.phonePrimary.replace(/[^\d+]/g, '')}`}
            className="hidden xl:flex items-center gap-2 text-xs text-neutral-400 hover:text-neutral-200 transition-colors tabular-nums"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
            <span>{COMPANY_DETAILS.phonePrimary}</span>
          </a>

          <button
            onClick={() => onOpenConsultation()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Консультация в Telegram</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-400 hover:text-white focus:outline-none"
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-900 border-b border-neutral-800 px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-neutral-300">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-800 hover:text-white"
            >
              О компании
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-800 hover:text-white"
            >
              Услуги
            </a>
            <a
              href="#team"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-800 hover:text-white"
            >
              Команда
            </a>
            <a
              href="#telegram-bot"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-800 hover:text-white"
            >
              Telegram-бот
            </a>
            <a
              href="#contacts"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-neutral-800 hover:text-white"
            >
              Контакты
            </a>
          </div>

          <div className="pt-2 border-t border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-500 rounded-lg hover:bg-amber-400 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Записаться через Telegram</span>
            </button>
            <a
              href={`tel:${COMPANY_DETAILS.phonePrimary.replace(/[^\d+]/g, '')}`}
              className="text-center text-xs text-neutral-400 py-1 tabular-nums"
            >
              {COMPANY_DETAILS.phonePrimary}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
