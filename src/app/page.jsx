import Navbar from "@/components/Navbar";
import HomePage from "@/pages/HomePage";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HomePage />
    </div>
  );
}
