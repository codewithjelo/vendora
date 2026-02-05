import Navbar from "@/layout/Navbar";
import HomePage from "@/pages/HomePage";
import Footer from "@/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}
