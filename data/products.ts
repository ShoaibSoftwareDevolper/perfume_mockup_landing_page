import type { StaticImageData } from "next/image";
import { assets } from "./assets";

export type Product = {
  id: string;
  name: string;
  type: string;
  price: number;
  image: StaticImageData;
  alt: string;
};

export const signatureProducts: Product[] = [
  {
    id: "sable",
    name: "Sable",
    type: "Eau de Parfum",
    price: 195,
    image: assets.sable,
    alt: "Sable eau de parfum in a frosted amber glass bottle with a black cap",
  },
  {
    id: "veil",
    name: "Veil",
    type: "Eau de Parfum",
    price: 185,
    image: assets.veil,
    alt: "Veil eau de parfum in a frosted rose glass bottle with a black cap",
  },
  {
    id: "nocturne",
    name: "Nocturne",
    type: "Eau de Parfum",
    price: 215,
    image: assets.nocturne,
    alt: "Nocturne eau de parfum in a smoked frosted glass bottle with a black cap",
  },
  {
    id: "solstice",
    name: "Solstice",
    type: "Eau de Parfum",
    price: 195,
    image: assets.solstice,
    alt: "Solstice eau de parfum in a frosted golden glass bottle with a black cap",
  },
];

export const objectProducts: Product[] = [
  {
    id: "ambre",
    name: "Ambre",
    type: "Limited Edition",
    price: 260,
    image: assets.ambre,
    alt: "Ambre limited edition fragrance in a pale frosted glass bottle with a black cap",
  },
  {
    id: "atomizer",
    name: "The Atomizer",
    type: "Travel Fragrance",
    price: 95,
    image: assets.atomizer,
    alt: "Slender frosted glass travel fragrance with a black cap",
  },
  {
    id: "candle",
    name: "The Candle",
    type: "Scented Object",
    price: 85,
    image: assets.candle,
    alt: "Lit MAISON SÉLUNE candle in a stone vessel beside its dark lid",
  },
  {
    id: "discovery-set",
    name: "The Discovery Set",
    type: "Four Fragrances",
    price: 65,
    image: assets.discoverySet,
    alt: "Two men seated on stone, each holding a MAISON SÉLUNE fragrance from the discovery set",
  },
];

export const allProducts = [...signatureProducts, ...objectProducts];

export const formatPrice = (value: number) => `€ ${value}`;
