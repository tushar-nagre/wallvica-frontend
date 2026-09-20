import { Link, Typography } from '@mui/material'
import { useState, type FormEvent } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { readableAuthError } from '../api/auth'
import { AuthForm, EmailPasswordFields } from '../components/auth/AuthFields'
import { AuthLayout } from '../components/auth/AuthLayout'
import { useAuth } from '../hooks/useAuth'

export function SignInPage() {
  const { signIn } = useAuth(); const navigate = useNavigate()
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState<string>(); const [loading, setLoading] = useState(false)
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setError(undefined); setLoading(true); try { await signIn({ email, password }); navigate('/') } catch (err) { setError(readableAuthError(err)) } finally { setLoading(false) } }
  return <AuthLayout title="Welcome back." subtitle="Sign in to follow your poster projects and orders."><AuthForm error={error} loading={loading} submitLabel="Sign in" onSubmit={onSubmit}><EmailPasswordFields email={email} password={password} onChange={(field, value) => field === 'email' ? setEmail(value) : setPassword(value)} /></AuthForm><Typography variant="body2" textAlign="center" mt={3} color="text.secondary">New to Wallvica? <Link component={RouterLink} to="/signup" color="secondary.main" fontWeight={800}>Create an account</Link></Typography></AuthLayout>
}
