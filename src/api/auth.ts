import axios from 'axios'
import { apiClient } from './client'
import type { CurrentUser, SignInInput, SignUpInput, TokenPair } from '../types/auth'

const requestTokens = async (path: string, payload: SignInInput | SignUpInput) => (await apiClient.post<TokenPair>(path, payload)).data

export const authApi = {
  signIn: (payload: SignInInput) => requestTokens('/auth/signin', payload),
  signUp: (payload: SignUpInput) => requestTokens('/auth/signup', payload),
  currentUser: async (accessToken: string) => (await apiClient.get<CurrentUser>('/users/me', { headers: { Authorization: `Bearer ${accessToken}` } })).data,
}

export function readableAuthError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const body = error.response?.data
    return body?.error?.message ?? (typeof body?.detail === 'string' ? body.detail : undefined) ?? 'We couldn’t complete that request. Please try again.'
  }
  return 'We couldn’t complete that request. Please try again.'
}
