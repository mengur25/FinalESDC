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

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"processing" | "success" | "failed">(
    "processing"
  );
  const dispatch = useDispatch();

  // Lấy thông tin giao dịch từ URL
  const paymentId = searchParams.get("payment_id");
  const paymentLinkId = searchParams.get("payment_link_id");

  useEffect(() => {
    if (paymentId && paymentLinkId) {
      if (paymentId.startsWith("mock_")) {
        const timer = setTimeout(() => {
          setStatus("success");
        }, 1000);
        return () => clearTimeout(timer);
      }
    } else {
      setStatus("failed");
    }
  }, [paymentId, paymentLinkId]);

  const renderContent = () => {
    if (status === "processing") {
      return (
        <Alert
          severity="info"
          icon={<CircularProgress size={20} color="inherit" />}
        >
          <AlertTitle>Processing Payment</AlertTitle>
          We are confirming your transaction with the payment gateway.
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
          Your order has been placed and confirmed. Thank you for your purchase.
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
