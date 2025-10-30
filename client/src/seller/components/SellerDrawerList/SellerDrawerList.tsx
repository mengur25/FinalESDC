import { AccountBalanceWallet, AccountBox, Add, Dashboard, InventorySharp, Logout, ReceiptSharp, ShoppingBag } from '@mui/icons-material'
import React from 'react'
import DrawerList from '../../../components/DrawerList'

const menu = [
    {
        name: "Dashboard",
        path: "/seller",
        icon: <Dashboard className='text-primary'/>,
        activeIcon: <Dashboard className='text-white'/>,
    },
    {
        name: "Orders",
        path: "/seller/orders",
        icon: <ShoppingBag className='text-primary'/>,
        activeIcon: <ShoppingBag className='text-white'/>,
    },
    {
        name: "Products",
        path: "/seller/products",
        icon: <InventorySharp className='text-primary'/>,
        activeIcon: <InventorySharp className='text-white'/>,
    },
    {
        name: "Add Product",
        path: "/seller/add-product",
        icon: <Add className='text-primary'/>,
        activeIcon: <Add className='text-white'/>,
    },
    {
        name: "Payment",
        path: "/seller/payment",
        icon: <AccountBalanceWallet className='text-primary'/>,
        activeIcon: <AccountBalanceWallet className='text-white'/>,
    },

]

const menu2 = [
    {
        name: "Account",
        path: "/seller/account",
        icon: <AccountBox className='text-primary'/>,
        activeIcon: <AccountBox className='text-white'/>,
    },
    {
        name: "Logout",
        path: "/",
        icon: <Logout className='text-primary'/>,
        activeIcon: <Logout className='text-white'/>,
    },
    
]

const SellerDrawerList = ({toggleDrawer}:{toggleDrawer:any}) => {
  return (
    <>
        <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer}/>
    </>
  )
}

export default SellerDrawerList