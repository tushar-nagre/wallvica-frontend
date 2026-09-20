import { useQuery } from '@tanstack/react-query'
import { orderApi } from '../api/orders'
import { posterApi } from '../api/posters'
import { useAuth } from './useAuth'

export function useAccount() {
  const { user } = useAuth()
  const posters = useQuery({ queryKey: ['posters'], queryFn: posterApi.list, enabled: Boolean(user) })
  const orders = useQuery({ queryKey: ['orders'], queryFn: orderApi.list, enabled: Boolean(user) })
  return { user, posters, orders }
}
