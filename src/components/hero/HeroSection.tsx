import { ArrowForward, Star } from "@mui/icons-material";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const galleryCards = Array.from({ length: 14 });

function PosterGallery() {
  return (
    <Box
      sx={{ mt: { xs: 4, md: 3 }, overflow: "hidden", mx: { xs: -2, md: -5 } }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          width: "max-content",
          pr: 1.5,
          animation: "wallvicaScroll 44s linear infinite",
          "@keyframes wallvicaScroll": {
            from: { transform: "translateX(0)" },
            to: { transform: "translateX(-36%)" },
          },
        }}
      >
        {galleryCards.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: { xs: 125, sm: 170, md: 195 },
              height: { xs: 170, sm: 220, md: 250 },
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: "primary.main",
              boxShadow: "0 9px 18px rgba(53,45,102,.17)",
              transform: `translateY(${[0, 16, 4, 22][index % 4]}px)`,
            }}
          >
            <Box
              component="img"
              src="/images/hero-poster.png"
              alt="Wallvica poster on a wall"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: `${40 + (index % 4) * 15}% center`,
                filter: `hue-rotate(${(index % 4) * 9}deg) saturate(${
                  0.9 + (index % 3) * 0.08
                })`,
              }}
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

const quickLinks = [
  ["Superhero posters", "/collections?category=superheroes"],
  ["Cars posters", "/collections?category=cars"],
  ["Bikes posters", "/collections?category=bikes"],
  ["Create your own", "/products"],
];

function QuickLinks() {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "block" },
        position: "absolute",
        top: 82,
        right: { md: 8, lg: 100 },
        width: "38%",
        maxWidth: 500,
      }}
    >
      <Typography
        variant="overline"
        color="text.secondary"
        fontWeight={800}
        letterSpacing=".12em"
      >
        Find your wall style
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 1.5,
          mt: 1.5,
        }}
      >
        {quickLinks.map(([label, to], index) => (
          <Button
            key={label}
            component={RouterLink}
            to={to}
            variant={index === 3 ? "contained" : "outlined"}
            color={index === 3 ? "secondary" : "primary"}
            size="small"
            sx={{
              minHeight: 42,
              justifyContent: "space-between",
              px: 1.4,
              fontSize: 12,
            }}
          >
            {label}
            <ArrowForward sx={{ fontSize: 16 }} />
          </Button>
        ))}
      </Box>
      <Button
        component={RouterLink}
        to="/collections"
        color="primary"
        endIcon={<ArrowForward />}
        sx={{ mt: 1.5, px: 0, fontWeight: 800 }}
      >
        Explore other collection
      </Button>
    </Box>
  );
}

export function HeroSection() {
  return (
    <Box
      sx={{
        overflow: "hidden",
        bgcolor: "#F5EFFF",
        borderBottom: "1px solid rgba(53,45,102,.08)",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          pt: { xs: 7, md: 9 },
          pb: { xs: 7, md: 8 },
        }}
      >
        <Box sx={{ maxWidth: { xs: 780, md: "52%" } }}>
          <Typography
            variant="overline"
            sx={{
              color: "secondary.main",
              fontWeight: 900,
              letterSpacing: ".14em",
            }}
          >
            <Star
              sx={{ fontSize: 16, verticalAlign: "text-bottom", mr: 0.5 }}
            />{" "}
            Made for your walls
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 52, sm: 70, md: 94 },
              lineHeight: 0.92,
              letterSpacing: "-.055em",
              color: "primary.main",
              mt: 1,
            }}
          >
            Your wall.
            <br />
            <Box
              component="span"
              sx={{ color: "secondary.main", fontStyle: "italic" }}
            >
              Your story.
            </Box>
          </Typography>
          <Typography
            sx={{
              mt: 2.5,
              maxWidth: 520,
              fontSize: { xs: 17, md: 19 },
              color: "text.secondary",
              lineHeight: 1.55,
            }}
          >
            Turn the moments, places and things you love into art that makes
            your space feel like home.
          </Typography>
        </Box>
        <QuickLinks />
        <PosterGallery />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          alignItems={{ sm: "center" }}
          mt={{ xs: 5, md: 6 }}
          sx={{ display: { md: "none" } }}
        >
          <Button
            component={RouterLink}
            to="/collections"
            variant="contained"
            color="secondary"
          >
            Shop our collections <ArrowForward fontSize="small" />
          </Button>
          <Button
            component={RouterLink}
            to="/products"
            variant="contained"
            color="primary"
          >
            Create your own poster
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
