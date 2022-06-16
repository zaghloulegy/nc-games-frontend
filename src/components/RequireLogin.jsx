import { getUsers, getUserInfo } from "../utils/api";
import { useUsers } from "../hooks/useApi";
import {useContext} from "react";
import {UserContext} from "../contexts/UserContext";
import "../App.css"

function RequireLogin() {
  const { usersWithInfo, usersLoading } = useUsers(getUsers, getUserInfo);
  const {setCurrentUser} = useContext(UserContext);
  if (usersLoading) return <p>Loading ...</p>;
  return (
    <div id="require-login">
      <h1>Please Select Your User</h1>
      <ul>
        {usersWithInfo.map((user) => {
          return (
            <li
              key={user.user.username}
              onClick={() => setCurrentUser(user.user)}
            >
              <p>{user.user.username}</p>
              <img src={user.user.avatar_url} alt="profile" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RequireLogin;
