import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SellersTable from '../admin/pages/Sellers/SellersTable'
import AdminDashboard from '../admin/pages/Dashboard/AdminDashboard'
import AddNewCoupon from '../admin/pages/Coupon/AddNewCoupon'
import GridTable from '../admin/pages/HomePage/GridTable'
import ElectronicTable from '../admin/pages/HomePage/ElectronicTable'
import ShopByCategoryTable from '../admin/pages/HomePage/ShopByCategoryTable'
import Deal from '../admin/pages/HomePage/Deal'
import Coupon from '../admin/pages/Coupon/Coupon'

const AdminRoute = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<SellersTable/>}/>
            <Route path='/coupon' element={<Coupon/>}/>
            <Route path='/add-coupon' element={<AddNewCoupon/>}/>
            <Route path='/home-grid' element={<GridTable/>}/>
            <Route path='/electronics-category' element={<ElectronicTable/>}/>
            <Route path='/shop-by-category' element={<ShopByCategoryTable/>}/>
            <Route path='/deals' element={<Deal/>}/>
        </Routes>
    </div>
  )
}

export default AdminRoute