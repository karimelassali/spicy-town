"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="font-semibold text-foreground hover:text-primary hover:bg-secondary"
    >
      {language === "en" ? "IT" : "EN"}
    </Button>
  )
}
