"use client";
import { useState } from "react";
import { Search, Heart, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
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
  const [isExpanded, setIsExpanded] = useState(false);
  const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const displayedProducts = isExpanded ? products : products.slice(0, 5);
  return (
    <div className="relative min-h-screen">
      <div className="flex flex-row xl:px-20 bg-background p-5 border-y">
        <InputGroup className="flex-1 max-w-4xl">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
        </InputGroup>
        <a href="#" className="ml-auto">
          <Heart size={24} />
        </a>
      </div>

      <div className="xl:px-20 xl:py-10 space-y-10">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">TODAY'S FOR YOU</h1>
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

        <div className="grid grid-cols-5 place-items-center gap-6">
          {displayedProducts.map((item) => (
            <Card
              key={item}
              className="relative h-100 min-w-[200px] flex-shrink-0 pt-0 md:w-full md:h-full max-w-xs snap-center"
            >
              <div className="overflow-hidden rounded-t-xl">
                <img
                  src="https://m.media-amazon.com/images/I/71ubHqDJexL._AC_SL1500_.jpg"
                  alt="Event cover"
                  className="aspect-square w-full object-cover brightness-60 grayscale dark:brightness-40 rounded-t-xl transition-transform duration-500 hover:scale-110"
                />
              </div>

              <CardHeader>
                <CardAction>
                  <Badge variant="secondary">Featured</Badge>
                </CardAction>
                <CardTitle>Design systems meetup</CardTitle>
                <CardDescription>
                  A practical talk on component APIs, accessibility, and
                  shipping faster.
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <Button className="w-full">View Event</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {isExpanded && (
          <Pagination className="mt-20">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default ProductSection;
