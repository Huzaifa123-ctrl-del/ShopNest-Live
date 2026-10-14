import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full bg-white">

     <main className="w-full">
          <Image
            src="/hero.png"
            alt="Homepage Banner"
            width={1920}
            height={600}
            className="w-full h-auto block"
            priority
          />
           </main>

      {/* 1. TRUST BAR */}
      <div className="w-full border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-[13px] font-medium text-slate-600">
          <span className="flex items-center gap-2">🚚 <b className="text-slate-900">Free Shipping</b> Over Rs. 3000</span>
          <span className="flex items-center gap-2">↩️ <b className="text-slate-900">Easy Returns</b> 7 Days Policy</span>
          <span className="flex items-center gap-2">🔒 <b className="text-slate-900">Secure Payment</b> 100% Safe</span>
          <span className="flex items-center gap-2">⭐ <b className="text-slate-900">24/7 Support</b> Dedicated Help</span>
        </div>
      </div>

      {/* 2. WHAT WE PROVIDE */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-[#2563eb] font-semibold text-sm tracking-widest">WHAT WE PROVIDE</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f1e3d] mt-2">Everything You Need, In One Nest</h2>
          </div>
          <Link href="/products" className="hidden md:block text-sm font-semibold text-[#2563eb] hover:underline">View All →</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Premium Fashion", desc: "Latest trends in men's & women's clothing, shoes and accessories with top brands.", icon: "👕", color: "bg-[#eef5ff]" },
            { title: "Smart Gadgets", desc: "Headphones, watches, mobiles & electronics with 1 year official warranty.", icon: "⌚", color: "bg-[#fff7ed]" },
            { title: "Lifestyle Essentials", desc: "Bags, sunglasses, beauty & daily needs delivered to your door in 2-3 days.", icon: "👜", color: "bg-[#f0fdf4]" },
          ].map((item) => (
            <div key={item.title} className={`${item.color} rounded-[24px] p-8 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-sm">{item.icon}</div>
              <h3 className="mt-5 font-bold text-lg text-[#0f1e3d]">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-6">{item.desc}</p>
              <Link href="/products" className="inline-block mt-5 text-sm font-semibold text-[#0f1e3d] hover:text-[#2563eb]">Explore →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY - Modern Cards */}
      <section className="bg-[#f8fafc] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#0f1e3d] mb-8">Shop By Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "T-Shirts", href: "/t-shirts", note: "Soft everyday cotton" },
              { name: "Hoodies", href: "/hoodies", note: "400GSM heavy fleece" },
              { name: "Mugs", href: "/mugs", note: "Ceramic, microwave safe" },
              { name: "Gym Products", href: "/gymproducts", note: "Built for daily training" },
            ].map((cat) => (
              <Link key={cat.name} href={cat.href} className="group relative block h-[180px] rounded-[20px] bg-white border border-slate-200 overflow-hidden py-6 px-5 hover:bg-[#0f1e3d] transition-all duration-300">
                <h3 className="font-bold text-lg text-[#0f1e3d] group-hover:text-white">{cat.name}</h3>
                <p className="text-xs text-slate-500 group-hover:text-slate-400 mt-1">{cat.note}</p>
                <span className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-[#eef5ff] group-hover:bg-[#2563eb] group-hover:text-white flex items-center justify-center transition">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="bg-[#0f1e3d] rounded-[32px] p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-white relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-[#2563eb]/30 rounded-full blur-[80px]"></div>
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">Why Thousands Trust <br/><span className="text-[#60a5fa]">ShopNest?</span></h2>
            <div className="mt-8 space-y-5">
              <div className="flex gap-4"><div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">✓</div><div><b className="text-white">100% Original Products</b><p className="text-sm text-slate-400">We never compromise on quality.</p></div></div>
              <div className="flex gap-4"><div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">✓</div><div><b className="text-white">Fastest Delivery</b><p className="text-sm text-slate-400">2-3 days delivery in all Pakistan.</p></div></div>
              <div className="flex gap-4"><div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">✓</div><div><b className="text-white">Cash on Delivery</b><p className="text-sm text-slate-400">Pay when you receive your parcel.</p></div></div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur rounded-[20px] p-6 border border-white/10">
            <p className="text-slate-300 text-sm leading-6">"Best shopping experience! Quality is amazing and delivery was super fast. Will definitely shop again from ShopNest."</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="md:w-10 md:h-10 rounded-full bg-[#2563eb]"></div>
              <div><p className="text-sm font-semibold">Huzaifa</p><p className="text-xs text-slate-400">Verified Buyer, Karachi</p></div>
              <div className="ml-auto text-yellow-400 text-sm">★★★★★</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
