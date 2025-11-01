import React, { useState, useEffect } from 'react';
import HomeCategoryTable from './HomeCategoryTable';
import { useFormik } from 'formik';
import { HomeCategory } from '../../../types/HomeCatgoryTypes';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import UpdateHomeCategoryModal from './UpdateHomeCategoryModal';
import { fetchHomeCategory } from '../../../State/Admin/adminSlice';
import { TablePagination, Box } from '@mui/material'; // **[THÊM IMPORTS]**

const DealCategoryTable = () => {
    const dispatch = useAppDispatch();
    const { customer } = useAppSelector((store: any) => store);
    const { categoryUpdated } = useAppSelector((store: any) => store.homeCategory);

    const [openModal, setOpenModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<HomeCategory | null>(null);

    // **[STATE PAGINATION]**
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    const tableData: HomeCategory[] = customer.homePageData?.dealCategories as HomeCategory[] || [];

    const formik = useFormik({
        initialValues: {
            discount: 0,
            category: "",
        },
        onSubmit: (values) => {
            console.log("submit deal form", values);
        }
    });

    const handleEditClick = (category: HomeCategory) => {
        setSelectedCategory(category);
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
        setSelectedCategory(null);
    };

    const handleUpdateSuccess = () => {
        dispatch(fetchHomeCategory());
    };

    useEffect(() => {
        if (categoryUpdated) {
            handleUpdateSuccess();
        }
    }, [categoryUpdated, dispatch]);
    
    // **[HANDLERS PAGINATION]**
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    // **[LOGIC CẮT LÁT DỮ LIỆU]**
    const categoriesToDisplay = React.useMemo(() => {
        // Cắt lát dữ liệu dựa trên trang và số hàng hiện tại
        return tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [tableData, page, rowsPerPage]);


    return (
        <Box>
            <h2>Deal Categories Management</h2>
            {/* Nếu bạn có form tạo deal, nó có thể ở đây */}

            <HomeCategoryTable 
                // **[TRUYỀN PROPS PAGINATION]**
                rowsPerPage={rowsPerPage}
                page={page}
                data={categoriesToDisplay} // Truyền dữ liệu đã cắt lát
                onEdit={handleEditClick} 
            />

            <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                component="div"
                count={tableData.length} // Tổng số hàng
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {selectedCategory && (
                <UpdateHomeCategoryModal
                    open={openModal}
                    onClose={handleModalClose}
                    categoryToEdit={selectedCategory}
                    onSuccess={handleModalClose}
                />
            )}
        </Box>
    );
};

export default DealCategoryTable;