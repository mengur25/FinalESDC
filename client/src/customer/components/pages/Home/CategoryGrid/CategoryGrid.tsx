import React from "react";
import fashion from "../../../../../assets/fashion.png";
import shoes from "../../../../../assets/shoes.png";
import laptops from "../../../../../assets/laptops.png";
import jewelry from "../../../../../assets/jewelry.png";
import watch from "../../../../../assets/watch.png";
const CategoryGrid = () => {
  return (
    <div className="grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20">
      <div className="col-span-3 row-span-10 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src={fashion}
          alt=""
        />
      </div>
      <div className="col-span-2 row-span-6 text-white">
        <img
          src={shoes}
          alt=""
        />
      </div>
      
      <div className="col-span-4 row-span-10 text-white">
        <img src={laptops} alt="" />
      </div>
      <div className="col-span-3 row-span-10 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src={watch}
          alt=""
        />
      </div>
      <div className="col-span-2 row-span-6 text-white">
        <img src={jewelry} alt="" />
      </div>
    </div>
  );
};

export default CategoryGrid;
