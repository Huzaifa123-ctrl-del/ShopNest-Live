// Usage: node --env-file=.env.local scripts/seed.js
// Adds sample products to the database in MONGODB_URI (skips slugs that already exist).
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;
if (!uri) { console.error("MONGODB_URI is missing"); process.exit(1); }

const Product = mongoose.models.Product || mongoose.model("Product", new mongoose.Schema({
  title: String, slug: { type: String, unique: true }, desc: String, img: String,
  category: String, size: String, price: Number, color: String, availableQty: Number,
}, { timestamps: true }));

const u = (id) => `https://images.unsplash.com/${id}?w=800&q=80`;
const items = [
  { title: "Classic Cotton T-Shirt", slug: "classic-cotton-tshirt-black", desc: "Soft 220GSM combed cotton tee with a relaxed everyday fit.", img: u("photo-1521572163474-6864f9cf17ab"), category: "tshirts", size: "M", price: 1499, color: "Black", availableQty: 40 },
  { title: "Oversized Graphic Tee", slug: "oversized-graphic-tee-white", desc: "Drop-shoulder oversized tee, pre-shrunk and colour-fast.", img: u("photo-1583743814966-8936f5b7be1a"), category: "tshirts", size: "L", price: 1799, color: "White", availableQty: 25 },
  { title: "400GSM Pullover Hoodie", slug: "pullover-hoodie-navy", desc: "Heavy fleece-lined pullover hoodie that keeps its colour wash after wash.", img: u("photo-1556821840-3a63f95609a7"), category: "hoodies", size: "L", price: 3999, color: "Navy", availableQty: 30 },
  { title: "Zipper Hoodie", slug: "zipper-hoodie-grey", desc: "Full-zip hoodie with inside fleece and kangaroo pockets.", img: u("photo-1578768079052-aa76e52ff62e"), category: "hoodies", size: "M", price: 4299, color: "Grey", availableQty: 18 },
  { title: "Ceramic Coffee Mug", slug: "ceramic-coffee-mug-white", desc: "350ml glossy ceramic mug, dishwasher and microwave safe.", img: u("photo-1514228742587-6b1558fcca3d"), category: "mugs", size: "350ml", price: 899, color: "White", availableQty: 60 },
  { title: "Gym Shaker Bottle", slug: "gym-shaker-bottle-black", desc: "700ml leak-proof shaker with mixing ball.", img: u("photo-1594381898411-846e7d193883"), category: "gymproducts", size: "700ml", price: 1299, color: "Black", availableQty: 35 },
];

(async () => {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  let added = 0;
  for (const it of items) {
    if (!(await Product.exists({ slug: it.slug }))) { await Product.create(it); added++; }
  }
  console.log(`Done. ${added} product(s) added, ${items.length - added} already existed.`);
  await mongoose.disconnect();
})().catch((e) => { console.error("Seed failed:", e.message); process.exit(1); });
