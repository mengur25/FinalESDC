import { Avatar, Box, Grid2, IconButton, Rating } from "@mui/material";
import React from "react";
import pr1 from "../../../../assets/pr1.png";
import { Delete } from "@mui/icons-material";
import { red } from "@mui/material/colors";

const ReviewCard = () => {
  return (
    <div className="flex justify-between">
      <Grid2 container spacing={9}>
        <Grid2 size={{ xs: 1 }}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#9155fd" }}
            >
              N
            </Avatar>
          </Box>
        </Grid2>

        <Grid2 size={{ xs: 9 }}>
          <div className="space-y-2">
            <p className="font-semibold text-lg">Nguyen</p>
            <p className="opacity-70">2025-09-27T23:16:07.4788333</p>
          </div>
          <Rating readOnly value={4} precision={1} />
          <p>Value for money product, great product</p>
          <div>
            <img className="w-24 h-24" src={pr1} alt="" />
          </div>
        </Grid2>
      </Grid2>
      <IconButton>
        <Delete sx={{ color: red[700] }} />
      </IconButton>
    </div>
  );
};

export default ReviewCard;
