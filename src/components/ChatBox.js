import { useContext, useEffect, useRef, useState } from "react";
import { ActiveChatFriendContext } from "../providers/ActiveChatFriendProvider";
import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";
import { SessionContext } from "../providers/SessionProvider";
import { WebsocketContext } from "../providers/WebsocketProvider";
import { ActiveChatMessageContext } from "../providers/ActiveChatMessageProvider";
import TimeAgo from "javascript-time-ago";

const ChatBox = () => {
  const timeAgo = new TimeAgo("en-US");
  const inputRef = useRef();
  const { socket, friends } = useContext(WebsocketContext);
  const { loggedInUser } = useContext(SessionContext);
  const [textMessage, setTextMessage] = useState("");
  const { activeChatFriendId, setActiveChatFriendId } = useContext(
    ActiveChatFriendContext
  );
  const { activeChatMessages, setActiveChatMessages, isChatLoading } =
    useContext(ActiveChatMessageContext);
  const chatContainer = useRef();

  useEffect(() => {
    chatContainer?.current?.scrollIntoView({
      block: "end",
      behavior: "smooth",
    });
  }, [activeChatMessages]);

  useEffect(() => {
    if (activeChatFriendId) {
      inputRef?.current?.focus();
    }
  }, [activeChatFriendId]);

  useEffect(() => {
    if (socket) {
      socket.on("receive-message", (data) => {
        const temp = [...activeChatMessages];
        temp.push(data);
        setActiveChatMessages(temp);
        if (!activeChatFriendId) {
          setActiveChatFriendId(data.from);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChatFriendId, activeChatMessages, socket]);

  const sendMessage = () => {
    if (socket && activeChatFriendId && loggedInUser) {
      const time = Date.now();
      const msgObj = {
        to: activeChatFriendId,
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

  const currentUser = friends.get(activeChatFriendId);

  if (!loggedInUser || !socket || !activeChatFriendId || !currentUser) {
    return null;
  }

  return (
    <div className="card chat-box">
      <div className="card-header msg_head">
        <div className="d-flex bd-highlight">
          <div className="d-flex">
            <div className="img_cont">
              <Link to={`/profile/${currentUser._id}`} title="Account">
                <UserAvatar profilePicURL={currentUser.profilePicURL} />
                <span
                  className={`status_icon ${
                    currentUser.isOnline ? "online" : ""
                  }`}
                ></span>
              </Link>
              <span className="online_icon" />
            </div>
            <div className="user_info">
              <span> &nbsp; {currentUser.name}</span>
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
                setActiveChatFriendId(null);
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
                            to={`/profile/${currentUser._id}`}
                            title="Account"
                          >
                            <UserAvatar
                              profilePicURL={currentUser.profilePicURL}
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
