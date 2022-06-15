import { React, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { postUser } from "../utils/api";

export default function Register() {
  const [isError, setIsError] = useState(false);
  const { username, setUsername, fullName, setFullName, setCurrentUser } =
    useContext(UserContext);
  const navigate = useNavigate();

  const handleUserInput = (event) => {
    const username = event.target.value;
    setUsername(username);
  };
  const handleName = (event) => {
    const name = event.target.value;
    setFullName(name);
  };
  const handleRegister = (event) => {
    setIsError(false);
    event.preventDefault();
    postUser(username, fullName)
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
      })
      .then(() => {
        navigate(`/dashboard/${username}`);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  };

  return (
    <div className="login--container">
      <div className="login">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            required
            placeholder="Username"
            onChange={handleUserInput}
            value={username}
          />
          <br />
          <input
            type="text"
            required
            placeholder="Full Name"
            onChange={handleName}
            value={fullName}
          />
          <br />
          <button>Register</button>
        </form>
        {isError && (
          <div className="error">
            <p>
              User already exists. <Link to="/login">Login instead</Link>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
