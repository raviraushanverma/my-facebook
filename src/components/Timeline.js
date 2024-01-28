import PostList from "./PostList";
import { Link } from "react-router-dom";
import { SessionContext } from "../providers/SessionProvider";
import { useContext } from "react";
import UserAvatar from "./UserAvatar";

const Timeline = (props) => {
  const [user] = useContext(SessionContext);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <Link to={`/profile/${user._id}`}>
            <UserAvatar
              profilePicURL={user.profilePicURL}
              userName={user.name}
            />
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
