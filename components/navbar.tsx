"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { LanguageDropdown } from "@/components/language-dropdown";
import { useLanguage } from "@/hooks/use-language";
import Image from "next/image";
import { motion } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.menu, href: "#dishes" },
    { label: t.nav.about, href: "#chefs" },
    { label: t.nav.gallery, href: "#gallery" },
    { label: t.nav.contact, href: "#reservation" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <img
              src="/premuim_logo.png"
              alt="Spicy Town Logo"
              width={50}
              height={50}
              className="w-20 h-20 rounded-full object-contain"
            />
            {/*<span className="text-xl font-serif font-bold text-foreground hidden sm:block">
              Spicy Town
            </span>*/}
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
            <LanguageDropdown />
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              {t.nav.reservation}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageDropdown />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-border"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full">
                {t.nav.reservation}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
