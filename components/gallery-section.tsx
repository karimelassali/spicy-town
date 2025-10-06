"use client";

import { useLanguage } from "@/hooks/use-language";

export function GallerySection() {
  const { t } = useLanguage();

  const images = [
    "/1.jpeg",
    "/2.jpeg",
    "/3.jpeg",
    "/4.jpeg",
    "/7.jpeg",
    "/6.jpeg",
  ];

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
            {t.gallery.title}
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            {t.gallery.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg hover:shadow-lg transition-shadow"
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Restaurant ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                style={{
                  filter: "brightness(1.05) contrast(1.1) saturate(0.85)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
