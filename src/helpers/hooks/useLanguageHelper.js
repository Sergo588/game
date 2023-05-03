import { useTranslation } from 'next-i18next';

export const useLanguageHelper = () => {
  const { i18n } = useTranslation();
  const rightLanguages = ['ur'];
  const isRightDirectionLanguage = rightLanguages.includes(i18n.language);

  return {
    isRightDirectionLanguage,
  };
};
