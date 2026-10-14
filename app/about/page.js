import Link from "next/link";
import Image from "next/image";
const about = () => {
  return (
     <div className="w-full bg-white min-h-screen">
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

      {/* 1. HERO */}
      <div className="bg-[#0f1e3d] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/30 to-transparent"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#2563eb]/20 rounded-full blur-[100px]"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
          <span className="inline-block bg-white/10 text-white/80 border border-white/10 text-[11px] font-bold px-4 py-1.5 rounded-full tracking-widest">OUR STORY SINCE 2022</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mt-6 leading-[0.9]">
            We Don't Just Sell<br/>
            <span className="text-[#60a5fa]">Products. We Build</span><br/>
            Confidence.
          </h1>
          <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto mt-6 leading-relaxed">
            ShopNest was started in Karachi with one mission - to give Pakistan premium quality T-shirts, Hoodies, Mugs & Gym Gear at honest prices. No fake claims, no low quality.
          </p>
        </div>
      </div>

      {/* 2. STATS */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-[28px] border border-slate-100 shadow-[0_20px_60px_rgba(15,30,61,0.08)] grid grid-cols-2 md:grid-cols-4 p-8 gap-8">
          <div className="text-center">
            <p className="text-3xl font-black text-[#0f1e3d]">15K+</p>
            <p className="text-[11px] font-bold text-slate-400 tracking-widest mt-2">HAPPY CUSTOMERS</p>
          </div>
          <div className="text-center border-l border-slate-100">
            <p className="text-3xl font-black text-[#0f1e3d]">4.8★</p>
            <p className="text-[11px] font-bold text-slate-400 tracking-widest mt-2">AVERAGE RATING</p>
          </div>
          <div className="text-center border-l border-slate-100">
            <p className="text-3xl font-black text-[#0f1e3d]">500+</p>
            <p className="text-[11px] font-bold text-slate-400 tracking-widest mt-2">PRODUCTS</p>
          </div>
          <div className="text-center border-l border-slate-100">
            <p className="text-3xl font-black text-[#2563eb]">24H</p>
            <p className="text-[11px] font-bold text-slate-400 tracking-widest mt-2">FAST DISPATCH</p>
          </div>
        </div>
      </div>

      {/* 3. MISSION */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-[#2563eb] font-bold text-xs tracking-widest">WHY WE EXIST</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0f1e3d] mt-3 leading-tight">Quality Should Not<br/> Be Expensive.</h2>
          <p className="text-slate-500 text-sm leading-7 mt-5">
            We noticed that in the market you either pay 5000+ for good quality, or pay less and the product falls apart after two washes. We found the middle path: direct factory sourcing with no middlemen, so you get a 400GSM hoodie and premium cotton T-shirt at half the usual price.
            <br/><br/>
            We wear-test every product ourselves for 30 days. If we are not happy wearing it, we do not sell it.
          </p>
          <div className="mt-8 flex gap-3">
            <Link href="/t-shirts" className="bg-[#0f1e3d] text-white px-7 py-3 rounded-full text-sm font-bold hover:bg-[#162a50] transition">Shop Collection →</Link>
            <Link href="/contact" className="bg-[#eef5ff] text-[#0f1e3d] px-7 py-3 rounded-full text-sm font-bold hover:bg-[#dbeafe] transition">Contact Us</Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#eef5ff] rounded-[24px] p-6">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl">✓</div>
            <h3 className="font-bold text-[#0f1e3d] mt-4">Premium Fabric</h3>
            <p className="text-xs text-slate-500 mt-2 leading-5">We use 100% cotton, 400GSM fleece, no mix.</p>
          </div>
          <div className="bg-[#0f1e3d] rounded-[24px] p-6 text-white mt-8">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl">⚡</div>
            <h3 className="font-bold mt-4">Fast Delivery</h3>
            <p className="text-xs text-white/60 mt-2 leading-5">Karachi 24H, Other cities 2-3 days.</p>
          </div>
          <div className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-sm">
            <div className="w-12 h-12 bg-[#eef5ff] rounded-full flex items-center justify-center text-xl">↩</div>
            <h3 className="font-bold text-[#0f1e3d] mt-4">7 Days Return</h3>
            <p className="text-xs text-slate-500 mt-2 leading-5">No questions asked return policy.</p>
          </div>
          <div className="bg-[#f8fafc] rounded-[24px] p-6 border border-slate-100">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl">❤</div>
            <h3 className="font-bold text-[#0f1e3d] mt-4">Made with Love</h3>
            <p className="text-xs text-slate-500 mt-2 leading-5">From Karachi, for whole Pakistan.</p>
          </div>
        </div>
      </div>

      {/* 4. CTA */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-[#eef5ff] rounded-[28px] p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent"></div>
          <div className="relative">
            <h2 className="text-3xl font-black text-[#0f1e3d]">Join 15,000+ Family Members</h2>
            <p className="text-slate-500 text-sm mt-3">Get 10% OFF on your first order + free delivery.</p>
            <div className="mt-6 flex justify-center gap-3 max-w-md mx-auto">
              <input placeholder="Enter your email" className="flex-1 bg-white border border-slate-200 rounded-full px-6 py-3 text-sm outline-none focus:border-[#2563eb]" />
             <Link href={"/contact"}> <button className="bg-[#0f1e3d] cursor-pointer text-white px-7 py-3 rounded-full text-sm font-bold hover:bg-black transition">Join →</button></Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default about
