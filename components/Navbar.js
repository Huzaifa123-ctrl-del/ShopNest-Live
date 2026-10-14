"use client";
import React, { useRef, useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Popup from "./Popup";
import { CartContext } from "@/app/context/CartContext";

const Navbar = () => {
  const { cart, addToCart, removeFromCart, clearCart, subTotal } = useContext(CartContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const [user, setUser] = useState(null);
  const ref = useRef();
  const router = useRouter();

  const toggleCart = () => {
    ref.current.classList.toggle("translate-x-full");
    ref.current.classList.toggle("translate-x-0");
  };

  useEffect(() => {
    let savedUser = localStorage.getItem("shopnest_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const showPopup = (message, type = "info") => {
    setPopup({ show: true, message, type });
    setTimeout(() => setPopup({ show: false, message: "", type: "" }), 2500);
  };

  const handleLogout = () => {
    localStorage.removeItem("shopnest_token");
    localStorage.removeItem("shopnest_user");
    localStorage.removeItem("cart");
    setUser(null);
    showPopup("Logged out successfully!", "success");
    setTimeout(() => {
      router.push("/login");
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <Popup show={popup.show} message={popup.message} type={popup.type} />

      <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <div className="logo">
            <Link href="/">
              <img src="/logo.png" height={0} width={120} className="rounded-lg" alt="logo" />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[14px] font-semibold text-[#0f1e3d]">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <div className="relative group py-6">
              <button className="flex items-center gap-1">Products <svg className="w-4 h-4 group-hover:rotate-180 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg></button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:block">
                <div className="bg-white rounded-[20px] border border-slate-100 shadow-xl p-2 w-[520px] grid grid-cols-2 gap-1 mt-2">
                  <Link href="/t-shirts" className="flex gap-3 p-4 rounded-[14px] hover:bg-[#eef5ff]"><div className="w-11 h-11 rounded-full bg-[#eef5ff] flex items-center justify-center">👕</div><div><p className="font-bold text-sm">T-Shirts</p></div></Link>
                  <Link href="/hoodies" className="flex gap-3 p-4 rounded-[14px] hover:bg-[#eef5ff]"><div className="w-11 h-11 rounded-full bg-[#f8fafc] flex items-center justify-center">🧥</div><div><p className="font-bold text-sm">Hoodies</p></div></Link>
                  <Link href="/gymproducts" className="flex gap-3 p-4 rounded-[14px] hover:bg-[#eef5ff]"><div className="w-11 h-11 rounded-full bg-[#f8fafc] flex items-center justify-center">💪</div><div><p className="font-bold text-sm">Gym Products</p></div></Link>
                  <Link href="/mugs" className="flex gap-3 p-4 rounded-[14px] hover:bg-[#eef5ff]"><div className="w-11 h-11 rounded-full bg-[#f8fafc] flex items-center justify-center">☕</div><div><p className="font-bold text-sm">Mugs</p></div></Link>
                </div>
              </div>
            </div>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleCart} className="relative w-9 h-9 rounded-full cursor-pointer bg-[#f8fafc] flex items-center justify-center hover:bg-slate-100 transition">
              🛒
              {Object.keys(cart).length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                  {Object.keys(cart).length}
                </span>
              )}
            </button>

            {/* USER DROPDOWN - FIXED */}
            <div className="relative group">
              <button className="w-9 h-9 rounded-full bg-[#0f1e3d] flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </button>
              <div className="absolute right-0 top-full hidden group-hover:block pt-2">
                <div className="bg-white border border-slate-100 rounded-2xl shadow-xl w-48 p-2">
                  {user? (
                    <>
                      <div className="px-4 py-2 text-sm font-bold truncate">Hi, {user.name}</div>
                      <div className="border-t border-slate-100 my-1"></div>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50">Logout</button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="block px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50">Login</Link>
                      <Link href="/signup" className="block px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50">Sign Up</Link>
                    </>
                  )}
                  <div className="border-t border-slate-100 my-1"></div>
                  <Link href="/admin" className="block px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50">Admin</Link>
                </div>
              </div>
            </div>

            <Link href="/contact" className="hidden md:flex bg-[#0f1e3d] text-white px-6 py-2.5 rounded-full text-sm font-bold">Get Started</Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-9 h-9 rounded-full bg-[#0f1e3d] text-white flex items-center justify-center">
              {mobileOpen? <span>✕</span> : <span>☰</span>}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-6 py-6 space-y-4">
            <Link href="/" className="block font-bold">Home</Link>
            <Link href="/t-shirts" className="block pl-4 text-sm">- T-Shirts</Link>
            <Link href="/hoodies" className="block pl-4 text-sm">- Hoodies</Link>
            <Link href="/gymproducts" className="block pl-4 text-sm">- Gym Products</Link>
            <Link href="/mugs" className="block pl-4 text-sm">- Mugs</Link>
            <Link href="/about" className="block font-bold">About</Link>
            <Link href="/contact" className="block font-bold">Contact</Link>
            <div className="border-t pt-4">
              {user? (
                <button onClick={handleLogout} className="block font-bold">Logout ({user.name})</button>
              ) : (
                <>
                  <Link href="/login" className="block font-bold mb-2">Login</Link>
                  <Link href="/signup" className="block font-bold">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <div ref={ref} className="sideCart fixed top-0 right-0 w-[85vw] md:w-[400px] h-[100dvh] bg-white shadow-2xl p-6 md:p-8 transform transition-transform duration-300 translate-x-full z-[999] flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#0f1e3d]">Shopping cart</h2>
          <button onClick={toggleCart} className="w-9 h-9 cursor-pointer rounded-full bg-black text-white flex items-center justify-center">✕</button>
        </div>
        <div className="mt-8 flex-1 overflow-y-auto">
          {Object.keys(cart).length === 0? (
            <div className="text-center mt-20">
              <div className="text-6xl mb-4">🛒</div>
              <p className="font-bold text-slate-700">Your cart is empty</p>
            </div>
          ) : (
            <ol className="space-y-4">
              {Object.keys(cart).map((k) => (
                <li key={k}>
                  <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl">
                    <div className="text-sm w-2/3 font-semibold">
                      <p className="line-clamp-1">{cart[k].name}</p>
                      <p className="text-xs text-slate-400">{cart[k].size} / {cart[k].variant}</p>
                    </div>
                    <div className="flex items-center gap-2 w-1/3 justify-center">
                      <button onClick={() => removeFromCart(k, 1)} className="w-7 h-7 rounded-full bg-white border flex items-center justify-center">-</button>
                      <span className="font-bold w-4 text-center text-sm">{cart[k].qty}</span>
                      <button onClick={() => addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className="w-7 h-7 rounded-full bg-white border flex items-center justify-center">+</button>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
        {Object.keys(cart).length > 0 && (
          <div className="border-t pt-6 mt-4">
            <div className="flex justify-between font-bold mb-4"><span>Subtotal:</span><span>Rs. {subTotal}</span></div>
            <div className="flex gap-3">
              <Link href="/checkout" className="flex-1 bg-[#0d64bb] p-3 rounded-full text-center text-white font-bold text-sm">Checkout</Link>
              <button onClick={clearCart} className="flex-1 bg-slate-100 p-3 rounded-full text-[#0f1e3d] font-bold text-sm">Clear Cart</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;