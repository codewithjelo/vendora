"use client";
import { useRouter } from "next/navigation";
import { Heart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import ProductCard from "@/components/ui/ProductCard";
import { toTitleCase } from "@/utils/helpers";

const FavoritesPage = () => {
  const router = useRouter();
  const { favorites, clearFavorites } = useFavorites();

  return (
    <div className="container flex flex-col min-h-screen mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6 flex-none justify-start mr-auto"
      >
        <ArrowLeft className="mr-2" size={16} />
        Back
      </Button>

      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold">FAVORITES</h1>
        {favorites.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearFavorites}>
            Clear All
          </Button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <Heart size={64} className="text-stone-300" />
          <p className="text-stone-500 text-lg">No favorites yet</p>
          <Button variant="outline" onClick={() => router.push("/shop")}>
            Browse Products
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-3 justify-items-center gap-y-14">
          {favorites.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              router={router}
              toTitleCase={toTitleCase}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;