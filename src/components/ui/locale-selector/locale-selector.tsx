"use client";

import { css } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";
import { Languages } from "lucide-react";
import { LanguageSelector } from "next-language-selector";

const locales = [
  { name: "ru", code: "ru" },
  { name: "de", code: "de" },
  { name: "en", code: "en" },
];

export default function LocaleSelector() {
  return (
    <div className={flex({ align: "center", gap: "3" })}>
      <Languages size={14} className={css({ color: "dip.red" })} />
      <LanguageSelector
        defaultLocale="en"
        locales={locales}
        isDropdown={false}
      />
    </div>
  );
}
