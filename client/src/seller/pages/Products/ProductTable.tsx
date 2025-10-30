import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  Box,
  Typography,
  TextField,
  CircularProgress,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Edit, Close, AddPhotoAlternate } from "@mui/icons-material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  fetchSellerProducts,
  updateProductDetails,
} from "../../../State/Seller/sellerProductSlice";
import { uploadToCloudinary } from "../../../Utils/uploadToCloudinary";
import { Product, Category } from "../../../types/ProductTypes";
import { colors } from "../../../customer/components/data/filter/color";

// --- STYLE GIỮ NGUYÊN ---
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "1px solid #ddd",
  boxShadow: 24,
  p: 4,
};


// ----------------- MODAL CẬP NHẬT CHI TIẾT (ĐÃ SỬA) -----------------
interface DetailsModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductDetailsModal: React.FC<DetailsModalProps> = ({
  open,
  onClose,
  product,
}) => {
  const dispatch = useAppDispatch();
  const [uploading, setUploading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: product?.title || "",
      sellingPrice: product?.sellingPrice || 0,
      mrpPrice: product?.mrpPrice || 0,
      color: product?.color || "",
      images: product?.images || [],
      quantity: product?.quantity || 0,
      
      // CHỈ GIỮ LẠI SIZE
      size: product?.sizes?.split(' ')[0] || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!product?.id) return;
      
      // KHÔNG CẦN TÌM CATEGORY OBJECT VÌ KHÔNG CHỈNH SỬA
      
      const productData: Partial<Product> = {
        title: values.title,
        sellingPrice: values.sellingPrice,
        mrpPrice: values.mrpPrice,
        color: values.color,
        images: values.images,
        quantity: values.quantity,
        
        // CẬP NHẬT SIZE
        sizes: values.size, 
        
      };
      
      const jwt = localStorage.getItem("jwt") || "";
      await dispatch(
        updateProductDetails({ productId: product.id, productData })
      );
      
      dispatch(fetchSellerProducts(jwt));

      alert(`✅ Product "${productData.title || product.title}" updated successfully!`);
      onClose();
    },
  });

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const imageUrl = await uploadToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, imageUrl]);
    setUploading(false);
  };

  const handleRemoveImage = (index: number) => {
    const updated = [...formik.values.images];
    updated.splice(index, 1);
    formik.setFieldValue("images", updated);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle} component="form" onSubmit={formik.handleSubmit}>
        <Typography variant="h5" gutterBottom>
          Edit Product
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 2 }}>
          ID: {product?.id}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="MRP Price"
              name="mrpPrice"
              type="number"
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Selling Price"
              name="sellingPrice"
              type="number"
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
            />
          </Grid>

          {/* Input Quantity (In Stock) */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Quantity (In Stock)"
              name="quantity"
              type="number"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              InputProps={{ inputProps: { min: 0 } }} 
            />
          </Grid>
          
          {/* Dropdown Size */}
          <Grid item xs={6}>
            <FormControl
              fullWidth
              error={formik.touched.size && Boolean(formik.errors.size)}
            >
              <InputLabel id="size-label">Size</InputLabel>
              <Select
                labelId="size-label"
                id="size"
                name="size"
                value={formik.values.size}
                onChange={formik.handleChange}
                label="Size"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Free">FREE</MenuItem>
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
              </Select>
              {formik.touched.size && formik.errors.size && (
                <FormHelperText>{formik.errors.size}</FormHelperText>
              )}
            </FormControl>
          </Grid>


          {/* Dropdown chọn màu */}
          <Grid item xs={12}>
            <FormControl
              fullWidth
              error={formik.touched.color && Boolean(formik.errors.color)}
            >
              <InputLabel id="color-label">Color</InputLabel>
              <Select
                labelId="color-label"
                id="color"
                name="color"
                value={formik.values.color}
                onChange={formik.handleChange}
                label="Color"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {colors.map((color) => (
                  <MenuItem key={color.name} value={color.name}>
                    <div className="flex gap-3 items-center">
                      <span
                        style={{ backgroundColor: color.hex }}
                        className={`h-5 w-5 rounded-full ${
                          color.name === "White" ? "border" : ""
                        }`}
                      ></span>
                      <p>{color.name}</p>
                    </div>
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.color && formik.errors.color && (
                <FormHelperText>{formik.errors.color}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Ảnh sản phẩm */}
          <Grid item xs={12}>
            <Typography sx={{ mb: 1 }}>Product Images</Typography>

            <input
              type="file"
              accept="image/*"
              id="imageUpload"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <label htmlFor="imageUpload">
              <Button
                component="span"
                variant="outlined"
                startIcon={<AddPhotoAlternate />}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload Image"}
              </Button>
            </label>

            <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
              {formik.values.images.map((url, index) => (
                <Box key={index} position="relative">
                  <img
                    src={url}
                    alt={`Image ${index + 1}`}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 6,
                      objectFit: "cover",
                      border: "1px solid #ccc",
                    }}
                  />
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      background: "white",
                      "&:hover": { background: "#fff" },
                    }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={uploading}
            fullWidth
          >
            {uploading ? <CircularProgress size={24} /> : "Save Changes"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// ----------------- BẢNG SẢN PHẨM (Component chính) -----------------
export function ProductTable() {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector(
    (state: any) => state.sellerProduct
  );
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchSellerProducts(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Images</StyledTableCell>
              <StyledTableCell align="right">Title</StyledTableCell>
              <StyledTableCell align="right">MRP</StyledTableCell>
              <StyledTableCell align="right">Selling Price</StyledTableCell>
              <StyledTableCell align="right">Color</StyledTableCell>
              <StyledTableCell align="right">In stock</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              products.map((item: Product) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell>
                    <div className="flex gap-1 flex-wrap">
                      {item.images.map((image, index) => (
                        <img
                          key={index}
                          className="w-20 rounded-md"
                          src={image}
                          alt={item.title}
                        />
                      ))}
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="right">{item.title}</StyledTableCell>
                  <StyledTableCell align="right">{item.mrpPrice}</StyledTableCell>
                  <StyledTableCell align="right">
                    {item.sellingPrice}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <div className="flex items-center justify-end gap-2">
                      <span
                        style={{
                          backgroundColor:
                            colors.find((c) => c.name === item.color)?.hex ||
                            "transparent",
                        }}
                        className={`h-5 w-5 rounded-full border`}
                      ></span>
                      <span>{item.color}</span>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="right">{item.quantity}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton size="small" onClick={() => handleEditClick(item)}>
                      <Edit />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedProduct && (
        <ProductDetailsModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          product={selectedProduct}
        />
      )}
    </>
  );
}

export default ProductTable;