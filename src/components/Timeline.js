import PostList from "./PostList";
import { Link } from "react-router-dom";
import ProfileUserAvatar from "./ProfileUserAvatar";
import { SessionContext } from "../providers/SessionProvider";
import { useContext } from "react";

const Timeline = (props) => {
  const [user] = useContext(SessionContext);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <Link to={`/profile/${user._id}`}>
            <ProfileUserAvatar profilePicURL={user.profilePicURL} />
          </Link>
        </div>
        <div className="col-md-6">
          <PostList isProfilePage={false} profilePicURL={user.profilePicURL} />
        </div>
        <div className="col-md-3">hello2</div>
      </div>
    </div>
  );
};

export default Timeline;
