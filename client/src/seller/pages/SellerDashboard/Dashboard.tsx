import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  Typography,
  Grid,
  Divider,
  Box,
  CircularProgress,
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

// ✅ Xử lý dữ liệu theo ngày
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

// ✅ Xử lý dữ liệu theo tháng
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

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { report, loading: reportLoading } = useAppSelector(
    (state: any) => state.seller
  );
  const { transactions: orders, loading: orderLoading } = useAppSelector(
    (state: any) => state.transactions
  );

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

  // --- DỮ LIỆU MONTHLY CHUNG ---
  const generalMonthlyData = useMemo(() => processMonthlyData(orders), [orders]);

  if (reportLoading || orderLoading) {
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

        {/* --- Bộ lọc theo ngày --- */}
        <Box
          display="flex"
          gap={3}
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

        {/* --- 1. DAILY REVENUE --- */}
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

          {/* --- 2. DAILY ORDERS (Filtered) --- */}
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

        {/* --- 3. MONTHLY REVENUE --- */}
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

          {/* --- 4. MONTHLY ORDER COUNT --- */}
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
