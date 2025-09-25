import React from "react";
import ElectricCategory from "./ElectricCategory/ElectricCategory";
import CategoryGrid from "./CategoryGrid/CategoryGrid";
import Deal from "../Deal/Deal";
import ShopByCategory from "./ShopByCategory/ShopByCategory";
import banner from "../../../../assets/banner.png";
import { Button } from "@mui/material";
import { StorefrontOutlined } from "@mui/icons-material";

const Home = () => {
  return (
    <>
      <div className="space-y-5 lg:space-y-10 relative">
        <ElectricCategory />
        <CategoryGrid />
        <section className="pt-10 pb-20">
          <h1 className="text-lg lg:text-4xl font-bold text-center text-primary pb-5 lg:pb-10">
            Shop By Category
          </h1>
          <ShopByCategory />
        </section>
        <section className="pt-10 pb-20">
          <h1 className="text-lg lg:text-4xl font-bold text-center text-primary pb-5 lg:pb-10">
            Today Deals
          </h1>
          <Deal />
        </section>
        <section className=" mt-20 lg:px-20 relative h-[250px] lg:h-[700px] object-cover pb-5 lg:pb-10">
          <img className="border w-full h-full" src={banner} alt="" />
          <div className="absolute top-1/2 left-4 lg:left-[15rem] transform -translate-y-0.5 font-semibold lg:text-4xl space-y-3">
            <h1>Sell your Product</h1>
            <p className="text-xl md:text-2xl">With <span className="logo">E-commerce</span></p>
            <div className="pt-6 flex">
              <Button variant="contained" className="!h-[50px]" startIcon={<StorefrontOutlined/>}>  Become a Seller</Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
