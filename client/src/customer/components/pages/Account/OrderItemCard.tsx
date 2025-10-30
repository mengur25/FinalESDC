import { ElectricBolt } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { teal } from "@mui/material/colors";
import React from "react";
import { Order, OrderItem } from "../../../../types/orderTypes";
import { useNavigate } from "react-router-dom";

// Định nghĩa màu sắc cho trạng thái Order
const statusColors: { [key: string]: string } = {
  DELIVERED: "#32cd32", // lime green
  SHIPPED: "#1e90ff", // dodger blue
  CONFIRMED: "#ffa500", // orange
  PENDING: "#ff69b4", // pink
  CANCELLED: "#ff0000", // red
};

const OrderItemCard = ({ item, order }: { item: OrderItem; order: Order }) => {
  const navigate = useNavigate();

  // Lấy trạng thái từ Order (chứ không phải OrderItem)
  const orderStatus = order.orderStatus || "PENDING";
  const statusColor = statusColors[orderStatus] || teal[500];

  return (
    <div
      onClick={() => navigate(`/account/order/${order.id}/${item.id}`)}
      className="text-sm bg-white p-5 space-y-5 border rounded-md cursor-pointer"
    >
      <div className="flex items-center gap-5">
        <div>
          <Avatar sizes="small" sx={{ bgcolor: statusColor }}>
            {" "}
            {/* SỬ DỤNG MÀU SẮC ĐỘNG */}
            <ElectricBolt />
          </Avatar>
        </div>
        <div>
          <h1 className="font-bold" style={{ color: statusColor }}>
            {orderStatus}
          </h1>{" "}
          {/* HIỂN THỊ TRẠNG THÁI THỰC TẾ */}
          <p>
            {/* Lấy ngày giao hàng dự kiến hoặc ngày tạo Order */}
            Arriving By {order.deliverDate || order.orderDate || "N/A"}
          </p>
        </div>
      </div>
      <div className="p-5 bg-teal-50 flex gap-3">
        <div>
          {/* Truy cập mảng ảnh an toàn */}
          <img
            className="w-[70px]"
            src={item.product?.images?.[0]}
            alt={item.product?.title || "Product Image"}
          />
        </div>
        <div className="w-full space-y-2">
          {/* HIỂN THỊ TÊN DOANH NGHIỆP CỦA SELLER */}
          <h1 className="font-bold">
            {item.product?.seller?.businessDetails?.bussinessName}
          </h1>
          <p>{item.product?.title}</p>
          <p>
            <strong>Size: </strong>
            {/* HIỂN THỊ SIZE THỰC TẾ */}
            {item.size || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
