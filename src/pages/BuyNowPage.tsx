import { ArrowBack, CheckCircle, ShoppingBagOutlined } from '@mui/icons-material'
import { Alert, Box, Button, Card, Container, Divider, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { readableAuthError } from '../api/auth'
import { useAuth } from '../hooks/useAuth'
import { useRazorpayCheckout } from '../hooks/useRazorpayCheckout'
import type { Product } from '../types/product'

type CartState = { product?: Product; styleName?: string; fileNames?: string[] }

export function BuyNowPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const cart = (state ?? {}) as CartState
  const { startPayment } = useRazorpayCheckout()
  const [error, setError] = useState('')
  const [paying, setPaying] = useState(false)
  const [paid, setPaid] = useState(false)
  const [address, setAddress] = useState({ full_name: user ? `${user.first_name} ${user.last_name}` : '', phone: '', address_line_1: '', address_line_2: '', city: '', state: '', postal_code: '', country: 'IN' })
  const updateAddress = (field: keyof typeof address, value: string) => setAddress((current) => ({ ...current, [field]: value }))
  const pay = async () => {
    if (!cart.product) { setError('Choose a poster before checking out.'); return }
    if (!user) { navigate('/signin'); return }
    setError(''); setPaying(true)
    try { await startPayment({ product: cart.product, styleName: cart.styleName ?? 'Keep it as it is', fileNames: cart.fileNames ?? [], address, customerName: address.full_name, customerEmail: user.email, customerPhone: address.phone }, () => setPaid(true)) } catch (paymentError) { setError(readableAuthError(paymentError)) } finally { setPaying(false) }
  }
  return <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
    <Button component={RouterLink} to="/products" startIcon={<ArrowBack />} color="inherit" sx={{ mb: 3 }}>Continue browsing</Button>
    <Typography variant="overline" color="secondary" fontWeight={900}>Your cart</Typography>
    <Typography variant="h1" sx={{ color: 'primary.main', fontSize: { xs: 45, md: 60 }, mt: 1 }}>Almost on your wall.</Typography>
    <Card sx={{ mt: 4, p: 3, bgcolor: 'rgba(255,255,255,.78)' }}><Stack direction="row" spacing={2} alignItems="center"><ShoppingBagOutlined color="secondary" /><Box><Typography fontWeight={900}>{cart.product?.name ?? 'Your custom poster'}</Typography><Typography variant="body2" color="text.secondary">{cart.styleName ?? 'Style selected'}</Typography></Box></Stack><Divider sx={{ my: 2.5 }} /><Typography variant="body2" color="text.secondary">Uploaded photo{(cart.fileNames?.length ?? 0) === 1 ? '' : 's'}</Typography><Typography mt={.5}>{cart.fileNames?.join(', ') ?? 'Your selected image will appear here.'}</Typography><Typography fontWeight={900} fontSize={22} mt={3}>{cart.product?.price ?? 'Price shown at checkout'}</Typography><Divider sx={{ my: 2.5 }} />{paid ? <Stack alignItems="center" textAlign="center" py={2}><CheckCircle color="success" sx={{ fontSize: 52 }} /><Typography fontWeight={900} mt={1}>Payment verified.</Typography><Typography color="text.secondary">Your order is confirmed.</Typography></Stack> : <><Typography fontWeight={800}>Delivery details</Typography><Stack spacing={1.5} mt={2}><TextField required label="Full name" value={address.full_name} onChange={(event) => updateAddress('full_name', event.target.value)} /><TextField required label="Phone" value={address.phone} onChange={(event) => updateAddress('phone', event.target.value)} /><TextField required label="Address" value={address.address_line_1} onChange={(event) => updateAddress('address_line_1', event.target.value)} /><TextField label="Apartment / landmark" value={address.address_line_2} onChange={(event) => updateAddress('address_line_2', event.target.value)} /><Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}><TextField required label="City" value={address.city} onChange={(event) => updateAddress('city', event.target.value)} /><TextField required label="State" value={address.state} onChange={(event) => updateAddress('state', event.target.value)} /><TextField required label="PIN code" value={address.postal_code} onChange={(event) => updateAddress('postal_code', event.target.value)} /></Stack></Stack>{error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}<Button onClick={pay} disabled={paying} variant="contained" color="secondary" fullWidth sx={{ mt: 3 }}>{paying ? 'Opening secure payment…' : 'Pay securely with Razorpay'}</Button><Typography variant="caption" color="text.secondary" display="block" textAlign="center" mt={1.5}>You will be redirected to Razorpay’s secure checkout.</Typography></>}</Card>
  </Container>
}
