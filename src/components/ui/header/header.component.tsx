import { css } from "../../../../styled-system/css";
import { styled, HStack, Flex } from "../../../../styled-system/jsx";

const HeaderContainer = styled("header", {
  base: {
    bg: "dip.bg",
    color: "white",
    px: "8",
    py: "4",
    borderBottom: "1px solid",
    borderColor: "whiteAlpha.200",
    fontFamily: "mono",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "full",
  },
});

const NavLink = styled("a", {
  base: {
    fontSize: "xs",
    fontWeight: "bold",
    color: "dip.gray",
    letterSpacing: "widest",
    cursor: "pointer",
    transition: "color 0.2s",
    _hover: { color: "white" },
    textTransform: "uppercase",
  },
});

export const Header = () => {
  return (
    <HeaderContainer>
      <HStack gap="3">
        <div className={css({ color: "dip.red", fontSize: "2xl" })}>🧬</div>
        <styled.h1 fontSize="xl" fontWeight="bold">
          who dat<styled.span color="dip.red">_v0.1</styled.span>
        </styled.h1>
      </HStack>

      <HStack gap="10" display={{ base: "none", md: "flex" }}>
        <NavLink>dashboard</NavLink>
        <NavLink>chat</NavLink>
        <NavLink>about</NavLink>
      </HStack>

      <HStack gap="6">
        <Flex direction="column" alignItems="flex-end">
          <styled.span
            fontSize="10px"
            color="dip.gray"
            textTransform="uppercase"
          >
            System Status
          </styled.span>
          <styled.span fontSize="xs" color="dip.green" fontWeight="bold">
            ● OPERATIONAL
          </styled.span>
        </Flex>

        <styled.button
          px="4"
          py="1"
          border="1px solid"
          borderColor="dip.red"
          color="dip.red"
          fontSize="xs"
          fontWeight="bold"
          borderRadius="sm"
          transition="all 0.2s"
          _hover={{ bg: "dip.red", color: "black" }}
        >
          LOG_OUT
        </styled.button>
      </HStack>
    </HeaderContainer>
  );
};
