import HeroSection from "@/components/HeroSection";
import FeaturedAnime from "@/components/FeaturedAnime";
import CharacterSpotlight from "@/components/CharacterSpotlight";
import SummerRadio from "@/components/SummerRadio";
import GallerySection from "@/components/GallerySection";
import TrailerSection from "@/components/TrailerSection";
import NewsletterFooter from "@/components/NewsletterFooter";
import { ThemeToggle } from "@/components/ThemeToggle";

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
