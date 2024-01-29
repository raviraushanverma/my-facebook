import { Link } from "react-router-dom";
import Logo from "./Logo";
import { SessionContext } from "../providers/SessionProvider";
import { useContext, useEffect } from "react";
import { NotificationContext } from "../providers/NotificationProvider";
import NotificationList from "./NotificationList";

const Header = () => {
  const [user, setUser] = useContext(SessionContext);
  const [notification, setNotification, playNotificationSound] =
    useContext(NotificationContext);

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
        playNotificationSound();
        const notificationArray = Object.values(mainNotificationObj).reverse();
        console.log("Notification came => ", notificationArray);
        setNotification(notificationArray);
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
        <div className="d-flex">
          {user ? (
            <div className="d-flex">
              <div style={{ marginRight: "12px" }}>
                <NotificationList notification={notification} />
              </div>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
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
