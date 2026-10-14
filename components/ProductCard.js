"use client";
import Link from "next/link";

const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='750'><rect width='100%' height='100%' fill='#eef5ff'/><text x='50%' y='50%' fill='#94a3b8' font-family='Arial' font-size='28' text-anchor='middle'>No image</text></svg>`
  );

export default function ProductCard({ product }) {
  const inStock = product.availableQty > 0;
  const lowStock = inStock && product.availableQty <= 5;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col bg-white rounded-3xl border border-slate-100 overflow-hidden hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,30,61,0.12)] transition-all duration-300"
    >
      <div className="relative aspect-[4/5] bg-gradient-to-b from-[#eef5ff] to-[#f8fafc] overflow-hidden">
        <img
          src={product.img || FALLBACK_IMG}
          alt={product.title}
          loading="lazy"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }}
          className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute top-3 left-3 right-3 flex justify-between gap-2">
          {product.color ? (
            <span className="bg-white/90 backdrop-blur text-[#0f1e3d] text-[11px] font-bold px-3 py-1 rounded-full border border-slate-100">
              {product.color}
            </span>
          ) : <span />}
          {product.size && (
            <span className="bg-[#0f1e3d] text-white text-[11px] font-bold px-3 py-1 rounded-full">{product.size}</span>
          )}
        </div>
        {!inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-[#0f1e3d] text-white text-xs font-bold px-4 py-2 rounded-full">Out of stock</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">{product.category}</p>
        <h3 className="mt-1 font-bold text-[#0f1e3d] leading-snug line-clamp-2">{product.title}</h3>
        <div className="mt-auto pt-4 flex items-end justify-between">
          <span className="text-xl font-black text-[#0f1e3d]">Rs. {Number(product.price).toLocaleString("en-PK")}</span>
          {inStock && (
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${lowStock ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700"}`}>
              {lowStock ? `Only ${product.availableQty} left` : "In stock"}
            </span>
          )}
        </div>
        <span className="mt-4 text-center bg-[#0f1e3d] text-white rounded-full py-2.5 text-sm font-bold group-hover:bg-[#2563eb] transition">
          View details
        </span>
      </div>
    </Link>
  );
}
