import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Navbar from "./customer/components/Navbar/Navbar";
import customeTheme from "./Theme/customeTheme";
import { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "./State/Store";
import { fetchSellerProfile } from "./State/Seller/SellerSlice";
import { fetchUserProfile } from "./State/AuthSlice";
import { createHomeCategory } from "./State/Customer/customerSlice";
import { homeCategories } from "./customer/components/data/HomeCategories";

// Pages
import Home from "./customer/components/pages/Home/Home";
import Product from "./customer/components/pages/Product/Product";
import ProductDetails from "./customer/components/pages/Product/ProductDetails";
import Review from "./customer/components/pages/Review/Review";
import Cart from "./customer/components/pages/Cart/Cart";
import Checkout from "./customer/components/pages/Checkout/Checkout";
import Account from "./customer/components/pages/Account/Account";
import LoginForm from "./customer/components/pages/Auth/LoginForm";
import Auth from "./customer/components/pages/Auth/Auth";
import Register from "./customer/components/pages/Auth/Register";
import Wishlist from "./customer/components/pages/Wishlist/Wishlist";
import BecomeSeller from "./customer/components/pages/BecomeSeller/BecomeSeller";
import SellerDashboard from "./seller/pages/SellerDashboard/SellerDashboard";
import AdminDashboard from "./admin/pages/Dashboard/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import AddressForm from "./customer/components/pages/Checkout/AddressForm";
import PaymentSuccess from "./customer/components/pages/Checkout/PaymentSuccess";
import WriteReview from "./customer/components/pages/Review/WriteReview";
import LoginRequiredRoute from "./LoginRequiredRoute";

function App() {
  const dispatch = useAppDispatch();
  const { seller, auth } = useAppSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/become-seller") {
      navigate("/become-seller");
    }
  }, [seller.profile, navigate]);

  useEffect(() => {
    if (window.location.pathname === "/admin") {
      navigate("/admin");
    }
  }, [seller.profile, navigate]);

  useEffect(() => {
    dispatch(fetchSellerProfile(localStorage.getItem("jwt") || ""));
    dispatch(createHomeCategory(homeCategories));
  }, []);

  useEffect(() => {
    dispatch(
      fetchUserProfile({ jwt: auth.jwt || localStorage.getItem("jwt") || "" })
    );
  }, [auth.jwt]);

  return (
    <ThemeProvider theme={customeTheme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:category" element={<Product />} />
        <Route path="/reviews/:productId/create" element={<WriteReview />} />
        <Route path="/product-details/:categoryId/:title/:id" element={<ProductDetails />} />
        <Route path="/reviews/:productId" element={<Review />} />
        <Route
          path="/product-details/:categoryId/:title/:id"
          element={<ProductDetails />}
        />
        <Route path="/become-seller" element={<BecomeSeller />} />
        <Route element={<LoginRequiredRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/account/*" element={<Account />} />
        </Route>
        <Route
          path="/seller/*"
          element={
            <ProtectedRoute allowedRole="ROLE_SELLER">
              <SellerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRole="ROLE_ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
