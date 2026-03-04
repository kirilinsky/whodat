import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { Header } from "@/components/ui/header/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Footer } from "@/components/ui/footer/footer";
import { MainWrapper } from "@/components/ui/main/main";
import { flex } from "@/styled-system/patterns";
import { defaultLocale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "whodat",
  description: "Try to guess",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            <Header />
            <MainWrapper>{children}</MainWrapper>
            <Footer />
          </body>
        </html>
      </NextIntlClientProvider>
    </ClerkProvider>
  );
}
