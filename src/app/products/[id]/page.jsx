"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { productAPI } from "@/services/api";
import {
  Loader2,
  ArrowLeft,
  Heart,
  ShoppingBasket,
  Plus,
  Minus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { StarRating } from "@/components/ui/StarRating";
import { toTitleCase } from "@/utils/helpers";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCart } from "@/contexts/CartContext";

const COLOR_OPTIONS = [
  { label: "Variant 1", hue: "" },
  { label: "Variant 2", hue: "hue-rotate-90" },
  { label: "Variant 3", hue: "hue-rotate-180" },
];

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toggleFavorite, isFavorite } = useFavorites();
  const [showCart, setShowCart] = useState(false);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await productAPI.getProductById(params.id);
      setProduct(data);
    } catch (err) {
      setError("Failed to load product");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();

    const wasFavorite = isFavorite(product.id);

    toggleFavorite(product);

    toast(wasFavorite ? "Removed from favorites" : "Added to favorites", {
      icon: wasFavorite ? (
        <Heart className="text-foreground" size={15} fill="none" />
      ) : (
        <Heart className="text-red-500" size={15} fill="red" />
      ),
    });
  };

  const handleAddToCart = () => {
    setShowCart(true);
  };

  const handleUpdateToCart = () => {
    addToCart(product, quantity, selectedColor.label);
    toast.success("Added to cart", {
      icon: <ShoppingBasket className="text-foreground" size={15} />,
    });
    setShowCart(false);
    setQuantity(1);
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => {
      if (prev === 1) {
        setShowCart(false);
        return 1;
      }
      return prev - 1;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => router.push("/")}>Go Back</Button>
      </div>
    );
  }

  const isProductFavorite = isFavorite(product.id);

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

      <div className="flex flex-col gap-10 justify-center md:flex-row">
        <div className="flex flex-col gap-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-120 object-cover border"
          />
          <div className="flex flex-row gap-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-70 h-70 flex-1 hue-rotate-90 object-cover border"
            />
            <img
              src={product.image}
              alt={product.title}
              className="w-70 h-70 hue-rotate-180 flex-1 object-cover border"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1 space-y-4 max-w-170">
          <div className="flex flex-row justify-between mb-10">
            <h1 className="text-4xl font-bold uppercase">{product.title}</h1>
            <Badge className="my-auto" variant="secondary">
              {toTitleCase(product.category)}
            </Badge>
          </div>

          {/* Color Options */}
          <div className="flex flex-col gap-1">
            <span className="text-stone-600 font-semibold uppercase">
              Color
            </span>
            <div className="flex flex-row gap-3">
              {COLOR_OPTIONS.map((color) => (
                <Button
                  key={color.label}
                  variant="outline"
                  onClick={() => setSelectedColor(color)}
                  className={`p-0 w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor.label === color.label
                      ? "border-black scale-110"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={color.label}
                    className={`w-full h-full  rounded-full object-cover ${color.hue}`}
                  />
                </Button>
              ))}
            </div>
          </div>

          <p className="text-3xl font-semibold">${product.price}</p>

          <div
            className={`overflow-hidden transition-all duration-500 ${
              showCart ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-3 py-3 border rounded-lg px-4">
              <div className="flex flex-row items-center justify-between">
                <span className="text-sm font-semibold uppercase text-stone-600">
                  Color
                </span>
                <span className="text-sm text-stone-600">
                  {selectedColor.label}
                </span>
              </div>

              <Separator />

              <div className="flex flex-row items-center justify-between">
                <span className="text-sm font-semibold uppercase text-stone-600">
                  Quantity
                </span>
                <div className="flex flex-row items-center gap-3">
                  <button
                    onClick={handleDecrement}
                    className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-stone-100 transition-colors"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-5 text-center font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-stone-100 transition-colors"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              <Separator />

              <div className="flex flex-row items-center justify-between">
                <span className="text-sm font-semibold uppercase text-stone-600">
                  Subtotal
                </span>
                <span className="text-sm font-bold">
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <Button
              className="flex-1"
              onClick={showCart ? handleUpdateToCart : handleAddToCart}
              variant="default"
            >
              <ShoppingBasket className="mr-2" size={16} />
              {showCart ? "Update Cart" : "Add to Cart"}
            </Button>
            <Button
              className="flex-1"
              variant={isProductFavorite ? "default" : "outline"}
              onClick={handleFavoriteClick}
            >
              <Heart
                className="mr-2"
                size={16}
                fill={isProductFavorite ? "currentColor" : "none"}
              />
              {isProductFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </div>

          <Separator className="bg-stone-300 my-4" />

          <div className="flex flex-col gap-1">
            <span className="text-stone-600 font-semibold uppercase">
              Description
            </span>
            <p className="max-w-150 text-stone-600 text-sm">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-stone-600 font-semibold uppercase">Rating</h1>
            <span className="flex flex-row gap-2 max-w-150 text-stone-600 text-sm">
              {product.rating.rate}{" "}
              <StarRating
                rating={product.rating.rate}
                showCount={true}
                count={product.rating.count}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
