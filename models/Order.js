import mongoose from "mongoose";

const OrderProductSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  slug: { type: String, default: "" },
  title: { type: String, default: "Product" },
  img: { type: String, default: "" },
  price: { type: Number, required: true, min: 0 },
  size: { type: String, default: "" },
  variant: { type: String, default: "" },
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  products: { type: [OrderProductSchema], required: true },
  address: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"], default: "Pending", required: true },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
