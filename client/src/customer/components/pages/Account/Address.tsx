import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import UserAddressCard from "./UserAddressCard";
import AddressForm from "../Checkout/AddressForm";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import store from "./../../../../State/Store";
import {
  createAddress,
  fetchAddresses,
  selectAddress,
  updateAddress,
} from "../../../../State/Customer/AddressSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Address = () => {
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [editingAddress, setEditingAddress] = useState<any>(null);

const handleEditAddress = (addr: any) => {
  setEditingAddress(addr);
  setOpen(true);
};
  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 🔑 Lấy JWT từ localStorage
  const dispatch = useAppDispatch();
  const { addresses } = useAppSelector((state) => state.address);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleAddAddress = (newAddr: any) => {
    dispatch(createAddress(newAddr));
  };
  const handleSelectAddress = (id: number) => {
  setSelectedAddress(id);
  dispatch(selectAddress(id));
};


  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">My Addresses</h1>
        <Button variant="contained" onClick={handleOpen}>
          Add New Address
        </Button>
      </div>

      {addresses.length > 0 ? (
        addresses.map((addr) => (
          <UserAddressCard
            key={addr.id}
            address={addr}
            selected={addr.selected} 
            onSelect={() => handleSelectAddress(addr.id)}
            onEdit={handleEditAddress}
          />
        ))
      ) : (
        <p>No addresses found. Please add one.</p>
      )}

      <Modal open={open} onClose={handleClose}>
  <Box sx={style}>
    <AddressForm
      onSave={(newAddr: any) => {
  if (editingAddress) {
    dispatch(
      updateAddress({
        id: editingAddress.id,
        data: newAddr,
      })
    );
  } else {
    dispatch(createAddress(newAddr));
  }
  handleClose();
  setEditingAddress(null);
}}
      onClose={handleClose}
      initialValues={editingAddress}
    />
  </Box>
</Modal>


    </div>
  );
};

export default Address;
