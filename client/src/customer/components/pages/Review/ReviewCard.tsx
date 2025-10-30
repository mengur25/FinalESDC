import { Avatar, Box, Grid, IconButton, Rating, Typography } from "@mui/material";
import React from "react";
import { Delete } from "@mui/icons-material";
import { red } from "@mui/material/colors";
// Giả định interfaces:
interface Review { id: number; reviewText: string; rating: number; user: { firstName: string; lastName: string; }; createdAt: string; }

const ReviewCard = ({ review, onDelete }: { review: Review, onDelete: (reviewId: number) => void }) => {
    
    const initials = (review.user?.firstName?.[0] || 'N') + (review.user?.lastName?.[0] || 'A');
    const fullName = `${review.user?.firstName || 'Anonymous'} ${review.user?.lastName || ''}`;
    const formattedDate = review.createdAt ? new Date(review.createdAt).toLocaleDateString('vi-VN') : 'N/A';

    return (
        <div className="flex justify-between">
            <Grid container spacing={4}> 
                <Grid item xs={1}>
                    <Box>
                        <Avatar
                            className="text-white"
                            sx={{ width: 56, height: 56, bgcolor: "#9155fd" }}
                        >
                            {initials}
                        </Avatar>
                    </Box>
                </Grid>

                <Grid item xs={10}>
                    <div className="space-y-2">
                        <Typography variant="subtitle1" className="font-semibold">
                            {fullName}
                        </Typography>
                        <Typography variant="body2" className="opacity-70">
                            {formattedDate}
                        </Typography>
                    </div>
                    
                    <Rating readOnly value={review.rating} precision={1} sx={{ mt: 1 }} />
                    <Typography variant="body1" sx={{ mt: 1 }}>{review.reviewText}</Typography>
                    

                </Grid>
            </Grid>
            

        </div>
    );
};

export default ReviewCard;