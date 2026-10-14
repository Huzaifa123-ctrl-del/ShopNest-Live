# ShopNest fixes and setup

## What changed
- Cart storage now saves only slug, quantity, and selected options. On refresh, product name, image, and displayed price are reloaded from the product API.
- Checkout requires a valid login token, validates cart quantities/address, calculates totals from MongoDB prices, checks stock, saves a database order, and decrements stock with rollback on failure.
- `/order` now loads the logged-in user's orders from MongoDB through `/api/orders` instead of looking for fake/localStorage orders.
- Checkout, order history, and order confirmation layouts have been refreshed to match the ShopNest navy/blue visual style.
- Product add/update endpoints and admin order listing require a database user with the `admin` role.
- JWT signing and MongoDB URI now use environment variables.

## Setup
1. In the project root, copy `.env.example` to `.env.local`.
2. Set `MONGODB_URI` to your MongoDB connection string.
3. Generate a secret with:
   `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
4. Put the generated value after `JWT_SECRET=` in `.env.local`. Do not upload `.env.local` to GitHub.
5. Restart the dev server: stop it with Ctrl+C, then run `npm run dev`.
6. Log out and log in again so the browser gets a token signed with the new secret.

## Make your account an admin
New accounts default to `role: "user"`. To use the admin-only endpoints, update your own user document in MongoDB Compass and set `role` to `"admin"`. Never accept a role value from the public signup form.

## Notes
- The checkout currently records an order as `Pending`; it does not integrate a payment gateway.
- Existing orders created before this update may not have item snapshots, but new orders will.
- Do not trust any price stored in the browser. The browser may always be modified by its owner; checkout uses MongoDB prices for the saved order total.
