"use client";

import { useState, useEffect } from "react";
import { SplashScreen } from "@/components/splash-screen";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { DishesSection } from "@/components/dishes-section";

import { ChefsSection } from "@/components/chefs-section";
import { VideoSection } from "@/components/video-section";
import { GallerySection } from "@/components/gallery-section";
import { ExperienceSection } from "@/components/experience-section";
import { InfoSection } from "@/components/info-section";
import BookTableSection from "@/components/book-table-section";
import { Footer } from "@/components/footer";
import { MapSection } from "@/components/map-section";
import AIAssistant from "@/components/ai-assistant";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <main className="min-h-screen">
        <Navbar />
        <HeroSection />
        <DishesSection />
        <VideoSection />
        {/*<MenuSection />*/}
        <ChefsSection />
        <GallerySection />
        <ExperienceSection />
        <InfoSection />
        <BookTableSection />
        <MapSection />
        <Footer />
        <AIAssistant />
      </main>
    </>
  );
}
