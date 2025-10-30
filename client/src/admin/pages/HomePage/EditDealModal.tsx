import * as React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import { Deal } from "../../../types/DealType";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { updateDeal } from "../../../State/Admin/dealSlice";
import { DealUpdateRequestBody } from "../../../types/HomeCatgoryTypes";

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

interface EditDealModalProps {
  open: boolean;
  onClose: () => void;
  deal: Deal | null;
}

const EditDealModal: React.FC<EditDealModalProps> = ({ open, onClose, deal }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: any) => state.deal); 

  const formik = useFormik({
    initialValues: {
      discount: deal?.discount || 0,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (!deal || !deal.id) return;

      const updatedDealData: DealUpdateRequestBody = { 
    ...deal, 
    discount: values.discount, 
    category: { 
        id: deal.category.id!, 
    },
};

      dispatch(updateDeal({ id: deal.id, updatedDeal: updatedDealData }))
        .unwrap()
        .then(() => {
          alert(`Deal ID ${deal.id} updated successfully!`);
          onClose();
        })
        .catch((err: string) => {
          alert(`Update failed: ${err}`);
        });
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" gutterBottom>
          Edit Discount for: **{deal?.category.name}**
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2, spaceY: 3 }}>
          <TextField
            fullWidth
            type="number"
            name="discount"
            label="New Discount (%)"
            value={formik.values.discount}
            onChange={formik.handleChange}
            sx={{ mb: 2 }}
            inputProps={{ min: 0, max: 100 }}
          />
          <div className="flex justify-end space-x-3">
            <Button variant="outlined" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
            </Button>
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditDealModal;