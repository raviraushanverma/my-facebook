import TimeAgo from "javascript-time-ago";
import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";

const NotificationList = ({ notification = [] }) => {
  const timeAgo = new TimeAgo("en-US");

  const notificationCount = notification.filter(
    (notifyObj) => notifyObj.isSeen === false
  ).length;

  return (
    <div className="dropdown">
      <button
        type="button"
        className="btn btn-light position-relative"
        id="dropdownMenu2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="fa-regular fa-bell"></i>
        {notificationCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {notificationCount}
          </span>
        )}
      </button>
      <ul
        className="dropdown-menu scrollable-menu dropdown-menu-end dropdown-menu-lg-end"
        aria-labelledby="dropdownMenu2"
        style={{ width: "350px", overflowY: "auto" }}
      >
        {notification.map((notifyObj) => {
          return (
            <li key={notifyObj.created} style={{ padding: "10px" }}>
              <div style={{ display: "flex" }}>
                <Link to={`/profile/${notifyObj.user._id}`}>
                  <UserAvatar profilePicURL={notifyObj.user.profilePicURL} />
                </Link>
                {notifyObj.action === "POST_LIKED" && (
                  <div className="complete-center">
                    <strong style={{ textTransform: "capitalize" }}>
                      {notifyObj.user.name}
                    </strong>
                    &nbsp;Likes your post
                  </div>
                )}
                {notifyObj.action === "POST_COMMENTED" && (
                  <div className="complete-center">
                    <strong style={{ textTransform: "capitalize" }}>
                      {notifyObj.user.name}
                    </strong>
                    &nbsp;commented on your post
                  </div>
                )}
                {notifyObj.action === "FRIEND_REQUEST" && (
                  <div className="complete-center">
                    <strong style={{ textTransform: "capitalize" }}>
                      {notifyObj.user.name}
                    </strong>
                    &nbsp;sent you friend request
                  </div>
                )}
              </div>
              <div style={{ color: "gray", fontSize: "11px" }}>
                {timeAgo.format(new Date(notifyObj.created))}
              </div>
              <hr className="dropdown-divider"></hr>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NotificationList;
