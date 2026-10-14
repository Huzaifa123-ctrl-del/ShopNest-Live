"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  const showPopup = (message, type = "error") => {
    setPopup({ show: true, message, type });
    setTimeout(() => setPopup({ show: false, message: "", type: "" }), 3000);
  };

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name ||!form.email ||!form.password) {
      showPopup("Please fill all fields", "error"); return;
    }
    if (form.password.length < 6) {
      showPopup("Password must be at least 6 characters", "error"); return;
    }

    let res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
    let data = await res.json()
    if(data.success){
      showPopup("Account created successfully!", "success");
      setTimeout(() => router.push("/login"), 1500);
    } else {
      showPopup(data.error || "Signup failed", "error");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-10 relative">
      {popup.show && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 rounded-full font-bold text-sm shadow-xl ${popup.type === "success"? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
          {popup.type === "success"? "✅ " : "⚠️ "}{popup.message}
        </div>
      )}
      <div className="w-full max-w-md bg-white border border-slate-100 rounded-[24px] p-8 shadow-sm">
        <h1 className="text-3xl font-black text-[#0f1e3d]">Create Account</h1>
        <p className="text-sm text-slate-400 mt-2">Join ShopNest today</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500">Full Name *</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" className="mt-1 w-full h-12 px-5 rounded-full border-2 border-slate-200 outline-none focus:border-[#0f1e3d]" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500">Email *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@example.com" className="mt-1 w-full h-12 px-5 rounded-full border-2 border-slate-200 outline-none focus:border-[#0f1e3d]" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500">Password *</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" className="mt-1 w-full h-12 px-5 rounded-full border-2 border-slate-200 outline-none focus:border-[#0f1e3d]" />
          </div>
          <button type="submit" className="w-full h-12 mt-2 bg-[#0f1e3d] text-white rounded-full font-bold hover:bg-black transition">Sign Up</button>
        </form>
        <p className="text-sm text-center mt-6 text-slate-500">Already have an account? <Link href="/login" className="font-bold text-[#0f1e3d] underline">Login</Link></p>
      </div>
    </div>
  );
}