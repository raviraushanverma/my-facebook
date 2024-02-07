import PostList from "./PostList";
import { Link } from "react-router-dom";
import { SessionContext } from "../providers/SessionProvider";
import { useContext, useState } from "react";
import ProfileUserAvatar from "./ProfileUserAvatar";
import { PostContext } from "../providers/PostProvider";
import FriendSuggestionList from "./FriendSuggestionList";
import FriendChatList from "./FriendChatList";

const Timeline = () => {
  const { loggedInUser, isPostListLoading } = useContext(SessionContext);
  const { postList } = useContext(PostContext);
  const [isChatListDisplay, setIsChatListDisplay] = useState(false);
  if (!loggedInUser) {
    return null;
  }
  return (
    <div className="container-fluid">
      <i
        className="d-block d-md-none chat-buuble-mobile btn-circular fa-regular fa-comment"
        onClick={() => {
          setIsChatListDisplay(!isChatListDisplay);
        }}
      ></i>
      <div className="row">
        <div className="col-md-3">
          <div className="left-side-pannel">
            <div>
              <div
                className="d-none d-md-block"
                style={{ marginBottom: "50px" }}
              >
                <Link
                  to={`/profile/${loggedInUser._id}`}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <ProfileUserAvatar
                    profilePicURL={loggedInUser.profilePicURL}
                  />
                </Link>
                <h4
                  style={{ textTransform: "capitalize", textAlign: "center" }}
                >
                  {loggedInUser.name}
                </h4>
              </div>
              <div>
                {!isPostListLoading && postList.length > 0 && (
                  <FriendSuggestionList />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <PostList
            isProfilePage={false}
            profilePicURL={loggedInUser.profilePicURL}
          />
        </div>
        <div
          className={`${
            isChatListDisplay ? "col-md-12" : "d-none d-md-block col-md-3"
          }`}
        >
          <FriendChatList />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
