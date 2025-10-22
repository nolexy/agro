import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { X } from "lucide-react";

export interface FilterState {
  categories: string[];
  priceRange: string | null;
}

interface ProductFiltersProps {
  availableCategories: string[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const priceRanges = [
  { label: "أقل من 50 د.م.", value: "0-50" },
  { label: "50 - 100 د.م.", value: "50-100" },
  { label: "100 - 200 د.م.", value: "100-200" },
  { label: "أكثر من 200 د.م.", value: "200-999999" },
];

export function ProductFilters({ availableCategories, filters, onFilterChange }: ProductFiltersProps) {
  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handlePriceRangeChange = (value: string) => {
    onFilterChange({ ...filters, priceRange: filters.priceRange === value ? null : value });
  };

  const clearFilters = () => {
    onFilterChange({ categories: [], priceRange: null });
  };

  const hasFilters = filters.categories.length > 0 || filters.priceRange !== null;

  return (
    <div className="space-y-6 bg-card p-4 rounded-lg border-2 border-primary/10 shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-primary">التصنيفات</h3>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
            <X className="h-4 w-4" />
            مسح
          </Button>
        )}
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-primary/80">الفئات</h4>
        <div className="space-y-3">
          {availableCategories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={category}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
              />
              <Label htmlFor={category} className="cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-primary/80">نطاق السعر</h4>
        <div className="space-y-3">
          {priceRanges.map((range) => (
            <div key={range.value} className="flex items-center gap-2">
              <Checkbox
                id={range.value}
                checked={filters.priceRange === range.value}
                onCheckedChange={() => handlePriceRangeChange(range.value)}
              />
              <Label htmlFor={range.value} className="cursor-pointer">
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {hasFilters && (
        <>
          <Separator />
          <div className="space-y-2">
            <h4 className="text-primary/80">التصنيفات النشطة</h4>
            <div className="flex flex-wrap gap-2">
              {filters.categories.map((category) => (
                <Badge
                  key={category}
                  className="cursor-pointer gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => handleCategoryToggle(category)}
                >
                  {category}
                  <X className="h-3 w-3" />
                </Badge>
              ))}
              {filters.priceRange && (
                <Badge
                  className="cursor-pointer gap-1 bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => handlePriceRangeChange(filters.priceRange!)}
                >
                  {priceRanges.find((r) => r.value === filters.priceRange)?.label}
                  <X className="h-3 w-3" />
                </Badge>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
