import React from 'react'
import { Product } from '../../../../types/ProductTypes'
import { Close } from '@mui/icons-material'
import { useAppDispatch } from '../../../../State/Store'
import { addProductToWishlist } from '../../../../State/Customer/wishlistSlice'
import { teal } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom' 

const WishlistProductCard = ({item}:{item:Product}) => {
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    const handleWishlist = (e:any) =>{
        e.stopPropagation();
        item.id && dispatch(addProductToWishlist({productId: item.id}))
    }
    
    const handleCardClick = () => {
        // Lấy thông tin cần thiết
        const categoryName = item.category?.categoryId || 'unknown_category';
        const productTitle = item.title || 'Unknown-Product';
        const productId = item.id;
        
        
        const slugTitle = encodeURIComponent(productTitle.trim().replace(/\s+/g, '-'));
        const slugCategory = encodeURIComponent(categoryName.trim().replace(/\s+/g, '_'));
        
        const path = `/product-details/${slugCategory}/${slugTitle}/${productId}`;
        
        navigate(path); 
    }
    
    return (
        <div 
            className='w-60 relative cursor-pointer' 
            onClick={handleCardClick} 
        >
            <div className="w-full">
                <img src={item.images[0]} className='object-top w-full h-[300px]' alt="" />
            </div>

            <div className="pt-3 space-y-1">
                <p>{item.title}</p>
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
            
            <div className="absolute top-1 right-1">
                <button onClick={handleWishlist}>
                    <Close className='cursor-pointer bg-white rounded-full p-1' sx={{color: teal[500], fontSize: "2rem"}}/>
                </button>
            </div>
        </div>
    )
}

export default WishlistProductCard