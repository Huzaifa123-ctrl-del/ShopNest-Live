
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDb from "@/middleware/mongoose";
import User from "@/models/User";

async function verifyAdminToken(token) {
  try {
    const secret = process.env.JWT_SECRET;

    if (!secret || !token) return null;

    const payload = jwt.verify(token, secret);

    if (
      typeof payload !== "object" ||
      !payload.sub
    ) {
      return null;
    }

    await connectDb();

   const user = await User.findById(payload.sub).select(
  "_id name email role"
);

if (!user || user.role !== "admin") {
  return null;
}

    return user;
  } catch {
    return null;
  }
}

export async function getAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return verifyAdminToken(token);
}

export async function getAuthenticatedUser(req) {
  const cookieHeader = req.headers.get("cookie") || "";

  const token = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("token="))
    ?.slice("token=".length);

  if (!token) return null;

  return verifyAdminToken(decodeURIComponent(token));
}
