import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const { totalItems, dispatch } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Categories", path: "/#categories" },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-white/90 backdrop-blur-md border-gray-100 shadow-sm" : "bg-white/0"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="text-gray-900 p-2 -ml-2"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <img 
                src={`${import.meta.env.BASE_URL}images/logo-mark.png`} 
                alt="Essentials Logo" 
                className="h-8 w-8 transition-transform duration-500 group-hover:rotate-180" 
              />
              <span className="font-bold tracking-widest text-xl text-gray-900 hidden sm:block">ESSENTIALS</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-gray-900 relative py-2",
                  location === link.path ? "text-gray-900" : "text-gray-500"
                )}
              >
                {link.label}
                {location === link.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-900 transition-colors p-2 hidden sm:block">
              <Search className="h-5 w-5" />
            </button>
            <button 
              onClick={() => dispatch({ type: "SET_CART_OPEN", payload: true })}
              className="text-gray-900 p-2 relative group"
            >
              <ShoppingBag className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-black rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative flex flex-col w-full max-w-xs bg-white h-full shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <span className="font-bold tracking-widest text-lg">ESSENTIALS</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 -mr-2 text-gray-500">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col p-6 space-y-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-gray-900"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
