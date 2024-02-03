import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";
import TimeAgo from "javascript-time-ago";
import { acceptFriendRequest } from "../utils";

const NotificationList = ({ notifications, loggedInUser, setLoggedInUser }) => {
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
              <div style={{ marginRight: "10px" }}>
                <Link to={`/profile/${notifyObj.user._id}`}>
                  <UserAvatar profilePicURL={notifyObj.user.profilePicURL} />
                </Link>
              </div>
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
              {notifyObj.action === "FRIEND_REQUEST_CAME" && (
                <div className="complete-center">
                  <div>
                    <strong style={{ textTransform: "capitalize" }}>
                      {notifyObj.user.name}
                    </strong>
                    &nbsp;sent you friend request&nbsp;
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={async () => {
                        const res = await acceptFriendRequest(
                          loggedInUser._id,
                          notifyObj.user._id
                        );
                        if (res) {
                          setLoggedInUser(res.loggedInUser);
                        }
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
              {notifyObj.action === "FRIEND_REQUEST_ACCEPTED" && (
                <div className="complete-center">
                  <div>
                    <strong style={{ textTransform: "capitalize" }}>
                      {notifyObj.user.name}
                    </strong>
                    &nbsp;accepted your friend request&nbsp;
                  </div>
                </div>
              )}
              {notifyObj.action === "UNFRIEND" && (
                <div className="complete-center">
                  <div>
                    <strong style={{ textTransform: "capitalize" }}>
                      {notifyObj.user.name}
                    </strong>
                    &nbsp;unfriend you!
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
