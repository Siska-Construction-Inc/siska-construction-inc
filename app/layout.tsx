import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TranslationProvider } from "@/lib/i18n/TranslationProvider";
import { initTranslations } from "@/lib/i18n/initTranslations";
import { resolveLocale } from "@/lib/i18n/localeUtils";
import { namespaces, type Locale } from "@/lib/i18n/settings";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Siska Construction Inc.",
    template: "%s | Siska Construction Inc.",
  },
  description:
    "Precise renovations and full-service remodeling for apartments and houses across the Czech Republic.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const acceptLanguage = requestHeaders.get("accept-language");
  const initialLocale = resolveLocale(acceptLanguage) as Locale;

  const { resources } = await initTranslations(initialLocale, [...namespaces]);

  return (
    <html lang={initialLocale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-neutral-100 font-sans text-neutral-900 antialiased`}
      >
        <TranslationProvider
          initialLocale={initialLocale}
          namespaces={[...namespaces]}
          resources={resources}
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </TranslationProvider>
      </body>
    </html>
  );
}
