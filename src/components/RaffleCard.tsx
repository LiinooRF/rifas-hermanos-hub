import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RaffleCardProps {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  url: string;
  featured?: boolean;
  className?: string;
}

export const RaffleCard = ({ 
  title, 
  subtitle, 
  image, 
  imageAlt, 
  url, 
  featured = false,
  className 
}: RaffleCardProps) => {
  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className={cn(
      "group relative overflow-hidden border-border hover:shadow-luxury transition-all duration-500 cursor-pointer bg-gradient-luxury",
      featured && "ring-2 ring-primary shadow-glow-gold",
      className
    )}
    onClick={handleClick}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={imageAlt}
            className="w-full h-48 md:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute top-4 right-4">
            <ExternalLink className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {subtitle}
            </p>
          </div>
          
          <Button 
            variant="default" 
            className="w-full bg-gradient-gold hover:shadow-glow-gold transition-all duration-300 group-hover:scale-105"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Participar Ahora
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};