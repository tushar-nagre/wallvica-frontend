import { ArrowForward } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { Product } from "../../types/product";
import { ImagePlaceholder } from "../common/ImagePlaceholder";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card
      sx={{
        bgcolor: "rgba(255,255,255,.72)",
        overflow: "hidden",
        height: "100%",
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/products/${product.slug}`}
        sx={{ height: "100%", alignItems: "stretch" }}
      >
        <ImagePlaceholder
          src={product.image}
          alt={product.name}
          sx={{ aspectRatio: "1.28" }}
        />
        <CardContent sx={{ p: 2.25 }}>
          <Typography fontWeight={800}>{product.name}</Typography>
          <Typography variant="body2" color="text.secondary" mt={0.35}>
            {product.type}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={1.5}
          >
            <Typography fontWeight={900}>{product.price}</Typography>
            <Box
              sx={{
                color: "secondary.main",
                border: "1px solid",
                borderColor: "secondary.light",
                borderRadius: "50%",
                width: 28,
                height: 28,
                display: "grid",
                placeItems: "center",
              }}
            >
              <ArrowForward fontSize="small" />
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
