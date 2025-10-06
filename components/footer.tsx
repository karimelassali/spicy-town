"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6 text-primary">
              Trattoria
            </h3>
            <p className="text-background/80 leading-relaxed text-pretty">
              {t.hero.subtitle}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              {t.footer.hours}
            </h4>
            <div className="space-y-2 text-background/80">
              <p>{t.footer.weekdays}</p>
              <p>{t.footer.weekend}</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">{t.footer.contact}</h4>
            <div className="space-y-3 text-background/80">
              <p className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                {t.footer.address}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                +39 123 456 7890
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                spicytowncsg@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-background/60">
          <p>© 2025 Trattoria. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
