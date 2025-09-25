import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import store, { useAppSelector } from '../../../State/Store'
import { HomeCategory } from '../../../types/HomeCatgoryTypes';

const ShopByCategoryTable = () => {
  const {customer} = useAppSelector(store => store);

  return (
    <div>
<HomeCategoryTable data={customer.homePageData?.shopByCategories  as HomeCategory[]} />

      </div>
  )
}

export default ShopByCategoryTable