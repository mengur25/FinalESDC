import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { HomeCategory } from '../../../types/HomeCatgoryTypes';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}



interface HomeCategoryTableProps {
    data: HomeCategory[];
    onEdit: (category: HomeCategory) => void; // Hàm mới để xử lý click edit
}

export default function HomeCategoryTable({ data, onEdit }: HomeCategoryTableProps) {
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
                                {index + 1}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {category.id}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {/* Hiển thị hình ảnh thay vì URL */}
                                <img src={category.image} alt="Category" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                {/* Hoặc nếu chỉ muốn hiển thị URL: {category.image} */}
                            </StyledTableCell>
                            <StyledTableCell align="right">{category.categoryId}</StyledTableCell>
                            <StyledTableCell align="right">
                                {/* GỌI HÀM onEdit KHI CLICK */}
                                <IconButton
                                    onClick={() => onEdit(category)}
                                    color="primary"
                                >
                                    <Edit />
                                </IconButton>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
