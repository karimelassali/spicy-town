"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, ChefHat, Phone, MapPin } from "lucide-react";
import Image from "next/image";

interface Message {
  id: number;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const [showSuggestedActions, setShowSuggestedActions] = useState(true);

  const developerInstructions = `
    IMPORTANT DEVELOPER INSTRUCTIONS:
    - Always use the correct Instagram account: @spicytown_csg
    - Always use the correct phone number: +39 3510505298
    - The restaurant owner is: Abdulrehman Gujjar
    - Restaurant is located in: Castel San Giovanni, Italy
    - Opening date: September 20, 2025
    - Always mention that the restaurant is Halal certified
    - Emphasize the spicy and authentic Pakistani cuisine
    - Be friendly, professional, and informative
    - Keep responses concise but helpful (40-60 words max)
    - Always provide accurate information about the restaurant
    - Detect user frustration and offer human assistance
    - Use emojis naturally but sparingly (1-2 per message)
  `;

  const restaurantInfo = {
    name: "Spicy Town CSG",
    cuisine: "Authentic Pakistani Cuisine",
    specialties:
      "Traditional spicy dishes, grilled specialties, authentic flavors, and fresh ingredients",
    location: "Castel San Giovanni, Italy",
    phone: "+39 3510505298",
    instagram: "@spicytown_csg",
    owner: "Abdulrehman Gujjar",
    opening: "Opening Soon - September 20, 2025",
    halal: "Halal Certified",
    features: "Premium Quality, Spicy Excellence, Authentic Flavors",
  };

  const menuInfo = {
    categories: [
      "ANTIPASTO",
      "GRIGLIATA",
      "PIATTI_CARNE",
      "PIATTI_VEGETARIANI",
    ],
    antipasto: [
      "Onion Rings",
      "Samosa",
      "Samosa Chat",
      "Paneer Pakora",
      "Mix Veg Pakora",
      "Chicken Pakora",
      "Gamberi Pakora",
      "Fish Pakora",
      "Antipasto Misto",
      "Samosa di Carne",
    ],
    grigliata: [
      "Chicken Tikka",
      "Tandoori Chicken",
      "Chicken Malai Tikka",
      "Chicken Seekh Kebab",
      "Lamb Seekh Kebab",
      "Lamb Tikka",
      "Prawn Tikka",
      "Mix Grill",
      "Paneer Tikka",
      "Mix Veg Platter",
      "Veg Tikka",
      "Beef Tikka",
    ],
    piatti_carne: [
      "Mutton Chops",
      "Badami Korma",
      "Chicken Tikka Masala",
      "Butter Chicken",
      "Kofta Curry",
      "Lamb Curry",
      "Qeema Matar",
    ],
    piatti_vegetariani: [
      "Palak Paneer",
      "Chana Masala",
      "Aloo Matar",
      "Dal Makhani",
      "Aloo Tikki",
      "Aloo Gobhi",
      "Daal Tarka",
    ],
    price_range: "€4.00 - €22.00",
    highlights: [
      "Grilled specialties",
      "Authentic flavors",
      "Vegetarian options",
      "Fresh ingredients",
      "Traditional recipes",
    ],
  };

  // Enhanced context-aware suggested actions
  const getSuggestedActions = () => {
    const lastUserMessage = messages
      .filter((m) => m.type === "user")
      .slice(-1)[0];

    if (!lastUserMessage) {
      return [
        { icon: "🍽️", text: "View Menu", value: "Show me the menu" },
        { icon: "📍", text: "Location", value: "Where are you located?" },
        { icon: "📞", text: "Contact", value: "How can I contact you?" },
        {
          icon: "🕌",
          text: "Halal Info",
          value: "Tell me about halal certification",
        },
      ];
    }

    const lowerMessage = lastUserMessage.content.toLowerCase();

    if (lowerMessage.includes("menu") || lowerMessage.includes("food")) {
      return [
        {
          icon: "🔥",
          text: "Spicy Dishes",
          value: "What are your spiciest dishes?",
        },
        {
          icon: "🥗",
          text: "Vegetarian",
          value: "What vegetarian options do you have?",
        },
        {
          icon: "🍗",
          text: "Grilled Items",
          value: "Show me grilled specialties",
        },
        { icon: "💰", text: "Prices", value: "What is the price range?" },
      ];
    }

    if (lowerMessage.includes("location") || lowerMessage.includes("address")) {
      return [
        { icon: "🚗", text: "Directions", value: "How do I get there?" },
        { icon: "🅿️", text: "Parking", value: "Is there parking available?" },
        { icon: "📞", text: "Call Us", value: "What is your phone number?" },
        { icon: "⏰", text: "Hours", value: "When are you open?" },
      ];
    }

    return [
      { icon: "🍽️", text: "Menu", value: "Show me the menu" },
      { icon: "📞", text: "Contact", value: "Contact information" },
      { icon: "📍", text: "Location", value: "Where are you located?" },
      { icon: "⏰", text: "Hours", value: "Opening hours" },
    ];
  };

