import { Button, Divider } from "@mui/material";
import React from "react";

const PricingCard = () => {
  return (
    <>
      <div className="space-y-3 p-5">
        <div className="flex justify-between items-center ">
          <span>Subtotal:</span>
          <span>$299</span>
        </div>
        <div className="flex justify-between items-center ">
          <span>Discount:</span>
          <span>$99</span>
        </div>
        <div className="flex justify-between items-center ">
          <span>Shipping:</span>
          <span>$4</span>
        </div>
        <Divider/>
        <div className="flex justify-between items-center text-primary">
          <span>Total:</span>
          <span>$204</span>
        </div>

      </div>
    </>
  );
};

export default PricingCard;
