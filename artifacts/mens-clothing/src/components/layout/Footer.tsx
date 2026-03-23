import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <span className="font-bold tracking-widest text-xl text-gray-900 block mb-4">ESSENTIALS</span>
            <p className="text-gray-500 max-w-sm mb-6">
              Premium menswear designed for the modern individual. Minimalist aesthetics, uncompromising quality.
            </p>
            <div className="flex space-x-4">
              {/* Social placeholders */}
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 cursor-pointer transition-colors">in</div>
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 cursor-pointer transition-colors">tw</div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 tracking-wider text-sm uppercase">Shop</h3>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-gray-500 hover:text-gray-900 transition-colors">All Products</Link></li>
              <li><Link href="/products?category=Formal" className="text-gray-500 hover:text-gray-900 transition-colors">Formal</Link></li>
              <li><Link href="/products?category=Casual" className="text-gray-500 hover:text-gray-900 transition-colors">Casual</Link></li>
              <li><Link href="/products?category=Accessories" className="text-gray-500 hover:text-gray-900 transition-colors">Accessories</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 tracking-wider text-sm uppercase">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Essentials Menswear. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 text-sm hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="text-gray-400 text-sm hover:text-gray-900">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
