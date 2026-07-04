import Link from "next/link";
import { getCustomers } from "@/lib/customers";
import CustomerTable from "./components/CustomerTable";

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Customers
        </h1>

        <Link
          href="/customers/add"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          + Add Customer
        </Link>
      </div>

      <CustomerTable customers={customers} />
    </div>
  );
}