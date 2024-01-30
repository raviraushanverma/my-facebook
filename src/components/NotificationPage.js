import { useContext, useEffect, useState } from "react";
import NotificationList from "./NotificationList";
import { SessionContext } from "../providers/SessionProvider";
import CenterPageLoader from "./CenterPageLoader";

const NotificationPage = () => {
  const { loggedInUser } = useContext(SessionContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    if (loggedInUser) {
      (async () => {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_END_PONT}/get_notifications/${loggedInUser._id}`
        );
        const res = await response.json();
        setLoading(false);
        setNotifications(res.notifications);
      })();
    }
  }, [loggedInUser]);

  if (loading) {
    return <CenterPageLoader />;
  }

  return (
    <div className="complete-center">
      <ul style={{ listStyle: "none" }}>
        <h4 style={{ textAlign: "center" }}>Notifications</h4>
        <hr className="dropdown-divider"></hr>
        {notifications.length === 0 && (
          <div
            className="complete-center"
            style={{ width: "100%", height: "100px" }}
          >
            You don't have any notifications!
          </div>
        )}
        <NotificationList notifications={notifications} />
      </ul>
    </div>
  );
};

export default NotificationPage;
