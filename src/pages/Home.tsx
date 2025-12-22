import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { Timeline } from '../components/Timeline';
import { LanguageSelector } from '../components/LanguageSelector';
import { AppFooter } from '../components/AppFooter';
import { useTranslation } from '../contexts/TranslationContext';
import type { ScheduledTask } from '../types/task';

// Mockup de timeline pour la preview
const mockTasks: ScheduledTask[] = [
  {
    id: 'mock-1',
    name: 'Révision du rapport',
    duration: 90,
    energyLevel: 'high',
    scheduledStartTime: '09:00',
    scheduledEndTime: '10:30',
    timeBlock: '09:00-10:30',
  },
  {
    id: 'mock-2',
    name: 'Réunion équipe',
    duration: 60,
    energyLevel: 'medium',
    scheduledStartTime: '11:00',
    scheduledEndTime: '12:00',
    timeBlock: '11:00-12:00',
  },
  {
    id: 'mock-3',
    name: 'Répondre aux emails',
    duration: 45,
    energyLevel: 'low',
    scheduledStartTime: '14:00',
    scheduledEndTime: '14:45',
    timeBlock: '14:00-14:45',
  },
];

interface HomeProps {
  onNavigateToPlanner: () => void;
}

export function Home({ onNavigateToPlanner }: HomeProps) {
  const { t } = useTranslation();
  
  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #93c5fd 0%, #a78bfa 50%, #f0abfc 100%)',
      }}
    >
      {/* Language Selector */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSelector />
      </div>
      
      <Hero onGetStarted={onNavigateToPlanner} />
      <HowItWorks />
      
      {/* Preview Timeline */}
      <section id="preview" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t.preview.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.preview.description}
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Timeline tasks={mockTasks} />
          </div>
        </div>
      </section>

      <AppFooter onNavigateToPlanner={onNavigateToPlanner} />
    </div>
  );
}

