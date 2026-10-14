import connectDb from "@/middleware/mongoose";
import Order from "@/models/Order";
import { getAuthenticatedUser } from "@/lib/auth";

export async function GET(req) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return Response.json({ success: false, error: "Please log in to view your orders" }, { status: 401 });
    await connectDb();
    const orders = await Order.find({ userId: user._id.toString() }).sort({ createdAt: -1 }).lean();
    return Response.json({ success: true, orders });
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);
    return Response.json({ success: false, error: "Unable to load orders" }, { status: 500 });
  }
}
