"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCustomer, updateCustomer } from "@/lib/customers";


interface CustomerFormProps {
  mode?: "create" | "edit";
  initialData?: {
    id?: string;
    name: string;
    phone: string;
    email?: string;
    address?: string;
    gst_number?: string;
    notes?: string;
  };
}
export default function CustomerForm({
  mode = "create",
  initialData,
}: CustomerFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
  name: initialData?.name ?? "",
  phone: initialData?.phone ?? "",
  email: initialData?.email ?? "",
  address: initialData?.address ?? "",
  gst_number: initialData?.gst_number ?? "",
  notes: initialData?.notes ?? "",
});

  async function handleSave() {
    if (!form.name.trim()) {
      alert("Please enter customer name.");
      return;
    }

    if (!form.phone.trim()) {
      alert("Please enter phone number.");
      return;
    }

    try {
      setLoading(true);

      if (mode === "edit" && initialData?.id) {
  await updateCustomer(initialData.id, form);
} else {
  await createCustomer(form);
}

      alert(
  mode === "edit"
    ? "✅ Customer updated successfully!"
    : "✅ Customer added successfully!"
);

      router.push("/customers");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to save customer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">

      <h1 className="mb-8 text-3xl font-bold">
        {mode === "edit" ? "Edit Customer" : "Add Customer"}
      </h1>

      <div className="space-y-5">

        <input
          placeholder="Customer Name"
          className="w-full rounded-lg border p-3"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Phone Number"
          className="w-full rounded-lg border p-3"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <input
          placeholder="Email"
          className="w-full rounded-lg border p-3"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <textarea
          placeholder="Address"
          className="w-full rounded-lg border p-3"
          rows={3}
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
        />

        <input
          placeholder="GST Number"
          className="w-full rounded-lg border p-3"
          value={form.gst_number}
          onChange={(e) =>
            setForm({
              ...form,
              gst_number: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Notes"
          className="w-full rounded-lg border p-3"
          rows={3}
          value={form.notes}
          onChange={(e) =>
            setForm({ ...form, notes: e.target.value })
          }
        />

        <button
          onClick={handleSave}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
           {mode === "edit" ? "Edit Customer" : "Add Customer"}
        </button>

      </div>
    </div>
  );
}