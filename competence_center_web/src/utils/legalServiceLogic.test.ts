import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateKazakhPhone,
  formatKazakhPhone,
  buildTelegramConsultationUrl,
  generateTelegramMessageDraft,
  estimateServiceTimeline,
  filterLegalServices,
  type LegalService,
} from './legalServiceLogic.ts';

test('validateKazakhPhone validates valid Kazakhstan mobile and landline formats', () => {
  assert.equal(validateKazakhPhone('+7 701 980 23 45'), true);
  assert.equal(validateKazakhPhone('87019802345'), true);
  assert.equal(validateKazakhPhone('+7 (727) 312-45-88'), true);
  assert.equal(validateKazakhPhone('77771234567'), true);
  assert.equal(validateKazakhPhone(''), false);
  assert.equal(validateKazakhPhone('+1 555 123 4567'), false);
  assert.equal(validateKazakhPhone('12345'), false);
});

test('formatKazakhPhone formats raw input into uniform KZ format', () => {
  const formatted = formatKazakhPhone('77019802345');
  assert.equal(formatted, '+7 (701) 980-23-45');
});

test('buildTelegramConsultationUrl generates valid bot link with deep parameters', () => {
  const defaultUrl = buildTelegramConsultationUrl();
  assert.equal(defaultUrl, 'https://t.me/competence_center_kz_bot');

  const withService = buildTelegramConsultationUrl({
    serviceId: 'contract_review',
  });
  assert.equal(withService, 'https://t.me/competence_center_kz_bot?start=src_contract_review');
});

test('generateTelegramMessageDraft creates informative Russian text with company requisites', () => {
  const draft = generateTelegramMessageDraft({
    serviceTitle: 'Сопровождение договоров',
    clientName: 'Азамат Ибраев',
    clientPhone: '+7 (701) 980-23-45',
    clientRole: 'sme',
    messageText: 'Нужна проверка договора аренды склада на 5 лет',
  });

  assert.ok(draft.includes('ТОО «COMPETENCE CENTER»'));
  assert.ok(draft.includes('Азамат Ибраев'));
  assert.ok(draft.includes('Сопровождение договоров'));
  assert.ok(draft.includes('проверка договора аренды склада'));
  assert.ok(draft.includes('ОКЭД 69109'));
});

test('estimateServiceTimeline adjusts days based on complexity modifier', () => {
  const base = { min: 4, max: 8 };
  const standard = estimateServiceTimeline(base, 'standard');
  assert.equal(standard.minDays, 4);
  assert.equal(standard.maxDays, 8);

  const express = estimateServiceTimeline(base, 'express');
  assert.equal(express.minDays, 2);
  assert.equal(express.maxDays, 4);

  const complex = estimateServiceTimeline(base, 'complex');
  assert.equal(complex.minDays, 6);
  assert.equal(complex.maxDays, 13);
});

test('filterLegalServices filters by category and search keyword', () => {
  const sampleServices: LegalService[] = [
    {
      id: 'contracts',
      category: 'contracts',
      title: 'Разработка договоров',
      shortDesc: 'Составление коммерческих соглашений',
      fullDesc: 'Детальная разработка',
      deliverables: ['Договор поставки', 'Акт'],
      estimatedDays: { min: 2, max: 4 },
      targetAudience: 'both',
      badge: 'Договорное право',
    },
    {
      id: 'litigation',
      category: 'court',
      title: 'Представительство в суде',
      shortDesc: 'Защита в СМЭС г. Алматы',
      fullDesc: 'Судебные разбирательства',
      deliverables: ['Исковое заявление', 'Участие в заседаниях'],
      estimatedDays: { min: 10, max: 30 },
      targetAudience: 'sme',
      badge: 'Судебная защита',
    },
  ];

  const filteredByCategory = filterLegalServices(sampleServices, 'court', '');
  assert.equal(filteredByCategory.length, 1);
  assert.equal(filteredByCategory[0].id, 'litigation');

  const filteredByQuery = filterLegalServices(sampleServices, 'all', 'поставки');
  assert.equal(filteredByQuery.length, 1);
  assert.equal(filteredByQuery[0].id, 'contracts');

  const noMatches = filterLegalServices(sampleServices, 'all', 'несуществующее слово');
  assert.equal(noMatches.length, 0);
});
