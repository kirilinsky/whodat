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
    px: { base: "3", md: "8" },
    py: { base: "2", md: "4" },
    borderBottom: "1px solid",
    borderColor: "whiteAlpha.200",
    fontFamily: "mono",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "full",
    minH: { base: "80px", md: "67px" },  
  },
});

const NavLink = styled(Link, {
  base: {
    fontSize: { base: "10px", md: "xs" },
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
      <HeaderContainer gap="2">
        <HStack gap="2" width="full" justify={"space-between"}>
          <Link
            href="/"
            className={css({ display: "flex", alignItems: "center", gap: "2" })}
          >
            <Image
              src="/logo.png"
              width={24}
              height={23}
              alt="logo"
              className={css({ md: { width: "34px", height: "33px" } })}
            />
            <styled.div fontSize={{ base: "md", md: "xl" }} fontWeight="bold">
              who<styled.span color="dip.red">dat</styled.span>
            </styled.div>
          </Link>

          <HStack
            gap={{ base: 3, md: 10 }}
            flexWrap={"wrap"}
            justifyContent={{ base: "flex-end", md: "center" }}
            width={"full"}
          >
            <NavLink href="/dashboard">{t("header.dashboard", locale)}</NavLink>
            <NavLink href="/profile">{t("header.profile", locale)}</NavLink>
          </HStack>
        </HStack>

        <HStack gap={{ base: "2", md: "6" }}>
          <SignedOut>
            <HStack gap="1.5">
              <SignInButton>
                <styled.div
                  px={{ base: "2", md: "4" }}
                  py="1"
                  border="1px solid"
                  borderColor="dip.green"
                  color="dip.green"
                  fontSize={{ base: "10px", md: "xs" }}
                  fontWeight="bold"
                  borderRadius="sm"
                  cursor="pointer"
                  _hover={{ bg: "dip.green", color: "black" }}
                >
                  {t("header.sign_in", locale)}
                </styled.div>
              </SignInButton>
              <SignUpButton>
                <styled.div
                  px={{ base: "2", md: "4" }}
                  py="1"
                  bg="dip.green"
                  color="black"
                  fontSize={{ base: "10px", md: "xs" }}
                  fontWeight="bold"
                  borderRadius="sm"
                  cursor="pointer"
                  _hover={{ bg: "white" }}
                >
                  {t("header.sign_up", locale)}
                </styled.div>
              </SignUpButton>
            </HStack>
          </SignedOut>

          <SignedIn>
            <HStack
              gap={{ base: 2, md: 4 }}
              display={{ base: "none", md: "flex" }}
            >
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      w: { base: "24px", md: "32px" },
                      h: { base: "24px", md: "32px" },
                    },
                  },
                }}
              />
              <SignOutButton>
                <styled.div
                  px={{ base: "2", md: "4" }}
                  py="1"
                  border="1px solid"
                  borderColor="dip.red"
                  color="dip.red"
                  fontSize={{ base: "10px", md: "xs" }}
                  fontWeight="bold"
                  borderRadius="sm"
                  cursor="pointer"
                  _hover={{ bg: "dip.red", color: "black" }}
                >
                  {t("header.sign_out", locale)}
                </styled.div>
              </SignOutButton>
            </HStack>
          </SignedIn>
        </HStack>
      </HeaderContainer>
    </ClerkProvider>
  );
};
