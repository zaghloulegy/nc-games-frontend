import { React, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "./CommentSection";
import ErrorComponent from "./ErrorComponent";
import { fetchReview, patchVote } from "../utils/api";
import { convertDate } from "../utils/utilFuncs";
import { UserContext } from "../contexts/UserContext";

export default function ReviewPage() {
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [displayVotes, setDisplayVotes] = useState(0);
  const [newComment, setNewComment] = useState("");
  const { review_id } = useParams();
  const {
    currentUser: { username },
  } = useContext(UserContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    setNewComment("");
    setIsLoading(true);
    fetchReview(review_id)
      .then((review) => {
        setIsLoading(false);
        setReview(review);
        setDisplayVotes(review.votes);
      })
      .catch((err) => {
        setError([err.response.status, err.response.data.msg]);
      });
  }, [review_id]);

  const {
    review_id: id,
    title,
    review_body: body,
    review_img_url: img,
    owner,
    created_at: date,
    votes,
  } = review;

  const handleVote = () => {
    if (username) {
      patchVote(id, "reviews");
      setDisplayVotes((currVotes) => {
        return currVotes + 1;
      });
    } else {
      alert("Please Login ");
    }
  };

  return (
    <div>
      {error ? (
        <ErrorComponent err={error} />
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <section className="singlereview">
          <div className="singlereview__body">
            <img src={img} alt=" game review" />
            <h2>{title}</h2>
            <p>
              by {owner} on {convertDate(date)}
            </p>
            <h3>Review</h3>
            <p>{body}</p>
            <button onClick={handleVote} disabled={votes !== displayVotes}>
              {displayVotes} ⬆️
            </button>
          </div>

          <div className="comments">
            <CommentSection
              setNewComment={setNewComment}
              newComment={newComment}
              review_id={review_id}
            />
          </div>
        </section>
      )}
    </div>
  );
}
