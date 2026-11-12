import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

export default function ProductGrid() {
  return (
    <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
