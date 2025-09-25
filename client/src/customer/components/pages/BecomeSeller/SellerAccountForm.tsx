import { Button, Step, StepLabel, Stepper } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import BecomeSellerFormStep1 from './BecomeSellerFormStep1';
import BecomeSellerFormStep2 from './BecomeSellerFormStep2';
import BecomeSellerFormStep3 from './BecomeSellerFormStep3';
import BecomeSellerFormStep4 from './BecomeSellerFormStep4';
import axios from "axios";
import toast from "react-hot-toast";

const steps = [
  "Tax Details & Mobile",
  "Piickup Address",
  "Bank Details",
  "Supplier Details",
];
const SellerAccountForm = () => {
  const [activeStep,setActiveStep] = useState(0)

  const handleStep = (value: number) => () =>{
    (activeStep < steps.length-1 || (activeStep > 0 && value == -1)) && setActiveStep(activeStep + value)
    activeStep == steps.length - 1 && handleCreateAccount()
  }

  const handleCreateAccount = async () => {
  try {
    const res = await axios.post("http://localhost:5454/api/sellers", formik.values);
    toast.success(res.data.message);
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Failed to create seller");
  }
};

  const formik = useFormik({
    initialValues: {
      mobile: "",
      otp: "",
      gstin: "",
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
        businessAddress: ""
      },
      password: ""
    },
    onSubmit: (values) => {
      console.log(values, "formik submitted");
    },
  })
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
          {activeStep==0?<BecomeSellerFormStep1 formik={formik}/>: 
            activeStep == 1 ? <BecomeSellerFormStep2 formik={formik}/> : 
            activeStep == 2 ? <BecomeSellerFormStep3 formik={formik}/> : 
            activeStep == 3 ? <BecomeSellerFormStep4 formik={formik}/> : 
            ""
            }
        </div>

        <div className='flex items-center justify-between mt-2'>
        <Button onClick={handleStep(-1)} variant='contained' disabled={activeStep == 0}>
          Back
        </Button>

        <Button onClick={handleStep(1)} variant='contained'>
          {activeStep == (steps.length-1)?"Create Account" : "Continue"}    
        </Button>
      </div>
      </section>      
    </div>
  )
}

export default SellerAccountForm