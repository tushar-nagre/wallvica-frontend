import { Box, Chip, Container, Grid, Stack, Typography } from '@mui/material'
import { ApiFeedback } from '../components/common/ApiFeedback'
import { ProductCard } from '../components/products/ProductCard'
import { useProducts } from '../hooks/useProducts'

export function ProductsPage() { const { products, isLoading, isError, refetch } = useProducts({ readyMade: false }); return <Container maxWidth="xl" sx={{ py: { xs: 6, md: 9 } }}><Typography variant="overline" color="secondary" fontWeight={900}>Personalized posters</Typography><Typography variant="h1" sx={{ fontSize: { xs: 52, md: 76 }, color: 'primary.main' }}>Made for your walls.<br />Made from your story.</Typography><Stack direction="row" spacing={1} sx={{ mt: 4, mb: 4, overflowX: 'auto' }}><Chip label="All posters" color="secondary" /><Chip label="Single posters" variant="outlined" /><Chip label="Triptych sets" variant="outlined" /></Stack><ApiFeedback loading={isLoading} error={isError} retry={refetch} />{!isLoading && !isError && <Grid container spacing={2.5}>{products.map((product) => <Grid key={product.slug} size={{ xs: 12, sm: 4 }}><ProductCard product={product} /></Grid>)}</Grid>}</Container> }
