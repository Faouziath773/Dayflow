import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { translations, type Language, type Translations } from '../i18n/translations';

interface TranslationContextType {
  t: Translations;
  language: Language;
  changeLanguage: (lang: Language) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useLocalStorage<Language>('dayflow-language', 'fr');
  
  const t = useMemo(() => translations[language], [language]);
  
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };
  
  const value = useMemo(
    () => ({
      t,
      language,
      changeLanguage,
    }),
    [t, language]
  );
  
  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}

