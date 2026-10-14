"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const { cart, subTotal, clearCart, productsReady } = useContext(CartContext);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const items = Object.entries(cart);

  const handlePay = async (event) => {
    event.preventDefault();
    setError("");
    const token = localStorage.getItem("shopnest_token");
    if (!token) { router.push("/login"); return; }
    if (items.length === 0) { setError("Your cart is empty."); return; }
    if (address.trim().length < 8) { setError("Please enter your complete delivery address."); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ cart: Object.fromEntries(items.map(([slug, item]) => [slug, { qty: item.qty, size: item.size, variant: item.variant }])), address }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not place order");
      clearCart();
      router.push(`/userOrder?placed=${encodeURIComponent(data.orderId)}`);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[75vh] bg-slate-50 px-4 py-10 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">ShopNest / Checkout</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-[#0f1e3d] md:text-4xl">Complete your order</h1>
          <p className="mt-2 text-sm text-slate-500">Your final prices are verified securely by the server.</p>
        </div>

        {!productsReady ? <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-500">Loading your cart…</div> : items.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="text-5xl">🛒</div><h2 className="mt-4 text-xl font-bold text-[#0f1e3d]">Your cart is empty</h2>
            <p className="mt-2 text-slate-500">Add a few products before checking out.</p>
            <Link href="/" className="mt-6 inline-flex rounded-full bg-[#0f1e3d] px-6 py-3 font-bold text-white hover:bg-blue-700">Continue shopping</Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <form onSubmit={handlePay} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-xl font-extrabold text-[#0f1e3d]">Delivery details</h2>
              <label htmlFor="address" className="mt-6 block text-sm font-bold text-slate-700">Full delivery address</label>
              <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} maxLength={500} required rows={5} placeholder="House / street, area, city, nearby landmark…" className="mt-2 w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" />
              {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
              <button type="submit" disabled={loading || !productsReady} className="mt-6 w-full rounded-full bg-[#0f1e3d] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? "Placing your order…" : "Place order securely"}
              </button>
              <p className="mt-3 text-center text-xs text-slate-400">No online payment gateway is connected; this records an order as pending.</p>
            </form>

            <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-xl font-extrabold text-[#0f1e3d]">Order summary <span className="text-sm font-semibold text-slate-400">({items.length} items)</span></h2>
              <div className="mt-6 divide-y divide-slate-100">
                {items.map(([slug, item]) => (
                  <div key={slug} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    {item.img ? <img src={item.img} alt="" className="h-20 w-16 rounded-xl bg-slate-100 object-cover" /> : <div className="h-20 w-16 rounded-xl bg-slate-100" />}
                    <div className="min-w-0 flex-1"><p className="line-clamp-2 text-sm font-bold text-[#0f1e3d]">{item.name || slug}</p><p className="mt-1 text-xs text-slate-500">Qty {item.qty}{item.size ? ` · Size ${item.size}` : ""}</p><p className="mt-2 text-sm font-extrabold">Rs. {(Number(item.price) || 0) * item.qty}</p></div>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t border-dashed border-slate-200 pt-5"><div className="flex items-center justify-between text-sm text-slate-500"><span>Subtotal (display estimate)</span><span>Rs. {subTotal.toLocaleString("en-PK")}</span></div><div className="mt-3 flex items-center justify-between"><span className="font-bold text-[#0f1e3d]">Estimated total</span><span className="text-2xl font-black text-[#0f1e3d]">Rs. {subTotal.toLocaleString("en-PK")}</span></div><p className="mt-3 text-xs leading-5 text-slate-400">The server recalculates the final order amount using current database prices.</p></div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
