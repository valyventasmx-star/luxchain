import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET() {
  const SHEET_ID = process.env.GOOGLE_SHEET_ID;
  const SERVICE_ACCOUNT_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!SHEET_ID || !SERVICE_ACCOUNT_KEY) {
    return NextResponse.json({ error: "Missing env vars", SHEET_ID: !!SHEET_ID, KEY: !!SERVICE_ACCOUNT_KEY });
  }

  try {
    const credentials = JSON.parse(SERVICE_ACCOUNT_KEY);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "Inventory!A1:A3",
    });
    return NextResponse.json({ 
      ok: true, 
      email: credentials.client_email,
      rows: res.data.values?.length ?? 0,
      sample: res.data.values
    });
  } catch (err: unknown) {
    return NextResponse.json({ error: String(err), message: (err as Error).message });
  }
}
