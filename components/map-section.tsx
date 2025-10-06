"use client";

import { motion } from "framer-motion";

export function MapSection() {
  const lat = 45.059085857810146;
  const lon = 9.436758026984691;
  const zoom = 17; // Adjust zoom level (1–19)
  const bbox_rad = 0.002;

  const min_lon = lon - bbox_rad;
  const min_lat = lat - bbox_rad / 2;
  const max_lon = lon + bbox_rad;
  const max_lat = lat + bbox_rad / 2;

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${min_lon},${min_lat},${max_lon},${max_lat}&layer=mapnik&marker=${lat},${lon}&zoom=${zoom}`;

  return (
    <section id="location" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Find Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are located in the heart of Castel San Giovanni.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20"
        >
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            frameBorder="0"
            className="rounded-2xl"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
