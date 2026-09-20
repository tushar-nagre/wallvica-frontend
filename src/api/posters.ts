import { apiClient } from './client'

export type PosterProject = { id: string; product_id: string; style_id: string | null; status: string; created_at: string; generated_preview_url: string | null }
export type CreatePosterInput = { product_id: string; style_id: string; asset_ids: string[] }

export const posterApi = {
  upload: async (file: File) => { const data = new FormData(); data.append('file', file); return (await apiClient.post<{ id: string }>('/uploads', data)).data },
  create: async (input: CreatePosterInput) => (await apiClient.post<PosterProject>('/posters', input)).data,
  list: async () => (await apiClient.get<PosterProject[]>('/posters')).data,
}
