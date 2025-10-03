import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../State/Store";
import { loginSeller } from "../../../../State/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import banner from "../../../../assets/banner.png";

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
    const [isLogin, setIsLogin] = useState(true);

  const { loading, error } = useSelector((state: RootState) => state.auth);
  const {
    loading: authLoading,
    error: authError,
    jwt,
    role,
  } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullName: "",
      otp: "",
    },
    onSubmit: (values) => {
      dispatch(loginSeller(values));
    },
  });

  useEffect(() => {
    if (jwt && role === "ROLE_CUSTOMER") {
      navigate("/");
      toast.success("Login successful!");
    }
  }, [jwt, role, navigate]);

    useEffect(() => {
    if (jwt && role === "ROLE_ADMIN") {
      navigate("/admin");
      toast.success("Login successful!");
    }
  }, [jwt, role, navigate]);

  useEffect(() => {
    if (authError) {
      toast.error(authError);
    }
  }, [authError]);
  return (
    <div className="flex justify-center h-[90vh] items-center">
      <div className="max-w-md h-[70vh] rounded-sm ">
        <img className="w-full rounded-t-md" src={banner} alt="" />
        <div className="mt-8 px-10">
        <h1 className="flex justify-center font-bold text-primary text-[60px] mb-4">
          Login
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-5 mb-5">
            <TextField
              fullWidth
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ py: "11px" }}
            disabled={authLoading}
          >
            {authLoading ? "Logging in..." : "Login"}
          </Button>

          <div className="flex items-center gap-1 justify-center mt-5">
            <p>{isLogin && "Don't"} have Account?</p>
            <Link
            to={"/register"}
            className="text-primary italic cursor-pointer"
              onClick={() => {
                setIsLogin(!isLogin);
              }}
            >
              {isLogin ? "Create Account" : "Login"}
            </Link>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
