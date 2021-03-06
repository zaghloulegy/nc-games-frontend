import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function ReviewCard({ displayedReviews }) {
  return (
    <div>
      {displayedReviews.length <= 0 ? (
        <p>No results.</p>
      ) : (
        <div>
          {displayedReviews.map(
            ({
              review_id,
              title,
              owner,
              created_at: date,
              review_img_url,
              votes,
              comment_count,
            }) => {
              return (
                <div className="reviews__reviewcard" key={review_id}>
                  <Link to={`/review/${review_id}`}>
                    <img src={review_img_url} alt="game review" width="100%" />
                    <h3>{title}</h3>
                  </Link>
                  <p>
                    <Link to={`/review/${review_id}`}>Read More</Link>
                  </p>
                  <p className="reviews__stats">
                    {votes} {votes <= 1 ? "Vote" : "Votes"} | {comment_count}{" "}
                    {comment_count <= 1 ? "Comment" : "Comments"}
                  </p>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}
