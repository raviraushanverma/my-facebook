import TimeAgo from "javascript-time-ago";
import UserAvatar from "./UserAvatar";

const NotificationList = ({ notification }) => {
  if (!notification) return null;
  const timeAgo = new TimeAgo("en-US");
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
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {
            notification.filter((notifyObj) => notifyObj.isSeen === false)
              .length
          }
        </span>
      </button>
      <ul
        className="dropdown-menu scrollable-menu dropdown-menu-end dropdown-menu-lg-end"
        aria-labelledby="dropdownMenu2"
        style={{ width: "350px", overflowY: "auto" }}
      >
        {notification.map((notifyObj) => {
          return (
            <li
              key={notifyObj.created}
              style={{ padding: "10px", textTransform: "capitalize" }}
            >
              <div style={{ display: "flex" }}>
                <UserAvatar profilePicURL={notifyObj.user.profilePicURL} />
                {notifyObj.action === "POST_LIKED" && (
                  <>
                    <strong>{notifyObj.user.name}</strong> Likes your post
                  </>
                )}
                {notifyObj.action === "POST_COMMENTED" && (
                  <>
                    <strong>{notifyObj.user.name}</strong> commented on your
                    post
                  </>
                )}
                {notifyObj.action === "FRIEND_REQUEST" && (
                  <>
                    <strong>{notifyObj.user.name}</strong> sent you friend
                    request
                  </>
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
