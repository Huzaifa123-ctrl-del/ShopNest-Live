import connectDb from "@/middleware/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!name || !email || password.length < 8) {
      return Response.json({ success: false, error: "Name, valid email, and a password of at least 8 characters are required" }, { status: 400 });
    }

    await connectDb();
    if (await User.findOne({ email })) {
      return Response.json({ success: false, error: "An account with this email already exists" }, { status: 409 });
    }

    const user = await User.create({ name, email, password: await bcrypt.hash(password, 10), role: "user" });
    return Response.json({ success: true, message: "User created", userId: user._id.toString() }, { status: 201 });
  } catch (error) {
    if (error?.code === 11000) return Response.json({ success: false, error: "An account with this email already exists" }, { status: 409 });
    console.error("SIGNUP ERROR:", error);
    return Response.json({ success: false, error: "Unable to create account" }, { status: 500 });
  }
}
