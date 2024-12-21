import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const ibm_Plex_Serif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable : '--font-ibm-plex-serif'
})

export const metadata: Metadata = {
  title: "PennyGrow",
  description: "PennyGrow is banking platform for students",
  icons: {
    icon: '/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibm_Plex_Serif.variable}`}>{children}</body>
    </html>
  );
}
