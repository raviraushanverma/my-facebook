import PostList from "./PostList";
import ProfileUserAvatar from "./ProfileUserAvatar";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../providers/SessionProvider";
import MediaUpload from "./MediaUpload";
import Loading from "./Loading";

const Profile = () => {
  let { user_id } = useParams();
  const [user, setUser] = useState({});
  const [loginUser, setLoginUser] = useContext(SessionContext);
  const [addFriend, setAddFriend] = useState(true);
  const [isFetchingUser, setIsFetchingUser] = useState(true);

  const getProfilePic = () => {
    return loginUser && loginUser._id === user_id
      ? loginUser.profilePicURL
      : user.profilePicURL;
  };

  useEffect(() => {
    setIsFetchingUser(true);
    async function fetchData() {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_END_PONT}/get_user/${user_id}`
      );
      const responseData = await response.json();
      setUser(responseData.user);
      setIsFetchingUser(false);
    }
    fetchData();
  }, [user_id]);

  const onProfileUploadHandler = async (media, fieldName) => {
    const data = {
      [fieldName]: media[0],
    };
    const serverData = await fetch(
      `${process.env.REACT_APP_SERVER_END_PONT}/profile_update/${loginUser._id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    serverData.json();
    setLoginUser({ ...loginUser, [fieldName]: media[0] });
  };

  const sendFriendRequest = async () => {
    const data = {
      loggedInUserId: loginUser._id,
    };
    const serverData = await fetch(
      `${process.env.REACT_APP_SERVER_END_PONT}/friend_request/${user_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    serverData.json();
  };

  const mainUser = loginUser && loginUser._id === user_id ? loginUser : user;
  const isDev = process.env.NODE_ENV === "development";

  if (isFetchingUser) {
    return (
      <div
        className="complete-center"
        style={{ height: "60vh", width: "100vw" }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="profile-banner">
        {mainUser.banner && (
          <img
            src={isDev ? mainUser.banner.url : mainUser.banner.secure_url}
            alt="banner"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        )}
        <div className="profile-user-avatar">
          <ProfileUserAvatar profilePicURL={getProfilePic()} />
          <h1 className="profile-user-avatar-user-name">{user.name}</h1>
        </div>

        {loginUser && loginUser._id === user_id ? (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              color: "white",
              background: "black",
              padding: "10px",
            }}
          >
            <MediaUpload
              onSuccessUpload={(media) => {
                onProfileUploadHandler(media, "banner");
              }}
              isMultiple={false}
            >
              <i
                className="fa-solid fa-camera"
                style={{
                  fontSize: "30px",
                  cursor: "pointer",
                }}
              ></i>
            </MediaUpload>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-primary add-friend"
            onClick={() => {
              if (addFriend === true) {
                sendFriendRequest();
                setAddFriend(false);
              } else {
                setAddFriend(true);
              }
            }}
          >
            Add Friend
          </button>
        )}
      </div>
      {loginUser && loginUser._id === user_id && (
        <MediaUpload
          onSuccessUpload={(media) => {
            onProfileUploadHandler(media, "profilePicURL");
          }}
          isMultiple={false}
        >
          <i
            className="fa-solid fa-camera"
            style={{
              fontSize: "30px",
              cursor: "pointer",
            }}
          ></i>
        </MediaUpload>
      )}
      <div className="row" style={{ marginTop: "60px" }}>
        <div className="col-md-3">
          <div
            style={{
              background: "white",
            }}
          >
            <div style={{ textTransform: "capitalize" }}>
              <i
                className="fa-solid fa-signature"
                style={{ padding: "20px" }}
              ></i>
              {user.name}
            </div>
            <div>
              <i className="fa-solid fa-mobile" style={{ padding: "20px" }}></i>
              {user.mobileNumber}
            </div>
            <div>
              <i
                className="fa-solid fa-calendar-days"
                style={{ padding: "20px" }}
              ></i>
              {new Date(user.birth).toDateString()}
            </div>
            <div>
              <i
                className="fa-regular fa-envelope"
                style={{ padding: "20px" }}
              ></i>
              {user.email}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <PostList
            isProfilePage={true}
            profilePicURL={getProfilePic()}
            userId={user_id}
          />
        </div>
      </div>
    </div>
  );
};
export default Profile;
