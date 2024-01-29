import TimeAgo from "javascript-time-ago";
import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";
import { SessionContext } from "../providers/SessionProvider";
import { useContext } from "react";

const NotificationList = ({ notification = [], setNotification }) => {
  const timeAgo = new TimeAgo("en-US");
  const [user] = useContext(SessionContext);

  const unreadNotifications = notification.filter(
    (notifyObj) => notifyObj.isSeen === false
  );

  const notficationSeen = async () => {
    if (unreadNotifications.length > 0) {
      const serverData = await fetch(
        `${process.env.REACT_APP_SERVER_END_PONT}/notfication_seen/${user._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ unreadNotifications }),
        }
      );
      await serverData.json();
      const temp = notification.map((notify) => {
        return {
          ...notify,
          isSeen: true,
        };
      });
      setNotification(temp);
    }
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-light position-relative"
        id="dropdownMenu2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={() => {
          notficationSeen();
        }}
      >
        <i className="fa-regular fa-bell"></i>
        {unreadNotifications.length > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {unreadNotifications.length}
          </span>
        )}
      </button>
      <ul
        className="dropdown-menu scrollable-menu dropdown-menu-end dropdown-menu-lg-end"
        aria-labelledby="dropdownMenu2"
        style={{
          width: "350px",
          overflowY: "auto",
          marginRight: "-87px",
          boxShadow:
            "0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        <h4 style={{ textAlign: "center" }}>Notifications</h4>
        <hr className="dropdown-divider"></hr>
        {notification.map((notifyObj, index) => {
          return (
            <li
              key={notifyObj.created}
              style={{ paddingLeft: "10px", paddingRight: "10px" }}
            >
              {index !== 0 && <hr className="dropdown-divider"></hr>}
              <div style={{ display: "flex" }}>
                <Link to={`/profile/${notifyObj.user._id}`}>
                  <UserAvatar profilePicURL={notifyObj.user.profilePicURL} />
                </Link>
                {notifyObj.action === "POST_LIKED" && (
                  <div className="complete-center">
                    <div>
                      <strong style={{ textTransform: "capitalize" }}>
                        {notifyObj.user.name}
                      </strong>
                      &nbsp;Likes your post
                    </div>
                  </div>
                )}
                {notifyObj.action === "POST_COMMENTED" && (
                  <div className="complete-center">
                    <div>
                      <strong style={{ textTransform: "capitalize" }}>
                        {notifyObj.user.name}
                      </strong>
                      &nbsp;commented on your post
                    </div>
                  </div>
                )}
                {notifyObj.action === "FRIEND_REQUEST" && (
                  <div className="complete-center">
                    <div>
                      <strong style={{ textTransform: "capitalize" }}>
                        {notifyObj.user.name}
                      </strong>
                      &nbsp;sent you friend request
                    </div>
                  </div>
                )}
              </div>
              <div style={{ color: "gray", fontSize: "11px" }}>
                {timeAgo.format(new Date(notifyObj.created))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NotificationList;
