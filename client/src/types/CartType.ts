
import { Coupon } from "./couponTypes";
import { Product } from "./ProductTypes";
import { User } from "./UserType";

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
    
    totalSellingPrice: number; // Tổng giá bán (chưa coupon)
    totlaMrpPrice: number;     // Tổng giá MRP
    totalItem: number;
    discount: number;         
    
    totalPrice: number; 

    coupon: Coupon | null; 
}