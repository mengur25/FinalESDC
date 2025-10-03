import { Box, Grid2, TextField } from "@mui/material";
import React from "react";

const BecomeSellerFormStep2 = ({ formik }: any) => {
  return (
    <Box>
      <p className="text-xl font-bold text-center pd-5">Pickup Address</p>
      <Grid2 container spacing={4}>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="pickupAddress.name"
            label="Name"
            value={formik.values.pickupAddress.name}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.name &&
              Boolean(formik.errors.pickupAddress?.name)
            }
            helperText={
              formik.touched.pickupAddress?.name &&
              formik.errors.pickupAddress?.name
            }
          />
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <TextField
            fullWidth
            name="pickupAddress.mobile"
            label="Mobile"
            value={formik.values.pickupAddress.mobile}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.mobile &&
              Boolean(formik.errors.pickupAddress?.mobile)
            }
            helperText={
              formik.touched.pickupAddress?.mobile &&
              formik.errors.pickupAddress?.mobile
            }
          />
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <TextField
            fullWidth
            name="pickupAddress.pinCode"
            label="Pin Code"
            value={formik.values.pickupAddress.pinCode}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.pinCode &&
              Boolean(formik.errors.pickupAddress?.pinCode)
            }
            helperText={
              formik.touched.pickupAddress?.pinCode &&
              formik.errors.pickupAddress?.pinCode
            }
          />
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <TextField
            fullWidth
            name="pickupAddress.city"
            label="City"
            value={formik.values.pickupAddress.city}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.city &&
              Boolean(formik.errors.pickupAddress?.city)
            }
            helperText={
              formik.touched.pickupAddress?.city &&
              formik.errors.pickupAddress?.city
            }
          />
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <TextField
            fullWidth
            name="pickupAddress.ward"
            label="Ward"
            value={formik.values.pickupAddress.ward}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.ward &&
              Boolean(formik.errors.pickupAddress?.ward)
            }
            helperText={
              formik.touched.pickupAddress?.ward &&
              formik.errors.pickupAddress?.ward
            }
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="pickupAddress.address"
            label="Address"
            value={formik.values.pickupAddress.address}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.address &&
              Boolean(formik.errors.pickupAddress?.address)
            }
            helperText={
              formik.touched.pickupAddress?.address &&
              formik.errors.pickupAddress?.address
            }
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="pickupAddress.locality"
            label="Locality"
            value={formik.values.pickupAddress.locality}
            onChange={formik.handleChange}
            error={
              formik.touched.pickupAddress?.locality &&
              Boolean(formik.errors.pickupAddress?.locality)
            }
            helperText={
              formik.touched.pickupAddress?.locality &&
              formik.errors.pickupAddress?.locality
            }
          />
        </Grid2>
        
      </Grid2>
    </Box>
  );
};

export default BecomeSellerFormStep2;
