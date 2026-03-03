"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
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
  const router = useRouter();
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, isAuthenticated, signOut } = useAuth();

  const navLinks = [
    { name: "HOME", href: "/", onClick: () => setCartOpen(false) },
    { name: "SHOP", href: "/shop", onClick: () => setCartOpen(false) },
    { name: "CART", onClick: () => setCartOpen(true), authOnly: true },
  ];

  const handleLogout = () => {
    signOut();
    setCartOpen(false);
    router.push("/");
  };

  const getInitials = () => {
    if (!user) return "U";
    if (user.firstName) {
      return user.lastName 
        ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
        : user.firstName[0].toUpperCase();
    }
    return user.email?.[0].toUpperCase() || "U";
  };

  return (
    <>
      <nav className="flex flex-row items-center py-5 xl:px-20 sticky top-0 z-30 bg-background/70 backdrop-blur-sm">
        <Link href="/" className="flex-1 text-xl font-bold">
          VENDORA
        </Link>
        
        <ul className="flex-1 flex flex-row justify-evenly">
          {navLinks.map((link) => {
            if (link.authOnly && !isAuthenticated) return null;

            return (
              <li key={link.name} className="inline-block mx-4">
                {link.href ? (
                  <Link
                    href={link.href}
                    className="text-xs font-medium"
                    onClick={link.onClick}
                  >
                    {link.name}
                  </Link>
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
          {!isAuthenticated ? (
            <div className="flex flex-row gap-4">
              <Link href="/login">
                <Button className="text-xs" variant="outline">
                  LOGIN
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="text-xs">SIGN UP</Button>
              </Link>
            </div>
            ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="/avatar.png" alt="user avatar" />
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="flex flex-col">
                  <span className="font-medium">
                    {user.firstName} {user.lastName || ""}
                  </span>
                  <span className="text-xs text-muted-foreground font-normal truncate">
                    {user.email}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push("/profile")}
                  className="cursor-pointer"
                >
                  Profile
                </DropdownMenuItem>
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