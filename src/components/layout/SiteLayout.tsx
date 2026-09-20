import { useState, type ReactNode } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ArrowForward,
  Menu,
  PersonOutline,
  Search,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { BrandLogo } from "../common/BrandLogo";
import { useAuth } from "../../hooks/useAuth";

type LayoutPart = { children: ReactNode };
const links = [
  ["Home", "/"],
  ["Posters", "/products"],
  ["Collections", "/collections"],
  ["How it works", "/#how-it-works"],
  ["Our story", "/about"],
];

function Header() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        bgcolor: "rgba(245,239,255,.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(53,45,102,.08)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 66, md: 78 } }}>
          <BrandLogo />
          <Stack
            direction="row"
            spacing={3.5}
            sx={{ ml: 9, display: { xs: "none", md: "flex" }, flex: 1 }}
          >
            {links.map(([label, to]) => (
              <Typography
                component={RouterLink}
                to={to}
                key={label}
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                  fontWeight: 650,
                  fontSize: 14,
                }}
              >
                {label}
              </Typography>
            ))}
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <IconButton aria-label="Search">
              <Search />
            </IconButton>
            <IconButton aria-label="Shopping bag">
              <ShoppingBagOutlined />
            </IconButton>
            {user ? <><Button component={RouterLink} to="/account" color="primary">Hi, {user.first_name}</Button><Button color="primary" onClick={signOut}>Sign out</Button></> : <Button component={RouterLink} to="/signin" color="primary" startIcon={<PersonOutline />}>Sign in</Button>}
            {user?.role === "ADMIN" && <Button component={RouterLink} to="/admin/listings" color="primary">Manage listings</Button>}
            <Button
              component={RouterLink}
              to="/products"
              variant="contained"
              color="secondary"
            >
              Create your poster <ArrowForward fontSize="small" />
            </Button>
          </Stack>
          <IconButton
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            sx={{ display: { md: "none" }, ml: "auto" }}
          >
            <Menu />
          </IconButton>
          <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
            <Stack spacing={1} sx={{ width: 290, p: 3, pt: 8 }}>
              {links.map(([label, to]) => (
                <Button
                  component={RouterLink}
                  to={to}
                  key={label}
                  color="inherit"
                  onClick={() => setOpen(false)}
                  sx={{ justifyContent: "flex-start" }}
                >
                  {label}
                </Button>
              ))}
              <Button
                component={RouterLink}
                to="/products"
                variant="contained"
                color="secondary"
              >
                Create your poster
              </Button>
              {user ? <Button color="primary" onClick={signOut}>Sign out</Button> : <Button component={RouterLink} to="/signin" color="primary">Sign in</Button>}
              {user?.role === "ADMIN" && <Button component={RouterLink} to="/admin/listings" color="primary" onClick={() => setOpen(false)}>Manage listings</Button>}
            </Stack>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "primary.main", color: "white", py: 5 }}
    >
      <Container maxWidth="xl">
        <BrandLogo light />
        <Typography variant="body2" sx={{ mt: 2, opacity: 0.7 }}>
          Made for the journeys you want to keep close.
        </Typography>
      </Container>
    </Box>
  );
}
function Root({ children }: LayoutPart) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export const SiteLayout = Object.assign(Root, { Header, Footer });
