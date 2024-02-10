import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";
import { acceptFriendRequest } from "../utils";
import TimeAgo from "javascript-time-ago";
import { useContext } from "react";
import { ActiveChatFriendContext } from "../providers/ActiveChatFriendProvider";

const NotificationList = ({ notifications, loggedInUser, setLoggedInUser }) => {
  const timeAgo = new TimeAgo("en-US");

  const { setActiveChatFriendId } = useContext(ActiveChatFriendContext);

  const onAcceptFriendRequest = async (userId) => {
    const res = await acceptFriendRequest(loggedInUser._id, userId);
    if (res) {
      setLoggedInUser(res.loggedInUser);
    }
  };

  const filterNotifications = [];

  notifications.forEach((notifyObj) => {
    if (notifyObj.user) {
      if (notifyObj.action === "POST_LIKED" && notifyObj.post) {
        filterNotifications.push({
          ...notifyObj,
          children: (
            <>
              &nbsp;Likes your{" "}
              <Link
                className="post-highlight"
                to={`/post/${notifyObj.post._id}`}
              >
                post
              </Link>
            </>
          ),
        });
      } else if (notifyObj.action === "POST_COMMENTED" && notifyObj.post) {
        filterNotifications.push({
          ...notifyObj,
          children: (
            <>
              &nbsp;commented on your&nbsp;
              <Link
                className="post-highlight"
                to={`/post/${notifyObj.post._id}/#${notifyObj.comment}`}
              >
                post
              </Link>
            </>
          ),
        });
      } else if (notifyObj.action === "FRIEND_REQUEST_CAME") {
        filterNotifications.push({
          ...notifyObj,
          children: (
            <>
              &nbsp;sent you friend request&nbsp;
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={async () => {
                  onAcceptFriendRequest(notifyObj.user._id);
                }}
              >
                Confirm
              </button>
            </>
          ),
        });
      } else if (notifyObj.action === "FRIEND_REQUEST_ACCEPTED") {
        filterNotifications.push({
          ...notifyObj,
          children: <>&nbsp;accepted your friend request&nbsp;</>,
        });
      } else if (notifyObj.action === "UNFRIEND") {
        filterNotifications.push({
          ...notifyObj,
          children: <>&nbsp;unfriend you!</>,
        });
      } else if (notifyObj.action === "CHAT_MESSAGE") {
        filterNotifications.push({
          ...notifyObj,
          children: (
            <>
              &nbsp;
              <span
                className="post-highlight"
                onClick={() => {
                  setActiveChatFriendId(notifyObj.user._id);
                }}
              >
                messaged
              </span>{" "}
              you!
            </>
          ),
        });
      }
    }
  });

  return (
    <>
      {filterNotifications.map((notifyObj, index) => {
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
              <div className="complete-center">
                <div>
                  <strong style={{ textTransform: "capitalize" }}>
                    {notifyObj.user.name}
                  </strong>
                  {notifyObj.children}
                </div>
              </div>
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
