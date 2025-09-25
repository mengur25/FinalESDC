import {
  CheckCircleRounded,
  FiberManualRecord,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
const steps = [
  { name: "Order Placed", description: "on Thu, 18 Oct", value: "PLACED" },
  {
    name: "Packed",
    description: "Item Packed in Dispatch Warehouse",
    value: "CONFIRMED",
  },
  { name: "Shipped", description: "on Mon, 22 Oct", value: "SHIPPED" },
  { name: "Arriving", description: "on Tue, 23 Oct", value: "ARRIVING" },
  { name: "Arrived", description: "on Sat, 26 Oct", value: "DELIVERED" },
  { name: "CancelLed", description: "on Thu, 18 Oct", value: "CANCELLED" },
];

const cancelLedStep = [
  { name: "Order Placed", description: "on Thu, 18 Oct", value: "PLACED" },
  { name: "Order CancelLed", description: "on Thu, 18 Oct", value: "CANCELLED" },
];
const currentStep = 2;
const OrderStepper = ({ orderStatus }: any) => {
  const [statusStep, setStatusStep] = useState(steps);

  useEffect(() => {
    if (orderStatus === "CANCELLED") {
      setStatusStep(cancelLedStep);
    } else {
      setStatusStep(steps);
    }
  }, [orderStatus]);
  return (
    <Box className="my-10">
      {statusStep.map((step, index) => (
        <>
          <div key={index} className="flex px-4">
            <div className="flex flex-col items-center">

            <Box
              sx={{ zIndex: -1 }}
              className={`w-5 h-5  rounded-full flex items-center justify-center z-10
                    ${
                      index <= currentStep
                        ? "bg-gray-200 text-teal-500"
                        : "bg-gray-300 text-gray-600"
                    }
                    `}
            >
              {step.value === orderStatus ? (
                <CheckCircleRounded/>
              ) : (
                <FiberManualRecord sx={{ zIndex: -1 }} />
              )}
            </Box>

            {index < statusStep.length - 1 && (
              <div
                className={`border h-20 w-[5px] ${
                  index < currentStep
                    ? "bg-teal-500"
                    : "bg-gray-300 text-gray-600"
                }`}
              ></div>
            )}
            </div>
          <div className={`ml-2 w-full`}>
            <div
              className={`${
                step.value === orderStatus
                  ? "bg-primary p-2 text-white font-medium rounded-md -translate-y-3"
                  : ""
              } ${(orderStatus === "CANCELLED" && step.value === orderStatus) ? "bg-red-500" : ""} w-full`}
            >
                <p>{step.name}</p>
                <p className={`${step.value === orderStatus ? "text-gray-200" : "text-gray-500"} text-xs`}>
                    {step.description}
                </p>
            </div>
          </div>
          </div>
        </>
      ))}
    </Box>
  );
};

export default OrderStepper;
