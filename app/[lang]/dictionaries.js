import 'server-only';

const dictionaries = {
  en: () => import('../../dictionaries/en.json').then((module) => module.default),
  et: () => import('../../dictionaries/et.json').then((module) => module.default),
};

export const getDictionary = async (locale) => dictionaries[locale]();