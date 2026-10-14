"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OrderConfirmation() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("shopnest_token")) router.replace("/login");
  }, [router]);

  return (
    <main className="min-h-[70vh] bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm md:px-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-3xl">✓</div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600">ShopNest order update</p>
        <h1 className="mt-2 text-3xl font-black text-[#0f1e3d]">Thank you for your order!</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">Your order has been saved. Its status will appear in your order history.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/order" className="rounded-full bg-[#0f1e3d] px-6 py-3 text-sm font-bold text-white hover:bg-blue-700">View my orders</Link><Link href="/" className="rounded-full border border-slate-200 px-6 py-3 text-sm font-bold text-[#0f1e3d] hover:bg-slate-50">Continue shopping</Link></div>
      </div>
    </main>
  );
}
