"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/hooks/use-language"
import { Globe } from "lucide-react"

export function LanguageDropdown() {
  const { language, setLanguage } = useLanguage()

  const getLanguageDisplay = () => {
    switch (language) {
      case "en":
        return "🇺🇸 English";
      case "it":
        return "🇮🇹 Italiano";
      case "ur":
        return "🇵🇰 اردو";
      default:
        return "🌐 Language";
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="font-semibold text-foreground hover:text-primary hover:bg-secondary gap-2"
        >
          <Globe className="w-4 h-4" />
          {getLanguageDisplay()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => setLanguage("en")} 
          className={language === "en" ? "bg-secondary" : ""}
        >
          🇺🇸 English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("it")} 
          className={language === "it" ? "bg-secondary" : ""}
        >
          🇮🇹 Italiano
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("ur")} 
          className={language === "ur" ? "bg-secondary" : ""}
        >
          🇵🇰 اردو
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
