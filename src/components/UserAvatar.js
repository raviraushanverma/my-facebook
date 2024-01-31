import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

const UserAvatar = ({
  profilePicURL,
  userName,
  time,
  styleForUserAvatar = {
    width: "60px",
    height: "60px",
  },
  styleForDefaultUserAvatar = {
    fontSize: "2em",
  },
}) => {
  const timeAgo = new TimeAgo("en-US");
  const isDev = process.env.NODE_ENV === "development";
  return (
    <section className="d-flex">
      <div
        className="rounded-circle border d-flex justify-content-around align-items-center"
        alt="Avatar"
        style={styleForUserAvatar}
      >
        {profilePicURL ? (
          <img
            style={styleForUserAvatar}
            className="profile-pic-img"
            src={isDev ? profilePicURL.url : profilePicURL.secure_url}
            alt="profile pic"
          />
        ) : (
          <i
            style={styleForDefaultUserAvatar}
            className="fas fa-user-alt text-info"
          ></i>
        )}
      </div>
      {(userName || time) && (
        <div style={{ marginLeft: "10px" }}>
          {userName && (
            <h6 style={{ textTransform: "capitalize" }}>{userName}</h6>
          )}
          {time && (
            <p style={{ color: "gray" }}>{timeAgo.format(new Date(time))}</p>
          )}
        </div>
      )}
    </section>
  );
};

export default UserAvatar;
