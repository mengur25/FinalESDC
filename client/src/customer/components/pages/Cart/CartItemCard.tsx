import React, { useState } from "react";
import pr4 from "../../../../assets/pr4.png";
import { Button, Divider, IconButton } from "@mui/material";
import { Add, Close, Remove } from "@mui/icons-material";
import { CartItem } from "../../../../types/CartType";
import { useAppDispatch } from "../../../../State/Store";
import { updateCartItem } from "../../../../State/Customer/cartSlice";

const CartItemCard = ({item}: {item:CartItem}) => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useAppDispatch();

  const handleUpdateQuantity = (value:number) => () =>{ 
    dispatch(updateCartItem({jwt: localStorage.getItem("jwt"),
      cartItemId:item.id,
      cartItem:{quantity: item.quantity + value}
    }))
  }
  return (
    <div className="border rounded-sm relative">
      <div className="p-5 flex gap-3">
        <div>
          <img className="w-[90px] rounded-sm" src={item.product.images[0]} alt="" />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold text-lg">{item.product.seller?.businessDetails.bussinessName}</h1>
          <p className="text-gray-600 font-medium text-sm">
            {item.product.title}
          </p>
          <p className="text-gray-400 text-xs">
            <strong>Sold by:</strong> Lifestyle Products Private Limited
          </p>
          <p className="text-sm">7 days replacement available</p>
          <p className="text-sm text-gray-500">
            <strong>Quantity: </strong> {item.quantity}
          </p>
        </div>
      </div>
        <Divider />

        <div className="flex justify-between items-center me-2">
          <div className="px-5 py-2 flex justify-between items-center">
            <div className="flex items-center gap-2 w-[140px] justify-between">
              <Button
                onClick={handleUpdateQuantity(-1)}
                disabled={quantity <= -1}
              >
                <Remove />
              </Button>
              <span>{item.quantity}</span>

              <Button onClick={handleUpdateQuantity(1)}>
                <Add />
              </Button>
            </div>
          
          </div>
          <div>
            <p className="text-gray-700 font-medium">${item.sellingPrice}</p>
          </div>
        </div>
        <div className="absolute top-1 right-0">
          <IconButton className="primary">
            <Close className="text-primary"/>
          </IconButton>
        </div>
    </div>
  );
};

export default CartItemCard;
