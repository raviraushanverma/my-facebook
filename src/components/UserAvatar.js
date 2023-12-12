const UserAvatar = (props) => {
  return (
    <div
      className="rounded-circle border d-flex justify-content-center align-items-center"
      style={{ width: "60px", height: "60px" }}
      alt="Avatar"
    >
      {props.profilePicURL ? (
        <img
          className="profile-pic-img"
          src={props.profilePicURL}
          alt="profile pic"
        />
      ) : (
        <i className="fas fa-user-alt fa-2x text-info"></i>
      )}
    </div>
  );
};

export default UserAvatar;
