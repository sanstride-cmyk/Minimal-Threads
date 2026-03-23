import { Link } from "wouter";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Layout } from "../components/layout/Layout";
import { PRODUCTS } from "../data/products";
import { ProductCard } from "../components/product/ProductCard";
import { use3DEffect } from "../hooks/use-3d-effect";
import { motion } from "framer-motion";

function Hero() {
  const { ref, style, handleMouseMove, handleMouseLeave } = use3DEffect(10);
  const featuredProduct = PRODUCTS.find(p => p.id === "p_2") || PRODUCTS[0];

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gray-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white clip-path-slant opacity-50 pointer-events-none" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }} />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-12 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-black text-white text-xs font-bold tracking-widest uppercase mb-6 shadow-md">
              Fall / Winter 2025
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-6">
              Refined <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">
                Essentials.
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-md">
              Elevate your everyday wardrobe with our carefully curated collection of premium menswear. Designed for comfort, built to last.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/products">
                <button className="px-8 py-4 bg-black text-white rounded-xl font-medium shadow-xl shadow-black/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center group">
                  Shop Collection
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <a href="#categories" className="px-8 py-4 bg-transparent text-gray-900 border-2 border-gray-200 rounded-xl font-medium hover:border-gray-900 hover:bg-gray-50 transition-all duration-300">
                Explore Styles
              </a>
            </div>
          </motion.div>

          {/* 3D Featured Product Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="perspective-1000 hidden md:block"
          >
            <div 
              ref={ref}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={style}
              className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-[2rem] bg-white p-4 shadow-2xl shadow-black/10 transform-style-3d cursor-pointer group"
            >
              {/* Card depth background */}
              <div className="absolute inset-0 bg-white rounded-[2rem] shadow-2xl -z-10" style={{ transform: 'translateZ(-20px)' }} />
              
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img 
                  src={featuredProduct.image} 
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                
                {/* Floating content */}
                <div 
                  className="absolute bottom-6 left-6 right-6 transform-style-3d"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <p className="text-white/80 text-sm uppercase tracking-widest font-medium mb-1 drop-shadow-md">Featured</p>
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{featuredProduct.name}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-white font-medium text-lg">${featuredProduct.price}</p>
                    <Link href={`/products/${featuredProduct.id}`}>
                      <button className="bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-md px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        View Item
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block text-gray-400">
        <ArrowDown className="w-5 h-5" />
      </div>
    </section>
  );
}

function BestSellers() {
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);
  
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Best Sellers</h2>
            <p className="text-gray-500">Our most loved essential pieces.</p>
          </div>
          <Link href="/products" className="hidden sm:flex items-center text-black font-medium hover:text-gray-600 transition-colors group">
            View All <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link href="/products" className="inline-flex items-center text-black font-medium border-b border-black pb-1">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  const categories = [
    {
      name: "Formal",
      desc: "Sharp tailoring & elevated basics.",
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80",
    },
    {
      name: "Casual",
      desc: "Everyday comfort without compromise.",
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80",
    },
    {
      name: "Accessories",
      desc: "The details that make the outfit.",
      image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=800&q=80",
    }
  ];

  return (
    <section id="categories" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">Shop by Category</h2>
          <p className="text-gray-500">Build your wardrobe with intent. Explore our meticulously designed categories.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link href={`/products?category=${cat.name}`} className="block group relative h-96 rounded-2xl overflow-hidden shadow-lg shadow-black/5">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-3xl font-bold text-white mb-2">{cat.name}</h3>
                  <p className="text-white/80 mb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {cat.desc}
                  </p>
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout>
      <Hero />
      <BestSellers />
      <Categories />
    </Layout>
  );
}
