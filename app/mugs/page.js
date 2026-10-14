import CategoryPage from "@/components/CategoryPage";

export const metadata = { title: "Mugs | ShopNest" };

export default function Page() {
  return (
    <CategoryPage
      title="Mugs"
      kicker="Home & office"
      blurb="Glossy ceramic mugs that are dishwasher and microwave safe."
      keywords={["mug"]}
    />
  );
}
