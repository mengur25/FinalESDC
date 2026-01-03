import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  Typography,
  Grid,
  Divider,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchSellerReport } from "../../../State/Seller/SellerSlice";
import { fetchTransactionsBySeller } from "../../../State/Seller/transactionSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Order } from "../../../types/orderTypes";

const formatCurrency = (amount: number | undefined): string => {
  if (amount === undefined || amount === null) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// --- HÀM XỬ LÝ SẢN PHẨM & KHÁCH HÀNG ---

const processBestSellingProducts = (orders: Order[]) => {
  const productMap = orders.reduce((acc, order) => {
    if (order.orderStatus === "CANCELLED" || !order.orderItems) return acc;

    order.orderItems.forEach((item) => {
      if (!item.product || !item.product.id) return;
        
      const productId = String(item.product.id);
      const productName = item.product.title;
      const quantity = item.quantity;

      if (!acc[productId]) {
        acc[productId] = { id: item.product.id, name: productName, totalQuantity: 0 };
      }
      acc[productId].totalQuantity += quantity;
    });
    return acc;
  }, {} as Record<string, { id: number; name: string; totalQuantity: number }>);

  return Object.values(productMap)
    .sort((a, b) => b.totalQuantity - a.totalQuantity)
    .slice(0, 5); 
};

const processTopRevenueProducts = (orders: Order[]) => {
  const productMap = orders.reduce((acc, order) => {
    if (order.orderStatus === "CANCELLED" || !order.orderItems) return acc;

    order.orderItems.forEach((item) => {
      if (!item.product || !item.product.id) return;

      const productId = String(item.product.id);
      const productName = item.product.title;
      const revenue = item.sellingPrice || 0;

      if (!acc[productId]) {
        acc[productId] = { id: item.product.id, name: productName, totalRevenue: 0 };
      }
      acc[productId].totalRevenue += revenue;
    });
    return acc;
  }, {} as Record<string, { id: number; name: string; totalRevenue: number }>);

  return Object.values(productMap)
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, 5); 
};

const processTopCustomers = (orders: Order[]) => {
  const customerMap = orders.reduce((acc, order) => {
    if (order.orderStatus === "CANCELLED" || !order.user || !order.user.email) return acc;

    const userEmail = order.user.email;
    const userName = order.user.fullName; 
    const totalSpent = order.totalSellingPrice || 0;

    if (!acc[userEmail]) {
      acc[userEmail] = { 
        id: userEmail, 
        name: userName, 
        totalOrders: 0, 
        totalSpent: 0 
      };
    }
    acc[userEmail].totalOrders += 1;
    acc[userEmail].totalSpent += totalSpent;
    return acc;
  }, {} as Record<string, { id: string; name: string; totalOrders: number; totalSpent: number }>); 

  return Object.values(customerMap)
    .sort((a, b) => b.totalOrders - a.totalOrders)
    .slice(0, 5);
};

// --- HÀM XỬ LÝ DỮ LIỆU THỜI GIAN (Giữ nguyên) ---

const processDailyData = (orders: Order[]) => {
  const dailyDataMap = orders.reduce((acc, order) => {
    if (order.orderStatus === "CANCELLED") return acc;
    const date = dayjs(order.orderDate ).format("YYYY-MM-DD");
    const amount = order.totalSellingPrice || 0;

    if (!acc[date]) {
      acc[date] = {
        name: dayjs(order.orderDate ).format("MMM D"),
        Revenue: 0,
        Orders: 0,
      };
    }
    acc[date].Revenue += amount;
    acc[date].Orders += 1;
    return acc;
  }, {} as Record<string, { name: string; Revenue: number; Orders: number }>);

  return Object.values(dailyDataMap).sort(
    (a, b) =>
      dayjs(a.name, "MMM D").valueOf() - dayjs(b.name, "MMM D").valueOf()
  );
};

