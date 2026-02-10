"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { productAPI } from "@/services/api";
import { Loader2, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

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

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
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
      <Button variant="ghost" onClick={() => router.back()} className="mb-6 justify-start">
        <ArrowLeft className="mr-2" size={16} />
        Back
      </Button>

      <div className="flex flex-col gap-10 md:flex-row bg-blue-200">
        <div>
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-100 h-100 grayscale object-cover"
          />
        </div>

        <div className="flex flex-col flex-1 space-y-4 bg-red-100">
          <div className="flex flex-row justify-between items-center bg-yellow-400 mt-auto mb-10">
            <h1 className="text-4xl font-bold uppercase">
              {product.title}
            </h1>
            <Badge variant="secondary">{product.category.name}</Badge>
          </div>
          <p className="text-4xl font-semibold">
            ${product.price}
          </p>
          <ButtonGroup>
            <Button
              className="rounded-xs"
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </Button>
            <span className="text-lg flex justify-center items-center font-medium w-10">
              {quantity}
            </span>
            <Button
              className="rounded-xs"
              size="sm"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </ButtonGroup>
          <p className="text-stone-600">{product.description}</p>
          <Button className="w-full">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}
