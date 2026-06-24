import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-blue-700 text-white p-6">
      <h1 className="text-3xl font-bold mb-10">💎 AIJewels</h1>

      <nav className="space-y-4">
        <Link href="/dashboard" className="block hover:text-yellow-300">
          🏠 Dashboard
        </Link>

        <Link href="/inventory" className="block hover:text-yellow-300">
          📦 Inventory
        </Link>

        <Link href="/products" className="block hover:text-yellow-300">
          💎 Products
        </Link>

        <Link href="/customers" className="block hover:text-yellow-300">
          👥 Customers
        </Link>

        <Link href="/settings" className="block hover:text-yellow-300">
          ⚙ Settings
        </Link>
      </nav>
    </aside>
  );
}