export type Category = "Formal" | "Casual" | "Accessories";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  sizes: string[];
  colors: string[];
  description: string;
  image: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "p_1",
    name: "Slim Fit Oxford Shirt",
    category: "Formal",
    price: 89,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Light Blue"],
    description: "A tailored classic tailored from premium cotton oxford cloth. Features a button-down collar and a sharp, clean silhouette.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    isBestSeller: true,
  },
  {
    id: "p_2",
    name: "Classic Wool Blazer",
    category: "Formal",
    price: 299,
    originalPrice: 350,
    sizes: ["38R", "40R", "42R", "44R"],
    colors: ["Navy", "Charcoal"],
    description: "Woven from fine Italian wool, this unlined blazer offers a relaxed yet sophisticated drape perfect for versatile styling.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    isNew: true,
  },
  {
    id: "p_3",
    name: "Tailored Chinos",
    category: "Formal",
    price: 129,
    sizes: ["30", "32", "34", "36"],
    colors: ["Khaki", "Olive", "Navy"],
    description: "Mid-weight cotton twill chinos cut with a slight taper. Garment-dyed for a rich color and soft feel from day one.",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
  },
  {
    id: "p_4",
    name: "Essential Cotton Tee",
    category: "Casual",
    price: 39,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Grey"],
    description: "The perfect everyday t-shirt. Made from mid-weight organic cotton jersey that holds its shape wash after wash.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    isBestSeller: true,
  },
  {
    id: "p_5",
    name: "Relaxed Linen Shirt",
    category: "Casual",
    price: 79,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Natural", "Navy"],
    description: "Breathable pure linen shirt with a camp collar and a relaxed fit. Ideal for warm weather layering.",
    image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=800&q=80",
  },
  {
    id: "p_6",
    name: "Premium Denim Jeans",
    category: "Casual",
    price: 149,
    sizes: ["30x30", "32x32", "34x32", "36x34"],
    colors: ["Indigo", "Vintage Wash"],
    description: "13oz Japanese selvedge denim, cut in a classic straight fit. Designed to fade beautifully over time.",
    image: "https://images.unsplash.com/photo-1542272604-780829cb37f1?w=800&q=80",
    isBestSeller: true,
  },
  {
    id: "p_7",
    name: "Structured Hoodie",
    category: "Casual",
    price: 99,
    originalPrice: 120,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Heather Grey", "Black"],
    description: "Heavyweight French terry cotton with a structured hood and subtle minimal branding. Cozy yet elevated.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    isNew: true,
  },
  {
    id: "p_8",
    name: "Canvas Sneakers",
    category: "Casual",
    price: 119,
    sizes: ["8", "9", "10", "11", "12"],
    colors: ["Off White", "Black"],
    description: "Minimalist low-top sneakers featuring a durable canvas upper and a comfortable vulcanized rubber sole.",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
  },
  {
    id: "p_9",
    name: "Leather Belt",
    category: "Accessories",
    price: 59,
    sizes: ["32", "34", "36", "38"],
    colors: ["Brown", "Black"],
    description: "Full-grain vegetable-tanned leather with a solid brass buckle. A reliable staple that ages perfectly.",
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80",
  },
  {
    id: "p_10",
    name: "Merino Wool Socks",
    category: "Accessories",
    price: 29,
    sizes: ["One Size"],
    colors: ["Charcoal", "Navy"],
    description: "Temperature-regulating merino wool blend socks with reinforced heel and toe for durability.",
    image: "https://images.unsplash.com/photo-1582966772680-860e372bb558?w=800&q=80",
  },
  {
    id: "p_11",
    name: "Minimalist Watch",
    category: "Accessories",
    price: 249,
    sizes: ["One Size"],
    colors: ["Silver/Black", "Gold/Brown"],
    description: "A refined timepiece featuring a clean dial, sapphire crystal glass, and a premium leather strap.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    isBestSeller: true,
  },
  {
    id: "p_12",
    name: "Genuine Leather Wallet",
    category: "Accessories",
    price: 89,
    sizes: ["One Size"],
    colors: ["Cognac", "Black"],
    description: "Slim bifold wallet crafted from full-grain leather, featuring 6 card slots and a lined bill compartment.",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
    isNew: true,
  }
];
