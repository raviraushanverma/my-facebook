import { useContext } from "react";
import { SessionContext } from "../providers/SessionProvider";
import UserAvatar from "./UserAvatar";

const FriendChatList = () => {
  const { loggedInUser } = useContext(SessionContext);
  if (!loggedInUser) {
    return null;
  }

  const friends = Object.values(loggedInUser.friends).filter((friend) => {
    return friend.state === "FRIEND_REQUEST_CONFIRM";
  });

  if (!friends.length) {
    return null;
  }

  return (
    <div className="d-none d-md-block chat-card contacts_card">
      {friends.length > 7 && (
        <div className="chat-card-header">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search Friends..."
              name=""
              className="form-control search"
            />
            <div className="d-flex">
              <span className="input-group-text search_btn">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="card-body contacts_body">
        <ul className="contacts">
          {friends.map((friend) => {
            return (
              <div key={friend.user._id}>
                <li className="online">
                  <div className="d-flex" style={{ marginTop: "7px" }}>
                    <div className="img_cont">
                      <UserAvatar profilePicURL={friend.user.profilePicURL} />
                      <span className="online_icon"></span>
                    </div>
                    <div className="user_info">
                      <div>
                        <span>
                          <h6>{friend.user.name}</h6>
                        </span>
                        <p>{friend.user.name} is online</p>
                      </div>
                    </div>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="card-footer"></div>
    </div>
  );
};

export default FriendChatList;
