"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/lib/dashboard";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    products: 0,
    customers: 0,
    sales: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const data = await getDashboardStats();
      setStats(data);
    }

    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold">📦 Products</h2>
          <p className="mt-4 text-5xl font-bold text-blue-600">
            {stats.products}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold">👥 Customers</h2>
          <p className="mt-4 text-5xl font-bold text-green-600">
            {stats.customers}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold">💰 Sales</h2>
          <p className="mt-4 text-5xl font-bold text-purple-600">
            ₹{stats.sales}
          </p>
        </div>

      </div>
    </div>
  );
}