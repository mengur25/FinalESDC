import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
  Box,
  Modal,
  Typography,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { AccountStatus, Seller } from "../../../types/SellerTypes";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { getAllSellers, updateSellerStatus } from "../../../State/Seller/SellerSlice";


type AccountStatusType = AccountStatus; 

const accountStatuses: {
  status: AccountStatusType;
  title: string;
  description: string;
}[] = [
  { status: "PENDING_VERIFICATION", title: "Pending Verification", description: "Account" },
  { status: "ACTIVE", title: "Active", description: "Account is active and in good" },
  { status: "SUSPENDED", title: "Suspended", description: "Account is temporarily" },
  { status: "DEACTIVATED", title: "Deactivated", description: "Account is deactivated" },
  { status: "BANNED", title: "Banned", description: "Account is permanently banned" },
  { status: "CLOSED", title: "Closed", description: "Account is permanently closed" },
];

const getStatusTitle = (status: string | undefined): string => {
  const s = (status || "N/A") as AccountStatusType;
  return accountStatuses.find(item => item.status === s)?.title || s;
};

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

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface StatusChangeModalProps {
  open: boolean;
  onClose: () => void;
  seller: Seller | null;
  onConfirm: (id: number, newStatus: AccountStatusType) => void;
  isLoading: boolean;
}

const StatusChangeModal: React.FC<StatusChangeModalProps> = ({
  open,
  onClose,
  seller,
  onConfirm,
  isLoading,
}) => {
  const [newStatus, setNewStatus] = useState<AccountStatusType>(
    (seller?.accountStatus as AccountStatusType) || "ACTIVE"
  );

  useEffect(() => {
    if (seller && seller.accountStatus) {
      setNewStatus(seller.accountStatus as AccountStatusType);
    }
  }, [seller]);

  const handleConfirm = () => {
    if (seller && newStatus && seller.id) {
      onConfirm(seller.id, newStatus);
    }
  };

  if (!seller) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Change Status for {seller.sellerName} 
        </Typography>
        <Typography sx={{ mt: 2, mb: 3 }}>
          Current Status: <strong>{getStatusTitle(seller.accountStatus)}</strong>
        </Typography>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="new-status-label">New Status</InputLabel>
          <Select
            labelId="new-status-label"
            value={newStatus}
            label="New Status"
            onChange={(e) => setNewStatus(e.target.value as AccountStatusType)}
          >
            {accountStatuses.map((item) => (
              <MenuItem key={item.status} value={item.status}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="flex justify-end space-x-2">
          <Button variant="outlined" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            disabled={isLoading || newStatus === seller.accountStatus}
          >
            {isLoading ? <CircularProgress size={24} /> : "Confirm Change"}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};


// --- COMPONENT CHÍNH ---
const SellersTable = () => {
  const dispatch = useAppDispatch();
  const { sellers, loading, updateStatusLoading } = useAppSelector(
    (state: any) => state.seller 
  );

  const [filterStatus, setFilterStatus] =
    useState<AccountStatusType | "">("ACTIVE");

  const [openModal, setOpenModal] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);

  const handleOpenModal = (seller: Seller) => {
    setSelectedSeller(seller);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSeller(null);
  };

  // 1. Fetch danh sách người bán
  useEffect(() => {
    dispatch(getAllSellers(filterStatus as AccountStatusType | undefined));
  }, [filterStatus, dispatch]);

  // 2. Xử lý thay đổi bộ lọc
  const handleFilterChange = (event: any) => {
    setFilterStatus(event.target.value as AccountStatusType | "");
  };

  // 3. Xử lý cập nhật trạng thái
  const handleUpdateStatus = (id: number, status: AccountStatusType) => {
    dispatch(
      updateSellerStatus({
        id: id,
        status: status,
      })
    ).then(() => {
        handleCloseModal(); 
    });
  };

  return (
    <>
      <div className="pb-5 w-60">
        <FormControl fullWidth>
          <InputLabel id="account-status-filter-label">
            Filter by status
          </InputLabel>
          <Select
            labelId="account-status-filter-label"
            id="account-status-filter-select"
            label="Lọc theo trạng thái"
            value={filterStatus}
            onChange={handleFilterChange}
          >
            {accountStatuses.map((item) => (
              <MenuItem key={item.status} value={item.status}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized seller table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Seller Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell align="right">Mobile</StyledTableCell>
              <StyledTableCell align="right">GSTIN</StyledTableCell>
              <StyledTableCell align="right">Business Name</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <StyledTableRow>
                <StyledTableCell colSpan={8} align="center">
                  <CircularProgress size={24} sx={{ mr: 2 }} />
                  Loading seller list
                </StyledTableCell>
              </StyledTableRow>
            ) : sellers.length === 0 ? (
                <StyledTableRow>
                    <StyledTableCell colSpan={8} align="center">
                        <p>No seller found.</p>
                    </StyledTableCell>
                </StyledTableRow>
            ) : (
              sellers.map((seller: Seller) => (
                <StyledTableRow key={seller.id}>
                  <StyledTableCell>{seller.id}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {seller.sellerName || "N/A"}
                  </StyledTableCell>
                  <StyledTableCell>{seller.email || "N/A"}</StyledTableCell>
                  <StyledTableCell align="right">
                    {seller.mobile || "N/A"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {seller.gstin || "N/A"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {seller.businessDetails?.bussinessName || "N/A"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {getStatusTitle(seller.accountStatus)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenModal(seller)}
                      disabled={updateStatusLoading && selectedSeller?.id === seller.id}
                    >
                      {updateStatusLoading && selectedSeller?.id === seller.id ? (
                          <CircularProgress size={20} />
                      ) : (
                          "Change Status"
                      )}
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <StatusChangeModal
        open={openModal}
        onClose={handleCloseModal}
        seller={selectedSeller}
        onConfirm={handleUpdateStatus}
        isLoading={updateStatusLoading}
      />
    </>
  );
};

export default SellersTable;