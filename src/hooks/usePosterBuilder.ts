import { useMutation, useQuery } from '@tanstack/react-query'
import { catalogApi } from '../api/catalog'
import { posterApi } from '../api/posters'
import type { Product } from '../types/product'

export function usePosterBuilder(product?: Product) {
  const styles = useQuery({ queryKey: ['poster-styles'], queryFn: catalogApi.listStyles })
  const createPoster = useMutation({ mutationFn: async ({ styleId, files }: { styleId: string; files: File[] }) => { if (!product) throw new Error('Product is unavailable.'); const assets = await Promise.all(files.map(posterApi.upload)); return posterApi.create({ product_id: product.id, style_id: styleId, asset_ids: assets.map((asset) => asset.id) }) } })
  return { styles, createPoster }
}
