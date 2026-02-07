import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground flex flex-col p-4 lg:py-20 space-y-10 lg:space-y-20">
      <div className="grid grid-cols-1 justify-items-center space-y-4">
        <h1 className="text-2xl lg:text-4xl font-semibold text-white col-span-2 items-center">
          Join Our Community
        </h1>
        <p className="text-sm text-wrap lg:text-md text-stone-300 col-span-2">
          Get exclusive access to new collections, special offers, and design
          inspiration.
        </p>
        <div className="flex flex-row gap-2">
          <Input className="lg:py-2 lg:w-80 grow" placeholder="Enter your email" />
          <Button variant="outline" className="py-2 px-4 text-sm lg:text-md">
            SUBSCRIBE
          </Button>
        </div>
      </div>

      <Separator className="bg-stone-600" />

      <div className="grid grid-cols-2 gap-8 place-items-start lg:place-items-center w-full">
        <div className="flex flex-col gap-4">
          <h1 className="text-md font-bold text-white">SHOP</h1>
          <ul className="flex flex-col gap-2">
            <li className="text-md text-stone-400">All Products</li>
            <li className="text-md text-stone-400">Collections</li>
            <li className="text-md text-stone-400">Gift Cards</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-md font-bold text-white">HELP</h1>
          <ul className="flex flex-col gap-2">
            <li className="text-md text-stone-400">Contact Us</li>
            <li className="text-md text-stone-400">Shipping Info</li>
            <li className="text-md text-stone-400">Returns</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-md font-bold text-white">COMPANY</h1>
          <ul className="flex flex-col gap-2">
            <li className="text-md text-stone-400">About</li>
            <li className="text-md text-stone-400">Sustainability</li>
            <li className="text-md text-stone-400">Careers</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-md font-bold text-white">FOLLOW US</h1>
          <ul className="flex flex-row gap-2">
            <li className="text-stone-400">
              <Facebook size={24} />
            </li>
            <li className="text-stone-400">
              <Instagram size={24} />
            </li>
            <li className="text-stone-400">
              <Twitter size={24} />
            </li>
          </ul>
        </div>
      </div>

      <Separator className="bg-stone-600" />

      <div className="grid grid-col-2 gap-2 place-content-center place-items-center">
        <p className="text-stone-400 text-md col-span-2">
          © {new Date().getFullYear()} Vendora. All rights reserved.
        </p>
        <p className="text-stone-400 text-md">Privacy Policy</p>
        <p className="text-stone-400 text-md">Terms</p>
      </div>
    </footer>
  );
};

export default Footer;
