// Usage: node --env-file=.env.local scripts/make-admin.js you@example.com
// Run it AFTER you have signed up on the site with that email.
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;
const email = (process.argv[2] || "").toLowerCase().trim();
if (!uri || !email) { console.error("Usage: node --env-file=.env.local scripts/make-admin.js <email>"); process.exit(1); }

(async () => {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  const res = await mongoose.connection.collection("users").updateOne({ email }, { $set: { role: "admin" } });
  console.log(res.matchedCount ? `${email} is now an admin.` : `No user found with email ${email}. Sign up first.`);
  await mongoose.disconnect();
})().catch((e) => { console.error("Failed:", e.message); process.exit(1); });
