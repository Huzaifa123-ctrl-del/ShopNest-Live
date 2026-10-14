"use client";
import { useEffect, useMemo, useState, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartContext } from "./context/CartContext";
import LoadingBar from "@/components/LoadingBar";

const CART_KEY = "cart";

export default function ClientLayout({ children }) {
  const [cart, setCart] = useState({});
  const [productsReady, setProductsReady] = useState(false);

  const subTotal = useMemo(
    () => Object.values(cart).reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.qty) || 0), 0),
    [cart]
  );

  const persistCart = (nextCart) => {
    // Persist only product slug + quantity + selected options. Never trust a stored price.
    const minimal = Object.fromEntries(Object.entries(nextCart).map(([slug, item]) => [slug, {
      qty: item.qty,
      size: item.size || "",
      variant: item.variant || "",
    }]));
    localStorage.setItem(CART_KEY, JSON.stringify(minimal));
    setCart(nextCart);
  };

  useEffect(() => {
    let cancelled = false;
    async function restoreCart() {
      try {
        const saved = JSON.parse(localStorage.getItem(CART_KEY) || "{}");
        const response = await fetch("/api/getProducts", { cache: "no-store" });
        const data = await response.json();
        if (!response.ok) throw new Error("Could not refresh product prices");
        const bySlug = new Map((data.products || []).map((product) => [product.slug, product]));
        const restored = {};
        for (const [slug, item] of Object.entries(saved)) {
          const product = bySlug.get(slug);
          const qty = Number(item?.qty);
          if (!product || !Number.isInteger(qty) || qty < 1) continue;
          restored[slug] = {
            qty,
            price: product.price,
            name: product.title,
            img: product.img,
            size: typeof item.size === "string" ? item.size : (product.size || ""),
            variant: typeof item.variant === "string" ? item.variant : (product.color || ""),
          };
        }
        if (!cancelled) {
          setCart(restored);
          const minimal = Object.fromEntries(Object.entries(restored).map(([slug, item]) => [slug, { qty: item.qty, size: item.size, variant: item.variant }]));
          localStorage.setItem(CART_KEY, JSON.stringify(minimal));
        }
      } catch (error) {
        console.error("CART RESTORE ERROR:", error);
        if (!cancelled) setCart({});
      } finally {
        if (!cancelled) setProductsReady(true);
      }
    }
    restoreCart();
    return () => { cancelled = true; };
  }, []);

  const addToCart = (slug, qty = 1, price, name, size = "", variant = "", img = "") => {
    if (!slug || !Number.isInteger(qty) || qty < 1) return;
    const current = cart[slug];
    const next = {
      ...cart,
      [slug]: {
        qty: (current?.qty || 0) + qty,
        // Details originate from the product API for display only; checkout verifies in DB.
        price: Number(price) || current?.price || 0,
        name: name || current?.name || slug,
        img: img || current?.img || "",
        size: size || current?.size || "",
        variant: variant || current?.variant || "",
      },
    };
    persistCart(next);
  };

  const removeFromCart = (slug, qty = 1) => {
    if (!cart[slug]) return;
    const next = { ...cart };
    const remaining = next[slug].qty - qty;
    if (remaining <= 0) delete next[slug];
    else next[slug] = { ...next[slug], qty: remaining };
    persistCart(next);
  };

  const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    localStorage.removeItem("shopnest_cart");
    setCart({});
  };

  return (
    <CartContext.Provider value={{ cart, subTotal, addToCart, removeFromCart, clearCart, productsReady }}>
      <Suspense fallback={null}><LoadingBar /></Suspense>
      <Navbar />
      <div className="w-full flex-1">{children}</div>
      <Footer />
    </CartContext.Provider>
  );
}
