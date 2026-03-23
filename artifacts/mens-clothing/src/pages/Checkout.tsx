import { useState } from "react";
import { Layout } from "../components/layout/Layout";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "wouter";

const checkoutSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  zipCode: z.string().min(1, { message: "ZIP code is required" }),
  cardNumber: z.string().min(16, { message: "Invalid card number" }),
  expiry: z.string().min(5, { message: "Invalid expiry (MM/YY)" }),
  cvv: z.string().min(3, { message: "Invalid CVV" }),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { state, subtotal, dispatch } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  
  const shipping = 15.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema)
  });

  const onSubmit = (data: CheckoutForm) => {
    console.log("Order placed:", data);
    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
      dispatch({ type: "CLEAR_CART" });
      window.scrollTo(0, 0);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-8">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Order Confirmed!</h1>
          <p className="text-lg text-gray-500 mb-8 leading-relaxed">
            Thank you for shopping with Essentials. Your order #ORD-{Math.floor(Math.random() * 100000)} has been placed and is being processed. We've sent a confirmation email with details.
          </p>
          <Link href="/">
            <button className="px-8 py-4 bg-black text-white rounded-xl font-medium shadow-xl hover:-translate-y-1 transition-all">
              Return to Store
            </button>
          </Link>
        </div>
      </Layout>
    );
  }

  if (state.items.length === 0) {
    return (
      <Layout>
        <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link href="/products" className="text-black border-b border-black pb-1">Continue Shopping</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <Link href="/cart" className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cart
          </Link>

          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Form Section */}
            <div className="flex-1">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                
                {/* Contact */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                    <input 
                      {...register("email")}
                      type="email" 
                      className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-all ${errors.email ? 'border-red-500' : 'border-gray-200'}`} 
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Shipping */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
                      <input 
                        {...register("firstName")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black" 
                      />
                      {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
                      <input 
                        {...register("lastName")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black" 
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <input 
                        {...register("address")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black" 
                        placeholder="123 Main St"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input 
                        {...register("city")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ZIP / Postal code</label>
                      <input 
                        {...register("zipCode")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black" 
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Payment */}
                <div>
                  <div className="flex items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mr-3">Payment</h2>
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card number</label>
                        <input 
                          {...register("cardNumber")}
                          placeholder="0000 0000 0000 0000"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-black font-mono" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Expiration date</label>
                          <input 
                            {...register("expiry")}
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-black font-mono" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                          <input 
                            {...register("cvv")}
                            placeholder="123"
                            type="password"
                            maxLength={4}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-black font-mono" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-black text-white rounded-xl font-medium shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all disabled:opacity-70 flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    `Pay ${formatPrice(total)}`
                  )}
                </button>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:w-[400px]">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-28">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
                
                <ul className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                  {state.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-16 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src={item.product.image} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{item.product.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{item.color} / {item.size}</p>
                        <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">{formatPrice(item.product.price * item.quantity)}</p>
                    </li>
                  ))}
                </ul>
                
                <div className="border-t border-gray-100 pt-6 space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Subtotal</p>
                    <p>{formatPrice(subtotal)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Shipping</p>
                    <p>{formatPrice(shipping)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Estimated Tax</p>
                    <p>{formatPrice(tax)}</p>
                  </div>
                  
                  <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
                    <p className="text-lg font-bold text-gray-900">Total</p>
                    <p className="text-xl font-bold text-gray-900">{formatPrice(total)}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
