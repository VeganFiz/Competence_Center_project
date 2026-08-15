export interface ServiceItem {
  id: string;
  category: 'contracts' | 'court' | 'corporate' | 'documents';
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  workflowStages: string[];
  estimatedDays: { min: number; max: number };
  targetAudience: 'sme' | 'individual' | 'both';
  iconName: string;
  suitableFor: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialization: string;
  experienceYears: number;
  education: string;
  bio: string;
  photoUrl: string;
  casesHandled: number;
  practiceAreas: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'general' | 'business' | 'court' | 'telegram';
}

export interface TrustMetric {
  value: string;
  label: string;
  subtext: string;
}
