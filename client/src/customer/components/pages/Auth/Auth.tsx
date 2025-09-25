import React, { useState } from "react";
import banner from "../../../../assets/banner.png";
import LoginForm from "./LoginForm";
import Register from "./Register";
import { Button } from "@mui/material";
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex justify-center h-[90vh] items-center">
      <div className="max-w-md h-[85vh] rounded-sm shadow-lg">
          {isLogin ? <LoginForm /> : <Register />}
          
        </div>
    </div>
  );
};

export default Auth;
