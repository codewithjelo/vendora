"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "@/components/ui/CartDrawer";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount } = useCart();
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false); // 👈 new

  const navLinks = [
    { name: "HOME", href: "/", onClick: () => setCartOpen(false) },
    { name: "SHOP", href: "/shop", onClick: () => setCartOpen(false) },
    { name: "CART", onClick: () => setCartOpen(true), authOnly: true },
    ,
  ];

  useEffect(() => {
    const isLoggedIn = document.cookie.includes("token=loggedin");
    setLoggedIn(isLoggedIn);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setAuthLoaded(true);
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem("user");
    setLoggedIn(false);
    setUser(null);
    setDropdownOpen(false);
    window.location.href = "/";
  };

  return (
    <>
      <nav className="flex flex-row items-center py-5 xl:px-20 sticky top-0 z-30 bg-background/70 backdrop-blur-sm">
        <a href="#" className="flex-1 text-xl font-bold">
          VENDORA
        </a>
        <ul className="flex-1 flex flex-row justify-evenly">
          {navLinks.map((link) => {
            if (link.authOnly && !loggedIn) return null;

            return (
              <li key={link.name} className="inline-block mx-4">
                {link.href ? (
                  <a
                    href={link.href}
                    className="text-xs font-medium"
                    onClick={link.onClick}
                  >
                    {link.name}
                  </a>
                ) : (
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
            );
          })}
        </ul>

        <div className="flex-1 flex justify-end">
          {!authLoaded ? null : !loggedIn ? (
            <div className="flex flex-row gap-4">
              <Link href="/login">
                <Button className="text-xs" variant="outline">
                  LOGIN
                </Button>
              </Link>
              <Button className="text-xs">SIGN UP</Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="/avatar.png" alt="user avatar" />
                  <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="flex flex-col">
                  <span className="font-medium">{user?.name || "User"}</span>
                  <span className="text-xs text-muted-foreground font-normal truncate">
                    {user?.email || ""}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500 focus:text-red-500 cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
