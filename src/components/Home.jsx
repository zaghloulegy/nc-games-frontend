import { React, useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import { fetchTopReviews } from "../utils/api";

export default function Home() {
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetchTopReviews()
      .then((res) => {
        setIsLoading(false);
        setDisplayedReviews(res);
      })
      .catch(Error);
  }, []);
  return (
    <div>
      <h2 className="header__center">Popular Reviews ⬆️</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="reviews">
          <ReviewCard displayedReviews={displayedReviews} />
        </div>
      )}
    </div>
  );
}
