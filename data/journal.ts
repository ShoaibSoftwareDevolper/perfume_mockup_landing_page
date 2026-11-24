import type { StaticImageData } from "next/image";
import { assets } from "./assets";

export type Story = {
  category: string;
  title: string;
  description?: string;
  image: StaticImageData;
  alt: string;
};

export const journalCategories = ["Journal", "Craft", "Fragrance", "Stories"];

export const featuredStory: Story = {
  category: "Heritage",
  title: "Inside the World of MAISON SÉLUNE",
  description:
    "A closer look at the objects, places and rituals behind our fragrance house.",
  image: assets.journalFeature,
  alt: "A man in a brown linen shirt leaning on sunlit stone, holding a MAISON SÉLUNE bottle",
};

export const stories: Story[] = [
  {
    category: "Craft",
    title: "The Art of Making a Fragrance",
    image: assets.atelier,
    alt: "A man in a linen shirt at a stone table beside a frosted MAISON SÉLUNE bottle",
  },
  {
    category: "Rituals",
    title: "Scent as a Daily Ritual",
    image: assets.ritual,
    alt: "A man in a linen shirt spraying MAISON SÉLUNE onto his wrist by a window",
  },
  {
    category: "Ingredients",
    title: "A Study in Raw Materials",
    image: assets.ingredients,
    alt: "A frosted MAISON SÉLUNE bottle beside driftwood and amber resin on stone",
  },
];
