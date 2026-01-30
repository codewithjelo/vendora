import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navLinks = [
    { name: "HOME", href: "#" },
    { name: "ABOUT", href: "#" },
    { name: "SERVICES", href: "#" },
    { name: "CONTACT", href: "#" },
  ];
  return (
    <nav className="flex flex-row items-center bg-yellow-400 p-5">
      <h1 className="flex-1 text-xl font-bold bg-red-400">VENDORA</h1>
      <ul className="flex-1 flex flex-row justify-evenly bg-green-400">
        {navLinks.map((link) => (
          <li key={link.name} className="inline-block mx-4">
            <a href={link.href} className="text-xs font-medium">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex-1 flex flex-row gap-4 justify-end bg-blue-400">
        <Button className="text-xs" variant="outline">
          LOGIN
        </Button>
        <Button className="text-xs">SIGN UP</Button>
      </div>
    </nav>
  );
};

export default Navbar;
