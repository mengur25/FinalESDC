import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import reducer from "./AuthSlice";
import sellerProductSlice from "./Seller/sellerProductSlice";
import productSlice from "./Customer/ProductSlice";
import SellerSlice from "./Seller/SellerSlice";
import sellerOrderSlice from "./Seller/sellerOrderSlice";
import cartSlice from './Customer/cartSlice';
import orderSlice from './Customer/orderSlice';
import wishlistSlice from './Customer/wishlistSlice';
import transactionSlice from './Seller/transactionSlice';
import adminSlice from './Admin/adminSlice';
import dealSlice from './Admin/dealSlice';
import customerSlice from './Customer/customerSlice';
import addressSlice from './Customer/AddressSlice';

const rootReducer = combineReducers({
  seller: SellerSlice,
  auth: reducer,
  sellerProduct: sellerProductSlice,
  product: productSlice,
  cart: cartSlice,
  order: orderSlice,
  wishlist: wishlistSlice,
  sellerOrder: sellerOrderSlice,
  transactions: transactionSlice,
  admin: adminSlice,
  customer: customerSlice,
  deal: dealSlice,
  address: addressSlice,
});

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
