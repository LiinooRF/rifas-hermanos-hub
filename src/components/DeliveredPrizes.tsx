import { useState } from "react";
import { DeliveredPrize } from "./DeliveredPrize";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Imports de las imágenes
import premioAuto1 from "@/assets/premio-auto-1.jpg";
import premioDinero1 from "@/assets/premio-dinero-1.jpg";
import premioAuto2 from "@/assets/premio-auto-2.jpg";
import premioDinero2 from "@/assets/premio-dinero-2.jpg";
import premioAuto3 from "@/assets/premio-auto-3.jpg";
import premioDinero3 from "@/assets/premio-dinero-3.jpg";

const deliveredPrizes = [
  {
    id: 1,
    image: premioAuto1,
    imageAlt: "Ganador del Auto Toyota",
    description: "Toyota Corolla 2024 - Sorteo Marzo",
    winner: "Carlos Mendoza",
    instagramUrl: "https://instagram.com/rifaloshermanos"
  },
  {
    id: 2,
    image: premioDinero1,
    imageAlt: "Ganador Premio en Dinero",
    description: "$5.000.000 en Efectivo - Sorteo Febrero",
    winner: "María González",
    instagramUrl: "https://instagram.com/rifaloshermanos"
  },
  {
    id: 3,
    image: premioAuto2,
    imageAlt: "Entrega de Auto Premio",
    description: "Honda Civic 2024 - Sorteo Enero",
    winner: "José Rodriguez",
    instagramUrl: "https://instagram.com/rifaloshermanos"
  },
  {
    id: 4,
    image: premioDinero2,
    imageAlt: "Familia Ganadora",
    description: "$3.000.000 en Efectivo - Sorteo Diciembre",
    winner: "Familia Pérez",
    instagramUrl: "https://instagram.com/rifaloshermanos"
  },
  {
    id: 5,
    image: premioAuto3,
    imageAlt: "Ganador SUV Premio",
    description: "Mazda CX-5 2024 - Sorteo Noviembre",
    winner: "Andrea Silva",
    instagramUrl: "https://instagram.com/rifaloshermanos"
  },
  {
    id: 6,
    image: premioDinero3,
    imageAlt: "Joven Ganador",
    description: "$2.500.000 en Efectivo - Sorteo Octubre",
    winner: "Diego Morales",
    instagramUrl: "https://instagram.com/rifaloshermanos"
  },
  {
    id: 7,
    image: premioAuto1,
    imageAlt: "Segundo Ganador Auto",
    description: "Toyota RAV4 2023 - Sorteo Septiembre",
    winner: "Carmen López",
    instagramUrl: "https://instagram.com/rifaloshermanos"
  },
  {
    id: 8,
    image: premioDinero1,
    imageAlt: "Segundo Premio Dinero",
    description: "$4.000.000 en Efectivo - Sorteo Agosto",
    winner: "Roberto Díaz",
    instagramUrl: "https://instagram.com/rifaloshermanos"
  }
];

const PRIZES_PER_PAGE = 6;

export const DeliveredPrizes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(deliveredPrizes.length / PRIZES_PER_PAGE);
  const startIndex = (currentPage - 1) * PRIZES_PER_PAGE;
  const currentPrizes = deliveredPrizes.slice(startIndex, startIndex + PRIZES_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of section
    document.getElementById('premios-entregados')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section id="premios-entregados" className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          PREMIOS ENTREGADOS
        </h2>
        <p className="text-muted-foreground">
          Conoce a nuestros afortunados ganadores
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-8">
        {currentPrizes.map((prize) => (
          <DeliveredPrize
            key={prize.id}
            image={prize.image}
            imageAlt={prize.imageAlt}
            description={prize.description}
            winner={prize.winner}
            instagramUrl={prize.instagramUrl}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-muted"}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={page === currentPage}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-muted"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
};