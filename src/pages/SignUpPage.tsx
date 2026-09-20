import { Link, Stack, TextField, Typography } from '@mui/material'
import { useState, type FormEvent } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { readableAuthError } from '../api/auth'
import { EmailPasswordFields, AuthForm } from '../components/auth/AuthFields'
import { AuthLayout } from '../components/auth/AuthLayout'
import { useAuth } from '../hooks/useAuth'

export function SignUpPage() {
  const { signUp } = useAuth(); const navigate = useNavigate()
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '', phone: '' }); const [error, setError] = useState<string>(); const [loading, setLoading] = useState(false)
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }))
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setError(undefined); setLoading(true); try { await signUp(form); navigate('/') } catch (err) { setError(readableAuthError(err)) } finally { setLoading(false) } }
  return <AuthLayout title="Make your journey last." subtitle="Create an account to start your first poster."><AuthForm error={error} loading={loading} submitLabel="Create account" onSubmit={onSubmit}><Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}><TextField label="First name" autoComplete="given-name" value={form.first_name} onChange={(event) => update('first_name', event.target.value)} required fullWidth /><TextField label="Last name" autoComplete="family-name" value={form.last_name} onChange={(event) => update('last_name', event.target.value)} required fullWidth /></Stack><EmailPasswordFields email={form.email} password={form.password} onChange={(field, value) => update(field, value)} /><TextField label="Phone number (optional)" autoComplete="tel" value={form.phone} onChange={(event) => update('phone', event.target.value)} fullWidth /></AuthForm><Typography variant="body2" textAlign="center" mt={3} color="text.secondary">Already have an account? <Link component={RouterLink} to="/signin" color="secondary.main" fontWeight={800}>Sign in</Link></Typography></AuthLayout>
}
