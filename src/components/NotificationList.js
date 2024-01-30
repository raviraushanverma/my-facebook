import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";
import TimeAgo from "javascript-time-ago";

const NotificationList = ({ notifications }) => {
  const timeAgo = new TimeAgo("en-US");
  return (
    <>
      {notifications.map((notifyObj, index) => {
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
              {notifyObj.action === "FRIEND_REQUEST_SENT" && (
                <div className="complete-center">
                  <div>
                    <strong style={{ textTransform: "capitalize" }}>
                      {notifyObj.user.name}
                    </strong>
                    &nbsp;sent you friend request
                    <button
                      type="button"
                      className="btn btn-primary "
                      onClick={() => {}}
                    >
                      Confirm
                    </button>
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
    </>
  );
};

export default NotificationList;
