"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "test@test.com" && password === "123456") {

      localStorage.setItem("user", JSON.stringify({ name: "John" }));

      document.cookie = "token=loggedin; path=/; SameSite=Lax";

      router.push(redirect);
    } else {
      alert("Invalid credentials");
    }
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
      </form>
      <span className="absolute bottom-5 right-5">
        <p className="italic text-sm text-stone-400">Email: test@test.com</p>
        <p className="italic text-sm text-stone-400">Password: 123456</p>
      </span>
    </div>
  );
}
