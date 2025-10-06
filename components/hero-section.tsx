"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import Link from "next/link";

export function HeroSection() {
  const { t } = useLanguage();

  const scrollToMenu = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <img
          src="/hero.jpg  "
          alt="Chef"
          className="w-full h-full object-cover "
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30 lg:to-transparent" />
      </div>

      <div className="relative h-full min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl lg:max-w-4xl xl:max-w-5xl text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold mb-6 lg:mb-8 text-balance leading-tight">
            {t.hero.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 lg:mb-12 text-white/90 text-pretty max-w-3xl leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
            <Link href="https://table-tide.vercel.app/order/spicy-town">
              <Button
                size="lg"
                onClick={scrollToMenu}
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg lg:text-xl px-8 py-6 lg:px-12 lg:py-8 min-w-[200px] font-semibold"
              >
                {t.menu.viewFull}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
