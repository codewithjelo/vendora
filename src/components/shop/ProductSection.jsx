"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductToolbar from "@/components/ui/ProductToolbar";
import ProductCard from "@/components/ui/ProductCard";
import ProductPagination from "@/components/ui/ProductPagination";
import ExpandToggle from "@/components/ui/ExpandToggle";
import { useProducts } from "@/hooks/useProducts";
import { useProductFilters } from "@/hooks/useProductFilters";
import { usePagination } from "@/hooks/usePagination";
import { toTitleCase, getPageNumbers } from "@/utils/helpers";

const ProductSection = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  // Fetch products
  const { products, categories, loading, error, refetch } = useProducts();

  // Apply filters
  const {
    filteredProducts,
    searchQuery,
    selectedCategory,
    priceRange,
    handleSearchChange,
    handleCategoryChange,
    handlePriceFilter,
    clearFilters,
  } = useProductFilters(products);

  // Pagination
  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination(filteredProducts, 12);

  // Display products based on expanded state
  const displayedProducts = isExpanded
    ? paginatedProducts
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
          onClick={refetch}
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
        <ProductToolbar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          priceRange={priceRange}
          onPriceFilter={handlePriceFilter}
          categories={categories}
          clearFilters={clearFilters}
          filteredProductsCount={filteredProducts.length}
          toTitleCase={toTitleCase}
        />
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
          <>
            <div className="grid grid-cols-3 justify-items-center gap-y-14">
              {displayedProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  router={router}
                  toTitleCase={toTitleCase}
                />
              ))}
            </div>

            {isExpanded && totalPages > 1 && (
              <ProductPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                getPageNumbers={() => getPageNumbers(currentPage, totalPages)}
              />
            )}

            {isExpanded && (
              <div className="text-center text-sm text-stone-500">
                Showing {startIndex + 1}-
                {Math.min(endIndex, filteredProducts.length)} of{" "}
                {filteredProducts.length} products
              </div>
            )}
          </>
        )}

        <ExpandToggle isExpanded={isExpanded} setIsExpanded={setIsExpanded} />


      </div>
    </div>
  );
};

export default ProductSection;