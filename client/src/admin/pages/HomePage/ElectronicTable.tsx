import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import store, { useAppSelector } from '../../../State/Store';
import { HomeCategory } from '../../../types/HomeCatgoryTypes';

const ElectronicTable = () => {
          const {customer} = useAppSelector(store=> store);
  
  return (
    <div>
              <HomeCategoryTable data={customer.homePageData?.electricCategories  as HomeCategory[]} />
      
    </div>
  )
}

export default ElectronicTable