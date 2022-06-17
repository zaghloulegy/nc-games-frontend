import { React, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import {
  postComment,
  deleteComment,
  fetchComments,
  patchVote,
} from "../utils/api";

export default function CommentSection({
  setNewComment,
  newComment,
  review_id,
}) {
  const [displayComments, setDisplayComments] = useState([]);
  const [displayLikes, setDisplayLikes] = useState({});
  const [posting, setPosting] = useState(false);
  const [criteria, setCriteria] = useState({
    sort_by: "created_at",
    order: "desc",
  });
  const [isLoading, setIsLoading] = useState(true);
  const {
    currentUser: { username },
  } = useContext(UserContext);

  useEffect(() => {
    fetchComments(review_id, criteria).then((comments) => {
      setIsLoading(false);
      setDisplayComments(comments);
      setDisplayLikes(() => {
        const likeObj = {};
        comments.forEach((comment) => {
          likeObj[comment.comment_id] = comment.votes;
        });
        return likeObj;
      });
    });
  }, [review_id, setDisplayLikes, posting, criteria]);

  const handleComment = (event) => {
    const comment = event.target.value;
    setNewComment(comment);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postComment(review_id, newComment, username).then(() => {
      setPosting((currPosting) => {
        return !currPosting;
      });
      setNewComment("");
    });
  };

  const handleLike = (commentId) => {
    patchVote(commentId, "comments");
    setDisplayLikes((currLikes) => {
      return { ...currLikes, [commentId]: currLikes[commentId] + 1 };
    });
  };

  const handleDelete = (comment_id) => {
    deleteComment(comment_id).then(() => {
      setPosting((currPosting) => {
        return !currPosting;
      });
      setNewComment("");
    });
  };
  const handleCriteria = (event) => {
    setCriteria(JSON.parse(event.target.value));
  };
  return (
    <div>
      <h3>Leave a Comment</h3>
      <div className="comments__input">
        {!username ? (
          <p className="login__link">
            Please <Link to="/login">Login</Link> {" "}
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Leave a comment"
              onChange={handleComment}
              value={newComment}
              required
            />
            <br />
            <button disabled={newComment.length === 0}>Submit</button>
          </form>
        )}
      </div>

      <div>
        <div className="comments__header">
          <h3>
            {displayComments.length > 1 ? "Comments" : "Comment"} (
            {displayComments.length})
          </h3>
          <select name="criteria" onChange={handleCriteria}>
            <option value='{ "sort_by": "created_at", "order": "desc" }'>
              Newest
            </option>
            <option value='{ "sort_by": "created_at", "order": "asc" }'>
              Oldest
            </option>
            <option value='{ "sort_by": "votes", "order": "desc" }'>
              Likes: High to Low
            </option>
            <option value='{ "sort_by": "votes", "order": "asc" }'>
              Likes: Low to High
            </option>
          </select>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          displayComments.length > 0 &&
          displayComments.map((comment) => {
            const { comment_id, author, body, votes } = comment;
            return (
              <div key={comment_id} className="comments__card">
                <h4>{author}</h4>
                <p>{body}</p>
                <button
                  onClick={() => {
                    return username
                      ? handleLike(comment_id)
                      : alert("Please Login ");
                  }}
                  disabled={votes < displayLikes[comment_id]}
                >
                  {displayLikes[comment_id]} 👍🏼
                </button>
                {username === author && (
                  <button
                    onClick={() => {
                      return handleDelete(comment_id);
                    }}
                  >
                    ❌
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
