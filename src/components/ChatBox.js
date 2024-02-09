import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ActiveChatFriendContext } from "../providers/ActiveChatFriendProvider";
import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";
import { SessionContext } from "../providers/SessionProvider";
import { WebsocketContext } from "../providers/WebsocketProvider";
import { ActiveChatMessageContext } from "../providers/ActiveChatMessageProvider";
import TimeAgo from "javascript-time-ago";

let gunFiringEventHandler = null;

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
  const [isGunModeOn, setIsGunModeOn] = useState(false);
  const gunContainer = useRef();
  const [isScreenBroken, setIsScreenBroken] = useState(false);

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

  const onMessageReceived = useCallback(
    (data) => {
      if (!activeChatFriendId) {
        setActiveChatFriendId(data.from);
      } else {
        const temp = [...activeChatMessages];
        temp.push(data);
        setActiveChatMessages(temp);
      }
    },
    [
      activeChatFriendId,
      activeChatMessages,
      setActiveChatFriendId,
      setActiveChatMessages,
    ]
  );

  const onGunShootReceived = useCallback(
    (data) => {
      if (!activeChatFriendId) {
        setActiveChatFriendId(data.from);
      }
      setIsScreenBroken(true);
      const timer = setTimeout(() => {
        setIsScreenBroken(false);
      }, 5000);
      console.log("hello .. received gun shoot");
      return () => {
        clearTimeout(timer);
      };
    },
    [activeChatFriendId, setActiveChatFriendId]
  );

  useEffect(() => {
    if (socket) {
      socket.on("receive-message", onMessageReceived);
      socket.on("receive-gun-shoot", onGunShootReceived);
    }
    return () => {
      socket.off("receive-message", onMessageReceived);
      socket.off("receive-gun-shoot", onGunShootReceived);
    };
  }, [
    activeChatFriendId,
    activeChatMessages,
    onGunShootReceived,
    onMessageReceived,
    socket,
  ]);

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

  useEffect(() => {
    if (isGunModeOn) {
      const gunSpace = document.getElementById("gun-space");
      const canvas = document.createElement("canvas");
      gunSpace.appendChild(canvas);
      canvas.setAttribute("id", "gun");
      const ctx = canvas.getContext("2d");

      let rect = gunContainer.current.getBoundingClientRect();
      const ctxX = Math.floor(rect.width - 4);
      const ctxY = Math.floor(rect.height - 4);

      // Settings
      canvas.width = ctxX;
      canvas.height = ctxY;

      ctx.imageSmoothingEnabled = false;

      // Gun Props
      let properties = {
        ctx: ctx,
        width: ctxX,
        height: ctxY,
        image: "https://images2.imgbox.com/c2/91/ibBtxOym_o.png",
        weight: 3.4,
        rateOfFire: 600,
        recoil: 40,
        barrelCoordenate: {
          x: 235,
          y: -20,
        },
        onShoot: () => {
          console.log("firing.... ");
          socket.emit("send-gun-shoot", {
            to: activeChatFriendId,
            from: loggedInUser._id,
          });
        },
      };
      const gun = new window.Gun(properties);
      gun.animate();
      gunFiringEventHandler = gun.onFiring;
    }
    return () => {
      document.removeEventListener("mousedown", gunFiringEventHandler);
    };
  }, [activeChatFriendId, isGunModeOn, loggedInUser._id, socket]);

  const stopShooting = () => {
    window.removeEventListener("mousedown", gunFiringEventHandler);
    setIsGunModeOn(false);
    var gun = document.getElementById("gun");
    gun.parentNode.removeChild(gun);
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
            <span
              onClick={() => {
                setIsGunModeOn(!isGunModeOn);
              }}
            >
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
        ref={gunContainer}
        className={`card-body msg_card_body ${
          isChatLoading || !activeChatMessages.length
            ? "complete-center gray-out"
            : ""
        }`}
      >
        {isGunModeOn ? (
          <div id="gun-space"></div>
        ) : (
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
                                styleForDefaultUserAvatar={{
                                  fontSize: "1em",
                                }}
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
                                styleForDefaultUserAvatar={{
                                  fontSize: "1em",
                                }}
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
        )}
      </div>
      {!isGunModeOn ? (
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
      ) : (
        <div className="complete-center" style={{ marginBottom: "6%" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={stopShooting}
          >
            Stop Shooting to {currentUser.name}
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
