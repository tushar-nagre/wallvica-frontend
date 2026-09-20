import {
  CheckCircle,
  PaletteOutlined,
  PhotoOutlined,
} from "@mui/icons-material";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { HeroSection } from "../components/hero/HeroSection";
import { ApiFeedback } from "../components/common/ApiFeedback";
import { ProductCard } from "../components/products/ProductCard";
import { useProducts } from "../hooks/useProducts";

const benefits = [
  [PhotoOutlined, "Personalized for you", "Your photo, your story."],
  [PaletteOutlined, "Choose your style", "Illustrated, cinematic or retro."],
  [CheckCircle, "Approve before print", "See your artwork first."],
];
const steps = [
  ["01", "Upload", "Choose a favourite journey photo."],
  ["02", "Choose style", "Pick the look that feels like you."],
  ["03", "Preview", "We create your artwork to review."],
  ["04", "Print & deliver", "You approve it, we bring it home."],
];

function Benefits() {
  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={0}
        sx={{
          mt: { xs: 3, md: 2 },
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "rgba(229,217,242,.7)",
          border: "1px solid rgba(53,45,102,.08)",
        }}
      >
        {benefits.map(([Icon, title, copy]) => {
          const ItemIcon = Icon as typeof PhotoOutlined;
          return (
            <Grid size={{ xs: 12, md: 4 }} key={title as string}>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  p: 2.5,
                  borderRight: { md: "1px solid rgba(53,45,102,.1)" },
                  borderBottom: { xs: "1px solid rgba(53,45,102,.1)", md: 0 },
                }}
              >
                <ItemIcon color="secondary" />
                <Box>
                  <Typography fontWeight={800}>{title as string}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {copy as string}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
function HowItWorks() {
  return (
    <Container id="how-it-works" maxWidth="xl">
      <Box py={{ xs: 8, md: 11 }}>
        <Grid container spacing={5} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="overline"
              color="secondary"
              fontWeight={900}
              letterSpacing=".14em"
            >
              How it works
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: "primary.main",
                fontSize: { xs: 43, md: 56 },
                lineHeight: 1.02,
                mt: 1,
              }}
            >
              Your photo to wall art, without the fuss.
            </Typography>
            <Button
              component={RouterLink}
              to="/products"
              variant="contained"
              color="secondary"
              sx={{ mt: 3 }}
            >
              Create your poster
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={2}>
              {steps.map(([number, title, copy]) => (
                <Grid size={{ xs: 6, md: 3 }} key={number}>
                  <Box
                    sx={{
                      p: 2,
                      minHeight: 175,
                      bgcolor: "rgba(255,255,255,.55)",
                      borderRadius: 2,
                    }}
                  >
                    <Typography color="secondary" fontWeight={900}>
                      {number}
                    </Typography>
                    <Typography fontWeight={800} mt={3}>
                      {title}
                    </Typography>
                    <Typography color="text.secondary" variant="body2" mt={0.8}>
                      {copy}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
function FeaturedProducts() {
  const { featuredProducts, isLoading, isError, refetch } = useProducts({ readyMade: false });
  return (
    <Container maxWidth="xl">
      <Box py={{ xs: 7, md: 9 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="end"
          mb={3}
        >
          <Box>
            <Typography
              variant="overline"
              color="secondary"
              fontWeight={900}
              letterSpacing=".14em"
            >
              Featured posters
            </Typography>
            <Typography
              variant="h2"
              sx={{ color: "primary.main", fontSize: { xs: 42, md: 56 } }}
            >
              Find your format.
            </Typography>
          </Box>
          <Button
            component={RouterLink}
            to="/products"
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            View all posters
          </Button>
        </Stack>
        <ApiFeedback loading={isLoading} error={isError} retry={refetch} />
        {!isLoading && !isError && <Grid container spacing={2.5}>
          {featuredProducts.map((product) => (
            <Grid size={{ xs: 12, sm: 4 }} key={product.slug}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>}
      </Box>
    </Container>
  );
}
function ClosingBanner() {
  return (
    <Box sx={{ bgcolor: "#E5D9F2" }}>
      <Container maxWidth="xl">
        <Grid container alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ py: { xs: 7, md: 10 }, pr: { md: 8 } }}>
              <Typography
                variant="h2"
                sx={{
                  color: "primary.main",
                  fontSize: { xs: 42, md: 58 },
                  lineHeight: 1.02,
                }}
              >
                Some moments deserve more than a spot in your camera roll.
              </Typography>
              <Typography color="text.secondary" mt={2}>
                Make a memory part of your home—one that brings you back every
                time you look at it.
              </Typography>
              <Button
                component={RouterLink}
                to="/products"
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
              >
                Start with your photo
              </Button>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85"
              alt="Mountain lake travel destination"
              sx={{
                display: "block",
                width: "100%",
                height: { xs: 300, md: 440 },
                objectFit: "cover",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
export function HomePage() {
  return (
    <>
      <HeroSection />
      <Benefits />
      <HowItWorks />
      <FeaturedProducts />
      <ClosingBanner />
    </>
  );
}
