import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle, Star, MessageCircle, Zap, Tag } from "lucide-react";
import productWhite from "@/assets/product-white.jpg";
import productBlack from "@/assets/product-black.jpg";
import productRed from "@/assets/product-red.jpg";

interface ProductHeroProps {
  whatsappNumber?: string;
}

const ProductHero = ({ whatsappNumber = "55XR999999999" }: ProductHeroProps) => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState<"Branco" | "Preto" | "Vermelho">("Branco");
  const [stockCount] = useState(3);

  const colors = [
    { name: "Branco" as const, bgClass: "bg-white border-2 border-border", image: productWhite },
    { name: "Preto" as const, bgClass: "bg-primary", image: productBlack },
    { name: "Vermelho" as const, bgClass: "bg-accent", image: productRed },
  ];

  const currentImage = colors.find(c => c.name === selectedColor)?.image || productWhite;

  const handleBuyNow = () => {
    // Disparar evento InitiateCheckout do TikTok Pixel
    if (typeof window !== 'undefined' && (window as any).ttq) {
      (window as any).ttq.track('InitiateCheckout', {
        value: 9.90,
        currency: 'BRL',
        contents: [
          {
            content_id: 'kit-iphone-XR-13-pro-max',
            content_name: 'Kit para Transformar iPhone XR no 13 Pro Max',
            quantity: 1,
            price: 9.90
          }
        ]
      });
    }
    
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/checkout", { 
      state: { 
        selectedColor, 
        quantity: 1 
      } 
    });
  };

  return (
    <section className="container mx-auto px-4 py-6 md:py-12">
      <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
        {/* Product Image Section */}
        <div className="animate-fade-in order-1 relative">
          {/* Black Friday Badge */}
          <div className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
            <Tag className="h-3.5 w-3.5 text-[hsl(45,100%,50%)]" />
            <span className="text-[hsl(45,100%,50%)]">-50%</span>
            <span>BLACK FRIDAY</span>
          </div>
          
          <div className="aspect-square bg-secondary rounded-2xl overflow-hidden shadow-2xl">
            <img 
              key={selectedColor}
              src={currentImage} 
              alt={`Kit iPhone ${selectedColor}`}
              className="w-full h-full object-cover transition-all duration-500 animate-fade-in"
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="animate-fade-in space-y-4 order-2">
          {/* Urgency Badge Mobile */}
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-accent text-accent-foreground px-2.5 py-1 rounded-full font-bold flex items-center gap-1 animate-pulse">
              <Zap className="h-3 w-3" />
              ÚLTIMO DIA
            </span>
            <span className="text-muted-foreground">Oferta termina hoje!</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-display font-bold leading-tight">
            Kit para Transformar iPhone XR no 13 Pro Max
          </h1>

          {/* Rating Stars - Clickable */}
          <a 
            href="#reviews" 
            className="flex items-center gap-2 group cursor-pointer w-fit"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-accent text-accent transition-transform group-hover:scale-XR0" />
              ))}
            </div>
            <span className="text-sm font-semibold group-hover:text-accent transition-colors">
              4.9/5.0
            </span>
            <span className="text-xs text-muted-foreground group-hover:text-accent/80 transition-colors">
              (500+ avaliações)
            </span>
          </a>

          {/* Price Section - Black Friday */}
          <div className="bg-secondary/50 p-4 rounded-xl border border-border">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-muted-foreground line-through">De R$ 19,90</span>
              <span className="bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded font-bold">
                ECONOMIA DE 50%
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-display font-bold text-accent">R$ 9,90</span>
              <span className="text-muted-foreground text-sm">BRL</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Preço exclusivo Black Friday • Válido apenas hoje
            </p>
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold">Escolha a Cor:</label>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                    selectedColor === color.name
                      ? "bg-primary text-primary-foreground scale-105 shadow-lg"
                      : "bg-secondary text-secondary-foreground hover:scale-105"
                  }`}
                >
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="space-y-2">
            <Button
              onClick={handleBuyNow}
              size="lg"
              className="w-full text-base md:text-lg font-display font-bold py-6 bg-accent hover:bg-accent/90 transition-all hover:scale-[1.02] shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
            >
              <Zap className="h-5 w-5" />
              APROVEITAR OFERTA
            </Button>
            <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
              <MessageCircle className="h-3.5 w-3.5 text-green-600" />
              Finalize pelo WhatsApp de forma rápida e segura
            </p>
          </div>

          {/* Stock Alert - More Urgency */}
          <div className="flex items-center gap-2 text-accent bg-accent/10 p-3 rounded-lg border border-accent/30">
            <AlertCircle className="h-5 w-5 flex-shrink-0 animate-pulse" />
            <p className="font-semibold text-sm">
              <span className="font-bold">ESGOTANDO:</span> Apenas{" "}
              <span className="font-bold text-base">{stockCount}</span> unidades restantes pelo preço de Black Friday
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
