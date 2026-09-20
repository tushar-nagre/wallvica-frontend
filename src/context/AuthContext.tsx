import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { authApi } from '../api/auth'
import type { CurrentUser, SignInInput, SignUpInput } from '../types/auth'

type AuthContextValue = { user: CurrentUser | null; isAuthenticated: boolean; isLoading: boolean; signIn: (input: SignInInput) => Promise<void>; signUp: (input: SignUpInput) => Promise<void>; signOut: () => void }
export const AuthContext = createContext<AuthContextValue | null>(null)
const accessTokenKey = 'roamlore_access_token'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const establishSession = async (request: () => Promise<{ access_token: string }>) => { const tokens = await request(); sessionStorage.setItem(accessTokenKey, tokens.access_token); setUser(await authApi.currentUser(tokens.access_token)) }
  useEffect(() => { const token = sessionStorage.getItem(accessTokenKey); if (!token) { setIsLoading(false); return }; authApi.currentUser(token).then(setUser).catch(() => sessionStorage.removeItem(accessTokenKey)).finally(() => setIsLoading(false)) }, [])
  const value = useMemo(() => ({ user, isAuthenticated: Boolean(user), isLoading, signIn: (input: SignInInput) => establishSession(() => authApi.signIn(input)), signUp: (input: SignUpInput) => establishSession(() => authApi.signUp(input)), signOut: () => { sessionStorage.removeItem(accessTokenKey); setUser(null) } }), [user, isLoading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
