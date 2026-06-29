import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const sku = `AIJ-${Date.now()}`;

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          organization_id: null,
          name: body.name,
          sku,
          barcode: body.barcode,
          category: body.category,
          metal: body.metal,
          purity: body.purity,
          gross_weight: body.gross_weight,
          net_weight: body.net_weight,
          quantity: body.quantity,
          unit: body.unit || "Piece",
          purchase_price: body.purchase_price,
          making_charges: body.making_charges,
          selling_price: body.selling_price,
          status: "Active",
        },
      ])
      .select();

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}