import { CartItem } from "../types/CartType";

export const sumCartItemMrpPrice = (cartItems: CartItem[]) =>{
return cartItems.reduce((acc, item) => acc + item.mrpPrice*item.quantity,0)
}