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
import toast from "react-hot-toast";
import * as Yup from 'yup';

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

const validationSchema = Yup.object({
  discount: Yup.number()
    .required("Discount is required.")
    .min(1, "Discount must be at least 1%")
    .max(100, "Discount cannot exceed 100%."),
  categoryId: Yup.string()
    .required("Category selection is required."),
});


const CreateDealForm = () => {
  const dispatch = useAppDispatch();

  const dealState = useAppSelector((state: any) => state.deal);

  const loading = dealState?.loading || false;
  const error = dealState?.error || null;
  const homeCategories: HomeCategory[] = dealState?.homeCategories || [];

  React.useEffect(() => {
    dispatch(getAllHomeCategories());
  }, [dispatch]);

  const uniqueCategories = React.useMemo(() => {
    if (!homeCategories || homeCategories.length === 0) {
      return [];
    }
    
    const categoryMap = new Map();
    
    homeCategories.forEach((cat) => {
      if (!categoryMap.has(cat.categoryId)) {
        categoryMap.set(cat.categoryId, cat);
      }
    });

    return Array.from(categoryMap.values());
  }, [homeCategories]);

  const formik = useFormik<CreateDealRequest>({
    initialValues: {
      discount: 1,
      categoryId: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const selectedCategory = homeCategories.find(
        (c) => c.categoryId === values.categoryId
      );

      if (!selectedCategory || !selectedCategory.id) {
        toast.error(
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
          toast.success("Deal created successfully!");
          resetForm();
        })
        .catch((err: string) => {
          toast.error(`Failed to create deal: ${err}`);
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
          {uniqueCategories.map((category: HomeCategory) => (
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
        disabled={loading || homeCategories.length === 0 || !formik.isValid}
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