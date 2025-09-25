import React, { useState } from "react";
import SellerAccountForm from "./SellerAccountForm";
import SellerLoginForm from "./SellerLoginForm";
import { Button } from "@mui/material";
import bcsl from "../../../../assets/becomeSeller.png";
import { Link } from "react-router-dom";

const BecomeSeller = () => {
  const [showRegister, setShowRegister] = useState(false);

  const handleToggle = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div className="grid md:gap-10 grid-cols-3 min-h-screen">
      <section className="lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg rounded-b-md">
        {showRegister ? <SellerAccountForm /> : <SellerLoginForm />}

        <div className="mt-10 space-y-2 text-center">
          {showRegister ? (
            <p className="text-sm font-medium">
              Already have a seller account?{" "}
              <span
                onClick={handleToggle}
                className="text-primary italic cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm font-medium">
              Don't have a seller account yet?{" "}
              <span
                onClick={handleToggle}
                className="text-primary italic cursor-pointer"
              >
                Register now
              </span>
            </p>
          )}

          
        </div>
      </section>

      <section className="hidden md:col-span-1 lg:col-span-2 md:flex justify-center items-center">
        <div className="lg:w-[70%] px-5 space-y-10">
          <div className="space-y-2 font-bold text-center">
            <p className="text-2xl">Join the Marketplace Revolution</p>
            <p className="text-lg text-primary-color">Boost your sales today</p>
          </div>
          <img src={bcsl} alt="Become a seller" />
        </div>
      </section>
    </div>
  );
};

export default BecomeSeller;
