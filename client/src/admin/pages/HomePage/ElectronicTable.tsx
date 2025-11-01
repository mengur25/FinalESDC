import React, { useState, useEffect } from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { HomeCategory } from "../../../types/HomeCatgoryTypes";
import UpdateHomeCategoryModal from "./UpdateHomeCategoryModal";
import { fetchHomeCategory } from "../../../State/Admin/adminSlice";
import { TablePagination, Box } from "@mui/material"; // Thêm Box và TablePagination

const ElectronicTable = () => {
  const dispatch = useAppDispatch();
  const { customer } = useAppSelector((store: any) => store);
  const { categoryUpdated } = useAppSelector(
    (store: any) => store.homeCategory
  );

  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<HomeCategory | null>(
    null
  );

  // **[BỔ SUNG STATE PAGINATION]**
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const tableData: HomeCategory[] =
    (customer.homePageData?.electricCategories as HomeCategory[]) || [];

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

  // **[BỔ SUNG HANDLERS PAGINATION]**
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // **[LOGIC CẮT LÁT DỮ LIỆU]**
  const categoriesToDisplay = React.useMemo(() => {
    return tableData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [tableData, page, rowsPerPage]);

  return (
    <Box>
      <div className="mt-20 space-y-3 mb-5">
        <div className="text-lg">
          <h2>Electronic Categories Management</h2>
        </div>
      </div>

      <HomeCategoryTable
        rowsPerPage={rowsPerPage}
        page={page}
        data={categoriesToDisplay} // **[SỬA]** Truyền dữ liệu đã cắt lát
        onEdit={handleEditClick}
      />

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        component="div"
        count={tableData.length}
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

export default ElectronicTable;
