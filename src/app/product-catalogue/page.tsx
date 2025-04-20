import dynamic from "next/dynamic";

const ProductCatalogue = dynamic(
  () => import("@/app/components/ProductCatalogue"),
  {
    ssr: false,
  }
);

export default function ProductCataloguePage() {
  return <ProductCatalogue />;
}
