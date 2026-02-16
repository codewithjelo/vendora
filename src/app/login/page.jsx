"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/"; // fallback to home

  const handleLogin = (e) => {
    e.preventDefault();

    // simple dummy auth
    if (email === "test@test.com" && password === "123456") {
      // save user in localStorage
      localStorage.setItem("user", JSON.stringify({ name: "John" }));

      // set cookie for middleware
      document.cookie = "token=loggedin; path=/; SameSite=Lax";

      // redirect back or to home
      router.push(redirect);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleGuest = () => {
    localStorage.setItem("user", JSON.stringify({ name: "Guest" }));
    document.cookie = "token=guest; path=/; SameSite=Lax";
    router.push(redirect);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-2 p-6 border rounded shadow-md w-80"
      >
        <h2 className="text-lg font-bold mb-2 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

        {/* Guest Mode Button */}
        <button
          type="button"
          onClick={handleGuest}
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 mt-2"
        >
          Continue as Guest
        </button>
      </form>
    </div>
  );
}
