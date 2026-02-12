
import { Recommendation } from './types';

export const BALI_RECOMMENDATIONS: Recommendation[] = [
  {
    title: "Uluwatu Temple",
    location: "Pecatu",
    image: "https://picsum.photos/seed/uluwatu/600/400",
    category: "Temple"
  },
  {
    title: "Tegalalang Rice Terrace",
    location: "Ubud",
    image: "https://picsum.photos/seed/tegalalang/600/400",
    category: "Nature"
  },
  {
    title: "Kelingking Beach",
    location: "Nusa Penida",
    image: "https://picsum.photos/seed/kelingking/600/400",
    category: "Beach"
  },
  {
    title: "Babi Guling Ibu Oka",
    location: "Ubud",
    image: "https://picsum.photos/seed/babiguling/600/400",
    category: "Food"
  }
];

export const QUICK_PROMPTS = [
  "What are the best beaches in Bali?",
  "Recommend a 3-day Ubud itinerary",
  "What should I know about Balinese culture?",
  "Top 5 local foods to try"
];
