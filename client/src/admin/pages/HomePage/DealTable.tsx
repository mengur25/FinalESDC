// Trong DealTable.tsx

import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CircularProgress, TablePagination } from "@mui/material"; // Thêm TablePagination
import { Delete, Edit } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { deleteDeal, getAllDeals } from "../../../State/Admin/dealSlice";
import { Deal } from "../../../types/DealType";
import EditDealModal from "./EditDealModal";

// --- STYLE GIỮ NGUYÊN ---
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

export default function DealTable() {
    const dispatch = useAppDispatch();

    const { deals, loading, error } = useAppSelector((state: any) => state.deal);

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedDeal, setSelectedDeal] = React.useState<Deal | null>(null);

    // **[STATE PAGINATION]**
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const handleOpenModal = (deal: Deal) => {
        setSelectedDeal(deal);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDeal(null);
    };

    React.useEffect(() => {
        dispatch(getAllDeals());
    }, [dispatch]);

    const handleDelete = (id: number) => {
        if (window.confirm(`Are you sure you want to delete Deal ID ${id}?`)) {
            dispatch(deleteDeal(id));
        }
    };

    const handleEdit = (deal: Deal) => {
        handleOpenModal(deal);
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
    const dealsToDisplay = React.useMemo(() => {
        return deals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [deals, page, rowsPerPage]);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - deals.length) : 0;


    return (
        <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized deal table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>No</StyledTableCell>
                        <StyledTableCell>Image</StyledTableCell>
                        <StyledTableCell>Category Name</StyledTableCell>
                        <StyledTableCell align="right">Discount (%)</StyledTableCell>
                        <StyledTableCell align="center">Edit</StyledTableCell>
                        <StyledTableCell align="center">Delete</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <StyledTableRow>
                            <StyledTableCell colSpan={6} align="center">
                                <CircularProgress size={24} />
                                <p>Loading deals...</p>
                            </StyledTableCell>
                        </StyledTableRow>
                    ) : error ? (
                        <StyledTableRow>
                            <StyledTableCell
                                colSpan={6}
                                align="center"
                                style={{ color: "red" }}
                            >
                                Error loading deals: {error}
                            </StyledTableCell>
                        </StyledTableRow>
                    ) : deals.length === 0 ? (
                        <StyledTableRow>
                            <StyledTableCell colSpan={6} align="center">
                                <p>No deals found.</p>
                            </StyledTableCell>
                        </StyledTableRow>
                    ) : (
                        dealsToDisplay.map((item: Deal, index: number) => (
                            <StyledTableRow key={item.id}>
                                <StyledTableCell component="th" scope="row">
                                    {page * rowsPerPage + index + 1} {/* Cập nhật số thứ tự */}
                                </StyledTableCell>
                                <StyledTableCell>
                                    <img
                                        className="w-20 rounded-sm"
                                        src={item.category.image}
                                        alt={item.category.name || "Deal Image"}
                                    />
                                </StyledTableCell>
                                <StyledTableCell>{item.category.name}</StyledTableCell>
                                <StyledTableCell align="right">
                                    {item.discount}%
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button
                                        onClick={() => handleEdit(item)}
                                        disabled={loading}
                                    >
                                        <Edit />
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button
                                        onClick={() => handleDelete(item.id!)}
                                        disabled={loading}
                                    >
                                        <Delete />
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))
                    )}
                    {emptyRows > 0 && (
                        <StyledTableRow style={{ height: 53 * emptyRows }}>
                            <StyledTableCell colSpan={6} />
                        </StyledTableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        
        <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            component="div"
            count={deals.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <EditDealModal
            open={isModalOpen}
            onClose={handleCloseModal}
            deal={selectedDeal}
        />
        </>
    );
}