import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  const { t } = useTranslation();
  
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
            {t.hero.title}
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-light">
            {t.hero.subtitle1}
          </p>
          <p className="text-2xl md:text-3xl text-gray-700 mb-12 font-light">
            {t.hero.subtitle2}
          </p>
          
          <motion.button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.hero.cta}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

