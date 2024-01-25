import PostList from "./PostList";
import ProfileUserAvatar from "./ProfileUserAvatar";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../providers/SessionProvider";
import MediaUpload from "./MediaUpload";

const Profile = () => {
  let { user_id } = useParams();
  const [user, setUser] = useState({});
  const [loginUser, setLoginUser] = useContext(SessionContext);

  const getProfilePic = () => {
    return loginUser._id === user_id
      ? loginUser.profilePicURL
      : user.profilePicURL;
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_END_PONT}/get_user/${user_id}`
      );
      const responseData = await response.json();
      setUser(responseData.user);
    }
    fetchData();
  }, [user_id]);

  const onProfileUploadHandler = async (media) => {
    const data = {
      profilePicURL: media[0],
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
    setLoginUser({ ...loginUser, profilePicURL: media[0] });
  };

  return (
    <div className="container">
      <ProfileUserAvatar profilePicURL={getProfilePic()} userId={user._id} />
      {loginUser._id === user_id && (
        <MediaUpload
          onSuccessUpload={onProfileUploadHandler}
          isMultiple={false}
        >
          <i className="fa-solid fa-camera" style={{ marginLeft: "60px" }}></i>
        </MediaUpload>
      )}
      <div className="row">
        <div className="col-md-3">
          <div
            style={{
              border: "1px solid black",
              marginTop: "40px",
              background: "white",
            }}
          >
            <div>
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
