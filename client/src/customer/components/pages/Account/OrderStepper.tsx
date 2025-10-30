import { CheckCircleRounded, FiberManualRecord } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useMemo } from "react";
import dayjs from "dayjs";

interface OrderStepperProps {
  orderStatus: string;
  orderDate: string | Date | undefined;
  sellerBusinessName: string | undefined;
}


const cancelledStep = [
  {
    name: "Order Placed",
    description: "Order has been placed",
    value: "PLACED",
  },
  {
    name: "Order Cancelled",
    description: "Order was cancelled by customer or seller",
    value: "CANCELLED",
  },
];

const OrderStepper = ({
  orderStatus,
  orderDate,
  sellerBusinessName,
}: OrderStepperProps) => {
  const baseDate = dayjs(orderDate);
  const sellerName = sellerBusinessName || "Dispatch Warehouse";

  const dynamicSteps = useMemo(() => {
    const formatStepDate = (daysToAdd: number) =>
      baseDate.isValid()
        ? `on ${baseDate.add(daysToAdd, "day").format("ddd, D MMM")}`
        : "";

    return [
      {
        name: "Order Pending",
        description: "Awaiting payment/confirmation",
        value: "PENDING",
      },
      { name: "Order Placed", description: formatStepDate(0), value: "PLACED" },
      {
        name: "Confirmed/Packed",
        description: `Item Confirmed and Packed in ${sellerName}`,
        value: "CONFIRMED",
      },
      { name: "Shipped", description: formatStepDate(2), value: "SHIPPED" },

      {
        name: "Delivered",
        description: `Expected ${formatStepDate(7)}`,
        value: "DELIVERED",
      },
    ];
  }, [orderDate, sellerBusinessName]);

  const statusStep = useMemo(() => {
    return orderStatus === "CANCELLED" ? cancelledStep : dynamicSteps;
  }, [orderStatus, dynamicSteps]);

  const currentStepIndex = useMemo(() => {

    const index = statusStep.findIndex((step) => step.value === orderStatus);

    return index !== -1 ? index : 0;
  }, [orderStatus, statusStep]);

  const isCancelled = orderStatus === "CANCELLED";
  const activeColor = isCancelled ? "bg-red-500" : "bg-teal-500";
  const defaultColor = "bg-gray-300 text-gray-600";
  const textColor = isCancelled ? "text-white" : "text-white";
  const highlightColor = isCancelled ? "bg-red-500" : "bg-teal-500";

  return (
    <Box className="my-10">
      {statusStep.map((step, index) => {
        if (index > currentStepIndex) return null;
        const isCompletedStep = index < currentStepIndex;
        const isActiveStep = index === currentStepIndex;

        return (
          <div key={index} className="flex px-4">
            <div className="flex flex-col items-center">
              <Box
                sx={{ zIndex: 1 }}
                className={`w-5 h-5 rounded-full flex items-center justify-center 
                ${isCompletedStep || isActiveStep ? activeColor : defaultColor} 
                text-white`}
              >
                {isCompletedStep || isActiveStep ? (
                  <CheckCircleRounded sx={{ fontSize: "1rem" }} />
                ) : (
                  <FiberManualRecord sx={{ fontSize: "0.6rem" }} />
                )}
              </Box>

              {index < statusStep.length - 1 && (
                <div
                  className={`h-12 w-[2px] ${
                    index < currentStepIndex ? activeColor : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>

            <div className="ml-2 w-full">
              <div
                className={`${
                  isActiveStep
                    ? `${highlightColor} p-2 ${textColor} font-medium rounded-md -translate-y-3`
                    : ""
                } w-full`}
              >
                <p
                  className={
                    isActiveStep ? textColor : "text-gray-900 font-medium"
                  }
                >
                  {step.name}
                </p>
                <p
                  className={`${
                    isActiveStep ? "text-gray-200" : "text-gray-500"
                  } text-xs`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </Box>
  );
};

export default OrderStepper;
