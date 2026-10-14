"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function forget  ()  {
  
    
      const router = useRouter();
      const [form, setForm] = useState({ email: "",});
      const [popup, setPopup] = useState({ show: false, message: "", type: "" });
    
      const showPopup = (message, type = "error") => {
        setPopup({ show: true, message, type });
        setTimeout(() => setPopup({ show: false, message: "", type: "" }), 3000);
      };
    
      const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value });
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.email) {
          showPopup("Please enter your email ", "error");
          return;
        }
        // Yahan tum apni /api/login call lagaoge
        showPopup("Password Change successfully!", "success");
        setTimeout(() => router.push("/"), 1200);
      };
    
      return (
        <div className="min-h-[85vh] flex items-center justify-center px-6 py-10 relative">
          {popup.show && (
            <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 rounded-full font-bold text-sm shadow-xl ${popup.type === "success"? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
              {popup.type === "success"? "✅ " : "⚠️ "}{popup.message}
            </div>
          )}
    
          <div className="w-full max-w-md bg-white border border-slate-100 rounded-[24px] p-8 shadow-sm">
            <h1 className="text-3xl font-black text-[#0f1e3d]">Forget Password</h1>
            <p className="text-sm text-slate-400 mt-2">Change your Password</p>
    
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500">Email *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@example.com" className="mt-1 w-full h-12 px-5 rounded-full border-2 border-slate-200 outline-none focus:border-[#0f1e3d]" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500">Password *</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" className="mt-1 w-full h-12 px-5 rounded-full border-2 border-slate-200 outline-none focus:border-[#0f1e3d]" />
              </div>
              <div>
               <label className="text-xs font-bold text-slate-500">Confirm Password *</label>
                <input type="password" name="cpassword" value={form.password} onChange={handleChange} placeholder="Confirm Password" className="mt-1 w-full h-12 px-5 rounded-full border-2 border-slate-200 outline-none focus:border-[#0f1e3d]" />
              </div>
    
              <button type="submit" className="w-full h-12 mt-2 bg-[#0f1e3d] text-white rounded-full font-bold hover:bg-black transition">
              Change Password
              </button>
            </form>
    
            <p className="text-sm text-center mt-6 text-slate-500">
              Don't have an account? <Link href="/signup" className="font-bold text-[#0f1e3d] underline">Sign up</Link>
            </p>
          </div>
          {/* ACCOUNT WITH DROPDOWN */}
    
        </div>
      );
    

}


