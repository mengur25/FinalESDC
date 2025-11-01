import React, { useEffect, useState, useMemo } from "react";
import OrderItem from "./OrderItemCard";
import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import { fetchUserOrderHistory } from "../../../../State/Customer/orderSlice";
import { Order as OrderType } from "../../../../types/orderTypes";
import { Pagination, Box, CircularProgress, Typography } from "@mui/material";

const Orders = () => { 
    const dispatch = useAppDispatch();
    const { order } = useAppSelector((store: any) => store);
    
    const [page, setPage] = useState(1);
    const itemsPerPage = 3; 
    const allOrders: OrderType[] = order.orders || [];

    useEffect(() => {
        dispatch(fetchUserOrderHistory(localStorage.getItem("jwt") || ""));
    }, [dispatch]);

    const totalPages = Math.ceil(allOrders.length / itemsPerPage);

    const ordersToDisplay = useMemo(() => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return allOrders.slice(startIndex, endIndex);
    }, [allOrders, page]);

    // Handler thay đổi trang
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    
    // Xử lý trạng thái Loading
    if (order.loading && allOrders.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Loading orders...</Typography>
            </Box>
        );
    }
    
    if (allOrders.length === 0 && !order.loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <Typography variant="h6" color="textSecondary">You have no orders yet.</Typography>
            </Box>
        );
    }

    return (
        <div className="text-sm min-h-screen">
            <div className="pb-5">
                <h1 className="font-semibold">All Orders</h1>
                <p>Total {allOrders.length} orders found.</p>
            </div>
            
            <div className="space-y-2">
                {ordersToDisplay.map((order) => 
                    order.orderItems.map((item) => (
                        <OrderItem key={item.id} order={order} item={item}/>
                    ))
                )}
            </div>

            <Box display="flex" justifyContent="center" py={5}>
                {totalPages > 1 && (
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handleChangePage}
                        color="primary"
                        siblingCount={1}
                        boundaryCount={1}
                    />
                )}
            </Box>
        </div>
    );
};

export default Orders;