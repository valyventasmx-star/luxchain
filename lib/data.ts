export type Category = "cars" | "watches" | "real-estate" | "yachts" | "jets" | "jewelry";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number; // USD
  images: string[];
  description: string;
  specs: Record<string, string>;
  cryptoPrices: {
    BTC: number;
    ETH: number;
    USDC: number;
  };
  location: string;
  badge?: string;
  featured?: boolean;
}

const BTC = 97500;
const ETH = 3800;

function toCrypto(usd: number) {
  return {
    BTC: parseFloat((usd / BTC).toFixed(4)),
    ETH: parseFloat((usd / ETH).toFixed(3)),
    USDC: usd,
  };
}

export const products: Product[] = [
  {
    id: "lamborghini-revuelto",
    name: "Huracán Sterrato",
    brand: "Lamborghini",
    category: "cars",
    price: 320000,
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    ],
    description: "The Lamborghini Huracán Sterrato is an all-terrain supercar fusing race-derived performance with off-road capability. Built for those who refuse to be limited by roads.",
    specs: { "Engine": "5.2L V10 NA", "Horsepower": "610 HP", "0-100 km/h": "3.4s", "Top Speed": "260 km/h", "Transmission": "7-speed DCT", "Drive": "AWD" },
    cryptoPrices: toCrypto(320000),
    location: "Milan, Italy",
    badge: "NEW ARRIVAL",
    featured: true,
  },
  {
    id: "rolls-royce-phantom",
    name: "Phantom Extended",
    brand: "Rolls-Royce",
    category: "cars",
    price: 680000,
    images: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&q=80",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=80",
    ],
    description: "The pinnacle of automotive luxury. Every Rolls-Royce Phantom Extended is a bespoke masterpiece — handcrafted to the owner's every desire.",
    specs: { "Engine": "6.75L V12 Twin-Turbo", "Horsepower": "571 HP", "0-100 km/h": "5.3s", "Top Speed": "250 km/h", "Wheelbase": "+170mm", "Interior": "Starlight Headliner" },
    cryptoPrices: toCrypto(680000),
    location: "London, UK",
    badge: "EXCLUSIVE",
    featured: true,
  },
  {
    id: "bugatti-chiron",
    name: "Chiron Super Sport",
    brand: "Bugatti",
    category: "cars",
    price: 3900000,
    images: [
      "https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=1200&q=80",
      "https://images.unsplash.com/photo-1541038865825-640067498e52?w=1200&q=80",
    ],
    description: "A hypercar engineered beyond limits. The Bugatti Chiron Super Sport reaches 440 km/h and redefines what is mechanically possible on four wheels.",
    specs: { "Engine": "8.0L W16 Quad-Turbo", "Horsepower": "1,578 HP", "0-100 km/h": "2.4s", "Top Speed": "440 km/h", "Torque": "1,600 Nm", "Production": "60 units" },
    cryptoPrices: toCrypto(3900000),
    location: "Molsheim, France",
    badge: "ULTRA RARE",
    featured: true,
  },
  {
    id: "patek-nautilus",
    name: "Nautilus 5711/1A",
    brand: "Patek Philippe",
    category: "watches",
    price: 135000,
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&q=80",
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=1200&q=80",
    ],
    description: "The most coveted watch in the world. The Patek Philippe Nautilus 5711 in steel is an icon of understated luxury with a 5+ year waitlist.",
    specs: { "Movement": "Cal. 26-330 S C", "Case": "40mm Stainless Steel", "Water Resistance": "120m", "Power Reserve": "45h", "Dial": "Blue Gradient", "Reference": "5711/1A-014" },
    cryptoPrices: toCrypto(135000),
    location: "Geneva, Switzerland",
    badge: "SOLD OUT WORLDWIDE",
    featured: true,
  },
  {
    id: "ap-royal-oak",
    name: "Royal Oak 15500ST",
    brand: "Audemars Piguet",
    category: "watches",
    price: 95000,
    images: [
      "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=1200&q=80",
      "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?w=1200&q=80",
    ],
    description: "Gerald Genta's revolutionary design remains the ultimate sports watch. The Royal Oak 15500 features the new generation Calibre 4302 for unmatched accuracy.",
    specs: { "Movement": "Cal. 4302", "Case": "41mm Steel", "Power Reserve": "70h", "Water Resistance": "50m", "Bracelet": "Integrated Steel", "Year": "2022" },
    cryptoPrices: toCrypto(95000),
    location: "Le Brassus, Switzerland",
    featured: false,
  },
  {
    id: "monaco-penthouse",
    name: "Le Rocher Penthouse",
    brand: "Monaco Real Estate",
    category: "real-estate",
    price: 42000000,
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    ],
    description: "Panoramic views of the Mediterranean from this exceptional penthouse in Monaco's most prestigious district. 850m² of pure refinement with private rooftop pool.",
    specs: { "Size": "850 m²", "Bedrooms": "5", "Bathrooms": "6", "Rooftop Pool": "Yes", "Garage": "4 spaces", "View": "Mediterranean Sea" },
    cryptoPrices: toCrypto(42000000),
    location: "Monaco, MC",
    badge: "PRIME LOCATION",
    featured: true,
  },
  {
    id: "dubai-villa",
    name: "Palm Jumeirah Villa",
    brand: "Emaar Properties",
    category: "real-estate",
    price: 18500000,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    ],
    description: "Iconic Palm Jumeirah frond villa with private beach, infinity pool and direct Burj Al Arab views. Fully furnished to the highest standard.",
    specs: { "Size": "1,200 m²", "Bedrooms": "7", "Bathrooms": "8", "Pool": "Infinity", "Beach": "Private 30m", "Parking": "6 cars" },
    cryptoPrices: toCrypto(18500000),
    location: "Dubai, UAE",
    featured: false,
  },
  {
    id: "pershing-108",
    name: "Pershing 108",
    brand: "Pershing Yachts",
    category: "yachts",
    price: 9200000,
    images: [
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&q=80",
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200&q=80",
    ],
    description: "The Pershing 108 is a masterpiece of Italian yacht-building. Its aggressive lines and triple MTU engines make it the fastest maxi open yacht on the water.",
    specs: { "Length": "33m", "Engines": "3x MTU 2,600HP", "Top Speed": "50+ knots", "Cabins": "5", "Crew": "4", "Range": "350nm" },
    cryptoPrices: toCrypto(9200000),
    location: "Cannes, France",
    badge: "DELIVERY READY",
    featured: true,
  },
  {
    id: "gulfstream-g700",
    name: "Gulfstream G700",
    brand: "Gulfstream",
    category: "jets",
    price: 78000000,
    images: [
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80",
      "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=80",
    ],
    description: "The world's largest purpose-built business aircraft. The Gulfstream G700 offers ultra-long range with the most advanced cabin environment in business aviation.",
    specs: { "Range": "7,500nm", "Passengers": "Up to 19", "Engines": "Rolls-Royce Pearl 700", "Top Speed": "Mach 0.925", "Cabin Length": "56.2 ft", "Wi-Fi": "High-speed Ka/Ku band" },
    cryptoPrices: toCrypto(78000000),
    location: "Savannah, GA, USA",
    badge: "FLAGSHIP",
    featured: true,
  },
  {
    id: "cartier-panthère",
    name: "Panthère de Cartier Necklace",
    brand: "Cartier",
    category: "jewelry",
    price: 285000,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80",
      "https://images.unsplash.com/photo-1573408301185-9519f94815fd?w=1200&q=80",
    ],
    description: "A sculptural panther set with 116 brilliant-cut diamonds, emerald eyes, and onyx nose on a white gold chain. An iconic piece of high jewelry.",
    specs: { "Metal": "18K White Gold", "Diamonds": "116 brilliant-cut", "Eyes": "2 Emeralds", "Nose": "Onyx", "Chain": "42cm", "Certificate": "GIA Certified" },
    cryptoPrices: toCrypto(285000),
    location: "Paris, France",
    badge: "ONE OF A KIND",
    featured: false,
  },
];

