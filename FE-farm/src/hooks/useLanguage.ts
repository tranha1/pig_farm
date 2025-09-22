import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface Language {
  code: string;
  name: string;
}

export const useLanguage = () => {
  const { i18n, t } = useTranslation();
  const [availableLanguages, setAvailableLanguages] = useState<Language[]>([
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'en', name: 'English' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const currentLanguage = i18n.language;

  const changeLanguage = async (languageCode: string) => {
    setIsLoading(true);
    try {
      // Change language in i18next
      await i18n.changeLanguage(languageCode);
      
      // Skip backend API call since it's not implemented
      // Store in localStorage
      localStorage.setItem('i18nextLng', languageCode);
      
    } catch (error) {
      console.error('Error changing language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLanguageInfo = async () => {
    // Skip API call since backend doesn't support language endpoints
    // Just use the default available languages
    return;
  };

  useEffect(() => {
    fetchLanguageInfo();
  }, []);

  return {
    currentLanguage,
    availableLanguages,
    changeLanguage,
    isLoading,
    t,
  };
};
