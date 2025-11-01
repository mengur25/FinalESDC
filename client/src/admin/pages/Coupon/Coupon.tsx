import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CircularProgress, TablePagination } from "@mui/material"; 
import { Delete } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../State/Store"; 
import { Coupon as CouponType } from "../../../types/couponTypes"; 
import { deleteCoupon, getAllCoupons } from "../../../State/Customer/couponSlice";

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

const Coupon = () => {
    const dispatch = useAppDispatch();
    const { coupons, loading, error } = useAppSelector((state: any) => state.coupon); 
    
    // **[STATE PAGINATION]**
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10); 

    useEffect(() => {
        dispatch(getAllCoupons());
    }, [dispatch]);

    const handleDelete = (id: number) => {
        if (window.confirm(`Are you sure you want to delete Coupon ID ${id}?`)) {
            dispatch(deleteCoupon(id));
        }
    };

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return "N/A";
        try {
            return new Date(dateString).toLocaleDateString('vi-VN'); 
        } catch (e) {
            return dateString;
        }
    };
    
    // **[HANDLERS PAGINATION]**
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    // Dữ liệu hiển thị trên trang hiện tại
    const couponsToDisplay = React.useMemo(() => {
        return coupons.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [coupons, page, rowsPerPage]);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - coupons.length) : 0;


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized coupon table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Coupon Code</StyledTableCell>
                        <StyledTableCell>Start Date</StyledTableCell>
                        <StyledTableCell>End Date</StyledTableCell>
                        <StyledTableCell align="right">Minimum Order Value</StyledTableCell>
                        <StyledTableCell align="right">Discount (%)</StyledTableCell>
                        <StyledTableCell align="center">Delete</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <StyledTableRow>
                            <StyledTableCell colSpan={7} align="center">
                                <CircularProgress size={24} />
                                <p>Loading coupons...</p>
                            </StyledTableCell>
                        </StyledTableRow>
                    ) : error ? (
                        <StyledTableRow>
                            <StyledTableCell colSpan={7} align="center" style={{ color: 'red' }}>
                                Error loading coupons: {error}
                            </StyledTableCell>
                        </StyledTableRow>
                    ) : coupons.length === 0 ? (
                        <StyledTableRow>
                            <StyledTableCell colSpan={7} align="center">
                                <p>No coupons found. Please create one.</p>
                            </StyledTableCell>
                        </StyledTableRow>
                    ) : (
                        couponsToDisplay.map((coupon: CouponType) => (
                            <StyledTableRow key={coupon.id}>
                                <StyledTableCell component="th" scope="row">
                                    {coupon.code}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {formatDate(coupon.validityStartDate)}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {formatDate(coupon.validityEndDate)}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    ${coupon.minimumOrderValue?.toFixed(2) || '0.00'}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {coupon.discountPercentage}%
                                </StyledTableCell>

                                <StyledTableCell align="center">
                                    <Button onClick={() => handleDelete(coupon.id!)} disabled={loading}>
                                        <Delete />
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))
                    )}
                    {emptyRows > 0 && (
                        <StyledTableRow style={{ height: 53 * emptyRows }}>
                            <StyledTableCell colSpan={7} />
                        </StyledTableRow>
                    )}
                </TableBody>
            </Table>
            
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={coupons.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default Coupon;