import { useContext } from "react";
import { SessionContext } from "../providers/SessionProvider";
import UserAvatar from "./UserAvatar";

const FriendChatList = () => {
  const { loggedInUser } = useContext(SessionContext);
  if (!loggedInUser) {
    return null;
  }

  return (
    <div className="d-none d-md-block chat-card contacts_card">
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
      <div className="card-body contacts_body">
        <ul className="contacts">
          {Object.values(loggedInUser.friends).map((friend) => {
            return (
              <div key={friend.user._id}>
                {friend.state === "FRIEND_REQUEST_CONFIRM" && (
                  <li className="online">
                    <div className="d-flex" style={{ marginTop: "7px" }}>
                      <div className="img_cont">
                        <UserAvatar profilePicURL={friend.user.profilePicURL} />
                        <span className="online_icon"></span>
                      </div>
                      <div className="user_info">
                        <span>
                          <h6>{friend.user.name}</h6>
                        </span>
                        <p>{friend.user.name} is online</p>
                      </div>
                    </div>
                  </li>
                )}
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
