import { useRouter } from "next/navigation";
import { useFavorites } from "@/contexts/FavoritesContext";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, X, Heart
 } from "lucide-react";

const ProductToolbar = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceFilter,
  categories,
  clearFilters,
  filteredProductsCount,
  toTitleCase,
}) => {
  const router = useRouter();
  const { favoritesCount } = useFavorites();

  return (
    <div className="flex flex-row gap-2">
      {/* Search Bar */}
      <InputGroup className="flex-1 max-w-4xl">
        <InputGroupInput
          placeholder="Search products..."
          value={searchQuery}
          onChange={onSearchChange}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          {filteredProductsCount} result
          {filteredProductsCount > 1 ? "s" : ""}
        </InputGroupAddon>
      </InputGroup>

      <Button
        onClick={() => router.push("/favorites")}
        className="relative"
      >
        <Heart size={24} />
        {favoritesCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {favoritesCount}
          </span>
        )}
      </Button>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 items-center ml-auto">
        <span className="text-sm font-medium">Filter by:</span>

        {/* Category Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[150px] justify-between">
              {selectedCategory === "all"
                ? "All Categories"
                : toTitleCase(selectedCategory)}
              <ChevronDown size={16} className="ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onCategoryChange("all")}
                className={selectedCategory === "all" ? "bg-accent" : ""}
              >
                All Categories
              </DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={selectedCategory === category ? "bg-accent" : ""}
                >
                  {toTitleCase(category)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Price Range Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[150px] justify-between">
              {priceRange.min === 0 && priceRange.max === Infinity
                ? "All Prices"
                : priceRange.max === Infinity
                  ? `Over $${priceRange.min}`
                  : `$${priceRange.min}-$${priceRange.max}`}
              <ChevronDown size={16} className="ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Price Range</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onPriceFilter(0, Infinity)}>
                All Prices
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onPriceFilter(0, 50)}>
                Under $50
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onPriceFilter(50, 100)}>
                $50 - $100
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onPriceFilter(100, 200)}>
                $100 - $200
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onPriceFilter(200, Infinity)}>
                Over $200
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear Filters */}
        {(searchQuery ||
          selectedCategory !== "all" ||
          priceRange.min > 0 ||
          priceRange.max < Infinity) && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X size={16} className="mr-1" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductToolbar;
