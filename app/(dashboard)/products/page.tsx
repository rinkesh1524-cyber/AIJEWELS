"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductsPage() {
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Products
        </h1>

        <Link href="/products/add">
          <Button>Add Product</Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-6">

          <div className="text-center py-16">

            <h2 className="text-2xl font-semibold">
              No Products Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Start by adding your first jewellery product.
            </p>

            <Link href="/products/add">
              <Button className="mt-6">
                Add First Product
              </Button>
            </Link>

          </div>

        </CardContent>
      </Card>

    </div>
  );
}