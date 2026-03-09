"use client";

import { css } from "@/styled-system/css";
import { styled, HStack, Flex } from "@/styled-system/jsx";
import { UserType } from "@/types/user.types";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  UserButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/hooks/use-locale";
import { t } from "@/services/get-translation";

const HeaderContainer = styled("header", {
  base: {
    bg: "dip.bg",
    color: "white",
    px: { base: "2", md: "8" },
    py: { base: "3", md: "4" },
    borderBottom: "1px solid",
    borderColor: "whiteAlpha.200",
    fontFamily: "mono",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "full",
    height: "67px",
  },
});

const NavLink = styled(Link, {
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

export const Header = ({ user }: { user?: UserType }) => {
  const { locale } = useLocale();

  return (
    <ClerkProvider>
      <HeaderContainer>
        <HStack gap="2">
          <Link
            href="/"
            className={css({ display: "flex", alignItems: "center", gap: "2" })}
          >
            <Image src="/logo.png" width={34} height={33} alt="logo" />
            <styled.div fontSize="xl" fontWeight="bold">
              who<styled.span color="dip.red">dat</styled.span>
            </styled.div>
          </Link>
        </HStack>

        <HStack gap={{ base: 3, md: 9 }}>
          <NavLink href="/dashboard">{t("header.dashboard", locale)}</NavLink>
          <NavLink href="/profile">{t("header.profile", locale)}</NavLink>
        </HStack>

        <HStack gap="6">
          <Flex
            direction="column"
            alignItems="flex-end"
            display={{ base: "none", md: "flex" }}
          >
            <styled.span
              fontSize="10px"
              color="dip.gray"
              textTransform="uppercase"
            >
              {t("header.system_status", locale)}
            </styled.span>
            {user ? (
              <styled.span fontSize="xs" color="dip.green" fontWeight="bold">
                ● {t("header.operational", locale)} ({user.username})
              </styled.span>
            ) : (
              <styled.span fontSize="xs" color="dip.red" fontWeight="bold">
                ● {t("header.failed", locale)} ({t("header.no_user", locale)})
              </styled.span>
            )}
          </Flex>

          <SignedOut>
            <HStack gap="2">
              <styled.div
                px="4"
                py="1"
                border="1px solid"
                borderColor="dip.green"
                color="dip.green"
                fontSize="xs"
                fontWeight="bold"
                borderRadius="sm"
                transition="all 0.2s"
                cursor="pointer"
                _hover={{ bg: "dip.green", color: "black" }}
              >
                <SignInButton>{t("header.sign_in", locale)}</SignInButton>
              </styled.div>
              <styled.div
                px="4"
                py="1"
                border="1px solid"
                borderColor="dip.green"
                color="dip.green"
                fontSize="xs"
                fontWeight="bold"
                borderRadius="sm"
                transition="all 0.2s"
                cursor="pointer"
                _hover={{ bg: "dip.green", color: "black" }}
              >
                <SignUpButton>{t("header.sign_up", locale)}</SignUpButton>
              </styled.div>
            </HStack>
          </SignedOut>

          <SignedIn>
            <HStack gap="4">
              <UserButton />
              <styled.div
                px="4"
                py="1"
                border="1px solid"
                borderColor="dip.red"
                color="dip.red"
                fontSize="xs"
                fontWeight="bold"
                borderRadius="sm"
                transition="all 0.2s"
                cursor="pointer"
                _hover={{ bg: "dip.red", color: "black" }}
              >
                <SignOutButton>{t("header.sign_out", locale)}</SignOutButton>
              </styled.div>
            </HStack>
          </SignedIn>
        </HStack>
      </HeaderContainer>
    </ClerkProvider>
  );
};
