import { Box, Button, Grid2, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";

const AddressSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mobile: Yup.string()
    .required("Mobile is required")
    .matches(/^[0-9]{10}$/, "Mobile number is not valid"),
  pinCode: Yup.string()
    .required("Pin Code is required")
    .matches(/^[0-9]{6}$/, "Pin Code must be 6 digits"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  ward: Yup.string().required("Ward is required"),
  locality: Yup.string().required("Locality is required"),
});

interface AddressFormProps {
  initialValues?: any; // khi edit thì truyền data vào
  onSave: (address: any) => void;
  onClose: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  initialValues,
  onSave,
  onClose,
}) => {
  const formik = useFormik({
    initialValues: {
      id: initialValues?.id || null,
      name: initialValues?.name || "",
      mobile: initialValues?.mobile || "",
      pinCode: initialValues?.pinCode || "",
      address: initialValues?.address || "",
      city: initialValues?.city || "",
      ward: initialValues?.ward || "",
      locality: initialValues?.locality || "",
    },
    validationSchema: AddressSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const newAddress = {
        ...values,
        selected: initialValues?.selected ?? false,
      };
      onSave(newAddress);
      onClose();
      window.location.reload();
    },
  });

  return (
    <Box>
      <p className="text-xl font-bold text-center pb-5">
        {initialValues ? "Edit Address" : "Add New Address"}
      </p>
      <form onSubmit={formik.handleSubmit}>
        <Grid2 container spacing={4}>
          <Grid2 size={12}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={
                formik.touched.name && typeof formik.errors.name === "string"
                  ? formik.errors.name
                  : undefined
              }
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name="mobile"
              label="Mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && typeof formik.errors.mobile === "string" ? formik.errors.mobile : undefined}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name="pinCode"
              label="Pin Code"
              value={formik.values.pinCode}
              onChange={formik.handleChange}
              error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
              helperText={formik.touched.mobile && typeof formik.errors.pinCode === "string" ? formik.errors.pinCode : undefined}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.mobile && typeof formik.errors.city === "string" ? formik.errors.city : undefined}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              name="ward"
              label="Ward"
              value={formik.values.ward}
              onChange={formik.handleChange}
              error={formik.touched.ward && Boolean(formik.errors.ward)}
              helperText={formik.touched.mobile && typeof formik.errors.ward === "string" ? formik.errors.ward : undefined}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              fullWidth
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.mobile && typeof formik.errors.address === "string" ? formik.errors.address : undefined}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              fullWidth
              name="locality"
              label="Locality"
              value={formik.values.locality}
              onChange={formik.handleChange}
              error={formik.touched.locality && Boolean(formik.errors.locality)}
              helperText={formik.touched.mobile && typeof formik.errors.locality === "string" ? formik.errors.locality : undefined}
            />
          </Grid2>
          <Grid2 size={12}>
            <Button
              type="submit"
              className="!w-full !bg-primary !text-white rounded-sm"
            >
              {initialValues ? "Update Address" : "Save Address"}
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Box>
  );
};

export default AddressForm;
