import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import React, { useState } from "react";
import { colors } from "../../data/filter/color";
import { price } from "../../data/filter/price";
import { useSearchParams } from "react-router-dom";
import { discount } from "../../data/filter/discount";

const FilterSection = () => {
  const [expendColor, setExpendColor] = useState(false);
  const [expendPrice, setExpendPrice] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const updateFilterParams = (e: any) => {
    const { value, name } = e.target;
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(name, value);
    } else {
      newParams.delete(name);
    }
    setSearchParams(newParams);
  };

  const clearAllFilter = () => {
    const newParams = new URLSearchParams();
    setSearchParams(newParams);
  };

  const handleExpendColor = () => {
    setExpendColor(!expendColor);
  };
  return (
    <div className="-z-50 space-y-5 bg-white">
      <div className="flex items-center justify-between h-[40px] px-9 lg:border-r">
        <div className="text-lg font-semibold">Filter</div>
        <Button
          onClick={clearAllFilter}
          size="small"
          className="text-teal-600 cursor-pointer font-semibold"
        >
          Clear All
        </Button>
      </div>
      <Divider />
      <div className="px-9 space-y-6">
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: teal[500],
                pb: "14px",
              }}
              className="text-2xl font-semibold"
              id="color"
            >
              Color
            </FormLabel>
            <RadioGroup
              aria-labelledby="color"
              defaultValue=""
              name="color"
              onChange={updateFilterParams}
            >
              {colors.slice(0, expendColor ? colors.length : 5).map((item) => (
                <FormControlLabel
                  key={item.name}
                  value={item.name}
                  control={<Radio />}
                  label={
                    <div className="flex items-center gap-3">
                      <p>{item.name}</p>
                      <p
                        style={{ backgroundColor: item.hex }}
                        className={`h-5 w-5 rounded-full ${
                          item.name === "White" ? "border" : ""
                        }`}
                      ></p>
                    </div>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
          <div>
            <button
              onClick={handleExpendColor}
              className="text-primary cursor-pointer hover:text-teal-900 flex items-center"
            >
              {expendColor ? "Hide" : `+ ${colors.length - 5} more`}
            </button>
          </div>
        </section>

        <Divider />

        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: teal[500],
                pb: "14px",
              }}
              className="text-2xl font-semibold"
              id="price"
            >
              Price
            </FormLabel>
            <RadioGroup
              aria-labelledby="price"
              defaultValue=""
              name="price"
              onChange={updateFilterParams}
            >
              {price.map((item) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>

        <Divider />

        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: teal[500],
                pb: "14px",
              }}
              className="text-2xl font-semibold"
              id="discount"
            >
              Discount
            </FormLabel>
            <RadioGroup
              aria-labelledby="discount"
              defaultValue=""
              name="discount"
              onChange={updateFilterParams}
            >
              {discount.map((item) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
      </div>
    </div>
  );
};

export default FilterSection;
