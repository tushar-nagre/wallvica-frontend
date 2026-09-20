import { apiClient } from './client'

export type ApiProduct = { id: string; name: string; slug: string; description: string | null; product_type: 'SINGLE_POSTER' | 'TRIPTYCH'; base_price: string | number; currency: string; size_info: string | null; material_info: string | null; required_image_count: number; featured: boolean; metadata: Record<string, unknown> }
export type ApiStyle = { id: string; name: string; slug: string; description: string | null; preview_image: string | null }
export type Category = { id: string; name: string; slug: string; description: string | null; image: string | null }
type ProductPage = { items: ApiProduct[]; total: number; limit: number; offset: number }

export const catalogApi = {
  listProducts: async (params: { featured?: boolean; category?: string; limit?: number; offset?: number } = {}) => (await apiClient.get<ProductPage>('/products', { params: { limit: 24, offset: 0, ...params } })).data,
  getProduct: async (slug: string) => (await apiClient.get<ApiProduct>(`/products/${slug}`)).data,
  listStyles: async () => (await apiClient.get<ApiStyle[]>('/poster-styles')).data,
  listCategories: async () => (await apiClient.get<Category[]>('/categories')).data,
}
