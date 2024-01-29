import { Link } from "react-router-dom";
import Logo from "./Logo";
import { SessionContext } from "../providers/SessionProvider";
import { useContext, useEffect } from "react";
import { NotificationContext } from "../providers/NotificationProvider";

const Header = () => {
  const [user, setUser] = useContext(SessionContext);
  const [notification, setNotification] = useContext(NotificationContext);

  const logout = () => {
    setUser(null);
  };

  const subscribeForNotification = (user_id) => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_SERVER_END_PONT}/notification/${user_id}`
    );

    eventSource.onopen = function (evt) {
      console.log("SSE opened");
    };

    eventSource.onerror = function (error) {
      console.log("SSE error", error);
    };

    eventSource.onmessage = (event) => {
      const mainNotificationObj = JSON.parse(event.data);
      if (mainNotificationObj) {
        console.log("mainNotificationObj ", mainNotificationObj);
        setNotification(mainNotificationObj);
      }
    };

    return eventSource;
  };

  useEffect(() => {
    if (user) {
      const eventSource = subscribeForNotification(user._id);

      return () => {
        eventSource.close();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <nav
      className="navbar fixed-top navbar-expand-lg navbar-light bg-light"
      style={{ boxShadow: "rgb(0, 0, 0) 0px 4px 10px -9px" }}
    >
      <div className="container">
        <Link className="navbar-brand" to={"/"}>
          <Logo />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                {
                  Object.keys(notification).filter(
                    (key) => notification[key].isSeen === false
                  ).length
                }
                <i
                  style={{ fontSize: "30px" }}
                  className="fa-regular fa-bell"
                ></i>
              </a>
            </li>
          </ul>
          <div className="d-flex">
            {user ? (
              <>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </button>
              </>
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
      </div>
    </nav>
  );
};
export default Header;
