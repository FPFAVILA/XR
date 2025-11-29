import { Star } from "lucide-react";

import review1 from "@/assets/reviews/review-1.jpg";
import review2 from "@/assets/reviews/review-2.jpg";
import review3 from "@/assets/reviews/review-3.jpg";
import review4 from "@/assets/reviews/review-4.jpg";
import review5 from "@/assets/reviews/review-5.jpg";
import review6 from "@/assets/reviews/review-6.jpg";
import review7 from "@/assets/reviews/review-7.jpg";
import review8 from "@/assets/reviews/review-8.jpg";
import review9 from "@/assets/reviews/review-9.jpg";
import review10 from "@/assets/reviews/review-10.jpg";

const Reviews = () => {
  const reviews = [
    {
      name: "Maria Silva",
      rating: 5,
      comment: "Produto incrível! Meu iPhone 11 ficou com aparência de 13 Pro Max. Super recomendo!",
      image: review1,
    },
    {
      name: "João Pedro",
      rating: 5,
      comment: "Chegou rápido e a qualidade surpreendeu. Parece original!",
      image: review2,
    },
    {
      name: "Ana Carolina",
      rating: 5,
      comment: "Transformou completamente meu celular. Vale muito a pena pelo preço!",
      image: review3,
    },
    {
      name: "Carlos Eduardo",
      rating: 5,
      comment: "Instalação super fácil! Em 5 minutos meu iPhone estava com cara de novo. Recomendo demais!",
      image: review4,
    },
    {
      name: "Fernanda Costa",
      rating: 5,
      comment: "Amei! A película é de excelente qualidade e não sai. Meu iPhone ficou perfeito!",
      image: review5,
    },
    {
      name: "Lucas Almeida",
      rating: 5,
      comment: "Melhor compra que fiz! Todo mundo pergunta se meu celular é novo. Vale cada centavo!",
      image: review6,
    },
    {
      name: "Juliana Santos",
      rating: 5,
      comment: "Produto de altíssima qualidade. Chegou antes do prazo e bem embalado. Super satisfeita!",
      image: review7,
    },
    {
      name: "Rafael Oliveira",
      rating: 5,
      comment: "Não acreditava que seria tão bom! Meu 11 ficou idêntico ao 13 Pro Max. Impressionante!",
      image: review8,
    },
    {
      name: "Patricia Lima",
      rating: 5,
      comment: "Comprei para mim e para minha irmã. Ambas adoramos! Material resistente e bonito.",
      image: review9,
    },
    {
      name: "Bruno Ferreira",
      rating: 5,
      comment: "Excelente custo-benefício! Em vez de gastar milhares em um novo iPhone, gastei R$ 9,90 e ficou show!",
      image: review10,
    },
  ];

  return (
    <section id="reviews" className="py-12 md:py-16 bg-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 md:mb-6">
            O Que Nossos Clientes Dizem
          </h2>
          <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 md:h-7 md:w-7 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-lg md:text-xl font-bold">4.9/5.0</span>
            <span className="text-sm md:text-base text-muted-foreground">(500+ avaliações)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-4 md:p-6 space-y-3 md:space-y-4 animate-fade-in hover:shadow-xl transition-all hover:scale-[1.02] hover:border-accent/30"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Review Header */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-base md:text-lg font-bold text-accent">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm md:text-base truncate">{review.name}</p>
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 md:h-4 md:w-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Comment */}
              <p className="text-sm md:text-base text-foreground leading-relaxed">
                {review.comment}
              </p>

              {/* Customer Photo */}
              {review.image && (
                <div className="rounded-lg overflow-hidden bg-secondary/30">
                  <img
                    src={review.image}
                    alt={`Avaliação de ${review.name}`}
                    className="w-full h-56 md:h-64 object-cover object-[center_20%] hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-8 md:mt-12 text-center animate-fade-in">
          <p className="text-sm md:text-base text-muted-foreground">
            Junte-se a centenas de clientes satisfeitos! ⭐
          </p>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
