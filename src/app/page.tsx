import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import BackToTop from "@/components/BackToTop";
import AmbientBackground from "@/components/AmbientBackground";

// Dynamically load below-the-fold sections for maximum speed and optimization
const FeaturedAnime = dynamic(() => import("@/components/FeaturedAnime"), { ssr: true });
const LegacyHub = dynamic(() => import("@/components/LegacyHub"), { ssr: true });
const CharacterSpotlight = dynamic(() => import("@/components/CharacterSpotlight"), { ssr: true });
const SummerChronicles = dynamic(() => import("@/components/SummerChronicles"), { ssr: true });
const SummerRadio = dynamic(() => import("@/components/SummerRadio"), { ssr: true });
const NostalgiaSoundboard = dynamic(() => import("@/components/NostalgiaSoundboard"), { ssr: true });
const SummerQuiz = dynamic(() => import("@/components/SummerQuiz"), { ssr: true });
const GallerySection = dynamic(() => import("@/components/GallerySection"), { ssr: true });
const TrailerSection = dynamic(() => import("@/components/TrailerSection"), { ssr: true });
const NewsletterFooter = dynamic(() => import("@/components/NewsletterFooter"), { ssr: true });
const StatsMarquee = dynamic(() => import("@/components/StatsMarquee"), { ssr: true });
const SummerSchedule = dynamic(() => import("@/components/SummerSchedule"), { ssr: true });
const LiveNowBanner = dynamic(() => import("@/components/LiveNowBanner"), { ssr: true });
const FanHypeWall = dynamic(() => import("@/components/FanHypeWall"), { ssr: true });
const SummerMomentsBento = dynamic(() => import("@/components/SummerMomentsBento"), { ssr: true });
const SeasonPassPromo = dynamic(() => import("@/components/SeasonPassPromo"), { ssr: true });
const TonightPicks = dynamic(() => import("@/components/TonightPicks"), { ssr: true });
const StudioAllies = dynamic(() => import("@/components/StudioAllies"), { ssr: true });
const MerchDrop = dynamic(() => import("@/components/MerchDrop"), { ssr: true });
const VoiceLineSpotlight = dynamic(() => import("@/components/VoiceLineSpotlight"), { ssr: true });
const EpisodeAlertToast = dynamic(() => import("@/components/EpisodeAlertToast"), { ssr: true });
const OpeningThemesCarousel = dynamic(() => import("@/components/OpeningThemesCarousel"), { ssr: true });
const AnimeReviewWall = dynamic(() => import("@/components/AnimeReviewWall"), { ssr: true });
const WatchlistBuilder = dynamic(() => import("@/components/WatchlistBuilder"), { ssr: true });
const EpisodeCalendar = dynamic(() => import("@/components/EpisodeCalendar"), { ssr: true });
const ArtGallerySpotlight = dynamic(() => import("@/components/ArtGallerySpotlight"), { ssr: true });


export default function Home() {
  return (
    <main className="relative min-h-screen bg-sky-50 dark:bg-slate-950 neon:bg-[#090014] text-slate-900 dark:text-slate-200 neon:text-cyan-50 flex flex-col transition-colors duration-500">
      <AmbientBackground />
      <div className="relative z-[1] flex flex-col">
      <HeroSection />
      <div className="wave-divider -mt-px relative z-10" aria-hidden />
      <StatsMarquee />
      <LiveNowBanner />
      <FeaturedAnime />
      <FanHypeWall />
      <TonightPicks />
      <SummerSchedule />
      <StudioAllies />
      <OpeningThemesCarousel />
      <EpisodeCalendar />
      <WatchlistBuilder />
      <LegacyHub />
      <CharacterSpotlight />
      <SummerMomentsBento />
      <ArtGallerySpotlight />
      <SeasonPassPromo />
      <VoiceLineSpotlight />
      <SummerChronicles />
      <AnimeReviewWall />
      <SummerRadio />
      <NostalgiaSoundboard />
      <SummerQuiz />
      <GallerySection />
      <MerchDrop />
      <TrailerSection />
      <NewsletterFooter />
      <EpisodeAlertToast />
      <BackToTop />
      </div>
    </main>
  );
}
