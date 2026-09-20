import { Box } from '@mui/material'
import { ImagePlaceholder } from '../common/ImagePlaceholder'

type PosterProps = { src: string; small?: boolean; sx?: object }
function WallPoster({ src, small = false, sx }: PosterProps) {
  return <Box sx={{ position: 'absolute', filter: 'drop-shadow(5px 13px 12px rgba(58,45,70,.2))', ...sx }}>
    <ImagePlaceholder src={src} alt="Travel art poster" sx={{ aspectRatio: small ? '3/4' : '2/3' }} />
  </Box>
}
function Sunlight() { return <><Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 82% 8%, rgba(255,255,255,.9), transparent 32%), linear-gradient(125deg, #d8c9ed 0%, #f8f5fc 50%, #e8deef 100%)' }} /><Box sx={{ position: 'absolute', top: '-18%', left: '-10%', width: '38%', height: '84%', opacity: .17, transform: 'skewX(-16deg)', background: 'repeating-linear-gradient(90deg, rgba(255,255,255,.92) 0 18%, transparent 18% 24%), linear-gradient(180deg, white, transparent)' }} /></> }
function DeskSetup() { return <><Box sx={{ position: 'absolute', left: '4%', right: '8%', bottom: '7%', height: '12%', bgcolor: '#b98962', borderRadius: '2px 2px 0 0', boxShadow: '0 8px 12px rgba(77,48,30,.22)' }} /><Box sx={{ position: 'absolute', left: '12%', bottom: '19%', width: '27%', height: '17%', bgcolor: '#37374a', borderRadius: 1, border: '5px solid #20202b', boxShadow: '0 5px 8px rgba(39,27,53,.2)' }}><Box sx={{ position: 'absolute', inset: 4, background: 'linear-gradient(140deg, #bbdcf2, #7266ac)' }} /><Box sx={{ position: 'absolute', width: '25%', height: 10, bgcolor: '#292839', bottom: -15, left: '37%' }} /></Box><Box sx={{ position: 'absolute', left: '7%', bottom: '3%', width: '8%', height: '13%', bgcolor: '#8f6549', transform: 'skewX(-7deg)' }} /><Box sx={{ position: 'absolute', right: '15%', bottom: '3%', width: '8%', height: '13%', bgcolor: '#8f6549', transform: 'skewX(7deg)' }} /></> }
function HousePlant() { return <Box sx={{ position: 'absolute', right: '2%', bottom: '16%', width: 50, height: 105, borderRadius: '50% 50% 12% 12%', bgcolor: '#c9a982', boxShadow: '0 5px 7px rgba(64,45,27,.2)' }}><Box sx={{ position: 'absolute', width: 120, height: 95, left: -42, top: -83, borderRadius: '65% 7% 65% 6%', bgcolor: '#527555', transform: 'rotate(-15deg)', boxShadow: '50px 28px #73906e, 70px -18px #476e51, 12px 58px #88a67b' }} /></Box> }
export function PosterRoom() {
  return <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', right: 0, top: 0, bottom: 0, width: '53%', overflow: 'hidden', bgcolor: '#E5D9F2', borderLeft: '1px solid rgba(53,45,102,.08)' }}>
    <Sunlight />
    <WallPoster src="/images/hero-poster.png" sx={{ width: '31%', left: '25%', top: '9%' }} />
    <WallPoster small src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=350&q=80" sx={{ width: 78, right: '8%', top: '18%', transform: 'rotate(4deg)' }} />
    <WallPoster small src="https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=350&q=80" sx={{ width: 65, right: '20%', top: '36%', transform: 'rotate(-5deg)' }} />
    <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '7%', bgcolor: '#eee7ef', borderTop: '5px solid rgba(255,255,255,.85)' }} />
    <DeskSetup /><HousePlant />
  </Box>
}
