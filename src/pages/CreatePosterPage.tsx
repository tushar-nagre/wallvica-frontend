import { ArrowBack, ArrowForward, CloudUploadOutlined } from '@mui/icons-material'
import { Alert, Box, Button, Card, Container, Grid, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ApiFeedback } from '../components/common/ApiFeedback'
import { ImagePlaceholder } from '../components/common/ImagePlaceholder'
import { useProduct } from '../hooks/useProducts'

const steps = ['Format', 'Style', 'Photo']
const styleOptions = [
  { id: 'keep-original', name: 'Keep it as it is', copy: 'Print your photo exactly as you love it.', filter: 'none' },
  { id: 'anime-illustrated', name: 'Anime / Illustrated', copy: 'Bold outlines and illustrated colour.', filter: 'saturate(1.25) contrast(1.1)' },
  { id: 'cinematic', name: 'Cinematic', copy: 'A rich, dramatic movie-like finish.', filter: 'contrast(1.18) saturate(.78) brightness(.86)' },
  { id: 'retro-travel-poster', name: 'Retro travel poster', copy: 'A warm vintage travel-art treatment.', filter: 'sepia(.35) saturate(.9) contrast(1.05)' },
]
export function CreatePosterPage() {
  const { slug } = useParams(); const navigate = useNavigate(); const { product, isLoading, isError, refetch } = useProduct(slug)
  const [step, setStep] = useState(0); const [styleId, setStyleId] = useState(''); const [files, setFiles] = useState<File[]>([]); const [error, setError] = useState<string>()
  if (!product) return <Container maxWidth="md" sx={{ py: 8 }}><ApiFeedback loading={isLoading} error={isError} retry={refetch} /></Container>
  const required = product.requiredImageCount
  const selectFiles = (selection: FileList | null) => setFiles(Array.from(selection ?? []).filter((file) => file.type.startsWith('image/')).slice(0, required))
  const next = () => { if (step === 0) setStep(1); if (step === 1 && styleId) setStep(2) }
  const continueToCart = () => { if (files.length !== required) { setError(`Please add ${required} clear journey ${required === 1 ? 'photo' : 'photos'} to continue.`); return }; const style = styleOptions.find((option) => option.id === styleId); navigate('/buy-now', { state: { product, styleName: style?.name ?? 'Custom style', fileNames: files.map((file) => file.name) } }) }
  return <Container maxWidth="md" sx={{ py: { xs: 4, md: 7 }, pb: 12 }}><Typography variant="overline" color="secondary" fontWeight={900}>Create your artwork</Typography><Typography variant="h1" sx={{ color: 'primary.main', fontSize: { xs: 46, md: 62 } }}>Make it yours.</Typography><Stepper activeStep={step} alternativeLabel sx={{ my: 5 }}>{steps.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}</Stepper><Card sx={{ p: { xs: 2.5, md: 4 }, bgcolor: 'rgba(255,255,255,.8)' }}>
    {step === 0 && <><Typography variant="h5" fontWeight={800}>Your selected poster</Typography><Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} mt={3}><ImagePlaceholder src={product.image} alt={product.name} sx={{ width: { xs: '100%', sm: 180 }, aspectRatio: '1', borderRadius: 1.5 }} /><Box><Typography fontWeight={800} fontSize={22}>{product.name}</Typography><Typography color="text.secondary" mt={1}>{product.description}</Typography><Typography fontWeight={900} mt={2}>{product.price}</Typography></Box></Stack></>}
    {step === 1 && <><Typography variant="h5" fontWeight={800}>Choose your style</Typography><Typography color="text.secondary" mt={1}>These examples show the finish your photo will receive. No AI preview is generated at this stage.</Typography><Grid container spacing={2} mt={2}>{styleOptions.map((style) => <Grid key={style.id} size={{ xs: 12, sm: 6 }}><Button variant={styleId === style.id ? 'contained' : 'outlined'} color={styleId === style.id ? 'secondary' : 'primary'} onClick={() => setStyleId(style.id)} fullWidth sx={{ p: 1.25, textAlign: 'left', alignItems: 'stretch' }}><Stack direction="row" spacing={1.5} alignItems="center" width="100%"><ImagePlaceholder src="/images/hero-poster.png" alt={`${style.name} example`} sx={{ width: 76, height: 92, flexShrink: 0, borderRadius: 1, '& img': { filter: style.filter } }} /><Stack alignItems="start"><Typography fontWeight={800}>{style.name}</Typography><Typography variant="caption" sx={{ textAlign: 'left' }}>{style.copy}</Typography></Stack></Stack></Button></Grid>)}</Grid></>}
    {step === 2 && <><Typography variant="h5" fontWeight={800}>Add your journey {required > 1 ? 'photos' : 'photo'}</Typography><Typography color="text.secondary" mt={1}>Use a clear image from your trip. {required > 1 ? `This format needs ${required} photos.` : ''}</Typography><Box component="label" sx={{ display: 'grid', placeItems: 'center', textAlign: 'center', py: 6, mt: 3, border: '2px dashed', borderColor: 'secondary.light', borderRadius: 2, cursor: 'pointer', bgcolor: 'rgba(229,217,242,.35)' }}><CloudUploadOutlined color="secondary" sx={{ fontSize: 40 }} /><Typography fontWeight={800} mt={1}>Choose your photo{required > 1 ? 's' : ''}</Typography><Typography variant="caption" color="text.secondary">JPG, PNG or WEBP</Typography><input hidden type="file" accept="image/*" multiple={required > 1} onChange={(event) => selectFiles(event.target.files)} /></Box>{files.length > 0 && <Typography mt={2} color="text.secondary">{files.map((file) => file.name).join(', ')}</Typography>}</>}
    {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
  </Card><Stack direction="row" justifyContent="space-between" mt={3}>{step > 0 ? <Button onClick={() => setStep(step - 1)} startIcon={<ArrowBack />}>Back</Button> : <Box />}{step < 2 && <Button onClick={next} variant="contained" color="secondary" disabled={step === 1 && !styleId}>Continue <ArrowForward /></Button>}{step === 2 && <Button onClick={continueToCart} variant="contained" color="secondary">Continue to order <ArrowForward /></Button>}</Stack></Container>
}
