import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStar,
  faStarHalfAlt,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { Fragment } from "react";

const review = [
  {
    img: "https://cdn.easyfrontend.com/pictures/users/user18.jpg",
    name: "Freya Kemp",
    rating: 4.8,
    date: "Jan 24,2020",
    content:
      "Well received seems solid, serious seller and word, fast delivery, thank you and congratulations.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    like: "12",
    dislike: "3",
  },
  {
    img: "https://cdn.easyfrontend.com/pictures/users/user4.jpg",
    name: "Issy Won",
    rating: 4.5,
    date: "June 10,2020",
    content:
      "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be.",
    like: "25",
    dislike: "7",
  },
  {
    img: "https://cdn.easyfrontend.com/pictures/users/user17.jpg",
    name: "Sophia Dunkley",
    rating: 3.9,
    date: "Sep 19,2020",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    like: "20",
    dislike: "6",
  },
];

const progress = [
  {
    star: "5",
    value: "70",
    width: "70%",
    count: "123",
  },
  {
    star: "4",
    value: "90",
    width: "90%",
    count: "55",
  },
  {
    star: "3",
    value: "80",
    width: "80%",
    count: "12",
  },
  {
    star: "2",
    value: "60",
    width: "60%",
    count: "4",
  },
  {
    star: "1",
    value: "30",
    width: "30%",
    count: "3",
  },
];

const Rating = ({ rating, showLabel, className, ...rest }) => (
  <p className={"text-sm"} {...rest}>
    <span className="text-yellow-500">
      {[...Array(5)].map((_, i) => {
        const index = i + 1;
        let content = "";
        if (index <= Math.floor(rating))
          content = <FontAwesomeIcon icon={faStar} />;
        else if (rating > i && rating < index + 1)
          content = <FontAwesomeIcon icon={faStarHalfAlt} />;
        else if (index > rating) content = <FontAwesomeIcon icon={farStar} />;

        return <Fragment key={i}>{content}</Fragment>;
      })}
    </span>
    {showLabel && <span className="mx-1">{rating.toFixed(1)}</span>}
  </p>
);

const ReviewItem = ({ item }) => {
  return (
    <>
      <hr className="my-5 dark:border-slate-700" />
      <div>
        <div className="mb-6 flex items-center">
          <div className="mr-2 h-12 w-12 overflow-hidden rounded-full">
            <img src={item.img} alt="" className="mx-auto h-auto max-w-full" />
          </div>
          <div className="flex flex-grow justify-between">
            <div>
              <h5 className="mb-1 font-medium">{item.name}</h5>
              <Rating rating={item.rating} showLabel={true} />
            </div>
            <p className="mb-0 text-sm opacity-50">{item.date}</p>
          </div>
        </div>
        <p className="mb-6 text-sm leading-normal opacity-75">{item.content}</p>
        <div className="flex justify-end">
          <button className="mr-6 inline-flex items-center justify-center rounded px-3 py-2 duration-300 hover:bg-gray-200 hover:text-blue-600 dark:hover:bg-slate-700">
            <FontAwesomeIcon icon={faThumbsUp} className="mr-2 text-lg" />
            Like ({item.like})
          </button>
          <button className="inline-flex items-center justify-center rounded px-3 py-2 duration-300 hover:bg-gray-200 hover:text-blue-600 dark:hover:bg-slate-700">
            <FontAwesomeIcon icon={faThumbsDown} className="mr-2 text-lg" />
            Dislike ({item.dislike})
          </button>
        </div>
      </div>
    </>
  );
};

const BarItem = ({ info }) => {
  const progressBarStyle = {
    width: info.width,
  };

  return (
    <div className="mb-2 flex items-center justify-around sm:w-1/2">
      <div className="mr-3">
        <p className="mb-0 text-sm font-bold">
          <span className="opacity-50">{info.star}</span>
          <span className="ml-1 text-blue-600">
            <FontAwesomeIcon icon={faStar} />
          </span>
        </p>
      </div>
      <div className="mr-3 flex-grow">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
          <div
            className="h-full w-8/12 bg-blue-600"
            style={progressBarStyle}
          ></div>
        </div>
      </div>
      <div>
        <p className="mb-0 text-sm opacity-50">{info.count}</p>
      </div>
    </div>
  );
};

const Review = () => {
  return (
    <section className="relative z-10 overflow-hidden bg-white py-14 text-zinc-900 md:py-24 dark:bg-zinc-900 dark:text-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-4xl justify-center">
          <div className="rounded bg-blue-50 p-4 lg:p-8 dark:bg-zinc-900">
            <div>
              <div className="p-3 md:p-6">
                <h4 className="mb-2 text-2xl font-medium">
                  Reviewer Recommendetion
                </h4>
                <div className="flex flex-wrap items-center text-[40px]">
                  91%
                </div>
                <p className="mb-6 text-sm opacity-75 md:mb-12">
                  Recomded by 6 reviewers who responded, 5 would recommend this
                  product.
                </p>

                <div className="flex flex-wrap items-center">
                  <span className="text-[40px]">4.5</span>
                  <Rating
                    rating={4.5}
                    showLabel={false}
                    className="ml-2 text-yellow-500"
                  />
                </div>
                <p className="mb-6 text-sm opacity-75">
                  Average rating based on 2345 reviews
                </p>
                <div>
                  {progress.map((info, j) => (
                    <BarItem info={info} key={j} />
                  ))}
                </div>
              </div>
              <hr className="my-4 dark:border-slate-700" />
              <div className="p-3 pt-0 md:p-6 md:pt-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-medium">Customer Review</h2>
                  <div>
                    <button className="rounded border border-blue-600 px-5 py-2 text-blue-600 hover:bg-blue-600 hover:text-white md:px-6">
                      New Comment
                    </button>
                  </div>
                </div>
                {review.map((item, i) => (
                  <ReviewItem item={item} key={i} />
                ))}
              </div>
              <div className="py-6 text-center lg:py-12">
                <button className="hover:bg-opacity-90 rounded bg-blue-600 px-6 py-2.5 text-sm text-white md:px-10">
                  Load More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;
