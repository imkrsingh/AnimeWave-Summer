import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import FloatingNavbar from "@/components/FloatingNavbar";
import { themeInitScript } from "@/lib/theme";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "Anime Summer Special 2026 | Discover the hottest anime",
  description:
    "Join us for the ultimate Anime Summer Special 2026. Discover new releases, watch trailers, broadcast schedules, and celebrate the season's hottest anime events.",
  keywords: ["anime", "summer 2026", "anime premieres", "trailers", "otaku"],
  openGraph: {
    title: "AnimeWave — Summer Special 2026",
    description: "Trending summer anime, live countdown, weekly schedule, quizzes & 4K wallpapers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${outfit.variable} ${syne.variable} font-sans antialiased transition-colors duration-500`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          themes={['light', 'dark', 'neon']}
          enableSystem={false}
          disableTransitionOnChange
        >
          <FloatingNavbar />
          <a
            href="#trending"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[1000] focus:px-4 focus:py-2 focus:rounded-full focus:bg-orange-500 focus:text-white focus:font-bold focus:text-sm"
          >
            Skip to content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
