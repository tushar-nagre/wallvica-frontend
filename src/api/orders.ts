import { apiClient } from './client'

export type Order = { id: string; order_number: string; status: string; total: string | number; currency: string; created_at: string }
export const orderApi = { list: async () => (await apiClient.get<Order[]>('/orders')).data }
