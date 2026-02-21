"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "@/components/ui/CartDrawer";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount } = useCart();
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const navLinks = [
    { name: "HOME", href: "/", onClick: () => setCartOpen(false) },
    { name: "SHOP", href: "/shop", onClick: () => setCartOpen(false) },
    { name: "CART", onClick: () => setCartOpen(true) },
  ];

  useEffect(() => {
    const isLoggedIn =
      document.cookie.includes("token=loggedin")
    setLoggedIn(isLoggedIn);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem("user");
    setLoggedIn(false);
    setUser(null);
    window.location.href = "/";
  };

  return (
    <>
      <nav className="flex flex-row items-center py-5 xl:px-20 sticky top-0 z-30 bg-background/70 backdrop-blur-sm">
        <a href="#" className="flex-1 text-xl font-bold">
          VENDORA
        </a>
        <ul className="flex-1 flex flex-row justify-evenly">
          {navLinks.map((link) => (
            <li key={link.name} className="inline-block mx-4">
              {link.href ? (
                <a
                  href={link.href}
                  className="text-xs font-medium"
                  onClick={link.onClick}
                >
                  {link.name}
                </a>
              ) : !loggedIn ? null : (
                <button
                  onClick={link.onClick}
                  className="relative text-xs font-medium"
                >
                  {link.name}
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-7 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              )}
            </li>
          ))}
        </ul>
        <div className="flex-1 flex justify-end">
          {!loggedIn ? (
            <div className={!loggedIn ? "flex flex-row gap-4" : "hidden"}>
              <Link href="/login">
                <Button className="text-xs" variant="outline">
                  LOGIN
                </Button>
              </Link>
              <Button className="text-xs">SIGN UP</Button>
            </div>
          ) : (
            <div className={!loggedIn ? "hidden" : null}>
              <Avatar size="lg">
                <AvatarImage src="/avatar.png" alt="user avatar" />
                <AvatarFallback
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  {user?.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </nav>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
