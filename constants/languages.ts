export const LANGUAGES = [
  { label: "English", country: "us", code: "en" },
  { label: "German", country: "de", code: "de" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];
export type LanguageLabel = (typeof LANGUAGES)[number]["label"];
