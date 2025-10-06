"use client";

import { useLanguage } from "@/hooks/use-language";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useRef, useState } from "react";

export function VideoSection() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden">
      {/* Animated spicy particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          >
            <div className="w-2 h-2 bg-orange-400 rounded-full blur-sm" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
            {t.video.title}
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">
            {t.video.subtitle}
          </p>
        </motion.div>

        {/* Video section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative lg:aspect-video rounded-2xl overflow-hidden shadow-2xl group">
            {/* Video element */}
            <video
              ref={videoRef}
              loop
              controls={isPlaying}
              playsInline
              className="w-full h-full object-cover"
              poster="/premuim_logo.png"
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>

            {/* Play button overlay (only visible when not playing) */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center cursor-pointer"
                  onClick={handlePlay}
                >
                  <Play className="w-10 h-10 text-orange-600 ml-1" />
                </motion.div>
              </div>
            )}

            {/* Decorative border */}
            <div className="absolute inset-0 border-4 border-orange-400/20 rounded-2xl pointer-events-none" />
          </div>

          {/* Video description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              {t.video.description}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
