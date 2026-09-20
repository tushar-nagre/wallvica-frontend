import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminApi, type CreateListingInput } from '../api/admin'

export function useAdminListings() {
  const queryClient = useQueryClient()
  const refreshListings = () => queryClient.invalidateQueries({ queryKey: ['products'] })
  const createListing = useMutation({ mutationFn: (input: CreateListingInput) => adminApi.createListing(input), onSuccess: refreshListings })
  const deleteListing = useMutation({ mutationFn: (id: string) => adminApi.deleteListing(id), onSuccess: refreshListings })
  return { createListing, deleteListing }
}
