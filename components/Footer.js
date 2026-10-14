import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
     <footer className="w-full bg-[#0f1e3d] text-slate-300 border-t border-[#1e3a6e]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="logo mx-5">
              <Image src="/logo.png" height={40} width={120} alt='logo' className='rounded-md'/>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Premium quality products at best prices. Your trusted e-commerce destination.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-5">Shop</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/products" className="hover:text-white">All Products</Link></li>
              <li><Link href="/t-shirts" className="hover:text-white">T-Shirts</Link></li>
              <li><Link href="/hoodies" className="hover:text-white">Hoodies</Link></li>
              <li><Link href="/gymproducts" className="hover:text-white">Gym Products</Link></li>
              <li><Link href="/mugs" className="hover:text-white">Mugs</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-5">Support</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Get 10% Off</h3>
            <p className="text-sm text-slate-400 mb-4">Subscribe and get discount on first order.</p>
            <div className="flex rounded-full overflow-hidden bg-[#162a50] p-1 border border-[#1e3a6e]">
              <input type="email" placeholder="Your email" className="flex-1 bg-[#162a50] text-sm text-white outline-none px-3" />
              <button className="bg-[#2563eb] text-white px-6 py-2 rounded-full text-sm font-semibold">Join</button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#1e293b] flex justify-between text-[13px] text-slate-500">
          <p>© 2026 ShopNest. All rights reserved.</p>
          <p>Built with ♥ in Pakistan</p>
        </div>
      </div>
    </footer>
  )
}
export default Footer