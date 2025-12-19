import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { Timeline } from '../components/Timeline';
import { LanguageSelector } from '../components/LanguageSelector';
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

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 border-t border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-3">Dayflow</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t.footer.description}
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h4 className="text-white font-semibold mb-4">{t.footer.quickLinks}</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateToPlanner();
                    }}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {t.footer.planner}
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('how-it-works')?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }}
                  >
                    {t.footer.howItWorks}
                  </a>
                </li>
                
              </ul>
            </div>

            {/* Social Links */}
            <div className="text-center md:text-left">
              <h4 className="text-white font-semibold mb-4">{t.footer.followMe}</h4>
              <div className="flex justify-center md:justify-start gap-4">
                <a
                  href="https://my-portfolio-sandy-alpha-69.vercel.app"
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Portfolio"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/Faouziath773"
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C17.146 18.197 20 14.444 20 10.017 20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/faouziath-idriss-a982b5215"
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8 mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                {t.footer.madeWith} <span className="text-red-500">❤</span> {t.footer.by}{' '}
                <span className="text-white font-semibold">Faouzaith Idrissou</span>
              </p>
              <p className="text-gray-500 text-xs">
                © {new Date().getFullYear()} {t.footer.copyright}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

