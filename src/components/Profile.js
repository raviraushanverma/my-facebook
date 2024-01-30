import PostList from "./PostList";
import ProfileUserAvatar from "./ProfileUserAvatar";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../providers/SessionProvider";
import MediaUpload from "./MediaUpload";
import CenterPageLoader from "./CenterPageLoader";

const Profile = () => {
  let { user_id } = useParams();
  const [user, setUser] = useState({});
  const { loggedInUser, setLoggedInUser } = useContext(SessionContext);

  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const getProfilePic = () => {
    return loggedInUser && loggedInUser._id === user_id
      ? loggedInUser.profilePicURL
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
      `${process.env.REACT_APP_SERVER_END_PONT}/profile_update/${loggedInUser._id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    serverData.json();
    setLoggedInUser({ ...loggedInUser, [fieldName]: media[0] });
  };

  const updateFriendRequest = (loginUser_id, user_id) => {
    const data = {
      loggedInUserId: loginUser_id,
      userId: user_id,
    };
    return data;
  };

  const sendFriendRequest = async () => {
    const data = {
      loggedInUserId: loggedInUser._id,
    };
    const serverData = await fetch(
      `${process.env.REACT_APP_SERVER_END_PONT}/friend_request_send/${user_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const responseData = await serverData.json();
    setUser(responseData.user);
  };

  const mainUser =
    loggedInUser && loggedInUser._id === user_id ? loggedInUser : user;
  const isDev = process.env.NODE_ENV === "development";

  if (isFetchingUser) {
    <CenterPageLoader />;
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
          <h3 className="profile-user-avatar-user-name">{user.name}</h3>
        </div>
        {loggedInUser && loggedInUser._id === user_id ? (
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
          <div>
            {/* // <button
              //   type="button"
              //   className="btn btn-primary add-friend"
              //   onClick={() => {
              //     sendFriendRequest();
              //   }}
              // >
              //   Add Friend
              // </button> */}
          </div>
        )}
      </div>
      {loggedInUser && loggedInUser._id === user_id && (
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
      <div className="row" style={{ marginTop: "96px" }}>
        <div className="col-md-3">
          <div
            style={{
              background: "white",
              marginBottom: "10px",
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
          </div>
        </div>
        <div className="col-md-6">
          <PostList
            isProfilePage={true}
            profilePicURL={getProfilePic()}
            userId={user_id}
            updateFriendRequest={updateFriendRequest()}
          />
        </div>
      </div>
    </div>
  );
};
export default Profile;
