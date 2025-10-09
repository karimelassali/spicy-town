"use client";

import { useLanguage } from "@/hooks/use-language";

import Image from "next/image";

export function ChefSection() {
  const { t } = useLanguage();

  return (
    <section id="chef" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
              {t.chef.title}
            </h2>
            <p className="text-xl text-primary font-semibold mb-6">
              {t.chef.subtitle}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              {t.chef.description}
            </p>
          </div>
          <div className="order-1 md:order-2">
            <div className="aspect-[4/5] overflow-hidden rounded-lg">
              <Image
                src="/hero.jpeg"
                alt="Chef Marco"
                width={500}
                height={625}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
