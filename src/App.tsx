import { Route, Routes } from "react-router-dom";
import { SiteLayout } from "./components/layout/SiteLayout";
import { AboutPage } from "./pages/AboutPage";
import { BuyNowPage } from "./pages/BuyNowPage";
import { AccountPage } from "./pages/AccountPage";
import { AdminListingsPage } from "./pages/AdminListingsPage";
import { CollectionsPage } from "./pages/CollectionsPage";
import { CreatePosterPage } from "./pages/CreatePosterPage";
import { HomePage } from "./pages/HomePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { ProductsPage } from "./pages/ProductsPage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";

export function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<SiteLayout><Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/create/:slug" element={<CreatePosterPage />} />
        <Route path="/buy-now" element={<BuyNowPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/admin/listings" element={<AdminListingsPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes></SiteLayout>} />
    </Routes>
  );
}