  // Sentiment analysis
  const analyzeSentiment = (text: string) => {
    const negativeWords = [
      "bad",
      "terrible",
      "poor",
      "worst",
      "disappointed",
      "angry",
      "frustrated",
      "slow",
      "wrong",
    ];
    const positiveWords = [
      "good",
      "great",
      "excellent",
      "amazing",
      "love",
      "perfect",
      "awesome",
      "fantastic",
    ];

    const lowerText = text.toLowerCase();
    const hasNegative = negativeWords.some((word) => lowerText.includes(word));
    const hasPositive = positiveWords.some((word) => lowerText.includes(word));

    if (hasNegative && !hasPositive) return "negative";
    if (hasPositive && !hasNegative) return "positive";
    return "neutral";
  };

  // Enhanced word highlighting
  const highlightedWords = [
    "hours",
    "opening",
    "time",
    "schedule",
    "when",
    "available",
    "location",
    "address",
    "where",
    "place",
    "city",
    "castel san giovanni",
    "owner",
    "abdulrehman",
    "gujjar",
    "phone",
    "call",
    "contact",
    "+39",
    "3510505298",
    "instagram",
    "@spicytown_csg",
    "halal",
    "certified",
    "menu",
    "food",
    "cuisine",
    "grilled",
    "spicy",
    "authentic",
    "september",
    "2025",
  ];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const highlightWords = (text: string) => {
    if (!text) return text;
    let highlightedText = text;
    const sortedWords = [...highlightedWords].sort(
      (a, b) => b.length - a.length,
    );

    sortedWords.forEach((word) => {
      const regex = new RegExp(
        `\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
        "gi",
      );
      highlightedText = highlightedText.replace(
        regex,
        (match) =>
          `<span class="text-orange-500 font-semibold">${match}</span>`,
      );
    });

    return highlightedText;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced welcome message with interactive cards
  useEffect(() => {
    setMessages([
      {
        id: 1,
        type: "bot",
        content:
          "👋 **Benvenuto a Spicy Town CSG!** 🌶️\n\n🍽️ Authentic Pakistani Cuisine | ✅ 100% Halal\n📅 Opening September 20, 2025\n\n💬 **What would you like to know?**",
        timestamp: new Date(),
      } as Message,
    ]);
  }, []);

  const generateAIResponse = async (userMessage: string) => {
    const sentiment = analyzeSentiment(userMessage);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      // Add context to conversation
      const recentContext = conversationContext.slice(-3).join(" | ");

      const prompt = `You are an AI assistant for Spicy Town CSG restaurant. ${developerInstructions}

Restaurant Information:
- Name: ${restaurantInfo.name}
- Cuisine: ${restaurantInfo.cuisine}
- Specialties: ${restaurantInfo.specialties}
- Location: ${restaurantInfo.location}
- Phone: ${restaurantInfo.phone}
- Instagram: ${restaurantInfo.instagram}
- Owner: ${restaurantInfo.owner}
- Opening: ${restaurantInfo.opening}
- Halal: ${restaurantInfo.halal}
- Features: ${restaurantInfo.features}

Menu Information:
- Categories: ${menuInfo.categories.join(", ")}
- Antipasto: ${menuInfo.antipasto.join(", ")}
- Grigliata (Tandoori): ${menuInfo.grigliata.join(", ")}
- Piatti Carne (Meat Dishes): ${menuInfo.piatti_carne.join(", ")}
- Piatti Vegetariani (Vegetarian): ${menuInfo.piatti_vegetariani.join(", ")}
- Price Range: ${menuInfo.price_range}
- Highlights: ${menuInfo.highlights.join(", ")}

Recent Conversation Context: ${recentContext}
User Sentiment: ${sentiment}

User Question: ${userMessage}
CRITICAL INSTRUCTIONS:
- Maximum 40-60 words
- Use 1-2 relevant emojis only
- Focus on answering the specific question
- If sentiment is negative, offer empathetic response and human contact
- Structure response with line breaks for readability`;

      const response = await fetch(
        `https://text.pollinations.ai/${encodeURIComponent(prompt)}`,
        {
          method: "GET",
          headers: {
            Accept: "text/plain",
          },
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const aiResponse = await response.text();

      // Update conversation context
      setConversationContext((prev) =>
        [...prev, userMessage, aiResponse].slice(-6),
      );

      if (aiResponse.length < 10 || aiResponse.length > 2000) {
        throw new Error("Response too short or too long");
      }

      return aiResponse;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return "⏱️ I'm taking longer than usual. Please try again!";
      }
      console.error("AI Response Error:", error);
      return getFallbackResponse(userMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getFallbackResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    const sentiment = analyzeSentiment(userMessage);

    if (sentiment === "negative") {
      return "😔 I'm sorry you're experiencing issues. Please contact us directly at 📞 +39 3510505298 or email spicytowncsg@gmail.com for immediate assistance. We're here to help!";
    }

    if (
      lowerMessage.includes("menu") ||
      lowerMessage.includes("food") ||
      lowerMessage.includes("dish")
    ) {
      return "🍽️ **Our Menu:**\n\n🥟 **Antipasto:** Samosa, Pakora (€4-8)\n🔥 **Grigliata:** Tikka, Tandoori, Kebab (€10-18)\n🍖 **Carne:** Butter Chicken, Korma, Curry (€12-22)\n🥗 **Vegetariani:** Paneer, Dal, Aloo (€8-14)\n\n✅ All 100% Halal!";
    } else if (
      lowerMessage.includes("location") ||
      lowerMessage.includes("address") ||
      lowerMessage.includes("where")
    ) {
      return "📍 **Location:**\nCorso Giacomo Matteotti, 44\nCastel San Giovanni, Italy\n\n🗓️ Opening September 20, 2025!\n📞 Call for directions: +39 3510505298";
    } else if (
      lowerMessage.includes("hours") ||
      lowerMessage.includes("open") ||
      lowerMessage.includes("time")
    ) {
      return "⏰ **Opening Hours:**\n\n📅 Grand Opening: September 20, 2025\n\n🕐 Monday-Sunday: 11:00 AM - 11:00 PM\n\nCan't wait to serve you! 🌶️";
    } else if (
      lowerMessage.includes("halal") ||
      lowerMessage.includes("certified")
    ) {
      return "🕌 **100% Halal Certified** ✅\n\n✓ Strict Islamic guidelines\n✓ Certified ingredients\n✓ No cross-contamination\n✓ Trusted by Muslim community\n\nEnjoy authentic Pakistani cuisine with peace of mind! 🙏";
    } else if (
      lowerMessage.includes("phone") ||
      lowerMessage.includes("call") ||
      lowerMessage.includes("contact")
    ) {
      return "📞 **Contact Us:**\n\n☎️ Phone: +39 3510505298\n📧 Email: spicytowncsg@gmail.com\n📱 Instagram: @spicytown_csg\n💬 WhatsApp: +39 3510505298\n\nWe're here to help! 😊";
    } else if (
      lowerMessage.includes("instagram") ||
      lowerMessage.includes("social")
    ) {
      return "📱 **Follow Us:**\n\n📷 Instagram: @spicytown_csg\n🎵 TikTok: @spicytown_csg\n💬 WhatsApp: +39 3510505298\n\nStay updated with our latest dishes and offers! 🌶️";
    } else if (
      lowerMessage.includes("owner") ||
      lowerMessage.includes("who owns") ||
      lowerMessage.includes("founder")
    ) {
      return "👨‍🍳 **Owner:** Abdulrehman Gujjar\n\nDedicated to bringing authentic Pakistani flavors to Castel San Giovanni! With passion for spicy excellence and traditional recipes. 🌶️";
    } else {
      return "👋 **Spicy Town CSG** - Opening September 20, 2025!\n\n🌶️ Authentic Pakistani Cuisine\n📍 Castel San Giovanni, Italy\n✅ 100% Halal\n\n💬 Ask me about: Menu | Location | Hours | Contact";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setShowSuggestedActions(false);

    const userMsg: Message = {
      id: Date.now(),
      type: "user",
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    setIsTyping(true);

    // Simulate more natural typing delay based on response length
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const aiResponse = await generateAIResponse(userMessage);

      const botMsg: Message = {
        id: Date.now() + 1,
        type: "bot",
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setShowSuggestedActions(true);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMsg: Message = {
        id: Date.now() + 1,
        type: "bot",
        content:
          "😔 I apologize for the inconvenience. Please contact us at 📞 +39 3510505298 for immediate assistance!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSuggestedAction = (value: string) => {
    setInputValue(value);
    // Auto-send after a short delay for better UX
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <>
      {/* Floating AI Button with pulse animation */}
      <motion.div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999]"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {/* Pulse ring effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.button
          onClick={toggleChat}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full shadow-2xl border-4 border-white/20 flex items-center justify-center text-white hover:from-amber-700 hover:to-orange-700 transition-all duration-300"
          aria-label="Open AI Assistant"
          aria-expanded={isOpen}
        >
          <Image
            src="/premuim_logo.png"
            alt="Spicy Town CSG AI"
            width={32}
            height={32}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
          />
          {/* Notification badge */}
          {!isOpen && messages.length > 1 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold"
            >
              <Sparkles className="w-3 h-3" />
            </motion.div>
          )}
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="fixed bg-white rounded-2xl shadow-2xl border border-gray-200 z-[9998] overflow-hidden
                     w-[calc(100vw-32px)] h-[calc(100vh-120px)] max-w-sm sm:max-w-md md:max-w-lg
                     bottom-20 sm:bottom-24 right-4 sm:right-6 md:right-6
                     max-h-[600px] sm:max-h-[550px] flex flex-col"
            role="dialog"
            aria-labelledby="chat-title"
            aria-describedby="chat-description"
          >
            {/* Enhanced Chat Header with gradient */}
            <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 p-3 sm:p-4 text-white flex-shrink-0 relative overflow-hidden">
              {/* Animated background pattern */}
              <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{
                  backgroundImage:
                    "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="flex items-center justify-between mb-2 sm:mb-3 relative z-10">
                <h3
                  id="chat-title"
                  className="text-base sm:text-lg font-bold flex items-center gap-2"
                >
                  <div className="relative">
                    <Image
                      src="/premuim_logo.png"
                      alt="Logo"
                      width={24}
                      height={24}
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full ring-2 ring-white/50"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <span className="hidden sm:inline">Spicy Town Assistant</span>
                  <span className="sm:hidden">AI Assistant</span>
                  <ChefHat className="w-4 h-4 ml-1" />
                </h3>
                <button
                  onClick={toggleChat}
                  className="text-white/90 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition-all duration-200"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              <p
                id="chat-description"
                className="text-xs sm:text-sm text-white/90 flex items-center gap-2 relative z-10"
              >
                <Sparkles className="w-3 h-3 animate-pulse" />
                Ask anything about our restaurant!
              </p>
            </div>

            {/* Messages Area with improved background */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gradient-to-b from-gray-50 to-white relative min-h-0 scroll-smooth">
              {/* Subtle logo watermark */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                <Image
                  src="/premuim_logo.png"
                  alt="Background Logo"
                  width={160}
                  height={160}
                  className="w-40 h-40 sm:w-48 sm:h-48 object-contain"
                />
              </div>

              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} mb-3 relative z-10`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      message.type === "user"
                        ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg"
                        : "bg-white text-gray-800 border border-gray-200 shadow-md"
                    } transition-all duration-200 hover:shadow-xl`}
                  >
                    <div
                      className="text-xs sm:text-sm leading-relaxed whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html:
                          message.type === "bot"
                            ? highlightWords(
                                message.content
                                  .split("**")
                                  .map((part, index) =>
                                    index % 2 === 1
                                      ? `<strong>${part}</strong>`
                                      : part,
                                  )
                                  .join(""),
                              )
                            : message.content
                                .split("**")
                                .map((part, index) =>
                                  index % 2 === 1
                                    ? `<strong>${part}</strong>`
                                    : part,
                                )
                                .join(""),
                      }}
                    />
                    <p
                      className={`text-[10px] sm:text-xs mt-1.5 ${
                        message.type === "user"
                          ? "text-amber-100"
                          : "text-gray-500"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Enhanced typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start mb-3 relative z-10"
                >
                  <div className="bg-white text-gray-800 border border-gray-200 p-3 rounded-2xl shadow-md">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1.5">
                        <motion.div
                          animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0,
                          }}
                          className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0.2,
                          }}
                          className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0.4,
                          }}
                          className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                        />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600 font-medium">
                        AI is preparing response...
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Input Area */}
            <div className="p-3 sm:p-4 bg-white border-t border-gray-200 relative z-10 flex-shrink-0 shadow-lg">
              {/* Context-aware suggested actions */}
              {showSuggestedActions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-3 flex flex-wrap gap-2"
                >
                  {getSuggestedActions().map((action, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleSuggestedAction(action.value)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 text-xs bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 rounded-full hover:from-amber-100 hover:to-orange-100 transition-all duration-200 border border-amber-200 shadow-sm font-medium flex items-center gap-1.5"
                    >
                      <span>{action.icon}</span>
                      <span>{action.text}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    aria-label="Type your message"
                    className="w-full px-4 py-2.5 text-sm sm:text-base border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>
                <motion.button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Quick contact buttons */}
              <div className="mt-3 flex gap-2 justify-center">
                <motion.a
                  href="tel:+393510505298"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-green-50 text-green-700 rounded-full hover:bg-green-100 transition-colors duration-200 border border-green-200"
                >
                  <Phone className="w-3 h-3" />
                  <span className="hidden sm:inline">Call Us</span>
                </motion.a>
                <motion.a
                  href="https://www.google.com/maps/search/?api=1&query=Corso+Giacomo+Matteotti,+44,+Castel+San+Giovanni"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors duration-200 border border-blue-200"
                >
                  <MapPin className="w-3 h-3" />
                  <span className="hidden sm:inline">Directions</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
