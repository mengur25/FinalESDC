import React from "react";
import { Button, IconButton, Radio } from "@mui/material";
import { Edit } from "@mui/icons-material";

interface UserAddressCardProps {
  address: any;
  selected: boolean;
  onSelect: () => void;
  onEdit: (address: any) => void;
}

const UserAddressCard: React.FC<UserAddressCardProps> = ({
  address,
  selected,
  onSelect,
  onEdit,
}) => {
  if (!address) return null;

  return (
    <div className="flex items-center gap-3 w-full" onClick={onSelect}>
      <Radio checked={selected} value={address.id} />

      <div
        className={`p-4 border w-full rounded-md flex items-start justify-between cursor-pointer ${
          selected ? "border-blue-500" : "border-gray-300"
        }`}
      >
        <div className="flex flex-col justify-between">
          <h1 className="font-bold">{address.name || "No Name"}</h1>

          <p>
            {address.address}, {address.city}
          </p>

          <p>
            <strong>Mobile:</strong> {address.mobile}
          </p>

          {address.selected && (
            <p className="text-sm text-blue-500 font-medium">Default Address</p>
          )}
        </div>

        <Button
          color="primary"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(address);
          }}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default UserAddressCard;
