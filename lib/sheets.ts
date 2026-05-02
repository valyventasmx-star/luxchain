import { google } from "googleapis";
import type { Product, Category } from "./data";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SERVICE_ACCOUNT_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

const BTC_PRICE = Number(process.env.BTC_PRICE_USD) || 97500;
const ETH_PRICE = Number(process.env.ETH_PRICE_USD) || 3800;

function toCrypto(usd: number) {
  return {
    BTC: parseFloat((usd / BTC_PRICE).toFixed(4)),
    ETH: parseFloat((usd / ETH_PRICE).toFixed(3)),
    USDC: usd,
  };
}

function parseSpecs(raw: string): Record<string, string> {
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    const specs: Record<string, string> = {};
    raw.split("|").forEach(pair => {
      const [k, v] = pair.split(":").map(s => s.trim());
      if (k && v) specs[k] = v;
    });
    return specs;
  }
}

export async function getProductsFromSheet(): Promise<Product[] | null> {
  if (!SHEET_ID || !SERVICE_ACCOUNT_KEY) return null;

  try {
    const credentials = JSON.parse(SERVICE_ACCOUNT_KEY);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "Inventory!A2:P",
    });

    const rows = res.data.values;
    if (!rows || rows.length === 0) return null;

    return rows
      .filter(row => row[0] && row[2])
      .map(row => {
        const [
          id, name, brand, category, price_usd,
          image1, image2, description, location,
          badge, featured, specs_raw,
        ] = row;

        const price = parseFloat(String(price_usd).replace(/[^0-9.]/g, "")) || 0;

        return {
          id: String(id).toLowerCase().replace(/\s+/g, "-"),
          name: String(name),
          brand: String(brand),
          category: String(category).toLowerCase().replace(/\s+/g, "-") as Category,
          price,
          images: [image1, image2].filter(Boolean),
          description: String(description || ""),
          specs: parseSpecs(String(specs_raw || "")),
          cryptoPrices: toCrypto(price),
          location: String(location || ""),
          badge: badge ? String(badge) : undefined,
          featured: String(featured).toLowerCase() === "true" || String(featured) === "1",
        };
      });
  } catch (err) {
    console.error("Google Sheets fetch error:", err);
    return null;
  }
}
