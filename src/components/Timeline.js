import PostList from "./PostList";
import { Link } from "react-router-dom";
import { SessionContext } from "../providers/SessionProvider";
import { useContext } from "react";
import ProfileUserAvatar from "./ProfileUserAvatar";

const Timeline = (props) => {
  const [user] = useContext(SessionContext);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="profile-side-pannel">
            <div>
              <Link to={`/profile/${user._id}`}>
                <ProfileUserAvatar profilePicURL={user.profilePicURL} />
              </Link>
              <h2 style={{ textTransform: "capitalize", textAlign: "center" }}>
                {user.name}
              </h2>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <PostList isProfilePage={false} profilePicURL={user.profilePicURL} />
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default Timeline;
