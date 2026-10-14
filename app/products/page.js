import CategoryPage from "@/components/CategoryPage";

export const metadata = { title: "All Products | ShopNest" };

export default function Page() {
  return (
    <CategoryPage
      title="All Products"
      kicker="The full collection"
      blurb="Browse everything ShopNest has to offer in one place."
      keywords={[]}
    />
  );
}
