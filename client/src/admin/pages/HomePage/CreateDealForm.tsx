import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  createDeal,
  getAllHomeCategories,
} from "../../../State/Admin/dealSlice";
import { HomeCategory } from "../../../types/HomeCatgoryTypes"; 

interface CreateDealRequest {
  discount: number;
  categoryId: string;
}

interface DealRequestBody {
  discount: number;
  category: {
    id: number; 
  };
}

const CreateDealForm = () => {
  const dispatch = useAppDispatch();

  const dealState = useAppSelector((state: any) => state.deal);

  const loading = dealState?.loading || false;
  const error = dealState?.error || null;
  const homeCategories: HomeCategory[] = dealState?.homeCategories || [];

  React.useEffect(() => {
    dispatch(getAllHomeCategories());
  }, [dispatch]);

  const formik = useFormik<CreateDealRequest>({
    initialValues: {
      discount: 0,
      categoryId: "",
    },
    onSubmit: (values, { resetForm }) => {
      const selectedCategory = homeCategories.find(
        (c) => c.categoryId === values.categoryId
      );

      if (!selectedCategory || selectedCategory.id === undefined) {
        alert(
          "Error: Please select a valid category or category ID is missing."
        );
        return;
      }

      const dealData: DealRequestBody = {
        discount: values.discount,
        category: { id: selectedCategory.id },
      };

      dispatch(createDeal(dealData))
        .unwrap()
        .then(() => {
          alert("Deal created successfully!");
          resetForm();
        })
        .catch((err: string) => {
          alert(`Failed to create deal: ${err}`);
        });
    },
  });

  return (
    <Box
      component={"form"}
      onSubmit={formik.handleSubmit}
      className="space-y-6"
      maxWidth={400}
    >
      <Typography variant="h4" className="text-center">
        Create Deal
      </Typography>

      <TextField
        fullWidth
        name="discount"
        type="number"
        label="Discount (%)"
        value={formik.values.discount}
        onChange={formik.handleChange}
        error={formik.touched.discount && Boolean(formik.errors.discount)}
        helperText={formik.touched.discount && formik.errors.discount}
      />

      <FormControl
        fullWidth
        error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
        required
      >
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="categoryId"
          name="categoryId"
          value={formik.values.categoryId}
          onChange={formik.handleChange}
          label="Category"
        >
          <MenuItem value="">
            <em>Select Category</em>
          </MenuItem>
          {homeCategories.map((category: HomeCategory) => (
            <MenuItem key={category.id} value={category.categoryId}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
        {formik.touched.categoryId && formik.errors.categoryId && (
          <FormHelperText>{formik.errors.categoryId}</FormHelperText>
        )}
      </FormControl>

      <Button
        type="submit"
        fullWidth
        sx={{ py: ".9rem" }}
        variant="contained"
        disabled={loading || homeCategories.length === 0}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Create Deal"
        )}
      </Button>
    </Box>
  );
};

export default CreateDealForm;
