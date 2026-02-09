"use client";
import { useState, useEffect } from "react";
import { productAPI } from "@/services/api";
import {
  Search,
  Heart,
  ChevronDown,
  ChevronUp,
  Loader2,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, selectedCategory, priceRange]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, priceRange]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productAPI.getProducts(0, 100);
      setProducts(data);
      setFilteredProducts(data);

      // Extract unique categories
      const uniqueCategories = [...new Set(data.map((p) => p.category.name))];
      setCategories(uniqueCategories);
    } catch (err) {
      setError("Failed to load products. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category.name === selectedCategory,
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max,
    );

    setFilteredProducts(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceFilter = (min, max) => {
    setPriceRange({ min, max });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceRange({ min: 0, max: Infinity });
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis
      if (currentPage <= 3) {
        // Show first pages
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show last pages
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show middle pages
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const displayedProducts = isExpanded
    ? filteredProducts
    : filteredProducts.slice(0, 3);

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
    <div className="relative flex flex-col min-h-screen">
      <div className="flex flex-col xl:px-20 bg-background p-5 border-y space-y-4">
        {/* Search Bar */}
        <div className="flex flex-row">
          <InputGroup className="flex-1 max-w-4xl">
            <InputGroupInput
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              {filteredProducts.length} result
              {filteredProducts.length > 1 ? "s" : ""}
            </InputGroupAddon>
          </InputGroup>
          <a href="#" className="ml-auto">
            <Heart size={24} />
          </a>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium">Filter by:</span>

          {/* Category Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[150px] justify-between"
              >
                {selectedCategory === "all"
                  ? "All Categories"
                  : selectedCategory}
                <ChevronDown size={16} className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleCategoryChange("all")}
                  className={selectedCategory === "all" ? "bg-accent" : ""}
                >
                  All Categories
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={selectedCategory === category ? "bg-accent" : ""}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Price Range Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[150px] justify-between"
              >
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
                <DropdownMenuItem
                  onClick={() => handlePriceFilter(0, Infinity)}
                >
                  All Prices
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePriceFilter(0, 50)}>
                  Under $50
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePriceFilter(50, 100)}>
                  $50 - $100
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePriceFilter(100, 200)}>
                  $100 - $200
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handlePriceFilter(200, Infinity)}
                >
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
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="ml-auto"
            >
              <X size={16} className="mr-1" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      <div className="xl:px-20 xl:py-10 space-y-10">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">TODAY'S FOR YOU</h1>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-stone-500 text-lg mb-4">
              No products match your filters
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-3 justify-items-center gap-y-14">
            {displayedProducts.map((product, index) => (
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
        )}

            <div
              className={`transition-all duration-500 overflow-hidden ${
                isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {isExpanded && totalPages > 1 && (
                <Pagination className="mt-20">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>

                    {getPageNumbers().map((page, index) => (
                      page === 'ellipsis' ? (
                        <PaginationItem key={`ellipsis-${index}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => handlePageChange(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    ))}

                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>

            {/* Show items count when expanded */}
            {isExpanded && (
              <div className="text-center text-sm text-stone-500">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
              </div>
            )}

        <div className="flex justify-center flex-1">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp size={16} />
              </>
            ) : (
              <>
                View All <ChevronDown size={16} />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
