import { styled, HStack } from "@/styled-system/jsx";
import Link from "next/link";

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
  return (
    <FooterContainer>
      <styled.span>
        whodat © 2026 <a href="https://github.com/kirilinsky">kirilinsky</a>
      </styled.span>

      <HStack gap="8">
         <FooterLink href="/about">About</FooterLink>
        <FooterLink href="/terms">Terms_of_Entry</FooterLink>
      </HStack>
    </FooterContainer>
  );
};
