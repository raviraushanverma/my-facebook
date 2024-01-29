import TimeAgo from "javascript-time-ago";

const ProfileUserAvatar = ({ profilePicURL, userName, time }) => {
  const timeAgo = new TimeAgo("en-US");
  const isDev = process.env.NODE_ENV === "development";
  return (
    <section className="d-flex">
      <div alt="Avatar">
        {profilePicURL ? (
          <img
            className="profile-pic-img-big-size"
            src={isDev ? profilePicURL.url : profilePicURL.secure_url}
            alt="profile pic"
            style={{ border: "2px solid white" }}
          />
        ) : (
          <div
            style={{
              height: "150px",
              width: "150px",
              borderRadius: "50%",
              border: "2px solid white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
            }}
          >
            <i className="fas fa-user-alt fa-2x text-info"></i>
          </div>
        )}
      </div>
      <div style={{ marginLeft: "10px" }}>
        {userName && <h6 style={{ textTransform: "capitalize" }}>{}</h6>}
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
