import React, { useEffect, useState } from "react";
import pr2 from "../../../../assets/pr2.png";
import pr3 from "../../../../assets/pr3.png";
import { Button } from "@mui/material";
import { Favorite, ModeComment } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import { Product } from "../../../../types/ProductTypes";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../State/Store";
import { addProductToWishlist } from "../../../../State/Customer/wishlistSlice";

const ProductCard = ({ item }: { item: Product }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHoverd, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { categoryId, title, id } = useParams();
  const decodedTitle = decodeURIComponent(item.title);
  const getProductUrl = (item: any) =>
    `/product-details/${item.category?.categoryId}/${encodeURIComponent(
      item.title
    )}/${item.id}`;

  console.log(
    `/product-details/${item.category?.categoryId}/${encodeURIComponent(
      item.title
    )}/${item.id}`
  );

  useEffect(() => {
    let interval: any;
    if (isHoverd) {
      interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % item.images.length);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
      interval = null;
    }
    return () => clearInterval(interval);
  }, [isHoverd]);

  const handleWishlist = (e: any) => {
    e.stopPropagation();
    item.id && dispatch(addProductToWishlist({ productId: item.id }));
  };

  return (
    <>
      <div className="group px-4 relative">
        <div
          className="card"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {item.images.map((image, index) => (
            <img
              className="card-media object-top"
              src={image}
              onClick={() => navigate(getProductUrl(item))}
              style={{
                transform: `translateX(${(index - currentImage) * 100}%)`,
              }}
              alt=""
            />
          ))}
          {isHoverd && (
            <div className="indicator flex flex-col items-center space-y-2">
              <div className="flex gap-3">
                <Button
                  onClick={handleWishlist}
                  variant="contained"
                  color="secondary"
                >
                  <Favorite sx={{ color: teal[500] }} />
                </Button>

                <Button variant="contained" color="secondary">
                  <ModeComment sx={{ color: teal[500] }} />
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="details w-[250px] pt-3 space-y-1 group-hover-effect rounded-md">
          <div className="name">
            <h1>{item.seller?.businessDetails.bussinessName}</h1>
            <p>{item.title}</p>
          </div>
          <div className="price flex items-center gap-3">
            <span className="font-sans text-gray-800">
              ${item.sellingPrice}
            </span>
            <span className="thin-line-through text-gray-400">
              ${item.mrpPrice}
            </span>
            <span className="text-primary font-semibold">
              %{item.discountPercent}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
