"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";

const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

export default function CategoryPage({ title, kicker, blurb, keywords = [] }) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("new");

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/getProducts", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      const list = (data.products || []).filter((p) =>
        keywords.length === 0 ? true : keywords.some((k) => norm(p.category).includes(norm(k)))
      );
      setProducts(list);
      setStatus("ready");
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  }, [keywords.join("|")]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { load(); }, [load]);

  const sizes = useMemo(() => [...new Set(products.map((p) => p.size).filter(Boolean))], [products]);

  const shown = useMemo(() => {
    let list = size ? products.filter((p) => p.size === size) : products;
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, size, sort]);

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen">
      <header className="bg-gradient-to-br from-[#0f1e3d] via-[#13285a] to-[#1d4ed8] text-white">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">
          <p className="text-[13px] text-white/60">
            <Link href="/" className="hover:text-white">Home</Link> / <span className="text-white font-semibold">{title}</span>
          </p>
          <p className="mt-6 text-xs font-bold tracking-[0.25em] text-[#93c5fd] uppercase">{kicker}</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-black leading-tight">{title}</h1>
          <p className="mt-3 max-w-xl text-white/70">{blurb}</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-sm font-semibold text-slate-500 mr-1 shrink-0">
            {status === "ready" ? `${shown.length} item${shown.length === 1 ? "" : "s"}` : " "}
          </span>
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(size === s ? "" : s)}
              className={`shrink-0 min-w-10 h-10 px-3 rounded-full border text-sm font-bold transition ${size === s ? "bg-[#0f1e3d] text-white border-[#0f1e3d]" : "bg-white border-slate-200 hover:border-[#0f1e3d]"}`}
            >
              {s}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="self-start md:self-auto border border-slate-200 rounded-full px-5 py-2.5 text-sm font-medium bg-white outline-none"
        >
          <option value="new">Newest first</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select>
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-20">
        {status === "loading" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-3xl bg-white border border-slate-100 overflow-hidden animate-pulse">
                <div className="aspect-[4/5] bg-slate-100" />
                <div className="p-5 space-y-3"><div className="h-3 w-1/3 bg-slate-100 rounded" /><div className="h-4 w-3/4 bg-slate-100 rounded" /><div className="h-10 bg-slate-100 rounded-full" /></div>
              </div>
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="text-center py-20">
            <p className="text-xl font-bold text-[#0f1e3d]">We couldn't load the products.</p>
            <p className="text-slate-500 mt-2">Please check your connection and try again.</p>
            <button onClick={load} className="mt-6 bg-[#0f1e3d] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#2563eb] transition">Try again</button>
          </div>
        )}

        {status === "ready" && shown.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl font-bold text-[#0f1e3d]">Nothing here yet.</p>
            <p className="text-slate-500 mt-2">{size ? `No items in size ${size}.` : "New products are coming soon."}</p>
          </div>
        )}

        {status === "ready" && shown.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {shown.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </main>
    </div>
  );
}
