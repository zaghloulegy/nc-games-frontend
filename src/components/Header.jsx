import { React, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { getFirstName } from "../utils/utilFuncs";
import SearchBox from "./sorting";
import northercoders from "../img/northercoders.png";

export default function Header() {
  const {
    currentUser: { username, name },
    setCurrentUser,
    setUsername,
    setFullName,
  } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    alert("You've been logged out.");
    setUsername("");
    setFullName("");
    setCurrentUser({});
    navigate("/");
  };
  return (
    <div>
      <Link to="/">
        <div className="header">
          <h1 className="header__title"> Z</h1>
          <img
            className="header__logo"
            src={northercoders}
            alt="northercoders logo"
          />

          <h1 className="header__title">ghloul's Game</h1>
        </div>
      </Link>
      <div>
        {username ? (
          <ul className="header__nav">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to={`/dashboard/${username}`}>
                Dashboard ({getFirstName(name)})
              </Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="header__nav">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
        <div>
          <SearchBox />
        </div>
      </div>
    </div>
  );
}
