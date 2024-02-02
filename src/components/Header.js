import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { SessionContext } from "../providers/SessionProvider";
import { useContext, useState } from "react";
import Notification from "./Notification";
import UserAvatar from "./UserAvatar";
import Loading from "./Loading";
import { apiCall } from "../utils";

const Header = () => {
  const { loggedInUser, setLoggedInUser } = useContext(SessionContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    setIsLoggingOut(true);
    const res = await apiCall({
      url: `${process.env.REACT_APP_SERVER_END_PONT}/logout`,
    });
    setIsLoggingOut(false);
    if (res) {
      localStorage.removeItem("user");
      setLoggedInUser(null);
      navigate("/");
    }
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
            <div className="d-flex align-items-center">
              <div style={{ marginRight: "15px" }}>
                <Notification />
              </div>
              <div style={{ marginRight: "15px" }}>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Link to={`/profile/${loggedInUser._id}`} title="Account">
                    <UserAvatar
                      profilePicURL={loggedInUser.profilePicURL}
                      styleForUserAvatar={{ width: "33px", height: "33px" }}
                      styleForDefaultUserAvatar={{ fontSize: "1em" }}
                    />
                  </Link>
                  <div>{loggedInUser.name}</div>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={() => {
                  logout();
                }}
              >
                {isLoggingOut ? <Loading /> : "Logout"}
                <i className="fa-solid fa-right-from-bracket"></i>
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
