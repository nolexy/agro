import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
  rating: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const categoryColors: Record<string, string> = {
    "أسمدة": "bg-green-100 text-green-800 border-green-300",
    "مبيدات": "bg-blue-100 text-blue-800 border-blue-300",
    "بذور": "bg-amber-100 text-amber-800 border-amber-300",
    "أنظمة الري": "bg-cyan-100 text-cyan-800 border-cyan-300",
    "معدات": "bg-stone-100 text-stone-800 border-stone-300",
  };

  return (
    <Card className="overflow-hidden group cursor-pointer transition-all hover:shadow-xl hover:shadow-primary/10 border-2 hover:border-primary/30">
      <div 
        className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-muted/50"
        onClick={() => onViewDetails(product)}
      >
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
            <Badge variant="secondary" className="text-lg px-4 py-2">غير متوفر</Badge>
          </div>
        )}
      </div>
      <div className="p-4 space-y-3 bg-gradient-to-b from-card to-secondary/30">
        <div>
          <Badge className={`mb-2 ${categoryColors[product.category] || "bg-secondary"}`}>{product.category}</Badge>
          <h3 
            className="line-clamp-1 cursor-pointer"
            onClick={() => onViewDetails(product)}
          >
            {product.name}
          </h3>
          <p className="text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-primary bg-primary/10 px-3 py-1 rounded-full">{product.price.toFixed(2)} د.م.</span>
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            disabled={!product.inStock}
            className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md"
          >
            <ShoppingCart className="h-4 w-4" />
            أضف
          </Button>
        </div>
      </div>
    </Card>
  );
}
