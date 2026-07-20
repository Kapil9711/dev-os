import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { DEV } from "@/constants/dev";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const title = `${DEV.name} — ${DEV.role}`;
const description = DEV.summary;

export const metadata: Metadata = {
  title,
  description,
  keywords: [...DEV.stack, DEV.role, "Software Engineer", "Portfolio"],
  authors: [{ name: DEV.name, url: DEV.website }],
  openGraph: {
    title,
    description,
    type: "website",
    url: DEV.website,
    siteName: `${DEV.name} — Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: "/images/profile.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="h-screen overflow-hidden font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
