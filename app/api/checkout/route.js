import connectDb from "@/middleware/mongoose";
import Product from "@/models/Products";
import Order from "@/models/Order";
import { getAuthenticatedUser } from "@/lib/auth";

export async function POST(req) {
  let reserved = [];
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return Response.json({ success: false, error: "Please log in again to place your order" }, { status: 401 });

    const body = await req.json();
    const cart = body.cart;
    const address = typeof body.address === "string" ? body.address.trim() : "";

    if (address.length < 8 || address.length > 500) {
      return Response.json({ success: false, error: "Please enter a valid delivery address (8–500 characters)" }, { status: 400 });
    }
    if (!cart || typeof cart !== "object" || Array.isArray(cart) || Object.keys(cart).length === 0) {
      return Response.json({ success: false, error: "Your cart is empty" }, { status: 400 });
    }
    if (Object.keys(cart).length > 50) {
      return Response.json({ success: false, error: "Too many different products in cart" }, { status: 400 });
    }

    await connectDb();
    const orderProducts = [];
    let amount = 0;

    // All prices and product details come from MongoDB, never from localStorage.
    for (const [slug, item] of Object.entries(cart)) {
      if (!/^[a-zA-Z0-9_-]{1,150}$/.test(slug) || !item || !Number.isInteger(item.qty) || item.qty < 1 || item.qty > 100) {
        return Response.json({ success: false, error: "Invalid product or quantity in cart" }, { status: 400 });
      }
      const product = await Product.findOne({ slug });
      if (!product) return Response.json({ success: false, error: `Product not found: ${slug}` }, { status: 400 });
      if (!Number.isFinite(product.price) || product.price < 0) {
        return Response.json({ success: false, error: `Invalid database price for ${product.title}` }, { status: 500 });
      }
      if (product.availableQty < item.qty) {
        return Response.json({ success: false, error: `${product.title} does not have enough stock` }, { status: 400 });
      }
      amount += product.price * item.qty;
      orderProducts.push({
        productId: product._id.toString(),
        quantity: item.qty,
        slug: product.slug,
        title: product.title,
        img: product.img,
        price: product.price,
        size: typeof item.size === "string" ? item.size.slice(0, 30) : "",
        variant: typeof item.variant === "string" ? item.variant.slice(0, 50) : (product.color || ""),
      });
    }

    // Reserve stock atomically per product; restore prior reservations if any step fails.
    for (const item of orderProducts) {
      const updated = await Product.findOneAndUpdate(
        { _id: item.productId, availableQty: { $gte: item.quantity } },
        { $inc: { availableQty: -item.quantity } },
        { new: true }
      );
      if (!updated) throw new Error(`Stock changed while ordering ${item.title}. Please try again.`);
      reserved.push({ productId: item.productId, quantity: item.quantity });
    }

    const order = await Order.create({
      userId: user._id.toString(),
      products: orderProducts,
      address,
      amount,
      status: "Pending",
    });

    return Response.json({ success: true, orderId: order._id.toString(), amount, status: order.status }, { status: 201 });
  } catch (error) {
    for (const item of reserved) {
      try {
        await Product.updateOne({ _id: item.productId }, { $inc: { availableQty: item.quantity } });
      } catch (rollbackError) {
        console.error("STOCK ROLLBACK ERROR:", rollbackError);
      }
    }
    console.error("CHECKOUT ERROR:", error);
    return Response.json({ success: false, error: error.message?.startsWith("Stock changed") ? error.message : "We could not place your order. Please try again." }, { status: 500 });
  }
}
