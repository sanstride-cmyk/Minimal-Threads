import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { Layout } from "../components/layout/Layout";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/utils";
import { Minus, Plus, ChevronRight, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductDetail() {
  const [, params] = useRoute("/products/:id");
  const productId = params?.id;
  const { dispatch } = useCart();
  
  const product = PRODUCTS.find(p => p.id === productId);
  
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    // Reset state when product changes
    if (product) {
      setSelectedSize(product.sizes[0] || "");
      setSelectedColor(product.colors[0] || "");
      setQuantity(1);
      setIsAdded(false);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl font-bold mb-4">Product not found</h1>
          <p className="text-gray-500 mb-8">The item you're looking for doesn't exist or has been removed.</p>
          <a href="/products" className="px-6 py-3 bg-black text-white rounded-lg font-medium">Back to Shop</a>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: { product, size: selectedSize, color: selectedColor, quantity }
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-sm text-gray-500">
          <a href="/" className="hover:text-black transition-colors">Home</a>
          <ChevronRight className="w-4 h-4 mx-2" />
          <a href="/products" className="hover:text-black transition-colors">Products</a>
          <ChevronRight className="w-4 h-4 mx-2" />
          <a href={`/products?category=${product.category}`} className="hover:text-black transition-colors">{product.category}</a>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[3/4] w-full bg-gray-100 rounded-3xl overflow-hidden cursor-crosshair group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-125 origin-center"
              />
              {/* Optional: Add multiple images thumbnails below if data supported it */}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[3/4] rounded-xl bg-gray-100 overflow-hidden border-2 border-transparent hover:border-black cursor-pointer opacity-70 hover:opacity-100 transition-all">
                  <img src={product.image} alt={`thumbnail ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col pt-4 lg:pt-10">
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mt-4">
                <span className="text-2xl font-medium text-gray-900">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                )}
                {product.isNew && (
                  <span className="px-2 py-1 bg-black text-white text-xs font-bold uppercase rounded-md ml-auto">New Arrival</span>
                )}
              </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-10 border-b border-gray-100 pb-10">
              {product.description}
            </p>

            {/* Colors */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-sm uppercase tracking-wider text-gray-900">Color</h3>
                <span className="text-sm text-gray-500">{selectedColor}</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-2 focus:outline-none transition-all ${
                      selectedColor === color ? 'border-black scale-110' : 'border-transparent ring-1 ring-gray-200'
                    }`}
                    style={{ 
                      backgroundColor: color.toLowerCase() === 'white' ? '#fff' : 
                                     color.toLowerCase() === 'black' ? '#111' : 
                                     color.toLowerCase() === 'navy' ? '#1e3a8a' : 
                                     color.toLowerCase() === 'charcoal' ? '#374151' : 
                                     color.toLowerCase() === 'khaki' ? '#d4d4d8' : '#e5e7eb'
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-sm uppercase tracking-wider text-gray-900">Size</h3>
                <button className="text-sm text-gray-500 underline hover:text-black">Size Guide</button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border rounded-xl text-sm font-medium transition-all ${
                      selectedSize === size 
                        ? 'border-black bg-black text-white shadow-md' 
                        : 'border-gray-200 text-gray-900 hover:border-gray-900 bg-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-2 sm:w-1/3 bg-white">
                <button 
                  className="p-2 text-gray-400 hover:text-black disabled:opacity-50 transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="font-medium text-lg w-8 text-center">{quantity}</span>
                <button 
                  className="p-2 text-gray-400 hover:text-black transition-colors"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 flex items-center justify-center py-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                  isAdded 
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' 
                    : 'bg-black text-white hover:bg-gray-800 shadow-xl shadow-black/10 hover:-translate-y-1'
                }`}
              >
                {isAdded ? (
                  <><Check className="w-5 h-5 mr-2" /> Added to Cart</>
                ) : (
                  'Add to Cart'
                )}
              </button>
            </div>

            {/* Accordions (Mock visual) */}
            <div className="border-t border-gray-100 divide-y border-gray-100">
              {["Details & Care", "Shipping & Returns", "Sustainability"].map((title) => (
                <details key={title} className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none py-6 text-gray-900 hover:text-gray-600 transition-colors">
                    {title}
                    <span className="transition group-open:rotate-180">
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </summary>
                  <div className="text-gray-500 text-sm pb-6 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </div>
                </details>
              ))}
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}

// Simple internal icon for accordions
function ChevronDown(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
  )
}
