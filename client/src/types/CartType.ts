import { Product } from "./ProductTypes";
import { User } from "./UserType";
import CartItem from "../customer/components/pages/Cart/CartItemCard";
export interface CartItem {
  id: number;
  cart?: Cart;
  product: Product;
  size: string;
  quantity: number;
  mrpPrice: number;
  sellingPrice: number;
  userId: number;
}

export interface Cart {
  id: number;
  user: User;
  cartItems: CartItem[];
  totalSellingPrice: number;
  totalItem: number;
  totlaMrpPrice: number;
  discount: number;
  couponCode: string | null;
}
