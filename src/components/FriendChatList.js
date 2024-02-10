import { useContext } from "react";
import { SessionContext } from "../providers/SessionProvider";
import UserAvatar from "./UserAvatar";
import { ActiveChatFriendContext } from "../providers/ActiveChatFriendProvider";
import { WebsocketContext } from "../providers/WebsocketProvider";
import TimeAgo from "javascript-time-ago";

const FriendChatList = () => {
  const timeAgo = new TimeAgo("en-US");
  const { setActiveChatFriendId } = useContext(ActiveChatFriendContext);
  const { loggedInUser } = useContext(SessionContext);
  const { friends } = useContext(WebsocketContext);

  if (!loggedInUser || !friends.size) {
    return null;
  }

  return (
    <div className="chat-card contacts_card">
      {friends.size > 7 && (
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
          {[...friends.values()].map((friend) => {
            return (
              <li
                key={friend._id}
                className="friend-list-item"
                onClick={() => {
                  setActiveChatFriendId(friend._id);
                }}
              >
                <div className="d-flex" style={{ marginTop: "7px" }}>
                  <div className="img_cont">
                    <UserAvatar profilePicURL={friend.profilePicURL} />
                    <span
                      className={`status_icon ${
                        friend.isOnline ? "online" : ""
                      }`}
                    ></span>
                  </div>
                  <div className="user_info">
                    <div>
                      <span>
                        <h6>{friend.name}</h6>
                      </span>
                      <p>
                        {friend.isOnline
                          ? " Online"
                          : !!friend.lastLoggedInTime && (
                              <small>
                                Last Login{" "}
                                {timeAgo.format(
                                  new Date(friend.lastLoggedInTime)
                                )}
                              </small>
                            )}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="card-footer"></div>
    </div>
  );
};

export default FriendChatList;
