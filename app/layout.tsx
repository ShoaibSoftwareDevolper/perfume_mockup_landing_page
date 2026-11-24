import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, DM_Sans } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { assets } from "@/data/assets";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const heroIntro =
  "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('hero-intro')";

const title = "MAISON SÉLUNE — Independent French Fragrance House";
const description =
  "Discover MAISON SÉLUNE, an independent fragrance house exploring the art of scent through considered compositions, crafted objects and modern rituals.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "MAISON SÉLUNE",
    images: [
      {
        url: assets.heroDesktop.src,
        width: assets.heroDesktop.width,
        height: assets.heroDesktop.height,
        alt: "A man resting on desert rock beside three MAISON SÉLUNE fragrances",
      },
    ],
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} ${bodoni.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: heroIntro }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
