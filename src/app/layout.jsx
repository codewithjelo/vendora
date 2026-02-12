import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <FavoritesProvider>{children}</FavoritesProvider>
        </CartProvider>
        <Toaster className="absolute bottom-5 right-5 z-50" />
      </body>
    </html>
  );
}
