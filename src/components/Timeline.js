import PostList from "./PostList";
import { Link } from "react-router-dom";
import { SessionContext } from "../providers/SessionProvider";
import { useContext } from "react";
import ProfileUserAvatar from "./ProfileUserAvatar";

const Timeline = (props) => {
  const { loggedInUser } = useContext(SessionContext);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="profile-side-pannel">
            <div>
              <Link
                to={`/profile/${loggedInUser._id}`}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <ProfileUserAvatar profilePicURL={loggedInUser.profilePicURL} />
              </Link>
              <h4 style={{ textTransform: "capitalize", textAlign: "center" }}>
                {loggedInUser.name}
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <PostList
            isProfilePage={false}
            profilePicURL={loggedInUser.profilePicURL}
          />
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default Timeline;
