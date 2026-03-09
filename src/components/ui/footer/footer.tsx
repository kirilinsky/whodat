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
    px: "8",
    py: { base: "2", md: "3" },
    height: "38px",
    borderTop: "1px solid",
    borderColor: "whiteAlpha.100",
    fontFamily: "mono",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
  },
});

export const Footer = () => {
  const { locale } = useLocale();

  return (
    <FooterContainer>
      <styled.span>
        whodat © 2026{" "}
        <a
          className={css({
            color: "dip.red",
          })}
          href="https://github.com/kirilinsky"
          target="_blank"
          rel="noopener noreferrer"
        >
          kirilinsky
        </a>
      </styled.span>

      <HStack gap="8">
        <FooterLink href="/about">{t("footer.about", locale)}</FooterLink>
        <FooterLink href="/terms">{t("footer.terms", locale)}</FooterLink>
        <LocaleSelector />
      </HStack>
    </FooterContainer>
  );
};
