import {
  Avatar,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
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
import store, { useAppSelector } from "../../../State/Store";

const Navbar = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [showCategorySheet, setShowCategorySheet] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAppSelector((store) => store);
  return (
    <>
      <Box className="sticky top-0 left-0 right-0 bg-white z-50">
        <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
          <div className="flex items-center gap-9">
            <div className="flex items-center gap-2">
              <IconButton>
                <MenuIcon />
              </IconButton>
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
                onMouseLeave={() => {
                  setShowCategorySheet(false);
                }}
                onMouseEnter={() => {
                  setShowCategorySheet(true);
                  setSelectedCategory(item.categoryId);
                }}
                className="mainCategory cursor-pointer hover:text-primary px-4 hover:border-b-4 border-primary"
              >
                {item.name}
              </li>
            ))}
          </ul>
          <div className="flex gap-1 lg:gap-6 items-center">
            <IconButton>
              <Search />
            </IconButton>
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

            <IconButton onClick={() => navigate("/wishlist")}>
              <FavoriteBorder sx={{ fontSize: 29 }} />
            </IconButton>
            <IconButton onClick={() => navigate("/cart")}>
              <ShoppingCartOutlined
                className="text-gray-700"
                sx={{ fontSize: 29 }}
              />
            </IconButton>
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
