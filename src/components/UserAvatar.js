import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

const UserAvatar = ({ profilePicURL, userName, time }) => {
  const timeAgo = new TimeAgo("en-US");
  return (
    <section className="d-flex">
      <div
        className="rounded-circle border d-flex justify-content-around align-items-center"
        style={{ width: "60px", height: "60px" }}
        alt="Avatar"
      >
        {profilePicURL ? (
          <img
            className="profile-pic-img"
            src={
              process.env.NODE_ENV === "development"
                ? profilePicURL.url
                : profilePicURL.secure_url
            }
            alt="profile pic"
          />
        ) : (
          <i className="fas fa-user-alt fa-2x text-info"></i>
        )}
      </div>
      <div style={{ marginLeft: "10px" }}>
        {userName && (
          <h6 style={{ textTransform: "capitalize" }}>{userName}</h6>
        )}
        {time && (
          <p style={{ color: "gray" }}>
            {timeAgo.format(new Date(time), "twitter")}
          </p>
        )}
      </div>
    </section>
  );
};

export default UserAvatar;
