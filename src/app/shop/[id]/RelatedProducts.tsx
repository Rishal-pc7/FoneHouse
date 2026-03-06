import { getProducts } from "../shop.actions";
import ProductCard from "../_components/ProductCard";

interface RelatedProductsProps {
    category: string;
    currentProductId: number;
}

export default async function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
    // Fetch all products (could be optimized with a specific query, but using existing action for now)
    const allProducts = await getProducts();

    // Filter to same category, exclude current, and limit to 4
    const relatedProducts = allProducts
        .filter(p => p.category === category && p.id !== currentProductId)
        .slice(0, 4);

    if (relatedProducts.length === 0) return null;

    return (
        <div className="container mx-auto px-4 pt-16 mt-16 border-t border-gray-100 dark:border-zinc-800">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                You might also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 content-stretch items-stretch">
                {relatedProducts.map((product, index) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        animationDelay={index * 100}
                    />
                ))}
            </div>
        </div>
    );
}
