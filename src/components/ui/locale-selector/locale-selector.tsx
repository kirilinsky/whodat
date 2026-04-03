"use client";

import { css } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";
import { Languages } from "lucide-react";
import { LanguageSelector } from "next-language-selector";
const locales = [
  { name: "de", code: "de" },
  { name: "ru", code: "ru" },
  { name: "en", code: "en" },
];

export default function LocaleSelector() {
  return (
    <div className={flex({ align: "center", gap: "2" })}>
      <Languages size={12} className={css({ color: "dip.red", flexShrink: 0 })} />
      <LanguageSelector
        defaultLocale="en"
        locales={locales}
        className={css({
          display: "flex",
          gap: "1",
          fontFamily: "mono",
        })}
        itemClassName={css({
          fontSize: "11px",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "wider",
          color: "dip.gray",
          cursor: "pointer",
          transition: "color 0.2s",
          px: "1",
          _hover: { color: "white" },
          "&[data-active='true'], &.active, &[aria-current='true']": {
            color: "dip.red",
          },
        })}
      />
    </div>
  );
}
