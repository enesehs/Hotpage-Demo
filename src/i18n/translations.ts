import { en } from './locales/en';
import { tr } from './locales/tr';
import { es } from './locales/es';
import { fr } from './locales/fr';
import { hi } from './locales/hi';
import { ja } from './locales/ja';
import { ru } from './locales/ru';
import { zh } from './locales/zh';

export type Language = 'en' | 'tr' | 'es' | 'fr' | 'hi' | 'ja' | 'ru' | 'zh';

export const translations = {
    en,
    tr,
    es,
    fr,
    hi,
    ja,
    ru,
    zh
};

export const languageNames: Record<Language, string> = {
    en: 'English',
    tr: 'Türkçe',
    es: 'Español',
    fr: 'Français',
    hi: 'हिन्दी',
    ja: '日本語',
    ru: 'Русский',
    zh: '中文'
};

export const languageFlags: Record<Language, string> = {
    en: '🇺🇸',
    tr: '🇹🇷',
    es: '🇪🇸',
    fr: '🇫🇷',
    hi: '🇮🇳',
    ja: '🇯🇵',
    ru: '🇷🇺',
    zh: '🇨🇳'
};

export type Translations = typeof en;
