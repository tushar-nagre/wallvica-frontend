import { Box, Typography } from '@mui/material'

type Props = { src?: string; alt: string; sx?: object }

export function ImagePlaceholder({ src, alt, sx }: Props) {
  if (src) return <Box component="img" src={src} alt={alt} sx={{ display: 'block', width: '100%', objectFit: 'cover', ...sx }} />

  return <Box role="img" aria-label={alt} sx={{ display: 'grid', placeItems: 'center', bgcolor: '#E5D9F2', color: 'primary.main', minHeight: 180, ...sx }}>
    <Typography variant="body2" fontWeight={700}>Travel art preview</Typography>
  </Box>
}
