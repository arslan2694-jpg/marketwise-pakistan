import type { Metadata } from "next";
import { Source_Serif_4, Inter } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Western Philosophy — A Study Companion",
    template: "%s · Western Philosophy",
  },
  description:
    "A university-level self-study platform built from Bertrand Russell's A History of Western Philosophy — chapter by chapter, philosopher by philosopher, argument by argument.",
};

const THEME_INIT = `
(function () {
  try {
    var stored = localStorage.getItem("wp-theme");
    var theme = stored === "light" || stored === "dark" ? stored : null;
    if (theme) document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
