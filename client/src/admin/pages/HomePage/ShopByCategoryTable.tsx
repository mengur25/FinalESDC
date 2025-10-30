import React, { useState, useEffect } from 'react';
import HomeCategoryTable from './HomeCategoryTable';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { HomeCategory } from '../../../types/HomeCatgoryTypes';
import UpdateHomeCategoryModal from './UpdateHomeCategoryModal'; // Giả định đường dẫn đến modal
import { fetchHomeCategory } from '../../../State/Admin/adminSlice';

const ShopByCategoryTable = () => {
    const dispatch = useAppDispatch();
    // Lấy dữ liệu từ Redux Store. Giả định `customer.homePageData` là nơi lưu trữ dữ liệu trang chủ.
    const { customer } = useAppSelector((store: any) => store); 
    const { categoryUpdated } = useAppSelector((store: any) => store.homeCategory);

    // State quản lý Modal
    const [openModal, setOpenModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<HomeCategory | null>(null);

    // Dữ liệu hiển thị (Đảm bảo không null)
    const tableData: HomeCategory[] = customer.homePageData?.shopByCategories as HomeCategory[] || [];
    
    // --- Handlers ---
    
    const handleEditClick = (category: HomeCategory) => {
        setSelectedCategory(category);
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
        setSelectedCategory(null);
    };

    // Khi modal đóng thành công, dispatch action để fetch lại dữ liệu trang chủ
    const handleUpdateSuccess = () => {

        dispatch(fetchHomeCategory()); 
    };

    // Theo dõi trạng thái categoryUpdated để có thể phản hồi sau khi update
    useEffect(() => {
        if (categoryUpdated) {
            handleUpdateSuccess();
        }
    }, [categoryUpdated]);


    return (
        <div>
            <h2>Shop By Category Management</h2>
            
            {/* 1. Truyền hàm xử lý sự kiện Edit vào Table */}
            <HomeCategoryTable 
                data={tableData} 
                onEdit={handleEditClick} 
            />

            {/* 2. Hiển thị Modal chỉnh sửa */}
            {selectedCategory && (
                <UpdateHomeCategoryModal
                    open={openModal}
                    onClose={handleModalClose}
                    categoryToEdit={selectedCategory}
                    onSuccess={handleModalClose} // Gọi handleModalClose để đóng modal sau khi thành công
                />
            )}
        </div>
    );
};

export default ShopByCategoryTable;