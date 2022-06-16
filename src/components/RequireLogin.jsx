import { getUsers, getUserInfo } from "../utils/api";
import { useUsers } from "../hooks/useApi";

export default function RequireLogin({ currentUser, children, setCurrentUser }) {
  const { usersWithInfo, usersLoading } = useUsers(getUsers, getUserInfo);

  if (currentUser) return children;
  if (usersLoading) return <p>Loading ...</p>;

  return(
    <div id="require-login">
      <h1>Please Select a User to log in as!</h1>
      <ul>
        {usersWithInfo.map((user) => {
          console.log(user);
          return (
            <li
              key={user.user.username}
              onClick={() => setCurrentUser({ username:user.user.username, name: user.user.name, avatar_url: user.user.avatar_url })}
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
