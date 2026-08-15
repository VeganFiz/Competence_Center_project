/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { ServiceDetailModal } from './components/ServiceDetailModal.tsx';
import { TeamSection } from './components/TeamSection.tsx';
import { TelegramBotGateway } from './components/TelegramBotGateway.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ConsultationModal } from './components/ConsultationModal.tsx';
import { ServiceItem } from './types/index.ts';

export default function App() {
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceItem | null>(null);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [consultationServiceId, setConsultationServiceId] = useState<string | undefined>();
  const [consultationTopic, setConsultationTopic] = useState<string | undefined>();

  const handleOpenConsultation = (serviceId?: string, topic?: string) => {
    setConsultationServiceId(serviceId);
    setConsultationTopic(topic);
    setConsultationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Bar following Top Bar Contract */}
      <Header onOpenConsultation={handleOpenConsultation} />

      {/* Main Corporate Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenConsultation={handleOpenConsultation} />

        {/* About Company & Principles (Registered 2023, OKED 69109, Almaty) */}
        <AboutSection />

        {/* Structured Services: Contracts, Court Representation, Corporate Law, Document Review */}
        <ServicesSection
          onSelectService={(service) => setSelectedServiceForModal(service)}
          onOpenConsultation={(serviceId, title) => handleOpenConsultation(serviceId, title)}
        />

        {/* Team: Director and Senior Legal Counsels */}
        <TeamSection onOpenConsultation={handleOpenConsultation} />

        {/* Telegram Bot Gateway: Direct Conversion Hub with QR & Draft Generator */}
        <TelegramBotGateway preselectedServiceTitle={consultationTopic} />

        {/* Office in Almaty, Working Hours, Callback Request & FAQ */}
        <ContactSection onOpenConsultation={() => handleOpenConsultation()} />
      </main>

      {/* Corporate Quiet Footer */}
      <Footer />

      {/* Interactive Service Detail Modal */}
      <ServiceDetailModal
        service={selectedServiceForModal}
        onClose={() => setSelectedServiceForModal(null)}
        onConsult={(serviceId, serviceTitle) => {
          setSelectedServiceForModal(null);
          handleOpenConsultation(serviceId, serviceTitle);
        }}
      />

      {/* Global Consultation Modal */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        initialServiceId={consultationServiceId}
        initialTopic={consultationTopic}
      />
    </div>
  );
}
