import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Product } from "./ProductCard";

interface ProductDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductDialog({ product, isOpen, onClose, onAddToCart }: ProductDialogProps) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <div>
              <Badge variant="outline">{product.category}</Badge>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < product.rating ? "fill-primary text-primary" : "text-muted-foreground"
                  }`}
                />
              ))}
              <span className="mr-2 text-muted-foreground">({product.rating}.0)</span>
            </div>
            <div>
              <span className="text-primary bg-primary/10 px-4 py-2 rounded-full inline-block">{product.price.toFixed(2)} د.م.</span>
            </div>
            <p className="text-muted-foreground">{product.description}</p>
            <div className="space-y-2">
              <h4>تفاصيل المنتج</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• مواد عالية الجودة</li>
                <li>• تصنيع ممتاز</li>
                <li>• إمكانية الإرجاع خلال 30 يوم</li>
                <li>• توصيل مجاني للطلبات التي تزيد عن 200 درهم</li>
              </ul>
            </div>
            {product.inStock ? (
              <Badge variant="secondary">متوفر</Badge>
            ) : (
              <Badge variant="destructive">غير متوفر</Badge>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            disabled={!product.inStock}
            className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg"
            size="lg"
          >
            <ShoppingCart className="h-5 w-5" />
            أضف إلى السلة
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
