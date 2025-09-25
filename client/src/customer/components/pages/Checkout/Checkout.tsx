import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import AddressCard from "./AddressCard";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";

const style = {
  position: "absolute",
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
    image: "https://d6xcmfyh68wv8.cloudfront.net/newsroom-content/uploads/2024/05/Razorpay-Logo.jpg",
    label:"Razorpay"
  },
  {
    value: "STRIPE",
    image: "https://vikwp.com/images/plugins/stripe.png",
    label:"Stripe"
  },
];
const Checkout = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [paymentGateway, setPaymentGateway] = useState("RAZORPAY");
  const handlePaymentChange = (event:any)=>{
    setPaymentGateway(event.target.value);
  }
  return (
    <>
      <div className="pt-28 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-2 space-y-5 ">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold"> Select Address</h1>
              <Button onClick={handleOpen}>Add New Address</Button>
            </div>
            <div className="text-xs font-medium space-y-5">
              <p>Saved Addresses</p>
              <div className="flex flex-col gap-4">
                {[1, 1, 1].map((item) => (
                  <AddressCard />
                ))}
              </div>
            </div>
            <div className="py-4 px-5 rounded-md border">
              <Button onClick={handleOpen}>Add New Address</Button>
            </div>
          </div>
          <div className="col-span-1">
            <div className="border rounded-md">
              <div className="space-y-3 border p-5 rounded-md">
                <h1 className="text-primary font-medium pb-2 text-center">Choose Payment Gateway</h1>
                <RadioGroup
                  row
                  aria-labelledby=""
                  name="Payment Method"
                  className="flex justify-between pr-0"
                  value={paymentGateway}
                  onChange={handlePaymentChange}
                >
                  {paymentGatewayList.map((item) =>
                  <FormControlLabel
                  className="border w-[40%] pr-2 rounded-md flex justify-center"
                    value={item.value}
                    label={
                      <img className={`${item.value == "stripe"? 'w-14':""}`} src={item.image} alt={item.label}/>
                    }
                    control={<Radio />}
                  />
                  )}
                  
                </RadioGroup>
              </div>
              <PricingCard />
              <div className="p-5">
                <Button fullWidth variant="contained" sx={{ py: "11px" }}>
                  Pay Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddressForm paymentGateway={paymentGateway}/>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Checkout;
