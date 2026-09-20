import { Box, Stack } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export function BrandLogo({ light = false }: { light?: boolean }) {
  return <Stack component={RouterLink} to="/" spacing={0} sx={{ textDecoration: 'none', width: { xs: 118, md: 140 } }}>
    <Box component="img" src="/images/wallvica-logo-cropped.png" alt="Wallvica — Your stories. On your walls." sx={{ display: 'block', width: '100%', filter: light ? 'invert(1)' : 'none' }} />
  </Stack>
}
