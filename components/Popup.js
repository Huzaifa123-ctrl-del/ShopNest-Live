"use client"
export default function Popup({ show, message, type }) {
  if (!show) return null
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999]">
      <div className={`px-6 py-3 rounded-full font-bold text-sm shadow-xl flex items-center gap-2
        ${type === "success"? "bg-[#0f1e3d] text-white" : "bg-red-600 text-white"}`}>
        <span>{type === "success"? "✅" : "⚠️"}</span> {message}
      </div>
    </div>
  )
}