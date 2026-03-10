export type Locale = (typeof locales)[number];

export const locales = ["en", "ru", "de"] as const;
export const defaultLocale: Locale = "en";
