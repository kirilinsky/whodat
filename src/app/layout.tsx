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
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: {
    template: "%s | whodat",
    default: "whodat | Identify the Subject: Cyberpunk Interrogation",
  },
  description:
    "Crack the code, uncover the truth. Interrogate historical figures in a cyberpunk terminal interface.",
  metadataBase: new URL("https://whodat.space"),
  openGraph: {
    title: "whodat | The Ultimate Cyberpunk Identity Guessing Game",
    description:
      "A cyberpunk interrogation game. Use your logic to identify encrypted historical figures through chat. Limited attempts, high stakes. Start the decryption protocol.",
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
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localePromise = getLocale();
  const messagesPromise = getMessages();

  const locale = await localePromise;
  const messages = await messagesPromise;

  return (
    <ClerkProvider>
      <html lang={locale}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <body
            className={flex({
              direction: "column",
              h: "100dvh",
              bg: "dip.bg",
              overflow: "hidden",
            })}
          >
            <Header />
            <MainWrapper>{children}</MainWrapper>
            <Footer />
          </body>
          <SpeedInsights />
        </NextIntlClientProvider>
      </html>
    </ClerkProvider>
  );
}
