import React, { useEffect } from "react";
import AdminDrawerList from "../../components/AdminDrawerList";
import AdminRoute from "../../../routes/AdminRoute";
import { useAppDispatch } from "./../../../State/Store";
import { fetchHomeCategory } from "../../../State/Admin/adminSlice";

const AdminDashboard = () => {
  const toggleDrawer = () => {};
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHomeCategory());
  }, []);
  return (
    <div>
      <div className="lg:flex lg:h-[90vh]">
        <section className="hidden lg:block h-full">
          <AdminDrawerList toggleDrawer={toggleDrawer} />
        </section>
        <section className="p-10 w-full lg:w-[80%] overflow-y-auto">
          <AdminRoute />
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
