/**
 * Core business and consultation routing logic for LLP "COMPETENCE CENTER"
 * Registered in Almaty, Kazakhstan (2023), OKED 69109 (Other legal activities).
 */

export interface LegalService {
  id: string;
  category: 'contracts' | 'court' | 'corporate' | 'documents';
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  estimatedDays: { min: number; max: number };
  targetAudience: 'sme' | 'individual' | 'both';
  iconName?: string;
  workflowStages?: string[];
  suitableFor?: string[];
  badge?: string;
}

export const OFFICIAL_COMPANY_INFO = {
  name: 'ТОО «COMPETENCE CENTER»',
  legalForm: 'Товарищество с ограниченной ответственностью',
  city: 'г. Алматы, Республика Казахстан',
  address: 'г. Алматы, Медеуский район, пр. Достык, 180, БЦ «Koktobe Tower», офис 504',
  yearFounded: 2023,
  oked: '69109 — Прочая деятельность в области права',
  phone: '+7 (727) 312-45-88',
  phoneMobile: '+7 (701) 980-23-45',
  email: 'info@competence-center.kz',
  telegramBotHandle: 'competence_center_kz_bot',
  telegramBotUrl: 'https://t.me/competence_center_kz_bot',
  workingHours: 'Пн–Пт: 09:00 – 18:00 (Сб по согласованию)',
};

/**
 * Validates Kazakhstan phone numbers (+7 7XX XXX-XX-XX or 8 7XX...)
 */
export function validateKazakhPhone(phone: string): boolean {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-()]/g, '');
  // Match +77XXXXXXXXX or 87XXXXXXXXX (11 digits in total)
  return /^(\+7|8|7)7\d{9}$/.test(cleaned);
}

/**
 * Formats a clean Kazakhstan phone number
 */
export function formatKazakhPhone(input: string): string {
  const digits = input.replace(/\D/g, '');
  if (!digits) return '';

  let normalized = digits;
  if (normalized.startsWith('8')) {
    normalized = '7' + normalized.slice(1);
  } else if (!normalized.startsWith('7')) {
    normalized = '7' + normalized;
  }

  normalized = normalized.slice(0, 11);

  let formatted = '+7';
  if (normalized.length > 1) {
    formatted += ' (' + normalized.slice(1, 4);
  }
  if (normalized.length >= 4) {
    formatted += ') ' + normalized.slice(4, 7);
  }
  if (normalized.length >= 7) {
    formatted += '-' + normalized.slice(7, 9);
  }
  if (normalized.length >= 9) {
    formatted += '-' + normalized.slice(9, 11);
  }
  return formatted;
}

/**
 * Builds direct entry Telegram Bot URL with pre-filled context parameters
 */
export function buildTelegramConsultationUrl(options?: {
  serviceId?: string;
  serviceTitle?: string;
  clientName?: string;
  clientPhone?: string;
  clientNote?: string;
  botHandle?: string;
}): string {
  const handle = options?.botHandle || OFFICIAL_COMPANY_INFO.telegramBotHandle;
  const baseUrl = `https://t.me/${handle}`;

  const params: string[] = [];

  if (options?.serviceId) {
    params.push(`src_${encodeURIComponent(options.serviceId.replace(/[^a-zA-Z0-9_]/g, '_'))}`);
  }

  if (params.length > 0) {
    return `${baseUrl}?start=${params.join('_')}`;
  }

  return baseUrl;
}

/**
 * Generates formatted consultation draft message ready for Telegram
 */
export function generateTelegramMessageDraft(options: {
  serviceTitle: string;
  clientName: string;
  clientPhone: string;
  clientRole?: 'sme' | 'individual';
  messageText?: string;
}): string {
  const lines: string[] = [
    `🏛 *Заявка на консультацию — ТОО «COMPETENCE CENTER»*`,
    `Клиент: ${options.clientName || 'Не указано'}`,
    `Телефон: ${options.clientPhone || 'Не указано'}`,
    `Категория: ${options.clientRole === 'sme' ? 'Малый/средний бизнес (МСБ)' : 'Физическое лицо / частный вопрос'}`,
    `Услуга: ${options.serviceTitle}`,
  ];

  if (options.messageText?.trim()) {
    lines.push(`Суть обращения: ${options.messageText.trim()}`);
  }

  lines.push(`Город: Алматы (ОКЭД 69109)`);
  return lines.join('\n');
}

/**
 * Computes turnaround times and recommended review stages
 */
export function estimateServiceTimeline(
  baseDays: { min: number; max: number },
  complexity: 'standard' | 'express' | 'complex' = 'standard'
): { minDays: number; maxDays: number; turnaroundText: string } {
  let min = baseDays.min;
  let max = baseDays.max;

  if (complexity === 'express') {
    min = Math.max(1, Math.round(min * 0.5));
    max = Math.max(1, Math.round(max * 0.5));
  } else if (complexity === 'complex') {
    min = Math.round(min * 1.5);
    max = Math.round(max * 1.6);
  }

  const turnaroundText =
    min === max
      ? `${min} ${min === 1 ? 'рабочий день' : min < 5 ? 'рабочих дня' : 'рабочих дней'}`
      : `${min}–${max} рабочих дней`;

  return { minDays: min, maxDays: max, turnaroundText };
}

/**
 * Filter services by category and keyword query
 */
export function filterLegalServices(
  services: LegalService[],
  activeCategory: string,
  searchQuery: string
): LegalService[] {
  const query = searchQuery.toLowerCase().trim();

  return services.filter((service) => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    if (!matchesCategory) return false;

    if (!query) return true;

    return (
      service.title.toLowerCase().includes(query) ||
      service.shortDesc.toLowerCase().includes(query) ||
      service.deliverables.some((d) => d.toLowerCase().includes(query))
    );
  });
}
