"use client";
import { useState, useEffect } from "react";
import { Globe, Award, Stars, ArrowRight, Loader2 } from "lucide-react";
import { productAPI } from "@/services/api";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CollectionSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productAPI.getProducts(0, 3);
      setProducts(data);
    } catch (err) {
      setError("Failed to load products. Please try again.");
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

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchProducts}
          className="px-6 py-2 bg-black text-white hover:bg-stone-800 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-stone-500">No products found</p>
      </div>
    );
  }
  return (
    <section className="md:min-h-screen py-4 px-4 xl:py-20 xl:px-20">
      <div className="grid grid-cols-1 gap-5 md:gap-20">
        <h1 className="text-2xl md:text-4xl font-bold">FEATURED COLLECTIONS</h1>

        <div className="flex flex-row justify-evenly gap-4">
          <div className="flex flex-row justify-between overflow-x-auto py-3 gap-5 snap-x">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className="relative h-100 min-w-[200px] rounded-xs flex-shrink-0 pt-0 md:w-full md:h-full max-w-lg snap-center duration-500 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <div className="overflow-hidden rounded-t-xs">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="aspect-square w-full object-cover brightness-60 grayscale dark:brightness-40 rounded-t-xs transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400?text=No+Image";
                    }}
                  />
                </div>

                <CardHeader>
                  <CardAction>
                    <Badge variant="secondary">{product.category.name}</Badge>
                  </CardAction>
                  <CardTitle className="h-10 text-md font-bold uppercase">
                    {product.title}
                  </CardTitle>
                </CardHeader>

                <CardFooter>
                  <p className="font-semibold w-full">${product.price}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <a
          href="/shop"
          className="inline-flex justify-center items-center gap-2 text-sm font-medium tracking-wider group"
        >
          VIEW ALL
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </a>

        <div className="flex flex-col lg:flex-row space-y-5 lg:space-x-5 mt-10">
          <div className="flex flex-col flex-1 justify-center items-center gap-2">
            <Globe size={48} />
            <h1 className="text-3xl lg:text-5xl">15,000+</h1>
            <p className="text-md lg:text-lg font-normal">HAPPY CUSTOMERS</p>
            <span className="text-md font-extralight">
              Worldwide Delivery since 2023
            </span>
          </div>
          <Separator className="hidden lg:flex" orientation="vertical" />
          <Separator className="lg:hidden" />
          <div className="flex flex-col flex-1 justify-center items-center gap-2">
            <Award size={48} />
            <h1 className="text-3xl lg:text-5xl">4.9★</h1>
            <p className="text-md lg:text-lg font-normal">CUSTOMER RATING</p>
            <span className="text-md font-extralight">
              From 2,400+ verified reviews
            </span>
          </div>
          <Separator className="hidden lg:flex" orientation="vertical" />
          <Separator className="lg:hidden" />

          <div className="flex flex-col flex-1 justify-center items-center gap-2">
            <Stars size={48} />
            <h1 className="text-3xl lg:text-5xl">100%</h1>
            <p className="text-md lg:text-lg font-normal">SATISFACTION</p>
            <span className="text-md font-extralight">
              Love it or we'll make it right
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;
