import connectDb from "@/middleware/mongoose";
import Order from "@/models/Order";
import { getAuthenticatedUser } from "@/lib/auth";

export async function GET(req) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user || user.role !== "admin") {
      return Response.json({ success: false, error: "Admin access required" }, { status: 403 });
    }
    await connectDb();
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
    return Response.json({ success: true, orders });
  } catch (error) {
    console.error("ADMIN ORDERS ERROR:", error);
    return Response.json({ success: false, error: "Unable to load orders" }, { status: 500 });
  }
}
