import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CircularProgress, Typography, TablePagination } from "@mui/material"; // Thêm TablePagination
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
  if (typeof err === "string") return err;
  if (typeof err === "object" && err !== null) {
    return (
      (err.message as string) ||
      (err.error as string) ||
      `API Error (Status: ${err.status}) - Check console.`
    );
  }
  return "Unknown Error";
};

export default function TransactionTable() {
  const dispatch = useAppDispatch();

  const { transactions, loading, error } = useAppSelector(
    (state: any) => state.transactions
  );

  // **[STATE MỚI]** Quản lý trạng thái phân trang
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    dispatch(fetchTransactionsBySeller(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  // Hàm trợ giúp để lấy giá tiền cuối cùng
  const getFinalOrderAmount = (order: Order): number => {
    return (order as any).totalPrice || order.totalSellingPrice || 0;
  };

  // **[HÀM MỚI]** Xử lý thay đổi trang
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // **[HÀM MỚI]** Xử lý thay đổi số hàng trên mỗi trang
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const validTransactions = React.useMemo(() => {
    const filtered = (transactions as Order[]).filter(
      (item) => item.orderStatus !== "CANCELLED"
    );

    // Tạo bản sao và sắp xếp theo ngày (Mới nhất lên trước)
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.orderDate).getTime();
      const dateB = new Date(b.orderDate).getTime();

      // Sắp xếp giảm dần (DESC): dateB - dateA
      return dateB - dateA;
    });
  }, [transactions]);

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - validTransactions.length)
      : 0;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized transaction table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Customer Email</StyledTableCell>
            <StyledTableCell align="right">Order ID</StyledTableCell>
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
          ) : validTransactions.length === 0 ? (
            <StyledTableRow>
              <StyledTableCell colSpan={4} align="center">
                <Typography color="textSecondary">
                  No transactions found for this seller.
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          ) : (
            validTransactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
          {emptyRows > 0 && (
            <StyledTableRow style={{ height: 53 * emptyRows }}>
              <StyledTableCell colSpan={4} />
            </StyledTableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={validTransactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
