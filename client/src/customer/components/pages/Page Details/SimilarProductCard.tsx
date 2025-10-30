import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Favorite, ModeComment } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import { Product } from "../../../../types/ProductTypes"; 

interface SimilarProductCardProps {
    product: Product;
}

const SimilarProductCard: React.FC<SimilarProductCardProps> = ({ product }) => {
    const images = product.images || []; 
    
    const [currentImage, setCurrentImage] = useState(0);
    const [isHoverd, setIsHovered] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isHoverd && images.length > 1) {
            interval = setInterval(() => {
                setCurrentImage((prevImage) => (prevImage + 1) % images.length);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isHoverd, images.length]);

    useEffect(() => {
        if (!isHoverd) {
            setCurrentImage(0);
        }
    }, [isHoverd]);

    return (
        <div className="group px-4 relative">
            <div
                className="card"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {images.map((image, index) => ( 
                    <img
                        key={index}
                        className="card-media object-top"
                        src={image}
                        style={{
                            transform: `translateX(${(index - currentImage) * 100}%)`,
                            transition: 'transform 0.5s ease-in-out',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: index === currentImage ? 1 : 0,
                        }}
                        alt={product.title || "Product"}
                    />
                ))}
                
                {isHoverd && (
                    <div className="indicator absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-10 transition-opacity duration-300">
                        <div className="flex gap-3">
                            <Button variant="contained" sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'lightgray' } }}>
                                <Favorite sx={{ color: teal[500] }} />
                            </Button>
                            <Button variant="contained" sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'lightgray' } }}>
                                <ModeComment sx={{ color: teal[500] }} />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="details w-full pt-3 space-y-1 group-hover-effect rounded-md">
                <div className="name">
                    <h1>{product.seller?.businessDetails.bussinessName || "Shop"}</h1>
                    <p>{product.title}</p>
                </div>
                <div className="price flex items-center gap-3">
                    <span className="font-sans text-gray-800">${product.sellingPrice}</span>
                    <span className="line-through text-gray-400">${product.mrpPrice}</span>
                    <span className="text-primary font-semibold">{product.discountPercent}%</span>
                </div>
            </div>
        </div>
    );
}

export default SimilarProductCard;