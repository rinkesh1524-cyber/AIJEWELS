"use client";

import { useState } from "react";
import { createProduct, updateProduct } from "@/lib/products";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface ProductFormProps {
  mode?: "create" | "edit";
  initialData?: {
    id?: string;
    name: string;
    category: string;
    metal: string;
    purity: string;
    quantity: number;
    gross_weight: number;
    net_weight: number;
    purchase_price: number;
    making_charges: number;
    selling_price: number;
  };
}
export default function ProductForm({
  mode = "create",
  initialData,
}: ProductFormProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
  name: initialData?.name ?? "",
  category: initialData?.category ?? "",
  metal: initialData?.metal ?? "",
  purity: initialData?.purity ?? "",
  quantity: initialData?.quantity ?? 0,
  gross_weight: String(initialData?.gross_weight ?? ""),
  net_weight: String(initialData?.net_weight ?? ""),
  purchase_price: String(initialData?.purchase_price ?? ""),
  making_charges: String(initialData?.making_charges ?? ""),
  selling_price: String(initialData?.selling_price ?? ""),
});

  async function handleSave() {
    if (!form.name.trim()) {
      alert("Please enter a product name.");
      return;
    }

    try {
      setLoading(true);

      const productData = {
  name: form.name,
  category: form.category,
  metal: form.metal,
  purity: form.purity,
  quantity: form.quantity,
  gross_weight: Number(form.gross_weight) || 0,
  net_weight: Number(form.net_weight) || 0,
  purchase_price: Number(form.purchase_price) || 0,
  making_charges: Number(form.making_charges) || 0,
  selling_price: Number(form.selling_price) || 0,
};

if (mode === "edit" && initialData?.id) {
  await updateProduct(initialData.id, productData);
} else {
  await createProduct(productData);
}

      alert(
  mode === "edit"
    ? "✅ Product updated successfully!"
    : "✅ Product saved successfully!"
);

      setForm({
        name: "",
        category: "",
        metal: "",
        purity: "",
        quantity: 0,
        gross_weight: "",
        net_weight: "",
        purchase_price: "",
        making_charges: "",
        selling_price: "",
      });
    } catch (error) {
      console.error(error);
      alert("❌ Failed to save product.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl">
          Add New Product
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">

        <div>
          <Label>Product Name</Label>
          <Input
            placeholder="Silver Ring 925"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <Label>Category</Label>
            <Input
              placeholder="Ring"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Metal</Label>
            <Input
              placeholder="Silver"
              value={form.metal}
              onChange={(e) =>
                setForm({ ...form, metal: e.target.value })
              }
            />
          </div>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <Label>Purity</Label>
            <Input
              placeholder="925"
              value={form.purity}
              onChange={(e) =>
                setForm({ ...form, purity: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Quantity</Label>
            <Input
              type="number"
              value={form.quantity}
              onChange={(e) =>
                setForm({
                  ...form,
                  quantity: Number(e.target.value),
                })
              }
            />
          </div>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <Label>Gross Weight</Label>
            <Input
              placeholder="grams"
              value={form.gross_weight}
              onChange={(e) =>
                setForm({
                  ...form,
                  gross_weight: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Net Weight</Label>
            <Input
              placeholder="grams"
              value={form.net_weight}
              onChange={(e) =>
                setForm({
                  ...form,
                  net_weight: e.target.value,
                })
              }
            />
          </div>

        </div>

        <div className="grid grid-cols-3 gap-6">

          <div>
            <Label>Purchase Price</Label>
            <Input
              value={form.purchase_price}
              onChange={(e) =>
                setForm({
                  ...form,
                  purchase_price: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Making Charges</Label>
            <Input
              value={form.making_charges}
              onChange={(e) =>
                setForm({
                  ...form,
                  making_charges: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Selling Price</Label>
            <Input
              value={form.selling_price}
              onChange={(e) =>
                setForm({
                  ...form,
                  selling_price: e.target.value,
                })
              }
            />
          </div>

        </div>

        <div className="flex justify-end">

          <Button
            size="lg"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Product"}
          </Button>

        </div>

      </CardContent>
    </Card>
  );
}