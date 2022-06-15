import axios from "axios";

const gameApi = axios.create({
  baseURL: "https://ncgame.herokuapp.com/api",
});

export const fetchTopReviews = () => {
  return gameApi.get("/reviews?sort_by=votes&order=desc").then(({ data }) => {
    return data.reviews.slice(0, 5);
  });
};

export const fetchCategories = () => {
  return gameApi.get("/categories").then(({ data }) => {
    return data.categories.map((category) => category.slug).sort();
  });
};

export const fetchReviews = (category, criteria, page) => {
  const { sort_by, order } = criteria;
  return gameApi
    .get(
      `/reviews${
        category === "all-categories" ? "?" : `?category=${category}&`
      }sort_by=${sort_by}&order=${order}&limit=5&p=${
        page !== 1 ? page : page - 1
      }`
    )
    .then(({ data: { reviews } }) => {
      return reviews;
    });
};

export const fetchUser = (username) => {
  return gameApi.get(`/users/${username}`).then(({ data }) => {
    return data.user;
  });
};

export const fetchReview = (id) => {
  return gameApi.get(`/reviews/${id}`).then(({ data: { review } }) => {
    return review;
  });
};

export const patchVote = (id, type) => {
  return gameApi.patch(`/${type}/${id}`, { inc_votes: 1 });
};

export const postComment = (id, comment, username) => {
  return gameApi.post(`/reviews/${id}/comments`, {
    username,
    body: comment,
  });
};

export const fetchComments = (id, criteria) => {
  const { sort_by, order } = criteria;
  return gameApi
    .get(`/reviews/${id}/comments?sort_by=${sort_by}&order=${order}`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const deleteComment = (id) => {
  return gameApi.delete(`/comments/${id}`);
};

export const postUser = (username, fullName) => {
  return gameApi.post("/users", { username, name: fullName });
};