export const categories = [
  { id: "cars", label: "Supercars", icon: "🏎️", count: products.filter(p => p.category === "cars").length },
  { id: "watches", label: "Timepieces", icon: "⌚", count: products.filter(p => p.category === "watches").length },
  { id: "real-estate", label: "Real Estate", icon: "🏛️", count: products.filter(p => p.category === "real-estate").length },
  { id: "yachts", label: "Yachts", icon: "⛵", count: products.filter(p => p.category === "yachts").length },
  { id: "jets", label: "Private Jets", icon: "✈️", count: products.filter(p => p.category === "jets").length },
  { id: "jewelry", label: "Jewelry", icon: "💎", count: products.filter(p => p.category === "jewelry").length },
];

export const cryptos = [
  { id: "BTC", name: "Bitcoin", symbol: "BTC", icon: "₿", color: "#F7931A" },
  { id: "ETH", name: "Ethereum", symbol: "ETH", icon: "Ξ", color: "#627EEA" },
  { id: "USDC", name: "USD Coin", symbol: "USDC", icon: "$", color: "#2775CA" },
];

export function formatCrypto(amount: number, symbol: string): string {
  if (symbol === "BTC") return `${amount.toFixed(4)} BTC`;
  if (symbol === "ETH") return `${amount.toFixed(3)} ETH`;
  return `${amount.toLocaleString()} USDC`;
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}
