import { React, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { fetchUser} from "../utils/api";
import { getFirstName } from "../utils/utilFuncs";

import "../App.css"

export default function Dashboard() {
  const {
    currentUser: { name, avatar_url },
    currentUser,
    setCurrentUser,
  } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  const [userComments, setUserComments] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchUser(username)])
      .then(([user, userComments]) => {
        setIsLoading(false);
        setUserComments(userComments);
        setCurrentUser(user);
      })
      .catch(Error);
  }, [setCurrentUser, username]);

  return (
    <>
      {!isLoading && (
        <div>
          <h2>Hello, {getFirstName(name)}!</h2>
          <div>
            <h3 className="dashboard__header">Account</h3>
            <img src={avatar_url} alt="user avatar" className="profile__photo" />
            <p className="username__font">Username: {currentUser.username}</p>
          </div>
        </div>
      )}
    </>
  );
}
