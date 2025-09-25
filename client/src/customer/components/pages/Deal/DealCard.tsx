import React from 'react'
import smartwatch from '../../../../assets/smartwatch.png';
import { Deal } from '../../../../types/DealType';
const DealCard = ({item}:{item: Deal}) => {
  return (
    <div className='w-[15rem] cursor-pointer'>
        <img className='border-x-[7px] border-t-[7px] border-primary w-[240px] h-[15rem] object-cover object-top' src={item.category.image} alt="" />
        <div className='border-4 border-black bg-black text-white p-2'>
            <p className='text-lg font-semibold'>{item.category.name}</p>
            <p className='text-2xl font-bold'>{item.discount}</p>
            <p className='text-balance text-lg'>Shop now</p>
        </div>
    </div>
  )
}

export default DealCard