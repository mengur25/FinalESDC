import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../State/Store";
import { loginSeller } from "../../../../State/AuthSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SellerLoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
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
    },
    onSubmit: (values) => {
      dispatch(loginSeller(values));

    },
  });

 useEffect(() => {
  if (jwt && role === ("ROLE_SELLER")) {
  navigate("/seller");
  toast.success("Login successful!");
}
}, [jwt, role, navigate]);

useEffect(() => {
  if (authError) {
    toast.error(authError);
  }
}, [authError]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="flex justify-center font-bold text-primary text-[60px] mb-4">
        Login as a Seller
      </h1>

      <div className="space-y-5">
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
          type="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        {authError && <p className="text-red-500 text-sm">{authError}</p>}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ py: "11px" }}
          disabled={authLoading}
        >
          {authLoading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  );
};

export default SellerLoginForm;
