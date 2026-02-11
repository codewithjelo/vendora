"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { productAPI } from "@/services/api";
import { Loader2, ArrowLeft, Heart, ShoppingBasket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StarRating } from "@/components/ui/StarRating";

const toTitleCase = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          <div className="flex flex-row justify-between mb-20">
            <h1 className="text-4xl font-bold uppercase">{product.title}</h1>
            <Badge className="my-auto" variant="secondary">{toTitleCase(product.category)}</Badge>
          </div>
          <p className="text-3xl font-semibold">${product.price}</p>

          <div className="flex flex-row gap-4">
            <Button className="flex-1">
              <ShoppingBasket className="mr-2" size={16} />
              Add to Cart
            </Button>
            <Button className="flex-1" variant="outline">
              <Heart className="mr-2" size={16} />
              Add to Favorites
            </Button>
          </div>
        
          <Separator className="bg-stone-300 my-4" />

          <div className="flex flex-col gap-1">
            <span className="text-stone-600 font-semibold uppercase">
              Description
            </span>
            <p className="max-w-150 text-stone-600 text-sm">
              {" "}
              {product.description}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-stone-600 font-semibold uppercase">Rating</h1>
            <p className="flex flex-row gap-2 max-w-150 text-stone-600 text-sm">
              {product.rating.rate} <StarRating rating={product.rating.rate} showCount={true} count={product.rating.count} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;