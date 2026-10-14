import Product from "@/models/Products";
import connectDb from "@/middleware/mongoose";
import { getAuthenticatedUser } from "@/lib/auth";

export async function PUT(req) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user || user.role !== "admin") return Response.json({ success: false, error: "Admin access required" }, { status: 403 });

    const data = await req.json();
    if (typeof data.slug !== "string" || !data.slug.trim()) {
      return Response.json({ success: false, error: "Product slug is required" }, { status: 400 });
    }

    const allowed = ["title", "desc", "img", "category", "size", "color", "price", "availableQty"];
    const updates = {};
    for (const key of allowed) if (data[key] !== undefined) updates[key] = data[key];
    if (!Object.keys(updates).length) return Response.json({ success: false, error: "No product fields supplied" }, { status: 400 });

    for (const key of ["title", "desc", "img", "category"]) {
      if (key in updates && (typeof updates[key] !== "string" || !updates[key].trim())) {
        return Response.json({ success: false, error: `Invalid ${key}` }, { status: 400 });
      }
    }
    if ("price" in updates && (typeof updates.price !== "number" || !Number.isFinite(updates.price) || updates.price < 0)) {
      return Response.json({ success: false, error: "Invalid price" }, { status: 400 });
    }
    if ("availableQty" in updates && (!Number.isInteger(updates.availableQty) || updates.availableQty < 0)) {
      return Response.json({ success: false, error: "Invalid stock quantity" }, { status: 400 });
    }

    await connectDb();
    const product = await Product.findOneAndUpdate({ slug: data.slug.trim() }, { $set: updates }, { new: true, runValidators: true });
    if (!product) return Response.json({ success: false, error: "Product not found" }, { status: 404 });
    return Response.json({ success: true, product });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    return Response.json({ success: false, error: "Unable to update product" }, { status: 500 });
  }
}
