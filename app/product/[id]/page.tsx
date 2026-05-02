import { notFound } from "next/navigation";
import { getProductsFromSheet } from "@/lib/sheets";
import { products as staticProducts } from "@/lib/data";
import ProductClient from "./ProductClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const sheetProducts = await getProductsFromSheet();
  const allProducts =
    sheetProducts && sheetProducts.length > 0 ? sheetProducts : staticProducts;

  const product = allProducts.find((p) => p.id === id);

  if (!product) notFound();

  return <ProductClient product={product} allProducts={allProducts} />;
}
