import React, { useState, useEffect } from 'react';
import HomeCategoryTable from './HomeCategoryTable';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { HomeCategory } from '../../../types/HomeCatgoryTypes';
import UpdateHomeCategoryModal from './UpdateHomeCategoryModal';
import { fetchHomeCategory } from '../../../State/Admin/adminSlice';

const ElectronicTable = () => {
    const dispatch = useAppDispatch();
    const { customer } = useAppSelector((store: any) => store);
    const { categoryUpdated } = useAppSelector((store: any) => store.homeCategory);

    const [openModal, setOpenModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<HomeCategory | null>(null);

    const tableData: HomeCategory[] = customer.homePageData?.electricCategories as HomeCategory[] || [];

    const handleEditClick = (category: HomeCategory) => {
        setSelectedCategory(category);
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
        setSelectedCategory(null);
    };

    const handleUpdateSuccess = () => {
        // Tải lại dữ liệu sau khi cập nhật thành công
        dispatch(fetchHomeCategory());
    };

    useEffect(() => {
        if (categoryUpdated) {
            handleUpdateSuccess();
        }
    }, [categoryUpdated]);

    return (
        <div>
            <h2>Electronic Categories Management</h2>
            <HomeCategoryTable 
                data={tableData} 
                onEdit={handleEditClick} 
            />

            {selectedCategory && (
                <UpdateHomeCategoryModal
                    open={openModal}
                    onClose={handleModalClose}
                    categoryToEdit={selectedCategory}
                    onSuccess={handleModalClose}
                />
            )}
        </div>
    );
};

export default ElectronicTable;