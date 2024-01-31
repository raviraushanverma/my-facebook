import { useContext, useEffect, useState } from "react";
import NotificationList from "./NotificationList";
import { SessionContext } from "../providers/SessionProvider";
import CenterPageLoader from "./CenterPageLoader";
import { getNotifications } from "../utils";

const NotificationPage = () => {
  const { loggedInUser } = useContext(SessionContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    if (loggedInUser) {
      (async () => {
        setLoading(true);
        const res = await getNotifications(loggedInUser._id);
        if (res) {
          setNotifications(res.notifications);
        }
        setLoading(false);
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
        <NotificationList
          notifications={notifications}
          loggedInUser={loggedInUser}
        />
      </ul>
    </div>
  );
};

export default NotificationPage;
