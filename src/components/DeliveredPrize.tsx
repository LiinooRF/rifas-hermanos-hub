import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Instagram } from "lucide-react";

interface DeliveredPrizeProps {
  image: string;
  imageAlt: string;
  description: string;
  instagramUrl: string;
  winner: string;
}

export const DeliveredPrize = ({ image, imageAlt, description, instagramUrl, winner }: DeliveredPrizeProps) => {
  const handleClick = () => {
    window.open(instagramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="group overflow-hidden cursor-pointer hover:shadow-luxury transition-all duration-300 border-border/50 hover:border-primary/50" onClick={handleClick}>
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={imageAlt}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Instagram className="h-5 w-5 text-primary" />
          </div>
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2 text-foreground">
              <ExternalLink className="h-4 w-4" />
              <span className="text-sm font-medium">Ver en Instagram</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {description}
          </h3>
          <p className="text-sm text-muted-foreground">
            Ganador: <span className="text-primary font-medium">{winner}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};