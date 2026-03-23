import { useState, useMemo } from "react";
import { Layout } from "../components/layout/Layout";
import { PRODUCTS, Category } from "../data/products";
import { ProductCard } from "../components/product/ProductCard";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { useLocation } from "wouter";

type SortOption = "featured" | "newest" | "price-low" | "price-high";

export default function Products() {
  const [location] = useLocation();
  
  // Basic query param parsing to support ?category=Formal
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get("category") as Category | null;

  const [selectedCategory, setSelectedCategory] = useState<Category | "All">(initialCategory || "All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filter and sort logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    
    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, sortBy]);

  const categories: (Category | "All")[] = ["All", "Formal", "Casual", "Accessories"];

  return (
    <Layout>
      <div className="bg-gray-50 border-b border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            {selectedCategory === "All" ? "All Collection" : selectedCategory}
          </h1>
          <p className="mt-4 text-gray-500 max-w-xl">
            Explore our meticulously crafted pieces. Everything you need to build a versatile, timeless wardrobe.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Desktop Sidebar / Filters */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-28">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">Filters</h3>
              
              <div className="mb-8">
                <h4 className="font-medium text-sm uppercase tracking-wider text-gray-900 mb-4">Category</h4>
                <ul className="space-y-3">
                  {categories.map(cat => (
                    <li key={cat}>
                      <button 
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-sm w-full text-left transition-colors flex justify-between items-center ${selectedCategory === cat ? 'text-black font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
                      >
                        {cat}
                        {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-black block" />}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mock visual filters for depth */}
              <div className="mb-8">
                <h4 className="font-medium text-sm uppercase tracking-wider text-gray-900 mb-4">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {["S", "M", "L", "XL", "32", "34"].map(size => (
                    <div key={size} className="w-10 h-10 border border-gray-200 rounded-md flex items-center justify-center text-sm text-gray-500 hover:border-black cursor-pointer transition-colors">
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-900">{filteredProducts.length}</span> results
              </p>
              
              <div className="flex items-center gap-4">
                <button 
                  className="md:hidden flex items-center text-sm font-medium text-gray-900"
                  onClick={() => setIsMobileFiltersOpen(true)}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
                </button>
                
                <div className="relative group">
                  <button className="flex items-center text-sm font-medium text-gray-900 bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    Sort by: {sortBy.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </button>
                  {/* Simple CSS hover dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                    {[
                      { id: "featured", label: "Featured" },
                      { id: "newest", label: "Newest Arrivals" },
                      { id: "price-low", label: "Price: Low to High" },
                      { id: "price-high", label: "Price: High to Low" },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setSortBy(opt.id as SortOption)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${sortBy === opt.id ? 'font-medium text-black' : 'text-gray-500'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                <button 
                  onClick={() => setSelectedCategory("All")}
                  className="mt-6 text-black underline hover:text-gray-600"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileFiltersOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto p-6 animate-in slide-in-from-bottom">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Filters</h3>
              <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 -mr-2 text-gray-400">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-8">
              <h4 className="font-medium text-sm uppercase tracking-wider text-gray-900 mb-4">Category</h4>
              <div className="flex flex-col space-y-2">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left py-3 px-4 rounded-xl border ${selectedCategory === cat ? 'border-black bg-black text-white font-medium' : 'border-gray-200 text-gray-700'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => setIsMobileFiltersOpen(false)}
              className="w-full bg-black text-white py-4 rounded-xl font-medium"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
