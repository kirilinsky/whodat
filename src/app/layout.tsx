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
  title: {
    template: "%s | whodat",
    default: "whodat | try to guess",
  },
  description:
    "Crack the code, uncover the truth. Interrogate historical figures in a cyberpunk terminal interface.",
  metadataBase: new URL("https://whodat.space"),
  openGraph: {
    title: "whodat | Guess the Identity",
    description: "Cyberpunk interrogation game. Can you identify the subject?",
    url: "https://whodat.space",
    siteName: "whodat",
    images: [
      {
        url: "/og-main.jpg",
        width: 1200,
        height: 630,
        alt: "whodat Terminal Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "whodat | Identity Interrogation",
    description: "Do you have the mind to extract the truth?",
    images: ["/og-main.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
              h: "100vh",
              bg: "dip.bg",
              overflow: "hidden",
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
