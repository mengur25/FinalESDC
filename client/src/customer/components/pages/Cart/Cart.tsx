import React, { useEffect, useState } from "react";
import CartItemCard from "./CartItemCard";
import { Close, LocalOffer } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import { Button, IconButton, TextField } from "@mui/material";
import PricingCard from "./PricingCard";
import { useNavigate } from "react-router-dom";
import store, { useAppDispatch, useAppSelector } from "../../../../State/Store";
import { fetchUserCart } from "../../../../State/Customer/cartSlice";

const Cart = () => {
  const [couponCode, setCouponCode] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleChange = (e: any) => {
    setCouponCode(e.target.value);
  };
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((store) => store);

  useEffect(() => {
    dispatch(fetchUserCart(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  const navigate = useNavigate();

  const handleToggleItem = (itemId: number) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectedProducts =
    cart.cart?.cartItems.filter((item) => selectedItems.includes(item.id)) ||
    [];

  const subtotal = selectedProducts.reduce((sum, item) => sum + item.mrpPrice, 0);
const totalSelling = selectedProducts.reduce((sum, item) => sum + item.sellingPrice, 0);

  const discount = subtotal - totalSelling;
  const shipping = totalSelling > 50 ? 0 : 4;
  const total = totalSelling + shipping;

  console.log(subtotal, totalSelling, discount, shipping, total);
  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        selectedProducts,
        subtotal,
        discount,
        shipping,
        total,
      },
    });
  };

  return (
    <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="cartitemSection lg:col-span-2 space-y-3">
          {cart.cart?.cartItems.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              isSelected={selectedItems.includes(item.id)}
              onToggle={() => handleToggleItem(item.id)}
            />
          ))}
        </div>
        <div className="col-span-1 text-sm space-y-3">
          {/* Apply coupon */}
          <div className="border rounded-md px-5 py-3 space-y-5">
            {true ? (
              <div className="flex items-center justify-between">
                {" "}
                <TextField
                  onClick={handleChange}
                  className="w-[400px]"
                  id="outlined-basic"
                  label="Enter coupons"
                  variant="outlined"
                />
                <Button variant="outlined">Apply</Button>{" "}
              </div>
            ) : (
              <div className="flex">
                {" "}
                <div className="p-1 pl-5 border rounded-sm flex gap-2 items-center">
                  <span className="">30POFF Applied</span>{" "}
                  <IconButton>
                    {" "}
                    <Close className="text-red-600" />
                  </IconButton>{" "}
                </div>{" "}
              </div>
            )}
          </div>

          <div className="border rounded-md">
            <PricingCard
              subtotal={subtotal}
              discount={discount}
              shipping={shipping}
              total={total}
            />
            <div className="flex items-center w-full justify-center mb-5">
              <Button
                className="!bg-primary !text-white !w-[80%]"
                onClick={handleBuyNow}
                disabled={selectedItems.length === 0}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
