import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  SessionContext,
  getLoggedInUserFromLocalStorage,
} from "./SessionProvider";
import io from "socket.io-client";

export const WebsocketContext = createContext();

export const updateFriendList = (
  friendsMapObj,
  otherUserIds,
  isOnlineFlag,
  lastLoggedInTime
) => {
  const users = [...friendsMapObj.values()].reduce((acc, user) => {
    const userObj = { ...user };
    if (otherUserIds.includes(user._id)) {
      userObj.lastLoggedInTime = lastLoggedInTime ?? user.lastLoggedInTime;
      userObj.isOnline = isOnlineFlag;
    }
    acc.set(`${user._id}`, userObj);
    return acc;
  }, new Map());
  return new Map([...users].sort((a, b) => b[1].isOnline - a[1].isOnline));
};

export const subscribeForWebsocket = () => {
  const loggedInUser = getLoggedInUserFromLocalStorage();
  if (loggedInUser) {
    return io(`${process.env.REACT_APP_SERVER_END_PONT}`);
  }
};

const WebsocketProvider = (props) => {
  const { loggedInUser } = useContext(SessionContext);
  const [socket, setSocket] = useState(null);
  const [friends, setFriends] = useState(new Map());
  const [alreadyOnlineUsers, setAlreadyOnlineUsers] = useState([]);

  const allAlreadyOnlineUserListener = useCallback((userIds) => {
    setAlreadyOnlineUsers(userIds);
  }, []);

  useEffect(() => {
    socket?.on("all-connected-users", allAlreadyOnlineUserListener);
    return () => {
      socket?.off("all-connected-users", allAlreadyOnlineUserListener);
    };
  }, [allAlreadyOnlineUserListener, socket]);

  useEffect(() => {
    if (loggedInUser) {
      const temp = Object.values(loggedInUser.friends).reduce(
        (acc, element) => {
          if (element.state === "FRIEND_REQUEST_CONFIRM") {
            acc.set(`${element.user._id}`, {
              ...element.user,
              isOnline: false,
            });
          }
          return acc;
        },
        new Map()
      );
      const friendListTemp = updateFriendList(temp, alreadyOnlineUsers, true);
      setFriends(friendListTemp);
    }
  }, [alreadyOnlineUsers, loggedInUser]);

  useEffect(() => {
    const webSocket = subscribeForWebsocket();
    if (webSocket) {
      setSocket(webSocket);
    }
    return () => {
      if (webSocket) {
        webSocket.close();
        setSocket(null);
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      const loggedInUser = getLoggedInUserFromLocalStorage();
      socket.emit("user-connected", loggedInUser._id);
    }
    const handleVisibilityChange = () => {
      if (socket && socket.readyState !== WebSocket.OPEN) {
        if (document.hidden) {
          socket.close();
        } else {
          const newWebSocket = subscribeForWebsocket();
          if (newWebSocket) {
            setSocket(newWebSocket);
          }
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [socket]);

  const otherUserConnectedListener = useCallback(
    (otherUserId) => {
      const friendListTemp = updateFriendList(friends, [otherUserId], true);
      setFriends(friendListTemp);
    },
    [friends, setFriends]
  );

  const otherUserDisconnectedListener = useCallback(
    ({ userId, lastLoggedInTime }) => {
      const friendListTemp = updateFriendList(
        friends,
        [userId],
        false,
        lastLoggedInTime
      );
      setFriends(friendListTemp);
    },
    [friends, setFriends]
  );

  useEffect(() => {
    socket?.on("other-user-connected", otherUserConnectedListener);
    socket?.on("other-user-disconnected", otherUserDisconnectedListener);
    return () => {
      socket?.off("other-user-connected", otherUserConnectedListener);
      socket?.off("other-user-disconnected", otherUserDisconnectedListener);
    };
  }, [
    socket,
    friends,
    otherUserConnectedListener,
    otherUserDisconnectedListener,
  ]);

  return (
    <WebsocketContext.Provider
      value={{ socket, setSocket, friends, setFriends }}
    >
      {props.children}
    </WebsocketContext.Provider>
  );
};

export default WebsocketProvider;
