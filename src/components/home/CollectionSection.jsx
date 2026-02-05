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
    <section className="min-h-screen py-20 xl:px-20">
      <div className="grid grid-cols-1 gap-20">
        <h1 className="text-4xl font-bold">FEATURED COLLECTIONS</h1>

        <div className="flex flex-row justify-evenly">
          <Card className="relative w-full max-w-sm pt-0 w-80">
            <div className="overflow-hidden rounded-t-xl">
              <img
                src="https://m.media-amazon.com/images/I/71ubHqDJexL._AC_SL1500_.jpg"
                alt="Event cover"
                className="relative z-20 aspect-[1/1] h-64 w-full object-fill brightness-60 grayscale dark:brightness-40 rounded-t-xl transition-transform duration-500 hover:scale-110"
              />
            </div>
            <CardHeader>
              <CardAction>
                <Badge variant="secondary">Featured</Badge>
              </CardAction>
              <CardTitle>Design systems meetup</CardTitle>
              <CardDescription>
                A practical talk on component APIs, accessibility, and shipping
                faster.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">View Event</Button>
            </CardFooter>
          </Card>
          <Card className="relative w-full max-w-sm pt-0 w-80">
            <div className="overflow-hidden rounded-t-xl">
              <img
                src="https://m.media-amazon.com/images/I/71ubHqDJexL._AC_SL1500_.jpg"
                alt="Event cover"
                className="relative z-20 aspect-[1/1] h-64 w-full object-fill brightness-60 grayscale dark:brightness-40 rounded-t-xl transition-transform duration-500 hover:scale-110"
              />
            </div>
            <CardHeader>
              <CardAction>
                <Badge variant="secondary">Featured</Badge>
              </CardAction>
              <CardTitle>Design systems meetup</CardTitle>
              <CardDescription>
                A practical talk on component APIs, accessibility, and shipping
                faster.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">View Event</Button>
            </CardFooter>
          </Card>
          <Card className="relative w-full max-w-sm pt-0 w-80">
            <div className="overflow-hidden rounded-t-xl">
              <img
                src="https://m.media-amazon.com/images/I/71ubHqDJexL._AC_SL1500_.jpg"
                alt="Event cover"
                className="relative z-20 aspect-[1/1] h-64 w-full object-fill brightness-60 grayscale dark:brightness-40 rounded-t-xl transition-transform duration-500 hover:scale-110"
              />
            </div>
            <CardHeader>
              <CardAction>
                <Badge variant="secondary">Featured</Badge>
              </CardAction>
              <CardTitle>Design systems meetup</CardTitle>
              <CardDescription>
                A practical talk on component APIs, accessibility, and shipping
                faster.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">View Event</Button>
            </CardFooter>
          </Card>
          <Card className="relative w-full max-w-sm pt-0 w-80">
            <div className="overflow-hidden rounded-t-xl">
              <img
                src="https://m.media-amazon.com/images/I/71ubHqDJexL._AC_SL1500_.jpg"
                alt="Event cover"
                className="relative z-20 aspect-[1/1] h-64 w-full object-fill brightness-60 grayscale dark:brightness-40 rounded-t-xl transition-transform duration-500 hover:scale-110"
              />
            </div>
            <CardHeader>
              <CardAction>
                <Badge variant="secondary">Featured</Badge>
              </CardAction>
              <CardTitle>Design systems meetup</CardTitle>
              <CardDescription>
                A practical talk on component APIs, accessibility, and shipping
                faster.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">View Event</Button>
            </CardFooter>
          </Card>
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

        <div className="flex flex-row space-x-5 mt-10">
          <div className="flex flex-col flex-1 justify-center items-center gap-2">
            <Globe size={48} />
            <h1 className="text-5xl">15,000+</h1>
            <p className="text-lg font-normal">HAPPY CUSTOMERS</p>
            <span className="text-md font-extralight">
              Worldwide Delivery since 2023
            </span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col flex-1 justify-center items-center gap-2">
            <Award size={48} />
            <h1 className="text-5xl">4.9★</h1>
            <p className="text-lg font-normal">CUSTOMER RATING</p>
            <span className="text-md font-extralight">
              From 2,400+ verified reviews
            </span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col flex-1 justify-center items-center gap-2">
            <Stars size={48} />
            <h1 className="text-5xl">100%</h1>
            <p className="text-lg font-normal">SATISFACTION</p>
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
