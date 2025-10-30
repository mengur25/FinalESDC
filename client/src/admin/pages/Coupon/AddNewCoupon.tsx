import { Dayjs } from "dayjs";
import { useFormik } from "formik";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Box, Button, Grid2, TextField, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { createCoupon } from "../../../State/Customer/couponSlice";
import toast from "react-hot-toast";

interface CouponFormValues {
  code: string;
  discountPercentage: number;
  validityStartDate: Dayjs | null;
  validityEndDate: Dayjs | null;
  minimumOrderValue: number;
}

const AddNewCoupon = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: any) => state.coupon);

  const initialValues: CouponFormValues = {
    code: "",
    discountPercentage: 0,
    validityStartDate: null,
    validityEndDate: null,
    minimumOrderValue: 0,
  };

  const formik = useFormik<CouponFormValues>({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      const couponData = {
        ...values,
        validityStartDate: values.validityStartDate?.toISOString(),
        validityEndDate: values.validityEndDate?.toISOString(),
      };

      dispatch(createCoupon(couponData))
        .unwrap()
        .then(() => {
          toast.success("Coupon created successfully!");
          resetForm({ values: initialValues });
        })
        .catch((err: string) => {
          toast.error(`Failed to create coupon: ${err}`);
        });
    },
  });

  const handleDateChange =
    (name: keyof CouponFormValues) => (date: Dayjs | null) => {
      formik.setFieldValue(name, date, true);
    };

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary pb-5 text-center">
        Create New Coupon
      </h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box component={"form"} onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="code"
                label="coupon Code"
                value={formik.values.code}
                onChange={formik.handleChange}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="discountPercentage"
                label="discountPercentage"
                type="number"
                value={formik.values.discountPercentage}
                onChange={formik.handleChange}
                error={
                  formik.touched.discountPercentage &&
                  Boolean(formik.errors.discountPercentage)
                }
                helperText={
                  formik.touched.discountPercentage &&
                  formik.errors.discountPercentage
                }
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6 }}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Validity Start Date"
                onChange={handleDateChange("validityStartDate")}
                value={formik.values.validityStartDate}
                slotProps={{
                  textField: {
                    error:
                      formik.touched.validityStartDate &&
                      Boolean(formik.errors.validityStartDate),
                    helperText:
                      formik.touched.validityStartDate &&
                      formik.errors.validityStartDate,
                  },
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6 }}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Validity End Date"
                onChange={handleDateChange("validityEndDate")}
                value={formik.values.validityEndDate}
                slotProps={{
                  textField: {
                    error:
                      formik.touched.validityEndDate &&
                      Boolean(formik.errors.validityEndDate),
                    helperText:
                      formik.touched.validityEndDate &&
                      formik.errors.validityEndDate,
                  },
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                name="minimumOrderValue"
                label="Minimum Order Value"
                type="number"
                value={formik.values.minimumOrderValue}
                onChange={formik.handleChange}
                error={
                  formik.touched.minimumOrderValue &&
                  Boolean(formik.errors.minimumOrderValue)
                }
                helperText={
                  formik.touched.minimumOrderValue &&
                  formik.errors.minimumOrderValue
                }
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ py: ".8rem" }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Create Coupon"}
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </LocalizationProvider>
    </div>
  );
};

export default AddNewCoupon;