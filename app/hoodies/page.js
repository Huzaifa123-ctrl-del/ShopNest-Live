import CategoryPage from "@/components/CategoryPage";

export const metadata = { title: "Hoodies | ShopNest" };

export default function Page() {
  return (
    <CategoryPage
      title="Hoodies"
      kicker="Winter collection"
      blurb="400GSM heavy fleece, warm inside, no colour fade after washing."
      keywords={["hoodie"]}
    />
  );
}
