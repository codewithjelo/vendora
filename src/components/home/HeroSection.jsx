"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "../ui/button";
import Image from "next/image";
import ImageGirl from "@/assets/image-1.png";

const HeroSection = () => {
  return (
    <section className="min-h-screen grid grid-cols-2 bg-gray-400 py-10 px-10 space-y-10">
      <div className="flex flex-col justify-center space-y-4 bg-purple-400">
        <h1 className="text-5xl font-bold">Your One-Stop Shop</h1>
        <p className="text-md">
          From everyday essentials to unique finds, Vendora makes shopping
          simple, fun, and fast — all in one place, with deals you won’t want to
          miss.
        </p>
        <Button className="w-32">SHOP NOW</Button>
      </div>
      <div className="flex flex-col justify-center items-center space-y-4 bg-yellow-400">
        <div className="relative w-150 h-150">
          <Image
            src={ImageGirl}
            alt="vendora-img-1"
            fill
            className="object-cover rounded-full shadow-lg"
          />
        </div>
      </div>
      <Carousel
        className="aspect-[16/3] col-span-2 bg-orange-400"
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
                  <CardContent className="flex h-100 items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default HeroSection;
