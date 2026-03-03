import { styled, HStack } from "@/styled-system/jsx";

const FooterContainer = styled("footer", {
  base: {
    bg: "dip.bg",
    color: "dip.gray",
    px: "8",
    py: "3",
    borderTop: "1px solid",
    borderColor: "whiteAlpha.100",
    fontFamily: "mono",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "full",
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "wider",
  },
});

const FooterLink = styled("a", {
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
        whodat © 2044 <a href="https://github.com/kirilinsky">kirilinsky</a>
      </styled.span>

      <HStack gap="8">
        <FooterLink>Terms_of_Entry</FooterLink>
      </HStack>
    </FooterContainer>
  );
};
