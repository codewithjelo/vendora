"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="min-h-screen py-20 xl:px-20">
      <div className="grid grid-cols-1 gap-20">
        <div className="flex flex-col justify-center space-y-15">
          <h1 className="text-5xl font-bold">Your One-Stop Shop</h1>
          <p className="text-md leading-relaxed w-100">
            From everyday essentials to unique finds, Vendora makes shopping
            simple, fun, and fast — all in one place, with deals you won’t want
            to miss.
          </p>
          <Button className="py-7 w-40 text-lg">SHOP NOW</Button>
        </div>
        <Carousel
          className="aspect-[16/3] h-75 w-full col-span-2"
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex h-60 items-center justify-center p-6">
                      <span className="text-4xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default HeroSection;
