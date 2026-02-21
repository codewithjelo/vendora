"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EyeIcon, EyeOff, FacebookIcon } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-2 p-6 border rounded shadow-md w-150 h-120 mx-4 md:mx-auto"
      >
        <h2 className="text-3xl font-bold text-center">
          VENDORA
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded mt-auto"
          required
        />
        <div className="flex flex-row relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 border p-2 rounded"
            required
          />
          <button
            className="absolute right-3 top-3 text-foreground"
            type="button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff size={16} /> : <EyeIcon size={16} />}
          </button>
        </div>

        <a
          href="#"
          className="text-sm text-right text-stone-600 hover:underline"
        >
          Forgot Password?
        </a>

        <Button type="submit" className="mt-auto">
          Login
        </Button>

        <Separator className="my-4" />

        <div className="flex flex-row gap-3">
          <Button className="flex-1" variant="outline">
            <FacebookIcon fill="text-foreground" size={16} />
          </Button>
          <Button className="flex-1" variant="outline">
            <FaGoogle className="text-foreground" size={16} />
          </Button>
        </div>

        <span className="text-center text-sm text-foreground mt-auto">
          I don't have an account?
          <a href="#" className="text-blue-500 hover:underline ml-1">
            Sign Up
          </a>
        </span>
      </form>

      <span className="absolute bottom-5 right-5">
        <p className="italic text-sm text-stone-400">Email: test@test.com</p>
        <p className="italic text-sm text-stone-400">Password: 123456</p>
      </span>
    </div>
  );
}
