import type { Metadata } from "next";
// Fonts are bundled from npm (Fontsource) so builds don't depend on reaching Google Fonts.
import "@fontsource/cormorant-sc/500.css";
import "@fontsource/cormorant-sc/600.css";
import "@fontsource-variable/source-serif-4/opsz.css";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Anna Kotenko",
    template: "%s · Anna Kotenko",
  },
  description: "Portfolio of Anna Kotenko.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
