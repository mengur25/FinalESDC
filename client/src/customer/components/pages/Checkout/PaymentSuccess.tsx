import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  AlertTitle,
  Divider,
  Button,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useDispatch } from "react-redux";
import { paymentSuccess } from "../../../../State/Customer/orderSlice";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"processing" | "success" | "failed">(
    "processing"
  );
  const dispatch = useDispatch();
  const [orderIdToView, setOrderIdToView] = useState<string | null>(null);

  const paymentId = searchParams.get("payment_id");
  const paymentLinkId = searchParams.get("payment_link_id");
  const jwt = localStorage.getItem("jwt") || "";

  useEffect(() => {
    if (paymentId && paymentLinkId && jwt) {

      const payload = { paymentId, paymentLinkId, jwt };

      dispatch(paymentSuccess(payload) as any)
        .unwrap()
        .then((response:any) => {
          setStatus("success");
        })
        .catch((error:any) => {
          console.error("Payment Verification Failed:", error);
          setStatus("failed");
        });
    } else {
      setStatus("failed");
    }
  }, [dispatch, paymentId, paymentLinkId]); 
  const renderContent = () => {
    if (status === "processing") {
      return (
        <Alert
          severity="info"
          icon={<CircularProgress size={20} color="inherit" />}
        >
          <AlertTitle>Processing Payment</AlertTitle>
          We are confirming your transaction with the payment gateway. This may
          take a moment.
        </Alert>
      );
    }

    if (status === "success") {
      return (
        <Alert
          severity="success"
          icon={<CheckCircleOutlineIcon fontSize="inherit" />}
        >
          <AlertTitle>Payment Successful!</AlertTitle>
          Your order has been placed and **automatically confirmed**. Thank you
          for your purchase.
          <Typography variant="body2" sx={{ mt: 1 }}>
            Transaction ID: **{paymentId}**
          </Typography>
        </Alert>
      );
    }

    if (status === "failed") {
      return (
        <Alert severity="error" icon={<ErrorOutlineIcon fontSize="inherit" />}>
          <AlertTitle>Payment Failed or Invalid Access</AlertTitle>
          We encountered an error processing your request. Please contact
          support.
          <Typography variant="body2" sx={{ mt: 1 }}>
            Details: Invalid payment parameters or transaction failed.
          </Typography>
        </Alert>
      );
    }
    return null;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 600, width: "100%" }}>
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            align="center"
            fontWeight="bold"
          >
            Order Status
          </Typography>
          <Divider sx={{ mb: 3 }} />
          {renderContent()}
          <Link className="btn-primary" to={"/account/orders"}>
            Go to Orders
          </Link>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PaymentSuccess;
