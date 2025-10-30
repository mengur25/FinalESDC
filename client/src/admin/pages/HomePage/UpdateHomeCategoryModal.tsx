import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress, IconButton } from '@mui/material';
import { AddPhotoAlternate, Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import { HomeCategory } from '../../../types/HomeCatgoryTypes'; // Đảm bảo đường dẫn đúng
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { updateHomeCategory } from '../../../State/Admin/adminSlice';
import { uploadToCloudinary } from '../../../Utils/uploadToCloudinary';
// Giả định đường dẫn và hàm upload

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxHeight: "90vh",
    overflowY: "auto",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface UpdateModalProps {
    open: boolean;
    onClose: () => void;
    categoryToEdit: HomeCategory | null;
    onSuccess: () => void;
}

const UpdateHomeCategoryModal: React.FC<UpdateModalProps> = ({ open, onClose, categoryToEdit, onSuccess }) => {
    const dispatch = useAppDispatch();
    const { loading, error, categoryUpdated } = useAppSelector((state: any) => state.homeCategory);
    
    const [uploading, setUploading] = useState(false); // State cho trạng thái upload

    const formik = useFormik({
        initialValues: {
            categoryId: categoryToEdit?.categoryId || '',
            image: categoryToEdit?.image || '', // Dùng URL ảnh hiện tại
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            if (!categoryToEdit?.id) return;
            
            // Dữ liệu gửi lên backend chỉ bao gồm image và categoryId
            const updateData: Partial<HomeCategory> = {
                image: values.image,
                categoryId: values.categoryId,
            };

            dispatch(updateHomeCategory({ 
                id: categoryToEdit.id, 
                data: updateData
            }));
        },
    });

    useEffect(() => {
        if (categoryUpdated && !loading) {
            alert("Category updated successfully!");
            onSuccess();
        }
    }, [categoryUpdated, loading, onSuccess]);

    // --- LOGIC XỬ LÝ UPLOAD ẢNH TỪ FILE ---
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        setUploading(true);
        try {
            // Giả định uploadToCloudinary trả về URL ảnh
            const imageUrl = await uploadToCloudinary(file);
            formik.setFieldValue("image", imageUrl); // Chỉ có 1 ảnh cho HomeCategory
        } catch (err) {
            alert("Failed to upload image.");
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
                
                {/* 1. Category ID */}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Category ID (Backend Category Name)"
                    name="categoryId"
                    value={formik.values.categoryId}
                    onChange={formik.handleChange}
                />

                {/* 2. IMAGE UPLOAD & PREVIEW */}
                <Typography sx={{ mt: 2, mb: 1 }}>Category Image</Typography>
                
                {formik.values.image ? (
                    // Preview và nút xóa
                    <Box position="relative" mb={2} display="inline-block">
                        <img 
                            src={formik.values.image} 
                            alt="Category Preview" 
                            style={{ width: 150, height: 100, objectFit: 'cover', borderRadius: 4 }} 
                        />
                        <IconButton
                            size="small"
                            color="error"
                            onClick={handleRemoveImage}
                            sx={{ position: 'absolute', top: -8, right: -8, background: 'white' }}
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
                
                {error && <Typography color="error" sx={{ mt: 2 }}>Error: {error}</Typography>}
                
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading || uploading || !formik.values.image} // Vô hiệu hóa nếu đang upload hoặc thiếu ảnh
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
                </Button>
            </Box>
        </Modal>
    );
};

export default UpdateHomeCategoryModal;