"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "@/app/context/CartContext";
import Popup from "@/components/Popup";

export default function SlugPage() {
  const router = useRouter();
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [pin, setPin] = useState("");
  const [service, setService] = useState(null);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  const showPopup = (message, type = "info") => {
    setPopup({ show: true, message, type });
    setTimeout(() => setPopup({ show: false, message: "", type: "" }), 2500);
  };

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/getProduct?slug=${encodeURIComponent(slug)}`, { cache: "no-store" })
      .then(r => r.json())
      .then(d => {
        if (d.product) {
          setProduct(d.product);
          setSize(d.product.size || "M");
        } else {
          setProduct(false);
        }
      })
      .catch(() => setProduct(false));
  }, [slug]);

  const checkService = async () => {
    let res = await fetch("/api/pincode");
    let pins = await res.json();
    setService(pins.includes(parseInt(pin)));
  };

  const handleAddToCart = () => {
    let token = localStorage.getItem("shopnest_token")
    if(!token){
      showPopup("Please login first to buy!", "error")
      setTimeout(()=> router.push("/login"), 1000)
      return
    }
    if(!size){
      showPopup("Please select size first!", "error")
      return
    }
    addToCart(product.slug, qty, product.price, product.title, size, product.color, product.img)
    showPopup("Added to cart!", "success")
    setTimeout(()=> router.push("/checkout"), 800)
  }

  if (product === null) return <div className="p-20 text-center font-bold">Loading...</div>;
  if (product === false) return <div className="p-20 text-center font-bold">Product not found</div>;

  const sizes = ["S", "M", "L", "XL"];

  return (
    <>
      <Popup show={popup.show} message={popup.message} type={popup.type} />
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
        <div className="bg-[#f8fafc] rounded-[24px] p-4 flex items-center justify-center h-[500px] overflow-hidden">
          <img src={product.img} alt={product.title} className="w-full h-full object-cover rounded-[20px]" />
        </div>

        <div>
          <p className="text-[11px] tracking-widest font-bold text-slate-400 uppercase">{product.category}</p>
          <h1 className="text-3xl font-black text-[#0f1e3d] mt-2">{product.title}</h1>
          <p className="text-slate-500 text-sm mt-3">{product.desc}</p>

          <div className="flex items-center gap-3 mt-6">
            <span className="text-2xl font-black">Rs. {product.price}</span>
            <span className="text-sm line-through text-slate-400">Rs. {product.price + 500}</span>
          </div>

          <div className="mt-8">
            <p className="text-sm font-bold mb-3">Size: {size && <span className="text-[#2563eb]">{size}</span>}</p>
            <div className="flex gap-2">
              {sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`w-10 h-10 rounded-full border font-bold text-sm transition ${size === s ? 'bg-black text-white border-black' : 'border-slate-200 hover:bg-black hover:text-white'}`}>{s}</button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">{product.availableQty > 0 ? `${product.availableQty} in stock` : "Currently out of stock"}</p>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <div className="flex items-center gap-2 border border-slate-200 rounded-full px-2 py-1.5">
              <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)} className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">-</button>
              <span className="font-bold w-6 text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">+</button>
            </div>
            <button
              disabled={!size || product.availableQty <= 0}
              onClick={handleAddToCart}
              className="flex-1 cursor-pointer bg-[#0f1e3d] text-white h-11 rounded-full font-bold text-sm hover:bg-black transition disabled:bg-slate-200 disabled:text-slate-400"
            >
              {product.availableQty <= 0 ? "Out of Stock" : size ? `Add to Cart - Rs. ${product.price * qty}` : "Select Size First"}
            </button>
          </div>

          <div className="mt-6 flex gap-2">
            <input value={pin} onChange={(e) => setPin(e.target.value)} placeholder="Enter Pincode" className="border-2 border-slate-300 rounded-full px-4 h-11 w-full outline-none" />
            <button onClick={checkService} className="bg-[#0f1e3d] text-white h-11 px-6 rounded-full">Check</button>
          </div>
          {service === false && <p className="text-red-600 text-sm mt-2">Sorry! Your PinCode is Wrong</p>}
          {service === true && <p className="text-green-600 text-sm mt-2">Yay! This PinCode is Servicable</p>}
        </div>
      </div>
    </>
  );
}