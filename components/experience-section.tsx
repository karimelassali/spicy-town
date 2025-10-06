"use client";

import { Wine, Leaf, Heart } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export function ExperienceSection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Leaf,
      title: t.experience.feature1.title,
      description: t.experience.feature1.description,
    },
    {
      icon: Wine,
      title: t.experience.feature2.title,
      description: t.experience.feature2.description,
    },
    {
      icon: Heart,
      title: t.experience.feature3.title,
      description: t.experience.feature3.description,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-orange-50/30 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-orange-100 border border-orange-200">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-sm font-medium text-orange-700">
              Our Commitment
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 mb-6 leading-tight">
            {t.experience.title}
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-6 rounded-full" />
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            {t.experience.subtitle}
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="group relative">
                {/* Subtle Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                {/* Card */}
                <div className="relative h-full p-8 md:p-10 rounded-2xl bg-white border border-slate-200 group-hover:border-orange-200 shadow-sm group-hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  {/* Number Badge */}
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 font-bold text-sm border border-orange-100">
                    {index + 1}
                  </div>

                  {/* Icon Container */}
                  <div className="mb-8">
                    <div className="relative inline-flex">
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-orange-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300" />

                      {/* Icon */}
                      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center transform group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-base">
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative Element */}
                  <div className="mt-8 flex items-center gap-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-orange-200 to-transparent" />
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
