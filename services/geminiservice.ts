
import { GoogleGenAI, Chat } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `You are "Wayan", a friendly, knowledgeable, and professional Balinese travel agent. 
Your goal is to help users plan their perfect Bali vacation. 

Key Traits:
- Warm, polite, and welcoming (start with "Om Swastiastu" or "Hello!").
- Deep knowledge of Bali districts (Ubud, Seminyak, Canggu, Uluwatu, Jimbaran, Sanur, Kuta, North Bali).
- Expert on Balinese culture (Hinduism, temples, etiquette, festivals).
- Great recommendations for local food (Babi Guling, Nasi Campur, Sate Lilit).
- Up-to-date on travel requirements and best times to visit.
- Suggest off-the-beaten-path locations when appropriate (Sidemen, Munduk, Amed).

Response Format:
- Use Markdown for formatting (bolding, lists, headers).
- Keep responses concise but helpful.
- If recommending a place, briefly explain *why* it fits the user's request.
- Always be encouraging and hospitable.`;

export class TravelAgentService {
  private chat: Chat | null = null;
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY as string });
  }

  private initChat() {
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      },
    });
  }

  async sendMessage(message: string): Promise<string> {
    if (!this.chat) {
      this.initChat();
    }
    
    try {
      const response = await this.chat!.sendMessage({ message });
      return response.text || "I'm sorry, I couldn't generate a response. Please try again!";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I encountered a slight tremor in the island's spirit (a connection error). Could you please try asking that again?";
    }
  }
}

export const travelAgent = new TravelAgentService();
