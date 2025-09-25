import React, { useEffect, useState } from "react";
import pr2 from "../../../../assets/pr2.png";
import pr3 from "../../../../assets/pr3.png";
import { Button } from "@mui/material";
import { Favorite, ModeComment } from "@mui/icons-material";
import { teal } from "@mui/material/colors";

const images = [pr2, pr3];

const SimilarProductCard = () => {
    const [currentImage, setCurrentImage] = useState(0);
  const [isHoverd, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isHoverd) {
      interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
      interval = null;
    }
    return () => clearInterval(interval);
  }, [isHoverd]);
  return (
    <>
        <div className="group px-4 relative">
        <div
          className="card"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {images.map((image, index) => (
            <img
              className="card-media object-top"
              src={image}
              style={{
                transform: `translateX(${(index - currentImage) * 100}%)`,
              }}
              alt=""
            />
          ))}
          {isHoverd && (
            <div className="indicator flex flex-col items-center space-y-2">
              <div className="flex gap-3">
                <Button variant="contained" color="secondary">
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
            <h1>Koski</h1>
            <p>Blue Shirt</p>
          </div>
          <div className="price flex items-center gap-3">
            <span className="font-sans text-gray-800">$40</span>
            <span className="thin-line-through text-gray-400">$70</span>
            <span className="text-primary font-semibold">60%</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default SimilarProductCard