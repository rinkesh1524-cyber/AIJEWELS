"use client";

import { useState } from "react";
import { signUp, supabase } from "@/lib/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [businessType, setBusinessType] = useState("Silver Jewellery");
  const [phone, setPhone] = useState("");

  async function handleSignup() {
    const { error } = await signUp(email, password);

    if (error) {
      alert(error.message);
    } else {
      alert("Account created! Please check your email to verify your account.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-center">
          AIJewels Sign Up
        </h1>
        <input
  className="mb-4 w-full rounded-lg border p-3"
  placeholder="Business Name"
  value={businessName}
  onChange={(e) => setBusinessName(e.target.value)}
/>

<input
  className="mb-4 w-full rounded-lg border p-3"
  placeholder="Owner Name"
  value={ownerName}
  onChange={(e) => setOwnerName(e.target.value)}
/>

<select
  className="mb-4 w-full rounded-lg border p-3"
  value={businessType}
  onChange={(e) => setBusinessType(e.target.value)}
>
  <option>Silver Jewellery</option>
  <option>Gold Jewellery</option>
  <option>Diamond Jewellery</option>
  <option>Artificial Jewellery</option>
  <option>Mixed Jewellery</option>
</select>

<input
  className="mb-4 w-full rounded-lg border p-3"
  placeholder="Phone Number"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>


        <input
          className="mb-4 w-full rounded-lg border p-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="mb-6 w-full rounded-lg border p-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
        >
          Create Account
        </button>
      </div>
    </main>
  );
}