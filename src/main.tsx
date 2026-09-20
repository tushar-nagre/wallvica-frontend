import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import { AuthProvider } from "./context/AuthContext";

const theme = createTheme({
  palette: {
    primary: { main: "#352d66", contrastText: "#fff" },
    secondary: { main: "#7b67e8", contrastText: "#fff" },
    background: { default: "#F5EFFF", paper: "#ffffff" },
    text: { primary: "#292250", secondary: "#625c81" },
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      letterSpacing: "-.055em",
      fontWeight: 500,
    },
    h2: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      letterSpacing: "-.04em",
      fontWeight: 500,
    },
    button: { textTransform: "none", fontWeight: 750 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          minHeight: 44,
          paddingInline: 20,
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: "none", border: "1px solid rgba(53,45,102,.10)" },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: "#F5EFFF" },
        "::selection": { background: "#CDC1FF", color: "#292250" },
      },
    },
  },
});
const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1 } } });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
