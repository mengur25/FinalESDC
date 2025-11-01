import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import { createReview } from "../../../../State/Customer/ReviewSlice";
import {
  Box,
  Button,
  TextField,
  Rating,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import toast from "react-hot-toast";

const WriteReview = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state: any) => state.review);

  const [rating, setRating] = useState<number | null>(0);
  const [reviewText, setReviewText] = useState("");
  const [submitError, setSubmitError] = useState("");

  const jwt = localStorage.getItem("jwt") || "";
  const productIdNum = Number(productId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (rating === null || rating === 0) {
      setSubmitError("Please provide a rating (1-5 stars).");
      return;
    }

    if (reviewText.trim().length < 10) {
      setSubmitError("Review must be at least 10 characters long.");
      return;
    }

    try {
      await dispatch(
        createReview({
          productId: productIdNum,
          rating: rating,
          reviewText: reviewText.trim(),
          jwt: jwt,
        })
      ).unwrap();

      toast.success("Review submitted successfully!");
      navigate(`/product/${productIdNum}`);
    } catch (err: any) {
      setSubmitError(err || "Failed to submit review. Please try again.");
    }
  };

  return (
    <Box className="max-w-xl mx-auto p-5 mt-10" component={Paper} elevation={3}>
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        className="font-bold"
      >
        Write a Review
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" className="mb-4">
        For Product ID: **{productId}**
      </Typography>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Box>
          <Typography component="legend" className="font-medium mb-1">
            Your Rating
          </Typography>
          <Rating
            name="product-rating"
            value={rating}
            precision={1}
            onChange={(event, newValue) => {
              setRating(newValue);
              setSubmitError("");
            }}
            icon={<Star fontSize="inherit" />}
            emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
            sx={{ fontSize: "2rem" }}
          />
        </Box>

        <TextField
          label="Your Review"
          multiline
          rows={4}
          fullWidth
          value={reviewText}
          onChange={(e) => {
            setReviewText(e.target.value);
            setSubmitError("");
          }}
          placeholder="Tell us what you think about the product..."
          required
        />

        {(error || submitError) && (
          <Typography color="error" variant="body2">
            {error || submitError}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ py: 1.5 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Submit Review"
          )}
        </Button>
      </form>
    </Box>
  );
};

export default WriteReview;
