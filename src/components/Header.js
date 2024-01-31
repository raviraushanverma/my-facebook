import { Link } from "react-router-dom";
import Logo from "./Logo";
import { SessionContext } from "../providers/SessionProvider";
import { useContext } from "react";
import Notification from "./Notification";
import UserAvatar from "./UserAvatar";

const Header = () => {
  const { loggedInUser, setLoggedInUser } = useContext(SessionContext);

  const logout = () => {
    setLoggedInUser(null);
  };

  return (
    <nav
      className="navbar fixed-top navbar-expand-lg navbar-light bg-light"
      style={{ boxShadow: "rgb(0, 0, 0) 0px 4px 10px -9px" }}
    >
      <div className="container">
        <Link className="navbar-brand" to={"/"}>
          <Logo />
        </Link>
        <div className="d-flex">
          {loggedInUser ? (
            <div className="d-flex">
              <div style={{ marginRight: "15px" }}>
                <Notification />
              </div>
              <div style={{ marginRight: "15px" }}>
                <Link to={`/profile/${loggedInUser._id}`}>
                  <UserAvatar
                    profilePicURL={loggedInUser.profilePicURL}
                    styleForUserAvatar={{ width: "40px", height: "40px" }}
                    styleForDefaultUserAvatar={{ fontSize: "1em" }}
                  />
                </Link>
              </div>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex">
              <button
                style={{ marginRight: "10px" }}
                type="button"
                className="btn btn-sm btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                LOGIN
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#signupModal"
              >
                SIGN UP
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Header;
