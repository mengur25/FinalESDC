import { Divider } from "@mui/material";
import React from "react";

interface PricingCardProps {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

const PricingCard = ({ subtotal, discount, shipping, total }: PricingCardProps) => {
  return (
    <div className="space-y-3 p-5">
      <div className="flex justify-between items-center ">
        <span>Subtotal:</span>
        <span>${subtotal}</span>
      </div>
      <div className="flex justify-between items-center ">
        <span>Discount:</span>
        <span>${discount}</span>
      </div>
      <div className="flex justify-between items-center ">
        <span>Shipping:</span>
        <span>${shipping}</span>
      </div>
      <Divider />
      <div className="flex justify-between items-center text-primary">
        <span>Total:</span>
        <span>${total}</span>
      </div>
    </div>
  );
};

export default PricingCard;
