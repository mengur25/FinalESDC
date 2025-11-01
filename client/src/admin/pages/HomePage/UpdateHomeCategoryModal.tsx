import React, { useState, useEffect, useMemo } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AddPhotoAlternate, Close } from "@mui/icons-material";
import { useFormik } from "formik";
import { HomeCategory } from "../../../types/HomeCatgoryTypes";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { updateHomeCategory } from "../../../State/Admin/adminSlice";
import { uploadToCloudinary } from "../../../Utils/uploadToCloudinary";
import toast from "react-hot-toast";

// **[BỔ SUNG]** Import dữ liệu cấu trúc danh mục chính (Giả định)
// Import các file cần thiết để xây dựng ALL_VALID_CATEGORY_IDS
// import { menLevelTwo } from '../../../data/level two/menLevelTwo'; 
// import { womenLevelTwo } from '../../../data/level two/womenLevelTwo'; 
// import { electronicsLevelTwo } from '../../../data/level two/electronicsLevelTwo'; 
// import { furnitureLevelTwo } from '../../../data/level two/furnitureLevelTwo'; 
// ... và các file Level Three

// --- LOGIC GOM DỮ LIỆU DANH MỤC SẢN PHẨM HỢP LỆ ---
const getValidProductCategoryIds = () => {
    // Đây là hàm mẫu để lấy các ID cấp 2 và cấp 3 hợp lệ
    // Bạn cần triển khai logic này bằng cách duyệt qua mainCategory
    const sampleIds = [
        // IDs cấp 2/3 (Dùng cho sản phẩm)
        { id: "men_t_shirts", name: "Men T-Shirts" },
        { id: "women_topwear", name: "Women Topwear (L2)" },
        { id: "electronics_laptops_gaming", name: "Gaming Laptops" },
        { id: "furniture_decor", name: "Furniture Decor (L2)" },
    ];
    return sampleIds;
};
const VALID_PRODUCT_CATEGORY_IDS = getValidProductCategoryIds();

// --- KIỂM TRA PHÂN LOẠI ID ---
const isProductCategoryId = (id: string) => {
    // Kiểm tra xem ID có phải là ID sản phẩm hợp lệ không
    return VALID_PRODUCT_CATEGORY_IDS.some(cat => cat.id === id);
};
// --------------------------------------------------------------------


const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface UpdateModalProps {
  open: boolean;
  onClose: () => void;
  categoryToEdit: HomeCategory | null;
  onSuccess: () => void;
}

const UpdateHomeCategoryModal: React.FC<UpdateModalProps> = ({
  open,
  onClose,
  categoryToEdit,
  onSuccess,
}) => {
  const dispatch = useAppDispatch();
  const { loading, error, categoryUpdated } = useAppSelector(
    (state: any) => state.homeCategory
  );

  const [uploading, setUploading] = useState(false);
  
  // Xác định ban đầu ID này thuộc loại nào: SELECT hay TEXTFIELD
  const initialCategoryId = categoryToEdit?.categoryId || "";
  const isInitialProductCategory = isProductCategoryId(initialCategoryId);

  const formik = useFormik({
    initialValues: {
      // Nếu là ID sản phẩm hợp lệ, lưu vào 'selectedId'. Ngược lại, lưu vào 'customId'.
      selectedId: isInitialProductCategory ? initialCategoryId : "",
      customId: !isInitialProductCategory ? initialCategoryId : "",
      image: categoryToEdit?.image || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (!categoryToEdit?.id) return;

      // Chọn ID gửi đi: ưu tiên ID từ Select, nếu Select rỗng, lấy từ TextField
      const finalCategoryId = values.selectedId || values.customId;

      if (!finalCategoryId) {
        toast.error("Category ID cannot be empty.");
        return;
      }

      const updateData: Partial<HomeCategory> = {
        image: values.image,
        categoryId: finalCategoryId,
      };

      dispatch(
        updateHomeCategory({
          id: categoryToEdit.id,
          data: updateData,
        })
      );
    },
  });

  useEffect(() => {
    if (categoryUpdated && !loading) {
      toast.success("Category updated successfully!");
      onClose();
    }
  }, [categoryUpdated, loading, onClose, onSuccess]);

  // --- LOGIC XỬ LÝ UPLOAD ẢNH (Giữ nguyên) ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(file);
      formik.setFieldValue("image", imageUrl); 
    } catch (err) {
      toast.error("Failed to upload image.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    formik.setFieldValue("image", "");
  };
  // ------------------------------------------

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} component="form" onSubmit={formik.handleSubmit}>
        <Typography variant="h6" component="h2" gutterBottom>
          Edit Home Category: ID {categoryToEdit?.id}
        </Typography>
        
        <Typography variant="caption" color="textSecondary" sx={{mt:0.5}}>
            Current ID: **{categoryToEdit?.categoryId}**
        </Typography>

        {/* **1. TRƯỜNG SELECT (CHO CÁC ID SẢN PHẨM HỢP LỆ)** */}
        <FormControl fullWidth margin="normal">
            <InputLabel id="selectedId-label">Select Product Category (L2/L3)</InputLabel>
            <Select
                labelId="selectedId-label"
                name="selectedId"
                value={formik.values.selectedId}
                onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldValue("customId", ""); // Xóa TextField khi chọn Select
                }}
                label="Select Product Category"
            >
                <MenuItem value="">
                    <em>Select from list...</em>
                </MenuItem>
                {VALID_PRODUCT_CATEGORY_IDS.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                        {cat.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

        <Typography variant="body2" align="center" sx={{my: 1}}>
            — OR —
        </Typography>

        {/* **2. TRƯỜNG TEXTFIELD (CHO CÁC ID KHÔNG CHUẨN/GRID/DEALS)** */}
        <TextField
            margin="normal"
            fullWidth
            label="Input Custom/Grid/Deal Category ID"
            name="customId"
            // Vô hiệu hóa TextField nếu đã chọn từ Select
            disabled={!!formik.values.selectedId} 
            value={formik.values.customId}
            onChange={(e) => {
                 formik.handleChange(e);
                 formik.setFieldValue("selectedId", ""); // Xóa Select khi nhập TextField
            }}
            placeholder="e.g., laptops_grid, daily_deals"
        />


        {/* 3. IMAGE UPLOAD & PREVIEW (Giữ nguyên) */}
        <Typography sx={{ mt: 2, mb: 1 }}>Category Image</Typography>

        {formik.values.image ? (
          // Preview và nút xóa
          <Box position="relative" mb={2} display="inline-block">
            <img
              src={formik.values.image}
              alt="Category Preview"
              style={{
                width: 150,
                height: 100,
                objectFit: "cover",
                borderRadius: 4,
              }}
            />
            <IconButton
              size="small"
              color="error"
              onClick={handleRemoveImage}
              sx={{
                position: "absolute",
                top: -8,
                right: -8,
                background: "white",
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>
        ) : (
          // Nút chọn ảnh từ máy
          <>
            <input
              type="file"
              accept="image/*"
              id="categoryImageUpload"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <label htmlFor="categoryImageUpload">
              <Button
                component="span"
                variant="outlined"
                startIcon={<AddPhotoAlternate />}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Select Image"}
              </Button>
            </label>
          </>
        )}

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            Error: {error}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading || uploading || !(formik.values.selectedId || formik.values.customId) || !formik.values.image} 
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Save Changes"
          )}
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateHomeCategoryModal;