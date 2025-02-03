import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/UseFetch";

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
const RecommendationSummary = ({ reviews }) => {
  // Calculate recommendation percentage
  const recommendationPercentage =
    reviews.length > 0
      ? Math.round(
          (reviews.filter((r) => r.rating >= 4).length / reviews.length) * 100,
        )
      : 0;

  return (
    <div className="rounded-lg bg-blue-50 p-6 dark:bg-slate-800">
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
      <p className="text-sm opacity-75">
        Average rating based on {reviews.length} reviews
      </p>
    </div>
  );
};
const ReviewItem = ({ review }) => {
  return (
    <div className="border-t py-4 dark:border-slate-700">
      <div className="flex items-start justify-between">
        <div>
          <h5 className="font-medium">{review.user}</h5>
          <div className="flex items-center space-x-2">
            <Rating rating={review.rating} />
            {/* <span className="text-sm opacity-50">
              {new Date(review.created_at).toLocaleDateString()}
            </span> */}
          </div>
        </div>
        <span className="text-sm opacity-50">
          {new Date(review.created_at).toLocaleDateString()}
        </span>
      </div>
      <p className="mt-2 text-sm opacity-75">{review.comment}</p>
    </div>
  );
};
const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  return (
    <div className="rounded-lg bg-blue-50 p-6 dark:bg-slate-800">
      <h3 className="mb-4 text-xl font-medium">Write a Review</h3>
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
          className="w-full rounded border p-2 dark:bg-slate-700"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review here..."
        ></textarea>
      </div>
      <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Submit Review
      </button>
    </div>
  );
};
const ProductReviews = ({ product }) => {
  return (
    <section className="bg-white py-12 dark:bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Side: Recommendation Summary & Review Form */}
          <div className="space-y-6">
            <ReviewForm />
          </div>

          {/* Right Side: Reviews List */}
          <div className="rounded-lg bg-blue-50 p-6 dark:bg-slate-800">
            <h3 className="mb-4 text-2xl font-medium">Customer Reviews</h3>
            {product.reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`/products/${id}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <section className="relative z-10 overflow-hidden bg-white py-14 text-zinc-900 md:py-24 dark:bg-zinc-900 dark:text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <img
              src={product.image || "/placeholder.jpg"}
              alt=""
              className="h-auto w-full max-w-full rounded-2xl"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="mb-6 lg:mb-12">
              <h1 className="mb-4 text-2xl leading-none font-medium md:text-4xl">
                {product.name}
              </h1>
              {/* <div className="mb-6 flex items-center gap-3">
                <Rating rating={product.rating} />
                <a href="#reviews" className="ml-1 font-medium text-blue-600">
                  {product.reviews.length} Reviews
                </a>
                <span className="ml-2">Stock: {product.stock}</span>
              </div> */}
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

            <form action="#!">
              <div className="mb-6">
                <h5 className="mb-2 font-medium">Categories</h5>
                <div className="flex gap-2">
                  {product.categories.map((category) => (
                    <span
                      key={category.id}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm dark:bg-zinc-800"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h5 className="mb-2 font-medium">Quantity</h5>
                <input
                  type="number"
                  className="w-24 rounded-lg border border-gray-300 p-2 dark:border-gray-700 dark:bg-zinc-800"
                  defaultValue={1}
                  min={1}
                  max={product.stock}
                />
              </div>

              <div className="my-7 flex w-full flex-col gap-3">
                <div className="flex w-full max-w-lg items-center gap-4">
                  <button className="hover:bg-opacity-90 h-10 w-1/2 rounded border border-blue-600 bg-blue-600 px-10 py-2.5 text-sm text-white uppercase md:px-12">
                    Buy Now
                  </button>
                  <button className="h-10 w-1/2 rounded border border-blue-600 px-6 py-2.5 text-sm text-blue-600 uppercase hover:bg-blue-600 hover:text-white md:px-12">
                    Add To Cart
                  </button>
                </div>
                <RecommendationSummary reviews={product.reviews} />
                {/* <div className="flex w-full items-center gap-4">
                  <button className="hover:bg-opacity-10 rounded px-3 py-2 text-blue-600 hover:bg-blue-600">
                    <FontAwesomeIcon icon={faHeart} /> Add to wishlist
                  </button>
                  <button className="hover:bg-opacity-10 rounded px-3 py-2 text-blue-600 hover:bg-blue-600">
                    <FontAwesomeIcon icon={faShareAlt} className="mr-1" /> share
                  </button>
                </div> */}
              </div>
            </form>
          </div>
        </div>

        {/* Reviews Section */}

        <ProductReviews product={product} />
      </div>
    </section>
  );
};

export default ProductDetails;
