
"use client";

import { useState } from "react";

const initialProduct = {
  slug: "",
  title: "",
  desc: "",
  img: "",
  category: "",
  price: "",
  availableQty: "1",
  size: "",
  color: "",
};

export default function AdminPage() {
  const [product, setProduct] = useState(initialProduct);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title"
        ? {
            slug: value
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, ""),
          }
        : {}),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const response = await fetch("/api/addProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...product,
          price: Number(product.price),
          availableQty: Number(product.availableQty),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          setMessage("Access denied. Sirf admin product add kar sakta hai.");
        } else {
          setMessage(data.error || data.message || "Could not add the product.");
        }
        return;
      }

      setSuccess(true);
      setMessage("Product successfully add ho gaya!");
      setProduct(initialProduct);
    } catch (error) {
      setMessage("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black";

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          ShopNest Admin
        </h1>

        <p className="mb-6 text-gray-500">
          Add a new product to your store.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block font-medium">Product Title</label>
            <input
              name="title"
              value={product.title}
              onChange={handleChange}
              placeholder="Enter product title"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Product Slug</label>
            <input
              name="slug"
              value={product.slug}
              onChange={handleChange}
              placeholder="product-name"
              required
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Price (PKR)</label>
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Available Quantity</label>
            <input
              name="availableQty"
              type="number"
              min="0"
              step="1"
              value={product.availableQty}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Category</label>
            <input
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="e.g. Electronics"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Image URL</label>
            <input
              name="img"
              type="url"
              value={product.img}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Description</label>
            <textarea
              name="desc"
              value={product.desc}
              onChange={handleChange}
              placeholder="Describe your product"
              required
              rows={4}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Size (Optional)</label>
            <input
              name="size"
              value={product.size}
              onChange={handleChange}
              placeholder="e.g. M, L, XL"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Color (Optional)</label>
            <input
              name="color"
              value={product.color}
              onChange={handleChange}
              placeholder="e.g. Black"
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black p-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>

          {message && (
            <p
              role="status"
              className={`rounded-lg p-3 text-sm ${
                success
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
