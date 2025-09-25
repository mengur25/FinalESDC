import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import store, { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchSellerOrders, updateOrderStatus } from "../../../State/Seller/sellerOrderSlice";
import { Button, Fade, Menu, MenuItem } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const orderStatus = [
  {color: "#ffa500", label: 'PENDING'},
  {color: "#f5bcsa", label: 'CONFIRMED'},
  {color: "#f5bcsa", label: 'PLACED'},
  {color: "#1e90ff", label: 'SHIPPED'},
  {color: "#32cd32", label: "DELIVERED"},
  {color: "#ff0000", label: "CANCELLED"},
]

const orderStatusColor = {
  PENDING: {color: "#ffa500", label: "PENDING"},
  CONFIRMED: {color: "#f5bcsa", label: "CONFIRMED"},
  PLACED: {color: "#f5bcba", label: "PLACED"},
  SHIPPED: {color: "#1e90ff", label: "SHIPPED"},
  DELIVERED: {color: "#32cd32", label: "DELIVERED"},
  CANCELLED: {color: "#ff0000", label: "CANCELLED"},
}

export default function OrderTable() {
  const dispatch = useAppDispatch();
  const { sellerOrder } = useAppSelector((store) => store);

  React.useEffect(() => {
    dispatch(fetchSellerOrders(localStorage.getItem("jwt") || ""));
  }, []);

  const [anchorEl, setAnchorEl] = React.useState<null | any>({});
  const open = Boolean(anchorEl);
  const handleClick = (event: any, orderId: number) => {
    setAnchorEl((prev: any) => ({ ...prev, [orderId]: event.currentTarget }));
  };

  const handleClose = (orderId:number) => ()  => {
    setAnchorEl((prev:any) => ({...prev, [orderId]: null}));
  };

  const handleUpdateOrderStatus=(orderId:number, orderStatus: any)=>{
    dispatch(updateOrderStatus({jwt: localStorage.getItem("jwt") || "", orderId, orderStatus}))
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order Id</StyledTableCell>
            <StyledTableCell>Products</StyledTableCell>
            <StyledTableCell align="right">Shipping Address</StyledTableCell>
            <StyledTableCell align="right">Order Status</StyledTableCell>
            <StyledTableCell align="right">Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sellerOrder.orders.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="item">
                {item.id}
              </StyledTableCell>
              <StyledTableCell align="right">
                <div className="flex gap-1 flex-wrap">
                  {item.orderItems.map((orderItem) => (
                    <div className="flex gap-5 items-center">
                      <img
                        className="w-20 rounded-sm"
                        src={orderItem.product.images[0]}
                        alt=""
                      />
                      <div className="flex flex-col justify-between py-2">
                        <h1>Title: {orderItem.product.title}</h1>
                        <h1>Selling Price: {orderItem.product.sellingPrice}</h1>
                        <h1>Color: {orderItem.product.color}</h1>
                      </div>
                    </div>
                  ))}
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">
                <div className="flex flex-col gap-y-2">
                  <h1>{item.shippingAddress.name}</h1>
                  <h1>
                    {item.shippingAddress.address}, {item.shippingAddress.ward}
                  </h1>
                  <h1>
                    {item.shippingAddress.city}, {item.shippingAddress.pinCode}
                  </h1>
                  <h1>
                    <strong>Mobile: </strong>
                    {item.shippingAddress.mobile}
                  </h1>
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">
                <span className="px-5 py-2 border rounded-full border-primary text-primary">
                  {item.orderStatus}
                </span>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button size="small" color="primary" onClick={(e) => handleClick(e, item.id)}>Status</Button>
                <Menu
                  id={`status-menu ${item.id}`}
                  anchorEl={anchorEl[item.id]}
                  open={Boolean(anchorEl[item.id])}
                  onClose={handleClose(item.id)}
                  MenuListProps={{
                    'aria-labelledby' : `status-menu ${item.id}`,
                  }}
                >
                  {orderStatus.map((status) => 
                  <MenuItem 
                  key={status.label} 
                  onClick={() =>handleUpdateOrderStatus(item.id, status.label)}>
                    {status.label}
                  </MenuItem>
                )}
                </Menu>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
