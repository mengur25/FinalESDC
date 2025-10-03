import { Button, Step, StepLabel, Stepper } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import VerifyOtpForm from "./VerifyOtpForm";

const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details",
];
const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const handleStep = (value: number) => () => {
    (activeStep < steps.length - 1 || (activeStep > 0 && value === -1)) &&
      setActiveStep(activeStep + value);
    activeStep === steps.length - 1 && handleCreateAccount();
  };
  const navigate = useNavigate();
  const handleVerifyOtp = async () => {
    const otpValue = formik.values.otp; 
    try {
      const payload = {
        email: formik.values.email,
      };

      const res = await axios.patch(
        `http://localhost:5454/sellers/verify/${otpValue}`,
        payload
      );

      toast.success(res.data.message || "Login now!.");


      navigate("/become-seller");
      window.location.reload();
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Error."
      );
    }
  };

  const handleCreateAccount = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5454/sellers",
        formik.values
      );
      toast.success(res.data.message);
      setShowOtpForm(true);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create seller");
    }
  };
  const formik = useFormik({
    initialValues: {
      mobile: "",
      otp: "",
      GSTIN: "",
      pickupAddress: {
        name: "",
        mobile: "",
        pincode: "",
        address: "",
        locality: "",
        city: "",
        state: "",
      },
      bankDetails: {
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        logo: "",
        banner: "",
        businessAddress: "",
      },
      password: "",
    },
    onSubmit: (values) => {
      console.log(values, "formik submitted");
    },
  });
  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <section>
        <div className='mt-20'>
          {showOtpForm ? (
            <VerifyOtpForm formik={formik} handleVerifyOtp={handleVerifyOtp} />
          ) : (
            <>
              {activeStep === 0 ? <BecomeSellerFormStep1 formik={formik} /> :
               activeStep === 1 ? <BecomeSellerFormStep2 formik={formik} /> :
               activeStep === 2 ? <BecomeSellerFormStep3 formik={formik} /> :
               activeStep === 3 ? <BecomeSellerFormStep4 formik={formik} /> :
               ""
              }
            </>
          )}
        </div>

        <div className='flex items-center justify-between mt-2'>
          {!showOtpForm && (
            <Button onClick={handleStep(-1)} variant='contained' disabled={activeStep === 0}>
              Back
            </Button>
          )}

          {!showOtpForm && (
            <Button onClick={handleStep(1)} variant='contained'>
              {activeStep === (steps.length - 1) ? "Create Account" : "Continue"}
            </Button>
          )}

        </div>
        <div className="w-full flex justify-center mt-2">

          {showOtpForm && (
            <Button onClick={handleVerifyOtp} variant='contained' className="w-[50%]">
              Verify OTP
            </Button>
          )}
          </div>
      </section>
    </div>
  );
};

export default SellerAccountForm;
