import PostList from "./PostList";
import ProfileUserAvatar from "./ProfileUserAvatar";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../providers/SessionProvider";
import MediaUpload from "./MediaUpload";
import CenterPageLoader from "./CenterPageLoader";
import { apiCall } from "../utils";
import FriendStateButton from "./FriendStateButton";
import FriendSlider from "./FriendSlider";

const Profile = () => {
  let { user_id } = useParams();
  const [user, setUser] = useState({});
  const { loggedInUser, setLoggedInUser } = useContext(SessionContext);
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await apiCall({
        url: `${process.env.REACT_APP_SERVER_END_PONT}/get_friend_list/${loggedInUser._id}`,
      });
      if (response) {
        setFriendList(response.users);
      }
    })();
  }, [loggedInUser]);

  useEffect(() => {
    (async () => {
      setIsFetchingUser(true);
      const response = await apiCall({
        url: `${process.env.REACT_APP_SERVER_END_PONT}/get_user/${user_id}`,
      });
      if (response) {
        setUser(response.user);
      }
      setIsFetchingUser(false);
    })();
  }, [user_id]);

  const onProfileUploadHandler = async (media, fieldName) => {
    const response = await apiCall({
      url: `${process.env.REACT_APP_SERVER_END_PONT}/profile_update/${loggedInUser._id}`,
      method: "POST",
      body: {
        [fieldName]: media[0],
      },
    });
    if (response) {
      setLoggedInUser({ ...loggedInUser, [fieldName]: media[0] });
    }
  };

  const getProfilePic = () => {
    return loggedInUser && loggedInUser._id === user_id
      ? loggedInUser.profilePicURL
      : user.profilePicURL;
  };

  const mainUser =
    loggedInUser && loggedInUser._id === user_id ? loggedInUser : user;
  const isDev = process.env.NODE_ENV === "development";

  if (isFetchingUser) {
    return <CenterPageLoader />;
  }

  if (!loggedInUser) {
    return null;
  }

  const isMyProfile = loggedInUser?._id === user_id;

  const isMyFriend =
    loggedInUser?.friends[user._id]?.state === "FRIEND_REQUEST_CONFIRM";

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
        {isMyProfile ? (
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
          <FriendStateButton user={user} />
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
        {(isMyProfile || (!isMyProfile && isMyFriend)) && (
          <div className="col-md-5">
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
                <i
                  className="fa-solid fa-mobile"
                  style={{ padding: "20px" }}
                ></i>
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
            {(isMyProfile || (!isMyProfile && isMyFriend)) &&
              friendList.length > 0 && (
                <div
                  style={{ marginTop: "10px", border: "1px solid lightgray" }}
                >
                  <FriendSlider
                    friendList={friendList}
                    isFriendStateButtonShow={false}
                    heading={"Friends"}
                  />
                </div>
              )}
          </div>
        )}
        {(isMyProfile || (!isMyProfile && isMyFriend)) && (
          <div className="col-md-7">
            <PostList
              isProfilePage={true}
              profilePicURL={getProfilePic()}
              userId={user_id}
            />
          </div>
        )}
        {!(isMyProfile || (!isMyProfile && isMyFriend)) && (
          <div className="complete-center" style={{ height: "100px" }}>
            <div style={{ textAlign: "center" }}>
              <div>
                <i class="fa-solid fa-6x fa-lock"></i>
              </div>
              <div>This account is locked!</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Profile;
