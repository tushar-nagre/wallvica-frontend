import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { Box, Button, Chip, Container, Divider, Grid, Typography } from '@mui/material'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { ImagePlaceholder } from '../components/common/ImagePlaceholder'
import { ApiFeedback } from '../components/common/ApiFeedback'
import { useProduct } from '../hooks/useProducts'

export function ProductDetailPage() {
  const { slug } = useParams()
  const { product, isLoading, isError, refetch } = useProduct(slug)
  if (!product) return <Container maxWidth="lg" sx={{ py: { xs: 4, md: 7 } }}><ApiFeedback loading={isLoading} error={isError} retry={refetch} /></Container>
  return <Container maxWidth="lg" sx={{ py: { xs: 4, md: 7 } }}>
    <Button component={RouterLink} to={product.isReadyMade ? "/collections" : "/products"} startIcon={<ArrowBack />} color="inherit" sx={{ mb: 3 }}>{product.isReadyMade ? 'All collections' : 'All posters'}</Button>
    <Grid container spacing={{ xs: 4, md: 7 }}>
      <Grid size={{ xs: 12, md: 7 }}><ImagePlaceholder src={product.image} alt={product.name} sx={{ height: { xs: 440, md: 610 }, borderRadius: 2 }} /></Grid>
      <Grid size={{ xs: 12, md: 5 }}><Chip label={product.isReadyMade ? 'Ready-to-print' : product.type} color="secondary" /><Typography variant="h1" sx={{ fontSize: { xs: 50, md: 65 }, color: 'primary.main', mt: 2 }}>{product.name}</Typography><Typography color="text.secondary" fontSize={18} mt={2}>{product.description}</Typography><Typography fontWeight={900} fontSize={25} mt={3}>From {product.price}</Typography><Divider sx={{ my: 3 }} /><Typography fontWeight={800}>{product.materialInfo ?? 'Premium matte art paper'}</Typography><Typography color="text.secondary" mt={.5}>{product.isReadyMade ? 'A curated print, ready to bring character to your wall.' : 'Personalised with your image and artwork style.'}</Typography>{product.isReadyMade ? <Typography color="secondary" fontWeight={800} mt={4}>Ready-made ordering is coming soon.</Typography> : <><Button component={RouterLink} to={`/create/${product.slug}`} variant="contained" color="secondary" fullWidth sx={{ mt: 4 }}>Personalize this poster <ArrowForward /></Button><Typography variant="caption" display="block" textAlign="center" color="text.secondary" mt={1.5}>You approve your preview before we print.</Typography></>}</Grid>
    </Grid>
  </Container>
}
