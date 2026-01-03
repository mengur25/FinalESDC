import React from 'react'
import ElectricCategoryCard from './ElectricCategoryCard'
import store, { useAppSelector } from '../../../../../State/Store'

const ElectricCategory = () => {
  const {customer} = useAppSelector(store => store);

  return (
    <div className='flex flex-wrap justify-between py-5 lg:px-20 border-b'>
      {customer.homePageData?.electricCategories.slice(0,7).map((item) => <ElectricCategoryCard key={item.id} item={item}/>)}
    </div>
  )
}

export default ElectricCategory