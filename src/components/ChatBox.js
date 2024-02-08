import { useContext, useEffect, useRef, useState } from "react";
import { ActiveChatFriendContext } from "../providers/ActiveChatFriendProvider";
import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";
import { SessionContext } from "../providers/SessionProvider";
import { WebsocketContext } from "../providers/WebsocketProvider";
import { ActiveChatMessageContext } from "../providers/ActiveChatMessageProvider";
import { OnlineUserContext } from "../providers/OnlineUserProvider";
import TimeAgo from "javascript-time-ago";

const ChatBox = () => {
  const timeAgo = new TimeAgo("en-US");
  const inputRef = useRef();
  const { socket } = useContext(WebsocketContext);
  const { loggedInUser } = useContext(SessionContext);
  const [textMessage, setTextMessage] = useState("");
  const { activeChatFriend, setActiveChatFriend } = useContext(
    ActiveChatFriendContext
  );
  const { activeChatMessages, setActiveChatMessages, isChatLoading } =
    useContext(ActiveChatMessageContext);
  const { friends } = useContext(OnlineUserContext);
  const chatContainer = useRef();

  useEffect(() => {
    chatContainer?.current?.scrollIntoView({
      block: "end",
      behavior: "smooth",
    });
  }, [activeChatMessages]);

  useEffect(() => {
    if (activeChatFriend) {
      inputRef?.current?.focus();
    }
  }, [activeChatFriend]);

  useEffect(() => {
    if (socket) {
      socket.on("on-message", ({ userId, message }) => {
        console.log("on-meesage", userId, message);
      });

      socket.on("receive-message", (data) => {
        const temp = [...activeChatMessages];
        temp.push(data);
        setActiveChatMessages(temp);
        if (!activeChatFriend) {
          const tempFriend = friends.find((friend) => {
            return friend._id === data.from;
          });
          setActiveChatFriend(tempFriend);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChatFriend, activeChatMessages, friends, socket]);

  const sendMessage = () => {
    if (socket && activeChatFriend && loggedInUser) {
      const time = Date.now();
      const msgObj = {
        to: activeChatFriend._id,
        from: loggedInUser._id,
        message: textMessage,
        time,
      };
      socket.emit("send-message", msgObj);
      const temp = [...activeChatMessages];
      temp.push(msgObj);
      setActiveChatMessages(temp);
      setTextMessage("");
    }
  };

  if (!loggedInUser || !socket || !activeChatFriend) {
    return null;
  }

  return (
    <div className="card chat-box">
      <div className="card-header msg_head">
        <div className="d-flex bd-highlight">
          <div className="d-flex">
            <div className="img_cont">
              <Link to={`/profile/${activeChatFriend._id}`} title="Account">
                <UserAvatar profilePicURL={activeChatFriend.profilePicURL} />
                <span
                  className={`status_icon ${
                    activeChatFriend.isOnline ? "online" : ""
                  }`}
                ></span>
              </Link>
              <span className="online_icon" />
            </div>
            <div className="user_info">
              <span> &nbsp; {activeChatFriend.name}</span>
            </div>
          </div>
          <div className="video_cam">
            <span>
              <i className="fa-solid fa-gun"></i>
            </span>
            <span>
              <i className="fas fa-video" />
            </span>
            <span>
              <i className="fas fa-phone" />
            </span>
          </div>
          <div className="chat-box-close-button">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                setActiveChatFriend(null);
              }}
            ></button>
          </div>
        </div>
      </div>
      <div
        className={`card-body msg_card_body ${
          isChatLoading || !activeChatMessages.length
            ? "complete-center gray-out"
            : ""
        }`}
      >
        <div ref={chatContainer}>
          <>
            {isChatLoading ? (
              "Loading..."
            ) : (
              <>
                {!activeChatMessages.length && "There are no conversations"}
                {activeChatMessages.map((chat) => {
                  if (chat.from === loggedInUser._id) {
                    return (
                      <div
                        key={chat.time}
                        className="d-flex justify-content-end mb-4"
                      >
                        <div className="msg_cotainer_send">
                          {chat.message}
                          <span className="msg_time_send">
                            {timeAgo.format(new Date(chat.time))}
                          </span>
                        </div>
                        <div className="img_cont_msg">
                          <Link
                            to={`/profile/${loggedInUser._id}`}
                            title="Account"
                          >
                            <UserAvatar
                              profilePicURL={loggedInUser.profilePicURL}
                              styleForUserAvatar={{
                                width: "33px",
                                height: "33px",
                              }}
                              styleForDefaultUserAvatar={{ fontSize: "1em" }}
                            />
                          </Link>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={chat.time}
                        className="d-flex justify-content-start mb-4"
                      >
                        <div className="img_cont_msg">
                          <Link
                            to={`/profile/${activeChatFriend._id}`}
                            title="Account"
                          >
                            <UserAvatar
                              profilePicURL={activeChatFriend.profilePicURL}
                              styleForUserAvatar={{
                                width: "33px",
                                height: "33px",
                              }}
                              styleForDefaultUserAvatar={{ fontSize: "1em" }}
                            />
                          </Link>
                        </div>
                        <div className="msg_cotainer">
                          {chat.message}
                          <span className="msg_time">
                            {timeAgo.format(new Date(chat.time))}
                          </span>
                        </div>
                      </div>
                    );
                  }
                })}
              </>
            )}
          </>
        </div>
      </div>
      <div className="card-footer">
        <form
          className="input-group"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <input
            className="form-control type_msg"
            placeholder="Type your message..."
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            ref={inputRef}
          />
          <div className="input-group-append">
            <button className="input-group-text send_btn" type="submit">
              <i className="fas fa-location-arrow" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
