import { Link } from "react-router-dom";
import Logo from "./Logo";
import { SessionContext } from "../providers/SessionProvider";
import { useContext, useEffect } from "react";
import {
  NotificationContext,
  subscribeForServerSentEvent,
} from "../providers/NotificationProvider";
import Notification from "./Notification";

const Header = () => {
  const { loggedInUser, setLoggedInUser } = useContext(SessionContext);
  const {
    eventSource,
    setEventSource,
    notifications,
    setNotifications,
    playNotificationSound,
  } = useContext(NotificationContext);

  const logout = () => {
    setLoggedInUser(null);
  };

  useEffect(() => {
    if (eventSource && loggedInUser) {
      eventSource.onopen = function (evt) {
        console.log("SSE opened");
      };

      eventSource.onerror = function (error) {
        console.log("SSE error", error);
        // If Error, We are re-connecting to SSE
        const eventSource = subscribeForServerSentEvent(loggedInUser);
        setEventSource(eventSource);
      };

      eventSource.onmessage = (event) => {
        const mainNotificationObj = JSON.parse(event.data);
        if (mainNotificationObj) {
          playNotificationSound();
          console.log("Notification came => ", mainNotificationObj);
          setNotifications([mainNotificationObj, ...notifications]);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUser, eventSource, notifications]);

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
              <div style={{ marginRight: "12px" }}>
                <Notification
                  notifications={notifications}
                  setNotifications={setNotifications}
                />
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
