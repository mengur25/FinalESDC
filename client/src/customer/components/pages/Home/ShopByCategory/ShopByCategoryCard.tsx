import React from 'react'
import kitchen from '../../../../../assets/kitchen.png'
import {HomeCategory} from '../../../../../types/HomeCatgoryTypes'

const ShopByCategoryCard = ({item}:{item:HomeCategory}) => {
  return (
    <div className='flex gap-3 flex-col items-center justify-center w-[150px] h-[150px] group cursor-pointer mt-10'>
        <div className='w-[150px] h-[150px] lg:w-[250px] lg:h-[250px]'>
            <img className='group-hover:scale-105 transition-transform object-cover object-top w-full h-full' src={item.image} alt="" />
            <h1 className='text-center'>{item?.categoryId}</h1>
        </div>
        
    </div>
  )
}

export default ShopByCategoryCard