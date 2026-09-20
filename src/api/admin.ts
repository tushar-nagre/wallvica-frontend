import { apiClient } from './client'
import type { ApiProduct } from './catalog'

export type CreateListingInput = {
  name: string
  slug: string
  description?: string
  product_type: 'SINGLE_POSTER'
  category_id: string
  base_price: number
  size_info: string
  material_info: string
  metadata: { listing_kind: 'READY_MADE'; image_url?: string }
}

export const adminApi = {
  createListing: async (input: CreateListingInput) => (await apiClient.post<ApiProduct>('/admin/products', input)).data,
  deleteListing: async (id: string) => apiClient.delete(`/admin/products/${id}`),
}
