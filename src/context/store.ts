import { create } from "zustand";
import { Subscription } from "@/types/subscription";

export type LanguagesSupported =
  | "en"
  | "de"
  | "fr"
  | "es"
  | "hi"
  | "ja"
  | "la"
  | "ru"
  | "zh"
  | "ar";

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
  en: "English",
  de: "German",
  fr: "French",
  es: "Spanish",
  hi: "Hindi",
  ja: "Japanese",
  la: "Latin",
  ru: "Russian",
  zh: "Mandarin",
  ar: "Arabic",
};

const LANGUAGES_IN_FREE = 2;

interface LanguageState {
  language: LanguagesSupported;
  setLanguage: (language: LanguagesSupported) => void;
  getLanguages: (isPro: boolean) => LanguagesSupported[];
  getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];
}

interface SubscriptionState {
  subscription: Subscription | null | undefined;
  setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: null,
  setSubscription: (subscription) => set({ subscription }),
}));

export const useLanguageStore = create<LanguageState>((set) => ({
  language: "en",
  setLanguage: (language: LanguagesSupported) => set({ language }),
  getLanguages: (isPro: boolean) => {
    /* If the user is pro, return all supported languages */
    if (isPro)
      return Object.keys(LanguagesSupportedMap) as LanguagesSupported[];

    /* if not pro, return only the first two languages */
    return Object.keys(LanguagesSupportedMap).slice(
      0,
      LANGUAGES_IN_FREE,
    ) as LanguagesSupported[];
  },
  getNotSupportedLanguages(isPro: boolean) {
    /* No unsupported languages for "pro" users */
    if (isPro) return [];

    /* Excluding the first two supported languages */
    return Object.keys(LanguagesSupportedMap).slice(
      LANGUAGES_IN_FREE,
    ) as LanguagesSupported[];
  },
}));
