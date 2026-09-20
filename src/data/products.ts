import type { ApiProduct } from '../api/catalog'
import type { Product } from '../types/product'

const images = [
  'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85',
]

export function mapProduct(product: ApiProduct, index = 0): Product {
  const price = new Intl.NumberFormat('en-IN', { style: 'currency', currency: product.currency, maximumFractionDigits: 0 }).format(Number(product.base_price))
  const metadata = product.metadata ?? {}
  const isReadyMade = metadata.listing_kind === 'READY_MADE'
  return { id: product.id, name: product.name, type: isReadyMade ? 'Ready-to-print poster' : product.product_type === 'TRIPTYCH' ? 'Triptych set' : 'Personalized poster', price, slug: product.slug, description: product.description ?? 'A personal travel memory transformed into beautiful wall art.', image: typeof metadata.image_url === 'string' ? metadata.image_url : images[index % images.length], sizeInfo: product.size_info ?? undefined, materialInfo: product.material_info ?? undefined, requiredImageCount: product.required_image_count, isReadyMade }
}
