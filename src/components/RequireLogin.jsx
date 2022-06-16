

import { getUsers, getUserInfo } from "../utils/api";
import { useUsers } from "../hooks/useApi";
import {useContext} from "react";
import {UserContext} from "../contexts/UserContext";


function RequireLogin({ children }) {
  const { usersWithInfo, usersLoading } = useUsers(getUsers, getUserInfo);
  // console.log(props);

  const {setCurrentUser, currentUser} = useContext(UserContext);
  
  // console.log(setCurrentUser);
  // if (currentUser) return children;
  if (usersLoading) return <p>Loading ...</p>;
  return (
    <div id="require-login">
      <h1>Please Select a User to log in as!</h1>
      <ul>
        {usersWithInfo.map((user) => {
          return (
            <li
              key={user.user.username}
              onClick={() => setCurrentUser(user.user)}
            >
              <p>{user.user.username}</p>
              <img src={user.user.avatar_url} alt="" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RequireLogin;
