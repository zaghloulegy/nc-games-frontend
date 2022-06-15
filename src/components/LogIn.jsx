import { React, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { fetchUser } from "../utils/api";

export default function LogIn() {
  const [isError, setIsError] = useState(false);
  const { username, setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  const handleUserInput = (event) => {
    const username = event.target.value;
    setUsername(username);
  };

  const handleSignIn = (event) => {
    setIsError(false);
    event.preventDefault();
    fetchUser(username)
      .then((user) => {
        navigate(`/dashboard/${username}`);
      })
      .catch((err) => {
        setUsername("");
        setIsError(true);
      });
  };

  return (
    <div className="login__container">
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleSignIn}>
          <input
            type="text"
            required
            placeholder="Username"
            onChange={handleUserInput}
            value={username}
          />
          <br />
          <button>Login</button>
        </form>
        {isError && (
          <div className="error">
            <p>User does not exist.</p>
          </div>
        )}
      </div>
    </div>
  );
}
