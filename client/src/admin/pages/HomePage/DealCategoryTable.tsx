import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useFormik } from 'formik'
import { HomeCategory } from '../../../types/HomeCatgoryTypes'
import store, { useAppSelector } from '../../../State/Store'

const DealCategoryTable = () => {
        const {customer} = useAppSelector(store => store);
    
    const formik = useFormik({
        initialValues:{
            discount: 0,
            category: "",
        },
        onSubmit:(values)=>{
            console.log("submit", values)
        }
    })
  return (
    <div>
        <HomeCategoryTable data={customer.homePageData?.dealCategories  as HomeCategory[]} />
    </div>
  )
}

export default DealCategoryTable