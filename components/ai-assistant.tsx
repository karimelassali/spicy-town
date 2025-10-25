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
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestedActions, setShowSuggestedActions] = useState(true);

  const highlightedWords = [
    "hours", "opening", "time", "schedule", "when", "available",
    "location", "address", "where", "place", "city", "castel san giovanni",
    "owner", "abdulrehman", "gujjar",
    "phone", "call", "contact", "+39", "3510505298",
    "instagram", "@spicytown_csg",
    "halal", "certified",
    "menu", "food", "cuisine", "grilled", "spicy", "authentic",
    "september", "2025",
  ];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const highlightWords = (text: string) => {
    if (!text) return text;
    let highlightedText = text;
    const sortedWords = [...highlightedWords].sort((a, b) => b.length - a.length);

    sortedWords.forEach((word) => {
      const regex = new RegExp(`\b${word.replace(/[.*+?^${}()|[\\]/g, "\\$&")}\b`, "gi");
      highlightedText = highlightedText.replace(
        regex,
        (match) => `<span class="text-orange-500 font-semibold">${match}</span>`
      );
    });

    return highlightedText;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const getSuggestedActions = () => {
    const lastUserMessage = messages.filter((m) => m.type === "user").slice(-1)[0];

    if (!lastUserMessage) {
      return [
        { icon: "🍽️", text: "View Menu", value: "Show me the menu" },
        { icon: "📍", text: "Location", value: "Where are you located?" },
        { icon: "📞", text: "Contact", value: "How can I contact you?" },
        { icon: "🕌", text: "Halal Info", value: "Is your food Halal?" },
      ];
    }

    const lowerMessage = lastUserMessage.content.toLowerCase();

    if (lowerMessage.includes("menu") || lowerMessage.includes("food")) {
      return [
        { icon: "🔥", text: "Spicy Dishes", value: "What are your spiciest dishes?" },
        { icon: "🥗", text: "Vegetarian", value: "What vegetarian options do you have?" },
        { icon: "🍗", text: "Grilled Items", value: "Show me grilled specialties" },
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

  const generateAIResponse = async (userMessage: string) => {
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`API error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.response;

    } catch (error) {
      console.error("AI Response Error:", error);
      return "😔 I'm having trouble connecting right now. Please try again in a moment. If the problem persists, you can always call us at +39 3510505298.";
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

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

    await new Promise((resolve) => setTimeout(resolve, 800));

    const aiResponse = await generateAIResponse(userMessage);

    const botMsg: Message = {
      id: Date.now() + 1,
      type: "bot",
      content: aiResponse,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMsg]);
    setShowSuggestedActions(true);
    setIsTyping(false);
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
    setTimeout(() => {
      const inputElement = document.querySelector('input[aria-label="Type your message"]') as HTMLInputElement;
      if(inputElement) {
        inputElement.focus();
      }
      handleSendMessage();
    }, 100);
  };

  return (
    <>
      <motion.div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999]"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
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
            <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 p-3 sm:p-4 text-white flex-shrink-0 relative overflow-hidden">
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

            <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gradient-to-b from-gray-50 to-white relative min-h-0 scroll-smooth">
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
                                      : part
                                  )
                                  .join("")
                              )
                            : message.content
                                .split("**")
                                .map((part, index) =>
                                  index % 2 === 1
                                    ? `<strong>${part}</strong>`
                                    : part
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

            <div className="p-3 sm:p-4 bg-white border-t border-gray-200 relative z-10 flex-shrink-0 shadow-lg">
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
                    disabled={isTyping}
                    aria-label="Type your message"
                    className="w-full px-4 py-2.5 text-sm sm:text-base border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>
                <motion.button
                  onClick={handleSendMessage}
                  disabled={isTyping || !inputValue.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>

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