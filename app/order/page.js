"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserOrder() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    async function loadOrders() {
      const token = localStorage.getItem("shopnest_token");
      const savedUser = localStorage.getItem("shopnest_user");
      if (!token || !savedUser) { router.replace("/login"); return; }
      try {
        setUser(JSON.parse(savedUser));
        const response = await fetch("/api/orders", { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
        const data = await response.json();
        if (response.status === 401) { router.replace("/login"); return; }
        if (!response.ok) throw new Error(data.error || "Could not load orders");
        if (!cancelled) setOrders(data.orders || []);
      } catch (err) {
        if (!cancelled) setError(err.message || "Could not load orders");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadOrders();
    return () => { cancelled = true; };
  }, [router]);

  if (loading) return <main className="min-h-[60vh] px-6 py-24 text-center font-bold text-[#0f1e3d]">Loading your orders…</main>;

  return (
    <main className="min-h-[75vh] bg-slate-50 px-4 py-10 md:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">ShopNest / Account</p><h1 className="mt-2 text-3xl font-black tracking-tight text-[#0f1e3d] md:text-4xl">My orders</h1><p className="mt-2 text-sm text-slate-500">Welcome{user?.name ? `, ${user.name}` : " back"}. Your orders are loaded from your account.</p></div>
          <Link href="/" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-[#0f1e3d] transition hover:border-blue-300">Continue shopping</Link>
        </div>
        {error && <div role="alert" className="mb-5 rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-700">{error}</div>}
        {!error && orders.length === 0 ? (
          <section className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm"><div className="text-5xl">📦</div><h2 className="mt-4 text-xl font-extrabold text-[#0f1e3d]">No orders yet</h2><p className="mt-2 text-sm text-slate-500">When you place an order, it will appear here.</p><Link href="/" className="mt-6 inline-flex rounded-full bg-[#0f1e3d] px-6 py-3 text-sm font-bold text-white hover:bg-blue-700">Explore products</Link></section>
        ) : (
          <div className="space-y-5">{orders.map((order) => (
            <article key={order._id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-white px-5 py-5 md:px-7">
                <div><p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Order ID</p><p className="mt-1 font-bold text-[#0f1e3d]">#{String(order._id).slice(-8).toUpperCase()}</p></div>
                <div><p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Placed on</p><p className="mt-1 text-sm font-semibold text-[#0f1e3d]">{order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" }) : "—"}</p></div>
                <div><p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Total</p><p className="mt-1 text-lg font-black text-[#0f1e3d]">Rs. {Number(order.amount || 0).toLocaleString("en-PK")}</p></div>
                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-extrabold text-amber-700">{order.status || "Pending"}</span>
              </div>
              <div className="px-5 py-5 md:px-7"><p className="text-xs font-extrabold uppercase tracking-[0.15em] text-slate-400">Delivery address</p><p className="mt-1 text-sm text-slate-600">{order.address}</p><div className="mt-5 space-y-3">{(order.products || []).map((item, index) => (
                <div key={`${item.productId}-${index}`} className="flex items-center gap-4 rounded-2xl bg-slate-50 p-3">
                  {item.img ? <img src={item.img} alt="" className="h-16 w-14 rounded-xl object-cover" /> : <div className="h-16 w-14 rounded-xl bg-slate-200" />}
                  <div className="min-w-0 flex-1"><p className="text-sm font-bold text-[#0f1e3d]">{item.title || "Product"}</p><p className="mt-1 text-xs text-slate-500">Qty {item.quantity}{item.size ? ` · Size ${item.size}` : ""}{item.variant ? ` · ${item.variant}` : ""}</p></div>
                  <p className="text-sm font-extrabold text-[#0f1e3d]">Rs. {(Number(item.price) || 0) * (Number(item.quantity) || 0)}</p>
                </div>
              ))}</div></div>
            </article>
          ))}</div>
        )}
      </div>
    </main>
  );
}
