import type { Metadata } from "next";
import "./globals.css";

import { Header } from "@/components/ui/header/header.component";

export const metadata: Metadata = {
  title: "whodat",
  description: "Try to guess",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
