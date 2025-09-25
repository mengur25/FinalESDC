import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../../State/Store';
import { OrderStatus } from '../../../types/orderTypes';
import { paymentSuccess } from '../../../State/Customer/orderSlice';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {orderId} = useParams();
    const location = useLocation();

    const getQueryParam =(key:string) =>{
        const query = new URLSearchParams(location.search);
        return query.get(key);
    }
    useEffect(() =>{
        const paymentId = getQueryParam("razorpay_payment_id");
        const paymentLinkId = getQueryParam("razorpay_payment_link_id");
        dispatch(paymentSuccess({jwt: localStorage.getItem("jwt") || "", 
            paymentId:paymentId || "", 
            paymentLinkId : paymentLinkId || ""
        }))
    },[orderId])
  return (
    <div className='min-h-[90vh] flex justify-center items-center'>
        <div className="bg-primary text-white p-8 w-[90%] lg:w-[25%] border rounded-sm
        h-[40vh] flex flex-col gap-7 items-center justify-center">
            <h1 className='text-3xl font-semibold'>Congratulations!</h1>
            <h1 className='text-2xl font-semibold'>Order Successfull!</h1>
            <div>
                <Button color='secondary' variant='contained' onClick={(()=>navigate("/account/orders"))}>Go to orders</Button>
            </div>
        </div>
    </div>
  )
}

export default PaymentSuccess