import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CircularProgress } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { deleteDeal, getAllDeals } from "../../../State/Admin/dealSlice";
import { Deal } from "../../../types/DealType";
import EditDealModal from "./EditDealModal";

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
            deals.map((item: Deal, index: number) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
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
                    // GỌI HÀM EDIT
                    onClick={() => handleEdit(item)}
                    disabled={loading}
                  >
                    <Edit />
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    // GỌI HÀM DELETE
                    onClick={() => handleDelete(item.id!)}
                    disabled={loading}
                  >
                    <Delete />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>

    <EditDealModal
        open={isModalOpen}
        onClose={handleCloseModal}
        deal={selectedDeal}
      />
      </>
  );
}