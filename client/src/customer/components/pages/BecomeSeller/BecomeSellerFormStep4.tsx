import { TextField } from "@mui/material";
import React, { FC } from "react";

interface BecomeSellerFormStep4Props {
  formik: any;
}

const BecomeSellerFormStep4: FC<BecomeSellerFormStep4Props> = ({ formik }) => {
  return (
    <div className="space-y-5">
      <TextField
        fullWidth
        name="businessDetails.businessName"
        label="Business Name"
        value={formik.values.businessDetails.businessName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.businessDetails?.businessName &&
          Boolean(formik.errors.businessDetails?.businessName)
        }
        helperText={
          formik.touched.businessDetails?.businessName &&
          formik.errors.businessDetails?.businessName
        }
      />
      <TextField
        fullWidth
        name="businessDetails.businessEmail"
        label="Business Email"
        value={formik.values.businessDetails.businessEmail}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.businessDetails?.businessEmail &&
          Boolean(formik.errors.businessDetails?.businessEmail)
        }
        helperText={
          formik.touched.businessDetails?.businessEmail &&
          formik.errors.businessDetails?.businessEmail
        }
      />
      <TextField
        fullWidth
        name="businessDetails.businessMobile"
        label="Business Mobile"
        value={formik.values.businessDetails.businessMobile}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.businessDetails?.businessMobile &&
          Boolean(formik.errors.businessDetails?.businessMobile)
        }
        helperText={
          formik.touched.businessDetails?.businessMobile &&
          formik.errors.businessDetails?.businessMobile
        }
      />
      <TextField
        fullWidth
        name="businessDetails.logo"
        label="Business Logo URL"
        value={formik.values.businessDetails.logo}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.businessDetails?.logo &&
          Boolean(formik.errors.businessDetails?.logo)
        }
        helperText={
          formik.touched.businessDetails?.logo &&
          formik.errors.businessDetails?.logo
        }
      />
      <TextField
        fullWidth
        name="businessDetails.banner"
        label="Business Banner URL"
        value={formik.values.businessDetails.banner}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.businessDetails?.banner &&
          Boolean(formik.errors.businessDetails?.banner)
        }
        helperText={
          formik.touched.businessDetails?.banner &&
          formik.errors.businessDetails?.banner
        }
      />
      <TextField
        fullWidth
        name="businessDetails.businessAddress"
        label="Business Address"
        value={formik.values.businessDetails.businessAddress}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.businessDetails?.businessAddress &&
          Boolean(formik.errors.businessDetails?.businessAddress)
        }
        helperText={
          formik.touched.businessDetails?.businessAddress &&
          formik.errors.businessDetails?.businessAddress
        }
      />
    </div>
  );
};

export default BecomeSellerFormStep4;
