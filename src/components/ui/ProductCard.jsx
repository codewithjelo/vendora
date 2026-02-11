import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProductCard = ({ product, index, router, toTitleCase }) => {
  return (
    <Card
      key={product.id}
      onClick={() => router.push(`/products/${product.id}`)}
      className="relative h-100 min-w-[200px] rounded-xs flex-shrink-0 pt-0 md:w-full md:h-full max-w-lg snap-center duration-500 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 cursor-pointer"
      style={{
        animationDelay: `${index * 50}ms`,
        animationFillMode: "backwards",
      }}
    >
      <div className="overflow-hidden rounded-t-xs">
        <img
          src={product.image || "https://via.placeholder.com/400?text=No+Image"}
          alt={product.title}
          className="aspect-square w-full object-cover brightness-60 dark:brightness-40 rounded-t-xs transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400?text=No+Image";
          }}
        />
      </div>

      <CardHeader>
        <CardAction>
          <Badge variant="secondary">
            {toTitleCase(product.category || "Uncategorized")}
          </Badge>
        </CardAction>
        <CardTitle className="h-10 text-md font-bold uppercase">
          {product.title}
        </CardTitle>
      </CardHeader>

      <CardFooter>
        <p className="font-semibold w-full">${product.price}</p>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
