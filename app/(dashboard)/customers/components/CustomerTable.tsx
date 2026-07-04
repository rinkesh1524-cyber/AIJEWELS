"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCustomer } from "@/lib/customers";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  gst_number?: string;
}

export default function CustomerTable({
  customers,
}: {
  customers: Customer[];
}) {
    const router = useRouter();
  const [search, setSearch] = useState("");

const filteredCustomers = useMemo(() => {
  const term = search.toLowerCase();

  return customers.filter((customer) =>
    customer.name.toLowerCase().includes(term) ||
    customer.phone.toLowerCase().includes(term) ||
    (customer.email || "").toLowerCase().includes(term)
  );
}, [customers, search]);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmed) return;

    try {
      await deleteCustomer(id);

      alert("✅ Customer deleted successfully!");

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to delete customer.");
    }
  }

  return (
  <div className="overflow-hidden rounded-xl bg-white shadow">

    <div className="border-b p-4">
      <input
        type="text"
        placeholder="🔍 Search customers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Phone</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">GST</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-8 text-center text-gray-500">
                No customers found.
              </td>
            </tr>
          ) : (
            filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4">{customer.name}</td>
                <td className="p-4">{customer.phone}</td>
                <td className="p-4">
                  {customer.email || "-"}
                </td>
                <td className="p-4">
                  {customer.gst_number || "-"}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/customers/${customer.id}/edit`}
                      className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(customer.id)}
                      className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}