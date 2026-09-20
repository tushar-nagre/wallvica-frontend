import { useQuery } from "@tanstack/react-query";
import { catalogApi } from "../api/catalog";
import { mapProduct } from "../data/products";

type ProductOptions = {
  featured?: boolean;
  category?: string;
  readyMade?: boolean;
};

export function useProducts(options: ProductOptions = {}) {
  const query = useQuery({
    queryKey: ["products", options],
    queryFn: () => catalogApi.listProducts(options),
    select: (page) => page.items.map(mapProduct),
  });

  console.log("DATA:::::", query.data);

  const products = (query.data ?? []).filter(
    (product) =>
      options.readyMade === undefined ||
      product.isReadyMade === options.readyMade
  );
  return { ...query, products, featuredProducts: products.slice(0, 3) };
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: catalogApi.listCategories,
  });
}

export function useProduct(slug?: string) {
  const query = useQuery({
    queryKey: ["product", slug],
    queryFn: () => catalogApi.getProduct(slug!),
    enabled: Boolean(slug),
    select: (product) => mapProduct(product),
  });
  return { ...query, product: query.data };
}
