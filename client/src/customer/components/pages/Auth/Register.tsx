import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../State/Store";
import { sendOtp, registerUser } from "../../../../State/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import banner from "../../../../assets/banner.png";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLogin, setIsLogin] = useState(false);

  const { loading, error, otpMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      mobile: "",
      password: "",
      otp: "",
    },
    onSubmit: (values) => {
      dispatch(registerUser(values))
        .unwrap()
        .then(() => {
          toast.success("Register successfully");
          navigate("/");
        })
        .catch((err) => toast.error(err.message || "Register failed"));
    },
  });

  const handleSendOtp = () => {
    if (!formik.values.email) {
      toast.error("Please enter email first");
      return;
    }
    dispatch(sendOtp({ email: formik.values.email, role: "ROLE_CUSTOMER" }))
      .unwrap()
      .then(() => {
        setOtpSent(true);
        toast.success("OTP sent to your email");
      })
      .catch((err) => toast.error(err.message || "Send OTP failed"));
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div className="flex justify-center h-[90vh] items-center">
      <div className="max-w-md h-[70vh] rounded-sm shadow-lg">
        <img className="w-full rounded-t-md" src={banner} alt="" />

        <div className="max-w-md mx-auto p-5 rounded bg-white">
          <h1 className="text-center font-bold text-xl text-primary pb-8">
            Sign Up
          </h1>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              label="Mobile"
              name="mobile"
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              onChange={formik.handleChange}
            />

            {otpSent && (
              <TextField
                fullWidth
                label="OTP"
                name="otp"
                onChange={formik.handleChange}
              />
            )}

            <div className="flex ms-4 w-[90%]">
              {!otpSent ? (
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleSendOtp}
                  disabled={loading}
                >
                  Send OTP
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  Register
                </Button>
              )}
            </div>

            <div className="flex items-center gap-1 justify-center mt-5">
              <p>{isLogin && "Don't"} have Account?</p>
              <Link
                to={"/login"}
                className="text-primary italic cursor-pointer"
                onClick={() => {
                  setIsLogin(!isLogin);
                }}
              >
                {isLogin ? "Create Account" : "Login"}
              </Link>
            </div>
          </form>
          {otpMessage && <p className="text-green-500 mt-2">{otpMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;
