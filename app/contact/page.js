import React from 'react'

const contact = () => {
  return (
   <div className="w-full bg-[#f8fafc] min-h-screen">

      {/* 1. HEADER */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="bg-[#eef5ff] text-[#2563eb] text-[11px] font-bold px-3 py-1 rounded-full tracking-widest">GET IN TOUCH</span>
            <h1 className="text-4xl md:text-5xl font-black text-[#0f1e3d] mt-4 leading-[0.9]">
              We Love To Hear<br/>
              <span className="text-[#2563eb]">From You.</span>
            </h1>
            <p className="text-slate-500 text-sm mt-5 max-w-md leading-6">
             Have a question? Need to track your order? Or just want to say hello? We reply within 2 hours.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex gap-4 items-center">
                <div className="w-11 h-11 rounded-full bg-[#0f1e3d] text-white flex items-center justify-center">✉</div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 tracking-widest">EMAIL US</p>
                  <p className="text-sm font-bold text-[#0f1e3d]">support@shopnest.pk</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-11 h-11 rounded-full bg-[#eef5ff] text-[#2563eb] flex items-center justify-center">☎</div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 tracking-widest">CALL / WHATSAPP</p>
                  <p className="text-sm font-bold text-[#0f1e3d]">+92 300 1234567 (10AM - 10PM)</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center">📍</div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 tracking-widest">BASED IN</p>
                  <p className="text-sm font-bold text-[#0f1e3d]">Karachi, Pakistan - Delivering Nationwide</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. FORM */}
          <div className="bg-white rounded-[28px] border border-slate-100 shadow-[0_20px_60px_rgba(15,30,61,0.08)] p-8">
            <h3 className="font-black text-[#0f1e3d] text-xl">Send a Message</h3>
            <p className="text-xs text-slate-400 mt-1">Fill the form, we will reply in 2 hours.</p>

            <form className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-[#0f1e3d] tracking-widest">FIRST NAME</label>
                  <input placeholder="First Name" className="mt-2 w-full bg-[#f8fafc] border border-slate-200 rounded-full px-5 py-3 text-sm outline-none focus:border-[#2563eb] focus:bg-white transition" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#0f1e3d] tracking-widest">LAST NAME</label>
                  <input placeholder="Last Name" className="mt-2 w-full bg-[#f8fafc] border border-slate-200 rounded-full px-5 py-3 text-sm outline-none focus:border-[#2563eb] focus:bg-white transition" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0f1e3d] tracking-widest">EMAIL</label>
                <input type="email" placeholder="Email" className="mt-2 w-full bg-[#f8fafc] border border-slate-200 rounded-full px-5 py-3 text-sm outline-none focus:border-[#2563eb] focus:bg-white transition" />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0f1e3d] tracking-widest">WHAT IS THIS ABOUT?</label>
                <select className="mt-2 w-full bg-[#f8fafc] border border-slate-200 rounded-full px-5 py-3  text-sm outline-none focus:border-[#2563eb] focus:bg-white transition">
                  <option>Order Issue</option>
                  <option>Return / Exchange</option>
                  <option>Product Inquiry</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#0f1e3d] tracking-widest">MESSAGE</label>
                <textarea rows={4} placeholder="Write your message here..." className="mt-2 w-full bg-[#f8fafc] border border-slate-200 rounded-[20px] px-5 py-3 text-sm outline-none focus:border-[#2563eb] focus:bg-white transition resize-none"></textarea>
              </div>

              <button type="submit" className="w-full bg-[#0f1e3d] text-white rounded-full py-4 font-bold text-sm hover:bg-black transition">
                Send Message →
              </button>

              <p className="text-[11px] text-center text-slate-400">We usually reply within 2 hours (10AM - 10PM)</p>
            </form>
          </div>
        </div>
      </div>

      {/* 3. FAQ MINI */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-100 rounded-[20px] p-6">
          <h4 className="font-bold text-[#0f1e3d] text-sm">Delivery kitne din me?</h4>
          <p className="text-xs text-slate-500 mt-2 leading-5">Karachi me 24 hours, Lahore/Islamabad 2 days, other cities 2-3 days.</p>
        </div>
        <div className="bg-white border border-slate-100 rounded-[20px] p-6">
          <h4 className="font-bold text-[#0f1e3d] text-sm">Return Policy?</h4>
          <p className="text-xs text-slate-500 mt-2 leading-5">7 days easy return. Product pehna hua na ho, tag laga ho.</p>
        </div>
        <div className="bg-[#0f1e3d] rounded-[20px] p-6 text-white">
          <h4 className="font-bold text-sm">WhatsApp Fast Support</h4>
          <p className="text-xs text-white/60 mt-2 leading-5">Sab se fast reply WhatsApp pe milta hai. Button dabao.</p>
          <button className="mt-4 bg-white text-[#0f1e3d] px-5 py-2 rounded-full text-xs font-bold">Chat on WhatsApp</button>
        </div>
      </div>

    </div>
  )
}

export default contact
