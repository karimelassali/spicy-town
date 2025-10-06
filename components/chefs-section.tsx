"use client";

import { useLanguage } from "@/hooks/use-language";
import { motion } from "framer-motion";
import { Award, Star } from "lucide-react";

export function ChefsSection() {
  const { t } = useLanguage();

  const chefs = [
    {
      name: "Chef Abdulrehman",
      title: t.chefs.chef1.title,
      description: t.chefs.chef1.description,
      image: "/abdul.jpeg",
      specialties: ["Tandoori", "Biryani", "Karahi"],
    },
    {
      name: "Chef Ali",
      title: t.chefs.chef2.title,
      description: t.chefs.chef2.description,
      image: "/ali.jpeg",
      specialties: ["Curry", "Nihari", "Haleem"],
    },
  ];

  return (
    <section
      id="chefs"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Spicy particles background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
            {t.chefs.title}
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">
            {t.chefs.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {chefs.map((chef, index) => (
            <motion.div
              key={chef.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/5]">
                <motion.img
                  src={chef.image}
                  alt={chef.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-serif font-bold mb-1">
                    {chef.name}
                  </h3>
                  <p className="text-orange-300 font-medium">{chef.title}</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  {chef.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {chef.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-1 text-orange-500">
                    <Award className="w-5 h-5" />
                    <span className="text-sm font-medium">Certified Chef</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-orange-400 text-orange-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
