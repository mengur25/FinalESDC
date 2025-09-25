import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, ThemeProvider } from "@mui/material";
import Navbar from "./customer/components/Navbar/Navbar";
import customeTheme from "./Theme/customeTheme";
import Home from "./customer/components/pages/Home/Home";
import Product from "./customer/components/pages/Product/Product";
import PageDetails from "./customer/components/pages/Page Details/PageDetails";
import Review from "./customer/components/pages/Review/Review";
import Cart from "./customer/components/pages/Cart/Cart";
import Checkout from "./customer/components/pages/Checkout/Checkout";
import Account from "./customer/components/pages/Account/Account";
import { Route, Routes, useNavigate } from "react-router";
import ProductDetails from "./customer/components/pages/Product/ProductDetails";
import BecomeSeller from "./customer/components/pages/BecomeSeller/BecomeSeller";
import SellerDashboard from "./seller/pages/SellerDashboard/SellerDashboard";
import AdminDashboard from "./admin/pages/Dashboard/AdminDashboard";
import { fetchProducts } from "./State/fetchProduct";
import { Toaster } from "react-hot-toast";
import store, { useAppDispatch, useAppSelector } from "./State/Store";
import ProtectedRoute from "./ProtectedRoute";
import { fetchSellerProfile } from "./State/Seller/SellerSlice";
import LoginForm from "./customer/components/pages/Auth/LoginForm";
import Auth from "./customer/components/pages/Auth/Auth";
import Register from "./customer/components/pages/Auth/Register";
import { fetchUserProfile } from "./State/AuthSlice";
import PaymentSuccess from "./customer/components/pages/PaymentSuccess";
import Wishlist from "./customer/components/pages/Wishlist/Wishlist";
import { createHomeCategory } from "./State/Customer/customerSlice";
import { homeCategories } from "./customer/components/data/HomeCategories";

function App() {
  const dispatch = useAppDispatch();
  const {seller,auth} = useAppSelector((store) => store);

  const navigate = useNavigate();

  useEffect(() => {
  if (window.location.pathname === "/become-seller") {
    navigate("/become-seller");
  }
}, [seller.profile, navigate]);


  useEffect(() => {
    dispatch(fetchSellerProfile(localStorage.getItem("jwt") || ""));
    dispatch(createHomeCategory(homeCategories));
  }, []);

  useEffect(() =>{
    dispatch(fetchUserProfile({jwt: auth.jwt || localStorage.getItem("jwt") || ""}));
  },[auth.jwt]);
  return (
    <ThemeProvider theme={customeTheme}>
      <div>
        {/* <Home/> */}
        {/* <PageDetails/> */}
        {/* <Review/> */}
        {/* <Cart/> */}
        {/* <Checkout/> */}
        {/* <Account/> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Product />} />
          <Route path="/reviews/:productId" element={<Review />} />
          <Route
            path="/product-details/:categoryId/:title/:id"
            element={<ProductDetails />}
          />

          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success/:orderId" element={<PaymentSuccess />} />
          <Route path="/become-seller" element={<BecomeSeller />} />
          <Route path="/account/*" element={<Account />} />
          <Route
            path="/seller/*"
            element={
              <ProtectedRoute
                element={<SellerDashboard />}
                allowedRole="ROLE_SELLER"
              />
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute
                element={<AdminDashboard />}
                allowedRole="ROLE_ADMIN"
              />
            }
          />
        </Routes>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
