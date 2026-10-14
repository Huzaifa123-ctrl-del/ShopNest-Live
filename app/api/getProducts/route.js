import Product from "@/models/Products";
import connectDb from "@/middleware/mongoose";

// Always read fresh data from the database (never cache at build time).
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, max-age=0" };

export async function GET() {
  try {
    await connectDb();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    return Response.json({ products }, { headers: NO_STORE });
  } catch (error) {
    console.error("GET /api/getProducts ERROR:", error);
    return Response.json(
      { products: [], error: "Could not load products" },
      { status: 500, headers: NO_STORE }
    );
  }
}
