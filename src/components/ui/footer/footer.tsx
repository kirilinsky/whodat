"use client";

import { styled, HStack } from "@/styled-system/jsx";
import Link from "next/link";
import LocaleSelector from "../locale-selector/locale-selector";
import { useLocale } from "@/hooks/use-locale";
import { t } from "@/services/get-translation";
import { css } from "@/styled-system/css";

const FooterContainer = styled("footer", {
  base: {
    bg: "dip.bg",
    color: "dip.gray",
    px: { base: "4", md: "8" },
    py: { base: "4", md: "0" },
    minH: "38px",
    borderTop: "1px solid",
    borderColor: "whiteAlpha.100",
    fontFamily: "mono",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: { base: "column", md: "row" },
    gap: { base: "4", md: "0" },
    width: "full",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "wider",
  },
});

const FooterLink = styled(Link, {
  base: {
    cursor: "pointer",
    transition: "color 0.2s",
    _hover: { color: "white" },
    whiteSpace: "nowrap",
  },
});

export const Footer = () => {
  const { locale } = useLocale();
 
  return (
    <FooterContainer>
      <HStack justify="flex-end" width={{ base: "full", md: "auto" }}>
        whodat © 2026{" "}
        <a
          className={css({
            color: "dip.red",
            _hover: { textDecoration: "underline" },
          })}
          href="https://github.com/kirilinsky"
          target="_blank"
          rel="noopener noreferrer"
        >
          kirilinsky
        </a>
      </HStack>

      <HStack
        gap={{ base: "4", sm: "8" }}
        width={{ base: "full", md: "auto" }}
        justify="space-between"
        flexWrap="wrap"
      >
        <HStack>
          <FooterLink href="/about">{t("footer.about", locale)}</FooterLink>
          <FooterLink href="/terms">{t("footer.terms", locale)}</FooterLink>
        </HStack>
        <LocaleSelector />
      </HStack>
    </FooterContainer>
  );
};
