import { RaffleCard } from "@/components/RaffleCard";
import rifaAutoImage from "@/assets/rifa-autos.jpg";
import rifaDineroImage from "@/assets/rifa-dinero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-secondary/50 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center space-y-6">
            <div className="inline-block">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-primary leading-none tracking-tighter">
                RIFAS
              </h1>
              <div className="flex items-center justify-center gap-3 mt-2">
                <div className="h-px bg-primary/60 flex-1 max-w-12"></div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary/80 tracking-wider">
                  LOS HERMANOS
                </h2>
                <div className="h-px bg-primary/60 flex-1 max-w-12"></div>
              </div>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-medium">
              Elige tu oportunidad de ganar
            </p>
          </div>
        </div>
      </div>

      {/* Rifas Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Rifas Disponibles
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          <RaffleCard
            title="RIFA DE AUTOS"
            price="$5.000"
            minPurchase="Mínimo 2 números"
            image={rifaAutoImage}
            imageAlt="Rifa de Autos Los Hermanos"
            url="https://rifalohermanos.cl/toyota"
            featured={true}
          />
          
          <RaffleCard
            title="RIFA DE DINERO"
            price="$3.000"
            minPurchase="Mínimo 3 números"
            image={rifaDineroImage}
            imageAlt="Rifa de Dinero Los Hermanos"
            url="https://rifalohermanos.cl/dinero"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-secondary py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Rifas Los Hermanos. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;