import { NextResponse } from "next/server";
import { getProductsFromSheet } from "@/lib/sheets";
import { products as staticProducts } from "@/lib/data";

export const revalidate = 60; // ISR — refresh every 60 seconds

export async function GET() {
  const sheetProducts = await getProductsFromSheet();
  const data = sheetProducts && sheetProducts.length > 0 ? sheetProducts : staticProducts;
  return NextResponse.json(data);
}
