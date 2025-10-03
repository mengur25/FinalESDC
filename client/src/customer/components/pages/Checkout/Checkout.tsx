import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";
import { useLocation } from "react-router-dom";
import UserAddressCard from "../Account/UserAddressCard";
import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import { createAddress, fetchAddresses, selectAddress } from "../../../../State/Customer/AddressSlice";
import { createOrder } from "../../../../State/Customer/orderSlice";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const paymentGatewayList = [
  {
    value: "RAZORPAY",
    image:
      "https://d6xcmfyh68wv8.cloudfront.net/newsroom-content/uploads/2024/05/Razorpay-Logo.jpg",
    label: "Razorpay",
  },
  {
    value: "STRIPE",
    image: "https://vikwp.com/images/plugins/stripe.png",
    label: "Stripe",
  },
];

const Checkout = () => {
  const location = useLocation();
  const {
    selectedProducts = [],
    subtotal = 0,
    discount = 0,
    shipping = 0,
    total = 0,
  } = location.state || {};

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
const token = localStorage.getItem("jwt");
  // Payment Gateway
  const [paymentGateway, setPaymentGateway] = useState("RAZORPAY");
  const handlePaymentChange = (event: any) =>
    setPaymentGateway(event.target.value);


  const dispatch = useAppDispatch();
const { addresses, selectedAddress  } = useAppSelector((state) => state.address);

useEffect(() => {
  dispatch(fetchAddresses());
}, [dispatch]);

  const handleAddAddress = (newAddress: any) => {
  dispatch(createAddress(newAddress));
};
const handleSelectAddress = (id: number) => {
  dispatch(selectAddress(id));
};


const handlePayNow = () => {
  if (!selectedAddress) {
    alert("Please select an address before payment!");
    return;
  }

  const addressObj = addresses.find((a) => a.id === selectedAddress);


  console.log("Pay with:", paymentGateway);
  console.log("Address:", addressObj);
  console.log("Order:", {
    selectedProducts,
    subtotal,
    discount,
    shipping,
    total,
  });
if (!token) {
  alert("You must be logged in to place an order!");
  return;
}
   dispatch(
    createOrder({
      addressId: selectedAddress, // vì selectedAddress là id rồi
      jwt: token,
      paymentGateway, // "RAZORPAY" hoặc "STRIPE"
    })
  );
};


  return (
    <>
      <div className="pt-28 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* LEFT: Address */}
          <div className="col-span-2 space-y-5">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">Select Address</h1>
              <Button variant="contained" onClick={handleOpen}>
                Add New Address
              </Button>
            </div>

            <div className="space-y-3">
  {addresses.length > 0 ? (
    addresses.map((item) => (
      <UserAddressCard
        key={item.id}
        address={item}
        selected={selectedAddress === item.id}
        onSelect={() => handleSelectAddress(item.id)}
        onEdit={() => null}
      />
    ))
  ) : (
    <p>No addresses found. Please add one.</p>
  )}
</div>

          </div>

          {/* RIGHT: Payment + Pricing */}
          <div className="col-span-1">
            <div className="border rounded-md">
              <div className="space-y-3 border p-5 rounded-md">
                <h1 className="text-primary font-medium pb-2 text-center">
                  Choose Payment Gateway
                </h1>
                <RadioGroup
                  row
                  name="Payment Method"
                  className="flex justify-between pr-0"
                  value={paymentGateway}
                  onChange={handlePaymentChange}
                >
                  {paymentGatewayList.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      className="border w-[40%] pr-2 rounded-md flex justify-center"
                      value={item.value}
                      label={
                        <img
                          className={`${item.value === "STRIPE" ? "w-14" : ""}`}
                          src={item.image}
                          alt={item.label}
                        />
                      }
                      control={<Radio />}
                    />
                  ))}
                </RadioGroup>
              </div>

              <PricingCard
                subtotal={subtotal}
                discount={discount}
                shipping={shipping}
                total={total}
              />

              <div className="p-5">
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ py: "11px" }}
                  onClick={handlePayNow}
                >
                  Pay Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <AddressForm onSave={handleAddAddress} onClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

export default Checkout;
