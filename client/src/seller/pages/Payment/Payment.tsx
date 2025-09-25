import { Button, Card, Divider } from "@mui/material";
import React from "react";
import TransactionTable from "./Transaction";

const Payment = () => {
  return (
    <div>
      <Card className="rounded-md sapce-y-4 p-5">
        <h1 className="text-gray-600 font-medium">Total Earning</h1>
        <h1 className="font-bold text-xl pb-1">$1292</h1>
        <Divider />
        <p className="text-gray-600 font-medium pt-1">
          Last Payment: <strong>$58</strong>
        </p>
      </Card>
      <div className="mt-20 space-y-3">
        <Button variant="contained">Transaction</Button>
        <TransactionTable />
      </div>
    </div>
  );
};

export default Payment;
