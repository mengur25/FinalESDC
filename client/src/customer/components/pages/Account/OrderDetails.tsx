import { Box, Button, Divider, CircularProgress } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderStepper from "./OrderStepper";
import { Payments } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import {
  fetchOrderById,
  fetchOrderItemById,
  cancelOrder,
} from "../../../../State/Customer/orderSlice";

const formatCurrency = (amount: number | undefined): string => {
  if (amount === undefined || amount === null) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const OrderDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { orderId, orderItemId } = useParams();

  const { currentOrder, orderItem, loading } = useAppSelector(
    (state: any) => state.order
  );

  const jwt = localStorage.getItem("jwt") || "";
  const orderStatus = currentOrder?.orderStatus || "PENDING";

  const orderCreationDate = currentOrder?.orderDate || currentOrder?.createAt;
  const sellerBusinessName =
    orderItem?.product?.seller?.businessDetails?.bussinessName;

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById({ orderId: Number(orderId), jwt }));
    }
    if (orderItemId) {
      dispatch(fetchOrderItemById({ orderItemId: Number(orderItemId), jwt }));
    }
  }, [dispatch, orderId, orderItemId]);

  const handleCancelOrder = () => {
    if (!currentOrder || !currentOrder.id) return;

    if (
      window.confirm(
        "Are you sure you want to cancel this order? This action cannot be undone."
      )
    ) {
      dispatch(cancelOrder({ orderId: currentOrder.id, jwt }))
        .then(() => alert("Order successfully cancelled."))
        .catch((err) => alert("Failed to cancel order: " + err));
    }
  };

  const savedPrice =
    (orderItem?.product?.mrpPrice || 0) -
    (orderItem?.product?.sellingPrice || 0);

  if (loading && !currentOrder) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="space-y-5">
      <section className="flex flex-col gap-5 justify-center items-center">
        <img
          src={orderItem?.product?.images?.[0]}
          className="w-[100px]"
          alt={orderItem?.product?.title || "Product Image"}
        />
        <div className="text-sm space-y-1 text-center">
          <h1 className="font-bold">{sellerBusinessName || "Seller"}</h1>
          <p>{orderItem?.product?.title}</p>
          <p>
            <strong>Size: </strong>
            {orderItem?.size || "N/A"}
          </p>
        </div>
        <div>
          <Button
            onClick={() =>
              navigate(`/reviews/${orderItem?.product?.id}/create`)
            }
          >
            Write Review
          </Button>
        </div>
      </section>

      <section className="border p-5">
        <OrderStepper
          orderStatus={orderStatus}
          orderDate={orderCreationDate}
          sellerBusinessName={sellerBusinessName}
        />
      </section>

      <div className="border p-5">
        <h1 className="font-bold pb-3">Delivery Address</h1>
        <div className="text-sm space-y-2">
          <div className="flex gap-5 font-medium">
            <p>{currentOrder?.shippingAddress?.name}</p>
            <Divider flexItem orientation="vertical" />
            <p>{currentOrder?.shippingAddress?.mobile}</p>
          </div>
          <p>
            {currentOrder?.shippingAddress?.address},{" "}
            {currentOrder?.shippingAddress?.ward},{" "}
            {currentOrder?.shippingAddress?.city},{" "}
            {currentOrder?.shippingAddress?.pinCode}
          </p>
        </div>
      </div>

      <div className="border space-y-4">
        <div className="flex justify-between text-sm pt-5 px-5 pb-5">
          <div className="space-y-1">
            <p className="font-bold">Total Item Price</p>
            <p>
              You Saved:{" "}
              <span className="text-green-500 font-medium text-xs">
                {formatCurrency(savedPrice)}
              </span>{" "}
              on this item.
            </p>
            <p className="font-medium">
              {formatCurrency(orderItem?.sellingPrice)}
            </p>
          </div>
        </div>

        <div className="px-5 pb-4">
          <div className="bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3">
            <Payments />
            <p>{currentOrder?.paymentMethod || "Razorpay"}</p>
          </div>
        </div>
      </div>

      <Divider />

      <div className="px-5 pb-5">
        <p className="text-xs">
          <strong>Sold By: </strong>
          {sellerBusinessName || "N/A"}
        </p>
      </div>

      <div className="p-10">
        <Button
          color="error"
          sx={{ py: "0.7rem" }}
          variant="outlined"
          fullWidth
          onClick={handleCancelOrder}
          disabled={orderStatus === "DELIVERED" || orderStatus === "CANCELLED"}
        >
          {orderStatus === "CANCELLED" ? "Order Canceled" : "Cancel Order"}
        </Button>
      </div>
    </Box>
  );
};

export default OrderDetails;
