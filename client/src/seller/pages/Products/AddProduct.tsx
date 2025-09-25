import { AddPhotoAlternate, Close } from "@mui/icons-material";
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { uploadToCloudinary } from "../../../Utils/uploadToCloudinary";
import { colors } from "../../../customer/components/data/filter/color";
import { menLevelTwo } from "../../../customer/components/data/category/level two/menLevelTwo";
import { womenLevelTwo } from "../../../customer/components/data/category/level two/womenLevelTwo";
import { furnitureLevelTwo } from "../../../customer/components/data/category/level two/furnitureLevelTwo";
import { electronicsLevelTwo } from "../../../customer/components/data/category/level two/electronicsLevelTwo";
import { menLevelThree } from "../../../customer/components/data/category/level three/menLevelThree";
import { womenLevelThree } from "../../../customer/components/data/category/level three/womenLevelThree";
import { furnitureLevelThree } from "../../../customer/components/data/category/level three/furnitureLevelThree";
import { electronicsLevelThree } from "../../../customer/components/data/category/level three/electronicsLevelThree";
import { mainCategory } from "../../../customer/components/data/category/mainCategory";
import store, { useAppDispatch, useAppSelector } from "../../../State/Store";
import { createProduct } from "../../../State/Seller/sellerProductSlice";

const categoryTwo: { [key: string]: any[] } = {
  men: menLevelTwo,
  women: womenLevelTwo,
  kids: [],
  home_furniture: furnitureLevelTwo,
  beauty: [],
  electronics: electronicsLevelTwo,
};

const categoryThree: { [key: string]: any[] } = {
  men: menLevelThree,
  women: womenLevelThree,
  kids: [],
  home_furniture: furnitureLevelThree,
  beauty: [],
  electronics: electronicsLevelThree,
};

const AddProduct = () => {
  const [uploadImage, setUploadingImage] = useState(false);
  const dispatch = useAppDispatch()
  const [snackbarOpen, setOpenSnackbar] = useState(false);
  // const {seller, sellerProduct} = useAppSelector(store => store);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      quantity: "",
      color: "",
      images: [],
      category: "",
      category2: "",
      category3: "",
      size: "",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(createProduct({request: values, jwt:localStorage.getItem("jwt")}))
    },
  });

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    setUploadingImage(true);
    const image = await uploadToCloudinary(file);

    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadingImage(false);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  const childCategory = (category: any, parentCategoryId: any) => {
    return category.filter((child: any) => {
      return child.parentCategoryId === parentCategoryId;
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
        <Grid2 container spacing={2}>
          <Grid2 className="flex flex-wrap gap-5" size={{ xs: 12 }} />
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor="fileInput" className="relative">
            <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-sm border-gray-400">
              <AddPhotoAlternate className="text-gray-700" />
            </span>
            {uploadImage && (
              <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                <CircularProgress />
              </div>
            )}
          </label>

          <div className="flex flex-wrap gap-2">
            {formik.values.images.map((image, index) => (
              <div className="relative" key={index}>
                <img
                  className="w-24 h-24 object-cover"
                  src={image}
                  alt={`ProductImage ${index + 1}`}
                />
                <IconButton
                  onClick={() => handleRemoveImage(index)}
                  className=""
                  size="small"
                  color="error"
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    outline: "none",
                  }}
                >
                  <Close sx={{fontSize: "1rem"}}/>
                  </IconButton>
              </div>
            ))}
          </div>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            required
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            multiline
            rows={4}
            fullWidth
            id="description"
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            required
          />
        </Grid2>

        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
            <TextField
              fullWidth
              id="mrp_price"
              name="mrpPrice"
              label="MRP Price"
              type="number"
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
              error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
              helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
            <TextField
              fullWidth
              id="sellingPrice"
              name="sellingPrice"
              label="Selling Price"
              type="number"
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              error={
                formik.touched.sellingPrice &&
                Boolean(formik.errors.sellingPrice)
              }
              helperText={
                formik.touched.sellingPrice && formik.errors.sellingPrice
              }
              required
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
            <FormControl
              fullWidth
              error={formik.touched.color && Boolean(formik.errors.color)}
              required
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
                <MenuItem>
                  <em>None</em>
                </MenuItem>
                {colors.map((color) => (
                  <MenuItem key={color.name} value={color.name}>
                    <div className="flex gap-3">
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
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
            <FormControl
              fullWidth
              error={formik.touched.color && Boolean(formik.errors.color)}
              required
            >
              <InputLabel id="color-label">Size</InputLabel>
              <Select
                labelId="size-label"
                id="size"
                name="size"
                value={formik.values.size}
                onChange={formik.handleChange}
                label="Size"
              >
                <MenuItem>
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
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
            <FormControl
              fullWidth
              error={formik.touched.category && Boolean(formik.errors.category)}
              required
            >
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                label="Category"
              >
                <MenuItem>
                  <em>None</em>
                </MenuItem>
                {mainCategory.map((item) =>(
                  <MenuItem value={item.categoryId}>{item.name}</MenuItem>
                ))}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <FormHelperText>{formik.errors.category}</FormHelperText>
              )}
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
            <FormControl
              fullWidth
              error={formik.touched.category && Boolean(formik.errors.category)}
              required
            >
              <InputLabel id="category-label">Second Category</InputLabel>
              <Select
                labelId="category2-label"
                id="category2"
                name="category2"
                value={formik.values.category2}
                onChange={formik.handleChange}
                label="Second Category"
              >
                <MenuItem>
                  <em>None</em>
                </MenuItem>
                {formik.values.category &&
                  categoryTwo[formik.values.category]?.map((item) => (
                    <MenuItem value={item.categoryId}>{item.name}</MenuItem>
                  ))}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <FormHelperText>{formik.errors.category}</FormHelperText>
              )}
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
            <FormControl
              fullWidth
              error={formik.touched.category && Boolean(formik.errors.category)}
              required
            >
              <InputLabel id="category3-label">Third Category</InputLabel>
              <Select
                labelId="category3-label"
                id="category3"
                name="category3"
                value={formik.values.category3}
                onChange={formik.handleChange}
                label="Third Category"
              >
                <MenuItem>
                  <em>None</em>
                </MenuItem>
                {formik.values.category2 &&
                  childCategory(
                    categoryThree[formik.values.category],
                    formik.values.category2
                  )?.map((item: any) => (
                    <MenuItem value={item.categoryId}>{item.name}</MenuItem>
                  ))}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <FormHelperText>{formik.errors.category}</FormHelperText>
              )}
            </FormControl>
          </Grid2>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Button
            sx={{ p: "14px" }}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            {false ? (
              <CircularProgress
                size="small"
                sx={{ width: "27px", height: "27px" }}
              />
            ) : (
              "Add Product"
            )}
          </Button>
        </Grid2>
      </form>

      {/* <Snackbar
      anchorOrigin={{vertical: "top", horizontal: "right"}}
      open={snackbarOpen} autoHideDuration={6000}
      onClose={handleCloseSnackbar}
      >
        <Alert
        onClose={handleCloseSnackbar}
        severity={true ? "error": "success"}
        variant="filled"
        sx={{width: "100%"}}
        >
          {sellerProduct.error ? sellerProduct.error : "Product create!"}
        </Alert>
      </Snackbar> */}
    </div>
  );
};

export default AddProduct;
