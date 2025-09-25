import React from 'react'
import laptop from '../../../../../assets/laptop.png';
import { HomeCategory } from '../../../../../types/HomeCatgoryTypes';
const ElectricCategoryCard = ({item}:{item:HomeCategory}) => {
  return (
    <div>
        <img className='object-contain h-10' src={item.image} alt="laptop" />
        <h2 className='font-semibold'>{item.name}</h2>
    </div>
  )
}

export default ElectricCategoryCard