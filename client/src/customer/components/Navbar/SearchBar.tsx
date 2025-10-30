import React, { useState, useEffect } from 'react';
import { IconButton, TextField, InputAdornment, Paper, List, ListItem, ListItemText, CircularProgress, Typography, ListItemButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { searchProduct } from '../../../State/Customer/ProductSlice';
import { Product } from '../../../types/ProductTypes';
import { useNavigate } from 'react-router-dom';

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};


const SearchBar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    


    const productState = useAppSelector((state: any) => state.product); 
    const searchResults = productState?.searchProduct || []; 
    const searchLoading = productState?.loading || false; 

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 400); 

    useEffect(() => {
        if (debouncedSearchTerm.trim()) {
            dispatch(searchProduct(debouncedSearchTerm.trim()));
        }
    }, [debouncedSearchTerm, dispatch]);


    const handleResultClick = (product: Product) => {
        
        
        const rawCategoryPath = product.category || 'default_category';
        const categoryPathString = (typeof rawCategoryPath === 'object' && rawCategoryPath !== null) 
                                 ? rawCategoryPath.name || 'default_category'
                                 : rawCategoryPath;
        
        const productTitle = product.title || 'product';

        const safeTitle = encodeURIComponent(productTitle.replace(/\s/g, '_')); 
        const safeCategoryPath = encodeURIComponent(categoryPathString); 
        
        const path = `/product-details/${safeCategoryPath}/${safeTitle}/${product.id}`;

        navigate(path);
        setSearchTerm(''); 
    };

    return (
        <div className="relative max-w-sm">
            <TextField
                fullWidth
                label="Searching..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            {searchLoading && searchTerm ? <CircularProgress size={20} /> : null}
                        </InputAdornment>
                    ),
                }}
            />

            {searchTerm.trim() && (
                <Paper className="absolute z-50 w-full mt-1 max-h-80 overflow-y-auto shadow-xl">
                    <List disablePadding>
                        
                        {searchLoading && debouncedSearchTerm.trim() && (
                            <ListItem>
                                <ListItemText primary={<Typography color="textSecondary">Searching...</Typography>} />
                            </ListItem>
                        )} 

                        {!searchLoading && searchResults.length > 0 ? (
                            searchResults.map((product: Product) => (
                                <ListItemButton
                                    key={product.id} 
                                    onClick={() => handleResultClick(product)}
                                >
                                    <ListItemText 
                                        primary={product.title} 
                                        secondary={`ID: ${product.id}`} 
                                    />
                                </ListItemButton>
                            ))
                        ) : debouncedSearchTerm.trim() && !searchLoading && searchResults.length === 0 ? (
                            <ListItem>
                                <ListItemText primary={<Typography color="textSecondary">Product not found.</Typography>} />
                            </ListItem>
                        ) : null}

                        {!debouncedSearchTerm.trim() && searchTerm.trim() && !searchLoading && (
                            <ListItem>
                                <ListItemText primary={<Typography color="textSecondary">Start typing to search...</Typography>} />
                            </ListItem>
                        )}
                    </List>
                </Paper>
            )}
        </div>
    );
};

export default SearchBar;