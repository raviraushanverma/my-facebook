import PostList from "./PostList";
import ProfileUserAvatar from "./ProfileUserAvatar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = (props) => {
  let { user_id } = useParams();
  const [user, setUser] = useState({});

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

  return (
    <div className="container">
      <ProfileUserAvatar />
      <div className="row">
        <div className="col-md-3">
          <div>
            <div>{user.name}</div>
            <div>{user.mobileNumber}</div>
            <div>{new Date(user.birth).toDateString()}</div>
            <div>{user.email}</div>
            <div>{user.name}</div>
          </div>
        </div>
        <div className="col-md-6">
          <PostList isProfilePage={true} userId={user_id} />
        </div>
        <div className="col-md-3">hello2</div>
      </div>
    </div>
  );
};
export default Profile;
