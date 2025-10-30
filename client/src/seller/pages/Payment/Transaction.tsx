import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchTransactionsBySeller } from "../../../State/Seller/transactionSlice";
import { Order } from "../../../types/orderTypes";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const formatCurrency = (amount: number | undefined) => {
  if (amount === undefined || amount === null) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const formatDate = (dateString: string | Date | undefined) => {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString("vi-VN");
  } catch (e) {
    return String(dateString);
  }
};


const formatErrorMessage = (err: any): string => {
  if (typeof err === 'string') return err;
  if (typeof err === 'object' && err !== null) {
    return (err.message as string) || 
               (err.error as string) || 
               `API Error (Status: ${err.status}) - Check console.`;
  }
  return "Unknown Error";
};


export default function TransactionTable() {
  const dispatch = useAppDispatch();

  const { transactions, loading, error } = useAppSelector(
    (state: any) => state.transactions
  );

  React.useEffect(() => {
    dispatch(fetchTransactionsBySeller(localStorage.getItem("jwt") || ""));
  }, [dispatch]);
  
  // Hàm trợ giúp để lấy giá tiền cuối cùng (Giả định Order có totalPrice)
  const getFinalOrderAmount = (order: Order): number => {
      // Dùng totalPrice nếu tồn tại. Đây là giá trị mong muốn sau coupon/shipping.
      // Nếu không có, dùng totalSellingPrice (giá bán sản phẩm).
      // Bạn cần kiểm tra model Order của mình để xem trường nào lưu giá cuối cùng.
      return (order as any).totalPrice || order.totalSellingPrice || 0; 
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized transaction table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Customer Email</StyledTableCell>
            <StyledTableCell align="right">Order ID</StyledTableCell>
            {/* Sửa tiêu đề cột để phản ánh giá cuối cùng */}
            <StyledTableCell align="right">Final Amount</StyledTableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <StyledTableRow>
              <StyledTableCell colSpan={4} align="center">
                <CircularProgress size={24} />
                <p>Loading transactions...</p>
              </StyledTableCell>
            </StyledTableRow>
          ) : error ? (
            <StyledTableRow>
              <StyledTableCell colSpan={4} align="center">
                <Typography color="error">
                  Error loading data: {formatErrorMessage(error)}
                </Typography>
                <p>
                  Please ensure you are logged in and have valid permissions.
                </p>
              </StyledTableCell>
            </StyledTableRow>
          ) : transactions.length === 0 ? (
            <StyledTableRow>
              <StyledTableCell colSpan={4} align="center">
                <Typography color="textSecondary">
                  No transactions found for this seller.
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          ) : (
            (transactions as Order[])
              .filter((item) => item.orderStatus !== "CANCELLED")
              .map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    {formatDate(item.orderDate)}{" "}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {item.user?.email || "N/A"}
                  </StyledTableCell>
                  <StyledTableCell align="right">{item.id}</StyledTableCell>
                  <StyledTableCell align="right">
                    {formatCurrency(getFinalOrderAmount(item))} 
                  </StyledTableCell>
                </StyledTableRow>
              ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}