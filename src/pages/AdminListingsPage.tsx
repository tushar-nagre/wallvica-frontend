import { useEffect, useState, type FormEvent } from 'react'
import { DeleteOutline } from '@mui/icons-material'
import { Alert, Box, Button, Container, Grid, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { readableAuthError } from '../api/auth'
import { ApiFeedback } from '../components/common/ApiFeedback'
import { ImagePlaceholder } from '../components/common/ImagePlaceholder'
import { useAuth } from '../hooks/useAuth'
import { useAdminListings } from '../hooks/useAdminListings'
import { useCategories, useProducts } from '../hooks/useProducts'

const listingCategories = new Set(['superheroes', 'cars', 'bikes', 'quotes'])
const initialForm = { name: '', slug: '', price: '499', categoryId: '', imageUrl: '', description: '' }

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function AdminListingsPage() {
  const { user, isLoading: authLoading } = useAuth()
  const categories = useCategories()
  const { products, isLoading, isError, refetch } = useProducts({ readyMade: true })
  const { createListing, deleteListing } = useAdminListings()
  const [form, setForm] = useState(initialForm)
  const categoryOptions = (categories.data ?? []).filter((category) => listingCategories.has(category.slug))

  useEffect(() => { if (!form.categoryId && categoryOptions[0]) setForm((value) => ({ ...value, categoryId: categoryOptions[0].id })) }, [form.categoryId, categoryOptions])
  if (authLoading) return null
  if (user?.role !== 'ADMIN') return <Navigate to="/" replace />

  const updateForm = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }))
  const submit = async (event: FormEvent) => {
    event.preventDefault()
    await createListing.mutateAsync({ name: form.name, slug: form.slug || slugify(form.name), description: form.description || undefined, product_type: 'SINGLE_POSTER', category_id: form.categoryId, base_price: Number(form.price), size_info: 'A3', material_info: 'Premium matte art paper', metadata: { listing_kind: 'READY_MADE', image_url: form.imageUrl || undefined } })
    setForm((value) => ({ ...initialForm, categoryId: value.categoryId }))
  }

  return <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
    <Typography variant="overline" color="secondary" fontWeight={900}>Admin only</Typography>
    <Typography variant="h1" sx={{ color: 'primary.main', fontSize: { xs: 44, md: 62 }, mb: 4 }}>Manage collection posters</Typography>
    <Grid container spacing={4} alignItems="start">
      <Grid size={{ xs: 12, md: 4 }}><Paper component="form" onSubmit={submit} sx={{ p: 3, position: { md: 'sticky' }, top: 95 }}><Typography fontWeight={900} fontSize={20} mb={2}>Add a ready-made poster</Typography><Stack spacing={2}><TextField required label="Poster name" value={form.name} onChange={(event) => updateForm('name', event.target.value)} /><TextField label="Slug" helperText="Optional — created from the name if blank." value={form.slug} onChange={(event) => updateForm('slug', slugify(event.target.value))} /><TextField required select label="Collection" value={form.categoryId} onChange={(event) => updateForm('categoryId', event.target.value)}>{categoryOptions.map((category) => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}</TextField><TextField required label="Price (₹)" type="number" inputProps={{ min: 0 }} value={form.price} onChange={(event) => updateForm('price', event.target.value)} /><TextField label="Image URL" value={form.imageUrl} onChange={(event) => updateForm('imageUrl', event.target.value)} /><TextField label="Description" multiline minRows={2} value={form.description} onChange={(event) => updateForm('description', event.target.value)} /><Button type="submit" variant="contained" color="secondary" disabled={createListing.isPending || !form.categoryId}>{createListing.isPending ? 'Adding poster…' : 'Add poster'}</Button>{createListing.isError && <Alert severity="error">{readableAuthError(createListing.error)}</Alert>}</Stack></Paper></Grid>
      <Grid size={{ xs: 12, md: 8 }}><ApiFeedback loading={isLoading} error={isError} retry={refetch} />{!isLoading && !isError && <Stack spacing={2}>{products.map((product) => <Paper key={product.id} sx={{ display: 'flex', overflow: 'hidden' }}><ImagePlaceholder src={product.image} alt="" sx={{ width: 115, flexShrink: 0, aspectRatio: '1' }} /><Box sx={{ p: 2, flex: 1, minWidth: 0 }}><Typography fontWeight={850}>{product.name}</Typography><Typography variant="body2" color="text.secondary" noWrap>{product.slug} · {product.price}</Typography></Box><Button aria-label={`Delete ${product.name}`} color="error" disabled={deleteListing.isPending} onClick={() => deleteListing.mutate(product.id)}><DeleteOutline /></Button></Paper>)}</Stack>}{deleteListing.isError && <Alert severity="error" sx={{ mt: 2 }}>{readableAuthError(deleteListing.error)}</Alert>}</Grid>
    </Grid>
  </Container>
}
