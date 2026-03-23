import { Link } from "wouter";
import { Product } from "../../data/products";
import { formatPrice } from "../../lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group block w-full float-hover">
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 mb-4 border border-gray-100/50">
        {/* badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold uppercase tracking-wider text-black rounded-full shadow-sm">
              New
            </span>
          )}
          {product.originalPrice && (
            <span className="px-2.5 py-1 bg-red-500/90 backdrop-blur-sm text-xs font-bold uppercase tracking-wider text-white rounded-full shadow-sm">
              Sale
            </span>
          )}
        </div>
        
        {/* image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        
        {/* subtle gradient overlay at bottom for better text contrast if we had overlay text, but here it's just for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="px-1">
        <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">{product.category}</p>
        <h3 className="text-base font-medium text-gray-900 truncate mb-1 group-hover:text-black">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-900">{formatPrice(product.price)}</p>
          {product.originalPrice && (
            <p className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
