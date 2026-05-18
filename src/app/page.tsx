import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import { ThemeToggle } from "@/components/ThemeToggle";

// Dynamically load below-the-fold sections for maximum speed and optimization
const FeaturedAnime = dynamic(() => import("@/components/FeaturedAnime"), { ssr: true });
const CharacterSpotlight = dynamic(() => import("@/components/CharacterSpotlight"), { ssr: true });
const SummerRadio = dynamic(() => import("@/components/SummerRadio"), { ssr: true });
const GallerySection = dynamic(() => import("@/components/GallerySection"), { ssr: true });
const TrailerSection = dynamic(() => import("@/components/TrailerSection"), { ssr: true });
const NewsletterFooter = dynamic(() => import("@/components/NewsletterFooter"), { ssr: true });

export default function Home() {
  return (
    <main className="min-h-screen bg-sky-50 dark:bg-slate-950 neon:bg-[#090014] text-slate-900 dark:text-slate-200 neon:text-cyan-50 flex flex-col transition-colors duration-500">
      <ThemeToggle />
      <HeroSection />
      <FeaturedAnime />
      <CharacterSpotlight />
      <SummerRadio />
      <GallerySection />
      <TrailerSection />
      <NewsletterFooter />
    </main>
  );
}
