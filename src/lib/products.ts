import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";
import product9 from "@/assets/product-9.jpg";
import product10 from "@/assets/product-10.jpg";
import product11 from "@/assets/product-11.jpg";
import product12 from "@/assets/product-12.jpg";
import product13 from "@/assets/product-13.jpg";
import product14 from "@/assets/product-14.jpg";
import product15 from "@/assets/product-15.jpg";
import product16 from "@/assets/product-16.jpg";
import product17 from "@/assets/product-17.jpg";
import product18 from "@/assets/product-18.jpg";

export type Product = {
  id: string;
  code: string;
  name: string;
  material: string;
  price: number; // INR
  image: string;
  images360?: string[]; // Optional array of 360 degree images
  category: string;
  drop: string;
  story: string;
  stock: number;
};

export const products: Product[] = [
  { id: "c-type-shell", code: "A1/001", name: "C-Type Shell", material: "Carbon · Obsidian", price: 102900, image: product1, images360: Array(36).fill(product1), category: "Outerwear", drop: "Drop 04", stock: 12, story: "Three-layer welded membrane derived from aerospace composite research. Resists wind to 110km/h and shrugs off rain like skin." },
  { id: "vector-trousers", code: "B2/004", name: "Vector Trousers", material: "Matte Synthetic", price: 73900, image: product2, images360: Array(36).fill(product2), category: "Legwear", drop: "Drop 04", stock: 24, story: "Articulated knee, hidden cargo, internal sweat channel. Built for the city as architecture, not backdrop." },
  { id: "atmos-veil", code: "C3/001", name: "Atmos Veil", material: "Translucent Membrane", price: 174900, image: product3, images360: Array(36).fill(product3), category: "Outerwear", drop: "Lab Series", stock: 6, story: "A translucent shield over tailored worsted wool. Half garment, half weather system." },
  { id: "chrome-silk-knit", code: "D1/002", name: "Chrome Silk Knit", material: "Italian Stretch Silk", price: 53900, image: product4, images360: Array(36).fill(product4), category: "Midlayer", drop: "Drop 03", stock: 38, story: "A second skin spun from chromium-finished mulberry silk. Weightless, biometric, quietly luminous." },
  { id: "ghost-runner", code: "E1/007", name: "Ghost Runner", material: "Carbon Knit Mesh", price: 44900, image: product5, images360: Array(36).fill(product5), category: "Footwear", drop: "Drop 04", stock: 18, story: "A sculpted footbed engineered for the long city night. Carbon plate, vapor midsole, zero seams." },
  { id: "monolith-overcoat", code: "A2/003", name: "Monolith Overcoat", material: "Bonded Italian Wool", price: 265900, image: product6, images360: Array(36).fill(product6), category: "Outerwear", drop: "Lab Series", stock: 9, story: "A sculpted column of compressed Biella wool. Cut once, hand-finished, lined in raw silk." },
  { id: "obsidian-hood", code: "F1/002", name: "Obsidian Hood", material: "Heavyweight Loopback", price: 38900, image: product7, images360: Array(36).fill(product7), category: "Midlayer", drop: "Drop 04", stock: 42, story: "An asymmetric hood cut from 480gsm loopback cotton. Hand-dyed in deep obsidian over three passes." },
  { id: "pleated-mercury", code: "G1/001", name: "Pleated Mercury Skirt", material: "Liquid Metal Pleat", price: 84900, image: product8, images360: Array(36).fill(product8), category: "Legwear", drop: "Lab Series", stock: 11, story: "A sculptural pleat hand-set in Como. Catches light like mercury, moves like water." },
  { id: "void-biker", code: "A3/008", name: "Void Biker", material: "Glove-soft Calf Leather", price: 219000, image: product9, images360: Array(36).fill(product9), category: "Outerwear", drop: "Drop 03", stock: 14, story: "Bonded calfskin shell, asymmetric zip, ribbed flex panel. Built for night arrivals." },
  { id: "ivory-veil-slip", code: "H1/001", name: "Ivory Veil Slip", material: "Pure Mulberry Silk", price: 67900, image: product10, images360: Array(36).fill(product10), category: "Eveningwear", drop: "Lab Series", stock: 8, story: "A translucent column of ivory silk with chromium chain straps. For the late hours." },
  { id: "alabaster-runner", code: "E2/004", name: "Alabaster Runner", material: "Engineered Knit", price: 52900, image: product11, images360: Array(36).fill(product11), category: "Footwear", drop: "Drop 04", stock: 22, story: "A pale chassis with chrome-foil panels. Built on a sculpted EVA midsole." },
  { id: "graphite-scarf", code: "I1/001", name: "Graphite Cashmere Scarf", material: "Mongolian Cashmere", price: 24900, image: product12, images360: Array(36).fill(product12), category: "Accessories", drop: "Drop 03", stock: 60, story: "A long stole woven in 4-ply A-grade cashmere. Heavy, soft, eternal." },
  { id: "chrome-shades", code: "J1/002", name: "Chrome Mirage Shades", material: "Polished Titanium", price: 41900, image: product13, images360: Array(36).fill(product13), category: "Accessories", drop: "Lab Series", stock: 26, story: "Sculpted titanium frame with Zeiss optics. A small architecture for the face." },
  { id: "monolith-tote", code: "K1/001", name: "Monolith Tote", material: "Vegetable-tanned Leather", price: 96900, image: product14, images360: Array(36).fill(product14), category: "Accessories", drop: "Drop 04", stock: 19, story: "One panel, one fold, one stitch. A tote cut from a single piece of Tuscan calf." },
  { id: "wine-puffer", code: "A4/002", name: "Crimson Cropped Puffer", material: "Glossy Technical Down", price: 88900, image: product15, images360: Array(36).fill(product15), category: "Outerwear", drop: "Drop 04", stock: 16, story: "A cropped puffer in deep wine — heat-sealed seams, recycled down core, no labels visible." },
  { id: "ivory-architect", code: "A5/001", name: "Ivory Architect Coat", material: "Heavyweight Italian Wool", price: 198900, image: product16, images360: Array(36).fill(product16), category: "Outerwear", drop: "Lab Series", stock: 7, story: "A floor-grazing column of bleached Biella wool. Cut for movement, weighted for stillness." },
  { id: "noir-saddle", code: "K2/004", name: "Noir Saddle Crossbody", material: "Polished Calf Leather", price: 64900, image: product17, images360: Array(36).fill(product17), category: "Accessories", drop: "Drop 03", stock: 28, story: "A compact crossbody with chain-link strap. Built for the long evenings." },
  { id: "chronograph-silver", code: "L1/001", name: "Chrome Chronograph", material: "Brushed Steel · Sapphire", price: 159900, image: product18, images360: Array(36).fill(product18), category: "Accessories", drop: "Lab Series", stock: 12, story: "A sculpted automatic chronograph with silver-on-silver dial. Swiss movement, 200m." },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
