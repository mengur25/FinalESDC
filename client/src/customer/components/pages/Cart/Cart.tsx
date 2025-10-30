import React, { useEffect, useState } from "react";
import CartItemCard from "./CartItemCard";
import { Close } from "@mui/icons-material";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import PricingCard from "./PricingCard";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import { fetchUserCart } from "../../../../State/Customer/cartSlice";
import { applyCoupon } from "../../../../State/Customer/couponSlice";

const Cart = () => {
  const [couponCode, setCouponCode] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const dispatch = useAppDispatch();
  const { cart: cartStore } = useAppSelector((store: any) => store.cart);
  const {
    cart: appliedCart,
    loading: couponLoading,
    error: couponError,
    // THÊM: Lấy state boolean xác nhận coupon đã áp dụng thành công
    couponApplied: isCouponActionApplied, 
  } = useAppSelector((store: any) => store.coupon);

  const currentCart = appliedCart || cartStore;

  const jwt = localStorage.getItem("jwt") || "";

  useEffect(() => {
    dispatch(fetchUserCart(jwt));
  }, [dispatch, jwt]);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
  };

  const handleToggleItem = (itemId: number) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectedProducts =
    currentCart?.cartItems.filter((item: any) => selectedItems.includes(item.id)) ||
    [];

  const rawSubtotal = selectedProducts.reduce(
    (sum: number, item: any) => sum + item.mrpPrice,
    0
  );
  const rawTotalSelling = selectedProducts.reduce(
    (sum: number, item: any) => sum + item.sellingPrice,
    0
  );

  const rawDiscount = rawSubtotal - rawTotalSelling;
  const rawShipping = rawTotalSelling > 50 ? 0 : 4;
  const rawTotal = rawTotalSelling + rawShipping;

  // SỬ DỤNG TRẠNG THÁI `couponApplied` TỪ REDUX HOẶC KIỂM TRA `couponCode`
  const isCouponApplied = isCouponActionApplied || (currentCart?.couponCode !== null && currentCart?.couponCode !== undefined);

  let displaySubtotal: number;
  let displayDiscount: number;
  let displayShipping: number;
  let displayTotal: number;

  if (isCouponApplied) {
    // Logic cho giỏ hàng đã áp dụng coupon
    displaySubtotal = currentCart.totalMrpPrice || rawSubtotal; 
    displayDiscount = (currentCart.totalMrpPrice - currentCart.totalSellingPrice) || rawDiscount; 
    displayShipping = rawShipping; 
    displayTotal = currentCart.totalSellingPrice + displayShipping; 
    console.log("hi");
  } else {
    // Logic cho giỏ hàng chưa có coupon
    displaySubtotal = rawSubtotal;
    displayDiscount = rawDiscount;
    displayShipping = rawShipping;
    displayTotal = rawTotal;
    console.log("cc");
  }

  const appliedCouponName = currentCart?.coupon?.code || (currentCart as any)?.couponCode || ""; 

  const handleApplyCoupon = () => {
    if (!jwt) {
      alert("Please login to apply coupon.");
      return;
    }
    if (!couponCode) {
      alert("Please enter a coupon code.");
      return;
    }
    
    const totalItemsInCart = currentCart?.cartItems?.length || 0;
    if (totalItemsInCart > 0 && selectedProducts.length !== totalItemsInCart) {
        alert("To apply a coupon, you must select ALL items in your cart. Coupon application affects the entire order value calculated by the system.");
        return;
    }
    if (selectedProducts.length === 0) {
      alert("Please select items in the cart first.");
      return;
    }
    
    const orderValueForCoupon = rawTotalSelling;

    dispatch(
      applyCoupon({
        apply: "true",
        code: couponCode,
        orderValue: orderValueForCoupon,
        jwt: jwt,
      })
    );
  };

  const handleRemoveCoupon = () => {
    const currentCouponCode = appliedCouponName;

    if (!currentCouponCode) return;

    dispatch(
      applyCoupon({
        apply: "false",
        code: currentCouponCode,
        orderValue: rawTotalSelling,
        jwt: jwt,
      })
    );
    setCouponCode("");
  };

  const handleBuyNow = () => {
    if (isCouponApplied && selectedProducts.length !== (currentCart?.cartItems?.length || 0)) {
        alert("The coupon is applied to the ENTIRE cart. Please select all items to proceed to checkout with the discounted price.");
        return;
    }
    
    if (selectedProducts.length === 0) {
      alert("Please select at least one item to proceed to checkout.");
      return;
    }
    
    navigate("/checkout", {
      state: {
        selectedProducts,
        subtotal: displaySubtotal,
        discount: displayDiscount,
        shipping: displayShipping,
        total: displayTotal,
      },
    });
  };

  return (
    <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="cartitemSection lg:col-span-2 space-y-3">
          {currentCart?.cartItems.map((item: any) => (
            <CartItemCard
              key={item.id}
              item={item}
              isSelected={selectedItems.includes(item.id)}
              onToggle={() => handleToggleItem(item.id)}
            />
          ))}
        </div>
        <div className="col-span-1 text-sm space-y-3">
          <div className="border rounded-md px-5 py-3 space-y-5">
            {!isCouponApplied ? (
              <div className="flex items-center justify-between gap-2">
                <TextField
                  value={couponCode}
                  onChange={handleChange}
                  fullWidth
                  id="coupon-input"
                  label="Enter coupon code"
                  variant="outlined"
                  size="small"
                  disabled={couponLoading}
                />
                <Button
                  onClick={handleApplyCoupon}
                  variant="contained"
                  disabled={
                    couponLoading || !couponCode || selectedProducts.length === 0
                  }
                >
                  {couponLoading ? "Applying..." : "Apply"}
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-1 pl-3 border rounded-md bg-teal-50">
                <span className="text-teal-600 font-medium">
                  {appliedCouponName} Applied
                </span>
                <IconButton
                  onClick={handleRemoveCoupon}
                  disabled={couponLoading}
                >
                  <Close className="text-red-600 text-lg" />
                </IconButton>
              </div>
            )}
            {couponError && (
              <Typography color="error" variant="body2" className="mt-2">
                {couponError}
              </Typography>
            )}
          </div>

          <div className="border rounded-md">
            <PricingCard
              subtotal={displaySubtotal}
              discount={displayDiscount}
              shipping={displayShipping}
              total={displayTotal}
            />
            <div className="flex items-center w-full justify-center mb-5">
              <Button
                className="!bg-primary !text-white !w-[80%]"
                onClick={handleBuyNow}
                disabled={selectedProducts.length === 0}
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