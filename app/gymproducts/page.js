import CategoryPage from "@/components/CategoryPage";

export const metadata = { title: "Gym Products | ShopNest" };

export default function Page() {
  return (
    <CategoryPage
      title="Gym Products"
      kicker="Train harder"
      blurb="Shakers, bottles and gym essentials built for daily use."
      keywords={["gym"]}
    />
  );
}
