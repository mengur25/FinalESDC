import {
  Avatar,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  Badge, // Thêm Badge
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  FavoriteBorder,
  Search,
  ShoppingCartOutlined,
  Storefront,
} from "@mui/icons-material";
import CategorySheet from "./CategorySheet";
import { mainCategory } from "../data/category/mainCategory";
import { useNavigate } from "react-router-dom";
import store, { useAppDispatch, useAppSelector } from "../../../State/Store";
import SearchBar from "./SearchBar";
import { getWishlistByUserId } from "../../../State/Customer/wishlistSlice";

const Navbar = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [showCategorySheet, setShowCategorySheet] = useState(false);
  const navigate = useNavigate();
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const { auth } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const { wishlist } = useAppSelector((store) => store.wishlist); 

  const { cart } = useAppSelector((store) => store.cart);
  
  const cartItemCount = cart?.cartItems?.length || 0;
  const wishlistCount = wishlist?.products?.length || 0;

  useEffect(() => {
    dispatch(getWishlistByUserId());
  }, [dispatch]);

  return (
    <>
      <Box className="sticky top-0 left-0 right-0 bg-white z-50">
        <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
          <div className="flex items-center gap-9">
            <div className="flex items-center gap-2">
              <h1
                onClick={() => navigate("/")}
                className="logo cursor-pointer text-lg md:text-2xl text-primary"
              >
                E-commerce
              </h1>
            </div>
          </div>
          <ul className="flex items-center font-medium text-gray-800">
            {mainCategory.map((item) => (
              <li
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  timeoutIdRef.current = setTimeout(() => {
                    setShowCategorySheet(false);
                  }, 10000);
                }}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  if (timeoutIdRef.current) {
                    clearTimeout(timeoutIdRef.current);
                  }
                  setShowCategorySheet(true);
                  setSelectedCategory(item.categoryId);
                }}
                className="mainCategory cursor-pointer hover:text-primary px-4 hover:border-b-4 border-primary"
                key={item.categoryId}
              >
                {item.name}
              </li>
            ))}
          </ul>
          <div className="flex gap-1 lg:gap-6 items-center">
            <SearchBar />
            {auth.isLoggedIn ? (
              <div className="flex flex-col items-center">
                <Button
                  onClick={() => navigate("/account/orders")}
                  className="flex items-center gap-2"
                >
                  <Avatar sx={{ width: 29, height: 29 }} src="profile.png" />{" "}
                  <h1 className="font-semibold hidden lg:block">
                    {auth.user?.fullName}{" "}
                  </h1>{" "}
                </Button>
                <h6 className="text-[12px] text-primary">{auth.user?.email}</h6>
              </div>
            ) : (
              <Button onClick={() => navigate("/login")} variant="contained">
                Login
              </Button>
            )}

            {/* WISHLIST ICON VỚI BADGE */}
            <Badge
              badgeContent={wishlistCount}
              color="error"
              max={99}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <IconButton onClick={() => navigate("/account/wishlist")}>
                <FavoriteBorder sx={{ fontSize: 29 }} />
              </IconButton>
            </Badge>

            {/* CART ICON VỚI BADGE */}
            <Badge
              badgeContent={cartItemCount}
              color="primary"
              max={99}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <IconButton onClick={() => navigate("/cart")}>
                <ShoppingCartOutlined
                  className="text-gray-700"
                  sx={{ fontSize: 29 }}
                />
              </IconButton>
            </Badge>

            {isLarge && (
              <Button
                onClick={() => navigate("/become-seller")}
                startIcon={<Storefront />}
                variant="outlined"
              >
                Become Seller
              </Button>
            )}
          </div>
        </div>
        {showCategorySheet && (
          <div
            onMouseLeave={() => setShowCategorySheet(false)}
            onMouseEnter={() => setShowCategorySheet(true)}
            className="categorySheet absolute top-[4.41rem] left-20 right-20 border bg-slate-500"
          >
            <CategorySheet selectedCategory={selectedCategory} />
          </div>
        )}
      </Box>
    </>
  );
};

export default Navbar;