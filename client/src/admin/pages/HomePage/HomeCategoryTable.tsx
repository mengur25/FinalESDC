import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { HomeCategory } from "../../../types/HomeCatgoryTypes";

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface HomeCategoryTableProps {
  data: HomeCategory[];
  onEdit: (category: HomeCategory) => void;
  // **[PROPS MỚI]**: Nhận số hàng trên mỗi trang và trang hiện tại để tính hàng trống
  rowsPerPage: number;
  page: number;
}

export default function HomeCategoryTable({
  data,
  onEdit,
  rowsPerPage,
  page,
}: HomeCategoryTableProps) {
  // **[LOGIC HÀNG TRỐNG]**
  // data.length ở đây là số hàng HIỆN TẠI trên trang (<= rowsPerPage), KHÔNG phải tổng số hàng.
  // Logic tính hàng trống đơn giản hơn vì dữ liệu đầu vào (data) đã được cắt lát.
  const emptyRows = rowsPerPage - data.length;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="right">Image</StyledTableCell>
            <StyledTableCell align="right">Category ID</StyledTableCell>
            <StyledTableCell align="right">Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((category, index) => (
            <StyledTableRow key={category.id}>
              <StyledTableCell component="th" scope="row">
                {/* Sửa số thứ tự để phản ánh trang hiện tại */}
                {page * rowsPerPage + index + 1}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {category.id}
              </StyledTableCell>
              <StyledTableCell align="right">
                <img
                  src={category.image}
                  alt="Category"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </StyledTableCell>
              <StyledTableCell align="right">
                {category.categoryId}
              </StyledTableCell>
              <StyledTableCell align="right">
                <IconButton onClick={() => onEdit(category)} color="primary">
                  <Edit />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
          {/* **[THÊM HÀNG TRỐNG]** */}
          {emptyRows > 0 && (
            <StyledTableRow style={{ height: 53 * emptyRows }}>
              <StyledTableCell colSpan={5} />
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
