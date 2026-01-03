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

  // **[LOGIC ĐÃ SỬA]** Tính tất cả đơn hàng KHÔNG phải là CANCELLED
  const calculatedTotalEarnings = useMemo(() => {
    const validTransactions: Order[] = transactions || []; 
    
    return validTransactions.reduce((total, order) => {
      // **Chỉ loại trừ đơn hàng CANCELLED**
      if (order.orderStatus !== "CANCELLED") { 
        const price = order.totalSellingPrice || 0;
        return total + price;
      }
      return total;
    }, 0);
  }, [transactions]);
  
  const totalEarnings = calculatedTotalEarnings;
  
  const estimatedNetPayout = totalEarnings * 0.9; 

  const displayValue = estimatedNetPayout; 

  const isLoading = reportLoading && transactions.length === 0;

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
              Net Payout:{" "}
              <strong>{formatCurrency(displayValue)}</strong>
            </p>
          </>
        )}
      </Card>
      <div className="mt-20 space-y-3">
        <div className="font-bold text-lg">
          Transaction History ({transactions.length})
        </div>
        <TransactionTable />
      </div>
    </div>
  );
};

export default Payment;