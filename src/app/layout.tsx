import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { Header } from "@/components/ui/header/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Footer } from "@/components/ui/footer/footer";
import { MainWrapper } from "@/components/ui/main/main";
import { flex } from "@/styled-system/patterns";
import { syncUser } from "./actions/user";

export const metadata: Metadata = {
  title: "whodat | Guess game",
  description: "Try to guess",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user = await syncUser();
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <ClerkProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <html lang={locale}>
          <body
            className={flex({
              direction: "column",
              minH: "100vh",
              bg: "dip.bg",
            })}
          >
            <Header user={user.user} />
            <MainWrapper>{children}</MainWrapper>
            <Footer />
          </body>
        </html>
      </NextIntlClientProvider>
    </ClerkProvider>
  );
}
