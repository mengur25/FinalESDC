import { Divider } from "@mui/material";
import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Order from "./Order";
import OrderDetails from "./OrderDetails";
import UserDetails from "./UserDetails";
import Address from "./Address";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { logout } from "../../../../State/AuthSlice";

const menu = [
  { name: "Orders", path: "/account/orders" },
  { name: "Profile", path: "/account" },
  { name: "Wishlist", path: "/account/wishlist" },
  { name: "Saved cards", path: "/account/saved-card" },
  { name: "Addresses", path: "/account/addressed" },
  { name: "Logout", path: "/" },
];
const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () =>{
    dispatch(logout());
    toast.success("Logged out successfully")
    navigate("/");
  }

  const handleClick = (item: any) => {
    navigate(item.path);
  };
  return (
    <div className="px-5 lg:px-52 min-h-screen mt-10">
      <div>
        <h1 className="text-lg font-bold pb-5">Nguyen</h1>
      </div>
      <Divider />
      <div className="grid gird-cols-1 lg:grid-cols-3 lg:min-h-[78vh]">
        <section className="col-span-1 lg:border-r lg:pr-5 py-5 h-full">
          {menu.map((item) => (
            <div
            onClick={() => {
                navigate(item.name);
                if (item.name === "Logout") handleLogout();
              }}
              key={item.name}
              className={`${item.path === location.pathname ? "bg-primary text-white" : ""}
                p-4 rounded-md cursor-pointer hover:bg-primary hover:text-white mb-1`}
            >
              <p>{item.name}</p>
            </div>
          ))}
        </section>
        <section className="right lg:col-span-2 lg:pl-5 py-5">
          <Routes>
            <Route path="/" element={<UserDetails/>}/>
            <Route path="/orders" element={<Order/>}/>
            <Route path="/order/:orderId/:orderItemId" element={<OrderDetails/>}/>
            <Route path="/addresses" element={<Address/>}/>
          </Routes>
        </section>
      </div>
    </div>
  );
};

export default Account;
