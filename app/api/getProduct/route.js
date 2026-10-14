import Product from "@/models/Products";
import connectDb from "@/middleware/mongoose";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, max-age=0" };

export async function GET(req) {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (!slug) return Response.json({ product: null }, { status: 400, headers: NO_STORE });
    const product = await Product.findOne({ slug }).lean();
    return Response.json({ product }, { headers: NO_STORE });
  } catch (error) {
    console.error("GET /api/getProduct ERROR:", error);
    return Response.json({ product: null, error: "Could not load product" }, { status: 500, headers: NO_STORE });
  }
}
