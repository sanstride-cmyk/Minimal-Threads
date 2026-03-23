import { X, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/utils";

export function CartDrawer() {
  const { state, dispatch, subtotal } = useCart();

  if (!state.isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" 
        onClick={() => dispatch({ type: "SET_CART_OPEN", payload: false })}
      />
      
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 tracking-wide">YOUR CART</h2>
          <button 
            onClick={() => dispatch({ type: "SET_CART_OPEN", payload: false })}
            className="p-2 -mr-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {state.items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                <ShoppingBagIcon className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-gray-500">Your cart is currently empty.</p>
              <button 
                onClick={() => dispatch({ type: "SET_CART_OPEN", payload: false })}
                className="text-black border-b border-black font-medium pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {state.items.map((item, index) => (
                <li key={`${item.product.id}-${item.size}-${item.color}-${index}`} className="flex py-2">
                  <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 border border-gray-100">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3 className="line-clamp-1">{item.product.name}</h3>
                        <p className="ml-4">{formatPrice(item.product.price)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.color} | Size {item.size}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button 
                          className="px-2 py-1 text-gray-500 hover:text-black transition-colors"
                          onClick={() => dispatch({
                            type: "UPDATE_QUANTITY",
                            payload: { 
                              productId: item.product.id, size: item.size, color: item.color, 
                              quantity: Math.max(1, item.quantity - 1) 
                            }
                          })}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-medium w-6 text-center">{item.quantity}</span>
                        <button 
                          className="px-2 py-1 text-gray-500 hover:text-black transition-colors"
                          onClick={() => dispatch({
                            type: "UPDATE_QUANTITY",
                            payload: { 
                              productId: item.product.id, size: item.size, color: item.color, 
                              quantity: item.quantity + 1 
                            }
                          })}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => dispatch({
                          type: "REMOVE_ITEM",
                          payload: { productId: item.product.id, size: item.size, color: item.color }
                        })}
                        className="font-medium text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {state.items.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-gray-50/50">
            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
              <p>Subtotal</p>
              <p>{formatPrice(subtotal)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
            <div className="mt-6">
              <Link href="/checkout">
                <button 
                  onClick={() => dispatch({ type: "SET_CART_OPEN", payload: false })}
                  className="w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-xl shadow-lg shadow-black/5 text-base font-medium text-white bg-black hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                >
                  Checkout <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{' '}
                <button
                  type="button"
                  className="font-medium text-black hover:text-gray-700 underline"
                  onClick={() => dispatch({ type: "SET_CART_OPEN", payload: false })}
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple fallback icon if ShoppingBag not imported
function ShoppingBagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
