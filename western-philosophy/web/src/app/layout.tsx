import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,400&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
