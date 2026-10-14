export async function GET(request) {
  try {
    // Yahan apne sare serviceable pincodes daal do
    return Response.json([126861, 234556, 123456, 298765, 400001, 110001], { status: 200 });
  } catch (error) {
    return Response.json({ error: "No Pincodes Found" }, { status: 404 });
  }
} 