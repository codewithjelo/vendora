import Navbar from "@/layout/Navbar";
import ShopPage from "@/pages/ShopPage";
import Footer from "@/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ShopPage />
      <Footer />
    </div>
  );
}
