import { Globe, Award, Stars, ArrowRight } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";

const CollectionSection = () => {
  return (
    <section className="md:min-h-screen py-4 px-4 xl:py-20 xl:px-20">
      <div className="grid grid-cols-1 gap-5 md:gap-20">
        <h1 className="text-2xl md:text-4xl font-bold">FEATURED COLLECTIONS</h1>

        <div className="flex flex-row justify-evenly gap-4">
          <div className="flex flex-row justify-evenly overflow-x-auto py-3 snap-x">
            {[1, 2, 3, 4].map((item) => (
              <Card
                key={item}
                className="relative h-100 min-w-[200px] flex-shrink-0 mx-10 pt-0 md:w-full md:h-full max-w-xs snap-center"
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
        </div>
        <a
          href="#"
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
