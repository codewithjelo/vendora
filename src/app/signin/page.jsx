"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EyeIcon, EyeOff, FacebookIcon } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const { signIn } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    try {
      signIn(email, password);
      toast.success("Welcome back!");
      router.push(redirect);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSocialLogin = (provider) => {
    toast.info(`${provider} login is not implemented yet`);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen animation-fadeIn">
      <Link
        href="/"
        className="w-full text-3xl text-center font-bold border-b py-5 mb-auto"
      >
        VENDORA
      </Link>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-2 p-6 mb-auto border rounded shadow-md w-150 h-120 mx-4 md:mx-auto"
      >
        <h2 className="text-2xl font-bold text-center mt-5">LOGIN</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded mt-auto focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <div className="flex flex-row relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
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

        <a href="#" className="text-sm text-right text-stone-600 hover:underline">
          Forgot Password?
        </a>

        <Button type="submit" className="mt-auto">
          Login
        </Button>

        <div className="flex flex-row gap-2 my-4 items-center">
          <Separator className="flex-1" />
          <span className="text-stone-400 text-sm">OR</span>
          <Separator className="flex-1" />
        </div>

        <div className="flex flex-row gap-3">
          <Button
            type="button"
            onClick={() => handleSocialLogin("Facebook")}
            className="flex flex-row gap-2 flex-1"
            variant="outline"
          >
            <FacebookIcon fill="text-foreground" size={16} />
            <p className="text-sm text-foreground">Facebook</p>
          </Button>
          <Button
            type="button"
            onClick={() => handleSocialLogin("Google")}
            className="flex flex-row gap-2 flex-1"
            variant="outline"
          >
            <FaGoogle className="text-foreground" size={16} />
            <p className="text-sm text-foreground">Google</p>
          </Button>
        </div>

        <p className="text-center text-sm text-stone-600 mt-4">
          I don't have an account?{" "}
          <Link
            href="/signup"
            className="text-foreground font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>

      <span className="absolute bottom-5 right-5 text-right">
        <p className="italic text-sm text-stone-400">
          Create an account to get started
        </p>
        <p className="italic text-sm text-stone-400">or sign up to test</p>
      </span>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-lg">Loading...</div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}