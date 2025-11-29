import Header from "@/components/Header";
import BlackFridayBanner from "@/components/BlackFridayBanner";
import ProductHero from "@/components/ProductHero";
import ProductFeatures from "@/components/ProductFeatures";
import Guarantees from "@/components/Guarantees";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <BlackFridayBanner />
      <Header />
      <main>
        <ProductHero whatsappNumber="5511999999999" />
        <ProductFeatures />
        <Guarantees />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
