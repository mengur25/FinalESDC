import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../State/Store';
import { HomeCategory } from '../../../types/HomeCatgoryTypes';

const GridTable = () => {
    const {customer} = useAppSelector(store => store);
  
  return (
    <div>
      <HomeCategoryTable data={customer.homePageData?.grid  as HomeCategory[]} />
      
    </div>
  )
}

export default GridTable