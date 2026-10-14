import CategoryPage from "@/components/CategoryPage";

export const metadata = { title: "T-Shirts | ShopNest" };

export default function Page() {
  return (
    <CategoryPage
      title="T-Shirts"
      kicker="Everyday essentials"
      blurb="Premium cotton tees in relaxed and oversized fits. Soft, durable and colour-fast."
      keywords={["tshirt"]}
    />
  );
}
