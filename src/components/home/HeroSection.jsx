"use client";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "../ui/button";

const HeroSection = () => {
  const imageUrls = [
    "https://cdn.venngage.com/template/thumbnail/full/5a5f1c47-6934-45fc-b94e-447e4b6a7567.webp",
    "https://cdn.pixabay.com/photo/2022/11/22/04/34/black-friday-7608705_1280.jpg",
  ];
  return (
    <section className="md:min-h-screen p-4 xl:py-20 xl:px-20">
      <div className="absolute inset-0 z-0">
      </div>
      <div className="relative z-10 grid grid-cols-1 gap-10 md:gap-20">
        <div className="flex flex-col justify-center space-y-4 md:space-y-10">
          <h1 className="text-4xl md:text-5xl font-bold">Your One-Stop Shop</h1>
          <p className="text-sm md:text-lg leading-relaxed md:w-100">
            From everyday essentials to unique finds, Vendora makes shopping
            simple, fun, and fast — all in one place, with deals you won’t want
            to miss.
          </p>
          <Link href="/shop" className="w-max">
          <Button className="py-5 w-35 md:py-7 md:w-40 text-lg mt-4 md:mt-10">
            SHOP NOW
          </Button>
          </Link>
        </div>
        <Carousel
          className="aspect-[16/3] xl:h-75 w-full col-span-2"
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
            {imageUrls.map((url, index) => (
              <CarouselItem key={index}>
                <div className="p-1 flex h-30 xl:h-90 items-center justify-center">
                  <div className="overflow-hidden w-full h-full rounded-lg">
                    <img
                      className="w-full"
                      src={url}
                      alt={`Hero image ${index}`}
                    />
                  </div>
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
