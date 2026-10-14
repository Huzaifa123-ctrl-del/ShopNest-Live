
import { NextResponse } from "next/server";
import Product from "@/models/Products";
import connectDb from "@/middleware/mongoose";
import { getAuthenticatedUser } from "@/lib/auth";

export async function POST(req) {
  try {
    // 1. Verify admin authentication
    const user = await getAuthenticatedUser(req);

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          error: "Admin access required",
        },
        { status: 403 }
      );
    }

    // 2. Read request body once
    const body = await req.json();

    // 3. Validate required text fields
    const fields = [
      "slug",
      "title",
      "desc",
      "img",
      "category",
    ];

    for (const field of fields) {
      if (
        typeof body[field] !== "string" ||
        !body[field].trim()
      ) {
        return NextResponse.json(
          {
            success: false,
            error: `${field} is required`,
          },
          { status: 400 }
        );
      }
    }

    // 4. Validate price and stock quantity
    if (
      typeof body.price !== "number" ||
      !Number.isFinite(body.price) ||
      body.price < 0 ||
      !Number.isInteger(body.availableQty) ||
      body.availableQty < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Price or stock quantity is invalid",
        },
        { status: 400 }
      );
    }

    // 5. Connect to MongoDB
    await connectDb();

    // 6. Create product
    const product = await Product.create({
      slug: body.slug.trim(),
      title: body.title.trim(),
      desc: body.desc.trim(),
      img: body.img.trim(),
      category: body.category.trim(),
      price: body.price,
      availableQty: body.availableQty,

      ...(typeof body.size === "string"
        ? { size: body.size.trim() }
        : {}),

      ...(typeof body.color === "string"
        ? { color: body.color.trim() }
        : {}),
    });

    // 7. Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Product added successfully",
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error?.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          error: "A product with this slug already exists",
        },
        { status: 409 }
      );
    }

    console.error("ADD PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to add product",
      },
      { status: 500 }
    );
  }
}
