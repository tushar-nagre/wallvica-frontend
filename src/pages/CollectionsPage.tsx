import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { ApiFeedback } from "../components/common/ApiFeedback";
import { ProductCard } from "../components/products/ProductCard";
import { useCategories, useProducts } from "../hooks/useProducts";

const collectionSlugs = ["superheroes", "cars", "bikes", "quotes"];

function CollectionProducts({ category }: { category: string }) {
  const { products, isLoading, isError, refetch } = useProducts({
    category,
    readyMade: true,
  });
  return (
    <>
      <ApiFeedback loading={isLoading} error={isError} retry={refetch} />
      {!isLoading && !isError && products.length === 0 && (
        <Box py={8} textAlign="center">
          <Typography color="text.secondary">
            New prints for this collection are on their way.
          </Typography>
        </Box>
      )}
      {!isLoading && !isError && products.length > 0 && (
        <Grid container spacing={2.5}>
          {products.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export function CollectionsPage() {
  const [searchParams] = useSearchParams();
  const [activeCollection, setActiveCollection] = useState(
    () => searchParams.get("category") ?? "superheroes"
  );
  const categories = useCategories();
  const collectionCategories = (categories.data ?? []).filter((category) =>
    collectionSlugs.includes(category.slug)
  );
  const activeCategory =
    collectionCategories.find(
      (category) => category.slug === activeCollection
    ) ?? collectionCategories[0];

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 6, md: 9 } }}>
      <Typography
        variant="overline"
        color="secondary"
        fontWeight={900}
        letterSpacing=".14em"
      >
        Ready-to-print posters
      </Typography>
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: 48, md: 72 },
          lineHeight: 1.02,
          color: "primary.main",
          mt: 1,
        }}
      >
        Explore our posters
        <br />
        collection.
      </Typography>
      <Typography color="text.secondary" fontSize={18} mt={2} maxWidth={630}>
        Browse illustrated, ready-made posters for the things you love. Pick a
        collection, find your print, and make your wall feel more like you.
      </Typography>
      <ApiFeedback
        loading={categories.isLoading}
        error={categories.isError}
        retry={categories.refetch}
      />
      {!categories.isLoading && !categories.isError && (
        <>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mt: 4, mb: 4, overflowX: "auto", pb: 1 }}
          >
            {collectionCategories.map((category) => (
              <Chip
                key={category.id}
                component={Button}
                onClick={() => setActiveCollection(category.slug)}
                label={category.name.replace(" Collection", "")}
                color={
                  activeCategory?.slug === category.slug
                    ? "secondary"
                    : "default"
                }
                variant={
                  activeCategory?.slug === category.slug ? "filled" : "outlined"
                }
              />
            ))}
          </Stack>
          {activeCategory && (
            <Box>
              <Typography
                variant="h2"
                sx={{
                  color: "primary.main",
                  fontSize: { xs: 34, md: 44 },
                  mb: 0.5,
                }}
              >
                {activeCategory.name}
              </Typography>
              <Typography color="text.secondary" mb={3}>
                {activeCategory.description}
              </Typography>
              <CollectionProducts category={activeCategory.slug} />
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
