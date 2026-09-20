import { Alert, Button, Stack, TextField } from '@mui/material'
import type { FormEvent, ReactNode } from 'react'

export function AuthForm({ children, error, loading, submitLabel, onSubmit }: { children: ReactNode; error?: string; loading: boolean; submitLabel: string; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <Stack component="form" spacing={2} mt={4} onSubmit={onSubmit} noValidate>{error && <Alert severity="error">{error}</Alert>}{children}<Button type="submit" variant="contained" color="secondary" disabled={loading} sx={{ mt: 1 }}>{loading ? 'Please wait…' : submitLabel}</Button></Stack>
}
export function EmailPasswordFields({ email, password, onChange }: { email: string; password: string; onChange: (field: 'email' | 'password', value: string) => void }) {
  return <><TextField label="Email address" type="email" autoComplete="email" value={email} onChange={(event) => onChange('email', event.target.value)} required fullWidth /><TextField label="Password" type="password" autoComplete="current-password" value={password} onChange={(event) => onChange('password', event.target.value)} helperText="Use at least 8 characters." required fullWidth /></>
}
