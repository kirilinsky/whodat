"use client";

import { useEffect, useState } from "react";
import { css } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";
import { Languages } from "lucide-react";

const locales = [
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
];

export default function LocaleSelector() {
  const [currentLocale, setCurrentLocale] = useState("ru");

  useEffect(() => {
    const saved = document.cookie
      .split("; ")
      .find((row) => row.startsWith("NEXT_LOCALE="))
      ?.split("=")[1];

    if (saved) setCurrentLocale(saved);
  }, []);

  const handleLocaleChange = (code: string) => {
    setCurrentLocale(code);
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000`;
    window.location.reload();
  };

  return (
    <div className={flex({ align: "center", gap: "3" })}>
      <Languages size={14} className={css({ color: "dip.red" })} />
      <div className={flex({ gap: "2" })}>
        {locales.map((locale) => (
          <button
            key={locale.code}
            onClick={() => handleLocaleChange(locale.code)}
            className={css({
              fontSize: "10px",
              fontFamily: "mono",
              cursor: "pointer",
              px: "1",
              transition: "all 0.2s",
              color: currentLocale === locale.code ? "white" : "white/20",
              borderBottom: "1px solid",
              borderColor:
                currentLocale === locale.code ? "dip.red" : "transparent",
              _hover: { color: "white/60" },
            })}
          >
            {locale.label}
          </button>
        ))}
      </div>
    </div>
  );
}
