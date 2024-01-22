import PostList from "./PostList";
import { Link } from "react-router-dom";
import ProfileUserAvatar from "./ProfileUserAvatar";
import { getLoggedInUser } from "../utility";

const Timeline = () => {
  const user = getLoggedInUser();
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <Link to={`/profile/${user._id}`}>
            <ProfileUserAvatar />
          </Link>
        </div>
        <div className="col-md-6">
          <PostList isProfilePage={false} />
        </div>
        <div className="col-md-3">hello2</div>
      </div>
    </div>
  );
};

export default Timeline;
