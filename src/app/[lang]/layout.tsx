import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getDictionary } from "./dictionaries";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  return {
    title: dict.head.title,
    description: dict.head.description,
    keywords: dict.head.keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true
      }
    },
    authors: [{ name: "Bayuw" }],
    openGraph: {
      title: dict.head.og.title,
      description: dict.head.og.description,
      url: "https://rifabayuwedding.com",
      siteName: dict.head.og.title,
      images: [
        {
          url: dict.head.og.image,
          alt: dict.head.og.alt,
          width: 600,
          height: 600
        }
      ],
      type: "website"
    }
  };
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
