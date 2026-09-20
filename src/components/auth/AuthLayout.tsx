import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import { BrandLogo } from '../common/BrandLogo'

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return <Box sx={{ minHeight: '100vh', py: { xs: 3, md: 5 }, display: 'flex', alignItems: 'center', background: 'radial-gradient(circle at 88% 12%, rgba(205,193,255,.8), transparent 27%), #F5EFFF' }}>
    <Container maxWidth="sm"><Stack alignItems="center" spacing={3}><BrandLogo /><Paper elevation={0} sx={{ width: '100%', p: { xs: 3, sm: 5 }, border: '1px solid rgba(53,45,102,.1)', boxShadow: '0 20px 60px rgba(72,55,115,.12)' }}><Typography component="h1" variant="h2" sx={{ color: 'primary.main', fontSize: { xs: 38, md: 47 } }}>{title}</Typography><Typography color="text.secondary" mt={1}>{subtitle}</Typography>{children}</Paper><Typography variant="caption" color="text.secondary">Your stories. On your walls.</Typography></Stack></Container>
  </Box>
}
