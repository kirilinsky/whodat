"use client";

import { useState, useEffect } from "react";

type Locale = "ru" | "en" | "de";

export function useLocale() {
  const [locale, setLocale] = useState<Locale>("ru");

  useEffect(() => {
    const saved = document.cookie
      .split("; ")
      .find((row) => row.startsWith("NEXT_LOCALE="))
      ?.split("=")[1] as Locale;

    if (saved && ["ru", "en", "de"].includes(saved)) {
      setLocale(saved);
    }
  }, []);

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    window.location.reload();
  };

  return { locale, changeLocale };
}
