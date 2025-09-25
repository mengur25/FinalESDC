import { CartItem } from "../types/CartType";

export const sumCartItemSellingPrice = (cartItems: CartItem[]) =>{
return cartItems.reduce((acc, item) => acc + item.sellingPrice*item.quantity,0)
}