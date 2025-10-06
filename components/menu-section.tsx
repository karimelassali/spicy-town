"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ChefHat, Flame, Leaf } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";

export function MenuSection() {
  const { language } = useLanguage();
  const t = translations[language].menu;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const menuCategories = [
    {
      title: t.antipasto,
      icon: ChefHat,
      items: ["Samosa", "Pakora", "Onion Rings", "Chicken Pakora"],
      color: "from-orange-500 to-red-500",
    },
    {
      title: t.grigliata,
      icon: Flame,
      items: ["Chicken Tikka", "Tandoori Chicken", "Seekh Kebab", "Mix Grill"],
      color: "from-red-500 to-pink-500",
    },
    {
      title: t.piatti_carne,
      icon: ChefHat,
      items: ["Butter Chicken", "Lamb Curry", "Korma", "Biryani"],
      color: "from-orange-600 to-red-600",
    },
    {
      title: t.piatti_veg,
      icon: Leaf,
      items: ["Palak Paneer", "Dal Makhani", "Chana Masala", "Aloo Gobhi"],
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Menu Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-200 hover:border-orange-400 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mb-4`}
              >
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item, i) => (
                  <li key={i} className="text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
