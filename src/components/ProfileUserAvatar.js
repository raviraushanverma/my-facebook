import TimeAgo from "javascript-time-ago";

const ProfileUserAvatar = ({ profilePicURL, userName, time }) => {
  const timeAgo = new TimeAgo("en-US");
  return (
    <section className="d-flex" style={{ marginTop: "80px" }}>
      <div
        className="profile-pic-img-big-size rounded-circle border d-flex justify-content-around align-items-center"
        style={{}}
        alt="Avatar"
      >
        {profilePicURL ? (
          <img
            className="profile-pic-img-big-size"
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

export default ProfileUserAvatar;
