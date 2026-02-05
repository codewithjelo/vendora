import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navLinks = [
    { name: "HOME", href: "#" },
    { name: "SHOP", href: "#" },
    { name: "CATEGORY", href: "#" },
    { name: "CART", href: "#" },
  ];
  return (
    <nav className="flex flex-row items-center py-5 xl:px-20 sticky top-0 z-30 bg-background/70 backdrop-blur-sm">
      <h1 className="flex-1 text-xl font-bold">VENDORA</h1>
      <ul className="flex-1 flex flex-row justify-evenly">
        {navLinks.map((link) => (
          <li key={link.name} className="inline-block mx-4">
            <a href={link.href} className="text-xs font-medium">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex-1 flex flex-row gap-4 justify-end">
        <Button className="text-xs" variant="outline">
          LOGIN
        </Button>
        <Button className="text-xs">SIGN UP</Button>
      </div>
    </nav>
  );
};

export default Navbar;
