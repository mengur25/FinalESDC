import React, { useState } from "react";
import pr1 from "../../../../assets/pr1.png";
import {
  Add,
  AddShoppingCartOutlined,
  FavoriteBorder,
  LocalShipping,
  Remove,
  Shield,
  Star,
  Wallet,
  WorkspacePremium,
} from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import { Button, Divider } from "@mui/material";
import SimilarProduct from "./SimilarProduct";
import ReviewCard from "../Review/ReviewCard";
const PageDetails = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="px-5 lg:px-20 pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
            {[1, 1, 1, 1].map((item) => (
              <img
                src={pr1}
                alt=""
                className="lg:w-full w-[50px] cursor-pointer rounded-sm"
              />
            ))}
          </div>
          <div className="w-full lg:w-[85%]">
            <img src={pr1} alt="" className="w-full rounded-sm" />
          </div>
        </section>

        <section className="">
          <h1 className="font-bold text-lg text-primary">Suhura</h1>
          <p>Iphone Case</p>
          <div className="flex justify-between items-center py-2 border w-[180px] px-3 mt-5">
            <div className="flex gap-1 items-center">
              <span>4</span>
              <Star sx={{ color: teal[500], fontSize: "17px" }} />
            </div>
            <Divider orientation="vertical" flexItem />
            <span>234 Ratings</span>
          </div>
          <div>
            <div className="price flex items-center gap-3 text-2xl">
              <span className="font-sans text-gray-800">$4</span>
              <span className="line-through text-gray-400">$7</span>
              <span className="text-primary font-semibold">40%</span>
            </div>
            <p>Inclusive of all taxes. Free Shipping above $50</p>
          </div>
          <div className="mt-7 space-y-3">
            <div className="flex items-center gap-4">
              <Shield sx={{ color: teal[500] }} />
              <p>Authentic & Quality Assured</p>
            </div>
            <div className="flex items-center gap-4">
              <WorkspacePremium sx={{ color: teal[500] }} />
              <p>100% money back guarantee</p>
            </div>
            <div className="flex items-center gap-4">
              <LocalShipping sx={{ color: teal[500] }} />
              <p>Free Shipping & Returns</p>
            </div>
            <div className="flex items-center gap-4">
              <Wallet sx={{ color: teal[500] }} />
              <p>Pay on delivery might be available</p>
            </div>
          </div>
          <div className="mt-7 space-y-2">
            <h1>Quantity</h1>
            <div className="flex items-center gap-2 w-[140px] justify-between">
              <Button
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Remove />
              </Button>
              <span>{quantity}</span>

              <Button onClick={() => setQuantity(quantity + 1)}>
                <Add />
              </Button>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-5">
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddShoppingCartOutlined />}
              sx={{ py: "1rem" }}
            >
              Add to Bag
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FavoriteBorder />}
              sx={{ py: "1rem" }}
            >
              Wishlist
            </Button>
          </div>
          <div className="mt-5">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              et, neque hic natus itaque, sapiente labore quaerat sint quo
              expedita voluptatibus dicta placeat veritatis? Rem eligendi at
              atque assumenda id!
            </p>
          </div>
          <div className="mt-7 space-y-5">
            {/* <ReviewCard /> */}
            <Divider/>
          </div>
        </section>
      </div>

      <div className="mt-20">
        <h1 className="text-lg font-bold">Similar Product</h1>
        <div className="pt-5">
          {/* <SimilarProduct /> */}
        </div>
      </div>
    </div>
  );
};

export default PageDetails;
