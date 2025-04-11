import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UseFetch from "../../../hooks/UseFetch";
import { handlePostRequest } from "../../../utils/Actions";
import Button from "../Button";

// Rating component remains unchanged
const Rating = ({ rating, size = "base" }) => {
  const sizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <div className={`flex items-center text-yellow-500 ${sizeClasses[size]}`}>
      {[...Array(5)].map((_, i) => {
        const index = i + 1;
        let content =
          index <= Math.floor(rating) ? (
            <FontAwesomeIcon icon={faStar} />
          ) : rating > i && rating < index + 1 ? (
            <FontAwesomeIcon icon={faStarHalfAlt} />
          ) : (
            <FontAwesomeIcon icon={farStar} />
          );

        return <span key={i}>{content}</span>;
      })}
    </div>
  );
};

// Skeleton components for loading state
const SkeletonBox = ({ className }) => (
  <div
    className={`animate-pulse rounded bg-gray-300 dark:bg-gray-700 ${className}`}
  ></div>
);

const ProductDetailsSkeleton = () => (
  <section className="relative z-10 overflow-hidden bg-white py-14 text-zinc-900 md:py-24 dark:bg-zinc-900 dark:text-white">
    <div className="container mx-auto px-4">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Image skeleton */}
        <div className="w-full lg:w-1/2">
          <SkeletonBox className="aspect-square w-full rounded-2xl" />
        </div>

        {/* Content skeleton */}
        <div className="w-full lg:w-1/2">
          <div className="mb-6 lg:mb-12">
            <SkeletonBox className="mb-4 h-10 w-3/4" />
            <SkeletonBox className="my-4 h-24 w-full" />
            <div className="flex items-center gap-4">
              <SkeletonBox className="h-8 w-24" />
              <SkeletonBox className="h-6 w-40" />
            </div>
          </div>
          <div className="my-7 flex w-full flex-col gap-3">
            <SkeletonBox className="h-60 w-full rounded-lg" />
          </div>
        </div>
      </div>

      {/* Reviews Section Skeleton */}
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <SkeletonBox className="h-80 rounded-lg" />
        <div className="rounded-lg bg-gray-100 p-6 dark:bg-zinc-800">
          <SkeletonBox className="mb-4 h-8 w-48" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-t py-4 dark:border-slate-700">
              <div className="flex items-start justify-between">
                <div>
                  <SkeletonBox className="mb-2 h-6 w-32" />
                  <SkeletonBox className="h-4 w-24" />
                </div>
                <SkeletonBox className="h-4 w-32" />
              </div>
              <SkeletonBox className="mt-2 h-16 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const RecommendationSummary = ({ reviews, product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async (productId, qty = 1) => {
    if (!productId) return;
    try {
      const payload = { product: productId, quantity: qty };
      const response = await handlePostRequest("/cart/", payload);
      if (response.status == 201) {
        toast.success("Product added to cart successfully!");
      } else if (response.status == 400) {
        toast.error(response.data.detail);
      } else if (response.status == 401) {
        toast.error("Login to add Product in cart !!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  const recommendationPercentage =
    reviews.length > 0
      ? Math.round(
          (reviews.filter((r) => r.rating >= 4).length / reviews.length) * 100,
        )
      : 0;

  return (
    <div className="rounded-lg bg-gray-100 p-6 dark:bg-zinc-800">
      <div className="mb-2 text-5xl font-bold">{recommendationPercentage}%</div>
      <p className="mb-4 text-sm opacity-75">
        Recommended by {reviews.length} reviewers
      </p>

      <div className="mb-2 flex items-center space-x-3">
        <span className="text-4xl font-bold">
          {reviews.length > 0
            ? (
                reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
              ).toFixed(1)
            : "0.0"}
        </span>
        <Rating
          rating={
            reviews.length > 0
              ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
              : 0
          }
          size="xl"
        />
      </div>
      <p className="mb-6 text-sm opacity-75">
        Average rating based on {reviews.length} reviews
      </p>

      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <label htmlFor="quantity" className="text-sm font-medium">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="w-20 rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-zinc-700"
          />
          <Button
            variant="primary"
            size="md"
            onClick={() => handleAddToCart(product.id, quantity)}
            // className="flex-1 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
          >
            {" "}
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

const ReviewForm = ({ productId, refetch }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      rating,
      comment,
      product: productId,
    };
    try {
      const response = await handlePostRequest(
        `/products/${productId}/add_review/`,
        reviewData,
      );
      console.log(response);
      if (response.status == 201) {
        toast.success("Review Added");
        refetch();
      } else if (response.status == 400) {
        toast.error(response.data.detail);
      } else if (response.status == 401) {
        toast.error("Login to add Review !!");
      }
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="rounded-lg bg-gray-100 p-6 dark:bg-zinc-800">
      <h3 className="mb-4 text-xl font-medium">Write a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-2 block">Your Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`mr-1 text-2xl ${rating >= star ? "text-yellow-500" : "text-gray-300"}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-2 block">Your Review</label>
          <textarea
            className="w-full rounded border p-2 dark:bg-zinc-700"
            rows={4}
            value={comment}
            required
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

const ReviewItem = ({ review }) => (
  <div className="border-t py-4 dark:border-slate-700">
    <div className="flex items-start justify-between">
      <div>
        <h5 className="font-medium">{review.user}</h5>
        <div className="flex items-center space-x-2">
          <Rating rating={review.rating} />
        </div>
      </div>
      <span className="text-sm opacity-50">
        {new Date(review.created_at).toLocaleString()}
      </span>
    </div>
    <p className="mt-2 text-sm opacity-75">{review.comment}</p>
  </div>
);

const ProductReviews = ({ product, refetch }) => (
  <section className="bg-white py-12 dark:bg-zinc-900">
    <div className="container mx-auto px-4">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Left Side: Review Form */}
        <div className="space-y-6">
          <ReviewForm productId={product.id} refetch={refetch} />
        </div>

        {/* Right Side: Reviews List */}
        <div className="rounded-lg bg-gray-100 p-6 dark:bg-zinc-800">
          <h3 className="mb-4 text-2xl font-medium">Customer Reviews</h3>
          {product.reviews.length > 0 ? (
            product.reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))
          ) : (
            <p className="text-center italic opacity-70">
              No reviews yet. Be the first to review!
            </p>
          )}
        </div>
      </div>
    </div>
  </section>
);

const ProductDetails = () => {
  const { id } = useParams();
  const {
    data: product,
    loading,
    error,
    refetch,
  } = UseFetch(`/products/${id}`);

  if (loading) return <ProductDetailsSkeleton />;
  if (error)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        Error: {error}
      </div>
    );
  if (!product)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        No product found
      </div>
    );

  return (
    <section className="relative z-10 overflow-hidden bg-white py-14 text-zinc-900 md:py-24 dark:bg-zinc-900 dark:text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <img
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              className="max-h-[65vh] w-full rounded-2xl object-contain"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="mb-6 lg:mb-12">
              <h1 className="mb-4 text-2xl leading-none font-medium md:text-4xl">
                {product.name}
              </h1>
              <p className="my-4 opacity-70 lg:mr-56 xl:mr-80">
                {product.description}
              </p>
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-medium text-blue-600">
                  ${product.price}
                </h3>
                <span className="text-sm">
                  Store: {product.store.name} | Brand: {product.brand.name}
                </span>
              </div>
            </div>
            <div className="my-7 flex w-full flex-col gap-3">
              <RecommendationSummary
                reviews={product.reviews}
                product={product}
              />
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ProductReviews product={product} refetch={refetch} />
      </div>
    </section>
  );
};

export default ProductDetails;
