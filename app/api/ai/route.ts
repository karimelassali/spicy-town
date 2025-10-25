
import { NextRequest, NextResponse } from "next/server";
import menuInfo from "@/lib/menu.json";

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

function getAIResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("menu") || lowerMessage.includes("food") || lowerMessage.includes("dish")) {
        const menuSummary = menuInfo.categories.map(cat => 
            `**${cat.name.replace(/_/g, ' ')}:** ${cat.items.slice(0, 3).join(', ')}...`
        ).join('\n');
        return `🍽️ Here's a glimpse of our menu:\n\n${menuSummary}\n\nOur price range is ${menuInfo.price_range}. We have many more delicious options. What are you in the mood for?`;
    }

    if (lowerMessage.includes("location") || lowerMessage.includes("address") || lowerMessage.includes("where")) {
        return `📍 We are located at **Corso Giacomo Matteotti, 44, Castel San Giovanni, Italy**.\n\nWe're opening our doors on **September 20, 2025**! We can't wait to welcome you. 🌶️`;
    }

    if (lowerMessage.includes("hours") || lowerMessage.includes("open") || lowerMessage.includes("time")) {
        return `⏰ Our grand opening is on **September 20, 2025**!\n\nOur planned hours are:\n**Monday - Sunday: 11:00 AM - 11:00 PM**\n\nWe look forward to serving you soon!`;
    }

    if (lowerMessage.includes("phone") || lowerMessage.includes("contact") || lowerMessage.includes("call")) {
        return `📞 You can reach us at:\n\n**Phone:** ${restaurantInfo.phone}\n**Instagram:** @${restaurantInfo.instagram}\n**Email:** spicytowncsg@gmail.com\n\nFeel free to call or message us with any questions!`;
    }
    
    if (lowerMessage.includes("halal")) {
        return `✅ Yes, we are **100% Halal certified**.\n\nWe strictly follow Islamic guidelines for all our ingredients and preparation methods. You can dine with us with complete peace of mind. 🙏`;
    }

    if (lowerMessage.includes("owner") || lowerMessage.includes("founder")) {
        return `👨‍🍳 The owner of Spicy Town CSG is **${restaurantInfo.owner}**.\n\nHe is passionate about bringing the authentic and spicy flavors of Pakistani cuisine to Italy!`;
    }
    
    const allItems = menuInfo.categories.flatMap(c => c.items);
    const foundItem = allItems.find(item => lowerMessage.includes(item.toLowerCase()));
    if(foundItem) {
        return `Ah, ${foundItem}! An excellent choice. It's one of our popular items. All our dishes are prepared with fresh ingredients and authentic spices. Would you like to know more about it?`;
    }

    return `👋 Welcome to **Spicy Town CSG**!\n\nWe are opening on **September 20, 2025**, in Castel San Giovanni, Italy.\n\nI can help you with our menu, location, opening hours, and more. What would you like to know? 🌶️`;
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userMessage = body.message;

    if (!userMessage) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const aiResponse = getAIResponse(userMessage);

    return NextResponse.json({ response: aiResponse });

  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
