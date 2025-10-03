
import { Box, TextField, Typography } from "@mui/material";
import React from "react";

const VerifyOtpForm = ({ formik, handleVerifyOtp }) => {
  return (
    <Box className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <Typography variant="h5" component="p" className="text-xl font-bold text-center pb-5">
        Verify Email
      </Typography>
      <Typography variant="body1" className="text-center pb-9 text-gray-600">
        OTP sent to your email.
      </Typography>
      <div className="space-y-6">
        <TextField
          fullWidth
          required
          name="otp"
          label="Mã OTP"
          placeholder="Nhập 6 chữ số"
          value={formik.values.otp}
          onChange={formik.handleChange}
          error={formik.touched.otp && Boolean(formik.errors.otp)}
          helperText={formik.touched.otp && formik.errors.otp}
        />
        
      </div>
    </Box>
  );
};

export default VerifyOtpForm;