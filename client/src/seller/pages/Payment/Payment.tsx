import {
  Button,
  Card,
  Divider,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import TransactionTable from "./Transaction";
import { useAppSelector, useAppDispatch } from "../../../State/Store";
import { Order } from "../../../types/orderTypes";
import { fetchSellerReport } from "../../../State/Seller/SellerSlice"; 
const formatCurrency = (amount: number | undefined): string => {
  if (amount === undefined || amount === null) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const Payment = () => {
  const dispatch = useAppDispatch();

  const {
    report,
    loading: reportLoading,
    error: reportError,
  } = useAppSelector((state: any) => state.seller);
  const { transactions } = useAppSelector((state: any) => state.transactions);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt") || "";
    if (jwt) {
      dispatch(fetchSellerReport(jwt));
    }
  }, [dispatch]);

  const calculatedTotalEarnings = useMemo(() => {
    return (transactions as any[]).reduce((total, order) => {
      if (order.orderStatus === "CANCELLED") {
        return total;
      }
      const price = order.totalSellingPrice || 0;
      return total + price;
    }, 0);
  }, [transactions]);
  const totalEarnings = report?.totalEarnings || calculatedTotalEarnings;
  
  const estimatedNetPayout = totalEarnings * 0.9; 

  const displayValue = estimatedNetPayout; 

  const isLoading = reportLoading && !report;

  return (
    <div>
      <Card className="rounded-md sapce-y-4 p-5">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-20">
            <CircularProgress size={24} />
            <Typography variant="body2" color="textSecondary">
              Loading Report...
            </Typography>
          </div>
        ) : reportError ? (
          <Typography variant="body2" color="error">
            Error loading report: {reportError}
          </Typography>
        ) : (
          <>
            <h1 className="text-gray-600 font-medium">
              Total Earning (Gross Sales)
            </h1>
            <h1 className="font-bold text-xl pb-1">
              {formatCurrency(totalEarnings)}
            </h1>
            <Divider />
            <p className="text-gray-600 font-medium pt-1">
              Net Payout (Estimated):{" "}
              <strong>{formatCurrency(displayValue)}</strong>
            </p>
          </>
        )}
      </Card>
      <div className="mt-20 space-y-3">
        <Button variant="contained">
          Transaction History ({transactions.length})
        </Button>
        <TransactionTable />
      </div>
    </div>
  );
};

export default Payment;