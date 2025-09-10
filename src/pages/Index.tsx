import { RaffleCard } from "@/components/RaffleCard";
import rifaAutoImage from "@/assets/rifa-autos.jpg";
import rifaDineroImage from "@/assets/rifa-dinero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary leading-tight tracking-tight">
              RIFAS LOS HERMANOS
            </h1>
            <div className="w-16 md:w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Rifas Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Rifas Disponibles
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Selecciona en cuál rifa deseas participar. Ambas rifas están activas simultáneamente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          <RaffleCard
            title="RIFA DE AUTOS"
            price="$5.000"
            minPurchase="Mínimo 2 números"
            image={rifaAutoImage}
            imageAlt="Rifa de Autos Los Hermanos"
            url="http://rifasloshermanos.cl/"
            featured={true}
          />
          
          <RaffleCard
            title="RIFA DE DINERO"
            price="$3.000"
            minPurchase="Mínimo 3 números"
            image={rifaDineroImage}
            imageAlt="Rifa de Dinero Los Hermanos"
            url="http://rifasloshermanos.cl/dinero"
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