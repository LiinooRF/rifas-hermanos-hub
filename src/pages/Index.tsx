import { RaffleCard } from "@/components/RaffleCard";
import rifaAutoImage from "@/assets/rifa-autos.jpg";
import rifaDineroImage from "@/assets/rifa-dinero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-luxury">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/d6e78cdd-fb8d-4ea9-89da-889fc7a20fa3.png')] bg-center bg-no-repeat bg-contain opacity-10" />
        
        <div className="relative container mx-auto px-4 py-12 md:py-20">
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight">
                RIFAS LOS
                <span className="block bg-gradient-gold bg-clip-text text-transparent">
                  HERMANOS
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-gold mx-auto rounded-full" />
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Elige tu oportunidad de ganar. Dos rifas simultáneas, 
              <span className="text-primary font-semibold"> dos formas de cambiar tu vida</span>
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
          <p className="text-muted-foreground max-w-xl mx-auto">
            Selecciona en cuál rifa deseas participar. Ambas rifas están activas simultáneamente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          <RaffleCard
            title="RIFA DE AUTOS"
            subtitle="Participa por increíbles vehículos. Tu próximo auto te está esperando con Los Hermanos."
            image={rifaAutoImage}
            imageAlt="Rifa de Autos Los Hermanos"
            url="http://rifasloshermanos.cl/"
            featured={true}
          />
          
          <RaffleCard
            title="RIFA DE DINERO"
            subtitle="Gana premios en efectivo que pueden cambiar tu vida. Grandes sumas te esperan."
            image={rifaDineroImage}
            imageAlt="Rifa de Dinero Los Hermanos"
            url="http://rifasloshermanos.cl/dinero"
          />
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-card rounded-2xl p-8 max-w-4xl mx-auto border border-border">
            <h3 className="text-2xl font-bold text-primary mb-4">
              ¿Por qué elegir Los Hermanos?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-primary-foreground">✓</span>
                </div>
                <h4 className="font-semibold text-foreground">Confiabilidad</h4>
                <p className="text-muted-foreground">Años de experiencia en rifas exitosas</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-primary-foreground">🎯</span>
                </div>
                <h4 className="font-semibold text-foreground">Transparencia</h4>
                <p className="text-muted-foreground">Sorteos públicos y verificables</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-primary-foreground">🏆</span>
                </div>
                <h4 className="font-semibold text-foreground">Premios Reales</h4>
                <p className="text-muted-foreground">Ganadores reales, premios garantizados</p>
              </div>
            </div>
          </div>
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