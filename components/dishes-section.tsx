"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";

export function DishesSection() {
  const { t } = useLanguage();

  const dishes = [
    {
      name: t.dishes.dish1.name,
      description: t.dishes.dish1.description,
      image:
        "https://www.seriouseats.com/thmb/AKv7r-Xt2anoVvsn0WpLqUehNzU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/chicken-tikka-masala-for-the-grill-recipe-hero-2_1-cb493f49e30140efbffec162d5f2d1d7.JPG",
    },
    {
      name: t.dishes.dish2.name,
      description: t.dishes.dish2.description,
      image: "limb_biryani.jpeg",
    },
    {
      name: t.dishes.dish3.name,
      description: t.dishes.dish3.description,
      image:
        "https://www.chompslurrpburp.com/wp-content/uploads/2022/11/butter-chicken-3-819x1024.jpg",
    },
  ];

  return (
    <section id="dishes" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
            {t.dishes.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.dishes.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <Card
              key={index}
              className="overflow-hidden border-border hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={dish.image || "/placeholder.svg"}
                  alt={dish.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                  {dish.name}
                </h3>
                <p className="text-muted-foreground text-pretty">
                  {dish.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