const processMonthlyData = (orders: Order[]) => {
  const monthlyDataMap = orders.reduce((acc, order) => {
    if (order.orderStatus === "CANCELLED") return acc;
    const date = new Date(order.orderDate );
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
    const amount = order.totalSellingPrice || 0;

    if (!acc[monthYear]) {
      acc[monthYear] = { name: monthYear, Revenue: 0, Orders: 0 };
    }
    acc[monthYear].Revenue += amount;
    acc[monthYear].Orders += 1;
    return acc;
  }, {} as Record<string, { name: string; Revenue: number; Orders: number }>);

  return Object.values(monthlyDataMap).sort(
    (a, b) => new Date(a.name).getTime() - new Date(b.name).getTime()
  );
};

// --------------------------------------------------------------------

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { report, loading: reportLoading, error: reportError } = useAppSelector(
    (state: any) => state.seller
  );
  const { transactions: orders, loading: orderLoading } = useAppSelector(
    (state: any) => state.transactions
  );

    // **[LOGIC TÍNH TỔNG DOANH THU GROSS]** Tính tất cả đơn hàng KHÔNG phải là CANCELLED
    const totalEarnings = useMemo(() => {
        if (!orders || orders.length === 0) return 0;

        return (orders as Order[]).reduce((total, order) => {
            if (order.orderStatus !== "CANCELLED") { 
                return total + (order.totalSellingPrice || 0);
            }
            return total;
        }, 0);
    }, [orders]);
    
    const estimatedNetPayout = totalEarnings * 0.9; 
    const displayValue = estimatedNetPayout; 
    
    const isLoading = reportLoading || orderLoading; // Loading khi report HOẶC orders đang tải


  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs().subtract(30, "day")
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [monthPicker, setMonthPicker] = useState<Dayjs | null>(dayjs());

  const jwt = localStorage.getItem("jwt") || "";

  useEffect(() => {
    if (jwt) {
      dispatch(fetchSellerReport(jwt));
      dispatch(fetchTransactionsBySeller(jwt));
    }
  }, [dispatch, jwt]);

  // Lọc Orders theo Date Range (Dùng cho Chart và Top Sales)
  const filteredOrders = useMemo(() => {
    if (!orders || orders.length === 0 || !startDate || !endDate) return [];
    const startTs = startDate.startOf("day").valueOf();
    const endTs = endDate.endOf("day").valueOf();
    return (orders as Order[]).filter((order) => {
      const orderDate = new Date(order.orderDate ).getTime();
      return orderDate >= startTs && orderDate <= endTs;
    });
  }, [orders, startDate, endDate]);

  const dailyFilteredData = useMemo(() => processDailyData(filteredOrders), [filteredOrders]);

  const monthlyFilteredData = useMemo(() => {
    if (!orders || !monthPicker) return [];
    return (orders as Order[]).filter((order) => {
      const d = dayjs(order.orderDate );
      return d.year() === monthPicker.year() && d.month() === monthPicker.month();
    });
  }, [orders, monthPicker]);

  const dailyMonthData = useMemo(() => processDailyData(monthlyFilteredData), [monthlyFilteredData]);

  // **[LOGIC ĐÃ SỬA]** Áp dụng bộ lọc ngày (filteredOrders) cho Top Sales Performance
  const topSellingProducts = useMemo(() => processBestSellingProducts(filteredOrders), [filteredOrders]);
  const topRevenueProducts = useMemo(() => processTopRevenueProducts(filteredOrders), [filteredOrders]);
  const topCustomers = useMemo(() => processTopCustomers(filteredOrders), [filteredOrders]);


  const generalMonthlyData = useMemo(() => processMonthlyData(orders), [orders]); // Giữ nguyên, không dùng filter


  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading Dashboard Data...
        </Typography>
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 4, background: "#f5f5f5", minHeight: "100vh" }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary.main">
          Seller Dashboard
        </Typography>
        <Divider sx={{ mb: 4 }} />
        
        {/* --- CARD TỔNG QUAN DOANH THU --- */}
        <Card className="rounded-md sapce-y-4 p-5">
            {reportError ? (
                <Typography variant="body2" color="error">
                    Error loading report: {reportError}
                </Typography>
            ) : (
                <>
                <h1 className="text-gray-600 font-medium">
                    Total Earning (Gross Sales)
                </h1>
                <h1 className="font-bold text-xl pb-1">
                    {formatCurrency(totalEarnings)}
                </h1>
                <Divider />
                <p className="text-gray-600 font-medium pt-1">
                    Net Payout (Estimated):{" "}
                    <strong>{formatCurrency(displayValue)}</strong>
                </p>
                </>
            )}
        </Card>
        
        {/* --- Bộ lọc theo ngày --- */}
        <Box
          display="flex"
          gap={3}
          mt={4}
          mb={5}
          alignItems="center"
          bgcolor="white"
          p={2}
          borderRadius={2}
          boxShadow={1}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            Filter by Date Range:
          </Typography>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            slotProps={{ textField: { size: "small", sx: { width: 180 } } }}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            slotProps={{ textField: { size: "small", sx: { width: 180 } } }}
          />
        </Box>

        {/* --- DAILY REVENUE & ORDERS (Filtered by Date Range) --- */}
        <Grid container spacing={4}>
          <Grid item xs={12} lg={6}>
            <Card elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Daily Revenue (Filtered)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyFilteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#4CAF50" unit="$" />
                  <Tooltip formatter={(v) => formatCurrency(v as number)} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="Revenue" fill="#4CAF50" name="Daily Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Daily Order Count (Filtered)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyFilteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Orders"
                    stroke="#2196F3"
                    activeDot={{ r: 8 }}
                    name="Orders Count"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>
        
        {/* --- TOP SALES PERFORMANCE (Filtered by Date Range) --- */}
        <Box sx={{ mt: 6, mb: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold" color="textPrimary">
            Top Sales Performance (Filtered)
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom color="primary.dark">
                 Best Selling Products (Quantity)
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <List>
                {topSellingProducts.map((p, index) => (
                  <ListItem key={p.id} disablePadding>
                    <ListItemText primary={`${index + 1}. ${p.name}`} secondary={`Units Sold: ${p.totalQuantity}`} />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom color="secondary.dark">
                 Top Revenue Products
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <List>
                {topRevenueProducts.map((p, index) => (
                  <ListItem key={p.id} disablePadding>
                    <ListItemText primary={`${index + 1}. ${p.name}`} secondary={`Revenue: ${formatCurrency(p.totalRevenue)}`} />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom color="info.main">
                 Top Customers (Orders/Spending)
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <List>
                {topCustomers.map((c, index) => (
                  <ListItem key={c.id} disablePadding>
                    <ListItemText 
                      primary={`${index + 1}. ${c.name}`} 
                      secondary={`Orders: ${c.totalOrders} | Spent: ${formatCurrency(c.totalSpent)}`} 
                    />
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>


        {/* --- Bộ chọn tháng --- */}
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          mt={6}
          mb={3}
          bgcolor="white"
          p={2}
          borderRadius={2}
          boxShadow={1}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            Filter by Month:
          </Typography>
          <DatePicker
            views={["year", "month"]}
            label="Select Month"
            value={monthPicker}
            onChange={(newValue) => setMonthPicker(newValue)}
            slotProps={{ textField: { size: "small", sx: { width: 180 } } }}
          />
        </Box>

        {/* --- MONTHLY REVENUE & ORDERS (Filtered by Month) --- */}
        <Grid container spacing={4}>
          <Grid item xs={12} lg={6}>
            <Card elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Revenue by Selected Month
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyMonthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#9C27B0" unit="$" />
                  <Tooltip formatter={(v) => formatCurrency(v as number)} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="Revenue" fill="#9C27B0" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Orders by Selected Month
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyMonthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Orders"
                    stroke="#FF9800"
                    activeDot={{ r: 8 }}
                    name="Orders Count"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default Dashboard;