import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import FloatingNavbar from "@/components/FloatingNavbar";
import CursorFollower from "@/components/CursorFollower";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Anime Summer Special 2026 | Discover the hottest anime",
  description: "Join us for the ultimate Anime Summer Special 2026. Discover new releases, watch trailers, and celebrate the season's hottest anime events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${outfit.variable} font-sans antialiased transition-colors duration-500`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          themes={['light', 'dark', 'neon']}
          enableSystem={false}
          disableTransitionOnChange
        >
          <FloatingNavbar />
          <CursorFollower />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
